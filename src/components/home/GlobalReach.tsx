import { Reveal } from "@/components/animations";
import { SectionHeading, WorldRouteMap } from "@/components/common";
import { home } from "@/data";

export default function GlobalReach() {
  const { eyebrow, title, text, cards } = home.reach;

  return (
    <section className="grain relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="container-x relative">
        <SectionHeading light centered eyebrow={eyebrow} title={title} description={text} />
        <Reveal delay={0.1} className="mt-14">
          <WorldRouteMap />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.text} delay={i * 0.1} className="rounded-[2rem] bg-white/5 p-8 ring-1 ring-white/10 md:p-10">
              <h3 className="display text-3xl">
                {card.title[0]}
                <br />
                <span className="text-sky">{card.title[1]}</span>
              </h3>
              <p className="mt-4 text-white/70">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
