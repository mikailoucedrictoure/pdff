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
    advanced: "Plus de réglages (facultatif)",
    preview: "Aperçu",
    saved: "{before} → {after} : {pct} plus léger",
    savedNone: "Ce fichier était déjà bien optimisé : impossible de le réduire davantage.",
    outputLabel: "Format du résultat",
    resultName: "Nom du fichier produit",
    resultNamePlaceholder: "automatique",
    resultNameHelp: "L'extension est ajoutée toute seule.",
    previewTitle: "Aperçu",
    previewResult: "Aperçu du résultat",
    previewLoading: "Préparation de l'aperçu…",
    previewLocked: "Document protégé : saisissez le mot de passe pour voir l'aperçu.",
    previewNone: "Pas d'aperçu pour ce format.",
    previewMore: "+ {n} pages",
    previewFile: "Fichier {n}",
    previewInvalid: "Vérifiez les numéros de pages : l'aperçu se met à jour dès qu'ils sont corrects.",
    localOnly: "Traité dans votre navigateur : vos fichiers ne sont pas envoyés.",
    sigDraw: "Dessiner",
    sigType: "Écrire",
    sigUpload: "Importer",
    sigClear: "Effacer",
    sigTypePlaceholder: "Votre nom et prénom",
    sigDrawHint: "Signez dans le cadre avec la souris ou le doigt.",
    sigUploadHint: "Image de votre signature (PNG ou JPG), de préférence sur fond blanc.",
    areaHint: "Tracez un rectangle sur une page pour masquer une zone (photo, signature, tampon…).",
    areaRemove: "Retirer cette zone",
    areaCount: "Zones à masquer : {n}",
    ocrLoading: "Préparation de la lecture (téléchargement du modèle de langue)…",
    ocrProgress: "Lecture du texte : page {n} sur {total}…",
    formLoading: "Lecture des champs du formulaire…",
    formNone: "Ce PDF ne contient pas de champs à remplir. Pour écrire dessus, il faut un formulaire PDF interactif.",
    formFilled: "Champs remplis : {n} sur {total}",
    formChoose: "— Choisir —",
    formFields: "Champs du formulaire",
    compareNeedTwo: "Déposez deux PDF : d'abord l'ancienne version, puis la nouvelle.",
    compareOld: "Ancienne version",
    compareNew: "Nouvelle version",
    compareLoading: "Comparaison en cours…",
    compareSummary: "{added} mots ajoutés, {removed} mots supprimés",
    compareSame: "Aucune différence dans le texte : les deux versions disent la même chose.",
    compareLegend: "En vert : texte ajouté. En rouge barré : texte supprimé.",
    comparePages: "Pages : {a} → {b}",
    compareNoText: "Ces PDF ne contiennent pas de texte lisible (scans ?). Passez-les d'abord par l'outil OCR.",
    compareReport: "Rapport de comparaison",
    compareSkipped: "… {n} mots identiques …",
    heicConverting: "Préparation des photos d'iPhone (HEIC)…",
    sizeChange: "{from} → {to} pixels",
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
        a: "PDF, Word (DOCX, DOC), Excel (XLSX, XLS, CSV), PowerPoint (PPTX, PPT), OpenDocument (ODT, ODS, ODP), RTF, images (JPG, PNG, WebP, AVIF, HEIC d'iPhone, TIFF, GIF, SVG), EPUB, TXT, HTML et d'autres encore.",
      },
      {
        q: "Y a-t-il une limite ?",
        a: "Vous pouvez traiter jusqu'à {files} fichiers à la fois, et un document produit peut compter jusqu'à {pages} pages.",
      },
    ],
    moreTools: "Autres outils",
    privacyLink: "Confidentialité",
    sourceLink: "Code source ouvert",
    usesTitle: "À quoi ça sert ?",
    toolFaqTitle: "Questions sur cet outil",
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
          text: "Tout le site s'utilise au clavier, avec un lien « Aller au contenu » et un contour visible sur l'élément actif. Les contrastes de texte atteignent au moins 4,5:1. Les étapes d'un traitement (envoi, résultat, erreur) sont annoncées aux lecteurs d'écran. L'ordre des fichiers se change sans glisser-déposer, avec des boutons. Le site respecte le réglage « réduire les animations » de votre appareil : les animations s'arrêtent alors complètement. Les pages restent lisibles avec un zoom à 400 % et sur mobile. La langue de chaque page est déclarée, et l'arabe s'affiche de droite à gauche.",
        },
        {
          title: "Limites connues",
          text: "Sans ce réglage, les animations décoratives (fond, anneau, défilé des formats) tournent en continu ; le défilé s'arrête au survol et au clavier. L'anneau animé de la page d'accueil se manipule à la souris ou au doigt ; il est décoratif, et la liste des formats qu'il présente est aussi disponible sous forme de texte sur la page. Les langues traduites automatiquement peuvent contenir des imprécisions. Enfin, l'accessibilité d'un document produit dépend du document d'origine : pdff n'ajoute pas de balisage d'accessibilité à un PDF qui n'en contient pas.",
        },
        {
          title: "Signaler un obstacle",
          text: "Un passage du site vous pose problème ? Décrivez-le depuis la page du projet ; nous nous efforçons de répondre sous 10 jours ouvrables et de proposer une solution de remplacement si la correction prend plus de temps :",
        },
      ],
    },
    installLink: "Installer sur vos serveurs",
    install: {
      title: "pdff pour les organisations",
      description: "Installez pdff sur les serveurs de votre administration ou de votre entreprise : gratuit, open source, vos documents ne quittent jamais votre réseau.",
      intro: "Administrations, entreprises, hôpitaux, écoles : installez pdff chez vous, en quelques minutes, et gardez la maîtrise complète de vos documents.",
      sections: [
        {
          title: "Vos documents ne quittent pas votre réseau",
          text: "Tous les traitements se font sur vos propres serveurs, même sans connexion à Internet. Aucune statistique, aucun service externe, aucun compte.",
        },
        {
          title: "Tout est inclus",
          text: "Tous les outils de pdff, plus de 40 formats, LibreOffice pour Word, Excel et PowerPoint, et les 160 langues de l'interface, dans un seul conteneur.",
        },
        {
          title: "Gratuit et open source",
          text: "pdff est publié sous licence MIT : installation, utilisation et modification gratuites, sans limite d'utilisateurs. Vos équipes de sécurité peuvent auditer tout le code.",
        },
        {
          title: "Installation en 3 commandes",
          text: "Sur un serveur avec Docker (2 processeurs et 2 Go de mémoire au minimum) :",
        },
        {
          title: "Mises à jour",
          text: "Une commande suffit : docker compose pull, puis docker compose up -d. Chaque version est construite et testée automatiquement, réseau coupé, avant d'être publiée. Le guide complet (HTTPS, réseau isolé, réglages) est ici :",
        },
        {
          title: "Accompagnement",
          text: "Besoin d'aide pour l'installation, d'une version à vos couleurs, d'un contrat de support ou d'une fonctionnalité sur mesure ? Contactez le développeur :",
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
      guide: {
        keywords: "fusionner pdf, combiner pdf, assembler pdf, regrouper des pdf, mettre plusieurs pdf en un seul, fusionner word et pdf, joindre des pdf",
        uses: [
          "Envoyer un dossier complet (pièce d'identité, justificatifs, formulaires) en un seul fichier, comme le demandent la plupart des administrations.",
          "Réunir les chapitres d'un mémoire ou d'un rapport écrits dans des fichiers séparés.",
          "Assembler des photos de documents prises au téléphone en un seul PDF propre.",
        ],
        steps: [
          {
            title: "Déposez vos fichiers",
            text: "PDF, Word, Excel, images… autant qu'il en faut.",
          },
          {
            title: "Mettez-les dans l'ordre",
            text: "Faites-les glisser, ou utilisez les flèches et le tri A→Z.",
          },
          {
            title: "Cliquez sur Fusionner",
            text: "Vous téléchargez un seul PDF, avec un signet par fichier.",
          },
        ],
        faq: [
          {
            q: "Peut-on fusionner des fichiers Word et des photos avec des PDF ?",
            a: "Oui. pdff convertit automatiquement chaque fichier en PDF avant de les assembler, dans l'ordre choisi.",
          },
          {
            q: "Combien de fichiers peut-on fusionner ?",
            a: "Jusqu'à plusieurs centaines à la fois, sans filigrane ni inscription.",
          },
        ],
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
      guide: {
        keywords: "convertir pdf en word, word en pdf, jpg en pdf, pdf en jpg, excel en pdf, powerpoint en pdf, convertisseur pdf gratuit, png en pdf",
        uses: [
          "Transformer un PDF en Word pour pouvoir modifier le texte.",
          "Transformer une photo ou une capture d'écran en PDF pour l'envoyer à un organisme.",
          "Transformer un document Word, Excel ou PowerPoint en PDF pour qu'il s'affiche partout à l'identique.",
        ],
        steps: [
          {
            title: "Déposez vos fichiers",
            text: "Un ou plusieurs, de n'importe quel format courant.",
          },
          {
            title: "Choisissez le format",
            text: "pdff ne propose que les conversions possibles pour vos fichiers.",
          },
          {
            title: "Cliquez sur Convertir",
            text: "Le fichier converti se télécharge aussitôt.",
          },
        ],
        faq: [
          {
            q: "La conversion PDF vers Word garde-t-elle la mise en page ?",
            a: "Elle la garde au mieux, mais un PDF complexe (colonnes, tableaux imbriqués) peut demander quelques retouches : pdff vous prévient quand c'est le cas.",
          },
          {
            q: "Quels formats peut-on convertir ?",
            a: "Plus de 40 : PDF, Word, Excel, PowerPoint, OpenDocument, images (JPG, PNG, WebP, AVIF, HEIC…), EPUB, texte, HTML et d'autres.",
          },
        ],
      },
    },
    diviser: {
      name: "Diviser",
      tagline: "Couper un PDF en plusieurs petits fichiers.",
      seoTitle: "Diviser un PDF en ligne gratuitement — séparer les pages",
      seoDescription: "Séparez un PDF en plusieurs fichiers : par plages de pages, page par page ou toutes les N pages. Gratuit, rapide et sans inscription.",
      intro: "Déposez votre PDF, choisissez comment le couper, puis cliquez sur Diviser : vous recevez tous les morceaux dans un seul fichier ZIP.",
      options: {
        mode: {
          label: "Comment couper ?",
          choices: {
            each: "Chaque page à part",
            ranges: "Je choisis les pages",
            every: "Par paquets",
          },
          hints: {
            each: "1 page = 1 fichier. Le plus simple.",
            ranges: "Ex. : pages 1 à 3 dans un fichier, 4 à 10 dans un autre.",
            every: "Ex. : un nouveau fichier toutes les 5 pages.",
          },
        },
        ranges: {
          label: "Quelles pages ?",
          placeholder: "1-3, 4-10",
          help: "Une virgule sépare chaque fichier : « 1-3, 4-10 » donne 2 fichiers (pages 1 à 3, puis 4 à 10). Écrivez « fin » pour la dernière page.",
        },
        every: {
          label: "Combien de pages par fichier ?",
        },
      },
      guide: {
        keywords: "diviser pdf, séparer pdf, couper pdf, découper un pdf, extraire chaque page pdf, scinder pdf",
        uses: [
          "Séparer un gros scan qui contient plusieurs documents différents.",
          "Envoyer seulement une partie d'un document trop lourd.",
          "Obtenir chaque page d'un PDF dans un fichier à part, ou en images.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "L'aperçu affiche toutes ses pages.",
          },
          {
            title: "Choisissez comment couper",
            text: "Chaque page à part, par plages de pages, ou par paquets.",
          },
          {
            title: "Cliquez sur Diviser",
            text: "Vous recevez tous les morceaux dans un seul fichier ZIP.",
          },
        ],
        faq: [
          {
            q: "Puis-je choisir exactement les pages de chaque fichier ?",
            a: "Oui : écrivez par exemple « 1-3, 4-10 » pour obtenir un fichier avec les pages 1 à 3 et un autre avec les pages 4 à 10.",
          },
          {
            q: "Peut-on obtenir des images au lieu de PDF ?",
            a: "Oui : choisissez JPG ou PNG dans « Format du résultat ».",
          },
        ],
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
      guide: {
        keywords: "supprimer une page pdf, enlever des pages pdf, extraire des pages pdf, garder certaines pages pdf, retirer une page d'un pdf",
        uses: [
          "Retirer une page blanche ou en double d'un scan.",
          "Garder uniquement les pages utiles d'un long document avant de l'envoyer.",
          "Enlever une page contenant des informations personnelles.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "L'aperçu affiche toutes ses pages.",
          },
          {
            title: "Indiquez les pages",
            text: "Choisissez de les garder ou de les supprimer : l'aperçu barre les pages retirées.",
          },
          {
            title: "Cliquez sur le bouton",
            text: "Vous téléchargez le PDF allégé.",
          },
        ],
        faq: [
          {
            q: "Comment supprimer une seule page d'un PDF ?",
            a: "Choisissez « Supprimer ces pages » et écrivez son numéro, par exemple « 3 ».",
          },
          {
            q: "Le reste du document est-il modifié ?",
            a: "Non : les autres pages sont gardées telles quelles, sans perte de qualité.",
          },
        ],
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
      guide: {
        keywords: "réorganiser pages pdf, changer l'ordre des pages pdf, déplacer une page pdf, inverser pdf, trier pages pdf",
        uses: [
          "Remettre dans l'ordre des pages scannées dans le désordre.",
          "Mettre une page de garde ou un sommaire au début.",
          "Inverser un document scanné à l'envers.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "L'aperçu affiche toutes ses pages.",
          },
          {
            title: "Écrivez le nouvel ordre",
            text: "Par exemple « 3, 1, 2 » : l'aperçu montre le résultat.",
          },
          {
            title: "Cliquez sur Réorganiser les pages",
            text: "Vous téléchargez le PDF remis en ordre.",
          },
        ],
        faq: [
          {
            q: "Peut-on dupliquer une page ?",
            a: "Oui : écrivez son numéro deux fois, par exemple « 1, 2, 2, 3 ».",
          },
          {
            q: "Comment inverser tout le document ?",
            a: "Cochez « Inverser tout le document » : la dernière page devient la première.",
          },
        ],
      },
    },
    renommer: {
      name: "Renommer",
      tagline: "Changer le nom d'un ou plusieurs fichiers, sans rien envoyer.",
      seoTitle: "Renommer des fichiers en ligne — gratuit et sans envoi",
      seoDescription: "Renommez un ou plusieurs fichiers (PDF, Word, images…) en une fois, avec une numérotation automatique. Tout se passe dans votre navigateur : rien n'est envoyé.",
      intro: "Déposez vos fichiers, écrivez le nouveau nom, puis cliquez sur Renommer. Pour plusieurs fichiers, pdff ajoute un numéro : Facture-1, Facture-2… Vos fichiers ne quittent jamais votre appareil.",
      options: {
        name: {
          label: "Nouveau nom",
          placeholder: "ex. : Facture-mars",
          help: "Plusieurs fichiers ? Un numéro est ajouté, dans l'ordre de la liste.",
        },
        ext: {
          label: "Nouvelle extension",
          placeholder: "garder l'extension",
          help: "Changer l'extension ne change pas le format du fichier. Pour le transformer, utilisez Convertir.",
        },
      },
      guide: {
        keywords: "renommer des fichiers, renommer plusieurs fichiers, changer le nom d'un fichier, renommer pdf en ligne, numéroter des fichiers",
        uses: [
          "Donner des noms clairs aux pièces d'un dossier avant de les envoyer (Facture-1, Facture-2…).",
          "Renommer d'un coup des dizaines de photos ou de scans.",
          "Corriger un nom de fichier sans ouvrir d'autre logiciel.",
        ],
        steps: [
          {
            title: "Déposez vos fichiers",
            text: "De n'importe quel type, dans l'ordre souhaité.",
          },
          {
            title: "Écrivez le nouveau nom",
            text: "Un numéro est ajouté pour plusieurs fichiers ; l'aperçu montre chaque nouveau nom.",
          },
          {
            title: "Cliquez sur Renommer",
            text: "Un fichier ou une archive ZIP se télécharge.",
          },
        ],
        faq: [
          {
            q: "Mes fichiers sont-ils envoyés sur internet ?",
            a: "Non : le renommage se fait entièrement dans votre navigateur.",
          },
          {
            q: "Changer l'extension convertit-il le fichier ?",
            a: "Non. Pour changer réellement de format (par exemple de Word à PDF), utilisez l'outil Convertir.",
          },
        ],
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
      guide: {
        keywords: "pivoter pdf, tourner pdf, faire pivoter une page pdf, rotation pdf, redresser un pdf scanné",
        uses: [
          "Redresser une page scannée à l'envers ou de côté.",
          "Mettre en paysage les pages d'un tableau.",
          "Corriger l'orientation d'un document photographié au téléphone.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "L'aperçu affiche toutes ses pages.",
          },
          {
            title: "Choisissez le sens et les pages",
            text: "Quart de tour, demi-tour, sur tout le document ou certaines pages.",
          },
          {
            title: "Cliquez sur Pivoter",
            text: "Vous téléchargez le PDF redressé.",
          },
        ],
        faq: [
          {
            q: "Peut-on pivoter une seule page ?",
            a: "Oui : écrivez son numéro dans « Pages », les autres ne bougent pas.",
          },
          {
            q: "La rotation abîme-t-elle la qualité ?",
            a: "Non, la page est simplement tournée, sans être recompressée.",
          },
        ],
      },
    },
    numeroter: {
      name: "Numéroter les pages",
      tagline: "Écrire le numéro sur chaque page.",
      seoTitle: "Numéroter les pages d'un PDF — gratuit en ligne",
      seoDescription: "Ajoutez des numéros de page à un PDF : position, format « 1 / 10 », premier numéro et taille au choix. Gratuit, sans inscription.",
      intro: "Déposez votre PDF, cliquez sur l'endroit de la page où mettre le numéro, choisissez un style, puis cliquez sur Numéroter. L'aperçu montre le résultat avant de commencer.",
      options: {
        position: {
          label: "Où mettre le numéro ?",
          choices: {
            "bottom-center": "En bas, au milieu",
            "bottom-right": "En bas, à droite",
            "bottom-left": "En bas, à gauche",
            "top-center": "En haut, au milieu",
            "top-right": "En haut, à droite",
            "top-left": "En haut, à gauche",
          },
        },
        format: {
          label: "Style",
          choices: {
            nTotal: "1 / 10",
            n: "1",
            page: "Page 1",
            dash: "- 1 -",
          },
          templates: {
            nTotal: "{n} / {total}",
            n: "{n}",
            page: "Page {n}",
            dash: "- {n} -",
          },
        },
        start: {
          label: "Premier numéro",
          help: "Ex. : 3 pour commencer à compter à 3.",
        },
        size: {
          label: "Taille des chiffres",
        },
        pages: {
          label: "Pages à numéroter",
          placeholder: "toutes",
          help: "Laissez vide pour toutes les pages. « 2-fin » saute la première page.",
        },
      },
      guide: {
        keywords: "numéroter pages pdf, ajouter numéro de page pdf, paginer un pdf, numérotation pdf",
        uses: [
          "Numéroter un mémoire, un rapport ou un dossier de candidature.",
          "Ajouter « 1 / 10 » pour qu'aucune page ne manque à l'impression.",
          "Paginer des pièces avant de les déposer au tribunal ou dans une administration.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "L'aperçu affiche toutes ses pages.",
          },
          {
            title: "Cliquez sur l'endroit et le style",
            text: "Le numéro apparaît aussitôt sur chaque page de l'aperçu.",
          },
          {
            title: "Cliquez sur Numéroter les pages",
            text: "Vous téléchargez le PDF numéroté.",
          },
        ],
        faq: [
          {
            q: "Peut-on ne pas numéroter la première page ?",
            a: "Oui : dans « Plus de réglages », écrivez « 2-fin » dans « Pages à numéroter ».",
          },
          {
            q: "Peut-on commencer à un autre numéro que 1 ?",
            a: "Oui, dans « Plus de réglages », champ « Premier numéro ».",
          },
        ],
      },
    },
    filigrane: {
      name: "Filigrane",
      tagline: "Écrire « COPIE » ou « CONFIDENTIEL » en grand sur chaque page.",
      seoTitle: "Ajouter un filigrane à un PDF — gratuit en ligne",
      seoDescription: "Apposez un texte en filigrane (CONFIDENTIEL, COPIE, BROUILLON…) sur un PDF : taille, opacité, angle et couleur réglables. Gratuit.",
      intro: "Déposez votre PDF, choisissez un texte (ou écrivez le vôtre), regardez l'aperçu, puis cliquez sur Filigrane. Pratique pour protéger la copie d'une pièce d'identité.",
      options: {
        text: {
          label: "Texte à écrire",
          default: "CONFIDENTIEL",
          suggestions: ["CONFIDENTIEL", "COPIE", "BROUILLON", "NE PAS DIFFUSER"],
        },
        color: {
          label: "Couleur",
          choices: {
            gray: "Gris",
            red: "Rouge",
            blue: "Bleu",
            black: "Noir",
          },
        },
        opacity: {
          label: "Visibilité",
          choices: {
            "12": "Discret",
            "25": "Normal",
            "45": "Bien visible",
          },
        },
        rotation: {
          label: "Sens du texte",
          choices: {
            "0": "À l'horizontale",
            "45": "En diagonale",
          },
        },
        size: {
          label: "Taille maximale du texte",
          help: "Le texte est réduit tout seul s'il est trop long pour la page.",
        },
        pages: {
          label: "Pages concernées",
          placeholder: "toutes",
          help: "Laissez vide pour toutes les pages. Ex. : 1-3, 5, 8-fin.",
        },
      },
      guide: {
        keywords: "filigrane pdf, ajouter un filigrane, tampon copie pdf, marquer confidentiel pdf, protéger une copie de pièce d'identité",
        uses: [
          "Marquer la copie d'une pièce d'identité « Copie réservée à la location » pour éviter qu'on la réutilise.",
          "Indiquer « CONFIDENTIEL » ou « BROUILLON » sur un document interne.",
          "Signaler qu'un document n'est pas la version finale.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "L'aperçu affiche toutes ses pages.",
          },
          {
            title: "Choisissez le texte et le style",
            text: "Couleur, visibilité et sens : l'aperçu se met à jour en direct.",
          },
          {
            title: "Cliquez sur Filigrane",
            text: "Vous téléchargez le PDF marqué.",
          },
        ],
        faq: [
          {
            q: "Pourquoi mettre un filigrane sur une pièce d'identité ?",
            a: "Une mention comme « Copie pour le dossier X du 2 octobre » empêche qu'une copie volée soit réutilisée pour une autre démarche.",
          },
          {
            q: "Le texte du document reste-t-il lisible ?",
            a: "Oui : choisissez une visibilité « Discret » ou « Normal ».",
          },
        ],
      },
    },
    compresser: {
      name: "Compresser",
      tagline: "Rendre un PDF plus léger pour l'envoyer facilement.",
      seoTitle: "Compresser un PDF en ligne — réduire sa taille gratuitement",
      seoDescription: "Réduisez le poids d'un PDF pour l'envoyer par e-mail ou le déposer sur un site administratif. Trois niveaux de compression, gratuit.",
      intro: "Votre fichier est trop lourd pour un courriel ou un site ? Déposez-le, gardez « Recommandé » et cliquez sur Compresser. Le texte reste net.",
      options: {
        level: {
          label: "Combien réduire ?",
          choices: {
            lossless: "Léger",
            recommended: "Recommandé",
            strong: "Maximum",
          },
          hints: {
            lossless: "Qualité identique, gain modeste.",
            recommended: "Le bon choix dans la plupart des cas.",
            strong: "Le plus petit possible ; les photos deviennent un peu floues.",
          },
        },
      },
      guide: {
        keywords: "compresser pdf, réduire taille pdf, alléger un pdf, pdf trop lourd, diminuer poids pdf, compresser pdf pour email",
        uses: [
          "Envoyer un PDF trop lourd par courriel.",
          "Déposer un document sur un portail qui limite la taille (souvent 2 à 5 Mo).",
          "Gagner de la place dans vos dossiers.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "Un ou plusieurs.",
          },
          {
            title: "Gardez « Recommandé »",
            text: "Ou choisissez Léger ou Maximum selon la taille visée.",
          },
          {
            title: "Cliquez sur Compresser",
            text: "pdff affiche le gain, par exemple « 8 Mo → 2 Mo ».",
          },
        ],
        faq: [
          {
            q: "La compression rend-elle le texte flou ?",
            a: "Non : le texte reste net. Seules les images sont allégées, très peu en mode Recommandé.",
          },
          {
            q: "Mon PDF ne se réduit pas, pourquoi ?",
            a: "Il était sans doute déjà optimisé ; pdff vous le signale.",
          },
        ],
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
      guide: {
        keywords: "protéger pdf par mot de passe, chiffrer pdf, sécuriser un pdf, mettre un mot de passe sur un pdf, bloquer l'impression pdf",
        uses: [
          "Envoyer un bulletin de salaire, un dossier médical ou un contrat sans qu'un inconnu puisse l'ouvrir.",
          "Empêcher l'impression, la copie ou la modification d'un document.",
          "Respecter les règles de confidentialité de votre organisation.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "Un ou plusieurs.",
          },
          {
            title: "Choisissez un mot de passe",
            text: "Et, si besoin, ce qui est interdit : imprimer, copier, modifier.",
          },
          {
            title: "Cliquez sur Protéger",
            text: "Le PDF est chiffré en AES-256 ; transmettez le mot de passe par un autre moyen.",
          },
        ],
        faq: [
          {
            q: "Ce chiffrement est-il sûr ?",
            a: "Oui : AES-256, le niveau utilisé par les banques et les gouvernements. Sans le mot de passe, le contenu est illisible.",
          },
          {
            q: "pdff garde-t-il mon mot de passe ?",
            a: "Non, il n'est jamais enregistré. Si vous l'oubliez, personne ne pourra ouvrir le fichier.",
          },
        ],
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
      guide: {
        keywords: "déverrouiller pdf, enlever mot de passe pdf, supprimer protection pdf, débloquer pdf",
        uses: [
          "Ne plus taper le mot de passe à chaque ouverture d'un document qui vous appartient.",
          "Retirer une protection avant de fusionner ou de modifier un PDF.",
          "Archiver des documents sans risque de perdre leur mot de passe.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "Le PDF protégé.",
          },
          {
            title: "Saisissez son mot de passe",
            text: "L'aperçu s'affiche dès qu'il est correct.",
          },
          {
            title: "Cliquez sur Déverrouiller",
            text: "Vous téléchargez le PDF sans protection.",
          },
        ],
        faq: [
          {
            q: "Peut-on déverrouiller un PDF sans connaître le mot de passe ?",
            a: "Non. pdff retire uniquement la protection des documents dont vous connaissez le mot de passe.",
          },
          {
            q: "Les restrictions d'impression sont-elles aussi retirées ?",
            a: "Oui, le PDF obtenu n'a plus aucune restriction.",
          },
        ],
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
      guide: {
        keywords: "modifier métadonnées pdf, changer titre pdf, auteur pdf, propriétés pdf, effacer métadonnées pdf",
        uses: [
          "Donner un vrai titre à un PDF (celui qui s'affiche dans l'onglet du navigateur).",
          "Effacer le nom de l'auteur ou du logiciel avant de publier un document.",
          "Ajouter des mots-clés pour retrouver facilement vos documents.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "Un ou plusieurs.",
          },
          {
            title: "Remplissez les champs",
            text: "Titre, auteur, sujet, mots-clés, ou cochez « Effacer toutes les métadonnées existantes ».",
          },
          {
            title: "Cliquez sur Métadonnées",
            text: "Vous téléchargez le PDF mis à jour.",
          },
        ],
        faq: [
          {
            q: "Que sont les métadonnées d'un PDF ?",
            a: "Des informations cachées dans le fichier : titre, auteur, logiciel utilisé, dates. Elles peuvent révéler qui a créé le document.",
          },
          {
            q: "Le contenu des pages change-t-il ?",
            a: "Non, seules ces informations sont modifiées.",
          },
        ],
      },
    },
    signer: {
      name: "Signer",
      tagline: "Apposer votre signature sur un PDF.",
      seoTitle: "Signer un PDF en ligne gratuitement, sans inscription",
      seoDescription: "Dessinez, écrivez ou importez votre signature et placez-la sur votre PDF, avec la date si besoin. Gratuit, sans inscription, fichiers supprimés aussitôt.",
      intro: "Dessinez votre signature avec la souris ou le doigt (ou écrivez votre nom), choisissez la page et l'endroit, puis cliquez sur Signer. C'est une signature visuelle, comme une signature manuscrite scannée.",
      options: {
        signature: {
          label: "Votre signature",
        },
        where: {
          label: "Sur quelle page ?",
          choices: {
            last: "Dernière page",
            first: "Première page",
            all: "Toutes les pages",
            custom: "Je choisis",
          },
        },
        pages: {
          label: "Pages",
          placeholder: "ex. : 2, 5",
          help: "Ex. : 1-3, 5, 8-fin.",
        },
        position: {
          label: "Où signer ?",
          choices: {
            "bottom-center": "En bas, au milieu",
            "bottom-right": "En bas, à droite",
            "bottom-left": "En bas, à gauche",
            "top-center": "En haut, au milieu",
            "top-right": "En haut, à droite",
            "top-left": "En haut, à gauche",
          },
        },
        size: {
          label: "Taille",
          choices: {
            small: "Petite",
            medium: "Moyenne",
            large: "Grande",
          },
        },
        date: {
          label: "Ajouter la date du jour sous la signature",
        },
      },
      guide: {
        keywords: "signer un pdf, signature pdf en ligne, ajouter une signature à un pdf, signer un document gratuitement, signature manuscrite pdf",
        uses: [
          "Signer un bail, un contrat de travail ou une autorisation sans imprimer ni scanner.",
          "Ajouter votre paraphe sur chaque page d'un contrat.",
          "Signer depuis votre téléphone, avec le doigt.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "Le document à signer.",
          },
          {
            title: "Créez votre signature",
            text: "Dessinez-la, écrivez votre nom ou importez une image.",
          },
          {
            title: "Choisissez la page et l'endroit",
            text: "Vérifiez l'aperçu, puis cliquez sur Signer.",
          },
        ],
        faq: [
          {
            q: "Cette signature a-t-elle une valeur légale ?",
            a: "C'est une signature électronique simple, comme une signature manuscrite scannée : elle suffit dans la plupart des démarches courantes. Certains actes exigent une signature électronique qualifiée, avec un certificat.",
          },
          {
            q: "Ma signature est-elle conservée ?",
            a: "Non : elle sert uniquement à votre document, puis est supprimée avec lui.",
          },
        ],
      },
    },
    caviarder: {
      name: "Caviarder",
      tagline: "Effacer pour de bon des informations sensibles d'un PDF.",
      seoTitle: "Caviarder un PDF : masquer définitivement des informations",
      seoDescription: "Supprimez vraiment noms, adresses, numéros et zones d'un PDF : le contenu caché est retiré du fichier, pas seulement recouvert. Gratuit, sans inscription.",
      intro: "Écrivez les mots à faire disparaître, cochez les informations à repérer (courriels, téléphones…) ou tracez des rectangles sur les pages. pdff supprime vraiment le contenu caché : impossible de le retrouver en copiant le texte ou en retirant le rectangle noir.",
      options: {
        terms: {
          label: "Mots à faire disparaître",
          placeholder: "ex. : Dupont, 12 rue des Lilas",
          help: "Séparez par une virgule. Toutes les fois où ils apparaissent sont supprimées, majuscules ou non.",
        },
        patterns: {
          label: "Repérer automatiquement",
          choices: {
            email: "Adresses courriel",
            phone: "Numéros de téléphone",
            iban: "IBAN et numéros de compte",
            date: "Dates",
            number: "Numéros (6 chiffres ou plus)",
          },
        },
        areas: {
          label: "Zones à masquer",
        },
      },
      guide: {
        keywords: "caviarder pdf, anonymiser pdf, masquer du texte pdf, effacer des informations pdf, noircir un pdf, censurer un pdf",
        uses: [
          "Anonymiser un document avant de le publier ou de le transmettre (noms, adresses, numéros).",
          "Répondre à une demande d'accès à l'information en retirant les données protégées.",
          "Partager un relevé bancaire en cachant les numéros de compte.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "L'aperçu affiche toutes ses pages.",
          },
          {
            title: "Indiquez quoi masquer",
            text: "Écrivez des mots, cochez des types d'information ou tracez des zones sur les pages.",
          },
          {
            title: "Cliquez sur Caviarder",
            text: "Le contenu caché est supprimé du fichier, pas seulement recouvert.",
          },
        ],
        faq: [
          {
            q: "Pourquoi ne pas simplement dessiner un rectangle noir ?",
            a: "Un rectangle posé par-dessus laisse le texte dans le fichier : on peut le copier ou retirer le rectangle. Le caviardage de pdff supprime réellement le texte et les images sous la zone.",
          },
          {
            q: "Les majuscules comptent-elles ?",
            a: "Non : « Dupont » efface aussi « DUPONT » et « dupont ».",
          },
        ],
      },
    },
    ocr: {
      name: "Lire un scan",
      tagline: "Rendre le texte d'un document scanné ou photographié cherchable et copiable.",
      seoTitle: "OCR en ligne gratuit : rendre un PDF scanné cherchable",
      seoDescription: "Lisez le texte d'un PDF scanné ou d'une photo (OCR) pour pouvoir le chercher, le copier ou le faire lire à voix haute. 16 langues, gratuit, sans envoi du document.",
      intro: "Un document scanné ou photographié n'est qu'une image : on ne peut ni y chercher un mot, ni copier une phrase. Lire un scan reconnaît chaque lettre (c'est ce qu'on appelle l'OCR) et ajoute le vrai texte au document, sans changer son apparence. La lecture se fait sur votre appareil : votre document n'est pas envoyé. Seul le modèle de la langue choisie (quelques Mo) est téléchargé une fois.",
      options: {
        lang: {
          label: "Langue du document",
        },
        format: {
          label: "Résultat",
          choices: {
            pdf: "PDF cherchable",
            txt: "Texte (.txt)",
          },
          hints: {
            pdf: "Le même document, où l'on peut chercher et copier le texte.",
            txt: "Seulement le texte, pour le réutiliser ailleurs.",
          },
        },
      },
      guide: {
        keywords: "ocr en ligne, ocr gratuit, pdf scanné en texte, rendre un pdf cherchable, reconnaissance de texte, copier le texte d'un scan, image en texte",
        uses: [
          "Retrouver un mot dans un long contrat scanné avec Ctrl + F.",
          "Copier le texte d'une facture ou d'un courrier photographié.",
          "Rendre des archives papier numérisées accessibles aux personnes aveugles.",
        ],
        steps: [
          {
            title: "Déposez votre scan",
            text: "Un PDF scanné ou une photo de document.",
          },
          {
            title: "Choisissez la langue",
            text: "Celle du texte du document.",
          },
          {
            title: "Cliquez sur Lire un scan",
            text: "Vous obtenez un PDF où l'on peut chercher et copier le texte, ou un fichier texte.",
          },
        ],
        faq: [
          {
            q: "Que veut dire OCR ?",
            a: "Reconnaissance optique de caractères : l'ordinateur reconnaît les lettres dans une image pour en faire du vrai texte.",
          },
          {
            q: "Mon document est-il envoyé ?",
            a: "Non : la lecture se fait entièrement sur votre appareil. Seul le modèle de langue est téléchargé, une fois.",
          },
        ],
      },
    },
    remplir: {
      name: "Remplir un formulaire",
      tagline: "Compléter un formulaire PDF directement dans le navigateur.",
      seoTitle: "Remplir un formulaire PDF en ligne gratuitement",
      seoDescription: "Complétez les champs d'un formulaire PDF (texte, cases à cocher, listes) sans logiciel, puis téléchargez-le rempli, verrouillé si vous le souhaitez. Gratuit, sans inscription.",
      intro: "Déposez un formulaire PDF : pdff trouve tous les champs et vous les présente comme un formulaire simple. Remplissez, vérifiez l'aperçu, puis cliquez sur Remplir pour télécharger le PDF complété.",
      options: {
        values: {
          label: "Réponses",
        },
        lock: {
          label: "Verrouiller les réponses (le formulaire ne pourra plus être modifié)",
        },
      },
      guide: {
        keywords: "remplir un pdf, remplir formulaire pdf en ligne, compléter un formulaire pdf, écrire dans un pdf, formulaire pdf gratuit",
        uses: [
          "Compléter un formulaire administratif (demande, inscription, déclaration) sans l'imprimer.",
          "Remplir un formulaire depuis votre téléphone.",
          "Verrouiller vos réponses avant d'envoyer le document.",
        ],
        steps: [
          {
            title: "Déposez le formulaire",
            text: "pdff trouve tous les champs à remplir.",
          },
          {
            title: "Remplissez les champs",
            text: "L'aperçu montre vos réponses à leur place sur la page.",
          },
          {
            title: "Cliquez sur Remplir un formulaire",
            text: "Vous téléchargez le PDF complété.",
          },
        ],
        faq: [
          {
            q: "Pourquoi pdff ne trouve-t-il aucun champ ?",
            a: "Le PDF n'est pas un formulaire interactif (c'est souvent un scan). Il faut alors l'imprimer ou demander une version interactive à l'organisme.",
          },
          {
            q: "Que fait « Verrouiller les réponses » ?",
            a: "Les réponses sont intégrées à la page et ne peuvent plus être modifiées.",
          },
        ],
      },
    },
    comparer: {
      name: "Comparer",
      tagline: "Voir ce qui a changé entre deux versions d'un PDF.",
      seoTitle: "Comparer deux PDF en ligne : voir les différences",
      seoDescription: "Comparez deux versions d'un contrat ou d'un document PDF : mots ajoutés en vert, supprimés en rouge, et rapport téléchargeable. Gratuit, rien n'est envoyé.",
      intro: "Déposez l'ancienne version puis la nouvelle : les différences s'affichent aussitôt, mot par mot. Cliquez sur Comparer pour télécharger le rapport. Tout se fait dans votre navigateur.",
      options: {
        ignoreCase: {
          label: "Ignorer les majuscules et minuscules",
        },
      },
      guide: {
        keywords: "comparer deux pdf, différence entre deux pdf, comparer deux versions d'un document, comparer des contrats, trouver les modifications pdf",
        uses: [
          "Vérifier ce qui a changé dans un contrat ou un bail avant de le signer.",
          "Contrôler les corrections faites sur un rapport ou un mémoire.",
          "Comparer deux versions d'un règlement ou d'un texte officiel.",
        ],
        steps: [
          {
            title: "Déposez l'ancienne version",
            text: "Puis la nouvelle, dans cet ordre.",
          },
          {
            title: "Lisez les différences",
            text: "En vert ce qui a été ajouté, en rouge barré ce qui a été supprimé.",
          },
          {
            title: "Cliquez sur Comparer",
            text: "Vous téléchargez un rapport à garder ou à imprimer.",
          },
        ],
        faq: [
          {
            q: "Mes documents sont-ils envoyés ?",
            a: "Non : la comparaison se fait entièrement dans votre navigateur.",
          },
          {
            q: "Peut-on comparer des documents scannés ?",
            a: "Oui, après les avoir passés dans l'outil Lire un scan, qui en extrait le texte.",
          },
        ],
      },
    },
    images: {
      name: "Extraire les images",
      tagline: "Récupérer les photos et illustrations contenues dans un PDF.",
      seoTitle: "Extraire les images d'un PDF en ligne gratuitement",
      seoDescription: "Récupérez toutes les photos, illustrations et logos d'un PDF en PNG ou JPG, sans doublons. Gratuit, sans inscription, fichiers supprimés aussitôt.",
      intro: "Déposez un PDF : pdff retrouve toutes les images qu'il contient et vous les donne une par une, en PNG ou en JPG, dans une archive ZIP. Les petites images décoratives et les doublons sont écartés.",
      options: {
        format: {
          label: "Format des images",
          choices: {
            png: "PNG",
            jpg: "JPG",
          },
          hints: {
            png: "Qualité parfaite, garde la transparence.",
            jpg: "Fichiers plus légers, idéal pour les photos.",
          },
        },
        small: {
          label: "Garder aussi les petites images (icônes, puces)",
        },
      },
      guide: {
        keywords: "extraire images pdf, récupérer les images d'un pdf, enregistrer les photos d'un pdf, sortir une image d'un pdf",
        uses: [
          "Récupérer les photos d'un catalogue, d'un rapport ou d'une brochure en PDF.",
          "Réutiliser un logo ou un graphique dans une présentation.",
          "Sauvegarder les images d'un document avant de le supprimer.",
        ],
        steps: [
          {
            title: "Déposez votre PDF",
            text: "Un ou plusieurs.",
          },
          {
            title: "Choisissez PNG ou JPG",
            text: "PNG pour une qualité parfaite, JPG pour des fichiers plus légers.",
          },
          {
            title: "Cliquez sur Extraire les images",
            text: "Vous recevez toutes les images dans une archive ZIP.",
          },
        ],
        faq: [
          {
            q: "Quelle différence avec la conversion d'un PDF en JPG ?",
            a: "La conversion transforme chaque page entière en image. Extraire les images récupère seulement les photos et illustrations contenues dans les pages, dans leur taille d'origine.",
          },
          {
            q: "Pourquoi certaines images manquent-elles ?",
            a: "Les petites images (icônes, puces) sont ignorées par défaut : cochez « Garder aussi les petites images ». Un texte ou un dessin vectoriel n'est pas une image et n'est donc pas extrait.",
          },
        ],
      },
    },
    redimensionner: {
      name: "Redimensionner / recadrer",
      tagline: "Changer la taille d'une image ou la recadrer.",
      seoTitle: "Redimensionner et recadrer une image en ligne gratuitement",
      seoDescription: "Réduisez une photo (en % ou en pixels) ou recadrez-la en carré, 16:9 ou 4:3, puis enregistrez-la en JPG, PNG ou WebP. Gratuit, sans inscription.",
      intro: "Déposez vos images, choisissez de les réduire ou de les recadrer, regardez l'aperçu, puis cliquez sur Redimensionner / recadrer. Pratique pour une photo de profil, une pièce jointe trop lourde ou un formulaire qui impose une taille.",
      options: {
        mode: {
          label: "Que faire ?",
          choices: {
            resize: "Redimensionner",
            crop: "Recadrer",
          },
          hints: {
            resize: "Garder toute l'image, en plus petit.",
            crop: "Couper les bords pour obtenir un format précis.",
          },
        },
        scale: {
          label: "Nouvelle taille",
          choices: {
            "25": "25 % (quart)",
            "50": "50 % (moitié)",
            "75": "75 %",
            custom: "Taille précise en pixels",
          },
        },
        width: {
          label: "Largeur (pixels)",
        },
        height: {
          label: "Hauteur (pixels)",
          help: "0 = calculée pour garder les proportions.",
        },
        ratio: {
          label: "Format",
          choices: {
            "1:1": "Carré (1:1)",
            "4:3": "Paysage (4:3)",
            "3:4": "Portrait (3:4)",
            "16:9": "Écran large (16:9)",
            "9:16": "Vertical (9:16)",
            "3:2": "Photo (3:2)",
          },
        },
        format: {
          label: "Format du fichier",
          choices: {
            same: "Garder le format",
            jpg: "JPG",
            png: "PNG",
            webp: "WebP",
          },
        },
      },
      guide: {
        keywords: "redimensionner image, réduire taille photo, recadrer image en ligne, redimensionner photo, réduire poids image, image en carré",
        uses: [
          "Réduire une photo trop lourde pour un courriel ou un formulaire en ligne.",
          "Recadrer une photo en carré pour un profil.",
          "Préparer des images au format 16:9 pour une présentation ou un site.",
        ],
        steps: [
          {
            title: "Déposez vos images",
            text: "JPG, PNG, WebP…",
          },
          {
            title: "Choisissez la taille ou le format",
            text: "L'aperçu montre la zone gardée et la nouvelle taille.",
          },
          {
            title: "Cliquez sur Redimensionner / recadrer",
            text: "Vous téléchargez les images modifiées.",
          },
        ],
        faq: [
          {
            q: "La photo perd-elle en qualité ?",
            a: "Une image réduite contient moins de pixels, mais reste nette à sa nouvelle taille.",
          },
          {
            q: "Où se fait le recadrage ?",
            a: "Au centre de l'image : les bords sont coupés de façon égale pour obtenir le format choisi, comme le montre l'aperçu.",
          },
        ],
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
    signatureMissing: "Créez d'abord votre signature : dessinez-la, écrivez votre nom ou importez une image.",
    redactNothing: "Indiquez des mots, cochez un type d'information ou tracez une zone à masquer.",
    redactNone: "Rien à caviarder : aucun des mots ou informations demandés n'a été trouvé dans le document.",
    formNoFields: "« {name} » ne contient pas de champs de formulaire à remplir.",
    formLockUnicode: "Certaines réponses contiennent des caractères qui ne peuvent pas être figés dans la page. Décochez « Verrouiller les réponses » pour les garder modifiables.",
    noImages: "Aucune image trouvée dans ce PDF. Les textes et les dessins vectoriels ne sont pas des images.",
    notImage: "« {name} » n'est pas une image (JPG, PNG, WebP…).",
  },
};

export default fr;

/** Structure de traduction : mêmes clés que le français, valeurs texte. */
type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? Widen<U>[] : { [K in keyof T]: Widen<T[K]> };
export type Messages = Widen<typeof fr>;
export type ErrorKey = keyof Messages["errors"];
