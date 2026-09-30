/**
 * Langues réellement disponibles dans le site : vérifiées + générées à l'avance.
 * Module léger (sans les textes) : utilisable dans le proxy, les pages et le navigateur.
 */
import { GENERATED_LOCALES } from "./generated/locales";
import { FALLBACK_LOCALE, normalizeLocale, parseAcceptLanguage, VERIFIED_LOCALES } from "./locales";

export const SUPPORTED_LOCALES: readonly string[] = [...VERIFIED_LOCALES, ...GENERATED_LOCALES.filter((l) => !(VERIFIED_LOCALES as readonly string[]).includes(l))];

const SUPPORTED = new Set(SUPPORTED_LOCALES);

export function isSupported(locale: string | null | undefined): locale is string {
  return !!locale && SUPPORTED.has(locale);
}

/** Langue à afficher : choix mémorisé (cookie), puis langues du navigateur, puis anglais. */
export function pickLocale(cookie: string | null | undefined, acceptLanguage: string | null | undefined): string {
  const chosen = normalizeLocale(cookie);
  if (isSupported(chosen)) return chosen;
  return parseAcceptLanguage(acceptLanguage).find(isSupported) ?? FALLBACK_LOCALE;
}

/** Retire la langue du début d'une adresse : "/it/outils/x" → "/outils/x". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  return isSupported(first) ? `/${rest.join("/")}` : pathname;
}
