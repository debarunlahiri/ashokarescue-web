import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { home, images, site } from "@/data";
import { padNumber } from "@/lib/utils";

/** Four steps as a vertical timeline beside a photo. */
export default function HowItWorks() {
  const { eyebrow, title, steps } = home.howItWorks;
  const photo = images.roadAmbulance.teamOnboard;

  return (
    <section className="section bg-mist">
      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading eyebrow={eyebrow} title={title} />

          <Reveal delay={0.1} className="relative ml-4 mt-10 md:ml-6">
            <span aria-hidden className="absolute -bottom-4 -left-4 h-full w-full rounded bg-brand md:-bottom-5 md:-left-5" />
            <div className="relative aspect-[4/3] overflow-hidden rounded bg-navy">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 flex items-center gap-3 bg-navy px-5 py-4 text-white shadow-xl md:-right-6">
              <span className="grid size-10 place-items-center rounded-full bg-brand"><Phone className="size-4" /></span>
              <a href={site.phones.emergency.href} className="font-display text-lg font-semibold text-white hover:text-brand">{site.phones.emergency.label}</a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ol className="relative grid gap-6">
            <span aria-hidden className="absolute bottom-10 left-[1.65rem] top-10 w-0.5 bg-brand/30" />
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 grid size-[3.4rem] shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-bold text-navy shadow-[0_10px_24px_-10px_rgba(76,195,240,0.9)] ring-8 ring-mist">
                    {padNumber(i + 1)}
                  </span>
                  <div className="card flex-1 border-l-4 border-brand p-6 transition-transform duration-300 hover:translate-x-1">
                    <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2} className="mt-10 pl-[4.4rem]">
            <Link href="/contact#assistance" className="btn btn-dark">Start with a call</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
