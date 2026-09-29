import Link from "next/link";
import { CapabilityNotice } from "@/components/CapabilityNotice";
import { FormatMarquee } from "@/components/visual/FormatMarquee";
import { FormatOrbit } from "@/components/visual/FormatOrbit";
import { Scene } from "@/components/visual/Scene";
import { ToolCard } from "@/components/visual/ToolCard";
import { SHOWCASE_EXTENSIONS } from "@/lib/core/formats";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/lib/core/tools";

const STEPS = [
  { title: "Déposez", text: "Glissez vos fichiers ou choisissez-les depuis votre téléphone." },
  { title: "Choisissez", text: "Réglez l'ordre, le format de sortie ou les pages à garder." },
  { title: "Téléchargez", text: "Le résultat se télécharge tout seul, prêt à envoyer." },
];

export default function Home() {
  const categories = Object.keys(TOOL_CATEGORIES) as ToolCategory[];
  return (
    <>
      <Scene className="-mt-16 pt-16">
        <section className="mx-auto grid max-w-6xl items-center gap-4 px-4 pt-6 pb-20 md:grid-cols-[1.05fr_1fr] md:gap-8 md:pt-16 md:pb-28">
          <div className="order-2 text-center md:order-1 md:text-left">
            <h1 className="font-display text-[clamp(2.4rem,7vw,4.4rem)] leading-[0.98] font-bold tracking-[-0.03em]">
              Tous vos documents, dans un seul outil.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-white/75 md:mx-0">
              PDF, Word, Excel, PowerPoint, images : fusionnez, convertissez et modifiez en quelques secondes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/outils/fusionner"
                className="rounded-full bg-brand px-7 py-3.5 text-center font-semibold text-brand-ink shadow-[0_12px_40px_-10px_#6d5cff] transition hover:-translate-y-0.5 hover:bg-brand-2"
              >
                Fusionner des fichiers
              </Link>
              <Link
                href="/outils/convertir"
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-center font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Convertir un fichier
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/55">Gratuit, sans inscription, sans filigrane ajouté.</p>
          </div>
          <div className="order-1 md:order-2">
            <FormatOrbit />
          </div>
        </section>
      </Scene>

      <section className="relative -mt-10 rounded-t-[2.5rem] bg-bg pt-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {SHOWCASE_EXTENSIONS.length} formats reconnus
          </h2>
          <p className="mt-1 text-muted">Ceux qui circulent vraiment dans les administrations, les écoles et les entreprises.</p>
        </div>
        <div className="mt-6">
          <FormatMarquee />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-10">
          <CapabilityNotice />
        </div>

        <div id="outils" className="scroll-mt-20 space-y-12 py-12">
          {categories.map((cat) => (
            <section key={cat}>
              <h2 className="font-display mb-4 text-2xl font-bold tracking-tight">{TOOL_CATEGORIES[cat]}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((t) => t.category === cat).map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mb-16 rounded-[2rem] border border-line bg-surface p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Trois gestes, c&apos;est tout</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-lg font-bold text-brand-ink">
                  {i + 1}
                </span>
                <span>
                  <span className="font-display block text-lg font-semibold">{s.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
