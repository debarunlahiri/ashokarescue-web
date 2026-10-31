"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { serviceIcons } from "@/components/icons";
import { serviceMenu, site } from "@/data";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Services dropdown shown under the desktop navigation (lg and up). */
export default function MegaMenu() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      className="absolute inset-x-0 top-full pt-2"
    >
      <div className="grid max-h-[calc(100svh-var(--header-h)-1.5rem)] overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_-30px_rgba(7,19,48,0.55)] ring-1 ring-ink/5 lg:grid-cols-[16rem_1fr] xl:grid-cols-[18rem_1fr]">
        {/* feature column */}
        <aside className="relative flex flex-col justify-between overflow-hidden bg-ink p-7 text-white">
          <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full glow text-royal/50 scale-125" />
          <div className="relative">
            <p className="eyebrow eyebrow-light">Our services</p>
            <p className="mt-4 text-xl font-bold leading-snug tracking-tight">Bedside to bedside, by air, rail and road.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">Not sure which option fits? Our team will help you plan the right transfer.</p>
          </div>
          <div className="relative mt-8 grid gap-2">
            <Link href="/services" className="btn btn-primary justify-center !py-3">
              View all services <ArrowRight className="size-4" />
            </Link>
            <a href={site.phones.emergency.href} className="btn btn-ghost justify-center !py-3">
              <Phone className="size-4" /> {site.phones.emergency.label}
            </a>
          </div>
        </aside>

        {/* grouped links */}
        <div data-lenis-prevent className="grid content-start gap-x-6 gap-y-7 overflow-y-auto p-6 lg:grid-cols-2 xl:grid-cols-3 xl:p-7">
          {serviceMenu.map((group) => (
            <div key={group.title}>
              <p className="px-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate">{group.title}</p>
              <ul className="mt-3 grid gap-0.5">
                {group.items.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  const href = `/services/${service.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={service.slug}>
                      <Link
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-mist focus-visible:bg-mist",
                          isActive && "bg-mist",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg transition-colors",
                            isActive ? "bg-royal text-white" : "bg-mist text-royal group-hover:bg-royal group-hover:text-white",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="line-clamp-2 text-[0.84rem] font-semibold leading-snug text-ink">{service.name}</span>
                        <ArrowRight className="ml-auto size-3.5 shrink-0 -translate-x-1 text-royal opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
