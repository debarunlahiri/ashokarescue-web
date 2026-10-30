"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const container: Variants = { visible: { transition: { staggerChildren: 0.12 } } };
const line: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

type SplitTextProps = {
  lines: string | string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Colour class applied to the last line. */
  accentClassName?: string;
  /** Animate on mount instead of when scrolled into view. */
  animateOnMount?: boolean;
};

/** Heading whose lines slide up from behind a mask. */
export default function SplitText({ lines, as = "h2", className, accentClassName, animateOnMount = false }: SplitTextProps) {
  const items = Array.isArray(lines) ? lines : [lines];
  const Tag = motion[as];
  const trigger = animateOnMount
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "-60px" } };

  return (
    <Tag className={className} variants={container} initial="hidden" {...trigger}>
      {items.map((text, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span variants={line} className={cn("block", i === items.length - 1 && items.length > 1 && accentClassName)}>
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
