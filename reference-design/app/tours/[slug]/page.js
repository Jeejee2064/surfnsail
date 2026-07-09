"use client";

import { useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "../../context/LanguageContext";
import { getTour } from "../../data/tours";
import Navbar from "../../components/Navbar";
import Lightbox from "../../components/Lightbox";

/* ─── Star ─────────────────────────────────────────── */
function Star({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#F5A523" : "none"} stroke="#F5A523" strokeWidth="1.5">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

/* ─── Info Bar ──────────────────────────────────────── */
function InfoBar({ tour, lang }) {
  const items = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A523" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
      ),
      value: tour.duration,
      label: tour.durationLabel,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A523" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      value: tour.groupSize,
      label: tour.groupLabel,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A523" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      ),
      value: tour.departure,
      label: tour.departureLabel,
    },
  ];

  return (
    <div className="bg-[#0b1e30] border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        {/* Price */}
        <div className="flex flex-col items-center text-center md:border-r border-white/8 md:pr-8">
          <span className="font-serif text-4xl font-semibold text-[#F5A523]">
            ${tour.price}
          </span>
          <span className="text-[#fff5e8]/45 text-[10px] tracking-[0.3em] uppercase font-sans mt-1">
            {tour.priceLabel}
          </span>
        </div>
        {/* Other stats */}
        {items.map((item, i) => (
          <div key={i} className={`flex flex-col items-center text-center ${i < 2 ? "md:border-r border-white/8" : ""} md:px-8`}>
            <div className="mb-2">{item.icon}</div>
            <span className="font-serif text-xl font-semibold text-[#fff5e8]">{item.value}</span>
            <span className="text-[#fff5e8]/40 text-[10px] tracking-[0.3em] uppercase font-sans mt-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Itinerary ─────────────────────────────────────── */
function Itinerary({ tour, lang }) {
  const label = lang === "en" ? "Your Day" : "Tu Día";
  const sublabel = lang === "en" ? "Step by Step" : "Paso a Paso";

  return (
    <section className="py-24 px-6 bg-[#071624]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#0CC8BE]/50" />
            <span className="text-[#0CC8BE] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">{sublabel}</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[#fff5e8]">
            {label}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[70px] top-3 bottom-3 w-px bg-gradient-to-b from-[#0CC8BE]/40 via-[#F5A523]/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {tour.itinerary.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-6 md:gap-8 items-start"
              >
                {/* Time */}
                <div className="flex-shrink-0 w-[70px] text-right hidden md:block">
                  <span className="text-[#0CC8BE] text-xs font-sans font-semibold tracking-wide">{step.time}</span>
                </div>
                {/* Dot */}
                <div className="hidden md:flex flex-shrink-0 w-3 h-3 rounded-full bg-[#F5A523] mt-1.5 relative z-10" />
                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-1 md:mb-0">
                    <span className="text-[#0CC8BE] text-xs font-sans font-semibold tracking-wide md:hidden">{step.time}</span>
                    <h4 className="font-serif text-xl font-semibold text-[#fff5e8]">{step.title}</h4>
                  </div>
                  <p className="text-[#fff5e8]/55 text-sm font-sans font-normal leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Included ──────────────────────────────────────── */
function IncludedSection({ tour, lang }) {
  const titles = {
    en: { yes: "What's Included", no: "Not Included" },
    es: { yes: "Qué Incluye", no: "No Incluye" },
  };
  const t = titles[lang];

  return (
    <section className="py-20 px-6 bg-[#0b1e30]">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-serif text-2xl font-semibold text-[#fff5e8] mb-6 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#0CC8BE]/20 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0CC8BE" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
            </span>
            {t.yes}
          </h3>
          <ul className="space-y-3">
            {tour.included.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#fff5e8]/70 text-sm font-sans">
                <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0CC8BE" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Not included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="font-serif text-2xl font-semibold text-[#fff5e8]/60 mb-6 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff5e8" strokeWidth="2" strokeOpacity="0.3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </span>
            {t.no}
          </h3>
          <ul className="space-y-3">
            {tour.notIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#fff5e8]/35 text-sm font-sans">
                <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-[#fff5e8]/20" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Reviews ───────────────────────────────────────── */
function Reviews({ tour, lang }) {
  const label = lang === "en" ? "What People Say" : "Lo Que Dicen";
  const sub = lang === "en" ? "Traveler Reviews" : "Opiniones de Viajeros";

  return (
    <section className="py-24 px-6 bg-[#071624]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#F5A523]/40" />
            <span className="text-[#F5A523] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">{sub}</span>
            <div className="h-px w-12 bg-[#F5A523]/40" />
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold text-[#fff5e8]">{label}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tour.reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#0b1e30] p-7 border border-white/5"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, j) => <Star key={j} filled />)}
              </div>
              <p className="font-serif italic text-lg text-[#fff5e8]/85 leading-snug mb-5">
                "{review.text}"
              </p>
              <div>
                <span className="text-[#fff5e8] text-sm font-sans font-semibold">{review.name}</span>
                <span className="text-[#fff5e8]/35 text-xs font-sans ml-2">· {review.country}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Booking CTA ───────────────────────────────────── */
function BookingCTA({ tour, tourData, lang }) {
  const copy = {
    en: { ready: "Ready?", book: "Book This Tour", via: "Book via WhatsApp", email: "Send Email", from: "From" },
    es: { ready: "¿Listo?", book: "Reservar Este Tour", via: "Reservar por WhatsApp", email: "Enviar Email", from: "Desde" },
  };
  const c = copy[lang];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={tourData.heroImage} alt={tour.title} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#071624]/88" />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F5A523]/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative text-center px-6 max-w-xl mx-auto"
      >
        <div className="inline-flex items-baseline gap-2 mb-3">
          <span className="text-[#fff5e8]/40 text-sm font-sans">{c.from}</span>
          <span className="font-serif text-6xl font-semibold text-[#F5A523]">${tour.price}</span>
          <span className="text-[#fff5e8]/40 text-sm font-sans">/ {tour.priceLabel}</span>
        </div>

        <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[#fff5e8] mb-3">
          {c.book}
        </h2>
        <p className="text-[#fff5e8]/50 text-sm font-sans mb-8">
          {lang === "en"
            ? "Message us directly — we'll confirm within the hour."
            : "Escríbenos directamente — confirmamos en menos de una hora."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/50760000000"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#F5A523] text-[#071624] text-[11px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-[#ffbf3d] transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {c.via}
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

/* ─── Main Page ─────────────────────────────────────── */
export default function TourPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const tourData = getTour(slug);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Lightbox state
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const images = tourData?.images || [];
  const openLightbox = (i) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto = useCallback(() => setLightboxIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const nextPhoto = useCallback(() => setLightboxIdx((i) => (i + 1) % images.length), [images.length]);
  const goTo = useCallback((i) => setLightboxIdx(i), []);

  if (!tourData) {
    return (
      <div className="min-h-screen bg-[#071624] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold text-[#fff5e8] mb-4">Tour not found</h1>
          <Link href="/#tours" className="text-[#F5A523] font-sans hover:underline">← Back to Tours</Link>
        </div>
      </div>
    );
  }

  const tour = tourData[lang];
  const backLabel = lang === "en" ? "← All Tours" : "← Todos los Tours";
  const experienceLabel = lang === "en" ? "The Experience" : "La Experiencia";
  const highlightsLabel = lang === "en" ? "Highlights" : "Aspectos Destacados";
  const galleryLabel = lang === "en" ? "Gallery" : "Galería";

  return (
    <>
      <Navbar />
      <main className="bg-[#071624]">

        {/* ── Hero ───────────────────────────────────────── */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
            <Image src={tourData.heroImage} alt={tour.title} fill sizes="100vw" className="object-cover" priority quality={90} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#071624]/60 via-[#071624]/10 to-[#071624]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071624]/30 to-transparent" />

          {/* Back button */}
          <Link
            href="/#tours"
            className="absolute top-24 left-6 md:left-10 z-20 flex items-center gap-2 text-[#fff5e8]/60 hover:text-[#F5A523] transition-colors duration-300 text-xs tracking-widest uppercase font-sans font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
            {backLabel}
          </Link>

          <motion.div
            style={{ opacity: contentOpacity }}
            className="relative h-full flex flex-col items-center justify-center text-center px-6"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`inline-block px-4 py-1.5 text-[9px] tracking-[0.3em] uppercase font-sans font-bold mb-6 ${tourData.tagColor}`}
            >
              {tourData.tag[lang]}
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3rem,10vw,8rem)] font-semibold text-[#fff5e8] leading-[0.92] tracking-[-0.02em]"
              >
                {tour.title}
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-[clamp(1.2rem,3vw,2.2rem)] font-normal text-[#0CC8BE]"
              >
                {tour.subtitle}
              </motion.p>
            </div>

            {/* Price pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-4 bg-[#0b1e30]/70 backdrop-blur-sm border border-white/10 px-8 py-4"
            >
              <div className="text-center">
                <span className="font-serif text-3xl font-semibold text-[#F5A523]">${tour.price}</span>
                <span className="text-[#fff5e8]/50 text-xs font-sans ml-2">{tour.priceLabel}</span>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-[#fff5e8]/60 text-xs tracking-wider font-sans">{tour.duration}</div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-[#fff5e8]/60 text-xs tracking-wider font-sans">{tour.groupSize} pax</div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Info Bar ───────────────────────────────────── */}
        <InfoBar tour={tour} lang={lang} />

        {/* ── Experience ─────────────────────────────────── */}
        <section className="py-24 px-6 bg-[#071624]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#F5A523]/50" />
                <span className="text-[#F5A523] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">
                  {experienceLabel}
                </span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold text-[#fff5e8] italic mb-8 leading-tight">
                {tour.tagline}
              </h2>
              {tour.description.map((p, i) => (
                <p key={i} className="text-[#fff5e8]/65 text-sm font-sans font-normal leading-relaxed mb-5">
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Right: highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:pt-16"
            >
              <h3 className="font-serif text-xl font-semibold text-[#fff5e8] mb-6">{highlightsLabel}</h3>
              <ul className="space-y-4">
                {tour.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0CC8BE]/15 border border-[#0CC8BE]/30 flex items-center justify-center mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0CC8BE" strokeWidth="2.5">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </div>
                    <span className="text-[#fff5e8]/70 text-sm font-sans font-normal leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── Itinerary ──────────────────────────────────── */}
        <Itinerary tour={tour} lang={lang} />

        {/* ── Gallery ────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[#0b1e30]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px w-10 bg-[#F5A523]/40" />
              <span className="text-[#F5A523] text-[10px] tracking-[0.4em] uppercase font-sans font-semibold">
                {galleryLabel}
              </span>
            </motion.div>

            <div className={`grid gap-3 ${images.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{ height: images.length === 2 ? "320px" : "260px" }}
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={src}
                    alt={`${tour.title} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Included ───────────────────────────────────── */}
        <IncludedSection tour={tour} lang={lang} />

        {/* ── Reviews ────────────────────────────────────── */}
        <Reviews tour={tour} lang={lang} />

        {/* ── Booking CTA ────────────────────────────────── */}
        <BookingCTA tour={tour} tourData={tourData} lang={lang} />

      </main>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          current={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          onGoTo={goTo}
        />
      )}
    </>
  );
}
