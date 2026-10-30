import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { LegalDocumentView } from "@/components/common";
import { termsAndConditions } from "@/data";

export const metadata: Metadata = buildMetadata({ meta: termsAndConditions.meta, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Terms and Conditions", path: "/terms" }])} />
      <LegalDocumentView document={termsAndConditions} />
    </>
  );
}
