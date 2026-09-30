import { getTool } from "@/lib/core/tools";
import { OG_SIZE, ogImage, ogMessages } from "@/lib/og";

export const alt = "pdff";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ tool: string }> }) {
  const t = await ogMessages();
  const tool = getTool((await params).tool);
  if (!tool) return ogImage({ title: t.home.title, subtitle: t.home.subtitle, badge: t.home.trust });
  const text = t.tools[tool.id];
  return ogImage({ title: text.name, subtitle: text.tagline, badge: t.home.trust });
}
