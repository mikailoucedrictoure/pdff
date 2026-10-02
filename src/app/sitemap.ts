import type { MetadataRoute } from "next";
import { localePath, VERIFIED_LOCALES } from "@/i18n/locales";
import { TOOL_IDS } from "@/lib/core/tools";
import { languageAlternates, siteUrl } from "@/lib/seo";

/** Plan du site : chaque page dans chaque langue vérifiée, avec ses versions alternatives. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const absolute = (languages: Record<string, string>) => Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, `${base}${v}`]));
  const pages = [
    { path: "/", priority: 1 },
    ...TOOL_IDS.map((id) => ({ path: `/outils/${id}`, priority: id === "fusionner" || id === "convertir" ? 0.9 : 0.8 })),
    { path: "/confidentialite", priority: 0.3 },
    { path: "/conditions", priority: 0.3 },
    { path: "/securite", priority: 0.4 },
    { path: "/accessibilite", priority: 0.3 },
  ];
  return pages.flatMap(({ path, priority }) => {
    const languages = absolute(languageAlternates(path));
    return ["", ...VERIFIED_LOCALES.map((l) => `/${l}`)].map((prefix) => ({
      url: `${base}${localePath(prefix, path)}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
