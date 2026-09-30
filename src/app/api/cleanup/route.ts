import { blobEnabled, sweepTemporaryBlobs } from "@/lib/server/storage";

export const maxDuration = 60;

/**
 * Tâche planifiée (vercel.json → crons) : efface tout fichier temporaire
 * de plus d'une heure, au cas où un navigateur se serait fermé en route.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!blobEnabled()) return Response.json({ removed: 0 });
  const removed = await sweepTemporaryBlobs(60 * 60 * 1000);
  return Response.json({ removed });
}
