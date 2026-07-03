import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/seo";
import { writing } from "@/content/writing";

export const metadata: Metadata = createMetadata({
  title: "Writing",
  description:
    "What Opera Taught Me About Building — an essay by Katie Spencer on craft, constraint, and the invisible work behind things that feel effortless.",
  path: "/writing",
});

/**
 * Parse inline `**bold**` / `*italic*` and curl straight apostrophes into
 * typographic ’ so the essay matches the site's typography.
 */
function renderInline(text: string): ReactNode {
  const curled = text.replace(/'/g, "’");
  const parts = curled.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** A quiet section break — an ornament of three dots, never a literal rule. */
function Divider() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center gap-2.5 py-10 md:py-14"
    >
      <span className="size-1 rounded-full bg-brand/40" />
      <span className="size-1 rounded-full bg-brand/40" />
      <span className="size-1 rounded-full bg-brand/40" />
    </div>
  );
}

export default function WritingPage() {
  const blocks = writing.body.trim().split(/\n{2,}/);

  return (
    <>
      {/* ───────────── The essay ───────────── */}
      <article className="pb-4 md:pb-10">
        <Container size="prose">
          <header className="pt-16 text-center md:pt-28">
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Essay 01 <span className="text-brand">&middot;</span> On Craft
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] tracking-tight text-foreground">
                {writing.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-muted-foreground">
                {renderInline(writing.lead)}
              </p>
            </Reveal>
          </header>

          <div
            aria-hidden
            className="mx-auto mt-10 h-px max-w-xl bg-border md:mt-12"
          />

          {/* Essay body */}
          <Reveal delay={0.05} className="mt-10 md:mt-12">
            <div className="space-y-6 text-lg leading-[1.75] text-foreground/90">
              {blocks.map((block, i) =>
                block === "---" ? (
                  <Divider key={i} />
                ) : (
                  <p key={i}>{renderInline(block)}</p>
                ),
              )}
            </div>
          </Reveal>

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
        </Container>
      </article>

      {/* ───────────── More essays teaser ───────────── */}
      <section className="border-t border-border/60 py-16 text-center md:py-20">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-brand">
              More essays, soon
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-4 font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] italic leading-snug text-foreground">
              On belief, leadership, faith, and becoming.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
