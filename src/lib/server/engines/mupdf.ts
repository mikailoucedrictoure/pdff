/**
 * Moteur MuPDF (WebAssembly) : rendu haute fidélité, extraction de texte,
 * conversion EPUB/XPS/CBZ… → PDF, réparation, chiffrement.
 */
import type * as MuPDF from "mupdf";
import { limits } from "@/config/limits";
import { baseName, extOf, mimeOf } from "@/lib/core/formats";
import { type FileData, UserError } from "../types";

let modulePromise: Promise<typeof MuPDF> | null = null;
function mupdf(): Promise<typeof MuPDF> {
  modulePromise ??= import("mupdf");
  return modulePromise;
}

const A4: [number, number] = [595, 842];

function pad(n: number, total: number): string {
  return String(n).padStart(String(total).length, "0");
}

function assertPageLimit(count: number) {
  if (count > limits.maxPages) {
    throw new UserError("pageLimitDocument", { count, max: limits.maxPages });
  }
}

async function open(file: FileData, password?: string) {
  const m = await mupdf();
  let doc: MuPDF.Document;
  try {
    const ext = extOf(file.name);
    const magic = ext === "md" || ext === "csv" ? "text/plain" : mimeOf(ext);
    doc = m.Document.openDocument(file.data, magic);
  } catch {
    throw new UserError("unreadable", { name: file.name });
  }
  if (doc.needsPassword()) {
    if (!password || !doc.authenticatePassword(password)) {
      throw new UserError(password ? "wrongPassword" : "passwordProtected", { name: file.name });
    }
  }
  return { m, doc };
}

/** PDF → une image par page. */
export async function renderPages(
  file: FileData,
  format: "png" | "jpg",
  dpi: number,
  quality: number,
): Promise<FileData[]> {
  const { m, doc } = await open(file);
  const count = doc.countPages();
  assertPageLimit(count);
  const scale = Math.max(36, Math.min(600, dpi)) / 72;
  const out: FileData[] = [];
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    const pixmap = page.toPixmap(m.Matrix.scale(scale, scale), m.ColorSpace.DeviceRGB, false, true);
    const data = format === "png" ? pixmap.asPNG() : pixmap.asJPEG(Math.max(1, Math.min(100, quality)), false);
    out.push({ name: `${baseName(file.name)}-page-${pad(i + 1, count)}.${format}`, data: new Uint8Array(data) });
    pixmap.destroy();
    page.destroy();
  }
  doc.destroy();
  return out;
}

/** PDF → texte brut ou HTML. */
export async function extractText(file: FileData, format: "txt" | "html"): Promise<FileData> {
  const { doc } = await open(file);
  const count = doc.countPages();
  assertPageLimit(count);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    const text = page.toStructuredText("preserve-whitespace,preserve-images");
    parts.push(format === "txt" ? text.asText() : text.asHTML(i));
    text.destroy();
    page.destroy();
  }
  doc.destroy();
  const title = baseName(file.name).replace(/[<>&]/g, "");
  const body =
    format === "txt"
      ? parts.join("\n\f\n")
      : `<!DOCTYPE html>\n<html lang="fr"><head><meta charset="utf-8"><title>${title}</title>` +
        `<style>body{background:#e5e7eb;margin:0;padding:24px}body>div{background:#fff;margin:0 auto 24px;box-shadow:0 1px 4px #0003;position:relative}</style>` +
        `</head><body>\n${parts.join("\n")}\n</body></html>`;
  return { name: `${baseName(file.name)}.${format}`, data: new TextEncoder().encode(body) };
}

/** Tout document lisible par MuPDF (EPUB, XPS, CBZ, FB2, MOBI, BMP…) → PDF. */
export async function toPdf(file: FileData): Promise<FileData> {
  const { m, doc } = await open(file);
  try {
    doc.layout(A4[0], A4[1], 11);
  } catch {
    // documents non reflowables : mise en page fixe
  }
  const count = doc.countPages();
  assertPageLimit(count);
  const buffer = new m.Buffer();
  const writer = new m.DocumentWriter(buffer, "pdf", "compress");
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    const bounds = page.getBounds();
    const device = writer.beginPage(bounds);
    page.run(device, m.Matrix.identity);
    writer.endPage();
    page.destroy();
  }
  writer.close();
  doc.destroy();
  return { name: `${baseName(file.name)}.pdf`, data: new Uint8Array(buffer.asUint8Array()) };
}

/** Réécrit un PDF via MuPDF (réparation, nettoyage, compression, chiffrement). */
export async function rewritePdf(file: FileData, options: string, password?: string): Promise<Uint8Array> {
  const { doc } = await open(file, password);
  const pdf = doc.asPDF();
  if (!pdf) throw new UserError("notPdf", { name: file.name });
  const out = new Uint8Array(pdf.saveToBuffer(options).asUint8Array());
  doc.destroy();
  return out;
}

/** Retire le chiffrement (mot de passe requis s'il y a un mot de passe d'ouverture). */
export function decrypt(file: FileData, password?: string): Promise<Uint8Array> {
  return rewritePdf(file, "encrypt=none,garbage=1", password);
}

export interface EncryptOptions {
  userPassword: string;
  ownerPassword: string;
  noPrint: boolean;
  noCopy: boolean;
  noEdit: boolean;
}

export function encrypt(file: FileData, o: EncryptOptions): Promise<Uint8Array> {
  // Bits de permission PDF (ISO 32000-1, table 22)
  let permissions = -1;
  if (o.noPrint) permissions &= ~(4 | 2048);
  if (o.noEdit) permissions &= ~(8 | 32 | 256 | 1024);
  if (o.noCopy) permissions &= ~(16 | 512);
  // Les options MuPDF sont séparées par des virgules : on les refuse dans les mots de passe.
  if (/,/.test(o.userPassword) || /,/.test(o.ownerPassword)) {
    throw new UserError("passwordComma");
  }
  return rewritePdf(
    file,
    `encrypt=aes-256,user-password=${o.userPassword},owner-password=${o.ownerPassword},permissions=${permissions},garbage=1`,
  );
}

/** Informations repérées automatiquement pour le caviardage. */
export const REDACT_PATTERNS = {
  email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
  phone: /(?:\+|00)?\d(?:[\s.\-()]*\d){7,14}/g,
  iban: /\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]){10,30}\b/g,
  date: /\b\d{1,4}[/.-]\d{1,2}[/.-]\d{1,4}\b/g,
  number: /\b\d(?:[\s-]?\d){5,}\b/g,
} as const;
export type RedactPattern = keyof typeof REDACT_PATTERNS;

export interface RedactOptions {
  /** Mots ou expressions à faire disparaître (sans tenir compte des majuscules). */
  terms: string[];
  patterns: RedactPattern[];
  /** Zones tracées par l'utilisateur, en fractions de la page affichée (0 à 1). */
  areas: { file?: number; page: number; x: number; y: number; w: number; h: number }[];
}

/**
 * Caviardage réel : le texte, les morceaux d'image et les tracés situés sous chaque zone sont
 * supprimés du fichier (pas seulement recouverts), puis un rectangle noir est dessiné à leur place.
 */
export async function redact(file: FileData, o: RedactOptions): Promise<{ data: Uint8Array; count: number }> {
  const { m, doc } = await open(file);
  const pdf = doc.asPDF();
  if (!pdf) throw new UserError("notPdf", { name: file.name });
  const total = pdf.countPages();
  assertPageLimit(total);
  let count = 0;
  for (let i = 0; i < total; i++) {
    const page = pdf.loadPage(i) as MuPDF.PDFPage;
    const zones: MuPDF.Quad[][] = [];
    // Mots demandés (sans tenir compte des majuscules ni des espaces multiples) et informations repérées
    const regexes = [
      ...o.terms.map((t) => new RegExp(escapeRegExp(t).replace(/\s+/g, "\\s+"), "giu")),
      ...o.patterns.map((p) => new RegExp(REDACT_PATTERNS[p])),
    ];
    if (regexes.length) zones.push(...matchQuads(page, regexes));
    const [x0, y0, x1, y1] = page.getBounds();
    for (const a of o.areas.filter((a) => a.page === i)) {
      const rx0 = x0 + a.x * (x1 - x0);
      const ry0 = y0 + a.y * (y1 - y0);
      const rx1 = rx0 + a.w * (x1 - x0);
      const ry1 = ry0 + a.h * (y1 - y0);
      zones.push([[rx0, ry0, rx1, ry0, rx0, ry1, rx1, ry1]]);
    }
    for (const quads of zones) {
      const annot = page.createAnnotation("Redact");
      annot.setQuadPoints(quads);
      count++;
    }
    if (zones.length) page.applyRedactions(true, m.PDFPage.REDACT_IMAGE_PIXELS, m.PDFPage.REDACT_LINE_ART_REMOVE_IF_COVERED, m.PDFPage.REDACT_TEXT_REMOVE);
    page.destroy();
  }
  const data = new Uint8Array(pdf.saveToBuffer("garbage=4,compress").asUint8Array());
  doc.destroy();
  return { data, count };
}

/** Un texte cherché tel quel (les caractères spéciaux des expressions régulières sont neutralisés). */
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Repère des mots, adresses, numéros… dans le texte d'une page et renvoie leurs contours. */
function matchQuads(page: MuPDF.PDFPage, regexes: RegExp[]): MuPDF.Quad[][] {
  const stext = page.toStructuredText("preserve-whitespace");
  let text = "";
  const quads: (MuPDF.Quad | null)[] = [];
  stext.walk({
    onChar(c, _origin, _font, _size, quad) {
      text += c;
      for (let k = 0; k < c.length; k++) quads.push(quad);
    },
    endLine() {
      text += "\n";
      quads.push(null);
    },
  });
  stext.destroy();
  const out: MuPDF.Quad[][] = [];
  for (const re of regexes) {
    for (const match of text.matchAll(re)) {
      const hit = quads.slice(match.index, match.index + match[0].length).filter((q): q is MuPDF.Quad => !!q);
      if (hit.length) out.push(hit);
    }
  }
  return out;
}
