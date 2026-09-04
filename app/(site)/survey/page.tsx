import type { Metadata } from "next";
import { SurveyGenerator } from "@/components/redesign/survey";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "The Post-Show Survey",
  description:
    "Five questions, anonymous, sent the morning after. Build a ready-to-run post-show audience survey in six minutes, with the exact Google Forms settings, calculated dates, and a printable QR sign. From The Arts Marketing Kit by Katie Spencer.",
  path: "/survey",
});

export default function SurveyPage() {
  return <SurveyGenerator />;
}
