import type { Metadata } from "next";
import { ExternalLink, LegalArticle } from "@/components/LegalArticle";
import { getI18n } from "@/i18n/server";
import { pageMetadata, SECURITY_URL, SOURCE_URL } from "@/lib/seo";

/** Date de la dernière modification réelle de cette page. */
const UPDATED = "2026-10-02";

export async function generateMetadata(): Promise<Metadata> {
  const { messages: t, prefix, locale } = await getI18n();
  return pageMetadata({ title: t.legal.security.title, description: t.legal.security.description, path: "/securite", prefix, locale });
}

export default async function SecurityPage() {
  const { messages: t, locale } = await getI18n();
  const n = t.legal.security.sections.length;
  return (
    <LegalArticle
      text={t.legal.security}
      updatedLabel={t.privacy.updated}
      updated={UPDATED}
      locale={locale}
      extras={{
        [n - 3]: <ExternalLink href={`${SOURCE_URL}/blob/main/INSTALLATION.md`}>INSTALLATION.md</ExternalLink>,
        [n - 2]: <ExternalLink href={SOURCE_URL}>github.com/mikailoucedrictoure/pdff</ExternalLink>,
        [n - 1]: <ExternalLink href={SECURITY_URL}>{SECURITY_URL.replace("https://", "")}</ExternalLink>,
      }}
    />
  );
}
