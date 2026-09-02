import type { Metadata } from "next";
import { AboutRedesign } from "@/components/redesign/about";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "I've performed on opera stages, co-founded a company, helped lead an institution, and now I'm building software. The medium keeps changing. The work doesn't. I build things people believe in.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutRedesign />;
}
