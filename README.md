# pdff

Fusionner, convertir et modifier tous vos documents (PDF, Word, Excel, PowerPoint, images, EPUB…) depuis une seule interface.
Next.js 16 + TypeScript.

Conçu et développé par [Mikailou Cedric Toure](https://www.linkedin.com/in/mika%C3%AFlou-cedric-toure) (Nouveau-Brunswick, Canada). Licence [MIT](LICENSE) : gratuit pour tous, y compris entreprises et administrations.

- **Installer pdff sur vos propres serveurs** (administrations, entreprises, écoles) : [INSTALLATION.md](INSTALLATION.md) — une commande Docker, fonctionne sans Internet.
- **Signaler une faille** : [SECURITY.md](SECURITY.md).
- Bibliothèques chargées dans le navigateur à la demande : pdf.js (aperçus, Apache-2.0), tesseract.js (Lire un scan, Apache-2.0), heic-to / libheif (photos d'iPhone HEIC converties en JPG, LGPL-3.0, module séparé et non modifié).
- Sur le site : Conditions d’utilisation (`/conditions`), Confidentialité, Sécurité et données (`/securite`), Accessibilité (`/accessibilite`, WCAG 2.2 AA).

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
En ligne, c'est le service `services/office` (Render) qui s'en charge : voir `services/office/README.md`.

## Langues

- La langue est **détectée automatiquement** (langue du navigateur), et chacun peut la changer avec le bouton 🌐 en haut de la page. Le choix est mémorisé.
- **Traductions vérifiées**, embarquées dans le site : français, anglais, espagnol, portugais, arabe (de droite à gauche), allemand, chinois — `src/i18n/messages/`.
- **Toutes les autres langues** (153) sont traduites à l’avance par IA et embarquées dans le site : `src/i18n/generated/`.
  Aucune IA n’est appelée quand un visiteur arrive. Pour (re)générer après une modification des textes anglais :
  `GEMINI_API_KEY=… node scripts/translate-languages.mjs` (clé gratuite sur https://aistudio.google.com/apikey, sans carte).
  Seuls les textes modifiés sont retraduits ; le quota gratuit (~20 demandes par jour et par modèle) peut étaler le travail sur plusieurs jours, le script reprend où il s’est arrêté.
  Un texte anglais modifié mais pas encore retraduit s’affiche en anglais.
- Traduction à la volée (secours, désactivée en production par `PDFF_MACHINE_TRANSLATION=off`) : Vercel AI Gateway, qui demande une carte bancaire sur le compte Vercel.
- Les messages d’erreur du serveur sont eux aussi traduits.

**Ajouter ou modifier un texte** : l’écrire dans `src/i18n/messages/fr.ts`, puis dans les 6 autres fichiers (TypeScript signale toute clé manquante). Les traductions automatiques se régénèrent d’elles-mêmes.
**Ajouter une langue vérifiée** : copier `en.ts`, traduire, l’enregistrer dans `messages/index.ts` et `VERIFIED_LOCALES` (`src/i18n/locales.ts`).

## Limites (modifiables sans toucher au code)

Dans `.env.local` (local) ou dans les variables d'environnement Vercel :

| Variable | Défaut | Rôle |
| --- | --- | --- |
| `PDFF_MAX_PAGES` | 10000 | Pages maximum d'un document produit |
| `PDFF_MAX_FILES` | 500 | Fichiers maximum par opération |
| `PDFF_MAX_UPLOAD_MB` | 2048 | Taille maximum d'un envoi |

## Mise en ligne (Vercel, gratuit)

Le projet Vercel `pdff` est relié au dépôt GitHub : **chaque envoi sur `main` met le site en ligne**.

| Élément | Où | Rôle |
| --- | --- | --- |
| Site + outils PDF / images | Vercel (région Paris `cdg1`, voir `vercel.json`) | pages, API, traitements |
| Word, Excel, PowerPoint | Render, offre gratuite (`services/office`, `render.yaml`) | LibreOffice, que Vercel ne peut pas installer |
| Fichiers de plus de 4 Mo | Vercel Blob (`pdff-fichiers`) | contourne la limite de 4,5 Mo des requêtes Vercel ; tout est effacé après usage |
| Nettoyage | tâche planifiée quotidienne `/api/cleanup` | efface tout fichier temporaire de plus d'une heure |
| Traductions automatiques | Vercel AI Gateway + cache Blob `i18n/` | une langue n'est traduite qu'une fois |
| Statistiques | Vercel Web Analytics | visites anonymes, sans cookie |

Variables à définir dans Vercel (Settings → Environment Variables) : voir `.env.example`
(`NEXT_PUBLIC_SITE_URL`, `PDFF_OFFICE_URL`, `PDFF_OFFICE_TOKEN`, `CRON_SECRET`, `PDFF_MAX_UPLOAD_MB`).

### Vitesse

- **Toutes les pages sont fabriquées à l'avance**, dans chacune des 160 langues (`src/app/[lang]`, environ 2 300 pages),
  puis servies depuis le CDN de Vercel : réponse en quelques millisecondes, sans calcul serveur.
- `src/proxy.ts` réécrit les adresses sans langue (`/`, `/outils/…`) vers la langue du visiteur (choix mémorisé, puis navigateur).
- Changer de langue ouvre directement la version déjà fabriquée de la page (préchargée au survol).
- Les capacités du serveur sont calculées à la fabrication des pages : aucune requête au chargement d'un outil.

### Référencement

- Une adresse par langue vérifiée : `/fr/…`, `/en/…`, `/es/…`, `/pt/…`, `/ar/…`, `/de/…`, `/zh/…` (`src/proxy.ts`).
  Sans préfixe, la langue reste détectée automatiquement.
- Balises `hreflang` et `canonical`, plan du site (`/sitemap.xml`), `robots.txt`, images de partage
  générées pour chaque outil, données structurées (WebApplication, FAQ, fil d'Ariane).
- Textes SEO de chaque outil : `tools.<id>.seoTitle`, `seoDescription`, `intro` dans les traductions.

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
