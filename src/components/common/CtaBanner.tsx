import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { EcgLine, WhatsAppIcon } from "@/components/icons";
import { site } from "@/data";
import type { ImageAsset } from "@/types";

type CtaBannerProps = {
  eyebrow: string;
  title: string[];
  description?: string;
  image?: ImageAsset;
};

export default function CtaBanner({ eyebrow, title, description, image }: CtaBannerProps) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded bg-navy px-6 py-14 text-white md:px-14 md:py-16">
          {image && <Image src={image.src} alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-25 mix-blend-luminosity" />}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy/90 to-navy/60" />
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-brand" />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal offset={16}>
                <EcgLine />
                <p className="mt-3 text-base uppercase tracking-[0.14em] text-white/70">{eyebrow}</p>
              </Reveal>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-[2.8rem]">
                {title.map((line, i) => (
                  <span key={i} className={i === title.length - 1 && title.length > 1 ? "block text-brand" : "block"}>{line}</span>
                ))}
              </h2>
              {description && <p className="mt-4 max-w-lg text-lg text-white/75">{description}</p>}
            </div>
            <Reveal delay={0.15} className="grid gap-3 lg:col-span-5">
              <a href={site.phones.emergency.href} className="btn btn-brand !justify-between !py-4 text-sm">
                <span className="flex items-center gap-3"><Phone className="size-5" /> {site.phones.emergency.label}</span>
                <ArrowRight className="size-4" />
              </a>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline-light !justify-between !py-4 text-sm">
                <span className="flex items-center gap-3"><WhatsAppIcon /> WhatsApp our team</span>
                <ArrowUpRight className="size-4" />
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-outline-light !justify-between !py-4 text-sm normal-case">
                <span className="flex items-center gap-3"><Mail className="size-5" /> {site.email}</span>
                <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
