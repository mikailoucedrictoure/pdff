import { limits } from "@/config/limits";
import { availableEngines } from "@/lib/server/convert";
import { officeAvailable } from "@/lib/server/engines/office";
import { blobEnabled } from "@/lib/server/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const [engines, libreOffice] = await Promise.all([availableEngines(), officeAvailable()]);
  return Response.json({
    engines: [...engines],
    libreOffice,
    /** Gros fichiers : dépôt direct dans Vercel Blob possible. */
    blob: blobEnabled(),
    limits: { maxPages: limits.maxPages, maxFiles: limits.maxFiles, maxUploadMb: Math.round(limits.maxUploadBytes / 1024 / 1024) },
  });
}
