import { ArrowUpRight, BookOpen, Clock, Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { AssistanceForm } from "@/components/forms";
import { WhatsAppIcon } from "@/components/icons";
import { assistance, site } from "@/data";
import ContactLink from "./ContactLink";
import SectionHeading from "./SectionHeading";

const articles = [
  {
    title: "How a medical flight is arranged",
    description: "Dr. Ashok Kumar explains airline clearance, stretcher flights and medical escorts.",
    slug: "a-message-from-dr-ashok-director-at-ashoka-rescue",
  },
  {
    title: "How commercial stretcher flights work",
    description: "What the airline and medical team arrange before a patient travels on a stretcher.",
    slug: "commercial-stretcher-service-comfortable-and-cost-efficient-transportation-by-ashoka-rescue",
  },
  {
    title: "A patient transfer from Perth to New Delhi",
    description: "How the team coordinated an international patient repatriation.",
    slug: "patient-transportation-from-perth-australia-to-new-delhi",
  },
];
export default function AssistanceSection({ showOfficeMap = true }: { showOfficeMap?: boolean }) {
  const { lat, lng } = site.address.geo;

  return (
    <section id="assistance" className="section scroll-mt-24 bg-mist">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={assistance.eyebrow} title={assistance.title} description={assistance.text} />
          <Reveal delay={0.1} className="mt-8 grid gap-3">
            <ContactLink href={site.phones.emergency.href} icon={<Phone className="size-5" />} label="For urgent assistance" value={site.phones.emergency.label} variant="dark" />
            <ContactLink href={site.whatsapp} icon={<WhatsAppIcon />} label="Message us on WhatsApp" value="Open WhatsApp" external />
            <div className="flex items-center gap-4 px-1 py-2 text-navy">
              <Clock className="size-5 text-brand-600" />
              <p className="text-sm">
                <strong className="block font-display text-navy">Medical coordination</strong>
                Available 24 hours, every day.
              </p>
            </div>
          </Reveal>
          {showOfficeMap ? (
            <Reveal delay={0.15} className="mt-4 overflow-hidden rounded bg-white shadow-sm ring-1 ring-line">
              <iframe
                title="Ashoka Rescue office location"
                src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                className="block h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          ) : (
            <section className="mt-8 border-t border-line pt-5">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <BookOpen aria-hidden className="size-5 shrink-0" />
                  From the Ashoka Rescue blog
                </h3>
                <a href={site.blog} className="text-sm font-medium text-brand underline-offset-4 hover:underline">
                  View all posts
                </a>
              </div>
              <ul className="mt-3 divide-y divide-line">
                {articles.map(({ title, description, slug }) => (
                  <li key={slug}>
                    <a
                      href={`${site.blog}/${slug}/`}
                      className="group flex items-start justify-between gap-4 rounded px-2 py-3 transition-colors hover:bg-white"
                    >
                      <span>
                        <span className="block font-display font-semibold leading-snug text-navy group-hover:underline">
                          {title}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-slate">{description}</span>
                      </span>
                      <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <AssistanceForm />
        </Reveal>
      </div>
    </section>
  );
}
