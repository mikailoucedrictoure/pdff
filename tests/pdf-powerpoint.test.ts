/**
 * PDF → PowerPoint : une diapositive par page, du vrai texte, de vrais tableaux, les images à leur place.
 */
import JSZip from "jszip";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { runTool } from "@/lib/server/runners";
import type { FileData } from "@/lib/server/types";
import { makePng } from "./helpers";

async function deck(): Promise<FileData> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const image = await doc.embedPng((await makePng("photo.png", 200, 120)).data);
  const first = doc.addPage([842, 595]);
  first.drawText("Bilan du trimestre", { x: 60, y: 520, size: 28, font: bold });
  first.drawText("Une hausse de 18 % & un budget < prevu", { x: 60, y: 480, size: 14, font });
  first.drawImage(image, { x: 60, y: 300, width: 200, height: 120 });
  const rows = [["Poste", "Montant"], ["Salaires", "120 000"]];
  rows.forEach((row, r) => row.forEach((cell, c) => first.drawText(cell, { x: 406 + c * 150, y: 405 - r * 24, size: 12, font })));
  for (let r = 0; r <= 2; r++) first.drawLine({ start: { x: 400, y: 420 - r * 24 }, end: { x: 700, y: 420 - r * 24 }, thickness: 1 });
  for (let c = 0; c <= 2; c++) first.drawLine({ start: { x: 400 + c * 150, y: 420 }, end: { x: 400 + c * 150, y: 372 }, thickness: 1 });
  doc.addPage([842, 595]).drawText("Deuxieme diapositive", { x: 60, y: 520, size: 28, font: bold });
  doc.addPage([842, 595]);
  return { name: "bilan.pdf", data: await doc.save() };
}

describe("PDF → PowerPoint", () => {
  it("une diapositive par page, à la taille de la page", async () => {
    const [pptx] = await runTool("convertir", [await deck()], { target: "pptx" });
    expect(pptx.name).toBe("bilan.pptx");
    const zip = await JSZip.loadAsync(pptx.data);
    expect(Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))).toHaveLength(3);
    const presentation = await zip.file("ppt/presentation.xml")!.async("string");
    expect(presentation).toContain(`<p:sldSz cx="${842 * 12700}" cy="${595 * 12700}"/>`);
    expect(presentation.match(/<p:sldId /g)).toHaveLength(3);
  });

  it("le texte reste du texte, le tableau un tableau, l'image une image", async () => {
    const zip = await JSZip.loadAsync((await runTool("convertir", [await deck()], { target: "pptx" }))[0].data);
    const slide = await zip.file("ppt/slides/slide1.xml")!.async("string");
    expect(slide).toContain("<a:t>Bilan du trimestre</a:t>");
    expect(slide).toContain("Une hausse de 18 % &amp; un budget &lt; prevu");
    expect(slide).toContain(`sz="2800" b="1"`);
    const table = /<a:tbl>[\s\S]*<\/a:tbl>/.exec(slide)?.[0] ?? "";
    expect(table.match(/<a:tr /g)).toHaveLength(2);
    expect([...table.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1])).toEqual(["Poste", "Montant", "Salaires", "120 000"]);
    expect(slide.match(/<p:pic>/g)).toHaveLength(1);
    expect(Object.keys(zip.files).filter((n) => n.startsWith("ppt/media/") && !n.endsWith("/"))).toHaveLength(1);
  });

  it("chaque lien interne du fichier pointe vers une partie qui existe", async () => {
    const zip = await JSZip.loadAsync((await runTool("convertir", [await deck()], { target: "pptx" }))[0].data);
    const names = new Set(Object.keys(zip.files));
    for (const rels of [...names].filter((n) => n.endsWith(".rels"))) {
      const base = rels.replace(/_rels\/[^/]+$/, "");
      const xml = await zip.file(rels)!.async("string");
      for (const [, target, mode] of xml.matchAll(/Target="([^"]+)"(?: TargetMode="(\w+)")?/g)) {
        if (mode === "External") continue;
        const resolved = new URL(target, `http://x/${base}`).pathname.slice(1);
        expect(names.has(resolved), `${rels} → ${target}`).toBe(true);
      }
    }
    // Les caractères interdits en XML rendraient le fichier illisible pour PowerPoint
    for (const name of [...names].filter((n) => n.endsWith(".xml"))) expect(await zip.file(name)!.async("string")).not.toMatch(/[\x00-\x08\x0B\x0C\x0E-\x1F]/);
  });
});
