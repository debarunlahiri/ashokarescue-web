"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
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
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search services — e.g. ECMO, neonate, train…"
          aria-label="Search services"
          className="field !py-4 !pl-12 !pr-12 text-base shadow-sm"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-brand-50 text-brand-700">
            <X className="size-4" />
          </button>
        )}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <motion.div
                layout
                key={service.slug}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.25), ease: EASE_OUT_EXPO }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="card group flex h-full flex-col border-b-4 border-navy p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand"
                >
                  <span className="grid size-[4.25rem] place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand group-hover:text-navy">
                    <Icon className="size-8" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-tight">{service.name}</h3>
                  <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-slate">{service.excerpt}</p>
                  <span className="mt-auto pt-6"><span className="btn btn-brand !px-5 !py-2.5 !normal-case !tracking-normal">Read more</span></span>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <div className="mt-6 border-l-4 border-brand bg-mist p-10 text-center">
          <p className="font-display text-2xl font-bold">{servicesPage.explore.empty.title}</p>
          <p className="mt-2 text-slate">{servicesPage.explore.empty.text}</p>
        </div>
      )}
    </>
  );
}
