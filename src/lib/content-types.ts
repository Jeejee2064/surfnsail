export interface CrewMember {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  photo: string;
}

export interface VesselSpec {
  label: string;
  value: string;
}

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Vessel {
  slug: "aventura" | "exta-sea";
  name: string;
  tagline: string;
  makeModel: string;
  captainName: string;
  heroImage: string;
  gallery: GalleryImage[];
  specs: VesselSpec[];
  amenities: string[];
  description: string[];
  pending?: boolean;
}

export interface Package {
  slug: string;
  name: string;
  category: "per-day" | "day-charter" | "multi-day";
  priceStandard: number | null;
  pricePeak: number | null;
  currency: "USD";
  unit: string;
  duration: string;
  destinations: string[];
  includes: string[];
  bestSeason: string;
  notes?: string;
}

export interface ActivitySection {
  heading: string;
  body: string[];
}

export interface Activity {
  slug: "surfing" | "sailing" | "fishing" | "diving";
  title: string;
  subtitle: string;
  heroImage: string;
  intro: string;
  sections: ActivitySection[];
  midImage?: { src: string; alt: string };
  gallery?: GalleryImage[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  source?: string;
}

export interface HomeContent {
  hero: { title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  intro: { eyebrow: string; heading: string; body: string[] };
  whyChoose: { eyebrow: string; heading: string; points: { title: string; body: string }[] };
  experiences: {
    eyebrow: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  fleetTeaser: { eyebrow: string; heading: string; body: string; cta: string };
  passions: { eyebrow: string; heading: string };
  gallery: { eyebrow: string; heading: string; images: GalleryImage[] };
  crewTeaser: { eyebrow: string; heading: string; body: string; cta: string };
  closingCta: { heading: string; cta: string };
}
