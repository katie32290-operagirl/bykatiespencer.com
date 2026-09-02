import type { Metadata } from "next";
import { NotesRedesign } from "@/components/redesign/notes";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Notes",
  description:
    "Notes from the house: essays and observations by Katie Spencer on art, story, audience, and the work of building things.",
  path: "/writing",
});

export default function WritingIndex() {
  return <NotesRedesign />;
}
