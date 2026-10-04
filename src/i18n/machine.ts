/**
 * Traduction automatique de l'interface vers n'importe quelle langue.
 *
 * - Source : le dictionnaire anglais (le plus fiable pour les modèles).
 * - Moteur : Vercel AI Gateway (clé AI_GATEWAY_API_KEY, ou OIDC sur Vercel).
 * - Cache : mémoire + disque + Vercel Blob (seul cache durable sur Vercel), invalidé
 *   automatiquement quand les textes source changent.
 *   Une langue n'est donc traduite qu'une seule fois.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { head, put } from "@vercel/blob";
import { generateText } from "ai";
import { flatten, placeholders, rebuild, type Flat } from "./flat";
import { direction, languageName } from "./locales";
import { VERIFIED_MESSAGES, type Messages } from "./messages";

const MODEL = process.env.PDFF_TRANSLATION_MODEL || "anthropic/claude-haiku-4.5";
const CHUNK_SIZE = 70;

export function machineTranslationEnabled(): boolean {
  // Interrupteur : PDFF_MACHINE_TRANSLATION=off (ex. AI Gateway pas encore activé)
  if (process.env.PDFF_MACHINE_TRANSLATION === "off") return false;
  // Sur Vercel, le jeton OIDC est fourni à chaque requête (pas toujours en variable d'environnement)
  return !!(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL);
}

// ---------------------------------------------------------------- Cache

const SOURCE = VERIFIED_MESSAGES.en;
const SOURCE_HASH = createHash("sha1").update(JSON.stringify(SOURCE)).digest("hex").slice(0, 10);
const memory = new Map<string, Messages>();
const inflight = new Map<string, Promise<Messages>>();

function cacheDirs(): string[] {
  const dirs = [path.join(process.cwd(), ".cache", "i18n"), path.join(tmpdir(), "pdff-i18n")];
  if (process.env.PDFF_CACHE_DIR) dirs.unshift(process.env.PDFF_CACHE_DIR);
  return dirs;
}

const cacheFile = (dir: string, locale: string) => path.join(dir, `${locale}-${SOURCE_HASH}.json`);

export async function readCachedTranslation(locale: string): Promise<Messages | null> {
  const hit = memory.get(locale);
  if (hit) return hit;
  for (const dir of cacheDirs()) {
    try {
      const messages = JSON.parse(await readFile(cacheFile(dir, locale), "utf8")) as Messages;
      memory.set(locale, messages);
      return messages;
    } catch {
      // absent de ce dossier
    }
  }
  const fromBlob = await readBlobCache(locale);
  if (fromBlob) memory.set(locale, fromBlob);
  return fromBlob;
}

// Cache durable partagé par toutes les instances Vercel
const blobPath = (locale: string) => `i18n/${locale}-${SOURCE_HASH}.json`;
const blobMisses = new Map<string, number>();

async function readBlobCache(locale: string): Promise<Messages | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  // Évite d'interroger Blob à chaque page tant que la langue n'est pas traduite
  if ((blobMisses.get(locale) ?? 0) > Date.now()) return null;
  try {
    const { url } = await head(blobPath(locale));
    const res = await fetch(url);
    if (res.ok) return (await res.json()) as Messages;
  } catch {
    // pas encore traduite
  }
  blobMisses.set(locale, Date.now() + 30_000);
  return null;
}

async function writeCache(locale: string, messages: Messages) {
  memory.set(locale, messages);
  blobMisses.delete(locale);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(blobPath(locale), JSON.stringify(messages), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    }).catch((err) => console.error("[pdffusion] cache Blob des traductions :", err));
  }
  for (const dir of cacheDirs()) {
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(cacheFile(dir, locale), JSON.stringify(messages));
      return;
    } catch {
      // dossier en lecture seule (ex. Vercel) : on essaie le suivant
    }
  }
}

// ---------------------------------------------------------------- Traduction

function instructions(locale: string): string {
  const name = languageName(locale, "en");
  const rtl = direction(locale) === "rtl";
  return [
    `You are a professional software localizer. Translate the user interface strings of "pdffusion", a free web app to merge, convert and edit documents, from English into ${name} (language code "${locale}").`,
    "Rules:",
    "- Return ONLY a JSON object with exactly the same keys as the input, each value being the translated string. No commentary, no code fences.",
    "- Keep every {placeholder} exactly as written (same braces, same name).",
    "- Never translate: pdffusion, PDF, Word, Excel, PowerPoint, LibreOffice, OpenDocument, EPUB, JPG, PNG, WebP, AVIF, TIFF, GIF, DPI, AES-256, ZIP, Windows, and file extensions in parentheses.",
    "- Keep symbols such as →, ✓, …, %, ° and numbers. In page range examples (like \"1-3, 8-end\"), keep the English word \"end\".",
    rtl ? "- This is a right-to-left language: replace the arrow ← with →." : "",
    "- Use the natural, short, friendly wording a native speaker expects in a modern app. Use the everyday script of the language.",
  ]
    .filter(Boolean)
    .join("\n");
}

function parseJson(text: string): Flat {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Réponse sans JSON");
  return JSON.parse(text.slice(start, end + 1));
}

async function translateChunk(locale: string, chunk: Flat): Promise<Flat> {
  const { text } = await generateText({
    model: MODEL,
    instructions: instructions(locale),
    prompt: JSON.stringify(chunk, null, 1),
    temperature: 0.2,
    maxRetries: 2,
  });
  const result = parseJson(text);
  const valid: Flat = {};
  for (const [key, source] of Object.entries(chunk)) {
    const value = result[key];
    // Refuse les traductions qui perdent ou inventent une {variable}
    if (typeof value === "string" && value.trim() && placeholders(value) === placeholders(source)) valid[key] = value;
  }
  return valid;
}

async function translate(locale: string): Promise<Messages> {
  const flat = flatten(SOURCE);
  const entries = Object.entries(flat);
  const chunks: Flat[] = [];
  for (let i = 0; i < entries.length; i += CHUNK_SIZE) chunks.push(Object.fromEntries(entries.slice(i, i + CHUNK_SIZE)));
  const parts = await Promise.all(chunks.map((c) => translateChunk(locale, c)));
  const translated = Object.assign({}, ...parts) as Flat;
  const coverage = Object.keys(translated).length / entries.length;
  if (coverage < 0.8) throw new Error(`Traduction incomplète (${Math.round(coverage * 100)} %)`);
  const messages = rebuild(SOURCE, translated);
  await writeCache(locale, messages);
  return messages;
}

/** Traduit l'interface (une seule traduction en cours par langue). */
export function translateInterface(locale: string): Promise<Messages> {
  const cached = memory.get(locale);
  if (cached) return Promise.resolve(cached);
  let job = inflight.get(locale);
  if (!job) {
    job = readCachedTranslation(locale)
      .then((hit) => hit ?? translate(locale))
      .finally(() => inflight.delete(locale));
    inflight.set(locale, job);
  }
  return job;
}
