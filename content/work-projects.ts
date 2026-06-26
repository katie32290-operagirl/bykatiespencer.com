/**
 * Work page — real projects with real media. Cards link to the actual artifact
 * (YouTube film, the program-book PDF, greenroomcrm.com). `tags` drive the
 * category filter; `label` is the line shown on the card.
 */
export const workCategories = [
  "All",
  "Brand & Campaigns",
  "Film & Video",
  "Experiences & Events",
  "Print & Design",
] as const;

export const workFeatured = {
  label: "Brand & Campaign",
  title: "Knoxville Opera",
  lede: "Reimagining a 47-year-old opera company for a new generation.",
  story:
    "A bold rebrand and sharper storytelling doubled first-time attendance and grew revenue per show 27% — and La Bohème became the best-selling production in company history.",
  statValue: "+101%",
  statLabel: "first-time attendees / show",
  image: "/work/work-featured.jpg",
  href: "https://www.youtube.com/watch?v=LW18K-g2zmo",
  cta: "See the case study",
  tags: ["Brand & Campaigns"],
};

export interface WorkProject {
  title: string;
  subtitle: string;
  label: string;
  tags: string[];
  youtube?: string;
  image?: string;
  dark?: boolean;
  href: string;
  cta: string;
}

export const workProjects: WorkProject[] = [
  {
    title: "Carmen, Explained in 60 Seconds",
    subtitle: "Making opera approachable for everyone.",
    label: "Film & Video",
    tags: ["Film & Video", "Brand & Campaigns"],
    youtube: "LW18K-g2zmo",
    href: "https://www.youtube.com/watch?v=LW18K-g2zmo",
    cta: "Watch the film",
  },
  {
    title: "City Lyric Opera",
    subtitle: "A production trailer from the company I co-founded in New York.",
    label: "Film & Video",
    tags: ["Film & Video", "Experiences & Events"],
    youtube: "J9rGZCJzTtY",
    href: "https://www.youtube.com/watch?v=J9rGZCJzTtY",
    cta: "Watch the trailer",
  },
  {
    title: "Couture for a Cause",
    subtitle: "A fundraising gala that feels like an experience, not an ask.",
    label: "Experiences & Events",
    tags: ["Experiences & Events"],
    youtube: "xsYWaTxkcW4",
    href: "https://www.youtube.com/watch?v=xsYWaTxkcW4",
    cta: "Watch the recap",
  },
  {
    title: "Opera Ball",
    subtitle: "The signature gala — an evening designed to move people.",
    label: "Experiences & Events",
    tags: ["Experiences & Events", "Film & Video"],
    youtube: "kHryFCWRDAY",
    href: "https://www.youtube.com/watch?v=kHryFCWRDAY",
    cta: "Watch the recap",
  },
  {
    title: "2025–26 Season Program Book",
    subtitle: "A season of stories, beautifully told.",
    label: "Print & Design",
    tags: ["Print & Design"],
    image: "/work/ko-program-book.jpg",
    href: "/work/ko-program-book.pdf",
    cta: "View the book",
  },
  {
    title: "Annual Fund Appeal",
    subtitle: "A year-end mailer that makes the case for giving.",
    label: "Print & Design",
    tags: ["Print & Design"],
    image: "/work/print-annual-fund.jpg",
    href: "/work/ko-annual-fund-appeal.pdf",
    cta: "View the mailer",
  },
  {
    title: "Social Storytelling",
    subtitle: "Short-form content that builds community and drives engagement.",
    label: "Social Campaigns",
    tags: ["Film & Video", "Brand & Campaigns"],
    youtube: "0Ap9-34BuAI",
    href: "https://www.youtube.com/shorts/0Ap9-34BuAI",
    cta: "Watch a reel",
  },
  {
    title: "GreenRoom",
    subtitle: "A CRM built for the performing arts, by people who get it.",
    label: "Ventures",
    tags: ["Ventures"],
    image: "/work/work-greenroom-app.jpg",
    href: "https://greenroomcrm.com",
    cta: "Visit GreenRoom",
  },
  {
    title: "Behind the Music",
    subtitle: "Stories that deepen connection between artists and audiences.",
    label: "Film & Education",
    tags: ["Film & Video"],
    youtube: "ZqJPkheBt-4",
    href: "https://www.youtube.com/watch?v=ZqJPkheBt-4",
    cta: "Watch the film",
  },
  {
    title: "Meeting the Moment",
    subtitle: "A film about why live performance still matters.",
    label: "Film & Video",
    tags: ["Film & Video", "Brand & Campaigns"],
    youtube: "sFTJvKsy97I",
    href: "https://www.youtube.com/watch?v=sFTJvKsy97I",
    cta: "Watch the film",
  },
  {
    title: "Honoring George Bitzas",
    subtitle: "A tribute film for the Opera Ball honoree.",
    label: "Film & Video",
    tags: ["Film & Video", "Experiences & Events"],
    youtube: "yHaSkgQCKOw",
    href: "https://www.youtube.com/watch?v=yHaSkgQCKOw",
    cta: "Watch the tribute",
  },
  {
    title: "Confessions: Simone",
    subtitle: "An in-character confessional, straight to camera.",
    label: "Film & Video",
    tags: ["Film & Video", "Brand & Campaigns"],
    youtube: "Y4kyen1P47k",
    href: "https://www.youtube.com/shorts/Y4kyen1P47k",
    cta: "Watch the reel",
  },
  {
    title: "Pirates: Opening Night",
    subtitle: "The buzz of a sold-out opening, captured.",
    label: "Film & Video",
    tags: ["Film & Video", "Experiences & Events"],
    youtube: "D5f847ntDYw",
    href: "https://www.youtube.com/shorts/D5f847ntDYw",
    cta: "Watch the reel",
  },
  {
    title: "Confessions: La Ciesca",
    subtitle: "A character speaks her mind, up close.",
    label: "Film & Video",
    tags: ["Film & Video", "Brand & Campaigns"],
    youtube: "3sJYs3yAwVE",
    href: "https://www.youtube.com/shorts/3sJYs3yAwVE",
    cta: "Watch the reel",
  },
  {
    title: "MyNanny: The Interview",
    subtitle: "A guide that helps families and nannies meet well.",
    label: "Brand & Systems",
    tags: ["Print & Design"],
    image: "/work/mynanny-interview.jpg",
    href: "/work/mynanny-interview.pdf",
    cta: "View the guide",
  },
  {
    title: "MyNanny: Onboarding",
    subtitle: "A warm, clear welcome into the MyNanny family.",
    label: "Brand & Systems",
    tags: ["Print & Design"],
    image: "/work/mynanny-onboarding.jpg",
    href: "/work/mynanny-onboarding.pdf",
    cta: "View the guide",
  },
  {
    title: "MyNanny: Trial Day",
    subtitle: "Setting families and nannies up for a great first day.",
    label: "Brand & Systems",
    tags: ["Print & Design"],
    image: "/work/mynanny-trial.jpg",
    href: "/work/mynanny-trial.pdf",
    cta: "View the guide",
  },
];
