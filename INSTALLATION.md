# Installer pdffusion sur vos propres serveurs

*[English below](#install-pdffusion-on-your-own-servers)*

pdffusion est gratuit et open source (licence MIT). Les administrations, entreprises, écoles et
universités peuvent l'installer dans leur propre réseau : **aucun document ne quitte alors
vos serveurs**, et pdffusion fonctionne même sans accès à Internet.

L'installation tient dans un seul conteneur : le site, tous les outils PDF et images, et
LibreOffice pour Word, Excel et PowerPoint.

| Ce qui change par rapport au site public | |
| --- | --- |
| Statistiques de visite | aucune |
| Traduction en ligne, stockage externe | aucun : les 160 langues sont déjà dans l'image |
| Référencement | le site interne est masqué aux moteurs de recherche |
| Données | traitées en mémoire et dans `/tmp`, supprimées aussitôt |
| OCR (reconnaissance de texte) | se fait dans le navigateur ; le modèle de langue (quelques Mo) est téléchargé une fois depuis cdn.jsdelivr.net. Sans accès à Internet, cet outil est le seul indisponible |

## Ce qu'il faut

- Un serveur Linux (ou Windows / macOS) avec **Docker** installé : https://docs.docker.com/engine/install/
- 2 processeurs et 2 Go de mémoire au minimum (4 Go conseillés pour les gros documents Office)
- Environ 3 Go d'espace disque pour l'image

## Installation en 3 commandes

```bash
mkdir pdffusion && cd pdffusion
curl -O https://raw.githubusercontent.com/mikailoucedrictoure/pdff/main/docker-compose.yml
docker compose up -d
```

Ouvrez ensuite **http://ADRESSE-DU-SERVEUR:8080** dans un navigateur.

Sans Docker Compose :

```bash
docker run -d --name pdff --restart unless-stopped -p 8080:3000 \
  --security-opt no-new-privileges:true --tmpfs /tmp:size=4g \
  ghcr.io/mikailoucedrictoure/pdff:latest
```

## Vérifier que tout fonctionne

```bash
docker ps                                   # la colonne STATUS doit indiquer « healthy »
curl http://localhost:8080/api/capabilities # "libreOffice":true → Word, Excel, PowerPoint actifs
```

## Mettre à jour

```bash
docker compose pull && docker compose up -d
```

Pour figer une version précise (recommandé en production), remplacez `latest` par un numéro
de version dans `docker-compose.yml`, par exemple `ghcr.io/mikailoucedrictoure/pdff:1.0`.

## Réglages

Dans `docker-compose.yml`, section `environment` :

| Variable | Défaut | Rôle |
| --- | --- | --- |
| `PDFF_MAX_PAGES` | 10000 | Pages maximum d'un document produit |
| `PDFF_MAX_FILES` | 500 | Fichiers maximum par opération |
| `PDFF_MAX_UPLOAD_MB` | 2048 | Taille maximum d'un envoi (Mo) |

Le site écoute sur le port 3000 du conteneur ; changez `8080` dans `ports` pour utiliser un autre port.

## HTTPS et nom de domaine interne

Placez pdffusion derrière votre proxy inverse habituel (Nginx, Apache, Traefik, Caddy, IIS…), qui gère
le certificat. Exemple Nginx :

```nginx
server {
  listen 443 ssl;
  server_name pdff.mon-organisation.ca;
  # ssl_certificate / ssl_certificate_key : vos certificats
  client_max_body_size 2g;          # même valeur que PDFF_MAX_UPLOAD_MB
  proxy_read_timeout 300s;          # les grosses conversions peuvent prendre quelques minutes
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto https;
  }
}
```

Pour que les liens de partage et le plan du site utilisent votre adresse, construisez l'image
vous-même avec cette adresse (voir ci-dessous).

## Construire l'image vous-même (réseau isolé, audit du code)

```bash
git clone https://github.com/mikailoucedrictoure/pdff.git
cd pdff
docker build --build-arg PDFF_SITE_URL=https://pdff.mon-organisation.ca -t pdff .
docker run -d --name pdff --restart unless-stopped -p 8080:3000 --tmpfs /tmp:size=4g pdff
```

La construction télécharge les dépendances (npm, Debian) ; l'image obtenue fonctionne ensuite
sans aucun accès à Internet. Pour un réseau totalement isolé : construisez ou téléchargez
l'image sur un poste connecté, puis transférez-la avec `docker save pdff | gzip > pdff.tar.gz`
et `docker load < pdff.tar.gz`.

## Sécurité

- Le conteneur tourne avec un utilisateur sans privilèges (`node`).
- Aucun fichier n'est conservé : chaque traitement travaille en mémoire ou dans `/tmp`, vidé aussitôt.
- Chaque version de l'image est construite et testée automatiquement par GitHub
  (`.github/workflows/image.yml`), réseau coupé, avec de vraies conversions.
- Signaler une faille : voir [SECURITY.md](SECURITY.md).

## Licence

Code sous licence MIT : utilisation, modification et redistribution libres et gratuites,
en conservant la mention de droit d'auteur. Conçu et développé par
[Mikailou Cedric Toure](https://www.linkedin.com/in/mika%C3%AFlou-cedric-toure).

---

# Install pdffusion on your own servers

pdffusion is free and open source (MIT license). Governments, businesses, schools and universities
can run it inside their own network: **no document ever leaves your servers**, and pdffusion works
even with no Internet access.

Everything ships in a single container: the website, all PDF and image tools, and LibreOffice
for Word, Excel and PowerPoint. The self-hosted image has no analytics, no online translation,
no external storage, and hides itself from search engines. OCR runs in the browser and downloads its language model (a few MB) once from cdn.jsdelivr.net: on an air-gapped network, it is the only tool unavailable.

## Requirements

- A Linux (or Windows / macOS) server with **Docker**: https://docs.docker.com/engine/install/
- At least 2 CPUs and 2 GB of RAM (4 GB recommended for large Office documents)
- About 3 GB of disk space for the image

## Install in 3 commands

```bash
mkdir pdffusion && cd pdffusion
curl -O https://raw.githubusercontent.com/mikailoucedrictoure/pdff/main/docker-compose.yml
docker compose up -d
```

Then open **http://SERVER-ADDRESS:8080** in a browser. Without Docker Compose:

```bash
docker run -d --name pdff --restart unless-stopped -p 8080:3000 \
  --security-opt no-new-privileges:true --tmpfs /tmp:size=4g \
  ghcr.io/mikailoucedrictoure/pdff:latest
```

Check: `docker ps` shows `healthy`, and `curl http://localhost:8080/api/capabilities`
returns `"libreOffice":true`. Update: `docker compose pull && docker compose up -d`.
Pin a version in production (for example `ghcr.io/mikailoucedrictoure/pdff:1.0`).

Settings (`environment` in `docker-compose.yml`): `PDFF_MAX_PAGES` (10000),
`PDFF_MAX_FILES` (500), `PDFF_MAX_UPLOAD_MB` (2048).

Put pdffusion behind your usual reverse proxy for HTTPS (see the Nginx example above:
raise `client_max_body_size` and `proxy_read_timeout`).

To build the image yourself (code audit, isolated network):

```bash
git clone https://github.com/mikailoucedrictoure/pdff.git && cd pdff
docker build --build-arg PDFF_SITE_URL=https://pdff.my-organization.org -t pdff .
```

For an air-gapped network, transfer the image with `docker save` / `docker load`.
The container runs as an unprivileged user and keeps no files. Every image is built and
tested automatically by GitHub with networking disabled and real conversions.
Report vulnerabilities as described in [SECURITY.md](SECURITY.md).

Designed and built by [Mikailou Cedric Toure](https://www.linkedin.com/in/mika%C3%AFlou-cedric-toure). MIT license.
