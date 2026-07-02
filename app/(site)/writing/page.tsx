import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CTA } from "@/components/sections/cta";
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
      <article className="pt-20 pb-8 md:pt-32">
        <Container size="prose">
          {/* ───────────── Header ───────────── */}
          <header>
            <Reveal>
              <p className="text-eyebrow">{writing.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-serif text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.03] tracking-tight text-balance">
                {writing.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
                {renderInline(writing.lead)}
              </p>
            </Reveal>
          </header>

          {/* ───────────── Essay body ───────────── */}
          <Reveal delay={0.05} className="mt-14 md:mt-16">
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
        </Container>
      </article>

      <CTA />
    </>
  );
}
