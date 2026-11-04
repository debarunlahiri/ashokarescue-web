import Link from "next/link";
import { ArrowUpRight, Clock, Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { serviceIcons, WhatsAppIcon } from "@/components/icons";
import { site } from "@/data";
import type { Service } from "@/types";

export default function ServiceSidebar({ relatedServices }: { relatedServices: Service[] }) {
  return (
    <div className="grid gap-6 lg:sticky lg:top-28">
      <Reveal className="border-t-4 border-brand bg-navy p-7 text-white">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand"><Clock className="size-4" /> Available 24/7</p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-white">Speak with our medical transport team</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75">Share the patient’s condition and route. Our coordinators will help assess the safest transfer option.</p>
        <div className="mt-6 grid gap-2.5">
          <a href={site.phones.emergency.href} className="btn btn-brand"><Phone className="size-4" /> {site.phones.emergency.label}</a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline-light"><WhatsAppIcon /> WhatsApp</a>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="card p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">Related services</p>
        <ul className="mt-4 divide-y divide-line">
          {relatedServices.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group flex items-center gap-3 py-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-brand group-hover:text-navy"><Icon className="size-4" /></span>
                  <span className="flex-1 text-[0.92rem] font-medium leading-snug text-navy">{service.name}</span>
                  <ArrowUpRight className="size-4 text-navy/30 transition group-hover:text-brand" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/services" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand">All services →</Link>
      </Reveal>
    </div>
  );
}
