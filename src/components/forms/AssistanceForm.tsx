"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { assistance, serviceOptions } from "@/data";
import FormField from "./FormField";

type Status = "idle" | "sending" | "sent" | "error";

export default function AssistanceForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { fields } = assistance;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <div className="card relative overflow-hidden p-6 md:p-9">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-20 place-items-center rounded-full bg-emerald-50 text-emerald-600"
            >
              <CircleCheck className="size-10" />
            </motion.span>
            <h3 className="display mt-6 text-3xl">Request received.</h3>
            <p className="mt-3 max-w-sm text-slate">Our medical transport team will be in touch shortly. For urgent help, call the emergency desk.</p>
            <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline mt-6">Send another request</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} className="grid gap-5">
            <div>
              <h3 className="display text-3xl">{assistance.formTitle}</h3>
              <p className="mt-2 text-slate">{assistance.formText}</p>
            </div>

            {/* Honeypot: hidden from people, filled in by bots. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <fieldset className="grid gap-4">
              <legend className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-royal">Journey details</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label={fields.from.label}><input required name="from" placeholder={fields.from.placeholder} className="field" /></FormField>
                <FormField label={fields.to.label}><input required name="to" placeholder={fields.to.placeholder} className="field" /></FormField>
              </div>
              <FormField label={fields.service.label}>
                <select name="service" defaultValue="" className="field appearance-none">
                  <option value="">{fields.service.placeholder}</option>
                  {serviceOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </FormField>
            </fieldset>

            <fieldset className="grid gap-4">
              <legend className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-royal">Your details</legend>
              <FormField label={fields.name.label}><input required name="name" placeholder={fields.name.placeholder} className="field" autoComplete="name" /></FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label={fields.phone.label}><input required name="phone" type="tel" placeholder={fields.phone.placeholder} className="field" autoComplete="tel" /></FormField>
                <FormField label={fields.email.label}><input name="email" type="email" placeholder={fields.email.placeholder} className="field" autoComplete="email" /></FormField>
              </div>
              <FormField label={fields.notes.label}><textarea name="notes" rows={3} placeholder={fields.notes.placeholder} className="field resize-none" /></FormField>
            </fieldset>

            <p className="rounded-xl bg-mist px-4 py-3 text-sm text-navy">{assistance.privacyNote}</p>

            <label className="flex items-start gap-3 text-sm text-slate">
              <input required type="checkbox" name="consent" className="mt-0.5 size-4 accent-royal" />
              <span>
                I agree to be contacted about this request and have read the{" "}
                <Link href="/privacy" className="font-semibold text-royal underline-offset-2 hover:underline">privacy policy</Link>.
              </span>
            </label>

            {status === "error" && <p className="text-sm font-semibold text-signal">{errorMessage}</p>}

            <button type="submit" disabled={status === "sending"} className="btn btn-dark justify-center !py-4 text-base disabled:opacity-70">
              {status === "sending" ? <LoaderCircle className="size-5 animate-spin" /> : <Send className="size-4" />}
              {assistance.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
