/**
 * Narratives — story strategy for the performing arts.
 *
 * Katie's second venture, deliberately separate from GreenRoom: GreenRoom is
 * the inside of the organization (donors, giving, the transaction), Narratives
 * is the outside (the story of the art as it reaches the public).
 *
 * Page order: the argument comes before the deliverables. Leading with the
 * list makes the engagement read as a fixed package, which it isn't. The
 * deliverables are named plainly once the reader knows why they exist.
 *
 * House rules for everything in this file: no em dashes, short declarative
 * sentences, no consulting or SaaS vocabulary. Never describe the deliverables
 * as templates, and never imply the client receives exactly five files and
 * nothing else. All copy lives here so the page can move to its own domain.
 */

export interface Movement {
  index: string;
  name: string;
  question: string;
  body: string;
}

/** One named deliverable in the core set. */
export interface PlanDocument {
  index: string;
  title: string;
  subtitle: string;
  body: string;
}

/** One step of the client-facing process. */
export interface Step {
  index: string;
  title: string;
  body: string;
}

export interface Audience {
  role: string;
  body: string;
}

/** A published piece of campaign work, linked out to YouTube. */
export interface Sample {
  youtube: string;
  label: string;
  title: string;
}

export interface Detail {
  title: string;
  body: string;
}

export const narratives = {
  eyebrow: "Narratives",
  byline: "A campaign method by Katie Spencer",

  /* 1 · Hero ------------------------------------------------------------ */
  headline: {
    lead: "Story strategy for the",
    accent: "performing arts.",
  },
  promise: "Turn a season into something audiences want to step inside.",
  intro:
    "Narratives gives small arts teams the story strategy and campaign plan they don't have the hours to build from scratch. One season, written for your organization.",
  primaryCta: { label: "Build my season plan", href: "/contact" },

  /* 2 · Why Narratives exists ------------------------------------------- */
  problem: {
    eyebrow: "Why Narratives exists",
    statement: {
      lead: "Most arts marketing markets",
      accent: "information.",
    },
    body: "Dates, casts, ticket links, artistic bios, an evening of. It is marketing aimed at people who already know they want to come.",
    turn: "Some people aren't staying away because they dislike the art. They're staying away because they aren't sure they know how to belong there.",
    fearsLead: "What that hesitation actually sounds like:",
    fears: [
      "Not understanding the work.",
      "Not knowing the etiquette, or the context.",
      "Feeling culturally out of place.",
      "Worrying they won't get it.",
      "Not knowing what to expect.",
    ],
    close:
      "Almost nobody in the field says this out loud, because saying it feels like an insult to the art. So we keep making prettier posters.",
  },

  belief: {
    quote: "Lower the social friction without lowering the art.",
    // Careful: "removes thresholds, not depth" belongs to "What it isn't".
    // Saying it here too spends the line twice.
    support:
      "People engage more deeply once they feel confident enough to participate. And audiences do not connect to information first. They connect to feeling first.",
  },

  /* 3 · How it works ---------------------------------------------------- */
  process: {
    eyebrow: "How it works",
    title: "Three steps, one season.",
    lead: "What the work looks like from your side.",
    steps: [
      {
        index: "01",
        title: "Understand the season",
        body: "What you're producing, who you want to reach, what your audience already understands, and where the friction actually is.",
      },
      {
        index: "02",
        title: "Find the story",
        body: "The Narratives framework locates the emotional entry point, the world, the audience bridge, the momentum, and the invitation.",
      },
      {
        index: "03",
        title: "Build what the team needs",
        body: "The strategy becomes the plans, creative direction, messaging, and tools that will actually help you execute the season.",
      },
    ] satisfies Step[],
  },

  /* 4 · The method ------------------------------------------------------ */
  method: {
    eyebrow: "The method",
    title: "Five movements, one experience.",
    lead: "The three steps are what the work looks like. This is how the thinking works underneath it. Nothing gets written until all five are answered.",
  },

  movements: [
    {
      index: "01",
      name: "Spark",
      question: "Why should anyone care?",
      body: "The human truth at the center of the work, and the reason it matters to someone who has never heard of it.",
    },
    {
      index: "02",
      name: "World",
      question: "What are we inviting people into?",
      body: "The atmosphere and cultural register of the production, treated as a world to inhabit rather than a program to attend.",
    },
    {
      index: "03",
      name: "Bridge",
      question: "How do we make people feel included?",
      body: "The invisible thresholds come down. Language, ritual, expectation: the things that quietly keep newcomers at a distance.",
    },
    {
      index: "04",
      name: "Arc",
      question: "How does momentum build?",
      body: "The months and the minutes before curtain, shaped so the audience feels carried rather than marketed to.",
    },
    {
      index: "05",
      name: "Invitation",
      question: "Why does this matter right now?",
      body: "The reason this work exists in this season, in this city, in this cultural moment.",
    },
  ] satisfies Movement[],

  /* 5 · The core deliverables ------------------------------------------- */
  deliverable: {
    eyebrow: "The core deliverables",
    title: "A framework, not a formula.",
    lead: "Every Narratives engagement is built around a core set of strategic deliverables, then shaped to the needs of your season, team, and audience.",
    flexibility:
      "Depending on the organization, the final package may also include campaign messaging, production-specific concepts, content direction, audience guides, launch plans, or other tools needed to make the strategy usable.",
  },

  documents: [
    {
      index: "01",
      title: "Audience & friction audit",
      subtitle: "The diagnostic",
      body: "Where people are getting stuck, what barriers are shaping behavior, and where the clearest opportunities are.",
    },
    {
      index: "02",
      title: "Narrative strategy",
      subtitle: "The emotional center",
      body: "The emotional center of the season, and the story that connects the work to the audience.",
    },
    {
      index: "03",
      title: "Visual world brief",
      subtitle: "The atmosphere",
      body: "The atmosphere, aesthetic direction, tone, and creative world the campaign should live in.",
    },
    {
      index: "04",
      title: "Momentum map",
      subtitle: "The rhythm",
      body: "How the season builds over time, including campaign rhythm, audience onboarding, urgency, and return invitations.",
    },
    {
      index: "05",
      title: "Budget strategy",
      subtitle: "The fuel",
      body: "Where marketing resources should work hardest, and what deserves priority, amplification, or restraint.",
    },
  ] satisfies PlanDocument[],

  /* 6 · Proof ----------------------------------------------------------- */
  proof: {
    eyebrow: "An example",
    title: "Knoxville Opera",
    lead: "One season strategy, start to finish. Not a preview of what yours will look like, but a sense of how far the thinking goes.",
    chain: [
      "A family inheritance comedy",
      "A synopsis told as a lunch between friends",
      "Reality-TV character confessionals",
      "A Behind the Music conversation",
      "A dated campaign calendar",
    ],
    body: [
      "Gianni Schicchi is a one-act comedy about a family scheming over a will. A hard sell to anyone who has never bought an opera ticket. So the campaign didn't sell the opera. The synopsis became a lunch between friends. The characters gave reality-TV confessionals, one at a time, in costume. And the people who made it sat down for a Behind the Music conversation, for anyone who wanted to go deeper.",
      "Underneath sat the whole package: the audit, the narrative strategy, the visual world, the momentum map, the budget, and campaign copy written for the production itself. Then the unglamorous half that makes it real. The shot list, the cast and crew list, the hour-by-hour media day schedule, and a dated posting plan across social, email, and YouTube.",
    ],
    quote: "The strategy doesn't stop at language. It gets made.",
  },

  samples: {
    eyebrow: "See it in practice",
    title: "The campaign, as it actually ran.",
    items: [
      {
        youtube: "0Ap9-34BuAI",
        label: "Reel · Synopsis",
        title: "Gianni Schicchi Synopsis: Girls Lunch",
      },
      {
        youtube: "Y4kyen1P47k",
        label: "Reel · Character series",
        title: "Confession: Simone",
      },
      {
        youtube: "ZqJPkheBt-4",
        label: "Film · Audience education",
        title: "Behind the Music of Gianni Schicchi",
      },
    ] satisfies Sample[],
    more: { label: "See all the work", href: "/portfolio" },
  },

  /* 7 · Why Katie ------------------------------------------------------- */
  whyKatie: {
    eyebrow: "Why me",
    title: {
      lead: "This isn't theory turned into a product. It's a working practice",
      accent: "written down.",
    },
    quote:
      "Anyone can generate arts marketing copy. Almost nobody selling into this field has actually run the season, cast the media day, argued about the poster, and watched what made a first-timer buy a ticket.",
    body: "Years inside performing arts administration, running the marketing, casting the shoots, and watching what moved real ticket buyers. The method came out of that work, not from outside the field looking in.",
  },

  /* 8 · What it isn't --------------------------------------------------- */
  isNot: {
    eyebrow: "What it isn't",
    items: [
      {
        title: "Not dumbing anything down.",
        body: "It removes thresholds, not depth.",
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

  /* 9 · Who it's for ---------------------------------------------------- */
  audience: {
    eyebrow: "Who it's for",
    title: "The strategy layer between the art and the audience.",
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
        role: "Producers",
        body: "Connecting what happens on the stage to what happens in the room, and in the city.",
      },
      {
        role: "Artistic leaders",
        body: "Shaping how the audience and the artist actually meet.",
      },
    ] satisfies Audience[],
    beneficiary:
      "But the person it's really for is the one who has never been, and quietly assumes it isn't for them.",
  },

  /* 10 · Engagement details --------------------------------------------- */
  engagement: {
    eyebrow: "Engagement details",
    title: "What working together looks like.",
    items: [
      {
        title: "Built around your season",
        body: "Designed around the specific repertoire, audience, team, and challenges in front of you.",
      },
      {
        title: "Core strategy, tailored output",
        body: "Every engagement uses the Narratives framework, but the final tools and scope are shaped around what your organization actually needs.",
      },
      {
        title: "Collaborative, not meeting heavy",
        body: "You provide the season context, the goals, the audience information, and the constraints. I do the strategic build.",
      },
      {
        title: "Timing",
        body: "Usually one week to a month. The pace depends less on the build than on how quickly your team can get me the season context, the goals, and the constraints.",
      },
    ] satisfies Detail[],
    /**
     * Given prominence below the grid rather than as a fifth tile: it is the
     * question every buyer is actually holding, and a five-up grid would have
     * left it ragged.
     */
    investment: {
      label: "Investment",
      body: "Engagements typically range from $1,000 to $4,500+, depending on season size, scope, and what your team needs.",
    },
  },

  /* 11 · Close ---------------------------------------------------------- */
  cta: {
    eyebrow: "Start here",
    title: "Let's build the story of your season.",
    body: "Tell me what's in your season and where you think people are getting stuck. If it's a fit, I'll build you the plan.",
    primary: { label: "Build my season plan", href: "/contact" },
    secondary: { label: "See the work", href: "/portfolio" },
  },
};
