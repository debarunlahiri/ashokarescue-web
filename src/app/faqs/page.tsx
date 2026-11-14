import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Phone } from "lucide-react";
import { CtaBanner, PageHero } from "@/components/common";
import { Accordion } from "@/components/ui";
import { faqPage, faqs, images, site } from "@/data";

export const metadata: Metadata = buildMetadata({ meta: faqPage.meta, path: "/faqs" });

export default function FaqsPage() {
  const { hero, intro, cta } = faqPage;

  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }])]} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.text} caption={hero.caption} image={images.airAmbulance.icuCabin} />

      <section className="section" aria-labelledby="transfer-faqs-heading">
        <div className="container-x grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <div className="rounded-2xl border border-line bg-mist p-5 sm:p-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
            <h2 id="transfer-faqs-heading" className="font-display text-2xl font-bold leading-tight">
              {intro.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">{intro.text}</p>

            <a
              href={site.phones.emergency.href}
              className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-navy underline-offset-4 transition-colors hover:border-brand hover:underline"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand">
                <Phone aria-hidden className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium text-slate">24/7 transfer line</span>
                <span className="block font-display text-base font-semibold">{site.phones.emergency.label}</span>
              </span>
            </a>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <CtaBanner eyebrow={cta.eyebrow} title={cta.title} image={images.hero.inflightMonitoring} />
    </>
  );
}
