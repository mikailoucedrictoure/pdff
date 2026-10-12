/**
 * Redimensionner ou recadrer des images (sharp). L'orientation des photos de téléphone (EXIF)
 * est appliquée d'abord : l'image est traitée telle qu'on la voit.
 */
import sharp from "sharp";
import { centeredCrop } from "@/lib/core/crop";
import { baseName, canonicalExt, extOf } from "@/lib/core/formats";
import { type FileData, UserError } from "../types";

/** Taille maximale d'un côté de l'image produite (protège la mémoire du serveur). */
const MAX_SIDE = 20000;
/** Nombre maximal de points de l'image produite : au-delà, le serveur mettrait trop de temps et de mémoire. */
const MAX_PIXELS = 64_000_000;

export interface ResizeOptions {
  mode: "resize" | "crop";
  /** Échelle en % (75, 50, 25), ou « custom » pour une taille en pixels. */
  scale: string;
  width: number;
  /** 0 = calculée pour garder les proportions. */
  height: number;
  /** Proportions du recadrage, par exemple « 16:9 ». */
  ratio: string;
  /** « same » = format d'origine. */
  format: "same" | "jpg" | "png" | "webp";
}

export async function resizeImage(file: FileData, o: ResizeOptions): Promise<FileData> {
  const source = canonicalExt(extOf(file.name));
  let image = sharp(file.data, { animated: false }).autoOrient();
  let meta;
  try {
    meta = await sharp(file.data, { animated: false }).metadata();
  } catch {
    throw new UserError("unreadable", { name: file.name });
  }
  // Dimensions après redressement : une photo en portrait est souvent stockée couchée (orientation 5 à 8)
  const turned = (meta.orientation ?? 1) >= 5;
  const w = (turned ? meta.height : meta.width) ?? 0;
  const h = (turned ? meta.width : meta.height) ?? 0;
  if (!w || !h) throw new UserError("unreadable", { name: file.name });

  if (o.mode === "crop") {
    image = image.extract(centeredCrop(w, h, o.ratio));
  } else if (o.scale === "custom") {
    let width = Math.min(MAX_SIDE, Math.max(1, Math.round(o.width) || w));
    let height = o.height > 0 ? Math.min(MAX_SIDE, Math.round(o.height)) : undefined;
    // Agrandissement démesuré : ramené à la taille maximale, en gardant les proportions demandées
    const shrink = Math.sqrt(MAX_PIXELS / (width * (height ?? Math.round((width * h) / w))));
    if (shrink < 1) {
      width = Math.max(1, Math.floor(width * shrink));
      height = height ? Math.max(1, Math.floor(height * shrink)) : undefined;
    }
    image = image.resize({ width, height, fit: height ? "fill" : "inside" });
  } else {
    const s = Math.min(1, Math.max(0.01, (Number(o.scale) || 50) / 100));
    image = image.resize({ width: Math.max(1, Math.round(w * s)), height: Math.max(1, Math.round(h * s)), fit: "fill" });
  }

  const target = o.format === "same" ? (["jpg", "png", "webp", "avif", "tiff", "gif"].includes(source) ? source : "png") : o.format;
  const formatted =
    target === "jpg" ? image.flatten({ background: "#ffffff" }).jpeg({ quality: 90, mozjpeg: true })
    : target === "webp" ? image.webp({ quality: 90 })
    : target === "avif" ? image.avif({ quality: 70 })
    : target === "tiff" ? image.tiff()
    : target === "gif" ? image.gif()
    : image.png();
  const suffix = o.mode === "crop" ? "-recadre" : "-redimensionne";
  try {
    return { name: `${baseName(file.name)}${suffix}.${target}`, data: new Uint8Array(await formatted.toBuffer()) };
  } catch {
    throw new UserError("imageConvert", { name: file.name });
  }
}
