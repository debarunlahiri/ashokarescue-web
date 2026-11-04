import { Reveal } from "@/components/animations";
import { EcgLine } from "@/components/icons";
import type { LegalDocument } from "@/types";
import { padNumber } from "@/lib/utils";

export default function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <>
      <section className="under-nav relative overflow-hidden bg-mist pb-14 pt-12 md:pb-20 lg:pt-28">
        <div aria-hidden className="absolute -right-24 -top-24 size-[380px] rounded-full bg-brand/10" />
        <div className="container-x relative">
          <EcgLine />
          <p className="mt-3 text-base uppercase tracking-[0.14em] text-slate md:text-lg">Legal</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{document.title}</h1>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 grid gap-1 text-sm">
            {document.sections.map((section, i) => (
              <li key={section.heading}>
                <a href={`#section-${i + 1}`} className="flex gap-3 rounded px-3 py-2 text-slate transition hover:bg-brand-50 hover:text-navy">
                  <span className="tabular-nums text-brand-600">{padNumber(i + 1)}</span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose-ar max-w-3xl lg:col-span-9">
          {document.intro && <Reveal><p className="mb-10 text-xl font-medium !leading-snug !text-navy md:text-2xl">{document.intro}</p></Reveal>}
          {document.sections.map((section, i) => (
            <Reveal key={section.heading} offset={16}>
              <div id={`section-${i + 1}`} className="scroll-mt-28 border-t border-line py-8">
                <h2 className="flex items-baseline gap-4 font-display text-xl font-semibold md:text-2xl">
                  <span className="text-sm tabular-nums text-brand-600">{padNumber(i + 1)}</span>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4">{paragraph}</p>)}
              </div>
            </Reveal>
          ))}
          <Reveal><p className="mt-6 rounded border-l-4 border-brand bg-mist p-6 !text-navy">{document.outro}</p></Reveal>
        </article>
      </section>
    </>
  );
}
