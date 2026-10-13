/**
 * Remise au propre d'un fichier CSV avant de le confier à LibreOffice.
 *
 * Un CSV n'a pas de norme : séparé par des virgules en Amérique du Nord anglophone, par des points-virgules
 * en français (où la virgule sert aux décimales), parfois par des tabulations ; en UTF-8 ou dans l'ancien
 * codage de Windows. LibreOffice, lancé sans réglages, ne coupe qu'aux virgules et se trompe sur les accents.
 * On lit donc le fichier nous-mêmes et on le réécrit dans la forme qu'il comprend à coup sûr :
 * UTF-8 (avec marque d'en-tête), virgules, champs entre guillemets.
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

/** « 1 250,50 » (écriture française) → 1250.50, pour que le tableur y voie un nombre. */
const FRENCH_NUMBER = /^[+-]?(?:\d{1,3}(?:[   ]\d{3})+|\d+)(?:,\d+)?$/;

export function normalizeCsv(data: Uint8Array): Uint8Array {
  const text = decode(data);
  const separator = detectSeparator(text);
  const rows = parse(text, separator);
  const out = rows
    .map((row) =>
      row
        .map((field) => {
          let value = field;
          if (separator !== "," && FRENCH_NUMBER.test(value.trim()) && /[,\s  ]/.test(value.trim())) value = value.trim().replace(/[   ]/g, "").replace(",", ".");
          return /[",\r\n]/.test(value) || value !== value.trim() ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(","),
    )
    .join("\r\n");
  return new TextEncoder().encode(`﻿${out}\r\n`);
}
