import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { servicesPage } from "@/data";
import { padNumber } from "@/lib/utils";

export default function ServiceGuide() {
  const { eyebrow, title, text, steps } = servicesPage.guide;

  return (
    <section className="section bg-navy text-white">
      <div className="container-x">
        <SectionHeading light centered eyebrow={eyebrow} title={title} description={text} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="border-t-4 border-brand bg-white/[0.06] p-8">
              <span className="font-display text-5xl font-bold text-brand">{padNumber(i + 1)}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
