import type { Metadata } from "next";
import { CtaBanner, PageHero, SectionHeading } from "@/components/common";
import { ServiceGuide, ServicesGrid } from "@/components/services";
import { images, servicesPage } from "@/data";

export const metadata: Metadata = servicesPage.meta;

export default function ServicesPage() {
  const { hero, explore, cta } = servicesPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.text} caption={hero.caption} image={images.hero.tarmacTransfer} />
      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow={explore.eyebrow} title={explore.title} description={explore.text} />
        <ServicesGrid />
      </section>
      <ServiceGuide />
      <CtaBanner eyebrow={cta.eyebrow} title={cta.title} description={cta.text} image={images.hero.cabinCare} />
    </>
  );
}
