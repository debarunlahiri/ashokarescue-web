import type { Metadata } from "next";
import { AssistanceSection } from "@/components/common";
import { site } from "@/data";
import { buildMetadata } from "@/lib/seo";
import {
  ClosingCta,
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
      <AssistanceSection />
      <ClosingCta />
    </>
  );
}
