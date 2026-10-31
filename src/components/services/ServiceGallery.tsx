"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/animations";
import { setScrollLocked } from "@/lib/lenis";
import { cn } from "@/lib/utils";

type ServiceGalleryProps = {
  title: string;
  photos: string[];
};

/** Masonry gallery of field photos with a keyboard-friendly lightbox. */
export default function ServiceGallery({ title, photos }: ServiceGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (direction: number) => setActiveIndex((i) => (i === null ? i : (i + direction + photos.length) % photos.length)),
    [photos.length],
  );

  const isOpen = activeIndex !== null;
  useEffect(() => {
    if (!isOpen) return;
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, step]);

  return (
    <section className="container-x pb-24 md:pb-32">
      <Reveal>
        <p className="eyebrow">From our missions</p>
        <h2 className="display mt-5 text-3xl md:text-5xl">{title}</h2>
      </Reveal>

      <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {photos.map((src, i) => (
          <Reveal key={src} delay={(i % 4) * 0.06} offset={30}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("group relative block w-full overflow-hidden rounded-2xl bg-mist", i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]")}
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
            >
              <Image src={src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image src={photos[activeIndex]} alt="" fill sizes="100vw" className="object-contain" />
            </motion.div>
            <button type="button" onClick={close} className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white" aria-label="Close">
              <X className="size-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-4 grid size-11 place-items-center rounded-full bg-white/10 text-white" aria-label="Previous photo">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white" aria-label="Next photo">
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
