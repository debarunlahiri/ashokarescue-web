import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Phone } from "lucide-react";
import { AssistanceSection, PageHero } from "@/components/common";
import { ContactChannels, NextSteps, OfficeLocation } from "@/components/contact";
import { WhatsAppIcon } from "@/components/icons";
import { contactPage, images, site } from "@/data";

export const metadata: Metadata = buildMetadata({ meta: contactPage.meta, path: "/contact" });

export default function ContactPage() {
  const { hero } = contactPage;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.text}
        caption={hero.caption}
        image={images.hero.expertPanel}
        actions={
          <>
            <a href={site.phones.emergency.href} className="btn btn-primary"><Phone className="size-4" /> Call emergency desk</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost"><WhatsAppIcon /> Message on WhatsApp</a>
            <p className="mt-2 w-full text-sm text-white/60">{hero.note.join(" ")}</p>
          </>
        }
      />
      <section className="container-x py-24 md:py-32">
        <ContactChannels />
        <OfficeLocation />
      </section>
      <AssistanceSection />
      <NextSteps />
    </>
  );
}
