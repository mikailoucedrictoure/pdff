import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import { LanguagePicker } from "@/components/LanguagePicker";
import { I18nProvider, TranslationBanner } from "@/i18n/client";
import { direction } from "@/i18n/locales";
import { getI18n } from "@/i18n/server";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin", "latin-ext", "vietnamese"] });
const body = Onest({ variable: "--font-body", subsets: ["latin", "latin-ext", "cyrillic"] });

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getI18n();
  return { title: messages.meta.title, description: messages.meta.description };
}

export const viewport: Viewport = {
  themeColor: "#120f36",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { locale, messages, status, machineEnabled } = await getI18n();
  // Tant que la traduction automatique n'est pas prête, la page est en anglais
  const shownLocale = status === "pending" || status === "unavailable" ? "en" : locale;
  const t = messages;
  return (
    <html lang={shownLocale} dir={direction(shownLocale)} className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <I18nProvider locale={locale} messages={messages} status={status} machineEnabled={machineEnabled}>
          <header className="sticky top-0 z-50 border-b border-white/10 bg-night/75 text-white backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
              <Link href="/" className="font-display flex items-center gap-2.5 text-xl font-bold tracking-tight">
                <Logo />
                pdff
              </Link>
              <nav className="flex items-center gap-1 text-sm font-medium">
                <Link href="/outils/fusionner" className="hidden rounded-full px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white md:block">
                  {t.nav.merge}
                </Link>
                <Link href="/outils/convertir" className="hidden rounded-full px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white md:block">
                  {t.nav.convert}
                </Link>
                <Link href="/#outils" className="rounded-full bg-white/10 px-4 py-2 whitespace-nowrap hover:bg-white/20">
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
          </footer>
        </I18nProvider>
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
