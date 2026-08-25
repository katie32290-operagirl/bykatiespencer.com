/**
 * Narratives — story strategy for the performing arts.
 *
 * Katie's second venture, deliberately separate from GreenRoom: GreenRoom is
 * the inside of the organization (donors, giving, the transaction), Narratives
 * is the outside (the story of the art as it reaches the public).
 *
 * Page order is deliberate. A marketing or executive director should know what
 * they are buying before they are asked to agree with the argument for it, so
 * "what you get" sits directly under the hero and the reasoning follows.
 *
 * House rules for everything in this file: no em dashes, short declarative
 * sentences, no consulting or SaaS vocabulary. All copy lives here so the page
 * can move to its own domain later as a file copy.
 */

export interface Movement {
  index: string;
  name: string;
  question: string;
  body: string;
}

/** One document in the season plan. */
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
    "Narratives gives small marketing teams the story strategy and campaign plan they don't have the hours to build from scratch. One season, written for your organization.",
  primaryCta: { label: "Build my season plan", href: "/contact" },

  /* 2 · What you get ---------------------------------------------------- */
  deliverable: {
    eyebrow: "What you get",
    title: "Five working documents. One clear season.",
    lead: "Written for your repertoire, your city, and your audience. Not blank templates, and not a deck that sits in a shared drive.",
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

  /* 3 · Why Narratives exists ------------------------------------------- */
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
      "Feeling unintelligent.",
      "Not knowing the etiquette, or the context.",
      "Feeling culturally out of place.",
      "The plain risk of being embarrassed.",
    ],
    close:
      "Almost nobody in the field says this out loud, because saying it feels like an insult to the art. So we keep making prettier posters.",
  },

  belief: {
    quote: "Lower the social friction without lowering the art.",
    support:
      "People engage more deeply once they feel confident enough to participate. And audiences do not connect to information first. They connect to feeling first.",
  },

  /* 4 · How it works ---------------------------------------------------- */
  process: {
    eyebrow: "How it works",
    title: "Three steps, one season.",
    lead: "What the work looks like from your side.",
    steps: [
      {
        index: "01",
        title: "Diagnose the season",
        body: "Your repertoire and your audience context go through the five movements below, one production at a time and then as a whole year.",
      },
      {
        index: "02",
        title: "Build from what has already worked",
        body: "Campaign formats, concepts, structures, and audience learnings from years of real seasons, plus the Narratives library, so nothing starts from a blank page.",
      },
      {
        index: "03",
        title: "Write the plan",
        body: "The strategy becomes five custom working documents your team can pick up and execute.",
      },
    ] satisfies Step[],
  },

  /* 5 · The method ------------------------------------------------------ */
  method: {
    eyebrow: "The method",
    title: "Five movements, one experience.",
    lead: "The three steps above are what the work looks like. This is how the thinking works underneath it. Nothing gets written until all five are answered.",
  },

  movements: [
    {
      index: "01",
      name: "Spark",
      question: "Why should anyone care?",
      body: "The human truth at the center of the work, and the reason it matters to a person who has never heard of it.",
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

  /* 6 · Proof ----------------------------------------------------------- */
  proof: {
    eyebrow: "In practice",
    title: "Gianni Schicchi",
    lead: "A one-act comedy about a family scheming over a will. A hard sell to anyone who has never bought an opera ticket.",
    /** The transformation at a glance, before the detail. */
    chain: [
      "A family inheritance comedy",
      "A synopsis told as a lunch between friends",
      "Reality-TV character confessionals",
      "A Behind the Music conversation",
      "A dated campaign calendar",
    ],
    body: [
      "So the campaign didn't sell the opera. The synopsis became a lunch between friends. The characters gave reality-TV confessionals, one at a time, in costume. And the people who made it sat down for a Behind the Music conversation, for anyone who wanted to go deeper.",
      "Plus the unglamorous half that makes it happen: the shot list, the cast and crew list, the hour-by-hour media day schedule, and a dated posting plan across social, email, and YouTube.",
    ],
    quote:
      "Every format has been shot, posted, and watched by a real audience.",
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
    body: "Years inside performing arts administration, running the marketing and the fundraising, casting the shoots, and watching what moved real ticket buyers. The method came out of that work, not from outside the field looking in.",
  },

  /* 8 · What it isn't --------------------------------------------------- */
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
        role: "Producers and artistic leaders",
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
        body: "Designed for a full season, a festival, or a single major campaign.",
      },
      {
        title: "Five custom deliverables",
        body: "Your team keeps the finished strategy and the working documents.",
      },
      {
        title: "Collaborative, not meeting heavy",
        body: "You provide the season, the audience context, the goals, and the constraints. I do the strategic build.",
      },
      {
        // Placeholder: replace with a real turnaround once one is set.
        title: "Timing",
        body: "Agreed before we start and built backward from your season calendar, so the plan lands while there is still time to run it.",
      },
    ] satisfies Detail[],
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
