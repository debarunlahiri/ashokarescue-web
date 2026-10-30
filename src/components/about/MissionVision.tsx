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
    <section className="bg-mist py-24 md:py-32">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cards.map(({ Icon, dark, ...card }, i) => (
            <Reveal key={card.label} delay={i * 0.1} className={cn("relative overflow-hidden rounded-[2rem] p-9 md:p-12", dark ? "bg-ink text-white" : "bg-white")}>
              <Icon className={cn("size-8", dark ? "text-sun" : "text-royal")} />
              <p className={cn("mt-8 text-xs font-bold uppercase tracking-[0.2em]", dark ? "text-sky" : "text-royal")}>{card.label}</p>
              <h3 className="display mt-4 text-3xl md:text-4xl">
                {card.title[0]}
                <br />
                <span className={dark ? "text-flare" : "text-royal"}>{card.title[1]}</span>
              </h3>
              <p className={cn("mt-5 leading-relaxed", dark ? "text-white/70" : "text-slate")}>{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
