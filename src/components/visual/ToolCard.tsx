"use client";

import Link from "next/link";
import { useRef } from "react";
import { useI18n } from "@/i18n/client";
import type { ToolMeta } from "@/lib/core/tools";
import { ToolIcon } from "./ToolIcon";

const CATEGORY_TINT: Record<ToolMeta["category"], string> = {
  organiser: "#6d5cff",
  convertir: "#2b6cf0",
  modifier: "#f0662b",
  securite: "#1d9e5a",
};

/** Carte d'outil qui s'incline en 3D sous le pointeur, avec reflet. */
export function ToolCard({ tool }: { tool: ToolMeta }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const tint = CATEGORY_TINT[tool.category];
  const { messages, href } = useI18n();
  const text = messages.tools[tool.id];

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  }
  function onLeave() {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <Link
      ref={ref}
      href={href(`/outils/${tool.id}`)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
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
        <span className="font-display block text-lg leading-tight font-semibold">{text.name}</span>
        <span className="mt-1 block text-sm leading-snug text-muted">{text.tagline}</span>
      </span>
    </Link>
  );
}
