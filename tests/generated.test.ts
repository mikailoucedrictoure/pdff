/**
 * Traductions générées par scripts/translate-languages.mjs : chaque fichier doit être
 * sûr à afficher (variables intactes, aucun texte inconnu, aucune langue vérifiée écrasée).
 */
import { describe, expect, it } from "vitest";
import { flatten, placeholders } from "@/i18n/flat";
import { GENERATED } from "@/i18n/generated";
import { isKnownLocale, isVerified } from "@/i18n/locales";
import { VERIFIED_MESSAGES } from "@/i18n/messages";
import { loadStaticTranslation } from "@/i18n/static";

const source = flatten(VERIFIED_MESSAGES.en);
const locales = Object.keys(GENERATED);

describe("traductions générées", () => {
  it("ne concernent que des langues connues et non vérifiées", () => {
    for (const l of locales) {
      expect(isKnownLocale(l), l).toBe(true);
      expect(isVerified(l), l).toBe(false);
    }
  });

  it.each(locales)("« %s » : textes connus, variables intactes, rien de vide", async (locale) => {
    const { default: file } = await GENERATED[locale]();
    expect(file.language).toBe(locale);
    for (const [key, value] of Object.entries(file.strings)) {
      expect(source[key], `${locale} ${key} inconnu`).toBeDefined();
      expect(value.trim(), `${locale} ${key}`).not.toBe("");
      expect(placeholders(value), `${locale} ${key}`).toBe(placeholders(source[key]));
    }
  });

  it.each(locales)("« %s » : la page complète se construit", async (locale) => {
    const messages = await loadStaticTranslation(locale);
    expect(messages).not.toBeNull();
    expect(Object.keys(flatten(messages))).toEqual(Object.keys(source));
  });
});
