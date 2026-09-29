/**
 * Définition des outils affichés dans l'interface.
 * L'interface (formulaire d'options, zone de dépôt) est générée à partir d'ici :
 * pour ajouter un outil, ajouter une entrée ici et son exécuteur dans
 * `src/lib/server/runners.ts`.
 */

/** Affiche l’option seulement si une autre option a l’une des valeurs données. */
export interface ShowIf {
  showIf?: { name: string; in: string[] };
}

export type ToolOption = ShowIf &
  (
  | { type: "select"; name: string; label: string; default: string; choices: { value: string; label: string }[] }
  | { type: "text"; name: string; label: string; default: string; placeholder?: string; help?: string }
  | { type: "password"; name: string; label: string; default: string; help?: string }
  | { type: "number"; name: string; label: string; default: number; min?: number; max?: number; step?: number }
  | { type: "checkbox"; name: string; label: string; default: boolean }
  /** Choix du format cible : alimenté dynamiquement par le graphe de conversion. */
  | { type: "target"; name: string; label: string });

export type ToolCategory = "organiser" | "convertir" | "modifier" | "securite";

export interface ToolMeta {
  id: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  icon: string;
  /** "pdf" : uniquement des PDF. "any" : tout format convertible. */
  accepts: "pdf" | "any";
  minFiles: number;
  maxFiles?: number;
  /** L'utilisateur peut réordonner les fichiers (l'ordre compte). */
  ordered?: boolean;
  options: ToolOption[];
}

const pagesHelp = "Ex. : 1-3, 5, 8-fin. Laisser vide = toutes les pages.";

export const TOOLS: ToolMeta[] = [
  {
    id: "fusionner",
    name: "Fusionner",
    tagline: "Assembler plusieurs fichiers (PDF, Word, images…) en un seul PDF, dans l'ordre choisi.",
    category: "organiser",
    icon: "⧉",
    accepts: "any",
    minFiles: 1,
    ordered: true,
    options: [
      { type: "checkbox", name: "bookmarks", label: "Ajouter un signet par fichier", default: true },
    ],
  },
  {
    id: "convertir",
    name: "Convertir",
    tagline: "Convertir n'importe quel document ou image vers un autre format.",
    category: "convertir",
    icon: "⇄",
    accepts: "any",
    minFiles: 1,
    options: [
      { type: "target", name: "target", label: "Convertir en" },
      { type: "number", name: "dpi", label: "Résolution des images (DPI, si sortie image)", default: 150, min: 36, max: 600, step: 1, showIf: { name: "target", in: ["png", "jpg", "webp", "avif", "tiff", "gif"] } },
      { type: "number", name: "quality", label: "Qualité JPG / WebP / AVIF (1-100)", default: 90, min: 1, max: 100, step: 1, showIf: { name: "target", in: ["jpg", "webp", "avif"] } },
    ],
  },
  {
    id: "diviser",
    name: "Diviser",
    tagline: "Séparer un PDF en plusieurs fichiers : par plages ou page par page.",
    category: "organiser",
    icon: "✂",
    accepts: "pdf",
    minFiles: 1,
    options: [
      {
        type: "select",
        name: "mode",
        label: "Mode",
        default: "ranges",
        choices: [
          { value: "ranges", label: "Par plages de pages" },
          { value: "each", label: "Une page = un fichier" },
          { value: "every", label: "Tous les N pages" },
        ],
      },
      { type: "text", name: "ranges", label: "Plages", default: "", placeholder: "1-3, 4-10, 11-fin", help: "Chaque plage devient un fichier.", showIf: { name: "mode", in: ["ranges"] } },
      { type: "number", name: "every", label: "Nombre de pages par fichier", default: 10, min: 1, showIf: { name: "mode", in: ["every"] } },
    ],
  },
  {
    id: "extraire",
    name: "Extraire / supprimer des pages",
    tagline: "Garder ou retirer certaines pages d'un PDF.",
    category: "organiser",
    icon: "⊟",
    accepts: "pdf",
    minFiles: 1,
    options: [
      {
        type: "select",
        name: "mode",
        label: "Action",
        default: "keep",
        choices: [
          { value: "keep", label: "Garder uniquement ces pages" },
          { value: "remove", label: "Supprimer ces pages" },
        ],
      },
      { type: "text", name: "pages", label: "Pages", default: "", placeholder: "1, 3-5", help: pagesHelp },
    ],
  },
  {
    id: "organiser",
    name: "Réorganiser les pages",
    tagline: "Changer l'ordre des pages, dupliquer, inverser.",
    category: "organiser",
    icon: "↕",
    accepts: "pdf",
    minFiles: 1,
    maxFiles: 1,
    options: [
      { type: "text", name: "order", label: "Nouvel ordre", default: "", placeholder: "3, 1, 2, 4-fin", help: "Les pages non citées sont retirées." },
      { type: "checkbox", name: "reverse", label: "Inverser tout le document (ignore l'ordre ci-dessus)", default: false },
    ],
  },
  {
    id: "pivoter",
    name: "Pivoter",
    tagline: "Faire pivoter toutes les pages ou une sélection.",
    category: "modifier",
    icon: "↻",
    accepts: "pdf",
    minFiles: 1,
    options: [
      {
        type: "select",
        name: "angle",
        label: "Rotation",
        default: "90",
        choices: [
          { value: "90", label: "90° sens horaire" },
          { value: "180", label: "180°" },
          { value: "270", label: "90° sens anti-horaire" },
        ],
      },
      { type: "text", name: "pages", label: "Pages", default: "", placeholder: "toutes", help: pagesHelp },
    ],
  },
  {
    id: "numeroter",
    name: "Numéroter les pages",
    tagline: "Ajouter des numéros de page.",
    category: "modifier",
    icon: "#",
    accepts: "pdf",
    minFiles: 1,
    options: [
      {
        type: "select",
        name: "position",
        label: "Position",
        default: "bottom-center",
        choices: [
          { value: "bottom-center", label: "En bas, centré" },
          { value: "bottom-right", label: "En bas, à droite" },
          { value: "bottom-left", label: "En bas, à gauche" },
          { value: "top-center", label: "En haut, centré" },
          { value: "top-right", label: "En haut, à droite" },
          { value: "top-left", label: "En haut, à gauche" },
        ],
      },
      { type: "text", name: "format", label: "Format", default: "{n} / {total}", help: "{n} = numéro, {total} = nombre de pages." },
      { type: "number", name: "start", label: "Premier numéro", default: 1, min: 0 },
      { type: "number", name: "size", label: "Taille du texte", default: 10, min: 4, max: 72 },
      { type: "text", name: "pages", label: "Pages à numéroter", default: "", placeholder: "toutes", help: pagesHelp },
    ],
  },
  {
    id: "filigrane",
    name: "Filigrane",
    tagline: "Apposer un texte en filigrane (CONFIDENTIEL, COPIE…).",
    category: "modifier",
    icon: "◈",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "text", name: "text", label: "Texte", default: "CONFIDENTIEL" },
      { type: "number", name: "size", label: "Taille", default: 60, min: 8, max: 300 },
      { type: "number", name: "opacity", label: "Opacité (%)", default: 20, min: 1, max: 100 },
      { type: "number", name: "rotation", label: "Angle (°)", default: 45, min: -180, max: 180 },
      {
        type: "select",
        name: "color",
        label: "Couleur",
        default: "gray",
        choices: [
          { value: "gray", label: "Gris" },
          { value: "red", label: "Rouge" },
          { value: "blue", label: "Bleu" },
          { value: "black", label: "Noir" },
        ],
      },
      { type: "text", name: "pages", label: "Pages", default: "", placeholder: "toutes", help: pagesHelp },
    ],
  },
  {
    id: "compresser",
    name: "Compresser",
    tagline: "Réduire le poids d'un PDF.",
    category: "modifier",
    icon: "⇲",
    accepts: "pdf",
    minFiles: 1,
    options: [
      {
        type: "select",
        name: "level",
        label: "Niveau",
        default: "recommended",
        choices: [
          { value: "lossless", label: "Sans perte (nettoyage de la structure)" },
          { value: "recommended", label: "Recommandé (images 150 DPI)" },
          { value: "strong", label: "Fort (images 96 DPI)" },
        ],
      },
    ],
  },
  {
    id: "proteger",
    name: "Protéger",
    tagline: "Chiffrer un PDF avec un mot de passe (AES-256).",
    category: "securite",
    icon: "🔒",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "password", name: "password", label: "Mot de passe d'ouverture", default: "" },
      { type: "checkbox", name: "noPrint", label: "Interdire l'impression", default: false },
      { type: "checkbox", name: "noCopy", label: "Interdire la copie du texte", default: false },
      { type: "checkbox", name: "noEdit", label: "Interdire la modification", default: false },
    ],
  },
  {
    id: "deverrouiller",
    name: "Déverrouiller",
    tagline: "Retirer le mot de passe d'un PDF dont vous connaissez le mot de passe.",
    category: "securite",
    icon: "🔓",
    accepts: "pdf",
    minFiles: 1,
    options: [{ type: "password", name: "password", label: "Mot de passe actuel", default: "", help: "Laisser vide si le PDF n'a qu'un mot de passe de restrictions." }],
  },
  {
    id: "metadonnees",
    name: "Métadonnées",
    tagline: "Modifier le titre, l'auteur, le sujet et les mots-clés.",
    category: "modifier",
    icon: "ℹ",
    accepts: "pdf",
    minFiles: 1,
    options: [
      { type: "text", name: "title", label: "Titre", default: "" },
      { type: "text", name: "author", label: "Auteur", default: "" },
      { type: "text", name: "subject", label: "Sujet", default: "" },
      { type: "text", name: "keywords", label: "Mots-clés (séparés par des virgules)", default: "" },
      { type: "checkbox", name: "clear", label: "Effacer toutes les métadonnées existantes", default: false },
    ],
  },
];

export const TOOL_CATEGORIES: Record<ToolCategory, string> = {
  organiser: "Organiser",
  convertir: "Convertir",
  modifier: "Modifier",
  securite: "Sécurité",
};

export function getTool(id: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.id === id);
}

export type OptionValues = Record<string, string | number | boolean>;

export function defaultOptions(tool: ToolMeta): OptionValues {
  const values: OptionValues = {};
  for (const opt of tool.options) {
    if (opt.type === "target") values[opt.name] = "";
    else values[opt.name] = opt.default;
  }
  return values;
}
