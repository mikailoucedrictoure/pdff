import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CapabilityNotice } from "@/components/CapabilityNotice";
import { SeoSections } from "@/components/SeoSections";
import { Workspace } from "@/components/Workspace";
import { FileGlyph } from "@/components/visual/FileGlyph";
import { Scene } from "@/components/visual/Scene";
import { ToolIcon } from "@/components/visual/ToolIcon";
import { getI18n } from "@/i18n/server";
import { localePath } from "@/i18n/locales";
import { getTool } from "@/lib/core/tools";
import { jsonLd, pageMetadata, SITE_NAME, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/outils/[tool]">): Promise<Metadata> {
  const tool = getTool((await params).tool);
  if (!tool) return {};
  const { messages, prefix, locale } = await getI18n();
  const text = messages.tools[tool.id];
  return pageMetadata({ title: text.seoTitle, description: text.seoDescription, path: `/outils/${tool.id}`, prefix, locale });
}

const DECOR_ANY = ["pdf", "docx", "xlsx", "pptx", "jpg"];

export default async function ToolPage({ params }: PageProps<"/outils/[tool]">) {
  const tool = getTool((await params).tool);
  if (!tool) notFound();
  const { messages: t, prefix, locale } = await getI18n();
  const text = t.tools[tool.id];
  const url = siteUrl();
  const home = `${url}${localePath(prefix, "/")}`;
  const page = `${url}${localePath(prefix, `/outils/${tool.id}`)}`;
  const decor = tool.accepts === "pdf" ? ["pdf", "pdf", "pdf"] : DECOR_ANY;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: `${text.name} — ${SITE_NAME}`,
              url: page,
              description: text.seoDescription,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              isAccessibleForFree: true,
              inLanguage: locale,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: home },
                { "@type": "ListItem", position: 2, name: text.name, item: page },
              ],
            },
          ],
        })}
      />
      <Scene className="-mt-16 pt-16" floor>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 pt-6 pb-20 sm:pt-10 sm:pb-24">
          <div>
            <Link href={localePath(prefix, "/#outils")} className="text-sm text-white/60 hover:text-white">
              {t.nav.back}
            </Link>
            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-[0_12px_40px_-8px_#6d5cff]">
                <ToolIcon id={tool.id} className="h-7 w-7" />
              </span>
              <h1 className="font-display text-[clamp(2rem,6vw,3.2rem)] leading-none font-bold tracking-[-0.03em]">{text.name}</h1>
            </div>
            <p className="mt-4 max-w-xl text-white/70 sm:text-lg">{text.tagline}</p>
          </div>
          <div className="relative hidden h-36 w-56 shrink-0 md:block" aria-hidden="true" dir="ltr">
            {decor.map((ext, i) => (
              <div
                key={i}
                className="float-doc absolute w-16"
                style={
                  {
                    left: `${i * (160 / decor.length)}px`,
                    top: `${(i % 2) * 34}px`,
                    "--rot": `${(i - decor.length / 2) * 5}deg`,
                    "--d": `${-i * 0.8}s`,
                  } as React.CSSProperties
                }
              >
                <FileGlyph ext={ext} className="w-full" glow />
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <div className="relative -mt-10 rounded-t-[2.5rem] bg-bg">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-28 lg:pb-16">
          {tool.accepts === "any" && (
            <div className="mb-6">
              <CapabilityNotice />
            </div>
          )}
          <Workspace toolId={tool.id} />
          <div className="mt-16">
            <SeoSections t={t} prefix={prefix} toolId={tool.id} locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}
