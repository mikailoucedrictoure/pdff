"use client";

import { useEffect, useRef } from "react";
import { FileGlyph } from "./FileGlyph";

/**
 * Anneau 3D interactif des formats.
 *
 * Petit moteur physique maison (une seule boucle requestAnimationFrame,
 * aucune re-render React) :
 * - survol : tout l'anneau s'incline et se tourne vers le pointeur ;
 * - glisser dans le vide : fait tourner l'anneau, avec inertie si on le lance ;
 * - attraper une icône : elle suit le pointeur puis revient à sa place en rebondissant ;
 * - clic sur une icône : salto ; clic sur la feuille centrale : explosion.
 * Chaque icône est rappelée vers la verticale par un ressort : elle se balance
 * quand elle bouge, mais reste presque toujours à l'endroit.
 */

interface Item {
  ext: string;
  ring: 0 | 1;
  slot: number; // angle de base (radians)
  phase: number; // décalage de flottement
}

const OUTER = ["pdf", "docx", "xlsx", "pptx", "jpg", "png", "odt", "epub", "csv", "html"];
const INNER = ["doc", "xls", "ppt", "webp", "txt", "tiff"];

const ITEMS: Item[] = [
  ...OUTER.map((ext, i) => ({ ext, ring: 0 as const, slot: (i / OUTER.length) * Math.PI * 2, phase: i * 0.7 })),
  ...INNER.map((ext, i) => ({ ext, ring: 1 as const, slot: (i / INNER.length) * Math.PI * 2 + 0.35, phase: i * 1.1 + 2 })),
];

// Réglages physiques
const BASE_SPIN = 0.18; // rad/s, rotation automatique
const PITCH = -0.42; // inclinaison de la caméra (~ -24°)
const FOCAL = 900;
const POS_K = 90; // raideur du retour en orbite
const POS_C = 9; // amortissement (faible = plus de rebond)
const ROT_K = 60; // raideur du retour à la verticale
const ROT_C = 7;
const SWAY = 0.045; // balancement dû à la vitesse horizontale

interface Body {
  dx: number; // écart à la position d'orbite (px)
  dy: number;
  vx: number;
  vy: number;
  rot: number; // degrés
  vrot: number;
  rotHome: number; // multiple de 360 visé (pour finir un salto proprement)
  scale: number;
  hover: boolean;
  sx: number; // position écran courante (pour le balancement)
  psx: number;
}

export function FormatOrbit() {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coreRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bodies: Body[] = ITEMS.map(() => ({
      dx: 0, dy: 0, vx: 0, vy: 0, rot: 0, vrot: 0, rotHome: 0, scale: 1, hover: false, sx: 0, psx: 0,
    }));

    // État global
    let width = root.clientWidth;
    let radius = 200;
    let card = 64;
    let angle = 0;
    let spin = reduced ? 0 : BASE_SPIN;
    let pitch = PITCH;
    let pitchTarget = PITCH;
    let yaw = 0;
    let yawTarget = 0;
    let shiftX = 0;
    let shiftTarget = 0;
    let coreKick = 0;

    // Interaction
    type Drag =
      | { kind: "item"; index: number; id: number; ox: number; oy: number; px: number; py: number; lastT: number; moved: number; startX: number; startY: number }
      | { kind: "ring"; id: number; lastX: number; lastT: number; vel: number };
    let drag: Drag | null = null;

    function layout() {
      width = root.clientWidth;
      radius = Math.min(Math.max(width * 0.4, 118), 270);
      card = Math.min(Math.max(width * 0.12, 44), 72);
      root.style.height = `${Math.round(radius * 1.05 + card * 2.4)}px`;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const w = ITEMS[i].ring === 0 ? card : card * 0.74;
        el.style.width = `${w}px`;
        el.style.marginLeft = `${-w / 2}px`;
        el.style.marginTop = `${-w * 0.625}px`;
      });
      if (coreRef.current) {
        const w = card * 1.9;
        coreRef.current.style.width = `${w}px`;
        coreRef.current.style.marginLeft = `${-w / 2}px`;
        coreRef.current.style.marginTop = `${-w * 0.68}px`;
      }
    }
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(root);

    function local(e: PointerEvent) {
      const r = root.getBoundingClientRect();
      return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2, w: r.width, h: r.height };
    }

    /** Position écran « d'orbite » d'une icône (sans l'écart physique). */
    function home(i: number, t: number) {
      const it = ITEMS[i];
      const r = it.ring === 0 ? radius : radius * 0.6;
      const a = it.ring === 0 ? it.slot + angle + yaw : it.slot - angle * 1.4 + yaw;
      const x = Math.sin(a) * r;
      const z = Math.cos(a) * r;
      const y = reduced ? 0 : Math.sin(t * 1.5 + it.phase) * 7 - (it.ring === 1 ? card * 0.15 : 0);
      // Inclinaison de la caméra (rotation autour de X)
      const y2 = y * Math.cos(pitch) - z * Math.sin(pitch);
      const z2 = y * Math.sin(pitch) + z * Math.cos(pitch);
      const s = FOCAL / (FOCAL - z2);
      return { x: x * s + shiftX, y: y2 * s, s, z: z2 };
    }

    // ---- Événements pointeur
    function onItemDown(i: number) {
      return (e: PointerEvent) => {
        e.stopPropagation();
        const p = local(e);
        const b = bodies[i];
        const h = home(i, performance.now() / 1000);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        drag = {
          kind: "item", index: i, id: e.pointerId,
          ox: p.x - (h.x + b.dx), oy: p.y - (h.y + b.dy),
          px: p.x, py: p.y, lastT: performance.now(), moved: 0, startX: p.x, startY: p.y,
        };
        b.vx = b.vy = 0;
        root.dataset.grabbing = "1";
      };
    }
    function onItemEnter(i: number) {
      return () => (bodies[i].hover = true);
    }
    function onItemLeave(i: number) {
      return () => (bodies[i].hover = false);
    }

    function onRootDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      root.setPointerCapture(e.pointerId);
      drag = { kind: "ring", id: e.pointerId, lastX: e.clientX, lastT: performance.now(), vel: 0 };
      root.dataset.grabbing = "1";
    }

    function onMove(e: PointerEvent) {
      const p = local(e);
      // Survol : l'ensemble s'oriente vers le pointeur
      const nx = Math.max(-0.5, Math.min(0.5, p.x / p.w));
      const ny = Math.max(-0.5, Math.min(0.5, p.y / p.h));
      pitchTarget = PITCH + ny * 0.35;
      yawTarget = nx * 0.5;
      shiftTarget = nx * 24;

      if (!drag || drag.id !== e.pointerId) return;
      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT) / 1000;
      if (drag.kind === "item") {
        const b = bodies[drag.index];
        const vx = (p.x - drag.px) / dt;
        const vy = (p.y - drag.py) / dt;
        b.vx = b.vx * 0.6 + vx * 0.4;
        b.vy = b.vy * 0.6 + vy * 0.4;
        drag.moved = Math.max(drag.moved, Math.hypot(p.x - drag.startX, p.y - drag.startY));
        drag.px = p.x;
        drag.py = p.y;
        drag.lastT = now;
      } else {
        const dx = e.clientX - drag.lastX;
        const delta = dx / Math.max(radius, 1);
        angle += delta;
        drag.vel = drag.vel * 0.5 + (delta / dt) * 0.5;
        drag.lastX = e.clientX;
        drag.lastT = now;
      }
    }

    function onUp(e: PointerEvent) {
      if (!drag || drag.id !== e.pointerId) return;
      if (drag.kind === "item") {
        const b = bodies[drag.index];
        if (drag.moved < 6) {
          // Simple clic : salto
          b.vrot += 1400;
          b.rotHome += 360;
          b.vy -= 380;
        }
        // Lancer : la vitesse est conservée, le ressort ramène l'icône
        b.vx = Math.max(-2500, Math.min(2500, b.vx));
        b.vy = Math.max(-2500, Math.min(2500, b.vy));
      } else {
        spin = Math.max(-8, Math.min(8, drag.vel));
      }
      drag = null;
      delete root.dataset.grabbing;
    }

    function onLeave() {
      pitchTarget = PITCH;
      yawTarget = 0;
      shiftTarget = 0;
    }

    function onCore(e: MouseEvent) {
      e.stopPropagation();
      coreKick = 1;
      const t = performance.now() / 1000;
      bodies.forEach((b, i) => {
        const h = home(i, t);
        const len = Math.hypot(h.x, h.y) || 1;
        const force = 900 + Math.random() * 500;
        b.vx += (h.x / len) * force;
        b.vy += (h.y / len) * force - 200;
        b.vrot += (Math.random() - 0.5) * 1600;
      });
      spin += 3;
    }

    const cleanups: (() => void)[] = [];
    function listen<K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) {
      el.addEventListener(type, fn as EventListener);
      cleanups.push(() => el.removeEventListener(type, fn as EventListener));
    }
    listen(root, "pointerdown", onRootDown);
    listen(root, "pointermove", onMove);
    listen(root, "pointerup", onUp);
    listen(root, "pointercancel", onUp);
    listen(root, "pointerleave", onLeave);
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      listen(el, "pointerdown", onItemDown(i));
      listen(el, "pointerenter", onItemEnter(i));
      listen(el, "pointerleave", onItemLeave(i));
    });
    if (coreRef.current) {
      // Le clic sur la feuille ne doit pas démarrer une rotation de l’anneau
      listen(coreRef.current, "pointerdown", (e) => e.stopPropagation());
      listen(coreRef.current, "click", onCore);
    }

    // ---- Boucle d'animation
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(root);

    function frame(now: number) {
      if (!visible) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      const ease = (rate: number) => 1 - Math.exp(-dt * rate);

      // Rotation de l'anneau : l'inertie retombe vers la vitesse de croisière
      if (!drag || drag.kind !== "ring") {
        spin += ((reduced ? 0 : BASE_SPIN) - spin) * ease(0.9);
        angle += spin * dt;
      }
      pitch += (pitchTarget - pitch) * ease(5);
      yaw += (yawTarget - yaw) * ease(4);
      shiftX += (shiftTarget - shiftX) * ease(4);
      coreKick *= Math.exp(-dt * 3);

      ITEMS.forEach((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const b = bodies[i];
        const h = home(i, t);
        const dragged = drag?.kind === "item" && drag.index === i;

        if (dragged) {
          b.dx = drag!.kind === "item" ? drag!.px - drag!.ox - h.x : b.dx;
          b.dy = drag!.kind === "item" ? drag!.py - drag!.oy - h.y : b.dy;
        } else {
          // Ressort d'écart vers l'orbite
          b.vx += (-POS_K * b.dx - POS_C * b.vx) * dt;
          b.vy += (-POS_K * b.dy - POS_C * b.vy) * dt;
          b.dx += b.vx * dt;
          b.dy += b.vy * dt;
        }

        // Balancement : la vitesse horizontale à l'écran fait pencher l'icône,
        // le ressort la ramène à la verticale (ou au bout de son salto).
        b.psx = b.sx;
        b.sx = h.x + b.dx;
        const screenVx = dt > 0 ? (b.sx - b.psx) / dt : 0;
        const torque = Math.max(-40, Math.min(40, -screenVx * SWAY));
        b.vrot += (-ROT_K * (b.rot - b.rotHome - torque) - ROT_C * b.vrot) * dt;
        b.rot += b.vrot * dt;
        // Salto terminé : on ramène le compteur à 0 (visuellement identique, 360° = 0°)
        if (b.rotHome !== 0 && Math.abs(b.rot - b.rotHome) < 20 && Math.abs(b.vrot) < 40) {
          b.rot -= b.rotHome;
          b.rotHome = 0;
        }

        const targetScale = dragged ? 1.3 : b.hover ? 1.15 : 1;
        b.scale += (targetScale - b.scale) * ease(12);

        const depth = (h.z + radius) / (2 * radius); // 0 = fond, 1 = devant
        const s = h.s * b.scale;
        el.style.transform = `translate3d(${(h.x + b.dx).toFixed(1)}px, ${(h.y + b.dy).toFixed(1)}px, 0) rotate(${b.rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
        el.style.zIndex = String(dragged ? 3000 : Math.round(1000 + h.z));
        el.style.opacity = String(dragged ? 1 : (0.5 + 0.5 * depth).toFixed(3));
      });

      const core = coreRef.current;
      if (core) {
        const bob = reduced ? 0 : Math.sin(t * 1.2) * 8;
        const kick = coreKick * Math.sin(t * 40) * 8;
        core.style.transform = `translate3d(${(shiftX * 0.6).toFixed(1)}px, ${(bob - coreKick * 14).toFixed(1)}px, 0) perspective(600px) rotateY(${(yaw * 40 + kick).toFixed(2)}deg) rotateX(${((pitch - PITCH) * -40).toFixed(2)}deg) scale(${(1 + coreKick * 0.12).toFixed(3)})`;
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="select-none">
      <div
        ref={rootRef}
        className="orbit-stage relative mx-auto w-full max-w-[640px] touch-pan-y"
        style={{ height: 360 }}
      >
        <button
          ref={coreRef}
          type="button"
          aria-label="Faire exploser l'anneau"
          className="orbit-core-btn absolute top-1/2 left-1/2 z-[1000] w-32"
        >
          <CoreSheet />
        </button>
        {ITEMS.map((it, i) => (
          <div
            key={it.ext}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="orbit-piece absolute top-1/2 left-1/2 w-16 touch-none"
          >
            <FileGlyph ext={it.ext} className="pointer-events-none w-full" glow={it.ring === 0} />
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-white/50">Attrapez une icône, lancez l&apos;anneau, touchez la feuille centrale.</p>
    </div>
  );
}

/** La feuille centrale : le document final produit par pdff. */
function CoreSheet() {
  return (
    <svg viewBox="0 0 120 150" className="pointer-events-none w-full drop-shadow-[0_0_40px_rgba(109,92,255,0.85)]">
      <defs>
        <linearGradient id="core-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f82ff" />
          <stop offset="1" stopColor="#4a36f0" />
        </linearGradient>
        <linearGradient id="core-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M14 4h66l36 36v96a10 10 0 0 1-10 10H14A10 10 0 0 1 4 136V14A10 10 0 0 1 14 4z" fill="url(#core-bg)" />
      <path d="M80 4v26a10 10 0 0 0 10 10h26z" fill="#fff" opacity="0.35" />
      <path d="M14 4h66l36 36v96a10 10 0 0 1-10 10H14A10 10 0 0 1 4 136V14A10 10 0 0 1 14 4z" fill="url(#core-shine)" />
      <text x="60" y="98" textAnchor="middle" fontSize="34" fontWeight="800" fill="#fff" fontFamily="var(--font-display), system-ui, sans-serif">
        pdff
      </text>
      <rect x="28" y="112" width="64" height="5" rx="2.5" fill="#fff" opacity="0.5" />
      <rect x="38" y="123" width="44" height="5" rx="2.5" fill="#fff" opacity="0.3" />
    </svg>
  );
}
