import { NextResponse } from "next/server";
import { answer, type HistoryItem } from "@/lib/chatbot";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => t > now - WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => t > now - WINDOW_MS)) hits.delete(k);
  return false;
}

const clean = (v: unknown, max: number) => String(v ?? "").replace(/<[^>]*>/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ status: false, message: "Please wait a moment before sending another message." }, { status: 429 });
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: false, message: "Invalid request." }, { status: 400 });
  }

  const message = clean(body.message, 1001);
  if (!message || message.length > 1000) {
    return NextResponse.json({ status: false, message: "Enter a question of up to 1,000 characters." }, { status: 422 });
  }

  const history: HistoryItem[] = (Array.isArray(body.history) ? body.history : [])
    .slice(-6)
    .map((h: { role?: unknown; text?: unknown }) => ({ role: h?.role === "assistant" ? ("assistant" as const) : ("user" as const), text: clean(h?.text, 1000) }))
    .filter((h) => h.text);

  try {
    const reply = await answer(message, history);
    return NextResponse.json({ status: true, ...reply });
  } catch {
    return NextResponse.json({ status: false, message: "The assistant is temporarily unavailable. Please call our coordination team." }, { status: 503 });
  }
}
