import type { Metadata } from "next";
import { ToolkitsRedesign } from "@/components/redesign/toolkits";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Toolkits",
  description:
    "Practical toolkits for small performing arts organizations: a donor program without a development director, a season sold as an invitation, and a fundraising event that nets money. By a former Director of Advancement.",
  path: "/toolkits",
});

export default function ToolkitsPage() {
  return <ToolkitsRedesign />;
}
