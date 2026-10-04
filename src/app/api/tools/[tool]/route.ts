import JSZip from "jszip";
import { limits } from "@/config/limits";
import { formatError, loadMessages, localeFromRequest } from "@/i18n/load";
import type { ErrorKey } from "@/i18n/messages/fr";
import { mimeOf, extOf } from "@/lib/core/formats";
import { getTool, type OptionValues, type ToolId } from "@/lib/core/tools";
import { BLOB_INPUT_PREFIX, type BlobFileRef, type BlobResult, DIRECT_TRANSFER_BYTES } from "@/lib/core/transfer";
import { runTool } from "@/lib/server/runners";
import { blobEnabled, deleteBlobs, fetchInputs, isOwnTempBlob, storeResult } from "@/lib/server/storage";
import { type FileData, UserError } from "@/lib/server/types";

export const maxDuration = 300;

type Fail = (key: ErrorKey, status?: number, values?: Record<string, string | number>, file?: string) => Response;

/** Fichier reçu : soit dans la requête, soit déposé dans Vercel Blob. */
interface Incoming {
  name: string;
  file?: File;
  blobUrl?: string;
}

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

export async function POST(request: Request, { params }: { params: Promise<{ tool: string }> }) {
  const { tool: toolId } = await params;
  const url = new URL(request.url);
  const { messages } = await loadMessages(localeFromRequest(request, url.searchParams.get("lang")));
  const fail: Fail = (key, status = 400, values = {}, file) => Response.json({ error: formatError(messages, key, values, file) }, { status });

  const tool = getTool(toolId);
  if (!tool) return fail("unknownTool", 404);

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > limits.maxUploadBytes) {
    return fail("tooLarge", 413, { mb: Math.round(limits.maxUploadBytes / 1024 / 1024) });
  }

  // Deux modes : fichiers dans la requête (multipart) ou déjà déposés dans Vercel Blob (JSON)
  let incoming: Incoming[];
  let options: unknown;
  if (request.headers.get("content-type")?.startsWith("application/json")) {
    const body = (await request.json().catch(() => null)) as { files?: BlobFileRef[]; options?: unknown } | null;
    if (!body || !Array.isArray(body.files)) return fail("badRequest");
    const valid = body.files.every((f) => typeof f?.name === "string" && typeof f?.url === "string" && isOwnTempBlob(f.url, [BLOB_INPUT_PREFIX]));
    if (!valid) return fail("badRequest");
    incoming = body.files.map((f) => ({ name: f.name, blobUrl: f.url }));
    options = body.options ?? {};
  } else {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return fail("badRequest");
    }
    incoming = form
      .getAll("files")
      .filter((v): v is File => v instanceof File)
      .map((file) => ({ name: file.name, file }));
    try {
      options = JSON.parse(String(form.get("options") ?? "{}"));
    } catch {
      return fail("badOptions");
    }
  }

  const blobInputs = incoming.flatMap((f) => (f.blobUrl ? [f.blobUrl] : []));
  try {
    if (incoming.length < tool.minFiles) return fail("noFiles");
    const maxFiles = Math.min(tool.maxFiles ?? Infinity, limits.maxFiles);
    if (incoming.length > maxFiles) return fail("tooManyFiles", 400, { max: maxFiles });
    if (!options || typeof options !== "object") return fail("badOptions");
    return await handle(tool.id, incoming, options as OptionValues, fail);
  } finally {
    // Les fichiers déposés ne servent qu'une fois
    if (blobInputs.length) await deleteBlobs(blobInputs);
  }
}

async function readFiles(incoming: Incoming[]): Promise<FileData[]> {
  const fromBlob = await fetchInputs(incoming.flatMap((f) => (f.blobUrl ? [{ name: f.name, url: f.blobUrl }] : [])));
  let next = 0;
  return Promise.all(incoming.map(async (f) => (f.file ? { name: f.name, data: new Uint8Array(await f.file.arrayBuffer()) } : fromBlob[next++])));
}

async function handle(toolId: ToolId, incoming: Incoming[], options: OptionValues, fail: Fail): Promise<Response> {
  let files: FileData[];
  try {
    files = await readFiles(incoming);
  } catch (err) {
    console.error("[pdffusion] lecture des fichiers :", err);
    return fail("badRequest");
  }

  const started = Date.now();
  try {
    const results = uniqueNames(await runTool(toolId, files, options));
    if (!results.length) return fail("noOutput");

    let output: FileData;
    if (results.length === 1) {
      output = results[0];
    } else {
      const zip = new JSZip();
      for (const r of results) zip.file(r.name, r.data);
      const archive = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 6 } });
      output = { name: `pdffusion-${toolId}.zip`, data: archive };
    }

    // Résultat trop gros pour une réponse Vercel : le navigateur le récupère dans Blob
    if (output.data.byteLength > DIRECT_TRANSFER_BYTES && blobEnabled()) {
      const stored = await storeResult(output);
      const body: BlobResult = { ...stored, name: output.name, size: output.data.byteLength, count: results.length };
      return Response.json(body, { headers: { "Cache-Control": "no-store", "X-Pdff-Duration": String(Date.now() - started) } });
    }

    const headers = new Headers({
      "X-Pdff-Count": String(results.length),
      "X-Pdff-Duration": String(Date.now() - started),
      "Cache-Control": "no-store",
      "Content-Type": results.length === 1 ? mimeOf(extOf(output.name)) : "application/zip",
      "Content-Disposition": contentDisposition(output.name),
    });
    return new Response(output.data as BodyInit, { headers });
  } catch (err) {
    if (err instanceof UserError) return fail(err.key, 422, err.params, err.file);
    console.error(`[pdffusion] ${toolId}:`, err);
    return fail("unexpected", 500);
  }
}
