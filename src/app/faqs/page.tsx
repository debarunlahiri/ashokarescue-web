import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/animations";
import { CtaBanner, PageHero, SectionHeading } from "@/components/common";
import { Accordion } from "@/components/ui";
import { faqPage, faqs, images, site } from "@/data";

export const metadata: Metadata = buildMetadata({ meta: faqPage.meta, path: "/faqs" });

export default function FaqsPage() {
  const { hero, intro, cta } = faqPage;

  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }])]} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.text} caption={hero.caption} image={images.airAmbulance.icuCabin} />

      <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow={intro.eyebrow} title={intro.title} description={intro.text} />
            <Reveal delay={0.15} className="mt-8 border-t-4 border-brand bg-navy p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">Emergency desk</p>
              <a href={site.phones.emergency.href} className="mt-2 flex items-center gap-3 font-display text-2xl font-semibold text-white hover:text-brand">
                <Phone className="size-5 text-brand" />
                {site.phones.emergency.label}
              </a>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs} />
        </div>
      </div>
      </section>

      <CtaBanner eyebrow={cta.eyebrow} title={cta.title} image={images.hero.inflightMonitoring} />
    </>
  );
}
