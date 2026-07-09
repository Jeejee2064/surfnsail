import { Bodoni_Moda, Inter, Yellowtail } from "next/font/google";

// Self-hosted via next/font — no runtime request to Google, no layout shift.
// Italic axis enabled for editorial accents (hero eyebrows, pull quotes).
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
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
