/**
 * Textes d'interface « à plat » : { "home.title": "…", "home.steps[0].text": "…" }.
 * Module sans dépendance : utilisé par le site ET par scripts/translate-languages.mjs.
 */

export type Flat = Record<string, string>;

export function flatten(value: unknown, prefix = "", out: Flat = {}): Flat {
  if (typeof value === "string") out[prefix] = value;
  else if (Array.isArray(value)) value.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
}

/** Reconstruit la structure de `shape` avec les textes de `flat` (repli sur `shape`). */
export function rebuild<T>(shape: T, flat: Flat, prefix = ""): T {
  if (typeof shape === "string") return (flat[prefix] ?? shape) as T;
  if (Array.isArray(shape)) return shape.map((v, i) => rebuild(v, flat, `${prefix}[${i}]`)) as T;
  if (shape && typeof shape === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(shape)) out[k] = rebuild(v, flat, prefix ? `${prefix}.${k}` : k);
    return out as T;
  }
  return shape;
}

/** Les {variables} d'un texte, triées : deux traductions valides ont les mêmes. */
export const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join("|");

/** Empreinte courte d'un texte (FNV-1a) : repère les textes anglais modifiés depuis leur traduction. */
export function textHash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}
