import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

// Installation sur ses propres serveurs (Dockerfile) : serveur autonome, sans node_modules complet
const standalone = process.env.PDFF_STANDALONE === "1";

const nextConfig: NextConfig = {
  // Modules natifs / WebAssembly chargés tels quels par Node.js
  serverExternalPackages: ["mupdf", "sharp"],
  ...(standalone && {
    output: "standalone",
    // Le moteur PDF charge son fichier WebAssembly à l'exécution : on l'embarque en entier
    outputFileTracingIncludes: { "/**": ["./node_modules/mupdf/dist/**/*"] },
  }),
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
