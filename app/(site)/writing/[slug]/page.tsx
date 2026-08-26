import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
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

/** Parse `*italic*` spans (used on their own and nested inside bold). */
function renderItalic(text: string, kp: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((p, j) =>
    p.length > 2 && p.startsWith("*") && p.endsWith("*") ? (
      <em key={`${kp}i${j}`}>{p.slice(1, -1)}</em>
    ) : (
      <Fragment key={`${kp}t${j}`}>{p}</Fragment>
    ),
  );
}

/**
 * Inline `[text](url)` links, `**bold**` (with nested `*italic*`, e.g. a header
 * carrying work titles) and standalone `*italic*`; straight apostrophes curl.
 */
function renderInline(text: string): ReactNode {
  const curled = text.replace(/'/g, "’");
  return curled
    .split(/(\[[^\]]+\]\([^)]+\)|\*\*.+?\*\*)/g)
    .map((seg, i) => {
      const link = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        return (
          <a
            key={`l${i}`}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-brand hover:text-red-deep"
          >
            {link[1]}
          </a>
        );
      }
      if (seg.length > 4 && seg.startsWith("**") && seg.endsWith("**")) {
        return (
          <strong key={`b${i}`} className="font-semibold text-foreground">
            {renderItalic(seg.slice(2, -2), `b${i}`)}
          </strong>
        );
      }
      return <Fragment key={`s${i}`}>{renderItalic(seg, `s${i}`)}</Fragment>;
    });
}

/** A quiet section break — three dots, never a literal rule. */
function Divider() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center gap-2.5 py-8 md:py-12"
    >
      <span className="size-1 rounded-full bg-brand/50" />
      <span className="size-1 rounded-full bg-brand/50" />
      <span className="size-1 rounded-full bg-brand/50" />
    </div>
  );
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const blocks = note.body.trim().split(/\n{2,}/);
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

      <article className="px-6 py-16 sm:px-14 md:py-20">
        {/* Program header — mono credits framing the piece */}
        <Reveal className="mx-auto max-w-[1180px]">
          <Link
            href="/writing"
            className="link-underline group inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-brand hover:text-red-deep"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            All notes
          </Link>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-5 border-t-2 border-foreground pt-7">
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
              {note.category} &middot; {note.date}
            </p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Words &middot; Katie Spencer
            </p>
          </div>
        </Reveal>

        {/* Title block — narrower measure for reading */}
        <Reveal className="mx-auto mt-12 max-w-[660px]" delay={0.05}>
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            {note.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(34px,5vw,60px)] leading-[1.05] text-foreground">
            {note.title}
            <span className="text-brand">.</span>
          </h1>
          {note.subtitle ? (
            <p className="mt-5 font-serif text-[clamp(20px,2.4vw,28px)] italic leading-[1.35] text-brand">
              {renderInline(note.subtitle)}
            </p>
          ) : (
            <p className="mt-6 font-serif text-xl italic leading-[1.5] text-muted-foreground">
              {renderInline(note.lead)}
            </p>
          )}
        </Reveal>

        {/* Body */}
        <Reveal className="mx-auto mt-12 max-w-[660px]" delay={0.05}>
          <div className="space-y-6 font-sans text-lg leading-[1.7] text-foreground/90">
            {blocks.map((block, i) =>
              block === "---" ? (
                <Divider key={i} />
              ) : (
                <p key={i}>{renderInline(block)}</p>
              ),
            )}
          </div>

          {/* Sign-off */}
          <div className="mt-14 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3" aria-hidden>
              <span className="h-px w-16 bg-border" />
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="h-px w-16 bg-border" />
            </div>
            <p className="font-serif text-lg italic text-muted-foreground">
              Katie Spencer
            </p>
          </div>
        </Reveal>

        {/* Author bio — a quiet line that does more for Narratives than a CTA */}
        <Reveal
          className="mx-auto mt-16 max-w-[660px] border-t border-border pt-6"
          delay={0.05}
        >
          <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            About the writer
          </p>
          <p className="mt-3 text-base leading-[1.7] text-muted-foreground">
            Katie Spencer is an opera singer turned founder in Knoxville,
            Tennessee. Through{" "}
            <Link
              href="/narratives"
              className="link-underline text-brand hover:text-red-deep"
            >
              Narratives
            </Link>
            , she helps performing arts organizations find the story inside a
            season and turn it into a reason audiences want to show up.
          </p>
        </Reveal>
      </article>

      {/* Next note — near-black */}
      {next && (
        <section className="bg-ink px-6 py-16 text-on-black sm:px-14 md:py-20">
          <Reveal className="mx-auto max-w-[1180px] border-t border-line-dark pt-8">
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
              Keep reading
            </p>
            <Link
              href={`/writing/${next.slug}`}
              className="group mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-3"
            >
              <h2 className="max-w-[760px] font-serif text-[clamp(28px,3.6vw,46px)] leading-[1.08]">
                {next.title}
                <span className="text-brand">.</span>
              </h2>
              <span className="inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
                Read
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </section>
      )}
    </>
  );
}
