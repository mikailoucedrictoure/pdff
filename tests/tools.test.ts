/**
 * Les 13 outils de bout en bout (hors formats Office, testés à part).
 */
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { renamedFiles } from "@/lib/core/rename";
import { runTool } from "@/lib/server/runners";
import { UserError } from "@/lib/server/types";
import { isPdf, makePdf, makePng, pageCount } from "./helpers";

describe("outils PDF", () => {
  it("fusionner : PDF + image, dans l'ordre", async () => {
    const [out] = await runTool("fusionner", [await makePdf("a.pdf", ["A1", "A2"]), await makePng("photo.png"), await makePdf("b.pdf", ["B1"])], {
      bookmarks: true,
    });
    expect(isPdf(out)).toBe(true);
    expect(await pageCount(out)).toBe(4);
  });

  it("diviser : une plage = un fichier", async () => {
    const out = await runTool("diviser", [await makePdf("doc.pdf", ["1", "2", "3", "4"])], { mode: "ranges", ranges: "1-2, 3-fin" });
    expect(out).toHaveLength(2);
    expect(await Promise.all(out.map(pageCount))).toEqual([2, 2]);
  });

  it("diviser : page par page", async () => {
    const out = await runTool("diviser", [await makePdf("doc.pdf", ["1", "2", "3"])], { mode: "each" });
    expect(out).toHaveLength(3);
  });

  it("extraire : garder ou retirer", async () => {
    const doc = await makePdf("doc.pdf", ["1", "2", "3", "4"]);
    expect(await pageCount((await runTool("extraire", [doc], { mode: "keep", pages: "2-3" }))[0])).toBe(2);
    expect(await pageCount((await runTool("extraire", [doc], { mode: "remove", pages: "1" }))[0])).toBe(3);
  });

  it("organiser : nouvel ordre", async () => {
    const [out] = await runTool("organiser", [await makePdf("doc.pdf", ["1", "2", "3"])], { order: "3, 1", reverse: false });
    expect(await pageCount(out)).toBe(2);
  });

  it("pivoter", async () => {
    const [out] = await runTool("pivoter", [await makePdf("doc.pdf", ["1", "2"])], { angle: "90", pages: "1" });
    const doc = await PDFDocument.load(out.data);
    expect(doc.getPage(0).getRotation().angle).toBe(90);
    expect(doc.getPage(1).getRotation().angle).toBe(0);
  });

  it("numéroter, filigrane, métadonnées", async () => {
    const doc = await makePdf("doc.pdf", ["1", "2"]);
    expect(isPdf((await runTool("numeroter", [doc], { position: "bottom-center", format: "{n} / {total}", start: 1, size: 10, pages: "" }))[0])).toBe(true);
    expect(isPdf((await runTool("filigrane", [doc], { text: "COPIE", size: 60, opacity: 20, rotation: 45, color: "gray", pages: "" }))[0])).toBe(true);
    const [meta] = await runTool("metadonnees", [doc], { title: "Mon titre", author: "pdff", subject: "", keywords: "", clear: false });
    expect((await PDFDocument.load(meta.data)).getTitle()).toBe("Mon titre");
  });

  it("compresser", async () => {
    const [out] = await runTool("compresser", [await makePdf("doc.pdf", ["1"])], { level: "recommended" });
    expect(isPdf(out)).toBe(true);
  });

  it("protéger puis déverrouiller", async () => {
    const [locked] = await runTool("proteger", [await makePdf("doc.pdf", ["secret"])], { password: "motdepasse", noPrint: false, noCopy: false, noEdit: false });
    expect(Buffer.from(locked.data).includes(Buffer.from("/Encrypt"))).toBe(true);
    const [open] = await runTool("deverrouiller", [locked], { password: "motdepasse" });
    expect(Buffer.from(open.data).includes(Buffer.from("/Encrypt"))).toBe(false);
    await expect(runTool("deverrouiller", [locked], { password: "faux" })).rejects.toBeInstanceOf(UserError);
  });
});

describe("conversions sans LibreOffice", () => {
  it("image → PDF, PNG → JPG, PDF → PNG", async () => {
    const png = await makePng("image.png");
    expect(isPdf((await runTool("convertir", [png], { target: "pdf" }))[0])).toBe(true);
    const [jpg] = await runTool("convertir", [png], { target: "jpg", quality: 90 });
    expect(jpg.name).toBe("image.jpg");
    expect(Buffer.from(jpg.data.subarray(0, 3)).toString("hex")).toBe("ffd8ff");
    const pages = await runTool("convertir", [await makePdf("doc.pdf", ["1", "2"])], { target: "png", dpi: 72 });
    expect(pages).toHaveLength(2);
  });

  it("messages d'erreur clairs", async () => {
    await expect(runTool("convertir", [await makePng("image.png")], { target: "" })).rejects.toMatchObject({ key: "chooseTarget" });
    await expect(runTool("extraire", [await makePdf("doc.pdf", ["1"])], { mode: "keep", pages: "9" })).rejects.toMatchObject({ key: "pageMissing" });
  });
});

describe("archive ZIP", () => {
  it("plusieurs résultats restent lisibles une fois zippés", async () => {
    const out = await runTool("diviser", [await makePdf("doc.pdf", ["1", "2"])], { mode: "each" });
    const zip = new JSZip();
    for (const f of out) zip.file(f.name, f.data);
    const back = await JSZip.loadAsync(await zip.generateAsync({ type: "uint8array" }));
    expect(Object.keys(back.files)).toHaveLength(2);
  });
});

describe("format du résultat et renommage", () => {
  it("diviser puis convertir chaque morceau en PNG", async () => {
    const out = await runTool("diviser", [await makePdf("doc.pdf", ["1", "2"])], { mode: "each", output: "png" });
    expect(out.map((f) => f.name.split(".").pop())).toEqual(["png", "png"]);
    expect(out[0].data[1]).toBe(0x50); // signature PNG
  });

  it("PDF par défaut quand aucun format n'est choisi", async () => {
    const [out] = await runTool("pivoter", [await makePdf("doc.pdf", ["1"])], { angle: 90, pages: "", output: "pdf" });
    expect(isPdf(out)).toBe(true);
  });

  it("renommer : un nom, une numérotation, une extension", () => {
    expect(renamedFiles(["a.pdf"], "Facture mars", "")).toEqual(["Facture mars.pdf"]);
    expect(renamedFiles(["a.pdf", "b.jpg"], "Scan", "")).toEqual(["Scan-1.pdf", "Scan-2.jpg"]);
    expect(renamedFiles(["a.txt"], "", ".md")).toEqual(["a.md"]);
    expect(renamedFiles(["a.pdf"], 'x/y:z?', "")).toEqual(["x-y-z-.pdf"]);
  });

  it("renommer via l'API : le contenu reste identique", async () => {
    const file = await makePdf("doc.pdf", ["1"]);
    const [out] = await runTool("renommer", [file], { name: "Contrat signé", ext: "" });
    expect(out.name).toBe("Contrat signé.pdf");
    expect(out.data).toBe(file.data);
  });
});

describe("signer et caviarder", () => {
  const SIGNATURE = `data:image/png;base64,${Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAADjAO9DAAAAEUlEQVR4nGNgYGD4z8DAwMAAAAwAAZvWmQAAAAAASUVORK5CYII=",
    "base64",
  ).toString("base64")}`;

  it("signer : la signature est posée sur la dernière page", async () => {
    const [out] = await runTool("signer", [await makePdf("doc.pdf", ["1", "2"])], { signature: SIGNATURE, where: "last", position: "bottom-right", size: "medium", date: true, dateText: "02/10/2026" });
    expect(isPdf(out)).toBe(true);
    expect(await pageCount(out)).toBe(2);
  });

  it("signer : refuse sans signature", async () => {
    await expect(runTool("signer", [await makePdf("doc.pdf", ["1"])], { signature: "", where: "last" })).rejects.toMatchObject({ key: "signatureMissing" });
  });

  it("caviarder : le texte disparaît vraiment du fichier", async () => {
    const [out] = await runTool("caviarder", [await makePdf("doc.pdf", ["Jean Dupont", "jean.dupont@ex.fr"])], { terms: "DUPONT", patterns: "email", areas: "" });
    const { extractText } = await import("@/lib/server/engines/mupdf");
    const text = new TextDecoder().decode((await extractText(out, "txt")).data);
    expect(text).not.toMatch(/Dupont/i);
    expect(text).not.toContain("@");
    expect(text).toContain("Jean");
  });

  it("caviarder : une zone tracée efface tout ce qu'elle couvre", async () => {
    const [out] = await runTool("caviarder", [await makePdf("doc.pdf", ["Secret"])], { areas: JSON.stringify([{ page: 0, x: 0, y: 0, w: 1, h: 1 }]) });
    const { extractText } = await import("@/lib/server/engines/mupdf");
    expect(new TextDecoder().decode((await extractText(out, "txt")).data)).not.toContain("Secret");
  });

  it("caviarder : message clair si rien n'est trouvé ou demandé", async () => {
    await expect(runTool("caviarder", [await makePdf("doc.pdf", ["Bonjour"])], { terms: "Introuvable" })).rejects.toMatchObject({ key: "redactNone" });
    await expect(runTool("caviarder", [await makePdf("doc.pdf", ["Bonjour"])], {})).rejects.toMatchObject({ key: "redactNothing" });
  });
});

describe("caviarder : textes particuliers", () => {
  it("caractères spéciaux et espaces multiples", async () => {
    const [out] = await runTool("caviarder", [await makePdf("doc.pdf", ["Dossier (A+B) 12$"])], { terms: "(a+b)  12$" });
    const { extractText } = await import("@/lib/server/engines/mupdf");
    const text = new TextDecoder().decode((await extractText(out, "txt")).data);
    expect(text).toContain("Dossier");
    expect(text).not.toContain("(A+B)");
  });
});
