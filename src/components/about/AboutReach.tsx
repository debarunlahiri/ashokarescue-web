import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Globe, MapPin } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { about, images } from "@/data";
import { cn } from "@/lib/utils";

export default function AboutReach() {
  const { reach, certificate } = about;
  const regions = [
    { ...reach.domestic, items: reach.domestic.cities, label: "Cities we serve", Icon: MapPin, dark: false },
    { ...reach.international, items: reach.international.regions, label: "Regions we connect", Icon: Globe, dark: true },
  ];

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow={reach.eyebrow} title={reach.title} description={reach.text} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {regions.map(({ Icon, dark, ...region }, i) => (
            <Reveal key={region.title} delay={i * 0.08} className="h-full">
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded p-8 md:p-10",
                  dark ? "bg-navy text-white shadow-[0_30px_70px_-35px_rgba(7,15,69,0.8)]" : "card",
                )}
              >
                <Icon aria-hidden strokeWidth={1} className={cn("pointer-events-none absolute -right-8 -top-8 size-56", dark ? "text-white/[0.06]" : "text-brand/10")} />
                <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1", dark ? "bg-brand" : "bg-navy")} />

                <div className="relative flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand text-navy shadow-[0_10px_24px_-10px_rgba(76,195,240,0.9)]">
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>
                  <span className={cn("text-xs font-medium uppercase tracking-[0.2em]", dark ? "text-brand" : "text-brand-600")}>{region.label}</span>
                </div>

                <h3 className={cn("relative mt-7 font-display text-2xl font-bold md:text-[2rem]", dark && "text-white")}>{region.title}</h3>
                <p className={cn("relative mt-3 max-w-lg leading-relaxed", dark ? "text-white/75" : "text-slate")}>{region.text}</p>

                <ul className="relative mt-auto grid grid-cols-2 gap-3 pt-8 sm:grid-cols-3">
                  {region.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.93rem] font-medium transition-colors",
                        dark ? "bg-white/[0.07] text-white hover:bg-brand hover:text-navy" : "bg-mist text-navy hover:bg-brand hover:text-white",
                      )}
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-brand group-hover:bg-current" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-6">
          <a href={images.company.certificate.src} target="_blank" rel="noreferrer" className="card group flex flex-col items-start gap-6 border-l-4 border-navy p-6 transition hover:border-brand sm:flex-row sm:items-center md:p-8">
            <span className="relative h-32 w-24 shrink-0 overflow-hidden rounded shadow-lg ring-1 ring-line transition-transform duration-300 group-hover:scale-105">
              <Image src={images.company.certificate.src} alt={images.company.certificate.alt} fill sizes="96px" className="object-cover" />
            </span>
            <span className="flex-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-600"><BadgeCheck className="size-4" /> Registered company</span>
              <span className="mt-2 block font-display text-2xl font-semibold text-navy">{certificate.title}</span>
              <span className="mt-1 block text-slate">{certificate.text}</span>
            </span>
            <span className="btn btn-dark shrink-0">View document <ArrowUpRight className="size-4" /></span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
