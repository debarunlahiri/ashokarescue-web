"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/types";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { cn, padNumber } from "@/lib/utils";

type AccordionProps = {
  items: Faq[];
  numbered?: boolean;
  defaultOpenIndex?: number | null;
};

export default function Accordion({ items, numbered = true, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start gap-5 py-6 text-left"
            >
              {numbered && <span className="mt-1 text-sm font-bold tabular-nums text-royal/50">{padNumber(i + 1)}</span>}
              <span className={cn("flex-1 text-lg font-bold leading-snug tracking-tight transition-colors md:text-xl", isOpen ? "text-royal" : "text-ink group-hover:text-royal")}>
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                  isOpen ? "rotate-45 border-royal bg-royal text-white" : "border-ink/15 text-ink",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-3xl pb-7 leading-relaxed text-slate", numbered && "pl-10")}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
