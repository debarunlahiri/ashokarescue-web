import type { HeroSlide, IconKey, MapCity, Stat } from "@/types";
import { images } from "./images";

// Content sourced from the Ashoka Rescue website.
export const heroSlides: HeroSlide[] = [
  {
    image: images.hero.beyondBorders,
    eyebrow: "Ashoka Rescue / Beyond borders",
    title: ["International patient transfers"],
    text: "Medical transport support for patients travelling abroad.",
    hasBakedText: true,
  },
  {
    image: images.hero.cabinCare,
    eyebrow: "Ashoka Rescue / Medical transport",
    title: ["Coordinated medical transport"],
    text: "Patient transfers within India and internationally.",
  },
  {
    image: images.hero.inflightMonitoring,
    eyebrow: "Ashoka Rescue / Air ambulance",
    title: ["Charter air ambulance services"],
    text: "Dedicated aircraft with critical care teams and ICU equipment.",
  },
  {
    image: images.hero.tarmacTransfer,
    eyebrow: "Ashoka Rescue / Road ambulance",
    title: ["Road ambulance services"],
    text: "ALS and BLS road ambulances for hospital and airport transfers.",
  },
  {
    image: images.hero.expertPanel,
    eyebrow: "Our expert panel of doctors",
    title: ["Our medical team"],
    text: "Medical leadership with first-hand experience of caring for patients in transit.",
    hasBakedText: true,
  },
];

export const home = {
  transferContacts: {
    urgent: {
      title: "24/7 transfer line",
      text: "Call this number if a patient needs an urgent transfer. Our team will discuss the transport options available.",
    },
    planned: {
      title: "Request a quote",
      text: "For a planned transfer, send us the pickup location, drop location and preferred travel date on WhatsApp.",
    },
  },
  services: {
    eyebrow: "Our services",
    title: ["Medical transport options"],
    text: "Compare dedicated air ambulances, commercial stretcher services, medical escorts and road ambulances.",
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
    title: ["Medical support during transport"],
    quote: "Care planned around the patient",
    text: "We review the patient’s medical needs, coordinate each stage of the transfer and keep families informed.",
    highlights: [
      { icon: "plane", title: "ICU-equipped air ambulance", text: "Fully equipped aircraft with advanced life-support systems for critical patient transfer." },
      { icon: "team", title: "Experienced medical team", text: "Doctors, nurses and paramedics provide medical care during transport." },
      { icon: "globe", title: "International patient transfers", text: "Medical transport within India and internationally, including to and from the United States, Canada and Australia." },
      { icon: "support", title: "Transfer coordination", text: "Complete assistance with medical clearance, flight coordination, hospital arrangements and all transfer formalities." },
      { icon: "stretcher", title: "Commercial stretcher services", text: "Specialised stretcher arrangements with medical support on commercial flights." },
      { icon: "clock", title: "24/7 assistance", text: "Our coordination team is available around the clock to answer enquiries and discuss transfer arrangements." },
    ],
    points: [
      {
        title: "Led by medical needs",
        text: "Transport planning begins with the patient’s condition and treating team.",
      },
      {
        title: "Coordinated transport",
        text: "Aircraft, ground connections and receiving teams coordinated together.",
      },
    ],
  },
  journey: {
    eyebrow: "Patient transfer process",
    title: ["What to expect during an air ambulance transfer"],
    description: "A typical air ambulance transfer combines ground transport, in-flight medical care and handover to the receiving team.",
    stages: [
      {
        title: "Pickup location",
        text: "The medical team prepares the patient for transfer and assists with boarding the ambulance.",
      },
      {
        title: "Transfer to the airport",
        text: "The ambulance takes the patient to the aircraft, where the crew assists with boarding.",
      },
      {
        title: "In-flight medical care",
        text: "The medical team monitors the patient and provides care throughout the flight.",
      },
      {
        title: "Ground transfer on arrival",
        text: "An ambulance meets the aircraft and takes the patient to the receiving facility.",
      },
      {
        title: "Drop location",
        text: "The medical team hands over care to the receiving facility.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: ["How to arrange a patient transfer"],
    steps: [
      {
        title: "Share the transfer details",
        text: "Provide the pickup location, drop location and the patient’s transport needs.",
      },
      {
        title: "Review the options",
        text: "Our team reviews the medical requirements and discusses suitable transport arrangements.",
      },
      {
        title: "Coordinate the transfer",
        text: "Our team coordinates medical clearances, travel arrangements and ground transport.",
      },
      {
        title: "Confirm the handover",
        text: "The transport team coordinates handover with the receiving medical team.",
      },
    ],
  },
  reach: {
    eyebrow: "Our reach",
    title: ["Domestic and international transfers"],
    text: "Our team coordinates medical care and travel arrangements for each patient transfer.",
    cards: [
      {
        title: "Transfers within India",
        text: "Air and ground medical transport with connected hospital and airport transfers.",
      },
      {
        title: "International transfers",
        text: "Medical escorts, commercial stretchers and charter arrangements, subject to route and medical approvals.",
      },
    ],
  },
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
