import Link from "next/link";
import { serviceIcons } from "@/components/icons";
import { services } from "@/data";

/** Infinite scrolling strip of every service; pauses on hover. */
export default function ServiceMarquee() {
  const loop = [...services, ...services];

  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-white py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {loop.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Link
              key={`${service.slug}-${i}`}
              href={`/services/${service.slug}`}
              aria-hidden={i >= services.length || undefined}
              tabIndex={i >= services.length ? -1 : undefined}
              className="flex items-center gap-3 text-xl font-bold tracking-tight text-ink/80 transition hover:text-royal"
            >
              <Icon className="size-5 text-sun" /> {service.name}
            </Link>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white" />
    </div>
  );
}
