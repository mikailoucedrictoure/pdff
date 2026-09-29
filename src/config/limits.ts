/**
 * Limites de l'application, pilotées par variables d'environnement.
 * Pour augmenter une limite : modifier `.env.local` (local) ou les variables
 * du projet Vercel (production). Aucun changement de code n'est nécessaire.
 */
function intFromEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const limits = {
  maxPages: intFromEnv("PDFF_MAX_PAGES", 10_000),
  maxFiles: intFromEnv("PDFF_MAX_FILES", 500),
  maxUploadBytes: intFromEnv("PDFF_MAX_UPLOAD_MB", 2048) * 1024 * 1024,
} as const;

export type Limits = typeof limits;
