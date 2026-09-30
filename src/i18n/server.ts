/**
 * Langue et textes des pages (Server Components).
 *
 * Les pages vivent sous /[lang]/… : la langue vient de l'adresse (et non d'un cookie),
 * ce qui permet de fabriquer chaque page à l'avance et de la servir depuis le CDN.
 * Les adresses sans langue sont réécrites par `src/proxy.ts` vers la bonne langue.
 * Routes API : utiliser `./load`.
 */
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { cache } from "react";
import { type I18nState, loadMessages } from "./load";
import { isSupported } from "./supported";

export type { I18nState, TranslationStatus } from "./load";

/** Langue + textes de la page en cours (langue de l'adresse /[lang]/…). */
export const getI18n = cache(async (): Promise<I18nState> => {
  const locale = await lang();
  if (!isSupported(locale)) notFound();
  return loadMessages(locale, `/${locale}`);
});
