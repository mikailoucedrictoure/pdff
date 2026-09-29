"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/locales";
import type { Messages } from "@/i18n/messages/fr";
import { ALL_EXTENSIONS, canonicalExt, extOf, FORMATS, type FormatCategory } from "@/lib/core/formats";
import { commonTargets, findPath, supportedInputs, type EngineId } from "@/lib/core/graph";
import { defaultOptions, getTool, type OptionValues, type ToolOption } from "@/lib/core/tools";
import { useCapabilities } from "./useCapabilities";
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
  | { kind: "done"; url: string; name: string; size: number; count: number; seconds: number }
  | { kind: "error"; message: string };

/** Textes d'une option d'outil (voir `tools.<id>.options` dans les traductions). */
interface OptionText {
  label: string;
  help?: string;
  placeholder?: string;
  default?: string;
  choices?: Record<string, string>;
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

function filenameFrom(header: string | null, fallback: string): string {
  if (!header) return fallback;
  const star = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (star) return decodeURIComponent(star[1]);
  const plain = /filename="([^"]+)"/i.exec(header);
  return plain?.[1] ?? fallback;
}

let uid = 0;
const newId = () => `f${++uid}-${Date.now()}`;

export function Workspace({ toolId }: { toolId: string }) {
  const tool = getTool(toolId)!;
  const caps = useCapabilities();
  const { messages: m, locale } = useI18n();
  const w = m.workspace;
  const toolText = m.tools[tool.id];
  const optionTexts = toolText.options as Record<string, OptionText>;
  const optText = (name: string): OptionText => optionTexts[name] ?? { label: name };

  const engines = useMemo(() => new Set<EngineId>(caps?.engines ?? []), [caps]);

  const [items, setItems] = useState<Item[]>([]);
  const [options, setOptions] = useState<OptionValues>(() =>
    defaultOptions(tool, Object.fromEntries(Object.entries(optionTexts).map(([k, v]) => [k, v.default]))),
  );
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [rejected, setRejected] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const acceptedExts = useMemo(() => {
    if (tool.accepts === "pdf") return ["pdf"];
    if (!caps) return ALL_EXTENSIONS;
    const inputs = new Set(supportedInputs(engines).concat("pdf"));
    return ALL_EXTENSIONS.filter((e) => inputs.has(canonicalExt(e)));
  }, [tool.accepts, caps, engines]);

  const busy = status.kind === "uploading" || status.kind === "processing";
  const maxFiles = Math.min(tool.maxFiles ?? Infinity, caps?.limits.maxFiles ?? Infinity);
  const size = (bytes: number) => formatSize(bytes, locale);

  // Libère l'URL du résultat précédent
  useEffect(() => {
    return () => {
      if (status.kind === "done") URL.revokeObjectURL(status.url);
    };
  }, [status]);

  function addFiles(list: FileList | File[]) {
    const accepted: Item[] = [];
    const refused: string[] = [];
    for (const file of Array.from(list)) {
      if (acceptedExts.includes(extOf(file.name))) accepted.push({ id: newId(), file });
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

  const approximate = !!target && exts.some((e) => findPath(e, target, engines)?.some((s) => s.approximate));

  function visible(opt: ToolOption) {
    if (!opt.showIf) return true;
    return opt.showIf.in.includes(String(options[opt.showIf.name] ?? ""));
  }

  function run() {
    if (!items.length || busy) return;
    const form = new FormData();
    items.forEach((i) => form.append("files", i.file, i.file.name));
    form.append("options", JSON.stringify({ ...options, target }));

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    const started = performance.now();
    xhr.open("POST", `/api/tools/${tool.id}?lang=${encodeURIComponent(locale)}`);
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
        let message = w.errorGeneric;
        try {
          message = JSON.parse(await blob.text()).error ?? message;
        } catch {}
        setStatus({ kind: "error", message });
        return;
      }
      const name = filenameFrom(xhr.getResponseHeader("Content-Disposition"), "pdff");
      const url = URL.createObjectURL(blob);
      setStatus({
        kind: "done",
        url,
        name,
        size: blob.size,
        count: Number(xhr.getResponseHeader("X-Pdff-Count") ?? 1),
        seconds: (performance.now() - started) / 1000,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
    };
    setStatus({ kind: "uploading", progress: 0 });
    xhr.send(form);
  }

  function reset() {
    setItems([]);
    setRejected([]);
    setStatus({ kind: "idle" });
  }

  const totalSize = items.reduce((n, i) => n + i.file.size, 0);
  const canRun = items.length >= tool.minFiles && !busy && (!tool.options.some((o) => o.type === "target") || !!target);
  const emptyDecor = tool.accepts === "pdf" ? ["pdf", "pdf", "pdf"] : ["docx", "pdf", "xlsx", "pptx", "jpg"];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
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
            accept={acceptedExts.map((e) => `.${e}`).join(",")}
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
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line py-3.5 text-sm font-semibold text-muted transition hover:border-brand hover:text-brand"
                >
                  <span className="text-lg leading-none">+</span> {w.addMore}
                </button>
              )}
            </>
          )}
        </div>

        {rejected.length > 0 && (
          <p className="mt-3 rounded-2xl bg-warn-soft px-4 py-3 text-sm text-warn-ink">{fmt(w.rejected, { files: rejected.join(", ") })}</p>
        )}
      </section>

      {/* Options et action */}
      <aside className="h-fit rounded-[2rem] border border-line bg-surface p-5 sm:p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
            <ToolIcon id={tool.id} className="h-5 w-5" />
          </span>
          <h2 className="font-display text-xl font-bold">{w.settings}</h2>
        </div>

        {tool.options.length > 0 ? (
          <div className="mt-5 space-y-4">
            {tool.options.filter(visible).map((opt) => (
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
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">{w.noSettings}</p>
        )}

        {approximate && <p className="mt-4 rounded-xl bg-warn-soft px-3 py-2.5 text-xs text-warn-ink">{w.approximate}</p>}

        <RunButton label={toolText.name} busy={busy} disabled={!canRun} onClick={run} w={w} className="mt-6 hidden lg:flex" />

        <StatusPanel status={status} onCancel={() => xhrRef.current?.abort()} onReset={reset} w={w} size={size} />

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
}: {
  status: Status;
  onCancel: () => void;
  onReset: () => void;
  w: WorkspaceText;
  size: (bytes: number) => string;
}) {
  if (status.kind === "idle") return null;
  if (status.kind === "uploading" || status.kind === "processing") {
    const pct = status.kind === "uploading" ? Math.round(status.progress * 100) : 100;
    return (
      <div className="mt-4">
        <div className="h-2.5 overflow-hidden rounded-full bg-bg">
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
    return <p className="pop mt-4 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">{status.message}</p>;
  }
  const seconds = status.seconds.toFixed(1);
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
    "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15 sm:text-sm";

  switch (option.type) {
    case "checkbox":
      return (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-bg px-3.5 py-3 text-sm">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
          {text.label}
        </label>
      );
    case "select":
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
        </label>
      );
  }
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
      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold transition hover:border-brand hover:text-brand"
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
