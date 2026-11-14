import type { Metadata } from "next";
import { AssistanceSection, CtaBanner } from "@/components/common";
import { images, site } from "@/data";
import { buildMetadata } from "@/lib/seo";
import {
  GlobalReach,
  HeroCarousel,
  HomeFaq,
  HowItWorks,
  InfoCards,
  Journey,
  ServicesShowcase,
  WhyChooseUs,
} from "@/components/home";

export const metadata: Metadata = buildMetadata({ meta: site.meta, path: "/" });

export default function HomePage() {
  const { transferCta } = site;

  return (
    <>
      <HeroCarousel />
      <InfoCards />
      <WhyChooseUs />
      <ServicesShowcase />
      <Journey />
      <HowItWorks />
      <GlobalReach />
      <HomeFaq />
      <AssistanceSection showOfficeMap={false} />
      <CtaBanner
        eyebrow={transferCta.eyebrow}
        title={transferCta.title}
        description={transferCta.text}
        image={images.hero.expertPanel}
      />
    </>
  );
}
