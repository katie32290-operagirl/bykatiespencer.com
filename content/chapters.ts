/**
 * "Chapters" — the career as a narrative arc, not a portfolio. Each chapter is a
 * moment that led to the next: the stage → the leap → the institution → the
 * build → what's next.
 */
export interface Chapter {
  num: string;
  title: string;
  label?: string;
  subtitle?: string;
  body: string;
  image: string;
  href?: string;
}

export const chapters: Chapter[] = [
  {
    num: "01",
    title: "The Stage",
    subtitle: "Where I first discovered the power of storytelling.",
    body: "Years spent performing opera taught me that great stories don't just entertain people. They change how people feel, remember, and connect. This is the beginning of everything.",
    image: "/chapter-stage.jpg",
  },
  {
    num: "02",
    title: "The Leap",
    label: "City Lyric Opera",
    body: "My first nonprofit. My first experience building something from the ground up. The place where I realized I loved creating organizations just as much as performing inside them.",
    image: "/chapter-leap.jpg",
    href: "https://www.youtube.com/watch?v=J9rGZCJzTtY",
  },
  {
    num: "03",
    title: "Growing an Institution",
    label: "Knoxville Opera",
    body: "Leading fundraising, marketing, audience development, and organizational growth taught me how creativity and strategy work best together.",
    image: "/chapter-knoxville.jpg",
  },
  {
    num: "04",
    title: "Building the Future",
    label: "GreenRoom",
    body: "Creating software specifically for performing arts organizations by combining fundraising, marketing, ticketing, operations, and AI into one platform.",
    image: "/chapter-greenroom-machine.jpg",
    href: "https://greenroomcrm.com",
  },
  {
    num: "05",
    title: "What's Next",
    label: "Narratives",
    body: "Exploring how AI can help mission-driven organizations communicate with greater clarity, consistency, and authenticity.",
    image: "/chapter-narratives-spiral.jpg",
  },
];
