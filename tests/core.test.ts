import { describe, expect, it } from "vitest";
import { ALL_ENGINES, findPath, type EngineId } from "@/lib/core/graph";
import { PageSelectionError, parsePageList, parseRanges } from "@/lib/core/pages";
import { localePath, parseAcceptLanguage, resolveLocale, stripLocalePrefix } from "@/i18n/locales";

const ALL = new Set<EngineId>(ALL_ENGINES);
const NO_OFFICE = new Set<EngineId>(ALL_ENGINES.filter((e) => !e.startsWith("office")));
const engines = (from: string, to: string, set = ALL) => findPath(from, to, set)?.map((s) => `${s.engine}:${s.to}`);

describe("graphe de conversion", () => {
  it("PDF → Word passe par l'import PDF de LibreOffice, jamais par du texte brut", () => {
    expect(engines("pdf", "docx")).toEqual(["office-pdf-import:docx"]);
    expect(engines("pdf", "doc")).toEqual(["office-pdf-import:docx", "office:doc"]);
  });
  it("trouve les conversions en plusieurs étapes", () => {
    expect(engines("docx", "png")).toEqual(["office:pdf", "mupdf-render:png"]);
    expect(engines("jpg", "pdf")).toEqual(["images-to-pdf:pdf"]);
  });
  it("sans LibreOffice, les formats Office sont indisponibles", () => {
    expect(findPath("docx", "pdf", NO_OFFICE)).toBeNull();
    expect(engines("txt", "pdf", NO_OFFICE)).toEqual(["mupdf-to-pdf:pdf"]);
  });
  it("même format : aucune étape", () => {
    expect(findPath("pdf", "pdf", ALL)).toEqual([]);
  });
});

describe("sélection de pages", () => {
  it("comprend plages, pages seules et « fin » dans plusieurs langues", () => {
    expect(parsePageList("1-3, 5, 8-fin", 9)).toEqual([0, 1, 2, 4, 7, 8]);
    expect(parsePageList("2-end", 3)).toEqual([1, 2]);
    expect(parsePageList("ende-1", 3)).toEqual([2, 1, 0]);
    expect(parsePageList("", 3)).toEqual([0, 1, 2]);
  });
  it("découpe en plages", () => {
    expect(parseRanges("1-2, 3-fin", 5)).toEqual([[0, 1], [2, 3, 4]]);
  });
  it("refuse les pages inexistantes ou invalides", () => {
    expect(() => parsePageList("7", 3)).toThrow(PageSelectionError);
    expect(() => parsePageList("abc", 3)).toThrow(PageSelectionError);
  });
});

describe("langues et adresses", () => {
  it("préfixe et retire la langue de l'adresse", () => {
    expect(localePath("/fr", "/")).toBe("/fr");
    expect(localePath("/fr", "/outils/fusionner")).toBe("/fr/outils/fusionner");
    expect(localePath("", "/outils/fusionner")).toBe("/outils/fusionner");
    expect(stripLocalePrefix("/es/outils/diviser")).toBe("/outils/diviser");
    expect(stripLocalePrefix("/es")).toBe("/");
    expect(stripLocalePrefix("/outils/diviser")).toBe("/outils/diviser");
  });
  it("détecte la langue du navigateur, le choix mémorisé prime", () => {
    expect(parseAcceptLanguage("fr-CA,fr;q=0.9,en;q=0.8")).toEqual(["fr", "fr", "en"]);
    expect(resolveLocale(undefined, "wo-SN,fr;q=0.8")).toBe("wo");
    expect(resolveLocale("de", "fr")).toBe("de");
    expect(resolveLocale(undefined, null)).toBe("en");
  });
});

describe("choix de la langue des pages fabriquées à l'avance", () => {
  it("cookie, puis navigateur, puis anglais ; seulement des langues disponibles", async () => {
    const { pickLocale, stripLocale, isSupported, SUPPORTED_LOCALES } = await import("@/i18n/supported");
    expect(SUPPORTED_LOCALES.length).toBeGreaterThanOrEqual(160);
    expect(pickLocale("wo", "fr-FR,fr")).toBe("wo");
    expect(pickLocale(undefined, "it-IT,it;q=0.9,en;q=0.8")).toBe("it");
    expect(pickLocale("xx", "zz,de;q=0.5")).toBe("de");
    expect(pickLocale(undefined, null)).toBe("en");
    expect(stripLocale("/it/outils/diviser")).toBe("/outils/diviser");
    expect(stripLocale("/wo")).toBe("/");
    expect(stripLocale("/outils/diviser")).toBe("/outils/diviser");
    expect(isSupported("outils")).toBe(false);
  });
});

describe("chemins de conversion depuis un PDF", () => {
  it("PDF → texte : extraction directe (le détour par LibreOffice donne un fichier vide)", async () => {
    const { findPath, ALL_ENGINES } = await import("@/lib/core/graph");
    const all = new Set(ALL_ENGINES);
    expect(findPath("pdf", "txt", all)?.map((s) => s.engine)).toEqual(["mupdf-text"]);
    expect(findPath("pdf", "html", all)?.map((s) => s.engine)).toEqual(["mupdf-text"]);
    // Word : jamais en passant par du texte brut
    expect(findPath("pdf", "docx", all)?.map((s) => s.engine)).toEqual(["office-pdf-import"]);
    expect(findPath("pdf", "doc", all)?.map((s) => s.engine)).toEqual(["office-pdf-import", "office"]);
  });
});
