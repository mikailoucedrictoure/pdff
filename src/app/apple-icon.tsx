import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône de l'écran d'accueil iPhone / iPad. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#120f36" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <rect x="9" y="3" width="18" height="23" rx="4" fill="#e5322d" opacity="0.9" transform="rotate(12 18 14)" />
          <rect x="5" y="6" width="18" height="23" rx="4" fill="#7b6cff" />
          <path d="M10 13h8M10 17h8M10 21h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
