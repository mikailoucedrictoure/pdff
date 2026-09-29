/**
 * Définition des outils. Les textes (noms, descriptions, libellés) sont dans
 * les fichiers de traduction `src/i18n/messages/*` sous `tools.<id>`.
 *
 * Pour ajouter un outil : une entrée ici, ses textes dans `messages/fr.ts`
 * (les autres langues suivent), et son exécuteur dans `src/lib/server/runners.ts`.
 */

/** Affiche l'option seulement si une autre option a l'une des valeurs données. */
export interface ShowIf {
  showIf?: { name: string; in: string[] };
}

export type ToolOption = ShowIf &
  (
    | { type: "select"; name: string; default: string; choices: string[] }
    | { type: "text"; name: string; default: string }
    | { type: "password"; name: string; default: string }
    | { type: "number"; name: string; default: number; min?: number; max?: number; step?: number }
    | { type: "checkbox"; name: string; default: boolean }
    /** Choix du format cible : alimenté dynamiquement par le graphe de conversion. */
    | { type: "target"; name: string }
  );

export type ToolCategory = "organiser" | "convertir" | "modifier" | "securite";

export const TOOL_IDS = [
  "fusionner",
  "convertir",
  "diviser",
  "extraire",
  "organiser",
  "pivoter",
  "numeroter",
  "filigrane",
  "compresser",
  "proteger",
  "deverrouiller",
  "metadonnees",
] as const;

export type ToolId = (typeof TOOL_IDS)[number];

export interface ToolMeta {
  id: ToolId;
  category: ToolCategory;
  /** "pdf" : uniquement des PDF. "any" : tout format convertible. */
  accepts: "pdf" | "any";
  minFiles: number;
  maxFiles?: number;
  /** L'utilisateur peut réordonner les fichiers (l'ordre compte). */
  ordered?: boolean;
  options: ToolOption[];
}

const IMAGE_TARGETS = ["png", "jpg", "webp", "avif", "tiff", "gif"];

export const TOOLS: ToolMeta[] = [
  {
    id: "fusionner",
    category: "organiser",
    accepts: "any",
    minFiles: 1,
    ordered: true,
    options: [{ type: "checkbox", name: "bookmarks", default: true }],
  },
  {
    id: "convertir",
    category: "convertir",
    accepts: "any",
    minFiles: 1,
    options: [
      { type: "target", name: "target" },
      { type: "number", name: "dpi", default: 150, min: 36, max: 600, step: 1, showIf: { name: "target", in: IMAGE_TARGETS } },
      { type: "number", name: "quality", default: 90, min: 1, max: 100, step: 1, showIf: { name: "target", in: ["jpg", "webp", "avif"] } },
    ],
  },
  {
    id: "diviser",
    category: "organiser",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "select", name: "mode", default: "ranges", choices: ["ranges", "each", "every"] },
      { type: "text", name: "ranges", default: "", showIf: { name: "mode", in: ["ranges"] } },
      { type: "number", name: "every", default: 10, min: 1, showIf: { name: "mode", in: ["every"] } },
    ],
  },
  {
    id: "extraire",
    category: "organiser",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "select", name: "mode", default: "keep", choices: ["keep", "remove"] },
      { type: "text", name: "pages", default: "" },
    ],
  },
  {
    id: "organiser",
    category: "organiser",
    accepts: "pdf",
    minFiles: 1,
    maxFiles: 1,
    options: [
      { type: "text", name: "order", default: "" },
      { type: "checkbox", name: "reverse", default: false },
    ],
  },
  {
    id: "pivoter",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "select", name: "angle", default: "90", choices: ["90", "180", "270"] },
      { type: "text", name: "pages", default: "" },
    ],
  },
  {
    id: "numeroter",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [
      {
        type: "select",
        name: "position",
        default: "bottom-center",
        choices: ["bottom-center", "bottom-right", "bottom-left", "top-center", "top-right", "top-left"],
      },
      { type: "text", name: "format", default: "{n} / {total}" },
      { type: "number", name: "start", default: 1, min: 0 },
      { type: "number", name: "size", default: 10, min: 4, max: 72 },
      { type: "text", name: "pages", default: "" },
    ],
  },
  {
    id: "filigrane",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "text", name: "text", default: "CONFIDENTIEL" },
      { type: "number", name: "size", default: 60, min: 8, max: 300 },
      { type: "number", name: "opacity", default: 20, min: 1, max: 100 },
      { type: "number", name: "rotation", default: 45, min: -180, max: 180 },
      { type: "select", name: "color", default: "gray", choices: ["gray", "red", "blue", "black"] },
      { type: "text", name: "pages", default: "" },
    ],
  },
  {
    id: "compresser",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [{ type: "select", name: "level", default: "recommended", choices: ["lossless", "recommended", "strong"] }],
  },
  {
    id: "proteger",
    category: "securite",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "password", name: "password", default: "" },
      { type: "checkbox", name: "noPrint", default: false },
      { type: "checkbox", name: "noCopy", default: false },
      { type: "checkbox", name: "noEdit", default: false },
    ],
  },
  {
    id: "deverrouiller",
    category: "securite",
    accepts: "pdf",
    minFiles: 1,
    options: [{ type: "password", name: "password", default: "" }],
  },
  {
    id: "metadonnees",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "text", name: "title", default: "" },
      { type: "text", name: "author", default: "" },
      { type: "text", name: "subject", default: "" },
      { type: "text", name: "keywords", default: "" },
      { type: "checkbox", name: "clear", default: false },
    ],
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = ["organiser", "convertir", "modifier", "securite"];

export function getTool(id: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.id === id);
}

export type OptionValues = Record<string, string | number | boolean>;

/**
 * Valeurs par défaut. `textDefaults` permet de traduire les textes pré-remplis
 * (ex. « CONFIDENTIEL » du filigrane) dans la langue de l'utilisateur.
 */
export function defaultOptions(tool: ToolMeta, textDefaults: Record<string, string | undefined> = {}): OptionValues {
  const values: OptionValues = {};
  for (const opt of tool.options) {
    if (opt.type === "target") values[opt.name] = "";
    else values[opt.name] = textDefaults[opt.name] ?? opt.default;
  }
  return values;
}
