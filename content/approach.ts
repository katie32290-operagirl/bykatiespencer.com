/**
 * The "Approach" — Katie's philosophy, organized around ideas, not service
 * categories. Rendered as editorial, alternating type-led sections (no cards).
 */
export const approachStatement = {
  eyebrow: "The work",
  lead: "I don't think in tactics. I think in narratives.",
  support:
    "Organizations don't need more disconnected marketing. They need one story that gives every campaign, season, and decision a clear purpose. I find that story, then build everything around it.",
};

export interface ApproachTheme {
  index: string;
  title: string;
  body: string;
}

export const approach: ApproachTheme[] = [
  {
    index: "01",
    title: "Narrative Strategy",
    body: "Helping organizations discover the story that gives every campaign, season, and event a clear purpose.",
  },
  {
    index: "02",
    title: "Creative Direction",
    body: "Ensuring every touchpoint, from visual identity to donor experience, supports one compelling narrative.",
  },
  {
    index: "03",
    title: "Fundraising Experiences",
    body: "Designing campaigns and events that inspire generosity, because people give when they connect emotionally with the story.",
  },
  {
    index: "04",
    title: "Brand Positioning",
    body: "Helping organizations communicate with clarity, confidence, and authenticity.",
  },
];
