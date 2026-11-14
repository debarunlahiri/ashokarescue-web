import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon, type SocialNetwork } from "@/components/icons";
import { Logo } from "@/components/ui";
import { services, site } from "@/data";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Transfer FAQs", href: "/faqs" },
];

export default function Footer() {
  const socialNetworks = Object.keys(site.social) as SocialNetwork[];

  return (
    <footer className="bg-navy text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{site.tagline}</p>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">Company</h3>
          <ul className="mt-5 grid gap-3 text-sm text-white/75">
            {companyLinks.map((link) => (
              <li key={link.href}><Link className="transition-colors hover:text-white/70" href={link.href}>{link.label}</Link></li>
            ))}
            <li><a className="transition-colors hover:text-white/70" href={site.blog} target="_blank" rel="noreferrer">Blog</a></li>
            <li><a className="transition-colors hover:text-white/70" href={site.reviews} target="_blank" rel="noreferrer">Google reviews</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">Medical transport services</h3>
          <ul className="mt-5 grid gap-3 text-sm text-white/75">
            {services.slice(0, 8).map((service) => (
              <li key={service.slug}><Link className="transition-colors hover:text-white/70" href={`/services/${service.slug}`}>{service.name}</Link></li>
            ))}
            <li>
              <Link href="/services" className="inline-flex items-center gap-2 font-medium text-white hover:underline">
                All {services.length} services
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">Transfer assistance</h3>
          <ul className="mt-5 grid gap-4 text-sm text-white/75">
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-white" />
              <div className="grid gap-2">
                <a href={site.phones.emergency.href} className="hover:underline">
                  <span className="block font-medium text-white">24/7 transfer line</span>
                  {site.phones.emergency.label}
                </a>
                <a href={site.phones.office.href} className="hover:underline">
                  <span className="block font-medium text-white">Office enquiries</span>
                  {site.phones.office.label}
                </a>
              </div>
            </li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-white" /><a href={`mailto:${site.email}`} className="hover:text-white/70">{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-white" /><a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="hover:text-white/70">{site.address.lines.join(" ")}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy-900">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName.replace(/\.$/, "")}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy" className="hover:text-white/70">Privacy policy</Link>
            <Link href="/terms" className="hover:text-white/70">Terms and conditions</Link>
            <div className="flex gap-4">
              {socialNetworks.map((network) => (
                <a key={network} href={site.social[network]} target="_blank" rel="noreferrer" aria-label={network} className="text-white/80 transition-colors hover:text-white/70">
                  <SocialIcon name={network} className="size-[1.1rem]" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="container-x pb-6 text-center text-sm text-white/60">
          Designed and developed by{" "}
          <a
            href="https://techproitsolutions.in/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white underline underline-offset-4 hover:text-white/80 focus-visible:outline-white"
          >
            Techpro IT Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
