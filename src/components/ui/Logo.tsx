import Image from "next/image";
import Link from "next/link";
import { images } from "@/data";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Show the tagline next to the badge. */
  withWordmark?: boolean;
};

export default function Logo({ className, withWordmark = false }: LogoProps) {
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
      {withWordmark && (
        <span className="hidden leading-tight sm:block">
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-sky/90">Air Ambulance</span>
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-sky/90">Services</span>
        </span>
      )}
    </Link>
  );
}
