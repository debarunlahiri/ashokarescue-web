import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { LegalDocumentView } from "@/components/common";
import { privacyPolicy } from "@/data";

export const metadata: Metadata = buildMetadata({ meta: privacyPolicy.meta, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])} />
      <LegalDocumentView document={privacyPolicy} />
    </>
  );
}
