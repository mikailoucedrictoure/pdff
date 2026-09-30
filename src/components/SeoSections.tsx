import Link from "next/link";
import { limits } from "@/config/limits";
import { fmt, localePath } from "@/i18n/locales";
import type { Messages } from "@/i18n/messages";
import { TOOLS, type ToolId } from "@/lib/core/tools";
import { jsonLd } from "@/lib/seo";
import { ToolIcon } from "./visual/ToolIcon";

/**
 * Contenu lisible par les visiteurs ET par les moteurs de recherche :
 * présentation de l'outil, mode d'emploi, avantages, questions fréquentes, liens internes.
 */
export function SeoSections({ t, prefix, toolId, locale }: { t: Messages; prefix: string; toolId?: ToolId; locale: string }) {
  const values = { files: limits.maxFiles.toLocaleString(locale), pages: limits.maxPages.toLocaleString(locale) };
  const faq = t.seo.faq.map((item) => ({ q: item.q, a: fmt(item.a, values) }));
  const tool = toolId ? t.tools[toolId] : null;

  return (
    <div className="space-y-12">
      {tool && (
        <section className="rounded-[2rem] border border-line bg-surface p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">{tool.seoTitle}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{tool.intro}</p>
          <h3 className="font-display mt-8 text-lg font-semibold">{t.seo.howTitle}</h3>
          <ol className="mt-4 grid gap-6 sm:grid-cols-3">
            {t.home.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-base font-bold text-brand-ink">
                  {i + 1}
                </span>
                <span>
                  <span className="font-display block font-semibold">{s.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t.seo.whyTitle}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.seo.why.map((w, i) => (
            <li key={i} className="rounded-3xl border border-line bg-surface p-5">
              <p className="font-display text-lg font-semibold">{w.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t.seo.faqTitle}</h2>
        <div className="mt-6 divide-y divide-line rounded-3xl border border-line bg-surface">
          {faq.map((item, i) => (
            <details key={i} className="group px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.q}
                <span className="text-xl leading-none text-muted transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-2 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
          })}
        />
      </section>

      {toolId && (
        <nav aria-label={t.seo.moreTools}>
          <h2 className="font-display text-2xl font-bold tracking-tight">{t.seo.moreTools}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {TOOLS.filter((x) => x.id !== toolId).map((x) => (
              <li key={x.id}>
                <Link
                  href={localePath(prefix, `/outils/${x.id}`)}
                  className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition hover:border-brand hover:text-brand"
                >
                  <ToolIcon id={x.id} className="h-4 w-4" />
                  {t.tools[x.id].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
