/**
 * Exécution des conversions : suit le chemin calculé par le graphe
 * et appelle le moteur adapté à chaque étape.
 */
import { ALL_ENGINES, type EngineId, findPath, type Step } from "@/lib/core/graph";
import { canonicalExt, extOf, FORMATS } from "@/lib/core/formats";
import { type FileData, UserError } from "./types";
import { convertImage, imagesToPdf } from "./engines/image";
import { extractText, renderPages, toPdf as mupdfToPdf } from "./engines/mupdf";
import { convertWithOffice, findLibreOffice } from "./engines/office";

export async function availableEngines(): Promise<Set<EngineId>> {
  const hasOffice = !!(await findLibreOffice());
  return new Set(ALL_ENGINES.filter((e) => hasOffice || (e !== "office" && e !== "office-pdf-import")));
}

export interface ConvertSettings {
  dpi: number;
  quality: number;
}

async function runStep(file: FileData, step: Step, s: ConvertSettings): Promise<FileData[]> {
  switch (step.engine) {
    case "sharp":
      return [await convertImage(file, step.to, s.quality)];
    case "images-to-pdf":
      return [await imagesToPdf(file)];
    case "mupdf-to-pdf":
      return [await mupdfToPdf(file)];
    case "mupdf-render":
      return renderPages(file, step.to as "png" | "jpg", s.dpi, s.quality);
    case "mupdf-text":
      return [await extractText(file, step.to as "txt" | "html")];
    case "office":
      return [await convertWithOffice(file, step.to)];
    case "office-pdf-import": {
      const importFilter = FORMATS[step.to]?.category === "presentation" ? "impress_pdf_import" : "writer_pdf_import";
      return [await convertWithOffice(file, step.to, { importFilter })];
    }
  }
}

/** Convertit un fichier vers `target`. Peut produire plusieurs fichiers (ex. PDF → PNG). */
export async function convertFile(
  file: FileData,
  target: string,
  settings: ConvertSettings,
  engines?: Set<EngineId>,
): Promise<FileData[]> {
  const from = canonicalExt(extOf(file.name));
  const to = canonicalExt(target);
  const path = findPath(from, to, engines ?? (await availableEngines()));
  if (!path) {
    const hint = (await findLibreOffice()) ? "" : " (installer LibreOffice ajoute les formats Word, Excel et PowerPoint)";
    throw new UserError(`Conversion ${from.toUpperCase() || "?"} → ${to.toUpperCase()} impossible${hint}.`);
  }
  if (!path.length) return [file];

  let files = [file];
  for (const step of path) {
    const next: FileData[] = [];
    for (const f of files) next.push(...(await runStep(f, step, settings)));
    files = next;
  }
  return files;
}

/** Garantit un PDF : convertit si nécessaire. */
export async function ensurePdf(file: FileData, engines?: Set<EngineId>): Promise<FileData> {
  if (canonicalExt(extOf(file.name)) === "pdf") return file;
  const [pdf] = await convertFile(file, "pdf", { dpi: 150, quality: 92 }, engines);
  return pdf;
}
