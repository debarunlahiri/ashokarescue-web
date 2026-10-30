import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Reveal, SplitText } from "@/components/animations";
import { WhatsAppIcon } from "@/components/icons";
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
    <section className="container-x py-24 md:py-32">
      <div className="grain relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-16 text-white md:px-16 md:py-24">
        {image && <Image src={image.src} alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-30 mix-blend-luminosity" />}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-navy via-navy/85 to-royal/60" />
        <div aria-hidden className="absolute -bottom-32 -right-32 size-[420px] rounded-full bg-sun/30 blur-[120px]" />

        <div className="relative grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow eyebrow-light">{eyebrow}</p></Reveal>
            <SplitText lines={title} accentClassName="text-flare" className="display mt-5 text-4xl md:text-6xl" />
            {description && <Reveal delay={0.15}><p className="mt-5 max-w-lg text-lg text-white/75">{description}</p></Reveal>}
          </div>
          <Reveal delay={0.2} className="grid gap-3 lg:col-span-5">
            <a href={site.phones.emergency.href} className="btn btn-primary justify-between !py-4 text-base">
              <span className="flex items-center gap-3"><Phone className="size-5" /> {site.phones.emergency.label}</span>
              <ArrowRight className="size-4" />
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost justify-between !py-4 text-base">
              <span className="flex items-center gap-3"><WhatsAppIcon /> WhatsApp our team</span>
              <ArrowUpRight className="size-4" />
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-ghost justify-between !py-4 text-base">
              <span className="flex items-center gap-3"><Mail className="size-5" /> {site.email}</span>
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
