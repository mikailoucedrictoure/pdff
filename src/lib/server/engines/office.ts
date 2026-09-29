/**
 * Moteur bureautique : LibreOffice en mode headless.
 * Word, Excel, PowerPoint, OpenDocument, RTF, CSV, HTML ↔ PDF et entre eux.
 */
import { spawn, execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { baseName, canonicalExt, extOf, FORMATS } from "@/lib/core/formats";
import { type FileData, UserError } from "../types";

const TIMEOUT_MS = 5 * 60 * 1000;

/** Caractères interdits dans un nom de fichier Windows (et caractères de contrôle). */
 
const FORBIDDEN_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1f]/g;

const CANDIDATES = [
  "C:\\Program Files\\LibreOffice\\program\\soffice.com",
  "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
  "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.com",
  "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe",
  "/Applications/LibreOffice.app/Contents/MacOS/soffice",
  "/usr/bin/soffice",
  "/usr/bin/libreoffice",
  "/usr/local/bin/soffice",
  "/opt/libreoffice/program/soffice",
  "/snap/bin/libreoffice",
];

let detected: Promise<string | null> | null = null;

function which(cmd: string): Promise<string | null> {
  return new Promise((resolve) => {
    execFile(process.platform === "win32" ? "where" : "which", [cmd], (err, stdout) => {
      resolve(err ? null : stdout.split(/\r?\n/)[0]?.trim() || null);
    });
  });
}

/** Chemin de LibreOffice, ou null s'il n'est pas installé. */
export function findLibreOffice(): Promise<string | null> {
  detected ??= (async () => {
    const fromEnv = process.env.LIBREOFFICE_PATH?.trim();
    if (fromEnv && existsSync(fromEnv)) return fromEnv;
    const local = CANDIDATES.find((p) => existsSync(p));
    if (local) return local;
    return (await which("soffice")) ?? (await which("libreoffice"));
  })();
  return detected;
}

/** Filtre d'export LibreOffice pour chaque format cible. */
const EXPORT_FILTERS: Record<string, string> = {
  docx: "docx:MS Word 2007 XML",
  doc: "doc:MS Word 97",
  odt: "odt",
  rtf: "rtf:Rich Text Format",
  txt: "txt:Text (encoded):UTF8",
  html: "html",
  xlsx: "xlsx:Calc MS Excel 2007 XML",
  xls: "xls:MS Excel 97",
  ods: "ods",
  csv: "csv:Text - txt - csv (StarCalc):44,34,76,1",
  pptx: "pptx:Impress MS PowerPoint 2007 XML",
  ppt: "ppt:MS PowerPoint 97",
  odp: "odp",
};

/** Export PDF haute qualité : images sans perte, pas de sous-échantillonnage. */
function pdfFilter(sourceExt: string): string {
  const category = FORMATS[sourceExt]?.category;
  const filter =
    sourceExt === "html"
      ? "writer_web_pdf_Export"
      : category === "spreadsheet"
        ? "calc_pdf_Export"
        : category === "presentation"
          ? "impress_pdf_Export"
          : "writer_pdf_Export";
  const options = {
    UseLosslessCompression: { type: "boolean", value: "true" },
    ReduceImageResolution: { type: "boolean", value: "false" },
    Quality: { type: "long", value: "100" },
    ExportBookmarks: { type: "boolean", value: "true" },
  };
  return `pdf:${filter}:${JSON.stringify(options)}`;
}

// LibreOffice ne supporte pas bien les conversions parallèles sur un même profil :
// on les exécute une par une.
let queue: Promise<unknown> = Promise.resolve();
function serialize<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

function run(bin: string, args: string[]): Promise<{ code: number | null; output: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { windowsHide: true });
    let output = "";
    child.stdout.on("data", (d) => (output += d));
    child.stderr.on("data", (d) => (output += d));
    const timer = setTimeout(() => {
      child.kill();
      reject(new UserError("La conversion a pris trop de temps et a été interrompue."));
    }, TIMEOUT_MS);
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, output });
    });
  });
}

export interface OfficeConvertOptions {
  /** Filtre d'import forcé, ex. "writer_pdf_import" pour ouvrir un PDF dans Writer. */
  importFilter?: string;
}

export async function convertWithOffice(file: FileData, target: string, opts: OfficeConvertOptions = {}): Promise<FileData> {
  const bin = await findLibreOffice();
  if (!bin) {
    throw new UserError(
      "LibreOffice est nécessaire pour cette conversion (Word, Excel, PowerPoint…). Installez-le puis redémarrez pdff.",
    );
  }
  const sourceExt = canonicalExt(extOf(file.name));
  const filter = target === "pdf" ? pdfFilter(sourceExt) : EXPORT_FILTERS[target];
  if (!filter) throw new UserError(`Conversion vers ${target.toUpperCase()} non prise en charge.`);

  return serialize(async () => {
    const work = await mkdtemp(path.join(tmpdir(), "pdff-"));
    try {
      const inDir = path.join(work, "in");
      const outDir = path.join(work, "out");
      // Nom d’origine conservé (LibreOffice l’affiche dans les en-têtes), nettoyé des caractères interdits
      const safeBase = baseName(file.name).replace(FORBIDDEN_FILENAME_CHARS, "_").slice(0, 120) || "document";
      const inputPath = path.join(inDir, `${safeBase}.${extOf(file.name) || sourceExt}`);
      await Promise.all([mkdir(inDir), mkdir(outDir)]);
      await writeFile(inputPath, file.data);

      const profile = pathToFileURL(path.join(tmpdir(), "pdff-libreoffice-profile")).href;
      const args = [
        "--headless",
        "--norestore",
        "--nolockcheck",
        "--nodefault",
        "--nofirststartwizard",
        `-env:UserInstallation=${profile}`,
        ...(opts.importFilter ? [`--infilter=${opts.importFilter}`] : []),
        "--convert-to",
        filter,
        "--outdir",
        outDir,
        inputPath,
      ];
      const { output } = await run(bin, args);
      const produced = (await readdir(outDir)).find((f) => extOf(f) === target);
      if (!produced) {
        console.error("[pdff] LibreOffice :", output);
        throw new UserError(`LibreOffice n'a pas pu convertir « ${file.name} » en ${target.toUpperCase()}.`);
      }
      const data = await readFile(path.join(outDir, produced));
      return { name: `${baseName(file.name)}.${target}`, data: new Uint8Array(data) };
    } finally {
      await rm(work, { recursive: true, force: true }).catch(() => undefined);
    }
  });
}
