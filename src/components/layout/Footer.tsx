import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon, WhatsAppIcon, type SocialNetwork } from "@/components/icons";
import { Logo } from "@/components/ui";
import { services, site } from "@/data";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

/** Slim full-width call-to-action strip above the footer. */
function ContactBand() {
  return (
    <div className="bg-brand text-navy">
      <div className="container-x flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-9">
        <div className="flex items-center gap-4">
          <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-navy/10 sm:grid">
            <Phone className="size-6" strokeWidth={1.7} />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight text-navy md:text-[1.9rem]">Need an air ambulance right now?</h2>
            <p className="mt-1 text-sm text-navy/80">{site.hours}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href={site.phones.emergency.href} className="btn btn-dark !normal-case !tracking-normal text-base">
            <Phone className="size-4" /> {site.phones.emergency.label}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline !normal-case !tracking-normal">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
          <Link href="/contact#assistance" className="btn btn-light !normal-case !tracking-normal">
            Plan a transfer <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const socialNetworks = Object.keys(site.social) as SocialNetwork[];

  return (
    <footer className="text-white">
      <ContactBand />
      <div className="bg-navy">

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{site.tagline}</p>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">Company</h3>
          <ul className="mt-5 grid gap-3 text-sm text-white/75">
            {companyLinks.map((link) => (
              <li key={link.href}><Link className="transition-colors hover:text-brand" href={link.href}>{link.label}</Link></li>
            ))}
            <li><a className="transition-colors hover:text-brand" href={site.blog} target="_blank" rel="noreferrer">Blog</a></li>
            <li><a className="transition-colors hover:text-brand" href={site.reviews} target="_blank" rel="noreferrer">Google reviews</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">Medical transport services</h3>
          <ul className="mt-5 grid gap-3 text-sm text-white/75">
            {services.slice(0, 8).map((service) => (
              <li key={service.slug}><Link className="transition-colors hover:text-brand" href={`/services/${service.slug}`}>{service.name}</Link></li>
            ))}
            <li><Link className="font-medium text-brand hover:text-white" href="/services">All {services.length} services →</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">Talk to our team</h3>
          <ul className="mt-5 grid gap-4 text-sm text-white/75">
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-brand" /><span><a href={site.phones.emergency.href} className="block hover:text-brand">{site.phones.emergency.label}</a><a href={site.phones.office.href} className="block hover:text-brand">{site.phones.office.label}</a></span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-brand" /><a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-brand" /><a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="hover:text-brand">{site.address.lines.join(" ")}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName.replace(/\.$/, "")}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy" className="hover:text-brand">Privacy policy</Link>
            <Link href="/terms" className="hover:text-brand">Terms and conditions</Link>
            <div className="flex gap-4">
              {socialNetworks.map((network) => (
                <a key={network} href={site.social[network]} target="_blank" rel="noreferrer" aria-label={network} className="text-white/80 transition-colors hover:text-brand">
                  <SocialIcon name={network} className="size-[1.1rem]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
