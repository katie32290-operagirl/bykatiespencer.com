import {
  DM_Serif_Display,
  Karla,
  Special_Elite,
  Instrument_Serif,
  Newsreader,
  Instrument_Sans,
} from "next/font/google";

/* ------------------------------------------------------------------ */
/*  Redesign type system — the name & headlines run on Instrument Sans */
/*  bold, the reading voice on Newsreader, expressive display on       */
/*  Instrument Serif. Used by the new homepage; the rest of the site   */
/*  still runs the Opening Night trio below.                           */
/* ------------------------------------------------------------------ */
export const fontKsLabel = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ks-label",
  weight: ["400", "500", "600", "700"],
});

export const fontKsVoice = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ks-voice",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const fontKsDisplay = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ks-display",
  weight: "400",
  style: ["normal", "italic"],
});

/**
 * Display serif — the name, headlines, italic pull-lines. DM Serif Display: a
 * warm, high-contrast didone matching the wordmark drama. One weight (400), so
 * hierarchy comes from size and italics, never bolding (see font-synthesis in
 * globals.css).
 */
export const fontDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

/**
 * The working register — body, UI, wayfinding, the GreenRoom register.
 * Karla: warm, highly readable grotesque.
 */
export const fontSans = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/**
 * Production metadata only — ACT markers, tickets, credits, call sheets, dates.
 * Special Elite: typewriter, uppercase, tracked.
 */
export const fontAccent = Special_Elite({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  weight: "400",
});
