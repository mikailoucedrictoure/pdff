import type { ErrorKey } from "@/i18n/messages/fr";

export interface FileData {
  name: string;
  data: Uint8Array;
}

/**
 * Erreur destinée à l'utilisateur final. Elle porte une clé de traduction
 * (voir `errors` dans `src/i18n/messages/fr.ts`) : le message est rédigé
 * dans la langue de l'utilisateur au moment de la réponse.
 */
export class UserError extends Error {
  constructor(
    public key: ErrorKey,
    public params: Record<string, string | number> = {},
    /** Fichier concerné, affiché en préfixe du message. */
    public file?: string,
  ) {
    super(key);
    this.name = "UserError";
  }
}
