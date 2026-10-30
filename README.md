# Ashoka Rescue — Website

Marketing website for **Ashoka Rescue Air Ambulance Services** (Gurugram, India): air ambulance, commercial stretcher, road ambulance, medical escort and medical tourism services.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · Roboto

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
src/
├── app/                     Routes only — thin pages that compose sections
│   ├── layout.tsx           Root layout, metadata, JSON-LD, header/footer
│   ├── page.tsx             Home
│   ├── about/  contact/  faqs/  privacy/  terms/
│   ├── services/            Listing + [slug] detail pages (statically generated)
│   └── api/enquiry/         Assistance form endpoint
├── components/
│   ├── animations/          Reveal, SplitText, Counter, ParallaxImage, ClipReveal
│   ├── layout/              Header, Footer, MegaMenu, MobileMenu, SmoothScroll, FloatingActions
│   ├── common/              Shared sections: PageHero, CtaBanner, WorldRouteMap, StatsBand, …
│   ├── home/                Home page sections
│   ├── about/               About page sections
│   ├── services/            Service listing and detail sections
│   ├── contact/             Contact page sections
│   ├── forms/               AssistanceForm, FormField
│   ├── icons/               Social, WhatsApp, ECG, service icon map
│   └── ui/                  Logo, Accordion
├── data/                    All site content (edit copy here, not in components)
│   ├── site.ts              Contact details, address, social links, navigation
│   ├── home.ts  about.ts  contact.ts  faqs.ts  legal.ts
│   ├── services.ts          The 17 services and their page content
│   └── images.ts            Every image path + alt text, gallery lists
├── lib/                     utils.ts, constants.ts
├── styles/globals.css       Tailwind v4 theme tokens and shared classes
└── types/                   Shared TypeScript types

public/images/
├── hero/  brand/  team/  company/  maps/
└── air-ambulance/  road-ambulance/  commercial-stretcher/  business-class/  medical-tourism/  services/  icons/
```

Each component folder has an `index.ts` barrel, so imports look like `import { Header } from "@/components/layout"`.

## Common edits

| To change… | Edit |
| --- | --- |
| Phone, email, address, social links, nav | `src/data/site.ts` |
| Home page copy, hero slides, stats, route map cities | `src/data/home.ts` |
| A service's text, gallery or image | `src/data/services.ts`, `src/data/images.ts` |
| FAQs | `src/data/faqs.ts` |
| Privacy policy / Terms | `src/data/legal.ts` |
| Colours and fonts | `@theme` block in `src/styles/globals.css` |
| Logo | `public/images/brand/logo-ashoka-rescue.svg` (path set in `src/data/images.ts`) |
| Hero banners | `public/images/hero/` + `heroSlides` in `src/data/home.ts` |

Adding a service: add an entry to `services` in `src/data/services.ts`. The detail page and the Services menu entry are generated from it.

## SEO

| What | Where |
| --- | --- |
| Page title and description | `meta` in each file under `src/data/` (`home.ts`/`site.ts`, `about.ts`, `services.ts`, `contact.ts`, `faqs.ts`, `legal.ts`) |
| Keywords, share image, Search Console codes, length rules | `src/data/seo.ts` |
| Canonical, Open Graph and Twitter tags | `buildMetadata()` in `src/lib/seo.ts` |
| Structured data (business, website, services, FAQs, breadcrumbs) | `src/lib/schema.ts` |
| Sitemap, robots, web manifest | `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` |

**Check your pages:** run `npm run dev` and open <http://localhost:3000/seo-report>. It lists every page's title, description and keywords, flags lengths that are too short or long, and flags duplicates. The report is hidden in production.

After deploying: set `SITE_URL` in `src/lib/constants.ts`, paste the verification codes into `seoDefaults.verification`, then submit `/sitemap.xml` in Google Search Console.

## Before going live

- **Enquiry form:** `src/app/api/enquiry/route.ts` currently only logs submissions. Connect it to email (e.g. Resend, SMTP) or a CRM.
- **Site URL:** set the real domain in `src/lib/constants.ts` (`SITE_URL`).
- **Env vars:** none required yet; add secrets for the email provider to `.env.local` (git-ignored).
- **Images:** photos are served through `next/image`; replace any with better originals in `public/images/` as needed.

## Notes

- Content was migrated from the previous PHP site; `src/data` is the single source of truth.
- The `_to_delete/` folder (git-ignored) holds files from the earlier flat structure and can be removed.
