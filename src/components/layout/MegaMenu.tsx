"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { serviceIcons } from "@/components/icons";
import { serviceMenu, site } from "@/data";
import { cn } from "@/lib/utils";

/** Services dropdown under the desktop navigation. */
export default function MegaMenu() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2 }}
      className="absolute inset-x-0 top-full z-10"
    >
      <div className="grid max-h-[calc(100svh-var(--nav-h)-2rem)] overflow-hidden border-t-2 border-brand bg-white shadow-[0_40px_80px_-30px_rgba(16,32,122,0.5)] lg:grid-cols-[17rem_1fr]">
        <aside className="flex flex-col justify-between bg-navy p-7 text-white">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">Our services</p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-white">Bedside to bedside, by air, rail and road.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">Not sure which option fits? Our team will help you plan the right transfer.</p>
          </div>
          <div className="mt-7 grid gap-2">
            <Link href="/services" className="btn btn-brand">View all services <ArrowRight className="size-4" /></Link>
            <a href={site.phones.emergency.href} className="btn btn-outline-light"><Phone className="size-4" /> {site.phones.emergency.label}</a>
          </div>
        </aside>

        <div className="grid content-start gap-x-6 gap-y-6 overflow-y-auto p-6 lg:grid-cols-2 xl:grid-cols-3">
          {serviceMenu.map((group) => (
            <div key={group.title}>
              <p className="px-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate">{group.title}</p>
              <ul className="mt-2 grid gap-0.5">
                {group.items.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  const href = `/services/${service.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={service.slug}>
                      <Link href={href} aria-current={isActive ? "page" : undefined} className={cn("group flex items-center gap-3 rounded px-2.5 py-2 transition-colors hover:bg-brand-50", isActive && "bg-brand-50")}>
                        <span className={cn("grid size-8 shrink-0 place-items-center rounded-full transition-colors", isActive ? "bg-brand text-navy" : "bg-brand-50 text-brand-600 group-hover:bg-brand group-hover:text-navy")}>
                          <Icon className="size-4" />
                        </span>
                        <span className="line-clamp-2 text-[0.88rem] font-medium leading-snug text-navy">{service.name}</span>
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
