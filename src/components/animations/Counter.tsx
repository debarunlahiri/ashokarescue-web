"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/constants";

type CounterProps = {
  to: number;
  suffix?: string;
  className?: string;
};

export default function Counter({ to, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-IN")}
      <span className="text-sun">{suffix}</span>
    </span>
  );
}
