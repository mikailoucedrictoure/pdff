import { formatColor } from "@/lib/core/formats";

/**
 * Icône de document : feuille au coin plié + bandeau à la couleur du format.
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
  const fontSize = label.length > 3 ? 13 : 15;
  return (
    <svg
      viewBox="0 0 64 80"
      className={className}
      role="img"
      aria-label={`Fichier ${label}`}
      style={glow ? { filter: `drop-shadow(0 6px 18px ${color}88)` } : undefined}
    >
      <path d="M8 2h34l20 20v50a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill="#ffffff" />
      <path d="M2 44h60v28a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6z" fill="#e9e7f5" />
      <path d="M42 2v14a6 6 0 0 0 6 6h14z" fill={color} opacity="0.35" />
      <rect x="10" y="30" width="30" height="3" rx="1.5" fill={color} opacity="0.25" />
      <rect x="10" y="37" width="40" height="3" rx="1.5" fill={color} opacity="0.18" />
      <rect x="-2" y="48" width="54" height="22" rx="5" fill={color} />
      <text
        x="25"
        y="63.5"
        textAnchor="middle"
        fontSize={fontSize}
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
