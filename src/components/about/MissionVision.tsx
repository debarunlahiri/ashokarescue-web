import { Eye, Target } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { about } from "@/data";
import { cn } from "@/lib/utils";

export default function MissionVision() {
  const { eyebrow, title, mission, vision } = about.purpose;
  const cards = [
    { ...mission, Icon: Target, dark: true },
    { ...vision, Icon: Eye, dark: false },
  ];

  return (
    <section className="section bg-mist">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map(({ Icon, dark, ...card }, i) => (
            <Reveal key={card.label} delay={i * 0.08} className={cn("p-9 md:p-12", dark ? "bg-navy text-white" : "card border-l-4 border-brand")}>
              <span className={cn("grid size-16 place-items-center rounded-full", dark ? "bg-brand text-navy" : "bg-brand-50 text-brand-600")}>
                <Icon className="size-8" strokeWidth={1.6} />
              </span>
              <p className={cn("mt-7 text-xs font-medium uppercase tracking-[0.2em]", dark ? "text-brand" : "text-brand-600")}>{card.label}</p>
              <h3 className={cn("mt-3 font-display text-3xl font-bold leading-tight", dark && "text-white")}>
                {card.title[0]}
                <br />
                <span className={dark ? "text-brand" : "text-brand-600"}>{card.title[1]}</span>
              </h3>
              <p className={cn("mt-5 leading-relaxed", dark ? "text-white/75" : "text-slate")}>{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
