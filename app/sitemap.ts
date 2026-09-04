import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...site.nav.map((n) => ({
      url: `${site.url}${n.href}`,
      changeFrequency: "monthly" as const,
      // Narratives is now in the nav, so it comes through here rather than as
      // a separate entry. It's the page most worth surfacing in search.
      priority: n.href === "/narratives" ? 0.9 : 0.8,
    })),
    // Public utility page linked from the printed Kit; worth indexing.
    { url: `${site.url}/survey`, changeFrequency: "monthly" as const, priority: 0.7 },
    // Note: /knoxville-opera is intentionally noindex'd (internal case study),
    // so it's deliberately kept OUT of the sitemap to avoid contradictory signals.
  ];

  return staticRoutes.map((r) => ({ lastModified: now, ...r }));
}
