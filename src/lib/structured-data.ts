import { site } from "@/lib/site";
import type { Vessel, Package, FaqItem, Review } from "@/lib/content-types";

export function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    url: `${site.url}/${locale}`,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    sameAs: [site.socials.instagram, site.socials.facebook],
  };
}

export function localBusinessJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.legalName,
    image: `${site.url}/drone-sail.jpeg`,
    url: `${site.url}/${locale}`,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
  };
}

export function breadcrumbJsonLd(locale: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}/${locale}${item.path}`,
    })),
  };
}

export function vesselJsonLd(locale: string, vessel: Vessel) {
  return {
    "@context": "https://schema.org",
    "@type": "Boat",
    name: vessel.name,
    description: vessel.description.join(" "),
    url: `${site.url}/${locale}/fleet#${vessel.slug}`,
    image: vessel.heroImage ? `${site.url}${vessel.heroImage}` : undefined,
    additionalProperty: vessel.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function packageOfferJsonLd(locale: string, pkg: Package) {
  const price = pkg.priceStandard ?? pkg.pricePeak;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.includes.join(", "),
    touristType: "Leisure travelers",
    itinerary: pkg.destinations.join(", "),
    offers: price
      ? {
          "@type": "Offer",
          price,
          priceCurrency: pkg.currency,
          url: `${site.url}/${locale}/packages#${pkg.slug}`,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}

export function faqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function reviewsJsonLd(reviews: Review[]) {
  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: average.toFixed(1),
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  };
}
