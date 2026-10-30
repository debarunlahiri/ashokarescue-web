import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ParallaxImage, Reveal, SplitText } from "@/components/animations";
import { home, images } from "@/data";

export default function ClosingCta() {
  return (
    <section className="relative h-[80vh] min-h-[520px] overflow-hidden bg-ink text-white">
      <ParallaxImage image={images.hero.beyondBorders} sizes="100vw" amount={100} decorative imageClassName="object-right opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        <SplitText lines={home.closing} accentClassName="text-flare" className="display max-w-5xl text-4xl sm:text-6xl lg:text-7xl" />
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact#assistance" className="btn btn-primary">Plan a transfer <ArrowRight className="size-4" /></Link>
          <Link href="/about" className="btn btn-ghost">About Ashoka Rescue</Link>
        </Reveal>
      </div>
    </section>
  );
}
