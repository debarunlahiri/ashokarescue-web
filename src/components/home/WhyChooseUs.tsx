import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BedSingle, Clock, Plane, Route, Stethoscope, type LucideIcon } from "lucide-react";
import { Counter, Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { EcgLine } from "@/components/icons";
import { home, images, stats } from "@/data";

type Card = { Icon: LucideIcon; title?: string; text: string; stat?: (typeof stats)[number] };

export default function WhyChooseUs() {
  const { eyebrow, title, quote, text, points } = home.patientFirst;

  // Six cards in the template's 3 × 2 grid: the four headline figures plus the two patient-first principles.
  const cards: Card[] = [
    { Icon: Award, stat: stats[0], text: stats[0].label.join(" ") },
    { Icon: Plane, stat: stats[1], text: stats[1].label.join(" ") },
    { Icon: Stethoscope, title: points[0].title, text: points[0].text },
    { Icon: Route, title: points[1].title, text: points[1].text },
    { Icon: BedSingle, stat: stats[2], text: stats[2].label.join(" ") },
    { Icon: Clock, stat: stats[3], text: stats[3].label.join(" ") },
  ];

  return (
    <section className="section relative overflow-hidden">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ Icon, title: cardTitle, text: cardText, stat }, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08} className="card group flex flex-col items-center p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(76,195,240,0.45)]">
              <span className="grid size-[4.5rem] place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand group-hover:text-navy">
                <Icon className="size-8" strokeWidth={1.6} />
              </span>
              {stat ? (
                <Counter to={stat.value} suffix={stat.suffix} className="mt-5 block font-display text-4xl font-bold text-navy" />
              ) : (
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug">{cardTitle}</h3>
              )}
              <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-slate">{cardText}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-12 md:mt-28 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative ml-4 md:ml-6">
            <span aria-hidden className="absolute -bottom-4 -left-4 h-full w-full rounded bg-brand md:-bottom-5 md:-left-5" />
            <div className="relative aspect-[4/3] overflow-hidden rounded">
              <Image src={images.hero.inflightMonitoring.src} alt={images.hero.inflightMonitoring.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[35%_center]" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <EcgLine />
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-[2.6rem]">{quote}</h3>
            <p className="mt-5 text-lg leading-relaxed text-slate">{text}</p>
            <Link href="/about" className="btn btn-dark mt-8">About Ashoka Rescue <ArrowRight className="size-4" /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
