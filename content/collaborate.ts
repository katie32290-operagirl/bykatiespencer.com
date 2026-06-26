/** Collaborate page — process steps and engagement formats (with lucide icons). */
export interface ProcessStep {
  step: string;
  title: string;
  icon: "message" | "search" | "pen" | "star";
  body: string;
}

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Listen",
    icon: "message",
    body: "We start by getting to know your mission, goals, audience, and what success looks like.",
  },
  {
    step: "02",
    title: "Uncover",
    icon: "search",
    body: "We identify the story at the core and the opportunities that will make the biggest impact.",
  },
  {
    step: "03",
    title: "Shape",
    icon: "pen",
    body: "We create the strategy, messaging, and creative direction, then build the right assets to bring it to life.",
  },
  {
    step: "04",
    title: "Bring it forward",
    icon: "star",
    body: "We launch with intention, refine based on what we learn, and build momentum that lasts.",
  },
];

export interface Format {
  title: string;
  icon: "target" | "message" | "mic";
  body: string;
  bestWhen: string;
}

/** Mirrors the Connect page "ways to work together" so the two pages stay consistent. */
export const formats: Format[] = [
  {
    title: "Projects",
    icon: "target",
    body: "For launches, campaigns, fundraising experiences, and creative direction.",
    bestWhen: "You know what needs to be built.",
  },
  {
    title: "Advising",
    icon: "message",
    body: "A strategic thought partner for leadership conversations, positioning, messaging, and big decisions.",
    bestWhen: "You need clarity before execution.",
  },
  {
    title: "Speaking",
    icon: "mic",
    body: "Workshops, retreats, conference sessions, and keynote presentations on storytelling, creativity, fundraising, and leadership.",
    bestWhen: "You want to inspire or equip a team.",
  },
];
