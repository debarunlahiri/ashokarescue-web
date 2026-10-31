import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceIcons } from "@/components/icons";
import { services } from "@/data";

/** Infinite scrolling strip of every service as pill chips; pauses on hover. */
export default function ServiceMarquee() {
  const loop = [...services, ...services];

  return (
    <section aria-label="Our services" className="relative border-t border-white/10 bg-ink text-white">
      <div className="flex items-stretch">
        {/* fixed label */}
        <Link
          href="/services"
          className="group relative z-10 hidden shrink-0 items-center gap-3 border-r border-white/10 bg-ink px-6 md:flex lg:px-10"
        >
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-flare">Our services</span>
          <span className="grid size-7 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-sun group-hover:text-ink">
            <ArrowRight className="size-3.5" />
          </span>
        </Link>

        {/* scrolling chips */}
        <div className="relative min-w-0 flex-1 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto md:py-5">
          <ul className="flex w-max animate-marquee [animation-duration:70s] hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loop.map((service, i) => {
              const Icon = serviceIcons[service.icon];
              const isClone = i >= services.length;
              return (
                <li key={`${service.slug}-${i}`} className="pr-3" aria-hidden={isClone || undefined}>
                  <Link
                    href={`/services/${service.slug}`}
                    tabIndex={isClone ? -1 : undefined}
                    className="group flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white/80 transition-colors hover:border-sun/40 hover:bg-white/10 hover:text-white"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun/15 text-sun transition-colors group-hover:bg-sun group-hover:text-ink">
                      <Icon className="size-3.5" />
                    </span>
                    {service.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
