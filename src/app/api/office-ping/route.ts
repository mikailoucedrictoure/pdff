export const maxDuration = 300;

/**
 * Tâche planifiée (vercel.json → crons) : réveille le service Office.
 * Sur Hugging Face, un espace gratuit s'endort après 48 h sans visite ;
 * deux appels par jour le gardent prêt pour les visiteurs.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const base = process.env.PDFF_OFFICE_URL?.trim().replace(/\/+$/, "");
  if (!base) return Response.json({ office: "non configuré" });
  const started = Date.now();
  try {
    const res = await fetch(`${base}/health`, { cache: "no-store", signal: AbortSignal.timeout(280_000) });
    return Response.json({ office: res.ok ? "prêt" : `HTTP ${res.status}`, ms: Date.now() - started });
  } catch (err) {
    console.error("[pdff] réveil du service Office :", err);
    return Response.json({ office: "injoignable", ms: Date.now() - started }, { status: 502 });
  }
}
