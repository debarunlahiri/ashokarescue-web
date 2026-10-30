import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { about } from "@/data";
import { padNumber } from "@/lib/utils";

export default function OurPrinciples() {
  const { eyebrow, title, text, items } = about.principles;

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading eyebrow={eyebrow} title={title} description={text} />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} className="card group relative overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-2">
            <span aria-hidden className="absolute -right-3 -top-5 text-[6.5rem] font-extrabold leading-none text-mist transition-colors duration-500 group-hover:text-sun/20">
              {padNumber(i + 1)}
            </span>
            <div className="relative">
              <span className="text-sm font-bold text-royal">{padNumber(i + 1)}</span>
              <h3 className="mt-14 text-xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
