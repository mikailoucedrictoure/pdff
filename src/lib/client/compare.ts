/**
 * Comparaison de deux versions d'un texte, mot par mot, et rapport HTML autonome.
 */
import { diffWords } from "diff";

export interface DiffPart {
  kind: "same" | "added" | "removed";
  text: string;
  /** Morceau identique trop long : seul le début et la fin sont montrés. */
  skipped?: number;
}

export interface Comparison {
  parts: DiffPart[];
  added: number;
  removed: number;
}

const words = (text: string) => (text.match(/\S+/g) ?? []).length;
/** Mots gardés de part et d'autre d'une modification ; au-delà, le texte identique est replié. */
const CONTEXT = 25;

export function compareTexts(oldText: string, newText: string, ignoreCase: boolean): Comparison {
  const changes = diffWords(oldText, newText, { ignoreCase });
  let added = 0;
  let removed = 0;
  const parts: DiffPart[] = changes.map((c) => {
    if (c.added) added += words(c.value);
    if (c.removed) removed += words(c.value);
    return { kind: c.added ? "added" : c.removed ? "removed" : "same", text: c.value };
  });
  // Les longs passages identiques sont repliés pour garder les changements visibles
  for (const [i, p] of parts.entries()) {
    if (p.kind !== "same") continue;
    const tokens = p.text.split(/(\s+)/);
    const n = words(p.text);
    const keepStart = i === 0 ? 0 : CONTEXT;
    const keepEnd = i === parts.length - 1 ? 0 : CONTEXT;
    if (n <= keepStart + keepEnd + 10) continue;
    const head = tokens.slice(0, keepStart * 2).join("");
    const tail = tokens.slice(tokens.length - keepEnd * 2).join("");
    parts[i] = { kind: "same", text: `${head}\u0000${tail}`, skipped: n - keepStart - keepEnd };
  }
  return { parts, added, removed };
}

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Rapport lisible dans n'importe quel navigateur (et imprimable en PDF). */
export function comparisonReport(c: Comparison, t: { title: string; oldName: string; newName: string; summary: string; legend: string; pages: string; skipped: (n: number) => string; lang: string; dir: string }): string {
  const body = c.parts
    .map((p) => {
      if (p.kind === "added") return `<ins>${escape(p.text)}</ins>`;
      if (p.kind === "removed") return `<del>${escape(p.text)}</del>`;
      if (p.skipped) {
        const [head, tail] = p.text.split("\u0000");
        return `${escape(head)}<span class="skip">${escape(t.skipped(p.skipped))}</span>${escape(tail)}`;
      }
      return escape(p.text);
    })
    .join("");
  return `<!DOCTYPE html>
<html lang="${escape(t.lang)}" dir="${escape(t.dir)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(t.title)}</title>
<style>
body{font:16px/1.6 system-ui,sans-serif;max-width:860px;margin:2rem auto;padding:0 1rem;color:#17143a}
h1{font-size:1.6rem;margin:0 0 .5rem}.meta{color:#625e86;margin:.2rem 0}
.box{white-space:pre-wrap;border:1px solid #e1def7;border-radius:12px;padding:1.2rem;margin-top:1.2rem}
ins{background:#d4f5e2;color:#0b5e36;text-decoration:none;border-radius:3px}
del{background:#fde3e1;color:#a3221a;border-radius:3px}
.skip{display:block;margin:.6rem 0;color:#625e86;font-style:italic;text-align:center}
footer{margin-top:2rem;color:#625e86;font-size:.85rem}
</style></head><body>
<h1>${escape(t.title)}</h1>
<p class="meta">${escape(t.oldName)} → ${escape(t.newName)}</p>
<p class="meta"><strong>${escape(t.summary)}</strong> · ${escape(t.pages)}</p>
<p class="meta">${escape(t.legend)}</p>
<div class="box">${body}</div>
<footer>pdffusion — ${escape(new Date().toISOString().slice(0, 10))}</footer>
</body></html>`;
}
