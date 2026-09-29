/**
 * Moteur images : conversions entre formats (sharp / libvips) et
 * assemblage d'images en PDF (pdf-lib) sans recompression quand c'est possible.
 */
import sharp, { type Metadata } from "sharp";
import { PDFDocument } from "pdf-lib";
import { limits } from "@/config/limits";
import { baseName, canonicalExt, extOf } from "@/lib/core/formats";
import { type FileData, UserError } from "../types";

sharp.cache(false);

/** Résolution utilisée quand l'image ne précise pas sa densité. */
const DEFAULT_DPI = 96;

function input(file: FileData, page?: number) {
  const ext = canonicalExt(extOf(file.name));
  return sharp(file.data, {
    density: ext === "svg" ? 300 : undefined,
    page,
    limitInputPixels: false,
    failOn: "none",
  });
}

export async function convertImage(file: FileData, target: string, quality: number): Promise<FileData> {
  const q = Math.max(1, Math.min(100, Math.round(quality)));
  let img = input(file).rotate(); // applique l'orientation EXIF
  switch (target) {
    case "jpg":
      img = img.flatten({ background: "#ffffff" }).jpeg({ quality: q, mozjpeg: true, chromaSubsampling: q >= 90 ? "4:4:4" : "4:2:0" });
      break;
    case "png":
      img = img.png({ compressionLevel: 9 });
      break;
    case "webp":
      img = img.webp({ quality: q });
      break;
    case "avif":
      img = img.avif({ quality: q });
      break;
    case "tiff":
      img = img.tiff({ compression: "lzw" });
      break;
    case "gif":
      img = img.gif();
      break;
    default:
      throw new UserError("imageFormat", { format: target });
  }
  try {
    const data = await img.toBuffer();
    return { name: `${baseName(file.name)}.${target}`, data: new Uint8Array(data) };
  } catch {
    throw new UserError("imageConvert", { name: file.name });
  }
}

async function bmpToPng(file: FileData): Promise<Uint8Array> {
  const m = await import("mupdf");
  const image = new m.Image(file.data);
  const png = image.toPixmap().asPNG();
  return new Uint8Array(png);
}

/**
 * Ajoute une image (toutes les pages s'il s'agit d'un TIFF multipage) à `pdf`.
 * Les JPG et PNG sont intégrés tels quels (aucune perte de qualité).
 */
export async function appendImage(pdf: PDFDocument, file: FileData): Promise<void> {
  const ext = canonicalExt(extOf(file.name));

  if (ext === "bmp") {
    const png = await bmpToPng(file);
    const embedded = await pdf.embedPng(png);
    const meta = await sharp(png).metadata();
    addImagePage(pdf, embedded, meta.width!, meta.height!, DEFAULT_DPI);
    return;
  }

  let meta: Metadata;
  try {
    meta = await input(file).metadata();
  } catch {
    throw new UserError("imageUnreadable", { name: file.name });
  }
  const pages = ext === "tiff" ? meta.pages ?? 1 : 1;
  if (pdf.getPageCount() + pages > limits.maxPages) {
    throw new UserError("pageLimit", { max: limits.maxPages });
  }

  for (let p = 0; p < pages; p++) {
    const orientation = meta.orientation ?? 1;
    let embedded;
    if (ext === "jpg" && orientation === 1) {
      embedded = await pdf.embedJpg(file.data);
    } else if (ext === "png") {
      embedded = await pdf.embedPng(file.data);
    } else if (ext === "jpg") {
      const data = await input(file).rotate().jpeg({ quality: 95, chromaSubsampling: "4:4:4" }).toBuffer();
      embedded = await pdf.embedJpg(data);
    } else {
      const data = await input(file, pages > 1 ? p : undefined).rotate().png().toBuffer();
      embedded = await pdf.embedPng(data);
    }
    addImagePage(pdf, embedded, embedded.width, embedded.height, meta.density || DEFAULT_DPI);
  }
}

function addImagePage(
  pdf: PDFDocument,
  image: Awaited<ReturnType<PDFDocument["embedPng"]>>,
  widthPx: number,
  heightPx: number,
  dpi: number,
) {
  const w = (widthPx * 72) / dpi;
  const h = (heightPx * 72) / dpi;
  const page = pdf.addPage([w, h]);
  page.drawImage(image, { x: 0, y: 0, width: w, height: h });
}

export async function imagesToPdf(file: FileData): Promise<FileData> {
  const pdf = await PDFDocument.create();
  await appendImage(pdf, file);
  return { name: `${baseName(file.name)}.pdf`, data: await pdf.save() };
}
