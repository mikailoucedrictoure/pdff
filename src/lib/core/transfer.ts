/**
 * Transfert des fichiers entre le navigateur et le serveur.
 *
 * Vercel limite le corps d'une requête (et d'une réponse) à 4,5 Mo. En dessous de
 * DIRECT_TRANSFER_BYTES, les fichiers passent directement dans la requête (rapide,
 * rien n'est stocké). Au-dessus, ils transitent par Vercel Blob sous un nom aléatoire
 * et sont supprimés dès que le traitement ou le téléchargement est terminé.
 */
export const DIRECT_TRANSFER_BYTES = 4 * 1024 * 1024;

/** Préfixes des fichiers temporaires dans le stockage Blob. */
export const BLOB_INPUT_PREFIX = "in/";
export const BLOB_OUTPUT_PREFIX = "out/";

/** Fichier déposé dans le stockage Blob par le navigateur. */
export interface BlobFileRef {
  url: string;
  name: string;
}

/** Résultat trop gros pour la réponse directe : à télécharger depuis Blob. */
export interface BlobResult {
  url: string;
  downloadUrl: string;
  name: string;
  size: number;
  count: number;
}
