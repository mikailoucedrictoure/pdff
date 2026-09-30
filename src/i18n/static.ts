/**
 * Traductions générées à l'avance (scripts/translate-languages.mjs) et embarquées dans le site.
 * Un texte n'est utilisé que si l'anglais n'a pas changé depuis sa traduction ; sinon l'anglais s'affiche
 * en attendant la prochaine exécution du script.
 */
import { flatten, rebuild, textHash, type Flat } from "./flat";
import { GENERATED } from "./generated";
import { VERIFIED_MESSAGES, type Messages } from "./messages";

export interface GeneratedTranslation {
  language: string;
  model: string;
  hashes: Record<string, string>;
  strings: Record<string, string>;
}

const SOURCE = VERIFIED_MESSAGES.en;
let sourceHashes: Flat | null = null;
const cache = new Map<string, Messages>();

export function hasStaticTranslation(locale: string): boolean {
  return Object.hasOwn(GENERATED, locale);
}

export async function loadStaticTranslation(locale: string): Promise<Messages | null> {
  const hit = cache.get(locale);
  if (hit) return hit;
  if (!hasStaticTranslation(locale)) return null;
  const { default: file } = await GENERATED[locale]();
  sourceHashes ??= Object.fromEntries(Object.entries(flatten(SOURCE)).map(([k, v]) => [k, textHash(v)]));
  const current: Flat = {};
  for (const [key, value] of Object.entries(file.strings)) if (file.hashes[key] === sourceHashes[key]) current[key] = value;
  const messages = rebuild(SOURCE, current);
  cache.set(locale, messages);
  return messages;
}
