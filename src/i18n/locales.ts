/**
 * Langues de pdffusion. Module « pur » (client + serveur).
 *
 * - VERIFIED : traductions écrites et relues, embarquées dans le site.
 * - Toutes les autres langues de WORLD_LANGUAGES : traduction automatique
 *   générée une fois puis mise en cache (voir `src/i18n/server.ts`).
 */

/**
 * - verified : traduction vérifiée
 * - machine : traduction automatique déjà disponible
 * - pending : traduction automatique à générer (affichage temporaire en anglais)
 * - unavailable : traduction automatique désactivée (affichage en anglais)
 */
export type TranslationStatus = "verified" | "machine" | "pending" | "unavailable";

export const SOURCE_LOCALE = "fr";
export const FALLBACK_LOCALE = "en";
export const LOCALE_COOKIE = "pdff-lang";
/** En-tête posé par `src/proxy.ts` quand l'adresse commence par une langue (/fr/…). */
export const LOCALE_HEADER = "x-pdff-locale";

/** Adresse d'une page dans une langue donnée (préfixe vide = langue détectée). */
export function localePath(prefix: string, path: string): string {
  if (!prefix) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}

/** Retire le préfixe de langue d'une adresse : "/fr/outils/x" → "/outils/x". */
export function stripLocalePrefix(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  return (VERIFIED_LOCALES as readonly string[]).includes(first) ? `/${rest.join("/")}` : pathname;
}

export const VERIFIED_LOCALES = ["fr", "en", "es", "pt", "ar", "de", "zh"] as const;
export type VerifiedLocale = (typeof VERIFIED_LOCALES)[number];

/** Langues de la planète (ISO 639-1, plus quelques ISO 639-3 très parlées sans code court). */
export const WORLD_LANGUAGES = [
  "af", "ak", "am", "ar", "as", "ay", "az", "be", "bg", "bm", "bn", "bo", "br", "bs", "ca", "ce", "co", "cs", "cy",
  "da", "de", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "fa", "ff", "fi", "fj", "fo", "fr", "fy", "ga",
  "gd", "gl", "gn", "gu", "ha", "he", "hi", "hr", "ht", "hu", "hy", "id", "ig", "is", "it", "iu", "ja", "jv", "ka",
  "kg", "ki", "kk", "kl", "km", "kn", "ko", "kr", "ks", "ku", "ky", "la", "lb", "lg", "ln", "lo", "lt", "lu", "lv",
  "mg", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "nb", "nd", "ne", "nl", "nn", "nr", "ny", "oc", "om", "or",
  "os", "pa", "pl", "ps", "pt", "qu", "rm", "rn", "ro", "ru", "rw", "sa", "sc", "sd", "se", "sg", "si", "sk", "sl",
  "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "ti", "tk", "tn", "to",
  "tr", "ts", "tt", "ug", "uk", "ur", "uz", "ve", "vi", "wo", "xh", "yi", "yo", "za", "zh", "zu",
  // Langues très parlées sans code ISO 639-1
  "ceb", "fil", "haw", "hmn", "kab", "kri", "mos", "dyu", "ful", "snk", "tzm", "yue",
] as const;

const RTL = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv", "ks", "ckb"]);

export function isVerified(locale: string): locale is VerifiedLocale {
  return (VERIFIED_LOCALES as readonly string[]).includes(locale);
}

export function isKnownLocale(locale: string): boolean {
  return (WORLD_LANGUAGES as readonly string[]).includes(locale);
}

export function direction(locale: string): "rtl" | "ltr" {
  return RTL.has(locale.split("-")[0]) ? "rtl" : "ltr";
}

/** Normalise une étiquette de langue : "fr-CA" → "fr", "zh-Hans-CN" → "zh", "FIL" → "fil". */
export function normalizeLocale(tag: string | undefined | null): string | null {
  if (!tag) return null;
  const base = tag.trim().toLowerCase().split(/[-_]/)[0];
  if (base === "iw") return "he"; // ancien code de l'hébreu
  if (base === "in") return "id";
  if (base === "no") return "nb";
  if (base === "tl") return "fil";
  return isKnownLocale(base) ? base : null;
}

/** Liste des langues de l'en-tête Accept-Language, par préférence décroissante. */
export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag, q: q ? Number.parseFloat(q.trim().slice(2)) : 1 };
    })
    .filter((x) => x.tag && x.tag !== "*" && x.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((x) => normalizeLocale(x.tag))
    .filter((x): x is string => !!x);
}

/**
 * Choix de la langue : 1) choix explicite (cookie), 2) langue du navigateur.
 * Toute langue connue est acceptée : les non vérifiées seront traduites automatiquement.
 */
export function resolveLocale(cookie: string | undefined, acceptLanguage: string | null): string {
  const chosen = normalizeLocale(cookie);
  if (chosen) return chosen;
  const preferred = parseAcceptLanguage(acceptLanguage);
  return preferred[0] ?? FALLBACK_LOCALE;
}

/** Nom d'une langue, dans une langue d'affichage donnée (Intl, sans dépendance). */
export function languageName(code: string, displayIn: string): string {
  try {
    const name = new Intl.DisplayNames([displayIn], { type: "language", fallback: "none" }).of(code);
    if (name && name.toLowerCase() !== code) return name.charAt(0).toLocaleUpperCase(displayIn) + name.slice(1);
  } catch {
    // langue d'affichage non prise en charge par Intl
  }
  return FALLBACK_NAMES[code] ?? code;
}

/** Nom de la langue dans la langue elle-même (« autonyme »). */
export function autonym(code: string): string {
  return languageName(code, code);
}

/** Noms de secours quand Intl ne connaît pas la langue. */
const FALLBACK_NAMES: Record<string, string> = {
  dyu: "Julakan",
  mos: "Mòoré",
  snk: "Soninkanxaane",
  ful: "Fulfulde",
  kri: "Krio",
  tzm: "Tamaziɣt",
  kab: "Taqbaylit",
  hmn: "Hmoob",
};

/** Remplace les {variables} d'un texte. */
export function fmt(text: string, params: Record<string, string | number> = {}): string {
  return text.replace(/\{(\w+)\}/g, (m, key: string) => (key in params ? String(params[key]) : m));
}
