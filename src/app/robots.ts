import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  // Les adresses *.vercel.app de prévisualisation ne doivent pas être indexées
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  // Installation interne (Dockerfile) : ne doit jamais apparaître dans les moteurs de recherche
  const selfHosted = process.env.PDFF_SELF_HOSTED === "1";
  if (!isProduction || selfHosted) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
