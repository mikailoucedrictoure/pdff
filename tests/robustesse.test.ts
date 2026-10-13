/**
 * Fichiers et réglages « pièges » : chaque outil doit rendre un fichier valide ou un message clair,
 * jamais une erreur brute (« erreur inattendue » sur le site).
 */
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { TOOLS } from "@/lib/core/tools";
import { runTool } from "@/lib/server/runners";
import { type FileData, UserError } from "@/lib/server/types";
import { isPdf, makePdf, makePng, pageCount } from "./helpers";

const SIGNATURE = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAADjAO9DAAAAEUlEQVR4nGNgYGD4z8DAwMAAAAwAAZvWmQAAAAAASUVORK5CYII=`;

/** Réglages habituels de chaque outil du serveur. */
const OPTIONS: Record<string, Record<string, unknown>> = {
  fusionner: { bookmarks: true },
  convertir: { target: "png", dpi: 72 },
  diviser: { mode: "each" },
  extraire: { mode: "keep", pages: "1" },
  organiser: { order: "1", reverse: false },
  pivoter: { angle: "90", pages: "" },
  numeroter: { position: "bottom-center", format: "{n} / {total}", start: 1, size: 10, pages: "" },
  filigrane: { text: "COPIE", color: "gray", opacity: "25", rotation: "45", size: 60, pages: "" },
  compresser: { level: "recommended" },
  proteger: { password: "motdepasse" },
  deverrouiller: { password: "" },
  metadonnees: { title: "Titre" },
  signer: { signature: SIGNATURE, where: "last", position: "bottom-right", size: "medium" },
  caviarder: { terms: "page" },
  remplir: { values: "{}" },
  images: { format: "png" },
  redimensionner: { mode: "resize", scale: "50", format: "same" },
};

const serverTools = TOOLS.filter((t) => !t.local).map((t) => t.id);

async function traps(): Promise<Record<string, FileData>> {
  const pdf = await makePdf("doc.pdf", ["page 1", "page 2", "page 3"]);
  return {
    "PDF tronqué": { name: "tronque.pdf", data: pdf.data.slice(0, Math.floor(pdf.data.length / 2)) },
    "fichier vide": { name: "vide.pdf", data: new Uint8Array() },
    "texte renommé en PDF": { name: "faux.pdf", data: new TextEncoder().encode("ceci n'est pas un PDF") },
    "octets au hasard": { name: "bruit.pdf", data: new Uint8Array(4000).map((_, i) => (i * 7919) % 256) },
    "image abîmée": { name: "casse.png", data: (await makePng("x.png")).data.slice(0, 40) },
    "image vide": { name: "rien.jpg", data: new Uint8Array() },
    "format inconnu": { name: "archive.xyz", data: new Uint8Array([1, 2, 3]) },
  };
}

describe("fichiers illisibles : un message clair, jamais d'erreur brute", () => {
  it.each(serverTools)("%s", async (tool) => {
    expect(OPTIONS[tool], `réglages de test manquants pour l'outil ${tool}`).toBeDefined();
    for (const [label, file] of Object.entries(await traps())) {
      try {
        const out = await runTool(tool, [file], OPTIONS[tool] as never);
        expect(out.every((f) => f.data.byteLength > 0), `${tool} / ${label} : fichier vide remis`).toBe(true);
      } catch (err) {
        expect(err, `${tool} / ${label} : ${String(err)}`).toBeInstanceOf(UserError);
      }
    }
  });
});

describe("réglages inattendus", () => {
  it("pivoter : seuls les quarts de tour sont acceptés, dans les deux sens", async () => {
    const doc = await makePdf("doc.pdf", ["1"]);
    await expect(runTool("pivoter", [doc], { angle: "45", pages: "" })).rejects.toMatchObject({ key: "badOptions" });
    const [back] = await runTool("pivoter", [doc], { angle: "-90", pages: "" });
    expect((await PDFDocument.load(back.data)).getPage(0).getRotation().angle).toBe(270);
  });

  it("compresser : un niveau inconnu revient au niveau recommandé", async () => {
    const [out] = await runTool("compresser", [await makePdf("doc.pdf", ["1"])], { level: "inconnu" });
    expect(isPdf(out)).toBe(true);
  });

  it("signer : une image de signature illisible donne le message habituel", async () => {
    await expect(runTool("signer", [await makePdf("doc.pdf", ["1"])], { signature: "data:image/png;base64,AAAA", where: "last" })).rejects.toMatchObject({ key: "signatureMissing" });
  });

  it("redimensionner : un agrandissement démesuré est ramené à une taille raisonnable", async () => {
    const [out] = await runTool("redimensionner", [await makePng("photo.png", 200, 100)], { mode: "resize", scale: "custom", width: 99999, height: 99999, format: "jpg" });
    const meta = await sharp(Buffer.from(out.data)).metadata();
    expect(meta.width! * meta.height!).toBeLessThanOrEqual(64_000_000);
    expect(meta.width).toBe(meta.height);
  }, 120_000);

  it("PDF sans texte → texte : le message conseille de passer d'abord par « Lire un scan »", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([300, 300]);
    await expect(runTool("convertir", [{ name: "blanc.pdf", data: await doc.save() }], { target: "txt" })).rejects.toMatchObject({ key: "noText" });
    const { VERIFIED_MESSAGES } = await import("@/i18n/messages");
    for (const [lang, messages] of Object.entries(VERIFIED_MESSAGES)) {
      // Chaque langue nomme l'outil comme il s'appelle dans son menu
      expect(messages.errors.noText, lang).toContain(messages.tools.ocr.name);
      expect(messages.workspace.scanHint, lang).toContain(messages.tools.ocr.name);
      expect(messages.errors.redactNone, lang).toContain(messages.tools.ocr.name);
      expect(messages.workspace.compareNoText, lang).toContain(messages.tools.ocr.name);
    }
  });

  it("sélections de pages maladroites : message clair", async () => {
    const doc = await makePdf("doc.pdf", ["1", "2"]);
    await expect(runTool("extraire", [doc], { mode: "keep", pages: "0" })).rejects.toBeInstanceOf(UserError);
    await expect(runTool("extraire", [doc], { mode: "keep", pages: "abc" })).rejects.toBeInstanceOf(UserError);
    await expect(runTool("diviser", [doc], { mode: "ranges", ranges: "" })).rejects.toBeInstanceOf(UserError);
    await expect(runTool("extraire", [doc], { mode: "remove", pages: "1-fin" })).rejects.toMatchObject({ key: "emptyResult" });
    expect(await pageCount((await runTool("diviser", [doc], { mode: "every", every: -3 }))[0])).toBe(1);
  });
});

describe("PDF réparables et protégés", () => {
  it("un PDF aux seules restrictions (sans mot de passe d'ouverture) reste utilisable par tous les outils", async () => {
    const [locked] = await runTool("proteger", [await makePdf("doc.pdf", ["a", "b"])], { password: "", noPrint: true, noCopy: true, noEdit: true });
    expect(await pageCount((await runTool("fusionner", [locked, await makePdf("x.pdf", ["c"])], {}))[0])).toBe(3);
    expect(await runTool("diviser", [locked], { mode: "each" })).toHaveLength(2);
    expect(await runTool("convertir", [locked], { target: "png", dpi: 50 })).toHaveLength(2);
  });

  it("un PDF à mot de passe est refusé avec l'invitation à le déverrouiller", async () => {
    const [locked] = await runTool("proteger", [await makePdf("doc.pdf", ["a"])], { password: "secret" });
    for (const tool of ["fusionner", "diviser", "numeroter", "compresser", "convertir"]) {
      await expect(runTool(tool, [locked], OPTIONS[tool] as never), tool).rejects.toMatchObject({ key: "passwordProtected" });
    }
  });
});

describe("PDF produits : aucune référence cassée dans le fichier", () => {
  /** Renvois internes vers des objets qui n'existent pas (un lecteur strict les signale comme des erreurs). */
  async function dangling(file: FileData): Promise<string[]> {
    const { PDFArray, PDFDict, PDFRef } = await import("pdf-lib");
    const doc = await PDFDocument.load(file.data, { updateMetadata: false });
    const found: string[] = [];
    const scan = (value: unknown, where: string) => {
      if (value instanceof PDFRef) {
        if (doc.context.lookup(value) === undefined) found.push(`${where} → ${value.toString()}`);
      } else if (value instanceof PDFArray) value.asArray().forEach((v, i) => scan(v, `${where}[${i}]`));
      else if (value instanceof PDFDict) for (const [k, v] of value.entries()) scan(v, `${where}${k.toString()}`);
      else if (value && typeof value === "object" && "dict" in value && value.dict instanceof PDFDict) for (const [k, v] of value.dict.entries()) scan(v, `${where}${k.toString()}`);
    };
    for (const [ref, obj] of doc.context.enumerateIndirectObjects()) scan(obj, `${ref.toString()} `);
    return found;
  }

  async function form(): Promise<FileData> {
    const doc = await PDFDocument.create();
    const page = doc.addPage([400, 400]);
    const fields = doc.getForm();
    fields.createTextField("nom").addToPage(page, { x: 20, y: 340, width: 200, height: 24 });
    fields.createCheckBox("accord").addToPage(page, { x: 20, y: 300, width: 16, height: 16 });
    return { name: "formulaire.pdf", data: await doc.save() };
  }

  it("formulaire verrouillé : champs figés, sans reste des anciens champs", async () => {
    const [out] = await runTool("remplir", [await form()], { values: JSON.stringify({ nom: "Awa Diallo", accord: true }), lock: true });
    expect(await dangling(out)).toEqual([]);
    const doc = await PDFDocument.load(out.data);
    expect(doc.getPage(0).node.has((await import("pdf-lib")).PDFName.of("Annots"))).toBe(false);
  });

  it.each(["fusionner", "extraire", "organiser", "pivoter", "numeroter", "filigrane", "compresser", "metadonnees", "signer", "caviarder", "proteger"])("%s", async (tool) => {
    const [out] = await runTool(tool, [await makePdf("doc.pdf", ["page 1", "page 2", "page 3"])], OPTIONS[tool] as never);
    if (tool !== "proteger") expect(await dangling(out)).toEqual([]);
    expect(isPdf(out)).toBe(true);
  });
});

describe("fiabilité dans la durée", () => {
  it("un PDF à dégradés converti de nombreuses fois de suite ne dérègle pas le moteur", async () => {
    const { PDFName, PDFOperator } = await import("pdf-lib");
    const doc = await PDFDocument.create();
    const font = await doc.embedFont("Helvetica");
    const page = doc.addPage([400, 300]);
    const fn = doc.context.obj({ FunctionType: 2, Domain: [0, 1], C0: [0.2, 0.1, 0.5], C1: [0.9, 0.2, 0.5], N: 1 });
    const shading = doc.context.obj({ ShadingType: 2, ColorSpace: "DeviceRGB", Coords: [0, 0, 400, 300], Function: fn, Extend: [true, true] });
    const resources = page.node.Resources()!;
    resources.set(PDFName.of("Shading"), doc.context.obj({ Sh0: shading }));
    page.pushOperators(PDFOperator.of("sh" as never, [PDFName.of("Sh0")]));
    page.drawText("Texte sur un degrade", { x: 40, y: 150, size: 20, font });
    const gradient = { name: "degrade.pdf", data: await doc.save() };
    const plain = await makePdf("doc.pdf", ["page 1", "page 2"]);
    for (let i = 0; i < 30; i++) {
      const [docx] = await runTool("convertir", [gradient], { target: i % 2 ? "docx" : "pptx" });
      expect(docx.data.byteLength).toBeGreaterThan(1000);
      // Chaque tour laisse des objets à libérer : c'est leur libération qui révélait le défaut
      void new Array(20_000).fill(0).map((_, k) => ({ k }));
    }
    expect(await runTool("diviser", [plain], { mode: "each" })).toHaveLength(2);
    const [png] = await runTool("convertir", [gradient], { target: "png", dpi: 72 });
    expect(png.data[1]).toBe(0x50);
  }, 120_000);
});
