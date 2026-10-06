/**
 * Référencement : adresse du site, balises hreflang/canonical, Open Graph, données structurées.
 */
import type { Metadata } from "next";
import { localePath, VERIFIED_LOCALES } from "@/i18n/locales";
import { OG_SIZE, ogImagePath } from "./og";

export const SITE_NAME = "pdffusion";
export const SOURCE_URL = "https://github.com/mikailoucedrictoure/pdff";
/** Éditeur et développeur du site (pied de page, Conditions d'utilisation). */
export const AUTHOR_NAME = "Mikailou Cedric Toure";
export const AUTHOR_URL = "https://www.linkedin.com/in/mika%C3%AFlou-cedric-toure";
/** Adresse de contact (pages légales, pied de page, security.txt). */
export const CONTACT_EMAIL = "contact@pdffusion.app";
/** Signalement confidentiel des failles (onglet Security de GitHub). */
export const SECURITY_URL = `${SOURCE_URL}/security`;

/**
 * Adresse publique du site, sans barre finale. À définir dans Vercel une fois le
 * nom de domaine branché : NEXT_PUBLIC_SITE_URL=https://mon-domaine.com
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;
  return "http://localhost:3000";
}

/** Codes hreflang (le chinois est en caractères simplifiés, le portugais est brésilien). */
const HREFLANG: Record<string, string> = { zh: "zh-Hans", pt: "pt-BR" };
const OG_LOCALE: Record<string, string> = { fr: "fr_FR", en: "en_US", es: "es_ES", pt: "pt_BR", ar: "ar_AR", de: "de_DE", zh: "zh_CN" };

/** Toutes les versions linguistiques d'une page (pour hreflang et le plan du site). */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of VERIFIED_LOCALES) languages[HREFLANG[l] ?? l] = localePath(`/${l}`, path);
  // Canada : les pages françaises et anglaises s'adressent aussi explicitement aux Canadiens
  languages["fr-CA"] = localePath("/fr", path);
  languages["en-CA"] = localePath("/en", path);
  languages["x-default"] = path;
  return languages;
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  prefix: string;
  locale: string;
  /** Titre affiché tel quel (sans « | pdffusion »). */
  absoluteTitle?: boolean;
  keywords?: string;
  /** Image de partage : « accueil » ou identifiant d'outil. */
  image?: string;
}): Metadata {
  const url = localePath(opts.prefix, opts.path);
  const image = { url: ogImagePath(opts.locale, opts.image ?? "accueil"), ...OG_SIZE, alt: opts.title };
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url, languages: languageAlternates(opts.path) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: opts.title,
      description: opts.description,
      url,
      locale: OG_LOCALE[opts.locale] ?? opts.locale,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [image.url] },
  };
}

/** Balise <script type="application/ld+json"> sûre (voir la doc Next.js « JSON-LD »). */
export function jsonLd(data: object): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
