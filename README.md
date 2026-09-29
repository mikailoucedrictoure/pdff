# pdff

Fusionner, convertir et modifier tous vos documents (PDF, Word, Excel, PowerPoint, images, EPUB…) depuis une seule interface.
Next.js 16 + TypeScript.

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

Pour une utilisation quotidienne (plus rapide) : `npm run build` puis `npm start`.

### Activer Word, Excel et PowerPoint

Les conversions bureautiques utilisent **LibreOffice** (gratuit). Sans lui, pdff fonctionne mais sans ces formats.

```powershell
winget install TheDocumentFoundation.LibreOffice
```

Redémarrez ensuite `npm run dev`. LibreOffice est détecté automatiquement ; sinon renseignez `LIBREOFFICE_PATH` dans `.env.local`.

## Limites (modifiables sans toucher au code)

Dans `.env.local` (local) ou dans les variables d'environnement Vercel :

| Variable | Défaut | Rôle |
| --- | --- | --- |
| `PDFF_MAX_PAGES` | 10000 | Pages maximum d'un document produit |
| `PDFF_MAX_FILES` | 500 | Fichiers maximum par opération |
| `PDFF_MAX_UPLOAD_MB` | 2048 | Taille maximum d'un envoi |

## Outils

Fusionner (tous formats → un PDF, dans l'ordre, avec signets) · Convertir · Diviser · Extraire / supprimer des pages ·
Réorganiser · Pivoter · Numéroter · Filigrane · Compresser · Protéger (AES-256) · Déverrouiller · Métadonnées.

## Conversions

| Moteur | Conversions |
| --- | --- |
| sharp | JPG, PNG, WebP, AVIF, TIFF, GIF, SVG ↔ entre eux |
| pdf-lib | Images → PDF (JPG/PNG intégrés sans recompression, TIFF multipage) |
| MuPDF | PDF → PNG/JPG (jusqu'à 600 DPI), PDF → TXT/HTML, EPUB/XPS/CBZ/FB2/MOBI/BMP/TXT/HTML → PDF |
| LibreOffice | DOCX, DOC, ODT, RTF, XLSX, XLS, ODS, CSV, PPTX, PPT, ODP ↔ PDF et entre eux ; PDF → DOCX/PPTX (fidélité variable) |

Les conversions en plusieurs étapes sont trouvées automatiquement (ex. DOCX → PNG = DOCX → PDF → PNG).

## Architecture

```
src/
  config/limits.ts            limites lues depuis l'environnement
  lib/core/                   code « pur » partagé client/serveur
    formats.ts                catalogue des formats
    graph.ts                  graphe de conversion (arêtes + plus court chemin)
    tools.ts                  définition des outils → l'interface est générée depuis ce fichier
    pages.ts                  sélection de pages « 1-3, 5, 8-fin »
  lib/server/
    engines/                  pdf.ts (pdf-lib), mupdf.ts, image.ts (sharp), office.ts (LibreOffice)
    convert.ts                exécute un chemin de conversion
    runners.ts                un exécuteur par outil
  app/api/tools/[tool]        API unique : POST fichiers + options → fichier ou ZIP
  app/api/capabilities        moteurs disponibles et limites
  components/Workspace.tsx    zone de dépôt, ordre des fichiers, options, progression
```

**Ajouter un format** : une entrée dans `formats.ts` + une arête dans `graph.ts`.
**Ajouter un outil** : une entrée dans `tools.ts` + un exécuteur dans `runners.ts`.

## Mise en ligne (Vercel)

À prévoir avant d'ouvrir au public :

- Vercel limite le corps des requêtes à 4,5 Mo : il faudra envoyer les fichiers vers Vercel Blob (envoi direct depuis le navigateur) puis traiter depuis le Blob.
- LibreOffice n'existe pas sur Vercel : les conversions bureautiques devront passer par un service séparé (conteneur Docker avec LibreOffice, par ex. sur Fly.io / Railway / Cloud Run). Le moteur `office.ts` est isolé pour faciliter ce remplacement.
- Neon (Postgres) servira aux comptes, quotas et historique quand pdff deviendra un SaaS ; il n'est pas nécessaire pour l'usage actuel.
