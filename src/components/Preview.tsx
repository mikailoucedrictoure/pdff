"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fmt } from "@/i18n/locales";
import type { ClientMessages } from "@/i18n/client-messages";
import { fileThumbnails, type Thumbs, zipEntries } from "@/lib/client/thumbnails";
import { extOf } from "@/lib/core/formats";
import { parsePageList, parsePageSet, parseRanges } from "@/lib/core/pages";
import { renamedFiles } from "@/lib/core/rename";
import type { OptionValues } from "@/lib/core/tools";
import { CompareView, FormFiller, parseFormValues } from "./DocTools";
import { FileGlyph } from "./visual/FileGlyph";

type WorkspaceText = ClientMessages["workspace"];

/** Pages affichées au plus par fichier (les suivantes sont résumées par « + N pages »). */
const MAX_PAGES = 24;

/** Zone de caviardage : fichier, page (à partir de 0) et rectangle en fractions de la page. */
export interface Area {
  file: number;
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export function parseAreaList(raw: unknown): Area[] {
  try {
    const list = JSON.parse(String(raw || "[]"));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

interface Tile {
  key: string;
  /** Fichier d'origine (rang dans la liste). */
  file?: number;
  src?: string;
  /** Numéro de la page d'origine (1 = première). */
  page: number;
  faded?: boolean;
  rotate?: number;
  number?: string;
  watermark?: boolean;
  signature?: boolean;
}

interface Group {
  title?: string;
  tiles: Tile[];
  more: number;
}

const WATERMARK_COLORS: Record<string, string> = { gray: "#808080", red: "#cc1a1a", blue: "#1a40bf", black: "#000000" };

/** Vignettes des fichiers déposés, recalculées seulement pour les nouveaux fichiers (ou un nouveau mot de passe). */
function useThumbnails(files: { id: string; file: File }[], password: string) {
  const [thumbs, setThumbs] = useState<Record<string, Thumbs | "loading">>({});
  const done = useRef(new Map<string, string>());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const { id, file } of files) {
        const key = `${id}:${password}`;
        if (done.current.get(id) === key) continue;
        done.current.set(id, key);
        setThumbs((t) => ({ ...t, [id]: "loading" }));
        const result = await fileThumbnails(file, file.name, { max: MAX_PAGES, password }).catch(() => ({ pages: 0, images: [], none: true }) as Thumbs);
        if (cancelled) {
          done.current.delete(id);
          return;
        }
        setThumbs((t) => ({ ...t, [id]: result }));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [files, password]);

  return thumbs;
}

function pagesOf(thumbs: Thumbs, list: number[], extra: (index: number, position: number) => Partial<Tile> = () => ({}), file = 0): Tile[] {
  return list.map((index, position) => ({ key: `${file}-${index}-${position}`, file, src: thumbs.images[index], page: index + 1, ...extra(index, position) }));
}

/** Ce que l'outil va produire, page par page, à partir des réglages en cours. */
function buildGroups(toolId: string, options: OptionValues, files: { name: string; thumbs: Thumbs }[], w: WorkspaceText, templates?: Record<string, string>): Group[] {
  const groups: Group[] = [];
  const multi = files.length > 1;
  for (const [fileIndex, { name, thumbs }] of files.entries()) {
    const total = thumbs.pages;
    const all = Array.from({ length: total }, (_, i) => i);
    const cap = (tiles: Tile[], title?: string): Group => ({ title, tiles: tiles.slice(0, MAX_PAGES), more: Math.max(0, tiles.length - MAX_PAGES) });
    const pages = String(options.pages ?? "");
    switch (toolId) {
      case "diviser": {
        const mode = String(options.mode);
        let parts: number[][];
        if (mode === "each") parts = all.map((i) => [i]);
        else if (mode === "every") {
          const n = Math.max(1, Math.floor(Number(options.every) || 1));
          parts = [];
          for (let i = 0; i < total; i += n) parts.push(all.slice(i, i + n));
        } else parts = parseRanges(String(options.ranges ?? ""), total);
        parts.slice(0, 12).forEach((part, k) => groups.push(cap(pagesOf(thumbs, part), `${multi ? `${name} · ` : ""}${fmt(w.previewFile, { n: k + 1 })}`)));
        if (parts.length > 12) groups.push({ title: `+ ${parts.length - 12}`, tiles: [], more: 0 });
        continue;
      }
      case "extraire": {
        const selected = parsePageSet(pages, total);
        const remove = options.mode === "remove";
        groups.push(cap(pagesOf(thumbs, all, (i) => ({ faded: remove ? selected.has(i) : !selected.has(i) })), multi ? name : undefined));
        continue;
      }
      case "organiser": {
        const order = options.reverse ? [...all].reverse() : parsePageList(String(options.order ?? ""), total);
        groups.push(cap(pagesOf(thumbs, order), multi ? name : undefined));
        continue;
      }
      case "pivoter": {
        const selected = parsePageSet(pages, total);
        groups.push(cap(pagesOf(thumbs, all, (i) => (selected.has(i) ? { rotate: Number(options.angle) || 90 } : {})), multi ? name : undefined));
        continue;
      }
      case "numeroter": {
        const selected = parsePageSet(pages, total);
        const start = Number(options.start) || 0;
        const template = templates?.[String(options.format)] ?? String(options.format ?? "{n}");
        groups.push(
          cap(
            pagesOf(thumbs, all, (i) =>
              selected.has(i) ? { number: template.replaceAll("{n}", String(start + i)).replaceAll("{total}", String(start + total - 1)) } : {},
            ),
            multi ? name : undefined,
          ),
        );
        continue;
      }
      case "signer": {
        const where = String(options.where ?? "last");
        const selected = where === "all" ? new Set(all) : where === "first" ? new Set([0]) : where === "custom" ? parsePageSet(pages, total) : new Set([total - 1]);
        groups.push(cap(pagesOf(thumbs, all, (i) => ({ signature: selected.has(i) && !!options.signature })), multi ? name : undefined));
        continue;
      }
      case "caviarder":
        groups.push(cap(pagesOf(thumbs, all, () => ({}), fileIndex), multi ? name : undefined));
        continue;
      case "filigrane": {
        const selected = parsePageSet(pages, total);
        groups.push(cap(pagesOf(thumbs, all, (i) => ({ watermark: selected.has(i) })), multi ? name : undefined));
        continue;
      }
      default:
        groups.push(cap(pagesOf(thumbs, all), multi || toolId === "fusionner" ? name : undefined));
    }
  }
  return groups;
}

/** Une page miniature, avec l'effet de l'outil dessiné par-dessus. */
const SIGNATURE_WIDTH: Record<string, number> = { small: 0.18, medium: 0.26, large: 0.36 };

function PageTile({ tile, options, areas, onAreas, w }: { tile: Tile; options: OptionValues; areas?: Area[]; onAreas?: (next: Area[]) => void; w?: WorkspaceText }) {
  const [draft, setDraft] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null);
  const editable = !!onAreas && !!areas;
  const here = editable ? areas.filter((a) => a.file === (tile.file ?? 0) && a.page === tile.page - 1) : [];
  const frac = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) };
  };
  const pointer = editable
    ? {
        onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
          if ((e.target as HTMLElement).closest("button")) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          const p = frac(e);
          setDraft({ x0: p.x, y0: p.y, x1: p.x, y1: p.y });
        },
        onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
          if (!draft) return;
          const p = frac(e);
          setDraft({ ...draft, x1: p.x, y1: p.y });
        },
        onPointerUp: () => {
          if (!draft) return;
          const x = Math.min(draft.x0, draft.x1), y = Math.min(draft.y0, draft.y1);
          const width = Math.abs(draft.x1 - draft.x0), height = Math.abs(draft.y1 - draft.y0);
          setDraft(null);
          if (width > 0.01 && height > 0.005) onAreas!([...areas!, { file: tile.file ?? 0, page: tile.page - 1, x, y, w: width, h: height }]);
        },
      }
    : {};
  const sigWidth = (SIGNATURE_WIDTH[String(options.size)] ?? 0.26) * 100;
  const [sv, sh] = String(options.position ?? "bottom-right").split("-");
  const size = Number(options.size) || 10;
  const [vertical, horizontal] = String(options.position ?? "bottom-center").split("-");
  const marginX = (Math.max(18, size * 2) / 595) * 100;
  const marginY = (Math.max(18, size * 2) / 842) * 100;
  const text = String(options.text ?? "");
  const rotation = Number(options.rotation) || 0;
  const rad = (rotation * Math.PI) / 180;
  const fit = Math.min(Math.abs(Math.cos(rad)) > 1e-3 ? (595 * 0.85) / Math.abs(Math.cos(rad)) : Infinity, Math.abs(Math.sin(rad)) > 1e-3 ? (842 * 0.85) / Math.abs(Math.sin(rad)) : Infinity);
  const wmSize = Math.min(Number(options.size) || 60, fit / Math.max(1, text.length * 0.62));
  return (
    <figure className="flex flex-col items-center gap-1">
      <div className="grid aspect-[3/4] w-full place-items-center">
        <div
          className={`relative w-full overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/10 transition-transform duration-300 ${tile.faded ? "opacity-25 grayscale" : ""} ${editable ? "cursor-crosshair touch-none select-none" : ""}`}
          style={{ containerType: "inline-size", transform: tile.rotate ? `rotate(${tile.rotate}deg) scale(${tile.rotate % 180 ? 0.75 : 1})` : undefined }}
          {...pointer}
        >
          {tile.src ? (
            // eslint-disable-next-line @next/next/no-img-element -- vignette générée dans le navigateur
            <img src={tile.src} alt="" className="block w-full" draggable={false} />
          ) : (
            <div className="aspect-[1/1.414] w-full bg-zinc-100" />
          )}
          {tile.number && (
            <span
              className="absolute font-semibold whitespace-nowrap text-zinc-900"
              style={{
                fontSize: `max(7px, ${(size / 595) * 250}cqw)`,
                [vertical === "top" ? "top" : "bottom"]: `${marginY}%`,
                ...(horizontal === "left" ? { left: `${marginX}%` } : horizontal === "right" ? { right: `${marginX}%` } : { left: "50%", transform: "translateX(-50%)" }),
              }}
            >
              {tile.number}
            </span>
          )}
          {tile.watermark && text && (
            <span
              className="absolute top-1/2 left-1/2 font-bold whitespace-nowrap"
              style={{
                fontSize: `${(wmSize / 595) * 100}cqw`,
                color: WATERMARK_COLORS[String(options.color)] ?? "#808080",
                opacity: (Number(options.opacity) || 25) / 100,
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                fontFamily: "Helvetica, Arial, sans-serif",
              }}
            >
              {text}
            </span>
          )}
          {tile.signature && (
            // eslint-disable-next-line @next/next/no-img-element -- signature créée dans le navigateur
            <img
              src={String(options.signature)}
              alt=""
              className="absolute"
              style={{
                width: `${sigWidth}%`,
                [sv === "top" ? "top" : "bottom"]: "5%",
                ...(sh === "left" ? { left: "6%" } : sh === "right" ? { right: "6%" } : { left: `${(100 - sigWidth) / 2}%` }),
              }}
            />
          )}
          {here.map((a, i) => (
            <span key={i} className="absolute bg-black" style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%`, width: `${a.w * 100}%`, height: `${a.h * 100}%` }}>
              <button
                type="button"
                aria-label={w?.areaRemove}
                title={w?.areaRemove}
                onClick={() => onAreas!(areas!.filter((x) => x !== a))}
                className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-danger text-[10px] font-bold text-white shadow"
              >
                ✕
              </button>
            </span>
          ))}
          {draft && (
            <span
              className="absolute border-2 border-danger bg-black/60"
              style={{ left: `${Math.min(draft.x0, draft.x1) * 100}%`, top: `${Math.min(draft.y0, draft.y1) * 100}%`, width: `${Math.abs(draft.x1 - draft.x0) * 100}%`, height: `${Math.abs(draft.y1 - draft.y0) * 100}%` }}
            />
          )}
          {tile.faded && (
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-3xl font-bold text-danger">
              ✕
            </span>
          )}
        </div>
      </div>
      <figcaption className="text-[11px] font-medium text-muted tabular-nums">{tile.page}</figcaption>
    </figure>
  );
}

function TileGrid({ groups, options, w, areas, onAreas }: { groups: Group[]; options: OptionValues; w: WorkspaceText; areas?: Area[]; onAreas?: (next: Area[]) => void }) {
  // Plusieurs fichiers produits (Diviser) : un cadre par fichier, côte à côte
  const split = groups.length > 1 && groups.every((g) => g.title);
  return (
    <div className={split ? "flex flex-wrap gap-3" : "space-y-4"}>
      {groups.map((g, i) => (
        <div key={i} className={split ? "rounded-xl border border-line bg-bg p-2.5" : undefined}>
          {g.title && <p className="mb-2 max-w-60 truncate text-xs font-semibold text-muted" dir="auto">{g.title}</p>}
          {g.tiles.length > 0 && (
            <div className={split ? "flex flex-wrap gap-2 [&>figure]:w-20" : `grid gap-3 ${onAreas ? "grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]" : "grid-cols-[repeat(auto-fill,minmax(7rem,1fr))]"}`}>
              {g.tiles.map((t) => (
                <PageTile key={t.key} tile={t} options={options} areas={areas} onAreas={onAreas} w={w} />
              ))}
              {g.more > 0 && <p className="grid aspect-[3/4] place-items-center rounded-md border border-dashed border-line text-xs font-semibold text-muted">{fmt(w.previewMore, { n: g.more })}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Aperçu des fichiers déposés, avec l'effet de l'outil appliqué en direct. */
export function InputPreview({
  toolId,
  items,
  options,
  templates,
  w,
  onOption,
}: {
  toolId: string;
  items: { id: string; file: File }[];
  options: OptionValues;
  templates?: Record<string, string>;
  w: WorkspaceText;
  /** Modifie un réglage depuis l'aperçu (zones de caviardage tracées sur les pages). */
  onOption?: (name: string, value: string) => void;
}) {
  const password = toolId === "deverrouiller" ? String(options.password ?? "") : "";
  const thumbs = useThumbnails(items, password);

  if (toolId === "remplir" && items[0]) {
    return (
      <Panel title={w.formFields}>
        <FormFiller file={items[0].file} values={parseFormValues(options.values)} onValues={(v) => onOption?.("values", JSON.stringify(v))} w={w} />
      </Panel>
    );
  }
  if (toolId === "comparer") {
    return (
      <Panel title={w.previewTitle}>
        <CompareView files={items.map((i) => i.file)} ignoreCase={!!options.ignoreCase} w={w} />
      </Panel>
    );
  }

  if (toolId === "renommer") {
    const names = renamedFiles(
      items.map((i) => i.file.name),
      String(options.name ?? ""),
      String(options.ext ?? ""),
    );
    return (
      <Panel title={w.previewTitle}>
        <ol className="space-y-1.5 text-sm">
          {items.map((it, i) => (
            <li key={it.id} className="flex min-w-0 flex-wrap items-center gap-x-2" dir="auto">
              <span className="truncate text-muted line-through decoration-muted/50">{it.file.name}</span>
              <span aria-hidden="true">→</span>
              <span className="truncate font-semibold">{names[i]}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted">{w.localOnly}</p>
      </Panel>
    );
  }

  const ready = items.map((it) => ({ name: it.file.name, state: thumbs[it.id] }));
  const loading = ready.some((r) => !r.state || r.state === "loading");
  const locked = ready.some((r) => typeof r.state === "object" && r.state.locked);
  const files = ready.filter((r): r is { name: string; state: Thumbs } => typeof r.state === "object" && r.state.pages > 0).map((r) => ({ name: r.name, thumbs: r.state }));
  const unknown = ready.filter((r) => typeof r.state === "object" && r.state.none);

  let groups: Group[] = [];
  let invalid = false;
  try {
    groups = buildGroups(toolId, options, files, w, templates);
  } catch {
    invalid = true;
  }

  return (
    <Panel title={w.previewTitle}>
      {invalid ? (
        <p className="text-sm text-warn-ink">{w.previewInvalid}</p>
      ) : toolId === "caviarder" && onOption ? (
        <>
          <p className="mb-3 text-sm text-muted">{w.areaHint}</p>
          <TileGrid groups={groups} options={options} w={w} areas={parseAreaList(options.areas)} onAreas={(next) => onOption("areas", JSON.stringify(next))} />
        </>
      ) : (
        <TileGrid groups={groups} options={options} w={w} />
      )}
      {unknown.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {unknown.map((u, i) => (
            <li key={i} className="flex items-center gap-2 rounded-lg bg-bg px-2 py-1 text-xs text-muted" dir="auto">
              <FileGlyph ext={extOf(u.name)} className="h-6 w-5" />
              {u.name} — {w.previewNone}
            </li>
          ))}
        </ul>
      )}
      {locked && <p className="mt-3 text-sm text-muted">{w.previewLocked}</p>}
      {loading && <p className="mt-3 text-sm text-muted">{w.previewLoading}</p>}
    </Panel>
  );
}

/** Aperçu du fichier produit (PDF, image ou archive ZIP). */
export function ResultPreview({ url, name, w }: { url: string; name: string; w: WorkspaceText }) {
  const [state, setState] = useState<
    | { kind: "loading" }
    | { kind: "pages"; thumbs: Thumbs }
    | { kind: "zip"; total: number; entries: { name: string; size: number; thumbs: Thumbs }[] }
    | { kind: "none" }
  >({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const blob = await (await fetch(url)).blob();
        if (extOf(name) === "zip") {
          const zip = await zipEntries(blob);
          if (!cancelled) setState({ kind: "zip", ...zip });
        } else {
          const thumbs = await fileThumbnails(blob, name, { max: MAX_PAGES });
          if (!cancelled) setState(thumbs.pages > 0 ? { kind: "pages", thumbs } : { kind: "none" });
        }
      } catch {
        if (!cancelled) setState({ kind: "none" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url, name]);

  const groups = useMemo<Group[]>(
    () =>
      state.kind === "pages"
        ? [{ tiles: state.thumbs.images.map((src, i) => ({ key: String(i), src, page: i + 1 })), more: Math.max(0, state.thumbs.pages - state.thumbs.images.length) }]
        : [],
    [state],
  );

  return (
    <Panel title={w.previewResult}>
      {state.kind === "loading" && <p className="text-sm text-muted">{w.previewLoading}</p>}
      {state.kind === "none" && (
        <p className="flex items-center gap-2 text-sm text-muted" dir="auto">
          <FileGlyph ext={extOf(name)} className="h-8 w-6" /> {name} — {w.previewNone}
        </p>
      )}
      {state.kind === "pages" && <TileGrid groups={groups} options={{}} w={w} />}
      {state.kind === "zip" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-3">
          {state.entries.map((e) => (
            <figure key={e.name} className="flex min-w-0 flex-col items-center gap-1">
              {e.thumbs.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element -- vignette générée dans le navigateur
                <img src={e.thumbs.images[0]} alt="" className="w-full rounded-md bg-white shadow-sm ring-1 ring-black/10" />
              ) : (
                <FileGlyph ext={extOf(e.name)} className="h-16 w-12" />
              )}
              <figcaption className="w-full truncate text-center text-[11px] text-muted" title={e.name} dir="auto">
                {e.name}
              </figcaption>
            </figure>
          ))}
          {state.total > state.entries.length && (
            <p className="grid place-items-center rounded-md border border-dashed border-line text-xs font-semibold text-muted">+ {state.total - state.entries.length}</p>
          )}
        </div>
      )}
    </Panel>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="mt-4 rounded-2xl border border-line bg-surface p-4">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}
