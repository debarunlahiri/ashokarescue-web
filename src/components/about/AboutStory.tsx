import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClipReveal, ParallaxImage, Reveal } from "@/components/animations";
import { SectionHeading, StatsBand } from "@/components/common";
import { about, images, site } from "@/data";

export default function AboutStory() {
  const { story } = about;

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeading eyebrow={story.eyebrow} title={story.title} description={story.intro} />

      <div className="mt-16 grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <ClipReveal className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
            <ParallaxImage image={images.airAmbulance.tarmacConvoy} sizes="(min-width: 1024px) 50vw, 100vw" amount={50} />
          </ClipReveal>
          <Reveal delay={0.3} className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">Established in</span>
            <span className="display text-4xl text-royal">{site.established}</span>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <Reveal>
            <h3 className="display text-3xl md:text-4xl">
              {story.heading[0]}
              <br />
              <span className="text-royal">{story.heading[1]}</span>
            </h3>
          </Reveal>
          {story.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="mt-5 text-lg leading-relaxed text-slate">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-7 flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-navy">{tag}</span>
            ))}
          </Reveal>
          <Reveal delay={0.35}>
            <Link href="/services" className="btn btn-dark mt-8">Explore our services <ArrowRight className="size-4" /></Link>
          </Reveal>
        </div>
      </div>

      <div className="mt-24">
        <StatsBand />
      </div>
    </section>
  );
}
