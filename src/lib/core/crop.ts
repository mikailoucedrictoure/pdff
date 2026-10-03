/** Zone gardée par un recadrage centré aux proportions demandées (« 16:9 »…). Partagé navigateur / serveur. */
export function centeredCrop(w: number, h: number, ratio: string): { left: number; top: number; width: number; height: number } {
  const [a, b] = ratio.split(":").map(Number);
  const r = a > 0 && b > 0 ? a / b : 1;
  const width = w / h > r ? Math.round(h * r) : w;
  const height = w / h > r ? h : Math.round(w / r);
  return { left: Math.floor((w - width) / 2), top: Math.floor((h - height) / 2), width, height };
}

/** Taille finale d'une image redimensionnée (mêmes règles que le serveur). */
export function resizedSize(w: number, h: number, o: { mode: string; scale: string; width: number; height: number; ratio: string }): [number, number] {
  if (o.mode === "crop") {
    const c = centeredCrop(w, h, o.ratio);
    return [c.width, c.height];
  }
  if (o.scale === "custom") {
    const width = Math.max(1, Math.round(o.width) || w);
    if (o.height > 0) return [width, Math.round(o.height)];
    return [width, Math.max(1, Math.round((h * width) / w))];
  }
  const s = Math.min(1, Math.max(0.01, (Number(o.scale) || 50) / 100));
  return [Math.max(1, Math.round(w * s)), Math.max(1, Math.round(h * s))];
}
