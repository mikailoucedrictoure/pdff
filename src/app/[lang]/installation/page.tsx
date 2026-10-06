import type { Metadata } from "next";
import { ContactLink, ExternalLink, LegalArticle } from "@/components/LegalArticle";
import { getI18n } from "@/i18n/server";
import { AUTHOR_NAME, AUTHOR_URL, pageMetadata, SOURCE_URL } from "@/lib/seo";

/** Date de la dernière modification réelle de cette page. */
const UPDATED = "2026-10-02";

const COMMANDS = `mkdir pdffusion && cd pdffusion
curl -O https://raw.githubusercontent.com/mikailoucedrictoure/pdff/main/docker-compose.yml
docker compose up -d`;

export async function generateMetadata(): Promise<Metadata> {
  const { messages: t, prefix, locale } = await getI18n();
  return pageMetadata({ title: t.legal.install.title, description: t.legal.install.description, path: "/installation", prefix, locale });
}

/** Installer pdffusion sur ses propres serveurs : la page à montrer aux administrations et aux entreprises. */
export default async function InstallationPage() {
  const { messages: t, locale } = await getI18n();
  return (
    <LegalArticle
      text={t.legal.install}
      updatedLabel={t.privacy.updated}
      updated={UPDATED}
      locale={locale}
      blocks={{
        3: (
          <pre dir="ltr" className="mt-3 overflow-x-auto rounded-xl bg-night p-4 text-start text-sm leading-relaxed text-white">
            <code>{COMMANDS}</code>
          </pre>
        ),
      }}
      extras={{
        2: <ExternalLink href={`${SOURCE_URL}/blob/main/LICENSE`}>MIT License</ExternalLink>,
        4: <ExternalLink href={`${SOURCE_URL}/blob/main/INSTALLATION.md`}>INSTALLATION.md</ExternalLink>,
        5: (
          <>
            <ExternalLink href={AUTHOR_URL}>{`${AUTHOR_NAME} (LinkedIn)`}</ExternalLink>
            <ContactLink />
          </>
        ),
      }}
    />
  );
}
