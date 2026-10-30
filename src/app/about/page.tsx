import type { Metadata } from "next";
import { AboutReach, AboutStory, DirectorProfile, MissionVision, OurPrinciples } from "@/components/about";
import { CtaBanner, PageHero } from "@/components/common";
import { about, images } from "@/data";

export const metadata: Metadata = about.meta;

export default function AboutPage() {
  const { hero, cta } = about;

  return (
    <>
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
