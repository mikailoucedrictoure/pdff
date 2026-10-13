/**
 * Lecture d'un fichier CSV avant de le confier à LibreOffice.
 *
 * Un CSV n'a pas de norme : séparé par des virgules en Amérique du Nord anglophone, par des points-virgules
 * en français (où la virgule sert aux décimales), parfois par des tabulations ; en UTF-8 ou dans l'ancien
 * codage de Windows. LibreOffice, lancé sans réglages, ne coupe qu'aux virgules et se trompe sur les accents,
 * différemment d'une version et d'un serveur à l'autre. On lit donc le fichier nous-mêmes et on lui remet
 * un tableur déjà rangé en colonnes, où il n'a plus rien à deviner.
 */

/** Décode le texte : UTF-8 ou UTF-16 s'ils sont annoncés ou valides, sinon l'ancien codage de Windows (accents d'Excel). */
function decode(data: Uint8Array): string {
  if (data[0] === 0xff && data[1] === 0xfe) return new TextDecoder("utf-16le").decode(data.subarray(2));
  if (data[0] === 0xfe && data[1] === 0xff) return new TextDecoder("utf-16be").decode(data.subarray(2));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(data).replace(/^﻿/, "");
  } catch {
    return new TextDecoder("windows-1252").decode(data);
  }
}

/** Découpe en lignes et en champs, guillemets compris (« a;"b;c";d » = trois champs). */
function parse(text: string, separator: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"' && !field) quoted = true;
    else if (c === separator) {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) rows.push([...row, field]);
  return rows;
}

/** Le séparateur qui donne le plus de colonnes, de façon régulière, sur les premières lignes. */
function detectSeparator(text: string): string {
  const sample = text.split(/\r?\n/, 30).join("\n");
  let best = ",";
  let bestScore = 0;
  for (const separator of [";", ",", "\t", "|"]) {
    const counts = parse(sample, separator)
      .filter((r) => r.some((f) => f.trim()))
      .map((r) => r.length);
    if (!counts.length) continue;
    const usual = [...counts].sort((a, b) => a - b)[Math.floor(counts.length / 2)];
    if (usual < 2) continue;
    // Colonnes nombreuses et lignes de même longueur : c'est le bon séparateur
    const regular = counts.filter((n) => n === usual).length / counts.length;
    const score = usual * regular * regular;
    if (score > bestScore) {
      bestScore = score;
      best = separator;
    }
  }
  return best;
}

/** Champs d'un CSV, ligne par ligne, avec le séparateur reconnu. */
export function readCsv(data: Uint8Array): { rows: string[][]; separator: string } {
  const text = decode(data);
  const separator = detectSeparator(text);
  return { rows: parse(text, separator), separator };
}

/** « 1 250,50 » (écriture française) : espaces entre les milliers, virgule décimale. */
const FRENCH_NUMBER = /^[+-]?(?:\d{1,3}(?:[   ]\d{3})+|\d+)(?:,\d+)?$/;
/** Nombre simple. Les codes à zéro initial (« 00123 », codes postaux) et les très longs numéros restent du texte. */
const PLAIN_NUMBER = /^[+-]?(?:0|[1-9]\d{0,14})(?:\.\d+)?$/;

/** Nombre écrit dans un champ, ou null si le champ est du texte. */
export function numberOf(field: string, separator: string): number | null {
  let value = field.trim();
  if (separator !== "," && FRENCH_NUMBER.test(value)) value = value.replace(/[   ]/g, "").replace(",", ".");
  if (!PLAIN_NUMBER.test(value)) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

const xml = (text: string) =>
  text
    .replace(/[^\x09\x0A\x0D\x20-퟿-�\u{10000}-\u{10FFFF}]/gu, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * CSV → tableur OpenDocument « à plat » (.fods) : chaque cellule déjà dans sa colonne, les nombres marqués
 * comme nombres, le texte en UTF-8. Un texte qui commence par « = » reste un texte, jamais une formule.
 */
export function csvToSpreadsheet(data: Uint8Array, sheetName: string): Uint8Array {
  const { rows, separator } = readCsv(data);
  const body = rows
    .map((row) => {
      const cells = row
        .map((field) => {
          const n = numberOf(field, separator);
          if (n !== null) return `<table:table-cell office:value-type="float" office:value="${n}"><text:p>${n}</text:p></table:table-cell>`;
          if (!field) return "<table:table-cell/>";
          // Un texte sur plusieurs lignes garde ses lignes
          const lines = field.split(/\r?\n/).map((line) => `<text:p>${xml(line)}</text:p>`);
          return `<table:table-cell office:value-type="string">${lines.join("")}</table:table-cell>`;
        })
        .join("");
      return `<table:table-row>${cells}</table:table-row>`;
    })
    .join("");
  const name = xml(sheetName.replace(/[[\]*?:/\\]/g, " ").trim().slice(0, 31) || "Feuille1");
  return new TextEncoder().encode(
    `<?xml version="1.0" encoding="UTF-8"?><office:document xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" ` +
      `xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" ` +
      `office:version="1.2" office:mimetype="application/vnd.oasis.opendocument.spreadsheet"><office:body><office:spreadsheet>` +
      `<table:table table:name="${name}">${body || "<table:table-row><table:table-cell/></table:table-row>"}</table:table></office:spreadsheet></office:body></office:document>`,
  );
}
