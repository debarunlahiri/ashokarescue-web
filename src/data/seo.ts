/**
 * SEO settings in one place.
 * Page titles and descriptions live next to each page's content (src/data/*.ts, `meta`);
 * this file holds keywords, the share image and the paths used by the sitemap.
 * Open /seo-report while running `npm run dev` to check every page against these rules.
 */

export const seoRules = {
  title: { min: 30, max: 60 },
  description: { min: 70, max: 160 },
};

export const seoDefaults = {
  siteName: "Ashoka Rescue",
  locale: "en_IN",
  shareImage: { src: "/images/brand/og-image.jpg", width: 1200, height: 630, alt: "Ashoka Rescue air ambulance team loading a patient" },
  /** Paste verification codes from Google Search Console / Bing Webmaster here. */
  verification: { google: "", bing: "" },
};

/** Keywords used on every page. */
export const siteKeywords = [
  "air ambulance",
  "air ambulance in India",
  "air ambulance service Delhi",
  "medical transport India",
  "patient transfer",
  "critical care ambulance",
  "ICU air ambulance",
  "Ashoka Rescue",
];

/** Extra keywords for each static page, keyed by route. */
export const pageKeywords: Record<string, string[]> = {
  "/": ["charter air ambulance", "commercial stretcher", "road ambulance", "medical escort", "24/7 emergency air ambulance"],
  "/about": ["air ambulance company India", "flight physician", "Dr. Ashok Kumar", "medical evacuation since 2004"],
  "/services": ["air ambulance services", "road ambulance service", "train ambulance", "medical tourism India", "ECMO transfer"],
  "/contact": ["book air ambulance", "air ambulance cost", "air ambulance Gurugram", "emergency medical transport contact"],
  "/faqs": ["air ambulance cost", "how to book an air ambulance", "air ambulance questions", "commercial stretcher FAQ"],
  "/privacy": ["privacy policy"],
  "/terms": ["terms and conditions"],
};

/** Per-service keywords are built from the service name plus these modifiers. */
export const serviceKeywordModifiers = ["in India", "service", "cost", "booking", "24/7"];
