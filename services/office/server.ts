/**
 * Service de conversion bureautique de pdff (LibreOffice headless).
 * Déployé sur Google Cloud Run, appelé par `src/lib/server/engines/office.ts`.
 *
 * POST /convert   corps = fichier brut
 *   Authorization: Bearer <OFFICE_TOKEN>
 *   X-Filename       nom d'origine (encodé URI)
 *   X-Target         extension de sortie (pdf, docx…)
 *   X-Filter         filtre d'export LibreOffice (encodé URI)
 *   X-Import-Filter  filtre d'import (facultatif)
 * GET /health      → "ok"
 *
 * Aucun fichier n'est conservé : dossier de travail supprimé après chaque conversion.
 * Node.js 24 exécute ce fichier TypeScript directement (sans compilation).
 */
import { spawn } from "node:child_process";
import { timingSafeEqual } from "node:crypto";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const PORT = Number(process.env.PORT ?? 8080);
const TOKEN = process.env.OFFICE_TOKEN ?? "";
const SOFFICE = process.env.SOFFICE_PATH ?? "soffice";
const TIMEOUT_MS = 4.5 * 60 * 1000;
const MAX_BYTES = 32 * 1024 * 1024;

if (!TOKEN) {
  console.error("OFFICE_TOKEN manquant : le service refuse de démarrer sans protection.");
  process.exit(1);
}

const SAFE_EXT = /^[a-z0-9]{1,8}$/;
const SAFE_IMPORT = /^[A-Za-z0-9_]{1,64}$/;
const FORBIDDEN = /[<>:"/\\|?*\x00-\x1f]/g;

function authorized(req: IncomingMessage): boolean {
  const given = Buffer.from(req.headers.authorization ?? "");
  const expected = Buffer.from(`Bearer ${TOKEN}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

function send(res: ServerResponse, status: number, body: string) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" }).end(body);
}

async function readBody(req: IncomingMessage): Promise<Buffer | null> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BYTES) return null;
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/** Une conversion à la fois par instance (Cloud Run en lance d'autres si besoin). */
let queue: Promise<unknown> = Promise.resolve();
function serialize<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

function soffice(args: string[]): Promise<{ timedOut: boolean; output: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(SOFFICE, args);
    let output = "";
    child.stdout.on("data", (d) => (output += d));
    child.stderr.on("data", (d) => (output += d));
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve({ timedOut: true, output });
    }, TIMEOUT_MS);
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", () => {
      clearTimeout(timer);
      resolve({ timedOut: false, output });
    });
  });
}

const PROFILE = pathToFileURL(path.join(tmpdir(), "pdff-lo-profile")).href;

async function convert(req: IncomingMessage, res: ServerResponse) {
  if (!authorized(req)) return send(res, 401, "unauthorized");

  const target = String(req.headers["x-target"] ?? "");
  const filter = decodeURIComponent(String(req.headers["x-filter"] ?? ""));
  const importFilter = req.headers["x-import-filter"] ? String(req.headers["x-import-filter"]) : "";
  const filename = decodeURIComponent(String(req.headers["x-filename"] ?? "document"));
  if (!SAFE_EXT.test(target) || !filter || filter.length > 500 || (importFilter && !SAFE_IMPORT.test(importFilter))) {
    return send(res, 400, "bad request");
  }

  const body = await readBody(req);
  if (!body) return send(res, 413, "too large");

  const dot = filename.lastIndexOf(".");
  const ext = dot > 0 ? filename.slice(dot + 1).toLowerCase() : "";
  if (!SAFE_EXT.test(ext)) return send(res, 400, "bad extension");
  const base = (dot > 0 ? filename.slice(0, dot) : filename).replace(FORBIDDEN, "_").slice(0, 120) || "document";

  await serialize(async () => {
    const work = await mkdtemp(path.join(tmpdir(), "job-"));
    try {
      const inDir = path.join(work, "in");
      const outDir = path.join(work, "out");
      await Promise.all([mkdir(inDir), mkdir(outDir)]);
      const input = path.join(inDir, `${base}.${ext}`);
      await writeFile(input, body);

      const started = Date.now();
      const { timedOut, output } = await soffice([
        "--headless",
        "--norestore",
        "--nolockcheck",
        "--nodefault",
        "--nofirststartwizard",
        `-env:UserInstallation=${PROFILE}`,
        ...(importFilter ? [`--infilter=${importFilter}`] : []),
        "--convert-to",
        filter,
        "--outdir",
        outDir,
        input,
      ]);
      if (timedOut) return send(res, 504, "timeout");

      const produced = (await readdir(outDir)).find((f) => f.toLowerCase().endsWith(`.${target}`));
      if (!produced) {
        console.error(`échec ${ext} → ${target} :`, output.slice(0, 2000));
        return send(res, 422, "conversion failed");
      }
      const data = await readFile(path.join(outDir, produced));
      console.log(`${ext} → ${target} : ${body.length} → ${data.length} octets en ${Date.now() - started} ms`);
      res.writeHead(200, { "Content-Type": "application/octet-stream", "Content-Length": data.length }).end(data);
    } finally {
      await rm(work, { recursive: true, force: true }).catch(() => undefined);
    }
  });
}

createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") return send(res, 200, "ok");
  if (req.method === "POST" && req.url === "/convert") {
    convert(req, res).catch((err) => {
      console.error(err);
      if (!res.headersSent) send(res, 500, "error");
    });
    return;
  }
  send(res, 404, "not found");
}).listen(PORT, () => console.log(`Service Office pdff prêt sur le port ${PORT}`));
