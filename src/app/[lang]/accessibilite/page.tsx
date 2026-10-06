import type { Metadata } from "next";
import { ContactLink, ExternalLink, LegalArticle } from "@/components/LegalArticle";
import { getI18n } from "@/i18n/server";
import { pageMetadata, SOURCE_URL } from "@/lib/seo";

/** Date de la dernière modification réelle de cette page (et de l'évaluation qu'elle décrit). */
const UPDATED = "2026-10-02";

export async function generateMetadata(): Promise<Metadata> {
  const { messages: t, prefix, locale } = await getI18n();
  return pageMetadata({ title: t.legal.accessibility.title, description: t.legal.accessibility.description, path: "/accessibilite", prefix, locale });
}

export default async function AccessibilityPage() {
  const { messages: t, locale } = await getI18n();
  const last = t.legal.accessibility.sections.length - 1;
  return (
    <LegalArticle
      text={t.legal.accessibility}
      updatedLabel={t.privacy.updated}
      updated={UPDATED}
      locale={locale}
      extras={{
        0: <ExternalLink href="https://www.w3.org/TR/WCAG22/">www.w3.org/TR/WCAG22</ExternalLink>,
        [last]: (
          <>
            <ExternalLink href={`${SOURCE_URL}/issues`}>github.com/mikailoucedrictoure/pdff/issues</ExternalLink>
            <ContactLink />
          </>
        ),
      }}
    />
  );
}
