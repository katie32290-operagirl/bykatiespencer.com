import type { Metadata } from "next";
import { KnoxvilleOperaRedesign } from "@/components/redesign/knoxville-opera";
import { createMetadata } from "@/lib/seo";

/**
 * Unlisted Knoxville Opera impact case study, rebuilt in the warm redesign.
 * Linked only from the Work page; kept out of search and the sitemap via
 * robots: noindex. Numbers are from Katie's FY26 impact one-pager.
 */
export const metadata: Metadata = {
  ...createMetadata({
    title: "Knoxville Opera: Impact",
    description:
      "How a bold rebrand and sharper storytelling doubled first-time attendance and made La Bohème the best-selling production in company history.",
    path: "/knoxville-opera",
  }),
  robots: { index: false, follow: false },
};

export default function KnoxvilleOperaCaseStudy() {
  return <KnoxvilleOperaRedesign />;
}
