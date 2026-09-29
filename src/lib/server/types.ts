export interface FileData {
  name: string;
  data: Uint8Array;
}

/** Erreur destinée à l'utilisateur final (message affiché tel quel). */
export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}
