import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Globe, MapPin } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { about, images } from "@/data";

export default function AboutReach() {
  const { reach, certificate } = about;
  const regions = [
    { ...reach.domestic, items: reach.domestic.cities, label: "Cities we serve", Icon: MapPin },
    { ...reach.international, items: reach.international.regions, label: "Regions we connect", Icon: Globe },
  ];

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading eyebrow={reach.eyebrow} title={reach.title} description={reach.text} />

      <Reveal className="relative mt-14 overflow-hidden rounded-[2rem] bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full glow text-royal/40 scale-125" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full glow text-sun/15 scale-125" />

        <div className="relative grid divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          {regions.map(({ Icon, ...region }) => (
            <div key={region.title} className="p-8 md:p-12">
              <div className="flex items-center gap-3 text-sun">
                <Icon className="size-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{region.label}</span>
              </div>
              <h3 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">{region.title}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-white/65">{region.text}</p>

              <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                {region.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 border-b border-white/10 py-3 text-[0.95rem] font-medium text-white/90">
                    <span className="size-1.5 shrink-0 rounded-full bg-sun" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-6">
        <a
          href={images.company.certificate.src}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col items-start gap-6 rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(7,19,48,0.25)] ring-1 ring-ink/5 transition hover:ring-royal/30 sm:flex-row sm:items-center md:p-8"
        >
          <span className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-ink/10 transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-105">
            <Image src={images.company.certificate.src} alt={images.company.certificate.alt} fill sizes="96px" className="object-cover" />
          </span>
          <span className="flex-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-royal">
              <BadgeCheck className="size-4" /> Registered company
            </span>
            <span className="mt-2 block text-2xl font-bold tracking-tight">{certificate.title}</span>
            <span className="mt-1 block text-slate">{certificate.text}</span>
          </span>
          <span className="btn btn-dark shrink-0">
            View document <ArrowUpRight className="size-4" />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
