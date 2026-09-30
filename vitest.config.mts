import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src") } },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    // Les conversions (MuPDF, LibreOffice) peuvent prendre quelques secondes
    testTimeout: 60_000,
  },
});
