import type { Metadata } from "next";
import { ExternalLink, LegalArticle } from "@/components/LegalArticle";
import { getI18n } from "@/i18n/server";
import { AUTHOR_URL, pageMetadata, SOURCE_URL } from "@/lib/seo";

/** Date de la dernière modification réelle de cette page. */
const UPDATED = "2026-10-02";

export async function generateMetadata(): Promise<Metadata> {
  const { messages: t, prefix, locale } = await getI18n();
  return pageMetadata({ title: t.legal.terms.title, description: t.legal.terms.description, path: "/conditions", prefix, locale });
}

export default async function TermsPage() {
  const { messages: t, locale } = await getI18n();
  const last = t.legal.terms.sections.length - 1;
  return (
    <LegalArticle
      text={t.legal.terms}
      updatedLabel={t.privacy.updated}
      updated={UPDATED}
      locale={locale}
      extras={{
        0: <ExternalLink href={AUTHOR_URL}>LinkedIn</ExternalLink>,
        3: <ExternalLink href={`${SOURCE_URL}/blob/main/LICENSE`}>MIT License</ExternalLink>,
        [last]: <ExternalLink href={SOURCE_URL}>github.com/mikailoucedrictoure/pdff</ExternalLink>,
      }}
    />
  );
}
