"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/types";
import { cn, padNumber } from "@/lib/utils";

type AccordionProps = {
  items: Faq[];
  numbered?: boolean;
  defaultOpenIndex?: number | null;
};

export default function Accordion({ items, numbered = true, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="grid gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className={cn("rounded border bg-white transition-all duration-300", isOpen ? "border-brand shadow-[0_14px_40px_-22px_rgba(76,195,240,0.55)]" : "border-line hover:border-brand/50")}
          >
            <button type="button" onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6 md:py-5">
              {numbered && <span className="font-display text-sm font-bold tabular-nums text-brand-600">{padNumber(i + 1)}</span>}
              <span className="flex-1 font-display text-[1.05rem] font-semibold leading-snug text-navy md:text-lg">{item.question}</span>
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300", isOpen ? "rotate-45 bg-brand text-navy" : "bg-brand-50 text-brand")}>
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className={cn("max-w-3xl px-5 pb-6 leading-relaxed text-slate md:px-6", numbered && "md:pl-[3.4rem]")}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
