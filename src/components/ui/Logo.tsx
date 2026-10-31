import Image from "next/image";
import Link from "next/link";
import { images } from "@/data";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Show the tagline next to the badge. */
  withWordmark?: boolean;
  /** Show "Ashoka Rescue" beside the badge (sizes itself for every breakpoint). */
  withName?: boolean;
  /** Size classes for the name text; replaces the default header sizing (e.g. larger in the footer). */
  nameClassName?: string;
};

export default function Logo({ className, withWordmark = false, withName = false, nameClassName }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 text-white", className)} aria-label="Ashoka Rescue — home">
      <Image
        src={images.brand.logo.src}
        alt={images.brand.logo.alt}
        width={160}
        height={160}
        priority
        unoptimized
        className="size-16 shrink-0 rounded-2xl bg-white object-contain p-1 shadow-lg ring-1 ring-white/30 md:size-20"
      />
      {withName && (
        <span className="min-w-0 leading-tight">
          <span className={cn("block whitespace-nowrap font-extrabold tracking-tight", nameClassName ?? "text-base sm:text-lg xl:text-xl")}>Ashoka Rescue</span>
        </span>
      )}
      {withWordmark && (
        <span className="hidden leading-tight sm:block">
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-sky/90">Air Ambulance</span>
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-sky/90">Services</span>
        </span>
      )}
    </Link>
  );
}
