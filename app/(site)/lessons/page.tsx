import type { Metadata } from "next";
import { LessonsRedesign } from "@/components/redesign/lessons";
import { createMetadata, jsonLdScript } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = createMetadata({
  title: "Piano & Voice Lessons in Knoxville",
  description:
    "Private piano lessons and voice lessons in Knoxville, TN with Katie Spencer, a singer and pianist with a Master's in vocal performance. Classical, musical theater, worship, and pop, for kids and adults of all ages.",
  path: "/lessons",
});

function lessonsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: "Katie Spencer Piano & Voice Studio",
    description:
      "Private piano and voice lessons in Knoxville, TN for children and adults, across classical, musical theater, worship, and pop.",
    url: `${site.url}/lessons`,
    areaServed: { "@type": "City", name: "Knoxville, TN" },
    founder: { "@type": "Person", name: site.name, url: site.url },
    knowsAbout: ["Piano lessons", "Voice lessons", "Vocal technique", "Music reading"],
  };
}

export default function LessonsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(lessonsJsonLd())} />
      <LessonsRedesign />
    </>
  );
}
