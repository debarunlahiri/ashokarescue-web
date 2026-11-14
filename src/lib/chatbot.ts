import { faqs, services, site } from "@/data";
import { getChatUrgency, getUrgentChatMessage } from "@/lib/chat-urgency";

export type ChatAction = { label: string; url?: string; action?: "transfer"; prompt?: string };
export type ChatReply = { message: string; actions: ChatAction[]; mode?: string; urgent?: boolean; source?: string };
export type HistoryItem = { role: "user" | "assistant"; text: string };

const SERVICE_TOPICS: { keyword: string; label: string; slug: string }[] = [
  { keyword: "charter", label: "Charter air ambulance", slug: "charter-air-ambulance-service-in-india" },
  { keyword: "air ambulance", label: "Air ambulance", slug: "air-ambulance-services-in-india" },
  { keyword: "commercial stretcher", label: "Commercial stretcher", slug: "commercial-stretcher-service" },
  { keyword: "business class", label: "Business-class assistance", slug: "business-class-medical-assistance" },
  { keyword: "medical escort", label: "Medical escort", slug: "medical-escort-and-transport" },
  { keyword: "road ambulance", label: "Road ambulance", slug: "road-ambulance-service-in-india" },
  { keyword: "train", label: "Train ambulance", slug: "train-ambulance-service-in-india" },
  { keyword: "neonate", label: "Neonatal transport", slug: "neonate-medical-transport-service" },
  { keyword: "paediatric", label: "Paediatric transport", slug: "paediatric-medical-transport-service" },
  { keyword: "medical tourism", label: "Medical tourism", slug: "medical-tourism-india" },
];

const serviceAction = (t: (typeof SERVICE_TOPICS)[number]): ChatAction => ({ label: t.label, url: `/services/${t.slug}` });

export const KNOWLEDGE = `Ashoka Rescue coordinates medical transport and patient-transfer assistance.

Approved services:
- Charter air ambulance: a dedicated aircraft arranged for a medically supported domestic or international transfer, subject to case review, aircraft availability, and clearances.
- Commercial airline stretcher: a specially arranged stretcher area on an eligible scheduled flight, subject to airline approval and case review.
- Business-class medical assistance: premium-cabin travel with planned mobility or escort support for eligible patients.
- Medical escort and transport: a suitable medical professional accompanies an eligible patient during travel.
- Road ambulance: local, intercity, airport, railway, and hospital connection transfers with the required support confirmed after review.
- Train ambulance: selected long-distance rail transfers with coordinated care support, subject to berth availability and case review.
- Neonatal and paediatric medical transport coordination
- Medical tourism and hospital-transfer assistance

The coordination team is available 24/7. Every case is reviewed by the Ashoka Rescue team before service suitability, medical arrangements, availability, schedule, or price is confirmed.

Published website facts:
- Ashoka Rescue says it transports ICU and coma patients after reviewing vital stability, haemoglobin, oxygen requirements, and the treating doctor's information.
- Air-ambulance arrangements can include ventilators, oxygen, advanced life support equipment, monitoring, and critical-care medical crew.
- Air ambulances can fly at night when both airports have the required night-landing, immigration, and ground-handling facilities.
- A charter air ambulance can typically carry two family attendants, subject to aircraft, route, equipment, and case requirements.
- Bed-to-bed service coordinates the connected journey from the current bed to the destination bed using the required ground and air or rail services.

For a transfer enquiry, collect only what is needed: pickup location, drop location, preferred date or urgency, the patient's mobility or current support needs, hospital details when relevant, and the caller's name and phone or email.

Never diagnose, interpret symptoms, determine fitness to travel, recommend treatment, guarantee availability, or quote a price. For an immediate or life-threatening situation, tell the visitor to contact local emergency services first.`;

export const SYSTEM_INSTRUCTION = `You are the Ashoka Rescue transfer concierge. Answer only from the approved knowledge supplied below. Be calm, concise, and practical. Use no more than 90 words unless a short list is genuinely clearer.

You are not a doctor. Do not diagnose, give treatment advice, assess fitness to travel, interpret symptoms, promise a price or availability, or invent service capabilities. If asked for any of those, explain that the coordination or medical team must confirm it. If the message suggests immediate danger, tell the visitor to contact local emergency services now. In India, the emergency number is 112.

When the visitor wants to arrange a transfer, ask for one or two missing details at a time. Only list services or compare transport options when the visitor asks to explore them. Do not ask for full medical records or identity documents. Offer the enquiry form for planned transfers. Direct urgent transfer requests to the 24/7 coordination line.`;

function serviceKnowledge(): string {
  return services
    .slice(0, 20)
    .map((s) => `- ${s.name}: ${s.excerpt}`.slice(0, 400))
    .join("\n");
}

function navigationActions(message: string): ChatAction[] {
  const m = message.toLowerCase();
  for (const topic of SERVICE_TOPICS) {
    if (m.includes(topic.keyword)) return [serviceAction(topic), { label: "Plan this transfer", action: "transfer" }];
  }
  if (/\b(how.*work|process|steps|arrange)\b/.test(m)) {
    return [{ label: "Start transfer request", action: "transfer" }, { label: "Read FAQs", url: "/faqs" }, { label: "Contact the team", url: "/contact" }];
  }
  if (/\b(services?|options?|what do you|explore)\b/.test(m)) {
    return [serviceAction(SERVICE_TOPICS[1]), serviceAction(SERVICE_TOPICS[2]), serviceAction(SERVICE_TOPICS[4]), { label: "View all services", url: "/services" }];
  }
  if (/\b(transfer|book|patient|quote|price|cost)\b/.test(m)) {
    return [{ label: "Start transfer request", action: "transfer" }];
  }
  return [{ label: "Start transfer request", action: "transfer" }];
}

function allServiceActions(): ChatAction[] {
  return [
    ...services.map((s): ChatAction => ({ label: s.name, url: `/services/${s.slug}` })),
    { label: "View services overview", url: "/services" },
    { label: "Help me choose", action: "transfer" },
  ];
}

/** Answers backed directly by facts already published on the site. */
function websiteAnswer(message: string): ChatReply | null {
  const m = message.toLowerCase();
  const transfer: ChatAction = { label: "Start transfer request", action: "transfer" };

  if (/\bcoma\b/.test(m)) {
    return {
      message: "Ashoka Rescue states that it transports ICU and coma patients, including patients with brain haemorrhage or hypoxic brain injury. The team first reviews vital stability, haemoglobin, oxygen requirements, and the treating doctor’s information before deciding whether air ambulance or a commercial stretcher with medical escort may be appropriate. Final fitness and transport decisions are confirmed by the medical team.",
      actions: [{ label: "Read the FAQs", url: "/faqs" }, { label: "Discuss this transfer", action: "transfer" }],
    };
  }
  if (/\b(ventilator|life support|icu equipment)\b/.test(m)) {
    return {
      message: "According to the Ashoka Rescue service pages, its air-ambulance and critical-patient transport arrangements can include ventilators, oxygen, monitoring, and advanced life-support equipment with a critical-care crew. The exact equipment and crew must be selected after the team reviews the patient’s current support requirements.",
      actions: [serviceAction(SERVICE_TOPICS[1]), transfer],
    };
  }
  if (/\b(fly at night|night flight|at night)\b/.test(m)) {
    return {
      message: "The website says air ambulances can operate at night when the departure and arrival airports have suitable night-landing, immigration, and ground-handling facilities. The coordination team must confirm the route and airport permissions for the requested journey.",
      actions: [{ label: "Read the FAQs", url: "/faqs" }, { label: "Plan this route", action: "transfer" }],
    };
  }
  if (/\b(attendant|family member|relative).*\b(fly|come|travel)|how many.*\b(attendant|family)/.test(m)) {
    return {
      message: "The website states that a charter air ambulance can typically accommodate two patient family members, alongside the medical crew and pilots. Capacity can vary with aircraft, route, medical equipment, and patient requirements, so the team must confirm it for the specific case.",
      actions: [serviceAction(SERVICE_TOPICS[0]), { label: "Ask about a journey", action: "transfer" }],
    };
  }
  if (/bed.?to.?bed/.test(m)) {
    return {
      message: "Bed-to-bed coordination means arranging the connected journey from the patient’s current bed to the destination bed. Depending on the case, that may combine ground ambulances with an air ambulance, commercial stretcher, or medical escort so the handovers are coordinated.",
      actions: [{ label: "Explore services", url: "/services" }, { label: "Plan a bed-to-bed transfer", action: "transfer" }],
    };
  }
  return null;
}

const STOP_WORDS = new Set("a an and are as at be can do does for from how i in is it me my of on or our the this to we what when where which who with you your".split(" "));
const tokenize = (text: string) => [...new Set((text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((w) => w.length > 2 && !STOP_WORDS.has(w)))];

type IndexEntry = { title: string; content: string; url: string; type: "faq" | "service" };
const searchIndex: IndexEntry[] = [
  ...faqs.map((f): IndexEntry => ({ title: f.question, content: f.answer, url: "/faqs", type: "faq" })),
  ...services.map((s): IndexEntry => ({ title: s.name, content: `${s.excerpt} ${s.hero.subtitle ?? ""}`.trim(), url: `/services/${s.slug}`, type: "service" })),
];

function excerpt(content: string, tokens: string[]): string {
  const ranked = (content.match(/[^.!?]+[.!?]*/g) ?? [])
    .map((s) => ({ s: s.trim(), score: tokens.filter((t) => s.toLowerCase().includes(t)).length }))
    .filter((r) => r.score > 0 && r.s.length >= 25)
    .sort((a, b) => b.score - a.score);
  const text = ranked.slice(0, 2).map((r) => r.s).join(" ");
  return (text || content).slice(0, 700);
}

function searchSite(message: string): ChatReply | null {
  const tokens = tokenize(message);
  if (!tokens.length) return null;

  let best: (IndexEntry & { score: number }) | null = null;
  for (const entry of searchIndex) {
    const title = entry.title.toLowerCase();
    const content = entry.content.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (title.includes(t)) score += 5;
      score += Math.min(content.split(t).length - 1, 3);
    }
    if (score > 0 && (!best || score > best.score)) best = { ...entry, score };
  }
  if (!best || best.score < 5) return null;

  return {
    message: best.type === "faq" ? best.content : `According to our ${best.title} page: ${excerpt(best.content, tokens)}`,
    actions: [{ label: best.type === "faq" ? "Read the FAQs" : "Read this page", url: best.url }, { label: "Discuss a transfer", action: "transfer" }],
    mode: "website",
    source: best.title,
  };
}

function guidedReply(message: string): string {
  const m = message.toLowerCase();
  if (/\b(price|cost|quote|charge|fare)\b/.test(m)) return "Pricing depends on the route, timing, transport type, and required support. Our team must review those details before providing a quote. I can help you prepare a callback request.";
  if (/\b(compare|difference|which option)\b/.test(m)) return "A dedicated air ambulance offers a private aircraft and medical setup. A commercial stretcher uses an approved stretcher area on a scheduled flight. Business-class assistance supports eligible seated travellers who need planned help. The coordination team confirms which option suits the case.";
  if (/\b(how.*work|process|steps)\b/.test(m)) return "Start by sharing the route, timing, mobility, and support needs. The assistant structures those details, then an Ashoka Rescue coordinator reviews the case, discusses appropriate options, and confirms the next steps.";
  if (/commercial.*stretcher|stretcher.*commercial/.test(m)) return "Commercial stretcher service is for eligible patients travelling on a scheduled airline using a specially arranged stretcher area, with appropriate escort support. Airline approval, route, timing, and patient needs must be reviewed first.";
  if (/business.?class/.test(m)) return "Business-class medical assistance supports eligible patients who can travel in a premium cabin but need planned mobility or medical escort support. The airline and Ashoka Rescue team must review the case.";
  if (/medical escort/.test(m)) return "A medical escort accompanies an eligible patient during travel and helps coordinate the journey. The required professional and support level depend on the case and are confirmed after review.";
  if (/train ambulance/.test(m)) return "Train ambulance coordination can support selected long-distance transfers by rail with an arranged care team and equipment. Route, berth availability, timing, and patient needs must be reviewed first.";
  if (/road ambulance/.test(m)) return "Road ambulance coordination covers local or intercity patient transfers, including connections to airports, railway stations, and hospitals. The team confirms the appropriate vehicle and support after review.";
  if (/air ambulance|charter/.test(m)) return "Charter air ambulance uses a dedicated aircraft arranged for a medically supported transfer. It can support domestic or international routes, subject to case review, aircraft availability, clearances, and approvals.";
  if (/\b(service|option|ambulance|stretcher|escort|train|road|flight|air)\b/.test(m)) return "We coordinate charter air ambulance, commercial stretcher, business-class assistance, medical escort, road ambulance, and train ambulance transfers. The team will confirm which options are suitable and available.";
  if (/\b(transfer|book|arrange|patient|travel)\b/.test(m)) return "I can help prepare the enquiry. Please share the starting city, destination, preferred date or urgency, and any mobility or in-transit support needs. The coordination team will review and confirm the next step.";
  return "I can explain Ashoka Rescue transport options or help prepare a transfer enquiry. For case-specific medical, price, or availability decisions, our coordination team will review the details with you.";
}

async function askGemini(message: string, history: HistoryItem[]): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

  const contents = [
    ...history.slice(-6).map((h) => ({ role: h.role === "assistant" ? "model" : "user", parts: [{ text: h.text.slice(0, 1000) }] })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nAPPROVED KNOWLEDGE:\n${KNOWLEDGE}\n\nCURRENT SERVICE CONTENT FROM THE WEBSITE:\n${serviceKnowledge()}` }] },
        contents,
        generationConfig: { temperature: 0.2, maxOutputTokens: 220 },
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = String(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "").trim();
    return text || null;
  } catch {
    return null;
  }
}

const SERVICE_LIST = /\b(all|your|show|list|available|offer|provide|explore)\b.*\b(service|services|options)\b|\b(service|services|options)\b.*\b(all|your|show|list|available|offer|provide|explore)\b/i;

export async function answer(message: string, history: HistoryItem[]): Promise<ChatReply> {
  const urgency = getChatUrgency(message);
  if (urgency) {
    return {
      message: getUrgentChatMessage(urgency),
      urgent: true,
      actions: urgency === "emergency"
        ? [{ label: "Call 112 in India", url: "tel:112" }]
        : [{ label: `Call ${site.phones.emergency.label}`, url: site.phones.emergency.href }],
    };
  }

  if (SERVICE_LIST.test(message)) {
    return {
      message: "Here are the medical transport services currently listed on the Ashoka Rescue website. Select any service to open its details, or choose “Help me choose” to start a guided transfer request.",
      actions: allServiceActions(),
      mode: "website",
    };
  }

  if (/\b(?:i need|i want|help me)\b.*\b(?:transfer|transport)\b|\b(?:arrange|book|request|plan) (?:a |an |my |the )?(?:patient )?transfer\b/i.test(message)) {
    return {
      message: "I can help you prepare a transfer request. Start with the pickup location, drop location and preferred date.",
      actions: [{ label: "Plan a transfer", action: "transfer" }],
      mode: "guided",
    };
  }

  const known = websiteAnswer(message) ?? searchSite(message);
  if (known) return { mode: "website", ...known };

  const actions = navigationActions(message);
  const ai = await askGemini(message, history);
  if (ai) return { message: ai, mode: "ai", actions };

  return { message: guidedReply(message), mode: "guided", actions };
}
