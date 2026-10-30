"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  image: ImageAsset;
  sizes: string;
  /** Max vertical travel in px. */
  amount?: number;
  className?: string;
  imageClassName?: string;
  decorative?: boolean;
};

/**
 * Fills its nearest positioned parent and drifts the image on scroll.
 * The parent must be `relative` with a set height or aspect ratio.
 */
export default function ParallaxImage({ image, sizes, amount = 60, className, imageClassName, decorative }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] h-[130%]">
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt}
          aria-hidden={decorative || undefined}
          fill
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
