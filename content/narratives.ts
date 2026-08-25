/**
 * Narratives — story strategy for the performing arts.
 *
 * Katie's second venture, deliberately separate from GreenRoom: GreenRoom is
 * the inside of the organization (donors, giving, the transaction), Narratives
 * is the outside (the story of the art as it reaches the public).
 *
 * All page copy lives here so the whole thing can move to its own domain later
 * as a copy-paste. Source of truth: the Narratives Founding Brief (v1, Aug 2026).
 */

export interface Movement {
  index: string;
  name: string;
  question: string;
  body: string;
}

export interface Pillar {
  label: string;
  title: string;
  body: string;
}

/** One document in the Season Plan deliverable set. */
export interface PlanDocument {
  index: string;
  title: string;
  subtitle: string;
  body: string;
}

export interface Audience {
  role: string;
  body: string;
}

export const narratives = {
  eyebrow: "Narratives",
  byline: "A campaign method by Katie Spencer",

  /** Hero */
  headline: {
    lead: "Story strategy for the",
    accent: "performing arts.",
  },
  promise: "Turn a season into something audiences want to step inside.",
  intro:
    "Narratives gives small marketing teams the story strategy and the campaign plan they don't have the hours to build from scratch. One season, written for your organization.",

  /** Why it exists */
  problem: {
    eyebrow: "Why it exists",
    statement: {
      lead: "The field says arts organizations struggle to reach new audiences. The real problem is that most arts marketing markets",
      accent: "information.",
    },
    body: "Dates, casts, ticket links, artistic bios, an evening of. It is marketing aimed at people who already know they want to come.",
    turn: "The people who don't come aren't staying away because of taste. They stay away out of fear.",
    fears: [
      "Of not understanding the work.",
      "Of feeling unintelligent.",
      "Of not knowing the etiquette, or the context.",
      "Of being culturally out of place.",
      "Of being embarrassed.",
    ],
    close:
      "Almost nobody in the field says this out loud, because saying it feels like an insult to the art. So we keep making prettier posters.",
  },

  /** The belief the whole product follows from */
  belief: {
    quote: "Lower the social friction without lowering the art.",
    support:
      "People engage more deeply once they feel confident enough to participate. And audiences do not connect to information first. They connect to feeling first.",
  },

  /** The Narrative Method — five movements, one experience */
  method: {
    eyebrow: "The Method",
    title: "Five movements, one experience.",
    lead: "Every engagement runs through them in order. Nothing gets written until all five are answered for your season.",
  },

  movements: [
    {
      index: "01",
      name: "Spark",
      question: "Why should anyone care?",
      body: "Find the human truth at the center of the work: the reason this story matters to a person who has never heard of it.",
    },
    {
      index: "02",
      name: "World",
      question: "What are we inviting people into?",
      body: "Define the atmosphere, the mood, the cultural register of the production as a world to inhabit, not a program to attend.",
    },
    {
      index: "03",
      name: "Bridge",
      question: "How do we make people feel included enough to engage?",
      body: "Lower the invisible thresholds. Language, ritual, expectation: the things that quietly keep newcomers at a distance.",
    },
    {
      index: "04",
      name: "Arc",
      question: "How does momentum build?",
      body: "Shape the months and the minutes before curtain so the audience feels carried rather than marketed to.",
    },
    {
      index: "05",
      name: "Invitation",
      question: "Why does this matter right now?",
      body: "Give the work a reason to exist in this season, in this city, in this cultural moment.",
    },
  ] satisfies Movement[],

  /**
   * How it works. Note the deliberate framing on the library: it is Katie's
   * private working archive, not a customer-facing product. Nothing on this
   * page may read as an offer to browse, license, or subscribe to it.
   */
  pillars: {
    eyebrow: "How it works",
    title: "One method, one plan, one season at a time.",
  },

  parts: [
    {
      label: "The method",
      title: "Five movements, in order.",
      body: "The spine of everything. It takes a production, a season, a gala, or a festival from an event you're promoting to a world you're inviting people into.",
    },
    {
      label: "My library",
      title: "Years of real seasons, written down.",
      body: "Repertoire notes, content formats, taglines, campaign structures: everything I've built, shot, posted, and watched land with an actual audience. It isn't a product you log into. It's what I draw on, so your campaign and your copy start from years of practice instead of a blank page.",
    },
    {
      label: "The season plan",
      title: "Written for your season.",
      body: "Your repertoire, your city, your audience, your budget. Custom campaign strategy and copy, in a set of documents your team can pick up and run.",
    },
  ] satisfies Pillar[],

  /**
   * The honest counterpoint. These answer the fear that making the work
   * easier to walk into means making it smaller — not "how is this different
   * from a CRM", which is an internal positioning question no marketing
   * director has ever asked.
   */
  isNot: {
    eyebrow: "What it isn't",
    items: [
      {
        title: "Not dumbing anything down.",
        body: "It removes thresholds, not depth. The art is never the thing that gets simplified.",
      },
      {
        title: "Not a content mill.",
        body: "Volume isn't the point. The right emotional entry point is.",
      },
      {
        title: "Not apologizing for opera.",
        body: "Irreverent about the framing, never about the work.",
      },
    ],
  },

  /**
   * The deliverable — the five documents that make up a season plan.
   *
   * Names, subtitles, and casing mirror the real branded templates exactly
   * (sentence case, per the design system). The Communications Calendar is
   * NOT part of the public five: it stays internal, so don't list it here.
   */
  deliverable: {
    eyebrow: "The deliverable",
    title: "Five templates, one signature.",
    lead: "Everything a small team needs to run a season without inventing it first.",
    close:
      "Yours to keep, and specific enough to hand to a designer, a videographer, or a board.",
  },

  documents: [
    {
      index: "01",
      title: "Audience & friction audit",
      subtitle: "The diagnostic",
      body: "Where your audience is getting stuck, across language, social, cultural, emotional, identity, and practical friction. Then the rewrites and the onboarding that clear it.",
    },
    {
      index: "02",
      title: "Narrative strategy",
      subtitle: "The emotional center",
      body: "The campaign premise in fifty words or fewer, then the spark, the world, the bridge, the arc, and the invitation, answered for your season.",
    },
    {
      index: "03",
      title: "Visual world brief",
      subtitle: "The atmosphere",
      body: "Atmosphere, palette, form, space, wardrobe and sound. What the season should feel like from the lobby to the last note.",
    },
    {
      index: "04",
      title: "Momentum map",
      subtitle: "The rhythm",
      body: "The emotional pacing, phase by phase, from mood reveal and first hook through opening night and the invitation to come back.",
    },
    {
      index: "05",
      title: "Budget strategy",
      subtitle: "The fuel",
      body: "Foundation, amplifiers, stretch, and defer, with a recommended allocation. What to spend on, what to skip, and the reasoning behind both.",
    },
  ] satisfies PlanDocument[],

  /** Why it's credible */
  proof: {
    eyebrow: "Why it works",
    statement: {
      lead: "This isn't theory turned into a product. It's a working practice",
      accent: "written down.",
    },
    body: [
      "Take Gianni Schicchi. A one-act comedy about a family scheming over a will, which is a hard sell to anyone who has never bought an opera ticket. So the campaign didn't sell the opera. The synopsis became a lunch between friends. The characters gave reality-TV confessionals, one at a time, in costume. And the people who made it sat down for a Behind the Music conversation for anyone who wanted to go deeper.",
      "Plus the unglamorous half that makes it happen: the shot list, the cast and crew list, the hour-by-hour media day schedule, and a dated posting plan across social, email, and YouTube.",
    ],
    quote:
      "Every format in the library has been shot, posted, and watched by a real audience.",
    close:
      "Anyone can generate arts marketing copy. Almost nobody selling into this field has actually run the season, cast the media day, argued about the poster, and watched what made a first-timer buy a ticket.",
    link: {
      label: "Watch Behind the Music of Gianni Schicchi",
      href: "https://www.youtube.com/watch?v=ZqJPkheBt-4",
    },
  },

  /** Who it's for */
  audience: {
    eyebrow: "Who it's for",
    title: "Small teams carrying a full season.",
    lead: "Small and mid-size regional opera, symphony, ballet, theatre, and festival organizations. Real seasons, real repertoire, no in-house creative department.",
    roles: [
      {
        role: "Marketing directors",
        body: "Carrying an entire season on a team of one or two. Not short on ideas. Short on hours, and on a system.",
      },
      {
        role: "Executive directors",
        body: "Repositioning an organization for a new audience, a new civic relationship, or a new era.",
      },
      {
        role: "Development directors",
        body: "Who need donor storytelling that sounds like meaning rather than need.",
      },
      {
        role: "Producers and artistic leaders",
        body: "Shaping how the audience and the artist actually meet.",
      },
    ] satisfies Audience[],
    beneficiary:
      "But the person it's really for is the one who has never been, and quietly assumes it isn't for them.",
  },

  /** Close */
  cta: {
    eyebrow: "Start here",
    title: "Let's build the story of your season.",
    body: "Tell me what's in your season and where you think people are getting stuck. If it's a fit, I'll build you the plan.",
    primary: { label: "Start a conversation", href: "/contact" },
    secondary: { label: "See the work", href: "/portfolio" },
  },
};
