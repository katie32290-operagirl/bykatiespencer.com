import { Radley, Instrument_Sans, Special_Elite } from "next/font/google";

/**
 * Display serif — the name, headlines, italic pull-lines. Radley is
 * woodletter-derived: warm, sturdy, poster-like at size, with a true italic
 * for pull-lines. The first of the brand's three voices.
 */
export const fontDisplay = Radley({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

/**
 * The working register — body, UI, wayfinding, everything else. Instrument
 * Sans is the clean, legible voice the site actually reads in.
 */
export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

/**
 * The accent, used rarely — credits, call sheets, tickets, dates, act labels.
 * Special Elite is the typewriter register: the marked-up, backstage voice.
 */
export const fontAccent = Special_Elite({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  weight: "400",
});
