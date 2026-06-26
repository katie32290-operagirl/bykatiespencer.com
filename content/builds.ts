/**
 * "Things I build" — the ventures, institutions, and platforms Katie creates.
 * Image cards; GreenRoom is a dark brand card that links out.
 */
export interface Build {
  title: string;
  subtitle?: string;
  image?: string;
  youtube?: string;
  dark?: boolean;
  /** Full brand-logo tile — render the image alone, no gradient/title overlay. */
  brand?: boolean;
  href?: string;
}

export const builds: Build[] = [
  {
    title: "GreenRoom",
    subtitle: "The CRM built specifically for performing arts organizations.",
    image: "/work/build-greenroom-brand.png",
    brand: true,
    href: "https://greenroomcrm.com",
  },
  {
    title: "Narratives",
    subtitle: "An AI-powered storytelling platform for mission-driven organizations.",
    image: "/work/build-narratives-brand.png",
    brand: true,
  },
  {
    title: "Knoxville Opera",
    image: "/work/build-knoxville-carmen.jpg",
  },
  {
    title: "City Lyric Opera",
    image: "/work/build-citylyric-poster.jpg",
    href: "https://www.youtube.com/watch?v=J9rGZCJzTtY",
  },
  {
    title: "Speaking",
    subtitle:
      "Conversations about storytelling, leadership, creativity, and building organizations people believe in.",
    image: "/work/build-speaking-mic.jpg",
  },
];
