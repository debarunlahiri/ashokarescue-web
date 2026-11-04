import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading, StatsBand } from "@/components/common";
import { about, images, site } from "@/data";

export default function AboutStory() {
  const { story } = about;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow={story.eyebrow} title={story.title} description={story.intro} />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="relative ml-4 md:ml-6 lg:col-span-6">
            <span aria-hidden className="absolute -bottom-4 -left-4 h-full w-full rounded bg-brand md:-bottom-5 md:-left-5" />
            <div className="relative aspect-[5/4] overflow-hidden rounded">
              <Image src={images.airAmbulance.tarmacConvoy.src} alt={images.airAmbulance.tarmacConvoy.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 flex items-center gap-4 bg-navy px-5 py-4 text-white shadow-xl md:-right-6">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">Established in</span>
              <span className="font-display text-4xl font-bold text-brand">{site.established}</span>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:pl-6">
            <Reveal>
              <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                {story.heading[0]}
                <br />
                <span className="text-brand-600">{story.heading[1]}</span>
              </h3>
            </Reveal>
            {story.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.08 + i * 0.06}>
                <p className="mt-5 text-lg leading-relaxed text-slate">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="mt-7 flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">{tag}</span>
              ))}
            </Reveal>
            <Reveal delay={0.25}>
              <Link href="/services" className="btn btn-dark mt-8">Explore our services <ArrowRight className="size-4" /></Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <StatsBand />
        </div>
      </div>
    </section>
  );
}
