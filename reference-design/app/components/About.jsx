"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    label: "Who We Are",
    h1: "Born from a Love",
    h2: "for the Islands",
    p1: "We are local guides who grew up navigating these waters. Our mission is to share the raw beauty, culture, and spirit of Bocas del Toro with travelers who seek something beyond the ordinary.",
    p2: "Every tour is a carefully crafted experience — small groups, authentic encounters, and an intimate knowledge of the archipelago that only locals possess.",
    stats: [
      { value: "10+", label: "Years of Experience" },
      { value: "5K+", label: "Happy Travelers" },
      { value: "12", label: "Unique Destinations" },
      { value: "100%", label: "Local Guides" },
    ],
  },
  es: {
    label: "Quiénes Somos",
    h1: "Nacidos del Amor",
    h2: "por las Islas",
    p1: "Somos guías locales que crecimos navegando estas aguas. Nuestra misión es compartir la belleza, la cultura y el espíritu de Bocas del Toro con viajeros que buscan algo más que lo ordinario.",
    p2: "Cada tour es una experiencia cuidadosamente diseñada — grupos pequeños, encuentros auténticos y un conocimiento íntimo del archipiélago que solo los locales poseen.",
    stats: [
      { value: "10+", label: "Años de Experiencia" },
      { value: "5K+", label: "Viajeros Felices" },
      { value: "12", label: "Destinos Únicos" },
      { value: "100%", label: "Guías Locales" },
    ],
  },
};

export default function About() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section id="about" className="py-32 px-6 bg-[#0b1e30]">
      <div className="max-w-7xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-[#F5A523]/25 to-transparent mb-20" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[480px]"
        >
          <div className="absolute left-0 top-0 w-[68%] h-[400px] overflow-hidden">
            <Image src="/bocas1.jpg" alt="Bocas del Toro" fill sizes="(max-width: 1024px) 70vw, 35vw" className="object-cover" />
          </div>
          <div className="absolute right-0 bottom-0 w-[48%] h-[260px] overflow-hidden border-[5px] border-[#0b1e30]">
            <Image src="/dolphin1.jpg" alt="Dolphins in Bocas del Toro" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
          </div>
          {/* Teal accent line */}
          <div className="absolute -left-3 top-6 w-px h-28 bg-[#0CC8BE]" />
          <div className="absolute -left-3 top-6 w-2 h-2 rounded-full bg-[#0CC8BE] -translate-x-[3px]" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[#0CC8BE]/60" />
            <span className="text-[#0CC8BE] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">
              {c.label}
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[#fff5e8] leading-tight mb-6">
            {c.h1}
            <br />
            <span className="italic text-[#F5A523]">{c.h2}</span>
          </h2>

          <p className="text-[#fff5e8]/65 leading-relaxed mb-5 font-sans font-normal text-sm">
            {c.p1}
          </p>
          <p className="text-[#fff5e8]/65 leading-relaxed mb-12 font-sans font-normal text-sm">
            {c.p2}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 border-t border-[#fff5e8]/8 pt-10">
            {c.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              >
                <div className="font-serif text-5xl text-[#F5A523] font-semibold">
                  {stat.value}
                </div>
                <div className="text-[#fff5e8]/40 text-[10px] tracking-[0.3em] uppercase mt-2 font-sans font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
