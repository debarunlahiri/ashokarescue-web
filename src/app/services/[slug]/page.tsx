import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssistanceSection } from "@/components/common";
import { JsonLd } from "@/components/seo";
import { ServiceContent, ServiceGallery, ServiceHero, ServiceSidebar } from "@/components/services";
import { galleries, getRelatedServices, getServiceBySlug, services } from "@/data";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata, serviceKeywords } from "@/lib/seo";
import type { GalleryKey } from "@/types";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const galleryTitles: Record<GalleryKey, string> = {
  airAmbulance: "Air ambulance missions",
  roadAmbulance: "Road ambulance transfers",
  commercialStretcher: "Commercial stretcher journeys",
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  return buildMetadata({
    meta: service.meta,
    path: `/services/${service.slug}`,
    keywords: serviceKeywords(service.name),
    image: service.image,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <ServiceHero service={service} />
      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <ServiceContent content={service.content} />
        </article>
        <aside className="lg:col-span-4">
          <ServiceSidebar relatedServices={getRelatedServices(service.slug)} />
        </aside>
      </section>
      {service.gallery && <ServiceGallery title={galleryTitles[service.gallery]} photos={galleries[service.gallery]} />}
      <AssistanceSection />
    </>
  );
}
