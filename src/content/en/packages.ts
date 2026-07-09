import type { Package } from "@/lib/content-types";

export const packagesIntro = {
  eyebrow: "Packages & Prices",
  heading: "Charter options for every kind of trip",
  body: "From a single sunset sail to a week among the outer islands — every package includes captain and crew, meals, and the full complement of gear onboard.",
};

// PRICES PENDING FINAL CLIENT CONFIRMATION — figures below are last-known
// reference recovered from the live site. Do not launch without sign-off.
export const priceNotice =
  "All prices are in USD. Peak season runs mid-November through end of January. Please confirm current rates with us before booking.";

export const packages: Package[] = [
  {
    slug: "overnight-charter",
    name: "Overnight Charter",
    category: "per-day",
    priceStandard: 1800,
    pricePeak: 2100,
    currency: "USD",
    unit: "per day",
    duration: "12+ hours, per day — multi-day voyages available",
    destinations: ["Bocas del Toro archipelago"],
    includes: [
      "Boat rental, captain and 1 crew member",
      "2 bathrooms; 1 double cabin + 2 triple cabins (6 adults + 2 children)",
      "Snorkeling gear & stand-up paddleboard",
      "Fishing & spearfishing equipment",
      "Flotation devices",
      "Dinghy with 25 hp engine",
      "3 meals daily",
      "Beverages: water, sodas, juice, beer, Abuelo rum & wines",
      "Bedding, towels & toiletries",
    ],
    bestSeason: "Year-round; peak rate mid-Nov to end Jan",
  },
  {
    slug: "day-charter",
    name: "Day Charter",
    category: "day-charter",
    priceStandard: 1250,
    pricePeak: 1450,
    currency: "USD",
    unit: "per day",
    duration: "8 hours or less",
    destinations: ["Bocas del Toro archipelago"],
    includes: [
      "Boat rental, captain and 1 crew member",
      "2 bathrooms",
      "Snorkeling gear & stand-up paddleboard",
      "Fishing equipment",
      "Flotation devices & dinghy",
      "1 meal, snacks & beverages",
    ],
    bestSeason: "Year-round; peak rate mid-Nov to end Jan",
    notes:
      "+$200 Zapatillas marine park conservation fee where applicable. Max 10 guests (12 with crew).",
  },
  {
    slug: "escudo-de-veraguas",
    name: "Escudo de Veraguas",
    category: "multi-day",
    priceStandard: 6500,
    pricePeak: null,
    currency: "USD",
    unit: "per trip",
    duration: "4 days, 3 nights",
    destinations: ["Escudo de Veraguas"],
    includes: ["Full-board multi-day charter", "All standard gear & amenities"],
    bestSeason: "Sept 15 – Nov 15, weather dependent",
    notes: "Discounted from the standard rate of $7,200.",
  },
  {
    slug: "laguna-bluefield-kusapin",
    name: "Laguna Bluefield / Kusapin",
    category: "multi-day",
    priceStandard: null,
    pricePeak: 6000,
    currency: "USD",
    unit: "per trip",
    duration: "3 days, 2 nights",
    destinations: ["Laguna de Bluefield", "Kusapin"],
    includes: ["Full-board multi-day charter", "All standard gear & amenities"],
    bestSeason: "Peak season rate shown; off-season billed at the standard $1,800/day rate",
  },
  {
    slug: "zapatillas-dolphin-bay",
    name: "Zapatillas / Dolphin Bay",
    category: "multi-day",
    priceStandard: 3300,
    pricePeak: 3900,
    currency: "USD",
    unit: "per trip",
    duration: "2 days, 1 night minimum",
    destinations: ["Zapatilla Cays", "Dolphin Bay"],
    includes: ["Full-board multi-day charter", "All standard gear & amenities"],
    bestSeason: "Year-round; peak rate mid-Nov to end Jan",
  },
];
