import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/common";
import { termsAndConditions } from "@/data";

export const metadata: Metadata = termsAndConditions.meta;

export default function TermsPage() {
  return <LegalDocumentView document={termsAndConditions} />;
}
