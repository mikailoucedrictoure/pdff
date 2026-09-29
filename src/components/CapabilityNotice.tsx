"use client";

import { useI18n } from "@/i18n/client";
import { useCapabilities } from "./useCapabilities";

/** Avertit quand LibreOffice est absent (formats Office indisponibles). */
export function CapabilityNotice() {
  const caps = useCapabilities();
  const t = useI18n().messages.notice;
  if (!caps || caps.libreOffice) return null;
  return (
    <div className="rounded-2xl border border-line bg-warn-soft p-4 text-sm text-warn-ink">
      <strong>{t.officeMissingTitle}</strong> {t.officeMissingText}{" "}
      <code dir="ltr" className="rounded bg-surface/60 px-1.5 py-0.5 font-mono text-xs">
        winget install TheDocumentFoundation.LibreOffice
      </code>
    </div>
  );
}
