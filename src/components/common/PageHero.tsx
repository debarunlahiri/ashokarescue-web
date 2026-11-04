import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { EcgLine } from "@/components/icons";
import { site } from "@/data";
import type { ImageAsset } from "@/types";

type PageHeroProps = {
  eyebrow: string;
  title: string[];
  description: string;
  image: ImageAsset;
  caption?: string[];
  /** Replaces the default call-to-action buttons. */
  actions?: ReactNode;
};

/** Light banner used at the top of inner pages; tucks under the floating nav on desktop. */
export default function PageHero({ eyebrow, title, description, image, caption, actions }: PageHeroProps) {
  return (
    <section className="under-nav relative overflow-hidden bg-mist pb-16 pt-12 md:pb-24 lg:pt-28">
      <div aria-hidden className="absolute -right-24 -top-24 size-[420px] rounded-full bg-brand/10" />
      <div aria-hidden className="absolute -bottom-32 left-1/3 size-[300px] rounded-full bg-brand/10" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal offset={16}>
            <EcgLine />
            <p className="mt-3 text-base uppercase tracking-[0.14em] text-slate md:text-lg">{eyebrow}</p>
          </Reveal>
          <h1 className="mt-3 font-display text-[2.4rem] font-bold leading-[1.08] sm:text-5xl xl:text-[3.6rem]">
            {title.map((line, i) => (
              <span key={i} className={i === title.length - 1 && title.length > 1 ? "block text-brand-600" : "block"}>{line}</span>
            ))}
          </h1>
          <Reveal delay={0.15} offset={16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate md:text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {actions ?? (
                <>
                  <Link href="/contact#assistance" className="btn btn-dark">Plan a transfer <ArrowRight className="size-4" /></Link>
                  <a href={site.phones.emergency.href} className="btn btn-light shadow-sm"><Phone className="size-4" /> {site.phones.emergency.label}</a>
                </>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <div className="relative ml-4 md:ml-6">
            <span aria-hidden className="absolute -bottom-4 -left-4 h-full w-full rounded bg-brand md:-bottom-5 md:-left-5" />
            <div className="relative aspect-[4/3] overflow-hidden rounded bg-navy shadow-2xl">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              {caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent px-5 pb-5 pt-12 text-white">
                  <p className="font-display text-lg font-semibold text-white">{caption[0]}</p>
                  <p className="text-sm text-white/80">{caption[1]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
