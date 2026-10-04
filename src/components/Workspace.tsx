"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/locales";
import type { ClientMessages as Messages } from "@/i18n/client-messages";
import { ALL_EXTENSIONS, canonicalExt, extOf, FORMATS, type FormatCategory } from "@/lib/core/formats";
import type { Capabilities } from "@/lib/core/capabilities";
import { commonTargets, findPath, supportedInputs, type EngineId } from "@/lib/core/graph";
import { heicToJpeg, isHeicName } from "@/lib/client/heic";
import { cleanFileName, renamedFiles } from "@/lib/core/rename";
import { defaultOptions, getTool, type OptionValues, type ToolOption } from "@/lib/core/tools";
import { BLOB_INPUT_PREFIX, type BlobResult, DIRECT_TRANSFER_BYTES } from "@/lib/core/transfer";
import { compareFiles, parseFormValues } from "./DocTools";
import { InputPreview, parseAreaList, ResultPreview } from "./Preview";
import { SignaturePad } from "./SignaturePad";
import { FileGlyph } from "./visual/FileGlyph";
import { ToolIcon } from "./visual/ToolIcon";

interface Item {
  id: string;
  file: File;
}

type Status =
  | { kind: "idle" }
  | { kind: "uploading"; progress: number }
  | { kind: "processing" }
  /** Traitement dans le navigateur (OCR) : pages lues sur le total (0 = préparation). */
  | { kind: "working"; done: number; total: number }
  | { kind: "done"; url: string; name: string; size: number; count: number; seconds: number; inputSize: number }
  | { kind: "error"; message: string };

/** Textes d'une option d'outil (voir `tools.<id>.options` dans les traductions). */
interface OptionText {
  label: string;
  help?: string;
  placeholder?: string;
  default?: string;
  choices?: Record<string, string>;
  /** Petite explication sous chaque choix (cartes). */
  hints?: Record<string, string>;
  /** Valeur réellement envoyée au serveur pour chaque choix (ex. nTotal → "{n} / {total}"). */
  templates?: Record<string, string>;
  /** Textes proposés en un clic sous un champ libre. */
  suggestions?: string[];
}

type WorkspaceText = Messages["workspace"];

function formatSize(bytes: number, locale: string): string {
  const units = [
    ["byte", 1],
    ["kilobyte", 1024],
    ["megabyte", 1024 ** 2],
    ["gigabyte", 1024 ** 3],
  ] as const;
  const [unit, size] = [...units].reverse().find(([, s]) => bytes >= s) ?? units[0];
  try {
    return new Intl.NumberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: "short",
      maximumFractionDigits: unit === "byte" || unit === "kilobyte" ? 0 : 1,
    }).format(bytes / size);
  } catch {
    return `${(bytes / size).toFixed(1)} ${unit}`;
  }
}

/** Durée avec le séparateur décimal de la langue (0,1 en français, 0.1 en anglais). */
function secondsText(seconds: number, locale: string): string {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(seconds);
}

function filenameFrom(header: string | null, fallback: string): string {
  if (!header) return fallback;
  const star = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (star) return decodeURIComponent(star[1]);
  const plain = /filename="([^"]+)"/i.exec(header);
  return plain?.[1] ?? fallback;
}

/** Exécute `fn` sur chaque élément, au plus `limit` à la fois, en gardant l'ordre. */
async function mapLimit<T, R>(list: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(list.length);
  let next = 0;
  const worker = async () => {
    while (next < list.length) {
      const i = next++;
      out[i] = await fn(list[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, list.length) }, worker));
  return out;
}

let uid = 0;
const newId = () => `f${++uid}-${Date.now()}`;

export function Workspace({ toolId, caps }: { toolId: string; caps: Capabilities }) {
  const tool = getTool(toolId)!;
  const { messages: m, locale } = useI18n();
  const w = m.workspace;
  const toolText = m.tools[tool.id];
  const optionTexts = toolText.options as Record<string, OptionText>;
  const optText = (name: string): OptionText => optionTexts[name] ?? { label: name };

  const engines = useMemo(() => new Set<EngineId>(caps?.engines ?? []), [caps]);

  const [items, setItems] = useState<Item[]>([]);
  const [options, setOptions] = useState<OptionValues>(() => {
    const initial = defaultOptions(tool, Object.fromEntries(Object.entries(optionTexts).map(([k, v]) => [k, v.default])));
    // OCR : la langue de l'interface est la plus probable pour le document
    const ocrLang = Object.entries(OCR_LANGS).find(([, bcp]) => bcp.split("-")[0] === locale.split("-")[0])?.[0];
    if (tool.id === "ocr" && ocrLang) initial.lang = ocrLang;
    return initial;
  });
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  /** Nom souhaité pour le fichier produit (vide = nom automatique). */
  const [resultName, setResultName] = useState("");
  const [rejected, setRejected] = useState<string[]>([]);
  /** Photos d'iPhone en cours de conversion en JPG. */
  const [preparing, setPreparing] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  /** Poids des fichiers envoyés, pour afficher le gain d'une compression. */
  const inputSizeRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const acceptedExts = useMemo((): string[] | null => {
    if (tool.accepts === "all") return null;
    if (tool.accepts === "pdf") return ["pdf"];
    if (tool.accepts === "scan") return ["pdf", "jpg", "jpeg", "png", "webp", "bmp", "gif", "tif", "tiff"];
    if (tool.accepts === "image") return ["jpg", "jpeg", "png", "webp", "avif", "gif", "tif", "tiff"];
    if (!caps) return ALL_EXTENSIONS;
    const inputs = new Set(supportedInputs(engines).concat("pdf"));
    return ALL_EXTENSIONS.filter((e) => inputs.has(canonicalExt(e)));
  }, [tool.accepts, caps, engines]);

  const busy = status.kind === "uploading" || status.kind === "processing" || status.kind === "working";
  const maxFiles = Math.min(tool.maxFiles ?? Infinity, caps?.limits.maxFiles ?? Infinity);
  const size = (bytes: number) => formatSize(bytes, locale);

  // Libère l'URL du résultat précédent
  useEffect(() => {
    return () => {
      if (status.kind === "done") URL.revokeObjectURL(status.url);
    };
  }, [status]);

  /** L'outil accepte-t-il les photos (et donc les photos d'iPhone, converties en JPG) ? */
  const takesPhotos = !acceptedExts || acceptedExts.includes("jpg");

  function addFiles(list: FileList | File[]) {
    const files = Array.from(list);
    const heic = takesPhotos ? files.filter((f) => isHeicName(f.name)).length : 0;
    if (!heic) return acceptFiles(files);
    // Photos d'iPhone : converties en JPG dans le navigateur avant d'être ajoutées
    setPreparing((n) => n + heic);
    void Promise.all(files.map((f) => (isHeicName(f.name) ? heicToJpeg(f).catch(() => f) : f))).then((converted) => {
      setPreparing((n) => n - heic);
      acceptFiles(converted);
    });
  }

  function acceptFiles(files: File[]) {
    const accepted: Item[] = [];
    const refused: string[] = [];
    for (const file of files) {
      if (!acceptedExts || acceptedExts.includes(extOf(file.name))) accepted.push({ id: newId(), file });
      else refused.push(file.name);
    }
    setRejected(refused);
    setItems((prev) => [...prev, ...accepted].slice(0, maxFiles));
    if (status.kind !== "idle" && !busy) setStatus({ kind: "idle" });
  }

  function move(from: number, to: number) {
    setItems((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [it] = next.splice(from, 1);
      next.splice(to, 0, it);
      return next;
    });
  }

  // Formats de sortie possibles pour la conversion
  const exts = useMemo(() => [...new Set(items.map((i) => canonicalExt(extOf(i.file.name))))], [items]);
  const targets = useMemo(() => (caps ? commonTargets(exts, engines) : []), [caps, engines, exts]);
  // Format choisi, ignoré s'il n'est plus possible avec les fichiers actuels
  const target = targets.includes(String(options.target ?? "")) ? String(options.target) : "";

  const outputTargets = useMemo(() => {
    const possible = caps ? commonTargets(["pdf"], engines) : [];
    // Les formats les plus demandés d'abord, puis les autres
    const order = ["pdf", "docx", "jpg", "png", "txt", "pptx", "odt", "html", "rtf", "webp", "avif", "tiff", "gif", "doc", "ppt", "odp"];
    const rank = (t: string) => (order.includes(t) ? order.indexOf(t) : order.length);
    return ["pdf", ...possible.filter((t) => t !== "pdf").sort((a, b) => rank(a) - rank(b))];
  }, [caps, engines]);
  const output = String(options.output ?? "pdf");
  const approximate =
    (!!target && exts.some((e) => findPath(e, target, engines)?.some((s) => s.approximate))) ||
    (output !== "pdf" && !!findPath("pdf", output, engines)?.some((s) => s.approximate));

  function visible(opt: ToolOption): boolean {
    if (!opt.showIf) return true;
    // Un réglage dépend d'un autre : caché aussi quand cet autre réglage est lui-même caché
    const parent = tool.options.find((o) => o.name === opt.showIf!.name);
    return opt.showIf.in.includes(String(options[opt.showIf.name] ?? "")) && (!parent || visible(parent));
  }

  /** Renommer : tout se fait dans le navigateur (une archive ZIP s'il y a plusieurs fichiers). */
  async function runLocal() {
    const started = window.performance.now();
    if (tool.id === "comparer") {
      const [a, b] = items;
      const result = await compareFiles(a.file, b.file, !!options.ignoreCase);
      const { comparisonReport } = await import("@/lib/client/compare");
      const html = comparisonReport(result.comparison, {
        title: w.compareReport,
        oldName: a.file.name,
        newName: b.file.name,
        summary: result.comparison.added || result.comparison.removed ? fmt(w.compareSummary, { added: result.comparison.added, removed: result.comparison.removed }) : w.compareSame,
        legend: w.compareLegend,
        pages: fmt(w.comparePages, { a: result.pagesA, b: result.pagesB }),
        skipped: (n) => fmt(w.compareSkipped, { n }),
        lang: locale,
        dir: document.documentElement.dir || "ltr",
      });
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      inputSizeRef.current = a.file.size + b.file.size;
      deliver(URL.createObjectURL(blob), `comparaison-${cleanFileName(a.file.name.replace(/.pdf$/i, ""))}.html`, blob.size, 1, started);
      return;
    }
    if (tool.id === "ocr") {
      try {
        const { ocrFiles } = await import("@/lib/client/ocr");
        const results = await ocrFiles(
          items.map((i) => i.file),
          String(options.lang ?? "eng"),
          options.format === "txt" ? "txt" : "pdf",
          ({ done, total }) => setStatus({ kind: "working", done, total }),
        );
        inputSizeRef.current = items.reduce((n, i) => n + i.file.size, 0);
        if (results.length === 1) {
          const blob = new Blob([results[0].data as BlobPart]);
          deliver(URL.createObjectURL(blob), results[0].name, blob.size, 1, started);
          return;
        }
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        for (const r of results) zip.file(r.name, r.data);
        const blob = await zip.generateAsync({ type: "blob" });
        deliver(URL.createObjectURL(blob), "pdffusion-ocr.zip", blob.size, results.length, started);
      } catch {
        setStatus({ kind: "error", message: w.errorConnection });
      }
      return;
    }
    inputSizeRef.current = items.reduce((n, i) => n + i.file.size, 0);
    const names = renamedFiles(
      items.map((i) => i.file.name),
      String(options.name ?? ""),
      String(options.ext ?? ""),
    );
    if (items.length === 1) {
      deliver(URL.createObjectURL(items[0].file), names[0], items[0].file.size, 1, started);
      return;
    }
    setStatus({ kind: "processing" });
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    items.forEach((it, i) => zip.file(names[i], it.file));
    const blob = await zip.generateAsync({ type: "blob" });
    deliver(URL.createObjectURL(blob), `${cleanFileName(String(options.name ?? "")) || "pdffusion"}.zip`, blob.size, items.length, started);
  }

  function run() {
    if (!items.length || busy) return;
    if (tool.local) {
      void runLocal();
      return;
    }
    const total = items.reduce((n, i) => n + i.file.size, 0);
    if (caps && total > caps.limits.maxUploadMb * 1024 * 1024) {
      setStatus({ kind: "error", message: fmt(m.errors.tooLarge, { mb: caps.limits.maxUploadMb }) });
      return;
    }
    const opts: OptionValues = { ...options, target };
    if (tool.id === "signer" && options.date) {
      opts.dateText = new Intl.DateTimeFormat(locale, { dateStyle: "short", numberingSystem: "latn" }).format(new Date());
    }
    // Les choix de style deviennent le modèle attendu par le serveur
    for (const opt of tool.options) {
      const templates = optText(opt.name).templates;
      const value = String(opts[opt.name] ?? "");
      if (templates?.[value] !== undefined) opts[opt.name] = templates[value];
    }
    inputSizeRef.current = total;
    // Au-delà de ~4 Mo, les fichiers passent par le stockage temporaire (limite des requêtes Vercel)
    if (caps?.blob && total > DIRECT_TRANSFER_BYTES) void runViaBlob(opts, total);
    else runDirect(opts);
  }

  const endpoint = `/api/tools/${tool.id}?lang=${encodeURIComponent(locale)}`;

  /** Affiche le résultat et lance le téléchargement. */
  function deliver(url: string, producedName: string, size: number, count: number, started: number) {
    const custom = tool.local ? "" : cleanFileName(resultName);
    const ext = extOf(producedName);
    const name = custom ? (ext ? `${custom.replace(new RegExp(`\\.${ext}$`, "i"), "")}.${ext}` : custom) : producedName;
    setStatus({ kind: "done", url, name, size, count, seconds: (performance.now() - started) / 1000, inputSize: inputSizeRef.current });
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  }

  /** Résultat volumineux déposé dans le stockage temporaire : on le récupère puis on l'efface. */
  async function deliverFromBlob(result: BlobResult, started: number) {
    try {
      const res = await fetch(result.url, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      void fetch("/api/upload", { method: "DELETE", body: JSON.stringify({ urls: [result.url] }), keepalive: true });
      deliver(URL.createObjectURL(blob), result.name, result.size, result.count, started);
    } catch {
      // Téléchargement direct par le navigateur ; le nettoyage automatique effacera le fichier
      deliver(result.downloadUrl, result.name, result.size, result.count, started);
    }
  }

  async function errorMessage(body: Blob | Response): Promise<string> {
    try {
      return JSON.parse(await body.text()).error ?? w.errorGeneric;
    } catch {
      return w.errorGeneric;
    }
  }

  function runDirect(opts: OptionValues) {
    const started = performance.now();
    const form = new FormData();
    items.forEach((i) => form.append("files", i.file, i.file.name));
    form.append("options", JSON.stringify(opts));

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open("POST", endpoint);
    xhr.responseType = "blob";
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setStatus({ kind: "uploading", progress: e.loaded / e.total });
    };
    xhr.upload.onload = () => setStatus({ kind: "processing" });
    xhr.onerror = () => setStatus({ kind: "error", message: w.errorConnection });
    xhr.onabort = () => setStatus({ kind: "idle" });
    xhr.onload = async () => {
      const blob: Blob = xhr.response;
      if (xhr.status !== 200) {
        setStatus({ kind: "error", message: await errorMessage(blob) });
        return;
      }
      if (xhr.getResponseHeader("Content-Type")?.startsWith("application/json")) {
        await deliverFromBlob(JSON.parse(await blob.text()) as BlobResult, started);
        return;
      }
      const name = filenameFrom(xhr.getResponseHeader("Content-Disposition"), "pdffusion");
      deliver(URL.createObjectURL(blob), name, blob.size, Number(xhr.getResponseHeader("X-Pdff-Count") ?? 1), started);
    };
    setStatus({ kind: "uploading", progress: 0 });
    xhr.send(form);
  }

  async function runViaBlob(opts: OptionValues, total: number) {
    const started = performance.now();
    const controller = new AbortController();
    abortRef.current = controller;
    const loaded = new Map<string, number>();
    setStatus({ kind: "uploading", progress: 0 });
    try {
      // Chargée seulement pour les gros fichiers : les autres visiteurs ne la téléchargent jamais
      const { upload } = await import("@vercel/blob/client");
      const refs = await mapLimit(items, 4, async (item) => {
        const ext = extOf(item.file.name) || "bin";
        const blob = await upload(`${BLOB_INPUT_PREFIX}${crypto.randomUUID()}.${ext}`, item.file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType: item.file.type || "application/octet-stream",
          multipart: item.file.size > 50 * 1024 * 1024,
          abortSignal: controller.signal,
          onUploadProgress: ({ loaded: done }) => {
            loaded.set(item.id, done);
            const sum = [...loaded.values()].reduce((a, b) => a + b, 0);
            setStatus({ kind: "uploading", progress: Math.min(1, sum / total) });
          },
        });
        return { url: blob.url, name: item.file.name };
      });
      setStatus({ kind: "processing" });
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: refs, options: opts }),
        signal: controller.signal,
      });
      if (!res.ok) {
        setStatus({ kind: "error", message: await errorMessage(res) });
        return;
      }
      if (res.headers.get("Content-Type")?.startsWith("application/json")) {
        await deliverFromBlob((await res.json()) as BlobResult, started);
        return;
      }
      const blob = await res.blob();
      const name = filenameFrom(res.headers.get("Content-Disposition"), "pdffusion");
      deliver(URL.createObjectURL(blob), name, blob.size, Number(res.headers.get("X-Pdff-Count") ?? 1), started);
    } catch {
      setStatus(controller.signal.aborted ? { kind: "idle" } : { kind: "error", message: w.errorConnection });
    }
  }

  function cancel() {
    xhrRef.current?.abort();
    abortRef.current?.abort();
  }

  function reset() {
    setItems([]);
    setRejected([]);
    setStatus({ kind: "idle" });
  }

  const totalSize = items.reduce((n, i) => n + i.file.size, 0);
  const canRun = items.length >= tool.minFiles && !busy && (!tool.options.some((o) => o.type === "target") || !!target);
  const emptyDecor = tool.accepts === "pdf" ? ["pdf", "pdf", "pdf"] : ["docx", "pdf", "xlsx", "pptx", "jpg"];

  // Annonce des étapes aux lecteurs d'écran (WCAG 4.1.3) : une phrase par étape, pas à chaque pourcentage
  const announcement =
    status.kind === "uploading" || status.kind === "processing" || status.kind === "working"
      ? w.processingShort
      : status.kind === "done"
        ? `${status.count > 1 ? fmt(w.doneMany, { s: secondsText(status.seconds, locale), n: status.count }) : fmt(w.done, { s: secondsText(status.seconds, locale) })} ${status.name}`
        : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
      {/* Fichiers */}
      <section className="min-w-0">
        <div
          onDragOver={(e) => {
            if (dragIndex !== null) return;
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            if (dragIndex !== null) return;
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`drop-ring rounded-[2rem] transition-[transform,box-shadow] duration-300 ${dragOver ? "active scale-[1.01] shadow-[var(--shadow-lg)]" : ""} ${
            items.length ? "p-3 sm:p-5" : "p-8 sm:p-14"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={maxFiles > 1}
            accept={acceptedExts ? [...acceptedExts, ...(takesPhotos ? ["heic", "heif"] : [])].map((e) => `.${e}`).join(",") : undefined}
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />

          {!items.length ? (
            <div className="text-center">
              <div className="relative mx-auto h-28 w-60" aria-hidden="true" dir="ltr">
                {emptyDecor.map((ext, i) => {
                  const mid = (emptyDecor.length - 1) / 2;
                  return (
                    <div
                      key={i}
                      className="float-doc absolute top-2 w-14"
                      style={
                        {
                          left: `calc(50% - 28px + ${(i - mid) * 44}px)`,
                          zIndex: 10 - Math.abs(i - mid),
                          scale: `${1 - Math.abs(i - mid) * 0.12}`,
                          "--rot": `${(i - mid) * 8}deg`,
                          "--d": `${-i * 0.6}s`,
                        } as React.CSSProperties
                      }
                    >
                      <FileGlyph ext={ext} className="w-full" glow />
                    </div>
                  );
                })}
              </div>
              <p className="font-display mt-6 text-2xl font-bold tracking-tight">{dragOver ? w.dropActive : w.dropTitle}</p>
              <p className="mt-1.5 text-muted">{tool.accepts === "pdf" ? w.dropPdfOnly : w.dropAny}</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-7 rounded-full bg-brand px-8 py-3.5 font-semibold text-brand-ink shadow-[0_12px_40px_-10px_#6d5cff] transition hover:-translate-y-0.5 hover:bg-brand-2 active:translate-y-0"
              >
                {w.choose}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
                <p className="text-sm text-muted">
                  <strong className="text-ink">{fmt(w.fileCount, { n: items.length })}</strong>, {size(totalSize)}
                  {tool.ordered && items.length > 1 && <span className="hidden sm:inline"> {w.dragHint}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.ordered && items.length > 1 && (
                    <>
                      <SmallButton
                        onClick={() =>
                          setItems((p) => [...p].sort((a, b) => a.file.name.localeCompare(b.file.name, locale, { numeric: true })))
                        }
                      >
                        {w.sortAZ}
                      </SmallButton>
                      <SmallButton onClick={() => setItems((p) => [...p].reverse())}>{w.reverse}</SmallButton>
                    </>
                  )}
                  <SmallButton onClick={reset}>{w.clear}</SmallButton>
                </div>
              </div>

              <ol className="space-y-2">
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    draggable={tool.ordered && !busy}
                    onDragStart={() => setDragIndex(index)}
                    onDragEnd={() => setDragIndex(null)}
                    onDragOver={(e) => {
                      if (dragIndex === null) return;
                      e.preventDefault();
                      if (dragIndex !== index) {
                        move(dragIndex, index);
                        setDragIndex(index);
                      }
                    }}
                    className={`file-in flex items-center gap-3 rounded-2xl border bg-bg py-2 ps-2 pe-2 transition-[border-color,opacity,transform] sm:ps-3 ${
                      dragIndex === index ? "scale-[0.98] border-brand opacity-60" : "border-line hover:border-brand/40"
                    } ${tool.ordered ? "cursor-grab active:cursor-grabbing" : ""}`}
                  >
                    {tool.ordered && <span className="font-display w-5 shrink-0 text-center text-sm font-bold text-muted">{index + 1}</span>}
                    <FileGlyph ext={extOf(item.file.name)} className="h-11 w-9 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold" title={item.file.name} dir="auto">
                        {item.file.name}
                      </p>
                      <p className="text-xs text-muted">{size(item.file.size)}</p>
                    </div>
                    {tool.ordered && items.length > 1 && (
                      <div className="flex">
                        <IconButton label={w.moveUp} disabled={index === 0 || busy} onClick={() => move(index, index - 1)}>
                          ↑
                        </IconButton>
                        <IconButton label={w.moveDown} disabled={index === items.length - 1 || busy} onClick={() => move(index, index + 1)}>
                          ↓
                        </IconButton>
                      </div>
                    )}
                    <IconButton label={w.remove} disabled={busy} onClick={() => setItems((p) => p.filter((i) => i.id !== item.id))}>
                      ✕
                    </IconButton>
                  </li>
                ))}
              </ol>

              {items.length < maxFiles && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line py-3.5 text-sm font-semibold text-muted transition hover:border-brand hover:text-brand-fg"
                >
                  <span className="text-lg leading-none">+</span> {w.addMore}
                </button>
              )}
            </>
          )}
        </div>

        {preparing > 0 && (
          <p role="status" className="mt-3 flex items-center gap-2 rounded-2xl bg-bg px-4 py-3 text-sm text-muted">
            <span aria-hidden="true" className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {w.heicConverting}
          </p>
        )}
        {rejected.length > 0 && (
          <p role="alert" className="mt-3 rounded-2xl bg-warn-soft px-4 py-3 text-sm text-warn-ink">{fmt(w.rejected, { files: rejected.join(", ") })}</p>
        )}

        {items.length > 0 &&
          (status.kind === "done" && tool.id !== "comparer" ? (
            <ResultPreview key={status.url} url={status.url} name={status.name} w={w} />
          ) : (
            <InputPreview
              toolId={tool.id}
              items={items}
              options={options}
              templates={optText("format").templates}
              w={w}
              onOption={(name, value) => setOptions((o) => ({ ...o, [name]: value }))}
            />
          ))}
      </section>

      {/* Options et action */}
      <aside className="h-fit rounded-[2rem] border border-line bg-surface p-5 sm:p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand-fg">
            <ToolIcon id={tool.id} className="h-5 w-5" />
          </span>
          <h2 className="font-display text-xl font-bold">{w.settings}</h2>
        </div>

        {tool.options.length > 0 ? (
          <div className="mt-5 space-y-5">
            {/* Avant le dépôt d'un fichier : aperçu sur une page d'exemple */}
            {(tool.id === "filigrane" || tool.id === "numeroter") && !items.length && (
              <ToolPreview toolId={tool.id} options={options} templates={optText("format").templates} label={w.preview} />
            )}
            {tool.options
              .filter((opt) => visible(opt) && !opt.advanced)
              .map((opt) =>
                opt.type === "output" ? (
                  <OutputPicker
                    key={opt.name}
                    label={w.outputLabel}
                    value={output}
                    targets={outputTargets}
                    names={m.formatNames as Partial<Record<string, string>>}
                    onChange={(v) => setOptions((o) => ({ ...o, [opt.name]: v }))}
                  />
                ) : (
                  <OptionField
                    key={opt.name}
                    option={opt}
                    text={optText(opt.name)}
                    value={opt.type === "target" ? target : options[opt.name]}
                    targets={targets}
                    hasFiles={items.length > 0}
                    messages={m}
                    onChange={(v) => setOptions((o) => ({ ...o, [opt.name]: v }))}
                  />
                ),
              )}
            {(!tool.local || tool.options.some((opt) => visible(opt) && opt.advanced)) && (
              <details className="group rounded-xl border border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3.5 py-3 text-sm font-semibold">
                  {w.advanced}
                  <span aria-hidden="true" className="text-muted transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <div className="space-y-4 border-t border-line p-3.5">
                  {tool.options
                    .filter((opt) => visible(opt) && opt.advanced)
                    .map((opt) => (
                      <OptionField
                        key={opt.name}
                        option={opt}
                        text={optText(opt.name)}
                        value={options[opt.name]}
                        targets={targets}
                        hasFiles={items.length > 0}
                        messages={m}
                        onChange={(v) => setOptions((o) => ({ ...o, [opt.name]: v }))}
                      />
                    ))}
                  {!tool.local && (
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold">{w.resultName}</span>
                      <input
                        type="text"
                        value={resultName}
                        placeholder={w.resultNamePlaceholder}
                        onChange={(e) => setResultName(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base transition focus:border-brand focus:ring-4 focus:ring-brand/25 sm:text-sm"
                        dir="auto"
                      />
                      <span className="mt-1 block text-xs text-muted">{w.resultNameHelp}</span>
                    </label>
                  )}
                </div>
              </details>
            )}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">{w.noSettings}</p>
        )}

        {approximate && <p className="mt-4 rounded-xl bg-warn-soft px-3 py-2.5 text-xs text-warn-ink">{w.approximate}</p>}

        <RunButton label={toolText.name} busy={busy} disabled={!canRun} onClick={run} w={w} className="mt-6 hidden lg:flex" />

        <StatusPanel status={status} onCancel={cancel} onReset={reset} w={w} size={size} showSaving={tool.id === "compresser"} locale={locale} />

        {caps && (
          <p className="mt-4 text-xs text-muted">
            {fmt(w.limits, { pages: caps.limits.maxPages.toLocaleString(locale), files: caps.limits.maxFiles.toLocaleString(locale) })}
          </p>
        )}
      </aside>

      {/* Barre d'action fixe sur mobile */}
      {items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
          {status.kind === "done" ? (
            <a
              href={status.url}
              download={status.name}
              className="pop flex w-full items-center justify-center gap-2 rounded-full bg-ok py-4 font-semibold text-white"
            >
              {w.downloadResult}
            </a>
          ) : (
            <RunButton label={toolText.name} busy={busy} disabled={!canRun} onClick={run} w={w} className="flex" progress={status} />
          )}
        </div>
      )}
    </div>
  );
}

function RunButton({
  label,
  busy,
  disabled,
  onClick,
  w,
  className = "",
  progress,
}: {
  label: string;
  busy: boolean;
  disabled: boolean;
  onClick: () => void;
  w: WorkspaceText;
  className?: string;
  progress?: Status;
}) {
  const pct = progress?.kind === "uploading" ? Math.round(progress.progress * 100) : progress?.kind === "processing" ? 100 : 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full items-center justify-center overflow-hidden rounded-full bg-brand py-4 font-semibold text-brand-ink shadow-[0_12px_40px_-12px_#6d5cff] transition hover:bg-brand-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none ${className}`}
    >
      {busy && <span className="progress-stripes absolute inset-y-0 start-0 bg-white/15 transition-[width] duration-300" style={{ width: `${pct || 100}%` }} />}
      <span className="relative">{busy ? (progress?.kind === "uploading" ? fmt(w.uploading, { pct }) : w.processing) : label}</span>
    </button>
  );
}

function StatusPanel({
  status,
  onCancel,
  onReset,
  w,
  size,
  showSaving,
  locale,
}: {
  status: Status;
  onCancel: () => void;
  onReset: () => void;
  w: WorkspaceText;
  size: (bytes: number) => string;
  /** Compression : afficher « avant → après ». */
  showSaving: boolean;
  locale: string;
}) {
  if (status.kind === "idle") return null;
  if (status.kind === "working") {
    const pct = status.total ? Math.round((status.done / status.total) * 100) : 0;
    const text = status.total ? fmt(w.ocrProgress, { n: Math.min(status.done + 1, status.total), total: status.total }) : w.ocrLoading;
    return (
      <div className="mt-4">
        <div role="progressbar" aria-label={w.processingShort} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="h-2.5 overflow-hidden rounded-full bg-bg">
          <div className="progress-stripes h-full rounded-full bg-brand transition-all" style={{ width: `${Math.max(pct, 4)}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted">{text}</p>
      </div>
    );
  }
  if (status.kind === "uploading" || status.kind === "processing") {
    const pct = status.kind === "uploading" ? Math.round(status.progress * 100) : 100;
    return (
      <div className="mt-4">
        <div
          role="progressbar"
          aria-label={w.processingShort}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className="h-2.5 overflow-hidden rounded-full bg-bg"
        >
          <div className="progress-stripes h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>{status.kind === "uploading" ? fmt(w.uploading, { pct }) : w.processingShort}</span>
          <button type="button" onClick={onCancel} className="underline hover:text-ink">
            {w.cancel}
          </button>
        </div>
      </div>
    );
  }
  if (status.kind === "error") {
    return (
      <p role="alert" className="pop mt-4 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">
        {status.message}
      </p>
    );
  }
  const seconds = secondsText(status.seconds, locale);
  return (
    <div className="pop mt-4 rounded-2xl bg-ok-soft p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ok text-lg text-white">✓</span>
        <div className="min-w-0">
          <p className="font-semibold text-ok">
            {status.count > 1 ? fmt(w.doneMany, { s: seconds, n: status.count }) : fmt(w.done, { s: seconds })}
          </p>
          <p className="truncate text-xs text-muted" title={status.name} dir="auto">
            {status.name}, {size(status.size)}
          </p>
        </div>
      </div>
      {showSaving && status.inputSize > 0 && (
        <p className="mt-3 rounded-xl bg-surface px-3 py-2 text-sm font-semibold">
          {status.size < status.inputSize
            ? fmt(w.saved, {
                before: size(status.inputSize),
                after: size(status.size),
                pct: new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }).format(1 - status.size / status.inputSize),
              })
            : w.savedNone}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <a href={status.url} download={status.name} className="flex-1 rounded-full bg-ok px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90">
          {w.download}
        </a>
        <button type="button" onClick={onReset} className="rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium hover:border-ink/30">
          {w.restart}
        </button>
      </div>
    </div>
  );
}

function OptionField({
  option,
  text,
  value,
  targets,
  hasFiles,
  messages,
  onChange,
}: {
  option: ToolOption;
  text: OptionText;
  value: OptionValues[string] | undefined;
  targets: string[];
  hasFiles: boolean;
  messages: Messages;
  onChange: (v: string | number | boolean) => void;
}) {
  const labelCls = "mb-1.5 block text-sm font-semibold";
  const inputCls =
    "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base transition focus:border-brand focus:ring-4 focus:ring-brand/25 sm:text-sm";

  switch (option.type) {
    case "checkbox":
      return (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-bg px-3.5 py-3 text-sm">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
          {text.label}
        </label>
      );
    case "select":
      if (option.display === "language") return <LanguageSelect label={text.label} choices={option.choices} value={String(value)} onChange={onChange} />;
      if (option.display === "cards")
        return <CardChoice name={option.name} label={text.label} choices={option.choices} text={text} value={String(value)} onChange={onChange} />;
      if (option.display === "position")
        return <PositionPicker label={text.label} choices={option.choices} text={text} value={String(value)} onChange={onChange} />;
      if (option.display === "swatches")
        return <Swatches label={text.label} choices={option.choices} text={text} value={String(value)} onChange={onChange} />;
      return (
        <label className="block">
          <span className={labelCls}>{text.label}</span>
          <select value={String(value)} onChange={(e) => onChange(e.target.value)} className={inputCls}>
            {option.choices.map((c) => (
              <option key={c} value={c}>
                {text.choices?.[c] ?? c}
              </option>
            ))}
          </select>
        </label>
      );
    case "number":
      return (
        <label className="block">
          <span className={labelCls}>{text.label}</span>
          <input
            type="number"
            inputMode="numeric"
            value={Number(value)}
            min={option.min}
            max={option.max}
            step={option.step ?? 1}
            onChange={(e) => onChange(Number(e.target.value))}
            className={inputCls}
          />
        </label>
      );
    case "output":
      return null;
    case "signature":
      return <SignaturePad label={text.label} value={String(value ?? "")} onChange={onChange} w={messages.workspace} />;
    case "formvalues": {
      const answers = Object.values(parseFormValues(value));
      const filled = answers.filter((v) => (Array.isArray(v) ? v.length : typeof v === "boolean" ? v : String(v ?? "").trim())).length;
      return (
        <div className="rounded-xl border border-dashed border-line px-3.5 py-3 text-sm">
          <p className="font-semibold">{text.label}</p>
          <p className="mt-0.5 text-xs text-muted">{answers.length ? fmt(messages.workspace.formFilled, { n: filled, total: answers.length }) : messages.workspace.formLoading}</p>
        </div>
      );
    }
    case "areas": {
      const n = parseAreaList(value).length;
      return (
        <div className="rounded-xl border border-dashed border-line px-3.5 py-3 text-sm">
          <p className="font-semibold">{text.label}</p>
          <p className="mt-0.5 text-xs text-muted">{n ? fmt(messages.workspace.areaCount, { n }) : messages.workspace.areaHint}</p>
        </div>
      );
    }
    case "multi": {
      const selected = new Set(String(value ?? "").split(",").filter(Boolean));
      return (
        <fieldset>
          <legend className="mb-2 block text-sm font-semibold">{text.label}</legend>
          <div className="space-y-1.5">
            {option.choices.map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm has-[:checked]:border-brand has-[:checked]:bg-brand/10">
                <input
                  type="checkbox"
                  checked={selected.has(c)}
                  onChange={(e) => {
                    const next = new Set(selected);
                    if (e.target.checked) next.add(c);
                    else next.delete(c);
                    onChange([...next].join(","));
                  }}
                  className="h-5 w-5 accent-[var(--brand)]"
                />
                {text.choices?.[c] ?? c}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    case "target":
      return <TargetPicker label={text.label} value={String(value ?? "")} targets={targets} hasFiles={hasFiles} messages={messages} onChange={onChange} />;
    default:
      return (
        <label className="block">
          <span className={labelCls}>{text.label}</span>
          <input
            type={option.type === "password" ? "password" : "text"}
            value={String(value ?? "")}
            placeholder={text.placeholder}
            autoComplete={option.type === "password" ? "new-password" : "off"}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
            dir="auto"
          />
          {text.help && <span className="mt-1 block text-xs text-muted">{text.help}</span>}
          {text.suggestions && (
            <span className="mt-2 flex flex-wrap gap-1.5">
              {text.suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => onChange(sug)}
                  aria-pressed={value === sug}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    value === sug ? "border-brand bg-brand/10 text-brand-fg" : "border-line bg-bg hover:border-brand/50"
                  }`}
                >
                  {sug}
                </button>
              ))}
            </span>
          )}
        </label>
      );
  }
}

const SWATCH: Record<string, string> = { gray: "#808080", red: "#cc1a1a", blue: "#1a40bf", black: "#000000" };

/** Code de langue OCR (Tesseract) → code BCP 47, pour afficher le nom de la langue. */
const OCR_LANGS: Record<string, string> = {
  fra: "fr", eng: "en", spa: "es", por: "pt", deu: "de", ita: "it", nld: "nl", ara: "ar",
  chi_sim: "zh-Hans", rus: "ru", pol: "pl", tur: "tr", vie: "vi", hin: "hi", jpn: "ja", kor: "ko",
};

/** Langue du document, nommée dans la langue de l'interface. */
function LanguageSelect({ label, choices, value, onChange }: { label: string; choices: string[]; value: string; onChange: (v: string) => void }) {
  const { locale } = useI18n();
  const names = (code: string) => {
    try {
      return new Intl.DisplayNames([locale], { type: "language" }).of(OCR_LANGS[code] ?? code) ?? code;
    } catch {
      return code;
    }
  };
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base transition focus:border-brand focus:ring-4 focus:ring-brand/25 sm:text-sm"
      >
        {choices.map((c) => (
          <option key={c} value={c}>
            {names(c)}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Format du résultat d'un outil PDF : PDF par défaut, ou Word, images, texte… */
function OutputPicker({
  label,
  value,
  targets,
  names,
  onChange,
}: {
  label: string;
  value: string;
  targets: string[];
  names: Partial<Record<string, string>>;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {targets.map((t) => (
          <label
            key={t}
            title={names[t] ?? FORMATS[t]?.label ?? t}
            className="cursor-pointer rounded-lg border border-line bg-bg px-2.5 py-1.5 text-xs font-semibold uppercase transition hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand has-[:focus-visible]:outline-solid"
          >
            <input type="radio" name="output" value={t} checked={value === t} onChange={() => onChange(t)} className="sr-only" />
            <span className="sr-only">{names[t] ?? FORMATS[t]?.label ?? t} </span>
            <span aria-hidden="true">{t}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Choix en grandes cartes : le libellé, et une phrase qui dit à quoi il sert. */
function CardChoice({
  name,
  label,
  choices,
  text,
  value,
  onChange,
}: {
  name: string;
  label: string;
  choices: string[];
  text: OptionText;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold">{label}</legend>
      <div className={text.hints ? "space-y-2" : "grid grid-cols-2 gap-2"}>
        {choices.map((c) => (
          <label
            key={c}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg px-3.5 py-3 transition hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
          >
            <input type="radio" name={name} value={c} checked={value === c} onChange={() => onChange(c)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{text.choices?.[c] ?? c}</span>
              {text.hints?.[c] && <span className="mt-0.5 block text-xs text-muted">{text.hints[c]}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Position du numéro : on clique directement à l'endroit voulu sur une page miniature. */
function PositionPicker({
  label,
  choices,
  text,
  value,
  onChange,
}: {
  label: string;
  choices: string[];
  text: OptionText;
  value: string;
  onChange: (v: string) => void;
}) {
  const spot = (c: string) => (
    <label key={c} title={text.choices?.[c]} className="group/spot grid h-10 cursor-pointer place-items-center rounded-lg transition hover:bg-brand/10">
      <input type="radio" name="position" value={c} checked={value === c} onChange={() => onChange(c)} className="peer sr-only" />
      <span className="sr-only">{text.choices?.[c] ?? c}</span>
      <span
        aria-hidden="true"
        className="grid h-6 min-w-6 place-items-center rounded-md border-2 border-dashed border-zinc-300 px-1 text-[11px] font-bold text-transparent transition group-hover/spot:border-brand/60 peer-checked:border-solid peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-focus-visible:outline-solid"
      >
        1
      </span>
    </label>
  );
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold">{label}</legend>
      <div className="flex items-center gap-4">
        <div dir="ltr" className="flex aspect-[3/4] w-32 shrink-0 flex-col justify-between rounded-lg border border-line bg-white p-1.5 shadow-sm">
          <div className="grid grid-cols-3">{choices.filter((c) => c.startsWith("top")).map(spot)}</div>
          <div aria-hidden="true" className="space-y-1.5 px-2">
            {[90, 75, 85, 60].map((wd, i) => (
              <div key={i} className="h-1 rounded-full bg-zinc-200" style={{ width: `${wd}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-3">{choices.filter((c) => c.startsWith("bottom")).map(spot)}</div>
        </div>
        <p className="text-sm font-medium text-muted">{text.choices?.[value] ?? value}</p>
      </div>
    </fieldset>
  );
}

/** Couleurs en pastilles, avec leur nom. */
function Swatches({
  label,
  choices,
  text,
  value,
  onChange,
}: {
  label: string;
  choices: string[];
  text: OptionText;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-4">
        {choices.map((c) => (
          <label key={c} className="flex cursor-pointer flex-col items-center gap-1.5 text-xs">
            <input type="radio" name="color" value={c} checked={value === c} onChange={() => onChange(c)} className="peer sr-only" />
            <span
              aria-hidden="true"
              className="h-9 w-9 rounded-full border-2 border-white shadow ring-2 ring-line transition peer-checked:ring-4 peer-checked:ring-brand peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-focus-visible:outline-solid"
              style={{ background: SWATCH[c] ?? c }}
            />
            <span className="peer-checked:font-semibold">{text.choices?.[c] ?? c}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Aperçu sur une page miniature : le filigrane ou le numéro tels qu'ils apparaîtront. */
function ToolPreview({
  toolId,
  options,
  templates,
  label,
}: {
  toolId: string;
  options: OptionValues;
  templates?: Record<string, string>;
  label: string;
}) {
  // Page A4 (595 × 842 points) réduite à 120 × 170
  const W = 120;
  const H = 170;
  const k = W / 595;
  const lines = [28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132];
  let overlay: React.ReactNode;
  if (toolId === "filigrane") {
    const text = String(options.text ?? "").trim() || " ";
    const rotation = Number(options.rotation) || 0;
    const rad = (rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rad));
    const sin = Math.abs(Math.sin(rad));
    // Même calcul que le serveur : le texte pivoté doit tenir dans la page (Helvetica gras ≈ 0,62 em par caractère)
    const maxWidth = Math.min(cos > 1e-3 ? (595 * 0.85) / cos : Infinity, sin > 1e-3 ? (842 * 0.85) / sin : Infinity);
    const sizePt = Math.min(Number(options.size) || 60, maxWidth / (text.length * 0.62));
    overlay = (
      <text
        x={W / 2}
        y={H / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(${-rotation} ${W / 2} ${H / 2})`}
        fill={SWATCH[String(options.color)] ?? "#808080"}
        fillOpacity={(Number(options.opacity) || 25) / 100}
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight={700}
        fontSize={sizePt * k}
      >
        {text}
      </text>
    );
  } else {
    const start = Number(options.start) || 1;
    const template = templates?.[String(options.format)] ?? String(options.format ?? "{n}");
    const labelText = template.replaceAll("{n}", String(start)).replaceAll("{total}", String(start + 9));
    const [vertical, horizontal] = String(options.position ?? "bottom-center").split("-");
    // Agrandi pour rester lisible sur la miniature
    const size = Math.max(9, (Number(options.size) || 10) * k * 1.6);
    const margin = 9;
    overlay = (
      <text
        x={horizontal === "left" ? margin : horizontal === "right" ? W - margin : W / 2}
        y={vertical === "top" ? margin + size * 0.6 : H - margin}
        textAnchor={horizontal === "left" ? "start" : horizontal === "right" ? "end" : "middle"}
        fill="#1a1a1a"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight={600}
        fontSize={size}
      >
        {labelText}
      </text>
    );
  }
  return (
    <figure className="flex flex-col items-center gap-2 rounded-xl bg-bg p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-40 drop-shadow-md" direction="ltr" role="img" aria-label={label}>
        <rect width={W} height={H} rx="3" fill="#fff" />
        {lines.map((y, i) => (
          <rect key={y} x="14" y={y} width={i % 4 === 3 ? 56 : 92} height="2.5" rx="1.25" fill="#e4e4ea" />
        ))}
        {overlay}
      </svg>
      <figcaption className="text-xs font-medium text-muted">{label}</figcaption>
    </figure>
  );
}


/** Choix du format de sortie : grille de vignettes plutôt qu'une liste déroulante. */
function TargetPicker({
  label,
  value,
  targets,
  hasFiles,
  messages,
  onChange,
}: {
  label: string;
  value: string;
  targets: string[];
  hasFiles: boolean;
  messages: Messages;
  onChange: (v: string) => void;
}) {
  const w = messages.workspace;
  const names = messages.formatNames as Partial<Record<string, string>>;
  const groups = new Map<FormatCategory, string[]>();
  for (const t of targets) {
    const cat = FORMATS[t]?.category ?? "text";
    groups.set(cat, [...(groups.get(cat) ?? []), t]);
  }
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold">{label}</legend>
      {!hasFiles ? (
        <p className="rounded-xl border border-dashed border-line px-3 py-4 text-center text-sm text-muted">{w.targetEmpty}</p>
      ) : !targets.length ? (
        <p className="rounded-xl bg-warn-soft px-3 py-3 text-sm text-warn-ink">{w.targetNone}</p>
      ) : (
        <div className="space-y-3">
          {[...groups].map(([cat, exts]) => (
            <div key={cat}>
              <p className="mb-1.5 text-xs text-muted">{messages.formatCategories[cat]}</p>
              <div className="grid grid-cols-4 gap-2">
                {exts.map((e) => {
                  const selected = value === e;
                  return (
                    <button
                      key={e}
                      type="button"
                      aria-pressed={selected}
                      title={names[e] ?? FORMATS[e]?.label ?? e}
                      onClick={() => onChange(e)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-2 transition active:scale-95 ${
                        selected ? "border-brand bg-brand/10 ring-2 ring-brand/30" : "border-line bg-bg hover:-translate-y-0.5 hover:border-brand/50"
                      }`}
                    >
                      <FileGlyph ext={e} className="h-9 w-7" />
                      <span className="text-[11px] font-semibold uppercase">{e}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
}

function SmallButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold transition hover:border-brand hover:text-brand-fg"
    >
      {children}
    </button>
  );
}

function IconButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full text-sm text-muted transition hover:bg-surface hover:text-ink disabled:opacity-25"
    >
      {children}
    </button>
  );
}
