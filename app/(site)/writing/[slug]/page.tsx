import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata, jsonLdScript } from "@/lib/seo";
import { site } from "@/content/site";
import { notes, getNote } from "@/content/writing";

const PAD = "px-[clamp(20px,4.5vw,56px)]";

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
            className="font-medium text-red underline decoration-red/40 underline-offset-[3px] transition-colors hover:text-red-deep hover:decoration-red-deep"
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
      <span className="size-1 rounded-full bg-red/50" />
      <span className="size-1 rounded-full bg-gold/60" />
      <span className="size-1 rounded-full bg-red/50" />
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

      <article className={`${PAD} py-[clamp(40px,6vw,72px)]`}>
        {/* Back to the column */}
        <Reveal className="mx-auto max-w-[660px]">
          <Link
            href="/writing"
            className="link-underline group inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-red hover:text-red-deep"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            All notes
          </Link>
        </Reveal>

        {/* Masthead — the theatrical credits for one piece */}
        <Reveal className="mx-auto mt-8 max-w-[660px]" delay={0.05}>
          <div className="border-t-2 border-foreground pt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 font-accent text-[11px] uppercase tracking-[0.12em]">
              <span className="text-red">
                {note.category} &middot; {note.date}
              </span>
              <span className="text-ink-faint">Words &middot; Katie Spencer</span>
            </div>

            <p className="mt-9 font-accent text-[13px] uppercase tracking-[0.12em] text-red">
              {note.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(34px,5vw,60px)] font-medium leading-[1.05] text-foreground">
              {note.title}
              <span className="text-red">.</span>
            </h1>
            {note.subtitle ? (
              <p className="mt-5 font-serif text-[clamp(20px,2.4vw,28px)] italic leading-[1.35] text-red">
                {renderInline(note.subtitle)}
              </p>
            ) : (
              <p className="mt-6 font-serif text-xl italic leading-[1.5] text-muted-foreground">
                {renderInline(note.lead)}
              </p>
            )}
          </div>
        </Reveal>

        {/* Body — one clean, comfortable measure */}
        <Reveal className="mx-auto mt-[clamp(36px,5vw,56px)] max-w-[660px]" delay={0.05}>
          <div className="space-y-6 font-sans text-[18px] leading-[1.75] text-foreground/90">
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
            <span aria-hidden className="h-px w-16 bg-line" />
            <p className="font-serif text-lg italic text-muted-foreground">
              Katie Spencer
            </p>
          </div>
        </Reveal>

        {/* Author bio — a small torn clipping at the end of the piece */}
        <Reveal className="mx-auto mt-[clamp(40px,6vw,64px)] max-w-[660px]" delay={0.05}>
          <div
            className="relative flex flex-wrap items-start gap-5 border border-line bg-paper-bright p-[clamp(16px,2.4vw,24px)] text-ink"
            style={{
              transform: "rotate(-0.6deg)",
              boxShadow: "var(--shadow-soft)",
              backgroundImage: "var(--paper-grain)",
            }}
          >
            <div
              className="shrink-0 bg-[#F8F1E2] p-1.5"
              style={{
                transform: "rotate(1.4deg)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <Image
                src="/katie-portrait.jpg"
                alt="Katie Spencer"
                width={80}
                height={100}
                className="block h-[100px] w-[80px] object-cover"
                style={{ objectPosition: "50% 18%" }}
              />
            </div>
            <div className="min-w-[200px] flex-1">
              <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-red">
                About the writer
              </p>
              <p className="mt-2.5 font-sans text-[15px] leading-[1.65] text-muted-foreground">
                Katie Spencer is an opera singer turned founder in Knoxville,
                Tennessee. Through{" "}
                <Link
                  href="/narratives"
                  className="link-underline font-medium text-red hover:text-red-deep"
                >
                  Narratives
                </Link>
                , she helps performing arts organizations find the story inside
                a season and turn it into a reason audiences want to show up.
              </p>
            </div>
          </div>
        </Reveal>
      </article>

      {/* Next note — near-black */}
      {next && (
        <section className={`bg-ink text-on-black ${PAD} py-[clamp(36px,5vw,60px)]`}>
          <Reveal className="mx-auto max-w-[1180px] border-t border-line-dark pt-8">
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
              Keep reading
            </p>
            <Link
              href={`/writing/${next.slug}`}
              className="group mt-3 flex flex-wrap items-end justify-between gap-x-10 gap-y-2"
            >
              <h2 className="max-w-[760px] font-serif text-[clamp(24px,2.8vw,34px)] font-medium leading-[1.12]">
                {next.title}
                <span className="text-red">.</span>
              </h2>
              <span className="inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-red">
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
