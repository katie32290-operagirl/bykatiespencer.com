/**
 * Redesign ("warm") system tokens — the palette and type roles from the
 * Homepage Redesign artboard. Cream paper, terracotta lead, oxblood ink,
 * periwinkle accent. Flat fields, no gradients, no texture. The name and
 * headlines run on Instrument Sans bold; the reading voice on Newsreader.
 */
export const C = {
  cream: "#F0EFEC",
  terra: "#D65A2E",
  ox: "#8C1B12",
  peri: "#A9C3E9",
  peach: "#E8B7A4",
  peachSoft: "#F0DCD2",
} as const;

/** Instrument Sans — the name, headlines, labels, wayfinding. */
export const SANS =
  "var(--font-ks-label), 'Instrument Sans', system-ui, sans-serif";
/** Newsreader — the reading voice: body and italic asides. */
export const SERIF = "var(--font-ks-voice), 'Newsreader', Georgia, serif";

/** The site's one nav, shared across every page. */
export const NAV = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Narratives", href: "/narratives" },
  { label: "Toolkits", href: "/toolkits" },
  { label: "Notes", href: "/writing" },
  { label: "Connect", href: "/contact" },
] as const;
