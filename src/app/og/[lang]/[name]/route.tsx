import { getTool, TOOL_IDS } from "@/lib/core/tools";
import { OG_LANGS, ogImage, ogMessages } from "@/lib/og";

/** Images de partage fabriquées à l'avance (5 langues × accueil + 12 outils), servies par le CDN. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return OG_LANGS.flatMap((lang) => ["accueil", ...TOOL_IDS].map((name) => ({ lang, name })));
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string; name: string }> }) {
  const { lang, name } = await params;
  const t = ogMessages(lang);
  const tool = getTool(name);
  if (!tool) return ogImage({ title: t.home.title, subtitle: t.home.subtitle, badge: t.home.trust });
  const text = t.tools[tool.id];
  return ogImage({ title: text.name, subtitle: text.tagline, badge: t.home.trust });
}
