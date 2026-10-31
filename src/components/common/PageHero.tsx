import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { ClipReveal, Reveal, SplitText } from "@/components/animations";
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

/** Dark split hero used at the top of inner pages. */
export default function PageHero({ eyebrow, title, description, image, caption, actions }: PageHeroProps) {
  return (
    <section className="grain relative overflow-hidden bg-ink pb-20 pt-14 text-white md:pb-28 md:pt-20">
      <div aria-hidden className="absolute -left-40 top-20 size-[520px] rounded-full glow text-royal/40 scale-150" />
      <div aria-hidden className="absolute -right-20 bottom-0 size-[380px] rounded-full glow text-sun/20 scale-150" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow eyebrow-light">{eyebrow}</p></Reveal>
          <SplitText as="h1" animateOnMount lines={title} accentClassName="text-flare" className="display mt-6 text-5xl sm:text-6xl xl:text-7xl" />
          <Reveal delay={0.3}><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">{description}</p></Reveal>
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              {actions ?? (
                <>
                  <Link href="/contact#assistance" className="btn btn-primary">Plan a transfer <ArrowRight className="size-4" /></Link>
                  <a href={site.phones.emergency.href} className="btn btn-ghost"><Phone className="size-4" /> {site.phones.emergency.label}</a>
                </>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <ClipReveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            {caption && (
              <div className="glass absolute bottom-5 left-5 right-5 rounded-2xl px-5 py-4">
                <p className="text-lg font-bold leading-snug">{caption[0]}</p>
                <p className="text-sm text-white/70">{caption[1]}</p>
              </div>
            )}
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
