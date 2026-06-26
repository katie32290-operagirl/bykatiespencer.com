import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Build per-page metadata from a small set of inputs while inheriting sane
 * Open Graph / Twitter defaults. metadataBase is set on the root layout.
 */
export function createMetadata({
  title,
  description = site.description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = title ? `${title} — ${site.name}` : site.title;

  // OG/Twitter images are provided site-wide by app/opengraph-image.tsx.
  return {
    title: title ?? site.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** JSON-LD: the person behind the brand. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Creative Strategist & Storyteller",
    description: site.description,
    email: site.email,
    address: {
      "@type": "PostalPlace",
      addressLocality: "Knoxville",
      addressRegion: "TN",
    },
    sameAs: site.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
    worksFor: { "@type": "Organization", name: "Knoxville Opera" },
  };
}

/** JSON-LD: the website itself. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

/** Serialize JSON-LD safely for embedding in a <script>. */
export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
