// Business constants shared across metadata, JSON-LD, header/footer and forms.
// TODO: confirm exact social handles/URLs and brand green hex with client.
export const site = {
  name: "Surfnsail",
  legalName: "Surfnsail — Luxury Sailing Charters",
  domain: "surfnsail.pa",
  url: "https://surfnsail.pa",
  email: "info@surfnsail.pa",
  phone: "+507 6047 1107",
  phoneHref: "tel:+50760471107",
  whatsappHref: "https://wa.me/50760471107",
  address: {
    line: "Bocas Marina, Isla Colón, Bocas del Toro, Panama",
    locality: "Bocas del Toro",
    region: "Bocas del Toro",
    country: "PA",
  },
  geo: {
    latitude: 9.3417,
    longitude: -82.2416,
  },
  // TODO: point at the client's external booking system once confirmed;
  // falls back to the enquiry form on /contact in the meantime.
  bookingHref: "/contact",
  socials: {
    // TODO: confirm exact handles with client
    instagram: "https://www.instagram.com/surfnsail.pa",
    facebook: "https://www.facebook.com/surfnsail.pa",
  },
} as const;
