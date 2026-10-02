"use client";

import { useEffect } from "react";

/**
 * Inclinaison 3D des cartes `.tilt` sous la souris, avec reflet.
 * Un seul écouteur pour toute la page, et au plus une mise à jour par image.
 */
export function TiltEffect() {
  useEffect(() => {
    let current: HTMLElement | null = null;
    let raf = 0;
    let x = 0.5;
    let y = 0.5;

    function apply() {
      raf = 0;
      if (!current) return;
      current.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
      current.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
      current.style.setProperty("--gx", `${x * 100}%`);
      current.style.setProperty("--gy", `${y * 100}%`);
    }
    function reset(el: HTMLElement) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(".tilt") ?? null;
      if (el !== current) {
        if (current) reset(current);
        current = el;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      x = (e.clientX - r.left) / r.width;
      y = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function onLeave() {
      if (current) reset(current);
      current = null;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
}
