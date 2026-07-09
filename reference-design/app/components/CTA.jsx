"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";

const copy = {
  en: {
    label: "Ready to Explore?",
    title: "Your",
    accent: "Adventure",
    title2: "Awaits",
    sub: "Reach out on WhatsApp to book your dream tour, ask questions, or build a custom island experience tailored just for you.",
    wa: "WhatsApp Us",
    email: "Send Email",
  },
  es: {
    label: "¿Listo para Explorar?",
    title: "Tu",
    accent: "Aventura",
    title2: "Te Espera",
    sub: "Contáctanos por WhatsApp para reservar tu tour, hacer preguntas o crear una experiencia isleña completamente personalizada.",
    wa: "WhatsApp",
    email: "Enviar Email",
  },
};

export default function CTA() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section id="contact" className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/hero.jpg" alt="Bocas del Toro" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#071624]/84" />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#F5A523]/30 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative text-center px-6 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-14 bg-[#0CC8BE]/50" />
          <span className="text-[#0CC8BE] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">
            {c.label}
          </span>
          <div className="h-px w-14 bg-[#0CC8BE]/50" />
        </div>

        <h2 className="font-serif text-[clamp(2.8rem,6.5vw,6rem)] font-semibold text-[#fff5e8] leading-tight mb-7">
          {c.title}{" "}
          <span className="italic text-[#F5A523]">{c.accent}</span>
          <br />
          {c.title2}
        </h2>

        <p className="text-[#fff5e8]/65 mb-10 font-sans font-normal text-sm leading-relaxed max-w-md mx-auto">
          {c.sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/50760000000"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#F5A523] text-[#071624] text-[11px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-[#ffbf3d] transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {c.wa}
          </a>
          <a
            href="mailto:info@bocasislandstours.com"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-[#0CC8BE] text-[#0CC8BE] text-[11px] tracking-[0.2em] uppercase font-sans font-semibold hover:bg-[#0CC8BE] hover:text-[#071624] transition-all duration-300"
          >
            {c.email}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
