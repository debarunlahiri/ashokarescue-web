"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { serviceIcons } from "@/components/icons";
import { services } from "@/data";
import { EASE_OUT_EXPO } from "@/lib/constants";

/** Services dropdown shown under the desktop navigation. */
export default function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      className="absolute left-1/2 top-full w-[min(980px,92vw)] -translate-x-1/2 pt-6"
    >
      <div className="grid grid-cols-3 gap-1 rounded-3xl bg-white p-3 shadow-[0_40px_100px_-30px_rgba(7,19,48,0.5)] ring-1 ring-ink/5">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-mist">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                <Icon className="size-4" />
              </span>
              <span className="text-[0.82rem] font-semibold leading-snug text-ink">{service.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
