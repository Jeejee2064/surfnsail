"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";

const t = {
  en: {
    location: "Bocas del Toro, Panama",
    headline1: "Bocas Islands",
    headline2: "Tours",
    sub: "Discover untouched reefs, hidden beaches, and the wild Caribbean soul of Panama.",
    cta1: "Explore Tours",
    cta2: "Book a Trip",
    scroll: "Scroll",
  },
  es: {
    location: "Bocas del Toro, Panamá",
    headline1: "Bocas Islands",
    headline2: "Tours",
    sub: "Descubre arrecifes intactos, playas escondidas y el alma salvaje del Caribe panameño.",
    cta1: "Ver Tours",
    cta2: "Reservar",
    scroll: "Bajar",
  },
};

export default function Hero() {
  const ref = useRef(null);
  const { lang } = useLang();
  const copy = t[lang];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0%", "8%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <Image
          src="/hero.jpg"
          alt="Bocas del Toro"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071624]/65 via-[#071624]/15 to-[#071624]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071624]/30 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="h-px w-10 bg-[#0CC8BE]" />
          <span className="text-[#0CC8BE] text-[11px] tracking-[0.4em] uppercase font-sans font-medium">
            {copy.location}
          </span>
          <div className="h-px w-10 bg-[#0CC8BE]" />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3.5rem,10vw,8.5rem)] font-semibold text-[#fff5e8] leading-[0.92] tracking-[-0.02em]"
          >
            {copy.headline1}
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-[clamp(3.5rem,10vw,8.5rem)] font-semibold text-[#F5A523] leading-[0.92] tracking-[-0.02em]"
          >
            {copy.headline2}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="text-[#fff5e8]/75 text-base md:text-lg max-w-md mb-10 font-sans font-normal leading-relaxed"
        >
          {copy.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#tours"
            className="px-10 py-4 bg-[#F5A523] text-[#071624] text-[11px] tracking-[0.22em] uppercase font-sans font-bold hover:bg-[#ffbf3d] transition-colors duration-300"
          >
            {copy.cta1}
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border-2 border-[#0CC8BE] text-[#0CC8BE] text-[11px] tracking-[0.22em] uppercase font-sans font-semibold hover:bg-[#0CC8BE] hover:text-[#071624] transition-all duration-300"
          >
            {copy.cta2}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-[#fff5e8]/40 text-[9px] tracking-[0.4em] uppercase font-sans font-medium">
            {copy.scroll}
          </span>
          <motion.div
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 origin-top bg-gradient-to-b from-[#0CC8BE] to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
