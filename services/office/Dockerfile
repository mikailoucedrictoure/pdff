# Service Office de pdff : LibreOffice headless + petit serveur HTTP (server.ts).
# Déploiement : voir services/office/README.md
FROM node:24-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive \
    NODE_ENV=production \
    SOFFICE_PATH=/usr/bin/soffice

# LibreOffice sans interface graphique + polices compatibles avec celles de Microsoft Office
# (Liberation ≈ Arial/Times/Courier, Carlito ≈ Calibri, Caladea ≈ Cambria) et Noto pour
# l'arabe, le chinois, le japonais, le coréen, le devanagari, l'éthiopien…
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      libreoffice-writer-nogui libreoffice-calc-nogui libreoffice-impress-nogui libreoffice-draw-nogui \
      fonts-liberation2 fonts-crosextra-carlito fonts-crosextra-caladea fonts-dejavu-core \
      fonts-noto-core fonts-noto-cjk fonts-noto-mono \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY server.ts ./

USER node
# Premier lancement pendant la construction : le profil LibreOffice est prêt, le démarrage est plus rapide
RUN soffice --headless --terminate_after_init "-env:UserInstallation=file:///tmp/pdff-lo-profile" || true

EXPOSE 8080
CMD ["node", "server.ts"]
