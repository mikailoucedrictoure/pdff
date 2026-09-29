import { limits } from "@/config/limits";
import { availableEngines } from "@/lib/server/convert";
import { findLibreOffice } from "@/lib/server/engines/office";

export const dynamic = "force-dynamic";

export async function GET() {
  const [engines, libreOffice] = await Promise.all([availableEngines(), findLibreOffice()]);
  return Response.json({
    engines: [...engines],
    libreOffice: !!libreOffice,
    limits: { maxPages: limits.maxPages, maxFiles: limits.maxFiles, maxUploadMb: Math.round(limits.maxUploadBytes / 1024 / 1024) },
  });
}
