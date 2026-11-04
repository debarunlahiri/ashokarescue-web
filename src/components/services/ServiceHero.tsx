import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Phone, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animations";
import { serviceIcons } from "@/components/icons";
import { site } from "@/data";
import type { Service } from "@/types";

export default function ServiceHero({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];
  const titleLines = Array.isArray(service.hero.title) ? service.hero.title : [service.hero.title];

  return (
    <section className="under-nav relative isolate flex min-h-[520px] items-end overflow-hidden bg-navy-900 pb-14 pt-28 text-white md:min-h-[600px] md:pb-20 lg:pt-44">
      <Image src={service.image.src} alt={service.image.alt} fill priority sizes="100vw" className="-z-10 object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/90 via-navy-900/65 to-navy-900/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy-900/80 to-transparent" />

      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
          <Link href="/" className="hover:text-brand">Home</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/services" className="hover:text-brand">Services</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white">{service.name}</span>
        </nav>
        <span className="mt-7 grid size-16 place-items-center rounded-full bg-brand text-navy"><Icon className="size-8" strokeWidth={1.6} /></span>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
          {titleLines.map((line, i) => (
            <span key={i} className={i === titleLines.length - 1 && titleLines.length > 1 ? "block text-brand" : "block"}>{line}</span>
          ))}
        </h1>
        {service.hero.subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{service.hero.subtitle}</p>}
        {service.badges && (
          <Reveal delay={0.1} className="mt-7 flex flex-wrap gap-2">
            {service.badges.map((badge) => (
              <span key={badge} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20 backdrop-blur">
                <ShieldCheck className="size-4 text-brand" />
                {badge}
              </span>
            ))}
          </Reveal>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#assistance" className="btn btn-brand">Request this service <ArrowRight className="size-4" /></Link>
          <a href={site.phones.emergency.href} className="btn btn-light"><Phone className="size-4" /> {site.phones.emergency.label}</a>
        </div>
      </div>
    </section>
  );
}
