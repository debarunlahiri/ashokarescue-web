import type { NavItem } from "@/types";

// Content sourced from the Ashoka Rescue website.
export const site = {
  name: "Ashoka Rescue",
  legalName: "Ashoka Rescue Air Ambulance Services Pvt. Ltd.",
  established: 2004,
  tagline: "Compassionate, clinically coordinated medical transport by air and road in India and across the world.",
  meta: {
    title: "Ashoka Rescue | Air Ambulance & Critical Care Medical Transport",
    description: "Doctor-led air ambulance, commercial stretcher and ALS/BLS road ambulance services across India and worldwide. ICU-configured transfers with 24/7 medical coordination since 2004.",
  },
  phones: {
    emergency: { label: "+91 9810 36 4143", href: "tel:+919810364143" },
    office: { label: "+91 98189 33004", href: "tel:+919818933004" },
  },
  whatsapp: "https://wa.link/g90d9x",
  email: "ashokarescue@gmail.com",
  address: {
    lines: ["UG 124, Ansal Palam Corporate Plaza, Palam Vihar,", "Gurugram, Haryana, India — 122017"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=28.5146969,77.0348848",
    geo: { lat: 28.5146969, lng: 77.0348848 },
  },
  hours: "Medical coordination available 24 hours, every day.",
  blog: "https://ashokarescue.com/blog",
  reviews: "https://www.google.com/search?q=ashokarescue#lrd=0x390cfd309eebed77:0x164e92a2202ddf78,1,,,,",
  social: {
    instagram: "https://www.instagram.com/ashoka_rescue/",
    linkedin: "https://www.linkedin.com/company/ashoka-rescue/",
    facebook: "https://www.facebook.com/ashokarescue",
    youtube: "https://www.youtube.com/@ashokarescue8111",
  },
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "https://ashokarescue.com/blog", external: true },
  { label: "Contact", href: "/contact" },
];
