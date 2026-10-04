import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { limits } from "@/config/limits";
import { BLOB_INPUT_PREFIX } from "@/lib/core/transfer";
import { blobEnabled, deleteBlobs } from "@/lib/server/storage";

/** Autorise le navigateur à déposer un gros fichier directement dans Vercel Blob. */
export async function POST(request: Request) {
  if (!blobEnabled()) return Response.json({ error: "disabled" }, { status: 503 });
  let body: HandleUploadBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }
  try {
    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(BLOB_INPUT_PREFIX) || pathname.includes("..")) throw new Error("Chemin refusé");
        return {
          maximumSizeInBytes: limits.maxUploadBytes,
          addRandomSuffix: true,
          validUntil: Date.now() + 30 * 60 * 1000,
        };
      },
    });
    return Response.json(result);
  } catch (err) {
    console.error("[pdffusion] upload :", err);
    return Response.json({ error: "refused" }, { status: 400 });
  }
}

/** Le navigateur signale qu'il a récupéré son résultat : on l'efface aussitôt. */
export async function DELETE(request: Request) {
  const { urls } = (await request.json().catch(() => ({}))) as { urls?: unknown };
  if (Array.isArray(urls)) await deleteBlobs(urls.filter((u): u is string => typeof u === "string").slice(0, 50));
  return new Response(null, { status: 204 });
}
