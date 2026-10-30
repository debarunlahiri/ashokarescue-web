import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/common";
import { privacyPolicy } from "@/data";

export const metadata: Metadata = privacyPolicy.meta;

export default function PrivacyPage() {
  return <LegalDocumentView document={privacyPolicy} />;
}
