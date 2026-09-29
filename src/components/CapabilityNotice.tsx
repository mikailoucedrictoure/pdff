"use client";

import { useCapabilities } from "./useCapabilities";

/** Avertit quand LibreOffice est absent (formats Office indisponibles). */
export function CapabilityNotice() {
  const caps = useCapabilities();
  if (!caps || caps.libreOffice) return null;
  return (
    <div className="rounded-xl border border-line bg-warn-soft p-4 text-sm text-warn-ink">
      <strong>Formats Word, Excel et PowerPoint désactivés.</strong> Installez LibreOffice (gratuit) pour les activer,
      puis redémarrez pdff. Sous Windows :{" "}
      <code className="rounded bg-surface/60 px-1.5 py-0.5 font-mono text-xs">winget install TheDocumentFoundation.LibreOffice</code>
    </div>
  );
}
