"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    label: "Testimonials",
    title: "They came for the islands,",
    accent: "they stayed for the magic.",
  },
  es: {
    label: "Testimonios",
    title: "Vinieron por las islas,",
    accent: "se quedaron por la magia.",
  },
};

const reviews = {
  en: [
    {
      text: "I've been snorkeling in Thailand, the Maldives, Australia. Cayo Coral beats them all for sheer density of life. The guide found a seahorse in thirty seconds flat.",
      name: "James R.",
      country: "Canada",
      tour: "Cayo Coral",
      rating: 5,
    },
    {
      text: "Starfish Beach sounds touristy — it isn't. We were there at 8am with ten other people and absolute silence except for the water. The photos don't do it justice.",
      name: "Léa M.",
      country: "France",
      tour: "Starfish Beach",
      rating: 5,
    },
    {
      text: "The whole fish lunch at Boca del Drago — I still think about it. Caught that morning, grilled with coconut rice. No menu, no fuss. Just perfect.",
      name: "Tom & Sara H.",
      country: "UK",
      tour: "Boca del Drago",
      rating: 5,
    },
    {
      text: "Zapatilla changed how I travel. No crowds, no noise — just a guide who grew up on these islands and knows every single bird, tree, and current. Book this one.",
      name: "Mariana C.",
      country: "Brazil",
      tour: "Isla Zapatilla",
      rating: 5,
    },
  ],
  es: [
    {
      text: "He hecho snorkel en Tailandia, Maldivas y Australia. Cayo Coral los supera a todos en densidad de vida marina. El guía encontró un caballito de mar en treinta segundos.",
      name: "James R.",
      country: "Canadá",
      tour: "Cayo Coral",
      rating: 5,
    },
    {
      text: "Playa Estrella suena turística — no lo es. Llegamos a las 8am con diez personas más y silencio absoluto salvo el agua. Las fotos no le hacen justicia.",
      name: "Léa M.",
      country: "Francia",
      tour: "Playa Estrella",
      rating: 5,
    },
    {
      text: "El almuerzo de pez entero en Boca del Drago — sigo pensando en él. Capturado esa mañana, a la parrilla con arroz de coco. Sin menú, sin complicaciones. Perfecto.",
      name: "Tom & Sara H.",
      country: "Reino Unido",
      tour: "Boca del Drago",
      rating: 5,
    },
    {
      text: "Zapatilla cambió cómo viajo. Sin multitudes, sin ruido — solo un guía que creció en estas islas y conoce cada pájaro, árbol y corriente. Reserva este tour.",
      name: "Mariana C.",
      country: "Brasil",
      tour: "Isla Zapatilla",
      rating: 5,
    },
  ],
};

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F5A523">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useLang();
  const c = copy[lang];
  const items = reviews[lang];

  return (
    <section className="py-32 px-6 bg-[#0b1e30]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-14 bg-[#F5A523]/40" />
            <span className="text-[#F5A523] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">
              {c.label}
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-semibold text-[#fff5e8] leading-tight max-w-xl">
            {c.title}
            <br />
            <span className="italic text-[#0CC8BE]">{c.accent}</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-[#071624] p-8 border border-white/5 flex flex-col group hover:border-[#F5A523]/20 transition-colors duration-300"
            >
              <Stars />

              <blockquote className="font-serif italic text-lg text-[#fff5e8]/85 leading-snug flex-1 mb-6">
                "{review.text}"
              </blockquote>

              <div className="flex items-center justify-between pt-5 border-t border-white/8">
                <div>
                  <div className="text-[#fff5e8] text-sm font-sans font-semibold">{review.name}</div>
                  <div className="text-[#fff5e8]/35 text-xs font-sans mt-0.5">{review.country}</div>
                </div>
                <div className="px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold bg-[#0CC8BE]/10 text-[#0CC8BE] border border-[#0CC8BE]/20">
                  {review.tour}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
