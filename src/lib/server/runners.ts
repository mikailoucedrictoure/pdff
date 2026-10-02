/**
 * Exécuteurs des outils (côté serveur). Un exécuteur par outil déclaré dans
 * `src/lib/core/tools.ts`.
 */
import { randomBytes } from "node:crypto";
import { baseName, canonicalExt, extOf } from "@/lib/core/formats";
import { PageSelectionError, parsePageList, parsePageSet, parseRanges } from "@/lib/core/pages";
import { renamedFiles } from "@/lib/core/rename";
import { getTool, type OptionValues } from "@/lib/core/tools";
import { availableEngines, convertFile, ensurePdf } from "./convert";
import * as pdf from "./engines/pdf";
import { decrypt, encrypt, REDACT_PATTERNS, type RedactOptions, type RedactPattern, redact } from "./engines/mupdf";
import { type FileData, UserError } from "./types";

type Runner = (files: FileData[], o: Options) => Promise<FileData[]>;

class Options {
  constructor(private values: OptionValues) {}
  str(name: string): string {
    const v = this.values[name];
    return v === undefined || v === null ? "" : String(v);
  }
  num(name: string, fallback: number): number {
    const n = Number(this.values[name]);
    return Number.isFinite(n) ? n : fallback;
  }
  bool(name: string): boolean {
    const v = this.values[name];
    return v === true || v === "true" || v === "on";
  }
}

function requirePdf(file: FileData) {
  if (canonicalExt(extOf(file.name)) !== "pdf") {
    throw new UserError("notPdfConvertFirst", { name: file.name });
  }
}

/** Applique `fn` à chaque PDF, avec un message d'erreur qui cite le fichier. */
async function eachPdf(files: FileData[], fn: (file: FileData, doc: Awaited<ReturnType<typeof pdf.loadPdf>>) => Promise<FileData[] | FileData>) {
  const out: FileData[] = [];
  for (const file of files) {
    requirePdf(file);
    const doc = await pdf.loadPdf(file);
    try {
      const result = await fn(file, doc);
      out.push(...(Array.isArray(result) ? result : [result]));
    } catch (err) {
      if (err instanceof PageSelectionError) throw new UserError(err.key, err.params, file.name);
      throw err;
    }
  }
  return out;
}

const runners: Record<string, Runner> = {
  async fusionner(files, o) {
    const engines = await availableEngines();
    const parts: pdf.MergePart[] = [];
    for (const file of files) {
      const asPdf = await ensurePdf(file, engines);
      parts.push({ title: baseName(file.name), pdf: await pdf.loadPdf(asPdf) });
    }
    const name = files.length === 1 ? `${baseName(files[0].name)}.pdf` : "pdff-fusion.pdf";
    return [{ name, data: await pdf.merge(parts, o.bool("bookmarks")) }];
  },

  async convertir(files, o) {
    const target = o.str("target");
    if (!target) throw new UserError("chooseTarget");
    const engines = await availableEngines();
    const settings = { dpi: o.num("dpi", 150), quality: o.num("quality", 90) };
    const out: FileData[] = [];
    for (const file of files) out.push(...(await convertFile(file, target, settings, engines)));
    return out;
  },

  diviser: (files, o) =>
    eachPdf(files, async (file, doc) => {
      const total = doc.getPageCount();
      const mode = o.str("mode");
      let groups: number[][];
      if (mode === "each") groups = doc.getPageIndices().map((i) => [i]);
      else if (mode === "every") {
        const n = Math.max(1, Math.floor(o.num("every", 1)));
        groups = [];
        for (let i = 0; i < total; i += n) groups.push(doc.getPageIndices().slice(i, i + n));
      } else groups = parseRanges(o.str("ranges"), total);

      const width = String(groups.length).length;
      const outputs: FileData[] = [];
      for (const [k, g] of groups.entries()) {
        const label = g.length === 1 ? `page-${g[0] + 1}` : `pages-${g[0] + 1}-${g[g.length - 1] + 1}`;
        outputs.push({
          name: `${baseName(file.name)}-${String(k + 1).padStart(width, "0")}-${label}.pdf`,
          data: await pdf.pickPages(doc, g),
        });
      }
      return outputs;
    }),

  extraire: (files, o) =>
    eachPdf(files, async (file, doc) => {
      const selected = parsePageSet(o.str("pages"), doc.getPageCount());
      const keep = doc.getPageIndices().filter((i) => (o.str("mode") === "remove" ? !selected.has(i) : selected.has(i)));
      if (!keep.length) throw new UserError("emptyResult");
      return { name: pdf.pdfName(file, "-extrait"), data: await pdf.pickPages(doc, keep) };
    }),

  organiser: (files, o) =>
    eachPdf(files, async (file, doc) => {
      const order = o.bool("reverse")
        ? doc.getPageIndices().reverse()
        : parsePageList(o.str("order"), doc.getPageCount());
      return { name: pdf.pdfName(file, "-reorganise"), data: await pdf.pickPages(doc, order) };
    }),

  pivoter: (files, o) =>
    eachPdf(files, async (file, doc) => ({
      name: pdf.pdfName(file, "-pivote"),
      data: await pdf.rotate(doc, parsePageSet(o.str("pages"), doc.getPageCount()), o.num("angle", 90)),
    })),

  numeroter: (files, o) =>
    eachPdf(files, async (file, doc) => ({
      name: pdf.pdfName(file, "-numerote"),
      data: await pdf.addPageNumbers(doc, {
        position: o.str("position") as pdf.NumberingOptions["position"],
        format: o.str("format") || "{n}",
        start: o.num("start", 1),
        size: o.num("size", 10),
        pages: parsePageSet(o.str("pages"), doc.getPageCount()),
      }),
    })),

  filigrane: (files, o) =>
    eachPdf(files, async (file, doc) => ({
      name: pdf.pdfName(file, "-filigrane"),
      data: await pdf.watermark(doc, {
        text: o.str("text"),
        size: o.num("size", 60),
        opacity: Math.min(1, Math.max(0.01, o.num("opacity", 20) / 100)),
        rotation: o.num("rotation", 45),
        color: (o.str("color") || "gray") as pdf.WatermarkOptions["color"],
        pages: parsePageSet(o.str("pages"), doc.getPageCount()),
      }),
    })),

  async compresser(files, o) {
    const out: FileData[] = [];
    for (const file of files) {
      requirePdf(file);
      const data = await pdf.compress(file, (o.str("level") || "recommended") as pdf.CompressionLevel);
      out.push({ name: pdf.pdfName(file, "-compresse"), data });
    }
    return out;
  },

  async proteger(files, o) {
    const password = o.str("password");
    const restricted = o.bool("noPrint") || o.bool("noCopy") || o.bool("noEdit");
    if (!password && !restricted) throw new UserError("passwordOrRestriction");
    const out: FileData[] = [];
    for (const file of files) {
      requirePdf(file);
      const data = await encrypt(file, {
        userPassword: password,
        ownerPassword: randomBytes(18).toString("base64url"),
        noPrint: o.bool("noPrint"),
        noCopy: o.bool("noCopy"),
        noEdit: o.bool("noEdit"),
      });
      out.push({ name: pdf.pdfName(file, "-protege"), data });
    }
    return out;
  },

  async deverrouiller(files, o) {
    const out: FileData[] = [];
    for (const file of files) {
      requirePdf(file);
      out.push({ name: pdf.pdfName(file, "-deverrouille"), data: await decrypt(file, o.str("password")) });
    }
    return out;
  },

  // Le navigateur renomme lui-même (rien n'est envoyé) ; ce chemin sert aux appels directs de l'API
  async renommer(files, o) {
    const names = renamedFiles(files.map((f) => f.name), o.str("name"), o.str("ext"));
    return files.map((f, i) => ({ name: names[i], data: f.data }));
  },

  signer: (files, o) =>
    eachPdf(files, async (file, doc) => {
      const match = /^data:image\/(png|jpeg);base64,([A-Za-z0-9+/=]+)$/.exec(o.str("signature"));
      if (!match) throw new UserError("signatureMissing");
      const total = doc.getPageCount();
      const where = o.str("where") || "last";
      const pages =
        where === "all" ? new Set(doc.getPageIndices()) : where === "first" ? new Set([0]) : where === "custom" ? parsePageSet(o.str("pages"), total) : new Set([total - 1]);
      const widths: Record<string, number> = { small: 0.18, medium: 0.26, large: 0.36 };
      return {
        name: pdf.pdfName(file, "-signe"),
        data: await pdf.placeSignature(doc, {
          image: new Uint8Array(Buffer.from(match[2], "base64")),
          position: (o.str("position") || "bottom-right") as pdf.SignatureOptions["position"],
          width: widths[o.str("size")] ?? widths.medium,
          caption: o.bool("date") ? o.str("dateText").slice(0, 60) : "",
          pages,
        }),
      };
    }),

  async caviarder(files, o) {
    const options: RedactOptions = {
      terms: o
        .str("terms")
        .split(/[\n,;]+/)
        .map((t) => t.trim())
        .filter((t) => t.length >= 2)
        .slice(0, 200),
      patterns: o
        .str("patterns")
        .split(",")
        .filter((p): p is RedactPattern => p in REDACT_PATTERNS),
      areas: parseAreas(o.str("areas")),
    };
    if (!options.terms.length && !options.patterns.length && !options.areas.length) throw new UserError("redactNothing");
    const out: FileData[] = [];
    let found = 0;
    for (const [index, file] of files.entries()) {
      requirePdf(file);
      // Les zones tracées appartiennent à un fichier précis de la liste
      const { data, count } = await redact(file, { ...options, areas: options.areas.filter((a) => a.file === index) });
      found += count;
      out.push({ name: pdf.pdfName(file, "-caviarde"), data });
    }
    if (!found) throw new UserError("redactNone");
    return out;
  },

  metadonnees: (files, o) =>
    eachPdf(files, async (file, doc) => ({
      name: file.name,
      data: await pdf.setMetadata(doc, {
        title: o.str("title"),
        author: o.str("author"),
        subject: o.str("subject"),
        keywords: o.str("keywords"),
        clear: o.bool("clear"),
      }),
    })),
};

/** Zones de caviardage envoyées par le navigateur, vérifiées une à une. */
function parseAreas(raw: string): RedactOptions["areas"] {
  if (!raw) return [];
  try {
    const list: unknown = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    const unit = (n: unknown) => typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 1;
    return list
      .filter((a) => a && Number.isInteger(a.page) && a.page >= 0 && unit(a.x) && unit(a.y) && unit(a.w) && unit(a.h))
      .slice(0, 2000)
      .map((a) => ({ file: Number.isInteger(a.file) && a.file >= 0 ? a.file : 0, page: a.page, x: a.x, y: a.y, w: a.w, h: a.h }));
  } catch {
    return [];
  }
}

export async function runTool(toolId: string, files: FileData[], values: OptionValues): Promise<FileData[]> {
  const runner = runners[toolId];
  if (!runner) throw new UserError("unknownTool");
  try {
    const options = new Options(values);
    const out = await runner(files, options);
    // Format du résultat choisi par l'utilisateur (PDF par défaut)
    const output = canonicalExt(options.str("output").toLowerCase());
    const hasOutput = getTool(toolId)?.options.some((opt) => opt.type === "output");
    if (!hasOutput || !output || output === "pdf") return out;
    const engines = await availableEngines();
    const converted: FileData[] = [];
    for (const file of out) {
      if (canonicalExt(extOf(file.name)) !== "pdf") converted.push(file);
      else converted.push(...(await convertFile(file, output, { dpi: 150, quality: 90 }, engines)));
    }
    return converted;
  } catch (err) {
    if (err instanceof PageSelectionError) throw new UserError(err.key, err.params);
    throw err;
  }
}
