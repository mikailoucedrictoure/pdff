/**
 * CSV : séparateur, accents et nombres sont reconnus quel que soit le logiciel qui a écrit le fichier.
 */
import { describe, expect, it } from "vitest";
import { normalizeCsv } from "@/lib/server/engines/csv";

const clean = (data: Uint8Array) => new TextDecoder().decode(normalizeCsv(data)).replace(/^﻿/, "").trim().split("\r\n");
const utf8 = (text: string) => new TextEncoder().encode(text);

describe("remise au propre des CSV", () => {
  it("points-virgules (Excel en français) : colonnes séparées, nombres à virgule reconnus", () => {
    expect(clean(utf8('Poste;Prévu;Réalisé\nSalaires;120 000,50;118500\n"Hébergement; web";8000;-9,5\n'))).toEqual([
      "Poste,Prévu,Réalisé",
      "Salaires,120000.50,118500",
      "Hébergement; web,8000,-9.5",
    ]);
  });

  it("virgules : le texte entre guillemets garde ses virgules, les nombres ne sont pas touchés", () => {
    expect(clean(utf8('Name,Amount,Note\nRent,"1,250.50","a, b"\nBus,80,"say ""hi"""\n'))).toEqual(["Name,Amount,Note", 'Rent,"1,250.50","a, b"', 'Bus,80,"say ""hi"""']);
  });

  it("tabulations et barres verticales", () => {
    expect(clean(utf8("Nom\tMontant\nLoyer\t650\n"))).toEqual(["Nom,Montant", "Loyer,650"]);
    expect(clean(utf8("a|b|c\n1|2|3\n"))).toEqual(["a,b,c", "1,2,3"]);
  });

  it("ancien codage de Windows et UTF-16 : les accents sont gardés", () => {
    expect(clean(new Uint8Array(Buffer.from("Nom;Coût;Été\nCafé;3,50;oui\n", "latin1")))).toEqual(["Nom,Coût,Été", "Café,3.50,oui"]);
    expect(clean(new Uint8Array(Buffer.from("﻿Nom;Été\nCafé;1\n", "utf16le")))).toEqual(["Nom,Été", "Café,1"]);
  });

  it("une dernière ligne sans retour et un fichier vide restent lisibles", () => {
    expect(clean(utf8("a;b\n1;2"))).toEqual(["a,b", "1,2"]);
    expect(clean(utf8(""))).toEqual([""]);
  });

  it("le résultat commence par la marque UTF-8 que LibreOffice reconnaît", () => {
    expect([...normalizeCsv(utf8("a;b\n")).subarray(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);
  });
});
