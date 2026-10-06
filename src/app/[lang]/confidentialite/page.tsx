import type { Metadata } from "next";
import { fmt } from "@/i18n/locales";
import { getI18n } from "@/i18n/server";
import { CONTACT_EMAIL, pageMetadata, SOURCE_URL } from "@/lib/seo";

/** Date de la dernière modification réelle de cette page. */
const UPDATED = "2026-10-05";

export async function generateMetadata(): Promise<Metadata> {
  const { messages: t, prefix, locale } = await getI18n();
  return pageMetadata({ title: t.privacy.title, description: t.privacy.description, path: "/confidentialite", prefix, locale });
}

export default async function PrivacyPage() {
  const { messages: t, locale } = await getI18n();
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(`${UPDATED}T12:00:00Z`));
  const last = t.privacy.sections.length - 1;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="font-display text-[clamp(2rem,6vw,3rem)] leading-tight font-bold tracking-[-0.03em]">{t.privacy.title}</h1>
      <p className="mt-2 text-sm text-muted">{fmt(t.privacy.updated, { date })}</p>
      <p className="mt-6 text-lg leading-relaxed">{t.privacy.intro}</p>
      <div className="mt-10 space-y-8">
        {t.privacy.sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-display text-xl font-bold">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">
              {section.text}
              {i === last && (
                <>
                  {" "}
                  <a href={SOURCE_URL} className="font-medium text-brand-fg underline underline-offset-4" rel="noopener">
                    github.com/mikailoucedrictoure/pdff
                  </a>
                  {" · "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-brand-fg underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                </>
              )}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
