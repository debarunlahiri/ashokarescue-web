import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { Accordion } from "@/components/ui";
import { faqPage, faqs } from "@/data";

export default function HomeFaq() {
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Frequently asked questions" title={faqPage.homeTitle} />
          <Reveal delay={0.15}>
            <Link href="/faqs" className="btn btn-dark mt-8">View all questions <ArrowRight className="size-4" /></Link>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs.slice(0, 4)} />
        </div>
      </div>
    </section>
  );
}
