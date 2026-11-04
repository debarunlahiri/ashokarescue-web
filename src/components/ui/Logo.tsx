import Image from "next/image";
import Link from "next/link";
import { images } from "@/data";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** "light" is for dark backgrounds (footer). */
  tone?: "dark" | "light";
};

export default function Logo({ className, tone = "dark" }: LogoProps) {
  const isLight = tone === "light";
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="Ashoka Rescue — home">
      <Image
        src={images.brand.logo.src}
        alt={images.brand.logo.alt}
        width={160}
        height={160}
        priority
        unoptimized
        className={cn("size-12 shrink-0 object-contain md:size-16", isLight && "rounded bg-white p-1")}
      />
      <span className="leading-none">
        <span className={cn("block font-display text-[1.35rem] font-extrabold uppercase tracking-tight md:text-[1.7rem]", isLight ? "text-white" : "text-navy")}>
          Ashoka Rescue
        </span>
        <span className={cn("mt-1 block text-[0.6rem] font-medium uppercase tracking-[0.3em] md:text-[0.68rem]", isLight ? "text-white/70" : "text-navy/70")}>
          Air Ambulance Services
        </span>
      </span>
    </Link>
  );
}
