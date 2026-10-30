import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { AboutReach, AboutStory, DirectorProfile, MissionVision, OurPrinciples } from "@/components/about";
import { CtaBanner, PageHero } from "@/components/common";
import { about, images } from "@/data";

export const metadata: Metadata = buildMetadata({ meta: about.meta, path: "/about" });

export default function AboutPage() {
  const { hero, cta } = about;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.text} caption={hero.caption} image={images.hero.cabinCare} />
      <AboutStory />
      <DirectorProfile />
      <OurPrinciples />
      <MissionVision />
      <AboutReach />
      <CtaBanner eyebrow={cta.eyebrow} title={cta.title} description={cta.text} image={images.hero.expertPanel} />
    </>
  );
}
