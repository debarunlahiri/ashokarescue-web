import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { contactPage } from "@/data";
import { padNumber } from "@/lib/utils";

export default function NextSteps() {
  const { eyebrow, title, steps } = contactPage.next;

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1} className="relative border-t-2 border-ink/10 pt-8">
            <span className="absolute -top-[2px] left-0 h-[2px] w-16 bg-sun" />
            <span className="text-5xl font-extrabold text-royal/15">{padNumber(i + 1)}</span>
            <h3 className="mt-4 text-xl font-bold tracking-tight">{step.title}</h3>
            <p className="mt-3 text-slate">{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
