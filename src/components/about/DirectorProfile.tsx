import Image from "next/image";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { about, images } from "@/data";

export default function DirectorProfile() {
  const { director } = about;

  return (
    <section className="section bg-mist">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto ml-4 max-w-md md:ml-6 lg:mx-0">
            <span aria-hidden className="absolute -bottom-4 -left-4 h-full w-full rounded bg-brand md:-bottom-5 md:-left-5" />
            <div className="relative aspect-[4/5] overflow-hidden rounded bg-navy">
              <Image src={images.team.director.src} alt={images.team.director.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/95 to-transparent p-6 pt-20">
                <p className="font-display text-2xl font-bold text-white">{director.name}</p>
                <p className="mt-1 text-sm font-medium text-brand">{director.credentials}</p>
                <p className="text-sm text-white/80">{director.role}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-6">
          <SectionHeading eyebrow={director.eyebrow} title={director.title} description={director.intro} />
          {director.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <p className="mt-5 leading-relaxed text-slate">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-2">
            {director.expertise.map((area) => (
              <span key={area} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy shadow-sm ring-1 ring-line">{area}</span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
