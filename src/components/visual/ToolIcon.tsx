/** Pictogrammes des outils (trait 1.8, 24×24). */
const PATHS: Record<string, React.ReactNode> = {
  fusionner: (
    <>
      <rect x="3" y="3" width="9" height="12" rx="1.5" />
      <rect x="12" y="9" width="9" height="12" rx="1.5" />
      <path d="M8 18h2M14 6h2" />
    </>
  ),
  convertir: (
    <>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </>
  ),
  diviser: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 7.5 20 17M8 16.5 20 7" />
    </>
  ),
  extraire: (
    <>
      <rect x="4" y="3" width="12" height="16" rx="1.5" />
      <path d="M8 9h4M15 17h6" />
    </>
  ),
  organiser: (
    <>
      <path d="M7 4v16M4 7l3-3 3 3M17 20V4M14 17l3 3 3-3" />
    </>
  ),
  pivoter: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v5h-5" />
    </>
  ),
  numeroter: (
    <>
      <path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16" />
    </>
  ),
  filigrane: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      <path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  compresser: (
    <>
      <path d="M4 14h6v6M20 10h-6V4M10 14l-6 6M14 10l6-6" />
    </>
  ),
  proteger: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2" />
    </>
  ),
  deverrouiller: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 7.5-2M12 15v2" />
    </>
  ),
  metadonnees: (
    <>
      <path d="M3 12V4h8l10 10-8 8L3 12z" />
      <circle cx="7.5" cy="8" r="1.5" />
    </>
  ),
};

export function ToolIcon({ id, className = "h-6 w-6" }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[id] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
