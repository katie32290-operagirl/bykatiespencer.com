import type { Metadata } from "next";
import { NarrativesV2 } from "@/components/sections/narratives-v2";
import { narratives as n } from "@/content/narratives";
import { createMetadata, jsonLdScript } from "@/lib/seo";
import { site } from "@/content/site";

/**
 * Narratives — Katie's story-strategy practice for the performing arts, and
 * the only page on the site that sells an engagement rather than telling her
 * story.
 *
 * Design System v2, "House Lights": the engagement re-set as a printed
 * program. All copy lives in content/narratives.ts; the visual language lives
 * in components/sections/narratives-v2.tsx. Order is still the argument — why
 * this exists, the belief, how it runs, the method, the named deliverables,
 * the proof, and only then who it's for and how to begin.
 */
export const metadata: Metadata = createMetadata({
  title: "Narratives: Story strategy for the performing arts",
  description:
    "Narratives takes your season, finds the story audiences can enter through, and builds the campaign strategy your small team can actually execute.",
  path: "/narratives",
});

function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Narratives",
    serviceType: "Story strategy for the performing arts",
    url: `${site.url}/narratives`,
    description: n.intro,
    provider: { "@type": "Person", name: site.name, url: site.url },
    areaServed: "United States",
    audience: {
      "@type": "Audience",
      audienceType:
        "Regional opera, symphony, ballet, theatre, and festival organizations",
    },
  };
}

export default function NarrativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd())}
      />
      <NarrativesV2 />
    </>
  );
}
