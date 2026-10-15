/**
 * PDF → Word (DOCX) : la mise en page lue par `pdf-layout.ts` est écrite dans un vrai document
 * (paragraphes, tableaux, images en ligne), sans aucune zone de texte flottante. Le fichier s'ouvre
 * et se modifie de la même façon dans Word, LibreOffice, Google Docs et sur téléphone.
 */
import JSZip from "jszip";
import { baseName } from "@/lib/core/formats";
import type { FileData } from "../types";
import { assertPageLimit, open } from "./mupdf";
import { type Block, type Columns, imageStore, type PageLayout, type Paragraph, type Picture, readLayout, type Run, type Table } from "./pdf-layout";

const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const NAMESPACES =
  `xmlns:w="${W}" xmlns:r="${R}" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" ` +
  `xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"`;

/** Points → vingtièmes de point (unité des mesures de Word). */
const tw = (pt: number) => Math.round(pt * 20);
/** Points → EMU (unité des images). */
const emu = (pt: number) => Math.round(pt * 12700);

/** Texte sûr pour du XML : les caractères interdits rendraient le document illisible pour Word. */
function esc(text: string): string {
  return text
    .replace(/[^\x09\x0A\x0D\x20-퟿-�\u{10000}-\u{10FFFF}]/gu, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Paragraphe vide d'un point de haut : Word en exige un après un tableau et en fin de cellule. */
const tiny = (height = 1, extra = "") =>
  `<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="${tw(Math.max(1, height))}" w:lineRule="exact"/><w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr>${extra}</w:pPr></w:p>`;

class Writer {
  private relations: string[] = [];
  private ids = new Map<string, string>();
  private drawings = 0;

  constructor(private imageName: (data: Uint8Array) => string) {}

  private relation(key: string, xml: (id: string) => string): string {
    let id = this.ids.get(key);
    if (!id) {
      id = `rId${this.ids.size + 10}`;
      this.ids.set(key, id);
      this.relations.push(xml(id));
    }
    return id;
  }

  relationships(): string {
    return (
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
      `<Relationship Id="rId1" Type="${R}/styles" Target="styles.xml"/><Relationship Id="rId2" Type="${R}/settings" Target="settings.xml"/>` +
      `${this.relations.join("")}</Relationships>`
    );
  }

  private run(run: Run): string {
    const size = Math.max(2, Math.round(run.size * 2));
    const font = esc(run.font);
    const rtl = /[֐-ࣿיִ-﷿ﹰ-ﻼ]/.test(run.text);
    const props =
      `<w:rFonts w:ascii="${font}" w:hAnsi="${font}" w:eastAsia="${font}" w:cs="${font}"/>` +
      (run.bold ? "<w:b/><w:bCs/>" : "") +
      (run.italic ? "<w:i/><w:iCs/>" : "") +
      (run.strike ? "<w:strike/>" : "") +
      (run.color !== "000000" ? `<w:color w:val="${run.color}"/>` : "") +
      `<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>` +
      (run.underline ? `<w:u w:val="single"/>` : "") +
      (run.highlight ? `<w:shd w:val="clear" w:color="auto" w:fill="${run.highlight}"/>` : "") +
      (run.script ? `<w:vertAlign w:val="${run.script > 0 ? "superscript" : "subscript"}"/>` : "") +
      (rtl ? "<w:rtl/>" : "");
    const content = run.text
      .split(/([\t\n])/)
      .map((part) => (part === "\t" ? "<w:tab/>" : part === "\n" ? "<w:br/>" : part ? `<w:t xml:space="preserve">${esc(part)}</w:t>` : ""))
      .join("");
    return `<w:r><w:rPr>${props}</w:rPr>${content}</w:r>`;
  }

  private runs(runs: Run[]): string {
    let xml = "";
    for (let i = 0; i < runs.length; ) {
      const link = runs[i].link;
      let j = i;
      while (j < runs.length && runs[j].link === link) j++;
      const inner = runs.slice(i, j).map((r) => this.run(r)).join("");
      if (link) {
        const id = this.relation(`link:${link}`, (rid) => `<Relationship Id="${rid}" Type="${R}/hyperlink" Target="${esc(link)}" TargetMode="External"/>`);
        xml += `<w:hyperlink r:id="${id}" w:history="1">${inner}</w:hyperlink>`;
      } else xml += inner;
      i = j;
    }
    return xml;
  }

  /**
   * `spare` : place libre à droite du cadre (marge de la page). Un paragraphe d'une seule ligne peut s'y
   * étendre : avec une police de remplacement un peu plus large, il ne passe pas à la ligne.
   */
  private paragraph(p: Paragraph, before: number, spare: number): string {
    let left = Math.max(0, p.left);
    let right = Math.max(0, p.right);
    // Un paragraphe sur fond de couleur garde sa largeur : le fond ne doit pas déborder
    if (p.shade) right = Math.max(0, right);
    else if (p.lines > 1) right = Math.max(-spare, right - 2.5);
    else if (p.align === "right") left = Math.max(0, left - 36);
    else if (p.align === "center") {
      const give = Math.min(36, left, right);
      left -= give;
      right -= give;
    } else right = Math.max(-spare, right - 36);
    const first = Math.max(-left, p.first);
    const tabs = p.tabs.filter((t) => t.pos > 0.5).map((t) => `<w:tab w:val="${t.kind}" w:pos="${tw(t.pos)}"/>`).join("");
    // Dans un paragraphe de droite à gauche, le bord de départ est à droite
    const jc = p.rtl ? (p.align === "left" ? "end" : p.align === "right" ? "" : p.align) : p.align === "left" ? "" : p.align;
    const props =
      (p.shade ? `<w:shd w:val="clear" w:color="auto" w:fill="${p.shade}"/>` : "") +
      (tabs ? `<w:tabs>${tabs}</w:tabs>` : "") +
      (p.rtl ? "<w:bidi/>" : "") +
      `<w:spacing w:before="${tw(Math.max(0, before))}" w:after="0" w:line="${tw(Math.max(1, p.line))}" w:lineRule="exact"/>` +
      `<w:ind w:left="${tw(left)}" w:right="${tw(right)}"${first > 0.5 ? ` w:firstLine="${tw(first)}"` : first < -0.5 ? ` w:hanging="${tw(-first)}"` : ""}/>` +
      (jc ? `<w:jc w:val="${jc}"/>` : "");
    return `<w:p><w:pPr>${props}</w:pPr>${this.runs(p.runs)}</w:p>`;
  }

  private graphic(picture: Picture, width: number, height: number): string {
    const name = this.imageName(picture.data);
    const id = this.relation(`image:${name}`, (rid) => `<Relationship Id="${rid}" Type="${R}/image" Target="media/${name}"/>`);
    const n = ++this.drawings;
    return (
      `<wp:extent cx="${emu(width)}" cy="${emu(height)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/>${picture.behind ? "<wp:wrapNone/>" : ""}` +
      `<wp:docPr id="${n}" name="Image ${n}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>` +
      `<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic>` +
      `<pic:nvPicPr><pic:cNvPr id="${n}" name="${name}"/><pic:cNvPicPr/></pic:nvPicPr>` +
      `<pic:blipFill><a:blip r:embed="${id}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>` +
      `<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${emu(width)}" cy="${emu(height)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>` +
      `</pic:pic></a:graphicData></a:graphic>`
    );
  }

  /** Image dans le fil du texte, sur sa propre ligne. */
  private picture(picture: Picture, before: number, scale = 1): string {
    const width = Math.max(1, picture.width * scale);
    const height = Math.max(1, (picture.bottom - picture.top) * scale);
    return (
      `<w:p><w:pPr><w:spacing w:before="${tw(Math.max(0, before))}" w:after="0" w:line="240" w:lineRule="auto"/><w:ind w:left="${tw(Math.max(0, picture.left))}"/>` +
      `<w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr>` +
      `<w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">${this.graphic(picture, width, height)}</wp:inline></w:drawing></w:r></w:p>`
    );
  }

  /** Images de fond : accrochées à la page, derrière le texte. */
  private background(pictures: Picture[]): string {
    const anchors = pictures
      .map(
        (p) =>
          `<w:r><w:drawing><wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="1" behindDoc="1" locked="0" layoutInCell="1" allowOverlap="1">` +
          `<wp:simplePos x="0" y="0"/><wp:positionH relativeFrom="page"><wp:posOffset>${emu(p.left)}</wp:posOffset></wp:positionH>` +
          `<wp:positionV relativeFrom="page"><wp:posOffset>${emu(p.top)}</wp:posOffset></wp:positionV>` +
          `${this.graphic(p, p.width, p.bottom - p.top)}</wp:anchor></w:drawing></w:r>`,
      )
      .join("");
    return `<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/></w:pPr>${anchors}</w:p>`;
  }

  private table(table: Table): string {
    const total = table.widths.reduce((s, w) => s + w, 0);
    const size = Math.min(48, Math.max(2, Math.round(table.border.width * 8)));
    const edge = (side: string, on: boolean) => `<w:${side} w:val="${on ? "single" : "nil"}"${on ? ` w:sz="${size}" w:space="0" w:color="${table.border.color}"` : ""}/>`;
    const rows = table.rows
      .map((row) => {
        let col = 0;
        const cells = row.cells
          .map((cell) => {
            const width = table.widths.slice(col, col + cell.span).reduce((s, w) => s + w, 0);
            col += cell.span;
            const props =
              `<w:tcW w:w="${tw(width)}" w:type="dxa"/>` +
              (cell.span > 1 ? `<w:gridSpan w:val="${cell.span}"/>` : "") +
              (cell.merge ? `<w:vMerge${cell.merge === "start" ? ` w:val="restart"` : ""}/>` : "") +
              `<w:tcBorders>${edge("top", cell.borders.top)}${edge("left", cell.borders.left)}${edge("bottom", cell.borders.bottom)}${edge("right", cell.borders.right)}</w:tcBorders>` +
              (cell.shade ? `<w:shd w:val="clear" w:color="auto" w:fill="${cell.shade}"/>` : "");
            return `<w:tc><w:tcPr>${props}</w:tcPr>${this.flow(cell.blocks, cell.top, true)}</w:tc>`;
          })
          .join("");
        return `<w:tr><w:trPr><w:trHeight w:val="${tw(Math.max(1, row.height))}" w:hRule="atLeast"/></w:trPr>${cells}</w:tr>`;
      })
      .join("");
    const pad = tw(table.pad);
    return (
      `<w:tbl><w:tblPr><w:tblW w:w="${tw(total)}" w:type="dxa"/><w:tblInd w:w="${tw(table.left)}" w:type="dxa"/><w:tblLayout w:type="fixed"/>` +
      `<w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="${pad}" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="${pad}" w:type="dxa"/></w:tblCellMar></w:tblPr>` +
      `<w:tblGrid>${table.widths.map((w) => `<w:gridCol w:w="${tw(w)}"/>`).join("")}</w:tblGrid>${rows}</w:tbl>`
    );
  }

  /** Colonnes côte à côte : un tableau invisible d'une seule ligne, chaque colonne dans sa cellule. */
  private columns(columns: Columns, height: number): string {
    const total = columns.cols.reduce((s, c) => s + c.width, 0);
    const cells = columns.cols
      .map((col) => `<w:tc><w:tcPr><w:tcW w:w="${tw(col.width)}" w:type="dxa"/>${col.shade ? `<w:shd w:val="clear" w:color="auto" w:fill="${col.shade}"/>` : ""}</w:tcPr>${this.flow(col.blocks, columns.top, true)}</w:tc>`)
      .join("");
    return (
      `<w:tbl><w:tblPr><w:tblW w:w="${tw(total)}" w:type="dxa"/><w:tblInd w:w="${tw(columns.left)}" w:type="dxa"/><w:tblLayout w:type="fixed"/>` +
      `<w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="0" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar></w:tblPr>` +
      `<w:tblGrid>${columns.cols.map((c) => `<w:gridCol w:w="${tw(c.width)}"/>`).join("")}</w:tblGrid>` +
      `<w:tr><w:trPr><w:trHeight w:val="${tw(Math.max(1, height))}" w:hRule="atLeast"/></w:trPr>${cells}</w:tr></w:tbl>`
    );
  }

  /**
   * Écrit des blocs les uns sous les autres. Chaque bloc est descendu de l'écart qui le séparait
   * du précédent dans le PDF (`cursor` : bas du bloc précédent).
   */
  flow(blocks: Block[], cursor: number, inCell: boolean, maxBottom = Infinity, spare = 0): string {
    let xml = "";
    let afterTable = false;
    for (const block of blocks) {
      if (block.kind === "image" && block.behind) continue;
      const gap = block.top - cursor;
      if (block.kind === "p") xml += this.paragraph(block, gap, spare);
      else if (block.kind === "image") xml += this.picture(block, gap);
      else if (block.kind === "rule") {
        const size = Math.min(48, Math.max(2, Math.round(block.thickness * 8)));
        xml +=
          `<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="${size}" w:space="0" w:color="${block.color}"/></w:pBdr>` +
          `<w:spacing w:before="${tw(Math.max(0, gap))}" w:after="0" w:line="20" w:lineRule="exact"/>` +
          `<w:ind w:left="${tw(Math.max(0, block.left))}" w:right="${tw(Math.max(0, block.right))}"/><w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr></w:pPr></w:p>`;
      } else {
        // Un tableau ne peut pas être « descendu » : un paragraphe vide de la bonne hauteur le précède
        if (gap >= 1 || afterTable) xml += tiny(gap);
        const bottom = Math.min(block.bottom, maxBottom);
        xml += block.kind === "table" ? this.table(block) : this.columns(block, bottom - block.top);
      }
      afterTable = block.kind === "table" || block.kind === "columns";
      cursor = Math.max(cursor, block.bottom);
    }
    if (inCell && (afterTable || !xml)) xml += tiny();
    return xml;
  }

  page(page: PageLayout, last: boolean): string {
    const { margin } = page;
    const free = Math.max(0, margin.bottom);
    // Moitié de l'espace libre du bas gardée en réserve : si une police de remplacement, un peu plus large,
    // ajoute une ligne à un paragraphe, la page ne déborde pas sur la suivante.
    const bottom = free < 8 ? 0 : free * 0.5;
    const section =
      `<w:sectPr><w:pgSz w:w="${tw(page.width)}" w:h="${tw(page.height)}"${page.width > page.height ? ` w:orient="landscape"` : ""}/>` +
      `<w:pgMar w:top="${tw(margin.top)}" w:right="${tw(margin.right)}" w:bottom="${tw(bottom)}" w:left="${tw(margin.left)}" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>`;

    const behind = page.blocks.filter((b): b is Picture => b.kind === "image" && b.behind);
    const blocks = page.blocks.filter((b) => !(b.kind === "image" && b.behind));
    let xml = behind.length ? this.background(behind) : "";
    const whole = blocks.length === 1 && blocks[0].kind === "image" && blocks[0].bottom - blocks[0].top > page.height * 0.9 ? blocks[0] : null;
    if (whole) {
      // Page gardée en image : très légèrement réduite pour laisser la place au paragraphe de fin de page
      const scale = Math.min(1, (page.height - margin.top - 6) / (whole.bottom - whole.top));
      xml += this.picture({ ...whole, left: whole.left + (whole.width * (1 - scale)) / 2 }, 0, scale);
    } else xml += this.flow(blocks, margin.top, false, page.height - bottom - 1.5, Math.max(0, margin.right - 12));
    return last ? `${xml}${tiny()}${section}` : `${xml}${tiny(1, section)}`;
  }
}

const CONTENT_TYPES =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
  `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>` +
  `<Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/>` +
  `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
  `<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>` +
  `<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/></Types>`;

const ROOT_RELS =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  `<Relationship Id="rId1" Type="${R}/officeDocument" Target="word/document.xml"/></Relationships>`;

/**
 * `kerning` : rapprochement des paires de lettres (« AV », « To »). Presque tous les logiciels l'appliquent
 * en créant un PDF, sauf Word : on l'active pour que les lignes gardent la même largeur que dans le PDF.
 */
const styles = (kerning: boolean) =>
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="${W}"><w:docDefaults>` +
  `<w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/>${kerning ? `<w:kern w:val="2"/>` : ""}<w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:rPrDefault>` +
  `<w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>` +
  `<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style></w:styles>`;

// Mode de compatibilité 15 : Word ouvre le document normalement, sans le bandeau « Mode de compatibilité »
const SETTINGS =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="${W}"><w:defaultTabStop w:val="720"/>` +
  `<w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>`;

/** PDF → DOCX modifiable. Les pages sans texte (scans) sont gardées en image. */
export async function pdfToDocx(file: FileData): Promise<FileData> {
  const { m, doc } = await open(file);
  try {
    assertPageLimit(doc.countPages());
    const store = imageStore();
    const pages = await readLayout(m, doc, store);
    const writer = new Writer(store.nameOf);
    const body = pages.map((page, i) => writer.page(page, i === pages.length - 1)).join("");

    const zip = new JSZip();
    zip.file("[Content_Types].xml", CONTENT_TYPES);
    zip.file("_rels/.rels", ROOT_RELS);
    zip.file("word/document.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NAMESPACES}><w:body>${body}</w:body></w:document>`);
    const fromWord = /microsoft.{0,4}word/i.test(`${doc.getMetaData("info:Producer") ?? ""} ${doc.getMetaData("info:Creator") ?? ""}`);
    zip.file("word/styles.xml", styles(!fromWord));
    zip.file("word/settings.xml", SETTINGS);
    zip.file("word/_rels/document.xml.rels", writer.relationships());
    for (const image of store.files) zip.file(`word/media/${image.name}`, image.data);
    const data = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });
    return { name: `${baseName(file.name)}.docx`, data };
  } finally {
    doc.destroy();
  }
}
