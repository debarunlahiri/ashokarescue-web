"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { navigation, site } from "@/data";
import { EASE_OUT_EXPO } from "@/lib/constants";

export default function MobileMenu() {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 92% 4%)" }}
      animate={{ clipPath: "circle(150% at 92% 4%)" }}
      exit={{ clipPath: "circle(0% at 92% 4%)" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className="fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pb-10 pt-28 lg:hidden"
    >
      <nav className="flex flex-col">
        {navigation.map((item, i) => (
          <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
            {item.external ? (
              <a href={item.href} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-bold tracking-tight text-white">
                {item.label} <ArrowUpRight className="size-5 text-sky" />
              </a>
            ) : (
              <Link href={item.href} className="block border-b border-white/10 py-4 text-3xl font-bold tracking-tight text-white">
                {item.label}
              </Link>
            )}
          </motion.div>
        ))}
      </nav>

      <div className="mt-8 grid gap-3">
        <a href={site.phones.emergency.href} className="btn btn-primary justify-center">
          <Phone className="size-4" /> {site.phones.emergency.label}
        </a>
        <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost justify-center">
          WhatsApp our team
        </a>
      </div>
    </motion.div>
  );
}
