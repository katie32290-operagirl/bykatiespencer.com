import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";

/** Handwritten accent — for small script flourishes ("Scroll to explore"). */
export const fontScript = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
  weight: ["400", "500", "600"],
});

/**
 * Display / editorial serif. Fraunces has optical sizing that blooms at
 * hero scale while staying composed in body — the "editorial luxury" voice.
 */
export const fontSerif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/**
 * Workhorse sans. Plus Jakarta Sans is the closest high-quality Google Fonts
 * relative to General Sans — warm, geometric, highly legible at small sizes.
 */
export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
