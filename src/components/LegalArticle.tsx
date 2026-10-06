import { fmt } from "@/i18n/locales";
import { CONTACT_EMAIL } from "@/lib/seo";

export interface LegalText {
  title: string;
  intro: string;
  sections: { title: string; text: string }[];
}

/** Lien externe affiché à la suite d'un paragraphe. */
export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="font-medium break-words text-brand-fg underline underline-offset-4" rel="noopener">
      {children}
    </a>
  );
}

/** Adresse de contact, à la suite d'un lien : « lien · contact@… ». */
export function ContactLink() {
  return (
    <>
      {" · "}
      <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ExternalLink>
    </>
  );
}

/**
 * Page de texte (Conditions d'utilisation, Sécurité, Accessibilité) : titre, date de mise à jour,
 * introduction puis sections. `extras` ajoute un lien à la fin de certaines sections (par numéro),
 * `blocks` un bloc (code, liste…) sous le paragraphe.
 */
export function LegalArticle({
  text,
  updatedLabel,
  updated,
  locale,
  extras = {},
  blocks = {},
}: {
  text: LegalText;
  updatedLabel: string;
  /** Date de la dernière modification réelle (AAAA-MM-JJ). */
  updated: string;
  locale: string;
  extras?: Record<number, React.ReactNode>;
  blocks?: Record<number, React.ReactNode>;
}) {
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(`${updated}T12:00:00Z`));
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="font-display text-[clamp(2rem,6vw,3rem)] leading-tight font-bold tracking-[-0.03em]">{text.title}</h1>
      <p className="mt-2 text-sm text-muted">{fmt(updatedLabel, { date })}</p>
      <p className="mt-6 text-lg leading-relaxed">{text.intro}</p>
      <div className="mt-10 space-y-8">
        {text.sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-display text-xl font-bold">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">
              {section.text}
              {extras[i] && <> {extras[i]}</>}
            </p>
            {blocks[i]}
          </section>
        ))}
      </div>
    </article>
  );
}
