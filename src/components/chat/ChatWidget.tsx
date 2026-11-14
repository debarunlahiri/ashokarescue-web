"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Phone, RotateCcw, Send, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { site } from "@/data";
import { emergencyGuidance, getChatUrgency, getUrgentChatMessage } from "@/lib/chat-urgency";
import { enquiryLimits, getTransferToday, validateEnquiryField, type EnquiryField } from "@/lib/enquiry-validation";
import { cn } from "@/lib/utils";

type Action = { label: string; url?: string; action?: "transfer"; prompt?: string; value?: string; flow?: "submit" | "cancel" | "restart" };
type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  actions?: Action[];
  pending?: boolean;
  review?: { label: string; value: string }[];
};
type FlowKey = Exclude<EnquiryField, "email" | "notes"> | "consent";

const GREETING = "How soon does the patient need to be transferred? For urgent transport, call our team directly.";
const STARTERS: Action[] = [
  { label: "Urgent transfer", prompt: "I need an urgent transfer" },
  { label: "Plan a transfer", action: "transfer" },
];
const BROWSE_PROMPT = "Show me your medical transport services";
const STEPS: { key: FlowKey; label: string; question: string; options?: string[] }[] = [
  { key: "from", label: "Pickup location", question: "What is the pickup location?" },
  { key: "to", label: "Drop location", question: "What is the drop location?" },
  {
    key: "travel_date",
    label: "Transfer date",
    question: "When is the transfer needed? Pick a date below or select Not sure.",
    options: ["Not sure"],
  },
  { key: "patient_needs", label: "Support needs", question: "Briefly describe the patient’s mobility or support needs. Please do not share medical records." },
  { key: "name", label: "Contact name", question: "What is your name?" },
  { key: "phone", label: "Phone number", question: "What phone number should our coordination team call? Include the country code for numbers outside India." },
  { key: "consent", label: "Contact permission", question: "May Ashoka Rescue contact you about this transfer request?", options: ["Yes", "No"] },
];

const reviewDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatReviewDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return reviewDateFormatter.format(new Date(value));
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const actionClass = "inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-white px-3.5 py-1.5 text-left text-[0.8rem] font-medium text-brand transition hover:bg-brand hover:text-white";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: "greeting", role: "assistant", text: GREETING, actions: STARTERS }]);
  const [input, setInput] = useState("");
  const [flow, setFlow] = useState<{ step: number; data: Partial<Record<FlowKey, string>>; review?: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [enquirySending, setEnquirySending] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");
  const submitting = useRef(false);
  const pendingReply = useRef<AbortController | null>(null);
  const history = useRef<{ role: "user" | "assistant"; text: string }[]>([]);
  const log = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const root = useRef<HTMLDivElement>(null);

  const push = useCallback((m: Omit<Msg, "id">) => {
    const id = crypto.getRandomValues(new Uint32Array(4)).join("-");
    setMessages((prev) => [...prev, { ...m, id }]);
    return id;
  }, []);
  const patch = (id: Msg["id"], p: Partial<Omit<Msg, "id">>) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...p } : m)));

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, enquiry]);

  useEffect(() => {
    if (!open || !flow || flow.review || enquiry) return;
    const timer = window.setTimeout(() => field.current?.focus({ preventScroll: true }), 60);
    return () => window.clearTimeout(timer);
  }, [open, flow, enquiry]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // Clicking anywhere outside the panel and launcher minimises the chat.
    const onPointerDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const ask = (step: number) => {
    const s = STEPS[step];
    push({ role: "assistant", text: s.question, actions: s.options?.map((o) => ({ label: o, value: o })) });
  };

  const startTransfer = () => {
    setInput("");
    setEnquiry(false);
    setOpen(true);
    setFlow({ step: 0, data: {} });
    push({ role: "assistant", text: "Let’s prepare the transfer request together. I’ll ask one short question at a time." });
    ask(0);
  };

  const cancelReply = () => {
    pendingReply.current?.abort();
    pendingReply.current = null;
    setBusy(false);
  };

  const reset = () => {
    if (submitting.current) return;
    cancelReply();
    setFlow(null);
    setEnquiry(false);
    setInput("");
    history.current = [];
    setMessages([{ id: "greeting", role: "assistant", text: GREETING, actions: STARTERS }]);
  };

  const cancelFlow = () => {
    setFlow(null);
    push({ role: "assistant", text: "The transfer request was cancelled.", actions: STARTERS });
  };

  const answerStep = (raw: string) => {
    if (!flow || flow.review || submitting.current) return;
    const text = raw.trim();
    if (!text) return;
    const step = STEPS[flow.step];
    let value = text;
    if (step.key === "consent") {
      value = text.toLowerCase();
      if (value === "no") return cancelFlow();
      if (value !== "yes") {
        push({
          role: "assistant",
          text: "Choose Yes or No to confirm whether we may contact you.",
          actions: step.options?.map((option) => ({ label: option, value: option })),
        });
        return;
      }
    } else {
      const result = validateEnquiryField(step.key, raw);
      if (result.value === undefined) {
        push({ role: "assistant", text: result.error });
        return;
      }
      value = result.value;
    }

    setInput("");
    push({ role: "user", text: value });
    const data = { ...flow.data, [step.key]: value };
    const nextStep = flow.step + 1;
    if (nextStep >= STEPS.length) {
      setFlow({ step: nextStep, data, review: true });
      push({
        role: "assistant",
        text: "Review your transfer request",
        review: [
          { label: "Pickup location", value: data.from ?? "" },
          { label: "Drop location", value: data.to ?? "" },
          { label: "Transfer date", value: formatReviewDate(data.travel_date || "Not sure") },
          { label: "Support needs", value: data.patient_needs || "Not specified" },
          { label: "Contact name", value: data.name ?? "" },
          { label: "Phone number", value: data.phone ?? "" },
        ],
        actions: [{ label: "Submit request", flow: "submit" }, { label: "Reset", flow: "restart" }, { label: "Cancel", flow: "cancel" }],
      });
      return;
    }
    setFlow({ step: nextStep, data });
    ask(nextStep);
  };

  const sendLead = async (values: Partial<Record<EnquiryField | "consent", string>>) => {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Unable to send enquiry.");
  };

  const submitFlow = async () => {
    if (!flow?.review || submitting.current) return;
    submitting.current = true;
    const id = push({ role: "assistant", text: "Sending your transfer brief securely…", pending: true });
    try {
      await sendLead(flow.data);
      setFlow((current) => current === flow ? null : current);
      patch(id, { pending: false, text: "Your enquiry was recorded. Please call our coordination team to confirm next steps.", actions: [{ label: "Start another request", action: "transfer" }] });
    } catch (e) {
      patch(id, {
        pending: false,
        text: e instanceof Error ? e.message : "Unable to send the enquiry. Please call our coordination team.",
        actions: [
          { label: "Try again", flow: "submit" },
          { label: "Reset", flow: "restart" },
          { label: "Cancel", flow: "cancel" },
        ],
      });
    } finally {
      submitting.current = false;
    }
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const urgency = getChatUrgency(text) ?? (
      flow && STEPS[flow.step]?.key === "travel_date" &&
      (text === getTransferToday() || /\btoday\b/i.test(text)) ? "urgent" : null
    );
    if (urgency) {
      cancelReply();
      setMessages((prev) => prev.filter((message) => !message.pending || message.text));
      setInput("");
      setFlow(null);
      setEnquiry(false);
      push({ role: "user", text });
      push({
        role: "assistant",
        text: getUrgentChatMessage(urgency),
        actions: urgency === "emergency"
          ? [{ label: "Call 112 in India", url: "tel:112" }]
          : [{ label: `Call ${site.phones.emergency.label}`, url: site.phones.emergency.href }],
      });
      return;
    }
    if (pendingReply.current || flow?.review) return;
    setInput("");
    if (flow) return answerStep(text);

    push({ role: "user", text });
    const id = push({ role: "assistant", text: "", pending: true });
    const controller = new AbortController();
    pendingReply.current = controller;
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.current.slice(-6) }),
      });
      const data = await res.json();
      if (controller.signal.aborted) return;
      const actions: Action[] = data.actions ?? [];
      patch(id, { pending: false, text: data.message || "Please try again or contact our team.", actions });
      if (data.status) history.current.push({ role: "user", text }, { role: "assistant", text: data.message });
    } catch {
      if (!controller.signal.aborted) {
        patch(id, { pending: false, text: "The assistant is temporarily unavailable. Please call our coordination team." });
      }
    } finally {
      if (pendingReply.current === controller) {
        pendingReply.current = null;
        setBusy(false);
      }
    }
  };

  const run = (a: Action) => {
    if (a.prompt) return void send(a.prompt);
    if (busy || submitting.current) return;
    if (a.flow === "restart") {
      reset();
      return startTransfer();
    }
    if (a.action === "transfer") return startTransfer();
    if (a.flow === "submit") return void submitFlow();
    if (a.flow === "cancel") return cancelFlow();
    if (a.value) return answerStep(a.value);
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const onEnquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Partial<Record<EnquiryField | "consent", string>>;
    for (const key of ["from", "to", "travel_date", "patient_needs", "name", "phone", "email"] as const) {
      const result = validateEnquiryField(key, values[key] ?? "");
      if (result.value === undefined) {
        setEnquiryError(result.error);
        (form.elements.namedItem(key) as HTMLElement | null)?.focus();
        return;
      }
      values[key] = result.value;
    }
    submitting.current = true;
    setEnquirySending(true);
    setEnquiryError("");
    try {
      await sendLead(values);
      form.reset();
      setEnquiry(false);
      push({ role: "assistant", text: "Your enquiry was recorded. Please call our coordination team to confirm next steps." });
    } catch (err) {
      setEnquiryError(err instanceof Error ? err.message : "Unable to send enquiry. Please call our team.");
    } finally {
      submitting.current = false;
      setEnquirySending(false);
    }
  };

  const step = flow && !flow.review ? flow.step : null;
  const pickingTransferDate = step !== null && STEPS[step].key === "travel_date";

  const composerField = "min-h-10 min-w-0 flex-1 rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink caret-brand [color-scheme:light] outline-none focus:border-brand";
  const label = "block text-xs font-medium text-slate";
  const control = "mt-1 w-full rounded border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand";

  return (
    <div ref={root} className="fixed bottom-5 right-4 z-50 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label="Ashoka Rescue transfer assistant"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex flex-col overflow-hidden rounded-2xl border border-line bg-white",
              "absolute bottom-16 right-0 z-10 h-[min(650px,calc(100dvh-6.25rem))] w-[min(390px,calc(100vw-2rem))] shadow-[0_24px_70px_-20px_rgba(16,32,121,0.45)] sm:w-[min(390px,calc(100vw-2.5rem))]",
              "[@media(max-height:520px)]:fixed [@media(max-height:520px)]:inset-y-2 [@media(max-height:520px)]:right-2 [@media(max-height:520px)]:h-auto [@media(max-height:520px)]:w-[min(390px,calc(100vw-1rem))]",
            )}
          >
            <header className="flex shrink-0 items-center justify-between gap-2 bg-navy px-4 py-4 text-white [@media(max-height:520px)]:py-2">
              <div className="min-w-0">
                <span className="block text-[0.7rem] font-medium uppercase tracking-wider text-white/70 [@media(max-height:520px)]:hidden">
                  Ashoka Rescue assistant
                </span>
                <h2 className="mt-1 font-display text-lg font-bold leading-tight !text-white [@media(max-height:520px)]:mt-0">Patient transfer help</h2>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button type="button" onClick={reset} aria-label="Reset conversation" title="Reset conversation" className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><RotateCcw className="size-4" /></button>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><X className="size-4" /></button>
              </div>
            </header>

            <p className="shrink-0 bg-brand-50 px-4 py-2 text-xs leading-snug text-navy">
              {emergencyGuidance}{" "}
              <a href="tel:112" className="font-semibold underline underline-offset-2">Call 112 in India</a>.
            </p>

            {flow || enquiry ? (
              <div className="shrink-0 border-b border-line px-4 py-2">
                <a
                  href={site.phones.emergency.href}
                  className="inline-flex min-h-8 flex-wrap items-center gap-x-2 text-xs font-semibold text-brand underline-offset-2 hover:underline"
                >
                  <Phone aria-hidden className="size-3.5 shrink-0" />
                  <span>Urgent transfer? Call <span className="whitespace-nowrap">{site.phones.emergency.label}</span></span>
                </a>
              </div>
            ) : (
              <a
                href={site.phones.emergency.href}
                className="mx-4 mt-2 flex shrink-0 items-center gap-3 rounded-lg bg-brand px-3 py-2 text-white transition hover:bg-brand-700"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/15">
                  <Phone aria-hidden className="size-4" />
                </span>
                <span className="text-sm leading-tight">
                  <strong className="block font-semibold">Call the 24/7 transfer line</strong>
                  <span className="mt-0.5 block text-xs text-white/85">{site.phones.emergency.label}</span>
                </span>
              </a>
            )}

            {flow && !enquiry && (
              <div className="flex shrink-0 items-center justify-between gap-3 bg-mist px-4 py-2.5 text-xs">
                <strong className="font-semibold text-navy">
                  {step === null ? "Review before submitting" : STEPS[step].label}
                </strong>
                {step !== null && (
                  <span className="shrink-0 text-slate">Question {step + 1} of {STEPS.length}</span>
                )}
              </div>
            )}

            {enquiry ? (
              <form onSubmit={onEnquiry} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
                <div className="flex items-start gap-3">
                  <button type="button" onClick={() => setEnquiry(false)} aria-label="Back to conversation" className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-navy"><ArrowLeft className="size-4" /></button>
                  <div className="text-sm"><strong className="block text-navy">Request a callback</strong><span className="text-slate">Use this form for non-urgent transfers.</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className={label}>Pickup location<input name="from" required maxLength={enquiryLimits.from} className={control} /></label>
                  <label className={label}>Drop location<input name="to" required maxLength={enquiryLimits.to} className={control} /></label>
                </div>
                <label className={label}>Preferred transfer date<input name="travel_date" type="date" min={getTransferToday()} className={control} /></label>
                <label className={label}>Mobility or support needs<textarea name="patient_needs" rows={2} maxLength={enquiryLimits.patient_needs} placeholder="Only details needed to plan the transfer" className={control} /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={label}>Your name<input name="name" required maxLength={enquiryLimits.name} autoComplete="name" className={control} /></label>
                  <label className={label}>Phone<input name="phone" type="tel" required maxLength={enquiryLimits.phone} autoComplete="tel" inputMode="tel" className={control} /></label>
                </div>
                <label className={label}>Email (optional)<input name="email" type="email" maxLength={enquiryLimits.email} autoComplete="email" className={control} /></label>
                <label className="flex items-start gap-2 text-xs text-slate"><input required type="checkbox" name="consent" className="mt-0.5 accent-brand" /> I agree to be contacted about this enquiry.</label>
                {enquiryError && <p role="alert" className="text-xs text-signal">{enquiryError}</p>}
                <button type="submit" disabled={enquirySending} className="btn btn-brand w-full !normal-case !tracking-normal disabled:opacity-60">{enquirySending ? "Sending…" : <>Send enquiry <ArrowRight className="size-4" /></>}</button>
                <p className="text-center text-[0.7rem] text-slate">Please do not share medical records, identity documents, or payment details here.</p>
              </form>
            ) : (
              <>
                <div ref={log} role="log" aria-live="polite" className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-3 [&>*]:shrink-0">
                  {messages.map((m) => (
                    <div key={m.id} className={cn("flex flex-col gap-2", m.role === "user" ? "items-end" : "items-start")}>
                      {m.review ? (
                        <div className="w-full min-w-0 rounded-2xl border border-line bg-white text-sm text-ink">
                          <h3 className="rounded-t-2xl border-b border-line bg-mist px-4 py-3 font-display text-base font-semibold text-navy">
                            {m.text}
                          </h3>
                          <dl className="divide-y divide-line px-4">
                            {m.review.map(({ label, value }) => (
                              <div key={label} className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-x-3 py-2.5">
                                <dt className="text-xs font-medium leading-5 text-slate">{label}</dt>
                                <dd className="whitespace-pre-line font-medium leading-5 [overflow-wrap:anywhere]">{value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ) : (
                        <div className={cn("min-w-0 max-w-[88%] whitespace-pre-line [overflow-wrap:anywhere] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed", m.role === "user" ? "rounded-br-sm bg-brand text-white" : "rounded-bl-sm bg-mist text-ink")}>
                          {m.pending && !m.text ? (
                            <span aria-label="Ashoka AI is thinking" className="flex gap-1 py-1">{[0, 1, 2].map((i) => <span key={i} className="size-1.5 animate-bounce rounded-full bg-slate/60" style={{ animationDelay: `${i * 0.15}s` }} />)}</span>
                          ) : m.text}
                        </div>
                      )}
                      {m.actions && (!flow || m.id === messages.at(-1)?.id) && (
                        <div className="flex max-w-full flex-wrap gap-2">
                          {m.actions.map((a, i) =>
                            a.url ? (
                              a.url.startsWith("/") ? (
                                <Link key={i} href={a.url} onClick={() => setOpen(false)} className={actionClass}>{a.label}</Link>
                              ) : (
                                <a key={i} href={a.url} className={actionClass}>{a.label}</a>
                              )
                            ) : (
                              <button key={i} type="button" onClick={() => run(a)} className={actionClass}>{a.label}</button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {!flow && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <button type="button" onClick={() => setEnquiry(true)} className="min-h-9 text-xs font-medium text-brand underline-offset-2 hover:underline">
                        Request a callback
                      </button>
                      <button type="button" disabled={busy} onClick={() => void send(BROWSE_PROMPT)} className="min-h-9 text-xs font-medium text-brand underline-offset-2 hover:underline disabled:opacity-50">
                        Browse services
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); void send(input); }} className="flex shrink-0 items-end gap-2 border-t border-line p-3 [@media(max-height:520px)]:p-2">
                  <label htmlFor="ai-concierge-message" className="sr-only">
                    {pickingTransferDate ? "Preferred transfer date" : "Message"}
                  </label>
                  {pickingTransferDate ? (
                    <input
                      id="ai-concierge-message"
                      type="date"
                      min={getTransferToday()}
                      required
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className={cn(composerField, "w-0")}
                    />
                  ) : (
                    <textarea
                      ref={field}
                      id="ai-concierge-message"
                      rows={1}
                      maxLength={1000}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKey}
                      placeholder={step !== null ? "Type your answer…" : "Tell us what help you need…"}
                      className={cn(composerField, "max-h-24 resize-none placeholder:text-slate placeholder:opacity-100")}
                    />
                  )}
                  <button type="submit" disabled={!input.trim() || ((busy || flow?.review) && !getChatUrgency(input))} aria-label={pickingTransferDate ? "Confirm transfer date" : "Send message"} className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-700 disabled:opacity-50"><Send className="size-4" /></button>
                </form>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Open Ashoka AI transfer assistant"
        className="inline-flex h-13 items-center gap-2.5 rounded-full bg-float px-5 py-3.5 font-display text-[0.95rem] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(47,75,224,0.75)] ring-2 ring-white/30 transition hover:-translate-y-0.5 hover:bg-float-600"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className="hidden sm:inline">Ask Ashoka AI</span>
      </button>
    </div>
  );
}
