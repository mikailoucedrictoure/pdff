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

  it("PDF sans texte → texte : un message, pas un fichier vide", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([300, 300]);
    await expect(runTool("convertir", [{ name: "blanc.pdf", data: await doc.save() }], { target: "txt" })).rejects.toMatchObject({ key: "noOutput" });
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
