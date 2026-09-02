import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EssayRedesign } from "@/components/redesign/essay";
import { createMetadata, jsonLdScript } from "@/lib/seo";
import { site } from "@/content/site";
import { notes, getNote } from "@/content/writing";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return createMetadata({
    title: note.title,
    description: note.lead,
    path: `/writing/${note.slug}`,
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const next = notes.find((entry) => entry.slug !== note.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.lead,
    url: `${site.url}/writing/${note.slug}`,
    mainEntityOfPage: `${site.url}/writing/${note.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)}
      />
      <EssayRedesign note={note} next={next} />
    </>
  );
}
