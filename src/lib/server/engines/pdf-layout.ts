/**
 * Lecture de la mise en page d'un PDF : chaque page devient une suite de blocs
 * (paragraphes, tableaux, images, colonnes) qu'un traitement de texte sait afficher.
 *
 * Un PDF ne contient pas de paragraphes, seulement des caractères posés à des coordonnées.
 * On reconstruit donc la structure : lignes → paragraphes, traits → tableaux,
 * bandes blanches verticales → colonnes. Rien n'est placé en position absolue : le document
 * obtenu se lit et se modifie comme un document écrit à la main, dans Word, LibreOffice ou Google Docs.
 */
import { createHash } from "node:crypto";
import type * as MuPDF from "mupdf";
import sharp from "sharp";

// ---------------------------------------------------------------- Modèle produit

export interface Run {
  text: string;
  font: string;
  generic: "serif" | "sans" | "mono";
  size: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  /** 1 : exposant, -1 : indice. */
  script: number;
  /** Couleur du texte (hexadécimal sans #). */
  color: string;
  /** Fond sous le texte, quand un texte clair n'a pas pu être relié à son fond. */
  highlight: string;
  link: string;
}

/** Toutes les mesures sont en points (1/72 de pouce) ; `left` et `right` sont des retraits depuis les bords du cadre. */
export interface Paragraph {
  kind: "p";
  top: number;
  bottom: number;
  runs: Run[];
  align: "left" | "center" | "right" | "both";
  left: number;
  right: number;
  /** Retrait de la première ligne (négatif : première ligne en saillie, comme dans une liste). */
  first: number;
  /** Hauteur d'une ligne. */
  line: number;
  tabs: { pos: number; kind: "left" | "right" }[];
  shade: string;
  rtl: boolean;
  /** Nombre de lignes dans le PDF. */
  lines: number;
}

export interface Picture {
  kind: "image";
  top: number;
  bottom: number;
  left: number;
  width: number;
  data: Uint8Array;
  ext: "png" | "jpeg";
  /** Image de fond : placée derrière le texte, à sa position dans la page. */
  behind: boolean;
}

export interface Rule {
  kind: "rule";
  top: number;
  bottom: number;
  left: number;
  right: number;
  thickness: number;
  color: string;
}

export interface Cell {
  span: number;
  merge: "" | "start" | "continue";
  shade: string;
  borders: { top: boolean; left: boolean; bottom: boolean; right: boolean };
  /** Haut de la cellule dans la page : sert à placer son premier bloc. */
  top: number;
  blocks: Block[];
}

export interface Table {
  kind: "table";
  top: number;
  bottom: number;
  left: number;
  widths: number[];
  rows: { height: number; cells: Cell[] }[];
  /** Marge intérieure gauche et droite des cellules. */
  pad: number;
  border: { color: string; width: number };
}

/** Zones côte à côte (colonnes de texte, bandeau latéral d'un CV…). */
export interface Columns {
  kind: "columns";
  top: number;
  bottom: number;
  left: number;
  cols: { width: number; shade: string; blocks: Block[] }[];
}

export type Block = Paragraph | Picture | Rule | Table | Columns;

export interface PageLayout {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  blocks: Block[];
}

// ---------------------------------------------------------------- Lecture brute d'une page

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

interface FontInfo {
  family: string;
  generic: Run["generic"];
  bold: boolean;
  italic: boolean;
  symbol: boolean;
}

interface Ch {
  c: string;
  x0: number;
  x1: number;
  /** Ligne de base. */
  y: number;
  size: number;
  font: FontInfo;
  color: string;
  underline?: boolean;
  link?: string;
}

/** Morceau de ligne : des caractères qui se suivent sur une même ligne de base. */
interface Seg extends Box {
  base: number;
  size: number;
  chars: Ch[];
}

interface Fill extends Box {
  color: string;
}

/** Trait horizontal ou vertical : `pos` est sa position, `a`–`b` son étendue. */
interface Stroke {
  horizontal: boolean;
  pos: number;
  a: number;
  b: number;
  width: number;
  color: string;
}

interface RawImage extends Box {
  image: MuPDF.Image;
  matrix: number[];
}

interface RawPage {
  width: number;
  height: number;
  segs: Seg[];
  /** Nombre de caractères non horizontaux (texte tourné), impossibles à remettre en lignes. */
  turned: Box[];
  images: RawImage[];
  fills: Fill[];
  strokes: Stroke[];
  /** Dessins vectoriels (logos, graphiques) : rendus en image. */
  drawings: Box[];
  links: (Box & { uri: string })[];
}

const WHITE = "FFFFFF";
const BULLETS = "•◦▪■□●○‣⁃∙·–—*➢✓✔❖◆►▶→»›-";
/** Puces des polices de symboles (Symbol, Wingdings), rangées dans la zone à usage privé d'Unicode. */
const SYMBOL_CHARS: Record<number, string> = {
  0xf0b7: "•", 0xf0a7: "▪", 0xf0d8: "➢", 0xf0fc: "✓", 0xf06c: "●", 0xf06e: "■", 0xf0a8: "◆", 0xf076: "❖", 0xf0e0: "→", 0xf02d: "–", 0xf071: "□", 0xf0a1: "○",
};

/** Polices courantes des PDF → police équivalente présente dans Word (mêmes largeurs de caractères). */
const FONT_NAMES: Record<string, string> = {
  arial: "Arial", arialmt: "Arial", helvetica: "Arial", helveticaneue: "Arial", liberationsans: "Arial", nimbussans: "Arial", arimo: "Arial",
  timesnewroman: "Times New Roman", timesnewromanps: "Times New Roman", times: "Times New Roman", liberationserif: "Times New Roman", nimbusroman: "Times New Roman", tinos: "Times New Roman",
  couriernew: "Courier New", couriernewps: "Courier New", courier: "Courier New", liberationmono: "Courier New", cousine: "Courier New",
  calibri: "Calibri", carlito: "Calibri", cambria: "Cambria", caladea: "Cambria", segoeui: "Segoe UI", verdana: "Verdana", tahoma: "Tahoma",
  georgia: "Georgia", trebuchetms: "Trebuchet MS", trebuchet: "Trebuchet MS", garamond: "Garamond", bookantiqua: "Book Antiqua", palatinolinotype: "Palatino Linotype",
  centurygothic: "Century Gothic", comicsansms: "Comic Sans MS", consolas: "Consolas", candara: "Candara", constantia: "Constantia", corbel: "Corbel",
  dejavusans: "Verdana", dejavuserif: "Georgia", dejavusansmono: "Consolas", symbol: "Arial", symbolmt: "Arial", zapfdingbats: "Arial",
};

const GENERIC_FALLBACK = { serif: "Times New Roman", sans: "Arial", mono: "Courier New" } as const;

function fontInfo(font: MuPDF.Font): FontInfo {
  const raw = font.getName().replace(/^[A-Z]{6}\+/, "");
  const symbol = /symbol|dingbat|wingding|webding|awesome|icomoon|material|glyphicon/i.test(raw);
  const bold = font.isBold() || /bold|black|heavy|semibold|demi/i.test(raw);
  const italic = font.isItalic() || /italic|oblique/i.test(raw);
  const generic = font.isMono() ? "mono" : font.isSerif() ? "serif" : "sans";
  // « Arial-BoldMT », « TimesNewRomanPS-BoldItalicMT », « Calibri,Bold » → nom de famille seul
  let name = raw.split(/[-,]/)[0].replace(/(PS)?MT$/, "");
  name = name.replace(/(Bold|Italic|Oblique|Regular|Roman|Medium|Semibold|Black|Light|Book)+$/, "") || raw;
  const known = FONT_NAMES[name.toLowerCase().replace(/[^a-z]/g, "")];
  const family = symbol ? GENERIC_FALLBACK[generic] : (known ?? name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^\p{L}\p{N} ]/gu, " ").trim().slice(0, 60)) || GENERIC_FALLBACK[generic];
  return { family, generic, bold, italic, symbol };
}

function toHex(color: number[] | null | undefined, alpha = 1): string {
  let r = 0, g = 0, b = 0;
  if (color && color.length === 1) r = g = b = color[0];
  else if (color && color.length === 3) [r, g, b] = color;
  else if (color && color.length >= 4) {
    const [c, m, y, k] = color;
    r = (1 - c) * (1 - k);
    g = (1 - m) * (1 - k);
    b = (1 - y) * (1 - k);
  }
  // Couleur semi-transparente : mélangée au blanc de la page
  const mix = (v: number) => Math.round(255 * Math.min(1, Math.max(0, 1 - alpha * (1 - v))));
  return [mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function luminance(hex: string): number {
  const n = Number.parseInt(hex, 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

const median = (values: number[]): number => {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

const area = (b: Box) => Math.max(0, b.x1 - b.x0) * Math.max(0, b.y1 - b.y0);
const inter = (a: Box, b: Box): Box => ({ x0: Math.max(a.x0, b.x0), y0: Math.max(a.y0, b.y0), x1: Math.min(a.x1, b.x1), y1: Math.min(a.y1, b.y1) });
const union = (boxes: Box[]): Box => ({
  x0: Math.min(...boxes.map((b) => b.x0)),
  y0: Math.min(...boxes.map((b) => b.y0)),
  x1: Math.max(...boxes.map((b) => b.x1)),
  y1: Math.max(...boxes.map((b) => b.y1)),
});
const centerIn = (item: Box, box: Box) => {
  const cx = (item.x0 + item.x1) / 2;
  const cy = (item.y0 + item.y1) / 2;
  return cx >= box.x0 && cx <= box.x1 && cy >= box.y0 && cy <= box.y1;
};

/** Au-delà, une page est trop chargée en tracés pour être analysée trait par trait. */
const MAX_PATHS = 20_000;

function readPage(m: typeof MuPDF, page: MuPDF.Page | MuPDF.PDFPage): RawPage {
  const [bx0, by0, bx1, by1] = page.getBounds();
  const width = bx1 - bx0;
  const height = by1 - by0;
  const pageBox: Box = { x0: 0, y0: 0, x1: width, y1: height };
  const raw: RawPage = { width, height, segs: [], turned: [], images: [], fills: [], strokes: [], drawings: [], links: [] };

  // ---- Tracés : aplats de couleur, traits, dessins, et texte invisible (couche OCR des scans)
  const clips: Box[] = [pageBox];
  const clip = () => clips[clips.length - 1];
  const invisible = new Set<string>();
  let hidden = 0;
  let paths = 0;

  type Sub = { pts: [number, number][]; curves: number; closed: boolean };
  const subpaths = (path: MuPDF.Path, ctm: number[]): Sub[] => {
    const out: Sub[] = [];
    let cur: Sub | null = null;
    const pt = (x: number, y: number): [number, number] => [ctm[0] * x + ctm[2] * y + ctm[4] - bx0, ctm[1] * x + ctm[3] * y + ctm[5] - by0];
    path.walk({
      moveTo(x, y) {
        cur = { pts: [pt(x, y)], curves: 0, closed: false };
        out.push(cur);
      },
      lineTo(x, y) {
        cur?.pts.push(pt(x, y));
      },
      curveTo(x1, y1, x2, y2, x3, y3) {
        if (!cur) return;
        cur.pts.push(pt(x1, y1), pt(x2, y2), pt(x3, y3));
        cur.curves++;
      },
      closePath() {
        if (cur) cur.closed = true;
      },
    });
    return out.filter((s) => s.pts.length > 1);
  };
  const boxOf = (pts: [number, number][]): Box => ({
    x0: Math.min(...pts.map((p) => p[0])),
    y0: Math.min(...pts.map((p) => p[1])),
    x1: Math.max(...pts.map((p) => p[0])),
    y1: Math.max(...pts.map((p) => p[1])),
  });
  /** Part de son rectangle englobant qu'occupe la forme : proche de 1 pour un rectangle, même arrondi. */
  const fullness = (pts: [number, number][], box: Box): number => {
    let sum = 0;
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % pts.length];
      sum += x1 * y2 - x2 * y1;
    }
    return Math.abs(sum) / 2 / Math.max(1e-6, area(box));
  };
  const addStroke = (horizontal: boolean, pos: number, a: number, b: number, w: number, color: string) => {
    const c = clip();
    const lo = Math.max(Math.min(a, b), horizontal ? c.x0 : c.y0);
    const hi = Math.min(Math.max(a, b), horizontal ? c.x1 : c.y1);
    if (hi - lo < 2 || pos < (horizontal ? c.y0 : c.x0) - 1 || pos > (horizontal ? c.y1 : c.x1) + 1) return;
    raw.strokes.push({ horizontal, pos, a: lo, b: hi, width: Math.min(6, Math.max(0.25, w)), color });
  };
  const addDrawing = (box: Box) => {
    const b = inter(box, clip());
    if (b.x1 - b.x0 > 0.5 && b.y1 - b.y0 > 0.5) raw.drawings.push(b);
  };
  /** Un tracé blanc ne se voit que posé sur un fond de couleur (puces et filets d'un bandeau sombre). */
  const visible = (hex: string, box: Box) => {
    if (hex !== WHITE) return true;
    for (let i = raw.fills.length - 1; i >= 0; i--) {
      const f = raw.fills[i];
      if (f.x0 <= box.x0 + 1 && f.x1 >= box.x1 - 1 && f.y0 <= box.y0 + 1 && f.y1 >= box.y1 - 1) return f.color !== WHITE;
    }
    return false;
  };
  const pushPathClip = (path: MuPDF.Path, ctm: number[]) => {
    const pts = subpaths(path, ctm).flatMap((s) => s.pts);
    clips.push(pts.length ? inter(clip(), boxOf(pts)) : clip());
  };

  const device = new m.Device({
    fillPath(path, _evenOdd, ctm, _cs, color, alpha) {
      if (hidden || alpha < 0.25 || ++paths > MAX_PATHS) return;
      const hex = toHex(color, alpha);
      for (const sub of subpaths(path, ctm)) {
        const full = boxOf(sub.pts);
        const box = inter(full, clip());
        const w = box.x1 - box.x0;
        const h = box.y1 - box.y0;
        if (w <= 0 || h <= 0) continue;
        if (Math.min(w, h) <= 3 && Math.max(w, h) >= 6) {
          // Rectangle très fin : c'est un trait (bordure de tableau, soulignement)
          if (!visible(hex, box)) continue;
          if (w >= h) addStroke(true, (box.y0 + box.y1) / 2, box.x0, box.x1, h, hex);
          else addStroke(false, (box.x0 + box.x1) / 2, box.y0, box.y1, w, hex);
        } else if (sub.curves <= 8 && fullness(sub.pts, full) > 0.88) {
          raw.fills.push({ ...box, color: hex });
        } else if (visible(hex, box)) {
          addDrawing(full);
        }
      }
    },
    strokePath(path, stroke, ctm, _cs, color, alpha) {
      if (hidden || alpha < 0.25 || ++paths > MAX_PATHS) return;
      const hex = toHex(color, alpha);
      const lw = stroke.getLineWidth() * Math.sqrt(Math.abs(ctm[0] * ctm[3] - ctm[1] * ctm[2]));
      for (const sub of subpaths(path, ctm)) {
        const box = boxOf(sub.pts);
        if (!visible(hex, box)) continue;
        const pts = sub.closed ? [...sub.pts, sub.pts[0]] : sub.pts;
        const straight = !sub.curves && pts.every((p, i) => i === 0 || Math.abs(p[0] - pts[i - 1][0]) < 0.6 || Math.abs(p[1] - pts[i - 1][1]) < 0.6);
        if (straight) {
          for (let i = 1; i < pts.length; i++) {
            const [x1, y1] = pts[i - 1];
            const [x2, y2] = pts[i];
            if (Math.abs(y1 - y2) < 0.6) addStroke(true, (y1 + y2) / 2, x1, x2, lw, hex);
            else addStroke(false, (x1 + x2) / 2, y1, y2, lw, hex);
          }
        } else if (sub.curves <= 8 && sub.closed && fullness(sub.pts, box) > 0.88 && box.x1 - box.x0 > 10 && box.y1 - box.y0 > 10) {
          // Cadre aux coins arrondis : gardé comme un cadre droit
          addStroke(true, box.y0, box.x0, box.x1, lw, hex);
          addStroke(true, box.y1, box.x0, box.x1, lw, hex);
          addStroke(false, box.x0, box.y0, box.y1, lw, hex);
          addStroke(false, box.x1, box.y0, box.y1, lw, hex);
        } else {
          addDrawing({ x0: box.x0 - lw / 2, y0: box.y0 - lw / 2, x1: box.x1 + lw / 2, y1: box.y1 + lw / 2 });
        }
      }
    },
    clipPath: (path, _evenOdd, ctm) => pushPathClip(path, ctm),
    clipStrokePath: (path, _stroke, ctm) => pushPathClip(path, ctm),
    clipText: () => void clips.push(clip()),
    clipStrokeText: () => void clips.push(clip()),
    clipImageMask: () => void clips.push(clip()),
    popClip() {
      if (clips.length > 1) clips.pop();
    },
    beginMask() {
      hidden++;
    },
    endMask() {
      hidden = Math.max(0, hidden - 1);
      clips.push(clip());
    },
    beginTile() {
      hidden++;
      return 0;
    },
    endTile() {
      hidden = Math.max(0, hidden - 1);
    },
    ignoreText(text, ctm) {
      text.walk({
        showGlyph(_font, trm) {
          const x = ctm[0] * trm[4] + ctm[2] * trm[5] + ctm[4] - bx0;
          const y = ctm[1] * trm[4] + ctm[3] * trm[5] + ctm[5] - by0;
          invisible.add(`${Math.round(x)}:${Math.round(y)}`);
        },
      });
    },
    fillShade() {
      if (!hidden && area(clip()) < area(pageBox) * 0.98) addDrawing(clip());
    },
    fillImageMask(_image, ctm) {
      if (hidden) return;
      const pts: [number, number][] = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => [ctm[0] * x + ctm[2] * y + ctm[4] - bx0, ctm[1] * x + ctm[3] * y + ctm[5] - by0]);
      addDrawing(boxOf(pts));
    },
  });
  try {
    page.run(device, m.Matrix.identity);
    device.close();
  } finally {
    device.destroy();
  }
  if (paths > MAX_PATHS) {
    // Page de plans ou de cartes : rendue telle quelle
    raw.drawings = [pageBox];
    raw.fills = [];
    raw.strokes = [];
  }

  // ---- Texte et images
  const fonts = new Map<string, FontInfo>();
  const isInvisible = (ch: Ch) => {
    const x = Math.round(ch.x0);
    const y = Math.round(ch.y);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) if (invisible.has(`${x + dx}:${y + dy}`)) return true;
    return false;
  };
  let line: Ch[] = [];
  let lineTurned = false;
  let lineBox: Box = pageBox;
  const stext = page.toStructuredText("preserve-images");
  stext.walk({
    beginLine(bbox, wmode, direction) {
      line = [];
      lineBox = { x0: bbox[0] - bx0, y0: bbox[1] - by0, x1: bbox[2] - bx0, y1: bbox[3] - by0 };
      lineTurned = wmode !== 0 || Math.abs(direction[1]) > 0.15 || direction[0] < 0;
    },
    onChar(c, origin, font, size, quad, color) {
      const name = font.getName();
      let info = fonts.get(name);
      if (!info) fonts.set(name, (info = fontInfo(font)));
      let text = c;
      const code = c.codePointAt(0) ?? 0;
      if (code >= 0xe000 && code <= 0xf8ff) text = SYMBOL_CHARS[code] ?? (code >= 0xf020 && code <= 0xf07e && !info.symbol ? String.fromCodePoint(code - 0xf000) : "");
      else if (code < 0x20 || code === 0xfffe || code === 0xffff) text = code === 9 ? " " : "";
      if (!text) return;
      const xs = [quad[0], quad[2], quad[4], quad[6]];
      line.push({ c: text, x0: Math.min(...xs) - bx0, x1: Math.max(...xs) - bx0, y: origin[1] - by0, size, font: info, color: toHex(color as number[]) });
    },
    endLine() {
      while (line.length && !line[0].c.trim()) line.shift();
      while (line.length && !line[line.length - 1].c.trim()) line.pop();
      if (!line.length) return;
      if (invisible.size && line.filter(isInvisible).length > line.length * 0.6) return;
      if (lineTurned) return void raw.turned.push(lineBox);
      raw.segs.push(makeSeg(line));
    },
    onImageBlock(bbox, transform, image) {
      raw.images.push({ x0: bbox[0] - bx0, y0: bbox[1] - by0, x1: bbox[2] - bx0, y1: bbox[3] - by0, image, matrix: [...transform] });
    },
  });
  stext.destroy();

  for (const link of page.getLinks()) {
    const uri = link.getURI();
    if (!/^(https?:\/\/|mailto:)/i.test(uri)) continue;
    const [x0, y0, x1, y1] = link.getBounds();
    raw.links.push({ x0: x0 - bx0, y0: y0 - by0, x1: x1 - bx0, y1: y1 - by0, uri: uri.slice(0, 2000) });
  }
  return raw;
}

function makeSeg(chars: Ch[]): Seg {
  const sizes = new Map<number, number>();
  for (const ch of chars) sizes.set(Math.round(ch.size * 2) / 2, (sizes.get(Math.round(ch.size * 2) / 2) ?? 0) + 1);
  const size = [...sizes].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0];
  const base = median(chars.filter((ch) => ch.size >= size * 0.85).map((ch) => ch.y));
  return { chars, size, base, x0: Math.min(...chars.map((c) => c.x0)), x1: Math.max(...chars.map((c) => c.x1)), y0: base - size * 0.75, y1: base + size * 0.2 };
}

const textOf = (chars: Ch[]) => chars.map((c) => c.c).join("");

// ---------------------------------------------------------------- Images

export interface ImageStore {
  /** Une même image (logo répété sur chaque page) n'est rangée qu'une fois dans le document. */
  add(data: Uint8Array, ext: "png" | "jpeg"): Uint8Array;
}

/** Points par pouce des images redimensionnées : net à l'écran et à l'impression, sans alourdir le document. */
const IMAGE_DPI = 200;

async function encodeImage(m: typeof MuPDF, raw: RawImage): Promise<{ data: Uint8Array; ext: "png" | "jpeg" } | null> {
  const [a, b, c, d] = raw.matrix;
  const angle = Math.round((Math.atan2(b, a) * 180) / Math.PI / 90) * 90;
  if (Math.abs((Math.atan2(b, a) * 180) / Math.PI - angle) > 3) return null;
  let pixmap: MuPDF.Pixmap | null = null;
  let rgb: MuPDF.Pixmap | null = null;
  try {
    if (raw.image.getImageMask()) return null;
    pixmap = raw.image.toPixmap();
    rgb = pixmap.convertToColorSpace(m.ColorSpace.DeviceRGB, true);
    const width = rgb.getWidth();
    const height = rgb.getHeight();
    const channels = rgb.getNumberOfComponents() + (rgb.getAlpha() ? 1 : 0);
    if (channels !== 3 && channels !== 4) return null;
    const stride = rgb.getStride();
    const pixels = rgb.getPixels();
    const data = Buffer.alloc(width * height * channels);
    for (let y = 0; y < height; y++) data.set(pixels.subarray(y * stride, y * stride + width * channels), y * width * channels);

    let img = sharp(data, { raw: { width, height, channels: channels as 3 | 4 }, limitInputPixels: false });
    let transparent = channels === 4;
    const mask = raw.image.getMask();
    if (mask && !transparent) {
      // Transparence rangée à part dans le PDF : remise dans l'image
      const mp = mask.toPixmap();
      try {
        const mw = mp.getWidth();
        const mh = mp.getHeight();
        const ms = mp.getStride();
        const mpx = mp.getPixels();
        const alpha = Buffer.alloc(mw * mh);
        for (let y = 0; y < mh; y++) alpha.set(mpx.subarray(y * ms, y * ms + mw), y * mw);
        const resized = await sharp(alpha, { raw: { width: mw, height: mh, channels: 1 } }).resize(width, height, { fit: "fill" }).raw().toBuffer();
        img = img.joinChannel(resized, { raw: { width, height, channels: 1 } });
        transparent = true;
      } finally {
        mp.destroy();
      }
    }
    if (a * d - b * c < 0) img = img.flip();
    if (angle % 360) img = img.rotate(angle);
    const shownWidth = Math.ceil(((raw.x1 - raw.x0) / 72) * IMAGE_DPI);
    const pixelWidth = Math.abs(angle) % 180 === 90 ? height : width;
    if (pixelWidth > shownWidth * 1.3 && shownWidth >= 1) img = img.resize({ width: shownWidth });
    const photo = !transparent && width * height > 90_000;
    const out = photo ? await img.jpeg({ quality: 88, mozjpeg: true }).toBuffer() : await img.png({ compressionLevel: 9 }).toBuffer();
    return { data: new Uint8Array(out), ext: photo ? "jpeg" : "png" };
  } catch {
    return null;
  } finally {
    rgb?.destroy();
    pixmap?.destroy();
  }
}

// ---------------------------------------------------------------- Analyse

interface Frame {
  /** Bords du cadre : les retraits des blocs sont mesurés depuis eux. */
  x0: number;
  x1: number;
  /** Étendue réelle du texte dans le cadre : sert à reconnaître ce qui est centré ou aligné à droite. */
  tx0: number;
  tx1: number;
}

/** Élément posé dans la page : morceau de ligne ou bloc déjà construit (image, tableau, trait). */
interface Item extends Box {
  seg?: Seg;
  block?: Block;
  rule?: Stroke;
}

interface Row extends Box {
  segs: Seg[];
  base: number;
  size: number;
  /** Puce ou numéro en début de ligne, et position du texte qui la suit. */
  marker?: { bullet: boolean; textX: number; count: number };
}

interface Ctx {
  fills: Fill[];
  page: Box;
}

/** Couleur de fond sous une zone : le dernier aplat dessiné qui la couvre. */
function shadeAt(ctx: Ctx, box: Box, coverage = 0.8): string {
  const a = area(box);
  if (a <= 0) return "";
  for (let i = ctx.fills.length - 1; i >= 0; i--) {
    const f = ctx.fills[i];
    if (area(inter(f, box)) >= a * coverage) return f.color === WHITE ? "" : f.color;
  }
  return "";
}

function fillAt(ctx: Ctx, box: Box): Fill | null {
  const a = area(box);
  for (let i = ctx.fills.length - 1; i >= 0; i--) {
    const f = ctx.fills[i];
    if (area(inter(f, box)) >= a * 0.8) return f.color === WHITE ? null : f;
  }
  return null;
}

/** Regroupe des valeurs proches (positions de traits) et renvoie la moyenne de chaque groupe. */
function cluster(values: number[], tolerance = 2): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const groups: number[][] = [];
  for (const v of sorted) {
    const last = groups[groups.length - 1];
    if (last && v - last[last.length - 1] <= tolerance) last.push(v);
    else groups.push([v]);
  }
  return groups.map((g) => g.reduce((s, v) => s + v, 0) / g.length);
}

/** Traits alignés et bout à bout (une bordure dessinée cellule par cellule) → un seul trait. */
function mergeStrokes(strokes: Stroke[]): Stroke[] {
  const out: Stroke[] = [];
  for (const horizontal of [true, false]) {
    const list = strokes.filter((s) => s.horizontal === horizontal).sort((p, q) => p.pos - q.pos || p.a - q.a);
    const done = new Set<Stroke>();
    for (const s of list) {
      if (done.has(s)) continue;
      const merged = { ...s };
      let grown = true;
      while (grown) {
        grown = false;
        for (const t of list) {
          if (done.has(t) || t === s || Math.abs(t.pos - merged.pos) > 1.2) continue;
          if (t.a <= merged.b + 2 && t.b >= merged.a - 2) {
            merged.a = Math.min(merged.a, t.a);
            merged.b = Math.max(merged.b, t.b);
            merged.width = Math.max(merged.width, t.width);
            done.add(t);
            grown = true;
          }
        }
      }
      done.add(s);
      out.push(merged);
    }
  }
  return out;
}

const isRtl = (text: string) => {
  const rtl = text.match(/[֐-ࣿיִ-﷿ﹰ-ﻼ]/g)?.length ?? 0;
  const ltr = text.match(/[A-Za-zÀ-ɏͰ-ԯ]/g)?.length ?? 0;
  return rtl > ltr;
};

/** Caractères d'une ligne → suites de texte de même apparence. */
function runsOf(chars: Ch[], lineSize: number, lineBase: number, ctx: Ctx, bg: string): Run[] {
  const runs: Run[] = [];
  for (const ch of chars) {
    const small = ch.size <= lineSize * 0.9 && ch.c !== "\t";
    const script = small && ch.y < lineBase - lineSize * 0.15 ? 1 : small && ch.y > lineBase + lineSize * 0.08 ? -1 : 0;
    let highlight = "";
    if (!bg && luminance(ch.color) > 0.82) {
      // Texte clair sans fond repéré autour de lui : on reprend le fond exact sous le caractère, sinon un gris lisible
      highlight = shadeAt(ctx, { x0: ch.x0, y0: ch.y - ch.size * 0.6, x1: ch.x1, y1: ch.y }, 0.6) || "595959";
      if (luminance(highlight) > 0.7) highlight = "595959";
    }
    const style = {
      font: ch.font.family,
      generic: ch.font.generic,
      size: script ? lineSize : Math.round(ch.size * 2) / 2,
      bold: ch.font.bold,
      italic: ch.font.italic,
      underline: !!ch.underline,
      script,
      color: ch.color,
      highlight,
      link: ch.link ?? "",
    };
    const last = runs[runs.length - 1];
    // Les espaces et tabulations prennent l'apparence du texte qui précède : moins de morceaux, document plus simple
    const same = last && (!ch.c.trim() ? last.link === style.link : (Object.keys(style) as (keyof typeof style)[]).every((k) => last[k] === style[k]));
    if (same) last.text += ch.c;
    else runs.push({ ...style, text: ch.c });
  }
  return runs;
}

const firstWordWidth = (seg: Seg) => {
  const end = seg.chars.findIndex((c) => !c.c.trim());
  return (end === -1 ? seg.x1 : seg.chars[Math.max(0, end - 1)].x1) - seg.x0;
};

const mostlyBold = (seg: Seg) => seg.chars.filter((c) => c.font.bold).length >= seg.chars.length * 0.9;

/** Lignes d'un texte qui « va à la ligne » : presque toutes remplissent la largeur disponible. */
function proseLike(rows: Row[]): boolean {
  if (rows.length < 4) return false;
  const right = Math.max(...rows.map((r) => r.x1));
  const left = Math.min(...rows.map((r) => r.x0));
  return rows.filter((r) => r.x1 >= right - (right - left) * 0.07).length >= rows.length * 0.55;
}

/** Range les morceaux de ligne en lignes (même ligne de base), de gauche à droite. */
function toRows(segs: Seg[]): Row[] {
  const rows: Row[] = [];
  for (const seg of [...segs].sort((a, b) => a.base - b.base || a.x0 - b.x0)) {
    const row = rows.find((r) => {
      const tolerance = Math.min(r.size, seg.size) * 0.3;
      if (Math.abs(r.base - seg.base) <= tolerance) return true;
      // Exposant ou indice : plus petit, décalé, mais dans la hauteur de la ligne
      const small = seg.size <= r.size * 0.9 && seg.base > r.base - r.size * 0.8 && seg.base < r.base + r.size * 0.4;
      return small && r.segs.some((s) => Math.abs(seg.x0 - s.x1) < r.size * 0.5 || Math.abs(s.x0 - seg.x1) < r.size * 0.5);
    });
    if (row) row.segs.push(seg);
    else rows.push({ segs: [seg], base: seg.base, size: seg.size, x0: 0, x1: 0, y0: 0, y1: 0 });
  }
  for (const row of rows) {
    row.segs.sort((a, b) => a.x0 - b.x0);
    // Morceaux collés (exposants, changement de police) : une seule suite de caractères
    const merged: Seg[] = [];
    for (const seg of row.segs) {
      const prev = merged[merged.length - 1];
      const gap = prev ? seg.x0 - prev.x1 : Infinity;
      if (prev && gap <= row.size * 0.6) {
        const space: Ch[] = gap > row.size * 0.2 ? [{ ...prev.chars[prev.chars.length - 1], c: " ", x0: prev.x1, x1: seg.x0, underline: false }] : [];
        const joined = makeSeg([...prev.chars, ...space, ...seg.chars]);
        const main = prev.size >= seg.size ? prev : seg;
        merged[merged.length - 1] = { ...joined, size: main.size, base: main.base, y0: main.y0, y1: main.y1 };
      } else merged.push(seg);
    }
    row.segs = merged;
    const main = merged.reduce((a, b) => (b.chars.length > a.chars.length ? b : a));
    row.size = Math.max(...merged.map((s) => s.size).filter((s) => s >= main.size));
    row.base = main.base;
    Object.assign(row, { x0: merged[0].x0, x1: merged[merged.length - 1].x1, y0: row.base - row.size * 0.75, y1: row.base + row.size * 0.2 });
    findMarker(row);
  }
  return rows.sort((a, b) => a.base - b.base);
}

const MARKER = new RegExp(`^(?:[${BULLETS.replace(/[-\]\\^]/g, "\\$&")}]|\\(?(?:\\d{1,3}|[a-zA-Z]|[ivxIVX]{2,5})[.)])$`);

/** Repère « • texte » ou « 1. texte », que la puce soit un morceau à part ou le début de la ligne. */
function findMarker(row: Row) {
  const [first, second] = row.segs;
  const head = textOf(first.chars);
  if (row.segs.length === 2 && MARKER.test(head) && second.x0 - first.x1 < row.size * 4) {
    const tab: Ch = { ...first.chars[first.chars.length - 1], c: "\t", x0: first.x1, x1: second.x0, underline: false };
    const joined = makeSeg([...first.chars, tab, ...second.chars]);
    row.segs = [{ ...joined, size: second.size, base: second.base }];
    row.marker = { bullet: BULLETS.includes(head), textX: second.x0, count: first.chars.length };
    return;
  }
  if (row.segs.length !== 1) return;
  const match = /^(\S{1,6})\s+\S/.exec(head);
  if (!match || !MARKER.test(match[1])) return;
  const next = first.chars.findIndex((c, i) => i >= match[1].length && c.c.trim());
  row.marker = { bullet: BULLETS.includes(match[1]), textX: first.chars[next].x0, count: match[1].length };
}

function makeParagraph(lines: Row[], frame: Frame, ctx: Ctx, bg: string, edge: number, hint?: "center" | "right"): Paragraph {
  const first = lines[0];
  const n = lines.length;
  const size = Math.max(...lines.map((l) => l.size));
  const line = n > 1 ? Math.max(size * 0.9, (lines[n - 1].base - first.base) / (n - 1)) : size * 1.2;
  const top = first.base - line * 0.8;
  const bottom = lines[n - 1].base + line * 0.2;
  const x0 = first.x0;
  const x1 = Math.max(...lines.map((l) => l.x1));
  const marker = first.marker && (first.marker.bullet || n > 1 || first.segs[0].chars.some((c) => c.c === "\t")) ? first.marker : undefined;
  const body = n > 1 ? lines[1].x0 : marker ? marker.textX : x0;

  // Texte : les lignes sont recollées (une espace entre deux, sauf après un trait d'union ou entre idéogrammes)
  const parts: { chars: Ch[]; row: Row }[] = [];
  lines.forEach((l, i) => {
    let lineChars = [...l.segs[0].chars];
    if (i === 0 && marker && !lineChars.some((c) => c.c === "\t")) {
      // « 1.   Texte » → « 1. » + tabulation + « Texte » : le texte reste aligné quelle que soit la police
      const start = lineChars.findIndex((c, k) => k >= marker.count && c.c.trim());
      lineChars = [...lineChars.slice(0, marker.count), { ...lineChars[marker.count - 1], c: "\t", underline: false }, ...lineChars.slice(start)];
    }
    if (i > 0) {
      const prev = parts[i - 1].chars[parts[i - 1].chars.length - 1];
      const cjk = /[　-鿿豈-﫿]/;
      const glued = prev.c === "-" || (cjk.test(prev.c) && cjk.test(lineChars[0].c));
      // Ligne nettement plus courte que les autres (« Jean » au-dessus de « Tremblay ») : le retour à la ligne est voulu, on le garde
      const short = lines[i - 1].x1 < edge - Math.max((edge - body) * 0.25, size * 3);
      if (short) parts[i - 1].chars.push({ ...prev, c: "\n", underline: false });
      else if (!glued) parts[i - 1].chars.push({ ...prev, c: " ", underline: prev.underline && lineChars[0].underline });
    }
    parts.push({ chars: lineChars, row: l });
  });
  const rtl = isRtl(parts.map((p) => textOf(p.chars)).join(""));

  const width = frame.tx1 - frame.tx0;
  let align: Paragraph["align"] = "left";
  if (n > 1) {
    const full = lines.slice(0, -1).every((l) => Math.abs(l.x1 - x1) <= 1.5) && lines.slice(1).every((l) => Math.abs(l.x0 - body) <= 1.5);
    if (full && (n > 2 || Math.abs(first.x1 - edge) <= 1.5)) align = "both";
  } else if (hint) align = hint;
  else if (!marker) {
    const center = (x0 + x1) / 2;
    if (Math.abs(center - (frame.tx0 + frame.tx1) / 2) <= Math.max(2, width * 0.01) && x0 - frame.tx0 > width * 0.05) align = "center";
    else if (frame.tx1 - x1 <= 1.5 && x0 - frame.tx0 > Math.max(3, width * 0.05)) align = "right";
  }
  if (rtl && align === "left" && frame.tx1 - x1 <= 3) align = "right";

  const shade = shadeAt(ctx, { x0, y0: top + line * 0.1, x1, y1: bottom - line * 0.1 });
  const runs: Run[] = [];
  for (const part of parts) {
    for (const run of runsOf(part.chars, part.row.size, part.row.base, ctx, shade || bg)) {
      const last = runs[runs.length - 1];
      if (last && (Object.keys(run) as (keyof Run)[]).every((k) => k === "text" || last[k] === run[k])) last.text += run.text;
      else runs.push(run);
    }
  }
  const paragraph: Paragraph = { kind: "p", top, bottom, runs, align, left: 0, right: 0, first: 0, line, tabs: [], shade: shade === bg ? "" : shade, rtl, lines: n };

  // Largeur laissée au texte : celle du paragraphe d'origine s'il va à la ligne, sinon toute la largeur du cadre
  const rightEdge = n > 1 && frame.tx1 - x1 > 3 ? x1 : frame.tx1;
  if (align === "center") {
    paragraph.left = frame.tx0 - frame.x0;
    paragraph.right = frame.x1 - frame.tx1;
  } else if (align === "right") {
    paragraph.left = frame.tx0 - frame.x0;
    paragraph.right = frame.x1 - x1;
  } else {
    paragraph.left = body - frame.x0;
    paragraph.first = x0 - body;
    paragraph.right = Math.max(0, frame.x1 - rightEdge);
    if (marker) paragraph.tabs = [{ pos: body - frame.x0, kind: "left" }];
  }
  return paragraph;
}

/** Ligne faite de morceaux éloignés (« Nom ……… Date ») : un paragraphe à tabulations, chaque morceau à sa place. */
function tabbedParagraph(row: Row, frame: Frame, ctx: Ctx, bg: string): Paragraph {
  const chars: Ch[] = [];
  const tabs: Paragraph["tabs"] = [];
  row.segs.forEach((seg, i) => {
    if (i > 0) {
      const prev = row.segs[i - 1];
      chars.push({ ...prev.chars[prev.chars.length - 1], c: "\t", underline: false });
      const last = i === row.segs.length - 1;
      if (last && frame.tx1 - seg.x1 <= 2 && seg.x0 - prev.x1 > 20) tabs.push({ pos: frame.tx1 - frame.x0, kind: "right" });
      else tabs.push({ pos: seg.x0 - frame.x0, kind: "left" });
    }
    chars.push(...seg.chars);
  });
  const line = row.size * 1.2;
  const top = row.base - line * 0.8;
  // Fond de la ligne : un aplat sous toute la ligne, ou le même aplat sous chacun de ses morceaux (cases d'un en-tête)
  const under = row.segs.map((seg) => shadeAt(ctx, seg, 0.6));
  const shade = shadeAt(ctx, { x0: row.x0, y0: top + 1, x1: row.x1, y1: row.base }) || (under[0] && under.every((u) => u === under[0]) ? under[0] : "");
  return {
    kind: "p", top, bottom: row.base + line * 0.2, runs: runsOf(chars, row.size, row.base, ctx, shade || bg), align: "left",
    left: row.x0 - frame.x0, right: shade && shade !== bg ? Math.max(0, frame.x1 - row.x1 - 3) : 0, first: 0, line, tabs, shade: shade === bg ? "" : shade, rtl: isRtl(textOf(chars)), lines: 1,
  };
}

/** Lignes simples qui se suivent → paragraphes. */
function paragraphsOf(rows: Row[], frame: Frame, ctx: Ctx, bg: string): Paragraph[] {
  if (!rows.length) return [];
  // Interligne habituel : l'écart le plus fréquent entre deux lignes de même taille
  const gaps = new Map<number, number>();
  for (let i = 1; i < rows.length; i++) {
    const d = rows[i].base - rows[i - 1].base;
    if (Math.abs(rows[i].size - rows[i - 1].size) <= 0.6 && d > rows[i].size * 0.5 && d < rows[i].size * 2.2) {
      const key = Math.round((d / rows[i].size) * 20) / 20;
      gaps.set(key, (gaps.get(key) ?? 0) + 1);
    }
  }
  const best = [...gaps].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0];
  const leading = best && best[1] >= 2 ? best[0] : 0;

  const follows = (a: Row, b: Row) => {
    const d = b.base - a.base;
    const limit = leading ? leading * a.size * 1.15 + 0.5 : a.size * 1.5;
    return Math.abs(a.size - b.size) <= 0.6 && mostlyBold(a.segs[0]) === mostlyBold(b.segs[0]) && d > a.size * 0.5 && d <= limit;
  };
  // Suites de lignes de même style et de même interligne
  const chains: Row[][] = [];
  for (const row of rows) {
    const chain = chains[chains.length - 1];
    if (chain && follows(chain[chain.length - 1], row)) chain.push(row);
    else chains.push([row]);
  }

  const out: Paragraph[] = [];
  for (const chain of chains) {
    const right = Math.max(...chain.map((r) => r.x1));
    const left = Math.min(...chain.map((r) => r.x0));
    // Bord où le texte va à la ligne : celui que plusieurs lignes atteignent ; sinon (adresse, lignes courtes) celui du cadre
    const near = chain.filter((r) => r.x1 >= right - Math.max(2, (right - left) * 0.08)).length;
    const edge = near >= 2 ? right : Math.max(right, frame.tx1);

    // Lignes centrées ou alignées à droite, de longueurs différentes : chacune est son propre paragraphe
    const spread = Math.max(...chain.map((r) => r.x0)) - left;
    const centers = chain.map((r) => (r.x0 + r.x1) / 2);
    const centered = Math.max(...centers) - Math.min(...centers) <= 2;
    const sameLeft = Math.max(...chain.map((r) => chain.filter((o) => Math.abs(o.x0 - r.x0) <= 1.5).length));
    const flushRight = chain.every((r) => Math.abs(r.x1 - right) <= 1.5) && sameLeft < Math.max(2, chain.length - 1);
    if (chain.length > 1 && spread > 3 && (centered || flushRight)) {
      for (const row of chain) out.push(makeParagraph([row], frame, ctx, bg, edge, centered ? "center" : "right"));
      continue;
    }

    let current: Row[] = [];
    const flush = () => {
      if (current.length) out.push(makeParagraph(current, frame, ctx, bg, edge));
      current = [];
    };
    for (const row of chain) {
      const prev = current[current.length - 1];
      if (!prev) {
        current.push(row);
        continue;
      }
      // La ligne précédente est « pleine » si le premier mot de celle-ci n'y tenait pas
      const full = prev.x1 + firstWordWidth(row.segs[0]) + row.size * 0.25 > edge - 0.5;
      const body = current.length > 1 ? current[1].x0 : current[0].marker ? current[0].marker.textX : null;
      const aligned = body !== null ? Math.abs(row.x0 - body) <= 2 : row.x0 - prev.x0 <= row.size * 3 && prev.x0 - row.x0 <= row.size * 4;
      const newItem = row.marker && (row.marker.bullet || !(full && body !== null && Math.abs(row.x0 - body) <= 2));
      if (full && aligned && !newItem) current.push(row);
      else {
        flush();
        current.push(row);
      }
    }
    flush();
  }
  return out;
}

/** Intervalles horizontaux « encrés » d'une ligne : les mots séparés par moins de `minGap` sont réunis. */
function inkOf(row: Row, minGap: number): [number, number][] {
  const out: [number, number][] = [];
  for (const seg of row.segs) {
    for (const ch of seg.chars) {
      if (!ch.c.trim()) continue;
      const last = out[out.length - 1];
      if (last && ch.x0 - last[1] < minGap) last[1] = Math.max(last[1], ch.x1);
      else out.push([ch.x0, ch.x1]);
    }
  }
  return out;
}

/** Coupe un morceau de ligne aux séparations de colonnes qui tombent dans un blanc. */
function splitSeg(seg: Seg, separators: number[]): Seg[] {
  const parts: Ch[][] = [[]];
  let lastInk = -Infinity;
  for (const ch of seg.chars) {
    if (ch.c.trim() && separators.some((s) => s > lastInk && s <= ch.x0 && lastInk > -Infinity)) parts.push([]);
    parts[parts.length - 1].push(ch);
    if (ch.c.trim()) lastInk = ch.x1;
  }
  return parts
    .map((p) => {
      while (p.length && !p[0].c.trim()) p.shift();
      while (p.length && !p[p.length - 1].c.trim()) p.pop();
      return p;
    })
    .filter((p) => p.length)
    .map((p) => ({ ...makeSeg(p), size: seg.size, base: seg.base, y0: seg.y0, y1: seg.y1 }));
}

interface TableSpec {
  xs: number[];
  ys: number[];
  items: Item[];
  /** Trait horizontal présent sur la limite `r` (0 = haut du tableau), au-dessus de la colonne `c`. */
  hEdge(r: number, c: number): boolean;
  /** Trait vertical présent sur la limite `c` (0 = bord gauche), à la hauteur de la ligne `r`. */
  vEdge(r: number, c: number): boolean;
  /** Tableau dessiné (traits complets) : les cellules sans trait entre elles sont fusionnées. */
  grid: boolean;
  border: Table["border"];
}

function buildTable(spec: TableSpec, frame: Frame, ctx: Ctx, bg: string): Table {
  const { xs, ys } = spec;
  const nRows = ys.length - 1;
  const nCols = xs.length - 1;
  const cellOf = (item: Box) => {
    const cx = (item.x0 + item.x1) / 2;
    const cy = (item.y0 + item.y1) / 2;
    let r = ys.findIndex((y, i) => i < nRows && cy >= y && cy < ys[i + 1]);
    let c = xs.findIndex((x, i) => i < nCols && cx >= x && cx < xs[i + 1]);
    if (r < 0) r = cy < ys[0] ? 0 : nRows - 1;
    if (c < 0) c = cx < xs[0] ? 0 : nCols - 1;
    return [r, c];
  };

  // Regroupement horizontal : par ligne, les suites de colonnes fusionnées
  const groups: { c0: number; c1: number; items: Item[]; merge: Cell["merge"] }[][] = [];
  for (let r = 0; r < nRows; r++) {
    const row: (typeof groups)[number] = [];
    for (let c = 0; c < nCols; c++) {
      const last = row[row.length - 1];
      const straddle = !spec.grid && spec.items.some((it) => cellOf(it)[0] === r && it.x0 < xs[c] - 1 && it.x1 > xs[c] + 1);
      if (last && c > 0 && (spec.grid ? !spec.vEdge(r, c) : straddle)) last.c1 = c;
      else row.push({ c0: c, c1: c, items: [], merge: "" });
    }
    groups.push(row);
  }
  // Fusion verticale (tableaux dessinés seulement) : même étendue que la cellule du dessus, sans trait entre les deux
  const owner = (r: number, c: number) => groups[r].find((g) => c >= g.c0 && c <= g.c1)!;
  if (spec.grid) {
    for (let r = 1; r < nRows; r++) {
      for (const g of groups[r]) {
        const above = owner(r - 1, g.c0);
        let open = above.c0 === g.c0 && above.c1 === g.c1;
        for (let c = g.c0; open && c <= g.c1; c++) open = !spec.hEdge(r, c);
        if (open) {
          g.merge = "continue";
          if (!above.merge) above.merge = "start";
        }
      }
    }
  }
  for (const item of spec.items) {
    const [row, c] = cellOf(item);
    let r = row;
    while (r > 0 && owner(r, c).merge === "continue") r--;
    owner(r, c).items.push(item);
  }

  // Marge intérieure : le plus petit écart entre un texte et le bord de sa cellule
  let pad = 6;
  groups.forEach((row) =>
    row.forEach((g) => {
      for (const it of g.items) pad = Math.min(pad, it.x0 - xs[g.c0], xs[g.c1 + 1] - it.x1);
    }),
  );
  pad = Math.max(0.5, Math.min(6, pad));

  const rows = groups.map((row, r) => ({
    height: ys[r + 1] - ys[r],
    cells: row.map((g): Cell => {
      const box: Box = { x0: xs[g.c0], y0: ys[r], x1: xs[g.c1 + 1], y1: ys[r + 1] };
      // Fond de la cellule : l'aplat sous son texte (les cellules d'un tableau sans traits n'ont pas de bords exacts)
      const inner = { x0: box.x0 + 1, y0: box.y0 + 1, x1: box.x1 - 1, y1: box.y1 - 1 };
      const shade = shadeAt(ctx, inner, 0.7) || (g.items.length ? shadeAt(ctx, union(g.items), 0.6) : "");
      const tx0 = box.x0 + pad;
      const tx1 = box.x1 - pad;
      let last = r;
      while (last + 1 < nRows && owner(last + 1, g.c0).merge === "continue" && g.merge === "start") last++;
      const cols = Array.from({ length: g.c1 - g.c0 + 1 }, (_, k) => g.c0 + k);
      return {
        span: g.c1 - g.c0 + 1,
        merge: g.merge,
        shade: shade === bg ? "" : shade,
        borders: {
          top: cols.some((c) => spec.hEdge(r, c)),
          bottom: cols.some((c) => spec.hEdge(last + 1, c)),
          left: spec.vEdge(r, g.c0),
          right: spec.vEdge(r, g.c1 + 1),
        },
        top: ys[r],
        blocks: g.merge === "continue" ? [] : layoutLeaf(g.items, { x0: tx0, x1: tx1, tx0, tx1 }, ctx, shade || bg, false),
      };
    }),
  }));
  return { kind: "table", top: ys[0], bottom: ys[nRows], left: xs[0] - frame.x0, widths: xs.slice(1).map((x, i) => x - xs[i]), rows, pad, border: spec.border };
}

/** Tableaux dessinés : des traits horizontaux et verticaux qui se croisent. */
function gridTables(strokes: Stroke[], segs: Seg[], ctx: Ctx): { specs: TableSpec[]; boxes: Box[]; used: Set<Stroke>; drawings: Box[] } {
  const parent = strokes.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const t = 2.5;
  strokes.forEach((h, i) => {
    if (!h.horizontal) return;
    strokes.forEach((v, j) => {
      if (v.horizontal) return;
      if (v.pos >= h.a - t && v.pos <= h.b + t && h.pos >= v.a - t && h.pos <= v.b + t) parent[find(i)] = find(j);
    });
  });
  const groups = new Map<number, Stroke[]>();
  strokes.forEach((s, i) => groups.set(find(i), [...(groups.get(find(i)) ?? []), s]));

  const result = { specs: [] as TableSpec[], boxes: [] as Box[], used: new Set<Stroke>(), drawings: [] as Box[] };
  for (const group of groups.values()) {
    const hs = group.filter((s) => s.horizontal);
    const vs = group.filter((s) => !s.horizontal);
    if (hs.length < 2 || vs.length < 2) continue;
    const ys = cluster(hs.map((s) => s.pos));
    const xs = cluster(vs.map((s) => s.pos));
    if (ys.length < 2 || xs.length < 2 || (ys.length - 1) * (xs.length - 1) > 5000) continue;
    const box: Box = { x0: xs[0], y0: ys[0], x1: xs[xs.length - 1], y1: ys[ys.length - 1] };
    group.forEach((s) => result.used.add(s));
    const inside = segs.filter((s) => centerIn(s, box));
    // Un simple cadre autour de (presque) toute la page est un décor, pas un tableau
    if (xs.length === 2 && ys.length === 2 && area(box) > area(ctx.page) * 0.5) continue;
    if (!inside.length) {
      result.drawings.push(box);
      continue;
    }
    const covers = (list: Stroke[], pos: number, a: number, b: number) =>
      list.some((s) => Math.abs(s.pos - pos) <= 2.5 && Math.min(s.b, b) - Math.max(s.a, a) >= (b - a) * 0.7);
    result.boxes.push(box);
    result.specs.push({
      xs, ys, items: [], grid: true,
      hEdge: (r, c) => covers(hs, ys[r], xs[c], xs[c + 1]),
      vEdge: (r, c) => covers(vs, xs[c], ys[r], ys[r + 1]),
      border: { color: group[0].color, width: median(group.map((s) => s.width)) },
    });
  }
  return result;
}

/**
 * Zone sans colonnes : ses éléments sont lus de haut en bas.
 * `tables` : autorise la reconnaissance des tableaux sans traits (lignes aux colonnes alignées).
 */
function layoutLeaf(items: Item[], frame: Frame, ctx: Ctx, bg: string, tables: boolean): Block[] {
  type Entry = { y: number; row?: Row; item?: Item };
  const rows = toRows(items.flatMap((i) => (i.seg ? [i.seg] : [])));
  const entries: Entry[] = [...rows.map((row) => ({ y: row.base - row.size * 0.4, row })), ...items.filter((i) => !i.seg).map((item) => ({ y: (item.y0 + item.y1) / 2, item }))].sort((a, b) => a.y - b.y);

  const blocks: Block[] = [];
  let simple: Row[] = [];
  const flush = () => {
    blocks.push(...paragraphsOf(simple, frame, ctx, bg));
    simple = [];
  };
  const ruleBlock = (s: Stroke): Rule => ({ kind: "rule", top: s.pos - s.width / 2 - 1, bottom: s.pos + s.width / 2, left: s.a - frame.x0, right: frame.x1 - s.b, thickness: s.width, color: s.color });

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.item) {
      flush();
      // Les blocs déjà construits sont mesurés depuis le bord de la page : ramenés au bord de ce cadre
      if (entry.item.block) blocks.push({ ...entry.item.block, left: entry.item.block.left - frame.x0 });
      else if (entry.item.rule) blocks.push(ruleBlock(entry.item.rule));
      continue;
    }
    const row = entry.row!;
    if (row.segs.length === 1) {
      simple.push(row);
      continue;
    }
    flush();
    // Plusieurs lignes à morceaux alignés qui se suivent : un tableau sans traits
    const table = tables ? implicitTable(entries, i, frame, ctx, bg) : null;
    if (table) {
      blocks.push(table.block);
      i = table.end;
    } else blocks.push(tabbedParagraph(row, frame, ctx, bg));
  }
  flush();
  return blocks.sort((a, b) => a.top - b.top);
}

function implicitTable(entries: { y: number; row?: Row; item?: Item }[], start: number, frame: Frame, ctx: Ctx, bg: string): { block: Table; end: number } | null {
  const first = entries[start].row!;
  const tableRows: Row[][] = [[first]];
  const rules: Stroke[] = [];
  let end = start;
  let lastBase = first.base;
  for (let i = start + 1; i < entries.length; i++) {
    const { row, item } = entries[i];
    if (item) {
      if (!item.rule || item.rule.pos - lastBase > first.size * 3) break;
      rules.push(item.rule);
      end = i;
      continue;
    }
    if (!row || row.base - lastBase > Math.max(row.size, first.size) * 4.5) break;
    const current = tableRows[tableRows.length - 1];
    if (row.segs.length > 1) tableRows.push([row]);
    else {
      // Ligne simple : suite d'une cellule qui va à la ligne, si elle est alignée sur un texte de la ligne du dessus
      // et qu'une autre ligne du tableau vient ensuite
      const continues = current[0].segs.some((s) => Math.abs(s.x0 - row.x0) <= 2) && row.base - lastBase <= row.size * 1.6;
      const next = entries.slice(i + 1).find((e) => e.row);
      if (!continues || !next?.row || next.row.segs.length < 2 || next.row.base - row.base > row.size * 4.5) break;
      current.push(row);
    }
    lastBase = row.base;
    end = i;
  }
  // Les traits et lignes absorbés après la dernière ligne du tableau restent hors du tableau, sauf un trait de fin tout proche
  while (end > start && entries[end].item && entries[end].item!.rule!.pos - lastBase > first.size * 1.5) {
    rules.pop();
    end--;
  }
  if (tableRows.length < 2) return null;

  const all = tableRows.flat();
  const size = median(all.map((r) => r.size));
  const minGap = Math.max(5, size * 0.5);
  const ink = tableRows.flatMap((group) => inkOf(group[0], minGap)).sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [a, b] of ink) {
    const last = merged[merged.length - 1];
    if (last && a - last[1] < minGap) last[1] = Math.max(last[1], b);
    else merged.push([a, b]);
  }
  if (merged.length < 2) return null;
  const separators = merged.slice(1).map(([a], i) => (merged[i][1] + a) / 2);
  const x0 = Math.min(merged[0][0], ...rules.map((r) => r.a)) - 2;
  const x1 = Math.max(merged[merged.length - 1][1], ...rules.map((r) => r.b)) + 2;
  const xs = [x0, ...separators, x1];

  const slot = (r: Row) => [r.base - r.size * 0.95, r.base + r.size * 0.3];
  const ys: number[] = [];
  tableRows.forEach((group, k) => {
    const top = slot(group[0])[0];
    if (k === 0) {
      const above = rules.find((r) => r.pos <= top + 1 && top - r.pos < size * 1.5);
      ys.push(above ? above.pos : top);
      return;
    }
    const prevBottom = slot(tableRows[k - 1][tableRows[k - 1].length - 1])[1];
    const between = rules.find((r) => r.pos > prevBottom - size * 0.5 && r.pos < top + size * 0.5);
    ys.push(between ? between.pos : (prevBottom + top) / 2);
  });
  const lastRow = tableRows[tableRows.length - 1];
  const bottom = slot(lastRow[lastRow.length - 1])[1];
  const below = rules.find((r) => r.pos >= bottom - size * 0.5);
  ys.push(below ? below.pos : bottom);
  if (ys.some((y, i) => i > 0 && y <= ys[i - 1])) return null;

  const segs = all.flatMap((r) => r.segs.flatMap((s) => splitSeg(s, separators)));
  const spec: TableSpec = {
    xs, ys, grid: false,
    items: segs.map((seg) => ({ ...seg, seg })),
    hEdge: (r, c) => rules.some((s) => Math.abs(s.pos - ys[r]) <= 2 && Math.min(s.b, xs[c + 1]) - Math.max(s.a, xs[c]) >= (xs[c + 1] - xs[c]) * 0.6),
    vEdge: () => false,
    border: { color: rules[0]?.color ?? "000000", width: rules.length ? median(rules.map((r) => r.width)) : 0.5 },
  };
  return { block: buildTable(spec, frame, ctx, bg), end };
}

const MAX_DEPTH = 3;

/** Zone quelconque : cherche d'abord des colonnes (bandes blanches verticales), sinon lit de haut en bas. */
function layoutRegion(items: Item[], frame: Frame, ctx: Ctx, bg: string, depth: number, yMin: number, yMax: number): Block[] {
  if (!items.length) return [];
  if (depth >= MAX_DEPTH) return layoutLeaf(items, frame, ctx, bg, true);
  const sizes = items.flatMap((i) => (i.seg ? [i.seg.size] : []));
  const minGap = Math.max(8, median(sizes) * 0.9);
  const rx0 = Math.min(...items.map((i) => i.x0));
  const rx1 = Math.max(...items.map((i) => i.x1));

  // Bandes horizontales : éléments qui se chevauchent en hauteur (une ligne de texte, une image et le texte à côté…)
  const sorted = [...items].sort((a, b) => a.y0 - b.y0);
  const bands: { items: Item[]; y0: number; y1: number; free: [number, number][] }[] = [];
  for (const item of sorted) {
    const band = bands[bands.length - 1];
    if (band && item.y0 < band.y1 - 0.5) {
      band.items.push(item);
      band.y1 = Math.max(band.y1, item.y1);
    } else bands.push({ items: [item], y0: item.y0, y1: item.y1, free: [] });
  }
  // Un aplat de couleur qui passe sous plusieurs éléments d'une bande (en-tête de tableau) les relie :
  // aucune séparation de colonnes ne peut le traverser.
  const bars = ctx.fills.filter((f) => f.color !== WHITE && f.color !== bg && area(f) < area(ctx.page) * 0.4 && f.x1 - f.x0 > minGap);
  for (const band of bands) {
    let x = rx0;
    const under = bars.filter((f) => f.y0 < band.y1 - 1 && f.y1 > band.y0 + 1 && f.y1 - f.y0 < (band.y1 - band.y0) * 3 && band.items.some((i) => centerIn(i, f)));
    for (const item of [...band.items, ...under].sort((a, b) => a.x0 - b.x0)) {
      if (item.x0 - x >= minGap) band.free.push([x, item.x0]);
      x = Math.max(x, item.x1);
    }
    if (rx1 - x >= minGap) band.free.push([x, rx1]);
  }

  type Part = { kind: "leaf"; items: Item[] } | { kind: "columns"; items: Item[]; strip: [number, number]; y0: number; y1: number };
  const parts: Part[] = [];
  const leaf = (list: Item[]) => {
    const last = parts[parts.length - 1];
    if (last?.kind === "leaf") last.items.push(...list);
    else parts.push({ kind: "leaf", items: [...list] });
  };
  let start = 0;
  while (start < bands.length) {
    // Plus longue suite de bandes qui partagent une même bande blanche verticale
    let strips = bands[start].free;
    let stop = start;
    let kept = strips;
    while (strips.length && stop + 1 < bands.length) {
      const next = bands[stop + 1].free;
      const common: [number, number][] = [];
      for (const [a, b] of strips) for (const [c, d] of next) if (Math.min(b, d) - Math.max(a, c) >= minGap) common.push([Math.max(a, c), Math.min(b, d)]);
      if (!common.length) break;
      strips = kept = common;
      stop++;
    }
    // Les dernières bandes dont les deux côtés sont sur la même ligne (rangées d'un tableau qui suit) sont rendues
    const twoSided = (b: (typeof bands)[number], [p, q]: [number, number]) => b.items.some((i) => i.x1 <= p + 0.5) && b.items.some((i) => i.x0 >= q - 0.5);
    const widest = [...kept].sort((p, q) => q[1] - q[0] - (p[1] - p[0]))[0];
    if (widest && stop > start && !bands.slice(start, stop + 1).every((b) => twoSided(b, widest))) {
      while (stop > start && bands[stop].items.length > 1 && twoSided(bands[stop], widest) && bands[stop].items.every((i) => i.seg)) stop--;
    }
    const run = bands.slice(start, stop + 1).flatMap((b) => b.items);
    const strip = kept
      .filter(([a, b]) => run.some((i) => i.x1 <= a + 0.5) && run.some((i) => i.x0 >= b - 0.5))
      .sort((p, q) => q[1] - q[0] - (p[1] - p[0]))
      .find(([a, b]) => isColumns(run.filter((i) => i.x1 <= a + 0.5), run.filter((i) => i.x0 >= b - 0.5)));
    if (strip) {
      parts.push({ kind: "columns", items: run, strip, y0: bands[start].y0, y1: bands[stop].y1 });
      start = stop + 1;
    } else {
      leaf(bands[start].items);
      start++;
    }
  }
  if (parts.length === 1 && parts[0].kind === "leaf") return layoutLeaf(items, frame, ctx, bg, true);

  const blocks: Block[] = [];
  parts.forEach((part, index) => {
    if (part.kind === "leaf") return void blocks.push(...layoutLeaf(part.items, frame, ctx, bg, true));
    const above = index > 0 ? Math.max(...parts[index - 1].items.map((i) => i.y1)) : yMin;
    const below = index < parts.length - 1 ? Math.min(...parts[index + 1].items.map((i) => i.y0)) : yMax;
    const sides = [part.items.filter((i) => i.x1 <= part.strip[0] + 0.5), part.items.filter((i) => i.x0 >= part.strip[1] - 0.5)];
    const extents = sides.map((side) => union(side));
    // Fond de couleur d'une colonne (bandeau d'un CV) : la colonne prend les bords et la hauteur de ce fond
    const fills = extents.map((e) => fillAt(ctx, e)).map((f) => (f && area(f) < area(ctx.page) * 0.98 ? f : null));
    const shades = fills.map((f) => (f && f.color !== bg ? f.color : ""));
    let middle = (part.strip[0] + part.strip[1]) / 2;
    if (shades[0] && fills[0]!.x1 >= extents[0].x1 && fills[0]!.x1 <= extents[1].x0) middle = fills[0]!.x1;
    else if (shades[1] && fills[1]!.x0 <= extents[1].x0 && fills[1]!.x0 >= extents[0].x1) middle = fills[1]!.x0;
    const left = shades[0] ? Math.max(0, Math.min(fills[0]!.x0, extents[0].x0)) : extents[0].x0;
    const right = shades[1] ? Math.min(ctx.page.x1, Math.max(fills[1]!.x1, extents[1].x1)) : Math.max(extents[1].x1, frame.tx1);
    let top = part.y0;
    let bottom = part.y1;
    fills.forEach((f, k) => {
      if (!shades[k]) return;
      top = Math.min(top, Math.max(f!.y0, above));
      bottom = Math.max(bottom, Math.min(f!.y1, below));
    });
    const edges = [left, middle, right];
    const cols = sides.map((side, k) => {
      const inner: Frame = { x0: edges[k], x1: edges[k + 1], tx0: extents[k].x0, tx1: extents[k].x1 };
      return { width: edges[k + 1] - edges[k], shade: shades[k], blocks: layoutRegion(side, inner, ctx, shades[k] || bg, depth + 1, top, bottom) };
    });
    // Colonnes dans une colonne : remises à plat (trois colonnes plutôt que deux dont une coupée en deux)
    const flat = cols.flatMap((col) => {
      const only = col.blocks.length === 1 && col.blocks[0].kind === "columns" && !col.shade ? col.blocks[0] : null;
      if (!only) return [col];
      const extra = col.width - only.left - only.cols.reduce((s, c) => s + c.width, 0);
      return only.cols.map((c, k) => ({ ...c, width: c.width + (k === 0 ? only.left : 0) + (k === only.cols.length - 1 ? extra : 0) }));
    });
    blocks.push({ kind: "columns", top, bottom, left: left - frame.x0, cols: flat });
  });
  return blocks.sort((a, b) => a.top - b.top);
}

/** Vraies colonnes (textes indépendants) ou simple tableau (lignes qui se correspondent) ? */
function isColumns(left: Item[], right: Item[]): boolean {
  const rowsOf = (side: Item[]) => toRows(side.flatMap((i) => (i.seg ? [i.seg] : [])));
  const [a, b] = [rowsOf(left), rowsOf(right)];
  const count = (side: Item[], rows: Row[]) => rows.length + side.filter((i) => !i.seg).length;
  const [na, nb] = [count(left, a), count(right, b)];
  if (!na || !nb || na + nb < 3) return false;
  // Une image ou un tableau à côté d'un texte : toujours deux zones
  if (left.some((i) => i.block && i.block.kind !== "rule") || right.some((i) => i.block && i.block.kind !== "rule")) return true;
  const [few, many] = a.length <= b.length ? [a, b] : [b, a];
  if (!few.length) return true;
  const matched = few.filter((r) => many.some((o) => Math.abs(o.base - r.base) <= 1.5)).length;
  if (matched / few.length < 0.6) return true;
  return proseLike(a) && proseLike(b);
}

const strokeBox = (s: Stroke): Box => (s.horizontal ? { x0: s.a, x1: s.b, y0: s.pos, y1: s.pos } : { x0: s.pos, x1: s.pos, y0: s.a, y1: s.b });

/** Dessins vectoriels proches les uns des autres → une seule figure. */
function groupDrawings(drawings: Box[]): Box[] {
  if (drawings.length > 4000) return [union(drawings)];
  const boxes = drawings.map((d) => ({ ...d }));
  let merged = true;
  while (merged) {
    merged = false;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = boxes.length - 1; j > i; j--) {
        const a = boxes[i];
        const b = boxes[j];
        if (a.x0 - 4 <= b.x1 && b.x0 - 4 <= a.x1 && a.y0 - 4 <= b.y1 && b.y0 - 4 <= a.y1) {
          boxes[i] = union([a, b]);
          boxes.splice(j, 1);
          merged = true;
        }
      }
    }
  }
  return boxes;
}

/** Enlève aux blocs de premier niveau la part de leurs retraits qui devient la marge de la page. */
function shift(blocks: Block[], dx: number, right: number) {
  for (const b of blocks) {
    b.left -= dx;
    if (b.kind === "p") {
      b.right = Math.max(0, b.right - right);
      b.tabs = b.tabs.map((t) => ({ ...t, pos: t.pos - dx }));
    } else if (b.kind === "rule") b.right = Math.max(0, b.right - right);
  }
}

const leftEdge = (b: Block) => (b.kind === "p" ? b.left + Math.min(0, b.first) : b.left);
const rightGap = (b: Block, width: number) =>
  b.kind === "p" || b.kind === "rule" ? b.right : width - b.left - (b.kind === "table" ? b.widths.reduce((s, w) => s + w, 0) : b.kind === "columns" ? b.cols.reduce((s, c) => s + c.width, 0) : b.width);

async function analysePage(m: typeof MuPDF, page: MuPDF.Page | MuPDF.PDFPage, images: ImageStore): Promise<PageLayout> {
  const raw = readPage(m, page);
  const { width, height } = raw;
  const pageBox: Box = { x0: 0, y0: 0, x1: width, y1: height };
  const ctx: Ctx = { fills: raw.fills.filter((f) => area(f) < area(pageBox) * 0.98 || f.color !== WHITE), page: pageBox };
  const layout: PageLayout = { width, height, margin: { top: 0, right: 0, bottom: 0, left: 0 }, blocks: [] };

  // Rendu de la page, calculé seulement si une figure ou un repli en image en a besoin
  let rendered: { data: Buffer; width: number; height: number; scale: number } | null = null;
  const render = () => {
    if (rendered) return rendered;
    const scale = Math.min(IMAGE_DPI / 72, 3200 / Math.max(width, height));
    const [bx0, by0] = page.getBounds();
    const pixmap = page.toPixmap(m.Matrix.concat(m.Matrix.translate(-bx0, -by0), m.Matrix.scale(scale, scale)), m.ColorSpace.DeviceRGB, false, true);
    const w = pixmap.getWidth();
    const h = pixmap.getHeight();
    const stride = pixmap.getStride();
    const pixels = pixmap.getPixels();
    const data = Buffer.alloc(w * h * 3);
    for (let y = 0; y < h; y++) data.set(pixels.subarray(y * stride, y * stride + w * 3), y * w * 3);
    pixmap.destroy();
    return (rendered = { data, width: w, height: h, scale });
  };
  const snapshot = async (box: Box, photo: boolean): Promise<Picture> => {
    const r = render();
    const left = Math.max(0, Math.floor(box.x0 * r.scale));
    const top = Math.max(0, Math.floor(box.y0 * r.scale));
    const w = Math.max(1, Math.min(r.width - left, Math.ceil((box.x1 - box.x0) * r.scale)));
    const h = Math.max(1, Math.min(r.height - top, Math.ceil((box.y1 - box.y0) * r.scale)));
    const cut = sharp(r.data, { raw: { width: r.width, height: r.height, channels: 3 }, limitInputPixels: false }).extract({ left, top, width: w, height: h });
    const data = new Uint8Array(photo ? await cut.jpeg({ quality: 85, mozjpeg: true }).toBuffer() : await cut.png({ compressionLevel: 9 }).toBuffer());
    const ext = photo ? "jpeg" : "png";
    return { kind: "image", top: box.y0, bottom: box.y1, left: box.x0, width: box.x1 - box.x0, data: images.add(data, ext), ext, behind: false };
  };
  const wholePage = async (): Promise<PageLayout> => {
    const only = raw.images.length === 1 && !raw.drawings.length && area(raw.images[0]) > area(pageBox) * 0.9 ? await encodeImage(m, raw.images[0]) : null;
    const picture = only
      ? ({ kind: "image", top: 0, bottom: height, left: 0, width, data: images.add(only.data, only.ext), ext: only.ext, behind: false } satisfies Picture)
      : await snapshot(pageBox, true);
    return { ...layout, blocks: [picture] };
  };

  const turnedChars = raw.turned.length;
  if (!raw.segs.length) {
    if (!raw.images.length && !raw.drawings.length && !raw.strokes.length && !turnedChars) return layout;
    // Page sans texte lisible (scan, plan, photo) : gardée en image, à l'identique
    if (raw.drawings.length || turnedChars || raw.images.some((i) => area(i) > area(pageBox) * 0.5)) return wholePage();
  } else if (turnedChars > raw.segs.length) return wholePage();

  let segs = raw.segs;
  let strokes = mergeStrokes(raw.strokes);

  // Soulignement : un trait fin juste sous une ligne de texte
  strokes = strokes.filter((s) => {
    if (!s.horizontal) return true;
    const seg = segs.find((g) => s.pos > g.base && s.pos < g.base + g.size * 0.35 && s.a >= g.x0 - 1.5 && s.b <= g.x1 + 1.5);
    if (!seg) return true;
    for (const ch of seg.chars) if ((ch.x0 + ch.x1) / 2 >= s.a - 0.5 && (ch.x0 + ch.x1) / 2 <= s.b + 0.5) ch.underline = true;
    return false;
  });
  for (const link of raw.links) {
    for (const seg of segs) {
      if (seg.base < link.y0 || seg.base > link.y1 + 2) continue;
      for (const ch of seg.chars) if ((ch.x0 + ch.x1) / 2 >= link.x0 && (ch.x0 + ch.x1) / 2 <= link.x1) ch.link = link.uri;
    }
  }

  const items: Item[] = [];

  // Tableaux dessinés
  const grids = gridTables(strokes, segs, ctx);
  strokes = strokes.filter((s) => !grids.used.has(s));
  let pictures = raw.images;
  grids.specs.forEach((spec, k) => {
    const box = grids.boxes[k];
    spec.items = segs.filter((s) => centerIn(s, box)).map((seg) => ({ ...seg, seg }));
    segs = segs.filter((s) => !centerIn(s, box));
    pictures = pictures.filter((p) => !centerIn(p, box));
    strokes = strokes.filter((s) => !centerIn(strokeBox(s), box));
    items.push({ ...box, block: buildTable(spec, { x0: 0, x1: width, tx0: 0, tx1: width }, ctx, "") });
  });

  // Figures : dessins vectoriels, texte tourné, images inclinées. Rendues en image avec le texte qu'elles contiennent
  // (légendes d'un graphique), sauf si la zone est surtout du texte : c'est alors un décor, qu'on laisse de côté.
  const figures: Box[] = [];
  for (const box of groupDrawings([...raw.drawings, ...grids.drawings, ...raw.turned])) {
    const w = box.x1 - box.x0;
    const h = box.y1 - box.y0;
    if (w < 14 && h < 14) {
      // Petit dessin rond ou carré juste devant un texte : c'est une puce
      const seg = segs.find((s) => s.x0 - box.x1 > 0 && s.x0 - box.x1 < s.size * 2.5 && box.y1 > s.base - s.size && box.y0 < s.base);
      // … sauf s'il suit de près un autre texte de la même ligne : il est alors au milieu d'une phrase
      const before = seg && segs.some((s) => s !== seg && Math.abs(s.base - seg.base) < 2 && s.x1 <= box.x0 + 1 && box.x0 - s.x1 < s.size * 2);
      if (seg && !before && w < seg.size && h < seg.size) {
        const c0 = seg.chars[0];
        seg.chars.unshift({ ...c0, c: "•", x0: box.x0, x1: box.x1, font: { ...c0.font, bold: false, italic: false } }, { ...c0, c: " ", x0: box.x1, x1: c0.x0 });
        seg.x0 = box.x0;
      }
      continue;
    }
    if (w < 6 || h < 6) continue;
    // La figure s'étend aux traits et aux aplats qui la touchent (axes et barres d'un graphique)
    let figure = box;
    for (let pass = 0; pass < 3; pass++) {
      const near = (b: Box) => b.x0 <= figure.x1 + 3 && b.x1 >= figure.x0 - 3 && b.y0 <= figure.y1 + 3 && b.y1 >= figure.y0 - 3;
      const parts = [...ctx.fills.filter((f) => f.color !== WHITE && area(f) < area(pageBox) * 0.25), ...strokes.map(strokeBox)].filter(near);
      figure = union([figure, ...parts]);
    }
    const labels = segs.filter((s) => centerIn(s, figure));
    const textArea = labels.reduce((s, g) => s + area(g), 0);
    if (labels.length && (textArea > area(figure) * 0.3 || area(figure) > area(pageBox) * 0.6)) continue;
    figures.push(figure);
  }
  for (const box of figures) {
    segs = segs.filter((s) => !centerIn(s, box));
    pictures = pictures.filter((p) => !centerIn(p, box));
    strokes = strokes.filter((s) => !centerIn(strokeBox(s), box));
    const picture = await snapshot({ x0: Math.max(0, box.x0 - 1), y0: Math.max(0, box.y0 - 1), x1: Math.min(width, box.x1 + 1), y1: Math.min(height, box.y1 + 1) }, false);
    items.push({ x0: box.x0, y0: box.y0, x1: box.x1, y1: box.y1, block: picture });
  }

  // Images
  const behind: Picture[] = [];
  for (const image of pictures) {
    const box = inter(image, pageBox);
    if (box.x1 - box.x0 < 2 || box.y1 - box.y0 < 2) continue;
    const encoded = await encodeImage(m, image);
    const covered = segs.filter((s) => centerIn(s, box)).length;
    const picture: Picture = encoded
      ? { kind: "image", top: image.y0, bottom: image.y1, left: image.x0, width: image.x1 - image.x0, data: images.add(encoded.data, encoded.ext), ext: encoded.ext, behind: false }
      : await snapshot(box, true);
    if (covered && area(box) > area(pageBox) * 0.3) {
      // Grande image sous le texte (fond de page, papier à en-tête) : placée derrière le texte
      behind.push({ ...picture, behind: true });
    } else items.push({ x0: image.x0, y0: image.y0, x1: image.x1, y1: image.y1, block: picture });
  }

  for (const seg of segs) items.push({ ...seg, seg });
  // Traits horizontaux restants : filets de séparation
  for (const s of strokes) if (s.horizontal && s.b - s.a > 12) items.push({ x0: s.a, x1: s.b, y0: s.pos - 0.5, y1: s.pos + 0.5, rule: s });

  if (!items.length) return { ...layout, blocks: behind };
  const text = union(items);
  const blocks = layoutRegion(items, { x0: 0, x1: width, tx0: text.x0, tx1: text.x1 }, ctx, "", 0, 0, height);

  // Marges de la page : l'espace libre autour du contenu
  const left = Math.max(0, Math.min(...blocks.map(leftEdge)));
  const right = Math.max(0, Math.min(...blocks.map((b) => rightGap(b, width))));
  shift(blocks, left, right);
  const top = Math.max(0, Math.min(...blocks.map((b) => b.top)));
  const bottom = Math.max(0, height - Math.max(...blocks.map((b) => b.bottom)));
  layout.margin = { top, left, right, bottom };
  layout.blocks = [...behind, ...blocks];
  return layout;
}

/** Lit toutes les pages d'un PDF déjà ouvert. */
export async function readLayout(m: typeof MuPDF, doc: MuPDF.Document, images: ImageStore): Promise<PageLayout[]> {
  const pages: PageLayout[] = [];
  const count = doc.countPages();
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    try {
      pages.push(await analysePage(m, page, images));
    } finally {
      page.destroy();
    }
  }
  return pages;
}

/** Réserve d'images sans doublon. */
export function imageStore(): ImageStore & { files: { name: string; data: Uint8Array }[]; nameOf(data: Uint8Array): string } {
  const byHash = new Map<string, { name: string; data: Uint8Array }>();
  const names = new Map<Uint8Array, string>();
  const files: { name: string; data: Uint8Array }[] = [];
  return {
    files,
    add(data, ext) {
      const hash = createHash("sha1").update(data).digest("hex");
      let file = byHash.get(hash);
      if (!file) {
        file = { name: `image${files.length + 1}.${ext}`, data };
        byHash.set(hash, file);
        files.push(file);
        names.set(file.data, file.name);
      }
      return file.data;
    },
    nameOf: (data) => names.get(data) ?? "",
  };
}
