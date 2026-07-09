import type { Package } from "@/lib/content-types";

export const packagesIntro = {
  eyebrow: "Paquetes y Precios",
  heading: "Opciones de charter para cada tipo de viaje",
  body: "Desde una sola navegación al atardecer hasta una semana entre las islas — cada paquete incluye capitán y tripulación, comidas y todo el equipo a bordo.",
};

// PRECIOS PENDIENTES DE CONFIRMACIÓN FINAL DEL CLIENTE.
export const priceNotice =
  "Todos los precios están en USD. La temporada alta va de mediados de noviembre a fines de enero. Por favor confirma las tarifas vigentes con nosotros antes de reservar.";

export const packages: Package[] = [
  {
    slug: "overnight-charter",
    name: "Charter Nocturno",
    category: "per-day",
    priceStandard: 1800,
    pricePeak: 2100,
    currency: "USD",
    unit: "por día",
    duration: "12+ horas, por día — travesías de varios días disponibles",
    destinations: ["Archipiélago de Bocas del Toro"],
    includes: [
      "Alquiler del bote, capitán y 1 tripulante",
      "2 baños; 1 cabina doble + 2 cabinas triples (6 adultos + 2 niños)",
      "Equipo de snorkel y tabla de paddle (SUP)",
      "Equipo de pesca y pesca submarina",
      "Dispositivos de flotación",
      "Bote auxiliar con motor de 25 hp",
      "3 comidas diarias",
      "Bebidas: agua, gaseosas, jugo, cerveza, ron Abuelo y vinos",
      "Ropa de cama, toallas y artículos de aseo",
    ],
    bestSeason: "Todo el año; tarifa de temporada alta de mediados de nov. a fines de ene.",
  },
  {
    slug: "day-charter",
    name: "Charter de Día",
    category: "day-charter",
    priceStandard: 1250,
    pricePeak: 1450,
    currency: "USD",
    unit: "por día",
    duration: "8 horas o menos",
    destinations: ["Archipiélago de Bocas del Toro"],
    includes: [
      "Alquiler del bote, capitán y 1 tripulante",
      "2 baños",
      "Equipo de snorkel y tabla de paddle (SUP)",
      "Equipo de pesca",
      "Dispositivos de flotación y bote auxiliar",
      "1 comida, snacks y bebidas",
    ],
    bestSeason: "Todo el año; tarifa de temporada alta de mediados de nov. a fines de ene.",
    notes:
      "+$200 tarifa de conservación del parque marino Zapatillas cuando aplique. Máximo 10 huéspedes (12 con tripulación).",
  },
  {
    slug: "escudo-de-veraguas",
    name: "Escudo de Veraguas",
    category: "multi-day",
    priceStandard: 6500,
    pricePeak: null,
    currency: "USD",
    unit: "por viaje",
    duration: "4 días, 3 noches",
    destinations: ["Escudo de Veraguas"],
    includes: ["Charter de varios días con pensión completa", "Todo el equipo y comodidades estándar"],
    bestSeason: "15 de sept. – 15 de nov., sujeto al clima",
    notes: "Tarifa con descuento sobre el precio estándar de $7,200.",
  },
  {
    slug: "laguna-bluefield-kusapin",
    name: "Laguna Bluefield / Kusapin",
    category: "multi-day",
    priceStandard: null,
    pricePeak: 6000,
    currency: "USD",
    unit: "por viaje",
    duration: "3 días, 2 noches",
    destinations: ["Laguna de Bluefield", "Kusapin"],
    includes: ["Charter de varios días con pensión completa", "Todo el equipo y comodidades estándar"],
    bestSeason: "Tarifa de temporada alta indicada; en temporada baja aplica la tarifa estándar de $1,800/día",
  },
  {
    slug: "zapatillas-dolphin-bay",
    name: "Zapatillas / Dolphin Bay",
    category: "multi-day",
    priceStandard: 3300,
    pricePeak: 3900,
    currency: "USD",
    unit: "por viaje",
    duration: "Mínimo 2 días, 1 noche",
    destinations: ["Cayos Zapatilla", "Dolphin Bay"],
    includes: ["Charter de varios días con pensión completa", "Todo el equipo y comodidades estándar"],
    bestSeason: "Todo el año; tarifa de temporada alta de mediados de nov. a fines de ene.",
  },
];
