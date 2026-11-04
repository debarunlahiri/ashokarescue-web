import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations";
import { EcgLine } from "@/components/icons";
import { home, images } from "@/data";

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white md:py-32">
      <Image src={images.hero.beyondBorders.src} alt="" aria-hidden fill sizes="100vw" className="object-cover object-right opacity-30" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/40" />
      <div className="container-x relative text-center">
        <Reveal>
          <EcgLine className="mx-auto" />
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {home.closing.map((line, i) => (
              <span key={i} className={i === home.closing.length - 1 ? "block text-brand" : "block"}>{line}</span>
            ))}
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact#assistance" className="btn btn-brand">Plan a transfer <ArrowRight className="size-4" /></Link>
            <Link href="/about" className="btn btn-outline-light">About Ashoka Rescue</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
