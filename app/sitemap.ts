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
  ];

  return staticRoutes.map((r) => ({ lastModified: now, ...r }));
}
