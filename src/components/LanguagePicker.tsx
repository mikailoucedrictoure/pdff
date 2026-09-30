"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { autonym, VERIFIED_LOCALES, WORLD_LANGUAGES } from "@/i18n/locales";

interface Entry {
  code: string;
  native: string;
  local: string;
  verified: boolean;
}

/** Bouton « globe » + fenêtre de choix parmi toutes les langues du monde. */
export function LanguagePicker() {
  const { locale, messages, setLocale, prefetchLocale, nameOf, translating } = useI18n();
  const t = messages.language;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      searchRef.current?.focus();
    } else if (!open && d.open) d.close();
  }, [open]);

  // Calculée seulement à l'ouverture, dans le navigateur : les noms de langues (Intl)
  // diffèrent légèrement entre Node.js et les navigateurs.
  const entries = useMemo<Entry[]>(() => {
    if (!open) return [];
    const verified = new Set<string>(VERIFIED_LOCALES);
    const codes = [...new Set<string>([...VERIFIED_LOCALES, ...WORLD_LANGUAGES])];
    return codes
      .map((code) => ({ code, native: autonym(code), local: nameOf(code), verified: verified.has(code) }))
      .sort((a, b) => Number(b.verified) - Number(a.verified) || a.local.localeCompare(b.local, locale));
  }, [open, nameOf, locale]);

  const q = query.trim().toLocaleLowerCase();
  const score = (e: Entry) => {
    const fields = [e.code, e.native, e.local].map((s) => s.toLocaleLowerCase());
    if (fields.some((s) => s === q)) return 3;
    if (fields.some((s) => s.startsWith(q))) return 2;
    if (fields.some((s) => s.split(/[\s()-]+/).some((word) => word.startsWith(q)))) return 1;
    return fields.some((s) => s.includes(q)) ? 0 : -1;
  };
  // Recherche : d'abord les correspondances exactes, puis celles qui commencent par le texte tapé
  const filtered = q
    ? entries
        .map((e) => ({ e, s: score(e) }))
        .filter((x) => x.s >= 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.e)
    : entries;
  const verifiedList = filtered.filter((e) => e.verified);
  const autoList = filtered.filter((e) => !e.verified);

  function choose(code: string | null) {
    setOpen(false);
    setQuery("");
    void setLocale(code);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.title}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-white/85 hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
        </svg>
        <span className="text-sm font-semibold uppercase">{translating ?? locale}</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialogRef.current && setOpen(false)}
        className="m-auto w-[min(92vw,560px)] rounded-[2rem] border border-line bg-surface p-0 text-ink shadow-[var(--shadow-lg)] backdrop:bg-night/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[80vh] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line p-5">
            <h2 className="font-display text-xl font-bold">{t.title}</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-bg hover:text-ink"
            >
              ✕
            </button>
          </div>
          <div className="p-4 pb-2">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-base outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
          </div>

          <div className="overflow-y-auto px-2 pb-4">
            {!q && (
              <button
                type="button"
                onClick={() => choose(null)}
                className="mx-2 mb-1 flex w-[calc(100%-1rem)] items-center gap-3 rounded-xl px-3 py-2.5 text-start hover:bg-bg"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand">✦</span>
                <span className="font-medium">{t.auto}</span>
              </button>
            )}
            <Group title={t.verified} list={verifiedList} current={locale} onPick={choose} onIntent={prefetchLocale} />
            <Group title={t.automatic} list={autoList} current={locale} onPick={choose} onIntent={prefetchLocale} />
            {!filtered.length && <p className="px-4 py-6 text-center text-sm text-muted">{t.noResult}</p>}
          </div>
        </div>
      </dialog>
    </>
  );
}

function Group({
  title,
  list,
  current,
  onPick,
  onIntent,
}: {
  title: string;
  list: Entry[];
  current: string;
  onPick: (code: string) => void;
  /** Survol ou focus : la page est préchargée, le clic l'affiche aussitôt. */
  onIntent: (code: string) => void;
}) {
  if (!list.length) return null;
  return (
    <section className="mt-2">
      <h3 className="px-4 pt-2 pb-1 text-xs font-semibold text-muted">{title}</h3>
      <ul>
        {list.map((e) => {
          const selected = e.code === current;
          return (
            <li key={e.code}>
              <button
                type="button"
                lang={e.code}
                onClick={() => onPick(e.code)}
                onPointerEnter={() => onIntent(e.code)}
                onFocus={() => onIntent(e.code)}
                aria-current={selected ? "true" : undefined}
                className={`mx-2 flex w-[calc(100%-1rem)] items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start transition ${
                  selected ? "bg-brand/10 text-brand" : "hover:bg-bg"
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{e.native}</span>
                  {e.local !== e.native && <span className="block truncate text-xs text-muted">{e.local}</span>}
                </span>
                <span className="shrink-0 text-xs font-semibold text-muted uppercase">{selected ? "✓" : e.code}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
