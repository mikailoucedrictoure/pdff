import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import { LanguagePicker } from "@/components/LanguagePicker";
import { FileGlyphSprite } from "@/components/visual/FileGlyph";
import { I18nProvider, TranslationBanner } from "@/i18n/client";
import { toClientMessages } from "@/i18n/client-messages";
import { direction, localePath } from "@/i18n/locales";
import { getI18n } from "@/i18n/server";
import { SUPPORTED_LOCALES } from "@/i18n/supported";
import { SITE_NAME, siteUrl, SOURCE_URL } from "@/lib/seo";
import "../globals.css";

/** Chaque page est fabriquée à l'avance dans chaque langue, puis servie depuis le CDN. */
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}
export const dynamicParams = false;

// Seul l'alphabet latin de base est préchargé ; les autres (latin étendu, vietnamien, cyrillique)
// ne sont téléchargés que si la page contient ces caractères.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const body = Onest({ variable: "--font-body", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getI18n();
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: messages.meta.title, template: `%s | ${SITE_NAME}` },
    description: messages.meta.description,
    applicationName: SITE_NAME,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#120f36",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, messages, status, machineEnabled, prefix } = await getI18n();
  const href = (path: string) => localePath(prefix, path);
  // Tant que la traduction automatique n'est pas prête, la page est en anglais
  const shownLocale = status === "pending" || status === "unavailable" ? "en" : locale;
  const t = messages;
  return (
    <html lang={shownLocale} dir={direction(shownLocale)} className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <FileGlyphSprite />
        <I18nProvider locale={locale} messages={toClientMessages(messages)} status={status} machineEnabled={machineEnabled} prefix={prefix}>
          <header className="sticky top-0 z-50 border-b border-white/10 bg-night/75 text-white backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
              <Link href={href("/")} className="font-display flex items-center gap-2.5 text-xl font-bold tracking-tight">
                <Logo />
                pdff
              </Link>
              <nav className="flex items-center gap-1 text-sm font-medium">
                <Link href={href("/outils/fusionner")} className="hidden rounded-full px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white md:block">
                  {t.nav.merge}
                </Link>
                <Link href={href("/outils/convertir")} className="hidden rounded-full px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white md:block">
                  {t.nav.convert}
                </Link>
                <Link href={href("/#outils")} className="rounded-full bg-white/10 px-4 py-2 whitespace-nowrap hover:bg-white/20">
                  {t.nav.allTools}
                </Link>
                <LanguagePicker />
              </nav>
            </div>
          </header>
          <TranslationBanner />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted">
            <p className="font-display text-base font-semibold text-ink">pdff</p>
            <p className="mt-1">{t.footer.text}</p>
            <p className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
              <Link href={href("/confidentialite")} className="underline-offset-4 hover:text-ink hover:underline">
                {t.seo.privacyLink}
              </Link>
              <a href={SOURCE_URL} className="underline-offset-4 hover:text-ink hover:underline" rel="noopener">
                {t.seo.sourceLink}
              </a>
            </p>
          </footer>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f82ff" />
          <stop offset="1" stopColor="#4a36f0" />
        </linearGradient>
      </defs>
      <rect x="9" y="3" width="18" height="23" rx="4" fill="#e5322d" opacity="0.9" transform="rotate(12 18 14)" />
      <rect x="5" y="6" width="18" height="23" rx="4" fill="url(#logo-g)" />
      <path d="M10 13h8M10 17h8M10 21h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
