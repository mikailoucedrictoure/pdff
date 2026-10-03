import type { Messages } from "./fr";

const de: Messages = {
  meta: {
    title: "pdff — PDF, Word, Excel kostenlos zusammenfügen, umwandeln, bearbeiten",
    description: "Kostenloses Online-Tool zum Zusammenfügen, Umwandeln, Komprimieren, Teilen und Schützen von PDF, Word, Excel, PowerPoint und Bildern. Ohne Anmeldung, Dateien sofort gelöscht.",
    keywords: "pdf zusammenfügen, pdf umwandeln, pdf in word, word in pdf, jpg in pdf, pdf in jpg, pdf komprimieren, pdf teilen, excel in pdf, kostenlose pdf tools",
  },
  nav: { merge: "Zusammenführen", convert: "Umwandeln", allTools: "Alle Werkzeuge", back: "← Alle Werkzeuge" },
  footer: {
    text: "Kostenlos, ohne Anmeldung. Ihre Dateien werden gelöscht, sobald die Verarbeitung abgeschlossen ist.",
    skip: "Zum Inhalt springen",
    legalNav: "Informationen zur Website",
    developedBy: "Konzipiert und entwickelt von {name}",
  },
  home: {
    title: "Alle Ihre Dokumente, in einem einzigen Werkzeug.",
    subtitle: "PDF, Word, Excel, PowerPoint, Bilder: in Sekunden zusammenführen, umwandeln und bearbeiten.",
    ctaMerge: "Dateien zusammenführen",
    ctaConvert: "Datei umwandeln",
    trust: "Kostenlos, ohne Anmeldung, ohne zusätzliches Wasserzeichen.",
    orbitHint: "Symbol greifen, Ring drehen, das Blatt in der Mitte antippen.",
    orbitCore: "Ring explodieren lassen",
    formatsTitle: "{n} unterstützte Formate",
    formatsSubtitle: "Die Formate, die in Behörden, Schulen und Unternehmen wirklich im Umlauf sind.",
    stepsTitle: "Drei Handgriffe, mehr nicht",
    steps: [
      { title: "Ablegen", text: "Dateien hineinziehen oder vom Handy auswählen." },
      { title: "Auswählen", text: "Reihenfolge, Zielformat oder zu behaltende Seiten festlegen." },
      { title: "Herunterladen", text: "Das Ergebnis wird automatisch heruntergeladen, versandfertig." },
    ],
  },
  categories: { organiser: "Organisieren", convertir: "Umwandeln", modifier: "Bearbeiten", securite: "Sicherheit" },
  formatCategories: {
    pdf: "PDF",
    image: "Bilder",
    document: "Textdokumente",
    spreadsheet: "Tabellen",
    presentation: "Präsentationen",
    ebook: "E-Books und feste Dokumente",
    text: "Text",
    web: "Web",
  },
  formatNames: {
    odt: "OpenDocument-Text (ODT)",
    cbz: "Comic (CBZ)",
    txt: "Text (TXT)",
    doc: "Word 97-2003 (DOC)",
    xls: "Excel 97-2003 (XLS)",
    ppt: "PowerPoint 97-2003 (PPT)",
  },
  notice: {
    officeMissingTitle: "Word-, Excel- und PowerPoint-Formate sind deaktiviert.",
    officeMissingText: "Installieren Sie LibreOffice (kostenlos), um sie zu aktivieren, und starten Sie pdff neu. Unter Windows:",
  },
  workspace: {
    dropTitle: "Dateien hier ablegen",
    dropActive: "Loslassen, los geht's",
    dropPdfOnly: "PDF-Dateien",
    dropAny: "PDF, Word, Excel, PowerPoint, Bilder, EPUB, Text…",
    choose: "Dateien auswählen",
    addMore: "Dateien hinzufügen",
    fileCount: "{n} Datei(en)",
    dragHint: "Ziehen, um die Reihenfolge zu ändern.",
    sortAZ: "A→Z sortieren",
    reverse: "Umkehren",
    clear: "Alle entfernen",
    moveUp: "Nach oben",
    moveDown: "Nach unten",
    remove: "Entfernen",
    rejected: "Format wird von diesem Werkzeug nicht unterstützt: {files}",
    settings: "Einstellungen",
    noSettings: "Keine Einstellungen nötig.",
    approximate: "Aus einem PDF wird das Layout neu aufgebaut: Das Ergebnis muss eventuell nachbearbeitet werden, vor allem bei gescannten Dokumenten.",
    targetEmpty: "Fügen Sie eine Datei hinzu, um die möglichen Formate zu sehen.",
    targetNone: "Diese Dateien haben kein gemeinsames Zielformat.",
    uploading: "Wird hochgeladen… {pct} %",
    processing: "Wird verarbeitet…",
    processingShort: "Verarbeitung…",
    cancel: "Abbrechen",
    done: "Fertig in {s} s",
    doneMany: "Fertig in {s} s, {n} Dateien (ZIP)",
    download: "Herunterladen",
    downloadResult: "✓ Ergebnis herunterladen",
    restart: "Neu beginnen",
    limits: "Bis zu {pages} Seiten und {files} Dateien pro Vorgang.",
    errorConnection: "Keine Verbindung zum Server.",
    errorGeneric: "Die Verarbeitung ist fehlgeschlagen.",
    advanced: "Weitere Einstellungen (optional)",
    preview: "Vorschau",
    saved: "{before} → {after}: {pct} kleiner",
    savedNone: "Diese Datei war bereits gut optimiert: Sie lässt sich nicht weiter verkleinern.",
    outputLabel: "Format des Ergebnisses",
    resultName: "Name der erzeugten Datei",
    resultNamePlaceholder: "automatisch",
    resultNameHelp: "Die Dateiendung wird automatisch ergänzt.",
    previewTitle: "Vorschau",
    previewResult: "Vorschau des Ergebnisses",
    previewLoading: "Vorschau wird vorbereitet…",
    previewLocked: "Geschütztes Dokument: Geben Sie das Passwort ein, um die Vorschau zu sehen.",
    previewNone: "Keine Vorschau für dieses Format.",
    previewMore: "+ {n} Seiten",
    previewFile: "Datei {n}",
    previewInvalid: "Prüfen Sie die Seitenzahlen: Die Vorschau aktualisiert sich, sobald sie gültig sind.",
    localOnly: "Wird in Ihrem Browser verarbeitet: Ihre Dateien werden nicht hochgeladen.",
    sigDraw: "Zeichnen",
    sigType: "Schreiben",
    sigUpload: "Hochladen",
    sigClear: "Löschen",
    sigTypePlaceholder: "Ihr Vor- und Nachname",
    sigDrawHint: "Unterschreiben Sie im Rahmen mit der Maus oder dem Finger.",
    sigUploadHint: "Ein Bild Ihrer Unterschrift (PNG oder JPG), am besten auf weißem Hintergrund.",
    areaHint: "Ziehen Sie ein Rechteck auf einer Seite, um einen Bereich zu verbergen (Foto, Unterschrift, Stempel…).",
    areaRemove: "Diesen Bereich entfernen",
    areaCount: "Zu verbergende Bereiche: {n}",
    ocrLoading: "Lesen wird vorbereitet (Sprachmodell wird geladen)…",
    ocrProgress: "Text wird gelesen: Seite {n} von {total}…",
    formLoading: "Formularfelder werden gelesen…",
    formNone: "Dieses PDF enthält keine ausfüllbaren Felder. Dafür ist ein interaktives PDF-Formular nötig.",
    formFilled: "Ausgefüllte Felder: {n} von {total}",
    formChoose: "— Auswählen —",
    formFields: "Formularfelder",
    compareNeedTwo: "Legen Sie zwei PDFs ab: zuerst die alte Fassung, dann die neue.",
    compareOld: "Alte Fassung",
    compareNew: "Neue Fassung",
    compareLoading: "Vergleich läuft…",
    compareSummary: "{added} Wörter hinzugefügt, {removed} Wörter entfernt",
    compareSame: "Kein Unterschied im Text: Beide Fassungen sagen dasselbe.",
    compareLegend: "Grün: hinzugefügter Text. Rot durchgestrichen: entfernter Text.",
    comparePages: "Seiten: {a} → {b}",
    compareNoText: "Diese PDFs enthalten keinen lesbaren Text (Scans?). Verarbeiten Sie sie zuerst mit dem OCR-Werkzeug.",
    compareReport: "Vergleichsbericht",
    compareSkipped: "… {n} identische Wörter …",
    heicConverting: "iPhone-Fotos (HEIC) werden vorbereitet…",
    sizeChange: "{from} → {to} Pixel",
  },
  language: {
    button: "Sprache",
    title: "Sprache wählen",
    search: "Sprache suchen…",
    verified: "Geprüfte Übersetzung",
    automatic: "Automatische Übersetzung",
    current: "Aktuelle Sprache",
    translating: "pdff wird ins {lang} übersetzt…",
    unavailable: "Die automatische Übersetzung ist auf diesem Server noch nicht aktiviert: pdff wird auf Englisch angezeigt.",
    failed: "Die Übersetzung ins {lang} ist fehlgeschlagen. Bitte später erneut versuchen.",
    noResult: "Keine passende Sprache.",
    close: "Schließen",
    auto: "Automatisch (Browsersprache)",
  },
  seo: {
    whyTitle: "Warum pdff?",
    why: [
      {
        title: "100 % kostenlos",
        text: "Kein Abo, keine Kreditkarte, kein Wasserzeichen auf Ihren Dokumenten.",
      },
      { title: "Ohne Anmeldung", text: "Kein Konto nötig: Seite öffnen, Dateien ablegen, fertig." },
      {
        title: "Ihre Dateien bleiben Ihre",
        text: "Verarbeitet und sofort gelöscht. Wir speichern weder Ihre Dokumente noch Ihre Daten.",
      },
      {
        title: "Alle Formate",
        text: "PDF, Word, Excel, PowerPoint, OpenDocument, Bilder, EPUB … am Computer oder auf dem Handy.",
      },
    ],
    howTitle: "So funktioniert's",
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Ist pdff wirklich kostenlos?",
        a: "Ja. Alle Werkzeuge sind kostenlos, ohne Wasserzeichen und ohne Funktionen hinter einem Abo. Es wird nie eine Kreditkarte verlangt.",
      },
      {
        q: "Brauche ich ein Konto?",
        a: "Nein. Keine Anmeldung, keine E-Mail-Adresse: Sie nutzen die Werkzeuge sofort.",
      },
      {
        q: "Werden meine Dokumente gespeichert?",
        a: "Nein. Ihre Dateien dienen nur der gewünschten Aufgabe und werden danach gelöscht. Niemand liest sie, und sie werden mit niemandem geteilt.",
      },
      {
        q: "Funktioniert es auf dem Handy?",
        a: "Ja. pdff läuft im Browser jedes Handys, Tablets oder Computers (Android, iPhone, Windows, Mac, Linux), ohne Installation.",
      },
      {
        q: "Welche Formate werden unterstützt?",
        a: "PDF, Word (DOCX, DOC), Excel (XLSX, XLS, CSV), PowerPoint (PPTX, PPT), OpenDocument (ODT, ODS, ODP), RTF, Bilder (JPG, PNG, WebP, AVIF, HEIC (iPhone), TIFF, GIF, SVG), EPUB, TXT, HTML und mehr.",
      },
      {
        q: "Gibt es Grenzen?",
        a: "Sie können bis zu {files} Dateien auf einmal verarbeiten, und ein erzeugtes Dokument kann bis zu {pages} Seiten haben.",
      },
    ],
    moreTools: "Weitere Werkzeuge",
    privacyLink: "Datenschutz",
    sourceLink: "Offener Quellcode",
    usesTitle: "Wofür ist das gut?",
    toolFaqTitle: "Fragen zu diesem Werkzeug",
  },
  privacy: {
    title: "Datenschutz",
    description: "Wie pdff mit Ihren Dateien umgeht: kein Konto, keine gespeicherten Dokumente, keine Werbung und kein Datenverkauf.",
    updated: "Zuletzt aktualisiert: {date}",
    intro: "pdff ist so gebaut, dass Ihre Dokumente Ihnen gehören. Hier steht in einfachen Worten, was passiert, wenn Sie es nutzen.",
    sections: [
      {
        title: "Ihre Dateien",
        text: "Sie werden verschlüsselt (HTTPS) übertragen, automatisch verarbeitet und gelöscht, sobald das Ergebnis fertig ist. Große Dateien laufen über einen temporären Speicher unter einem zufälligen Namen und werden nach der Verarbeitung gelöscht; eine automatische Bereinigung entfernt eventuelle Reste spätestens nach 24 Stunden.",
      },
      {
        title: "Kein Konto, keine persönlichen Daten",
        text: "pdff verlangt keine Anmeldung, keine E-Mail-Adresse und keine Kreditkarte. Ihre Dokumente werden weder gelesen noch analysiert, geteilt oder zum Training künstlicher Intelligenz verwendet.",
      },
      {
        title: "Reichweitenmessung",
        text: "Wir zählen Besuche anonym und ohne Cookies (Vercel Web Analytics), um zu erfahren, welche Werkzeuge nützlich sind. Keine Werbung, kein seitenübergreifendes Tracking.",
      },
      {
        title: "Cookies",
        text: "Ein einziges, optionales Cookie: Es merkt sich die gewählte Sprache.",
      },
      {
        title: "Hosting",
        text: "Die Website wird von Vercel auf Servern in Paris gehostet; Word-, Excel- und PowerPoint-Umwandlungen übernimmt Render in Frankfurt. Diese Anbieter verarbeiten Dateien nur für die Dauer der Umwandlung.",
      },
      {
        title: "Kontakt",
        text: "Eine Frage oder Anmerkung? Schreiben Sie uns über die Projektseite:",
      },
    ],
  },
  legal: {
    termsLink: "Nutzungsbedingungen",
    securityLink: "Sicherheit und Daten",
    accessibilityLink: "Barrierefreiheit",
    terms: {
      title: "Nutzungsbedingungen",
      description: "pdff ist für alle kostenlos, auch für Unternehmen und Behörden. Ihre Dokumente bleiben Ihre: Nichts wird ausgewertet oder gespeichert.",
      intro: "Diese Bedingungen regeln die Nutzung von pdff. Sie sind bewusst kurz und in einfacher Sprache gehalten. Mit der Nutzung der Website akzeptieren Sie sie.",
      sections: [
        {
          title: "Wer pdff herausgibt",
          text: "pdff wird von Mikailou Cedric Toure konzipiert, entwickelt und herausgegeben, einem Entwickler mit Sitz in New Brunswick, Kanada.",
        },
        {
          title: "Eine kostenlose Nutzungslizenz für alle",
          text: "pdff ist kostenlos, ohne Anmeldung und ohne zeitliche Begrenzung, für alle: Privatpersonen, Studierende, Lehrkräfte, Unternehmen, Vereine, Behörden und Regierungen, in Kanada wie in jedem anderen Land. Keine Nutzung ist einem kostenpflichtigen Angebot vorbehalten, denn es gibt keines. Die erzeugten Dateien gehören vollständig Ihnen: Sie tragen weder ein Wasserzeichen noch einen Hinweis auf pdff.",
        },
        {
          title: "Alle Ihre Dokumente, auch vertrauliche",
          text: "Sie können jede Art von Dokument verarbeiten, auch vertrauliche, denn pdff liest, analysiert, speichert und teilt Ihre Dateien nicht: Sie werden automatisch verarbeitet und anschließend gelöscht. Sie bleiben Eigentümer und sind dafür verantwortlich, über die nötigen Rechte zur Verarbeitung zu verfügen.",
        },
        {
          title: "Quellcode und Installation auf Ihren eigenen Servern",
          text: "Der Code von pdff ist unter der MIT-Lizenz veröffentlicht. Sie dürfen ihn einsehen, prüfen, auf Ihren eigenen Servern installieren (auch in einem geschlossenen Netz ohne Internetzugang), verändern und kostenlos weitergeben, sofern Sie den Urheberrechtsvermerk und den Lizenztext beibehalten.",
        },
        {
          title: "Zulässige Nutzung",
          text: "Es ist untersagt, pdff für rechtswidrige Zwecke zu nutzen, den Dienst zu stören (massenhafte automatisierte Uploads, Angriffsversuche) oder seine technischen Grenzen zu umgehen. Die Grenzen bei Dateigröße und Dateianzahl schützen den Dienst für alle.",
        },
        {
          title: "Verfügbarkeit",
          text: "pdff wird kostenlos bereitgestellt. Der Dienst kann sich ändern, für Wartungsarbeiten unterbrochen oder eingestellt werden. Bewahren Sie Ihre Originaldokumente immer auf: pdff behält keine Kopie.",
        },
        {
          title: "Gewährleistung und Haftung",
          text: "Der Dienst wird „wie besehen“ und ohne jegliche Gewährleistung bereitgestellt. Soweit gesetzlich zulässig, haftet der Herausgeber nicht für mittelbare Schäden, Datenverluste oder ein unvollkommenes Konvertierungsergebnis. Prüfen Sie die erzeugten Dokumente, bevor Sie sie für wichtige Vorgänge verwenden.",
        },
        {
          title: "Geistiges Eigentum",
          text: "Der Name pdff, sein Logo und die Texte der Website gehören dem Herausgeber; der Code steht, wie oben angegeben, unter der MIT-Lizenz. Die genannten Marken (PDF, Word, Excel, PowerPoint …) gehören ihren jeweiligen Inhabern.",
        },
        {
          title: "Anwendbares Recht",
          text: "Diese Bedingungen unterliegen den Gesetzen der Provinz New Brunswick und den dort geltenden Bundesgesetzen Kanadas. Zuständig sind die Gerichte von New Brunswick, unbeschadet der Rechte, die Ihnen das Recht Ihres Landes als Verbraucher garantiert.",
        },
        {
          title: "Änderungen",
          text: "Diese Bedingungen können aktualisiert werden. Das Datum oben auf der Seite zeigt die geltende Fassung; eine Änderung gilt nur für die Nutzung nach ihrer Veröffentlichung.",
        },
        {
          title: "Kontakt",
          text: "Eine Frage zu diesen Bedingungen? Schreiben Sie uns über die Projektseite:",
        },
      ],
    },
    security: {
      title: "Sicherheit und Daten",
      description: "Was mit Ihren Dateien bei pdff geschieht: automatische Verarbeitung, keine Auswertung, sofortige Löschung, Verschlüsselung, Hosting in Europa und Installation auf eigenen Servern möglich.",
      intro: "Was mit Ihren Dateien geschieht, wo sie verarbeitet und wie sie geschützt werden: einfach erklärt, für Privatpersonen ebenso wie für IT-Abteilungen.",
      sections: [
        {
          title: "Keine Dokumente gespeichert",
          text: "Ihre Dateien werden automatisch verarbeitet und gelöscht, sobald das Ergebnis fertig ist oder heruntergeladen wurde. Es gibt keine Kopie, keine Sicherung und keinen Verlauf. Eine tägliche automatische Bereinigung löscht zudem jede temporäre Datei, die übrig geblieben sein könnte, spätestens am folgenden Tag.",
        },
        {
          title: "Keine Auswertung",
          text: "Niemand liest Ihre Dokumente. Sie werden weder indexiert noch analysiert, geteilt oder zum Training künstlicher Intelligenz verwendet. pdff hat keine Konten, keine Werbung und keine Nutzerprofile.",
        },
        {
          title: "Verschlüsselung",
          text: "Alle Verbindungen sind verschlüsselt (HTTPS), und die Website erzwingt die Verschlüsselung bei jedem Besuch (HSTS). Das Werkzeug Schützen verschlüsselt Ihre PDFs mit AES-256; das gewählte Passwort wird nie gespeichert.",
        },
        {
          title: "Wo Ihre Dateien verarbeitet werden",
          text: "Website, PDF- und Bildwerkzeuge: Vercel, Rechenzentrum Paris (Frankreich, Europäische Union). Word-, Excel- und PowerPoint-Konvertierungen: Render in Frankfurt (Deutschland, Europäische Union). Dateien über 4 MB: temporärer Speicher Vercel Blob unter einem zufälligen Namen, nach der Verwendung gelöscht.",
        },
        {
          title: "Technische Schutzmaßnahmen",
          text: "Sicherheits-Header (HSTS, Sperre gegen das Einbetten der Website in fremde Seiten, Schutz vor Verwechslung von Dateitypen), nicht erratbare Adressen für temporäre Dateien und ein Konvertierungsdienst, der nur mit einem geheimen Token erreichbar ist. Jede Codeänderung wird vor der Veröffentlichung automatisch geprüft (Tests, Typprüfung).",
        },
        {
          title: "Datenschutz und anwendbares Recht",
          text: "pdff wird in New Brunswick herausgegeben und hält das kanadische Gesetz zum Schutz personenbezogener Informationen und elektronischer Dokumente (PIPEDA) ein. Es erhebt keine personenbezogenen Daten seiner Nutzer: kein Konto, keine E-Mail-Adresse, kein Tracking-Cookie. Es folgt denselben Grundsätzen wie die europäische DSGVO und das Gesetz 25 von Québec: Datenminimierung, keine Weiterverwendung, Löschung nach der Verarbeitung.",
        },
        {
          title: "Für Organisationen mit strengen Vorgaben",
          text: "Wenn Ihre Vorgaben verbieten, Dokumente an einen externen Dienst zu senden, installieren Sie pdff auf Ihren eigenen Servern. Die vollständige Software ist kostenlos, quelloffen und funktioniert ohne Internetverbindung: Keine Datei verlässt Ihr Netzwerk. Die Installationsanleitung finden Sie auf der Projektseite.",
        },
        {
          title: "Transparenz",
          text: "Der vollständige Quellcode ist öffentlich: Ihre Sicherheitsteams können jede dieser Aussagen überprüfen.",
        },
        {
          title: "Sicherheitslücke melden",
          text: "Sie glauben, eine Sicherheitslücke gefunden zu haben? Melden Sie sie vertraulich über den Reiter „Security“ der Projektseite:",
        },
      ],
    },
    accessibility: {
      title: "Barrierefreiheit",
      description: "Erklärung zur Barrierefreiheit von pdff: Ziel WCAG 2.2 Stufe AA, umgesetzte Maßnahmen, bekannte Einschränkungen und wie Sie eine Barriere melden.",
      intro: "Alle sollen pdff nutzen können, auch blinde oder sehbehinderte, gehörlose oder schwerhörige Menschen sowie Menschen mit motorischen oder kognitiven Beeinträchtigungen.",
      sections: [
        {
          title: "Angestrebter Standard",
          text: "pdff strebt die Konformität mit den Richtlinien für barrierefreie Webinhalte (WCAG) 2.2, Stufe AA, an, dem internationalen Standard des W3C. Diese Stufe deckt die Anforderungen des Standards für Web-Barrierefreiheit der kanadischen Regierung, der europäischen Norm EN 301 549 und von Section 508 in den USA ab, die auf WCAG 2.0 oder 2.1 Stufe AA verweisen.",
        },
        {
          title: "Stand der Konformität",
          text: "pdff ist teilweise konform mit WCAG 2.2 Stufe AA: Die bekannten Einschränkungen sind unten aufgeführt. Diese Erklärung beruht auf einer internen Bewertung vom 2. Oktober 2026 mit automatischen Werkzeugen (axe, Lighthouse) und manuellen Prüfungen (Tastatur, Kontraste, Zoom, Ansagen). Ein unabhängiges Audit wurde noch nicht durchgeführt.",
        },
        {
          title: "Umgesetzte Maßnahmen",
          text: "Die gesamte Website ist per Tastatur bedienbar, mit einem Link „Zum Inhalt springen“ und einer sichtbaren Umrandung des aktiven Elements. Der Textkontrast beträgt mindestens 4,5:1. Die Schritte einer Aufgabe (Upload, Ergebnis, Fehler) werden Screenreadern angesagt. Die Reihenfolge der Dateien lässt sich ohne Ziehen und Ablegen über Schaltflächen ändern. Die Website beachtet die Einstellung „Bewegung reduzieren“ Ihres Geräts: Die Animationen stoppen dann vollständig. Die Seiten bleiben bei 400 % Zoom und auf dem Smartphone lesbar. Die Sprache jeder Seite ist ausgezeichnet, und Arabisch wird von rechts nach links angezeigt.",
        },
        {
          title: "Bekannte Einschränkungen",
          text: "Ohne diese Einstellung laufen dekorative Animationen (Hintergrund, Ring, Formatlaufband) dauerhaft; das Laufband hält bei Mauszeiger und Tastaturfokus an. Der animierte Ring auf der Startseite wird mit der Maus oder dem Finger bedient; er ist dekorativ, und die Liste der gezeigten Formate steht auf der Seite auch als Text zur Verfügung. Maschinell übersetzte Sprachen können Ungenauigkeiten enthalten. Zudem hängt die Barrierefreiheit eines erzeugten Dokuments vom Original ab: pdff fügt einem PDF ohne Tags keine Barrierefreiheits-Tags hinzu.",
        },
        {
          title: "Barriere melden",
          text: "Bereitet Ihnen ein Teil der Website Probleme? Beschreiben Sie ihn über die Projektseite; wir bemühen uns, innerhalb von 10 Werktagen zu antworten und eine Alternative anzubieten, wenn die Korrektur länger dauert:",
        },
      ],
    },
    installLink: "Auf eigenen Servern installieren",
    install: {
      title: "pdff für Organisationen",
      description: "Installieren Sie pdff auf den Servern Ihrer Behörde oder Ihres Unternehmens: kostenlos, quelloffen, und Ihre Dokumente verlassen nie Ihr Netzwerk.",
      intro: "Behörden, Unternehmen, Krankenhäuser, Schulen: Installieren Sie pdff in wenigen Minuten bei sich und behalten Sie die volle Kontrolle über Ihre Dokumente.",
      sections: [
        {
          title: "Ihre Dokumente bleiben in Ihrem Netzwerk",
          text: "Die gesamte Verarbeitung findet auf Ihren eigenen Servern statt, auch ohne Internetverbindung. Keine Statistiken, keine externen Dienste, keine Konten.",
        },
        {
          title: "Alles inklusive",
          text: "Alle Werkzeuge von pdff, mehr als 40 Formate, LibreOffice für Word, Excel und PowerPoint sowie alle 160 Sprachen der Oberfläche in einem einzigen Container.",
        },
        {
          title: "Kostenlos und quelloffen",
          text: "pdff steht unter der MIT-Lizenz: kostenlose Installation, Nutzung und Anpassung ohne Nutzerbegrenzung. Ihre Sicherheitsteams können den gesamten Code prüfen.",
        },
        {
          title: "Installation mit 3 Befehlen",
          text: "Auf einem Server mit Docker (mindestens 2 Prozessoren und 2 GB Arbeitsspeicher):",
        },
        {
          title: "Aktualisierungen",
          text: "Ein Befehl genügt: docker compose pull, dann docker compose up -d. Jede Version wird vor der Veröffentlichung automatisch ohne Netzwerk gebaut und getestet. Die vollständige Anleitung (HTTPS, isolierte Netze, Einstellungen) finden Sie hier:",
        },
        {
          title: "Unterstützung",
          text: "Brauchen Sie Hilfe bei der Installation, eine Version in Ihren Farben, einen Supportvertrag oder eine maßgeschneiderte Funktion? Kontaktieren Sie den Entwickler:",
        },
      ],
    },
  },
  tools: {
    fusionner: {
      name: "Zusammenführen",
      tagline: "Mehrere Dateien (PDF, Word, Bilder…) in der gewünschten Reihenfolge zu einem PDF vereinen.",
      seoTitle: "PDF online kostenlos zusammenfügen (Word, Bilder, PDF)",
      seoDescription: "Fügen Sie PDF, Word, Excel, PowerPoint und Bilder in der gewünschten Reihenfolge zu einem PDF zusammen. Kostenlos, ohne Anmeldung und Wasserzeichen.",
      intro: "Alle Unterlagen in einer Datei: pdff nimmt PDFs, aber auch Word-Dokumente, Excel-Tabellen, Präsentationen und Fotos an und fügt sie zu einem sauberen PDF mit einem Lesezeichen pro Datei zusammen.",
      options: { bookmarks: { label: "Ein Lesezeichen pro Datei hinzufügen" } },
      guide: {
        keywords: "pdf zusammenführen, pdf zusammenfügen, pdf kombinieren, mehrere pdf zu einem, word und pdf zusammenführen",
        uses: [
          "Eine vollständige Bewerbung oder einen Antrag (Ausweis, Nachweise, Formulare) als eine einzige Datei senden, wie es die meisten Behörden verlangen.",
          "Die Kapitel einer Abschlussarbeit oder eines Berichts aus getrennten Dateien zusammenführen.",
          "Handyfotos von Dokumenten in ein sauberes PDF verwandeln.",
        ],
        steps: [
          {
            title: "Dateien ablegen",
            text: "PDF, Word, Excel, Bilder… so viele wie nötig.",
          },
          {
            title: "Reihenfolge festlegen",
            text: "Ziehen oder mit den Pfeilen und der A→Z-Sortierung ordnen.",
          },
          {
            title: "Auf Zusammenführen klicken",
            text: "Sie laden ein einziges PDF mit einem Lesezeichen pro Datei herunter.",
          },
        ],
        faq: [
          {
            q: "Kann ich Word-Dateien und Fotos mit PDFs zusammenführen?",
            a: "Ja. pdff wandelt jede Datei automatisch in PDF um und fügt sie in der gewählten Reihenfolge zusammen.",
          },
          {
            q: "Wie viele Dateien kann ich zusammenführen?",
            a: "Bis zu mehreren hundert auf einmal, ohne Wasserzeichen und ohne Anmeldung.",
          },
        ],
      },
    },
    convertir: {
      name: "Umwandeln",
      tagline: "Beliebige Dokumente oder Bilder in ein anderes Format umwandeln.",
      seoTitle: "PDF in Word, Word in PDF, JPG in PDF umwandeln — kostenlos",
      seoDescription: "Kostenloser Konverter: PDF ↔ Word, Excel, PowerPoint, JPG, PNG, EPUB und über 40 Formate. Online, ohne Anmeldung, in hoher Qualität.",
      intro: "Ein Konverter für alle Formate: Word in PDF, PDF in Word, JPG in PDF, PDF in JPG, Excel in PDF, PowerPoint in PDF, PNG in JPG, EPUB in PDF … Dateien ablegen, und pdff zeigt nur die möglichen Formate an.",
      options: {
        target: { label: "Umwandeln in" },
        dpi: { label: "Bildauflösung (DPI)" },
        quality: { label: "Qualität JPG / WebP / AVIF (1-100)" },
      },
      guide: {
        keywords: "pdf in word umwandeln, word in pdf, jpg in pdf, pdf in jpg, excel in pdf, powerpoint in pdf, pdf konverter kostenlos",
        uses: [
          "Ein PDF in Word umwandeln, um den Text zu bearbeiten.",
          "Ein Foto oder einen Screenshot als PDF an eine Stelle senden.",
          "Ein Word-, Excel- oder PowerPoint-Dokument in PDF umwandeln, damit es überall gleich aussieht.",
        ],
        steps: [
          {
            title: "Dateien ablegen",
            text: "Eine oder mehrere, in jedem gängigen Format.",
          },
          {
            title: "Format wählen",
            text: "pdff bietet nur die für Ihre Dateien möglichen Umwandlungen an.",
          },
          {
            title: "Auf Umwandeln klicken",
            text: "Die umgewandelte Datei wird sofort heruntergeladen.",
          },
        ],
        faq: [
          {
            q: "Bleibt das Layout bei PDF zu Word erhalten?",
            a: "So gut wie möglich; ein komplexes PDF (Spalten, verschachtelte Tabellen) kann Nacharbeit brauchen – pdff weist Sie darauf hin.",
          },
          {
            q: "Welche Formate lassen sich umwandeln?",
            a: "Mehr als 40: PDF, Word, Excel, PowerPoint, OpenDocument, Bilder (JPG, PNG, WebP, AVIF, HEIC…), EPUB, Text, HTML und mehr.",
          },
        ],
      },
    },
    diviser: {
      name: "Teilen",
      tagline: "Ein PDF in mehrere kleine Dateien aufteilen.",
      seoTitle: "PDF online kostenlos teilen — Seiten trennen",
      seoDescription: "Teilen Sie ein PDF in mehrere Dateien: nach Seitenbereichen, Seite für Seite oder alle N Seiten. Kostenlos, schnell, ohne Anmeldung.",
      intro: "Legen Sie Ihr PDF ab, wählen Sie, wie es geteilt wird, und klicken Sie auf Teilen: Sie erhalten alle Teile in einer einzigen ZIP-Datei.",
      options: {
        mode: {
          label: "Wie aufteilen?",
          choices: {
            each: "Jede Seite einzeln",
            ranges: "Ich wähle die Seiten",
            every: "In Paketen",
          },
          hints: {
            each: "1 Seite = 1 Datei. Am einfachsten.",
            ranges: "Z. B. Seiten 1 bis 3 in eine Datei, 4 bis 10 in eine andere.",
            every: "Z. B. alle 5 Seiten eine neue Datei.",
          },
        },
        ranges: {
          label: "Welche Seiten?",
          placeholder: "1-3, 4-10",
          help: "Ein Komma trennt die Dateien: „1-3, 4-10“ ergibt 2 Dateien (Seiten 1 bis 3, dann 4 bis 10). Schreiben Sie „ende“ für die letzte Seite.",
        },
        every: {
          label: "Wie viele Seiten pro Datei?",
        },
      },
      guide: {
        keywords: "pdf teilen, pdf aufteilen, pdf trennen, pdf seiten trennen, jede seite eines pdf einzeln",
        uses: [
          "Einen großen Scan mit mehreren Dokumenten auftrennen.",
          "Nur einen Teil eines zu großen Dokuments senden.",
          "Jede Seite eines PDFs als eigene Datei oder als Bild erhalten.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Die Vorschau zeigt alle Seiten.",
          },
          {
            title: "Aufteilung wählen",
            text: "Jede Seite einzeln, nach Seitenbereichen oder in Paketen.",
          },
          {
            title: "Auf Teilen klicken",
            text: "Sie erhalten alle Teile in einer einzigen ZIP-Datei.",
          },
        ],
        faq: [
          {
            q: "Kann ich die Seiten jeder Datei genau festlegen?",
            a: "Ja: Schreiben Sie z. B. „1-3, 4-10“ für eine Datei mit den Seiten 1 bis 3 und eine mit den Seiten 4 bis 10.",
          },
          {
            q: "Kann ich Bilder statt PDFs erhalten?",
            a: "Ja: Wählen Sie JPG oder PNG unter „Format des Ergebnisses“.",
          },
        ],
      },
    },
    extraire: {
      name: "Seiten extrahieren / löschen",
      tagline: "Bestimmte Seiten eines PDFs behalten oder entfernen.",
      seoTitle: "Seiten aus PDF extrahieren oder löschen — kostenlos",
      seoDescription: "Behalten Sie nur die nötigen Seiten eines PDFs oder entfernen Sie überflüssige. Online, kostenlos, ohne Anmeldung und Wasserzeichen.",
      intro: "Eine leere Seite, ein unnötiger Anhang, ein Duplikat? Geben Sie die Seiten an, die bleiben oder weg sollen (zum Beispiel 1-3, 7, 10-ende), und erhalten Sie in Sekunden ein sauberes PDF.",
      options: {
        mode: { label: "Aktion", choices: { keep: "Nur diese Seiten behalten", remove: "Diese Seiten löschen" } },
        pages: { label: "Seiten", placeholder: "1, 3-5", help: "Z. B. 1-3, 5, 8-ende. Leer = alle Seiten." },
      },
      guide: {
        keywords: "pdf seiten löschen, seiten aus pdf entfernen, pdf seiten extrahieren, bestimmte seiten behalten",
        uses: [
          "Eine leere oder doppelte Seite aus einem Scan entfernen.",
          "Nur die nützlichen Seiten eines langen Dokuments vor dem Versand behalten.",
          "Eine Seite mit persönlichen Daten entfernen.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Die Vorschau zeigt alle Seiten.",
          },
          {
            title: "Seiten angeben",
            text: "Behalten oder löschen: Die Vorschau streicht entfernte Seiten durch.",
          },
          {
            title: "Auf die Schaltfläche klicken",
            text: "Sie laden das schlankere PDF herunter.",
          },
        ],
        faq: [
          {
            q: "Wie lösche ich eine einzelne Seite?",
            a: "Wählen Sie „Diese Seiten löschen“ und geben Sie die Nummer ein, z. B. „3“.",
          },
          {
            q: "Wird der Rest des Dokuments verändert?",
            a: "Nein: Die übrigen Seiten bleiben unverändert, ohne Qualitätsverlust.",
          },
        ],
      },
    },
    organiser: {
      name: "Seiten neu anordnen",
      tagline: "Seitenreihenfolge ändern, duplizieren, umkehren.",
      seoTitle: "PDF-Seiten online neu anordnen — kostenlos",
      seoDescription: "Ändern Sie die Reihenfolge der Seiten eines PDFs, duplizieren Sie Seiten oder kehren Sie das ganze Dokument um. Kostenlos, ohne Anmeldung.",
      intro: "Seiten in falscher Reihenfolge gescannt? Geben Sie die neue Reihenfolge an (zum Beispiel 3, 1, 2, 4-ende) oder kehren Sie das Dokument um: pdff erledigt den Rest.",
      options: {
        order: { label: "Neue Reihenfolge", placeholder: "3, 1, 2, 4-ende", help: "Nicht genannte Seiten werden entfernt." },
        reverse: { label: "Gesamtes Dokument umkehren (ignoriert die Reihenfolge oben)" },
      },
      guide: {
        keywords: "pdf seiten neu anordnen, reihenfolge pdf ändern, pdf seite verschieben, pdf umkehren",
        uses: [
          "Durcheinander gescannte Seiten wieder ordnen.",
          "Ein Deckblatt oder Inhaltsverzeichnis an den Anfang setzen.",
          "Ein falsch herum gescanntes Dokument umkehren.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Die Vorschau zeigt alle Seiten.",
          },
          {
            title: "Neue Reihenfolge eingeben",
            text: "Zum Beispiel „3, 1, 2“: Die Vorschau zeigt das Ergebnis.",
          },
          {
            title: "Auf Seiten neu anordnen klicken",
            text: "Sie laden das geordnete PDF herunter.",
          },
        ],
        faq: [
          {
            q: "Kann ich eine Seite verdoppeln?",
            a: "Ja: Geben Sie ihre Nummer zweimal ein, z. B. „1, 2, 2, 3“.",
          },
          {
            q: "Wie kehre ich das ganze Dokument um?",
            a: "Aktivieren Sie die Umkehr-Option: Die letzte Seite wird zur ersten.",
          },
        ],
      },
    },
    renommer: {
      name: "Umbenennen",
      tagline: "Den Namen einer oder mehrerer Dateien ändern, ohne etwas hochzuladen.",
      seoTitle: "Dateien online umbenennen — kostenlos, ohne Upload",
      seoDescription: "Benennen Sie eine oder viele Dateien (PDF, Word, Bilder…) auf einmal um, mit automatischer Nummerierung. Alles geschieht in Ihrem Browser: Nichts wird hochgeladen.",
      intro: "Legen Sie Ihre Dateien ab, geben Sie den neuen Namen ein und klicken Sie auf Umbenennen. Bei mehreren Dateien fügt pdff eine Nummer hinzu: Rechnung-1, Rechnung-2… Ihre Dateien verlassen Ihr Gerät nie.",
      options: {
        name: {
          label: "Neuer Name",
          placeholder: "z. B. Rechnung-Maerz",
          help: "Mehrere Dateien? Eine Nummer wird in der Reihenfolge der Liste angehängt.",
        },
        ext: {
          label: "Neue Dateiendung",
          placeholder: "Endung beibehalten",
          help: "Eine andere Endung ändert nicht das Dateiformat. Zum Umwandeln nutzen Sie Umwandeln.",
        },
      },
      guide: {
        keywords: "dateien umbenennen, mehrere dateien umbenennen, dateiname ändern, pdf online umbenennen",
        uses: [
          "Den Unterlagen eines Antrags klare Namen geben (Rechnung-1, Rechnung-2…).",
          "Dutzende Fotos oder Scans auf einmal umbenennen.",
          "Einen Dateinamen ohne andere Software korrigieren.",
        ],
        steps: [
          {
            title: "Dateien ablegen",
            text: "Beliebigen Typs, in der gewünschten Reihenfolge.",
          },
          {
            title: "Neuen Namen eingeben",
            text: "Bei mehreren Dateien wird eine Nummer angehängt; die Vorschau zeigt jeden neuen Namen.",
          },
          {
            title: "Auf Umbenennen klicken",
            text: "Eine Datei oder ein ZIP-Archiv wird heruntergeladen.",
          },
        ],
        faq: [
          {
            q: "Werden meine Dateien hochgeladen?",
            a: "Nein: Das Umbenennen geschieht vollständig in Ihrem Browser.",
          },
          {
            q: "Wandelt eine neue Endung die Datei um?",
            a: "Nein. Um das Format wirklich zu ändern (z. B. von Word zu PDF), nutzen Sie das Werkzeug Umwandeln.",
          },
        ],
      },
    },
    pivoter: {
      name: "Drehen",
      tagline: "Alle oder ausgewählte Seiten drehen.",
      seoTitle: "PDF online kostenlos drehen",
      seoDescription: "Drehen Sie alle Seiten eines PDFs oder nur einige um 90°, 180° oder 270°. Kostenlos, schnell, ohne Anmeldung.",
      intro: "Ein Scan steht auf dem Kopf oder eine Seite ist quer? Drehen Sie das ganze Dokument oder nur ausgewählte Seiten, ohne Qualitätsverlust.",
      options: {
        angle: { label: "Drehung", choices: { "90": "90° im Uhrzeigersinn", "180": "180°", "270": "90° gegen den Uhrzeigersinn" } },
        pages: { label: "Seiten", placeholder: "alle", help: "Z. B. 1-3, 5, 8-ende. Leer = alle Seiten." },
      },
      guide: {
        keywords: "pdf drehen, pdf seite drehen, pdf rotieren, gescanntes pdf gerade richten",
        uses: [
          "Eine kopfüber oder seitlich gescannte Seite gerade richten.",
          "Tabellenseiten ins Querformat drehen.",
          "Die Ausrichtung eines mit dem Handy fotografierten Dokuments korrigieren.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Die Vorschau zeigt alle Seiten.",
          },
          {
            title: "Richtung und Seiten wählen",
            text: "Viertel- oder halbe Drehung, für das ganze Dokument oder einzelne Seiten.",
          },
          {
            title: "Auf Drehen klicken",
            text: "Sie laden das gerade gerichtete PDF herunter.",
          },
        ],
        faq: [
          {
            q: "Kann ich nur eine Seite drehen?",
            a: "Ja: Geben Sie ihre Nummer unter „Seiten“ ein; die anderen bleiben unverändert.",
          },
          {
            q: "Verschlechtert das Drehen die Qualität?",
            a: "Nein, die Seite wird nur gedreht, nicht neu komprimiert.",
          },
        ],
      },
    },
    numeroter: {
      name: "Seiten nummerieren",
      tagline: "Die Nummer auf jede Seite schreiben.",
      seoTitle: "Seitenzahlen in PDF einfügen — kostenlos online",
      seoDescription: "Fügen Sie einem PDF Seitenzahlen hinzu: Position, Format „1 / 10“, Startnummer und Größe frei wählbar. Kostenlos, ohne Anmeldung.",
      intro: "Legen Sie Ihr PDF ab, klicken Sie auf die Stelle der Seite, an der die Nummer stehen soll, wählen Sie einen Stil und klicken Sie auf Nummerieren. Die Vorschau zeigt das Ergebnis vorab.",
      options: {
        position: {
          label: "Wo soll die Nummer stehen?",
          choices: {
            "bottom-center": "Unten, Mitte",
            "bottom-right": "Unten, rechts",
            "bottom-left": "Unten, links",
            "top-center": "Oben, Mitte",
            "top-right": "Oben, rechts",
            "top-left": "Oben, links",
          },
        },
        format: {
          label: "Stil",
          choices: {
            nTotal: "1 / 10",
            n: "1",
            page: "Seite 1",
            dash: "- 1 -",
          },
          templates: {
            nTotal: "{n} / {total}",
            n: "{n}",
            page: "Seite {n}",
            dash: "- {n} -",
          },
        },
        start: {
          label: "Erste Nummer",
          help: "Z. B. 3, um bei 3 zu beginnen.",
        },
        size: {
          label: "Größe der Zahlen",
        },
        pages: {
          label: "Zu nummerierende Seiten",
          placeholder: "alle",
          help: "Leer lassen für alle Seiten. „2-ende“ überspringt die erste Seite.",
        },
      },
      guide: {
        keywords: "pdf seitenzahlen hinzufügen, pdf seiten nummerieren, pdf paginieren",
        uses: [
          "Eine Abschlussarbeit, einen Bericht oder eine Bewerbung nummerieren.",
          "„1 / 10“ hinzufügen, damit beim Drucken keine Seite fehlt.",
          "Unterlagen vor der Abgabe bei Gericht oder Behörde paginieren.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Die Vorschau zeigt alle Seiten.",
          },
          {
            title: "Stelle und Stil anklicken",
            text: "Die Nummer erscheint sofort auf jeder Seite der Vorschau.",
          },
          {
            title: "Auf Seiten nummerieren klicken",
            text: "Sie laden das nummerierte PDF herunter.",
          },
        ],
        faq: [
          {
            q: "Kann die erste Seite ohne Nummer bleiben?",
            a: "Ja: Geben Sie unter „Weitere Einstellungen“ bei „Zu nummerierende Seiten“ „2-ende“ ein.",
          },
          {
            q: "Kann die Zählung bei einer anderen Zahl als 1 beginnen?",
            a: "Ja, unter „Weitere Einstellungen“ im Feld „Erste Nummer“.",
          },
        ],
      },
    },
    filigrane: {
      name: "Wasserzeichen",
      tagline: "„KOPIE“ oder „VERTRAULICH“ groß auf jede Seite schreiben.",
      seoTitle: "Wasserzeichen zu PDF hinzufügen — kostenlos online",
      seoDescription: "Setzen Sie ein Text-Wasserzeichen (VERTRAULICH, KOPIE, ENTWURF …) auf ein PDF, mit einstellbarer Größe, Deckkraft, Winkel und Farbe. Kostenlos.",
      intro: "Legen Sie Ihr PDF ab, wählen Sie einen Text (oder schreiben Sie Ihren eigenen), prüfen Sie die Vorschau und klicken Sie auf Wasserzeichen. Praktisch, um die Kopie eines Ausweises zu schützen.",
      options: {
        text: {
          label: "Text",
          default: "VERTRAULICH",
          suggestions: ["VERTRAULICH", "KOPIE", "ENTWURF", "NICHT WEITERGEBEN"],
        },
        color: {
          label: "Farbe",
          choices: {
            gray: "Grau",
            red: "Rot",
            blue: "Blau",
            black: "Schwarz",
          },
        },
        opacity: {
          label: "Sichtbarkeit",
          choices: {
            "12": "Dezent",
            "25": "Normal",
            "45": "Gut sichtbar",
          },
        },
        rotation: {
          label: "Textrichtung",
          choices: {
            "0": "Waagerecht",
            "45": "Diagonal",
          },
        },
        size: {
          label: "Maximale Textgröße",
          help: "Der Text wird automatisch verkleinert, wenn er zu lang für die Seite ist.",
        },
        pages: {
          label: "Seiten",
          placeholder: "alle",
          help: "Leer lassen für alle Seiten. Z. B. 1-3, 5, 8-ende.",
        },
      },
      guide: {
        keywords: "pdf wasserzeichen, wasserzeichen hinzufügen, pdf kopie stempeln, pdf vertraulich markieren",
        uses: [
          "Die Kopie Ihres Ausweises mit „Kopie nur für die Wohnungsbewerbung“ markieren, damit sie nicht missbraucht wird.",
          "„VERTRAULICH“ oder „ENTWURF“ auf ein internes Dokument setzen.",
          "Kennzeichnen, dass ein Dokument nicht die endgültige Fassung ist.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Die Vorschau zeigt alle Seiten.",
          },
          {
            title: "Text und Stil wählen",
            text: "Farbe, Sichtbarkeit und Richtung: Die Vorschau aktualisiert sich sofort.",
          },
          {
            title: "Auf Wasserzeichen klicken",
            text: "Sie laden das markierte PDF herunter.",
          },
        ],
        faq: [
          {
            q: "Warum ein Wasserzeichen auf einer Ausweiskopie?",
            a: "Ein Vermerk wie „Kopie für Antrag X vom 2. Oktober“ verhindert, dass eine gestohlene Kopie anderweitig verwendet wird.",
          },
          {
            q: "Bleibt der Text des Dokuments lesbar?",
            a: "Ja: Wählen Sie die Sichtbarkeit „Dezent“ oder „Normal“.",
          },
        ],
      },
    },
    compresser: {
      name: "Komprimieren",
      tagline: "Ein PDF leichter machen, damit es sich einfach versenden lässt.",
      seoTitle: "PDF online komprimieren — Dateigröße kostenlos verkleinern",
      seoDescription: "Verkleinern Sie ein PDF, um es per E-Mail zu senden oder auf einem Behördenportal hochzuladen. Drei Kompressionsstufen, kostenlos.",
      intro: "Ist Ihre Datei zu groß für eine E-Mail oder eine Website? Legen Sie sie ab, lassen Sie „Empfohlen“ gewählt und klicken Sie auf Komprimieren. Der Text bleibt scharf.",
      options: {
        level: {
          label: "Wie stark verkleinern?",
          choices: {
            lossless: "Leicht",
            recommended: "Empfohlen",
            strong: "Maximal",
          },
          hints: {
            lossless: "Gleiche Qualität, kleiner Gewinn.",
            recommended: "In den meisten Fällen die richtige Wahl.",
            strong: "So klein wie möglich; Fotos werden etwas unscharf.",
          },
        },
      },
      guide: {
        keywords: "pdf komprimieren, pdf verkleinern, pdf größe reduzieren, pdf zu groß, pdf für e-mail verkleinern",
        uses: [
          "Ein zu großes PDF per E-Mail senden.",
          "Ein Dokument in einem Portal mit Größenlimit hochladen (oft 2 bis 5 MB).",
          "Platz in Ihren Ordnern sparen.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Eine oder mehrere Dateien.",
          },
          {
            title: "„Empfohlen“ beibehalten",
            text: "Oder Leicht bzw. Maximal je nach Zielgröße wählen.",
          },
          {
            title: "Auf Komprimieren klicken",
            text: "pdff zeigt die Ersparnis, z. B. „8 MB → 2 MB“.",
          },
        ],
        faq: [
          {
            q: "Wird der Text durch die Komprimierung unscharf?",
            a: "Nein: Der Text bleibt scharf. Nur Bilder werden verkleinert, im Modus Empfohlen nur wenig.",
          },
          {
            q: "Warum wird mein PDF nicht kleiner?",
            a: "Es war wahrscheinlich schon optimiert; pdff weist darauf hin.",
          },
        ],
      },
    },
    proteger: {
      name: "Schützen",
      tagline: "Ein PDF mit Passwort verschlüsseln (AES-256).",
      seoTitle: "PDF mit Passwort schützen — kostenlos (AES-256)",
      seoDescription: "Verschlüsseln Sie ein PDF mit Passwort (AES-256) und sperren Sie Drucken, Kopieren oder Bearbeiten. Kostenlos, ohne Anmeldung.",
      intro: "Bevor Sie eine Gehaltsabrechnung oder ein medizinisches Dokument verschicken, sichern Sie es mit einem starken Passwort: Ohne es kann niemand die Datei öffnen.",
      options: {
        password: { label: "Passwort zum Öffnen" },
        noPrint: { label: "Drucken verbieten" },
        noCopy: { label: "Kopieren von Text verbieten" },
        noEdit: { label: "Bearbeiten verbieten" },
      },
      guide: {
        keywords: "pdf mit passwort schützen, pdf verschlüsseln, pdf sichern, drucken von pdf verhindern",
        uses: [
          "Eine Gehaltsabrechnung, Krankenakte oder einen Vertrag senden, den Fremde nicht öffnen können.",
          "Drucken, Kopieren oder Bearbeiten eines Dokuments verhindern.",
          "Die Vertraulichkeitsregeln Ihrer Organisation einhalten.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Eine oder mehrere Dateien.",
          },
          {
            title: "Passwort wählen",
            text: "Und bei Bedarf, was verboten ist: Drucken, Kopieren, Bearbeiten.",
          },
          {
            title: "Auf Schützen klicken",
            text: "Das PDF wird mit AES-256 verschlüsselt; teilen Sie das Passwort auf anderem Weg mit.",
          },
        ],
        faq: [
          {
            q: "Ist diese Verschlüsselung sicher?",
            a: "Ja: AES-256, das Niveau von Banken und Regierungen. Ohne Passwort ist der Inhalt unlesbar.",
          },
          {
            q: "Speichert pdff mein Passwort?",
            a: "Nein, es wird nie gespeichert. Wenn Sie es vergessen, kann niemand die Datei öffnen.",
          },
        ],
      },
    },
    deverrouiller: {
      name: "Entsperren",
      tagline: "Das Passwort eines PDFs entfernen, dessen Passwort Sie kennen.",
      seoTitle: "PDF entsperren — Passwort kostenlos entfernen",
      seoDescription: "Entfernen Sie das Passwort eines PDFs, dessen Passwort Sie kennen, um es frei zu öffnen, zu drucken oder zusammenzufügen. Kostenlos.",
      intro: "Sie kennen das Passwort, aber es jedes Mal einzugeben nervt? Entfernen Sie es ein für alle Mal. pdff umgeht niemals ein unbekanntes Passwort.",
      options: { password: { label: "Aktuelles Passwort", help: "Leer lassen, wenn das PDF nur ein Berechtigungspasswort hat." } },
      guide: {
        keywords: "pdf entsperren, pdf passwort entfernen, pdf schutz aufheben",
        uses: [
          "Nicht mehr bei jedem Öffnen eines eigenen Dokuments das Passwort eingeben.",
          "Den Schutz vor dem Zusammenführen oder Bearbeiten eines PDFs entfernen.",
          "Dokumente archivieren, ohne ihr Passwort zu verlieren.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Das geschützte PDF.",
          },
          {
            title: "Passwort eingeben",
            text: "Die Vorschau erscheint, sobald es stimmt.",
          },
          {
            title: "Auf Entsperren klicken",
            text: "Sie laden das PDF ohne Schutz herunter.",
          },
        ],
        faq: [
          {
            q: "Kann ich ein PDF ohne Passwort entsperren?",
            a: "Nein. pdff entfernt den Schutz nur bei Dokumenten, deren Passwort Sie kennen.",
          },
          {
            q: "Werden auch Druckbeschränkungen entfernt?",
            a: "Ja, das erzeugte PDF hat keine Beschränkungen mehr.",
          },
        ],
      },
    },
    metadonnees: {
      name: "Metadaten",
      tagline: "Titel, Autor, Betreff und Schlüsselwörter bearbeiten.",
      seoTitle: "PDF-Metadaten bearbeiten (Titel, Autor) — kostenlos",
      seoDescription: "Ändern Sie Titel, Autor, Betreff und Stichwörter eines PDFs oder löschen Sie sie alle. Kostenlos, online, ohne Anmeldung.",
      intro: "Der Titel im Browser-Tab oder der Autorname verrät eine alte Vorlage? Korrigieren Sie die Dokumenteigenschaften oder löschen Sie sie vor dem Teilen.",
      options: {
        title: { label: "Titel" },
        author: { label: "Autor" },
        subject: { label: "Betreff" },
        keywords: { label: "Schlüsselwörter (durch Kommas getrennt)" },
        clear: { label: "Alle vorhandenen Metadaten löschen" },
      },
      guide: {
        keywords: "pdf metadaten bearbeiten, pdf titel ändern, pdf autor, pdf eigenschaften, pdf metadaten löschen",
        uses: [
          "Einem PDF einen echten Titel geben (der im Browser-Tab angezeigt wird).",
          "Den Namen des Autors oder der Software vor einer Veröffentlichung löschen.",
          "Schlüsselwörter hinzufügen, um Dokumente leicht wiederzufinden.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Eine oder mehrere Dateien.",
          },
          {
            title: "Felder ausfüllen",
            text: "Titel, Autor, Thema, Schlüsselwörter – oder die Option zum Löschen aller Angaben wählen.",
          },
          {
            title: "Auf Metadaten klicken",
            text: "Sie laden das aktualisierte PDF herunter.",
          },
        ],
        faq: [
          {
            q: "Was sind PDF-Metadaten?",
            a: "Versteckte Angaben in der Datei: Titel, Autor, verwendete Software, Daten. Sie können verraten, wer das Dokument erstellt hat.",
          },
          {
            q: "Ändert sich der Inhalt der Seiten?",
            a: "Nein, nur diese Angaben werden geändert.",
          },
        ],
      },
    },
    signer: {
      name: "Unterschreiben",
      tagline: "Ihre Unterschrift auf ein PDF setzen.",
      seoTitle: "PDF online kostenlos unterschreiben, ohne Anmeldung",
      seoDescription: "Zeichnen, schreiben oder laden Sie Ihre Unterschrift hoch und platzieren Sie sie auf Ihrem PDF, bei Bedarf mit Datum. Kostenlos, ohne Anmeldung, Dateien sofort gelöscht.",
      intro: "Zeichnen Sie Ihre Unterschrift mit der Maus oder dem Finger (oder schreiben Sie Ihren Namen), wählen Sie Seite und Stelle und klicken Sie auf Unterschreiben. Es handelt sich um eine visuelle Unterschrift, wie eine eingescannte handschriftliche.",
      options: {
        signature: {
          label: "Ihre Unterschrift",
        },
        where: {
          label: "Auf welcher Seite?",
          choices: {
            last: "Letzte Seite",
            first: "Erste Seite",
            all: "Alle Seiten",
            custom: "Selbst wählen",
          },
        },
        pages: {
          label: "Seiten",
          placeholder: "z. B. 2, 5",
          help: "Z. B. 1-3, 5, 8-ende.",
        },
        position: {
          label: "Wo unterschreiben?",
          choices: {
            "bottom-center": "Unten, Mitte",
            "bottom-right": "Unten, rechts",
            "bottom-left": "Unten, links",
            "top-center": "Oben, Mitte",
            "top-right": "Oben, rechts",
            "top-left": "Oben, links",
          },
        },
        size: {
          label: "Größe",
          choices: {
            small: "Klein",
            medium: "Mittel",
            large: "Groß",
          },
        },
        date: {
          label: "Heutiges Datum unter die Unterschrift setzen",
        },
      },
      guide: {
        keywords: "pdf unterschreiben, pdf online signieren, unterschrift in pdf einfügen, dokument kostenlos unterschreiben",
        uses: [
          "Einen Mietvertrag, Arbeitsvertrag oder eine Vollmacht unterschreiben, ohne zu drucken oder zu scannen.",
          "Jede Seite eines Vertrags paraphieren.",
          "Mit dem Finger auf dem Smartphone unterschreiben.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Das zu unterschreibende Dokument.",
          },
          {
            title: "Unterschrift erstellen",
            text: "Zeichnen, Namen schreiben oder ein Bild hochladen.",
          },
          {
            title: "Seite und Stelle wählen",
            text: "Vorschau prüfen, dann auf Unterschreiben klicken.",
          },
        ],
        faq: [
          {
            q: "Ist diese Unterschrift rechtsgültig?",
            a: "Es ist eine einfache elektronische Signatur, wie eine eingescannte Unterschrift: Sie genügt für die meisten Alltagsvorgänge. Manche Rechtsgeschäfte verlangen eine qualifizierte elektronische Signatur mit Zertifikat.",
          },
          {
            q: "Wird meine Unterschrift gespeichert?",
            a: "Nein: Sie dient nur Ihrem Dokument und wird mit ihm gelöscht.",
          },
        ],
      },
    },
    caviarder: {
      name: "Schwärzen",
      tagline: "Vertrauliche Informationen endgültig aus einem PDF entfernen.",
      seoTitle: "PDF schwärzen: Informationen endgültig entfernen",
      seoDescription: "Entfernen Sie Namen, Adressen, Nummern und Bereiche wirklich aus einem PDF: Der verdeckte Inhalt wird aus der Datei gelöscht, nicht nur überdeckt. Kostenlos, ohne Anmeldung.",
      intro: "Geben Sie die zu entfernenden Wörter ein, wählen Sie die zu erkennenden Informationen (E-Mails, Telefonnummern…) oder ziehen Sie Rechtecke auf den Seiten. pdff löscht den verdeckten Inhalt wirklich: Er lässt sich weder durch Kopieren des Textes noch durch Entfernen des schwarzen Balkens zurückholen.",
      options: {
        terms: {
          label: "Zu entfernende Wörter",
          placeholder: "z. B. Müller, Lindenstraße 12",
          help: "Mit Kommas trennen. Jedes Vorkommen wird entfernt, unabhängig von Groß- und Kleinschreibung.",
        },
        patterns: {
          label: "Automatisch erkennen",
          choices: {
            email: "E-Mail-Adressen",
            phone: "Telefonnummern",
            iban: "IBAN und Kontonummern",
            date: "Datumsangaben",
            number: "Nummern (ab 6 Ziffern)",
          },
        },
        areas: {
          label: "Zu verbergende Bereiche",
        },
      },
      guide: {
        keywords: "pdf schwärzen, pdf anonymisieren, text in pdf schwärzen, sensible daten aus pdf entfernen",
        uses: [
          "Ein Dokument vor der Veröffentlichung oder Weitergabe anonymisieren (Namen, Adressen, Nummern).",
          "Eine Informationsanfrage beantworten und geschützte Daten entfernen.",
          "Einen Kontoauszug teilen und dabei Kontonummern verbergen.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Die Vorschau zeigt alle Seiten.",
          },
          {
            title: "Angeben, was verschwinden soll",
            text: "Wörter eingeben, Informationsarten wählen oder Bereiche auf den Seiten ziehen.",
          },
          {
            title: "Auf Schwärzen klicken",
            text: "Der verdeckte Inhalt wird aus der Datei gelöscht, nicht nur überdeckt.",
          },
        ],
        faq: [
          {
            q: "Warum nicht einfach ein schwarzes Rechteck zeichnen?",
            a: "Ein darübergelegtes Rechteck lässt den Text in der Datei: Man kann ihn kopieren oder das Rechteck entfernen. pdff löscht Text und Bilder unter dem Bereich wirklich.",
          },
          {
            q: "Spielt Groß- und Kleinschreibung eine Rolle?",
            a: "Nein: „Müller“ entfernt auch „MÜLLER“ und „müller“.",
          },
        ],
      },
    },
    ocr: {
      name: "Scan lesen",
      tagline: "Den Text eines gescannten oder fotografierten Dokuments durchsuchbar und kopierbar machen.",
      seoTitle: "Kostenlose Online-OCR: gescanntes PDF durchsuchbar machen",
      seoDescription: "Text aus einem gescannten PDF oder Foto lesen (OCR), um ihn zu durchsuchen, zu kopieren oder vorlesen zu lassen. 16 Sprachen, kostenlos, ohne Upload.",
      intro: "Ein gescanntes oder fotografiertes Dokument ist nur ein Bild: Man kann weder nach einem Wort suchen noch einen Satz kopieren. Scan lesen erkennt jeden Buchstaben (das nennt man OCR) und fügt dem Dokument den echten Text hinzu, ohne sein Aussehen zu ändern. Das Lesen geschieht auf Ihrem Gerät: Ihr Dokument wird nicht hochgeladen. Nur das Modell der gewählten Sprache (einige MB) wird einmal geladen.",
      options: {
        lang: {
          label: "Sprache des Dokuments",
        },
        format: {
          label: "Ergebnis",
          choices: {
            pdf: "Durchsuchbares PDF",
            txt: "Text (.txt)",
          },
          hints: {
            pdf: "Dasselbe Dokument, mit durchsuchbarem und kopierbarem Text.",
            txt: "Nur der Text, zur Weiterverwendung.",
          },
        },
      },
      guide: {
        keywords: "ocr online, kostenlose ocr, gescanntes pdf in text, pdf durchsuchbar machen, texterkennung, bild in text",
        uses: [
          "Mit Strg + F ein Wort in einem langen gescannten Vertrag finden.",
          "Den Text einer fotografierten Rechnung oder eines Briefs kopieren.",
          "Digitalisierte Papierarchive für blinde Menschen zugänglich machen.",
        ],
        steps: [
          {
            title: "Scan ablegen",
            text: "Ein gescanntes PDF oder ein Foto eines Dokuments.",
          },
          {
            title: "Sprache wählen",
            text: "Die Sprache des Dokumenttextes.",
          },
          {
            title: "Auf Scan lesen klicken",
            text: "Sie erhalten ein PDF mit durchsuchbarem, kopierbarem Text oder eine Textdatei.",
          },
        ],
        faq: [
          {
            q: "Was bedeutet OCR?",
            a: "Optische Zeichenerkennung: Der Computer erkennt die Buchstaben in einem Bild und macht daraus echten Text.",
          },
          {
            q: "Wird mein Dokument hochgeladen?",
            a: "Nein: Das Lesen geschieht vollständig auf Ihrem Gerät. Nur das Sprachmodell wird einmal geladen.",
          },
        ],
      },
    },
    remplir: {
      name: "Formular ausfüllen",
      tagline: "Ein PDF-Formular direkt im Browser ausfüllen.",
      seoTitle: "PDF-Formular online kostenlos ausfüllen",
      seoDescription: "Füllen Sie die Felder eines PDF-Formulars (Text, Kontrollkästchen, Listen) ohne Software aus und laden Sie es ausgefüllt herunter, auf Wunsch gesperrt. Kostenlos, ohne Anmeldung.",
      intro: "Legen Sie ein PDF-Formular ab: pdff findet alle Felder und zeigt sie als einfaches Formular. Ausfüllen, Vorschau prüfen, dann auf Formular ausfüllen klicken, um das fertige PDF herunterzuladen.",
      options: {
        values: {
          label: "Antworten",
        },
        lock: {
          label: "Antworten sperren (das Formular kann nicht mehr geändert werden)",
        },
      },
      guide: {
        keywords: "pdf ausfüllen, pdf formular online ausfüllen, pdf formular ausfüllen kostenlos, in pdf schreiben",
        uses: [
          "Ein Behördenformular (Antrag, Anmeldung, Erklärung) ohne Ausdrucken ausfüllen.",
          "Ein Formular auf dem Smartphone ausfüllen.",
          "Ihre Antworten vor dem Versand sperren.",
        ],
        steps: [
          {
            title: "Formular ablegen",
            text: "pdff findet alle auszufüllenden Felder.",
          },
          {
            title: "Felder ausfüllen",
            text: "Die Vorschau zeigt Ihre Antworten an der richtigen Stelle der Seite.",
          },
          {
            title: "Auf Formular ausfüllen klicken",
            text: "Sie laden das ausgefüllte PDF herunter.",
          },
        ],
        faq: [
          {
            q: "Warum findet pdff kein Feld?",
            a: "Das PDF ist kein interaktives Formular (oft ein Scan). Drucken Sie es aus oder fordern Sie bei der Stelle eine interaktive Fassung an.",
          },
          {
            q: "Was bewirkt „Antworten sperren“?",
            a: "Die Antworten werden Teil der Seite und lassen sich nicht mehr ändern.",
          },
        ],
      },
    },
    comparer: {
      name: "Vergleichen",
      tagline: "Sehen, was sich zwischen zwei Fassungen eines PDFs geändert hat.",
      seoTitle: "Zwei PDFs online vergleichen: Unterschiede sehen",
      seoDescription: "Vergleichen Sie zwei Fassungen eines Vertrags oder PDF-Dokuments: hinzugefügte Wörter grün, entfernte rot, mit Bericht zum Herunterladen. Kostenlos, kein Upload.",
      intro: "Legen Sie die alte und dann die neue Fassung ab: Die Unterschiede erscheinen sofort, Wort für Wort. Klicken Sie auf Vergleichen, um den Bericht herunterzuladen. Alles geschieht in Ihrem Browser.",
      options: {
        ignoreCase: {
          label: "Groß- und Kleinschreibung ignorieren",
        },
      },
      guide: {
        keywords: "zwei pdf vergleichen, pdf unterschiede finden, zwei versionen eines dokuments vergleichen, verträge vergleichen",
        uses: [
          "Vor dem Unterschreiben prüfen, was sich in einem Vertrag oder Mietvertrag geändert hat.",
          "Korrekturen an einem Bericht oder einer Abschlussarbeit kontrollieren.",
          "Zwei Fassungen einer Vorschrift oder eines amtlichen Textes vergleichen.",
        ],
        steps: [
          {
            title: "Alte Fassung ablegen",
            text: "Dann die neue, in dieser Reihenfolge.",
          },
          {
            title: "Unterschiede lesen",
            text: "Grün: hinzugefügt, rot durchgestrichen: entfernt.",
          },
          {
            title: "Auf Vergleichen klicken",
            text: "Sie laden einen Bericht zum Aufbewahren oder Drucken herunter.",
          },
        ],
        faq: [
          {
            q: "Werden meine Dokumente hochgeladen?",
            a: "Nein: Der Vergleich geschieht vollständig in Ihrem Browser.",
          },
          {
            q: "Kann ich gescannte Dokumente vergleichen?",
            a: "Ja, nachdem Sie sie mit dem Werkzeug Scan lesen verarbeitet haben, das ihren Text erkennt.",
          },
        ],
      },
    },
    images: {
      name: "Bilder extrahieren",
      tagline: "Fotos und Abbildungen aus einem PDF herausholen.",
      seoTitle: "Bilder aus PDF online kostenlos extrahieren",
      seoDescription: "Holen Sie alle Fotos, Abbildungen und Logos aus einem PDF als PNG oder JPG heraus, ohne Duplikate. Kostenlos, ohne Anmeldung, Dateien sofort gelöscht.",
      intro: "Legen Sie ein PDF ab: pdff findet alle enthaltenen Bilder und gibt sie Ihnen einzeln als PNG oder JPG in einem ZIP-Archiv. Kleine Zierbilder und Duplikate werden weggelassen.",
      options: {
        format: {
          label: "Bildformat",
          choices: {
            png: "PNG",
            jpg: "JPG",
          },
          hints: {
            png: "Perfekte Qualität, behält Transparenz.",
            jpg: "Kleinere Dateien, ideal für Fotos.",
          },
        },
        small: {
          label: "Auch kleine Bilder behalten (Symbole, Aufzählungszeichen)",
        },
      },
      guide: {
        keywords: "bilder aus pdf extrahieren, fotos aus pdf speichern, pdf bilder herausholen",
        uses: [
          "Die Fotos aus einem PDF-Katalog, Bericht oder Prospekt herausholen.",
          "Ein Logo oder Diagramm in einer Präsentation wiederverwenden.",
          "Die Bilder eines Dokuments sichern, bevor es gelöscht wird.",
        ],
        steps: [
          {
            title: "PDF ablegen",
            text: "Eine oder mehrere Dateien.",
          },
          {
            title: "PNG oder JPG wählen",
            text: "PNG für perfekte Qualität, JPG für kleinere Dateien.",
          },
          {
            title: "Auf Bilder extrahieren klicken",
            text: "Sie erhalten alle Bilder in einem ZIP-Archiv.",
          },
        ],
        faq: [
          {
            q: "Was ist der Unterschied zur Umwandlung von PDF in JPG?",
            a: "Die Umwandlung macht aus jeder ganzen Seite ein Bild. Bilder extrahieren holt nur die Fotos und Abbildungen aus den Seiten, in Originalgröße.",
          },
          {
            q: "Warum fehlen manche Bilder?",
            a: "Kleine Bilder (Symbole, Aufzählungszeichen) werden standardmäßig übersprungen: Aktivieren Sie „Auch kleine Bilder behalten“. Text und Vektorzeichnungen sind keine Bilder.",
          },
        ],
      },
    },
    redimensionner: {
      name: "Größe ändern / zuschneiden",
      tagline: "Die Größe eines Bildes ändern oder es zuschneiden.",
      seoTitle: "Bildgröße ändern und Bilder zuschneiden, online und kostenlos",
      seoDescription: "Verkleinern Sie ein Foto (in % oder Pixeln) oder schneiden Sie es quadratisch, 16:9 oder 4:3 zu und speichern Sie es als JPG, PNG oder WebP. Kostenlos.",
      intro: "Legen Sie Ihre Bilder ab, wählen Sie Verkleinern oder Zuschneiden, prüfen Sie die Vorschau und klicken Sie auf Größe ändern / zuschneiden. Praktisch für ein Profilbild, einen zu großen Anhang oder ein Formular mit Größenvorgabe.",
      options: {
        mode: {
          label: "Was soll passieren?",
          choices: {
            resize: "Größe ändern",
            crop: "Zuschneiden",
          },
          hints: {
            resize: "Das ganze Bild behalten, nur kleiner.",
            crop: "Ränder abschneiden, um ein genaues Format zu erhalten.",
          },
        },
        scale: {
          label: "Neue Größe",
          choices: {
            "25": "25 % (Viertel)",
            "50": "50 % (Hälfte)",
            "75": "75 %",
            custom: "Genaue Größe in Pixeln",
          },
        },
        width: {
          label: "Breite (Pixel)",
        },
        height: {
          label: "Höhe (Pixel)",
          help: "0 = wird berechnet, um die Proportionen zu wahren.",
        },
        ratio: {
          label: "Format",
          choices: {
            "1:1": "Quadrat (1:1)",
            "4:3": "Querformat (4:3)",
            "3:4": "Hochformat (3:4)",
            "16:9": "Breitbild (16:9)",
            "9:16": "Vertikal (9:16)",
            "3:2": "Foto (3:2)",
          },
        },
        format: {
          label: "Dateiformat",
          choices: {
            same: "Format beibehalten",
            jpg: "JPG",
            png: "PNG",
            webp: "WebP",
          },
        },
      },
      guide: {
        keywords: "bildgröße ändern, foto verkleinern, bild zuschneiden online, bild kleiner machen, quadratisches bild",
        uses: [
          "Ein zu großes Foto für eine E-Mail oder ein Online-Formular verkleinern.",
          "Ein Foto für ein Profil quadratisch zuschneiden.",
          "Bilder im Format 16:9 für eine Präsentation oder Website vorbereiten.",
        ],
        steps: [
          {
            title: "Bilder ablegen",
            text: "JPG, PNG, WebP…",
          },
          {
            title: "Größe oder Format wählen",
            text: "Die Vorschau zeigt den behaltenen Bereich und die neue Größe.",
          },
          {
            title: "Auf Größe ändern / zuschneiden klicken",
            text: "Sie laden die bearbeiteten Bilder herunter.",
          },
        ],
        faq: [
          {
            q: "Verliert das Foto an Qualität?",
            a: "Ein verkleinertes Bild hat weniger Pixel, bleibt aber in seiner neuen Größe scharf.",
          },
          {
            q: "Wo wird zugeschnitten?",
            a: "In der Bildmitte: Die Ränder werden gleichmäßig abgeschnitten, um das gewählte Format zu erhalten, wie die Vorschau zeigt.",
          },
        ],
      },
    },
  },
  errors: {
    unknownTool: "Unbekanntes Werkzeug.",
    tooLarge: "Upload zu groß (max. {mb} MB).",
    badRequest: "Ungültige Anfrage.",
    noFiles: "Fügen Sie mindestens eine Datei hinzu.",
    tooManyFiles: "Zu viele Dateien: höchstens {max} für dieses Werkzeug.",
    badOptions: "Ungültige Optionen.",
    noOutput: "Es wurde keine Datei erzeugt.",
    unexpected: "Bei der Verarbeitung ist ein unerwarteter Fehler aufgetreten.",
    inFile: "{file}: {message}",
    pageLimitDocument: "Das Dokument hat {count} Seiten und überschreitet die Grenze von {max} Seiten.",
    pageLimitResult: "Das Ergebnis hätte {count} Seiten und überschreitet die Grenze von {max} Seiten.",
    pageLimit: "Grenze von {max} Seiten überschritten.",
    unreadable: "„{name}“ kann nicht gelesen werden: Datei beschädigt oder Format unbekannt.",
    damagedPdf: "„{name}“ kann nicht gelesen werden: beschädigtes PDF.",
    wrongPassword: "Falsches Passwort für „{name}“.",
    passwordProtected: "„{name}“ ist passwortgeschützt. Verwenden Sie zuerst das Werkzeug „Entsperren“.",
    notPdf: "„{name}“ ist kein PDF.",
    notPdfConvertFirst: "„{name}“ ist kein PDF. Wandeln Sie es zuerst um.",
    passwordComma: "Das Passwort darf kein Komma enthalten.",
    imageFormat: "Nicht unterstütztes Bildformat: {format}",
    imageConvert: "„{name}“ kann nicht umgewandelt werden: Bild unlesbar oder beschädigt.",
    imageUnreadable: "„{name}“ ist kein lesbares Bild.",
    officeMissing: "Für diese Umwandlung wird LibreOffice benötigt (Word, Excel, PowerPoint…). Installieren und pdff neu starten.",
    officeTarget: "Umwandlung in {target} wird nicht unterstützt.",
    officeTimeout: "Die Umwandlung hat zu lange gedauert und wurde abgebrochen.",
    officeFailed: "LibreOffice konnte „{name}“ nicht in {target} umwandeln.",
    officeTooLarge: "„{name}“ ist größer als {mb} MB: zu groß für eine Word-, Excel- oder PowerPoint-Umwandlung.",
    conversionImpossible: "Umwandlung {from} → {to} nicht möglich.",
    conversionImpossibleOffice: "Umwandlung {from} → {to} nicht möglich (mit LibreOffice kommen die Formate Word, Excel und PowerPoint hinzu).",
    watermarkText: "Geben Sie den Text des Wasserzeichens ein.",
    emptyResult: "Das resultierende Dokument hätte keine Seiten.",
    chooseTarget: "Wählen Sie das Zielformat.",
    passwordOrRestriction: "Geben Sie ein Passwort oder mindestens eine Einschränkung an.",
    pageInvalid: "„{token}“ ist keine gültige Seitenzahl.",
    pageMissing: "Seite {n} existiert nicht (das Dokument hat {total} Seiten).",
    rangeInvalid: "Ungültiger Bereich: „{part}“.",
    rangeRequired: "Geben Sie mindestens einen Seitenbereich an.",
    signatureMissing: "Erstellen Sie zuerst Ihre Unterschrift: zeichnen, Namen schreiben oder Bild hochladen.",
    redactNothing: "Geben Sie Wörter ein, wählen Sie eine Art von Information oder ziehen Sie einen Bereich.",
    redactNone: "Nichts zu schwärzen: Keines der angegebenen Wörter oder Informationen wurde im Dokument gefunden.",
    formNoFields: "„{name}“ enthält keine ausfüllbaren Formularfelder.",
    formLockUnicode: "Einige Antworten enthalten Zeichen, die nicht fest in die Seite übernommen werden können. Deaktivieren Sie „Antworten sperren“, damit sie bearbeitbar bleiben.",
    noImages: "In diesem PDF wurden keine Bilder gefunden. Text und Vektorzeichnungen sind keine Bilder.",
    notImage: "„{name}“ ist kein Bild (JPG, PNG, WebP…).",
  },
};

export default de;
