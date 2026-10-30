import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { FloatingActions, Footer, Header, SmoothScroll } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { seoDefaults, site, siteKeywords } from "@/data";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.meta.title, template: "%s" },
  description: site.meta.description,
  applicationName: site.name,
  keywords: siteKeywords,
  authors: [{ name: site.legalName, url: SITE_URL }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Medical transport",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: seoDefaults.verification.google || undefined,
    other: seoDefaults.verification.bing ? { "msvalidate.01": seoDefaults.verification.bing } : undefined,
  },
  icons: {
    icon: [
      { url: "/images/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: seoDefaults.siteName,
    locale: seoDefaults.locale,
    title: site.meta.title,
    description: site.meta.description,
    images: [{ url: seoDefaults.shareImage.src, width: seoDefaults.shareImage.width, height: seoDefaults.shareImage.height, alt: seoDefaults.shareImage.alt }],
  },
  twitter: { card: "summary_large_image", title: site.meta.title, description: site.meta.description, images: [seoDefaults.shareImage.src] },
};

export const viewport: Viewport = { themeColor: "#071330", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <JsonLd data={[organizationSchema, websiteSchema]} />
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
