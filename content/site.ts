import type { SiteConfig } from "@/types";

export const site: SiteConfig = {
  name: "Katie Spencer",
  shortName: "KS",
  domain: "bykatiespencer.com",
  url: "https://bykatiespencer.com",
  title: "Katie Spencer · Strategy, Storytelling & Human Connection",
  tagline:
    "I help arts organizations, nonprofits, and creative leaders uncover what makes them meaningful, then turn it into strategy, storytelling, and experiences that inspire people to care.",
  description:
    "Katie Spencer helps arts organizations, nonprofits, and creative leaders discover who they are and tell it in a way people want to belong to, through strategy, storytelling, and creative direction.",
  // Her own Instagram bio — a human thread, not a résumé.
  arc: ["Opera singer", "Arts admin", "Mother", "Founder"],
  email: "hello@bykatiespencer.com",
  location: "Knoxville, TN",
  nav: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/portfolio" },
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
