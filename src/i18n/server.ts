/**
 * Langue et textes côté serveur (layouts, pages, routes API).
 */
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { FALLBACK_LOCALE, fmt, type TranslationStatus, isVerified, LOCALE_COOKIE, LOCALE_HEADER, normalizeLocale, resolveLocale } from "./locales";
import { machineTranslationEnabled, readCachedTranslation } from "./machine";
import { VERIFIED_MESSAGES, type Messages } from "./messages";

export type { TranslationStatus } from "./locales";

export interface I18nState {
  locale: string;
  messages: Messages;
  status: TranslationStatus;
  machineEnabled: boolean;
  /** Préfixe de l'adresse ("/fr"…) quand la langue vient de l'URL, sinon "". */
  prefix: string;
}

export async function loadMessages(locale: string, prefix = ""): Promise<I18nState> {
  const machineEnabled = machineTranslationEnabled();
  if (isVerified(locale)) return { locale, messages: VERIFIED_MESSAGES[locale], status: "verified", machineEnabled, prefix };
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

/** Langue imposée par l'adresse (/fr/…), posée par `src/proxy.ts`. */
export const getUrlLocale = cache(async (): Promise<string | null> => {
  const value = (await headers()).get(LOCALE_HEADER);
  return value && isVerified(value) ? value : null;
});

/** Langue de la requête : adresse (/fr/…), puis cookie de choix, puis langue du navigateur. */
export const getLocale = cache(async (): Promise<string> => {
  const fromUrl = await getUrlLocale();
  if (fromUrl) return fromUrl;
  const [c, h] = await Promise.all([cookies(), headers()]);
  return resolveLocale(c.get(LOCALE_COOKIE)?.value, h.get("accept-language"));
});

/** Langue + textes pour la requête en cours (mis en cache pendant le rendu). */
export const getI18n = cache(async (): Promise<I18nState> => {
  const fromUrl = await getUrlLocale();
  return loadMessages(await getLocale(), fromUrl ? `/${fromUrl}` : "");
});

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
