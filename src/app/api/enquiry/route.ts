import { NextResponse } from "next/server";

/**
 * Receives assistance requests from the site form.
 * TODO: forward to email / CRM (e.g. Resend, Nodemailer, or the existing PHP mailer).
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot — silently accept bots
  if (body.website) return NextResponse.json({ ok: true });

  const required = ["from", "to", "name", "phone", "consent"] as const;
  const missing = required.filter((k) => !String(body[k] ?? "").trim());
  if (missing.length) return NextResponse.json({ error: "Please fill in all required fields." }, { status: 422 });

  const enquiry = {
    from: body.from, to: body.to, service: body.service || "Not specified",
    name: body.name, phone: body.phone, email: body.email || "", notes: body.notes || "",
    receivedAt: new Date().toISOString(),
  };
  console.log("[enquiry]", enquiry);

  return NextResponse.json({ ok: true });
}
