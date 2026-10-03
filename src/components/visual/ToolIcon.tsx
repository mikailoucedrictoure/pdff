import { useId } from "react";

/**
 * Pictogrammes des outils, dessinés sur mesure (grille 24×24, trait 1.6, bichromie).
 *
 * Grammaire commune : la feuille au coin plié du site (voir FileGlyph) + un geste
 * propre à chaque outil. Les aplats teintés (`T`) donnent la seconde couleur ;
 * `cut` découpe la feuille autour d'un badge pour qu'il se détache proprement.
 */

/** Aplat teinté : la couleur du trait, en transparence. */
const T = { fill: "currentColor", fillOpacity: 0.22 } as const;

/** Feuille pleine page, coin plié en haut à droite. */
const PAGE = "M6 2.5h6.5L17 7v11.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2z";
const FOLD = "M12.5 2.5v3A1.5 1.5 0 0 0 14 7h3";

type Glyph = {
  /** Dessin principal (découpé par `cut`). */
  base: React.ReactNode;
  /** Formes qui creusent un vide dans `base`, autour du badge. */
  cut?: React.ReactNode;
  /** Badge posé par-dessus. */
  top?: React.ReactNode;
};

const GLYPHS: Record<string, Glyph> = {
  // Deux feuilles qui se rejoignent en une seule.
  fusionner: {
    base: (
      <>
        <rect x="2" y="2.5" width="7" height="8" rx="1.5" />
        <rect x="2" y="13.5" width="7" height="8" rx="1.5" />
        <path d="M15 5h4l2.5 2.5V17.5a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1-1.5-1.5V6.5A1.5 1.5 0 0 1 15 5z" {...T} />
        <path d="M9 6.5c2.5 0 1.5 5.5 4 5.5M9 17.5c2.5 0 1.5-5.5 4-5.5M11.4 10.5l1.6 1.5-1.6 1.5" />
        <path d="M16 10.5h3M16 13.5h3" />
      </>
    ),
  },

  // Une feuille déchirée en deux moitiés qui s'écartent.
  diviser: {
    base: (
      <>
        <g transform="translate(-0.5 -1.2) rotate(-5 10.5 7)">
          <path d="M4 10.8V4.5a2 2 0 0 1 2-2h6.5L17 7v3.8l-2.2-1.2-2.1 1.2-2.2-1.2-2.1 1.2-2.2-1.2z" {...T} />
          <path d="M12.5 2.5v3A1.5 1.5 0 0 0 14 7h3" />
        </g>
        <g transform="translate(0.8 1.4) rotate(4 10.5 17)">
          <path d="M4 13.2l2.2-1.2 2.1 1.2 2.2-1.2 2.1 1.2 2.2-1.2 2.2 1.2v5.3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M7 16.5h7" />
        </g>
      </>
    ),
  },

  // Une page tirée hors de la pile.
  extraire: {
    base: (
      <rect x="2.5" y="7" width="10" height="14" rx="2" strokeOpacity="0.55" />
    ),
    cut: <path d="M10.5 1.5h5l3.5 3.5V14a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 14V3a1.5 1.5 0 0 1 1.5-1.5z" transform="rotate(10 14 8.5)" />,
    top: (
      <>
        <g transform="rotate(10 14 8.5)">
          <path d="M10.5 1.5h5l3.5 3.5V14a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 14V3a1.5 1.5 0 0 1 1.5-1.5z" {...T} />
          <path d="M15.5 1.5V4a1 1 0 0 0 1 1H19M11.5 8.5h4M11.5 11.5h3" />
        </g>
        <path d="M16 21.5l5.5-5.5M17.5 16h4v4" />
      </>
    ),
  },

  // Deux pages qui échangent leur place.
  organiser: {
    base: (
      <>
        <rect x="2.5" y="7.5" width="7.5" height="9.5" rx="1.5" {...T} />
        <rect x="14" y="7.5" width="7.5" height="9.5" rx="1.5" />
        <path d="M4.5 11h3.5M4.5 13.5h2.5M16 11h3.5M16 13.5h2.5" />
        <path d="M6.25 5.5C7.5 2.3 16.5 2.3 17.75 5.5M15.6 4.9l2.15.6.6-2.2" />
        <path d="M17.75 19C16.5 22.2 7.5 22.2 6.25 19M8.4 19.6l-2.15-.6-.6 2.2" />
      </>
    ),
  },

  // Un document texte qui devient une image (et inversement).
  convertir: {
    base: (
      <>
        <path d="M4 2.5h4.5L11 5v6.5a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5V4A1.5 1.5 0 0 1 4 2.5z" />
        <path d="M5 7h3.5M5 9.5h2.5" />
        <rect x="13" y="11" width="8.5" height="10.5" rx="1.5" {...T} />
        <path d="M13.5 19.5l2.5-3 2 2.2 1.3-1.4 2 2.2" />
        <circle cx="16.3" cy="14.3" r="0.9" fill="currentColor" stroke="none" />
        <path d="M14.5 3.5a5.5 5.5 0 0 1 5 5M21 6.8l-1.5 1.8-1.9-1.4" />
        <path d="M9.5 21a5.5 5.5 0 0 1-5-5M3 17.7l1.5-1.8 1.9 1.4" />
      </>
    ),
  },

  // Le nom de la page s'édite dans une étiquette, curseur de texte en place.
  renommer: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <path d="M7 10.5h6" />
      </>
    ),
    cut: <rect x="8.5" y="13.5" width="14" height="7" rx="2" />,
    top: (
      <>
        <rect x="8.5" y="13.5" width="14" height="7" rx="2" {...T} />
        <path d="M11 17h3.5M18.5 15v4M17.5 15h2M17.5 19h2" />
      </>
    ),
  },

  // Un paraphe tracé sur la page, la plume posée à côté.
  signer: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <path d="M7 10.5h6M6.8 16c1.1-1.8 2.1-1.8 2.5 0s1.4 1.8 2.6-.3" />
      </>
    ),
    cut: <path d="M13.5 21.5l.9-3.4 5.9-5.9 2.5 2.5-5.9 5.9z" />,
    top: (
      <>
        <path d="M13.5 21.5l.9-3.4 5.9-5.9 2.5 2.5-5.9 5.9z" {...T} />
        <path d="M18.6 13.9l2.5 2.5" />
      </>
    ),
  },

  // Des lignes du texte remplacées par des bandes noires.
  caviarder: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <path d="M7 10h6" />
        <rect x="7" y="12.6" width="7.5" height="2.4" rx="0.6" fill="currentColor" />
        <rect x="7" y="16.4" width="4.5" height="2.4" rx="0.6" fill="currentColor" />
      </>
    ),
  },

  // Le cadre du scanner autour d'un texte qui devient lisible.
  ocr: {
    base: (
      <>
        <path d="M3 7.5v-3A1.5 1.5 0 0 1 4.5 3h3M16.5 3h3A1.5 1.5 0 0 1 21 4.5v3M21 16.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M7.5 21h-3A1.5 1.5 0 0 1 3 19.5v-3" />
        <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" {...T} />
        <path d="M9 9.5h6M12 9.5v5.5" />
      </>
    ),
  },

  // Une page de formulaire : un champ rempli, une case cochée.
  remplir: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <rect x="7" y="9" width="7.5" height="3" rx="0.8" {...T} />
        <path d="M8.5 10.5h3" />
        <rect x="7" y="14.5" width="3.2" height="3.2" rx="0.7" />
        <path d="M7.8 16.1l.8.8 1.3-1.5M11.8 16.1h2.7" />
      </>
    ),
  },

  // Deux versions face à face, les différences marquées.
  comparer: {
    base: (
      <>
        <rect x="2.5" y="4" width="8" height="14" rx="1.5" />
        <rect x="13.5" y="6" width="8" height="14" rx="1.5" {...T} />
        <path d="M4.5 8h4M4.5 11h2.5M15.5 10h4M15.5 13h4M15.5 16h2.5" />
        <path d="M10.6 12.5h2.6M12 11.2l1.3 1.3-1.3 1.3" />
      </>
    ),
  },

  // Une photo qui sort de la page.
  images: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
      </>
    ),
    cut: <rect x="9.5" y="10" width="12.5" height="10" rx="1.5" />,
    top: (
      <>
        <rect x="9.5" y="10" width="12.5" height="10" rx="1.5" {...T} />
        <path d="M10.5 18.5l3-3.2 2.2 2.2 1.6-1.6 3.2 2.6" />
        <circle cx="13.2" cy="13" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },

  // Les équerres du recadrage autour d'une photo.
  redimensionner: {
    base: (
      <>
        <path d="M6.5 2.5v13a2 2 0 0 0 2 2h13M2.5 6.5h13a2 2 0 0 1 2 2v13" />
        <rect x="8.5" y="8.5" width="7" height="7" rx="1" {...T} />
        <path d="M9.2 14.6l2-2.2 1.6 1.5 2.2-2.4" />
      </>
    ),
  },

  // La page bascule, son ancienne position reste en pointillés.
  pivoter: {
    base: (
      <>
        <path d={PAGE} strokeDasharray="2 2.2" strokeOpacity="0.5" transform="translate(-1 1) scale(0.92)" />
        <g transform="rotate(22 10 13)">
          <path d="M7 5.5h5l3.5 3.5V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V7A1.5 1.5 0 0 1 7 5.5z" {...T} />
          <path d="M12 5.5V8a1 1 0 0 0 1 1h2.5" />
        </g>
        <path d="M14.5 2.2a8.5 8.5 0 0 1 6.8 6.3M21.9 5.6l-.6 2.9-2.8-.9" />
      </>
    ),
  },

  // Une page avec sa pastille de numéro.
  numeroter: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <path d="M7 10.5h6M7 13.5h4" />
      </>
    ),
    cut: <circle cx="17.5" cy="17.5" r="4.6" />,
    top: (
      <>
        <circle cx="17.5" cy="17.5" r="4.6" {...T} />
        <path d="M16.4 16.2l1.5-1.2v5" />
      </>
    ),
  },

  // Un tampon posé en travers de la page.
  filigrane: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
      </>
    ),
    cut: <rect x="1.5" y="10.5" width="19" height="5" rx="1.2" transform="rotate(-28 11 13)" />,
    top: (
      <g transform="rotate(-28 11 13)">
        <rect x="1.5" y="10.5" width="19" height="5" rx="1.2" {...T} />
        <path d="M5 13h12" strokeDasharray="2.2 1.6" />
      </g>
    ),
  },

  // La page s'aplatit sous deux pressions.
  compresser: {
    base: (
      <>
        <path d="M5.5 8h9.5l3.5 3v3.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 14.5v-5A1.5 1.5 0 0 1 5.5 8z" {...T} />
        <path d="M7 12h7" />
        <path d="M11.25 1.5v4M8.5 3.3l2.75 2.5L14 3.3" />
        <path d="M11.25 22.5v-4M8.5 20.7l2.75-2.5 2.75 2.5" />
      </>
    ),
  },

  // Un bouclier validé sur la page.
  proteger: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <path d="M7 10.5h6M7 13.5h4" />
      </>
    ),
    cut: <path d="M17.5 12l4.5 1.7V17c0 2.8-1.9 4.6-4.5 5.4-2.6-.8-4.5-2.6-4.5-5.4v-3.3z" />,
    top: (
      <>
        <path d="M17.5 12l4.5 1.7V17c0 2.8-1.9 4.6-4.5 5.4-2.6-.8-4.5-2.6-4.5-5.4v-3.3z" {...T} />
        <path d="M15.7 17.2l1.3 1.3 2.4-2.6" />
      </>
    ),
  },

  // La clé que vous connaissez ouvre la page.
  deverrouiller: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <path d="M7 10.5h6M7 13.5h3" />
      </>
    ),
    cut: (
      <>
        <circle cx="15.3" cy="15.3" r="2.6" />
        <path d="M17.2 17.2l4.3 4.3" />
      </>
    ),
    top: (
      <>
        <circle cx="15.3" cy="15.3" r="2.6" {...T} />
        <path d="M17.2 17.2l4.3 4.3M19.5 19.5l-1.4 1.4M21 21l-1 1" />
      </>
    ),
  },

  // Une étiquette accrochée à la page : titre, auteur, mots-clés.
  metadonnees: {
    base: (
      <>
        <path d={PAGE} />
        <path d={FOLD} />
        <path d="M7 10.5h6M7 13.5h3" />
      </>
    ),
    cut: <path d="M13.5 13.5H18l4 4-4.5 4.5-4-4z" />,
    top: (
      <>
        <path d="M13.5 13.5H18l4 4-4.5 4.5-4-4z" {...T} />
        <circle cx="16" cy="16" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
};

export function ToolIcon({ id, className = "h-6 w-6" }: { id: string; className?: string }) {
  // L'id de l'outil d'abord : même si deux rendus séparés tombent sur le même
  // useId, ils partagent alors une découpe identique.
  const maskId = `ti-${id}-${useId().replace(/[^\w-]/g, "")}`;
  const g = GLYPHS[id];
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {!g ? (
        <circle cx="12" cy="12" r="8" />
      ) : g.cut ? (
        <>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28">
            <rect x="-2" y="-2" width="28" height="28" fill="#fff" stroke="none" />
            <g fill="#000" stroke="#000" strokeWidth="4">
              {g.cut}
            </g>
          </mask>
          <g mask={`url(#${maskId})`}>{g.base}</g>
          {g.top}
        </>
      ) : (
        <>
          {g.base}
          {g.top}
        </>
      )}
    </svg>
  );
}
