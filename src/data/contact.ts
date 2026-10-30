// Content sourced from the Ashoka Rescue website.
export const contactPage = {
  meta: {
    title: "Contact Ashoka Rescue | Quick Quote and Support",
    description: "Get in touch with Ashoka Rescue for expert medical transport services. Quick quotes and professional assistance for your medical travel needs.",
  },
  hero: {
    eyebrow: "Contact Ashoka Rescue",
    title: ["Let’s plan a", "safe transfer.", "Together."],
    text: "Tell us about the patient’s condition, current location, and destination. Our medical transport team will guide you through the next steps.",
    note: ["Here for your next step.", "Medical coordination available 24/7"],
    caption: ["A team ready to listen.", "Care starts with a conversation."],
  },
  reach: {
    eyebrow: "Reach our team",
    title: ["Real people.", "Ready to help."],
    text: "Whether you’re arranging a transfer or exploring your options, start with the conversation that works for you.",
    channels: [
      {
        kind: "phone",
        label: "Speak to us",
        title: "Let’s talk it through.",
        text: "Speak with our team about medical transport and the next steps.",
      },
      {
        kind: "whatsapp",
        label: "Message our team",
        title: "A conversation, your way.",
        text: "Connect on WhatsApp for help planning a patient’s journey.",
      },
      {
        kind: "email",
        label: "Write to us",
        title: "Start with an email.",
        text: "Send your enquiry and contact details so our team can get in touch.",
      },
    ],
    office: "Our office in Gurugram",
  },
  next: {
    eyebrow: "What happens next",
    title: "A clearer path forward.",
    steps: [
      {
        title: "We understand your needs",
        text: "Our team discusses the journey and the patient’s transport requirements with you.",
      },
      {
        title: "We explore the options",
        text: "We help you understand suitable transport arrangements for the route and care needed.",
      },
      {
        title: "We guide you through",
        text: "You’ll have support with the coordination and next steps for the transfer.",
      },
    ],
  },
};

export const assistance = {
  eyebrow: "Request assistance",
  title: ["Medical transport.", "Personal guidance."],
  text: "Share the essential travel details. Our medical transport team will help you understand the available options.",
  formTitle: "Plan a patient transfer",
  formText: "Tell us about the journey and how to reach you.",
  privacyNote: "Please do not include medical records or detailed diagnoses.",
  consent: "I agree to be contacted about this request and have read the privacy policy.",
  submit: "Send assistance request",
  fields: {
    from: { label: "Pickup city / country", placeholder: "Travelling from" },
    to: { label: "Destination city / country", placeholder: "Travelling to" },
    service: { label: "Transportation service", placeholder: "Select a service" },
    name: { label: "Full name", placeholder: "Your name" },
    phone: { label: "Phone number", placeholder: "Include country code" },
    email: { label: "Email address", placeholder: "you@example.com" },
    notes: { label: "Travel requirements (optional)", placeholder: "Anything else we should know?" },
  },
};
