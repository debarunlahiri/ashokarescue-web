import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { contactPage } from "@/data";
import { padNumber } from "@/lib/utils";

export default function NextSteps() {
  const { eyebrow, title, steps } = contactPage.next;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="border-t-4 border-brand bg-mist p-8">
              <span className="font-display text-5xl font-bold text-brand-600">{padNumber(i + 1)}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
