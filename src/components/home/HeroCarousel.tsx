"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, home, site } from "@/data";
import { EASE_OUT_EXPO, HERO_SLIDE_DURATION_MS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DURATION = HERO_SLIDE_DURATION_MS;
const ease = EASE_OUT_EXPO;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  // Time left on the current slide; survives pause/resume without re-rendering every frame.
  const remaining = useRef(DURATION);
  const justAdvanced = useRef(false);

  const go = useCallback((next: number, d = 1) => {
    setDir(d);
    setIndex((next + heroSlides.length) % heroSlides.length);
    remaining.current = DURATION;
    justAdvanced.current = true;
  }, []);

  // autoplay: one timer per slide, paused on hover / hidden tab
  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    const id = window.setTimeout(() => go(index + 1, 1), remaining.current);
    return () => {
      window.clearTimeout(id);
      if (justAdvanced.current) justAdvanced.current = false;
      else remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt));
    };
  }, [index, paused, go]);

  // preload the next slide so the transition never waits on the network
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

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1, 1);
      if (e.key === "ArrowLeft") go(index - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  // swipe
  const touchX = useRef<number | null>(null);

  const slide = heroSlides[index];
  const lines = slide.title;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Ashoka Rescue highlights"
      className="grain relative flex h-[calc(100svh-var(--header-h))] min-h-[600px] w-full flex-col overflow-hidden bg-ink text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <h1 className="sr-only">{site.name} — air ambulance and critical care medical transport in India and worldwide</h1>

      {/* images */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          exit={{ zIndex: 0, opacity: 1, transition: { zIndex: { duration: 0 }, default: { duration: 1.3 } } }}
          transition={{ duration: 1.3, ease }}
        >
          <div className="absolute inset-0">
            {slide.hasBakedText && (
              <Image src={slide.image.src} alt="" aria-hidden fill sizes="64px" quality={40} className="scale-110 object-cover blur-md brightness-75 md:hidden" />
            )}
            <div className="absolute inset-0">
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                unoptimized
                sizes="100vw"
                className={slide.hasBakedText ? "object-contain object-center md:object-cover md:object-left" : "object-cover object-[65%_center]"}
              />
            </div>
          </div>
          {!slide.hasBakedText && <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* copy */}
      <div className="container-x relative z-10 flex min-h-0 flex-1 flex-col justify-end pb-8 pt-12 md:justify-center md:pb-10 md:pt-16">
        <AnimatePresence mode="wait">
          {slide.hasBakedText ? (
            <motion.div
              key={`b${index}`}
              className="max-w-md md:hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, ease } }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
              <p className="eyebrow eyebrow-light">{slide.eyebrow}</p>
              <p className="mt-3 text-white/80">{slide.text}</p>
            </motion.div>
          ) : (
            <motion.div key={`t${index}`} className="max-w-xl" exit={{ opacity: 0, y: -30, transition: { duration: 0.35 } }}>
              <motion.p className="eyebrow eyebrow-light" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.8, ease } }}>
                {slide.eyebrow}
              </motion.p>
              <h2 className="display mt-4 text-[2.1rem] sm:text-5xl lg:text-[3.6rem]">
                {lines.map((l, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className={cn("block", i === lines.length - 1 && "text-flare")}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%", transition: { delay: 0.45 + i * 0.12, duration: 1.1, ease } }}
                    >
                      {l}
                    </motion.span>
                  </span>
                ))}
              </h2>
              <motion.p
                className="mt-4 max-w-md text-base leading-relaxed text-white/85"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.9, ease } }}
              >
                {slide.text}
              </motion.p>
              <motion.div
                className="mt-6 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.95, duration: 0.9, ease } }}
              >
                <Link href="/contact#assistance" className="btn btn-primary">Plan a transfer <ArrowRight className="size-4" /></Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* controls + quick CTA */}
      <div className="relative z-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="container-x pb-6 md:pb-8">
          <div className="glass flex flex-col gap-4 rounded-3xl p-4 md:flex-row md:items-center md:justify-between md:p-5 md:pl-7">
            <div>
              <p className="text-lg font-bold leading-tight">{home.quickCta.title}</p>
              <p className="mt-1 text-sm text-white/65">{home.quickCta.text.join(" ")}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href={site.phones.emergency.href} className="btn btn-ghost !py-3">
                <Phone className="size-4" /> {site.phones.emergency.label}
              </a>
              <Link href="/contact#assistance" className="btn btn-primary !py-3">Request assistance <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
