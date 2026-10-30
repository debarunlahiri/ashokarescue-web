import type { IconKey } from "@/types";
import type { HeroSlide, MapCity, Stat } from "@/types";
import { images } from "./images";

// Content sourced from the Ashoka Rescue website.
export const heroSlides: HeroSlide[] = [
  {
    image: images.hero.beyondBorders,
    eyebrow: "Ashoka Rescue / Beyond borders",
    title: ["Team Ashoka will transfer your patient beyond borders."],
    text: "Safe. Careful. Compassionate.",
    hasBakedText: true,
  },
  {
    image: images.hero.cabinCare,
    eyebrow: "Ashoka Rescue / Medical transport",
    title: ["Medical transport.", "Care at every step."],
    text: "Air ambulance, medical escorts and ground transfers. Our team helps coordinate your loved one’s journey, from bedside to bedside, in India and worldwide.",
    note: "From bedside to bedside.",
  },
  {
    image: images.hero.inflightMonitoring,
    eyebrow: "Ashoka Rescue / Air ambulance",
    title: ["Dedicated aircraft.", "Focused on your care."],
    text: "Charter air ambulance arrangements shaped around the patient’s medical needs. Our team coordinates the medical crew, equipment and ground connections for the journey.",
    note: "Medical support throughout.",
  },
  {
    image: images.hero.tarmacTransfer,
    eyebrow: "Ashoka Rescue / Road ambulance",
    title: ["Every connection.", "Considered with care."],
    text: "From hospital transfers to airport connections, our team helps arrange ALS and BLS road ambulance support to connect each stage of your loved one’s journey.",
    note: "Care beyond the flight.",
  },
  {
    image: images.hero.expertPanel,
    eyebrow: "Our expert panel of doctors",
    title: ["Our Expert Panel of Doctors"],
    text: "Medical leadership with first-hand experience of caring for patients in transit.",
    hasBakedText: true,
  },
];

export const home = {
  quickCta: {
    title: "Need a patient transfer?",
    text: ["Tell us where you are.", "We’ll help plan what comes next."],
  },
  services: {
    eyebrow: "Our services",
    title: ["The right transport.", "The right medical support."],
    text: "From a dedicated aircraft to a supported airline journey, find the right starting point for your transfer.",
    items: [
      {
        title: "Charter air ambulance",
        text: "A dedicated flight with medical support planned around the patient’s condition.",
        href: "/services/charter-air-ambulance-service-in-india",
        icon: "plane" as IconKey,
        image: images.airAmbulance.tarmacConvoy,
      },
      {
        title: "Commercial stretcher",
        text: "Supported stretcher travel on commercial airlines, subject to medical and airline approval.",
        href: "/services/commercial-stretcher-service",
        icon: "stretcher" as IconKey,
        image: images.commercialStretcher.patientOnboard,
      },
      {
        title: "Medical escort",
        text: "Professional medical assistance for patients who need support throughout their journey.",
        href: "/services/medical-escort-and-transport",
        icon: "doctor" as IconKey,
        image: images.services.medicalEscort,
      },
      {
        title: "Road ambulance",
        text: "ALS and BLS ambulance arrangements for hospital transfers and airport connections.",
        href: "/services/road-ambulance-service-in-india",
        icon: "ambulance" as IconKey,
        image: images.roadAmbulance.fleetDusk,
      },
    ],
  },
  patientFirst: {
    eyebrow: "Patient-first care",
    title: ["Every patient deserves", "personal attention."],
    quote: "A patient. A family. A moment that matters.",
    text: "Medical transport is about more than reaching a destination. It means understanding the patient’s needs, keeping the family informed and making sure each stage of the journey connects.",
    points: [
      {
        title: "Led by medical needs",
        text: "Transport planning begins with the patient’s condition and treating team.",
      },
      {
        title: "Joined-up arrangements",
        text: "Aircraft, ground connections and receiving teams coordinated together.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: ["A clear plan.", "From your first call to arrival."],
    steps: [
      {
        title: "Talk to us",
        text: "Share the pickup location, destination and the kind of support the patient needs.",
      },
      {
        title: "Review the options",
        text: "Our team reviews the medical requirements and discusses suitable transport arrangements.",
      },
      {
        title: "Connect the journey",
        text: "Medical clearances, travel arrangements and ground connections are coordinated.",
      },
      {
        title: "Continue the care",
        text: "The transfer is supported through to the receiving team and destination handover.",
      },
    ],
  },
  reach: {
    eyebrow: "Our reach",
    title: ["Care that goes", "the distance."],
    text: "Within India or across countries, our team helps connect the medical and travel arrangements for each patient’s route.",
    cards: [
      {
        title: ["City to city.", "Bedside to bedside."],
        text: "Air and ground medical transport with connected hospital and airport transfers.",
      },
      {
        title: ["Different countries.", "One coordinated journey."],
        text: "Medical escorts, commercial stretchers and charter arrangements, subject to route and medical approvals.",
      },
    ],
  },
  closing: ["Wherever the next step takes you,", "let’s take it together."],
};

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: ["Years of medical", "transport experience"] },
  { value: 5000, suffix: "+", label: ["Air ambulance", "patient transfers"] },
  { value: 3000, suffix: "+", label: ["Commercial", "stretcher transfers"] },
  { value: 24, suffix: "/7", label: ["Medical coordination", "and assistance"] },
];

/** Route map pins, positioned on /images/maps/world-dots.svg (148×70 grid). */
export const routeMap = {
  hub: { name: "Delhi NCR", x: 106, y: 28.58 } satisfies MapCity,
  destinations: [
    { name: "Vancouver", x: 4, y: 14.72, labelPosition: "bottom" },
    { name: "Toronto", x: 25.5, y: 19.05, labelPosition: "top" },
    { name: "New York", x: 29, y: 21.65, labelPosition: "bottom" },
    { name: "London", x: 66, y: 12.99, labelPosition: "top" },
    { name: "Dubai", x: 94.5, y: 31.18, labelPosition: "bottom" },
    { name: "Nairobi", x: 85.5, y: 45.03, labelPosition: "bottom" },
    { name: "Singapore", x: 119.5, y: 43.3, labelPosition: "bottom" },
    { name: "Sydney", x: 143.5, y: 62.35, labelPosition: "left" },
  ] satisfies MapCity[],
};
