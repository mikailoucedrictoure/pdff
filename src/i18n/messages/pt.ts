import type { Messages } from "./fr";

const pt: Messages = {
  meta: {
    title: "pdffusion — Juntar, converter e editar PDF, Word, Excel grátis",
    description: "Ferramenta online gratuita para juntar, converter, comprimir, dividir e proteger seus PDF, Word, Excel, PowerPoint e imagens. Sem cadastro, arquivos apagados na hora.",
    keywords: "juntar pdf, converter pdf, pdf para word, word para pdf, jpg para pdf, pdf para jpg, comprimir pdf, dividir pdf, excel para pdf, ferramentas pdf grátis",
  },
  nav: { merge: "Juntar", convert: "Converter", allTools: "Todas as ferramentas", back: "← Todas as ferramentas" },
  footer: {
    text: "Grátis e sem cadastro. Seus arquivos são apagados assim que o processamento termina.",
    skip: "Ir para o conteúdo",
    legalNav: "Informações sobre o site",
    developedBy: "Criado e desenvolvido por {name}",
  },
  home: {
    title: "Edite todos os seus documentos em uma só ferramenta.",
    subtitle: "PDF, Word, Excel, PowerPoint, imagens: junte, converta e edite em segundos.",
    ctaMerge: "Juntar arquivos",
    ctaConvert: "Converter um arquivo",
    trust: "Grátis, sem cadastro e sem marca-d'água adicionada.",
    orbitHint: "Pegue um ícone, gire o anel, toque na folha central.",
    orbitCore: "Explodir o anel",
    formatsTitle: "{n} formatos reconhecidos",
    formatsSubtitle: "Os que realmente circulam em órgãos públicos, escolas e empresas.",
    stepsTitle: "Três gestos, só isso",
    steps: [
      { title: "Solte", text: "Arraste seus arquivos ou escolha-os no seu celular." },
      { title: "Escolha", text: "Ajuste a ordem, o formato de saída ou as páginas a manter." },
      { title: "Baixe", text: "O resultado é baixado automaticamente, pronto para enviar." },
    ],
  },
  categories: { organiser: "Organizar", convertir: "Converter", modifier: "Editar", securite: "Segurança" },
  formatCategories: {
    pdf: "PDF",
    image: "Imagens",
    document: "Documentos de texto",
    spreadsheet: "Planilhas",
    presentation: "Apresentações",
    ebook: "Livros e documentos fixos",
    text: "Texto",
    web: "Web",
  },
  formatNames: {
    odt: "Texto OpenDocument (ODT)",
    cbz: "Quadrinhos (CBZ)",
    txt: "Texto (TXT)",
    doc: "Word 97-2003 (DOC)",
    xls: "Excel 97-2003 (XLS)",
    ppt: "PowerPoint 97-2003 (PPT)",
  },
  notice: {
    officeMissingTitle: "Formatos Word, Excel e PowerPoint desativados.",
    officeMissingText: "Instale o LibreOffice (grátis) para ativá-los e reinicie o pdffusion. No Windows:",
  },
  workspace: {
    dropTitle: "Solte seus arquivos aqui",
    dropActive: "Pode soltar, vamos lá",
    dropPdfOnly: "Arquivos PDF",
    dropAny: "PDF, Word, Excel, PowerPoint, imagens, EPUB, texto…",
    choose: "Escolher arquivos",
    addMore: "Adicionar arquivos",
    fileCount: "{n} arquivo(s)",
    dragHint: "Arraste para mudar a ordem.",
    sortAZ: "Ordenar A→Z",
    reverse: "Inverter",
    clear: "Remover tudo",
    moveUp: "Subir",
    moveDown: "Descer",
    remove: "Remover",
    rejected: "Formato não suportado por esta ferramenta: {files}",
    settings: "Configurações",
    noSettings: "Nenhuma configuração necessária.",
    approximate: "A partir de um PDF, o layout é reconstruído: o resultado pode precisar de ajustes, principalmente em documentos digitalizados.",
    targetEmpty: "Adicione um arquivo para ver os formatos possíveis.",
    targetNone: "Estes arquivos não têm nenhum formato de saída em comum.",
    uploading: "Enviando… {pct} %",
    processing: "Processando…",
    processingShort: "Processando…",
    cancel: "Cancelar",
    done: "Pronto em {s} s",
    doneMany: "Pronto em {s} s, {n} arquivos (ZIP)",
    download: "Baixar",
    downloadResult: "✓ Baixar o resultado",
    restart: "Recomeçar",
    limits: "Até {pages} páginas e {files} arquivos por operação.",
    errorConnection: "Não foi possível conectar ao servidor.",
    errorGeneric: "O processamento falhou.",
    advanced: "Mais ajustes (opcional)",
    preview: "Pré-visualização",
    saved: "{before} → {after}: {pct} mais leve",
    savedNone: "Este arquivo já estava bem otimizado: não dá para reduzir mais.",
    outputLabel: "Formato do resultado",
    resultName: "Nome do arquivo final",
    resultNamePlaceholder: "automático",
    resultNameHelp: "A extensão é adicionada automaticamente.",
    previewTitle: "Pré-visualização",
    previewResult: "Pré-visualização do resultado",
    previewLoading: "Preparando a pré-visualização…",
    previewLocked: "Documento protegido: digite a senha para ver a pré-visualização.",
    previewNone: "Sem pré-visualização para este formato.",
    previewMore: "+ {n} páginas",
    previewFile: "Arquivo {n}",
    previewInvalid: "Confira os números das páginas: a pré-visualização se atualiza assim que estiverem corretos.",
    localOnly: "Processado no seu navegador: seus arquivos não são enviados.",
    sigDraw: "Desenhar",
    sigType: "Escrever",
    sigUpload: "Importar",
    sigClear: "Apagar",
    sigTypePlaceholder: "Seu nome completo",
    sigDrawHint: "Assine dentro do quadro com o mouse ou o dedo.",
    sigUploadHint: "Imagem da sua assinatura (PNG ou JPG), de preferência com fundo branco.",
    areaHint: "Desenhe um retângulo em uma página para esconder uma área (foto, assinatura, carimbo…).",
    areaRemove: "Remover esta área",
    areaCount: "Áreas a esconder: {n}",
    ocrLoading: "Preparando a leitura (baixando o modelo do idioma)…",
    ocrProgress: "Lendo o texto: página {n} de {total}…",
    formLoading: "Lendo os campos do formulário…",
    formNone: "Este PDF não tem campos para preencher. Para escrever nele, é preciso um formulário PDF interativo.",
    formFilled: "Campos preenchidos: {n} de {total}",
    formChoose: "— Escolher —",
    formFields: "Campos do formulário",
    compareNeedTwo: "Envie dois PDFs: primeiro a versão antiga, depois a nova.",
    compareOld: "Versão antiga",
    compareNew: "Versão nova",
    compareLoading: "Comparando…",
    compareSummary: "{added} palavras adicionadas, {removed} palavras removidas",
    compareSame: "Nenhuma diferença no texto: as duas versões dizem a mesma coisa.",
    compareLegend: "Em verde: texto adicionado. Em vermelho riscado: texto removido.",
    comparePages: "Páginas: {a} → {b}",
    compareNoText: "Estes PDFs não contêm texto legível (digitalizações?). Passe-os antes pela ferramenta OCR.",
    compareReport: "Relatório de comparação",
    compareSkipped: "… {n} palavras idênticas …",
    heicConverting: "Preparando as fotos do iPhone (HEIC)…",
    sizeChange: "{from} → {to} pixels",
  },
  language: {
    button: "Idioma",
    title: "Escolher o idioma",
    search: "Procurar um idioma…",
    verified: "Tradução revisada",
    automatic: "Tradução automática",
    current: "Idioma atual",
    translating: "Traduzindo o pdffusion para {lang}…",
    unavailable: "A tradução automática ainda não está ativada neste servidor: o pdffusion aparece em inglês.",
    failed: "A tradução para {lang} falhou. Tente novamente mais tarde.",
    noResult: "Nenhum idioma corresponde.",
    close: "Fechar",
    auto: "Automático (idioma do navegador)",
  },
  seo: {
    whyTitle: "Por que o pdffusion?",
    why: [
      {
        title: "100% grátis",
        text: "Sem assinatura, sem cartão de crédito e sem marca d'água nos seus documentos.",
      },
      {
        title: "Sem cadastro",
        text: "Nenhuma conta para criar: abra a página, solte seus arquivos e pronto.",
      },
      {
        title: "Seus arquivos são seus",
        text: "Processados e apagados na hora. Não guardamos nem seus documentos nem seus dados.",
      },
      {
        title: "Todos os formatos",
        text: "PDF, Word, Excel, PowerPoint, OpenDocument, imagens, EPUB… no computador ou no celular.",
      },
    ],
    howTitle: "Como funciona?",
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "O pdffusion é mesmo grátis?",
        a: "Sim. Todas as ferramentas são gratuitas, sem marca d'água e sem nada bloqueado por assinatura. Nenhum cartão de crédito é pedido.",
      },
      {
        q: "Preciso criar uma conta?",
        a: "Não. Sem cadastro e sem e-mail: você usa as ferramentas diretamente.",
      },
      {
        q: "Meus documentos ficam guardados?",
        a: "Não. Seus arquivos servem apenas para a tarefa pedida e depois são apagados. Ninguém os lê e eles não são compartilhados com ninguém.",
      },
      {
        q: "Funciona no celular?",
        a: "Sim. O pdffusion funciona no navegador de qualquer celular, tablet ou computador (Android, iPhone, Windows, Mac, Linux), sem instalar nada.",
      },
      {
        q: "Quais formatos são aceitos?",
        a: "PDF, Word (DOCX, DOC), Excel (XLSX, XLS, CSV), PowerPoint (PPTX, PPT), OpenDocument (ODT, ODS, ODP), RTF, imagens (JPG, PNG, WebP, AVIF, HEIC (iPhone), TIFF, GIF, SVG), EPUB, TXT, HTML e outros.",
      },
      {
        q: "Existe algum limite?",
        a: "Você pode processar até {files} arquivos de uma vez, e um documento gerado pode ter até {pages} páginas.",
      },
    ],
    moreTools: "Outras ferramentas",
    privacyLink: "Privacidade",
    sourceLink: "Código aberto",
    usesTitle: "Para que serve?",
    toolFaqTitle: "Perguntas sobre esta ferramenta",
  },
  privacy: {
    title: "Privacidade",
    description: "Como o pdffusion trata seus arquivos: sem conta, nenhum documento guardado, sem publicidade nem venda de dados.",
    updated: "Última atualização: {date}",
    intro: "O pdffusion foi feito para que seus documentos continuem sendo seus. Veja, em poucas palavras, o que acontece quando você o usa.",
    sections: [
      {
        title: "Seus arquivos",
        text: "São enviados de forma criptografada (HTTPS), processados automaticamente e apagados assim que o resultado fica pronto. Arquivos grandes passam por um armazenamento temporário com nome aleatório e são apagados ao fim do processamento; uma limpeza automática remove qualquer resto em no máximo 24 horas.",
      },
      {
        title: "Sem conta, sem dados pessoais",
        text: "O pdffusion não pede cadastro, e-mail nem cartão de crédito. Seus documentos não são lidos, analisados, compartilhados nem usados para treinar inteligência artificial.",
      },
      {
        title: "Medição de audiência",
        text: "Contamos as visitas de forma anônima e sem cookies (Vercel Web Analytics) para saber quais ferramentas são úteis. Sem publicidade e sem rastreamento entre sites.",
      },
      {
        title: "Cookies",
        text: "Um único cookie, opcional: ele guarda o idioma que você escolheu.",
      },
      {
        title: "Hospedagem",
        text: "O site é hospedado pela Vercel, em servidores localizados em Paris; as conversões de Word, Excel e PowerPoint são feitas pela Render, em Frankfurt. Esses fornecedores só tratam os arquivos durante a conversão.",
      },
      {
        title: "Contato",
        text: "Uma dúvida ou um comentário? Fale conosco pela página do projeto:",
      },
    ],
  },
  legal: {
    termsLink: "Termos de uso",
    securityLink: "Segurança e dados",
    accessibilityLink: "Acessibilidade",
    terms: {
      title: "Termos de uso",
      description: "O pdffusion é gratuito para todos, inclusive empresas e órgãos públicos. Seus documentos continuam sendo seus: nada é analisado nem guardado.",
      intro: "Estes termos regem o uso do pdffusion. Eles são curtos de propósito e escritos em linguagem simples. Ao usar o site, você os aceita.",
      sections: [
        {
          title: "Quem publica o pdffusion",
          text: "O pdffusion foi criado, desenvolvido e é publicado por Mikailou Cedric Toure, desenvolvedor estabelecido em New Brunswick, no Canadá.",
        },
        {
          title: "Uma licença de uso gratuita, para todos",
          text: "O pdffusion é gratuito, sem cadastro e sem limite de tempo, para todo mundo: pessoas físicas, estudantes, professores, empresas, associações, órgãos públicos e governos, no Canadá e em qualquer outro país. Nenhum uso é reservado a um plano pago, porque ele não existe. Os arquivos gerados pertencem inteiramente a você: não têm marca d'água nem menção ao pdffusion.",
        },
        {
          title: "Todos os seus documentos, mesmo os confidenciais",
          text: "Você pode processar qualquer tipo de documento, inclusive confidencial, porque o pdffusion não lê, não analisa, não guarda e não compartilha seus arquivos: eles são processados automaticamente e depois apagados. Você continua sendo o proprietário e é responsável por ter os direitos necessários para processá-los.",
        },
        {
          title: "Código-fonte e instalação nos seus próprios servidores",
          text: "O código do pdffusion é publicado sob a licença MIT. Você pode consultá-lo, auditá-lo, instalá-lo nos seus próprios servidores (inclusive em uma rede fechada, sem acesso à Internet), modificá-lo e redistribuí-lo gratuitamente, desde que mantenha o aviso de direitos autorais e o texto da licença.",
        },
        {
          title: "Uso aceitável",
          text: "É proibido usar o pdffusion para atividades ilegais, tentar perturbar o serviço (envios automatizados em massa, tentativas de invasão) ou contornar seus limites técnicos. Os limites de tamanho e de quantidade de arquivos protegem o serviço para todos.",
        },
        {
          title: "Disponibilidade",
          text: "O pdffusion é oferecido gratuitamente. Ele pode mudar, ser interrompido para manutenção ou ser encerrado. Guarde sempre seus documentos originais: o pdffusion não mantém nenhuma cópia.",
        },
        {
          title: "Garantia e responsabilidade",
          text: "O serviço é oferecido “no estado em que se encontra”, sem garantia de nenhum tipo. Na máxima extensão permitida por lei, o editor não se responsabiliza por danos indiretos, perda de dados ou um resultado de conversão imperfeito. Confira os documentos gerados antes de usá-los em algo importante.",
        },
        {
          title: "Propriedade intelectual",
          text: "O nome pdffusion, seu logotipo e os textos do site pertencem ao editor; o código está sob a licença MIT, como indicado acima. As marcas citadas (PDF, Word, Excel, PowerPoint…) pertencem aos seus respectivos titulares.",
        },
        {
          title: "Lei aplicável",
          text: "Estes termos são regidos pelas leis da província de New Brunswick e pelas leis federais do Canadá aplicáveis nela. Os tribunais de New Brunswick são competentes, sem prejuízo dos direitos que a lei do seu país lhe garante como consumidor.",
        },
        {
          title: "Alterações",
          text: "Estes termos podem ser atualizados. A data no topo da página indica a versão em vigor; uma alteração só se aplica aos usos posteriores à sua publicação.",
        },
        {
          title: "Contato",
          text: "Uma dúvida sobre estes termos? Escreva pela página do projeto:",
        },
      ],
    },
    security: {
      title: "Segurança e dados",
      description: "O que acontece com seus arquivos no pdffusion: processamento automático, nenhuma análise, exclusão imediata, criptografia, hospedagem na Europa e instalação possível nos seus servidores.",
      intro: "O que acontece com seus arquivos, onde são processados e como são protegidos: explicado de forma simples, tanto para pessoas como para equipes de TI.",
      sections: [
        {
          title: "Nenhum documento guardado",
          text: "Seus arquivos são processados automaticamente e apagados assim que o resultado fica pronto ou é baixado. Não há cópia, backup nem histórico. Uma limpeza automática diária também apaga qualquer arquivo temporário que possa ter ficado, no máximo no dia seguinte.",
        },
        {
          title: "Nenhuma análise",
          text: "Ninguém lê seus documentos. Eles não são indexados, analisados, compartilhados nem usados para treinar inteligência artificial. O pdffusion não tem contas, nem anúncios, nem perfis de usuário.",
        },
        {
          title: "Criptografia",
          text: "Todas as conexões são criptografadas (HTTPS) e o site impõe a criptografia em cada visita (HSTS). A ferramenta Proteger criptografa seus PDFs com AES-256; a senha escolhida nunca é armazenada.",
        },
        {
          title: "Onde seus arquivos são processados",
          text: "Site e ferramentas de PDF e imagens: Vercel, data center de Paris (França, União Europeia). Conversões de Word, Excel e PowerPoint: Render, em Frankfurt (Alemanha, União Europeia). Arquivos com mais de 4 MB: armazenamento temporário Vercel Blob, com nome aleatório, apagado após o uso.",
        },
        {
          title: "Proteções técnicas",
          text: "Cabeçalhos de segurança (HSTS, bloqueio da incorporação do site em outras páginas, proteção contra confusão de tipos de arquivo), endereços de arquivos temporários impossíveis de adivinhar e um serviço de conversão acessível apenas com um token secreto. Cada alteração no código é verificada automaticamente (testes, verificação de tipos) antes de ir ao ar.",
        },
        {
          title: "Privacidade e leis aplicáveis",
          text: "O pdffusion é publicado em New Brunswick e cumpre a Lei de Proteção de Informações Pessoais e Documentos Eletrônicos (PIPEDA) do Canadá. Ele não coleta nenhuma informação pessoal dos usuários: nem conta, nem e-mail, nem cookie de rastreamento. Foi concebido segundo os mesmos princípios do RGPD europeu e da Lei 25 de Quebec (e compatível com os princípios da LGPD): minimização de dados, nenhuma reutilização, exclusão após o processamento.",
        },
        {
          title: "Para organizações com regras rígidas",
          text: "Se as suas regras proíbem enviar documentos a um serviço externo, instale o pdffusion nos seus próprios servidores. O software completo é gratuito, de código aberto e funciona sem conexão com a Internet: nenhum arquivo sai da sua rede. O guia de instalação está na página do projeto.",
        },
        {
          title: "Transparência",
          text: "O código-fonte completo é público: suas equipes de segurança podem verificar cada uma destas afirmações.",
        },
        {
          title: "Relatar uma vulnerabilidade",
          text: "Acha que encontrou uma falha de segurança? Relate-a de forma confidencial pela aba “Security” da página do projeto:",
        },
      ],
    },
    accessibility: {
      title: "Acessibilidade",
      description: "Declaração de acessibilidade do pdffusion: meta WCAG 2.2 nível AA, medidas adotadas, limitações conhecidas e como relatar uma barreira.",
      intro: "Todo mundo deve conseguir usar o pdffusion, inclusive pessoas cegas ou com baixa visão, surdas ou com deficiência auditiva, ou com deficiência motora ou cognitiva.",
      sections: [
        {
          title: "Norma de referência",
          text: "O pdffusion busca a conformidade com as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.2, nível AA, a norma internacional do W3C. Esse nível cobre os requisitos da Norma de Acessibilidade Web do Governo do Canadá, da norma europeia EN 301 549 e da Seção 508 dos Estados Unidos, que remetem às WCAG 2.0 ou 2.1 de nível AA.",
        },
        {
          title: "Situação de conformidade",
          text: "O pdffusion é parcialmente conforme com as WCAG 2.2 nível AA: as limitações conhecidas estão listadas abaixo. Esta declaração se baseia em uma avaliação interna realizada em 2 de outubro de 2026, com ferramentas automáticas (axe, Lighthouse) e verificações manuais (teclado, contraste, zoom, anúncios). Nenhuma auditoria independente foi realizada até agora.",
        },
        {
          title: "O que já está em vigor",
          text: "Todo o site funciona pelo teclado, com um link “Ir para o conteúdo” e um contorno visível no elemento ativo. O contraste do texto é de pelo menos 4,5:1. As etapas de uma tarefa (envio, resultado, erro) são anunciadas aos leitores de tela. A ordem dos arquivos pode ser alterada sem arrastar e soltar, com botões. O site respeita a configuração “reduzir movimento” do seu aparelho: as animações então param completamente. As páginas continuam legíveis com zoom de 400% e no celular. O idioma de cada página é declarado, e o árabe é exibido da direita para a esquerda.",
        },
        {
          title: "Limitações conhecidas",
          text: "Sem essa configuração, as animações decorativas (fundo, anel, faixa de formatos) rodam continuamente; a faixa para ao passar o mouse e com o teclado. O anel animado da página inicial é manipulado com o mouse ou com o dedo; ele é decorativo, e a lista de formatos que apresenta também está disponível em texto na página. Os idiomas traduzidos automaticamente podem conter imprecisões. Por fim, a acessibilidade de um documento gerado depende do original: o pdffusion não adiciona marcação de acessibilidade a um PDF que não a possui.",
        },
        {
          title: "Relatar uma barreira",
          text: "Alguma parte do site é um problema para você? Descreva-a pela página do projeto; procuramos responder em até 10 dias úteis e oferecer uma alternativa se a correção demorar mais:",
        },
      ],
    },
    installLink: "Instalar nos seus servidores",
    install: {
      title: "pdffusion para organizações",
      description: "Instale o pdffusion nos servidores do seu órgão público ou empresa: grátis, de código aberto, e seus documentos nunca saem da sua rede.",
      intro: "Órgãos públicos, empresas, hospitais, escolas: instale o pdffusion internamente em minutos e mantenha o controle total dos seus documentos.",
      sections: [
        {
          title: "Seus documentos não saem da sua rede",
          text: "Todo o processamento acontece nos seus próprios servidores, mesmo sem conexão com a Internet. Sem estatísticas, sem serviço externo, sem contas.",
        },
        {
          title: "Tudo incluído",
          text: "Todas as ferramentas do pdffusion, mais de 40 formatos, LibreOffice para Word, Excel e PowerPoint, e os 160 idiomas da interface, em um único contêiner.",
        },
        {
          title: "Grátis e de código aberto",
          text: "O pdffusion é publicado sob a licença MIT: instalação, uso e modificação gratuitos, sem limite de usuários. Suas equipes de segurança podem auditar todo o código.",
        },
        {
          title: "Instalação em 3 comandos",
          text: "Em um servidor com Docker (pelo menos 2 processadores e 2 GB de memória):",
        },
        {
          title: "Atualizações",
          text: "Basta um comando: docker compose pull e depois docker compose up -d. Cada versão é construída e testada automaticamente, sem rede, antes de ser publicada. O guia completo (HTTPS, rede isolada, ajustes) está aqui:",
        },
        {
          title: "Suporte",
          text: "Precisa de ajuda com a instalação, de uma versão com as suas cores, de um contrato de suporte ou de um recurso sob medida? Fale com o desenvolvedor:",
        },
      ],
    },
  },
  tools: {
    fusionner: {
      name: "Juntar",
      tagline: "Reúna vários arquivos (PDF, Word, imagens…) em um único PDF, na ordem que você escolher.",
      seoTitle: "Juntar PDF online grátis (Word, imagens, PDF)",
      seoDescription: "Junte PDF, Word, Excel, PowerPoint e imagens em um único PDF, na ordem que quiser. Grátis, sem cadastro nem marca d'água, arquivos apagados na hora.",
      intro: "Reúna todos os seus documentos em um só arquivo: o pdffusion aceita PDF, mas também documentos Word, planilhas Excel, apresentações e fotos, e os junta em um PDF limpo, com um marcador por arquivo.",
      options: { bookmarks: { label: "Adicionar um marcador por arquivo" } },
      guide: {
        keywords: "juntar pdf, unir pdf, mesclar pdf, combinar pdf, juntar word e pdf, juntar vários pdf em um",
        uses: [
          "Enviar um processo completo (documento de identidade, comprovantes, formulários) em um único arquivo, como pedem a maioria dos órgãos públicos.",
          "Reunir os capítulos de um TCC ou relatório escritos em arquivos separados.",
          "Transformar fotos de documentos tiradas no celular em um único PDF limpo.",
        ],
        steps: [
          {
            title: "Envie seus arquivos",
            text: "PDF, Word, Excel, imagens… quantos precisar.",
          },
          {
            title: "Coloque-os em ordem",
            text: "Arraste-os ou use as setas e a ordem A→Z.",
          },
          {
            title: "Clique em Juntar",
            text: "Você baixa um único PDF, com um marcador por arquivo.",
          },
        ],
        faq: [
          {
            q: "Dá para juntar arquivos Word e fotos com PDFs?",
            a: "Sim. O pdffusion converte cada arquivo em PDF automaticamente antes de juntá-los, na ordem escolhida.",
          },
          {
            q: "Quantos arquivos posso juntar?",
            a: "Até várias centenas de uma vez, sem marca d'água nem cadastro.",
          },
        ],
      },
    },
    convertir: {
      name: "Converter",
      tagline: "Converta qualquer documento ou imagem para outro formato.",
      seoTitle: "Converter PDF para Word, Word para PDF, JPG para PDF — grátis",
      seoDescription: "Conversor gratuito: PDF ↔ Word, Excel, PowerPoint, JPG, PNG, EPUB e mais de 40 formatos. Online, sem cadastro, em alta qualidade.",
      intro: "Um só conversor para todos os formatos: Word para PDF, PDF para Word, JPG para PDF, PDF para JPG, Excel para PDF, PowerPoint para PDF, PNG para JPG, EPUB para PDF… Solte seus arquivos e o pdffusion mostra apenas os formatos possíveis.",
      options: {
        target: { label: "Converter para" },
        dpi: { label: "Resolução das imagens (DPI)" },
        quality: { label: "Qualidade JPG / WebP / AVIF (1-100)" },
      },
      guide: {
        keywords: "pdf para word, word para pdf, jpg para pdf, pdf para jpg, excel para pdf, powerpoint para pdf, conversor pdf grátis",
        uses: [
          "Transformar um PDF em Word para poder editar o texto.",
          "Transformar uma foto ou captura de tela em PDF para enviar a um órgão.",
          "Transformar um documento Word, Excel ou PowerPoint em PDF para que apareça igual em qualquer lugar.",
        ],
        steps: [
          {
            title: "Envie seus arquivos",
            text: "Um ou vários, em qualquer formato comum.",
          },
          {
            title: "Escolha o formato",
            text: "O pdffusion só oferece as conversões possíveis para seus arquivos.",
          },
          {
            title: "Clique em Converter",
            text: "O arquivo convertido é baixado na hora.",
          },
        ],
        faq: [
          {
            q: "A conversão de PDF para Word mantém o layout?",
            a: "Mantém o máximo possível, mas um PDF complexo (colunas, tabelas aninhadas) pode precisar de ajustes: o pdffusion avisa quando é o caso.",
          },
          {
            q: "Quais formatos podem ser convertidos?",
            a: "Mais de 40: PDF, Word, Excel, PowerPoint, OpenDocument, imagens (JPG, PNG, WebP, AVIF, HEIC…), EPUB, texto, HTML e outros.",
          },
        ],
      },
    },
    diviser: {
      name: "Dividir",
      tagline: "Cortar um PDF em vários arquivos menores.",
      seoTitle: "Dividir PDF online grátis — separar páginas",
      seoDescription: "Separe um PDF em vários arquivos: por intervalos de páginas, página por página ou a cada N páginas. Grátis, rápido e sem cadastro.",
      intro: "Envie seu PDF, escolha como cortá-lo e clique em Dividir: você recebe todas as partes em um único arquivo ZIP.",
      options: {
        mode: {
          label: "Como cortar?",
          choices: {
            each: "Cada página separada",
            ranges: "Eu escolho as páginas",
            every: "Em blocos",
          },
          hints: {
            each: "1 página = 1 arquivo. O mais simples.",
            ranges: "Ex.: páginas 1 a 3 em um arquivo, 4 a 10 em outro.",
            every: "Ex.: um novo arquivo a cada 5 páginas.",
          },
        },
        ranges: {
          label: "Quais páginas?",
          placeholder: "1-3, 4-10",
          help: "Uma vírgula separa cada arquivo: “1-3, 4-10” gera 2 arquivos (páginas 1 a 3, depois 4 a 10). Escreva “fim” para a última página.",
        },
        every: {
          label: "Quantas páginas por arquivo?",
        },
      },
      guide: {
        keywords: "dividir pdf, separar pdf, cortar pdf, separar páginas de pdf, extrair cada página de um pdf",
        uses: [
          "Separar uma digitalização grande que contém vários documentos diferentes.",
          "Enviar só parte de um documento pesado demais.",
          "Obter cada página de um PDF em um arquivo separado, ou em imagens.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "A pré-visualização mostra todas as páginas.",
          },
          {
            title: "Escolha como cortar",
            text: "Cada página separada, por intervalos ou em blocos.",
          },
          {
            title: "Clique em Dividir",
            text: "Você recebe todas as partes em um único arquivo ZIP.",
          },
        ],
        faq: [
          {
            q: "Posso escolher exatamente as páginas de cada arquivo?",
            a: "Sim: escreva por exemplo “1-3, 4-10” para obter um arquivo com as páginas 1 a 3 e outro com as páginas 4 a 10.",
          },
          {
            q: "Dá para obter imagens em vez de PDFs?",
            a: "Sim: escolha JPG ou PNG em “Formato do resultado”.",
          },
        ],
      },
    },
    extraire: {
      name: "Extrair / excluir páginas",
      tagline: "Mantenha ou retire algumas páginas de um PDF.",
      seoTitle: "Extrair ou excluir páginas de um PDF — grátis",
      seoDescription: "Mantenha só as páginas úteis de um PDF ou remova as que sobram. Online, grátis, sem cadastro nem marca d'água.",
      intro: "Uma página em branco, um anexo inútil, uma duplicata? Informe as páginas a manter ou remover (por exemplo 1-3, 7, 10-fim) e receba um PDF limpo em segundos.",
      options: {
        mode: { label: "Ação", choices: { keep: "Manter apenas estas páginas", remove: "Excluir estas páginas" } },
        pages: { label: "Páginas", placeholder: "1, 3-5", help: "Ex.: 1-3, 5, 8-fim. Vazio = todas as páginas." },
      },
      guide: {
        keywords: "excluir páginas de pdf, remover páginas de pdf, extrair páginas de pdf, manter páginas de pdf",
        uses: [
          "Remover uma página em branco ou repetida de uma digitalização.",
          "Manter só as páginas úteis de um documento longo antes de enviá-lo.",
          "Retirar uma página com informações pessoais.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "A pré-visualização mostra todas as páginas.",
          },
          {
            title: "Indique as páginas",
            text: "Escolha manter ou excluir: a pré-visualização risca as páginas removidas.",
          },
          {
            title: "Clique no botão",
            text: "Você baixa o PDF mais leve.",
          },
        ],
        faq: [
          {
            q: "Como excluo uma única página de um PDF?",
            a: "Escolha “Excluir estas páginas” e escreva o número dela, por exemplo “3”.",
          },
          {
            q: "O resto do documento é alterado?",
            a: "Não: as outras páginas ficam como estão, sem perda de qualidade.",
          },
        ],
      },
    },
    organiser: {
      name: "Reorganizar páginas",
      tagline: "Mude a ordem das páginas, duplique, inverta.",
      seoTitle: "Reorganizar páginas de PDF online — grátis",
      seoDescription: "Mude a ordem das páginas de um PDF, duplique algumas ou inverta o documento inteiro. Grátis, online, sem cadastro.",
      intro: "Páginas digitalizadas fora de ordem? Informe a nova ordem (por exemplo 3, 1, 2, 4-fim) ou inverta o documento inteiro: o pdffusion faz o resto.",
      options: {
        order: { label: "Nova ordem", placeholder: "3, 1, 2, 4-fim", help: "As páginas não citadas são removidas." },
        reverse: { label: "Inverter o documento inteiro (ignora a ordem acima)" },
      },
      guide: {
        keywords: "reorganizar páginas pdf, mudar a ordem das páginas pdf, mover página pdf, inverter pdf",
        uses: [
          "Colocar de volta em ordem páginas digitalizadas fora de ordem.",
          "Colocar uma capa ou um sumário no início.",
          "Inverter um documento digitalizado ao contrário.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "A pré-visualização mostra todas as páginas.",
          },
          {
            title: "Escreva a nova ordem",
            text: "Por exemplo “3, 1, 2”: a pré-visualização mostra o resultado.",
          },
          {
            title: "Clique em Reorganizar páginas",
            text: "Você baixa o PDF reorganizado.",
          },
        ],
        faq: [
          {
            q: "Dá para duplicar uma página?",
            a: "Sim: escreva o número dela duas vezes, por exemplo “1, 2, 2, 3”.",
          },
          {
            q: "Como inverto o documento inteiro?",
            a: "Marque a opção de inverter: a última página passa a ser a primeira.",
          },
        ],
      },
    },
    renommer: {
      name: "Renomear",
      tagline: "Mudar o nome de um ou vários arquivos, sem enviar nada.",
      seoTitle: "Renomear arquivos online — grátis e sem envio",
      seoDescription: "Renomeie um ou vários arquivos (PDF, Word, imagens…) de uma vez, com numeração automática. Tudo acontece no seu navegador: nada é enviado.",
      intro: "Envie seus arquivos, digite o novo nome e clique em Renomear. Para vários arquivos, o pdffusion adiciona um número: Fatura-1, Fatura-2… Seus arquivos nunca saem do seu aparelho.",
      options: {
        name: {
          label: "Novo nome",
          placeholder: "ex.: Fatura-marco",
          help: "Vários arquivos? Um número é adicionado, na ordem da lista.",
        },
        ext: {
          label: "Nova extensão",
          placeholder: "manter a extensão",
          help: "Mudar a extensão não muda o formato do arquivo. Para transformá-lo, use Converter.",
        },
      },
      guide: {
        keywords: "renomear arquivos, renomear vários arquivos, mudar o nome de um arquivo, renomear pdf online",
        uses: [
          "Dar nomes claros aos documentos de um processo antes de enviá-los (Fatura-1, Fatura-2…).",
          "Renomear de uma vez dezenas de fotos ou digitalizações.",
          "Corrigir o nome de um arquivo sem abrir outro programa.",
        ],
        steps: [
          {
            title: "Envie seus arquivos",
            text: "De qualquer tipo, na ordem desejada.",
          },
          {
            title: "Escreva o novo nome",
            text: "Um número é adicionado se houver vários arquivos; a pré-visualização mostra cada nome novo.",
          },
          {
            title: "Clique em Renomear",
            text: "Um arquivo ou um ZIP é baixado.",
          },
        ],
        faq: [
          {
            q: "Meus arquivos são enviados pela internet?",
            a: "Não: a renomeação acontece totalmente no seu navegador.",
          },
          {
            q: "Mudar a extensão converte o arquivo?",
            a: "Não. Para mudar de verdade o formato (por exemplo de Word para PDF), use a ferramenta Converter.",
          },
        ],
      },
    },
    pivoter: {
      name: "Girar",
      tagline: "Gire todas as páginas ou uma seleção.",
      seoTitle: "Girar PDF online grátis",
      seoDescription: "Gire todas as páginas de um PDF ou só algumas, em 90°, 180° ou 270°. Grátis, rápido e sem cadastro.",
      intro: "Uma digitalização de cabeça para baixo ou uma página na horizontal? Gire o documento inteiro ou só as páginas escolhidas, sem perder qualidade.",
      options: {
        angle: { label: "Rotação", choices: { "90": "90° no sentido horário", "180": "180°", "270": "90° no sentido anti-horário" } },
        pages: { label: "Páginas", placeholder: "todas", help: "Ex.: 1-3, 5, 8-fim. Vazio = todas as páginas." },
      },
      guide: {
        keywords: "girar pdf, rodar pdf, girar uma página pdf, endireitar um pdf digitalizado",
        uses: [
          "Endireitar uma página digitalizada de cabeça para baixo ou de lado.",
          "Colocar em paisagem as páginas de uma tabela.",
          "Corrigir a orientação de um documento fotografado no celular.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "A pré-visualização mostra todas as páginas.",
          },
          {
            title: "Escolha o sentido e as páginas",
            text: "Um quarto de volta ou meia volta, no documento inteiro ou em algumas páginas.",
          },
          {
            title: "Clique em Girar",
            text: "Você baixa o PDF endireitado.",
          },
        ],
        faq: [
          {
            q: "Dá para girar uma só página?",
            a: "Sim: escreva o número dela em “Páginas”; as outras não mudam.",
          },
          {
            q: "Girar reduz a qualidade?",
            a: "Não, a página só é girada, sem nova compressão.",
          },
        ],
      },
    },
    numeroter: {
      name: "Numerar páginas",
      tagline: "Escrever o número em cada página.",
      seoTitle: "Numerar páginas de PDF — grátis online",
      seoDescription: "Adicione números de página a um PDF: posição, formato \"1 / 10\", primeiro número e tamanho à sua escolha. Grátis, sem cadastro.",
      intro: "Envie seu PDF, clique no lugar da página onde o número deve ficar, escolha um estilo e clique em Numerar. A pré-visualização mostra o resultado antes de começar.",
      options: {
        position: {
          label: "Onde colocar o número?",
          choices: {
            "bottom-center": "Embaixo, no meio",
            "bottom-right": "Embaixo, à direita",
            "bottom-left": "Embaixo, à esquerda",
            "top-center": "Em cima, no meio",
            "top-right": "Em cima, à direita",
            "top-left": "Em cima, à esquerda",
          },
        },
        format: {
          label: "Estilo",
          choices: {
            nTotal: "1 / 10",
            n: "1",
            page: "Pág. 1",
            dash: "- 1 -",
          },
          templates: {
            nTotal: "{n} / {total}",
            n: "{n}",
            page: "Pág. {n}",
            dash: "- {n} -",
          },
        },
        start: {
          label: "Primeiro número",
          help: "Ex.: 3 para começar a contar no 3.",
        },
        size: {
          label: "Tamanho dos números",
        },
        pages: {
          label: "Páginas a numerar",
          placeholder: "todas",
          help: "Deixe vazio para todas as páginas. “2-fim” pula a primeira página.",
        },
      },
      guide: {
        keywords: "numerar páginas pdf, adicionar número de página pdf, paginar um pdf",
        uses: [
          "Numerar um TCC, um relatório ou uma candidatura.",
          "Adicionar “1 / 10” para que nenhuma página falte na impressão.",
          "Paginar documentos antes de entregá-los a um tribunal ou órgão público.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "A pré-visualização mostra todas as páginas.",
          },
          {
            title: "Clique no lugar e no estilo",
            text: "O número aparece na hora em cada página da pré-visualização.",
          },
          {
            title: "Clique em Numerar páginas",
            text: "Você baixa o PDF numerado.",
          },
        ],
        faq: [
          {
            q: "Dá para não numerar a primeira página?",
            a: "Sim: em “Mais ajustes”, escreva “2-fim” em “Páginas a numerar”.",
          },
          {
            q: "Dá para começar em outro número que não 1?",
            a: "Sim, em “Mais ajustes”, campo “Primeiro número”.",
          },
        ],
      },
    },
    filigrane: {
      name: "Marca-d'água",
      tagline: "Escrever “CÓPIA” ou “CONFIDENCIAL” em letras grandes em cada página.",
      seoTitle: "Adicionar marca d'água em PDF — grátis online",
      seoDescription: "Aplique um texto como marca d'água (CONFIDENCIAL, CÓPIA, RASCUNHO…) em um PDF, com tamanho, opacidade, ângulo e cor ajustáveis. Grátis.",
      intro: "Envie seu PDF, escolha um texto (ou escreva o seu), veja a pré-visualização e clique em Marca d'água. Útil para proteger a cópia de um documento de identidade.",
      options: {
        text: {
          label: "Texto a escrever",
          default: "CONFIDENCIAL",
          suggestions: ["CONFIDENCIAL", "CÓPIA", "RASCUNHO", "NÃO DIVULGAR"],
        },
        color: {
          label: "Cor",
          choices: {
            gray: "Cinza",
            red: "Vermelho",
            blue: "Azul",
            black: "Preto",
          },
        },
        opacity: {
          label: "Visibilidade",
          choices: {
            "12": "Discreta",
            "25": "Normal",
            "45": "Bem visível",
          },
        },
        rotation: {
          label: "Direção do texto",
          choices: {
            "0": "Na horizontal",
            "45": "Na diagonal",
          },
        },
        size: {
          label: "Tamanho máximo do texto",
          help: "O texto diminui sozinho se for longo demais para a página.",
        },
        pages: {
          label: "Páginas",
          placeholder: "todas",
          help: "Deixe vazio para todas as páginas. Ex.: 1-3, 5, 8-fim.",
        },
      },
      guide: {
        keywords: "marca d'água pdf, adicionar marca d'água, carimbo cópia pdf, marcar confidencial pdf",
        uses: [
          "Marcar a cópia do seu documento de identidade “Cópia só para o aluguel” para que não seja reutilizada.",
          "Indicar “CONFIDENCIAL” ou “RASCUNHO” em um documento interno.",
          "Mostrar que um documento não é a versão final.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "A pré-visualização mostra todas as páginas.",
          },
          {
            title: "Escolha o texto e o estilo",
            text: "Cor, visibilidade e direção: a pré-visualização se atualiza na hora.",
          },
          {
            title: "Clique em Marca-d'água",
            text: "Você baixa o PDF marcado.",
          },
        ],
        faq: [
          {
            q: "Por que colocar marca d'água em um documento de identidade?",
            a: "Uma frase como “Cópia para o processo X de 2 de outubro” impede que uma cópia roubada seja usada para outra coisa.",
          },
          {
            q: "O texto do documento continua legível?",
            a: "Sim: escolha a visibilidade “Discreta” ou “Normal”.",
          },
        ],
      },
    },
    compresser: {
      name: "Comprimir",
      tagline: "Deixar um PDF mais leve para enviar com facilidade.",
      seoTitle: "Comprimir PDF online — reduzir o tamanho grátis",
      seoDescription: "Diminua o peso de um PDF para enviar por e-mail ou anexar em um site oficial. Três níveis de compressão, grátis.",
      intro: "Seu arquivo é pesado demais para um e-mail ou um site? Envie-o, mantenha “Recomendado” e clique em Comprimir. O texto continua nítido.",
      options: {
        level: {
          label: "Quanto reduzir?",
          choices: {
            lossless: "Leve",
            recommended: "Recomendado",
            strong: "Máximo",
          },
          hints: {
            lossless: "Mesma qualidade, ganho pequeno.",
            recommended: "A escolha certa na maioria dos casos.",
            strong: "O menor possível; as fotos ficam um pouco borradas.",
          },
        },
      },
      guide: {
        keywords: "comprimir pdf, reduzir tamanho pdf, diminuir pdf, pdf muito pesado, comprimir pdf para e-mail",
        uses: [
          "Enviar por e-mail um PDF pesado demais.",
          "Subir um documento em um portal com limite de tamanho (geralmente de 2 a 5 MB).",
          "Economizar espaço nas suas pastas.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "Um ou vários.",
          },
          {
            title: "Mantenha “Recomendado”",
            text: "Ou escolha Leve ou Máximo conforme o tamanho desejado.",
          },
          {
            title: "Clique em Comprimir",
            text: "O pdffusion mostra o ganho, por exemplo “8 MB → 2 MB”.",
          },
        ],
        faq: [
          {
            q: "A compressão deixa o texto borrado?",
            a: "Não: o texto continua nítido. Só as imagens ficam mais leves, muito pouco no modo Recomendado.",
          },
          {
            q: "Por que meu PDF não diminui?",
            a: "Provavelmente ele já estava otimizado; o pdffusion avisa.",
          },
        ],
      },
    },
    proteger: {
      name: "Proteger",
      tagline: "Criptografe um PDF com uma senha (AES-256).",
      seoTitle: "Proteger PDF com senha — grátis (AES-256)",
      seoDescription: "Criptografe um PDF com senha (AES-256) e bloqueie impressão, cópia ou edição. Grátis, sem cadastro.",
      intro: "Antes de enviar um holerite ou um documento médico, proteja-o com uma senha forte: sem ela, ninguém consegue abri-lo.",
      options: {
        password: { label: "Senha de abertura" },
        noPrint: { label: "Proibir impressão" },
        noCopy: { label: "Proibir cópia do texto" },
        noEdit: { label: "Proibir edição" },
      },
      guide: {
        keywords: "proteger pdf com senha, criptografar pdf, colocar senha em pdf, bloquear impressão pdf",
        uses: [
          "Enviar um holerite, um prontuário ou um contrato que ninguém mais consiga abrir.",
          "Impedir impressão, cópia ou edição de um documento.",
          "Seguir as regras de confidencialidade da sua organização.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "Um ou vários.",
          },
          {
            title: "Escolha uma senha",
            text: "E, se precisar, o que fica proibido: imprimir, copiar, editar.",
          },
          {
            title: "Clique em Proteger",
            text: "O PDF é criptografado em AES-256; envie a senha por outro meio.",
          },
        ],
        faq: [
          {
            q: "Essa criptografia é segura?",
            a: "Sim: AES-256, o nível usado por bancos e governos. Sem a senha, o conteúdo fica ilegível.",
          },
          {
            q: "O pdffusion guarda minha senha?",
            a: "Não, ela nunca é armazenada. Se você esquecer, ninguém conseguirá abrir o arquivo.",
          },
        ],
      },
    },
    deverrouiller: {
      name: "Desbloquear",
      tagline: "Remova a senha de um PDF cuja senha você conhece.",
      seoTitle: "Desbloquear PDF — remover a senha grátis",
      seoDescription: "Remova a senha de um PDF cuja senha você conhece, para abrir, imprimir ou juntar à vontade. Grátis.",
      intro: "Você sabe a senha, mas digitá-la toda vez é chato? Remova-a de uma vez. O pdffusion nunca burla uma senha que você não conhece.",
      options: { password: { label: "Senha atual", help: "Deixe vazio se o PDF só tiver senha de permissões." } },
      guide: {
        keywords: "desbloquear pdf, remover senha de pdf, tirar proteção de pdf",
        uses: [
          "Parar de digitar a senha toda vez que abre um documento seu.",
          "Remover a proteção antes de juntar ou editar um PDF.",
          "Arquivar documentos sem risco de perder a senha.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "O PDF protegido.",
          },
          {
            title: "Digite a senha",
            text: "A pré-visualização aparece assim que estiver correta.",
          },
          {
            title: "Clique em Desbloquear",
            text: "Você baixa o PDF sem proteção.",
          },
        ],
        faq: [
          {
            q: "Dá para desbloquear um PDF sem a senha?",
            a: "Não. O pdffusion só remove a proteção de documentos cuja senha você conhece.",
          },
          {
            q: "As restrições de impressão também são removidas?",
            a: "Sim, o PDF obtido não tem mais nenhuma restrição.",
          },
        ],
      },
    },
    metadonnees: {
      name: "Metadados",
      tagline: "Edite o título, o autor, o assunto e as palavras-chave.",
      seoTitle: "Editar metadados de PDF (título, autor) — grátis",
      seoDescription: "Altere o título, o autor, o assunto e as palavras-chave de um PDF, ou apague todos. Grátis, online, sem cadastro.",
      intro: "O título na aba do navegador ou o nome do autor revela um modelo antigo? Corrija as propriedades do documento, ou apague-as antes de compartilhar.",
      options: {
        title: { label: "Título" },
        author: { label: "Autor" },
        subject: { label: "Assunto" },
        keywords: { label: "Palavras-chave (separadas por vírgulas)" },
        clear: { label: "Apagar todos os metadados existentes" },
      },
      guide: {
        keywords: "editar metadados pdf, mudar título pdf, autor pdf, propriedades pdf, apagar metadados pdf",
        uses: [
          "Dar um título de verdade a um PDF (o que aparece na aba do navegador).",
          "Apagar o nome do autor ou do programa antes de publicar um documento.",
          "Adicionar palavras-chave para encontrar seus documentos com facilidade.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "Um ou vários.",
          },
          {
            title: "Preencha os campos",
            text: "Título, autor, assunto, palavras-chave, ou marque a opção para apagar tudo.",
          },
          {
            title: "Clique em Metadados",
            text: "Você baixa o PDF atualizado.",
          },
        ],
        faq: [
          {
            q: "O que são os metadados de um PDF?",
            a: "Informações escondidas no arquivo: título, autor, programa usado, datas. Elas podem revelar quem criou o documento.",
          },
          {
            q: "O conteúdo das páginas muda?",
            a: "Não, só essas informações são alteradas.",
          },
        ],
      },
    },
    signer: {
      name: "Assinar",
      tagline: "Colocar sua assinatura em um PDF.",
      seoTitle: "Assinar um PDF online grátis, sem cadastro",
      seoDescription: "Desenhe, escreva ou importe sua assinatura e coloque-a no seu PDF, com a data se precisar. Grátis, sem cadastro, arquivos apagados na hora.",
      intro: "Desenhe sua assinatura com o mouse ou o dedo (ou escreva seu nome), escolha a página e o lugar e clique em Assinar. É uma assinatura visual, como uma assinatura à mão digitalizada.",
      options: {
        signature: {
          label: "Sua assinatura",
        },
        where: {
          label: "Em qual página?",
          choices: {
            last: "Última página",
            first: "Primeira página",
            all: "Todas as páginas",
            custom: "Eu escolho",
          },
        },
        pages: {
          label: "Páginas",
          placeholder: "ex.: 2, 5",
          help: "Ex.: 1-3, 5, 8-fim.",
        },
        position: {
          label: "Onde assinar?",
          choices: {
            "bottom-center": "Embaixo, no meio",
            "bottom-right": "Embaixo, à direita",
            "bottom-left": "Embaixo, à esquerda",
            "top-center": "Em cima, no meio",
            "top-right": "Em cima, à direita",
            "top-left": "Em cima, à esquerda",
          },
        },
        size: {
          label: "Tamanho",
          choices: {
            small: "Pequena",
            medium: "Média",
            large: "Grande",
          },
        },
        date: {
          label: "Adicionar a data de hoje abaixo da assinatura",
        },
      },
      guide: {
        keywords: "assinar pdf, assinatura pdf online, adicionar assinatura em pdf, assinar documento grátis, assinatura manuscrita pdf",
        uses: [
          "Assinar um contrato de aluguel, de trabalho ou uma autorização sem imprimir nem digitalizar.",
          "Rubricar todas as páginas de um contrato.",
          "Assinar pelo celular, com o dedo.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "O documento a assinar.",
          },
          {
            title: "Crie sua assinatura",
            text: "Desenhe, escreva seu nome ou importe uma imagem.",
          },
          {
            title: "Escolha a página e o lugar",
            text: "Confira a pré-visualização e clique em Assinar.",
          },
        ],
        faq: [
          {
            q: "Essa assinatura tem validade legal?",
            a: "É uma assinatura eletrônica simples, como uma assinatura à mão digitalizada: basta para a maioria das situações do dia a dia. Alguns atos exigem uma assinatura eletrônica qualificada, com certificado.",
          },
          {
            q: "Minha assinatura fica guardada?",
            a: "Não: ela só serve para o seu documento e é apagada junto com ele.",
          },
        ],
      },
    },
    caviarder: {
      name: "Ocultar dados",
      tagline: "Apagar de vez informações sensíveis de um PDF.",
      seoTitle: "Ocultar dados de um PDF de forma definitiva",
      seoDescription: "Remova de verdade nomes, endereços, números e áreas de um PDF: o conteúdo oculto é apagado do arquivo, não apenas coberto. Grátis, sem cadastro.",
      intro: "Escreva as palavras que devem sumir, marque as informações a detectar (e-mails, telefones…) ou desenhe retângulos nas páginas. O pdffusion apaga de verdade o conteúdo oculto: não dá para recuperá-lo copiando o texto nem tirando a tarja preta.",
      options: {
        terms: {
          label: "Palavras a remover",
          placeholder: "ex.: Silva, Rua das Flores 12",
          help: "Separe com vírgulas. Todas as ocorrências são removidas, com ou sem maiúsculas.",
        },
        patterns: {
          label: "Detectar automaticamente",
          choices: {
            email: "Endereços de e-mail",
            phone: "Números de telefone",
            iban: "IBAN e números de conta",
            date: "Datas",
            number: "Números (6 dígitos ou mais)",
          },
        },
        areas: {
          label: "Áreas a esconder",
        },
      },
      guide: {
        keywords: "ocultar dados pdf, anonimizar pdf, tarjar pdf, apagar informações sensíveis pdf, censurar pdf",
        uses: [
          "Anonimizar um documento antes de publicar ou compartilhar (nomes, endereços, números).",
          "Responder a um pedido de acesso à informação removendo dados protegidos.",
          "Compartilhar um extrato bancário escondendo os números de conta.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "A pré-visualização mostra todas as páginas.",
          },
          {
            title: "Diga o que esconder",
            text: "Escreva palavras, marque tipos de informação ou desenhe áreas nas páginas.",
          },
          {
            title: "Clique em Ocultar dados",
            text: "O conteúdo escondido é apagado do arquivo, não só coberto.",
          },
        ],
        faq: [
          {
            q: "Por que não desenhar só um retângulo preto?",
            a: "Um retângulo por cima deixa o texto no arquivo: dá para copiar ou tirar o retângulo. O pdffusion apaga de verdade o texto e as imagens sob a área.",
          },
          {
            q: "Maiúsculas fazem diferença?",
            a: "Não: “Silva” também apaga “SILVA” e “silva”.",
          },
        ],
      },
    },
    ocr: {
      name: "Ler uma digitalização",
      tagline: "Tornar pesquisável e copiável o texto de um documento digitalizado ou fotografado.",
      seoTitle: "OCR online grátis: PDF digitalizado com texto pesquisável",
      seoDescription: "Leia o texto de um PDF digitalizado ou de uma foto (OCR) para pesquisar, copiar ou ouvir em voz alta. 16 idiomas, grátis, sem enviar o documento.",
      intro: "Um documento digitalizado ou fotografado é só uma imagem: não dá para pesquisar uma palavra nem copiar uma frase. Ler uma digitalização reconhece cada letra (isso se chama OCR) e adiciona o texto real ao documento sem mudar sua aparência. A leitura acontece no seu aparelho: seu documento não é enviado. Só o modelo do idioma escolhido (alguns MB) é baixado uma vez.",
      options: {
        lang: {
          label: "Idioma do documento",
        },
        format: {
          label: "Resultado",
          choices: {
            pdf: "PDF pesquisável",
            txt: "Texto (.txt)",
          },
          hints: {
            pdf: "O mesmo documento, com texto que se pode pesquisar e copiar.",
            txt: "Só o texto, para reutilizar.",
          },
        },
      },
      guide: {
        keywords: "ocr online, ocr grátis, pdf digitalizado para texto, tornar pdf pesquisável, reconhecimento de texto, imagem para texto",
        uses: [
          "Encontrar uma palavra em um contrato digitalizado longo com Ctrl + F.",
          "Copiar o texto de uma nota fiscal ou carta fotografada.",
          "Tornar arquivos em papel digitalizados acessíveis a pessoas cegas.",
        ],
        steps: [
          {
            title: "Envie sua digitalização",
            text: "Um PDF digitalizado ou a foto de um documento.",
          },
          {
            title: "Escolha o idioma",
            text: "O do texto do documento.",
          },
          {
            title: "Clique em Ler uma digitalização",
            text: "Você obtém um PDF em que se pode pesquisar e copiar o texto, ou um arquivo de texto.",
          },
        ],
        faq: [
          {
            q: "O que significa OCR?",
            a: "Reconhecimento óptico de caracteres: o computador reconhece as letras de uma imagem para transformá-las em texto de verdade.",
          },
          {
            q: "Meu documento é enviado?",
            a: "Não: a leitura acontece totalmente no seu aparelho. Só o modelo do idioma é baixado, uma vez.",
          },
        ],
      },
    },
    remplir: {
      name: "Preencher formulário",
      tagline: "Completar um formulário PDF direto no navegador.",
      seoTitle: "Preencher um formulário PDF online grátis",
      seoDescription: "Complete os campos de um formulário PDF (texto, caixas de seleção, listas) sem programas e baixe-o preenchido, bloqueado se quiser. Grátis, sem cadastro.",
      intro: "Envie um formulário PDF: o pdffusion encontra todos os campos e os mostra como um formulário simples. Preencha, confira a pré-visualização e clique em Preencher formulário para baixar o PDF completo.",
      options: {
        values: {
          label: "Respostas",
        },
        lock: {
          label: "Bloquear as respostas (o formulário não poderá mais ser alterado)",
        },
      },
      guide: {
        keywords: "preencher pdf, preencher formulário pdf online, completar formulário pdf, escrever em pdf",
        uses: [
          "Completar um formulário de órgão público (requerimento, inscrição, declaração) sem imprimir.",
          "Preencher um formulário pelo celular.",
          "Bloquear suas respostas antes de enviar o documento.",
        ],
        steps: [
          {
            title: "Envie o formulário",
            text: "O pdffusion encontra todos os campos a preencher.",
          },
          {
            title: "Preencha os campos",
            text: "A pré-visualização mostra suas respostas no lugar certo da página.",
          },
          {
            title: "Clique em Preencher formulário",
            text: "Você baixa o PDF completo.",
          },
        ],
        faq: [
          {
            q: "Por que o pdffusion não encontra nenhum campo?",
            a: "O PDF não é um formulário interativo (muitas vezes é uma digitalização). Será preciso imprimi-lo ou pedir uma versão interativa ao órgão.",
          },
          {
            q: "O que faz “Bloquear as respostas”?",
            a: "As respostas passam a fazer parte da página e não podem mais ser alteradas.",
          },
        ],
      },
    },
    comparer: {
      name: "Comparar",
      tagline: "Ver o que mudou entre duas versões de um PDF.",
      seoTitle: "Comparar dois PDFs online: ver as diferenças",
      seoDescription: "Compare duas versões de um contrato ou documento PDF: palavras adicionadas em verde, removidas em vermelho e relatório para baixar. Grátis, nada é enviado.",
      intro: "Envie a versão antiga e depois a nova: as diferenças aparecem na hora, palavra por palavra. Clique em Comparar para baixar o relatório. Tudo acontece no seu navegador.",
      options: {
        ignoreCase: {
          label: "Ignorar maiúsculas e minúsculas",
        },
      },
      guide: {
        keywords: "comparar dois pdf, diferenças entre dois pdf, comparar duas versões de um documento, comparar contratos",
        uses: [
          "Verificar o que mudou em um contrato ou aluguel antes de assinar.",
          "Revisar as correções feitas em um relatório ou TCC.",
          "Comparar duas versões de um regulamento ou texto oficial.",
        ],
        steps: [
          {
            title: "Envie a versão antiga",
            text: "Depois a nova, nessa ordem.",
          },
          {
            title: "Leia as diferenças",
            text: "Em verde o que foi adicionado, em vermelho riscado o que foi removido.",
          },
          {
            title: "Clique em Comparar",
            text: "Você baixa um relatório para guardar ou imprimir.",
          },
        ],
        faq: [
          {
            q: "Meus documentos são enviados?",
            a: "Não: a comparação acontece totalmente no seu navegador.",
          },
          {
            q: "Dá para comparar documentos digitalizados?",
            a: "Sim, depois de passá-los pela ferramenta Ler uma digitalização, que extrai o texto.",
          },
        ],
      },
    },
    images: {
      name: "Extrair imagens",
      tagline: "Tirar as fotos e ilustrações de um PDF.",
      seoTitle: "Extrair imagens de um PDF online grátis",
      seoDescription: "Tire todas as fotos, ilustrações e logotipos de um PDF em PNG ou JPG, sem duplicatas. Grátis, sem cadastro, arquivos apagados na hora.",
      intro: "Envie um PDF: o pdffusion encontra todas as imagens que ele contém e as entrega uma a uma, em PNG ou JPG, em um arquivo ZIP. Imagens decorativas pequenas e duplicatas ficam de fora.",
      options: {
        format: {
          label: "Formato das imagens",
          choices: {
            png: "PNG",
            jpg: "JPG",
          },
          hints: {
            png: "Qualidade perfeita, mantém a transparência.",
            jpg: "Arquivos mais leves, ideal para fotos.",
          },
        },
        small: {
          label: "Manter também as imagens pequenas (ícones, marcadores)",
        },
      },
      guide: {
        keywords: "extrair imagens de pdf, tirar fotos de um pdf, salvar imagens de um pdf",
        uses: [
          "Tirar as fotos de um catálogo, relatório ou folheto em PDF.",
          "Reutilizar um logotipo ou gráfico em uma apresentação.",
          "Salvar as imagens de um documento antes de apagá-lo.",
        ],
        steps: [
          {
            title: "Envie seu PDF",
            text: "Um ou vários.",
          },
          {
            title: "Escolha PNG ou JPG",
            text: "PNG para qualidade perfeita, JPG para arquivos mais leves.",
          },
          {
            title: "Clique em Extrair imagens",
            text: "Você recebe todas as imagens em um arquivo ZIP.",
          },
        ],
        faq: [
          {
            q: "Qual a diferença para a conversão de PDF em JPG?",
            a: "A conversão transforma cada página inteira em imagem. Extrair imagens tira só as fotos e ilustrações das páginas, no tamanho original.",
          },
          {
            q: "Por que faltam algumas imagens?",
            a: "Imagens pequenas (ícones, marcadores) são ignoradas por padrão: marque “Manter também as imagens pequenas”. Textos e desenhos vetoriais não são imagens.",
          },
        ],
      },
    },
    redimensionner: {
      name: "Redimensionar / recortar",
      tagline: "Mudar o tamanho de uma imagem ou recortá-la.",
      seoTitle: "Redimensionar e recortar imagens online grátis",
      seoDescription: "Reduza uma foto (em % ou em pixels) ou recorte-a em quadrado, 16:9 ou 4:3 e salve em JPG, PNG ou WebP. Grátis, sem cadastro.",
      intro: "Envie suas imagens, escolha reduzir ou recortar, confira a pré-visualização e clique em Redimensionar / recortar. Prático para foto de perfil, anexo pesado demais ou formulário que exige um tamanho.",
      options: {
        mode: {
          label: "O que fazer?",
          choices: {
            resize: "Redimensionar",
            crop: "Recortar",
          },
          hints: {
            resize: "Manter a imagem inteira, menor.",
            crop: "Cortar as bordas para obter um formato exato.",
          },
        },
        scale: {
          label: "Novo tamanho",
          choices: {
            "25": "25% (um quarto)",
            "50": "50% (metade)",
            "75": "75%",
            custom: "Tamanho exato em pixels",
          },
        },
        width: {
          label: "Largura (pixels)",
        },
        height: {
          label: "Altura (pixels)",
          help: "0 = calculada para manter as proporções.",
        },
        ratio: {
          label: "Formato",
          choices: {
            "1:1": "Quadrado (1:1)",
            "4:3": "Paisagem (4:3)",
            "3:4": "Retrato (3:4)",
            "16:9": "Widescreen (16:9)",
            "9:16": "Vertical (9:16)",
            "3:2": "Foto (3:2)",
          },
        },
        format: {
          label: "Formato do arquivo",
          choices: {
            same: "Manter o formato",
            jpg: "JPG",
            png: "PNG",
            webp: "WebP",
          },
        },
      },
      guide: {
        keywords: "redimensionar imagem, diminuir tamanho de foto, recortar imagem online, reduzir imagem, imagem quadrada",
        uses: [
          "Diminuir uma foto pesada demais para um e-mail ou formulário online.",
          "Recortar uma foto em quadrado para um perfil.",
          "Preparar imagens 16:9 para uma apresentação ou site.",
        ],
        steps: [
          {
            title: "Envie suas imagens",
            text: "JPG, PNG, WebP…",
          },
          {
            title: "Escolha o tamanho ou o formato",
            text: "A pré-visualização mostra a área mantida e o novo tamanho.",
          },
          {
            title: "Clique em Redimensionar / recortar",
            text: "Você baixa as imagens modificadas.",
          },
        ],
        faq: [
          {
            q: "A foto perde qualidade?",
            a: "Uma imagem reduzida tem menos pixels, mas fica nítida no novo tamanho.",
          },
          {
            q: "Onde é feito o recorte?",
            a: "No centro da imagem: as bordas são cortadas por igual para obter o formato escolhido, como mostra a pré-visualização.",
          },
        ],
      },
    },
  },
  errors: {
    unknownTool: "Ferramenta desconhecida.",
    tooLarge: "Envio grande demais (máx. {mb} MB).",
    badRequest: "Solicitação inválida.",
    noFiles: "Adicione pelo menos um arquivo.",
    tooManyFiles: "Arquivos demais: no máximo {max} para esta ferramenta.",
    badOptions: "Opções inválidas.",
    noOutput: "Nenhum arquivo foi gerado.",
    unexpected: "Ocorreu um erro inesperado durante o processamento.",
    inFile: "{file}: {message}",
    pageLimitDocument: "O documento tem {count} páginas, acima do limite de {max} páginas.",
    pageLimitResult: "O resultado teria {count} páginas, acima do limite de {max} páginas.",
    pageLimit: "Limite de {max} páginas excedido.",
    unreadable: "Não foi possível ler \"{name}\": arquivo danificado ou formato não reconhecido.",
    damagedPdf: "Não foi possível ler \"{name}\": PDF danificado.",
    wrongPassword: "Senha incorreta para \"{name}\".",
    passwordProtected: "\"{name}\" está protegido por senha. Use primeiro a ferramenta \"Desbloquear\".",
    notPdf: "\"{name}\" não é um PDF.",
    notPdfConvertFirst: "\"{name}\" não é um PDF. Converta-o primeiro.",
    passwordComma: "A senha não pode conter vírgula.",
    imageFormat: "Formato de imagem não suportado: {format}",
    imageConvert: "Não foi possível converter \"{name}\": imagem ilegível ou danificada.",
    imageUnreadable: "\"{name}\" não é uma imagem legível.",
    officeMissing: "Esta conversão precisa do LibreOffice (Word, Excel, PowerPoint…). Instale-o e reinicie o pdffusion.",
    officeTarget: "Conversão para {target} não suportada.",
    officeTimeout: "A conversão demorou demais e foi interrompida.",
    officeFailed: "O LibreOffice não conseguiu converter \"{name}\" para {target}.",
    officeTooLarge: "\"{name}\" passa de {mb} MB: grande demais para uma conversão de Word, Excel ou PowerPoint.",
    conversionImpossible: "Conversão {from} → {to} impossível.",
    conversionImpossibleOffice: "Conversão {from} → {to} impossível (instalar o LibreOffice adiciona os formatos Word, Excel e PowerPoint).",
    watermarkText: "Informe o texto da marca-d'água.",
    emptyResult: "O documento resultante não teria nenhuma página.",
    chooseTarget: "Escolha o formato de saída.",
    passwordOrRestriction: "Informe uma senha ou pelo menos uma restrição.",
    pageInvalid: "\"{token}\" não é um número de página válido.",
    pageMissing: "A página {n} não existe (o documento tem {total} páginas).",
    rangeInvalid: "Intervalo inválido: \"{part}\".",
    rangeRequired: "Informe pelo menos um intervalo de páginas.",
    signatureMissing: "Crie primeiro sua assinatura: desenhe, escreva seu nome ou importe uma imagem.",
    redactNothing: "Informe palavras, marque um tipo de informação ou desenhe uma área a esconder.",
    redactNone: "Nada a ocultar: nenhuma das palavras ou informações pedidas foi encontrada no documento.",
    formNoFields: "“{name}” não tem campos de formulário para preencher.",
    formLockUnicode: "Algumas respostas contêm caracteres que não podem ser fixados na página. Desmarque “Bloquear as respostas” para mantê-las editáveis.",
    noImages: "Nenhuma imagem encontrada neste PDF. Textos e desenhos vetoriais não são imagens.",
    notImage: "“{name}” não é uma imagem (JPG, PNG, WebP…).",
  },
};

export default pt;
