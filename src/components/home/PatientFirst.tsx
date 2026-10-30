import { Check, Quote } from "lucide-react";
import { ClipReveal, ParallaxImage, Reveal } from "@/components/animations";
import { SectionHeading, StatsBand } from "@/components/common";
import { home, images } from "@/data";

export default function PatientFirst() {
  const { eyebrow, title, quote, text, points } = home.patientFirst;

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div aria-hidden className="absolute left-1/3 top-0 size-[600px] rounded-full bg-royal/30 blur-[160px]" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <ClipReveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <ParallaxImage image={images.hero.inflightMonitoring} sizes="(min-width: 1024px) 50vw, 100vw" imageClassName="object-[35%_center]" />
            </ClipReveal>
            <Reveal delay={0.3} className="glass absolute -bottom-8 right-4 max-w-xs rounded-3xl p-6 md:-right-8">
              <Quote className="size-6 text-sun" />
              <p className="mt-3 text-xl font-bold leading-snug tracking-tight">{quote}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <SectionHeading light eyebrow={eyebrow} title={title} description={text} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {points.map((point, i) => (
                <Reveal key={point.title} delay={0.1 + i * 0.1} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                  <span className="grid size-10 place-items-center rounded-full bg-sun text-ink"><Check className="size-5" /></span>
                  <h3 className="mt-5 text-lg font-bold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{point.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <StatsBand dark />
        </div>
      </div>
    </section>
  );
}
