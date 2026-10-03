import type { Messages } from "./fr";

const zh: Messages = {
  meta: {
    title: "pdff — 免费合并、转换和编辑 PDF、Word、Excel",
    description: "免费在线工具，可合并、转换、压缩、拆分和加密 PDF、Word、Excel、PowerPoint 及图片文件。无需注册，文件处理后立即删除。",
    keywords: "合并pdf, pdf转换, pdf转word, word转pdf, jpg转pdf, pdf转jpg, 压缩pdf, 拆分pdf, excel转pdf, 免费pdf工具",
  },
  nav: { merge: "合并", convert: "转换", allTools: "全部工具", back: "← 全部工具" },
  footer: {
    text: "免费，无需注册。处理完成后，您的文件会立即删除。",
    skip: "跳到主要内容",
    legalNav: "网站信息",
    developedBy: "由 {name} 设计开发",
  },
  home: {
    title: "所有文档，一个工具搞定。",
    subtitle: "PDF、Word、Excel、PowerPoint、图片：几秒内完成合并、转换和编辑。",
    ctaMerge: "合并文件",
    ctaConvert: "转换文件",
    trust: "免费、无需注册、不加水印。",
    orbitHint: "抓住一个图标，甩动圆环，点一下中间的文档。",
    orbitCore: "让圆环炸开",
    formatsTitle: "支持 {n} 种格式",
    formatsSubtitle: "都是政府机关、学校和企业里真正在流转的格式。",
    stepsTitle: "三步就够了",
    steps: [
      { title: "放入", text: "拖入文件，或在手机上选择文件。" },
      { title: "选择", text: "调整顺序、输出格式或要保留的页面。" },
      { title: "下载", text: "结果自动下载，随时可以发送。" },
    ],
  },
  categories: { organiser: "整理", convertir: "转换", modifier: "编辑", securite: "安全" },
  formatCategories: {
    pdf: "PDF",
    image: "图片",
    document: "文本文档",
    spreadsheet: "电子表格",
    presentation: "演示文稿",
    ebook: "电子书和固定版式文档",
    text: "纯文本",
    web: "网页",
  },
  formatNames: {
    odt: "OpenDocument 文本 (ODT)",
    cbz: "漫画 (CBZ)",
    txt: "文本 (TXT)",
    doc: "Word 97-2003 (DOC)",
    xls: "Excel 97-2003 (XLS)",
    ppt: "PowerPoint 97-2003 (PPT)",
  },
  notice: {
    officeMissingTitle: "Word、Excel 和 PowerPoint 格式已停用。",
    officeMissingText: "安装 LibreOffice（免费）即可启用，然后重启 pdff。Windows 上：",
  },
  workspace: {
    dropTitle: "把文件拖到这里",
    dropActive: "松手，开始吧",
    dropPdfOnly: "PDF 文件",
    dropAny: "PDF、Word、Excel、PowerPoint、图片、EPUB、文本……",
    choose: "选择文件",
    addMore: "添加文件",
    fileCount: "{n} 个文件",
    dragHint: "拖动即可调整顺序。",
    sortAZ: "按名称排序",
    reverse: "倒序",
    clear: "全部移除",
    moveUp: "上移",
    moveDown: "下移",
    remove: "移除",
    rejected: "此工具不支持以下格式：{files}",
    settings: "设置",
    noSettings: "无需设置。",
    approximate: "从 PDF 转换时会重建版式：结果可能需要手动调整，扫描件尤其如此。",
    targetEmpty: "添加文件后即可查看可用格式。",
    targetNone: "这些文件没有共同的输出格式。",
    uploading: "正在上传… {pct}%",
    processing: "正在处理…",
    processingShort: "处理中…",
    cancel: "取消",
    done: "{s} 秒内完成",
    doneMany: "{s} 秒内完成，共 {n} 个文件（ZIP）",
    download: "下载",
    downloadResult: "✓ 下载结果",
    restart: "重新开始",
    limits: "每次最多 {pages} 页、{files} 个文件。",
    errorConnection: "无法连接服务器。",
    errorGeneric: "处理失败。",
    advanced: "更多设置（可选）",
    preview: "预览",
    saved: "{before} → {after}：减小了 {pct}",
    savedNone: "该文件已经优化得很好，无法再缩小。",
    outputLabel: "结果格式",
    resultName: "生成文件的名称",
    resultNamePlaceholder: "自动",
    resultNameHelp: "扩展名会自动加上。",
    previewTitle: "预览",
    previewResult: "结果预览",
    previewLoading: "正在准备预览…",
    previewLocked: "文档受保护：输入密码即可查看预览。",
    previewNone: "此格式无法预览。",
    previewMore: "+ {n} 页",
    previewFile: "文件 {n}",
    previewInvalid: "请检查页码：页码正确后预览会立即更新。",
    localOnly: "在您的浏览器中处理：文件不会上传。",
    sigDraw: "手写",
    sigType: "输入",
    sigUpload: "上传",
    sigClear: "清除",
    sigTypePlaceholder: "您的姓名",
    sigDrawHint: "用鼠标或手指在框内签名。",
    sigUploadHint: "签名图片（PNG 或 JPG），最好是白色背景。",
    areaHint: "在页面上拖出一个矩形即可遮盖该区域（照片、签名、印章等）。",
    areaRemove: "移除此区域",
    areaCount: "需遮盖的区域：{n}",
    ocrLoading: "正在准备识别（下载语言模型）…",
    ocrProgress: "正在识别文字：第 {n} 页，共 {total} 页…",
    formLoading: "正在读取表单字段…",
    formNone: "此 PDF 没有可填写的字段。需要交互式 PDF 表单才能在上面填写。",
    formFilled: "已填写字段：{n} / {total}",
    formChoose: "— 请选择 —",
    formFields: "表单字段",
    compareNeedTwo: "请放入两个 PDF：先放旧版本，再放新版本。",
    compareOld: "旧版本",
    compareNew: "新版本",
    compareLoading: "正在比较…",
    compareSummary: "新增 {added} 个词，删除 {removed} 个词",
    compareSame: "文字没有差异：两个版本内容相同。",
    compareLegend: "绿色：新增的文字。红色删除线：删除的文字。",
    comparePages: "页数：{a} → {b}",
    compareNoText: "这些 PDF 没有可读取的文字（扫描件？）。请先用 OCR 工具处理。",
    compareReport: "比较报告",
    compareSkipped: "…… {n} 个相同的词 ……",
    heicConverting: "正在处理 iPhone 照片（HEIC）…",
    sizeChange: "{from} → {to} 像素",
  },
  language: {
    button: "语言",
    title: "选择语言",
    search: "搜索语言…",
    verified: "人工审校翻译",
    automatic: "自动翻译",
    current: "当前语言",
    translating: "正在将 pdff 翻译为{lang}…",
    unavailable: "此服务器尚未启用自动翻译：pdff 以英文显示。",
    failed: "翻译为{lang}失败，请稍后再试。",
    noResult: "没有匹配的语言。",
    close: "关闭",
    auto: "自动（浏览器语言）",
  },
  seo: {
    whyTitle: "为什么选择 pdff？",
    why: [
      { title: "完全免费", text: "无需订阅，无需银行卡，不会在文档上添加水印。" },
      { title: "无需注册", text: "不用创建账户：打开页面，放入文件，即可完成。" },
      { title: "文件只属于您", text: "处理完成后立即删除。我们不保留您的文档，也不保留您的数据。" },
      { title: "支持所有格式", text: "PDF、Word、Excel、PowerPoint、OpenDocument、图片、EPUB……电脑和手机都能用。" },
    ],
    howTitle: "如何使用？",
    faqTitle: "常见问题",
    faq: [
      { q: "pdff 真的免费吗？", a: "是的。所有工具都免费，没有水印，也没有需要订阅才能解锁的功能。我们从不要求银行卡。" },
      { q: "需要创建账户吗？", a: "不需要。无需注册，无需邮箱，直接使用即可。" },
      { q: "我的文档会被保存吗？", a: "不会。您的文件只用于您请求的操作，完成后即被删除。没有人会查看，也不会与任何人共享。" },
      {
        q: "手机上能用吗？",
        a: "可以。pdff 可在任何手机、平板或电脑（Android、iPhone、Windows、Mac、Linux）的浏览器中运行，无需安装任何软件。",
      },
      {
        q: "支持哪些格式？",
        a: "PDF、Word（DOCX、DOC）、Excel（XLSX、XLS、CSV）、PowerPoint（PPTX、PPT）、OpenDocument（ODT、ODS、ODP）、RTF、图片（JPG、PNG、WebP、AVIF、HEIC（iPhone）、TIFF、GIF、SVG）、EPUB、TXT、HTML 等。",
      },
      { q: "有什么限制吗？", a: "每次最多可处理 {files} 个文件，生成的文档最多可达 {pages} 页。" },
    ],
    moreTools: "更多工具",
    privacyLink: "隐私",
    sourceLink: "开源代码",
    usesTitle: "有什么用？",
    toolFaqTitle: "关于此工具的问题",
  },
  privacy: {
    title: "隐私",
    description: "pdff 如何处理您的文件：无需账户，不保留任何文档，没有广告，也不出售数据。",
    updated: "最后更新：{date}",
    intro: "pdff 的设计原则是：您的文档始终属于您。下面用简单的话说明您使用时会发生什么。",
    sections: [
      {
        title: "您的文件",
        text: "文件通过加密连接（HTTPS）上传，自动处理，结果生成后立即删除。大文件会以随机名称暂存在临时存储中，处理结束后即被清除；自动清理程序最迟在 24 小时内删除任何残留文件。",
      },
      { title: "无需账户，不收集个人数据", text: "pdff 不要求注册、邮箱或银行卡。您的文档不会被查看、分析、共享，也不会用于训练人工智能。" },
      {
        title: "访问统计",
        text: "我们以匿名且不使用 Cookie 的方式统计访问量（Vercel Web Analytics），以了解哪些工具有用。没有广告，也没有跨站跟踪。",
      },
      { title: "Cookie", text: "只有一个可选的 Cookie：用于记住您选择的语言。" },
      {
        title: "托管",
        text: "网站托管在 Vercel 位于巴黎的服务器上；Word、Excel 和 PowerPoint 的转换由位于法兰克福的 Render 完成。这些服务商仅在转换期间处理文件。",
      },
      { title: "联系我们", text: "有问题或建议？请通过项目页面联系我们：" },
    ],
  },
  legal: {
    termsLink: "使用条款",
    securityLink: "安全与数据",
    accessibilityLink: "无障碍",
    terms: {
      title: "使用条款",
      description: "pdff 对所有人免费，包括企业和政府机构。您的文档始终属于您：不分析、不保存。",
      intro: "本条款规定 pdff 的使用规则。条款刻意简短，用平实的语言写成。使用本网站即表示您接受本条款。",
      sections: [
        {
          title: "pdff 的发布者",
          text: "pdff 由 Mikailou Cedric Toure 设计、开发和发布，他是一名常驻加拿大新不伦瑞克省的开发者。",
        },
        {
          title: "人人可用的免费使用许可",
          text: "pdff 免费、无需注册、没有期限，面向所有人：个人、学生、教师、企业、协会、公共机构和政府，无论在加拿大还是其他任何国家。没有任何用途仅限付费方案，因为根本没有付费方案。您生成的文件完全归您所有：不带水印，也不带任何 pdff 标识。",
        },
        {
          title: "所有文档，包括机密文档",
          text: "您可以处理任何类型的文档，包括机密文档，因为 pdff 不会读取、分析、保存或分享您的文件：文件会被自动处理，随后删除。您仍是文件的所有者，并负责确保拥有处理这些文件所需的权利。",
        },
        {
          title: "源代码与在自有服务器上安装",
          text: "pdff 的代码以 MIT 许可证发布。您可以免费查看、审计代码，将其安装在自己的服务器上（包括无法连接互联网的封闭网络），修改并再分发，只需保留版权声明和许可证文本。",
        },
        {
          title: "可接受的使用",
          text: "禁止将 pdff 用于违法活动、试图干扰服务（大规模自动上传、入侵尝试）或绕过其技术限制。文件大小和数量的限制是为了保护所有人的使用。",
        },
        {
          title: "可用性",
          text: "pdff 免费提供。服务可能变更、因维护而中断或停止运营。请始终保留原始文档：pdff 不保留任何副本。",
        },
        {
          title: "担保与责任",
          text: "本服务按“现状”提供，不作任何形式的担保。在法律允许的最大范围内，发布者不对间接损失、数据丢失或不完美的转换结果承担责任。将生成的文档用于重要事项前，请先核对。",
        },
        {
          title: "知识产权",
          text: "pdff 名称、标志和网站文字归发布者所有；代码如上所述采用 MIT 许可证。文中提及的商标（PDF、Word、Excel、PowerPoint 等）归各自所有者所有。",
        },
        {
          title: "适用法律",
          text: "本条款受加拿大新不伦瑞克省法律及适用于该省的加拿大联邦法律管辖。新不伦瑞克省法院拥有管辖权，但不影响您所在国家法律赋予您作为消费者的权利。",
        },
        {
          title: "修改",
          text: "本条款可能会更新。页面顶部的日期表示现行版本；修改仅适用于发布之后的使用。",
        },
        {
          title: "联系",
          text: "对本条款有疑问？请通过项目页面联系我们：",
        },
      ],
    },
    security: {
      title: "安全与数据",
      description: "您的文件在 pdff 上的处理方式：自动处理、不做分析、立即删除、加密传输、欧洲托管，并可安装在您自己的服务器上。",
      intro: "您的文件会怎样、在哪里处理、如何受到保护：用简单的话说明，个人用户和 IT 部门都能看懂。",
      sections: [
        {
          title: "不保留任何文档",
          text: "您的文件会被自动处理，结果生成或下载后立即删除。没有副本、没有备份、没有历史记录。每天的自动清理还会删除任何可能残留的临时文件，最迟在第二天完成。",
        },
        {
          title: "不做任何分析",
          text: "没有人会阅读您的文档。文档不会被索引、分析、分享，也不会用于训练人工智能。pdff 没有账户、没有广告，也没有用户画像。",
        },
        {
          title: "加密",
          text: "所有连接均经过加密（HTTPS），网站在每次访问时强制使用加密（HSTS）。“保护”工具使用 AES-256 加密您的 PDF；您设置的密码从不保存。",
        },
        {
          title: "文件在哪里处理",
          text: "网站及 PDF、图片工具：Vercel，巴黎数据中心（法国，欧盟）。Word、Excel 和 PowerPoint 转换：Render，位于法兰克福（德国，欧盟）。超过 4 MB 的文件：以随机名称临时存放于 Vercel Blob，使用后删除。",
        },
        {
          title: "技术防护",
          text: "安全响应头（HSTS、禁止网站被嵌入其他页面、防止文件类型混淆），无法猜测的临时文件地址，以及只接受携带密钥令牌请求的转换服务。每次代码修改在上线前都会自动检查（测试、类型检查）。",
        },
        {
          title: "隐私与适用法律",
          text: "pdff 在新不伦瑞克省发布，遵守加拿大《个人信息保护和电子文件法》（PIPEDA）。它不收集任何用户个人信息：没有账户、没有电子邮件地址、没有跟踪 Cookie。其设计遵循与欧盟《通用数据保护条例》（GDPR）和魁北克省第 25 号法律相同的原则：数据最小化、不再利用、处理后删除。",
        },
        {
          title: "适用于有严格规定的机构",
          text: "如果贵机构的规定禁止将文档发送给外部服务，可以将 pdff 安装在自己的服务器上。完整软件免费、开源，无需连接互联网即可运行：任何文件都不会离开您的网络。安装指南见项目页面。",
        },
        {
          title: "透明",
          text: "完整的源代码是公开的：您的安全团队可以逐一核实上述每项说明。",
        },
        {
          title: "报告安全漏洞",
          text: "认为自己发现了安全漏洞？请通过项目页面的“Security”标签保密报告：",
        },
      ],
    },
    accessibility: {
      title: "无障碍",
      description: "pdff 无障碍声明：目标为 WCAG 2.2 AA 级、已采取的措施、已知局限以及如何报告障碍。",
      intro: "每个人都应能使用 pdff，包括视障或低视力人士、聋人或听障人士，以及有肢体或认知障碍的人士。",
      sections: [
        {
          title: "目标标准",
          text: "pdff 的目标是符合 W3C 国际标准《Web 内容无障碍指南》（WCAG）2.2 AA 级。该级别涵盖加拿大政府《网站无障碍标准》、欧洲标准 EN 301 549 和美国第 508 条的要求，这些标准均引用 WCAG 2.0 或 2.1 AA 级。",
        },
        {
          title: "符合状态",
          text: "pdff 部分符合 WCAG 2.2 AA 级，已知局限列于下文。本声明基于 2026 年 10 月 2 日进行的内部评估，使用了自动化工具（axe、Lighthouse）和人工检查（键盘、对比度、缩放、读屏播报）。目前尚未进行独立审计。",
        },
        {
          title: "已采取的措施",
          text: "整个网站都可以用键盘操作，提供“跳到主要内容”链接，当前元素有清晰可见的轮廓。文字对比度至少为 4.5:1。任务的各个阶段（上传、结果、错误）会播报给读屏软件。无需拖放，用按钮即可调整文件顺序。网站遵循设备的“减少动态效果”设置，届时动画会完全停止。页面在 400% 缩放和手机上依然清晰可读。每个页面都声明了语言，阿拉伯语从右向左显示。",
        },
        {
          title: "已知局限",
          text: "若未开启该设置，装饰性动画（背景、圆环、格式滚动条）会持续播放；鼠标悬停或键盘聚焦时滚动条会暂停。首页的动画圆环需用鼠标或手指操作；它是装饰性的，其展示的格式列表在页面上也以文字形式提供。机器翻译的语言可能存在不准确之处。此外，生成文档的无障碍程度取决于原始文档：pdff 不会为没有无障碍标签的 PDF 添加标签。",
        },
        {
          title: "报告障碍",
          text: "网站的某个部分给您带来困难？请通过项目页面描述问题；我们会尽量在 10 个工作日内回复，若修复需要更长时间，会提供替代方案：",
        },
      ],
    },
    installLink: "安装到您的服务器",
    install: {
      title: "面向机构的 pdff",
      description: "将 pdff 安装在贵机构或公司的服务器上：免费、开源，文档永远不会离开您的网络。",
      intro: "政府机构、企业、医院、学校：几分钟即可在内部安装 pdff，完全掌控您的文档。",
      sections: [
        {
          title: "文档不离开您的网络",
          text: "所有处理都在您自己的服务器上完成，即使没有互联网连接也可以。没有统计、没有外部服务、没有账户。",
        },
        {
          title: "全部包含",
          text: "pdff 的全部工具、40 多种格式、用于 Word、Excel 和 PowerPoint 的 LibreOffice，以及 160 种界面语言，都在一个容器里。",
        },
        {
          title: "免费开源",
          text: "pdff 以 MIT 许可证发布：免费安装、使用和修改，不限用户数量。您的安全团队可以审计全部代码。",
        },
        {
          title: "3 条命令完成安装",
          text: "在装有 Docker 的服务器上（至少 2 个处理器和 2 GB 内存）：",
        },
        {
          title: "更新",
          text: "一条命令即可：先 docker compose pull，再 docker compose up -d。每个版本在发布前都会在断网环境下自动构建和测试。完整指南（HTTPS、隔离网络、设置）见：",
        },
        {
          title: "技术支持",
          text: "需要安装协助、定制品牌版本、支持合同或定制功能？请联系开发者：",
        },
      ],
    },
  },
  tools: {
    fusionner: {
      name: "合并",
      tagline: "按您选择的顺序，把多个文件（PDF、Word、图片……）合并成一个 PDF。",
      seoTitle: "免费在线合并 PDF（Word、图片、PDF）",
      seoDescription: "按您想要的顺序，将 PDF、Word、Excel、PowerPoint 和图片合并为一个 PDF。免费、无需注册、无水印，文件立即删除。",
      intro: "把所有材料放进一个文件：pdff 不仅支持 PDF，还支持 Word 文档、Excel 表格、演示文稿和照片，并将它们合并成一个整洁的 PDF，每个文件都有一个书签。",
      options: { bookmarks: { label: "为每个文件添加书签" } },
      guide: {
        keywords: "合并pdf, pdf合并, 多个pdf合成一个, 合并word和pdf, 在线合并pdf",
        uses: [
          "按大多数机构的要求，把完整材料（身份证件、证明、表格）作为一个文件提交。",
          "把分开写的论文或报告各章合并在一起。",
          "把手机拍的文件照片整理成一个干净的 PDF。",
        ],
        steps: [
          {
            title: "放入文件",
            text: "PDF、Word、Excel、图片……需要多少放多少。",
          },
          {
            title: "排好顺序",
            text: "拖动排序，或使用箭头和 A→Z 排序。",
          },
          {
            title: "点击“合并”",
            text: "下载一个 PDF，每个文件都有一个书签。",
          },
        ],
        faq: [
          {
            q: "可以把 Word 文件和照片与 PDF 合并吗？",
            a: "可以。pdff 会先自动把每个文件转换为 PDF，再按您选择的顺序合并。",
          },
          {
            q: "可以合并多少个文件？",
            a: "一次最多几百个，没有水印，也无需注册。",
          },
        ],
      },
    },
    convertir: {
      name: "转换",
      tagline: "把任意文档或图片转换为其他格式。",
      seoTitle: "PDF 转 Word、Word 转 PDF、JPG 转 PDF — 免费",
      seoDescription: "免费转换器：PDF ↔ Word、Excel、PowerPoint、JPG、PNG、EPUB 等 40 多种格式。在线使用，无需注册，高质量输出。",
      intro: "一个转换器搞定所有格式：Word 转 PDF、PDF 转 Word、JPG 转 PDF、PDF 转 JPG、Excel 转 PDF、PowerPoint 转 PDF、PNG 转 JPG、EPUB 转 PDF……放入文件后，pdff 只会显示可以转换的格式。",
      options: {
        target: { label: "转换为" },
        dpi: { label: "图片分辨率（DPI）" },
        quality: { label: "JPG / WebP / AVIF 质量（1-100）" },
      },
      guide: {
        keywords: "pdf转word, word转pdf, jpg转pdf, pdf转jpg, excel转pdf, ppt转pdf, 免费pdf转换器",
        uses: [
          "把 PDF 转成 Word，以便修改文字。",
          "把照片或截图转成 PDF 发给机构。",
          "把 Word、Excel 或 PowerPoint 文档转成 PDF，在任何设备上显示都一样。",
        ],
        steps: [
          {
            title: "放入文件",
            text: "一个或多个，常见格式均可。",
          },
          {
            title: "选择格式",
            text: "pdff 只显示您的文件可以转换的格式。",
          },
          {
            title: "点击“转换”",
            text: "转换后的文件会立即下载。",
          },
        ],
        faq: [
          {
            q: "PDF 转 Word 能保留排版吗？",
            a: "会尽量保留，但复杂的 PDF（多栏、嵌套表格）可能需要少量调整，pdff 会提醒您。",
          },
          {
            q: "可以转换哪些格式？",
            a: "40 多种：PDF、Word、Excel、PowerPoint、OpenDocument、图片（JPG、PNG、WebP、AVIF、HEIC 等）、EPUB、文本、HTML 等。",
          },
        ],
      },
    },
    diviser: {
      name: "拆分",
      tagline: "把一个 PDF 拆成几个小文件。",
      seoTitle: "免费在线拆分 PDF — 分离页面",
      seoDescription: "将一个 PDF 拆分为多个文件：按页码范围、逐页或每 N 页拆分。免费、快速、无需注册。",
      intro: "放入 PDF，选择拆分方式，然后点击“拆分”：所有部分会打包在一个 ZIP 文件里给您。",
      options: {
        mode: {
          label: "怎么拆分？",
          choices: {
            each: "每页单独一个",
            ranges: "我来选页面",
            every: "按固定页数",
          },
          hints: {
            each: "1 页 = 1 个文件。最简单。",
            ranges: "例如：第 1–3 页一个文件，第 4–10 页另一个。",
            every: "例如：每 5 页一个新文件。",
          },
        },
        ranges: {
          label: "哪些页面？",
          placeholder: "1-3, 4-10",
          help: "用逗号分隔每个文件：“1-3, 4-10”会得到 2 个文件（第 1–3 页，然后第 4–10 页）。最后一页可写“end”。",
        },
        every: {
          label: "每个文件多少页？",
        },
      },
      guide: {
        keywords: "拆分pdf, 分割pdf, pdf拆分页面, 提取pdf每一页",
        uses: [
          "拆开一个包含多份不同文件的大扫描件。",
          "只发送过大文档的一部分。",
          "把 PDF 的每一页存成单独的文件或图片。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "预览会显示所有页面。",
          },
          {
            title: "选择拆分方式",
            text: "每页单独、按页码范围或按固定页数。",
          },
          {
            title: "点击“拆分”",
            text: "所有部分打包在一个 ZIP 文件中。",
          },
        ],
        faq: [
          {
            q: "可以精确指定每个文件的页面吗？",
            a: "可以：例如输入“1-3, 4-10”，得到一个含第 1–3 页的文件和一个含第 4–10 页的文件。",
          },
          {
            q: "可以得到图片而不是 PDF 吗？",
            a: "可以：在“结果格式”中选择 JPG 或 PNG。",
          },
        ],
      },
    },
    extraire: {
      name: "提取 / 删除页面",
      tagline: "保留或删除 PDF 中的部分页面。",
      seoTitle: "提取或删除 PDF 页面 — 免费",
      seoDescription: "只保留 PDF 中有用的页面，或删除多余的页面。在线、免费、无需注册、无水印。",
      intro: "有空白页、无用的附件或重复页？输入要保留或删除的页码（例如 1-3, 7, 10-end），几秒钟即可得到整洁的 PDF。",
      options: {
        mode: { label: "操作", choices: { keep: "仅保留这些页面", remove: "删除这些页面" } },
        pages: { label: "页面", placeholder: "1, 3-5", help: "例如：1-3, 5, 8-end。留空 = 全部页面。" },
      },
      guide: {
        keywords: "删除pdf页面, 去掉pdf某一页, 提取pdf页面, 保留部分pdf页面",
        uses: [
          "去掉扫描件中的空白页或重复页。",
          "发送前只保留长文档中有用的页面。",
          "删除包含个人信息的页面。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "预览会显示所有页面。",
          },
          {
            title: "填写页码",
            text: "选择保留或删除：预览中被删除的页面会打上叉。",
          },
          {
            title: "点击按钮",
            text: "下载精简后的 PDF。",
          },
        ],
        faq: [
          {
            q: "如何只删除 PDF 的一页？",
            a: "选择“删除这些页面”，输入页码，例如“3”。",
          },
          {
            q: "文档的其他部分会变吗？",
            a: "不会：其他页面保持原样，质量不变。",
          },
        ],
      },
    },
    organiser: {
      name: "调整页面顺序",
      tagline: "更改页面顺序、复制、倒序。",
      seoTitle: "在线重新排列 PDF 页面 — 免费",
      seoDescription: "调整 PDF 页面顺序、复制部分页面或倒序整个文档。免费、在线、无需注册。",
      intro: "扫描的页面顺序乱了？输入新的顺序（例如 3, 1, 2, 4-end）或将整个文档倒序，其余交给 pdff。",
      options: {
        order: { label: "新顺序", placeholder: "3, 1, 2, 4-end", help: "未列出的页面将被删除。" },
        reverse: { label: "整个文档倒序（忽略上面的顺序）" },
      },
      guide: {
        keywords: "调整pdf页面顺序, pdf页面排序, 移动pdf页面, 倒序pdf",
        uses: [
          "把扫描时弄乱的页面重新排好。",
          "把封面或目录放到最前面。",
          "把扫描时顺序颠倒的文档倒过来。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "预览会显示所有页面。",
          },
          {
            title: "输入新顺序",
            text: "例如“3, 1, 2”，预览会显示结果。",
          },
          {
            title: "点击“调整页面顺序”",
            text: "下载排好顺序的 PDF。",
          },
        ],
        faq: [
          {
            q: "可以复制某一页吗？",
            a: "可以：把页码写两次，例如“1, 2, 2, 3”。",
          },
          {
            q: "如何把整个文档倒序？",
            a: "勾选倒序选项：最后一页会变成第一页。",
          },
        ],
      },
    },
    renommer: {
      name: "重命名",
      tagline: "修改一个或多个文件的名称，无需上传。",
      seoTitle: "在线重命名文件 — 免费且无需上传",
      seoDescription: "一次重命名一个或多个文件（PDF、Word、图片等），自动编号。全部在浏览器中完成：不会上传任何内容。",
      intro: "放入文件，输入新名称，然后点击“重命名”。如果有多个文件，pdff 会加上编号：Invoice-1、Invoice-2…… 您的文件始终不会离开您的设备。",
      options: {
        name: {
          label: "新名称",
          placeholder: "例如：Invoice-March",
          help: "多个文件？会按列表顺序加上编号。",
        },
        ext: {
          label: "新扩展名",
          placeholder: "保留原扩展名",
          help: "修改扩展名不会改变文件格式。如需转换格式，请使用“转换”。",
        },
      },
      guide: {
        keywords: "批量重命名文件, 重命名多个文件, 修改文件名, 在线重命名pdf",
        uses: [
          "提交前给材料起清楚的名字（Invoice-1、Invoice-2……）。",
          "一次重命名几十张照片或扫描件。",
          "不用打开其他软件就能改文件名。",
        ],
        steps: [
          {
            title: "放入文件",
            text: "任何类型，按您想要的顺序。",
          },
          {
            title: "输入新名称",
            text: "多个文件会加上编号；预览会显示每个新名称。",
          },
          {
            title: "点击“重命名”",
            text: "下载一个文件或 ZIP 压缩包。",
          },
        ],
        faq: [
          {
            q: "我的文件会上传到网上吗？",
            a: "不会：重命名完全在您的浏览器中完成。",
          },
          {
            q: "修改扩展名会转换文件吗？",
            a: "不会。如需真正转换格式（例如 Word 转 PDF），请使用“转换”工具。",
          },
        ],
      },
    },
    pivoter: {
      name: "旋转",
      tagline: "旋转全部页面或所选页面。",
      seoTitle: "免费在线旋转 PDF",
      seoDescription: "将 PDF 的全部或部分页面旋转 90°、180° 或 270°。免费、快速、无需注册。",
      intro: "扫描件倒过来了，或者有横向页面？旋转整个文档或只旋转选中的页面，画质不受影响。",
      options: {
        angle: { label: "旋转角度", choices: { "90": "顺时针 90°", "180": "180°", "270": "逆时针 90°" } },
        pages: { label: "页面", placeholder: "全部", help: "例如：1-3, 5, 8-end。留空 = 全部页面。" },
      },
      guide: {
        keywords: "旋转pdf, pdf页面旋转, 旋转pdf某一页, 扫描pdf方向不对",
        uses: [
          "把倒着或侧着扫描的页面转正。",
          "把表格页面改为横向。",
          "修正手机拍摄文档的方向。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "预览会显示所有页面。",
          },
          {
            title: "选择方向和页面",
            text: "转四分之一圈或半圈，整份文档或部分页面。",
          },
          {
            title: "点击“旋转”",
            text: "下载转正后的 PDF。",
          },
        ],
        faq: [
          {
            q: "可以只旋转一页吗？",
            a: "可以：在“页面”中输入页码，其他页面不变。",
          },
          {
            q: "旋转会降低质量吗？",
            a: "不会，页面只是旋转，不会重新压缩。",
          },
        ],
      },
    },
    numeroter: {
      name: "添加页码",
      tagline: "在每一页上写上页码。",
      seoTitle: "给 PDF 添加页码 — 免费在线",
      seoDescription: "为 PDF 添加页码：可自选位置、“1 / 10”格式、起始页码和字号。免费、无需注册。",
      intro: "放入 PDF，点击页面上要放页码的位置，选一种样式，然后点击“添加页码”。开始前可以在预览中看到效果。",
      options: {
        position: {
          label: "页码放在哪里？",
          choices: {
            "bottom-center": "底部居中",
            "bottom-right": "底部靠右",
            "bottom-left": "底部靠左",
            "top-center": "顶部居中",
            "top-right": "顶部靠右",
            "top-left": "顶部靠左",
          },
        },
        format: {
          label: "样式",
          choices: {
            nTotal: "1 / 10",
            n: "1",
            page: "p. 1",
            dash: "- 1 -",
          },
          templates: {
            nTotal: "{n} / {total}",
            n: "{n}",
            page: "p. {n}",
            dash: "- {n} -",
          },
        },
        start: {
          label: "起始页码",
          help: "例如：填 3 表示从 3 开始编号。",
        },
        size: {
          label: "数字大小",
        },
        pages: {
          label: "需要编号的页面",
          placeholder: "全部",
          help: "留空表示全部页面。“2-end”会跳过第一页。",
        },
      },
      guide: {
        keywords: "pdf添加页码, pdf页码, 给pdf编页码",
        uses: [
          "给论文、报告或申请材料编页码。",
          "加上“1 / 10”，打印时不会漏页。",
          "提交给法院或机构前给材料编页。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "预览会显示所有页面。",
          },
          {
            title: "点选位置和样式",
            text: "预览中的每一页都会立即显示页码。",
          },
          {
            title: "点击“添加页码”",
            text: "下载编好页码的 PDF。",
          },
        ],
        faq: [
          {
            q: "可以不给第一页编页码吗？",
            a: "可以：在“更多设置”的“需要编号的页面”中输入“2-end”。",
          },
          {
            q: "页码可以不从 1 开始吗？",
            a: "可以，在“更多设置”的“起始页码”中填写。",
          },
        ],
      },
    },
    filigrane: {
      name: "水印",
      tagline: "在每一页上写上大字“COPY”或“CONFIDENTIAL”。",
      seoTitle: "给 PDF 添加水印 — 免费在线",
      seoDescription: "在 PDF 上添加文字水印（机密、副本、草稿……），可调整大小、透明度、角度和颜色。免费。",
      intro: "放入 PDF，选一段文字（或自己输入），看一下预览，然后点击“水印”。适合保护身份证件的复印件。",
      options: {
        text: {
          label: "要写的文字",
          default: "CONFIDENTIAL",
          suggestions: ["CONFIDENTIAL", "COPY", "DRAFT", "DO NOT SHARE"],
        },
        color: {
          label: "颜色",
          choices: {
            gray: "灰色",
            red: "红色",
            blue: "蓝色",
            black: "黑色",
          },
        },
        opacity: {
          label: "明显程度",
          choices: {
            "12": "淡",
            "25": "适中",
            "45": "醒目",
          },
        },
        rotation: {
          label: "文字方向",
          choices: {
            "0": "水平",
            "45": "斜着",
          },
        },
        size: {
          label: "文字最大尺寸",
          help: "文字太长放不下时会自动缩小。",
        },
        pages: {
          label: "页面",
          placeholder: "全部",
          help: "留空表示全部页面。例如：1-3, 5, 8-end。",
        },
      },
      guide: {
        keywords: "pdf加水印, 添加水印, pdf复印件水印, 身份证复印件水印",
        uses: [
          "在身份证件复印件上加“仅供租房使用”，防止被挪用。",
          "在内部文件上标注“机密”或“草稿”。",
          "注明文档不是最终版本。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "预览会显示所有页面。",
          },
          {
            title: "选择文字和样式",
            text: "颜色、明显程度和方向：预览会实时更新。",
          },
          {
            title: "点击“水印”",
            text: "下载加好水印的 PDF。",
          },
        ],
        faq: [
          {
            q: "为什么要在证件复印件上加水印？",
            a: "写上“仅用于 X 申请，10 月 2 日”这样的说明，可以防止复印件被盗用于其他用途。",
          },
          {
            q: "文档文字还能看清吗？",
            a: "能：选择“淡”或“适中”即可。",
          },
        ],
      },
    },
    compresser: {
      name: "压缩",
      tagline: "让 PDF 变小，方便发送。",
      seoTitle: "在线压缩 PDF — 免费减小文件大小",
      seoDescription: "减小 PDF 文件大小，方便通过邮件发送或上传到官方网站。三种压缩级别，免费。",
      intro: "文件太大，发不了邮件或传不上网站？放入文件，保持“推荐”，然后点击“压缩”。文字依然清晰。",
      options: {
        level: {
          label: "压缩多少？",
          choices: {
            lossless: "轻度",
            recommended: "推荐",
            strong: "最大",
          },
          hints: {
            lossless: "画质不变，减小有限。",
            recommended: "大多数情况下的最佳选择。",
            strong: "尽可能小；照片会稍微模糊。",
          },
        },
      },
      guide: {
        keywords: "压缩pdf, 减小pdf大小, pdf太大, pdf瘦身, 压缩pdf发邮件",
        uses: [
          "发送太大的 PDF 邮件。",
          "上传到有大小限制的网站（通常 2 到 5 MB）。",
          "节省文件夹空间。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "一个或多个。",
          },
          {
            title: "保持“推荐”",
            text: "或根据目标大小选择“轻度”或“最大”。",
          },
          {
            title: "点击“压缩”",
            text: "pdff 会显示减小的幅度，例如“8 MB → 2 MB”。",
          },
        ],
        faq: [
          {
            q: "压缩会让文字变模糊吗？",
            a: "不会：文字依然清晰，只压缩图片，“推荐”模式下压缩很少。",
          },
          {
            q: "为什么我的 PDF 没有变小？",
            a: "它很可能已经优化过了，pdff 会告诉您。",
          },
        ],
      },
    },
    proteger: {
      name: "加密保护",
      tagline: "用密码加密 PDF（AES-256）。",
      seoTitle: "为 PDF 设置密码保护 — 免费（AES-256）",
      seoDescription: "使用密码（AES-256）加密 PDF，并禁止打印、复制或编辑。免费、无需注册。",
      intro: "发送工资单或病历之前，用强密码保护它：没有密码，任何人都无法打开。",
      options: {
        password: { label: "打开密码" },
        noPrint: { label: "禁止打印" },
        noCopy: { label: "禁止复制文字" },
        noEdit: { label: "禁止编辑" },
      },
      guide: {
        keywords: "pdf加密码, pdf加密, 保护pdf, 禁止打印pdf",
        uses: [
          "发送工资单、病历或合同，陌生人无法打开。",
          "禁止打印、复制或修改文档。",
          "遵守单位的保密规定。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "一个或多个。",
          },
          {
            title: "设置密码",
            text: "如有需要，再选择禁止的操作：打印、复制、修改。",
          },
          {
            title: "点击“加密保护”",
            text: "PDF 以 AES-256 加密；请通过其他方式告知密码。",
          },
        ],
        faq: [
          {
            q: "这种加密安全吗？",
            a: "安全：AES-256，是银行和政府使用的级别。没有密码就无法读取内容。",
          },
          {
            q: "pdff 会保存我的密码吗？",
            a: "不会，密码从不保存。如果忘记，任何人都无法打开文件。",
          },
        ],
      },
    },
    deverrouiller: {
      name: "解除密码",
      tagline: "移除您已知密码的 PDF 的密码。",
      seoTitle: "解锁 PDF — 免费移除密码",
      seoDescription: "移除您已知密码的 PDF 的密码，方便自由打开、打印或合并。免费。",
      intro: "您知道密码，但每次打开都要输入很麻烦？一次性移除它。pdff 绝不会破解您不知道的密码。",
      options: { password: { label: "当前密码", help: "如果 PDF 只有权限密码，请留空。" } },
      guide: {
        keywords: "pdf解密, 去除pdf密码, 解除pdf保护",
        uses: [
          "打开自己的文档时不再每次输入密码。",
          "合并或编辑 PDF 前先去除保护。",
          "归档文档，不必担心忘记密码。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "受保护的 PDF。",
          },
          {
            title: "输入密码",
            text: "密码正确后会显示预览。",
          },
          {
            title: "点击“解除密码”",
            text: "下载没有保护的 PDF。",
          },
        ],
        faq: [
          {
            q: "不知道密码能解锁 PDF 吗？",
            a: "不能。pdff 只为您知道密码的文档去除保护。",
          },
          {
            q: "打印限制也会去除吗？",
            a: "会，生成的 PDF 不再有任何限制。",
          },
        ],
      },
    },
    metadonnees: {
      name: "元数据",
      tagline: "编辑标题、作者、主题和关键词。",
      seoTitle: "编辑 PDF 元数据（标题、作者）— 免费",
      seoDescription: "修改 PDF 的标题、作者、主题和关键词，或全部清除。免费、在线、无需注册。",
      intro: "浏览器标签上显示的标题或作者名暴露了旧模板？修改文档属性，或在分享前将其清除。",
      options: {
        title: { label: "标题" },
        author: { label: "作者" },
        subject: { label: "主题" },
        keywords: { label: "关键词（用逗号分隔）" },
        clear: { label: "清除所有现有元数据" },
      },
      guide: {
        keywords: "修改pdf元数据, 修改pdf标题, pdf作者, pdf属性, 删除pdf元数据",
        uses: [
          "给 PDF 设置真正的标题（显示在浏览器标签上）。",
          "发布文档前删除作者或软件名称。",
          "添加关键词，方便查找文档。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "一个或多个。",
          },
          {
            title: "填写字段",
            text: "标题、作者、主题、关键词，或选择全部清除。",
          },
          {
            title: "点击“元数据”",
            text: "下载更新后的 PDF。",
          },
        ],
        faq: [
          {
            q: "什么是 PDF 元数据？",
            a: "文件中隐藏的信息：标题、作者、所用软件、日期，可能透露文档的创建者。",
          },
          {
            q: "页面内容会改变吗？",
            a: "不会，只修改这些信息。",
          },
        ],
      },
    },
    signer: {
      name: "签名",
      tagline: "在 PDF 上加上您的签名。",
      seoTitle: "免费在线签署 PDF，无需注册",
      seoDescription: "手写、输入或上传签名并放到 PDF 上，可附上日期。免费、无需注册，文件立即删除。",
      intro: "用鼠标或手指手写签名（或输入姓名），选择页面和位置，然后点击“签名”。这是可视签名，相当于扫描的手写签名。",
      options: {
        signature: {
          label: "您的签名",
        },
        where: {
          label: "签在哪一页？",
          choices: {
            last: "最后一页",
            first: "第一页",
            all: "所有页面",
            custom: "自己选择",
          },
        },
        pages: {
          label: "页面",
          placeholder: "例如：2, 5",
          help: "例如：1-3, 5, 8-end。",
        },
        position: {
          label: "签在哪里？",
          choices: {
            "bottom-center": "底部居中",
            "bottom-right": "底部靠右",
            "bottom-left": "底部靠左",
            "top-center": "顶部居中",
            "top-right": "顶部靠右",
            "top-left": "顶部靠左",
          },
        },
        size: {
          label: "大小",
          choices: {
            small: "小",
            medium: "中",
            large: "大",
          },
        },
        date: {
          label: "在签名下方加上今天的日期",
        },
      },
      guide: {
        keywords: "pdf签名, 在线签署pdf, 给pdf添加签名, 免费电子签名, 手写签名pdf",
        uses: [
          "签署租约、劳动合同或授权书，无需打印和扫描。",
          "在合同每一页加上简签。",
          "用手指在手机上签名。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "需要签署的文档。",
          },
          {
            title: "创建签名",
            text: "手写、输入姓名或上传图片。",
          },
          {
            title: "选择页面和位置",
            text: "查看预览，然后点击“签名”。",
          },
        ],
        faq: [
          {
            q: "这种签名有法律效力吗？",
            a: "这是简单电子签名，相当于扫描的手写签名，足以应对大多数日常事务。某些正式行为需要带证书的合格电子签名。",
          },
          {
            q: "我的签名会被保存吗？",
            a: "不会：它只用于您的文档，并随文档一起删除。",
          },
        ],
      },
    },
    caviarder: {
      name: "涂黑",
      tagline: "从 PDF 中彻底删除敏感信息。",
      seoTitle: "PDF 涂黑：永久遮盖敏感信息",
      seoDescription: "真正删除 PDF 中的姓名、地址、号码和区域：被遮盖的内容会从文件中删除，而不只是被盖住。免费、无需注册。",
      intro: "输入要删除的文字，勾选要自动识别的信息（邮箱、电话等），或在页面上画出矩形。pdff 会真正删除被遮盖的内容：无论复制文字还是移除黑框都无法恢复。",
      options: {
        terms: {
          label: "要删除的文字",
          placeholder: "例如：张三, 花园路 12 号",
          help: "用逗号分隔。所有出现的地方都会被删除，不区分大小写。",
        },
        patterns: {
          label: "自动识别",
          choices: {
            email: "电子邮箱",
            phone: "电话号码",
            iban: "IBAN 和账号",
            date: "日期",
            number: "数字（6 位及以上）",
          },
        },
        areas: {
          label: "需遮盖的区域",
        },
      },
      guide: {
        keywords: "pdf涂黑, pdf脱敏, 隐藏pdf文字, 删除pdf敏感信息",
        uses: [
          "发布或分享前为文档脱敏（姓名、地址、号码）。",
          "答复信息公开申请时删除受保护的数据。",
          "分享银行对账单时隐藏账号。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "预览会显示所有页面。",
          },
          {
            title: "指定要隐藏的内容",
            text: "输入文字、勾选信息类型或在页面上画出区域。",
          },
          {
            title: "点击“涂黑”",
            text: "被遮盖的内容会从文件中删除，而不只是被盖住。",
          },
        ],
        faq: [
          {
            q: "为什么不直接画一个黑框？",
            a: "黑框只是盖在上面，文字仍在文件里，可以复制或移除黑框。pdff 会真正删除区域下的文字和图片。",
          },
          {
            q: "区分大小写吗？",
            a: "不区分：输入“Smith”也会删除“SMITH”和“smith”。",
          },
        ],
      },
    },
    ocr: {
      name: "识别扫描件",
      tagline: "让扫描或拍摄的文档中的文字可以搜索和复制。",
      seoTitle: "免费在线 OCR：让扫描 PDF 可以搜索",
      seoDescription: "识别扫描 PDF 或照片中的文字（OCR），以便搜索、复制或朗读。支持 16 种语言，免费，文档不会上传。",
      intro: "扫描或拍摄的文档只是一张图片：既不能搜索词语，也不能复制句子。“识别扫描件”会识别每一个字（这就是 OCR），并把真正的文字加入文档，外观保持不变。识别在您的设备上进行：文档不会上传。只需下载一次所选语言的模型（几 MB）。",
      options: {
        lang: {
          label: "文档语言",
        },
        format: {
          label: "结果",
          choices: {
            pdf: "可搜索的 PDF",
            txt: "文本（.txt）",
          },
          hints: {
            pdf: "同一份文档，文字可以搜索和复制。",
            txt: "只有文字，方便在别处使用。",
          },
        },
      },
      guide: {
        keywords: "在线ocr, 免费ocr, 扫描pdf转文字, 让pdf可搜索, 文字识别, 图片转文字",
        uses: [
          "用 Ctrl + F 在很长的扫描合同中查找词语。",
          "复制拍摄的发票或信件中的文字。",
          "让数字化的纸质档案可供盲人使用。",
        ],
        steps: [
          {
            title: "放入扫描件",
            text: "扫描的 PDF 或文档照片。",
          },
          {
            title: "选择语言",
            text: "文档文字所用的语言。",
          },
          {
            title: "点击“识别扫描件”",
            text: "得到文字可搜索、可复制的 PDF，或一个文本文件。",
          },
        ],
        faq: [
          {
            q: "OCR 是什么意思？",
            a: "光学字符识别：电脑识别图片中的文字，把它变成真正的文本。",
          },
          {
            q: "我的文档会上传吗？",
            a: "不会：识别完全在您的设备上进行，只需下载一次语言模型。",
          },
        ],
      },
    },
    remplir: {
      name: "填写表单",
      tagline: "直接在浏览器中填写 PDF 表单。",
      seoTitle: "免费在线填写 PDF 表单",
      seoDescription: "无需任何软件即可填写 PDF 表单的字段（文本、复选框、列表），然后下载填好的文件，可选择锁定。免费、无需注册。",
      intro: "放入 PDF 表单：pdff 会找到所有字段，并以简单表单的形式显示。填写后查看预览，然后点击“填写表单”下载完成的 PDF。",
      options: {
        values: {
          label: "答案",
        },
        lock: {
          label: "锁定答案（表单将无法再修改）",
        },
      },
      guide: {
        keywords: "填写pdf, 在线填写pdf表单, 填写pdf表格, 在pdf上写字",
        uses: [
          "不打印就能填写政府表格（申请、登记、申报）。",
          "在手机上填写表单。",
          "发送前锁定答案。",
        ],
        steps: [
          {
            title: "放入表单",
            text: "pdff 会找到所有需要填写的字段。",
          },
          {
            title: "填写字段",
            text: "预览会在页面相应位置显示您的答案。",
          },
          {
            title: "点击“填写表单”",
            text: "下载填好的 PDF。",
          },
        ],
        faq: [
          {
            q: "为什么 pdff 找不到任何字段？",
            a: "这个 PDF 不是交互式表单（通常是扫描件）。需要打印出来，或向相关机构索取交互式版本。",
          },
          {
            q: "“锁定答案”有什么作用？",
            a: "答案会成为页面的一部分，之后无法再修改。",
          },
        ],
      },
    },
    comparer: {
      name: "比较",
      tagline: "查看 PDF 两个版本之间的变化。",
      seoTitle: "在线比较两个 PDF：查看差异",
      seoDescription: "比较合同或 PDF 文档的两个版本：新增内容为绿色，删除内容为红色，并可下载报告。免费，不上传任何内容。",
      intro: "先放入旧版本，再放入新版本：差异会立即逐词显示。点击“比较”即可下载报告。全部在浏览器中完成。",
      options: {
        ignoreCase: {
          label: "忽略大小写",
        },
      },
      guide: {
        keywords: "比较两个pdf, pdf对比, 比较文档两个版本, 合同比对, 找出pdf修改",
        uses: [
          "签署前查看合同或租约改了什么。",
          "检查报告或论文的修改。",
          "比较法规或官方文本的两个版本。",
        ],
        steps: [
          {
            title: "放入旧版本",
            text: "再放入新版本，按此顺序。",
          },
          {
            title: "查看差异",
            text: "绿色为新增，红色删除线为删除。",
          },
          {
            title: "点击“比较”",
            text: "下载报告，可保存或打印。",
          },
        ],
        faq: [
          {
            q: "我的文档会上传吗？",
            a: "不会：比较完全在您的浏览器中进行。",
          },
          {
            q: "可以比较扫描文档吗？",
            a: "可以，先用“识别扫描件”工具提取文字即可。",
          },
        ],
      },
    },
    images: {
      name: "提取图片",
      tagline: "取出 PDF 中的照片和插图。",
      seoTitle: "免费在线提取 PDF 中的图片",
      seoDescription: "把 PDF 中的所有照片、插图和标志提取为 PNG 或 JPG，自动去重。免费、无需注册，文件立即删除。",
      intro: "放入 PDF：pdff 会找到其中的所有图片，以 PNG 或 JPG 格式逐张提供，打包成 ZIP。小的装饰图和重复图片会被略过。",
      options: {
        format: {
          label: "图片格式",
          choices: {
            png: "PNG",
            jpg: "JPG",
          },
          hints: {
            png: "画质完美，保留透明背景。",
            jpg: "文件更小，适合照片。",
          },
        },
        small: {
          label: "也保留小图片（图标、项目符号）",
        },
      },
      guide: {
        keywords: "提取pdf图片, 保存pdf中的图片, 从pdf导出图片",
        uses: [
          "取出 PDF 产品目录、报告或宣传册中的照片。",
          "在演示文稿中重复使用标志或图表。",
          "删除文档前保存其中的图片。",
        ],
        steps: [
          {
            title: "放入 PDF",
            text: "一个或多个。",
          },
          {
            title: "选择 PNG 或 JPG",
            text: "PNG 画质完美，JPG 文件更小。",
          },
          {
            title: "点击“提取图片”",
            text: "所有图片打包在一个 ZIP 中。",
          },
        ],
        faq: [
          {
            q: "这和把 PDF 转成 JPG 有什么不同？",
            a: "转换会把每一整页变成图片；提取图片只取出页面中的照片和插图，保持原始尺寸。",
          },
          {
            q: "为什么少了一些图片？",
            a: "默认会略过小图片（图标、项目符号），勾选“也保留小图片”即可。文字和矢量图形不属于图片。",
          },
        ],
      },
    },
    redimensionner: {
      name: "调整大小 / 裁剪",
      tagline: "修改图片尺寸或裁剪图片。",
      seoTitle: "免费在线调整图片大小和裁剪图片",
      seoDescription: "按百分比或像素缩小照片，或裁剪为正方形、16:9、4:3，并保存为 JPG、PNG 或 WebP。免费、无需注册。",
      intro: "放入图片，选择缩小或裁剪，查看预览，然后点击“调整大小 / 裁剪”。适用于头像、太大的附件，或要求特定尺寸的表单。",
      options: {
        mode: {
          label: "要做什么？",
          choices: {
            resize: "调整大小",
            crop: "裁剪",
          },
          hints: {
            resize: "保留整张图片，只是变小。",
            crop: "裁掉边缘，得到精确比例。",
          },
        },
        scale: {
          label: "新尺寸",
          choices: {
            "25": "25%（四分之一）",
            "50": "50%（一半）",
            "75": "75%",
            custom: "指定像素尺寸",
          },
        },
        width: {
          label: "宽度（像素）",
        },
        height: {
          label: "高度（像素）",
          help: "0 = 自动计算以保持比例。",
        },
        ratio: {
          label: "比例",
          choices: {
            "1:1": "正方形（1:1）",
            "4:3": "横向（4:3）",
            "3:4": "纵向（3:4）",
            "16:9": "宽屏（16:9）",
            "9:16": "竖屏（9:16）",
            "3:2": "照片（3:2）",
          },
        },
        format: {
          label: "文件格式",
          choices: {
            same: "保持原格式",
            jpg: "JPG",
            png: "PNG",
            webp: "WebP",
          },
        },
      },
      guide: {
        keywords: "调整图片大小, 压缩照片尺寸, 在线裁剪图片, 图片改成正方形",
        uses: [
          "缩小太大的照片，以便发邮件或上传到在线表单。",
          "把照片裁成正方形用作头像。",
          "为演示文稿或网站准备 16:9 的图片。",
        ],
        steps: [
          {
            title: "放入图片",
            text: "JPG、PNG、WebP 等。",
          },
          {
            title: "选择尺寸或比例",
            text: "预览会显示保留的区域和新尺寸。",
          },
          {
            title: "点击“调整大小 / 裁剪”",
            text: "下载修改后的图片。",
          },
        ],
        faq: [
          {
            q: "照片会变模糊吗？",
            a: "缩小后的图片像素更少，但在新尺寸下依然清晰。",
          },
          {
            q: "裁剪的位置在哪里？",
            a: "在图片中央：四边等量裁掉，得到所选比例，预览中可以看到。",
          },
        ],
      },
    },
  },
  errors: {
    unknownTool: "未知工具。",
    tooLarge: "上传内容过大（最大 {mb} MB）。",
    badRequest: "请求无效。",
    noFiles: "请至少添加一个文件。",
    tooManyFiles: "文件过多：此工具最多 {max} 个。",
    badOptions: "选项无效。",
    noOutput: "未生成任何文件。",
    unexpected: "处理过程中发生意外错误。",
    inFile: "{file}：{message}",
    pageLimitDocument: "该文档共 {count} 页，超过 {max} 页的上限。",
    pageLimitResult: "结果将有 {count} 页，超过 {max} 页的上限。",
    pageLimit: "超过 {max} 页的上限。",
    unreadable: "无法读取“{name}”：文件已损坏或格式无法识别。",
    damagedPdf: "无法读取“{name}”：PDF 已损坏。",
    wrongPassword: "“{name}”的密码错误。",
    passwordProtected: "“{name}”受密码保护。请先使用“解除密码”工具。",
    notPdf: "“{name}”不是 PDF。",
    notPdfConvertFirst: "“{name}”不是 PDF，请先转换。",
    passwordComma: "密码不能包含逗号。",
    imageFormat: "不支持的图片格式：{format}",
    imageConvert: "无法转换“{name}”：图片无法读取或已损坏。",
    imageUnreadable: "“{name}”不是可读取的图片。",
    officeMissing: "此转换需要 LibreOffice（Word、Excel、PowerPoint……）。请安装后重启 pdff。",
    officeTarget: "不支持转换为 {target}。",
    officeTimeout: "转换耗时过长，已中止。",
    officeFailed: "LibreOffice 无法将“{name}”转换为 {target}。",
    officeTooLarge: "“{name}”超过 {mb} MB：文件太大，无法进行 Word、Excel 或 PowerPoint 转换。",
    conversionImpossible: "无法进行 {from} → {to} 转换。",
    conversionImpossibleOffice: "无法进行 {from} → {to} 转换（安装 LibreOffice 后可支持 Word、Excel 和 PowerPoint 格式）。",
    watermarkText: "请输入水印文字。",
    emptyResult: "结果文档将没有任何页面。",
    chooseTarget: "请选择输出格式。",
    passwordOrRestriction: "请输入密码或至少选择一项限制。",
    pageInvalid: "“{token}”不是有效的页码。",
    pageMissing: "第 {n} 页不存在（该文档共 {total} 页）。",
    rangeInvalid: "无效的范围：“{part}”。",
    rangeRequired: "请至少输入一个页码范围。",
    signatureMissing: "请先创建签名：手写、输入姓名或上传图片。",
    redactNothing: "请输入文字、勾选信息类型或画出需要遮盖的区域。",
    redactNone: "没有可涂黑的内容：文档中没有找到所指定的文字或信息。",
    formNoFields: "“{name}”没有可填写的表单字段。",
    formLockUnicode: "部分答案包含无法固定到页面中的字符。取消勾选“锁定答案”即可保留为可编辑。",
    noImages: "此 PDF 中没有找到图片。文字和矢量图形不属于图片。",
    notImage: "“{name}”不是图片（JPG、PNG、WebP 等）。",
  },
};

export default zh;
