import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...site.nav.map((n) => ({
      url: `${site.url}${n.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Narratives isn't in site.nav (the primary nav stays personal, not
    // product), but it's a real indexed page, so it's listed explicitly.
    { url: `${site.url}/narratives`, changeFrequency: "monthly", priority: 0.9 },
    // Note: /knoxville-opera is intentionally noindex'd (internal case study),
    // so it's deliberately kept OUT of the sitemap to avoid contradictory signals.
  ];

  return staticRoutes.map((r) => ({ lastModified: now, ...r }));
}
