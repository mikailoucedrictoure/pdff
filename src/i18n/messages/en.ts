import type { Messages } from "./fr";

const en: Messages = {
  meta: {
    title: "pdff — Merge, convert and edit PDF, Word, Excel for free",
    description: "Free online tool to merge, convert, compress, split and protect your PDF, Word, Excel, PowerPoint and image files. No sign-up, files deleted right away.",
    keywords: "merge pdf, convert pdf, pdf to word, word to pdf, jpg to pdf, pdf to jpg, compress pdf, split pdf, excel to pdf, free pdf tools",
  },
  nav: { merge: "Merge", convert: "Convert", allTools: "All tools", back: "← All tools" },
  footer: {
    text: "Free, no sign-up. Your files are deleted as soon as processing is done.",
    skip: "Skip to content",
    legalNav: "About this site",
    developedBy: "Designed and built by {name}",
  },
  home: {
    title: "All your documents, in one tool.",
    subtitle: "PDF, Word, Excel, PowerPoint, images: merge, convert and edit in seconds.",
    ctaMerge: "Merge files",
    ctaConvert: "Convert a file",
    trust: "Free, no sign-up, no watermark added.",
    orbitHint: "Grab an icon, spin the ring, tap the center sheet.",
    orbitCore: "Blow up the ring",
    formatsTitle: "{n} supported formats",
    formatsSubtitle: "The ones that actually travel between offices, schools and businesses.",
    stepsTitle: "Three steps, that's all",
    steps: [
      { title: "Drop", text: "Drag your files in or pick them from your phone." },
      { title: "Choose", text: "Set the order, the output format or the pages to keep." },
      { title: "Download", text: "The result downloads by itself, ready to send." },
    ],
  },
  categories: { organiser: "Organize", convertir: "Convert", modifier: "Edit", securite: "Security" },
  formatCategories: {
    pdf: "PDF",
    image: "Images",
    document: "Text documents",
    spreadsheet: "Spreadsheets",
    presentation: "Presentations",
    ebook: "E-books and fixed documents",
    text: "Text",
    web: "Web",
  },
  formatNames: {
    odt: "OpenDocument Text (ODT)",
    cbz: "Comic book (CBZ)",
    txt: "Text (TXT)",
    doc: "Word 97-2003 (DOC)",
    xls: "Excel 97-2003 (XLS)",
    ppt: "PowerPoint 97-2003 (PPT)",
  },
  notice: {
    officeMissingTitle: "Word, Excel and PowerPoint formats are disabled.",
    officeMissingText: "Install LibreOffice (free) to enable them, then restart pdff. On Windows:",
  },
  workspace: {
    dropTitle: "Drop your files here",
    dropActive: "Let go, here we go",
    dropPdfOnly: "PDF files",
    dropAny: "PDF, Word, Excel, PowerPoint, images, EPUB, text…",
    choose: "Choose files",
    addMore: "Add files",
    fileCount: "{n} file(s)",
    dragHint: "Drag to change the order.",
    sortAZ: "Sort A→Z",
    reverse: "Reverse",
    clear: "Remove all",
    moveUp: "Move up",
    moveDown: "Move down",
    remove: "Remove",
    rejected: "Format not supported by this tool: {files}",
    settings: "Settings",
    noSettings: "No settings needed.",
    approximate: "From a PDF, the layout is rebuilt: the result may need touch-ups, especially for a scanned document.",
    targetEmpty: "Add a file to see the available formats.",
    targetNone: "These files have no output format in common.",
    uploading: "Uploading… {pct}%",
    processing: "Processing…",
    processingShort: "Processing…",
    cancel: "Cancel",
    done: "Done in {s} s",
    doneMany: "Done in {s} s, {n} files (ZIP)",
    download: "Download",
    downloadResult: "✓ Download the result",
    restart: "Start over",
    limits: "Up to {pages} pages and {files} files per operation.",
    errorConnection: "Can't reach the server.",
    errorGeneric: "Processing failed.",
    advanced: "More settings (optional)",
    preview: "Preview",
    saved: "{before} → {after}: {pct} smaller",
    savedNone: "This file was already well optimized: it can't be made any smaller.",
    outputLabel: "Result format",
    resultName: "Output file name",
    resultNamePlaceholder: "automatic",
    resultNameHelp: "The extension is added automatically.",
    previewTitle: "Preview",
    previewResult: "Result preview",
    previewLoading: "Preparing the preview…",
    previewLocked: "Protected document: enter the password to see the preview.",
    previewNone: "No preview for this format.",
    previewMore: "+ {n} pages",
    previewFile: "File {n}",
    previewInvalid: "Check the page numbers: the preview updates as soon as they are valid.",
    localOnly: "Processed in your browser: your files are not uploaded.",
    sigDraw: "Draw",
    sigType: "Type",
    sigUpload: "Upload",
    sigClear: "Clear",
    sigTypePlaceholder: "Your full name",
    sigDrawHint: "Sign inside the box with your mouse or finger.",
    sigUploadHint: "An image of your signature (PNG or JPG), ideally on a white background.",
    areaHint: "Draw a rectangle on a page to hide an area (photo, signature, stamp…).",
    areaRemove: "Remove this area",
    areaCount: "Areas to hide: {n}",
    ocrLoading: "Getting ready to read (downloading the language model)…",
    ocrProgress: "Reading text: page {n} of {total}…",
    formLoading: "Reading the form fields…",
    formNone: "This PDF has no fields to fill in. Writing on it requires an interactive PDF form.",
    formFilled: "Fields filled: {n} of {total}",
    formChoose: "— Choose —",
    formFields: "Form fields",
    compareNeedTwo: "Drop two PDFs: the old version first, then the new one.",
    compareOld: "Old version",
    compareNew: "New version",
    compareLoading: "Comparing…",
    compareSummary: "{added} words added, {removed} words removed",
    compareSame: "No difference in the text: both versions say the same thing.",
    compareLegend: "Green: added text. Red, struck through: removed text.",
    comparePages: "Pages: {a} → {b}",
    compareNoText: "These PDFs contain no readable text (scans?). Run them through the OCR tool first.",
    compareReport: "Comparison report",
    compareSkipped: "… {n} identical words …",
    heicConverting: "Preparing iPhone photos (HEIC)…",
    sizeChange: "{from} → {to} pixels",
  },
  language: {
    button: "Language",
    title: "Choose a language",
    search: "Search for a language…",
    verified: "Verified translation",
    automatic: "Automatic translation",
    current: "Current language",
    translating: "Translating pdff into {lang}…",
    unavailable: "Automatic translation isn't enabled on this server yet: pdff is shown in English.",
    failed: "Translation into {lang} failed. Please try again later.",
    noResult: "No language matches.",
    close: "Close",
    auto: "Automatic (browser language)",
  },
  seo: {
    whyTitle: "Why pdff?",
    why: [
      {
        title: "100% free",
        text: "No subscription, no credit card, no watermark added to your documents.",
      },
      { title: "No sign-up", text: "No account to create: open the page, drop your files, done." },
      {
        title: "Your files stay yours",
        text: "Processed, then deleted right away. We keep neither your documents nor your data.",
      },
      {
        title: "Every format",
        text: "PDF, Word, Excel, PowerPoint, OpenDocument, images, EPUB… from a computer or a phone.",
      },
    ],
    howTitle: "How does it work?",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is pdff really free?",
        a: "Yes. Every tool is free, with no watermark and nothing locked behind a subscription. No credit card is ever requested.",
      },
      {
        q: "Do I need an account?",
        a: "No. No sign-up, no email address: you use the tools right away.",
      },
      {
        q: "Are my documents kept?",
        a: "No. Your files are only used for the task you asked for, then deleted. Nobody reads them and they are never shared.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. pdff runs in the browser of any phone, tablet or computer (Android, iPhone, Windows, Mac, Linux), with nothing to install.",
      },
      {
        q: "Which formats are supported?",
        a: "PDF, Word (DOCX, DOC), Excel (XLSX, XLS, CSV), PowerPoint (PPTX, PPT), OpenDocument (ODT, ODS, ODP), RTF, images (JPG, PNG, WebP, AVIF, HEIC (iPhone), TIFF, GIF, SVG), EPUB, TXT, HTML and more.",
      },
      {
        q: "Are there any limits?",
        a: "You can process up to {files} files at once, and a produced document can have up to {pages} pages.",
      },
    ],
    moreTools: "More tools",
    privacyLink: "Privacy",
    sourceLink: "Open source code",
    usesTitle: "What is it for?",
    toolFaqTitle: "Questions about this tool",
  },
  privacy: {
    title: "Privacy",
    description: "How pdff handles your files: no account, no document kept, no ads and no data resale.",
    updated: "Last updated: {date}",
    intro: "pdff is built so that your documents stay yours. Here is, in plain words, what happens when you use it.",
    sections: [
      {
        title: "Your files",
        text: "They are sent encrypted (HTTPS), processed automatically, then deleted as soon as the result is ready. Large files go through temporary storage under a random name and are erased as soon as processing ends; an automatic cleanup removes anything that might remain within 24 hours at most.",
      },
      {
        title: "No account, no personal data",
        text: "pdff asks for no sign-up, no email address and no credit card. Your documents are never read, analysed, shared or used to train artificial intelligence.",
      },
      {
        title: "Audience measurement",
        text: "We count visits anonymously and without cookies (Vercel Web Analytics) to learn which tools are useful. No ads, no cross-site tracking.",
      },
      { title: "Cookies", text: "A single, optional cookie: it remembers the language you chose." },
      {
        title: "Hosting",
        text: "The site is hosted by Vercel on servers in Paris; Word, Excel and PowerPoint conversions are handled by Render in Frankfurt. These providers only handle files for the duration of the conversion.",
      },
      { title: "Contact", text: "A question or a comment? Reach us from the project page:" },
    ],
  },
  legal: {
    termsLink: "Terms of use",
    securityLink: "Security and data",
    accessibilityLink: "Accessibility",
    terms: {
      title: "Terms of use",
      description: "pdff is free for everyone, including businesses and governments. Your documents stay yours: nothing is analyzed or kept.",
      intro: "These terms govern your use of pdff. They are deliberately short and written in plain language. By using the site, you accept them.",
      sections: [
        {
          title: "Who publishes pdff",
          text: "pdff is designed, built and published by Mikailou Cedric Toure, a developer based in New Brunswick, Canada.",
        },
        {
          title: "A free license to use, for everyone",
          text: "pdff is free, with no sign-up and no time limit, for everyone: individuals, students, teachers, businesses, non-profits, public administrations and governments, in Canada and in any other country. No use is reserved for a paid plan, because there is none. The files you produce belong entirely to you: they carry no watermark and no mention of pdff.",
        },
        {
          title: "All your documents, even confidential ones",
          text: "You can process any kind of document, including confidential ones, because pdff does not read, analyze, keep or share your files: they are processed automatically and then deleted. You remain their owner, and you are responsible for having the rights needed to process them.",
        },
        {
          title: "Source code and installation on your own servers",
          text: "The pdff source code is published under the MIT license. You may read it, audit it, install it on your own servers (including on a closed network with no Internet access), modify it and redistribute it free of charge, provided you keep the copyright notice and the license text.",
        },
        {
          title: "Acceptable use",
          text: "You may not use pdff for illegal activity, try to disrupt the service (mass automated uploads, intrusion attempts) or bypass its technical limits. The size and file-count limits protect the service for everyone.",
        },
        {
          title: "Availability",
          text: "pdff is provided free of charge. It may change, be interrupted for maintenance or be discontinued. Always keep your original documents: pdff keeps no copy of them.",
        },
        {
          title: "Warranty and liability",
          text: "The service is provided “as is”, without warranty of any kind. To the fullest extent permitted by law, the publisher is not liable for indirect damages, data loss or an imperfect conversion result. Check the documents you produce before using them for anything important.",
        },
        {
          title: "Intellectual property",
          text: "The pdff name, its logo and the site's texts belong to the publisher; the code is under the MIT license as stated above. The trademarks mentioned (PDF, Word, Excel, PowerPoint…) belong to their respective owners.",
        },
        {
          title: "Governing law",
          text: "These terms are governed by the laws of the Province of New Brunswick and the federal laws of Canada applicable therein. The courts of New Brunswick have jurisdiction, without prejudice to the rights your own country's law grants you as a consumer.",
        },
        {
          title: "Changes",
          text: "These terms may be updated. The date at the top of the page shows the version in force; a change only applies to use after it is published.",
        },
        {
          title: "Contact",
          text: "A question about these terms? Write to us from the project page:",
        },
      ],
    },
    security: {
      title: "Security and data",
      description: "What happens to your files on pdff: automatic processing, no analysis, immediate deletion, encryption, hosting in Europe, and the option to install it on your own servers.",
      intro: "What happens to your files, where they are processed and how they are protected: explained simply, for individuals and IT departments alike.",
      sections: [
        {
          title: "No documents kept",
          text: "Your files are processed automatically, then deleted as soon as the result is ready or downloaded. There is no copy, no backup and no history. A daily automatic cleanup also erases any temporary file that might remain, by the next day at the latest.",
        },
        {
          title: "No analysis",
          text: "Nobody reads your documents. They are not indexed, analyzed, shared or used to train artificial intelligence. pdff has no accounts, no ads and no user profiles.",
        },
        {
          title: "Encryption",
          text: "Every connection is encrypted (HTTPS) and the site enforces encryption on every visit (HSTS). The Protect tool encrypts your PDFs with AES-256; the password you choose is never stored.",
        },
        {
          title: "Where your files are processed",
          text: "Site, PDF and image tools: Vercel, Paris data center (France, European Union). Word, Excel and PowerPoint conversions: Render, in Frankfurt (Germany, European Union). Files over 4 MB: temporary Vercel Blob storage, under a random name, deleted after use.",
        },
        {
          title: "Technical safeguards",
          text: "Security headers (HSTS, blocking the site from being embedded in other pages, protection against file-type confusion), temporary file addresses that cannot be guessed, and a conversion service that only accepts requests carrying a secret token. Every code change is checked automatically (tests, type checks) before going live.",
        },
        {
          title: "Privacy and applicable law",
          text: "pdff is published in New Brunswick and complies with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA). It collects no personal information about its users: no account, no email address, no tracking cookie. It is built on the same principles as the European GDPR and Quebec's Law 25: data minimization, no reuse, deletion after processing.",
        },
        {
          title: "For organizations with strict rules",
          text: "If your rules forbid sending documents to an outside service, install pdff on your own servers. The complete software is free, open source and works without an Internet connection: no file ever leaves your network. The installation guide is on the project page.",
        },
        {
          title: "Transparency",
          text: "The complete source code is public: your security teams can verify every one of these statements.",
        },
        {
          title: "Report a vulnerability",
          text: "Think you have found a security flaw? Report it confidentially from the “Security” tab of the project page:",
        },
      ],
    },
    accessibility: {
      title: "Accessibility",
      description: "pdff accessibility statement: WCAG 2.2 level AA target, measures in place, known limitations and how to report a barrier.",
      intro: "Everyone must be able to use pdff, including people who are blind or have low vision, who are Deaf or hard of hearing, or who have a motor or cognitive disability.",
      sections: [
        {
          title: "Target standard",
          text: "pdff aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.2, level AA, the international W3C standard. This level covers the requirements of the Government of Canada's Standard on Web Accessibility, the European standard EN 301 549 and Section 508 in the United States, which refer to WCAG 2.0 or 2.1 level AA.",
        },
        {
          title: "Conformance status",
          text: "pdff is partially conformant with WCAG 2.2 level AA: known limitations are listed below. This statement is based on an internal evaluation carried out on October 2, 2026, using automated tools (axe, Lighthouse) and manual checks (keyboard, contrast, zoom, announcements). No independent audit has been carried out yet.",
        },
        {
          title: "What is in place",
          text: "The whole site works with a keyboard, with a “Skip to content” link and a visible outline on the active element. Text contrast is at least 4.5:1. The steps of a task (upload, result, error) are announced to screen readers. File order can be changed without drag and drop, using buttons. The site follows your device's “reduce motion” setting: animations then stop completely. Pages remain readable at 400% zoom and on mobile. The language of each page is declared, and Arabic is displayed right to left.",
        },
        {
          title: "Known limitations",
          text: "Without that setting, decorative animations (background, ring, format ticker) run continuously; the ticker pauses on hover and keyboard focus. The animated ring on the home page is operated with a mouse or a finger; it is decorative, and the list of formats it shows is also available as text on the page. Machine-translated languages may contain inaccuracies. Finally, the accessibility of a produced document depends on the original: pdff does not add accessibility tags to a PDF that has none.",
        },
        {
          title: "Report a barrier",
          text: "Is part of the site a problem for you? Describe it from the project page; we aim to reply within 10 business days and to offer an alternative if the fix takes longer:",
        },
      ],
    },
    installLink: "Install on your servers",
    install: {
      title: "pdff for organizations",
      description: "Install pdff on your government's or company's servers: free, open source, and your documents never leave your network.",
      intro: "Governments, businesses, hospitals, schools: install pdff in-house in minutes and keep full control of your documents.",
      sections: [
        {
          title: "Your documents stay on your network",
          text: "All processing happens on your own servers, even without Internet access. No analytics, no external service, no accounts.",
        },
        {
          title: "Everything included",
          text: "Every pdff tool, more than 40 formats, LibreOffice for Word, Excel and PowerPoint, and all 160 interface languages, in a single container.",
        },
        {
          title: "Free and open source",
          text: "pdff is released under the MIT license: free to install, use and modify, with no user limit. Your security teams can audit all of the code.",
        },
        {
          title: "Install in 3 commands",
          text: "On a server with Docker (at least 2 CPUs and 2 GB of RAM):",
        },
        {
          title: "Updates",
          text: "One command is enough: docker compose pull, then docker compose up -d. Every version is built and tested automatically, with networking disabled, before release. The full guide (HTTPS, air-gapped networks, settings) is here:",
        },
        {
          title: "Support",
          text: "Need help with installation, a version in your colors, a support contract or a custom feature? Contact the developer:",
        },
      ],
    },
  },
  tools: {
    fusionner: {
      name: "Merge",
      tagline: "Combine several files (PDF, Word, images…) into one PDF, in the order you choose.",
      seoTitle: "Merge PDF files online for free (Word, images, PDF)",
      seoDescription: "Combine PDF, Word, Excel, PowerPoint and image files into one PDF, in the order you want. Free, no sign-up, no watermark, files deleted right away.",
      intro: "Put all your paperwork in a single file: pdff takes PDFs but also Word documents, Excel sheets, presentations and photos, and combines them into one clean PDF with a bookmark per file.",
      options: { bookmarks: { label: "Add one bookmark per file" } },
      guide: {
        keywords: "merge pdf, combine pdf, join pdf files, combine pdfs into one, merge word and pdf, pdf merger free",
        uses: [
          "Send a complete application (ID, proof documents, forms) as a single file, as most government offices require.",
          "Bring together the chapters of a thesis or report written in separate files.",
          "Turn phone photos of documents into one clean PDF.",
        ],
        steps: [
          {
            title: "Drop your files",
            text: "PDF, Word, Excel, images… as many as you need.",
          },
          {
            title: "Put them in order",
            text: "Drag them, or use the arrows and A→Z sorting.",
          },
          {
            title: "Click Merge",
            text: "You download a single PDF with one bookmark per file.",
          },
        ],
        faq: [
          {
            q: "Can I merge Word files and photos with PDFs?",
            a: "Yes. pdff converts each file to PDF automatically before combining them, in the order you chose.",
          },
          {
            q: "How many files can I merge?",
            a: "Up to several hundred at once, with no watermark and no sign-up.",
          },
        ],
      },
    },
    convertir: {
      name: "Convert",
      tagline: "Convert any document or image to another format.",
      seoTitle: "Convert PDF to Word, Word to PDF, JPG to PDF — free",
      seoDescription: "Free converter: PDF ↔ Word, Excel, PowerPoint, JPG, PNG, EPUB and 40+ formats. Online, no sign-up, high quality.",
      intro: "One converter for every format: Word to PDF, PDF to Word, JPG to PDF, PDF to JPG, Excel to PDF, PowerPoint to PDF, PNG to JPG, EPUB to PDF… Drop your files and pdff only offers the formats that are possible.",
      options: {
        target: { label: "Convert to" },
        dpi: { label: "Image resolution (DPI)" },
        quality: { label: "JPG / WebP / AVIF quality (1-100)" },
      },
      guide: {
        keywords: "pdf to word, word to pdf, jpg to pdf, pdf to jpg, excel to pdf, powerpoint to pdf, free pdf converter, png to pdf",
        uses: [
          "Turn a PDF into Word so you can edit the text.",
          "Turn a photo or screenshot into a PDF to send to an organization.",
          "Turn a Word, Excel or PowerPoint document into a PDF so it looks the same everywhere.",
        ],
        steps: [
          {
            title: "Drop your files",
            text: "One or more, in any common format.",
          },
          {
            title: "Choose the format",
            text: "pdff only offers the conversions possible for your files.",
          },
          {
            title: "Click Convert",
            text: "The converted file downloads right away.",
          },
        ],
        faq: [
          {
            q: "Does PDF to Word keep the layout?",
            a: "As much as possible, but a complex PDF (columns, nested tables) may need a few touch-ups: pdff warns you when that's the case.",
          },
          {
            q: "Which formats can be converted?",
            a: "More than 40: PDF, Word, Excel, PowerPoint, OpenDocument, images (JPG, PNG, WebP, AVIF, HEIC…), EPUB, text, HTML and more.",
          },
        ],
      },
    },
    diviser: {
      name: "Split",
      tagline: "Cut a PDF into several smaller files.",
      seoTitle: "Split a PDF online for free — separate pages",
      seoDescription: "Split a PDF into several files: by page ranges, page by page or every N pages. Free, fast and no sign-up.",
      intro: "Drop your PDF, choose how to cut it, then click Split: you get all the pieces in a single ZIP file.",
      options: {
        mode: {
          label: "How to cut it?",
          choices: {
            each: "Every page separately",
            ranges: "I choose the pages",
            every: "In batches",
          },
          hints: {
            each: "1 page = 1 file. The simplest.",
            ranges: "E.g. pages 1 to 3 in one file, 4 to 10 in another.",
            every: "E.g. a new file every 5 pages.",
          },
        },
        ranges: {
          label: "Which pages?",
          placeholder: "1-3, 4-10",
          help: "A comma separates each file: \"1-3, 4-10\" gives 2 files (pages 1 to 3, then 4 to 10). Type \"end\" for the last page.",
        },
        every: {
          label: "How many pages per file?",
        },
      },
      guide: {
        keywords: "split pdf, separate pdf pages, cut pdf, extract each page of a pdf, divide pdf",
        uses: [
          "Separate a big scan that contains several different documents.",
          "Send only part of a document that is too large.",
          "Get every page of a PDF as its own file, or as images.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The preview shows all of its pages.",
          },
          {
            title: "Choose how to cut it",
            text: "Every page separately, by page ranges, or in batches.",
          },
          {
            title: "Click Split",
            text: "You get all the pieces in a single ZIP file.",
          },
        ],
        faq: [
          {
            q: "Can I choose exactly which pages go in each file?",
            a: "Yes: type for example \"1-3, 4-10\" to get one file with pages 1 to 3 and another with pages 4 to 10.",
          },
          {
            q: "Can I get images instead of PDFs?",
            a: "Yes: choose JPG or PNG under \"Result format\".",
          },
        ],
      },
    },
    extraire: {
      name: "Extract / delete pages",
      tagline: "Keep or remove specific pages of a PDF.",
      seoTitle: "Extract or delete pages from a PDF — free",
      seoDescription: "Keep only the pages you need from a PDF, or remove the extra ones. Online, free, no sign-up, no watermark.",
      intro: "A blank page, a useless appendix, a duplicate? Type the pages to keep or remove (for example 1-3, 7, 10-end) and get a clean PDF in seconds.",
      options: {
        mode: { label: "Action", choices: { keep: "Keep only these pages", remove: "Delete these pages" } },
        pages: { label: "Pages", placeholder: "1, 3-5", help: "E.g. 1-3, 5, 8-end. Leave empty = all pages." },
      },
      guide: {
        keywords: "delete pdf pages, remove pages from pdf, extract pages from pdf, keep certain pages pdf",
        uses: [
          "Remove a blank or duplicate page from a scan.",
          "Keep only the useful pages of a long document before sending it.",
          "Remove a page that contains personal information.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The preview shows all of its pages.",
          },
          {
            title: "Enter the pages",
            text: "Choose to keep or delete them: the preview crosses out removed pages.",
          },
          {
            title: "Click the button",
            text: "You download the lighter PDF.",
          },
        ],
        faq: [
          {
            q: "How do I delete a single page from a PDF?",
            a: "Choose \"Delete these pages\" and type its number, for example \"3\".",
          },
          {
            q: "Is the rest of the document changed?",
            a: "No: the other pages stay exactly as they were, with no loss of quality.",
          },
        ],
      },
    },
    organiser: {
      name: "Reorder pages",
      tagline: "Change the page order, duplicate, reverse.",
      seoTitle: "Reorder PDF pages online — free",
      seoDescription: "Change the order of a PDF's pages, duplicate some or reverse the whole document. Free, online, no sign-up.",
      intro: "Pages scanned out of order? Type the new order (for example 3, 1, 2, 4-end) or reverse the whole document: pdff does the rest.",
      options: {
        order: { label: "New order", placeholder: "3, 1, 2, 4-end", help: "Pages not listed are removed." },
        reverse: { label: "Reverse the whole document (ignores the order above)" },
      },
      guide: {
        keywords: "reorder pdf pages, rearrange pdf pages, move pdf page, reverse pdf, sort pdf pages",
        uses: [
          "Put pages scanned out of order back in sequence.",
          "Move a cover page or table of contents to the front.",
          "Reverse a document that was scanned back to front.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The preview shows all of its pages.",
          },
          {
            title: "Type the new order",
            text: "For example \"3, 1, 2\": the preview shows the result.",
          },
          {
            title: "Click Reorder pages",
            text: "You download the reordered PDF.",
          },
        ],
        faq: [
          {
            q: "Can I duplicate a page?",
            a: "Yes: type its number twice, for example \"1, 2, 2, 3\".",
          },
          {
            q: "How do I reverse the whole document?",
            a: "Tick the reverse option: the last page becomes the first.",
          },
        ],
      },
    },
    renommer: {
      name: "Rename",
      tagline: "Change the name of one or more files, without uploading anything.",
      seoTitle: "Rename files online — free, nothing uploaded",
      seoDescription: "Rename one or many files (PDF, Word, images…) at once, with automatic numbering. Everything happens in your browser: nothing is uploaded.",
      intro: "Drop your files, type the new name, then click Rename. For several files, pdff adds a number: Invoice-1, Invoice-2… Your files never leave your device.",
      options: {
        name: {
          label: "New name",
          placeholder: "e.g. Invoice-March",
          help: "Several files? A number is added, in list order.",
        },
        ext: {
          label: "New extension",
          placeholder: "keep the extension",
          help: "Changing the extension does not change the file format. To transform a file, use Convert.",
        },
      },
      guide: {
        keywords: "rename files, batch rename files, rename multiple files online, rename pdf, number files",
        uses: [
          "Give clear names to the documents in an application before sending them (Invoice-1, Invoice-2…).",
          "Rename dozens of photos or scans at once.",
          "Fix a file name without opening any other software.",
        ],
        steps: [
          {
            title: "Drop your files",
            text: "Of any type, in the order you want.",
          },
          {
            title: "Type the new name",
            text: "A number is added for several files; the preview shows each new name.",
          },
          {
            title: "Click Rename",
            text: "A file or a ZIP archive downloads.",
          },
        ],
        faq: [
          {
            q: "Are my files uploaded?",
            a: "No: renaming happens entirely in your browser.",
          },
          {
            q: "Does changing the extension convert the file?",
            a: "No. To really change the format (for example from Word to PDF), use the Convert tool.",
          },
        ],
      },
    },
    pivoter: {
      name: "Rotate",
      tagline: "Rotate all pages or a selection.",
      seoTitle: "Rotate a PDF online for free",
      seoDescription: "Rotate all pages of a PDF or only some of them, by 90°, 180° or 270°. Free, fast, no sign-up.",
      intro: "An upside-down scan or a landscape page? Rotate the whole document or only the pages you pick, with no loss of quality.",
      options: {
        angle: { label: "Rotation", choices: { "90": "90° clockwise", "180": "180°", "270": "90° counter-clockwise" } },
        pages: { label: "Pages", placeholder: "all", help: "E.g. 1-3, 5, 8-end. Leave empty = all pages." },
      },
      guide: {
        keywords: "rotate pdf, turn pdf pages, rotate a pdf page, fix upside down pdf, rotate scanned pdf",
        uses: [
          "Straighten a page scanned upside down or sideways.",
          "Turn table pages into landscape.",
          "Fix the orientation of a document photographed with a phone.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The preview shows all of its pages.",
          },
          {
            title: "Choose the direction and pages",
            text: "Quarter turn or half turn, on the whole document or certain pages.",
          },
          {
            title: "Click Rotate",
            text: "You download the straightened PDF.",
          },
        ],
        faq: [
          {
            q: "Can I rotate a single page?",
            a: "Yes: type its number under \"Pages\"; the others stay as they are.",
          },
          {
            q: "Does rotating reduce quality?",
            a: "No, the page is simply turned, not recompressed.",
          },
        ],
      },
    },
    numeroter: {
      name: "Number pages",
      tagline: "Write the number on every page.",
      seoTitle: "Add page numbers to a PDF — free online",
      seoDescription: "Add page numbers to a PDF: choose the position, the \"1 / 10\" format, the first number and the size. Free, no sign-up.",
      intro: "Drop your PDF, click where the number should go on the page, pick a style, then click Number pages. The preview shows the result before you start.",
      options: {
        position: {
          label: "Where should the number go?",
          choices: {
            "bottom-center": "Bottom, middle",
            "bottom-right": "Bottom, right",
            "bottom-left": "Bottom, left",
            "top-center": "Top, middle",
            "top-right": "Top, right",
            "top-left": "Top, left",
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
          label: "First number",
          help: "E.g. 3 to start counting at 3.",
        },
        size: {
          label: "Number size",
        },
        pages: {
          label: "Pages to number",
          placeholder: "all",
          help: "Leave empty for all pages. \"2-end\" skips the first page.",
        },
      },
      guide: {
        keywords: "add page numbers to pdf, number pdf pages, paginate pdf, pdf page numbering",
        uses: [
          "Number a thesis, a report or an application file.",
          "Add \"1 / 10\" so no page goes missing when printed.",
          "Paginate exhibits before filing them with a court or a government office.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The preview shows all of its pages.",
          },
          {
            title: "Click the spot and the style",
            text: "The number appears right away on every page of the preview.",
          },
          {
            title: "Click Number pages",
            text: "You download the numbered PDF.",
          },
        ],
        faq: [
          {
            q: "Can I skip numbering the first page?",
            a: "Yes: under \"More settings\", type \"2-end\" in \"Pages to number\".",
          },
          {
            q: "Can numbering start at something other than 1?",
            a: "Yes, under \"More settings\", in the \"First number\" field.",
          },
        ],
      },
    },
    filigrane: {
      name: "Watermark",
      tagline: "Write “COPY” or “CONFIDENTIAL” in large letters on every page.",
      seoTitle: "Add a watermark to a PDF — free online",
      seoDescription: "Stamp a text watermark (CONFIDENTIAL, COPY, DRAFT…) on a PDF with adjustable size, opacity, angle and colour. Free.",
      intro: "Drop your PDF, pick a text (or type your own), check the preview, then click Watermark. Handy for protecting a copy of an ID document.",
      options: {
        text: {
          label: "Text to write",
          default: "CONFIDENTIAL",
          suggestions: ["CONFIDENTIAL", "COPY", "DRAFT", "DO NOT SHARE"],
        },
        color: {
          label: "Color",
          choices: {
            gray: "Gray",
            red: "Red",
            blue: "Blue",
            black: "Black",
          },
        },
        opacity: {
          label: "Visibility",
          choices: {
            "12": "Subtle",
            "25": "Normal",
            "45": "Very visible",
          },
        },
        rotation: {
          label: "Text direction",
          choices: {
            "0": "Horizontal",
            "45": "Diagonal",
          },
        },
        size: {
          label: "Maximum text size",
          help: "The text shrinks automatically if it is too long for the page.",
        },
        pages: {
          label: "Pages",
          placeholder: "all",
          help: "Leave empty for all pages. E.g. 1-3, 5, 8-end.",
        },
      },
      guide: {
        keywords: "watermark pdf, add watermark to pdf, stamp copy on pdf, mark pdf confidential, protect a copy of an id",
        uses: [
          "Mark a copy of your ID \"Copy for rental application only\" so it can't be reused.",
          "Show \"CONFIDENTIAL\" or \"DRAFT\" on an internal document.",
          "Make clear a document is not the final version.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The preview shows all of its pages.",
          },
          {
            title: "Choose the text and style",
            text: "Color, visibility and direction: the preview updates live.",
          },
          {
            title: "Click Watermark",
            text: "You download the marked PDF.",
          },
        ],
        faq: [
          {
            q: "Why watermark a copy of an ID?",
            a: "A note such as \"Copy for application X, October 2\" stops a stolen copy from being reused for something else.",
          },
          {
            q: "Does the document text stay readable?",
            a: "Yes: choose \"Subtle\" or \"Normal\" visibility.",
          },
        ],
      },
    },
    compresser: {
      name: "Compress",
      tagline: "Make a PDF lighter so it's easy to send.",
      seoTitle: "Compress a PDF online — reduce file size for free",
      seoDescription: "Shrink a PDF to send it by email or upload it to an official website. Three compression levels, free.",
      intro: "Is your file too heavy for an email or a website? Drop it, keep “Recommended” and click Compress. Text stays sharp.",
      options: {
        level: {
          label: "How much to reduce?",
          choices: {
            lossless: "Light",
            recommended: "Recommended",
            strong: "Maximum",
          },
          hints: {
            lossless: "Same quality, modest gain.",
            recommended: "The right choice in most cases.",
            strong: "As small as possible; photos get a little blurry.",
          },
        },
      },
      guide: {
        keywords: "compress pdf, reduce pdf size, make pdf smaller, pdf too large, shrink pdf for email",
        uses: [
          "Email a PDF that is too large.",
          "Upload a document to a portal with a size limit (often 2 to 5 MB).",
          "Save space in your folders.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "One or more.",
          },
          {
            title: "Keep \"Recommended\"",
            text: "Or choose Light or Maximum depending on the size you need.",
          },
          {
            title: "Click Compress",
            text: "pdff shows the gain, for example \"8 MB → 2 MB\".",
          },
        ],
        faq: [
          {
            q: "Does compression blur the text?",
            a: "No: text stays sharp. Only images are lightened, very little in Recommended mode.",
          },
          {
            q: "Why doesn't my PDF get smaller?",
            a: "It was probably already optimized; pdff tells you so.",
          },
        ],
      },
    },
    proteger: {
      name: "Protect",
      tagline: "Encrypt a PDF with a password (AES-256).",
      seoTitle: "Password protect a PDF — free (AES-256)",
      seoDescription: "Encrypt a PDF with a password (AES-256) and block printing, copying or editing. Free, no sign-up.",
      intro: "Before sending a payslip or a medical document, lock it with a strong password: without it, nobody can open it.",
      options: {
        password: { label: "Password to open" },
        noPrint: { label: "Block printing" },
        noCopy: { label: "Block copying text" },
        noEdit: { label: "Block editing" },
      },
      guide: {
        keywords: "password protect pdf, encrypt pdf, secure a pdf, add password to pdf, prevent printing pdf",
        uses: [
          "Send a pay stub, medical file or contract that strangers can't open.",
          "Prevent printing, copying or editing of a document.",
          "Follow your organization's confidentiality rules.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "One or more.",
          },
          {
            title: "Choose a password",
            text: "And, if needed, what's not allowed: printing, copying, editing.",
          },
          {
            title: "Click Protect",
            text: "The PDF is encrypted with AES-256; share the password another way.",
          },
        ],
        faq: [
          {
            q: "Is this encryption secure?",
            a: "Yes: AES-256, the level used by banks and governments. Without the password, the content is unreadable.",
          },
          {
            q: "Does pdff keep my password?",
            a: "No, it is never stored. If you forget it, nobody can open the file.",
          },
        ],
      },
    },
    deverrouiller: {
      name: "Unlock",
      tagline: "Remove the password from a PDF whose password you know.",
      seoTitle: "Unlock a PDF — remove the password for free",
      seoDescription: "Remove the password from a PDF you know the password of, to open, print or merge it freely. Free.",
      intro: "You know the password, but typing it every time is a pain? Remove it once and for all. pdff never bypasses a password you don't know.",
      options: { password: { label: "Current password", help: "Leave empty if the PDF only has a permissions password." } },
      guide: {
        keywords: "unlock pdf, remove pdf password, remove pdf protection, decrypt pdf",
        uses: [
          "Stop typing the password every time you open a document that belongs to you.",
          "Remove protection before merging or editing a PDF.",
          "Archive documents without risking losing their password.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The protected PDF.",
          },
          {
            title: "Enter its password",
            text: "The preview appears as soon as it is correct.",
          },
          {
            title: "Click Unlock",
            text: "You download the PDF without protection.",
          },
        ],
        faq: [
          {
            q: "Can I unlock a PDF without the password?",
            a: "No. pdff only removes protection from documents whose password you know.",
          },
          {
            q: "Are printing restrictions removed too?",
            a: "Yes, the resulting PDF has no restrictions.",
          },
        ],
      },
    },
    metadonnees: {
      name: "Metadata",
      tagline: "Edit the title, author, subject and keywords.",
      seoTitle: "Edit PDF metadata (title, author) — free",
      seoDescription: "Change the title, author, subject and keywords of a PDF, or clear them all. Free, online, no sign-up.",
      intro: "The title shown in the browser tab or the author name gives away an old template? Fix the document properties, or wipe them before sharing.",
      options: {
        title: { label: "Title" },
        author: { label: "Author" },
        subject: { label: "Subject" },
        keywords: { label: "Keywords (comma-separated)" },
        clear: { label: "Erase all existing metadata" },
      },
      guide: {
        keywords: "edit pdf metadata, change pdf title, pdf author, pdf properties, remove pdf metadata",
        uses: [
          "Give a PDF a real title (the one shown in the browser tab).",
          "Remove the author or software name before publishing a document.",
          "Add keywords to find your documents easily.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "One or more.",
          },
          {
            title: "Fill in the fields",
            text: "Title, author, subject, keywords, or tick the option to clear them all.",
          },
          {
            title: "Click Metadata",
            text: "You download the updated PDF.",
          },
        ],
        faq: [
          {
            q: "What is PDF metadata?",
            a: "Hidden information in the file: title, author, software used, dates. It can reveal who created the document.",
          },
          {
            q: "Does the page content change?",
            a: "No, only this information is changed.",
          },
        ],
      },
    },
    signer: {
      name: "Sign",
      tagline: "Put your signature on a PDF.",
      seoTitle: "Sign a PDF online for free, no sign-up",
      seoDescription: "Draw, type or upload your signature and place it on your PDF, with today's date if needed. Free, no sign-up, files deleted right away.",
      intro: "Draw your signature with your mouse or finger (or type your name), choose the page and the spot, then click Sign. This is a visual signature, like a scanned handwritten one.",
      options: {
        signature: {
          label: "Your signature",
        },
        where: {
          label: "On which page?",
          choices: {
            last: "Last page",
            first: "First page",
            all: "Every page",
            custom: "Let me choose",
          },
        },
        pages: {
          label: "Pages",
          placeholder: "e.g. 2, 5",
          help: "E.g. 1-3, 5, 8-end.",
        },
        position: {
          label: "Where to sign?",
          choices: {
            "bottom-center": "Bottom, middle",
            "bottom-right": "Bottom, right",
            "bottom-left": "Bottom, left",
            "top-center": "Top, middle",
            "top-right": "Top, right",
            "top-left": "Top, left",
          },
        },
        size: {
          label: "Size",
          choices: {
            small: "Small",
            medium: "Medium",
            large: "Large",
          },
        },
        date: {
          label: "Add today's date under the signature",
        },
      },
      guide: {
        keywords: "sign pdf, sign pdf online free, add signature to pdf, e-sign a document, handwritten signature pdf",
        uses: [
          "Sign a lease, employment contract or authorization without printing or scanning.",
          "Add your initials to every page of a contract.",
          "Sign from your phone, with your finger.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The document to sign.",
          },
          {
            title: "Create your signature",
            text: "Draw it, type your name or upload an image.",
          },
          {
            title: "Choose the page and spot",
            text: "Check the preview, then click Sign.",
          },
        ],
        faq: [
          {
            q: "Is this signature legally valid?",
            a: "It is a simple electronic signature, like a scanned handwritten one: it is enough for most everyday paperwork. Some formal acts require a qualified electronic signature with a certificate.",
          },
          {
            q: "Is my signature kept?",
            a: "No: it is only used for your document, then deleted with it.",
          },
        ],
      },
    },
    caviarder: {
      name: "Redact",
      tagline: "Permanently remove sensitive information from a PDF.",
      seoTitle: "Redact a PDF: permanently hide information",
      seoDescription: "Truly remove names, addresses, numbers and areas from a PDF: hidden content is deleted from the file, not just covered. Free, no sign-up.",
      intro: "Type the words to remove, tick the information to detect (emails, phone numbers…) or draw rectangles on the pages. pdff truly deletes the hidden content: it can't be recovered by copying the text or removing the black box.",
      options: {
        terms: {
          label: "Words to remove",
          placeholder: "e.g. Smith, 12 Lilac Street",
          help: "Separate with commas. Every occurrence is removed, regardless of capitals.",
        },
        patterns: {
          label: "Detect automatically",
          choices: {
            email: "Email addresses",
            phone: "Phone numbers",
            iban: "IBANs and account numbers",
            date: "Dates",
            number: "Numbers (6 digits or more)",
          },
        },
        areas: {
          label: "Areas to hide",
        },
      },
      guide: {
        keywords: "redact pdf, anonymize pdf, black out text in pdf, remove sensitive information pdf, censor pdf",
        uses: [
          "Anonymize a document before publishing or sharing it (names, addresses, numbers).",
          "Answer an access-to-information request by removing protected data.",
          "Share a bank statement while hiding account numbers.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "The preview shows all of its pages.",
          },
          {
            title: "Say what to hide",
            text: "Type words, tick types of information or draw areas on the pages.",
          },
          {
            title: "Click Redact",
            text: "Hidden content is deleted from the file, not just covered.",
          },
        ],
        faq: [
          {
            q: "Why not just draw a black rectangle?",
            a: "A rectangle placed on top leaves the text in the file: it can be copied or the rectangle removed. pdff's redaction truly deletes the text and images under the area.",
          },
          {
            q: "Does capitalization matter?",
            a: "No: \"Smith\" also removes \"SMITH\" and \"smith\".",
          },
        ],
      },
    },
    ocr: {
      name: "Read a scan",
      tagline: "Make the text of a scanned or photographed document searchable and copyable.",
      seoTitle: "Free online OCR: make a scanned PDF searchable",
      seoDescription: "Read the text of a scanned PDF or photo (OCR) so you can search it, copy it or have it read aloud. 16 languages, free, the document is not uploaded.",
      intro: "A scanned or photographed document is just an image: you can't search for a word or copy a sentence. Read a scan recognizes every letter (this is called OCR) and adds the real text to the document without changing how it looks. Reading happens on your device: your document is not uploaded. Only the model for the chosen language (a few MB) is downloaded once.",
      options: {
        lang: {
          label: "Document language",
        },
        format: {
          label: "Result",
          choices: {
            pdf: "Searchable PDF",
            txt: "Text (.txt)",
          },
          hints: {
            pdf: "The same document, with text you can search and copy.",
            txt: "Just the text, to reuse elsewhere.",
          },
        },
      },
      guide: {
        keywords: "online ocr, free ocr, scanned pdf to text, make pdf searchable, text recognition, copy text from a scan, image to text",
        uses: [
          "Find a word in a long scanned contract with Ctrl + F.",
          "Copy the text of a photographed invoice or letter.",
          "Make digitized paper archives accessible to blind people.",
        ],
        steps: [
          {
            title: "Drop your scan",
            text: "A scanned PDF or a photo of a document.",
          },
          {
            title: "Choose the language",
            text: "The language of the document's text.",
          },
          {
            title: "Click Read a scan",
            text: "You get a PDF where text can be searched and copied, or a text file.",
          },
        ],
        faq: [
          {
            q: "What does OCR mean?",
            a: "Optical character recognition: the computer recognizes the letters in an image to turn them into real text.",
          },
          {
            q: "Is my document uploaded?",
            a: "No: reading happens entirely on your device. Only the language model is downloaded, once.",
          },
        ],
      },
    },
    remplir: {
      name: "Fill in a form",
      tagline: "Complete a PDF form right in your browser.",
      seoTitle: "Fill in a PDF form online for free",
      seoDescription: "Complete the fields of a PDF form (text, checkboxes, lists) without any software, then download it filled in, locked if you wish. Free, no sign-up.",
      intro: "Drop a PDF form: pdff finds every field and shows them as a simple form. Fill it in, check the preview, then click Fill in a form to download the completed PDF.",
      options: {
        values: {
          label: "Answers",
        },
        lock: {
          label: "Lock the answers (the form can no longer be edited)",
        },
      },
      guide: {
        keywords: "fill pdf, fill pdf form online, complete a pdf form, type on pdf form, free pdf form filler",
        uses: [
          "Complete a government form (application, registration, declaration) without printing it.",
          "Fill in a form from your phone.",
          "Lock your answers before sending the document.",
        ],
        steps: [
          {
            title: "Drop the form",
            text: "pdff finds every field to fill in.",
          },
          {
            title: "Fill in the fields",
            text: "The preview shows your answers in place on the page.",
          },
          {
            title: "Click Fill in a form",
            text: "You download the completed PDF.",
          },
        ],
        faq: [
          {
            q: "Why doesn't pdff find any field?",
            a: "The PDF is not an interactive form (it is often a scan). You'll need to print it or ask the organization for an interactive version.",
          },
          {
            q: "What does \"Lock the answers\" do?",
            a: "The answers become part of the page and can no longer be changed.",
          },
        ],
      },
    },
    comparer: {
      name: "Compare",
      tagline: "See what changed between two versions of a PDF.",
      seoTitle: "Compare two PDFs online: see the differences",
      seoDescription: "Compare two versions of a contract or PDF document: added words in green, removed words in red, and a downloadable report. Free, nothing is uploaded.",
      intro: "Drop the old version, then the new one: the differences appear instantly, word by word. Click Compare to download the report. Everything happens in your browser.",
      options: {
        ignoreCase: {
          label: "Ignore upper and lower case",
        },
      },
      guide: {
        keywords: "compare two pdfs, pdf diff, compare two versions of a document, compare contracts, find changes in pdf",
        uses: [
          "Check what changed in a contract or lease before signing it.",
          "Review the corrections made to a report or thesis.",
          "Compare two versions of a regulation or official text.",
        ],
        steps: [
          {
            title: "Drop the old version",
            text: "Then the new one, in that order.",
          },
          {
            title: "Read the differences",
            text: "Green shows what was added, red struck through what was removed.",
          },
          {
            title: "Click Compare",
            text: "You download a report to keep or print.",
          },
        ],
        faq: [
          {
            q: "Are my documents uploaded?",
            a: "No: the comparison happens entirely in your browser.",
          },
          {
            q: "Can I compare scanned documents?",
            a: "Yes, after running them through the Read a scan tool, which extracts their text.",
          },
        ],
      },
    },
    images: {
      name: "Extract images",
      tagline: "Get the photos and illustrations out of a PDF.",
      seoTitle: "Extract images from a PDF online for free",
      seoDescription: "Get every photo, illustration and logo out of a PDF as PNG or JPG, without duplicates. Free, no sign-up, files deleted right away.",
      intro: "Drop a PDF: pdff finds every image it contains and gives them to you one by one, as PNG or JPG, in a ZIP archive. Small decorative images and duplicates are left out.",
      options: {
        format: {
          label: "Image format",
          choices: {
            png: "PNG",
            jpg: "JPG",
          },
          hints: {
            png: "Perfect quality, keeps transparency.",
            jpg: "Lighter files, ideal for photos.",
          },
        },
        small: {
          label: "Also keep small images (icons, bullets)",
        },
      },
      guide: {
        keywords: "extract images from pdf, save images from pdf, get photos out of a pdf, pdf image extractor",
        uses: [
          "Get the photos out of a PDF catalog, report or brochure.",
          "Reuse a logo or chart in a presentation.",
          "Save a document's images before deleting it.",
        ],
        steps: [
          {
            title: "Drop your PDF",
            text: "One or more.",
          },
          {
            title: "Choose PNG or JPG",
            text: "PNG for perfect quality, JPG for lighter files.",
          },
          {
            title: "Click Extract images",
            text: "You get all the images in a ZIP archive.",
          },
        ],
        faq: [
          {
            q: "How is this different from converting a PDF to JPG?",
            a: "Converting turns each whole page into an image. Extracting images only gets the photos and illustrations inside the pages, at their original size.",
          },
          {
            q: "Why are some images missing?",
            a: "Small images (icons, bullets) are skipped by default: tick \"Also keep small images\". Text and vector drawings are not images, so they are not extracted.",
          },
        ],
      },
    },
    redimensionner: {
      name: "Resize / crop",
      tagline: "Change the size of an image or crop it.",
      seoTitle: "Resize and crop images online for free",
      seoDescription: "Shrink a photo (by % or in pixels) or crop it to square, 16:9 or 4:3, then save it as JPG, PNG or WebP. Free, no sign-up.",
      intro: "Drop your images, choose to shrink or crop them, check the preview, then click Resize / crop. Handy for a profile picture, an attachment that's too heavy or a form that requires a specific size.",
      options: {
        mode: {
          label: "What to do?",
          choices: {
            resize: "Resize",
            crop: "Crop",
          },
          hints: {
            resize: "Keep the whole image, smaller.",
            crop: "Trim the edges to get an exact format.",
          },
        },
        scale: {
          label: "New size",
          choices: {
            "25": "25% (quarter)",
            "50": "50% (half)",
            "75": "75%",
            custom: "Exact size in pixels",
          },
        },
        width: {
          label: "Width (pixels)",
        },
        height: {
          label: "Height (pixels)",
          help: "0 = calculated to keep proportions.",
        },
        ratio: {
          label: "Format",
          choices: {
            "1:1": "Square (1:1)",
            "4:3": "Landscape (4:3)",
            "3:4": "Portrait (3:4)",
            "16:9": "Widescreen (16:9)",
            "9:16": "Vertical (9:16)",
            "3:2": "Photo (3:2)",
          },
        },
        format: {
          label: "File format",
          choices: {
            same: "Keep the format",
            jpg: "JPG",
            png: "PNG",
            webp: "WebP",
          },
        },
      },
      guide: {
        keywords: "resize image, reduce photo size, crop image online, resize photo, make image smaller, square image",
        uses: [
          "Shrink a photo that's too heavy for an email or an online form.",
          "Crop a photo to a square for a profile.",
          "Prepare 16:9 images for a presentation or website.",
        ],
        steps: [
          {
            title: "Drop your images",
            text: "JPG, PNG, WebP…",
          },
          {
            title: "Choose the size or format",
            text: "The preview shows the area kept and the new size.",
          },
          {
            title: "Click Resize / crop",
            text: "You download the edited images.",
          },
        ],
        faq: [
          {
            q: "Does the photo lose quality?",
            a: "A smaller image has fewer pixels but stays sharp at its new size.",
          },
          {
            q: "Where is the crop made?",
            a: "In the center of the image: the edges are trimmed evenly to reach the chosen format, as the preview shows.",
          },
        ],
      },
    },
  },
  errors: {
    unknownTool: "Unknown tool.",
    tooLarge: "Upload too large (max. {mb} MB).",
    badRequest: "Invalid request.",
    noFiles: "Add at least one file.",
    tooManyFiles: "Too many files: {max} maximum for this tool.",
    badOptions: "Invalid options.",
    noOutput: "No file was produced.",
    unexpected: "An unexpected error occurred during processing.",
    inFile: "{file}: {message}",
    pageLimitDocument: "The document has {count} pages, over the {max}-page limit.",
    pageLimitResult: "The result would have {count} pages, over the {max}-page limit.",
    pageLimit: "{max}-page limit exceeded.",
    unreadable: "Can't read \"{name}\": the file is damaged or the format isn't recognized.",
    damagedPdf: "Can't read \"{name}\": damaged PDF.",
    wrongPassword: "Wrong password for \"{name}\".",
    passwordProtected: "\"{name}\" is password-protected. Use the \"Unlock\" tool first.",
    notPdf: "\"{name}\" isn't a PDF.",
    notPdfConvertFirst: "\"{name}\" isn't a PDF. Convert it first.",
    passwordComma: "The password can't contain a comma.",
    imageFormat: "Unsupported image format: {format}",
    imageConvert: "Can't convert \"{name}\": the image is unreadable or damaged.",
    imageUnreadable: "\"{name}\" isn't a readable image.",
    officeMissing: "LibreOffice is required for this conversion (Word, Excel, PowerPoint…). Install it, then restart pdff.",
    officeTarget: "Conversion to {target} isn't supported.",
    officeTimeout: "The conversion took too long and was stopped.",
    officeFailed: "LibreOffice couldn't convert \"{name}\" to {target}.",
    officeTooLarge: "\"{name}\" is over {mb} MB: too large for a Word, Excel or PowerPoint conversion.",
    conversionImpossible: "{from} → {to} conversion isn't possible.",
    conversionImpossibleOffice: "{from} → {to} conversion isn't possible (installing LibreOffice adds Word, Excel and PowerPoint formats).",
    watermarkText: "Enter the watermark text.",
    emptyResult: "The resulting document would have no pages.",
    chooseTarget: "Choose the output format.",
    passwordOrRestriction: "Enter a password or at least one restriction.",
    pageInvalid: "\"{token}\" isn't a valid page number.",
    pageMissing: "Page {n} doesn't exist (the document has {total} pages).",
    rangeInvalid: "Invalid range: \"{part}\".",
    rangeRequired: "Enter at least one page range.",
    signatureMissing: "Create your signature first: draw it, type your name or upload an image.",
    redactNothing: "Enter some words, tick a type of information or draw an area to hide.",
    redactNone: "Nothing to redact: none of the requested words or information were found in the document.",
    formNoFields: "\"{name}\" has no form fields to fill in.",
    formLockUnicode: "Some answers contain characters that cannot be fixed into the page. Untick \"Lock the answers\" to keep them editable.",
    noImages: "No images found in this PDF. Text and vector drawings are not images.",
    notImage: "\"{name}\" is not an image (JPG, PNG, WebP…).",
  },
};

export default en;
