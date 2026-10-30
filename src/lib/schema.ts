import { site } from "@/data/site";
import type { Faq, Service } from "@/types";
import { absoluteUrl } from "./seo";

const ORGANIZATION_ID = `${absoluteUrl("/")}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "@id": ORGANIZATION_ID,
  name: site.legalName,
  alternateName: site.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/images/brand/logo-ashoka-rescue.svg"),
  image: absoluteUrl("/images/brand/og-image.jpg"),
  description: site.meta.description,
  foundingDate: String(site.established),
  telephone: site.phones.emergency.href.replace("tel:", ""),
  email: site.email,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "UG 124, Ansal Palam Corporate Plaza, Palam Vihar",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122017",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "emergency", telephone: site.phones.emergency.href.replace("tel:", ""), availableLanguage: ["English", "Hindi"], areaServed: "Worldwide" },
    { "@type": "ContactPoint", contactType: "customer service", telephone: site.phones.office.href.replace("tel:", ""), email: site.email },
  ],
  areaServed: ["India", "North America", "Europe", "Asia", "Middle East", "Africa", "Australia"],
  sameAs: Object.values(site.social),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${absoluteUrl("/")}/#website`,
  url: absoluteUrl("/"),
  name: site.name,
  inLanguage: "en-IN",
  publisher: { "@id": ORGANIZATION_ID },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.meta.description,
    url: absoluteUrl(`/services/${service.slug}`),
    image: absoluteUrl(service.image.src),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: ["India", "Worldwide"],
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
