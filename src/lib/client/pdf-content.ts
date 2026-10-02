/**
 * Lecture d'un PDF dans le navigateur (pdf.js) : champs de formulaire et texte des pages.
 * Rien n'est envoyé au serveur.
 */
import { loadPdfJs } from "./thumbnails";

export type FieldKind = "text" | "checkbox" | "radio" | "select" | "list";

/** Emplacement d'un champ sur sa page, en fractions de la page affichée (0 à 1). */
export interface FieldWidget {
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Hauteur de la page divisée par sa largeur. */
  aspect: number;
  /** Valeur exportée par cette case (boutons radio). */
  exportValue?: string;
}

export interface FormField {
  name: string;
  kind: FieldKind;
  /** Valeur actuelle : texte, case cochée, choix ou liste de choix. */
  value: string | boolean | string[];
  options: { value: string; label: string }[];
  multiline: boolean;
  readOnly: boolean;
  widgets: FieldWidget[];
}

type RawField = {
  type?: string;
  value?: unknown;
  exportValues?: string;
  items?: { exportValue: string; displayValue: string }[];
  multiline?: boolean;
  editable?: boolean;
  page?: number;
  rect?: number[];
  multipleSelection?: boolean;
};

async function openPdf(file: Blob) {
  const pdfjs = await loadPdfJs();
  const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  return { task, doc: await task.promise };
}

/** Tous les champs remplissables d'un formulaire PDF, dans l'ordre des pages. */
export async function readFormFields(file: Blob): Promise<FormField[]> {
  const { task, doc } = await openPdf(file);
  try {
    const raw = await doc.getFieldObjects();
    if (!raw) return [];
    const entries: [string, RawField[]][] = raw instanceof Map ? [...raw.entries()] : Object.entries(raw as Record<string, RawField[]>);
    const views = new Map<number, number[]>();
    const viewOf = async (index: number) => {
      if (!views.has(index)) views.set(index, (await doc.getPage(index + 1)).view);
      return views.get(index)!;
    };
    const fields: FormField[] = [];
    for (const [name, all] of entries) {
      // pdf.js place d'abord le champ « parent » (sans type ni page) : seuls ses emplacements comptent
      const widgets = all.filter((w) => w.type && (w.page ?? -1) >= 0);
      const first = widgets[0] ?? {};
      const kind: FieldKind | null =
        first.type === "text" ? "text"
        : first.type === "checkbox" ? "checkbox"
        : first.type === "radiobutton" ? "radio"
        : first.type === "combobox" ? "select"
        : first.type === "listbox" ? (first.multipleSelection ? "list" : "select")
        : null;
      if (!kind) continue;
      const placed: FieldWidget[] = [];
      for (const w of widgets) {
        if (w.page === undefined || !w.rect) continue;
        const [vx0, vy0, vx1, vy1] = await viewOf(w.page);
        const width = vx1 - vx0, height = vy1 - vy0;
        const [x1, y1, x2, y2] = w.rect;
        placed.push({
          page: w.page,
          x: (Math.min(x1, x2) - vx0) / width,
          y: (vy1 - Math.max(y1, y2)) / height,
          w: Math.abs(x2 - x1) / width,
          h: Math.abs(y2 - y1) / height,
          aspect: height / width,
          exportValue: w.exportValues,
        });
      }
      const current = widgets.find((w) => w.value !== undefined)?.value;
      const options =
        kind === "radio"
          ? widgets.filter((w) => w.exportValues).map((w) => ({ value: w.exportValues!, label: w.exportValues! }))
          : (first.items ?? []).map((i) => ({ value: i.displayValue ?? i.exportValue, label: i.displayValue ?? i.exportValue }));
      fields.push({
        name,
        kind,
        value:
          kind === "checkbox" ? current !== undefined && current !== "Off" && current !== false
          : kind === "list" ? (Array.isArray(current) ? current.map(String) : current ? [String(current)] : [])
          : current === undefined || current === "Off" ? "" : String(current),
        options,
        multiline: !!first.multiline,
        readOnly: first.editable === false,
        widgets: placed,
      });
    }
    return fields.sort((a, b) => (a.widgets[0]?.page ?? 0) - (b.widgets[0]?.page ?? 0) || (a.widgets[0]?.y ?? 0) - (b.widgets[0]?.y ?? 0));
  } finally {
    void task.destroy();
  }
}

/** Texte de chaque page d'un PDF. */
export async function readPagesText(file: Blob): Promise<string[]> {
  const { task, doc } = await openPdf(file);
  try {
    const pages: string[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      let text = "";
      for (const item of content.items) {
        if (!("str" in item)) continue;
        text += item.str + (item.hasEOL ? "\n" : "");
      }
      pages.push(text);
      page.cleanup();
    }
    return pages;
  } finally {
    void task.destroy();
  }
}

/** Un nom de champ technique rendu lisible (« adresse_postale.ligne1 » → « adresse postale ligne1 »). */
export function fieldLabel(name: string): string {
  const last = name.replace(/\[\d+\]/g, "").split(".").filter(Boolean).slice(-2).join(" ");
  return last.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim() || name;
}
