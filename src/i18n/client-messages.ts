/**
 * Textes envoyés au navigateur : uniquement ceux des composants interactifs.
 * Les textes SEO, Confidentialité, FAQ… restent dans le HTML fabriqué à l'avance
 * et ne sont pas dupliqués dans les données React (pages plus légères, changement de langue plus rapide).
 */
import type { Messages } from "./messages/fr";

type ToolKey = keyof Messages["tools"];
type ClientToolText<K extends ToolKey> = Pick<Messages["tools"][K], "name" | "tagline" | "options">;

export type ClientMessages = Pick<Messages, "language" | "workspace" | "notice" | "formatNames" | "formatCategories"> & {
  home: Pick<Messages["home"], "orbitHint" | "orbitCore">;
  errors: Pick<Messages["errors"], "tooLarge">;
  tools: { [K in ToolKey]: ClientToolText<K> };
};

export function toClientMessages(m: Messages): ClientMessages {
  const tools = Object.fromEntries(
    Object.entries(m.tools).map(([id, { name, tagline, options }]) => [id, { name, tagline, options }]),
  ) as ClientMessages["tools"];
  return {
    language: m.language,
    workspace: m.workspace,
    notice: m.notice,
    formatNames: m.formatNames,
    formatCategories: m.formatCategories,
    home: { orbitHint: m.home.orbitHint, orbitCore: m.home.orbitCore },
    errors: { tooLarge: m.errors.tooLarge },
    tools,
  };
}
