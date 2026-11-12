"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/data";
import { cn } from "@/lib/utils";

type Action = { label: string; url?: string; action?: "transfer"; prompt?: string; value?: string; flow?: "submit" | "cancel" | "restart" };
type Msg = { id: number; role: "user" | "assistant"; text: string; actions?: Action[]; pending?: boolean };
type FlowKey = "origin" | "destination" | "travel_date" | "service" | "patient_needs" | "name" | "phone" | "consent";

const GREETING = "Hi, I’m Ashoka AI. I can explain our services, guide a transfer request, or take you to the right page.";
const STARTERS: Action[] = [
  { label: "Show me services", prompt: "Tell me about your medical transport services" },
  { label: "I need a transfer", action: "transfer" },
  { label: "Compare options", prompt: "Compare your medical transport options" },
  { label: "How it works", prompt: "How does Ashoka Rescue arrange a patient transfer?" },
  { label: "What does it cost?", prompt: "How is the price of a patient transfer calculated?" },
];
const STEPS: { key: FlowKey; question: string; options?: string[] }[] = [
  { key: "origin", question: "Where is the patient travelling from?" },
  { key: "destination", question: "What is the destination city or hospital?" },
  { key: "travel_date", question: "When is the transfer needed? You can say today, urgent, or provide a date." },
  { key: "service", question: "Do you have a transport preference?", options: ["Not sure", "Charter air ambulance", "Commercial stretcher", "Medical escort", "Road ambulance", "Train ambulance"] },
  { key: "patient_needs", question: "Briefly describe the patient’s mobility or support needs. Please do not share medical records." },
  { key: "name", question: "What is your name?" },
  { key: "phone", question: "What phone number should our coordination team call?" },
  { key: "consent", question: "May Ashoka Rescue contact you about this transfer request?", options: ["Yes", "No"] },
];
const SERVICE_CHOICES = ["Not sure — please advise", "Charter air ambulance", "Commercial stretcher", "Business-class assistance", "Medical escort", "Road ambulance", "Train ambulance"];

const actionClass = "inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-white px-3.5 py-1.5 text-left text-[0.8rem] font-medium text-brand transition hover:bg-brand hover:text-white";

let nextId = 1;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, role: "assistant", text: GREETING, actions: STARTERS }]);
  const [input, setInput] = useState("");
  const [flow, setFlow] = useState<{ step: number; data: Partial<Record<FlowKey, string>>; review?: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [enquirySending, setEnquirySending] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");
  const history = useRef<{ role: "user" | "assistant"; text: string }[]>([]);
  const log = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const root = useRef<HTMLDivElement>(null);

  const push = useCallback((m: Omit<Msg, "id">) => {
    const id = nextId++;
    setMessages((prev) => [...prev, { ...m, id }]);
    return id;
  }, []);
  const patch = (id: number, p: Partial<Msg>) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...p } : m)));

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => field.current?.focus(), 60);
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
    setEnquiry(false);
    setOpen(true);
    setFlow({ step: 0, data: {} });
    push({ role: "assistant", text: "Let’s prepare the transfer request together. I’ll ask one short question at a time." });
    ask(0);
  };

  const reset = () => {
    setFlow(null);
    setEnquiry(false);
    setInput("");
    history.current = [];
    setMessages([{ id: nextId++, role: "assistant", text: GREETING, actions: STARTERS }]);
  };

  const cancelFlow = () => {
    setFlow(null);
    push({ role: "assistant", text: "The transfer request was cancelled. Nothing was submitted.", actions: [{ label: "Start again", action: "transfer" }, { label: "Explore services", prompt: "Tell me about your medical transport services" }] });
  };

  const answerStep = (raw: string) => {
    if (!flow || flow.review) return;
    const text = raw.trim();
    if (!text) return;
    const step = STEPS[flow.step];
    push({ role: "user", text });

    if (step.key === "consent" && text.toLowerCase() !== "yes") {
      setFlow(null);
      push({ role: "assistant", text: "No problem. I have not submitted the request. You can continue exploring our services.", actions: [{ label: "View services", url: "/services" }] });
      return;
    }

    const data = { ...flow.data, [step.key]: text };
    const nextStep = flow.step + 1;
    if (nextStep >= STEPS.length) {
      setFlow({ step: nextStep, data, review: true });
      push({
        role: "assistant",
        text: `Please review your request:\n\nRoute: ${data.origin} to ${data.destination}\nTiming: ${data.travel_date}\nPreference: ${data.service}\nSupport needs: ${data.patient_needs}\nContact: ${data.name}, ${data.phone}`,
        actions: [{ label: "Submit request", flow: "submit" }, { label: "Start over", action: "transfer" }, { label: "Cancel", flow: "cancel" }],
      });
      return;
    }
    setFlow({ step: nextStep, data });
    ask(nextStep);
  };

  const sendLead = async (v: Record<string, string>) => {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: v.origin, to: v.destination, service: v.service, name: v.name, phone: v.phone, email: v.email ?? "",
        notes: [v.travel_date && `Timing: ${v.travel_date}`, v.patient_needs && `Support needs: ${v.patient_needs}`, "Source: Ashoka AI assistant"].filter(Boolean).join("\n"),
        consent: "yes",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Unable to send enquiry.");
  };

  const submitFlow = async () => {
    if (!flow) return;
    const id = push({ role: "assistant", text: "Sending your transfer brief securely…", pending: true });
    try {
      await sendLead(flow.data as Record<string, string>);
      patch(id, { pending: false, text: "Your enquiry has been sent. Our coordination team will contact you shortly.", actions: [{ label: "Explore services", url: "/services" }, { label: "Start another request", action: "transfer" }] });
    } catch (e) {
      patch(id, { pending: false, text: e instanceof Error ? e.message : "Unable to send the enquiry. Please call our coordination team." });
    }
    setFlow(null);
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    setInput("");
    if (flow) return answerStep(text);

    push({ role: "user", text });
    const id = push({ role: "assistant", text: "", pending: true });
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.current.slice(-6) }),
      });
      const data = await res.json();
      const actions: Action[] = [...(data.actions ?? [])];
      if (!actions.some((a) => a.prompt)) actions.push({ label: "Tell me about services", prompt: "Tell me about your medical transport services" });
      if (!actions.some((a) => a.action === "transfer")) actions.push({ label: "Start a transfer", action: "transfer" });
      patch(id, { pending: false, text: data.message || "Please try again or contact our team.", actions });
      if (data.status) history.current.push({ role: "user", text }, { role: "assistant", text: data.message });
    } catch {
      patch(id, { pending: false, text: "The assistant is temporarily unavailable. Please call or use WhatsApp to reach our team." });
    } finally {
      setBusy(false);
    }
  };

  const run = (a: Action) => {
    if (a.action === "transfer") return startTransfer();
    if (a.flow === "submit") return void submitFlow();
    if (a.flow === "cancel") return cancelFlow();
    if (a.value) return answerStep(a.value);
    if (a.prompt) return void send(a.prompt);
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const onEnquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const v = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setEnquirySending(true);
    setEnquiryError("");
    try {
      await sendLead(v);
      form.reset();
      setEnquiry(false);
      push({ role: "assistant", text: "Your enquiry has been sent. Our coordination team will contact you shortly." });
    } catch (err) {
      setEnquiryError(err instanceof Error ? err.message : "Unable to send enquiry. Please call our team.");
    } finally {
      setEnquirySending(false);
    }
  };

  const step = flow && !flow.review ? flow.step : null;
  const progress = flow ? Math.min(flow.step + 1, STEPS.length) : 0;
  const inputLocked = !!flow?.review;
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
            className="absolute bottom-16 right-0 flex h-[min(650px,calc(100svh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_70px_-20px_rgba(16,32,121,0.45)]"
          >
            <header className="flex items-start justify-between bg-navy p-5 text-white">
              <div>
                <span className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/70">
                  <span className="size-2 rounded-full bg-[#46c77a] shadow-[0_0_0_4px_rgba(70,199,122,0.18)]" /> Ashoka Rescue assistant
                </span>
                <h2 className="mt-1 font-display text-xl font-bold !text-white">How can we help?</h2>
              </div>
              <div className="flex gap-1.5">
                <button type="button" onClick={reset} aria-label="Restart conversation" title="Restart conversation" className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><RotateCcw className="size-4" /></button>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><X className="size-4" /></button>
              </div>
            </header>

            <p className="bg-brand-50 px-5 py-2 text-xs text-navy">For an immediate medical emergency, contact local emergency services first.</p>

            <a href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="Message us on WhatsApp" className="mx-4 mt-3 flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 text-navy transition hover:border-brand">
              <span className="grid size-8 place-items-center rounded-full bg-brand text-white"><WhatsAppIcon className="size-4" /></span>
              <span className="flex-1 text-sm leading-tight"><strong className="block font-semibold">24/7 medical assistance</strong><small className="text-slate">{site.phones.emergency.label}</small></span>
              <ArrowUpRight className="size-4 text-slate" />
            </a>

            {flow && !enquiry && (
              <div className="px-5 pt-3">
                <div className="flex justify-between text-xs text-slate"><span>Transfer request</span><strong className="text-navy">Step {progress} of {STEPS.length}</strong></div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist"><span className="block h-full rounded-full bg-brand transition-all" style={{ width: `${(progress / STEPS.length) * 100}%` }} /></div>
              </div>
            )}

            {enquiry ? (
              <form onSubmit={onEnquiry} className="flex-1 space-y-3 overflow-y-auto p-4">
                <div className="flex items-start gap-3">
                  <button type="button" onClick={() => setEnquiry(false)} aria-label="Back to conversation" className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-navy"><ArrowLeft className="size-4" /></button>
                  <div className="text-sm"><strong className="block text-navy">Request a callback</strong><span className="text-slate">Share the essentials. Our team will confirm the next step.</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className={label}>From<input name="origin" required maxLength={120} className={control} /></label>
                  <label className={label}>To<input name="destination" required maxLength={120} className={control} /></label>
                </div>
                <label className={label}>Preferred date or urgency<input name="travel_date" maxLength={80} placeholder="Today, or 24 September" className={control} /></label>
                <label className={label}>Transport preference
                  <select name="service" className={control}>{SERVICE_CHOICES.map((o) => <option key={o}>{o}</option>)}</select>
                </label>
                <label className={label}>Mobility or support needs<textarea name="patient_needs" rows={2} maxLength={600} placeholder="Only details needed to plan the transfer" className={control} /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={label}>Your name<input name="name" required maxLength={100} autoComplete="name" className={control} /></label>
                  <label className={label}>Phone<input name="phone" required maxLength={20} autoComplete="tel" inputMode="tel" className={control} /></label>
                </div>
                <label className={label}>Email (optional)<input name="email" type="email" maxLength={150} autoComplete="email" className={control} /></label>
                <label className="flex items-start gap-2 text-xs text-slate"><input required type="checkbox" name="consent" className="mt-0.5 accent-brand" /> I agree to be contacted about this enquiry.</label>
                {enquiryError && <p role="alert" className="text-xs text-signal">{enquiryError}</p>}
                <button type="submit" disabled={enquirySending} className="btn btn-brand w-full !normal-case !tracking-normal disabled:opacity-60">{enquirySending ? "Sending…" : <>Send enquiry <ArrowRight className="size-4" /></>}</button>
                <p className="text-center text-[0.7rem] text-slate">Please do not share medical records, identity documents, or payment details here.</p>
              </form>
            ) : (
              <>
                <div ref={log} role="log" aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
                  {messages.map((m) => (
                    <div key={m.id} className={cn("flex flex-col gap-2", m.role === "user" ? "items-end" : "items-start")}>
                      <div className={cn("max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed", m.role === "user" ? "rounded-br-sm bg-brand text-white" : "rounded-bl-sm bg-mist text-ink")}>
                        {m.pending && !m.text ? (
                          <span aria-label="Ashoka AI is thinking" className="flex gap-1 py-1">{[0, 1, 2].map((i) => <span key={i} className="size-1.5 animate-bounce rounded-full bg-slate/60" style={{ animationDelay: `${i * 0.15}s` }} />)}</span>
                        ) : m.text}
                      </div>
                      {m.actions && (
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
                    <button type="button" onClick={() => setEnquiry(true)} className="mt-1 self-start text-xs font-medium text-brand underline-offset-2 hover:underline">Prefer a callback? Request one</button>
                  )}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); void send(input); }} className="flex items-end gap-2 border-t border-line p-3">
                  <label htmlFor="ai-concierge-message" className="sr-only">Message</label>
                  <textarea
                    ref={field}
                    id="ai-concierge-message"
                    rows={1}
                    maxLength={1000}
                    value={input}
                    disabled={inputLocked}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    placeholder={step !== null ? `Reply about ${STEPS[step].key.replace("_", " ")}…` : "Ask about a service or transfer…"}
                    className="max-h-24 min-h-10 flex-1 resize-none rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-brand disabled:bg-mist"
                  />
                  <button type="submit" disabled={inputLocked || busy || !input.trim()} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-700 disabled:opacity-50"><Send className="size-4" /></button>
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
