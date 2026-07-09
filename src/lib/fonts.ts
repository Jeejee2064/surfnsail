import { Cormorant_Garamond, Inter, Yellowtail } from "next/font/google";

// Self-hosted via next/font — no runtime request to Google, no layout shift.
// Italic axis enabled for editorial accents (hero eyebrows, pull quotes).
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// A bold brush script for signature-style accents (hero tagline) — thicker
// strokes than a formal script so it still reads clearly at large sizes.
export const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-raw",
  display: "swap",
});
