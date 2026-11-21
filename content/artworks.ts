/**
 * The studio archive — Katie's personal artwork for /art.
 *
 * Data-driven: add a piece by appending to `artworks`. Only `id`, `image`,
 * `width`, `height` and `alt` are required; every other field is optional and
 * simply stays hidden when absent. `width`/`height` are the image's natural
 * pixel size, used to reserve space and preserve each piece's true aspect
 * ratio (no cropping, no layout shift).
 *
 * The page shows two zones: loose standalone works first, then the titled
 * `Fragments` charcoal series as its own section (collection: "Fragments").
 * `order` sets the sequence (lower first); it is independent of the scan
 * filenames, which are being renumbered.
 */
export type Artwork = {
  id: string;
  /** Shown in captions and the detail view. Omit for an untitled piece. */
  title?: string;
  /** Year or period, e.g. "2012" or "c. 2010". */
  year?: string;
  /** e.g. "Charcoal on paper", "Colored pencil". */
  medium?: string;
  /** e.g. "9 × 12 in". */
  dimensions?: string;
  /** A short description or personal note shown in the detail view. */
  note?: string;
  /** Primary image path under /public. */
  image: string;
  /** Optional detail / alternate photographs. */
  images?: string[];
  /** Natural pixel dimensions of the primary image. */
  width: number;
  height: number;
  /** Accessible description of what the piece depicts. */
  alt: string;
  /** Optional grouping; "Fragments" renders as its own titled section. */
  collection?: string;
  /** Catalog number within a series, shown as a plate number, e.g. "01". */
  seq?: string;
  /** Optional, e.g. "Original available", "Not for sale". Hidden if absent. */
  availability?: string;
  /** Lower numbers show first. */
  order: number;
  /** Featured pieces lead their zone at a larger scale. */
  featured?: boolean;
};

export const artworks: Artwork[] = [
  // ---- standalone works ------------------------------------------------
  {
    id: "blue-eye",
    title: "Knowing",
    medium: "Colored pencil",
    image: "/art/blue-eye.webp",
    width: 1104,
    height: 1480,
    alt: "A framed colored-pencil drawing on a pale wall: a close cropped face with one bright blue eye under a dark brow, auburn hair falling across warm skin, and deep red lips at the lower edge.",
    order: 1,
    featured: true,
  },
  {
    id: "fleming",
    title: "Diva",
    seq: "01",
    medium: "Mixed media",
    note: "“Risk is exciting.”",
    image: "/art/fleming.webp",
    width: 1111,
    height: 1516,
    alt: "Mixed-media illustration of a soprano in a strapless magenta gown, seen in profile with an upswept bun, against black cross-hatching and bright pink brushstrokes; the hand-lettered words “Risk is exciting.” and the name Renée Fleming fill the upper left.",
    collection: "Illustrations",
    order: 1.2,
    featured: true,
  },
  {
    id: "didonato",
    title: "Diva",
    seq: "02",
    medium: "Mixed media",
    note: "“I can’t bear to lie to an audience.”",
    image: "/art/didonato.webp",
    width: 1160,
    height: 1583,
    alt: "Mixed-media illustration of a mezzo-soprano in an off-the-shoulder dark gown, turned over her shoulder, against vivid green brushwork and black grids; the hand-lettered words “I can’t bear to lie to an audience.” and the name Joyce DiDonato fill the upper left.",
    collection: "Illustrations",
    order: 1.3,
    featured: true,
  },
  {
    id: "guitar",
    title: "Reggie",
    medium: "Acrylic on canvas",
    image: "/art/guitar.webp",
    width: 1200,
    height: 1544,
    alt: "A vibrant acrylic painting on canvas hung on a pale wall: an electric guitar in jewel tones, a teal and lime body on the left, a golden-orange body on the right, pale strings running down a rainbow-lit neck against a magenta and violet ground.",
    order: 1.5,
    featured: true,
  },
  {
    id: "lemons",
    title: "Italian Citrus",
    medium: "Acrylic paint pens",
    image: "/art/lemons.webp",
    width: 1122,
    height: 1402,
    alt: "Bright painting in acrylic paint pens of a branch of lemons with green leaves and two cut wedges, set against a hand-painted blue and pale-blue checkerboard.",
    order: 1.75,
    featured: true,
  },

  // ---- Fragments (charcoal series) -------------------------------------
  {
    id: "fragments-cover",
    seq: "00",
    title: "Fragments",
    medium: "Charcoal on paper",
    image: "/art/fragments-cover.webp",
    width: 1400,
    height: 1786,
    alt: "Charcoal drawing of a face torn into pieces and reassembled on the page, the eyes, nose and mouth offset across the fragments so the portrait reads as broken and remade.",
    collection: "Fragments",
    order: 10,
    featured: true,
  },
  {
    id: "fragments-darkness",
    seq: "01",
    title: "Darkness",
    medium: "Charcoal on paper",
    image: "/art/fragments-darkness.webp",
    width: 1400,
    height: 1794,
    alt: "Charcoal drawing from the Fragments series, titled Darkness.",
    collection: "Fragments",
    order: 11,
  },
  {
    id: "fragments-lament",
    seq: "04",
    title: "Lament",
    medium: "Charcoal on paper",
    image: "/art/fragments-lament.webp",
    width: 1400,
    height: 1810,
    alt: "Charcoal drawing from the Fragments series, titled Lament.",
    collection: "Fragments",
    order: 14,
  },
  {
    id: "fragments-indifference",
    seq: "07",
    title: "Indifference",
    medium: "Charcoal on paper",
    image: "/art/fragments-indifference.webp",
    width: 1400,
    height: 1741,
    alt: "Charcoal drawing from the Fragments series, titled Indifference.",
    collection: "Fragments",
    order: 17,
  },
  {
    id: "fragments-verse-for-her",
    seq: "10",
    title: "verse for her",
    medium: "Charcoal on paper",
    image: "/art/fragments-verse-for-her.webp",
    width: 1400,
    height: 1797,
    alt: "Charcoal drawing from the Fragments series, titled verse for her.",
    collection: "Fragments",
    order: 20,
  },
  {
    id: "fragments-tumor",
    seq: "11",
    title: "Tumor",
    medium: "Charcoal on paper",
    image: "/art/fragments-tumor.webp",
    width: 1400,
    height: 1878,
    alt: "Charcoal drawing from the Fragments series, titled Tumor.",
    collection: "Fragments",
    order: 21,
  },
  {
    id: "fragments-time",
    seq: "14",
    title: "Time",
    medium: "Charcoal on paper",
    image: "/art/fragments-time.webp",
    width: 1400,
    height: 1796,
    alt: "Charcoal drawing from the Fragments series, titled Time.",
    collection: "Fragments",
    order: 24,
  },
  {
    id: "fragments-rage",
    seq: "15",
    title: "Rage",
    medium: "Charcoal on paper",
    image: "/art/fragments-rage.webp",
    width: 1400,
    height: 1796,
    alt: "Charcoal drawing from the Fragments series, titled Rage.",
    collection: "Fragments",
    order: 25,
  },
  {
    id: "fragments-broken",
    seq: "16",
    title: "Broken",
    medium: "Charcoal on paper",
    image: "/art/fragments-broken.webp",
    width: 1400,
    height: 1797,
    alt: "Charcoal drawing from the Fragments series, titled Broken.",
    collection: "Fragments",
    order: 26,
  },
  {
    id: "fragments-pride",
    seq: "20",
    title: "Pride",
    medium: "Charcoal on paper",
    image: "/art/fragments-pride.webp",
    width: 1400,
    height: 1800,
    alt: "Charcoal drawing from the Fragments series, titled Pride.",
    collection: "Fragments",
    order: 30,
  },
  {
    id: "fragments-21-days",
    seq: "21",
    title: "21 Days",
    medium: "Charcoal on paper",
    image: "/art/fragments-21-days.webp",
    width: 1400,
    height: 1792,
    alt: "Charcoal drawing from the Fragments series, titled 21 Days.",
    collection: "Fragments",
    order: 31,
  },
  {
    id: "fragments-retching",
    seq: "22",
    title: "Retching",
    medium: "Charcoal on paper",
    image: "/art/fragments-retching.webp",
    width: 1400,
    height: 1797,
    alt: "Charcoal drawing from the Fragments series, titled Retching.",
    collection: "Fragments",
    order: 32,
  },
  {
    id: "fragments-value",
    seq: "23",
    title: "Value",
    medium: "Charcoal on paper",
    image: "/art/fragments-value.webp",
    width: 1400,
    height: 1795,
    alt: "Charcoal drawing from the Fragments series, titled Value.",
    collection: "Fragments",
    order: 33,
  },
  {
    id: "fragments-vow-renewal",
    seq: "25",
    title: "Vow Renewal",
    medium: "Charcoal on paper",
    image: "/art/fragments-vow-renewal.webp",
    width: 1400,
    height: 1798,
    alt: "Charcoal drawing from the Fragments series, titled Vow Renewal.",
    collection: "Fragments",
    order: 35,
  },
];

/** The whole collection in display order. */
export const galleryArtworks: Artwork[] = [...artworks].sort(
  (a, b) => a.order - b.order,
);

/** Standalone works (everything that is not part of the Fragments series). */
export const standaloneArtworks: Artwork[] = galleryArtworks.filter(
  (a) => a.collection !== "Fragments",
);

/** The Fragments charcoal series, in order. */
export const fragmentsArtworks: Artwork[] = galleryArtworks.filter(
  (a) => a.collection === "Fragments",
);
