import Link from "next/link";
import type { ToolMeta } from "@/lib/core/tools";
import { ToolIcon } from "./ToolIcon";

const CATEGORY_TINT: Record<ToolMeta["category"], string> = {
  organiser: "#6d5cff",
  convertir: "#2b6cf0",
  modifier: "#f0662b",
  securite: "#1d9e5a",
};

/**
 * Carte d'outil, rendue sur le serveur (aucun code envoyé au navigateur).
 * L'inclinaison 3D sous le pointeur est gérée pour toutes les cartes par <TiltEffect />.
 */
export function ToolCard({ tool, name, tagline, href }: { tool: ToolMeta; name: string; tagline: string; href: string }) {
  const tint = CATEGORY_TINT[tool.category];
  return (
    <Link
      href={href}
      className="tilt group relative flex items-start gap-4 overflow-hidden rounded-3xl border border-line bg-surface p-5 active:scale-[0.98]"
    >
      <span className="tilt-glare pointer-events-none absolute inset-0" aria-hidden="true" />
      <span
        className="tilt-lift grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${tint}, color-mix(in oklab, ${tint} 60%, #000))`, boxShadow: `0 10px 24px -8px ${tint}` }}
      >
        <ToolIcon id={tool.id} />
      </span>
      <span className="tilt-lift min-w-0">
        <span className="font-display block text-lg leading-tight font-semibold">{name}</span>
        <span className="mt-1 block text-sm leading-snug text-muted">{tagline}</span>
      </span>
    </Link>
  );
}
