/**
 * "Chapters" — the career as a narrative arc, not a portfolio. Each chapter is a
 * moment that led to the next: the stage → the leap → the institution → the
 * build → what's next.
 */
export interface Chapter {
  num: string;
  title: string;
  label?: string;
  /** One-line summary used in the homepage Chapters index. */
  blurb?: string;
  subtitle?: string;
  body: string;
  image: string;
  href?: string;
}

export const chapters: Chapter[] = [
  {
    num: "01",
    title: "The Stage",
    label: "Opera",
    blurb: "Where I learned belief begins with a story well told.",
    subtitle: "Where I learned belief begins with a story well told.",
    body: "Years performing opera taught me the lesson behind everything I build: a story doesn't just inform people, it moves them. Performance is where I first felt how belief takes hold — in a room, in a body, in a single held note.",
    image: "/chapter-stage.jpg",
  },
  {
    num: "02",
    title: "The Leap",
    label: "City Lyric Opera",
    blurb: "Co-founding a company from nothing.",
    body: "Co-founding a company from nothing taught me that belief is built, not waited for. I learned to gather people around an idea before it fully existed — and found I loved creating the vessel as much as performing inside it.",
    image: "/chapter-leap.jpg",
    href: "https://www.youtube.com/watch?v=J9rGZCJzTtY",
  },
  {
    num: "03",
    title: "Growing an Institution",
    label: "Knoxville Opera",
    blurb: "Strategy only works when a story carries it.",
    body: "Leading fundraising and marketing taught me that strategy only works when a story carries it. People don't invest in budgets or buy tickets to logistics — they give themselves to a narrative they want to belong to.",
    image: "/chapter-knoxville.jpg",
  },
  {
    num: "04",
    title: "Building the Future",
    label: "GreenRoom",
    blurb: "Belief has to scale.",
    body: "Building software taught me that belief has to scale. GreenRoom turns hard-won lessons about arts organizations into tools they use every day — the infrastructure a story needs to keep being told.",
    image: "/chapter-greenroom-machine.jpg",
    href: "https://greenroomcrm.com",
  },
  {
    num: "05",
    title: "What's Next",
    label: "Still being written",
    blurb: "How technology and story shape each other.",
    body: "Now I'm exploring how technology and story shape each other — across writing, speaking, and projects still taking form. Every chapter taught me the same thing: the medium keeps changing, but the work stays building something people believe in.",
    image: "/chapter-narratives-spiral.jpg",
  },
];
