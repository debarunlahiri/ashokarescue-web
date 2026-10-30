import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { serviceIcons } from "@/components/icons";
import { home, services } from "@/data";
import { cn } from "@/lib/utils";

export default function ServicesShowcase() {
  const { eyebrow, title, text, items } = home.services;

  return (
    <section className="container-x py-24 md:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading eyebrow={eyebrow} title={title} description={text} />
        <Reveal>
          <Link href="/services" className="btn btn-outline shrink-0">All {services.length} services <ArrowRight className="size-4" /></Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
        {items.map((item, i) => {
          const Icon = serviceIcons[item.icon];
          const isWide = i === 0 || i === 3;
          return (
            <Reveal key={item.title} delay={i * 0.08} className={isWide ? "lg:col-span-7" : "lg:col-span-5"}>
              <Link href={item.href} className="group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-7 text-white md:p-9">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover opacity-80 transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute right-6 top-6 grid size-12 place-items-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-sun group-hover:text-ink">
                  <ArrowUpRight className="size-5" />
                </span>
                <div className="relative">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-white/10 backdrop-blur-md"><Icon className="size-5 text-flare" /></span>
                  <h3 className="display text-3xl md:text-4xl">{item.title}</h3>
                  <p className={cn("mt-3 max-w-md text-white/75 transition-all duration-500", "md:translate-y-2 md:opacity-80 md:group-hover:translate-y-0 md:group-hover:opacity-100")}>
                    {item.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
