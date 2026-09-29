/**
 * Analyse des sélections de pages : "1-3, 5, 8-fin", "fin-1" (ordre inverse)…
 * Les numéros sont 1-indexés pour l'utilisateur, 0-indexés en sortie.
 */

const END_WORDS = new Set(["fin", "end", "last", "n", "z"]);

export class PageSelectionError extends Error {}

function parseNumber(token: string, total: number): number {
  const t = token.trim().toLowerCase();
  if (END_WORDS.has(t)) return total;
  if (!/^\d+$/.test(t)) throw new PageSelectionError(`« ${token.trim()} » n'est pas un numéro de page valide.`);
  const n = Number.parseInt(t, 10);
  if (n < 1 || n > total) throw new PageSelectionError(`La page ${n} n'existe pas (le document compte ${total} page${total > 1 ? "s" : ""}).`);
  return n;
}

/** Liste ordonnée (doublons conservés) des pages sélectionnées. Vide → toutes. */
export function parsePageList(input: string, total: number): number[] {
  const text = (input ?? "").trim();
  if (!text) return Array.from({ length: total }, (_, i) => i);
  const result: number[] = [];
  for (const part of text.split(/[,;]+/)) {
    if (!part.trim()) continue;
    const [a, b, ...rest] = part.split("-");
    if (rest.length) throw new PageSelectionError(`Plage invalide : « ${part.trim()} ».`);
    const start = parseNumber(a, total);
    const end = b === undefined ? start : parseNumber(b, total);
    const step = start <= end ? 1 : -1;
    for (let p = start; p !== end + step; p += step) result.push(p - 1);
  }
  return result;
}

/** Ensemble des pages sélectionnées (sans doublons, triées). */
export function parsePageSet(input: string, total: number): Set<number> {
  return new Set(parsePageList(input, total).sort((a, b) => a - b));
}

/** Plages distinctes : "1-3, 4-10" → [[0,1,2],[3..9]]. */
export function parseRanges(input: string, total: number): number[][] {
  const text = (input ?? "").trim();
  if (!text) throw new PageSelectionError("Indiquez au moins une plage de pages.");
  return text
    .split(/[,;]+/)
    .filter((p) => p.trim())
    .map((part) => parsePageList(part, total));
}
