/**
 * Shared content types.
 *
 * Every entry in `content/*` conforms to one of these interfaces. When the site
 * migrates to a real CMS (Sanity, Contentful, Notion), only the data-fetching
 * layer changes — components keep consuming these exact shapes.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** lucide-react icon name, resolved in the component layer */
  icon: "instagram" | "linkedin" | "mail" | "globe";
}

export interface ExperienceItem {
  slug: string;
  role: string;
  organization: string;
  /** e.g. "2022 — Present" */
  period: string;
  /** sortable start year, newest first */
  startYear: number;
  location?: string;
  summary: string;
  highlights: string[];
  /** optional act label for the career-arc narrative */
  act?: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  /** short label shown on cards, e.g. "Season Narrative" */
  category: string;
  year: string;
  /** one-line teaser for cards */
  excerpt: string;
  /** longer intro for the detail page */
  overview: string;
  role: string;
  /** headline outcomes */
  metrics?: { label: string; value: string }[];
  tags: string[];
  /** detail-page narrative blocks */
  sections?: { heading: string; body: string }[];
  featured?: boolean;
  /** optional cover image path in /public */
  cover?: string;
}

export interface Service {
  slug: string;
  title: string;
  /** lucide-react icon name */
  icon: string;
  summary: string;
  deliverables?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  category: string;
  /** markdown-ish body, rendered as paragraphs for now */
  body: string[];
  featured?: boolean;
}

export interface CampaignAsset {
  kind: "video" | "image";
  title: string;
  /** short context label, e.g. "Video · Social campaign" */
  label: string;
  /** YouTube id (kind: video) */
  youtube?: string;
  /** Vimeo id (kind: video) */
  vimeo?: string;
  /** vertical (IG/Reels) vs standard widescreen */
  orientation?: "landscape" | "portrait";
  /** image path in /public (kind: image) */
  src?: string;
  alt?: string;
  /** controls the card frame shape */
  aspect?: "video" | "poster" | "wide";
  /** optional link (e.g. a PDF to open) */
  href?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  organization: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  domain: string;
  url: string;
  title: string;
  tagline: string;
  description: string;
  /** the career-arc line from her own voice */
  arc: string[];
  email: string;
  location: string;
  nav: NavItem[];
  socials: SocialLink[];
  ogImage: string;
}
