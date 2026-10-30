import Image from "next/image";
import { SectionHeading } from "@/components/common";
import { galleries } from "@/data";

const rowOne = [...galleries.airAmbulance.slice(0, 8), ...galleries.commercialStretcher.slice(1, 5)];
const rowTwo = [...galleries.roadAmbulance, ...galleries.airAmbulance.slice(8, 14)];

function GalleryRow({ photos, reverse = false }: { photos: string[]; reverse?: boolean }) {
  const loop = [...photos, ...photos];
  return (
    <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]" style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: "70s" }}>
      {loop.map((src, i) => (
        <div key={`${src}-${i}`} className="relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl md:h-72 md:w-56">
          <Image src={src} alt={i < photos.length ? "Ashoka Rescue medical transport in the field" : ""} fill sizes="224px" className="object-cover transition-transform duration-700 hover:scale-110" />
        </div>
      ))}
    </div>
  );
}

/** Two counter-scrolling rows of real mission photos. */
export default function FieldGallery() {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="From our missions" title={["In the air.", "On the ground."]} description="Real transfers by the Ashoka Rescue team — air ambulances, airline stretchers and road ambulances across India and abroad." />
      </div>
      <div className="mt-14 grid gap-4">
        <GalleryRow photos={rowOne} />
        <GalleryRow photos={rowTwo} reverse />
      </div>
    </section>
  );
}
