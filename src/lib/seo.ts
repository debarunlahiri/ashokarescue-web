import type { Metadata } from "next";
import { pageKeywords, seoDefaults, serviceKeywordModifiers, siteKeywords } from "@/data/seo";
import type { PageMeta } from "@/types";
import { SITE_URL } from "./constants";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

type BuildMetadataOptions = {
  meta: PageMeta;
  path: string;
  keywords?: string[];
  image?: { src: string; alt?: string };
  noIndex?: boolean;
  type?: "website" | "article";
};

/** Builds title, description, canonical, Open Graph and Twitter tags for a page. */
export function buildMetadata({ meta, path, keywords = pageKeywords[path] ?? [], image, noIndex, type = "website" }: BuildMetadataOptions): Metadata {
  const share = image ?? seoDefaults.shareImage;
  const images = [{ url: share.src, alt: ("alt" in share && share.alt) || meta.title }];

  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: [...new Set([...keywords, ...siteKeywords])],
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url: path,
      title: meta.title,
      description: meta.description,
      siteName: seoDefaults.siteName,
      locale: seoDefaults.locale,
      images,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: images.map((i) => i.url) },
  };
}

export function serviceKeywords(name: string) {
  return [name, ...serviceKeywordModifiers.map((modifier) => `${name} ${modifier}`)];
}
