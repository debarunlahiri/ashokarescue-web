import { Reveal } from "@/components/animations";
import { SectionHeading, WorldRouteMap } from "@/components/common";
import { home } from "@/data";

export default function GlobalReach() {
  const { eyebrow, title, text, cards } = home.reach;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} description={text} />

        <Reveal delay={0.1} className="mt-12 rounded bg-navy p-4 shadow-[0_30px_70px_-35px_rgba(7,15,69,0.7)] md:p-10">
          <WorldRouteMap />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.text} delay={i * 0.08} className="card border-l-4 border-brand p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                {card.title[0]}
                <br />
                <span className="text-brand-600">{card.title[1]}</span>
              </h3>
              <p className="mt-4 leading-relaxed text-slate">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
