"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/data";
import { scrollToTop } from "@/lib/scroll";

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            className="grid size-11 place-items-center rounded-full bg-navy text-white shadow-lg transition hover:bg-brand hover:text-navy"
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
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-navy px-3 py-1.5 text-xs font-medium opacity-0 transition group-hover:opacity-100">WhatsApp our team</span>
      </a>

      <a
        href={site.phones.emergency.href}
        aria-label={`Call ${site.phones.emergency.label}`}
        className="grid size-14 place-items-center rounded-full bg-brand text-navy shadow-[0_12px_30px_-8px_rgba(76,195,240,0.7)] transition hover:-translate-y-1 lg:hidden"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
