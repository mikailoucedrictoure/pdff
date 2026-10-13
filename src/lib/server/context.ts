/**
 * Contexte de la demande en cours : la langue et la région du visiteur (« fr-CA »), connues de l'API,
 * utiles tout au bout de la chaîne (LibreOffice écrit « 1 250,50 » ou « 1,250.50 », « 12/10 » ou « 10/12 »
 * selon la région).
 */
import { AsyncLocalStorage } from "node:async_hooks";

const storage = new AsyncLocalStorage<{ locale: string }>();

/** Régions par défaut quand le navigateur n'annonce qu'une langue. */
const DEFAULT_REGION: Record<string, string> = { fr: "fr-FR", en: "en-US", es: "es-ES", pt: "pt-BR", de: "de-DE", it: "it-IT", nl: "nl-NL", ar: "ar-SA", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR", ru: "ru-RU", pl: "pl-PL", tr: "tr-TR" };

/** « fr-CA,fr;q=0.9,en;q=0.8 » → « fr-CA ». Renvoie `fallback` si rien d'utilisable n'est annoncé. */
export function localeFromAcceptLanguage(header: string | null, fallback: string): string {
  const first = (header ?? "").split(",")[0]?.split(";")[0]?.trim() ?? "";
  const match = /^([a-zA-Z]{2,3})(?:-([a-zA-Z]{2}))?/.exec(first) ?? /^([a-zA-Z]{2,3})(?:-([a-zA-Z]{2}))?/.exec(fallback);
  if (!match) return "en-US";
  const language = match[1].toLowerCase();
  return match[2] ? `${language}-${match[2].toUpperCase()}` : (DEFAULT_REGION[language] ?? language);
}

export function withLocale<T>(locale: string, task: () => Promise<T>): Promise<T> {
  return storage.run({ locale }, task);
}

/** Région du visiteur, ou null hors d'une demande (tests, appels directs). */
export function requestLocale(): string | null {
  return storage.getStore()?.locale ?? null;
}
