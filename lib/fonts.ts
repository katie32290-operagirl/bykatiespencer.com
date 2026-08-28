import { DM_Serif_Display, Karla, Special_Elite } from "next/font/google";

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
