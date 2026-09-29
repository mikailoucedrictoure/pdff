import { FORMATS, SHOWCASE_EXTENSIONS } from "@/lib/core/formats";
import { FileGlyph } from "./FileGlyph";

function Row({ exts, reverse }: { exts: string[]; reverse?: boolean }) {
  // Liste doublée pour une boucle sans à-coup
  const items = [...exts, ...exts];
  return (
    <div className="marquee overflow-hidden py-2">
      <ul className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {items.map((ext, i) => (
          <li
            key={`${ext}-${i}`}
            aria-hidden={i >= exts.length}
            className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-surface py-2 pl-2 pr-4 shadow-sm"
          >
            <FileGlyph ext={ext} className="h-10 w-8" />
            <span className="text-sm font-medium whitespace-nowrap">{FORMATS[ext]?.label ?? ext.toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Tous les formats pris en charge, sur deux rangées qui défilent en sens inverse. */
export function FormatMarquee() {
  const half = Math.ceil(SHOWCASE_EXTENSIONS.length / 2);
  return (
    <div className="space-y-2">
      <Row exts={SHOWCASE_EXTENSIONS.slice(0, half)} />
      <Row exts={SHOWCASE_EXTENSIONS.slice(half)} reverse />
    </div>
  );
}
