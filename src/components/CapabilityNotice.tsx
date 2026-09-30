"use client";

import { useI18n } from "@/i18n/client";
import type { Capabilities } from "@/lib/core/capabilities";

/** Avertit quand LibreOffice est absent (formats Office indisponibles). Message destiné au développeur : jamais en production. */
export function CapabilityNotice({ caps }: { caps: Capabilities }) {
  const t = useI18n().messages.notice;
  if (process.env.NODE_ENV === "production" || !caps || caps.libreOffice) return null;
  return (
    <div className="rounded-2xl border border-line bg-warn-soft p-4 text-sm text-warn-ink">
      <strong>{t.officeMissingTitle}</strong> {t.officeMissingText}{" "}
      <code dir="ltr" className="rounded bg-surface/60 px-1.5 py-0.5 font-mono text-xs">
        winget install TheDocumentFoundation.LibreOffice
      </code>
    </div>
  );
}
