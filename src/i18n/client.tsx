"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { direction, fmt, isVerified, LOCALE_COOKIE, languageName, localePath, stripLocalePrefix, type TranslationStatus } from "./locales";
import type { Messages } from "./messages/fr";

interface I18nContextValue {
  locale: string;
  messages: Messages;
  status: TranslationStatus;
  machineEnabled: boolean;
  dir: "ltr" | "rtl";
  /** Langue en cours de traduction automatique (bandeau). */
  translating: string | null;
  translationFailed: string | null;
  setLocale: (locale: string | null) => Promise<void>;
  /** Préfixe de langue de l'adresse ("/fr"…), vide si la langue est détectée. */
  prefix: string;
  /** Lien interne qui garde la langue de l'adresse. */
  href: (path: string) => string;
  /** Nom d'une langue dans la langue de l'interface. */
  nameOf: (code: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const ONE_YEAR = 60 * 60 * 24 * 365;

function writeCookie(locale: string | null) {
  document.cookie = locale
    ? `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`
    : `${LOCALE_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

async function requestTranslation(locale: string): Promise<"ready" | "unavailable" | "failed"> {
  try {
    const res = await fetch("/api/i18n", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: locale }),
    });
    const data = await res.json().catch(() => ({}));
    return data.status === "ready" ? "ready" : data.status === "unavailable" ? "unavailable" : "failed";
  } catch {
    return "failed";
  }
}

export function I18nProvider({
  locale,
  messages,
  status,
  machineEnabled,
  prefix,
  children,
}: {
  locale: string;
  messages: Messages;
  status: TranslationStatus;
  machineEnabled: boolean;
  prefix: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [translating, setTranslating] = useState<string | null>(null);
  const [translationFailed, setTranslationFailed] = useState<string | null>(null);

  const translateThenRefresh = useCallback(
    async (target: string) => {
      setTranslationFailed(null);
      setTranslating(target);
      const result = await requestTranslation(target);
      setTranslating(null);
      if (result === "failed") setTranslationFailed(target);
      router.refresh();
    },
    [router],
  );

  // Langue détectée non encore traduite : on lance la traduction automatiquement
  useEffect(() => {
    if (status !== "pending") return;
    const id = window.setTimeout(() => void translateThenRefresh(locale), 0);
    return () => window.clearTimeout(id);
  }, [status, locale, translateThenRefresh]);

  const setLocale = useCallback(
    async (next: string | null) => {
      writeCookie(next);
      if (prefix) {
        // Adresse dans une langue (/fr/…) : on change d'adresse, préfixée si la langue est vérifiée
        const page = stripLocalePrefix(window.location.pathname);
        const target = next && isVerified(next) ? localePath(`/${next}`, page) : page;
        if (next && !isVerified(next) && machineEnabled) {
          setTranslating(next);
          const result = await requestTranslation(next);
          setTranslating(null);
          if (result === "failed") setTranslationFailed(next);
        }
        router.push(target + window.location.search);
        return;
      }
      if (next && !isVerified(next) && machineEnabled) {
        await translateThenRefresh(next);
      } else {
        router.refresh();
      }
    },
    [machineEnabled, prefix, router, translateThenRefresh],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      status,
      machineEnabled,
      dir: direction(locale),
      translating,
      translationFailed,
      setLocale,
      prefix,
      href: (path: string) => localePath(prefix, path),
      nameOf: (code: string) => languageName(code, locale),
    }),
    [locale, messages, status, machineEnabled, translating, translationFailed, setLocale, prefix],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans <I18nProvider>");
  return ctx;
}

/** Bandeau d'état de la traduction automatique. */
export function TranslationBanner() {
  const { messages, status, translating, translationFailed, nameOf } = useI18n();
  const t = messages.language;
  let text: string | null = null;
  let tone = "bg-brand text-brand-ink";
  if (translating) text = fmt(t.translating, { lang: nameOf(translating) });
  else if (translationFailed) {
    text = fmt(t.failed, { lang: nameOf(translationFailed) });
    tone = "bg-danger-soft text-danger";
  } else if (status === "unavailable" && process.env.NODE_ENV !== "production") {
    // Message technique : utile en développement, pas pour les visiteurs
    text = t.unavailable;
    tone = "bg-warn-soft text-warn-ink";
  }
  if (!text) return null;
  return (
    <div role="status" className={`sticky top-16 z-40 px-4 py-2.5 text-center text-sm font-medium ${tone}`}>
      {translating && <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent align-middle" />}
      {text}
    </div>
  );
}
