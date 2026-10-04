/**
 * Traduit l'interface dans toutes les langues non vérifiées, une fois pour toutes,
 * avec l'API Gemini (offre gratuite, sans carte). Résultat : src/i18n/generated/<langue>.json,
 * embarqué dans le site : aucune IA n'est appelée quand un visiteur arrive.
 *
 *   GEMINI_API_KEY=… node scripts/translate-languages.mjs [langue…]
 *
 * - Reprend là où il s'est arrêté (quota quotidien atteint, coupure…).
 * - Offre gratuite : ~20 demandes par jour et par modèle. Quand un modèle est épuisé,
 *   le suivant de GEMINI_MODELS prend le relais (meilleurs modèles d'abord).
 * - Les langues les plus parlées passent en premier.
 * - Ne retraduit que les textes anglais modifiés depuis la dernière fois (empreintes).
 * - Refuse toute traduction qui perd ou invente une {variable}.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (rel) => import(pathToFileURL(path.join(ROOT, rel)).href);
const { default: en } = await load("src/i18n/messages/en.ts");
const { VERIFIED_LOCALES, WORLD_LANGUAGES, direction, languageName } = await load("src/i18n/locales.ts");
const { flatten, placeholders, textHash } = await load("src/i18n/flat.ts");

const OUT = path.join(ROOT, "src/i18n/generated");
const KEY = process.env.GEMINI_API_KEY?.trim();
const MODELS = (
  process.env.GEMINI_MODELS ||
  "gemini-3.6-flash,gemini-3.5-flash,gemini-3.7-flash,gemini-3-flash-preview,gemini-3.5-flash-lite,gemini-3.1-flash-lite,gemini-3.1-flash-lite-preview,gemini-flash-lite-latest"
)
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);
let modelIndex = 0;
const noThinking = new Set();
// Une demande par langue : Google limite le nombre de demandes, pas leur taille
const CHUNK = 400;

/** Langues les plus parlées d'abord : elles profitent des meilleurs modèles. */
const PRIORITY = ["it", "ru", "ja", "ko", "hi", "tr", "id", "vi", "pl", "nl", "uk", "sw", "wo", "bm", "ln", "ha", "yo", "ig", "am", "fa", "ur", "bn", "th", "ro", "ms", "fil", "he", "el", "cs", "sv", "hu", "da", "nb", "fi", "ta", "te", "mr", "pa", "gu", "ff", "rw", "mg", "so", "zu", "xh", "ak", "ee", "kg", "lg", "sn", "om", "ti"];
if (!KEY) {
  console.error("GEMINI_API_KEY manquant.");
  process.exit(1);
}

const source = flatten(en);
const sourceHashes = Object.fromEntries(Object.entries(source).map(([k, v]) => [k, textHash(v)]));
const requested = process.argv.slice(2);
const rank = (l) => (PRIORITY.includes(l) ? PRIORITY.indexOf(l) : PRIORITY.length);
const locales = (requested.length ? requested : [...WORLD_LANGUAGES].sort((a, b) => rank(a) - rank(b))).filter(
  (l) => !VERIFIED_LOCALES.includes(l),
);

function instructions(locale) {
  const name = languageName(locale, "en");
  return [
    `You are a professional software localizer. Translate the user interface strings of "pdffusion", a free web app to merge, convert and edit documents (PDF, Word, Excel…), from English into ${name} (language code "${locale}").`,
    "Rules:",
    "- Return ONLY a JSON object with exactly the same keys as the input, each value being the translated string.",
    "- Keep every {placeholder} exactly as written (same braces, same name).",
    "- Never translate: pdffusion, PDF, Word, Excel, PowerPoint, LibreOffice, OpenDocument, EPUB, JPG, PNG, WebP, AVIF, TIFF, GIF, SVG, DPI, AES-256, ZIP, Windows, Android, iPhone, Mac, Linux, Vercel, Render, GitHub, HTTPS, and file extensions in parentheses.",
    "- Keep symbols such as →, ↔, ✓, …, %, ° and numbers. In page range examples (like \"1-3, 8-end\"), keep the English word \"end\".",
    direction(locale) === "rtl" ? "- This is a right-to-left language: replace the arrow ← with →." : "",
    "- Use the natural, short, friendly wording a native speaker expects in a modern app, in the everyday script of the language.",
    "- Keys ending in seoTitle, seoDescription or meta.* are search-engine texts: use the words people actually type in a search engine in that language.",
  ]
    .filter(Boolean)
    .join("\n");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
class QuotaExhausted extends Error {}

/** Modèles dont le quota du jour est épuisé (ou absents du compte). */
const exhausted = new Set();

/** Passe au modèle suivant encore disponible (en boucle). */
function nextModel() {
  for (let step = 1; step <= MODELS.length; step++) {
    const candidate = (modelIndex + step) % MODELS.length;
    if (!exhausted.has(MODELS[candidate])) {
      modelIndex = candidate;
      return;
    }
  }
  throw new QuotaExhausted("tous les modèles sont épuisés");
}

async function gemini(locale, chunk) {
  let overloaded = 0;
  for (let attempt = 1; attempt <= 30; attempt++) {
    const model = MODELS[modelIndex];
    const thinking = noThinking.has(model) ? {} : { thinkingConfig: { thinkingLevel: "minimal" } };
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions(locale) }] },
        contents: [{ role: "user", parts: [{ text: JSON.stringify(chunk, null, 1) }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2, ...thinking },
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      const text = body.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
      try {
        return { model, result: JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)) };
      } catch {
        console.warn(`  ${locale} : réponse illisible, nouvel essai`);
        continue;
      }
    }
    const message = body.error?.message ?? res.statusText;
    // Réglage « sans réflexion » non pris en charge par ce modèle : on le retire
    if (res.status === 400 && /thinking/i.test(message) && !noThinking.has(model)) {
      noThinking.add(model);
      attempt--;
      continue;
    }
    // Quota du jour épuisé (ou modèle indisponible) : on l'écarte et on passe au suivant
    if ((res.status === 429 && /per ?day|daily|limit: 0/i.test(JSON.stringify(body))) || res.status === 404) {
      console.warn(`  ${model} : ${res.status === 404 ? "indisponible" : "quota du jour atteint"}`);
      exhausted.add(model);
      nextModel();
      continue;
    }
    // Modèle surchargé chez Google : après 2 échecs, on essaie le suivant plutôt que d'attendre
    if (res.status >= 500 && ++overloaded >= 2) {
      console.warn(`  ${model} : surchargé, modèle suivant`);
      overloaded = 0;
      nextModel();
      continue;
    }
    if (res.status === 429 || res.status >= 500) {
      const hint = /retry in ([\d.]+)s/i.exec(message)?.[1];
      const wait = hint ? Number(hint) * 1000 + 500 : 10_000;
      console.warn(`  ${locale} : HTTP ${res.status}, pause ${Math.round(wait / 1000)} s`);
      await sleep(wait);
      continue;
    }
    throw new Error(`${locale} : HTTP ${res.status} ${message}`);
  }
  throw new Error(`${locale} : abandon après 30 essais`);
}

mkdirSync(OUT, { recursive: true });
let done = 0;
let skipped = 0;
const report = [];

try {
  for (const locale of locales) {
    const file = path.join(OUT, `${locale}.json`);
    const current = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { hashes: {}, strings: {} };
    const todo = Object.keys(source).filter((k) => current.hashes[k] !== sourceHashes[k] || !current.strings[k]);
    if (!todo.length) {
      skipped++;
      continue;
    }
    const started = Date.now();
    for (let i = 0; i < todo.length; i += CHUNK) {
      const chunk = Object.fromEntries(todo.slice(i, i + CHUNK).map((k) => [k, source[k]]));
      let answer;
      try {
        answer = await gemini(locale, chunk);
      } catch (err) {
        if (err instanceof QuotaExhausted) throw err;
        console.warn(`  ${locale} : échec (${err.message}), langue suivante`);
        break;
      }
      const { model, result } = answer;
      current.model = model;
      for (const [k, original] of Object.entries(chunk)) {
        const value = result[k];
        if (typeof value === "string" && value.trim() && placeholders(value) === placeholders(original)) {
          current.strings[k] = value;
          current.hashes[k] = sourceHashes[k];
        }
      }
    }
    // Ordre stable, textes disparus de l'anglais retirés
    const keys = Object.keys(source).filter((k) => current.strings[k]);
    if (!keys.length) continue;
    const out = {
      language: locale,
      model: current.model,
      hashes: Object.fromEntries(keys.map((k) => [k, current.hashes[k]])),
      strings: Object.fromEntries(keys.map((k) => [k, current.strings[k]])),
    };
    writeFileSync(file, JSON.stringify(out, null, 1) + "\n");
    const coverage = keys.length / Object.keys(source).length;
    const unchanged = keys.filter((k) => out.strings[k] === source[k] && /[a-z]{4}/i.test(source[k])).length;
    report.push({ locale, coverage, unchanged });
    done++;
    console.log(
      `${locale.padEnd(4)} ${languageName(locale, "fr").padEnd(22)} ${Math.round(coverage * 100)} %` +
        `${unchanged > 30 ? `  ⚠ ${unchanged} textes restés en anglais` : ""}  (${out.model}, ${Math.round((Date.now() - started) / 1000)} s)`,
    );
  }
} catch (err) {
  if (!(err instanceof QuotaExhausted)) throw err;
  console.log(`\nQuota gratuit du jour atteint. Relancez demain : le travail reprendra où il s'est arrêté.\n(${err.message})`);
}

// Index chargé par le site (imports à la demande : une langue n'est lue que si un visiteur la choisit)
const available = WORLD_LANGUAGES.filter((l) => !VERIFIED_LOCALES.includes(l) && existsSync(path.join(OUT, `${l}.json`)));
writeFileSync(
  path.join(OUT, "index.ts"),
  `// Généré par scripts/translate-languages.mjs : ne pas modifier à la main.
import type { GeneratedTranslation } from "../static";

export const GENERATED: Record<string, () => Promise<{ default: GeneratedTranslation }>> = {
${available.map((l) => `  ${JSON.stringify(l)}: () => import("./${l}.json"),`).join("\n")}
};
`,
);
// Liste légère des langues (utilisée par le proxy et les pages fabriquées à l'avance)
writeFileSync(
  path.join(OUT, "locales.ts"),
  `// Généré par scripts/translate-languages.mjs : ne pas modifier à la main.
// Langues disponibles en traduction générée (liste légère, utilisable partout, y compris dans le proxy).
export const GENERATED_LOCALES: readonly string[] = ${JSON.stringify(available)};
`,
);
console.log(`\n${done} langue(s) traduite(s), ${skipped} déjà à jour, ${available.length} disponible(s) dans le site.`);
