/**
 * Moteur PDF (pdf-lib) : fusion, découpe, rotation, numérotation, filigrane,
 * métadonnées, compression des images.
 */
import { inflateSync } from "node:zlib";
import sharp, { type Sharp } from "sharp";
import {
  PDFArray,
  PDFBool,
  PDFCheckBox,
  PDFDropdown,
  PDFOptionList,
  PDFRadioGroup,
  PDFTextField,
  PDFDict,
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFRef,
  PDFHexString,
  StandardFonts,
  degrees,
  rgb,
} from "pdf-lib";
import { limits } from "@/config/limits";
import { baseName } from "@/lib/core/formats";
import { type FileData, UserError } from "../types";
import { decrypt, rewritePdf } from "./mupdf";

/**
 * Ouvre un PDF de façon robuste : les PDF abîmés sont réparés par MuPDF,
 * les PDF chiffrés sans mot de passe d'ouverture sont déchiffrés.
 */
export async function loadPdf(file: FileData): Promise<PDFDocument> {
  try {
    const doc = await PDFDocument.load(file.data, { updateMetadata: false });
    if (!doc.isEncrypted) return doc;
    return await PDFDocument.load(await decrypt(file), { updateMetadata: false });
  } catch (err) {
    if (err instanceof UserError) throw err;
    try {
      const repaired = await rewritePdf(file, "encrypt=none,garbage=1");
      return await PDFDocument.load(repaired, { updateMetadata: false });
    } catch (err2) {
      if (err2 instanceof UserError) throw err2;
      throw new UserError("damagedPdf", { name: file.name });
    }
  }
}

function assertPageLimit(count: number) {
  if (count > limits.maxPages) {
    throw new UserError("pageLimitResult", { count, max: limits.maxPages });
  }
}

async function save(doc: PDFDocument): Promise<Uint8Array> {
  doc.setProducer("pdffusion");
  doc.setModificationDate(new Date());
  return doc.save({ useObjectStreams: true });
}

/** Nouveau PDF contenant les pages `indices` (0-indexées, doublons permis) de `src`. */
export async function pickPages(src: PDFDocument, indices: number[]): Promise<Uint8Array> {
  assertPageLimit(indices.length);
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, indices);
  pages.forEach((p) => out.addPage(p));
  return save(out);
}

// ---------------------------------------------------------------- Fusion

export interface MergePart {
  /** Nom affiché dans le signet. */
  title: string;
  pdf: PDFDocument;
}

export async function merge(parts: MergePart[], bookmarks: boolean): Promise<Uint8Array> {
  const total = parts.reduce((n, p) => n + p.pdf.getPageCount(), 0);
  assertPageLimit(total);
  const out = await PDFDocument.create();
  const starts: { title: string; page: PDFRef }[] = [];
  for (const part of parts) {
    const copied = await out.copyPages(part.pdf, part.pdf.getPageIndices());
    copied.forEach((p, i) => {
      const added = out.addPage(p);
      if (i === 0) starts.push({ title: part.title, page: added.ref });
    });
  }
  if (bookmarks && starts.length > 1) addOutline(out, starts);
  return save(out);
}

/** Signets (plan du document) : un par fichier fusionné. */
function addOutline(doc: PDFDocument, items: { title: string; page: PDFRef }[]) {
  const ctx = doc.context;
  const rootRef = ctx.nextRef();
  const refs = items.map(() => ctx.nextRef());
  items.forEach((item, i) => {
    const dict = ctx.obj({
      Title: PDFHexString.fromText(item.title),
      Parent: rootRef,
      Dest: [item.page, "Fit"],
    }) as PDFDict;
    if (i > 0) dict.set(PDFName.of("Prev"), refs[i - 1]);
    if (i < items.length - 1) dict.set(PDFName.of("Next"), refs[i + 1]);
    ctx.assign(refs[i], dict);
  });
  ctx.assign(
    rootRef,
    ctx.obj({ Type: "Outlines", First: refs[0], Last: refs[refs.length - 1], Count: items.length }),
  );
  doc.catalog.set(PDFName.of("Outlines"), rootRef);
  doc.catalog.set(PDFName.of("PageMode"), PDFName.of("UseOutlines"));
}

// ---------------------------------------------------------------- Pages

export async function rotate(doc: PDFDocument, pages: Set<number>, angle: number): Promise<Uint8Array> {
  doc.getPages().forEach((page, i) => {
    if (pages.has(i)) page.setRotation(degrees((page.getRotation().angle + angle) % 360));
  });
  return save(doc);
}

type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-right" | "top-left";

export interface NumberingOptions {
  position: Position;
  format: string;
  start: number;
  size: number;
  pages: Set<number>;
}

/** Transforme un texte pour qu'il soit encodable avec les polices standard (WinAnsi). */
function winAnsiSafe(text: string, font: { encodeText(t: string): unknown }): string {
  return [...text]
    .map((ch) => {
      try {
        font.encodeText(ch);
        return ch;
      } catch {
        const plain = ch.normalize("NFD").replace(/[̀-ͯ]/g, "");
        try {
          font.encodeText(plain);
          return plain;
        } catch {
          return "?";
        }
      }
    })
    .join("");
}

/** Boîte visible de la page, en tenant compte de la rotation. */
function visibleBox(page: ReturnType<PDFDocument["getPage"]>) {
  const box = page.getCropBox();
  const rotation = ((page.getRotation().angle % 360) + 360) % 360;
  return { box, rotation };
}

/**
 * Dessine un texte dans le repère « visuel » de la page (ce que l'utilisateur voit),
 * même si la page est pivotée.
 */
function drawVisual(
  page: ReturnType<PDFDocument["getPage"]>,
  text: string,
  vx: number,
  vy: number,
  opts: { size: number; font: Awaited<ReturnType<PDFDocument["embedFont"]>>; color: ReturnType<typeof rgb>; opacity?: number; angle?: number },
) {
  const { box, rotation } = visibleBox(page);
  let x: number, y: number;
  switch (rotation) {
    case 90:
      x = box.x + box.width - vy;
      y = box.y + vx;
      break;
    case 180:
      x = box.x + box.width - vx;
      y = box.y + box.height - vy;
      break;
    case 270:
      x = box.x + vy;
      y = box.y + box.height - vx;
      break;
    default:
      x = box.x + vx;
      y = box.y + vy;
  }
  page.drawText(text, {
    x,
    y,
    size: opts.size,
    font: opts.font,
    color: opts.color,
    opacity: opts.opacity,
    rotate: degrees((opts.angle ?? 0) + rotation),
  });
}

function visualSize(page: ReturnType<PDFDocument["getPage"]>) {
  const { box, rotation } = visibleBox(page);
  return rotation === 90 || rotation === 270 ? { w: box.height, h: box.width } : { w: box.width, h: box.height };
}

export async function addPageNumbers(doc: PDFDocument, o: NumberingOptions): Promise<Uint8Array> {
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const total = doc.getPageCount();
  const margin = Math.max(18, o.size * 2);
  doc.getPages().forEach((page, i) => {
    if (!o.pages.has(i)) return;
    const label = winAnsiSafe(
      o.format.replaceAll("{n}", String(o.start + i)).replaceAll("{total}", String(o.start + total - 1)),
      font,
    );
    const width = font.widthOfTextAtSize(label, o.size);
    const { w, h } = visualSize(page);
    const [vertical, horizontal] = o.position.split("-");
    const vx = horizontal === "left" ? margin : horizontal === "right" ? w - margin - width : (w - width) / 2;
    const vy = vertical === "top" ? h - margin - o.size : margin;
    drawVisual(page, label, vx, vy, { size: o.size, font, color: rgb(0.1, 0.1, 0.1) });
  });
  return save(doc);
}

export interface WatermarkOptions {
  text: string;
  size: number;
  opacity: number;
  rotation: number;
  color: "gray" | "red" | "blue" | "black";
  pages: Set<number>;
}

const COLORS = {
  gray: rgb(0.5, 0.5, 0.5),
  red: rgb(0.8, 0.1, 0.1),
  blue: rgb(0.1, 0.25, 0.75),
  black: rgb(0, 0, 0),
};

export async function watermark(doc: PDFDocument, o: WatermarkOptions): Promise<Uint8Array> {
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const text = winAnsiSafe(o.text, font);
  if (!text.trim()) throw new UserError("watermarkText");
  const rad = (o.rotation * Math.PI) / 180;
  doc.getPages().forEach((page, i) => {
    if (!o.pages.has(i)) return;
    const { w, h } = visualSize(page);
    // Taille réduite pour que le texte pivoté tienne dans la page (marge de 10 %)
    const cos = Math.abs(Math.cos(rad));
    const sin = Math.abs(Math.sin(rad));
    const maxWidth = Math.min(cos > 1e-3 ? (w * 0.85) / cos : Infinity, sin > 1e-3 ? (h * 0.85) / sin : Infinity);
    const size = Math.min(o.size, (o.size * maxWidth) / font.widthOfTextAtSize(text, o.size));
    const width = font.widthOfTextAtSize(text, size);
    const height = font.heightAtSize(size) * 0.7;
    // Centre le texte pivoté au milieu de la page
    const vx = w / 2 - (Math.cos(rad) * width) / 2 + (Math.sin(rad) * height) / 2;
    const vy = h / 2 - (Math.sin(rad) * width) / 2 - (Math.cos(rad) * height) / 2;
    drawVisual(page, text, vx, vy, { size, font, color: COLORS[o.color], opacity: o.opacity, angle: o.rotation });
  });
  return save(doc);
}

// ---------------------------------------------------------------- Métadonnées

export interface MetadataOptions {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  clear: boolean;
}

export async function setMetadata(doc: PDFDocument, o: MetadataOptions): Promise<Uint8Array> {
  if (o.clear) {
    doc.setTitle("");
    doc.setAuthor("");
    doc.setSubject("");
    doc.setKeywords([]);
    doc.setCreator("");
  }
  if (o.title) doc.setTitle(o.title, { showInWindowTitleBar: true });
  if (o.author) doc.setAuthor(o.author);
  if (o.subject) doc.setSubject(o.subject);
  if (o.keywords)
    doc.setKeywords(
      o.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    );
  return save(doc);
}

// ---------------------------------------------------------------- Compression

export type CompressionLevel = "lossless" | "recommended" | "strong";

const COMPRESSION = {
  recommended: { maxSide: 1600, quality: 72 },
  strong: { maxSide: 1100, quality: 55 },
} as const;

function nameOf(dict: PDFDict, key: string): string | undefined {
  const v = dict.lookup(PDFName.of(key));
  if (v instanceof PDFName) return v.asString();
  if (v instanceof PDFArray && v.size() === 1) {
    const inner = v.lookup(0);
    if (inner instanceof PDFName) return inner.asString();
  }
  return undefined;
}

function numberOf(dict: PDFDict, key: string): number | undefined {
  const v = dict.lookup(PDFName.of(key));
  return v instanceof PDFNumber ? v.asNumber() : undefined;
}

/** Nombre de composantes couleur si l'espace est RGB ou gris, sinon null (on ne touche pas). */
function channelsOf(dict: PDFDict): 1 | 3 | null {
  const cs = dict.lookup(PDFName.of("ColorSpace"));
  if (cs instanceof PDFName) {
    if (cs.asString() === "/DeviceRGB") return 3;
    if (cs.asString() === "/DeviceGray") return 1;
    return null;
  }
  if (cs instanceof PDFArray && cs.size() === 2 && cs.lookup(0) instanceof PDFName && (cs.lookup(0) as PDFName).asString() === "/ICCBased") {
    const profile = cs.lookup(1);
    const n = profile && "dict" in (profile as object) ? numberOf((profile as PDFRawStream).dict, "N") : undefined;
    return n === 3 ? 3 : n === 1 ? 1 : null;
  }
  return null;
}

async function recompressImages(doc: PDFDocument, level: Exclude<CompressionLevel, "lossless">) {
  const { maxSide, quality } = COMPRESSION[level];
  for (const [ref, obj] of doc.context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue;
    const dict = obj.dict;
    if (nameOf(dict, "Subtype") !== "/Image") continue;
    if (dict.has(PDFName.of("Mask")) || dict.has(PDFName.of("Decode")) || dict.has(PDFName.of("ImageMask"))) continue;
    if (numberOf(dict, "BitsPerComponent") !== 8) continue;
    const channels = channelsOf(dict);
    if (!channels) continue;
    const width = numberOf(dict, "Width");
    const height = numberOf(dict, "Height");
    if (!width || !height) continue;

    const filter = nameOf(dict, "Filter");
    const original = obj.getContents();
    let pipeline: Sharp;
    try {
      if (filter === "/DCTDecode") {
        pipeline = sharp(original);
      } else if (filter === "/FlateDecode" && !dict.has(PDFName.of("DecodeParms"))) {
        const raw = inflateSync(original);
        if (raw.length !== width * height * channels) continue;
        pipeline = sharp(raw, { raw: { width, height, channels } });
      } else continue;

      const resized = pipeline
        .resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
        .toColourspace(channels === 1 ? "b-w" : "srgb")
        .jpeg({ quality, mozjpeg: true });
      const { data, info } = await resized.toBuffer({ resolveWithObject: true });
      if (data.length >= original.length) continue;

      const newDict = dict.clone(doc.context);
      newDict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      newDict.delete(PDFName.of("DecodeParms"));
      newDict.set(PDFName.of("Width"), PDFNumber.of(info.width));
      newDict.set(PDFName.of("Height"), PDFNumber.of(info.height));
      newDict.set(PDFName.of("ColorSpace"), PDFName.of(info.channels === 1 ? "DeviceGray" : "DeviceRGB"));
      newDict.set(PDFName.of("Length"), PDFNumber.of(data.length));
      doc.context.assign(ref, PDFRawStream.of(newDict, new Uint8Array(data)));
    } catch {
      // image non décodable : laissée intacte
    }
  }
}

export async function compress(file: FileData, level: CompressionLevel): Promise<Uint8Array> {
  let data = file.data;
  if (level !== "lossless") {
    const doc = await loadPdf(file);
    await recompressImages(doc, level);
    data = await doc.save({ useObjectStreams: true });
  }
  // Nettoyage de structure : suppression des objets inutiles, flux compressés
  const cleaned = await rewritePdf(
    { name: file.name, data },
    "garbage=4,compress,compress-fonts,compress-images,clean",
  ).catch(() => data);
  const best = [cleaned, data, file.data].reduce((a, b) => (b.length < a.length ? b : a));
  return best;
}

export function pdfName(file: FileData, suffix: string): string {
  return `${baseName(file.name)}${suffix}.pdf`;
}


export interface SignatureOptions {
  /** Image de la signature (PNG ou JPEG). */
  image: Uint8Array;
  position: Position;
  /** Largeur de la signature, en fraction de la largeur de la page. */
  width: number;
  /** Texte écrit sous la signature (date…), vide = rien. */
  caption: string;
  pages: Set<number>;
}

/** Appose une signature (image) sur les pages choisies, à l'endroit choisi, même si la page est pivotée. */
export async function placeSignature(doc: PDFDocument, o: SignatureOptions): Promise<Uint8Array> {
  const isPng = o.image[0] === 0x89 && o.image[1] === 0x50;
  const image = isPng ? await doc.embedPng(o.image) : await doc.embedJpg(o.image);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const caption = o.caption ? winAnsiSafe(o.caption, font) : "";
  doc.getPages().forEach((page, i) => {
    if (!o.pages.has(i)) return;
    const { w, h } = visualSize(page);
    const width = w * o.width;
    const height = (width * image.height) / image.width;
    const captionSize = Math.max(7, Math.min(11, width / 14));
    const captionSpace = caption ? captionSize * 1.6 : 0;
    const margin = Math.min(w, h) * 0.06;
    const [vertical, horizontal] = o.position.split("-");
    const vx = horizontal === "left" ? margin : horizontal === "right" ? w - margin - width : (w - width) / 2;
    const vy = vertical === "top" ? h - margin - height : margin + captionSpace;
    const { box, rotation } = visibleBox(page);
    const [x, y] = toPageSpace(box, rotation, vx, vy);
    page.drawImage(image, { x, y, width, height, rotate: degrees(rotation) });
    if (caption) {
      const tw = font.widthOfTextAtSize(caption, captionSize);
      drawVisual(page, caption, vx + (width - tw) / 2, vy - captionSpace + captionSize * 0.3, { size: captionSize, font, color: rgb(0.2, 0.2, 0.2) });
    }
  });
  return save(doc);
}

/** Coordonnées « visuelles » (ce que voit l'utilisateur) → coordonnées réelles de la page pivotée. */
function toPageSpace(box: { x: number; y: number; width: number; height: number }, rotation: number, vx: number, vy: number): [number, number] {
  switch (rotation) {
    case 90:
      return [box.x + box.width - vy, box.y + vx];
    case 180:
      return [box.x + box.width - vx, box.y + box.height - vy];
    case 270:
      return [box.x + vy, box.y + box.height - vx];
    default:
      return [box.x + vx, box.y + vy];
  }
}

/** Valeurs saisies dans un formulaire : texte, case cochée ou non, choix (un ou plusieurs). */
export type FormValues = Record<string, string | boolean | string[]>;

/**
 * Remplit les champs d'un formulaire PDF. Avec `lock`, les réponses sont intégrées à la page
 * (aplaties) et ne peuvent plus être modifiées. Renvoie aussi le nombre de champs remplis.
 */
export async function fillForm(doc: PDFDocument, values: FormValues, lock: boolean): Promise<{ data: Uint8Array; filled: number }> {
  const form = doc.getForm();
  let filled = 0;
  for (const [name, value] of Object.entries(values)) {
    const field = form.getFieldMaybe(name);
    if (!field) continue;
    try {
      if (field instanceof PDFTextField) field.setText(String(value ?? ""));
      else if (field instanceof PDFCheckBox) {
        if (value === true || value === "true") field.check();
        else field.uncheck();
      }
      else if (field instanceof PDFRadioGroup) {
        if (value) field.select(String(value));
        else field.clear();
      } else if (field instanceof PDFDropdown) {
        if (value) field.select(String(value), true);
        else field.clear();
      } else if (field instanceof PDFOptionList) {
        const list = (Array.isArray(value) ? value : [String(value)]).filter(Boolean);
        if (list.length) field.select(list);
        else field.clear();
      } else continue;
      filled++;
    } catch {
      // Valeur refusée par le champ (choix inexistant, longueur maximale…) : le champ garde sa valeur
    }
  }
  // Apparence des champs : écrite avec Helvetica quand c'est possible ; sinon (caractères hors de
  // l'alphabet latin), le lecteur PDF la redessine lui-même à l'ouverture.
  let appearances = true;
  try {
    form.updateFieldAppearances(await doc.embedFont(StandardFonts.Helvetica));
  } catch {
    appearances = false;
    form.acroForm.dict.set(PDFName.of("NeedAppearances"), PDFBool.True);
  }
  if (lock) {
    if (!appearances) throw new UserError("formLockUnicode");
    form.flatten();
  }
  return { data: await save(doc), filled };
}
