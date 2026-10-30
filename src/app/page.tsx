import { AssistanceSection, ServiceMarquee } from "@/components/common";
import {
  ClosingCta,
  FieldGallery,
  GlobalReach,
  HeroCarousel,
  HomeFaq,
  HowItWorks,
  PatientFirst,
  ServicesShowcase,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ServiceMarquee />
      <ServicesShowcase />
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
