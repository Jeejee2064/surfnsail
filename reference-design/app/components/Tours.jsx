"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

const toursData = {
  en: [
    {
      slug: "cayo-coral",
      title: "Cayo Coral",
      subtitle: "Snorkeling & Coral Reefs",
      description:
        "Dive into crystal-clear waters above vibrant coral gardens teeming with tropical fish, sea turtles, and nurse sharks.",
      image: "/cayocoral1.jpg",
      duration: "Full Day",
      tag: "Most Popular",
      tagColor: "bg-[#0CC8BE] text-[#071624]",
    },
    {
      slug: "starfish-beach",
      title: "Starfish Beach",
      subtitle: "Playa Estrella",
      description:
        "Walk through shallow turquoise waters to meet hundreds of giant starfish in their natural habitat on this legendary shore.",
      image: "/estrella1.jpg",
      duration: "Half Day",
      tag: "Iconic",
      tagColor: "bg-[#F5A523] text-[#071624]",
    },
    {
      slug: "boca-del-drago",
      title: "Boca del Drago",
      subtitle: "Secluded Paradise",
      description:
        "Escape to one of the most pristine beaches on Colón island, where untouched jungle meets the calm Caribbean sea.",
      image: "/bocadeldrago.webp",
      duration: "Full Day",
      tag: "Exclusive",
      tagColor: "bg-[#fff5e8] text-[#071624]",
    },
    {
      slug: "isla-zapatilla",
      title: "Isla Zapatilla",
      subtitle: "Island Getaway",
      description:
        "Explore uninhabited shores and jungle trails of Zapatilla, a protected marine park of breathtaking natural beauty.",
      image: "/zapatilla1.jpg",
      duration: "Full Day",
      tag: "Adventure",
      tagColor: "bg-[#F5A523] text-[#071624]",
    },
  ],
  es: [
    {
      slug: "cayo-coral",
      title: "Cayo Coral",
      subtitle: "Snorkel y Arrecifes",
      description:
        "Sumérgete en aguas cristalinas sobre jardines de coral repletos de peces tropicales, tortugas marinas y tiburones nodriza.",
      image: "/cayocoral1.jpg",
      duration: "Día Completo",
      tag: "Más Popular",
      tagColor: "bg-[#0CC8BE] text-[#071624]",
    },
    {
      slug: "starfish-beach",
      title: "Playa Estrella",
      subtitle: "Starfish Beach",
      description:
        "Camina por aguas turquesas poco profundas y encuentra cientos de estrellas de mar gigantes en su hábitat natural.",
      image: "/estrella1.jpg",
      duration: "Medio Día",
      tag: "Icónico",
      tagColor: "bg-[#F5A523] text-[#071624]",
    },
    {
      slug: "boca-del-drago",
      title: "Boca del Drago",
      subtitle: "Paraíso Escondido",
      description:
        "Escápate a una de las playas más prístinas de la isla Colón, donde la selva virgen se encuentra con el Caribe.",
      image: "/bocadeldrago.webp",
      duration: "Día Completo",
      tag: "Exclusivo",
      tagColor: "bg-[#fff5e8] text-[#071624]",
    },
    {
      slug: "isla-zapatilla",
      title: "Isla Zapatilla",
      subtitle: "Evasión Isleña",
      description:
        "Explora las costas deshabitadas y senderos de Zapatilla, un parque marino protegido de belleza impresionante.",
      image: "/zapatilla1.jpg",
      duration: "Día Completo",
      tag: "Aventura",
      tagColor: "bg-[#F5A523] text-[#071624]",
    },
  ],
};

const headings = {
  en: {
    label: "Our Experiences",
    title: "Curated",
    accent: "Adventures",
    sub: "Each journey is crafted to show you the authentic magic of Bocas del Toro.",
  },
  es: {
    label: "Nuestras Experiencias",
    title: "Aventuras",
    accent: "Únicas",
    sub: "Cada viaje está diseñado para mostrarte la magia auténtica de Bocas del Toro.",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Tours() {
  const { lang } = useLang();
  const tours = toursData[lang];
  const h = headings[lang];

  return (
    <section id="tours" className="py-32 px-6 bg-[#071624]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-14 bg-[#0CC8BE]/50" />
            <span className="text-[#0CC8BE] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">
              {h.label}
            </span>
            <div className="h-px w-14 bg-[#0CC8BE]/50" />
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-semibold text-[#fff5e8] leading-tight">
            {h.title}{" "}
            <span className="italic text-[#F5A523]">{h.accent}</span>
          </h2>
          <p className="mt-4 text-[#fff5e8]/55 max-w-md mx-auto font-sans font-normal text-sm leading-relaxed">
            {h.sub}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tours.map((tour, i) => (
            <Link key={tour.title} href={`/tours/${tour.slug}`}>
            <motion.div
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-[#0b1e30] cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b1e30]" />
                {/* Tag badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase font-sans font-bold ${tour.tagColor}`}
                >
                  {tour.tag}
                </div>
              </div>

              {/* Info */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-3xl font-semibold text-[#fff5e8] group-hover:text-[#F5A523] transition-colors duration-300">
                      {tour.title}
                    </h3>
                    <p className="text-[#0CC8BE] text-[10px] tracking-[0.3em] uppercase mt-1 font-sans font-semibold">
                      {tour.subtitle}
                    </p>
                  </div>
                  <span className="text-[#fff5e8]/35 text-[10px] tracking-wider uppercase font-sans font-medium mt-1">
                    {tour.duration}
                  </span>
                </div>

                <p className="text-[#fff5e8]/65 text-sm leading-relaxed font-sans font-normal">
                  {tour.description}
                </p>

                {/* Arrow link */}
                <div className="mt-6 flex items-center gap-3 text-[#F5A523]">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 group-hover:tracking-[0.35em]">
                    {lang === "en" ? "Learn More" : "Saber Más"}
                  </span>
                  <svg width="32" height="10" viewBox="0 0 32 10" fill="none" className="overflow-visible">
                    <line x1="0" y1="5" x2="28" y2="5" stroke="#F5A523" strokeWidth="1" />
                    <polyline points="23,1 28,5 23,9" fill="none" stroke="#F5A523" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border-2 border-[#F5A523]/0 group-hover:border-[#F5A523]/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
