/**
 * Définition des outils. Les textes (noms, descriptions, libellés) sont dans
 * les fichiers de traduction `src/i18n/messages/*` sous `tools.<id>`.
 *
 * Pour ajouter un outil : une entrée ici, ses textes dans `messages/fr.ts`
 * (les autres langues suivent), et son exécuteur dans `src/lib/server/runners.ts`.
 */

/** Présentation d'une option dans l'interface. */
export interface OptionUi {
  /** Affiche l'option seulement si une autre option a l'une des valeurs données. */
  showIf?: { name: string; in: string[] };
  /** Rangée dans « Plus de réglages », fermé par défaut : l'essentiel reste visible. */
  advanced?: boolean;
  /**
   * Liste de choix affichée en grandes cartes cliquables (cards), sur une page miniature
   * (position) ou en pastilles de couleur (swatches) plutôt qu'en liste déroulante.
   */
  display?: "cards" | "position" | "swatches" | "language";
}

export type ToolOption = OptionUi &
  (
    | { type: "select"; name: string; default: string; choices: string[] }
    | { type: "text"; name: string; default: string }
    | { type: "password"; name: string; default: string }
    | { type: "number"; name: string; default: number; min?: number; max?: number; step?: number }
    | { type: "checkbox"; name: string; default: boolean }
    /** Choix du format cible : alimenté dynamiquement par le graphe de conversion. */
    | { type: "target"; name: string }
    /** Format du résultat d'un outil PDF : PDF par défaut, ou tout format atteignable depuis un PDF. */
    | { type: "output"; name: string }
    /** Signature dessinée, écrite ou importée (image PNG en data URL). */
    | { type: "signature"; name: string }
    /** Zones tracées sur les pages (JSON : [{ page, x, y, w, h }], fractions de la page). */
    | { type: "areas"; name: string }
    /** Réponses d'un formulaire PDF (JSON : { nom du champ: valeur }), saisies dans l'aperçu. */
    | { type: "formvalues"; name: string }
    /** Plusieurs cases à cocher parmi des choix (valeurs séparées par des virgules). */
    | { type: "multi"; name: string; default: string; choices: string[] }
  );

export type ToolCategory = "organiser" | "convertir" | "modifier" | "securite";

export const TOOL_IDS = [
  "fusionner",
  "convertir",
  "diviser",
  "extraire",
  "organiser",
  "renommer",
  "pivoter",
  "numeroter",
  "filigrane",
  "compresser",
  "proteger",
  "deverrouiller",
  "metadonnees",
  "signer",
  "caviarder",
  "ocr",
  "remplir",
  "comparer",
  "images",
  "redimensionner",
] as const;

export type ToolId = (typeof TOOL_IDS)[number];

export interface ToolMeta {
  id: ToolId;
  category: ToolCategory;
  /** "pdf" : uniquement des PDF. "any" : tout format convertible. "all" : n'importe quel fichier. "scan" : PDF et images. */
  accepts: "pdf" | "any" | "all" | "scan" | "image";
  /** Traité entièrement dans le navigateur : le fichier n'est jamais envoyé. */
  local?: boolean;
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
    options: [{ type: "checkbox", name: "bookmarks", default: true },
      { type: "output", name: "output" },
    ],
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
      { type: "select", name: "mode", default: "each", choices: ["each", "ranges", "every"], display: "cards" },
      { type: "text", name: "ranges", default: "", showIf: { name: "mode", in: ["ranges"] } },
      { type: "number", name: "every", default: 10, min: 1, showIf: { name: "mode", in: ["every"] } },
      { type: "output", name: "output" },
    ],
  },
  {
    id: "extraire",
    category: "organiser",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "select", name: "mode", default: "keep", choices: ["keep", "remove"], display: "cards" },
      { type: "text", name: "pages", default: "" },
      { type: "output", name: "output" },
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
      { type: "output", name: "output" },
    ],
  },
  {
    id: "renommer",
    category: "organiser",
    accepts: "all",
    local: true,
    minFiles: 1,
    ordered: true,
    options: [
      { type: "text", name: "name", default: "" },
      { type: "text", name: "ext", default: "", advanced: true },
    ],
  },
  {
    id: "pivoter",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "select", name: "angle", default: "90", choices: ["90", "180", "270"], display: "cards" },
      { type: "text", name: "pages", default: "" },
      { type: "output", name: "output" },
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
        choices: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
        display: "position",
      },
      // Styles prêts à l'emploi ; le modèle envoyé au serveur ({n} / {total}…) vient des traductions (templates)
      { type: "select", name: "format", default: "nTotal", choices: ["nTotal", "n", "page", "dash"], display: "cards" },
      { type: "number", name: "start", default: 1, min: 0, advanced: true },
      { type: "number", name: "size", default: 10, min: 4, max: 72, advanced: true },
      { type: "text", name: "pages", default: "", advanced: true },
      { type: "output", name: "output" },
    ],
  },
  {
    id: "filigrane",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "text", name: "text", default: "CONFIDENTIEL" },
      { type: "select", name: "color", default: "gray", choices: ["gray", "red", "blue", "black"], display: "swatches" },
      // Opacité en % et angle en degrés : trois niveaux et deux sens suffisent à presque tout le monde
      { type: "select", name: "opacity", default: "25", choices: ["12", "25", "45"], display: "cards" },
      { type: "select", name: "rotation", default: "45", choices: ["45", "0"], display: "cards" },
      { type: "number", name: "size", default: 60, min: 8, max: 300, advanced: true },
      { type: "text", name: "pages", default: "", advanced: true },
      { type: "output", name: "output" },
    ],
  },
  {
    id: "signer",
    category: "securite",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "signature", name: "signature" },
      { type: "select", name: "where", default: "last", choices: ["last", "first", "all", "custom"], display: "cards" },
      { type: "text", name: "pages", default: "", showIf: { name: "where", in: ["custom"] } },
      {
        type: "select",
        name: "position",
        default: "bottom-right",
        choices: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
        display: "position",
      },
      { type: "select", name: "size", default: "medium", choices: ["small", "medium", "large"], display: "cards" },
      { type: "checkbox", name: "date", default: false },
    ],
  },
  {
    id: "caviarder",
    category: "securite",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "text", name: "terms", default: "" },
      { type: "multi", name: "patterns", default: "", choices: ["email", "phone", "iban", "date", "number"] },
      { type: "areas", name: "areas" },
    ],
  },
  {
    id: "ocr",
    category: "convertir",
    accepts: "scan",
    local: true,
    minFiles: 1,
    options: [
      {
        type: "select",
        name: "lang",
        default: "fra",
        choices: ["fra", "eng", "spa", "por", "deu", "ita", "nld", "ara", "chi_sim", "rus", "pol", "tur", "vie", "hin", "jpn", "kor"],
        display: "language",
      },
      { type: "select", name: "format", default: "pdf", choices: ["pdf", "txt"], display: "cards" },
    ],
  },
  {
    id: "remplir",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    maxFiles: 1,
    options: [
      { type: "formvalues", name: "values" },
      { type: "checkbox", name: "lock", default: false },
    ],
  },
  {
    id: "comparer",
    category: "organiser",
    accepts: "pdf",
    local: true,
    minFiles: 2,
    maxFiles: 2,
    ordered: true,
    options: [{ type: "checkbox", name: "ignoreCase", default: false }],
  },
  {
    id: "images",
    category: "convertir",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "select", name: "format", default: "png", choices: ["png", "jpg"], display: "cards" },
      { type: "checkbox", name: "small", default: false },
    ],
  },
  {
    id: "redimensionner",
    category: "modifier",
    accepts: "image",
    minFiles: 1,
    options: [
      { type: "select", name: "mode", default: "resize", choices: ["resize", "crop"], display: "cards" },
      { type: "select", name: "scale", default: "50", choices: ["75", "50", "25", "custom"], display: "cards", showIf: { name: "mode", in: ["resize"] } },
      { type: "number", name: "width", default: 1200, min: 1, max: 20000, showIf: { name: "scale", in: ["custom"] } },
      { type: "number", name: "height", default: 0, min: 0, max: 20000, showIf: { name: "scale", in: ["custom"] } },
      { type: "select", name: "ratio", default: "1:1", choices: ["1:1", "4:3", "3:4", "16:9", "9:16", "3:2"], display: "cards", showIf: { name: "mode", in: ["crop"] } },
      { type: "select", name: "format", default: "same", choices: ["same", "jpg", "png", "webp"], display: "cards" },
    ],
  },
  {
    id: "compresser",
    category: "modifier",
    accepts: "pdf",
    minFiles: 1,
    options: [{ type: "select", name: "level", default: "recommended", choices: ["lossless", "recommended", "strong"], display: "cards" }],
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
    options: [{ type: "password", name: "password", default: "" },
      { type: "output", name: "output" },
    ],
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
    else if (opt.type === "output") values[opt.name] = "pdf";
    else if (opt.type === "signature" || opt.type === "areas" || opt.type === "formvalues") values[opt.name] = "";
    else values[opt.name] = textDefaults[opt.name] ?? opt.default;
  }
  return values;
}
