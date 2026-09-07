import type { Metadata } from "next";
import { SeasonPlanner } from "@/components/redesign/season-planner";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Your Season, Built for You",
    description:
      "Put in your dates. Get your whole year back. The Season Year at a Glance calculator merges the donor rhythm, the season marketing timeline, and the event countdowns into one operating calendar, so you can see where the year collides before it does. The bundle-exclusive tool from The Small Arts Org Operating Kit.",
    path: "/season-planner",
  }),
  // Bundle-exclusive: shared with buyers, not surfaced in search.
  robots: { index: false, follow: false },
};

export default function SeasonPlannerPage() {
  return <SeasonPlanner />;
}
