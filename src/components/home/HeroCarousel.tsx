"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, site } from "@/data";
import { HERO_SLIDE_DURATION_MS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => setIndex((next + heroSlides.length) % heroSlides.length), []);

  // Autoplay: one timer per slide; paused on hover or when the tab is hidden.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(index + 1), HERO_SLIDE_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  useEffect(() => {
    const next = heroSlides[(index + 1) % heroSlides.length];
    const img = new window.Image();
    img.src = next.image.src;
  }, [index]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const slide = heroSlides[index];
  const lines = slide.title;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Ashoka Rescue highlights"
      className="under-nav relative isolate h-[640px] w-full overflow-hidden bg-navy-900 text-white md:aspect-[1600/854] md:h-auto md:max-h-[940px] md:min-h-[640px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <h1 className="sr-only">{site.name} — air ambulance and critical care medical transport in India and worldwide</h1>

      <AnimatePresence initial={false}>
        <motion.div key={index} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
          {slide.hasBakedText && (
            <Image src={slide.image.src} alt="" aria-hidden fill sizes="64px" quality={40} className="scale-110 object-cover blur-md brightness-75 md:hidden" />
          )}
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            className={slide.hasBakedText ? "object-contain object-center md:object-cover md:object-left" : "object-cover object-[70%_center]"}
          />
          {!slide.hasBakedText && <div className="absolute inset-0 bg-gradient-to-r from-navy-900/55 via-navy-900/20 to-transparent max-md:from-navy-900/55 max-md:via-navy-900/35 max-md:to-navy-900/20" />}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-900/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* copy */}
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-36 pt-24 md:pb-40 md:pt-28">
        <AnimatePresence mode="wait">
          {slide.hasBakedText ? (
            <motion.div key={`b${index}`} className="max-w-md md:hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} exit={{ opacity: 0 }}>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand">{slide.eyebrow}</p>
              <p className="mt-3 text-white/85">{slide.text}</p>
            </motion.div>
          ) : (
            <motion.div key={`t${index}`} className="max-w-xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.7 } }} exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}>
              <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                {lines.map((l, i) => (
                  <span key={i} className={cn("block", i === lines.length - 1 && lines.length > 1 && "text-brand")}>{l}</span>
                ))}
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/contact#assistance" className="btn btn-brand">Plan a transfer <ArrowRight className="size-4" /></Link>
                <a href={site.phones.emergency.href} aria-label={`Call ${site.phones.emergency.label}`} className="grid size-12 place-items-center rounded-full bg-white text-navy transition hover:bg-brand"><Phone className="size-5" /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* controls */}
      <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="absolute left-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-brand hover:text-navy md:grid">
        <ChevronLeft className="size-5" />
      </button>
      <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="absolute right-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-brand hover:text-navy md:grid">
        <ChevronRight className="size-5" />
      </button>
      <div className="container-x absolute inset-x-0 bottom-24 z-20 flex gap-2 md:bottom-28">
        {heroSlides.map((s, i) => (
          <button key={s.eyebrow} type="button" onClick={() => go(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === index} className={cn("h-1.5 rounded-full transition-all duration-300", i === index ? "w-10 bg-brand" : "w-4 bg-white/50 hover:bg-white")} />
        ))}
      </div>
    </section>
  );
}
