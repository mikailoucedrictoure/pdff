import JSZip from "jszip";
import { limits } from "@/config/limits";
import { mimeOf, extOf } from "@/lib/core/formats";
import { getTool, type OptionValues } from "@/lib/core/tools";
import { runTool } from "@/lib/server/runners";
import { type FileData, UserError } from "@/lib/server/types";

export const maxDuration = 300;

function contentDisposition(name: string) {
  const ascii = name.normalize("NFD").replace(/[^\x20-\x7e]/g, "").replace(/["\\]/g, "_") || "fichier";
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`;
}

function uniqueNames(files: FileData[]): FileData[] {
  const seen = new Map<string, number>();
  return files.map((f) => {
    const count = seen.get(f.name) ?? 0;
    seen.set(f.name, count + 1);
    if (!count) return f;
    const dot = f.name.lastIndexOf(".");
    const name = dot > 0 ? `${f.name.slice(0, dot)} (${count + 1})${f.name.slice(dot)}` : `${f.name} (${count + 1})`;
    return { ...f, name };
  });
}

function fail(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request, { params }: { params: Promise<{ tool: string }> }) {
  const { tool: toolId } = await params;
  const tool = getTool(toolId);
  if (!tool) return fail("Outil inconnu.", 404);

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > limits.maxUploadBytes) {
    return fail(`Envoi trop volumineux (max. ${Math.round(limits.maxUploadBytes / 1024 / 1024)} Mo).`, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Requête invalide.");
  }

  const uploads = form.getAll("files").filter((v): v is File => v instanceof File);
  if (uploads.length < tool.minFiles) return fail("Ajoutez au moins un fichier.");
  const maxFiles = Math.min(tool.maxFiles ?? Infinity, limits.maxFiles);
  if (uploads.length > maxFiles) return fail(`Trop de fichiers : ${maxFiles} maximum pour cet outil.`);

  let options: OptionValues = {};
  try {
    options = JSON.parse(String(form.get("options") ?? "{}"));
  } catch {
    return fail("Options invalides.");
  }

  const files: FileData[] = await Promise.all(
    uploads.map(async (f) => ({ name: f.name, data: new Uint8Array(await f.arrayBuffer()) })),
  );

  const started = Date.now();
  try {
    const results = uniqueNames(await runTool(tool.id, files, options));
    if (!results.length) return fail("Aucun fichier produit.");

    const headers = new Headers({
      "X-Pdff-Count": String(results.length),
      "X-Pdff-Duration": String(Date.now() - started),
      "Cache-Control": "no-store",
    });

    if (results.length === 1) {
      const [r] = results;
      headers.set("Content-Type", mimeOf(extOf(r.name)));
      headers.set("Content-Disposition", contentDisposition(r.name));
      return new Response(r.data as BodyInit, { headers });
    }

    const zip = new JSZip();
    for (const r of results) zip.file(r.name, r.data);
    const archive = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });
    headers.set("Content-Type", "application/zip");
    headers.set("Content-Disposition", contentDisposition(`pdff-${tool.id}.zip`));
    return new Response(archive as BodyInit, { headers });
  } catch (err) {
    if (err instanceof UserError) return fail(err.message, 422);
    console.error(`[pdff] ${tool.id}:`, err);
    return fail("Une erreur inattendue est survenue pendant le traitement.", 500);
  }
}
