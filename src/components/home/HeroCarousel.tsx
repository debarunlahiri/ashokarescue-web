"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EcgLine } from "@/components/icons";
import { heroSlides, home, site } from "@/data";
import { EASE_OUT_EXPO, HERO_SLIDE_DURATION_MS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DURATION = HERO_SLIDE_DURATION_MS;
const ease = EASE_OUT_EXPO;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [, setProgress] = useState(0);
  const start = useRef(0);
  const elapsed = useRef(0);

  const go = useCallback((next: number, d = 1) => {
    setDir(d);
    setIndex((next + heroSlides.length) % heroSlides.length);
    elapsed.current = 0;
    setProgress(0);
  }, []);

  // autoplay with pausable progress
  useEffect(() => {
    let id = 0;
    start.current = performance.now() - elapsed.current;
    const tick = (t: number) => {
      if (!paused) {
        elapsed.current = t - start.current;
        const p = Math.min(elapsed.current / DURATION, 1);
        setProgress(p);
        if (p >= 1) {
          go(index + 1, 1);
          return;
        }
      } else {
        start.current = t - elapsed.current;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [index, paused, go]);

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

  // pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const ix = useTransform(sx, (v) => v * -18);
  const iy = useTransform(sy, (v) => v * -12);

  // swipe
  const touchX = useRef<number | null>(null);

  const slide = heroSlides[index];
  const lines = slide.title;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Ashoka Rescue highlights"
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-white"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* images */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          className="absolute inset-0"
          initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0%)" }}
          exit={{ opacity: 0.6, transition: { duration: 1.2 } }}
          transition={{ duration: 1.3, ease }}
        >
          <motion.div style={{ x: ix, y: iy }} className="absolute inset-[-3%]">
            {slide.hasBakedText && (
              <Image src={slide.image.src} alt="" aria-hidden fill sizes="100vw" className="scale-110 object-cover blur-2xl brightness-75 md:hidden" />
            )}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.18 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }}
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={slide.hasBakedText ? "object-contain object-center md:object-cover md:object-left" : "object-cover object-[65%_center]"}
              />
            </motion.div>
          </motion.div>
          {!slide.hasBakedText && <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/0" />}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* copy */}
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-44 md:justify-center md:pb-24">
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
            <motion.div key={`t${index}`} className="max-w-2xl" exit={{ opacity: 0, y: -30, transition: { duration: 0.35 } }}>
              <motion.p className="eyebrow eyebrow-light" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.8, ease } }}>
                {slide.eyebrow}
              </motion.p>
              <h1 className="display mt-6 text-[2.7rem] sm:text-6xl lg:text-[5.4rem]">
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
              </h1>
              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.9, ease } }}
              >
                {slide.text}
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.95, duration: 0.9, ease } }}
              >
                <Link href="/contact#assistance" className="btn btn-primary">Plan a transfer <ArrowRight className="size-4" /></Link>
                <a href={site.phones.emergency.href} className="btn btn-ghost"><Phone className="size-4" /> {site.phones.emergency.label}</a>
              </motion.div>
              {slide.note && (
                <motion.p className="mt-8 hidden items-center gap-3 text-sm text-white/70 md:flex" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.2 } }}>
                  <EcgLine /> {slide.note}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* controls + quick CTA */}
      <div className="absolute inset-x-0 bottom-0 z-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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
