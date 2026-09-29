/**
 * Dictionnaire source (français). Toutes les autres langues ont exactement
 * la même structure : TypeScript signale toute clé manquante.
 * Les {accolades} sont des variables : elles ne se traduisent pas.
 */
const fr = {
  meta: {
    title: "pdff — fusionner, convertir et modifier vos documents",
    description: "Fusionnez, convertissez et modifiez PDF, Word, Excel, PowerPoint et images. Gratuit et sans inscription.",
  },
  nav: {
    merge: "Fusionner",
    convert: "Convertir",
    allTools: "Tous les outils",
    back: "← Tous les outils",
  },
  footer: {
    text: "Gratuit et sans inscription. Vos fichiers sont supprimés dès que le traitement est terminé.",
  },
  home: {
    title: "Tous vos documents, dans un seul outil.",
    subtitle: "PDF, Word, Excel, PowerPoint, images : fusionnez, convertissez et modifiez en quelques secondes.",
    ctaMerge: "Fusionner des fichiers",
    ctaConvert: "Convertir un fichier",
    trust: "Gratuit, sans inscription, sans filigrane ajouté.",
    orbitHint: "Attrapez une icône, lancez l'anneau, touchez la feuille centrale.",
    orbitCore: "Faire exploser l'anneau",
    formatsTitle: "{n} formats reconnus",
    formatsSubtitle: "Ceux qui circulent vraiment dans les administrations, les écoles et les entreprises.",
    stepsTitle: "Trois gestes, c'est tout",
    steps: [
      { title: "Déposez", text: "Glissez vos fichiers ou choisissez-les depuis votre téléphone." },
      { title: "Choisissez", text: "Réglez l'ordre, le format de sortie ou les pages à garder." },
      { title: "Téléchargez", text: "Le résultat se télécharge tout seul, prêt à envoyer." },
    ],
  },
  categories: {
    organiser: "Organiser",
    convertir: "Convertir",
    modifier: "Modifier",
    securite: "Sécurité",
  },
  formatCategories: {
    pdf: "PDF",
    image: "Images",
    document: "Documents texte",
    spreadsheet: "Tableurs",
    presentation: "Présentations",
    ebook: "Livres et documents fixes",
    text: "Texte",
    web: "Web",
  },
  /** Noms de formats contenant des mots à traduire (les autres sont universels). */
  formatNames: {
    odt: "OpenDocument Texte (ODT)",
    cbz: "Bande dessinée (CBZ)",
    txt: "Texte (TXT)",
    doc: "Word 97-2003 (DOC)",
    xls: "Excel 97-2003 (XLS)",
    ppt: "PowerPoint 97-2003 (PPT)",
  },
  notice: {
    officeMissingTitle: "Formats Word, Excel et PowerPoint désactivés.",
    officeMissingText: "Installez LibreOffice (gratuit) pour les activer, puis redémarrez pdff. Sous Windows :",
  },
  workspace: {
    dropTitle: "Déposez vos fichiers ici",
    dropActive: "Lâchez, c'est parti",
    dropPdfOnly: "Fichiers PDF",
    dropAny: "PDF, Word, Excel, PowerPoint, images, EPUB, texte…",
    choose: "Choisir des fichiers",
    addMore: "Ajouter des fichiers",
    fileCount: "{n} fichier(s)",
    dragHint: "Glissez pour changer l'ordre.",
    sortAZ: "Trier A→Z",
    reverse: "Inverser",
    clear: "Tout retirer",
    moveUp: "Monter",
    moveDown: "Descendre",
    remove: "Retirer",
    rejected: "Format non pris en charge par cet outil : {files}",
    settings: "Réglages",
    noSettings: "Aucun réglage nécessaire.",
    approximate: "Depuis un PDF, la mise en page est reconstruite : le résultat peut demander des retouches, surtout pour un document scanné.",
    targetEmpty: "Ajoutez un fichier pour voir les formats possibles.",
    targetNone: "Ces fichiers n'ont aucun format de sortie en commun.",
    uploading: "Envoi… {pct} %",
    processing: "Traitement en cours…",
    processingShort: "Traitement…",
    cancel: "Annuler",
    done: "Terminé en {s} s",
    doneMany: "Terminé en {s} s, {n} fichiers (ZIP)",
    download: "Télécharger",
    downloadResult: "✓ Télécharger le résultat",
    restart: "Recommencer",
    limits: "Jusqu'à {pages} pages et {files} fichiers par opération.",
    errorConnection: "Connexion au serveur impossible.",
    errorGeneric: "Le traitement a échoué.",
  },
  language: {
    button: "Langue",
    title: "Choisir la langue",
    search: "Rechercher une langue…",
    verified: "Traduction vérifiée",
    automatic: "Traduction automatique",
    current: "Langue actuelle",
    translating: "Traduction de pdff en {lang}…",
    unavailable: "La traduction automatique n'est pas encore activée sur ce serveur : pdff s'affiche en anglais.",
    failed: "La traduction en {lang} a échoué. Réessayez plus tard.",
    noResult: "Aucune langue ne correspond.",
    close: "Fermer",
    auto: "Automatique (langue du navigateur)",
  },
  tools: {
    fusionner: {
      name: "Fusionner",
      tagline: "Assembler plusieurs fichiers (PDF, Word, images…) en un seul PDF, dans l'ordre choisi.",
      options: {
        bookmarks: { label: "Ajouter un signet par fichier" },
      },
    },
    convertir: {
      name: "Convertir",
      tagline: "Convertir n'importe quel document ou image vers un autre format.",
      options: {
        target: { label: "Convertir en" },
        dpi: { label: "Résolution des images (DPI)" },
        quality: { label: "Qualité JPG / WebP / AVIF (1-100)" },
      },
    },
    diviser: {
      name: "Diviser",
      tagline: "Séparer un PDF en plusieurs fichiers : par plages ou page par page.",
      options: {
        mode: {
          label: "Mode",
          choices: { ranges: "Par plages de pages", each: "Une page = un fichier", every: "Tous les N pages" },
        },
        ranges: { label: "Plages", placeholder: "1-3, 4-10, 11-fin", help: "Chaque plage devient un fichier." },
        every: { label: "Nombre de pages par fichier" },
      },
    },
    extraire: {
      name: "Extraire / supprimer des pages",
      tagline: "Garder ou retirer certaines pages d'un PDF.",
      options: {
        mode: { label: "Action", choices: { keep: "Garder uniquement ces pages", remove: "Supprimer ces pages" } },
        pages: { label: "Pages", placeholder: "1, 3-5", help: "Ex. : 1-3, 5, 8-fin. Laisser vide = toutes les pages." },
      },
    },
    organiser: {
      name: "Réorganiser les pages",
      tagline: "Changer l'ordre des pages, dupliquer, inverser.",
      options: {
        order: { label: "Nouvel ordre", placeholder: "3, 1, 2, 4-fin", help: "Les pages non citées sont retirées." },
        reverse: { label: "Inverser tout le document (ignore l'ordre ci-dessus)" },
      },
    },
    pivoter: {
      name: "Pivoter",
      tagline: "Faire pivoter toutes les pages ou une sélection.",
      options: {
        angle: { label: "Rotation", choices: { "90": "90° sens horaire", "180": "180°", "270": "90° sens anti-horaire" } },
        pages: { label: "Pages", placeholder: "toutes", help: "Ex. : 1-3, 5, 8-fin. Laisser vide = toutes les pages." },
      },
    },
    numeroter: {
      name: "Numéroter les pages",
      tagline: "Ajouter des numéros de page.",
      options: {
        position: {
          label: "Position",
          choices: {
            "bottom-center": "En bas, centré",
            "bottom-right": "En bas, à droite",
            "bottom-left": "En bas, à gauche",
            "top-center": "En haut, centré",
            "top-right": "En haut, à droite",
            "top-left": "En haut, à gauche",
          },
        },
        format: { label: "Format", help: "{n} = numéro, {total} = nombre de pages.", default: "{n} / {total}" },
        start: { label: "Premier numéro" },
        size: { label: "Taille du texte" },
        pages: { label: "Pages à numéroter", placeholder: "toutes", help: "Ex. : 1-3, 5, 8-fin. Laisser vide = toutes les pages." },
      },
    },
    filigrane: {
      name: "Filigrane",
      tagline: "Apposer un texte en filigrane (CONFIDENTIEL, COPIE…).",
      options: {
        text: { label: "Texte", default: "CONFIDENTIEL" },
        size: { label: "Taille" },
        opacity: { label: "Opacité (%)" },
        rotation: { label: "Angle (°)" },
        color: { label: "Couleur", choices: { gray: "Gris", red: "Rouge", blue: "Bleu", black: "Noir" } },
        pages: { label: "Pages", placeholder: "toutes", help: "Ex. : 1-3, 5, 8-fin. Laisser vide = toutes les pages." },
      },
    },
    compresser: {
      name: "Compresser",
      tagline: "Réduire le poids d'un PDF.",
      options: {
        level: {
          label: "Niveau",
          choices: {
            lossless: "Sans perte (nettoyage de la structure)",
            recommended: "Recommandé (images 150 DPI)",
            strong: "Fort (images 96 DPI)",
          },
        },
      },
    },
    proteger: {
      name: "Protéger",
      tagline: "Chiffrer un PDF avec un mot de passe (AES-256).",
      options: {
        password: { label: "Mot de passe d'ouverture" },
        noPrint: { label: "Interdire l'impression" },
        noCopy: { label: "Interdire la copie du texte" },
        noEdit: { label: "Interdire la modification" },
      },
    },
    deverrouiller: {
      name: "Déverrouiller",
      tagline: "Retirer le mot de passe d'un PDF dont vous connaissez le mot de passe.",
      options: {
        password: { label: "Mot de passe actuel", help: "Laisser vide si le PDF n'a qu'un mot de passe de restrictions." },
      },
    },
    metadonnees: {
      name: "Métadonnées",
      tagline: "Modifier le titre, l'auteur, le sujet et les mots-clés.",
      options: {
        title: { label: "Titre" },
        author: { label: "Auteur" },
        subject: { label: "Sujet" },
        keywords: { label: "Mots-clés (séparés par des virgules)" },
        clear: { label: "Effacer toutes les métadonnées existantes" },
      },
    },
  },
  errors: {
    unknownTool: "Outil inconnu.",
    tooLarge: "Envoi trop volumineux (max. {mb} Mo).",
    badRequest: "Requête invalide.",
    noFiles: "Ajoutez au moins un fichier.",
    tooManyFiles: "Trop de fichiers : {max} maximum pour cet outil.",
    badOptions: "Options invalides.",
    noOutput: "Aucun fichier produit.",
    unexpected: "Une erreur inattendue est survenue pendant le traitement.",
    inFile: "{file} : {message}",
    pageLimitDocument: "Le document compte {count} pages, au-delà de la limite de {max} pages.",
    pageLimitResult: "Le résultat compterait {count} pages, au-delà de la limite de {max} pages.",
    pageLimit: "Limite de {max} pages dépassée.",
    unreadable: "Impossible de lire « {name} » : fichier endommagé ou format non reconnu.",
    damagedPdf: "Impossible de lire « {name} » : PDF endommagé.",
    wrongPassword: "Mot de passe incorrect pour « {name} ».",
    passwordProtected: "« {name} » est protégé par un mot de passe. Utilisez d'abord l'outil « Déverrouiller ».",
    notPdf: "« {name} » n'est pas un PDF.",
    notPdfConvertFirst: "« {name} » n'est pas un PDF. Convertissez-le d'abord.",
    passwordComma: "Le mot de passe ne peut pas contenir de virgule.",
    imageFormat: "Format image non pris en charge : {format}",
    imageConvert: "Impossible de convertir « {name} » : image illisible ou endommagée.",
    imageUnreadable: "« {name} » n'est pas une image lisible.",
    officeMissing: "LibreOffice est nécessaire pour cette conversion (Word, Excel, PowerPoint…). Installez-le puis redémarrez pdff.",
    officeTarget: "Conversion vers {target} non prise en charge.",
    officeTimeout: "La conversion a pris trop de temps et a été interrompue.",
    officeFailed: "LibreOffice n'a pas pu convertir « {name} » en {target}.",
    conversionImpossible: "Conversion {from} → {to} impossible.",
    conversionImpossibleOffice: "Conversion {from} → {to} impossible (installer LibreOffice ajoute les formats Word, Excel et PowerPoint).",
    watermarkText: "Indiquez le texte du filigrane.",
    emptyResult: "Le document résultant ne contiendrait aucune page.",
    chooseTarget: "Choisissez le format de sortie.",
    passwordOrRestriction: "Indiquez un mot de passe ou au moins une restriction.",
    pageInvalid: "« {token} » n'est pas un numéro de page valide.",
    pageMissing: "La page {n} n'existe pas (le document compte {total} pages).",
    rangeInvalid: "Plage invalide : « {part} ».",
    rangeRequired: "Indiquez au moins une plage de pages.",
  },
};

export default fr;

/** Structure de traduction : mêmes clés que le français, valeurs texte. */
type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? Widen<U>[] : { [K in keyof T]: Widen<T[K]> };
export type Messages = Widen<typeof fr>;
export type ErrorKey = keyof Messages["errors"];
