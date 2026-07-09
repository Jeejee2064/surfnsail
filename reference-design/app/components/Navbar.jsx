"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

const t = {
  en: { tours: "Tours", gallery: "Gallery", about: "About", contact: "Contact", book: "Book Now" },
  es: { tours: "Tours", gallery: "Galería", about: "Nosotros", contact: "Contacto", book: "Reservar" },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const nav = t[lang];
  const links = ["tours", "gallery", "about", "contact"];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-[#071624]/95 backdrop-blur-md border-b border-white/8 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold tracking-[0.18em] text-[#F5A523] uppercase">
              Bocas Islands Tours
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#fff5e8]/35 uppercase font-sans">
              Bocas del Toro · Panama
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((key) => (
              <a
                key={key}
                href={`/#${key}`}
                className="text-[11px] tracking-[0.22em] uppercase text-[#fff5e8]/65 hover:text-[#F5A523] transition-colors duration-300 font-sans font-medium"
              >
                {nav[key]}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase font-sans font-medium">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 transition-colors duration-200 ${
                  lang === "en" ? "text-[#F5A523]" : "text-[#fff5e8]/30 hover:text-[#fff5e8]/60"
                }`}
              >
                EN
              </button>
              <span className="text-[#fff5e8]/20">|</span>
              <button
                onClick={() => setLang("es")}
                className={`px-2 py-1 transition-colors duration-200 ${
                  lang === "es" ? "text-[#F5A523]" : "text-[#fff5e8]/30 hover:text-[#fff5e8]/60"
                }`}
              >
                ES
              </button>
            </div>

            {/* Book CTA — desktop only */}
            <a
              href="/#contact"
              className="hidden md:block px-6 py-2.5 text-[10px] tracking-[0.18em] uppercase bg-[#F5A523] text-[#071624] font-sans font-semibold hover:bg-[#ffbf3d] transition-all duration-300"
            >
              {nav.book}
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] relative"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-[#fff5e8] origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-px bg-[#fff5e8]"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-[#fff5e8] origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#071624]/97 backdrop-blur-md flex flex-col pt-28 pb-12 px-8 md:hidden"
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-2 flex-1">
              {links.map((key, i) => (
                <motion.a
                  key={key}
                  href={`/#${key}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-5 border-b border-white/8 group"
                >
                  <span className="font-serif text-4xl font-semibold text-[#fff5e8] group-hover:text-[#F5A523] transition-colors duration-300">
                    {nav[key]}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A523" strokeWidth="1.5" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </motion.a>
              ))}
            </nav>

            {/* Bottom: Book button + lang */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="w-full py-4 text-center bg-[#F5A523] text-[#071624] text-sm tracking-[0.2em] uppercase font-sans font-bold hover:bg-[#ffbf3d] transition-colors duration-300"
              >
                {nav.book}
              </a>

              <div className="flex items-center justify-center gap-6 pt-2">
                <span className="text-[#fff5e8]/30 text-xs tracking-widest uppercase font-sans">Language</span>
                <div className="flex items-center gap-1 text-sm tracking-[0.18em] uppercase font-sans font-semibold">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 transition-colors ${lang === "en" ? "text-[#F5A523]" : "text-[#fff5e8]/35 hover:text-[#fff5e8]/60"}`}
                  >
                    EN
                  </button>
                  <span className="text-[#fff5e8]/20">|</span>
                  <button
                    onClick={() => setLang("es")}
                    className={`px-3 py-1 transition-colors ${lang === "es" ? "text-[#F5A523]" : "text-[#fff5e8]/35 hover:text-[#fff5e8]/60"}`}
                  >
                    ES
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
