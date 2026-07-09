"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SmartImage } from "./SmartImage";
import type { ReactNode } from "react";

interface HeroProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  priority?: boolean;
}

// Full-bleed cinematic hero with layered parallax: the background image
// drifts slower than scroll, foreground content slower still, and a gentle
// Ken Burns scale runs on load. Text staggers in on mount independently of
// scroll, and a scroll cue invites the next move. Disabled automatically for
// reduced motion via the scroll-driven transforms simply not mattering much
// at rest.
export function Hero({ image, imageAlt, eyebrow, title, subtitle, children, priority }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative flex min-h-[max(560px,92svh)] w-full flex-col overflow-hidden bg-sea-950">
      <motion.div style={{ y: imageY }} className="absolute inset-0 motion-reduce:!transform-none">
        <div className="absolute inset-0 animate-[kenburns_16s_ease-out_forwards] motion-reduce:animate-none">
          <SmartImage
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sea-950/90 via-sea-950/25 to-sea-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-sea-950/40 via-transparent to-transparent" />
      </motion.div>

      <Image
        src="/logo-icon.png"
        alt=""
        aria-hidden="true"
        width={874}
        height={777}
        className="pointer-events-none absolute -bottom-16 -right-16 h-[24rem] w-auto rotate-6 opacity-[0.06] sm:h-[32rem] brightness-0 invert"
      />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative mt-auto flex flex-col items-start px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 motion-reduce:!transform-none motion-reduce:!opacity-100"
      >
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow mb-4 flex items-center gap-3 text-brand-400"
            >
              <span className="h-px w-8 bg-brand-400/70" />
              {eyebrow}
            </motion.p>
          )}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-bone [text-wrap:balance] drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] sm:text-5xl md:text-6xl lg:text-7xl motion-reduce:!transform-none"
            >
              {title}
            </motion.h1>
          </div>
          {subtitle && (
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 max-w-2xl font-script text-4xl leading-tight text-brand-400 [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl motion-reduce:!transform-none"
              >
                {subtitle}
              </motion.p>
            </div>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute inset-x-0 bottom-6 hidden justify-center sm:flex motion-reduce:hidden"
        aria-hidden="true"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-bone/40 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-bone/80"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
