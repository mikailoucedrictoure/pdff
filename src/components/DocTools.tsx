"use client";

import { useEffect, useMemo, useState } from "react";
import { fmt } from "@/i18n/locales";
import type { ClientMessages } from "@/i18n/client-messages";
import { compareTexts, type Comparison } from "@/lib/client/compare";
import { fieldLabel, type FormField, readFormFields, readPagesText } from "@/lib/client/pdf-content";
import { fileThumbnails, type Thumbs } from "@/lib/client/thumbnails";

type WorkspaceText = ClientMessages["workspace"];
export type FormValues = Record<string, string | boolean | string[]>;

export function parseFormValues(raw: unknown): FormValues {
  try {
    const v = JSON.parse(String(raw || "{}"));
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  } catch {
    return {};
  }
}

/** Le champ est-il rempli (texte non vide, case cochée, choix fait) ? */
const isFilled = (v: FormValues[string] | undefined) => (Array.isArray(v) ? v.length > 0 : typeof v === "boolean" ? v : !!String(v ?? "").trim());

const inputCls =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base transition focus:border-brand focus:ring-4 focus:ring-brand/25 disabled:opacity-60 sm:text-sm";

/**
 * Formulaire PDF : chaque champ du document devient un champ simple à remplir,
 * et l'aperçu montre les réponses à leur place sur les pages.
 */
export function FormFiller({ file, values, onValues, w }: { file: File; values: FormValues; onValues: (v: FormValues) => void; w: WorkspaceText }) {
  // Résultat de la lecture, rattaché au fichier lu (un autre fichier = nouvelle lecture)
  const [loaded, setLoaded] = useState<{ file: File; fields: FormField[]; thumbs: Thumbs | null } | null>(null);
  const fields = loaded?.file === file ? loaded.fields : null;
  const thumbs = loaded?.file === file ? loaded.thumbs : null;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [found, pages] = await Promise.all([readFormFields(file).catch(() => []), fileThumbnails(file, file.name, { max: 12 }).catch(() => null)]);
      if (cancelled) return;
      setLoaded({ file, fields: found, thumbs: pages });
      // Valeurs déjà présentes dans le document : point de départ du formulaire
      onValues(Object.fromEntries(found.map((f) => [f.name, f.value])));
    })();
    return () => {
      cancelled = true;
    };
    // Lecture seulement quand le fichier change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  if (!fields) return <p className="text-sm text-muted">{w.formLoading}</p>;
  if (!fields.length) return <p className="rounded-xl bg-warn-soft px-4 py-3 text-sm text-warn-ink">{w.formNone}</p>;

  const set = (name: string, v: FormValues[string]) => onValues({ ...values, [name]: v });
  const filled = fields.filter((f) => isFilled(values[f.name])).length;

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_auto]">
      <div>
        <p className="mb-3 text-sm font-semibold">{fmt(w.formFilled, { n: filled, total: fields.length })}</p>
        <div className="space-y-3">
          {fields.map((f) => {
            const id = `field-${f.name}`;
            const label = fieldLabel(f.name);
            const v = values[f.name];
            if (f.kind === "checkbox")
              return (
                <label key={f.name} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-bg px-3.5 py-3 text-sm">
                  <input type="checkbox" checked={v === true} disabled={f.readOnly} onChange={(e) => set(f.name, e.target.checked)} className="h-5 w-5 accent-[var(--brand)]" />
                  {label}
                </label>
              );
            if (f.kind === "radio")
              return (
                <fieldset key={f.name}>
                  <legend className="mb-1.5 text-sm font-semibold">{label}</legend>
                  <div className="flex flex-wrap gap-2">
                    {f.options.map((o) => (
                      <label key={o.value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-bg px-3 py-2 text-sm has-[:checked]:border-brand has-[:checked]:bg-brand/10">
                        <input type="radio" name={id} value={o.value} checked={v === o.value} disabled={f.readOnly} onChange={() => set(f.name, o.value)} className="accent-[var(--brand)]" />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            return (
              <label key={f.name} className="block" htmlFor={id}>
                <span className="mb-1.5 block text-sm font-semibold">{label}</span>
                {f.kind === "select" ? (
                  <select id={id} value={String(v ?? "")} disabled={f.readOnly} onChange={(e) => set(f.name, e.target.value)} className={inputCls}>
                    <option value="">{w.formChoose}</option>
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : f.kind === "list" ? (
                  <select
                    id={id}
                    multiple
                    value={Array.isArray(v) ? v : []}
                    disabled={f.readOnly}
                    onChange={(e) => set(f.name, [...e.target.selectedOptions].map((o) => o.value))}
                    className={inputCls}
                  >
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : f.multiline ? (
                  <textarea id={id} rows={3} value={String(v ?? "")} disabled={f.readOnly} onChange={(e) => set(f.name, e.target.value)} className={inputCls} dir="auto" />
                ) : (
                  <input id={id} type="text" value={String(v ?? "")} disabled={f.readOnly} onChange={(e) => set(f.name, e.target.value)} className={inputCls} dir="auto" />
                )}
              </label>
            );
          })}
        </div>
      </div>

      {thumbs && thumbs.images.length > 0 && (
        <div className="space-y-3 xl:w-72" aria-label={w.previewTitle}>
          {thumbs.images.map((src, page) => (
            <div key={page} className="relative overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/10" style={{ containerType: "inline-size" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- vignette générée dans le navigateur */}
              <img src={src} alt="" className="block w-full" />
              {fields.flatMap((f) =>
                f.widgets
                  .filter((wd) => wd.page === page)
                  .map((wd, i) => {
                    const v = values[f.name];
                    const text =
                      f.kind === "checkbox" ? (v === true ? "✓" : "")
                      : f.kind === "radio" ? (v === wd.exportValue ? "●" : "")
                      : Array.isArray(v) ? v.join(", ")
                      : String(v ?? "");
                    return (
                      <span
                        key={`${f.name}-${i}`}
                        className="absolute flex items-center overflow-hidden rounded-sm bg-brand/10 px-0.5 whitespace-nowrap text-zinc-900 ring-1 ring-brand/40"
                        style={{
                          left: `${wd.x * 100}%`,
                          top: `${wd.y * 100}%`,
                          width: `${wd.w * 100}%`,
                          height: `${wd.h * 100}%`,
                          fontSize: `${Math.max(1.2, Math.min(wd.h * wd.aspect * 100 * 0.62, 3))}cqw`,
                          justifyContent: f.kind === "checkbox" || f.kind === "radio" ? "center" : "flex-start",
                        }}
                      >
                        {text}
                      </span>
                    );
                  }),
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Texte extrait de chaque fichier, gardé tant que le fichier ne change pas. */
const textCache = new WeakMap<File, Promise<string[]>>();
function textOf(file: File) {
  if (!textCache.has(file)) textCache.set(file, readPagesText(file));
  return textCache.get(file)!;
}

export async function compareFiles(oldFile: File, newFile: File, ignoreCase: boolean) {
  const [a, b] = await Promise.all([textOf(oldFile), textOf(newFile)]);
  return { comparison: compareTexts(a.join("\n"), b.join("\n"), ignoreCase), pagesA: a.length, pagesB: b.length, empty: !a.join("").trim() && !b.join("").trim() };
}

/** Différences entre deux versions, mot par mot, affichées dès le dépôt des deux fichiers. */
export function CompareView({ files, ignoreCase, w }: { files: File[]; ignoreCase: boolean; w: WorkspaceText }) {
  type Result = { comparison: Comparison; pagesA: number; pagesB: number; empty: boolean } | null;
  // Résultat rattaché aux fichiers et au réglage qui l'ont produit (sinon : comparaison en cours)
  const [done, setDone] = useState<{ a: File; b: File; ignoreCase: boolean; value: Result } | null>(null);
  const [oldFile, newFile] = files;
  const result: Result | "loading" = done && done.a === oldFile && done.b === newFile && done.ignoreCase === ignoreCase ? done.value : "loading";

  useEffect(() => {
    if (!oldFile || !newFile) return;
    let cancelled = false;
    compareFiles(oldFile, newFile, ignoreCase)
      .then((value) => !cancelled && setDone({ a: oldFile, b: newFile, ignoreCase, value }))
      .catch(() => !cancelled && setDone({ a: oldFile, b: newFile, ignoreCase, value: null }));
    return () => {
      cancelled = true;
    };
  }, [oldFile, newFile, ignoreCase]);

  const body = useMemo(() => {
    if (!result || result === "loading") return null;
    return result.comparison.parts.map((p, i) => {
      if (p.kind === "added")
        return (
          <ins key={i} className="rounded-sm bg-ok-soft text-ok no-underline">
            {p.text}
          </ins>
        );
      if (p.kind === "removed")
        return (
          <del key={i} className="rounded-sm bg-danger-soft text-danger">
            {p.text}
          </del>
        );
      if (p.skipped) {
        const [head, tail] = p.text.split("\u0000");
        return (
          <span key={i}>
            {head}
            <span className="my-2 block text-center text-xs text-muted italic">{fmt(w.compareSkipped, { n: p.skipped })}</span>
            {tail}
          </span>
        );
      }
      return <span key={i}>{p.text}</span>;
    });
  }, [result, w.compareSkipped]);

  if (!oldFile || !newFile) return <p className="text-sm text-muted">{w.compareNeedTwo}</p>;
  if (!result || result === "loading") return <p className="text-sm text-muted">{w.compareLoading}</p>;
  if (result.empty) return <p className="rounded-xl bg-warn-soft px-4 py-3 text-sm text-warn-ink">{w.compareNoText}</p>;
  const { added, removed } = result.comparison;

  return (
    <div>
      <div className="mb-3 grid gap-2 text-sm sm:grid-cols-2">
        <p className="truncate rounded-lg bg-danger-soft px-3 py-2 text-danger" dir="auto">
          <span className="font-semibold">{w.compareOld} :</span> {oldFile.name}
        </p>
        <p className="truncate rounded-lg bg-ok-soft px-3 py-2 text-ok" dir="auto">
          <span className="font-semibold">{w.compareNew} :</span> {newFile.name}
        </p>
      </div>
      <p className="font-semibold">{added || removed ? fmt(w.compareSummary, { added, removed }) : w.compareSame}</p>
      <p className="mt-0.5 text-xs text-muted">
        {fmt(w.comparePages, { a: result.pagesA, b: result.pagesB })}. {w.compareLegend}
      </p>
      {(added > 0 || removed > 0) && (
        <div aria-label={w.compareReport} role="region" className="mt-3 max-h-[36rem] overflow-auto rounded-xl border border-line bg-bg p-4 text-sm leading-relaxed whitespace-pre-wrap" dir="auto" tabIndex={0}>
          {body}
        </div>
      )}
    </div>
  );
}
