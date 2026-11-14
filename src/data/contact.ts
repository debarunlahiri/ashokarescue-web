// Content sourced from the Ashoka Rescue website.
export const contactPage = {
  meta: {
    title: "Contact Ashoka Rescue | Quick Quote and Support",
    description: "Get in touch with Ashoka Rescue for expert medical transport services. Quick quotes and professional assistance for your medical travel needs.",
  },
  hero: {
    eyebrow: "Contact Ashoka Rescue",
    title: ["Arrange a patient transfer"],
    text: "Share the pickup location, drop location and the patient’s transport needs so our team can discuss suitable options.",
    note: "Our medical coordination team is available 24/7.",
    caption: ["Ashoka Rescue", "Medical transport team"],
  },
  reach: {
    eyebrow: "Contact options",
    title: ["Contact our coordination team"],
    text: "Contact us by phone, WhatsApp or email to discuss transport options or an existing transfer.",
    channels: [
      {
        kind: "phone",
        label: "Transfer enquiries",
        title: "Call our team",
        text: "Speak with our team about available transport options and transfer requirements.",
      },
      {
        kind: "whatsapp",
        label: "Message on WhatsApp",
        title: "WhatsApp assistance",
        text: "Send your pickup and drop locations to start planning a transfer.",
      },
      {
        kind: "email",
        label: "Email enquiries",
        title: "Email our team",
        text: "Include your enquiry and contact details so our team can respond.",
      },
    ],
    office: "Our office in Gurugram",
  },
  next: {
    eyebrow: "What happens next",
    title: "After you contact us",
    steps: [
      {
        title: "Review transport requirements",
        text: "Our team discusses the journey and the patient’s transport requirements with you.",
      },
      {
        title: "Discuss transport options",
        text: "We explain which transport options suit the patient’s route and care needs.",
      },
      {
        title: "Coordinate arrangements",
        text: "Our team explains the arrangements needed before the transfer.",
      },
    ],
  },
};

export const assistance = {
  eyebrow: "Request assistance",
  title: ["Patient transport enquiries"],
  text: "Provide the transfer route and preferred service so our team can discuss the available options.",
  formTitle: "Plan a patient transfer",
  formText: "Enter the transfer details and your contact information.",
  privacyNote: "Please do not include medical records or detailed diagnoses.",
  consent: "I agree to be contacted about this request and have read the privacy policy.",
  submit: "Send assistance request",
  fields: {
    from: { label: "Pickup location", placeholder: "City and country" },
    to: { label: "Drop location", placeholder: "City and country" },
    service: { label: "Transportation service", placeholder: "Select a service" },
    name: { label: "Full name", placeholder: "Your name" },
    phone: { label: "Phone number", placeholder: "Include country code" },
    email: { label: "Email address", placeholder: "you@example.com" },
    notes: { label: "Travel requirements (optional)", placeholder: "Additional travel details" },
  },
};
