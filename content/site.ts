import type { SiteConfig } from "@/types";

export const site: SiteConfig = {
  name: "Katie Spencer",
  shortName: "KS",
  domain: "bykatiespencer.com",
  url: "https://bykatiespencer.com",
  title: "Katie Spencer · Storyteller, Builder & Founder",
  tagline:
    "I help ideas become stories people can see, feel, and believe in — sometimes a company, sometimes a campaign, an event, a keynote, a product, or a book. The medium changes. The mission doesn't.",
  description:
    "Katie Spencer is a storyteller, builder, and founder helping ideas become things people believe in — across companies, writing, speaking, and the stories still taking shape. Stories build what strategy alone can't.",
  // Her own Instagram bio — a human thread, not a résumé.
  arc: ["Opera singer", "Arts admin", "Mother", "Founder"],
  email: "hello@bykatiespencer.com",
  location: "Knoxville, TN",
  nav: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/portfolio" },
    { label: "Writing", href: "/writing" },
    { label: "Collaborate", href: "/work-with-me" },
    { label: "Connect", href: "/contact" },
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/bykatiespencer",
      icon: "instagram",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/katie-spencer-83565066/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:hello@bykatiespencer.com",
      icon: "mail",
    },
  ],
  ogImage: "/og.png",
};
