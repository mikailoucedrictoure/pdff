/**
 * Fichiers temporaires dans Vercel Blob (voir `src/lib/core/transfer.ts`).
 * Rien n'est conservé : entrées supprimées après traitement, résultats après
 * téléchargement, et un nettoyage quotidien efface tout ce qui aurait été oublié.
 */
import { randomUUID } from "node:crypto";
import { del, list, put } from "@vercel/blob";
import { BLOB_INPUT_PREFIX, BLOB_OUTPUT_PREFIX, type BlobFileRef } from "@/lib/core/transfer";
import { extOf, mimeOf } from "@/lib/core/formats";
import type { FileData } from "./types";

export function blobEnabled(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/** Identifiant du magasin Blob, lu dans le jeton (vercel_blob_rw_<id>_<secret>). */
function storeId(): string | null {
  return /^vercel_blob_rw_([a-z0-9]+)_/i.exec(process.env.BLOB_READ_WRITE_TOKEN ?? "")?.[1]?.toLowerCase() ?? null;
}

/**
 * N'accepte que les adresses de NOTRE magasin, dans les dossiers temporaires :
 * empêche d'utiliser le serveur pour télécharger ou supprimer autre chose.
 */
export function isOwnTempBlob(url: string, prefixes = [BLOB_INPUT_PREFIX, BLOB_OUTPUT_PREFIX]): boolean {
  const id = storeId();
  if (!id) return false;
  try {
    const u = new URL(url);
    return (
      u.protocol === "https:" &&
      u.hostname === `${id}.public.blob.vercel-storage.com` &&
      prefixes.some((p) => u.pathname.startsWith(`/${p}`))
    );
  } catch {
    return false;
  }
}

export async function fetchInputs(refs: BlobFileRef[]): Promise<FileData[]> {
  return Promise.all(
    refs.map(async (ref) => {
      const res = await fetch(ref.url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Blob ${res.status}`);
      return { name: ref.name, data: new Uint8Array(await res.arrayBuffer()) };
    }),
  );
}

export async function deleteBlobs(urls: string[]): Promise<void> {
  const own = urls.filter((u) => isOwnTempBlob(u));
  if (own.length) await del(own).catch((err) => console.error("[pdffusion] suppression Blob :", err));
}

/** Dépose un résultat sous un nom aléatoire (le vrai nom reste côté navigateur). */
export async function storeResult(file: FileData): Promise<{ url: string; downloadUrl: string }> {
  const ext = extOf(file.name) || "bin";
  const blob = await put(`${BLOB_OUTPUT_PREFIX}${randomUUID()}.${ext}`, Buffer.from(file.data), {
    access: "public",
    contentType: mimeOf(ext),
    addRandomSuffix: true,
    cacheControlMaxAge: 60,
  });
  return { url: blob.url, downloadUrl: blob.downloadUrl };
}

/** Supprime les fichiers temporaires plus vieux que `maxAgeMs`. Renvoie le nombre supprimé. */
export async function sweepTemporaryBlobs(maxAgeMs: number): Promise<number> {
  const limit = Date.now() - maxAgeMs;
  let removed = 0;
  for (const prefix of [BLOB_INPUT_PREFIX, BLOB_OUTPUT_PREFIX]) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix, cursor, limit: 1000 });
      const old = page.blobs.filter((b) => new Date(b.uploadedAt).getTime() < limit).map((b) => b.url);
      if (old.length) {
        await del(old);
        removed += old.length;
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  }
  return removed;
}
