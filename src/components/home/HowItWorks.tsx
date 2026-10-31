"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { Headset, ClipboardCheck, Route, HeartHandshake } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { home, images } from "@/data";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { padNumber } from "@/lib/utils";

const stepIcons = [Headset, ClipboardCheck, Route, HeartHandshake];

export default function HowItWorks() {
  const { eyebrow, title, steps } = home.howItWorks;
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 70%"] });

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <Image
        src={images.roadAmbulance.teamOnboard.src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-[0.12] mix-blend-luminosity"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <div className="container-x relative">
        <SectionHeading eyebrow={eyebrow} title={title} centered light />

        <ol ref={listRef} className="relative mt-16 grid gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* connecting line (desktop) */}
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-white/15 lg:block" />
          <motion.span
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px origin-left bg-gradient-to-r from-sun to-sky lg:block"
          />

          {steps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_OUT_EXPO }}
                className="group relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 grid size-16 place-items-center rounded-full bg-ink text-sun ring-1 ring-white/20 transition-all duration-500 group-hover:bg-sun group-hover:text-ink group-hover:ring-sun">
                  <Icon className="size-6" />
                </span>
                <div className="mt-6 w-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 group-hover:border-white/25 group-hover:bg-white/[0.08]">
                  <p className="text-sm font-bold tracking-[0.2em] text-sky">STEP {padNumber(i + 1)}</p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{step.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Link href="/contact#assistance" className="btn btn-primary">Start with a call</Link>
        </Reveal>
      </div>
    </section>
  );
}
