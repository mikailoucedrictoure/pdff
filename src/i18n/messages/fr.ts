/**
 * Dictionnaire source (français). Toutes les autres langues ont exactement
 * la même structure : TypeScript signale toute clé manquante.
 * Les {accolades} sont des variables : elles ne se traduisent pas.
 */
const fr = {
  meta: {
    title: "pdff — Fusionner, convertir et modifier PDF, Word, Excel gratuitement",
    description: "Outil en ligne gratuit pour fusionner, convertir, compresser, diviser et protéger vos PDF, Word, Excel, PowerPoint et images. Sans inscription, fichiers supprimés aussitôt.",
    keywords: "fusionner pdf, convertir pdf, pdf en word, word en pdf, jpg en pdf, pdf en jpg, compresser pdf, diviser pdf, excel en pdf, outil pdf gratuit",
  },
  nav: {
    merge: "Fusionner",
    convert: "Convertir",
    allTools: "Tous les outils",
    back: "← Tous les outils",
  },
  footer: {
    text: "Gratuit et sans inscription. Vos fichiers sont supprimés dès que le traitement est terminé.",
    skip: "Aller au contenu",
    legalNav: "Informations sur le site",
    developedBy: "Conçu et développé par {name}",
    motionPause: "Arrêter les animations",
    motionPlay: "Relancer les animations",
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
  seo: {
    whyTitle: "Pourquoi pdff ?",
    why: [
      {
        title: "100 % gratuit",
        text: "Aucun abonnement, aucune carte bancaire, aucun filigrane ajouté sur vos documents.",
      },
      {
        title: "Sans inscription",
        text: "Pas de compte à créer : ouvrez la page, déposez vos fichiers, c'est tout.",
      },
      {
        title: "Vos fichiers restent à vous",
        text: "Traités puis supprimés aussitôt. Nous ne gardons ni vos documents ni vos données.",
      },
      {
        title: "Tous les formats",
        text: "PDF, Word, Excel, PowerPoint, OpenDocument, images, EPUB… depuis un ordinateur ou un téléphone.",
      },
    ],
    howTitle: "Comment faire ?",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "pdff est-il vraiment gratuit ?",
        a: "Oui. Tous les outils sont gratuits, sans filigrane ni fonction cachée derrière un abonnement. Aucune carte bancaire n'est demandée.",
      },
      {
        q: "Faut-il créer un compte ?",
        a: "Non. Aucune inscription, aucune adresse e-mail : vous utilisez les outils directement.",
      },
      {
        q: "Mes documents sont-ils conservés ?",
        a: "Non. Vos fichiers servent uniquement au traitement demandé, puis sont supprimés. Personne ne les lit et ils ne sont partagés avec personne.",
      },
      {
        q: "Est-ce que ça marche sur téléphone ?",
        a: "Oui. pdff fonctionne dans le navigateur de n'importe quel téléphone, tablette ou ordinateur (Android, iPhone, Windows, Mac, Linux), sans rien installer.",
      },
      {
        q: "Quels formats sont pris en charge ?",
        a: "PDF, Word (DOCX, DOC), Excel (XLSX, XLS, CSV), PowerPoint (PPTX, PPT), OpenDocument (ODT, ODS, ODP), RTF, images (JPG, PNG, WebP, AVIF, TIFF, GIF, SVG), EPUB, TXT, HTML et d'autres encore.",
      },
      {
        q: "Y a-t-il une limite ?",
        a: "Vous pouvez traiter jusqu'à {files} fichiers à la fois, et un document produit peut compter jusqu'à {pages} pages.",
      },
    ],
    moreTools: "Autres outils",
    privacyLink: "Confidentialité",
    sourceLink: "Code source ouvert",
  },
  privacy: {
    title: "Confidentialité",
    description: "Comment pdff traite vos fichiers : aucun compte, aucun document conservé, aucune publicité ni revente de données.",
    updated: "Dernière mise à jour : {date}",
    intro: "pdff est conçu pour que vos documents restent à vous. Voici, simplement, ce qui se passe quand vous utilisez l'outil.",
    sections: [
      {
        title: "Vos fichiers",
        text: "Ils sont envoyés de façon chiffrée (HTTPS), traités automatiquement, puis supprimés dès que le résultat est prêt. Les fichiers volumineux passent par un stockage temporaire, sous un nom aléatoire, et sont effacés dès la fin du traitement ; un nettoyage automatique supprime tout ce qui aurait pu rester, dans les 24 heures au plus tard.",
      },
      {
        title: "Aucun compte, aucune donnée personnelle",
        text: "pdff ne demande ni inscription, ni adresse e-mail, ni carte bancaire. Vos documents ne sont ni lus, ni analysés, ni partagés, ni utilisés pour entraîner une intelligence artificielle.",
      },
      {
        title: "Mesure d'audience",
        text: "Nous comptons les visites de façon anonyme et sans cookie (Vercel Web Analytics) pour savoir quels outils sont utiles. Aucune publicité, aucun pistage d'un site à l'autre.",
      },
      {
        title: "Cookies",
        text: "Un seul cookie, facultatif : il retient la langue que vous avez choisie.",
      },
      {
        title: "Hébergement",
        text: "Le site est hébergé par Vercel, sur des serveurs situés à Paris ; les conversions Word, Excel et PowerPoint sont réalisées par Render, à Francfort. Ces prestataires traitent les fichiers uniquement le temps de la conversion.",
      },
      {
        title: "Contact",
        text: "Une question ou une remarque ? Écrivez-nous depuis la page du projet :",
      },
    ],
  },
  legal: {
    termsLink: "Conditions d'utilisation",
    securityLink: "Sécurité et données",
    accessibilityLink: "Accessibilité",
    terms: {
      title: "Conditions d'utilisation",
      description: "pdff est gratuit pour tous, y compris les entreprises et les administrations. Vos documents restent à vous : rien n'est analysé ni conservé.",
      intro: "Ces conditions encadrent l'utilisation de pdff. Elles sont volontairement courtes et écrites simplement. En utilisant le site, vous les acceptez.",
      sections: [
        {
          title: "Qui édite pdff",
          text: "pdff est conçu, développé et édité par Mikailou Cedric Toure, développeur établi au Nouveau-Brunswick, au Canada.",
        },
        {
          title: "Une licence d'utilisation gratuite, pour tous",
          text: "pdff est gratuit, sans inscription et sans limite de durée, pour tout le monde : particuliers, étudiants, enseignants, entreprises, associations, administrations et gouvernements, au Canada comme dans tout autre pays. Aucun usage n'est réservé à une offre payante, car il n'en existe pas. Les fichiers produits vous appartiennent entièrement : ils ne portent ni filigrane ni mention de pdff.",
        },
        {
          title: "Tous vos documents, même confidentiels",
          text: "Vous pouvez traiter tout type de document, y compris confidentiel, car pdff ne lit, n'analyse, ne conserve ni ne partage vos fichiers : ils sont traités automatiquement puis supprimés. Vous en restez propriétaire, et vous êtes responsable de disposer des droits nécessaires pour les traiter.",
        },
        {
          title: "Code source et installation sur vos propres serveurs",
          text: "Le code de pdff est publié sous licence MIT. Vous pouvez le consulter, le vérifier, l'installer sur vos propres serveurs (y compris dans un réseau fermé, sans accès à Internet), le modifier et le redistribuer gratuitement, à condition de conserver la mention de droit d'auteur et le texte de la licence.",
        },
        {
          title: "Utilisation acceptable",
          text: "Il est interdit d'utiliser pdff pour une activité illégale, de chercher à perturber le service (envois automatisés massifs, tentatives d'intrusion) ou de contourner ses limites techniques. Ces limites de taille et de nombre de fichiers protègent le service pour tous.",
        },
        {
          title: "Disponibilité",
          text: "pdff est fourni gratuitement. Il peut évoluer, être interrompu pour maintenance ou s'arrêter. Gardez toujours vos documents d'origine : pdff n'en conserve aucune copie.",
        },
        {
          title: "Garantie et responsabilité",
          text: "Le service est fourni « tel quel », sans garantie d'aucune sorte. Dans toute la mesure permise par la loi, l'éditeur n'est pas responsable des dommages indirects, des pertes de données ou d'un résultat de conversion imparfait. Vérifiez les documents produits avant de les utiliser pour une démarche importante.",
        },
        {
          title: "Propriété intellectuelle",
          text: "Le nom pdff, son logo et les textes du site appartiennent à l'éditeur ; le code est sous licence MIT comme indiqué plus haut. Les marques citées (PDF, Word, Excel, PowerPoint…) appartiennent à leurs propriétaires respectifs.",
        },
        {
          title: "Droit applicable",
          text: "Ces conditions sont régies par les lois de la province du Nouveau-Brunswick et les lois fédérales du Canada qui s'y appliquent. Les tribunaux du Nouveau-Brunswick sont compétents, sans préjudice des droits que la loi de votre pays vous garantit en tant que consommateur.",
        },
        {
          title: "Modifications",
          text: "Ces conditions peuvent être mises à jour. La date en haut de la page indique la version en vigueur ; un changement ne s'applique qu'aux utilisations qui suivent sa publication.",
        },
        {
          title: "Contact",
          text: "Une question sur ces conditions ? Écrivez depuis la page du projet :",
        },
      ],
    },
    security: {
      title: "Sécurité et données",
      description: "Ce que deviennent vos fichiers sur pdff : traitement automatique, aucune analyse, suppression immédiate, chiffrement, hébergement en Europe, installation possible sur vos serveurs.",
      intro: "Ce que deviennent vos fichiers, où ils sont traités et comment ils sont protégés : expliqué simplement, pour les particuliers comme pour les services informatiques.",
      sections: [
        {
          title: "Aucun document conservé",
          text: "Vos fichiers sont traités automatiquement, puis supprimés dès que le résultat est prêt ou téléchargé. Il n'y a ni copie, ni sauvegarde, ni historique. Un nettoyage automatique quotidien efface aussi tout fichier temporaire qui aurait pu rester, au plus tard le lendemain.",
        },
        {
          title: "Aucune analyse",
          text: "Personne ne lit vos documents. Ils ne sont ni indexés, ni analysés, ni partagés, ni utilisés pour entraîner une intelligence artificielle. pdff n'a ni compte, ni publicité, ni profil d'utilisateur.",
        },
        {
          title: "Chiffrement",
          text: "Toutes les connexions sont chiffrées (HTTPS) et le site impose le chiffrement à chaque visite (HSTS). L'outil Protéger chiffre vos PDF en AES-256 ; le mot de passe choisi n'est jamais enregistré.",
        },
        {
          title: "Où vos fichiers sont traités",
          text: "Site, outils PDF et images : Vercel, centre de données de Paris (France, Union européenne). Conversions Word, Excel et PowerPoint : Render, à Francfort (Allemagne, Union européenne). Fichiers de plus de 4 Mo : stockage temporaire Vercel Blob, sous un nom aléatoire, supprimé après usage.",
        },
        {
          title: "Protections techniques",
          text: "En-têtes de sécurité (HSTS, blocage de l'intégration du site dans d'autres pages, protection contre la confusion des types de fichiers), adresses de fichiers temporaires impossibles à deviner, service de conversion accessible uniquement avec un jeton secret. Chaque modification du code est vérifiée automatiquement (tests, contrôle des types) avant sa mise en ligne.",
        },
        {
          title: "Vie privée et lois applicables",
          text: "pdff est édité au Nouveau-Brunswick et respecte la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada. Il ne recueille aucun renseignement personnel sur ses utilisateurs : ni compte, ni adresse courriel, ni cookie de suivi. Il est conçu selon les mêmes principes que le RGPD européen et la Loi 25 du Québec : minimisation des données, aucune réutilisation, suppression après traitement.",
        },
        {
          title: "Pour les organisations aux règles strictes",
          text: "Si vos règles interdisent d'envoyer des documents à un service externe, installez pdff sur vos propres serveurs. Le logiciel complet est gratuit, open source, et fonctionne sans connexion à Internet : aucun fichier ne sort de votre réseau. Le guide d'installation est sur la page du projet.",
        },
        {
          title: "Transparence",
          text: "Le code source complet est public : vos équipes de sécurité peuvent vérifier chacune de ces affirmations.",
        },
        {
          title: "Signaler une faille",
          text: "Vous pensez avoir trouvé une faille de sécurité ? Signalez-la de façon confidentielle depuis l'onglet « Security » de la page du projet :",
        },
      ],
    },
    accessibility: {
      title: "Accessibilité",
      description: "Déclaration d'accessibilité de pdff : objectif WCAG 2.2 niveau AA, mesures en place, limites connues et comment signaler un obstacle.",
      intro: "pdff doit pouvoir être utilisé par tout le monde, y compris les personnes aveugles ou malvoyantes, sourdes ou malentendantes, ou ayant un handicap moteur ou cognitif.",
      sections: [
        {
          title: "Norme visée",
          text: "pdff vise la conformité aux Règles pour l'accessibilité des contenus Web (WCAG) 2.2, niveau AA, la norme internationale du W3C. Ce niveau couvre les exigences de la Norme sur l'accessibilité des sites Web du gouvernement du Canada, de la norme européenne EN 301 549 et de la section 508 aux États-Unis, qui renvoient aux WCAG 2.0 ou 2.1 de niveau AA.",
        },
        {
          title: "État de conformité",
          text: "pdff est partiellement conforme aux WCAG 2.2 niveau AA : les limites connues sont listées plus bas. Cette déclaration repose sur une évaluation interne réalisée le 2 octobre 2026, avec des outils automatiques (axe, Lighthouse) et des vérifications manuelles (clavier, contrastes, zoom, annonces). Aucun audit indépendant n'a encore été réalisé.",
        },
        {
          title: "Ce qui est en place",
          text: "Tout le site s'utilise au clavier, avec un lien « Aller au contenu » et un contour visible sur l'élément actif. Les contrastes de texte atteignent au moins 4,5:1. Les étapes d'un traitement (envoi, résultat, erreur) sont annoncées aux lecteurs d'écran. L'ordre des fichiers se change sans glisser-déposer, avec des boutons. Le site respecte le réglage « réduire les animations » de votre appareil, et un bouton en bas de chaque page arrête toutes les animations. Les pages restent lisibles avec un zoom à 400 % et sur mobile. La langue de chaque page est déclarée, et l'arabe s'affiche de droite à gauche.",
        },
        {
          title: "Limites connues",
          text: "L'anneau animé de la page d'accueil se manipule à la souris ou au doigt ; il est décoratif, et la liste des formats qu'il présente est aussi disponible sous forme de texte sur la page. Les langues traduites automatiquement peuvent contenir des imprécisions. Enfin, l'accessibilité d'un document produit dépend du document d'origine : pdff n'ajoute pas de balisage d'accessibilité à un PDF qui n'en contient pas.",
        },
        {
          title: "Signaler un obstacle",
          text: "Un passage du site vous pose problème ? Décrivez-le depuis la page du projet ; nous nous efforçons de répondre sous 10 jours ouvrables et de proposer une solution de remplacement si la correction prend plus de temps :",
        },
      ],
    },
  },
  tools: {
    fusionner: {
      name: "Fusionner",
      tagline: "Assembler plusieurs fichiers (PDF, Word, images…) en un seul PDF, dans l'ordre choisi.",
      seoTitle: "Fusionner des PDF en ligne gratuitement (Word, images, PDF)",
      seoDescription: "Fusionnez PDF, Word, Excel, PowerPoint et images en un seul PDF, dans l'ordre voulu. Gratuit, sans inscription ni filigrane, fichiers supprimés aussitôt.",
      intro: "Réunissez toutes vos pièces dans un seul fichier : pdff accepte des PDF, mais aussi des documents Word, des tableaux Excel, des présentations et des photos, et les assemble en un PDF propre, avec un signet par fichier.",
      options: {
        bookmarks: { label: "Ajouter un signet par fichier" },
      },
    },
    convertir: {
      name: "Convertir",
      tagline: "Convertir n'importe quel document ou image vers un autre format.",
      seoTitle: "Convertir PDF en Word, Word en PDF, JPG en PDF — gratuit",
      seoDescription: "Convertisseur gratuit : PDF ↔ Word, Excel, PowerPoint, JPG, PNG, EPUB et plus de 40 formats. En ligne, sans inscription, en haute qualité.",
      intro: "Un seul convertisseur pour tous vos formats : Word en PDF, PDF en Word, JPG en PDF, PDF en JPG, Excel en PDF, PowerPoint en PDF, PNG en JPG, EPUB en PDF… Déposez vos fichiers, pdff vous propose uniquement les formats possibles.",
      options: {
        target: { label: "Convertir en" },
        dpi: { label: "Résolution des images (DPI)" },
        quality: { label: "Qualité JPG / WebP / AVIF (1-100)" },
      },
    },
    diviser: {
      name: "Diviser",
      tagline: "Séparer un PDF en plusieurs fichiers : par plages ou page par page.",
      seoTitle: "Diviser un PDF en ligne gratuitement — séparer les pages",
      seoDescription: "Séparez un PDF en plusieurs fichiers : par plages de pages, page par page ou toutes les N pages. Gratuit, rapide et sans inscription.",
      intro: "Envoyez seulement la partie utile d'un gros document : pdff découpe votre PDF selon les plages choisies et vous rend les morceaux dans une archive ZIP.",
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
      seoTitle: "Extraire ou supprimer des pages d'un PDF — gratuit",
      seoDescription: "Gardez seulement les pages utiles d'un PDF ou retirez celles qui sont en trop. En ligne, gratuit, sans inscription ni filigrane.",
      intro: "Une page blanche, une annexe inutile, un doublon ? Indiquez les pages à garder ou à retirer (par exemple 1-3, 7, 10-fin) et récupérez un PDF propre en quelques secondes.",
      options: {
        mode: { label: "Action", choices: { keep: "Garder uniquement ces pages", remove: "Supprimer ces pages" } },
        pages: { label: "Pages", placeholder: "1, 3-5", help: "Ex. : 1-3, 5, 8-fin. Laisser vide = toutes les pages." },
      },
    },
    organiser: {
      name: "Réorganiser les pages",
      tagline: "Changer l'ordre des pages, dupliquer, inverser.",
      seoTitle: "Réorganiser les pages d'un PDF en ligne — gratuit",
      seoDescription: "Changez l'ordre des pages d'un PDF, dupliquez-en ou inversez tout le document. Gratuit, en ligne, sans inscription.",
      intro: "Des pages scannées dans le désordre ? Donnez le nouvel ordre (par exemple 3, 1, 2, 4-fin) ou inversez le document entier : pdff s'occupe du reste.",
      options: {
        order: { label: "Nouvel ordre", placeholder: "3, 1, 2, 4-fin", help: "Les pages non citées sont retirées." },
        reverse: { label: "Inverser tout le document (ignore l'ordre ci-dessus)" },
      },
    },
    pivoter: {
      name: "Pivoter",
      tagline: "Faire pivoter toutes les pages ou une sélection.",
      seoTitle: "Pivoter un PDF en ligne gratuitement",
      seoDescription: "Faites pivoter toutes les pages d'un PDF ou seulement certaines, de 90°, 180° ou 270°. Gratuit, rapide, sans inscription.",
      intro: "Un scan à l'envers ou une page en paysage ? Faites pivoter tout le document ou seulement les pages choisies, sans perte de qualité.",
      options: {
        angle: { label: "Rotation", choices: { "90": "90° sens horaire", "180": "180°", "270": "90° sens anti-horaire" } },
        pages: { label: "Pages", placeholder: "toutes", help: "Ex. : 1-3, 5, 8-fin. Laisser vide = toutes les pages." },
      },
    },
    numeroter: {
      name: "Numéroter les pages",
      tagline: "Ajouter des numéros de page.",
      seoTitle: "Numéroter les pages d'un PDF — gratuit en ligne",
      seoDescription: "Ajoutez des numéros de page à un PDF : position, format « 1 / 10 », premier numéro et taille au choix. Gratuit, sans inscription.",
      intro: "Idéal pour un mémoire, un dossier administratif ou un rapport : choisissez la position, le format et le premier numéro, pdff numérote vos pages proprement.",
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
      seoTitle: "Ajouter un filigrane à un PDF — gratuit en ligne",
      seoDescription: "Apposez un texte en filigrane (CONFIDENTIEL, COPIE, BROUILLON…) sur un PDF : taille, opacité, angle et couleur réglables. Gratuit.",
      intro: "Protégez les copies de vos pièces d'identité et justificatifs en y ajoutant une mention claire, par exemple « Copie réservée au dossier de location ».",
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
      seoTitle: "Compresser un PDF en ligne — réduire sa taille gratuitement",
      seoDescription: "Réduisez le poids d'un PDF pour l'envoyer par e-mail ou le déposer sur un site administratif. Trois niveaux de compression, gratuit.",
      intro: "Un portail refuse votre fichier parce qu'il est trop lourd ? Compressez votre PDF en gardant un texte net : choisissez sans perte, recommandé ou fort selon la taille visée.",
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
      seoTitle: "Protéger un PDF par mot de passe — gratuit (AES-256)",
      seoDescription: "Chiffrez un PDF avec un mot de passe (AES-256) et bloquez l'impression, la copie ou la modification. Gratuit, sans inscription.",
      intro: "Avant d'envoyer un bulletin de salaire ou un document médical, protégez-le par un mot de passe solide : sans lui, personne ne peut l'ouvrir.",
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
      seoTitle: "Déverrouiller un PDF — retirer le mot de passe gratuitement",
      seoDescription: "Retirez le mot de passe d'un PDF dont vous connaissez le mot de passe, pour l'ouvrir, l'imprimer ou le fusionner librement. Gratuit.",
      intro: "Vous connaissez le mot de passe, mais le taper à chaque ouverture est pénible ? Retirez-le une fois pour toutes. pdff ne contourne jamais un mot de passe inconnu.",
      options: {
        password: { label: "Mot de passe actuel", help: "Laisser vide si le PDF n'a qu'un mot de passe de restrictions." },
      },
    },
    metadonnees: {
      name: "Métadonnées",
      tagline: "Modifier le titre, l'auteur, le sujet et les mots-clés.",
      seoTitle: "Modifier les métadonnées d'un PDF (titre, auteur) — gratuit",
      seoDescription: "Changez le titre, l'auteur, le sujet et les mots-clés d'un PDF, ou effacez-les tous. Gratuit, en ligne, sans inscription.",
      intro: "Le titre affiché dans l'onglet du navigateur ou le nom d'auteur trahit un ancien modèle ? Corrigez les propriétés du document, ou effacez-les avant de le partager.",
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
    officeTooLarge: "« {name} » dépasse {mb} Mo : trop volumineux pour une conversion Word, Excel ou PowerPoint.",
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
