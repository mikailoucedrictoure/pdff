/**
 * Les 12 outils de bout en bout (hors formats Office, testés à part).
 */
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
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
