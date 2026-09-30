import { PDFDocument, StandardFonts } from "pdf-lib";
import sharp from "sharp";
import type { FileData } from "@/lib/server/types";

/** PDF de test : une page par texte donné. */
export async function makePdf(name: string, pages: string[]): Promise<FileData> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (const text of pages) doc.addPage([400, 300]).drawText(text, { x: 40, y: 150, size: 24, font });
  return { name, data: await doc.save() };
}

export async function makePng(name: string, width = 64, height = 48): Promise<FileData> {
  const data = await sharp({ create: { width, height, channels: 3, background: { r: 109, g: 92, b: 255 } } })
    .png()
    .toBuffer();
  return { name, data: new Uint8Array(data) };
}

export async function pageCount(file: FileData): Promise<number> {
  return (await PDFDocument.load(file.data, { ignoreEncryption: true })).getPageCount();
}

export const isPdf = (file: FileData) => Buffer.from(file.data.subarray(0, 5)).toString() === "%PDF-";
