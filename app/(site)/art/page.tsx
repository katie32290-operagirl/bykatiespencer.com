import type { Metadata } from "next";
import { ArtRedesign } from "@/components/redesign/art";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Art",
  description:
    "Things I've made. A personal archive of Katie Spencer's drawings and paintings, some finished and some not, collected along the way.",
  path: "/art",
});

export default function ArtIndex() {
  return <ArtRedesign />;
}
