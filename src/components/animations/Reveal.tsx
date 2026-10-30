"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/constants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels upward while fading in. */
  offset?: number;
};

export default function Reveal({ children, className, delay = 0, offset = 40 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
