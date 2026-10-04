/**
 * OCR dans le navigateur (tesseract.js) : le document n'est jamais envoyé.
 * Seul le modèle de la langue choisie est téléchargé, une fois, puis gardé en cache par le navigateur.
 */
import { baseName, canonicalExt, extOf } from "@/lib/core/formats";
import { loadPdfJs } from "./thumbnails";

/** Résolution de lecture : 200 points par pouce, un bon compromis entre précision et vitesse. */
const DPI = 200;

export interface OcrProgress {
  /** Pages déjà lues. */
  done: number;
  /** Nombre total de pages (0 tant qu'il n'est pas connu). */
  total: number;
}

type Source = { name: string; pages: () => AsyncGenerator<HTMLCanvasElement>; count: number };

async function pdfSource(file: File): Promise<Source> {
  const pdfjs = await loadPdfJs();
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const doc = await task.promise;
  return {
    name: file.name,
    count: doc.numPages,
    async *pages() {
      try {
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const viewport = page.getViewport({ scale: DPI / 72 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          await page.render({ canvas, viewport }).promise;
          page.cleanup();
          yield canvas;
        }
      } finally {
        void task.destroy();
      }
    },
  };
}

async function imageSource(file: File): Promise<Source> {
  return {
    name: file.name,
    count: 1,
    async *pages() {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      canvas.getContext("2d")!.drawImage(bitmap, 0, 0);
      bitmap.close();
      yield canvas;
    },
  };
}

/**
 * Lit le texte de chaque fichier. Résultat : un PDF cherchable (image + texte invisible
 * superposé) ou un fichier texte par document d'origine.
 */
export async function ocrFiles(
  files: File[],
  lang: string,
  format: "pdf" | "txt",
  onProgress: (p: OcrProgress) => void,
): Promise<{ name: string; data: Uint8Array }[]> {
  onProgress({ done: 0, total: 0 });
  const [{ createWorker }, sources] = await Promise.all([
    import("tesseract.js"),
    Promise.all(files.map((f) => (canonicalExt(extOf(f.name)) === "pdf" ? pdfSource(f) : imageSource(f)))),
  ]);
  const worker = await createWorker(lang, 1);
  await worker.setParameters({ user_defined_dpi: String(DPI) });
  const total = sources.reduce((n, s) => n + s.count, 0);
  let done = 0;
  onProgress({ done, total });
  const out: { name: string; data: Uint8Array }[] = [];
  try {
    const { PDFDocument } = format === "pdf" ? await import("pdf-lib") : { PDFDocument: null };
    for (const source of sources) {
      const texts: string[] = [];
      const merged = PDFDocument ? await PDFDocument.create() : null;
      for await (const canvas of source.pages()) {
        const { data } = await worker.recognize(canvas, { pdfTitle: source.name }, { pdf: format === "pdf", text: true });
        texts.push(data.text);
        if (merged && data.pdf) {
          const page = await PDFDocument!.load(new Uint8Array(data.pdf));
          for (const p of await merged.copyPages(page, page.getPageIndices())) merged.addPage(p);
        }
        done++;
        onProgress({ done, total });
      }
      const base = baseName(source.name);
      if (merged) {
        merged.setProducer("pdffusion");
        out.push({ name: `${base}-ocr.pdf`, data: await merged.save({ useObjectStreams: true }) });
      } else {
        out.push({ name: `${base}.txt`, data: new TextEncoder().encode(texts.join("\n\n")) });
      }
    }
  } finally {
    void worker.terminate();
  }
  return out;
}
