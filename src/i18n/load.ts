/**
 * Chargement des textes d'une langue, côté serveur. Utilisable partout,
 * y compris dans les routes API (contrairement à `getI18n`, réservé aux pages).
 */
import { FALLBACK_LOCALE, fmt, type TranslationStatus, isVerified, LOCALE_COOKIE, normalizeLocale } from "./locales";
import { machineTranslationEnabled, readCachedTranslation } from "./machine";
import { VERIFIED_MESSAGES, type Messages } from "./messages";
import { loadStaticTranslation } from "./static";
import { pickLocale } from "./supported";

export type { TranslationStatus } from "./locales";

export interface I18nState {
  locale: string;
  messages: Messages;
  status: TranslationStatus;
  machineEnabled: boolean;
  /** Préfixe des liens internes ("/fr", "/it"…). */
  prefix: string;
}

export async function loadMessages(locale: string, prefix = ""): Promise<I18nState> {
  const machineEnabled = machineTranslationEnabled();
  if (isVerified(locale)) return { locale, messages: VERIFIED_MESSAGES[locale], status: "verified", machineEnabled, prefix };
  // Traduction générée à l'avance et embarquée dans le site
  const generated = await loadStaticTranslation(locale);
  if (generated) return { locale, messages: generated, status: "machine", machineEnabled, prefix };
  const cached = await readCachedTranslation(locale);
  if (cached) return { locale, messages: cached, status: "machine", machineEnabled, prefix };
  return {
    locale,
    messages: VERIFIED_MESSAGES[FALLBACK_LOCALE],
    status: machineEnabled ? "pending" : "unavailable",
    machineEnabled,
    prefix,
  };
}

/** Langue d'une requête API : champ explicite, sinon cookie / navigateur. */
export function localeFromRequest(request: Request, explicit?: string | null): string {
  const chosen = normalizeLocale(explicit);
  if (chosen) return chosen;
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === LOCALE_COOKIE)?.[1];
  return pickLocale(cookie, request.headers.get("accept-language"));
}

export function formatError(messages: Messages, key: keyof Messages["errors"], params: Record<string, string | number> = {}, file?: string) {
  const message = fmt(messages.errors[key], params);
  return file ? fmt(messages.errors.inFile, { file, message }) : message;
}
