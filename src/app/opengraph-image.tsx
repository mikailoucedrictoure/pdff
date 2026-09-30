import { OG_SIZE, ogImage, ogMessages } from "@/lib/og";

export const alt = "pdff";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const t = await ogMessages();
  return ogImage({ title: t.home.title, subtitle: t.home.subtitle, badge: t.home.trust });
}
