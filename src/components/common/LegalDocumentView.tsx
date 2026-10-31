import { Reveal, SplitText } from "@/components/animations";
import type { LegalDocument } from "@/types";
import { padNumber } from "@/lib/utils";

export default function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-14 text-white md:pb-20 md:pt-20">
        <div aria-hidden className="absolute -left-40 top-10 size-[480px] rounded-full glow text-royal/40 scale-150" />
        <div className="container-x relative">
          <Reveal><p className="eyebrow eyebrow-light">Legal</p></Reveal>
          <SplitText as="h1" animateOnMount lines={document.title} className="display mt-6 text-5xl md:text-7xl" />
        </div>
      </section>

      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-32 grid gap-2 text-sm">
            {document.sections.map((section, i) => (
              <li key={section.heading}>
                <a href={`#section-${i + 1}`} className="flex gap-3 rounded-xl px-3 py-2 text-slate transition hover:bg-mist hover:text-ink">
                  <span className="tabular-nums text-royal/60">{padNumber(i + 1)}</span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose-ar max-w-3xl lg:col-span-9">
          {document.intro && (
            <Reveal><p className="mb-12 text-xl font-semibold !leading-snug !text-ink md:text-2xl">{document.intro}</p></Reveal>
          )}
          {document.sections.map((section, i) => (
            <Reveal key={section.heading} offset={20}>
              <div id={`section-${i + 1}`} className="scroll-mt-28 border-t border-ink/10 py-8">
                <h2 className="flex items-baseline gap-4 text-xl font-bold tracking-tight md:text-2xl">
                  <span className="text-sm tabular-nums text-royal/60">{padNumber(i + 1)}</span>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4">{paragraph}</p>)}
              </div>
            </Reveal>
          ))}
          <Reveal><p className="mt-6 rounded-2xl bg-mist p-6 !text-navy">{document.outro}</p></Reveal>
        </article>
      </section>
    </>
  );
}
