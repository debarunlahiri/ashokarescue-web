"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";
import { serviceIcons } from "@/components/icons";
import { navigation, serviceMenu, site } from "@/data";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));

  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 92% 4%)" }}
      animate={{ clipPath: "circle(150% at 92% 4%)" }}
      exit={{ clipPath: "circle(0% at 92% 4%)" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink pb-10 pt-[calc(var(--header-h)+1rem)] lg:hidden"
      data-lenis-prevent
    >
      <div className="container-x">
        <nav className="flex flex-col">
          {navigation.map((item, i) => {
            const isServices = item.href === "/services";
            const linkClass = "block py-4 text-3xl font-bold tracking-tight text-white";

            return (
              <motion.div
                key={item.href}
                className="border-b border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={cn(linkClass, "flex items-center justify-between")}>
                    {item.label} <ArrowUpRight className="size-5 text-sky" />
                  </a>
                ) : isServices ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((open) => !open)}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      className={cn(linkClass, "flex w-full items-center justify-between text-left")}
                    >
                      {item.label}
                      <span className={cn("grid size-9 place-items-center rounded-full bg-white/10 transition-transform", servicesOpen && "rotate-180")}>
                        <ChevronDown className="size-5 text-sky" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          id="mobile-services"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-6 pb-6">
                            {serviceMenu.map((group) => (
                              <div key={group.title}>
                                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sky/80">{group.title}</p>
                                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
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
                                            "flex items-center gap-3 rounded-xl p-2 text-[0.95rem] font-medium leading-snug transition-colors",
                                            isActive ? "bg-white/10 text-white" : "text-white/80 active:bg-white/10",
                                          )}
                                        >
                                          <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", isActive ? "bg-sun text-ink" : "bg-white/10 text-flare")}>
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
                            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-sun">
                              View all services <ArrowRight className="size-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href={site.phones.emergency.href} className="btn btn-primary justify-center">
            <Phone className="size-4" /> {site.phones.emergency.label}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost justify-center">
            WhatsApp our team
          </a>
        </div>
      </div>
    </motion.div>
  );
}
