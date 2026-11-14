export const enquiryLimits = {
  from: 120,
  to: 120,
  name: 100,
  phone: 30,
  email: 254,
  travel_date: 40,
  patient_needs: 600,
  notes: 1000,
} as const;

export type EnquiryField = keyof typeof enquiryLimits;

const labels: Record<EnquiryField, string> = {
  from: "Pickup location",
  to: "Drop location",
  name: "Name",
  phone: "Phone number",
  email: "Email address",
  travel_date: "Preferred transfer date",
  patient_needs: "Support needs",
  notes: "Travel requirements",
};

const transferDateFormatter = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function getTransferToday() {
  return transferDateFormatter.format();
}

export function validateEnquiryField(key: EnquiryField, raw: unknown) {
  const label = labels[key];
  const limit = enquiryLimits[key];
  if (typeof raw !== "string") return { error: `${label} must be text.` };

  const value = raw.trim().normalize("NFC");
  if (raw.length > limit) return { error: `${label} must be ${limit} characters or fewer.` };
  if (/[<>]|[\p{Cc}\u2028\u2029]/u.test(raw.replace(/\r?\n/g, ""))) {
    return { error: `${label} must use plain text without markup or control characters.` };
  }
  if (!value && ["email", "notes", "travel_date", "patient_needs"].includes(key)) return { value };
  if (!value) return { error: `Enter your ${label.toLowerCase()}.` };
  if (/[\r\n]/.test(value) && key !== "notes" && key !== "patient_needs") {
    return { error: `Enter ${label.toLowerCase()} on a single line.` };
  }

  if (key === "name" && !/^\p{L}[\p{L}\p{M} .'’‑-]*$/u.test(value)) {
    return { error: "Enter a name using letters, spaces, apostrophes, periods or hyphens." };
  }
  if ((key === "from" || key === "to") && !/\p{L}/u.test(value)) {
    return { error: `Enter a city, hospital or address for the ${label.toLowerCase()}.` };
  }
  if (key === "email" && !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value)) {
    return { error: "Enter an email address in the format name@example.com." };
  }
  if (key === "phone") {
    const digits = value.replace(/[ ()-]/g, "");
    if (/^\+?[0-9][0-9 ()-]*$/.test(value) && !/^(\d)\1+$/.test(digits.replace(/^\+/, ""))) {
      if (/^[1-9]\d{9}$/.test(digits)) return { value: `+91${digits}` };
      if (/^\+[1-9]\d{7,14}$/.test(digits) && (!digits.startsWith("+91") || /^\+91[1-9]\d{9}$/.test(digits))) {
        return { value: digits };
      }
    }
    return { error: "Enter a 10-digit Indian number or an international number with its country code, such as +44." };
  }
  if (key === "travel_date") {
    const timing = value.toLowerCase();
    if (["today", "tomorrow", "not sure"].includes(timing)) return { value: timing };
    const date = new Date(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
      return { error: "Use YYYY-MM-DD, “today”, “tomorrow” or “not sure” for the transfer date." };
    }
    if (value < getTransferToday()) return { error: "Choose today or a future date." };
  }

  return { value };
}
