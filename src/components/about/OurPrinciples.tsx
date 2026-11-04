import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { about } from "@/data";
import { padNumber } from "@/lib/utils";

export default function OurPrinciples() {
  const { eyebrow, title, text, items } = about.principles;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} description={text} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="card group border-b-4 border-navy p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand">
              <span className="grid size-14 place-items-center rounded-full bg-brand-50 font-display text-xl font-bold text-brand-600 transition-colors group-hover:bg-brand group-hover:text-navy">{padNumber(i + 1)}</span>
              <h3 className="mt-6 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
