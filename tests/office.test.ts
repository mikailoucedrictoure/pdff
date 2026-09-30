/**
 * Formats Office. Deux façons de les tester :
 * - OFFICE_TEST_URL + OFFICE_TEST_TOKEN : le service `services/office` (conteneur Docker en CI) ;
 * - sinon LibreOffice installé sur la machine.
 * Sans l'un ni l'autre, ces tests sont ignorés.
 */
import JSZip from "jszip";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { FileData } from "@/lib/server/types";
import { isPdf, pageCount } from "./helpers";

const remote = process.env.OFFICE_TEST_URL;
if (remote) {
  vi.stubEnv("PDFF_OFFICE_URL", remote);
  vi.stubEnv("PDFF_OFFICE_TOKEN", process.env.OFFICE_TEST_TOKEN ?? "");
}
const { findLibreOffice } = await import("@/lib/server/engines/office");
const available = !!remote || !!(await findLibreOffice());

async function docx(name: string, text: string): Promise<FileData> {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,
  );
  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
  );
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>${text}</w:t></w:r></w:p></w:body></w:document>`,
  );
  return { name, data: await zip.generateAsync({ type: "uint8array" }) };
}

const csv = (name: string): FileData => ({ name, data: new TextEncoder().encode("Nom;Montant\nLoyer;650\nTransport;80\n") });

describe.skipIf(!available)(`formats Office (${remote ? "service distant" : "LibreOffice local"})`, () => {
  let runTool: typeof import("@/lib/server/runners").runTool;
  beforeAll(async () => {
    ({ runTool } = await import("@/lib/server/runners"));
  });

  it("Word → PDF (accents, arabe, chinois)", async () => {
    const [pdf] = await runTool("convertir", [await docx("lettre.docx", "Bonjour é à ç — مرحبا — 你好")], { target: "pdf" });
    expect(pdf.name).toBe("lettre.pdf");
    expect(isPdf(pdf)).toBe(true);
  }, 300_000);

  it("fusion Word + Word → PDF de 2 pages", async () => {
    const [pdf] = await runTool("fusionner", [await docx("a.docx", "Premier"), await docx("b.docx", "Second")], { bookmarks: true });
    expect(await pageCount(pdf)).toBe(2);
  }, 300_000);

  it("PDF → Word (import PDF)", async () => {
    const [pdf] = await runTool("convertir", [await docx("x.docx", "Aller-retour")], { target: "pdf" });
    const [back] = await runTool("convertir", [pdf], { target: "docx" });
    expect(back.name).toBe("x.docx");
    expect(Buffer.from(back.data.subarray(0, 2)).toString()).toBe("PK");
  }, 300_000);

  it("tableur CSV → Excel", async () => {
    const [xlsx] = await runTool("convertir", [csv("budget.csv")], { target: "xlsx" });
    expect(xlsx.name).toBe("budget.xlsx");
    expect(Buffer.from(xlsx.data.subarray(0, 2)).toString()).toBe("PK");
  }, 300_000);
});
