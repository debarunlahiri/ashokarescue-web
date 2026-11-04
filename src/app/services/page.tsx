import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { CtaBanner, PageHero, SectionHeading } from "@/components/common";
import { ServiceGuide, ServicesGrid } from "@/components/services";
import { images, servicesPage } from "@/data";

export const metadata: Metadata = buildMetadata({ meta: servicesPage.meta, path: "/services" });

export default function ServicesPage() {
  const { hero, explore, cta } = servicesPage;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.text} caption={hero.caption} image={images.hero.tarmacTransfer} />
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow={explore.eyebrow} title={explore.title} description={explore.text} />
          <ServicesGrid />
        </div>
      </section>
      <ServiceGuide />
      <CtaBanner eyebrow={cta.eyebrow} title={cta.title} description={cta.text} image={images.hero.cabinCare} />
    </>
  );
}
