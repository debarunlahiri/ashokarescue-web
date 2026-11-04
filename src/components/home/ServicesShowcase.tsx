import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { serviceIcons } from "@/components/icons";
import { home, services } from "@/data";

export default function ServicesShowcase() {
  const { eyebrow, title, text, items } = home.services;

  return (
    <section className="section bg-mist">
      <div className="container-x">
        <SectionHeading centered eyebrow={eyebrow} title={title} description={text} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = serviceIcons[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.07} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded bg-white text-navy shadow-[0_10px_40px_-18px_rgba(16,32,122,0.3)] transition-all duration-300 hover:-translate-y-1 hover:text-brand-600">
                  <div className="relative">
                    <Link href={item.href} className="relative block h-48 overflow-hidden" tabIndex={-1} aria-hidden>
                      <Image src={item.image.src} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      {/* curvy edge where the photo meets the card */}
                      <svg aria-hidden viewBox="0 0 400 48" preserveAspectRatio="none" className="absolute -bottom-px inset-x-0 h-10 w-full fill-white">
                        <path d="M0 48V26C50 2 100 2 200 26s150 24 200 0V48z" />
                      </svg>
                    </Link>
                    <span className="absolute -bottom-8 left-6 z-10 grid size-[4.25rem] place-items-center rounded-full bg-brand text-navy shadow-[0_10px_24px_-8px_rgba(76,195,240,0.9)] ring-4 ring-white">
                      <Icon className="size-8" strokeWidth={1.6} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-12">
                    <h3 className="font-display text-[1.3rem] font-semibold leading-snug"><Link href={item.href}>{item.title}</Link></h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate">{item.text}</p>
                    <Link href={item.href} className="btn btn-brand mt-6 self-start !px-5 !py-2.5 !normal-case !tracking-normal">Read more</Link>
                  </div>
                  <span aria-hidden className="zigzag text-navy transition-colors duration-300 group-hover:text-brand" />
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/services" className="btn btn-dark">All {services.length} services <ArrowRight className="size-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}
