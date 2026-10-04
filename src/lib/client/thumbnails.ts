/**
 * Vignettes des pages, calculées dans le navigateur : rien n'est envoyé pour l'aperçu.
 * PDF : pdf.js (chargé seulement quand un PDF est déposé). Images : affichées telles quelles.
 */
import { canonicalExt, extOf } from "@/lib/core/formats";

export interface Thumbs {
  /** Nombre total de pages (1 pour une image, 0 si inconnu). */
  pages: number;
  /** Vignettes des premières pages (adresses d'images). */
  images: string[];
  /** PDF protégé par un mot de passe absent ou faux. */
  locked?: boolean;
  /** Format sans aperçu (Word, Excel… avant conversion). */
  none?: boolean;
}

const IMAGE_EXTS = new Set(["jpg", "png", "webp", "gif", "avif", "bmp", "svg"]);

type PdfJs = typeof import("pdfjs-dist");
let loader: Promise<PdfJs> | null = null;

export function loadPdfJs(): Promise<PdfJs> {
  loader ??= import("pdfjs-dist").then((pdfjs) => {
    // Le décodage tourne dans un fil séparé : la page reste fluide pendant le rendu
    pdfjs.GlobalWorkerOptions.workerPort = new Worker(new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url), { type: "module" });
    return pdfjs;
  });
  return loader;
}

/** Vignettes des `max` premières pages d'un PDF, larges de `width` pixels (doublés pour les écrans nets). */
export async function pdfThumbnails(data: ArrayBuffer, { max = 24, width = 150, password }: { max?: number; width?: number; password?: string } = {}): Promise<Thumbs> {
  const pdfjs = await loadPdfJs();
  const task = pdfjs.getDocument({ data: new Uint8Array(data.slice(0)), password: password || undefined });
  let doc;
  try {
    doc = await task.promise;
  } catch (err) {
    if ((err as { name?: string })?.name === "PasswordException") return { pages: 0, images: [], locked: true };
    throw err;
  }
  try {
    const images: string[] = [];
    for (let i = 1; i <= Math.min(doc.numPages, max); i++) {
      const page = await doc.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: (width * 2) / base.width });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      await page.render({ canvas, viewport }).promise;
      images.push(canvas.toDataURL("image/jpeg", 0.8));
      page.cleanup();
    }
    return { pages: doc.numPages, images };
  } finally {
    void task.destroy();
  }
}

/** Vignettes d'un fichier déposé, quel que soit son format. */
export async function fileThumbnails(file: Blob, name: string, opts: { max?: number; password?: string } = {}): Promise<Thumbs> {
  const ext = canonicalExt(extOf(name));
  if (ext === "pdf") return pdfThumbnails(await file.arrayBuffer(), opts);
  if (IMAGE_EXTS.has(ext)) return { pages: 1, images: [URL.createObjectURL(file)] };
  return { pages: 0, images: [], none: true };
}

/** Contenu d'une archive ZIP produite par pdffusion : nom, poids et vignette de chaque fichier. */
export async function zipEntries(zip: Blob, max = 12): Promise<{ total: number; entries: { name: string; size: number; thumbs: Thumbs }[] }> {
  const { default: JSZip } = await import("jszip");
  const archive = await JSZip.loadAsync(await zip.arrayBuffer());
  const files = Object.values(archive.files).filter((f) => !f.dir);
  const entries = [];
  for (const f of files.slice(0, max)) {
    const blob = await f.async("blob");
    entries.push({ name: f.name, size: blob.size, thumbs: await fileThumbnails(blob, f.name, { max: 1 }).catch(() => ({ pages: 0, images: [], none: true })) });
  }
  return { total: files.length, entries };
}
