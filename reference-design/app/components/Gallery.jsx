"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import Lightbox from "./Lightbox";

const headings = {
  en: { label: "Gallery", title: "The", accent: "Islands" },
  es: { label: "Galería", title: "Las", accent: "Islas" },
};

const photos = [
  { src: "/cayocoral2.jpg",  alt: "Cayo Coral",      gridClass: "col-start-1 row-start-1 row-span-2" },
  { src: "/zapatilla2.jpg",  alt: "Isla Zapatilla",   gridClass: "col-start-2 row-start-1" },
  { src: "/starfish.webp",   alt: "Starfish Beach",   gridClass: "col-start-3 row-start-1" },
  { src: "/cayocoral3.jpeg", alt: "Coral Gardens",    gridClass: "col-start-2 row-start-2 col-span-2" },
];

const row2Photos = [
  { src: "/dolphin2.png",   alt: "Dolphins" },
  { src: "/zapatilla3.jpg", alt: "Zapatilla Shore" },
  { src: "/bocas1.jpg",     alt: "Bocas del Toro" },
];

const allImages = [...photos, ...row2Photos].map((p) => p.src);

function ExpandIcon() {
  return (
    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center">
      <div className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm border border-white/25 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [hovered, setHovered] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const { lang } = useLang();
  const h = headings[lang];

  const openLightbox = (i) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto = useCallback(() => setLightboxIdx((i) => (i - 1 + allImages.length) % allImages.length), []);
  const nextPhoto = useCallback(() => setLightboxIdx((i) => (i + 1) % allImages.length), []);
  const goTo = useCallback((i) => setLightboxIdx(i), []);

  return (
    <section id="gallery" className="py-32 px-6 bg-[#071624]">
      <div className="max-w-7xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-[#0CC8BE]/25 to-transparent mb-20" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-14 bg-[#F5A523]/50" />
            <span className="text-[#F5A523] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">
              {h.label}
            </span>
            <div className="h-px w-14 bg-[#F5A523]/50" />
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-semibold text-[#fff5e8]">
            {h.title}{" "}
            <span className="italic text-[#0CC8BE]">{h.accent}</span>
          </h2>
        </motion.div>

        {/* Featured grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-3 grid-rows-2 gap-3 mb-3"
          style={{ height: "560px" }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer group ${photo.gridClass}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700"
                style={{ transform: hovered === i ? "scale(1.07)" : "scale(1)" }}
              />
              <div
                className="absolute inset-0 bg-[#071624] transition-opacity duration-300"
                style={{ opacity: hovered === i ? 0 : 0.18 }}
              />

              <ExpandIcon />

              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-[#071624]/70 via-transparent to-transparent pointer-events-none"
                  >
                    <span className="font-serif text-xl font-semibold italic text-[#fff5e8]">
                      {photo.alt}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-3" style={{ height: "240px" }}>
          {row2Photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="relative overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHovered(10 + i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openLightbox(photos.length + i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700"
                style={{ transform: hovered === 10 + i ? "scale(1.07)" : "scale(1)" }}
              />
              <div
                className="absolute inset-0 bg-[#071624] transition-opacity duration-300"
                style={{ opacity: hovered === 10 + i ? 0 : 0.18 }}
              />

              <ExpandIcon />

              <AnimatePresence>
                {hovered === 10 + i && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-[#071624]/70 via-transparent to-transparent pointer-events-none"
                  >
                    <span className="font-serif text-lg font-semibold italic text-[#fff5e8]">
                      {photo.alt}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={allImages}
          current={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          onGoTo={goTo}
        />
      )}
    </section>
  );
}
