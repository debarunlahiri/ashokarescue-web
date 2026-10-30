import { Clock, Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { AssistanceForm } from "@/components/forms";
import { WhatsAppIcon } from "@/components/icons";
import { assistance, site } from "@/data";
import ContactLink from "./ContactLink";
import SectionHeading from "./SectionHeading";

/** "Request assistance" block with the enquiry form. Anchor: #assistance */
export default function AssistanceSection() {
  return (
    <section id="assistance" className="relative scroll-mt-24 overflow-hidden bg-mist py-24 md:py-32">
      <div aria-hidden className="absolute -right-40 top-0 size-[600px] rounded-full bg-sky/40 blur-[160px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={assistance.eyebrow} title={assistance.title} description={assistance.text} />
          <Reveal delay={0.2} className="mt-10 grid gap-3">
            <ContactLink href={site.phones.emergency.href} icon={<Phone className="size-5" />} label="For urgent assistance" value={site.phones.emergency.label} variant="dark" />
            <ContactLink href={site.whatsapp} icon={<WhatsAppIcon />} label="Message us on WhatsApp" value="Open WhatsApp" external />
            <div className="flex items-center gap-4 rounded-2xl px-5 py-4 text-navy">
              <Clock className="size-5 text-royal" />
              <p className="text-sm">
                <strong className="block text-ink">Medical coordination</strong>
                Available 24 hours, every day.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <AssistanceForm />
        </Reveal>
      </div>
    </section>
  );
}
