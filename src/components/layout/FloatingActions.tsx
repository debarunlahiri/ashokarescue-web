"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/data";
import { scrollToTop } from "@/lib/lenis";

export default function FloatingActions() {
  const { scrollY } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShowBackToTop(y > 500));

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={scrollToTop}
            className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-lg ring-1 ring-ink/10 transition hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Message us on WhatsApp"
        className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:-translate-y-1"
      >
        <span className="ping-soft absolute inset-0 rounded-full bg-[#25D366]" />
        <WhatsAppIcon className="relative size-7" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold opacity-0 transition group-hover:opacity-100">
          WhatsApp our team
        </span>
      </a>

      <a
        href={site.phones.emergency.href}
        aria-label={`Call ${site.phones.emergency.label}`}
        className="grid size-14 place-items-center rounded-full bg-signal text-white shadow-[0_12px_30px_-8px_rgba(217,58,53,0.7)] transition hover:-translate-y-1 md:hidden"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
