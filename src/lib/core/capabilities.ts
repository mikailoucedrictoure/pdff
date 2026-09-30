import type { EngineId } from "./graph";

/** Capacités du serveur, partagées entre le serveur et l'interface. */
export interface Capabilities {
  engines: EngineId[];
  libreOffice: boolean;
  /** Gros fichiers : dépôt direct dans Vercel Blob possible. */
  blob: boolean;
  limits: { maxPages: number; maxFiles: number; maxUploadMb: number };
}
