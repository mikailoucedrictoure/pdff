import type { MetadataRoute } from "next";

/** Permet d'« installer » pdffusion sur l'écran d'accueil d'un téléphone. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "pdffusion",
    short_name: "pdffusion",
    description: "Merge, convert and edit PDF, Word, Excel, PowerPoint and images. Free, no sign-up.",
    start_url: "/",
    display: "standalone",
    background_color: "#120f36",
    theme_color: "#120f36",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
