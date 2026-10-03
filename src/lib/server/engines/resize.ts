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
    const width = Math.min(MAX_SIDE, Math.max(1, Math.round(o.width) || w));
    const height = o.height > 0 ? Math.min(MAX_SIDE, Math.round(o.height)) : undefined;
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
  return { name: `${baseName(file.name)}${suffix}.${target}`, data: new Uint8Array(await formatted.toBuffer()) };
}
