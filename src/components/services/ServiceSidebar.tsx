import Link from "next/link";
import { ArrowUpRight, Clock, Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { serviceIcons, WhatsAppIcon } from "@/components/icons";
import { site } from "@/data";
import type { Service } from "@/types";

export default function ServiceSidebar({ relatedServices }: { relatedServices: Service[] }) {
  return (
    <div className="grid gap-5 lg:sticky lg:top-28">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white">
        <div aria-hidden className="absolute -right-16 -top-16 size-52 rounded-full glow text-royal/50 scale-125" />
        <div className="relative">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky"><Clock className="size-4" /> Available 24/7</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">Speak with our medical transport team</h2>
          <p className="mt-3 text-sm text-white/70">Share the patient’s condition and route. Our coordinators will help assess the safest transfer option.</p>
          <div className="mt-6 grid gap-2.5">
            <a href={site.phones.emergency.href} className="btn btn-primary justify-center"><Phone className="size-4" /> {site.phones.emergency.label}</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost justify-center"><WhatsAppIcon /> WhatsApp</a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="card p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-royal">Related services</p>
        <ul className="mt-4 divide-y divide-ink/5">
          {relatedServices.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group flex items-center gap-3 py-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mist text-royal transition group-hover:bg-royal group-hover:text-white">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex-1 text-[0.92rem] font-semibold leading-snug">{service.name}</span>
                  <ArrowUpRight className="size-4 text-ink/30 transition group-hover:rotate-45 group-hover:text-royal" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/services" className="mt-2 inline-block text-sm font-bold text-royal">All services →</Link>
      </Reveal>
    </div>
  );
}
