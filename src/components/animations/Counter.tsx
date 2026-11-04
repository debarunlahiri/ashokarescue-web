"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/constants";

type CounterProps = {
  to: number;
  suffix?: string;
  className?: string;
};

const format = (v: number) => Math.round(v).toLocaleString("en-IN");

/** Counts up when scrolled into view. Writes straight to the DOM so it never re-renders per frame. */
export default function Counter({ to, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => {
        if (numberRef.current) numberRef.current.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      <span ref={numberRef}>0</span>
      <span className="text-brand-600">{suffix}</span>
    </span>
  );
}
