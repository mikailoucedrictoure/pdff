import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/i18n/locales";
import { isSupported, pickLocale } from "@/i18n/supported";

/**
 * Toutes les pages existent en version fabriquée à l'avance par langue : /fr/…, /it/…, /wo/…
 * - Adresse avec langue : servie telle quelle (depuis le CDN).
 * - Adresse sans langue (/, /outils/fusionner…) : réécrite vers la langue du visiteur
 *   (choix mémorisé, sinon langue du navigateur). L'adresse affichée ne change pas.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isSupported(first)) return NextResponse.next();

  const locale = pickLocale(request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  // La réponse dépend du cookie et de la langue du navigateur : jamais partagée entre visiteurs
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  // Pages seulement : ni API, ni fichiers internes, ni fichiers (icônes, plan du site…)
  matcher: ["/((?!api|og|_next|_vercel|apple-icon|.*\\..*).*)"],
};
