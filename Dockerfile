# pdff : image complète pour l'installer sur ses propres serveurs (administrations, entreprises, écoles).
# Site + tous les outils + LibreOffice (Word, Excel, PowerPoint) dans un seul conteneur.
# Aucune donnée ne sort du serveur : pas de statistiques, pas de traduction en ligne, pas de stockage externe.
# Guide : INSTALLATION.md

# ---------------------------------------------------------------- Base : Node.js + LibreOffice + polices
FROM node:24-bookworm-slim AS base
ENV DEBIAN_FRONTEND=noninteractive
# LibreOffice sans interface + polices compatibles Microsoft Office
# (Liberation ≈ Arial/Times/Courier, Carlito ≈ Calibri, Caladea ≈ Cambria) et Noto pour
# l'arabe, le chinois, le japonais, le coréen, le devanagari, l'éthiopien…
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      libreoffice-writer-nogui libreoffice-calc-nogui libreoffice-impress-nogui libreoffice-draw-nogui \
      fonts-liberation2 fonts-crosextra-carlito fonts-crosextra-caladea fonts-dejavu-core \
      fonts-noto-core fonts-noto-cjk fonts-noto-mono \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------------------------- Construction du site
FROM base AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Adresse à laquelle vos utilisateurs ouvriront pdff (liens internes, aperçus de partage)
ARG PDFF_SITE_URL=http://localhost:8080
ENV NEXT_PUBLIC_SITE_URL=${PDFF_SITE_URL} \
    PDFF_STANDALONE=1 \
    PDFF_SELF_HOSTED=1 \
    PDFF_MACHINE_TRANSLATION=off \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------------------------------------------------------------- Image finale
FROM base AS run
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    PDFF_SELF_HOSTED=1 \
    PDFF_MACHINE_TRANSLATION=off \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/LICENSE ./LICENSE

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD node -e "fetch('http://127.0.0.1:3000/api/capabilities').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
