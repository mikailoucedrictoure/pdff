import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityNotice } from "@/components/CapabilityNotice";
import { SeoSections } from "@/components/SeoSections";
import { FormatMarquee } from "@/components/visual/FormatMarquee";
import { FormatOrbit } from "@/components/visual/FormatOrbit";
import { Scene } from "@/components/visual/Scene";
import { ToolCard } from "@/components/visual/ToolCard";
import { fmt, localePath } from "@/i18n/locales";
import { getI18n } from "@/i18n/server";
import { SHOWCASE_EXTENSIONS } from "@/lib/core/formats";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/core/tools";
import { getCapabilities } from "@/lib/server/capabilities";
import { jsonLd, pageMetadata, SITE_NAME, siteUrl, SOURCE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { messages: t, prefix, locale } = await getI18n();
  return pageMetadata({ title: t.meta.title, description: t.meta.description, keywords: t.meta.keywords, path: "/", prefix, locale, absoluteTitle: true });
}

export default async function Home() {
  const [{ messages: t, prefix, locale }, caps] = await Promise.all([getI18n(), getCapabilities()]);
  const href = (path: string) => localePath(prefix, path);
  const url = siteUrl();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", "@id": `${url}/#website`, url, name: SITE_NAME, description: t.meta.description, inLanguage: locale },
            {
              "@type": "WebApplication",
              name: SITE_NAME,
              url: `${url}${href("/")}`,
              description: t.meta.description,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              isAccessibleForFree: true,
              inLanguage: locale,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: TOOLS.map((tool) => t.tools[tool.id].name),
              sameAs: [SOURCE_URL],
            },
          ],
        })}
      />
      <Scene className="-mt-16 pt-16">
        <section className="mx-auto grid max-w-6xl items-center gap-4 px-4 pt-6 pb-20 md:grid-cols-[1.05fr_1fr] md:gap-8 md:pt-16 md:pb-28">
          <div className="order-2 text-center md:order-1 md:text-start">
            <h1 className="font-display text-[clamp(2.4rem,7vw,4.4rem)] leading-[1.02] font-bold tracking-[-0.03em]">{t.home.title}</h1>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-white/75 md:mx-0">{t.home.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href={href("/outils/fusionner")}
                className="rounded-full bg-brand px-7 py-3.5 text-center font-semibold text-brand-ink shadow-[0_12px_40px_-10px_#6d5cff] transition hover:-translate-y-0.5 hover:bg-brand-2"
              >
                {t.home.ctaMerge}
              </Link>
              <Link
                href={href("/outils/convertir")}
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-center font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                {t.home.ctaConvert}
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/55">{t.home.trust}</p>
          </div>
          <div className="order-1 md:order-2" dir="ltr">
            <FormatOrbit />
          </div>
        </section>
      </Scene>

      <section className="relative -mt-10 rounded-t-[2.5rem] bg-bg pt-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {fmt(t.home.formatsTitle, { n: SHOWCASE_EXTENSIONS.length })}
          </h2>
          <p className="mt-1 text-muted">{t.home.formatsSubtitle}</p>
        </div>
        <div className="mt-6" dir="ltr">
          <FormatMarquee names={t.formatNames} />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-10">
          <CapabilityNotice caps={caps} />
        </div>

        <div id="outils" className="scroll-mt-20 space-y-12 py-12">
          {TOOL_CATEGORIES.map((cat) => (
            <section key={cat}>
              <h2 className="font-display mb-4 text-2xl font-bold tracking-tight">{t.categories[cat]}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((tool) => tool.category === cat).map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mb-12 rounded-[2rem] border border-line bg-surface p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">{t.home.stepsTitle}</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {t.home.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-lg font-bold text-brand-ink">
                  {i + 1}
                </span>
                <span>
                  <span className="font-display block text-lg font-semibold">{s.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-16">
          <SeoSections t={t} prefix={prefix} locale={locale} />
        </div>
      </div>
    </>
  );
}
