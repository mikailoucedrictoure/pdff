/**
 * Route /api/tools/[tool] appelée directement (comme le fait Vercel), et règles de sécurité du stockage.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { isPdf, makePdf, pageCount } from "./helpers";

async function call(tool: string, init: RequestInit) {
  const { POST } = await import("@/app/api/tools/[tool]/route");
  return POST(new Request(`http://localhost/api/tools/${tool}?lang=fr`, { method: "POST", ...init }), { params: Promise.resolve({ tool }) });
}

describe("API des outils", () => {
  it("fusionne deux PDF envoyés dans la requête", async () => {
    const form = new FormData();
    for (const f of [await makePdf("a.pdf", ["A"]), await makePdf("b.pdf", ["B"])]) form.append("files", new Blob([f.data as BlobPart]), f.name);
    form.append("options", JSON.stringify({ bookmarks: true }));
    const res = await call("fusionner", { body: form });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/pdf");
    const out = { name: "r.pdf", data: new Uint8Array(await res.arrayBuffer()) };
    expect(isPdf(out)).toBe(true);
    expect(await pageCount(out)).toBe(2);
  });

  it("renvoie un ZIP quand il y a plusieurs résultats", async () => {
    const form = new FormData();
    const f = await makePdf("doc.pdf", ["1", "2"]);
    form.append("files", new Blob([f.data as BlobPart]), f.name);
    form.append("options", JSON.stringify({ mode: "each" }));
    const res = await call("diviser", { body: form });
    expect(res.headers.get("content-type")).toBe("application/zip");
    expect(res.headers.get("x-pdff-count")).toBe("2");
  });

  it("erreurs traduites et codes HTTP corrects", async () => {
    const unknown = await call("inconnu", { body: new FormData() });
    expect(unknown.status).toBe(404);
    const empty = await call("fusionner", { body: new FormData() });
    expect(empty.status).toBe(400);
    expect((await empty.json()).error).toMatch(/fichier/i);
  });

  it("refuse les fichiers « Blob » qui ne viennent pas de notre stockage (protection SSRF)", async () => {
    const res = await call("convertir", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: [{ url: "http://169.254.169.254/in/x.png", name: "x.png" }], options: { target: "pdf" } }),
    });
    expect(res.status).toBe(400);
  });
});

describe("stockage temporaire", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("n'accepte que les adresses de notre magasin, dans in/ ou out/", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "vercel_blob_rw_AbC123_secret");
    const { isOwnTempBlob } = await import("@/lib/server/storage");
    expect(isOwnTempBlob("https://abc123.public.blob.vercel-storage.com/in/x-9f.pdf")).toBe(true);
    expect(isOwnTempBlob("https://abc123.public.blob.vercel-storage.com/out/y.pdf")).toBe(true);
    expect(isOwnTempBlob("https://abc123.public.blob.vercel-storage.com/i18n/fr.json")).toBe(false);
    expect(isOwnTempBlob("https://autre.public.blob.vercel-storage.com/in/x.pdf")).toBe(false);
    expect(isOwnTempBlob("http://abc123.public.blob.vercel-storage.com/in/x.pdf")).toBe(false);
    expect(isOwnTempBlob("pas une adresse")).toBe(false);
  });

  it("sans stockage configuré, rien n'est accepté", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
    const { blobEnabled, isOwnTempBlob } = await import("@/lib/server/storage");
    expect(blobEnabled()).toBe(false);
    expect(isOwnTempBlob("https://abc123.public.blob.vercel-storage.com/in/x.pdf")).toBe(false);
  });
});
