import type { Metadata } from "next";
import { WorkRedesign } from "@/components/redesign/work";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description:
    "From strategy to story to production: films, campaigns, experiences, and design that get people to care, show up, and come back.",
  path: "/portfolio",
});

export default function WorkPage() {
  return <WorkRedesign />;
}
