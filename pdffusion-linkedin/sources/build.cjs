/**
 * Carrousels LinkedIn de pdffusion : maquettes HTML (couleurs, polices et logo du site,
 * vraies captures) rendues en PNG 1080 × 1350 et en PDF prêt à déposer dans LinkedIn.
 * Lancer : node build.cjs            (tout)
 *          node build.cjs 2-fusionner (un seul carrousel)
 */
const { chromium } = require('C:/Users/VICTUS/node_modules/playwright-core');
const fs = require('fs'), path = require('path'), { pathToFileURL } = require('url');

const OUT = 'C:/Users/VICTUS/Pictures/pdffusion-linkedin';
const SHOTS = path.join(__dirname, 'shots');
const shot = (n) => pathToFileURL(path.join(SHOTS, n + '.png')).href;
const EMAIL = 'contact@pdffusion.app';
const AUTHOR = 'Mikailou Cedric Toure';

const logo = (s) => `<svg viewBox="0 0 32 32" width="${s}" height="${s}"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8f82ff"/><stop offset="1" stop-color="#4a36f0"/></linearGradient></defs><rect x="9" y="3" width="18" height="23" rx="4" fill="#e5322d" opacity="0.9" transform="rotate(12 18 14)"/><rect x="5" y="6" width="18" height="23" rx="4" fill="url(#lg)"/><path d="M10 13h8M10 17h8M10 21h5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;
const arrow = `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const check = `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Onest:wght@400..700&display=block');
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0b0920}
body{font-family:'Onest',sans-serif;-webkit-font-smoothing:antialiased}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;isolation:isolate}
.d{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;letter-spacing:-0.025em;line-height:1}

/* Fonds */
.dark{background:#120f36;color:#fff}
.dark .bg{position:absolute;inset:0;z-index:-2;background:
  radial-gradient(820px 720px at -8% -6%, rgba(109,92,255,.85), transparent 62%),
  radial-gradient(640px 560px at 108% -4%, rgba(229,50,45,.38), transparent 62%),
  radial-gradient(900px 760px at 92% 104%, rgba(46,78,230,.55), transparent 62%),
  #120f36}
.brand{background:#3a2bd6;color:#fff}
.brand .bg{position:absolute;inset:0;z-index:-2;background:
  radial-gradient(900px 800px at -10% -10%, #8f82ff, transparent 62%),
  radial-gradient(700px 600px at 110% 0%, rgba(229,50,45,.45), transparent 62%),
  radial-gradient(1000px 800px at 60% 115%, #120f36, transparent 65%),
  #4a36f0}
.light{background:#f3f2ff;color:#17143a}
.light .bg{position:absolute;inset:0;z-index:-2;background:
  radial-gradient(760px 620px at 104% -6%, rgba(143,130,255,.42), transparent 62%),
  radial-gradient(700px 600px at -10% 104%, rgba(143,130,255,.30), transparent 62%),
  #f3f2ff}
/* Sol quadrillé du site */
.floor{position:absolute;left:-40%;right:-40%;bottom:-6%;height:46%;z-index:-1;opacity:.5;
  background-image:linear-gradient(rgba(160,150,255,.5) 2px, transparent 2px),linear-gradient(90deg, rgba(160,150,255,.5) 2px, transparent 2px);
  background-size:120px 120px;transform:perspective(900px) rotateX(64deg);transform-origin:50% 100%;
  -webkit-mask-image:linear-gradient(to top, #000 10%, transparent 85%)}
.light .floor{opacity:.28;background-image:linear-gradient(rgba(90,72,240,.55) 2px, transparent 2px),linear-gradient(90deg, rgba(90,72,240,.55) 2px, transparent 2px)}

/* En-tête et pied */
.top{position:absolute;top:60px;left:72px;right:72px;display:flex;align-items:center;justify-content:space-between}
.mark{display:flex;align-items:center;gap:14px;font-family:'Bricolage Grotesque';font-weight:700;font-size:36px;letter-spacing:-.02em}
.tag{font-size:23px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;padding:13px 24px;border-radius:999px;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.22)}
.light .tag{background:#fff;border-color:#e1def7;color:#5a48f0}
.foot{position:absolute;bottom:54px;left:72px;right:72px;display:flex;align-items:center;justify-content:space-between;z-index:5}
.url{font-size:27px;font-weight:600;opacity:.85}
.dots{display:flex;gap:10px;align-items:center}
.dots i{width:12px;height:12px;border-radius:99px;background:currentColor;opacity:.28}
.dots i.on{width:44px;opacity:1}
.next{display:flex;align-items:center;gap:12px;font-size:27px;font-weight:700;padding:15px 26px 15px 30px;border-radius:999px;background:#fff;color:#17143a;box-shadow:0 14px 30px -12px rgba(0,0,0,.5)}
.light .next{background:#6d5cff;color:#fff;box-shadow:0 16px 30px -12px rgba(74,54,240,.7)}
.footpad{background:linear-gradient(to top, var(--fade) 60%, transparent);position:absolute;left:0;right:0;bottom:0;height:200px;z-index:4}
.dark{--fade:#120f36}.light{--fade:#f3f2ff}.brand{--fade:#1a1466}

.col{position:absolute;inset:176px 0 0 0;display:flex;flex-direction:column;align-items:center}
.body{align-self:stretch;margin:0 72px;flex:none}
.body.fill{flex:1;display:flex;flex-direction:column;margin-bottom:176px;min-height:0}
.body.fill .cards,.body.fill .grid{flex:1}
.body.fill .card{flex:1}
em{font-style:normal;color:#b3aaff}
.light em{color:#5a48f0}
.brand em{color:#ffd7d5}
.kick{display:inline-flex;align-items:center;gap:12px;font-size:25px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:14px 26px;border-radius:999px;background:#fff;color:#4a36f0;margin-bottom:38px}
.kick b{width:12px;height:12px;border-radius:9px;background:#e5322d}
.h1{font-size:104px}
.h2{font-size:80px}
.sub{font-size:36px;line-height:1.38;margin-top:34px;opacity:.9;max-width:900px}
.light .sub{color:#4b4772;opacity:1}

/* Téléphone */
.pw{position:relative;flex:none;margin-top:58px}
.phone{width:640px;border-radius:84px;padding:16px;background:#0b0920;
  box-shadow:0 0 0 2px rgba(255,255,255,.22), 0 70px 120px -30px rgba(8,5,40,.75), 0 30px 60px -30px rgba(8,5,40,.6)}
.light .phone{box-shadow:0 0 0 2px rgba(23,20,58,.5), 0 70px 110px -34px rgba(60,45,190,.55), 0 30px 60px -30px rgba(23,20,58,.35)}
.screen{border-radius:68px;overflow:hidden;background:#f3f2ff;position:relative}
.screen img{display:block;width:100%;position:absolute;left:0}
/* Navigateur */
.browser{flex:none;margin-top:64px;border-radius:28px;overflow:hidden;background:#0b0920;box-shadow:0 0 0 2px rgba(255,255,255,.22), 0 70px 120px -30px rgba(8,5,40,.8)}
.light .browser{box-shadow:0 0 0 2px rgba(23,20,58,.35), 0 70px 110px -34px rgba(60,45,190,.5)}
.bar{height:58px;display:flex;align-items:center;gap:10px;padding:0 24px;background:#0b0920}
.bar i{width:14px;height:14px;border-radius:9px;background:#3a3670}
.bar span{margin-left:18px;flex:1;height:34px;border-radius:99px;background:#1d1852;color:#a6a1d4;font-size:18px;display:flex;align-items:center;padding:0 20px}
.browser img{display:block;width:100%}

/* Étapes */
.num{font-family:'Bricolage Grotesque';font-weight:800;font-size:30px;letter-spacing:.06em;display:inline-flex;align-items:center;gap:16px;margin-bottom:26px;color:#5a48f0}
.dark .num{color:#b3aaff}
.num b{display:inline-flex;align-items:center;justify-content:center;width:74px;height:74px;border-radius:24px;background:linear-gradient(135deg,#8f82ff,#4a36f0);color:#fff;font-size:38px;letter-spacing:0;box-shadow:0 18px 30px -14px rgba(74,54,240,.8)}
.chip{position:absolute;z-index:6;display:flex;align-items:center;gap:14px;padding:18px 26px 18px 20px;border-radius:26px;background:#fff;color:#17143a;font-size:27px;font-weight:700;line-height:1.2;box-shadow:0 30px 50px -18px rgba(23,20,58,.55), 0 0 0 1.5px rgba(23,20,58,.08)}
.chip s{text-decoration:none;display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:17px;background:#e0f5ec;color:#13865a;flex:none}
.chip.v s{background:#eceaff;color:#5a48f0}
.chip small{display:block;font-size:21px;font-weight:500;color:#625e86}

/* Listes et tuiles */
.cards{display:flex;flex-direction:column;gap:22px;margin-top:46px}
.card{display:flex;gap:26px;align-items:center;padding:34px 36px;border-radius:38px;background:rgba(255,255,255,.09);border:1.5px solid rgba(255,255,255,.18);font-size:34px;line-height:1.32;font-weight:500}
.light .card{background:#fff;border-color:#e1def7;box-shadow:0 24px 50px -30px rgba(40,30,140,.4)}
.card s{text-decoration:none;flex:none;width:76px;height:76px;border-radius:24px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#8f82ff,#4a36f0);color:#fff;font-family:'Bricolage Grotesque';font-weight:800;font-size:36px}
.card b{display:block;font-family:'Bricolage Grotesque';font-weight:700;font-size:42px;letter-spacing:-.02em;margin-bottom:6px}
.card span{opacity:.85}
.light .card span{color:#4b4772;opacity:1}
.grid{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:24px;margin-top:46px}
.tile{display:flex;flex-direction:column;justify-content:center;padding:40px 38px 38px;border-radius:40px;background:#fff;border:1.5px solid #e1def7;box-shadow:0 24px 50px -30px rgba(40,30,140,.4)}
.tile .n{font-family:'Bricolage Grotesque';font-weight:800;font-size:178px;line-height:.9;letter-spacing:-.05em;background:linear-gradient(135deg,#8f82ff,#4a36f0 70%);-webkit-background-clip:text;color:transparent}
.tile p{font-size:38px;font-weight:600;margin-top:14px;line-height:1.25}
.tile small{display:block;font-size:27px;line-height:1.3;color:#625e86;font-weight:500;margin-top:8px}
.pills{display:flex;flex-wrap:wrap;gap:16px;margin-top:46px}
.pill{font-size:34px;font-weight:700;padding:20px 32px;border-radius:999px;background:#fff;border:1.5px solid #e1def7;color:#17143a}
.dark .pill{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.22);color:#fff}
.pill.x{text-decoration:line-through;text-decoration-thickness:4px;text-decoration-color:#e5322d;color:#8a86ad}
.note{margin-top:24px;font-size:30px;line-height:1.4;padding:26px 30px;border-radius:28px;background:#fff3d1;color:#7a5300;font-weight:500}
.dark .note{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.2)}

/* Dernière diapositive */
.cta{position:absolute;left:72px;right:72px;top:20px;bottom:176px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start}
.cta>*{margin-top:0!important;margin-bottom:0!important}
.cta .mail{align-self:stretch}
.site{font-size:136px}
.trust{display:flex;flex-wrap:wrap;gap:14px;margin-top:40px}
.trust span{display:flex;align-items:center;gap:10px;font-size:30px;font-weight:600;padding:15px 24px 15px 18px;border-radius:999px;background:rgba(255,255,255,.14);border:1.5px solid rgba(255,255,255,.26)}
.trust svg{width:26px;height:26px}
.mail{margin-top:46px;padding:38px 40px;border-radius:40px;background:#fff;color:#17143a;box-shadow:0 40px 70px -30px rgba(8,5,40,.7)}
.mail p{font-size:30px;color:#4b4772;line-height:1.35}
.mail b{display:block;font-family:'Bricolage Grotesque';font-weight:800;font-size:62px;letter-spacing:-.03em;color:#4a36f0;margin-top:10px}
.by{margin-top:38px;font-size:30px;line-height:1.45;opacity:.92}
.by b{font-weight:700}
.nextep{margin-top:26px;display:inline-flex;gap:12px;align-items:center;font-size:28px;font-weight:700;color:#ffd7d5}
`;

// ---------------------------------------------------------------- Gabarits
const frame = (kind, tag, i, n, inner, opts = {}) => `
<section class="s ${kind}"><div class="bg"></div>${opts.floor === false ? '' : '<div class="floor"></div>'}
  <div class="top"><div class="mark">${logo(52)}pdffusion</div><div class="tag">${tag}</div></div>
  <div class="col">${inner}</div>
  ${opts.fade === false ? '' : '<div class="footpad"></div>'}
  <div class="foot"><div class="url">pdffusion.app</div><div class="dots">${Array.from({ length: n }, (_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>${i < n - 1 ? `<div class="next">Glissez ${arrow}</div>` : `<div class="url">${EMAIL}</div>`}</div>
</section>`;

/** Téléphone : capture mobile réelle (390 px de large), décalée de y pixels d'écran. */
const phone = (name, { y = 0, x = 0, rot = 0, mt, chips = '' } = {}) => {
  const scale = 608 / 390;
  return `<div class="pw" style="${mt != null ? `margin-top:${mt}px;` : ''}transform:translateX(${x}px) rotate(${rot}deg)"><div class="phone"><div class="screen" style="height:${(800 - y) * scale}px"><img src="${shot(name)}" style="top:${-y * scale}px"></div></div>${chips}</div>`;
};
const browser = (name, { left, width = 936 } = {}) => `<div class="browser" style="width:${width}px;${left != null ? `align-self:flex-start;margin-left:${left}px` : ''}"><div class="bar"><i></i><i></i><i></i><span>pdffusion.app</span></div><img src="${shot(name)}"></div>`;
const chip = (html, style, v) => `<div class="chip${v ? ' v' : ''}" style="${style}"><s>${v ? arrow : check}</s><div>${html}</div></div>`;

const cover = (c) => `<div class="body">${c.kick ? `<div class="kick"><b></b>${c.kick}</div>` : ''}<h1 class="d h1" style="${c.size ? `font-size:${c.size}px` : ''}">${c.title}</h1><p class="sub">${c.sub}</p></div>${c.visual}`;
const step = (c) => `<div class="body"><div class="num"><b>${c.n}</b>ÉTAPE ${c.n} SUR 3</div><h2 class="d h2">${c.title}</h2><p class="sub">${c.sub}</p></div>${c.visual}`;
const feature = (c) => `<div class="body"><div class="num"><b>${c.n}</b>${c.label}</div><h2 class="d h2">${c.title}</h2><p class="sub">${c.sub}</p></div>${c.visual}`;
const list = (c) => `<div class="body fill"><h2 class="d h2">${c.title}</h2>${c.sub ? `<p class="sub">${c.sub}</p>` : ''}<div class="cards">${c.items.map((t, k) => `<div class="card"><s>${c.icons ? check : k + 1}</s><div>${t}</div></div>`).join('')}</div>${c.note ? `<div class="note">${c.note}</div>` : ''}</div>`;
const cta = (c) => `<div class="cta"><div class="kick"><b></b>Projet étudiant</div><p class="sub" style="margin-top:0;font-size:40px;opacity:1;font-weight:500">${c.lead}</p><div class="d site">pdffusion<em>.app</em></div>
  <div class="trust"><span>${check}Gratuit</span><span>${check}Sans inscription</span><span>${check}Sans filigrane ajouté</span></div>
  <div class="mail"><p>${c.ask}</p><b>${EMAIL}</b></div>
  <p class="by">Conçu et développé par <b>${AUTHOR}</b>.<br>Le code source est ouvert (licence MIT).</p>
  ${c.next ? `<div class="nextep">${c.next} ${arrow}</div>` : ''}</div>`;

const usesTitle = 'À quoi ça <em>sert</em>, concrètement ?';

// ---------------------------------------------------------------- Contenu
const CAROUSELS = [
  {
    id: '1-le-projet', tag: 'Le projet',
    slides: [
      ['dark', cover({ kick: 'Projet étudiant', size: 100, title: 'J\'ai créé l\'outil que je cherchais pour <em>mes documents.</em>', sub: 'Il s\'appelle pdffusion. Il est gratuit, et il est en ligne.', visual: browser('d-home') })],
      ['light', `<div class="body fill"><h2 class="d h2">Un site pour fusionner. Un autre pour convertir. Un troisième pour signer.</h2>
        <p class="sub">Et trop souvent, avant d'obtenir son fichier :</p>
        <div class="pills" style="margin-top:30px"><span class="pill x">Créer un compte</span><span class="pill x">Limite gratuite atteinte</span><span class="pill x">Filigrane sur le résultat</span><span class="pill x">Passer à l'offre payante</span></div>
        <div style="flex:1"></div>
        <p class="d" style="font-size:78px;line-height:1.02">Alors j'ai construit <em>un seul outil</em> qui fait tout.</p></div>`],
      ['dark', `<div class="body"><h2 class="d h2" style="font-size:104px">Un seul outil.<br><em>20 fonctions.</em></h2><div class="pills" style="margin-top:36px"><span class="pill">Organiser</span><span class="pill">Convertir</span><span class="pill">Modifier</span><span class="pill">Sécurité</span></div></div>${browser('d-outils', { left: 72, width: 1240 })}`],
      ['light', `<div class="body fill"><h2 class="d h2">pdffusion en <em>quatre chiffres</em></h2><div class="grid">
        <div class="tile"><div class="n">20</div><p>outils</p><small>fusionner, convertir, signer, compresser…</small></div>
        <div class="tile"><div class="n">29</div><p>formats reconnus</p><small>PDF, Word, Excel, PowerPoint, images…</small></div>
        <div class="tile"><div class="n">0</div><p>compte à créer</p><small>ni adresse courriel, ni carte bancaire</small></div>
        <div class="tile"><div class="n">0</div><p>filigrane ajouté</p><small>le fichier produit est à vous</small></div></div></div>`, { floor: false }],
      ['dark', `<div class="body"><h2 class="d h2">Sur téléphone comme sur <em>ordinateur.</em></h2><p class="sub">Rien à installer : tout se passe dans le navigateur.</p></div>
        <div style="position:relative;align-self:stretch;flex:1"><div style="position:absolute;left:36px;top:0">${phone('m-home', { rot: -5, mt: 70 })}</div><div style="position:absolute;right:20px;top:0">${phone('m-home-outils', { rot: 5, mt: 190 })}</div></div>`],
      ['light', list({ title: 'Vos fichiers <em>restent à vous.</em>', icons: true, items: [
        '<b>Supprimés aussitôt</b><span>Dès que le traitement est terminé.</span>',
        '<b>Ni lus, ni analysés</b><span>Ni partagés, ni utilisés pour entraîner une intelligence artificielle.</span>',
        '<b>Traités en Europe</b><span>Sur des serveurs situés à Paris et à Francfort.</span>',
        '<b>Code source ouvert</b><span>Chacun peut vérifier comment l\'outil fonctionne.</span>'] })],
      ['brand', cta({ lead: 'Essayez-le, puis dites-moi ce qu\'il faut améliorer.', ask: 'Une idée, un bogue, un outil qui manque ? Écrivez-moi :', next: 'À suivre : 5 usages concrets, un par publication' })],
    ],
  },
  {
    id: '2-fusionner', tag: 'Usage 1 · Fusionner',
    slides: [
      ['dark', cover({ kick: 'Usage n° 1 · Fusionner', size: 98, title: '«&nbsp;Merci d\'envoyer votre dossier en <em>un seul PDF.</em>&nbsp;»', sub: 'CV, lettre, relevé de notes, attestation : quatre fichiers. Voici comment en faire un seul.', visual: phone('m-fusionner-1b', { y: 92, rot: -4, x: 16, mt: 76 }) })],
      ['light', step({ n: 1, title: 'Déposez vos fichiers', sub: 'PDF, Word, Excel, images : vous pouvez les mélanger.', visual: phone('m-fusionner-0', { y: 262, chips: chip('Photos d\'iPhone<small>format HEIC accepté</small>', 'left:-150px;top:120px', true) }) })],
      ['light', step({ n: 2, title: 'Mettez-les dans l\'ordre', sub: 'Glissez les fichiers ou utilisez les flèches.', visual: phone('m-fusionner-1', { y: 138, chips: chip('4 fichiers<small>un seul dossier</small>', 'right:-150px;top:60px', true) }) })],
      ['light', step({ n: 3, title: 'Téléchargez votre PDF', sub: 'Un seul fichier, avec un signet par document.', visual: phone('m-fusionner-3', { y: 232 }) })],
      ['dark', list({ title: usesTitle, items: [
        '<b>Un dossier complet</b><span>Pièce d\'identité, justificatifs, formulaires : un seul fichier, comme le demandent la plupart des administrations.</span>',
        '<b>Un mémoire ou un rapport</b><span>Réunir des chapitres écrits dans des fichiers séparés.</span>',
        '<b>Des photos de documents</b><span>Prises au téléphone, assemblées en un PDF propre.</span>'] })],
      ['brand', cta({ lead: 'Votre prochain dossier, en un seul fichier.', ask: 'Un retour, une idée d\'amélioration ? Écrivez-moi :', next: 'Prochain usage : convertir un PDF en Word' })],
    ],
  },
  {
    id: '3-convertir', tag: 'Usage 2 · Convertir',
    slides: [
      ['dark', cover({ kick: 'Usage n° 2 · Convertir', size: 112, title: 'PDF <em>→</em> Word.<br>Word <em>→</em> PDF.<br>Photo <em>→</em> PDF.', sub: 'Un seul outil pour changer de format, sans rien installer.', visual: phone('m-convertir-2b', { y: 78, rot: 4, x: -10, mt: 76 }) })],
      ['light', step({ n: 1, title: 'Déposez votre fichier', sub: 'Document, tableur, présentation ou image.', visual: phone('m-convertir-1', { y: 150 }) })],
      ['light', step({ n: 2, title: 'Choisissez le format', sub: 'Seuls les formats possibles pour votre fichier s\'affichent.', visual: phone('m-convertir-2b', { y: 128, chips: chip('PDF vers Word<small>pour modifier le texte</small>', 'right:-140px;top:330px', true) }) })],
      ['light', step({ n: 3, title: 'Téléchargez le résultat', sub: 'Depuis un PDF, la mise en page est reconstruite : relisez avant d\'envoyer.', visual: phone('m-convertir-3', { y: 338, chips: chip('CV.docx<small>prêt à modifier dans Word</small>', 'right:-140px;top:150px') }) })],
      ['dark', `<div class="body fill"><h2 class="d h2"><em>29 formats</em> reconnus</h2><p class="sub">Ceux qui circulent vraiment dans les administrations, les écoles et les entreprises.</p>
        <div class="pills" style="gap:18px">${['PDF', 'Word', 'Excel', 'PowerPoint', 'OpenDocument', 'JPG', 'PNG', 'HEIC (iPhone)', 'WebP', 'TIFF', 'SVG', 'CSV', 'EPUB', 'RTF', 'TXT', 'HTML'].map((t) => `<span class="pill" style="font-size:38px;padding:24px 38px">${t}</span>`).join('')}</div>
        <div style="flex:1"></div><div class="note">Les photos d'iPhone (HEIC) sont converties directement dans votre navigateur.</div></div>`],
      ['brand', cta({ lead: 'Le bon format, sans logiciel à installer.', ask: 'Un format qui vous manque ? Dites-le-moi :', next: 'Prochain usage : alléger un PDF trop lourd' })],
    ],
  },
  {
    id: '4-compresser', tag: 'Usage 3 · Compresser',
    slides: [
      ['dark', cover({ kick: 'Usage n° 3 · Compresser', size: 124, title: '«&nbsp;Fichier trop <em>volumineux.</em>&nbsp;»', sub: 'Le portail refuse votre PDF ? Le courriel ne part pas ? Allégez-le en trois gestes.', visual: phone('m-compresser-2', { y: 78, rot: -4, x: 16, mt: 76 }) })],
      ['light', step({ n: 1, title: 'Déposez votre PDF', sub: 'Son poids s\'affiche tout de suite.', visual: phone('m-compresser-1', { y: 140, chips: chip('14,8 Mo<small>trop lourd pour un courriel</small>', 'right:-150px;top:150px', true) }) })],
      ['light', step({ n: 2, title: 'Choisissez le niveau', sub: 'Léger, Recommandé ou Maximum.', visual: phone('m-compresser-2', { y: 122 }) })],
      ['light', step({ n: 3, title: 'Téléchargez la version allégée', sub: 'Le poids avant et après est affiché.', visual: phone('m-compresser-3', { y: 336 }) })],
      ['dark', list({ title: usesTitle, items: [
        '<b>Envoyer par courriel</b><span>Un PDF trop lourd pour la pièce jointe.</span>',
        '<b>Déposer sur un portail</b><span>Beaucoup limitent la taille, souvent entre 2 et 5 Mo.</span>',
        '<b>Gagner de la place</b><span>Dans vos dossiers et vos archives.</span>'],
        note: 'L\'exemple montré (14,8 Mo ramenés à 474 ko) est un rapport rempli de captures d\'écran. Le gain dépend du contenu : un PDF déjà optimisé ne maigrit presque pas.' })],
      ['brand', cta({ lead: 'Plus jamais «&nbsp;fichier trop volumineux&nbsp;».', ask: 'Un PDF qui résiste ? Racontez-moi :', next: 'Prochain usage : signer sans imprimer' })],
    ],
  },
  {
    id: '5-signer', tag: 'Usage 4 · Signer',
    slides: [
      ['dark', cover({ kick: 'Usage n° 4 · Signer', size: 92, title: '<span style="text-decoration:line-through;text-decoration-color:#e5322d;text-decoration-thickness:7px;opacity:.6">Imprimer. Signer. Scanner. Renvoyer.</span><br><em>Signez directement sur le PDF.</em>', sub: 'Un bail, un contrat de stage, une autorisation : sans imprimante ni scanneur.', visual: phone('m-signer-2', { y: 122, rot: 4, x: -10, mt: 70 }) })],
      ['light', step({ n: 1, title: 'Déposez le document', sub: 'L\'aperçu affiche toutes ses pages.', visual: phone('m-signer-1', { y: 128 }) })],
      ['light', step({ n: 2, title: 'Créez votre signature', sub: 'Dessinez-la au doigt, écrivez votre nom ou importez une image.', visual: phone('m-signer-2', { y: 122 }) })],
      ['light', step({ n: 3, title: 'Choisissez la page et l\'endroit', sub: 'Dernière page, première page ou toutes les pages.', visual: phone('m-signer-2b', { y: 78 }) })],
      ['dark', list({ title: 'Bon <em>à savoir</em>', items: [
        '<b>Une signature électronique simple</b><span>Comme une signature manuscrite scannée : elle suffit dans la plupart des démarches courantes.</span>',
        '<b>Depuis le téléphone</b><span>Avec le doigt, directement dans le navigateur.</span>',
        '<b>Et les formulaires PDF ?</b><span>L\'outil « Remplir un formulaire » les complète sans les imprimer.</span>'],
        note: 'Certains actes exigent une signature électronique qualifiée, avec un certificat : vérifiez ce que demande votre interlocuteur.' })],
      ['brand', cta({ lead: 'Signé et renvoyé, sans imprimante.', ask: 'Un retour sur l\'outil Signer ? Écrivez-moi :', next: 'Dernier usage : protéger un document sensible' })],
    ],
  },
  {
    id: '6-proteger', tag: 'Usage 5 · Protéger',
    slides: [
      ['dark', cover({ kick: 'Usage n° 5 · Protéger', size: 112, title: 'Vos documents ne regardent <em>que vous.</em>', sub: 'Bulletin de salaire, contrat, relevé bancaire : trois façons de les protéger avant de les envoyer.', visual: phone('m-proteger-2', { y: 78, rot: -4, x: 16, mt: 76 }) })],
      ['light', feature({ n: 1, label: 'PROTÉGER', title: 'Un mot de passe sur votre PDF', sub: 'Chiffrement AES-256. Le mot de passe n\'est jamais enregistré.', visual: phone('m-proteger-2', { y: 122 }) })],
      ['light', feature({ n: 2, label: 'CAVIARDER', title: 'Effacez ce qui ne doit pas sortir', sub: 'Noms, courriels, téléphones : supprimés du fichier, pas seulement recouverts.', visual: phone('m-caviarder-2', { y: 122 }) })],
      ['light', feature({ n: 3, label: 'FILIGRANE', title: 'Marquez vos copies', sub: '« COPIE » ou « CONFIDENTIEL » en travers de chaque page.', visual: phone('m-filigrane-2', { y: 78 }) })],
      ['dark', list({ title: 'Et du côté de <em>pdffusion ?</em>', icons: true, items: [
        '<b>Aucun document conservé</b><span>Fichiers supprimés dès que le traitement est terminé.</span>',
        '<b>Aucune analyse</b><span>Ni lus, ni partagés, ni utilisés pour entraîner une intelligence artificielle.</span>',
        '<b>Connexions chiffrées</b><span>HTTPS imposé à chaque visite.</span>',
        '<b>Code source ouvert</b><span>Licence MIT : tout est vérifiable.</span>'] })],
      ['brand', cta({ lead: 'Merci d\'avoir suivi la série. L\'outil est à vous.', ask: 'Quel outil dois-je ajouter ensuite ? Écrivez-moi :' })],
    ],
  },
];

// ---------------------------------------------------------------- Rendu
(async () => {
  const only = process.argv[2];
  fs.mkdirSync(path.join(OUT, 'sources'), { recursive: true });
  const b = await chromium.launch({ channel: 'msedge', headless: true });
  const ctx = await b.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  for (const c of CAROUSELS) {
    if (only && c.id !== only) continue;
    const n = c.slides.length;
    const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><title>${c.id}</title><style>${CSS}</style><body>` + c.slides.map(([kind, inner, opts], i) => frame(kind, c.tag, i, n, inner, opts)).join('') + '</body></html>';
    const file = path.join(OUT, 'sources', c.id + '.html');
    fs.writeFileSync(file, html);
    await p.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(600);
    const dir = path.join(OUT, c.id);
    fs.mkdirSync(dir, { recursive: true });
    const jpgs = [];
    const els = await p.locator('section.s').all();
    for (let i = 0; i < els.length; i++) {
      const base = path.join(dir, `${c.id}-${String(i + 1).padStart(2, '0')}`);
      await els[i].screenshot({ path: base + '.png' });
      const jpg = path.join(__dirname, `tmp-${c.id}-${i}.jpg`);
      await els[i].screenshot({ path: jpg, type: 'jpeg', quality: 93 });
      jpgs.push(jpg);
    }
    // PDF pour LinkedIn (publication « Document ») : une image par page, rendu identique aux PNG
    const pp = await ctx.newPage();
    await pp.setContent(`<style>@page{size:1080px 1350px;margin:0}body{margin:0}img{display:block;width:1080px;height:1350px;page-break-after:always}</style>` + jpgs.map((j) => `<img src="data:image/jpeg;base64,${fs.readFileSync(j).toString('base64')}">`).join(''));
    await pp.pdf({ path: path.join(dir, `pdffusion-${c.id}.pdf`), width: '1080px', height: '1350px', printBackground: true });
    await pp.close();
    jpgs.forEach((j) => fs.unlinkSync(j));
    console.log(c.id, n, 'diapositives');
  }
  await b.close();
})();
