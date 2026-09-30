import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER, VERIFIED_LOCALES } from "@/i18n/locales";

/**
 * Adresses par langue pour le référencement : /fr/outils/fusionner, /en/outils/fusionner…
 * La page est la même que /outils/fusionner, affichée dans la langue de l'adresse.
 * Sans préfixe, la langue reste détectée automatiquement (choix mémorisé, puis navigateur).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first, ...rest] = pathname.split("/");
  if (!(VERIFIED_LOCALES as readonly string[]).includes(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${rest.join("/")}`;
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, first);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/(fr|en|es|pt|ar|de|zh)", "/(fr|en|es|pt|ar|de|zh)/:path*"],
};
