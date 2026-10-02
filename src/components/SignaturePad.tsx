"use client";

import { Caveat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import type { ClientMessages } from "@/i18n/client-messages";

// Écriture manuscrite pour la signature tapée au clavier, chargée seulement quand on l'utilise
const hand = Caveat({ subsets: ["latin", "latin-ext"], weight: "600", preload: false });

type WorkspaceText = ClientMessages["workspace"];
type Mode = "draw" | "type" | "upload";

const INK = "#1a2b6b";

/** Recadre une signature au plus près de l'encre, avec une petite marge, et la renvoie en PNG. */
function trimmedPng(source: HTMLCanvasElement): string {
  const ctx = source.getContext("2d")!;
  const { width, height } = source;
  const pixels = ctx.getImageData(0, 0, width, height).data;
  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (pixels[(y * width + x) * 4 + 3] > 16) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  if (x1 < 0) return "";
  const pad = 8;
  const w = x1 - x0 + 1 + pad * 2;
  const h = y1 - y0 + 1 + pad * 2;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  out.getContext("2d")!.drawImage(source, x0 - pad, y0 - pad, w, h, 0, 0, w, h);
  return out.toDataURL("image/png");
}

/** Signature dessinée, écrite ou importée ; la valeur est une image PNG (data URL), vide tant qu'il n'y a rien. */
export function SignaturePad({ label, value, onChange, w }: { label: string; value: string; onChange: (v: string) => void; w: WorkspaceText }) {
  const [mode, setMode] = useState<Mode>("draw");
  const [typed, setTyped] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<{ x: number; y: number } | null>(null);

  // Signature tapée : dessinée dans un canevas avec l'écriture manuscrite
  useEffect(() => {
    if (mode !== "type") return;
    let cancelled = false;
    (async () => {
      const text = typed.trim();
      if (!text) return onChange("");
      const family = hand.style.fontFamily;
      await document.fonts.load(`600 96px ${family}`).catch(() => undefined);
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = 1400;
      canvas.height = 260;
      const ctx = canvas.getContext("2d")!;
      ctx.font = `600 120px ${family}, cursive`;
      ctx.fillStyle = INK;
      ctx.textBaseline = "middle";
      ctx.fillText(text, 20, 130, 1360);
      onChange(trimmedPng(canvas));
    })();
    return () => {
      cancelled = true;
    };
    // onChange change à chaque rendu du parent : seule la saisie compte ici
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, mode]);

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * e.currentTarget.width, y: ((e.clientY - r.top) / r.height) * e.currentTarget.height };
  }
  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = point(e);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext("2d")!;
    const p = point(e);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(drawing.current.x, drawing.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    drawing.current = p;
  }
  function up() {
    if (!drawing.current) return;
    drawing.current = null;
    onChange(trimmedPng(canvasRef.current!));
  }
  function clear() {
    const c = canvasRef.current;
    c?.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setTyped("");
    onChange("");
  }

  async function upload(file: File) {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1200 / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    // Le fond clair d'une signature scannée devient transparent
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < img.data.length; i += 4) {
      if (img.data[i] > 225 && img.data[i + 1] > 225 && img.data[i + 2] > 225) img.data[i + 3] = 0;
    }
    ctx.putImageData(img, 0, 0);
    onChange(trimmedPng(canvas));
  }

  const tabs: [Mode, string][] = [
    ["draw", w.sigDraw],
    ["type", w.sigType],
    ["upload", w.sigUpload],
  ];

  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold">{label}</legend>
      <div className="mb-2 grid grid-cols-3 gap-1 rounded-xl bg-bg p-1">
        {tabs.map(([m, text]) => (
          <label key={m} className="cursor-pointer rounded-lg px-2 py-1.5 text-center text-xs font-semibold transition has-[:checked]:bg-surface has-[:checked]:shadow-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand has-[:focus-visible]:outline-solid">
            <input type="radio" name="sig-mode" value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
            {text}
          </label>
        ))}
      </div>

      {mode === "draw" && (
        <>
          <canvas
            ref={canvasRef}
            width={900}
            height={300}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            aria-label={w.sigDrawHint}
            className="aspect-[3/1] w-full touch-none rounded-xl border-2 border-dashed border-line bg-white"
          />
          <p className="mt-1 text-xs text-muted">{w.sigDrawHint}</p>
        </>
      )}
      {mode === "type" && (
        <>
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={w.sigTypePlaceholder}
            aria-label={w.sigTypePlaceholder}
            autoComplete="name"
            className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-base transition focus:border-brand focus:ring-4 focus:ring-brand/25"
          />
          {typed.trim() && (
            <p className={`${hand.className} mt-2 truncate rounded-xl bg-white px-3 py-1 text-4xl`} style={{ color: INK }} aria-hidden="true">
              {typed}
            </p>
          )}
        </>
      )}
      {mode === "upload" && (
        <label className="block cursor-pointer rounded-xl border-2 border-dashed border-line bg-bg px-3 py-4 text-center text-sm font-semibold hover:border-brand">
          {w.sigUpload}
          <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => e.target.files?.[0] && void upload(e.target.files[0])} />
          <span className="mt-1 block text-xs font-normal text-muted">{w.sigUploadHint}</span>
        </label>
      )}

      {value && mode !== "type" && (
        // eslint-disable-next-line @next/next/no-img-element -- signature créée dans le navigateur
        <img src={value} alt="" className="mt-2 max-h-20 rounded-lg bg-white p-1" />
      )}
      {value && (
        <button type="button" onClick={clear} className="mt-2 text-xs font-semibold text-muted underline hover:text-ink">
          {w.sigClear}
        </button>
      )}
    </fieldset>
  );
}
