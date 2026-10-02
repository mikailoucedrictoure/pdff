import { formatColor } from "@/lib/core/formats";

const SHEET_ID = "file-glyph-sheet";

/**
 * Dessin commun à toutes les icônes, défini une seule fois par page (voir le layout).
 * Les parties colorées utilisent `currentColor` : chaque icône fixe sa couleur.
 */
export function FileGlyphSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <symbol id={SHEET_ID} viewBox="0 0 64 80">
        <path d="M8 2h34l20 20v50a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill="#ffffff" />
        <path d="M2 44h60v28a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6z" fill="#e9e7f5" />
        <path d="M42 2v14a6 6 0 0 0 6 6h14z" fill="currentColor" opacity="0.35" />
        <rect x="10" y="30" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
        <rect x="10" y="37" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.18" />
        <rect x="-2" y="48" width="54" height="22" rx="5" fill="currentColor" />
      </symbol>
    </svg>
  );
}

/**
 * Icône de document : feuille au coin plié + bandeau à la couleur du format.
 * Décorative pour les lecteurs d'écran : le nom du format est toujours écrit à côté.
 * Dessinée en SVG pour rester nette à toutes les tailles.
 */
export function FileGlyph({
  ext,
  className = "",
  glow = false,
}: {
  ext: string;
  className?: string;
  glow?: boolean;
}) {
  const color = formatColor(ext);
  const label = ext.toUpperCase().slice(0, 4);
  return (
    <svg
      viewBox="0 0 64 80"
      className={className}
      aria-hidden="true"
      style={{ color, ...(glow ? { filter: `drop-shadow(0 6px 18px ${color}88)` } : {}) }}
    >
      <use href={`#${SHEET_ID}`} />
      <text
        x="25"
        y="63.5"
        textAnchor="middle"
        fontSize={label.length > 3 ? 13 : 15}
        fontWeight="800"
        fill="#fff"
        fontFamily="var(--font-display), system-ui, sans-serif"
        letterSpacing="0.5"
      >
        {label}
      </text>
    </svg>
  );
}
