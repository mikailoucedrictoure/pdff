/**
 * CSV : séparateur, accents et nombres sont reconnus quel que soit le logiciel qui a écrit le fichier.
 */
import { describe, expect, it } from "vitest";
import { csvToSpreadsheet, numberOf, readCsv } from "@/lib/server/engines/csv";

const utf8 = (text: string) => new TextEncoder().encode(text);
const rows = (data: Uint8Array) => readCsv(data).rows;

describe("lecture des CSV", () => {
  it("points-virgules (Excel en français) : colonnes séparées, texte entre guillemets gardé entier", () => {
    const { rows: r, separator } = readCsv(utf8('Poste;Prévu;Réalisé\nSalaires;120 000,50;118500\n"Hébergement; web";8000;-9,5\n'));
    expect(separator).toBe(";");
    expect(r).toEqual([["Poste", "Prévu", "Réalisé"], ["Salaires", "120 000,50", "118500"], ["Hébergement; web", "8000", "-9,5"]]);
  });

  it("virgules, tabulations et barres verticales", () => {
    expect(rows(utf8('Name,Amount,Note\nRent,"1,250.50","say ""hi"""\n'))).toEqual([["Name", "Amount", "Note"], ["Rent", "1,250.50", 'say "hi"']]);
    expect(rows(utf8("Nom\tMontant\nLoyer\t650\n"))).toEqual([["Nom", "Montant"], ["Loyer", "650"]]);
    expect(rows(utf8("a|b|c\n1|2|3\n"))).toEqual([["a", "b", "c"], ["1", "2", "3"]]);
  });

  it("ancien codage de Windows et UTF-16 : les accents sont gardés", () => {
    expect(rows(new Uint8Array(Buffer.from("Nom;Coût;Été\nCafé;3,50;oui\n", "latin1")))).toEqual([["Nom", "Coût", "Été"], ["Café", "3,50", "oui"]]);
    expect(rows(new Uint8Array(Buffer.from("﻿Nom;Été\nCafé;1\n", "utf16le")))).toEqual([["Nom", "Été"], ["Café", "1"]]);
    expect(rows(utf8("﻿a;b\n1;2"))).toEqual([["a", "b"], ["1", "2"]]);
  });

  it("nombres : écriture française reconnue, codes et numéros longs laissés en texte", () => {
    expect(numberOf("120 000,50", ";")).toBe(120000.5);
    expect(numberOf("-9,5", ";")).toBe(-9.5);
    expect(numberOf("650.5", ",")).toBe(650.5);
    expect(numberOf("15", "\t")).toBe(15);
    // Dans un fichier à virgules, « 1,250 » est ambigu : laissé tel quel
    expect(numberOf("1,250", ",")).toBeNull();
    expect(numberOf("00123", ";")).toBeNull();
    expect(numberOf("E1C 4Z3", ";")).toBeNull();
    expect(numberOf("5065550142123456789", ";")).toBeNull();
    expect(numberOf("", ";")).toBeNull();
  });
});

describe("tableur remis à LibreOffice", () => {
  const sheet = (text: string, name = "notes") => new TextDecoder().decode(csvToSpreadsheet(utf8(text), name));

  it("chaque champ dans sa cellule, les nombres marqués comme nombres, les accents en UTF-8", () => {
    const xml = sheet("Élève;Note\nZoé;15,5\n");
    expect(xml).toContain(`<table:table table:name="notes">`);
    expect(xml).toContain(`<table:table-cell office:value-type="string"><text:p>Élève</text:p></table:table-cell>`);
    expect(xml).toContain(`<table:table-cell office:value-type="float" office:value="15.5">`);
    expect(xml.match(/<table:table-row>/g)).toHaveLength(2);
  });

  it("un texte qui ressemble à une formule ou à du code reste un simple texte", () => {
    const xml = sheet('a;b\n=SUM(A1:A9);<script>&"x"\n');
    expect(xml).toContain("<text:p>=SUM(A1:A9)</text:p>");
    expect(xml).toContain("&lt;script&gt;&amp;&quot;x&quot;");
    expect(xml).not.toContain("formula");
  });

  it("fichier vide, cellules vides et nom de feuille interdit : toujours un tableur valide", () => {
    expect(sheet("")).toContain("<table:table-row><table:table-cell/></table:table-row>");
    expect(sheet("a;;c\n")).toContain("<table:table-cell/>");
    expect(sheet("a;b\n", "budget [2026]: v1/v2")).toContain(`table:name="budget  2026   v1 v2"`);
  });
});
