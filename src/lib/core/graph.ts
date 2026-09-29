/**
 * Graphe de conversion.
 *
 * Chaque arête décrit une conversion directe réalisée par un moteur.
 * Les conversions indirectes (ex. DOCX → PNG = DOCX → PDF → PNG) sont
 * trouvées automatiquement par recherche du plus court chemin.
 *
 * Pour ajouter une conversion : ajouter une arête. L'interface et l'API
 * la proposent immédiatement.
 */
import { canonicalExt } from "./formats";

export type EngineId =
  | "sharp" // image → image
  | "images-to-pdf" // image → PDF (pdf-lib, sans perte pour JPG/PNG)
  | "mupdf-to-pdf" // EPUB, XPS, CBZ, FB2, MOBI, BMP, TXT, HTML… → PDF
  | "mupdf-render" // PDF → images (une par page)
  | "mupdf-text" // PDF → TXT / HTML
  | "office" // LibreOffice : Word, Excel, PowerPoint, OpenDocument…
  | "office-pdf-import"; // PDF → Word / PowerPoint (LibreOffice, fidélité variable)

export interface Edge {
  engine: EngineId;
  from: string[];
  to: string[];
  /** Plus le coût est bas, plus le chemin est privilégié. */
  cost: number;
  /** Conversion dont la fidélité dépend fortement du document source. */
  approximate?: boolean;
}

const RASTER_IN = ["jpg", "png", "webp", "avif", "tiff", "gif", "svg"];
const RASTER_OUT = ["jpg", "png", "webp", "avif", "tiff", "gif"];
const WORD = ["docx", "doc", "odt", "rtf", "txt", "html"];
const SHEET = ["xlsx", "xls", "ods", "csv"];
const SLIDES = ["pptx", "ppt", "odp"];

export const EDGES: Edge[] = [
  { engine: "sharp", from: RASTER_IN, to: RASTER_OUT, cost: 1 },
  { engine: "images-to-pdf", from: [...RASTER_IN, "bmp"], to: ["pdf"], cost: 1 },
  { engine: "mupdf-to-pdf", from: ["epub", "xps", "cbz", "fb2", "mobi", "bmp"], to: ["pdf"], cost: 1 },
  { engine: "mupdf-render", from: ["pdf"], to: ["png", "jpg"], cost: 1 },
  { engine: "mupdf-text", from: ["pdf"], to: ["txt", "html"], cost: 1 },
  // Secours sans LibreOffice : MuPDF sait mettre en page du texte brut et du HTML.
  { engine: "mupdf-to-pdf", from: ["txt", "md", "csv", "html"], to: ["pdf"], cost: 4 },
  { engine: "office", from: WORD, to: ["pdf", "docx", "doc", "odt", "rtf", "txt", "html"], cost: 1 },
  { engine: "office", from: ["md"], to: ["pdf", "docx", "odt"], cost: 1 },
  { engine: "office", from: SHEET, to: ["pdf", "xlsx", "xls", "ods", "csv", "html"], cost: 1 },
  { engine: "office", from: SLIDES, to: ["pdf", "pptx", "ppt", "odp"], cost: 1 },
  { engine: "office-pdf-import", from: ["pdf"], to: ["docx", "odt", "rtf"], cost: 3, approximate: true },
  { engine: "office-pdf-import", from: ["pdf"], to: ["pptx", "odp"], cost: 3, approximate: true },
];

export interface Step {
  engine: EngineId;
  from: string;
  to: string;
  approximate: boolean;
}

const MAX_HOPS = 3;

/** Plus court chemin de `fromExt` vers `toExt` avec les moteurs disponibles. */
export function findPath(fromExt: string, toExt: string, engines: ReadonlySet<EngineId>): Step[] | null {
  const from = canonicalExt(fromExt);
  const to = canonicalExt(toExt);
  if (from === to) return [];

  const best = new Map<string, { cost: number; path: Step[] }>([[from, { cost: 0, path: [] }]]);
  const queue: string[] = [from];

  while (queue.length) {
    queue.sort((a, b) => best.get(a)!.cost - best.get(b)!.cost);
    const node = queue.shift()!;
    const current = best.get(node)!;
    if (node === to) return current.path;
    if (current.path.length >= MAX_HOPS) continue;

    for (const edge of EDGES) {
      if (!engines.has(edge.engine) || !edge.from.includes(node)) continue;
      for (const next of edge.to) {
        if (next === node) continue;
        const cost = current.cost + edge.cost;
        const known = best.get(next);
        if (known && known.cost <= cost) continue;
        best.set(next, {
          cost,
          path: [...current.path, { engine: edge.engine, from: node, to: next, approximate: !!edge.approximate }],
        });
        if (!queue.includes(next)) queue.push(next);
      }
    }
  }
  return null;
}

/** Tous les formats atteignables depuis `fromExt`. */
export function targetsFor(fromExt: string, engines: ReadonlySet<EngineId>): string[] {
  const from = canonicalExt(fromExt);
  const all = new Set(EDGES.flatMap((e) => e.to));
  return [...all].filter((t) => t !== from && findPath(from, t, engines) !== null).sort();
}

/** Formats cibles communs à tous les fichiers donnés. */
export function commonTargets(exts: string[], engines: ReadonlySet<EngineId>): string[] {
  if (!exts.length) return [];
  const sets = exts.map((e) => new Set(targetsFor(e, engines)));
  return [...sets[0]].filter((t) => sets.every((s) => s.has(t)));
}

/** Tous les formats d'entrée pris en charge. */
export function supportedInputs(engines: ReadonlySet<EngineId>): string[] {
  return [...new Set(EDGES.filter((e) => engines.has(e.engine)).flatMap((e) => e.from))].sort();
}

export const ALL_ENGINES: EngineId[] = [
  "sharp",
  "images-to-pdf",
  "mupdf-to-pdf",
  "mupdf-render",
  "mupdf-text",
  "office",
  "office-pdf-import",
];
