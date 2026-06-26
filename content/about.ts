/**
 * "What I believe" — a visual manifesto. Each card pairs one word with one
 * belief that runs through all of Katie's work, anchored by an intentional image.
 */
export interface Driver {
  label: string;
  belief: string;
  image: string;
}

export const drivers: Driver[] = [
  {
    label: "Story",
    belief: "People remember how something made them feel.",
    image: "/work/build-knoxville.jpg",
  },
  {
    label: "Clarity",
    belief: "Good strategy removes friction.",
    image: "/work/katie-team.jpg",
  },
  {
    label: "Experience",
    belief: "The smallest details shape the biggest memories.",
    image: "/work/drive-fundraising.jpg",
  },
  {
    label: "Design",
    belief: "Design communicates before words ever do.",
    image: "/work/build-narratives.jpg",
  },
  {
    label: "Community",
    belief: "The right story gives people somewhere to belong.",
    image: "/work/drive-choir.jpg",
  },
  {
    label: "Conversation",
    belief: "Nearly every good idea starts around a table.",
    image: "/work/drive-coffee.jpg",
  },
];

/** "Built on" — the career arc as a timeline, each chapter feeding the next. */
export interface Chapter {
  label: string;
  body: string;
  icon: "award" | "users" | "heart" | "rocket";
}

export const chapters: Chapter[] = [
  {
    label: "Opera Singer",
    body: "Learned the power of performance and connection.",
    icon: "award",
  },
  {
    label: "Arts Admin",
    body: "Learned how organizations work, and how they don't.",
    icon: "users",
  },
  {
    label: "Mother",
    body: "Learned patience, perspective, and what really matters.",
    icon: "heart",
  },
  {
    label: "Founder",
    body: "Bringing it all together to build what's next.",
    icon: "rocket",
  },
];
