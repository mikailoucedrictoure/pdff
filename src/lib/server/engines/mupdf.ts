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
