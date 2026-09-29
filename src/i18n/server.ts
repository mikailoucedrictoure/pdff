/**
 * Langue et textes côté serveur (layouts, pages, routes API).
 */
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { FALLBACK_LOCALE, fmt, type TranslationStatus, isVerified, LOCALE_COOKIE, normalizeLocale, resolveLocale } from "./locales";
import { machineTranslationEnabled, readCachedTranslation } from "./machine";
import { VERIFIED_MESSAGES, type Messages } from "./messages";

export type { TranslationStatus } from "./locales";

export interface I18nState {
  locale: string;
  messages: Messages;
  status: TranslationStatus;
  machineEnabled: boolean;
}

export async function loadMessages(locale: string): Promise<I18nState> {
  const machineEnabled = machineTranslationEnabled();
  if (isVerified(locale)) return { locale, messages: VERIFIED_MESSAGES[locale], status: "verified", machineEnabled };
  const cached = await readCachedTranslation(locale);
  if (cached) return { locale, messages: cached, status: "machine", machineEnabled };
  return {
    locale,
    messages: VERIFIED_MESSAGES[FALLBACK_LOCALE],
    status: machineEnabled ? "pending" : "unavailable",
    machineEnabled,
  };
}

/** Langue de la requête : cookie de choix, sinon langue du navigateur. */
export const getLocale = cache(async (): Promise<string> => {
  const [c, h] = await Promise.all([cookies(), headers()]);
  return resolveLocale(c.get(LOCALE_COOKIE)?.value, h.get("accept-language"));
});

/** Langue + textes pour la requête en cours (mis en cache pendant le rendu). */
export const getI18n = cache(async (): Promise<I18nState> => loadMessages(await getLocale()));

/** Langue d'une requête API : champ explicite, sinon cookie / navigateur. */
export function localeFromRequest(request: Request, explicit?: string | null): string {
  const chosen = normalizeLocale(explicit);
  if (chosen) return chosen;
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === LOCALE_COOKIE)?.[1];
  return resolveLocale(cookie, request.headers.get("accept-language"));
}

export function formatError(messages: Messages, key: keyof Messages["errors"], params: Record<string, string | number> = {}, file?: string) {
  const message = fmt(messages.errors[key], params);
  return file ? fmt(messages.errors.inFile, { file, message }) : message;
}
