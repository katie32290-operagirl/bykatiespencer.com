import type { Metadata } from "next";
import { CollaborateRedesign } from "@/components/redesign/collaborate";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Collaborate",
  description:
    "Two ways to work together on the story your season needs: Narratives, story strategy built with your team, and Toolkits, the systems packaged to run yourself.",
  path: "/collaborate",
});

export default function CollaboratePage() {
  return <CollaborateRedesign />;
}
