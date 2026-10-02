/**
 * Outil Renommer : calcule les nouveaux noms de fichiers.
 * Partagé par le navigateur (qui renomme sans rien envoyer) et le serveur (appels directs de l'API).
 */

/** Caractères interdits dans un nom de fichier (Windows, macOS, Linux) et caractères de contrôle. */
const FORBIDDEN = /[<>:"/\\|?*\x00-\x1f]/g;

export function cleanFileName(name: string): string {
  return name.replace(FORBIDDEN, "-").replace(/\s+/g, " ").trim().replace(/^\.+/, "").slice(0, 180);
}

function split(fileName: string): { base: string; ext: string } {
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? { base: fileName.slice(0, dot), ext: fileName.slice(dot + 1) } : { base: fileName, ext: "" };
}

/**
 * Nouveaux noms : un nom choisi pour un seul fichier, ou « nom-1, nom-2… » pour plusieurs
 * (dans l'ordre de la liste). Vide = nom d'origine. L'extension peut être remplacée.
 */
export function renamedFiles(names: string[], newName: string, newExt: string): string[] {
  const chosen = cleanFileName(newName);
  const ext = cleanFileName(newExt).replace(/^\.+/, "").replace(/\s/g, "");
  const width = String(names.length).length;
  const out = names.map((original, i) => {
    const { base, ext: oldExt } = split(original);
    const finalBase = chosen ? (names.length > 1 ? `${chosen}-${String(i + 1).padStart(width, "0")}` : chosen) : base;
    const finalExt = ext || oldExt;
    return finalExt ? `${finalBase}.${finalExt}` : finalBase;
  });
  // Deux fichiers ne peuvent pas porter le même nom dans une archive
  const seen = new Map<string, number>();
  return out.map((n) => {
    const count = seen.get(n.toLowerCase()) ?? 0;
    seen.set(n.toLowerCase(), count + 1);
    if (!count) return n;
    const { base, ext } = split(n);
    return ext ? `${base} (${count + 1}).${ext}` : `${base} (${count + 1})`;
  });
}
