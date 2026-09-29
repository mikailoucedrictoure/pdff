import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const body = Onest({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pdff — fusionner, convertir et modifier vos documents",
  description: "Fusionnez, convertissez et modifiez PDF, Word, Excel, PowerPoint et images. Gratuit et sans inscription.",
};

export const viewport: Viewport = {
  themeColor: "#120f36",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-night/75 text-white backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="font-display flex items-center gap-2.5 text-xl font-bold tracking-tight">
              <Logo />
              pdff
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium">
              <Link href="/outils/fusionner" className="hidden rounded-full px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white sm:block">
                Fusionner
              </Link>
              <Link href="/outils/convertir" className="hidden rounded-full px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white sm:block">
                Convertir
              </Link>
              <Link href="/#outils" className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20">
                Tous les outils
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted">
          <p className="font-display text-base font-semibold text-ink">pdff</p>
          <p className="mt-1">Gratuit et sans inscription. Vos fichiers sont supprimés dès que le traitement est terminé.</p>
        </footer>
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
