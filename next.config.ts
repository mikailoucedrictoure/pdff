import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modules natifs / WebAssembly chargés tels quels par Node.js
  serverExternalPackages: ["mupdf", "sharp"],
};

export default nextConfig;
