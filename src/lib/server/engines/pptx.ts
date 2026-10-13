/**
 * PDF → PowerPoint (PPTX) : une diapositive par page, à la taille de la page.
 * La mise en page lue par `pdf-layout.ts` est posée sur la diapositive : chaque paragraphe dans sa zone de texte,
 * chaque tableau en vrai tableau PowerPoint, chaque image à sa place. Les zones de texte sont un peu plus larges
 * que le texte d'origine : avec une police de remplacement, aucun mot ne passe à la ligne par erreur.
 */
import JSZip from "jszip";
import { baseName } from "@/lib/core/formats";
import type { FileData } from "../types";
import { assertPageLimit, open } from "./mupdf";
import { type Block, type Cell, imageStore, type PageLayout, type Paragraph, type Picture, readLayout, type Run, type Table } from "./pdf-layout";

const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const NS =
  `xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="${R}" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"`;
const XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`;

function esc(text: string): string {
  return text
    .replace(/[^\x09\x0A\x0D\x20-퟿-�\u{10000}-\u{10FFFF}]/gu, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface Frame {
  x: number;
  width: number;
}

/** Écrit une diapositive. `scale` ramène une page d'un autre format à la taille des diapositives. */
class Slide {
  private shapes: string[] = [];
  private relations: string[] = [`<Relationship Id="rId1" Type="${R}/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>`];
  private ids = new Map<string, string>();
  private nextId = 2;

  constructor(
    private imageName: (data: Uint8Array) => string,
    private scale: number,
    private dx: number,
    private dy: number,
  ) {}

  /** Points → EMU, mise à l'échelle comprise. */
  private emu = (pt: number) => Math.round(pt * this.scale * 12700);
  private X = (pt: number) => this.emu(pt) + Math.round(this.dx * 12700);
  private Y = (pt: number) => this.emu(pt) + Math.round(this.dy * 12700);

  private relation(key: string, xml: (id: string) => string): string {
    let id = this.ids.get(key);
    if (!id) {
      id = `rId${this.ids.size + 2}`;
      this.ids.set(key, id);
      this.relations.push(xml(id));
    }
    return id;
  }

  private run(run: Run): string {
    if (run.text === "\n") return "<a:br/>";
    const font = esc(run.font);
    const link = run.link ? this.relation(`link:${run.link}`, (id) => `<Relationship Id="${id}" Type="${R}/hyperlink" Target="${esc(run.link)}" TargetMode="External"/>`) : "";
    const props =
      `<a:rPr lang="fr-FR" sz="${Math.max(100, Math.round(run.size * this.scale * 100))}" b="${run.bold ? 1 : 0}" i="${run.italic ? 1 : 0}"${run.underline ? ` u="sng"` : ""}` +
      `${run.script ? ` baseline="${run.script > 0 ? 30000 : -25000}"` : ""} dirty="0">` +
      `<a:solidFill><a:srgbClr val="${run.color}"/></a:solidFill>` +
      (run.highlight ? `<a:highlight><a:srgbClr val="${run.highlight}"/></a:highlight>` : "") +
      `<a:latin typeface="${font}"/><a:ea typeface="${font}"/><a:cs typeface="${font}"/>` +
      (link ? `<a:hlinkClick r:id="${link}"/>` : "") +
      `</a:rPr>`;
    return `<a:r>${props}<a:t>${esc(run.text)}</a:t></a:r>`;
  }

  /** Paragraphe d'une zone de texte ou d'une cellule. `origin` : retrait déjà pris en compte par la zone. */
  private paragraph(p: Paragraph, origin: number, before = 0): string {
    const left = Math.max(0, p.left - origin);
    const align = p.align === "both" ? "just" : p.align === "center" ? "ctr" : p.align === "right" ? "r" : "l";
    const tabs = p.tabs.map((t) => `<a:tab pos="${this.emu(Math.max(0, t.pos - origin))}" algn="${t.kind === "right" ? "r" : "l"}"/>`).join("");
    const props =
      `<a:pPr marL="${this.emu(left)}" indent="${this.emu(p.first)}" algn="${align}"${p.rtl ? ` rtl="1"` : ""}>` +
      `<a:lnSpc><a:spcPts val="${Math.max(100, Math.round(p.line * this.scale * 100))}"/></a:lnSpc>` +
      `<a:spcBef><a:spcPts val="${Math.max(0, Math.round(before * this.scale * 100))}"/></a:spcBef><a:spcAft><a:spcPts val="0"/></a:spcAft>` +
      `<a:buNone/>${tabs ? `<a:tabLst>${tabs}</a:tabLst>` : ""}</a:pPr>`;
    // Les retours à la ligne voulus deviennent des sauts de ligne ; le reste du texte se suit
    const runs = p.runs.flatMap((run) =>
      run.text
        .split(/(\n)/)
        .filter(Boolean)
        .map((text) => this.run({ ...run, text })),
    );
    return `<a:p>${props}${runs.join("")}</a:p>`;
  }

  private textBox(p: Paragraph, frame: Frame) {
    const single = p.lines <= 1;
    // Place laissée au texte : jusqu'à un tiers de plus pour une ligne seule, du côté où elle peut s'étendre
    let x0 = frame.x + (p.align === "left" || p.align === "both" ? p.left + Math.min(0, p.first) : 0);
    let x1 = frame.x + frame.width - p.right;
    if (p.align === "center" || p.align === "right") x0 = frame.x + p.left;
    const slack = single ? Math.max(12, (x1 - x0) * 0.3) : 3;
    if (p.align === "right") x0 -= slack;
    else if (p.align === "center") {
      x0 -= slack / 2;
      x1 += slack / 2;
    } else x1 += slack;
    const origin = p.align === "left" || p.align === "both" ? p.left + Math.min(0, p.first) : p.left;
    const id = this.nextId++;
    this.shapes.push(
      `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Texte ${id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>` +
        `<p:spPr><a:xfrm><a:off x="${this.X(x0)}" y="${this.Y(p.top)}"/><a:ext cx="${this.emu(Math.max(1, x1 - x0))}" cy="${this.emu(Math.max(1, p.bottom - p.top))}"/></a:xfrm>` +
        `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>${p.shade ? `<a:solidFill><a:srgbClr val="${p.shade}"/></a:solidFill>` : "<a:noFill/>"}</p:spPr>` +
        `<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" anchor="t" rtlCol="0"><a:noAutofit/></a:bodyPr><a:lstStyle/>${this.paragraph(p, origin)}</p:txBody></p:sp>`,
    );
  }

  private rect(x: number, y: number, w: number, h: number, color: string) {
    const id = this.nextId++;
    this.shapes.push(
      `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Fond ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>` +
        `<p:spPr><a:xfrm><a:off x="${this.X(x)}" y="${this.Y(y)}"/><a:ext cx="${this.emu(Math.max(0.2, w))}" cy="${this.emu(Math.max(0.2, h))}"/></a:xfrm>` +
        `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr></p:sp>`,
    );
  }

  private picture(picture: Picture, x: number) {
    const name = this.imageName(picture.data);
    const rel = this.relation(`image:${name}`, (id) => `<Relationship Id="${id}" Type="${R}/image" Target="../media/${name}"/>`);
    const id = this.nextId++;
    this.shapes.push(
      `<p:pic><p:nvPicPr><p:cNvPr id="${id}" name="Image ${id}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>` +
        `<p:blipFill><a:blip r:embed="${rel}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>` +
        `<p:spPr><a:xfrm><a:off x="${this.X(x)}" y="${this.Y(picture.top)}"/><a:ext cx="${this.emu(Math.max(1, picture.width))}" cy="${this.emu(Math.max(1, picture.bottom - picture.top))}"/></a:xfrm>` +
        `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>`,
    );
  }

  private table(table: Table, x: number) {
    const width = table.widths.reduce((s, w) => s + w, 0);
    const line = (side: string, on: boolean) =>
      on
        ? `<a:${side} w="${Math.max(3175, this.emu(table.border.width))}"><a:solidFill><a:srgbClr val="${table.border.color}"/></a:solidFill></a:${side}>`
        : `<a:${side} w="0"><a:noFill/></a:${side}>`;
    const cellXml = (cell: Cell, r: number, col: number) => {
      // Fusion verticale : nombre de lignes couvertes par la cellule de départ
      let rowSpan = 1;
      if (cell.merge === "start") {
        for (let k = r + 1; k < table.rows.length; k++) {
          let c = 0;
          const below = table.rows[k].cells.find((other) => {
            const at = c;
            c += other.span;
            return at === col;
          });
          if (below?.merge === "continue") rowSpan++;
          else break;
        }
      }
      const paragraphs = cell.blocks.filter((b): b is Paragraph => b.kind === "p");
      let cursor = paragraphs[0]?.top ?? cell.top;
      const body = paragraphs.length
        ? paragraphs
            .map((p) => {
              const xml = this.paragraph(p, 0, Math.max(0, p.top - cursor));
              cursor = p.bottom;
              return xml;
            })
            .join("")
        : `<a:p><a:endParaRPr lang="fr-FR" sz="100"/></a:p>`;
      const top = Math.max(0, (paragraphs[0]?.top ?? cell.top) - cell.top);
      const attrs = `${cell.span > 1 ? ` gridSpan="${cell.span}"` : ""}${rowSpan > 1 ? ` rowSpan="${rowSpan}"` : ""}${cell.merge === "continue" ? ` vMerge="1"` : ""}`;
      const props =
        `<a:tcPr marL="${this.emu(table.pad)}" marR="${this.emu(table.pad)}" marT="${this.emu(top)}" marB="0" anchor="t">` +
        `${line("lnL", cell.borders.left)}${line("lnR", cell.borders.right)}${line("lnT", cell.borders.top)}${line("lnB", cell.borders.bottom)}` +
        `${cell.shade ? `<a:solidFill><a:srgbClr val="${cell.shade}"/></a:solidFill>` : "<a:noFill/>"}</a:tcPr>`;
      const filler = Array.from({ length: cell.span - 1 }, () => `<a:tc hMerge="1"${cell.merge === "continue" ? ` vMerge="1"` : ""}><a:txBody><a:bodyPr/><a:lstStyle/><a:p/></a:txBody><a:tcPr/></a:tc>`).join("");
      return `<a:tc${attrs}><a:txBody><a:bodyPr/><a:lstStyle/>${body}</a:txBody>${props}</a:tc>${filler}`;
    };
    const rows = table.rows
      .map((row, r) => {
        let col = 0;
        const cells = row.cells
          .map((cell) => {
            const xml = cellXml(cell, r, col);
            col += cell.span;
            return xml;
          })
          .join("");
        return `<a:tr h="${this.emu(Math.max(1, row.height))}">${cells}</a:tr>`;
      })
      .join("");
    const id = this.nextId++;
    this.shapes.push(
      `<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="${id}" name="Tableau ${id}"/><p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr><p:nvPr/></p:nvGraphicFramePr>` +
        `<p:xfrm><a:off x="${this.X(x)}" y="${this.Y(table.top)}"/><a:ext cx="${this.emu(width)}" cy="${this.emu(table.bottom - table.top)}"/></p:xfrm>` +
        `<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table"><a:tbl><a:tblPr/>` +
        `<a:tblGrid>${table.widths.map((w) => `<a:gridCol w="${this.emu(w)}"/>`).join("")}</a:tblGrid>${rows}</a:tbl></a:graphicData></a:graphic></p:graphicFrame>`,
    );
    // Images posées dans des cellules : placées par-dessus le tableau
    for (const row of table.rows) {
      let col = 0;
      for (const cell of row.cells) {
        const cellX = x + table.widths.slice(0, col).reduce((s, w) => s + w, 0);
        for (const b of cell.blocks) if (b.kind === "image") this.picture(b, cellX + table.pad + b.left);
        col += cell.span;
      }
    }
  }

  place(blocks: Block[], frame: Frame) {
    for (const block of blocks) {
      if (block.kind === "p") this.textBox(block, frame);
      else if (block.kind === "image") this.picture(block, block.behind ? block.left : frame.x + block.left);
      else if (block.kind === "rule") this.rect(frame.x + block.left, block.top + 1, frame.width - block.left - block.right, Math.max(0.5, block.thickness), block.color);
      else if (block.kind === "table") this.table(block, frame.x + block.left);
      else {
        let x = frame.x + block.left;
        for (const col of block.cols) {
          if (col.shade) this.rect(x, block.top, col.width, block.bottom - block.top, col.shade);
          x += col.width;
        }
        x = frame.x + block.left;
        for (const col of block.cols) {
          this.place(col.blocks, { x, width: col.width });
          x += col.width;
        }
      }
    }
  }

  xml(): string {
    return (
      `${XML}<p:sld ${NS}><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
      `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
      `${this.shapes.join("")}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`
    );
  }

  rels(): string {
    return `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${this.relations.join("")}</Relationships>`;
  }
}

const EMPTY_TREE =
  `<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
  `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>`;

const MASTER =
  `${XML}<p:sldMaster ${NS}>${EMPTY_TREE}` +
  `<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>` +
  `<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>`;

const LAYOUT = `${XML}<p:sldLayout ${NS} type="blank" preserve="1"><p:cSld name="Vide">${EMPTY_TREE.slice("<p:cSld>".length)}<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;

const FILL = `<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>`;
const LINE = `<a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>`;
const EFFECT = `<a:effectStyle><a:effectLst/></a:effectStyle>`;
const THEME =
  `${XML}<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="pdffusion"><a:themeElements>` +
  `<a:clrScheme name="pdffusion"><a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="17143A"/></a:dk2><a:lt2><a:srgbClr val="F3F2FB"/></a:lt2>` +
  `<a:accent1><a:srgbClr val="6D5CFF"/></a:accent1><a:accent2><a:srgbClr val="2B6CF0"/></a:accent2><a:accent3><a:srgbClr val="1D9E5A"/></a:accent3><a:accent4><a:srgbClr val="F0662B"/></a:accent4>` +
  `<a:accent5><a:srgbClr val="E5322D"/></a:accent5><a:accent6><a:srgbClr val="64748B"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme>` +
  `<a:fontScheme name="pdffusion"><a:majorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Arial"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>` +
  `<a:fmtScheme name="pdffusion"><a:fillStyleLst>${FILL}${FILL}${FILL}</a:fillStyleLst><a:lnStyleLst>${LINE}${LINE}${LINE}</a:lnStyleLst>` +
  `<a:effectStyleLst>${EFFECT}${EFFECT}${EFFECT}</a:effectStyleLst><a:bgFillStyleLst>${FILL}${FILL}${FILL}</a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>`;

const rels = (items: string) => `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${items}</Relationships>`;

/** Taille d'une diapositive acceptée par PowerPoint : de 1 à 56 pouces. */
const clampSide = (pt: number) => Math.min(4032, Math.max(72, pt));

/** PDF → PPTX modifiable. Les pages sans texte (scans) sont gardées en image. */
export async function pdfToPptx(file: FileData): Promise<FileData> {
  const { m, doc } = await open(file);
  try {
    assertPageLimit(doc.countPages());
    const store = imageStore();
    const pages: PageLayout[] = await readLayout(m, doc, store);
    const width = clampSide(pages[0]?.width ?? 960);
    const height = clampSide(pages[0]?.height ?? 540);

    const zip = new JSZip();
    pages.forEach((page, i) => {
      // Page d'un autre format que la première : réduite pour tenir dans la diapositive, et centrée
      const scale = Math.min(width / page.width, height / page.height);
      const slide = new Slide(store.nameOf, scale, (width - page.width * scale) / 2, (height - page.height * scale) / 2);
      const behind = page.blocks.filter((b) => b.kind === "image" && b.behind);
      slide.place(behind, { x: 0, width: page.width });
      slide.place(page.blocks.filter((b) => !(b.kind === "image" && b.behind)), { x: page.margin.left, width: page.width - page.margin.left - page.margin.right });
      zip.file(`ppt/slides/slide${i + 1}.xml`, slide.xml());
      zip.file(`ppt/slides/_rels/slide${i + 1}.xml.rels`, slide.rels());
    });

    zip.file(
      "[Content_Types].xml",
      `${XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
        `<Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/>` +
        `<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>` +
        `<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>` +
        `<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>` +
        `<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>` +
        pages.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join("") +
        `</Types>`,
    );
    zip.file("_rels/.rels", rels(`<Relationship Id="rId1" Type="${R}/officeDocument" Target="ppt/presentation.xml"/>`));
    zip.file(
      "ppt/presentation.xml",
      `${XML}<p:presentation ${NS}><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>` +
        `<p:sldIdLst>${pages.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 3}"/>`).join("")}</p:sldIdLst>` +
        `<p:sldSz cx="${Math.round(width * 12700)}" cy="${Math.round(height * 12700)}"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`,
    );
    zip.file(
      "ppt/_rels/presentation.xml.rels",
      rels(
        `<Relationship Id="rId1" Type="${R}/slideMaster" Target="slideMasters/slideMaster1.xml"/><Relationship Id="rId2" Type="${R}/theme" Target="theme/theme1.xml"/>` +
          pages.map((_, i) => `<Relationship Id="rId${i + 3}" Type="${R}/slide" Target="slides/slide${i + 1}.xml"/>`).join(""),
      ),
    );
    zip.file("ppt/slideMasters/slideMaster1.xml", MASTER);
    zip.file("ppt/slideMasters/_rels/slideMaster1.xml.rels", rels(`<Relationship Id="rId1" Type="${R}/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="${R}/theme" Target="../theme/theme1.xml"/>`));
    zip.file("ppt/slideLayouts/slideLayout1.xml", LAYOUT);
    zip.file("ppt/slideLayouts/_rels/slideLayout1.xml.rels", rels(`<Relationship Id="rId1" Type="${R}/slideMaster" Target="../slideMasters/slideMaster1.xml"/>`));
    zip.file("ppt/theme/theme1.xml", THEME);
    for (const image of store.files) zip.file(`ppt/media/${image.name}`, image.data);
    const data = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });
    return { name: `${baseName(file.name)}.pptx`, data };
  } finally {
    doc.destroy();
  }
}
