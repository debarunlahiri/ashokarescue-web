import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedSingle, ClipboardCheck, Clock, Globe, Plane, UsersRound, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { EcgLine } from "@/components/icons";
import { home, images } from "@/data";

const icons: Record<string, LucideIcon> = { plane: Plane, team: UsersRound, globe: Globe, support: ClipboardCheck, stretcher: BedSingle, clock: Clock };

export default function WhyChooseUs() {
  const { eyebrow, title, quote, text, highlights } = home.patientFirst;

  return (
    <section className="section relative overflow-hidden">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon, title: cardTitle, text: cardText }, i) => {
            const Icon = icons[icon];
            return (
              <Reveal key={cardTitle} delay={(i % 3) * 0.08} className="group flex h-full flex-col items-center rounded-2xl border border-white bg-gradient-to-b from-white to-brand-50/60 px-8 pb-9 pt-8 text-center shadow-[0_18px_44px_-22px_rgba(16,32,121,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-20px_rgba(16,32,121,0.5)]">
                <span className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-brand-50 to-[#cfd6f3] text-brand-600 shadow-[inset_0_0_0_1px_rgba(16,32,121,0.06)] transition-colors duration-300 group-hover:from-brand group-hover:to-brand-700 group-hover:text-white">
                  <Icon className="size-10" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-[1.65rem] font-extrabold leading-tight tracking-tight text-navy">{cardTitle}</h3>
                <p className="mt-3 max-w-xs text-base leading-relaxed text-ink/80">{cardText}</p>
              </Reveal>
            );
          })}
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
