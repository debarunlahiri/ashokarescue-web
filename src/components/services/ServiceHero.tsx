import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Phone, ShieldCheck } from "lucide-react";
import { Reveal, SplitText } from "@/components/animations";
import { serviceIcons } from "@/components/icons";
import { site } from "@/data";
import type { Service } from "@/types";

export default function ServiceHero({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <section className="grain relative flex min-h-[calc(78vh-var(--header-h))] items-end overflow-hidden bg-ink pb-16 pt-14 md:pt-20 text-white md:pb-20">
      <Image src={service.image.src} alt={service.image.alt} fill priority sizes="100vw" className="object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />

      <div className="container-x relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-white">{service.name}</span>
          </nav>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="mt-8 grid size-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md">
            <Icon className="size-6 text-flare" />
          </span>
        </Reveal>
        <SplitText as="h1" animateOnMount lines={service.hero.title} className="display mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl" />
        {service.hero.subtitle && (
          <Reveal delay={0.3}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{service.hero.subtitle}</p></Reveal>
        )}
        {service.badges && (
          <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-2">
            {service.badges.map((badge) => (
              <span key={badge} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                <ShieldCheck className="size-4 text-sun" />
                {badge}
              </span>
            ))}
          </Reveal>
        )}
        <Reveal delay={0.45} className="mt-9 flex flex-wrap gap-3">
          <Link href="#assistance" className="btn btn-primary">Request this service <ArrowRight className="size-4" /></Link>
          <a href={site.phones.emergency.href} className="btn btn-ghost"><Phone className="size-4" /> {site.phones.emergency.label}</a>
        </Reveal>
      </div>
    </section>
  );
}
