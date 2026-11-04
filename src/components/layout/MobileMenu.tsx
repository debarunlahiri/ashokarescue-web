"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";
import { serviceIcons } from "@/components/icons";
import { navigation, serviceMenu, site } from "@/data";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));
  const linkClass = "block py-3.5 font-display text-xl font-semibold text-navy";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-white pb-10 lg:hidden"
    >
      <div className="container-x">
        <nav aria-label="Mobile" className="flex flex-col">
          {navigation.map((item) => {
            const isServices = item.href === "/services";
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <div key={item.href} className="border-b border-line">
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={cn(linkClass, "flex items-center justify-between")}>
                    {item.label} <ArrowUpRight className="size-5 text-brand" />
                  </a>
                ) : isServices ? (
                  <>
                    <button type="button" onClick={() => setServicesOpen((open) => !open)} aria-expanded={servicesOpen} aria-controls="mobile-services" className={cn(linkClass, "flex w-full items-center justify-between text-left", isActive && "text-brand-600")}>
                      {item.label}
                      <span className={cn("grid size-8 place-items-center rounded-full bg-brand-50 transition-transform", servicesOpen && "rotate-180")}>
                        <ChevronDown className="size-5 text-brand-600" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div id="mobile-services" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="grid gap-5 pb-5">
                            {serviceMenu.map((group) => (
                              <div key={group.title}>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate">{group.title}</p>
                                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                                  {group.items.map((service) => {
                                    const Icon = serviceIcons[service.icon];
                                    const href = `/services/${service.slug}`;
                                    const active = pathname === href;
                                    return (
                                      <li key={service.slug}>
                                        <Link href={href} aria-current={active ? "page" : undefined} className={cn("flex items-center gap-3 rounded p-2 text-[0.95rem] leading-snug", active ? "bg-brand-50 text-navy" : "text-slate active:bg-brand-50")}>
                                          <span className={cn("grid size-8 shrink-0 place-items-center rounded-full", active ? "bg-brand text-navy" : "bg-brand-50 text-brand-600")}>
                                            <Icon className="size-4" />
                                          </span>
                                          {service.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600">
                              View all services <ArrowRight className="size-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={item.href} className={cn(linkClass, isActive && "text-brand-600")}>{item.label}</Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href={site.phones.emergency.href} className="btn btn-brand"><Phone className="size-4" /> {site.phones.emergency.label}</a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline">WhatsApp our team</a>
        </div>
      </div>
    </motion.div>
  );
}
