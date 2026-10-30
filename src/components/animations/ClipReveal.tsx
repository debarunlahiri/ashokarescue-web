"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/constants";

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Expands its children from an inset rounded rectangle. */
export default function ClipReveal({ children, className, delay = 0 }: ClipRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(10% 10% 10% 10% round 2rem)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
