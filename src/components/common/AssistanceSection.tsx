import { Clock, Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { AssistanceForm } from "@/components/forms";
import { WhatsAppIcon } from "@/components/icons";
import { assistance, site } from "@/data";
import ContactLink from "./ContactLink";
import SectionHeading from "./SectionHeading";

/** "Request assistance" block: contact options and map on the left, the enquiry form on the right. Anchor: #assistance */
export default function AssistanceSection() {
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
          <Reveal delay={0.15} className="mt-4 overflow-hidden rounded bg-white shadow-sm ring-1 ring-line">
            <iframe
              title="Ashoka Rescue office location"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
              className="block h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <AssistanceForm />
        </Reveal>
      </div>
    </section>
  );
}
