import Image from "next/image";
import Link from "next/link";
import { images, site } from "@/data";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Overrides the default logo-mark size. */
  imageClassName?: string;
  /** "light" is for dark backgrounds (footer). */
  tone?: "dark" | "light";
  showWordmark?: boolean;
};

export default function Logo({
  className,
  imageClassName,
  tone = "dark",
  showWordmark = false,
}: LogoProps) {
  const isLight = tone === "light";
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label={`${site.name} home`}>
      <Image
        src={images.brand.logo.src}
        alt={images.brand.logo.alt}
        width={240}
        height={240}
        priority
        unoptimized
        className={cn(
          "shrink-0 object-contain",
          imageClassName ?? "size-12 md:size-16",
          isLight && "rounded bg-white p-1",
        )}
      />
      {showWordmark && (
        <span className="whitespace-nowrap">
          <span className={cn("block font-display text-lg font-bold leading-tight", isLight ? "text-white" : "text-navy")}>
            {site.name}
          </span>
          <span className={cn("block text-xs leading-tight", isLight ? "text-white/80" : "text-slate")}>
            Air Ambulance Services
          </span>
        </span>
      )}
    </Link>
  );
}
