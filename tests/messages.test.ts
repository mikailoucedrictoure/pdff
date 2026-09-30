import { describe, expect, it } from "vitest";
import { VERIFIED_MESSAGES } from "@/i18n/messages";
import { TOOL_IDS } from "@/lib/core/tools";

type Flat = Record<string, string>;
function flatten(value: unknown, prefix = "", out: Flat = {}): Flat {
  if (typeof value === "string") out[prefix] = value;
  else if (Array.isArray(value)) value.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
}
const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join("|");

const fr = flatten(VERIFIED_MESSAGES.fr);

describe.each(Object.keys(VERIFIED_MESSAGES))("traduction « %s »", (lang) => {
  const messages = VERIFIED_MESSAGES[lang as keyof typeof VERIFIED_MESSAGES];
  const flat = flatten(messages);

  it("a exactement les mêmes textes que le français (listes comprises)", () => {
    expect(Object.keys(flat).sort()).toEqual(Object.keys(fr).sort());
  });
  it("garde toutes les {variables}", () => {
    for (const [key, text] of Object.entries(fr)) expect(placeholders(flat[key]), `${lang} ${key}`).toBe(placeholders(text));
  });
  it("aucun texte vide", () => {
    for (const [key, text] of Object.entries(flat)) expect(text.trim(), `${lang} ${key}`).not.toBe("");
  });
  it("titres et descriptions adaptés à Google", () => {
    expect(messages.meta.description.length).toBeLessThanOrEqual(180);
    for (const id of TOOL_IDS) {
      const t = messages.tools[id];
      expect(t.seoTitle.length, `${lang} ${id}`).toBeLessThanOrEqual(75);
      expect(t.seoDescription.length, `${lang} ${id}`).toBeLessThanOrEqual(180);
    }
  });
});
