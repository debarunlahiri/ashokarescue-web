import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { FloatingActions, Footer, Header, SmoothScroll } from "@/components/layout";
import { site } from "@/data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.meta.title, template: "%s" },
  description: site.meta.description,
  icons: {
    icon: [
      { url: "/images/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    images: ["/images/hero/beyond-borders.webp"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#071330" };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/logo-ashoka-rescue.svg`,
  telephone: site.phones.emergency.label,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "UG 124, Ansal Palam Corporate Plaza, Palam Vihar",
    addressLocality: "Gurugram",
    postalCode: "122017",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  openingHours: "Mo-Su 00:00-23:59",
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <SmoothScroll />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sun focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
