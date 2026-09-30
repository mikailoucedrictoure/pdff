/**
 * Ce que ce serveur sait faire (moteurs disponibles, limites). Calculé à la fabrication
 * des pages et transmis directement à l'interface : aucun aller-retour au chargement.
 */
import { limits } from "@/config/limits";
import type { Capabilities } from "@/lib/core/capabilities";
import { availableEngines } from "./convert";
import { officeAvailable } from "./engines/office";
import { blobEnabled } from "./storage";

export async function getCapabilities(): Promise<Capabilities> {
  const [engines, libreOffice] = await Promise.all([availableEngines(), officeAvailable()]);
  return {
    engines: [...engines],
    libreOffice,
    blob: blobEnabled(),
    limits: { maxPages: limits.maxPages, maxFiles: limits.maxFiles, maxUploadMb: Math.round(limits.maxUploadBytes / 1024 / 1024) },
  };
}
