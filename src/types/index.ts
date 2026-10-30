export type ImageAsset = {
  src: string;
  alt: string;
};

export type IconKey =
  | "plane"
  | "stretcher"
  | "briefcase"
  | "globe"
  | "ambulance"
  | "train"
  | "doctor"
  | "heartPulse"
  | "baby"
  | "child"
  | "kidney"
  | "activity"
  | "lungs"
  | "ribbon"
  | "map"
  | "siren";

export type ContentBlock =
  | { type: "heading" | "subheading" | "paragraph" | "lead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "features"; items: Feature[] };

export type Feature = {
  title: string;
  text?: string;
  items?: string[];
};

export type GalleryKey = "airAmbulance" | "roadAmbulance" | "commercialStretcher";

export type Service = {
  slug: string;
  name: string;
  icon: IconKey;
  excerpt: string;
  image: ImageAsset;
  gallery?: GalleryKey;
  hero: { title: string; subtitle?: string };
  meta: PageMeta;
  badges?: string[];
  content: ContentBlock[];
};

export type PageMeta = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Step = {
  title: string;
  text: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: [string, string];
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type LegalDocument = {
  meta: PageMeta;
  title: string;
  intro?: string;
  sections: { heading: string; paragraphs: string[] }[];
  outro: string;
};

export type HeroSlide = {
  image: ImageAsset;
  eyebrow: string;
  title: string[];
  text: string;
  note?: string;
  /** Banner artwork that already contains its own headline. */
  hasBakedText?: boolean;
};

export type MapCity = {
  name: string;
  /** Position in the world map's 148×70 coordinate space. */
  x: number;
  y: number;
  labelPosition?: "top" | "bottom" | "left" | "right";
};
