"use client";

import { useSyncExternalStore } from "react";

const KEY = "pdff-motion";

/**
 * Arrête ou relance toutes les animations du site (WCAG 2.2.2). Le choix est mémorisé
 * sur l'appareil et appliqué avant l'affichage par le script de MOTION_INIT_SCRIPT.
 */
/** État lu directement sur <html data-motion> : toujours synchronisé, même avec plusieurs boutons. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => observer.disconnect();
}
const isPaused = () => document.documentElement.dataset.motion === "paused";

export function MotionToggle({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  function toggle() {
    const next = !paused;
    if (next) document.documentElement.dataset.motion = "paused";
    else delete document.documentElement.dataset.motion;
    try {
      if (next) localStorage.setItem(KEY, "paused");
      else localStorage.removeItem(KEY);
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour cette page
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-medium text-ink hover:border-brand"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M8 5.5v13l10.5-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
      </svg>
      {paused ? playLabel : pauseLabel}
    </button>
  );
}

/** Applique le choix mémorisé avant le premier affichage (aucune animation ne démarre pour rien). */
export const MOTION_INIT_SCRIPT = `try{if(localStorage.getItem("${KEY}")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}`;
