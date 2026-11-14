import { NextResponse } from "next/server";
import { serviceOptions } from "@/data";
import { enquiryLimits, validateEnquiryField, type EnquiryField } from "@/lib/enquiry-validation";

const MAX_BODY_BYTES = 16 * 1024;
const fields = Object.keys(enquiryLimits) as EnquiryField[];
const required = new Set<EnquiryField>(["from", "to", "name", "phone"]);

export async function POST(req: Request) {
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ error: "Send the enquiry as JSON." }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    const reader = req.body?.getReader();
    if (!reader) throw new Error("Missing request body");

    const decoder = new TextDecoder("utf-8", { fatal: true });
    let json = "";
    let bytes = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return NextResponse.json({ error: "The enquiry is too large." }, { status: 413 });
      }
      json += decoder.decode(value, { stream: true });
    }
    const parsed: unknown = JSON.parse(json + decoder.decode());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid enquiry");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid enquiry request." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });
  if (body.consent !== "yes" && body.consent !== "on") {
    return NextResponse.json({ error: "Please confirm that we may contact you about this enquiry." }, { status: 422 });
  }
  if (
    body.service !== undefined && body.service !== "" &&
    (typeof body.service !== "string" || !serviceOptions.includes(body.service))
  ) {
    return NextResponse.json({ error: "Choose a transport service from the list." }, { status: 422 });
  }

  const enquiry: Partial<Record<EnquiryField, string>> = {};
  for (const field of fields) {
    if (body[field] === undefined && !required.has(field)) continue;
    const result = validateEnquiryField(field, body[field] === undefined ? "" : body[field]);
    if (result.value === undefined) return NextResponse.json({ error: result.error, field }, { status: 422 });
    enquiry[field] = result.value;
  }

  // Enquiries currently go to server logs pending a delivery integration.
  console.log("[enquiry]", JSON.stringify({
    ...enquiry,
    service: body.service || "Not specified",
    receivedAt: new Date().toISOString(),
  }));

  return NextResponse.json({ ok: true });
}
