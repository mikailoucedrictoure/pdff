/**
 * Photos d'iPhone (HEIC / HEIF) : converties en JPG dans le navigateur dès le dépôt.
 * Le serveur ne sait pas les lire (codage vidéo HEVC breveté) ; une fois en JPG, elles
 * fonctionnent avec tous les outils. Le décodeur (libheif, ~3 Mo) n'est chargé que si besoin.
 */
const HEIC = /\.(heic|heif)$/i;

export const isHeicName = (name: string) => HEIC.test(name);

export async function heicToJpeg(file: File): Promise<File> {
  const { heicTo } = await import("heic-to/next");
  const jpeg = await heicTo({ blob: file, type: "image/jpeg", quality: 0.92 });
  return new File([jpeg], file.name.replace(HEIC, ".jpg"), { type: "image/jpeg", lastModified: file.lastModified });
}
