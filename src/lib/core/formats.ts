/**
 * Catalogue des formats connus par pdff.
 * Ajouter un format = ajouter une entrée ici, puis une arête dans `graph.ts`.
 * Module "pur" : utilisable côté client et côté serveur.
 */

export type FormatCategory =
  | "pdf"
  | "image"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "ebook"
  | "text"
  | "web";

export interface FormatInfo {
  ext: string;
  label: string;
  category: FormatCategory;
  mime: string;
}

const list: FormatInfo[] = [
  { ext: "pdf", label: "PDF", category: "pdf", mime: "application/pdf" },

  // Images
  { ext: "jpg", label: "JPG", category: "image", mime: "image/jpeg" },
  { ext: "jpeg", label: "JPEG", category: "image", mime: "image/jpeg" },
  { ext: "png", label: "PNG", category: "image", mime: "image/png" },
  { ext: "webp", label: "WebP", category: "image", mime: "image/webp" },
  { ext: "avif", label: "AVIF", category: "image", mime: "image/avif" },
  { ext: "tiff", label: "TIFF", category: "image", mime: "image/tiff" },
  { ext: "tif", label: "TIF", category: "image", mime: "image/tiff" },
  { ext: "gif", label: "GIF", category: "image", mime: "image/gif" },
  { ext: "bmp", label: "BMP", category: "image", mime: "image/bmp" },
  { ext: "svg", label: "SVG", category: "image", mime: "image/svg+xml" },

  // Traitement de texte
  { ext: "docx", label: "Word (DOCX)", category: "document", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  { ext: "doc", label: "Word 97-2003 (DOC)", category: "document", mime: "application/msword" },
  { ext: "odt", label: "OpenDocument Texte (ODT)", category: "document", mime: "application/vnd.oasis.opendocument.text" },
  { ext: "rtf", label: "RTF", category: "document", mime: "application/rtf" },

  // Tableurs
  { ext: "xlsx", label: "Excel (XLSX)", category: "spreadsheet", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { ext: "xls", label: "Excel 97-2003 (XLS)", category: "spreadsheet", mime: "application/vnd.ms-excel" },
  { ext: "ods", label: "OpenDocument Calc (ODS)", category: "spreadsheet", mime: "application/vnd.oasis.opendocument.spreadsheet" },
  { ext: "csv", label: "CSV", category: "spreadsheet", mime: "text/csv" },

  // Présentations
  { ext: "pptx", label: "PowerPoint (PPTX)", category: "presentation", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
  { ext: "ppt", label: "PowerPoint 97-2003 (PPT)", category: "presentation", mime: "application/vnd.ms-powerpoint" },
  { ext: "odp", label: "OpenDocument Impress (ODP)", category: "presentation", mime: "application/vnd.oasis.opendocument.presentation" },

  // Livres électroniques & documents fixes
  { ext: "epub", label: "EPUB", category: "ebook", mime: "application/epub+zip" },
  { ext: "xps", label: "XPS", category: "ebook", mime: "application/vnd.ms-xpsdocument" },
  { ext: "oxps", label: "OpenXPS", category: "ebook", mime: "application/oxps" },
  { ext: "cbz", label: "Bande dessinée (CBZ)", category: "ebook", mime: "application/vnd.comicbook+zip" },
  { ext: "fb2", label: "FictionBook (FB2)", category: "ebook", mime: "application/x-fictionbook+xml" },
  { ext: "mobi", label: "MOBI", category: "ebook", mime: "application/x-mobipocket-ebook" },

  // Texte & web
  { ext: "txt", label: "Texte (TXT)", category: "text", mime: "text/plain" },
  { ext: "md", label: "Markdown", category: "text", mime: "text/markdown" },
  { ext: "html", label: "HTML", category: "web", mime: "text/html" },
  { ext: "htm", label: "HTM", category: "web", mime: "text/html" },
];

export const FORMATS: Record<string, FormatInfo> = Object.fromEntries(list.map((f) => [f.ext, f]));

export const CATEGORY_LABELS: Record<FormatCategory, string> = {
  pdf: "PDF",
  image: "Images",
  document: "Documents texte",
  spreadsheet: "Tableurs",
  presentation: "Présentations",
  ebook: "Livres & documents fixes",
  text: "Texte",
  web: "Web",
};

export function extOf(filename: string): string {
  const i = filename.lastIndexOf(".");
  return i === -1 ? "" : filename.slice(i + 1).toLowerCase();
}

export function baseName(filename: string): string {
  const i = filename.lastIndexOf(".");
  return i <= 0 ? filename : filename.slice(0, i);
}

export function mimeOf(ext: string): string {
  return FORMATS[ext]?.mime ?? "application/octet-stream";
}

/** Normalise les alias (jpeg → jpg, tif → tiff, htm → html). */
export function canonicalExt(ext: string): string {
  switch (ext) {
    case "jpeg":
      return "jpg";
    case "tif":
      return "tiff";
    case "htm":
      return "html";
    case "oxps":
      return "xps";
    default:
      return ext;
  }
}

export const ALL_EXTENSIONS = list.map((f) => f.ext);

/** Couleur d'identité de chaque format (celle que les gens associent au logiciel). */
const EXT_COLORS: Record<string, string> = {
  pdf: "#e5322d",
  docx: "#2b6cf0", doc: "#2b6cf0", odt: "#2b6cf0", rtf: "#4f7fd9",
  xlsx: "#1d9e5a", xls: "#1d9e5a", ods: "#1d9e5a", csv: "#2f8f5b",
  pptx: "#f0662b", ppt: "#f0662b", odp: "#f0662b",
  jpg: "#a24bf0", jpeg: "#a24bf0", png: "#8b5cf6", webp: "#7c3aed", avif: "#9333ea",
  tiff: "#b15bd6", tif: "#b15bd6", gif: "#c026d3", bmp: "#a855f7", svg: "#f59e0b",
  epub: "#0ea5a4", xps: "#0891b2", oxps: "#0891b2", cbz: "#14b8a6", fb2: "#0d9488", mobi: "#0f766e",
  txt: "#64748b", md: "#475569", html: "#e44d26", htm: "#e44d26",
};

export function formatColor(ext: string): string {
  return EXT_COLORS[ext.toLowerCase()] ?? "#6d5cff";
}

/** Formats à montrer (sans les alias jpeg, tif, htm, oxps). */
export const SHOWCASE_EXTENSIONS = list.map((f) => f.ext).filter((e) => !["jpeg", "tif", "htm", "oxps"].includes(e));
