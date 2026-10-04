import { isVerified, normalizeLocale } from "@/i18n/locales";
import { machineTranslationEnabled, translateInterface } from "@/i18n/machine";

export const maxDuration = 300;

/** Génère (une fois) la traduction automatique d'une langue. */
export async function POST(request: Request) {
  let body: { lang?: string } = {};
  try {
    body = await request.json();
  } catch {
    // corps vide
  }
  const locale = normalizeLocale(body.lang);
  if (!locale) return Response.json({ status: "unknown" }, { status: 400 });
  if (isVerified(locale)) return Response.json({ status: "ready" });
  if (!machineTranslationEnabled()) return Response.json({ status: "unavailable" }, { status: 503 });
  try {
    await translateInterface(locale);
    return Response.json({ status: "ready" });
  } catch (err) {
    console.error(`[pdffusion] traduction ${locale} :`, err);
    return Response.json({ status: "failed" }, { status: 502 });
  }
}
