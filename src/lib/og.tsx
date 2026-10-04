/**
 * Image de partage (Facebook, LinkedIn, WhatsApp, X…) générée à la volée.
 */
import { ImageResponse } from "next/og";
import { VERIFIED_MESSAGES, type Messages } from "@/i18n/messages";

export const OG_SIZE = { width: 1200, height: 630 };

/** La police intégrée ne couvre que l'alphabet latin : les autres langues utilisent l'image anglaise. */
export const OG_LANGS = ["fr", "en", "es", "pt", "de"] as const;
type OgLang = (typeof OG_LANGS)[number];

export function ogLang(locale: string): OgLang {
  return (OG_LANGS as readonly string[]).includes(locale) ? (locale as OgLang) : "en";
}

/** Adresse de l'image de partage d'une page (« accueil » ou identifiant d'outil). */
export function ogImagePath(locale: string, name: string): string {
  return `/og/${ogLang(locale)}/${name}`;
}

export function ogMessages(lang: string): Messages {
  return VERIFIED_MESSAGES[ogLang(lang)];
}

export function ogImage({ title, subtitle, badge }: { title: string; subtitle: string; badge: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          background: "radial-gradient(circle at 80% 20%, #4a36f0 0%, #231c6b 45%, #120f36 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <rect x="9" y="3" width="18" height="23" rx="4" fill="#e5322d" opacity="0.9" transform="rotate(12 18 14)" />
            <rect x="5" y="6" width="18" height="23" rx="4" fill="#7b6cff" />
            <path d="M10 13h8M10 17h8M10 21h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2 }}>pdffusion</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: title.length > 40 ? 64 : 80, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{title}</span>
          <span style={{ fontSize: 32, lineHeight: 1.35, color: "rgba(255,255,255,0.75)", maxWidth: 980 }}>{subtitle}</span>
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 26, padding: "12px 28px", borderRadius: 999, background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
            {badge}
          </span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
