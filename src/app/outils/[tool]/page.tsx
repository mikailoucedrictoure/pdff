import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CapabilityNotice } from "@/components/CapabilityNotice";
import { Workspace } from "@/components/Workspace";
import { FileGlyph } from "@/components/visual/FileGlyph";
import { Scene } from "@/components/visual/Scene";
import { ToolIcon } from "@/components/visual/ToolIcon";
import { getI18n } from "@/i18n/server";
import { getTool } from "@/lib/core/tools";

export async function generateMetadata({ params }: PageProps<"/outils/[tool]">): Promise<Metadata> {
  const tool = getTool((await params).tool);
  if (!tool) return {};
  const { messages } = await getI18n();
  const text = messages.tools[tool.id];
  return { title: `${text.name} — pdff`, description: text.tagline };
}

const DECOR_ANY = ["pdf", "docx", "xlsx", "pptx", "jpg"];

export default async function ToolPage({ params }: PageProps<"/outils/[tool]">) {
  const tool = getTool((await params).tool);
  if (!tool) notFound();
  const { messages: t } = await getI18n();
  const text = t.tools[tool.id];
  const decor = tool.accepts === "pdf" ? ["pdf", "pdf", "pdf"] : DECOR_ANY;

  return (
    <>
      <Scene className="-mt-16 pt-16" floor>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 pt-6 pb-20 sm:pt-10 sm:pb-24">
          <div>
            <Link href="/#outils" className="text-sm text-white/60 hover:text-white">
              {t.nav.back}
            </Link>
            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-[0_12px_40px_-8px_#6d5cff]">
                <ToolIcon id={tool.id} className="h-7 w-7" />
              </span>
              <h1 className="font-display text-[clamp(2rem,6vw,3.2rem)] leading-none font-bold tracking-[-0.03em]">{text.name}</h1>
            </div>
            <p className="mt-4 max-w-xl text-white/70 sm:text-lg">{text.tagline}</p>
          </div>
          <div className="relative hidden h-36 w-56 shrink-0 md:block" aria-hidden="true" dir="ltr">
            {decor.map((ext, i) => (
              <div
                key={i}
                className="float-doc absolute w-16"
                style={
                  {
                    left: `${i * (160 / decor.length)}px`,
                    top: `${(i % 2) * 34}px`,
                    "--rot": `${(i - decor.length / 2) * 5}deg`,
                    "--d": `${-i * 0.8}s`,
                  } as React.CSSProperties
                }
              >
                <FileGlyph ext={ext} className="w-full" glow />
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <div className="relative -mt-10 rounded-t-[2.5rem] bg-bg">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-28 lg:pb-16">
          {tool.accepts === "any" && (
            <div className="mb-6">
              <CapabilityNotice />
            </div>
          )}
          <Workspace toolId={tool.id} />
        </div>
      </div>
    </>
  );
}
