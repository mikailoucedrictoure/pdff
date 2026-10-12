/**
 * PDF → Word : la qualité du document produit, pas seulement son existence.
 * Un vrai document Word contient des paragraphes, des tableaux et des images dans le fil du texte ;
 * il ne contient aucune zone de texte flottante (ce que Word empile en un tas illisible).
 */
import JSZip from "jszip";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { runTool } from "@/lib/server/runners";
import type { FileData } from "@/lib/server/types";
import { makePng } from "./helpers";

const LOREM =
  "Le present rapport decrit l'etat d'avancement du projet au troisieme trimestre. Les equipes ont livre les fonctions prevues, " +
  "corrige les anomalies signalees par les utilisateurs et prepare la mise en production. Les delais ont ete tenus malgre un calendrier serre.";

/** Rapport de deux pages : titre, paragraphes sur plusieurs lignes, liste, tableau à traits, image. */
async function report(): Promise<FileData> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const image = await doc.embedPng((await makePng("photo.png", 200, 120)).data);
  for (let n = 0; n < 2; n++) {
    const page = doc.addPage([595, 842]);
    let y = 780;
    page.drawText(`Rapport d'activite ${n + 1}`, { x: 60, y, size: 22, font: bold, color: rgb(0.1, 0.2, 0.6) });
    y -= 40;
    for (let p = 0; p < 2; p++) {
      // Retour à la ligne à la main, comme le ferait un traitement de texte
      let line = "";
      for (const word of LOREM.split(" ")) {
        if (font.widthOfTextAtSize(`${line} ${word}`, 11) > 475) {
          page.drawText(line, { x: 60, y, size: 11, font });
          y -= 15;
          line = word;
        } else line = line ? `${line} ${word}` : word;
      }
      page.drawText(line, { x: 60, y, size: 11, font });
      y -= 30;
    }
    for (const item of ["Premier point de la liste", "Deuxieme point de la liste"]) {
      page.drawText("•", { x: 75, y, size: 11, font });
      page.drawText(item, { x: 90, y, size: 11, font });
      y -= 15;
    }
    y -= 20;
    // Tableau 3 × 3 avec tous ses traits
    const rows = [["Poste", "Prevu", "Realise"], ["Salaires", "120 000", "118 500"], ["Hebergement", "8 000", "9 200"]];
    const top = y;
    rows.forEach((row, r) => row.forEach((cell, c) => page.drawText(cell, { x: 66 + c * 150, y: top - 15 - r * 22, size: 11, font: r ? font : bold })));
    for (let r = 0; r <= 3; r++) page.drawLine({ start: { x: 60, y: top - r * 22 }, end: { x: 510, y: top - r * 22 }, thickness: 0.75 });
    for (let c = 0; c <= 3; c++) page.drawLine({ start: { x: 60 + c * 150, y: top }, end: { x: 60 + c * 150, y: top - 66 }, thickness: 0.75 });
    page.drawImage(image, { x: 60, y: top - 66 - 150, width: 200, height: 120 });
  }
  return { name: "rapport.pdf", data: await doc.save() };
}

async function documentXml(file: FileData): Promise<{ xml: string; zip: JSZip }> {
  const zip = await JSZip.loadAsync(file.data);
  return { xml: await zip.file("word/document.xml")!.async("string"), zip };
}

/** Texte de chaque paragraphe, dans l'ordre du document. */
const paragraphs = (xml: string) =>
  [...xml.matchAll(/<w:p>([\s\S]*?)<\/w:p>/g)]
    .map((m) => [...m[1].matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((t) => t[1]).join(""))
    .filter(Boolean)
    .map((t) => t.replace(/&apos;|&#39;/g, "'").replace(/&amp;/g, "&"));

describe("PDF → Word", () => {
  it("produit un document sans aucune zone de texte flottante", async () => {
    const [docx] = await runTool("convertir", [await report()], { target: "docx" });
    expect(docx.name).toBe("rapport.docx");
    const { xml } = await documentXml(docx);
    expect(xml).not.toContain("txbx");
    expect(xml).not.toContain("wp:anchor");
    expect(xml).not.toContain("w:framePr");
    expect(xml).not.toContain("v:shape");
  });

  it("recolle les lignes en paragraphes, dans l'ordre de lecture", async () => {
    const { xml } = await documentXml((await runTool("convertir", [await report()], { target: "docx" }))[0]);
    const texts = paragraphs(xml);
    // Un paragraphe du PDF (4 lignes) = un seul paragraphe Word, avec tout son texte
    expect(texts.filter((t) => t === LOREM)).toHaveLength(4);
    const order = ["Rapport d'activite 1", LOREM, "Premier point de la liste", "Salaires", "Rapport d'activite 2"].map((needle) => texts.findIndex((t) => t.includes(needle)));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    // Les puces restent des puces
    expect(texts.some((t) => t.startsWith("•") && t.includes("Deuxieme point"))).toBe(true);
  });

  it("garde la mise en forme : titre en gras, grand et en couleur", async () => {
    const { xml } = await documentXml((await runTool("convertir", [await report()], { target: "docx" }))[0]);
    const title = /<w:r><w:rPr>((?:(?!<\/w:rPr>).)*)<\/w:rPr><w:t[^>]*>Rapport d(?:'|&apos;)activite 1/.exec(xml)?.[1] ?? "";
    expect(title).toContain("<w:b/>");
    expect(title).toContain(`<w:sz w:val="44"/>`);
    expect(title).toContain(`w:color w:val="1A3399"`);
    expect(title).toContain(`w:ascii="Arial"`);
  });

  it("reconnaît les tableaux : un vrai tableau, avec ses lignes, ses colonnes et ses bordures", async () => {
    const { xml } = await documentXml((await runTool("convertir", [await report()], { target: "docx" }))[0]);
    const tables = xml.match(/<w:tbl>[\s\S]*?<\/w:tbl>/g) ?? [];
    expect(tables).toHaveLength(2);
    const first = tables[0] ?? "";
    expect(first.match(/<w:tr>/g)).toHaveLength(3);
    expect(first.match(/<w:tc>/g)).toHaveLength(9);
    expect(first).toContain(`<w:top w:val="single"`);
    expect(paragraphs(first)).toEqual(["Poste", "Prevu", "Realise", "Salaires", "120 000", "118 500", "Hebergement", "8 000", "9 200"]);
  });

  it("garde les images, dans le fil du texte, et une page Word par page du PDF", async () => {
    const { xml, zip } = await documentXml((await runTool("convertir", [await report()], { target: "docx" }))[0]);
    // La même image sur les deux pages n'est rangée qu'une fois
    expect(Object.keys(zip.files).filter((n) => n.startsWith("word/media/") && !n.endsWith("/"))).toHaveLength(1);
    expect(xml.match(/<wp:inline /g)).toHaveLength(2);
    expect(xml.match(/<w:sectPr>/g)).toHaveLength(2);
    expect(xml).toContain(`<w:pgSz w:w="11900" w:h="16840"/>`);
  });

  it("un PDF scanné (sans texte) reste lisible : chaque page en image", async () => {
    const doc = await PDFDocument.create();
    const scan = await doc.embedPng((await makePng("scan.png", 600, 850)).data);
    for (let i = 0; i < 2; i++) doc.addPage([595, 842]).drawImage(scan, { x: 0, y: 0, width: 595, height: 842 });
    const [docx] = await runTool("convertir", [{ name: "scan.pdf", data: await doc.save() }], { target: "docx" });
    const { xml } = await documentXml(docx);
    expect(xml.match(/<wp:inline /g)).toHaveLength(2);
    expect(xml.match(/<w:sectPr>/g)).toHaveLength(2);
  });

  it("deux colonnes de texte : chaque colonne est lue en entier, l'une après l'autre", async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const page = doc.addPage([595, 842]);
    for (let i = 0; i < 12; i++) {
      page.drawText(`Gauche ligne ${i + 1} du texte de la colonne`, { x: 50, y: 760 - i * 14, size: 10, font });
      // Lignes décalées : les deux colonnes sont deux textes indépendants
      page.drawText(`Droite ligne ${i + 1} du texte de la colonne`, { x: 320, y: 753 - i * 14, size: 10, font });
    }
    const { xml } = await documentXml((await runTool("convertir", [{ name: "colonnes.pdf", data: await doc.save() }], { target: "docx" }))[0]);
    const text = paragraphs(xml).join(" ");
    expect(text.indexOf("Gauche ligne 12")).toBeGreaterThan(-1);
    expect(text.indexOf("Gauche ligne 12")).toBeLessThan(text.indexOf("Droite ligne 1 "));
  });

  it("caractères spéciaux et page vide : le document reste valide", async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc.addPage([400, 300]).drawText(`Prix < 5 & "taxes" > 0 - cafe`, { x: 40, y: 150, size: 12, font });
    doc.addPage([400, 300]);
    const { xml } = await documentXml((await runTool("convertir", [{ name: "special.pdf", data: await doc.save() }], { target: "docx" }))[0]);
    expect(xml).toContain("Prix &lt; 5 &amp; &quot;taxes&quot; &gt; 0");
    expect(xml).not.toMatch(/[\x00-\x08\x0B\x0C\x0E-\x1F]/);
    expect(xml.match(/<w:p[ >]/g)?.length).toBe(xml.match(/<\/w:p>/g)?.length);
    expect(xml.match(/<w:sectPr>/g)).toHaveLength(2);
  });

  it("un outil PDF peut rendre son résultat en Word", async () => {
    const [docx] = await runTool("extraire", [await report()], { mode: "keep", pages: "2", output: "docx" });
    const { xml } = await documentXml(docx);
    expect(paragraphs(xml).some((t) => t.includes("Rapport d'activite 2"))).toBe(true);
    expect(xml).not.toContain("Rapport d'activite 1");
  });
});
