import { Instrument_Serif, Instrument_Sans, Newsreader } from "next/font/google";

/**
 * Display serif — headlines, covers, the name. Instrument Serif: modern,
 * high-contrast, forward. The first of the brand's three voices.
 */
export const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

/**
 * Reading voice — essays, body copy, the italic asides. Newsreader is the
 * literary serif the brand reads in.
 */
export const fontReading = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-reading",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

/**
 * Labels, wayfinding, product & UI — the forward "GreenRoom register."
 * Instrument Sans handles nav, buttons, eyebrows, and small caps.
 */
export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
