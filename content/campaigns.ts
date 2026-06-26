import type { CampaignAsset } from "@/types";

/**
 * Real campaign work for Knoxville Opera — video embeds + design assets.
 * Videos embed from YouTube/Vimeo via a click-to-play facade (kept off the
 * bundle for speed). Add a video by dropping in its YouTube/Vimeo id.
 */
export const featuredVideos: CampaignAsset[] = [
  {
    kind: "video",
    youtube: "sFTJvKsy97I",
    title: "Meeting the Moment",
    label: "Film · Fundraising",
  },
  {
    kind: "video",
    youtube: "LW18K-g2zmo",
    title: "Carmen, explained in 60 seconds",
    label: "Film · Social campaign",
  },
  {
    kind: "video",
    youtube: "ZqJPkheBt-4",
    title: "Behind the Music of Gianni Schicchi",
    label: "Film · Audience education",
  },
  {
    kind: "video",
    youtube: "yHaSkgQCKOw",
    title: "George Bitzas, Opera Ball Honoree",
    label: "Film · Donor tribute",
  },
  {
    kind: "video",
    youtube: "xsYWaTxkcW4",
    title: "Couture Opera: The Art of Deception",
    label: "Film · Event recap",
  },
];

/** Vertical (Instagram / Shorts) videos. */
export const shortVideos: CampaignAsset[] = [
  {
    kind: "video",
    youtube: "0Ap9-34BuAI",
    title: "Gianni Schicchi Synopsis: Girls Lunch",
    label: "Reel · Instagram",
    orientation: "portrait",
  },
  {
    kind: "video",
    youtube: "Y4kyen1P47k",
    title: "Confession: Simone",
    label: "Reel · Character series",
    orientation: "portrait",
  },
  {
    kind: "video",
    youtube: "3sJYs3yAwVE",
    title: "Confession: La Ciesca",
    label: "Reel · Character series",
    orientation: "portrait",
  },
  {
    kind: "video",
    youtube: "D5f847ntDYw",
    title: "Pirates: Opening Night",
    label: "Reel · Instagram",
    orientation: "portrait",
  },
];

export const campaignAssets: CampaignAsset[] = [
  {
    kind: "image",
    src: "/work/ko-program-book.jpg",
    alt: "Knoxville Opera 2025–26 season program book cover",
    title: "2025–26 Season Program Book",
    label: "Program design · PDF",
    aspect: "poster",
    href: "/work/ko-program-book.pdf",
  },
];
