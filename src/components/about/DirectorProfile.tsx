import Image from "next/image";
import { ClipReveal, Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { about, images } from "@/data";

export default function DirectorProfile() {
  const { director } = about;

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div aria-hidden className="absolute -right-40 top-10 size-[560px] rounded-full glow text-royal/30 scale-150" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ClipReveal className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem]">
            <Image src={images.team.director.src} alt={images.team.director.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-2xl font-bold tracking-tight">{director.name}</p>
              <p className="mt-1 text-sm font-semibold text-flare">{director.credentials}</p>
              <p className="text-sm text-white/70">{director.role}</p>
            </div>
          </ClipReveal>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <SectionHeading light eyebrow={director.eyebrow} title={director.title} description={director.intro} />
          {director.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}>
              <p className="mt-5 leading-relaxed text-white/70">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-2">
            {director.expertise.map((area) => (
              <span key={area} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/10">{area}</span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
