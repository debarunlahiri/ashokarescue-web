"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { serviceIcons } from "@/components/icons";
import { services, servicesPage } from "@/data";
import { EASE_OUT_EXPO } from "@/lib/constants";

/** Searchable grid of every service. */
export default function ServicesGrid() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return services;
    return services.filter((service) => `${service.name} ${service.excerpt} ${service.hero.subtitle ?? ""}`.toLowerCase().includes(term));
  }, [query]);

  return (
    <>
      <div className="relative mt-10 max-w-xl">
        <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search services — e.g. ECMO, neonate, train…"
          aria-label="Search services"
          className="w-full rounded-full border border-ink/10 bg-white py-4 pl-14 pr-12 text-base shadow-sm outline-none transition focus:border-royal focus:shadow-[0_0_0_4px_rgba(27,79,196,0.12)]"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-mist">
            <X className="size-4" />
          </button>
        )}
      </div>

      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <motion.div
                layout
                key={service.slug}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.3), ease: EASE_OUT_EXPO }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/[0.07] bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_40px_80px_-40px_rgba(12,33,96,0.45)]"
                >
                  <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-navy to-ink transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                  <div className="relative flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-mist text-royal transition-colors duration-500 group-hover:bg-white/10 group-hover:text-flare">
                      <Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-ink/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
                  </div>
                  <h3 className="relative mt-8 text-xl font-bold leading-tight tracking-tight transition-colors duration-500 group-hover:text-white">{service.name}</h3>
                  <p className="relative mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-slate transition-colors duration-500 group-hover:text-white/70">{service.excerpt}</p>
                  <span className="relative mt-auto pt-6 text-sm font-bold text-royal transition-colors duration-500 group-hover:text-sun">Learn more →</span>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <div className="mt-6 rounded-[2rem] bg-mist p-10 text-center">
          <p className="text-2xl font-bold">{servicesPage.explore.empty.title}</p>
          <p className="mt-2 text-slate">{servicesPage.explore.empty.text}</p>
        </div>
      )}
    </>
  );
}
