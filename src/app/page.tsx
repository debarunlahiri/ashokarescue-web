import type { Metadata } from "next";
import { AssistanceSection, ServiceMarquee } from "@/components/common";
import { site } from "@/data";
import { buildMetadata } from "@/lib/seo";
import {
  ClosingCta,
  FieldGallery,
  GlobalReach,
  HeroCarousel,
  HomeFaq,
  HowItWorks,
  JourneyAnimation,
  PatientFirst,
  ServicesShowcase,
} from "@/components/home";

export const metadata: Metadata = buildMetadata({ meta: site.meta, path: "/" });

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ServiceMarquee />
      <ServicesShowcase />
      <JourneyAnimation />
      <PatientFirst />
      <HowItWorks />
      <GlobalReach />
      <FieldGallery />
      <HomeFaq />
      <AssistanceSection />
      <ClosingCta />
    </>
  );
}
