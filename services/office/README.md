# Service Office de pdff

LibreOffice ne peut pas tourner sur Vercel. Ce petit service le fait tourner à côté
et pdff l'appelle pour Word, Excel et PowerPoint. Deux hébergements possibles :

- **Render** (utilisé en production) : gratuit, sans carte bancaire, 512 Mo de mémoire ;
- **Google Cloud Run** : gratuit dans la limite de l'offre, mais demande une carte bancaire (pas prépayée).

## Déployer sur Render (sans carte)

1. Compte gratuit sur https://render.com (connexion avec GitHub).
2. **New → Blueprint**, choisir le dépôt `pdff` : Render lit `render.yaml` à la racine.
3. Renseigner `OFFICE_TOKEN` (le même secret que `PDFF_OFFICE_TOKEN` dans Vercel), puis **Apply**.
4. Mettre l'adresse du service (`https://pdff-office-….onrender.com`) dans `PDFF_OFFICE_URL` sur Vercel
   et dans la variable GitHub `OFFICE_URL` (réveil automatique).

Chaque modification de `services/office` poussée sur `main` redéploie le service.
Render endort un service gratuit après 15 minutes sans visite : la tâche GitHub
`.github/workflows/office-reveil.yml` l'appelle toutes les 10 minutes pour le garder prêt.

- `server.ts` : serveur HTTP sans dépendance (Node.js 24 lit le TypeScript directement).
- `Dockerfile` : LibreOffice sans interface + polices compatibles Microsoft Office.
- Aucun document n'est gardé : chaque conversion travaille dans un dossier temporaire supprimé aussitôt.
- Protégé par un jeton secret (`OFFICE_TOKEN`) : personne d'autre que pdff ne peut l'utiliser.

## Déployer sur Google Cloud Run (avec carte bancaire)

Prérequis : [Google Cloud CLI](https://cloud.google.com/sdk/docs/install), `gcloud auth login`,
un projet Google Cloud avec la facturation activée (la carte n'est pas débitée dans la limite gratuite).

```powershell
gcloud config set project <ID_DU_PROJET>
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

gcloud run deploy pdff-office `
  --source services/office `
  --region europe-west1 `
  --allow-unauthenticated `
  --cpu 1 --memory 2Gi --concurrency 1 `
  --min-instances 0 --max-instances 3 `
  --timeout 300 `
  --set-env-vars OFFICE_TOKEN=<JETON_SECRET>
```

`--allow-unauthenticated` rend l'adresse joignable, mais le service refuse toute requête sans le jeton.
`--max-instances 3` plafonne la consommation : impossible de dépasser l'offre gratuite par accident.

Puis, dans Vercel (Settings → Environment Variables) :

| Variable | Valeur |
| --- | --- |
| `PDFF_OFFICE_URL` | l'adresse affichée par `gcloud run deploy` (https://pdff-office-….run.app) |
| `PDFF_OFFICE_TOKEN` | le même jeton secret |

## Vérifier

```bash
curl https://pdff-office-….run.app/health   # → ok
```

## Limites

- 31 Mo maximum par fichier Office envoyé (limite des requêtes Cloud Run).
- Premier appel après une période calme : quelques secondes de démarrage.
