"use client";

import { useEffect, useState } from "react";
import type { EngineId } from "@/lib/core/graph";

export interface Capabilities {
  engines: EngineId[];
  libreOffice: boolean;
  blob: boolean;
  limits: { maxPages: number; maxFiles: number; maxUploadMb: number };
}

let cache: Promise<Capabilities> | null = null;

export function useCapabilities(): Capabilities | null {
  const [caps, setCaps] = useState<Capabilities | null>(null);
  useEffect(() => {
    cache ??= fetch("/api/capabilities").then((r) => r.json());
    let alive = true;
    cache.then((c) => alive && setCaps(c)).catch(() => (cache = null));
    return () => {
      alive = false;
    };
  }, []);
  return caps;
}
