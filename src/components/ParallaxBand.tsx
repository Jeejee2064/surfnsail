"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SmartImage } from "./SmartImage";

interface ParallaxBandProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  children?: ReactNode;
  align?: "left" | "center";
  height?: "tall" | "regular";
}

// A full-bleed image band that drifts at a different rate than the page as
// it scrolls — used as a rhythm break between content sections rather than
// another bordered card grid.
export function ParallaxBand({
  image,
  imageAlt,
  eyebrow,
  heading,
  body,
  children,
  align = "left",
  height = "regular",
}: ParallaxBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${height === "tall" ? "h-[85svh] min-h-[560px]" : "h-[65svh] min-h-[440px]"}`}
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-125 motion-reduce:!transform-none">
        <SmartImage src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/65" />

      <motion.div
        style={{ y: contentY }}
        className={`relative flex h-full flex-col justify-center px-6 sm:px-10 lg:px-16 motion-reduce:!transform-none ${
          align === "center" ? "items-center text-center" : "items-start"
        }`}
      >
        <div className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
          {eyebrow && <p className="eyebrow mb-4 text-sand-100">{eyebrow}</p>}
          <h2 className="font-display text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-tight text-bone">
            {heading}
          </h2>
          {body && <p className="mt-5 text-lg leading-relaxed text-sand-100/90">{body}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </motion.div>
    </div>
  );
}
