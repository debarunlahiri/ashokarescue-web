import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon, type SocialNetwork } from "@/components/icons";
import { Logo } from "@/components/ui";
import { services, site } from "@/data";
import FooterTransport from "./FooterTransport";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

export default function Footer() {
  const socialNetworks = Object.keys(site.social) as SocialNetwork[];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full glow text-royal/30 scale-150" />

      <div className="container-x relative border-b border-white/10 py-14 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow eyebrow-light">24/7 medical coordination</p>
            <h2 className="display mt-5 text-4xl md:text-6xl">
              Need an air ambulance
              <br />
              <span className="text-sky">right now?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.phones.emergency.href} className="btn btn-primary text-base">
              <Phone className="size-4" /> {site.phones.emergency.label}
            </a>
            <Link href="/contact#assistance" className="btn btn-ghost text-base">
              Request assistance <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo withName className="gap-4" nameClassName="text-2xl xl:text-3xl" />
          <p className="mt-5 max-w-sm leading-relaxed text-white/60">{site.tagline}</p>
          <div className="mt-6 flex gap-2">
            {socialNetworks.map((network) => (
              <a
                key={network}
                href={site.social[network]}
                target="_blank"
                rel="noreferrer"
                aria-label={network}
                className="grid size-10 place-items-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
              >
                <SocialIcon name={network} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Company</h3>
          <ul className="mt-5 space-y-3 text-white/70">
            {companyLinks.map((link) => (
              <li key={link.href}><Link className="hover:text-white" href={link.href}>{link.label}</Link></li>
            ))}
            <li><a className="hover:text-white" href={site.blog} target="_blank" rel="noreferrer">Blog</a></li>
            <li><a className="hover:text-white" href={site.reviews} target="_blank" rel="noreferrer">Google reviews</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Medical transport services</h3>
          <ul className="mt-5 grid gap-2.5 text-[0.9rem] text-white/70">
            {services.slice(0, 9).map((service) => (
              <li key={service.slug}><Link className="hover:text-white" href={`/services/${service.slug}`}>{service.name}</Link></li>
            ))}
            <li><Link className="font-semibold text-flare hover:text-white" href="/services">All {services.length} services →</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Talk to our team</h3>
          <ul className="mt-5 space-y-4 text-white/75">
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-sun" /><a href={site.phones.emergency.href} className="hover:text-white">{site.phones.emergency.label}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-sun" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-sun" /><a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="hover:text-white">{site.address.lines.join(" ")}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName.replace(/\.$/, "")}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
          <Link href="/terms" className="hover:text-white">Terms and conditions</Link>
        </div>
      </div>

      <FooterTransport />
    </footer>
  );
}
