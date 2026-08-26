import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/seo";
import { notes } from "@/content/writing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Notes",
  description:
    "Notes from the house — essays and observations by Katie Spencer on art, story, audience, and the work of building things.",
  path: "/writing",
});

const DOTS = "....................";

function MonoLeader({
  label,
  value,
  valueClass,
  dotClass = "text-ink-faint",
  className,
}: {
  label: string;
  value: string;
  valueClass?: string;
  dotClass?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-2.5", className)}>
      <span>{label}</span>
      <span
        aria-hidden
        className={cn(
          "flex-1 overflow-hidden whitespace-nowrap tracking-[3px]",
          dotClass,
        )}
      >
        {DOTS}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

const issueLabel = (n: number) =>
  n === 1 ? "One essay" : n === 2 ? "Two essays" : `${n} essays`;

export default function WritingIndex() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Masthead — the column, on the near-black ground                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-28">
        <Reveal className="mx-auto max-w-[1180px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            Notes from the house
          </p>
          <h1 className="mt-4 font-serif text-[clamp(48px,7vw,104px)] leading-[0.98]">
            Notes from the house<span className="text-brand">.</span>
          </h1>
          <p className="mt-6 max-w-[620px] font-sans text-lg leading-[1.7] text-on-black-soft">
            Essays, observations and unfinished thoughts on art, story,
            audience, and the work of building things. A director&rsquo;s notes
            column, kept in public.
          </p>
          <div className="mt-10 grid max-w-[420px] gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-soft">
            <MonoLeader
              label="Filed by"
              value="Katie Spencer"
              dotClass="text-on-black-mute"
            />
            <MonoLeader
              label="In this issue"
              value={issueLabel(notes.length)}
              valueClass="text-brand"
              dotClass="text-on-black-mute"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The bill — every note, as a program listing                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-16 sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground">
          {notes.map((note, i) => (
            <Link
              key={note.slug}
              href={`/writing/${note.slug}`}
              className={cn(
                "group grid gap-x-10 gap-y-4 border-b border-border py-10 md:grid-cols-12 md:py-12",
              )}
            >
              <div className="flex items-baseline gap-4 font-accent text-[11px] uppercase tracking-[0.12em] text-brand md:col-span-3 md:flex-col md:gap-2">
                <span>
                  {String(i + 1).padStart(2, "0")} &middot; {note.category}
                </span>
                <span className="text-ink-faint">{note.date}</span>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-serif text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-foreground">
                  {note.title}
                  <span className="text-brand">.</span>
                </h2>
                <p className="mt-3 max-w-[620px] font-serif text-lg italic leading-[1.45] text-muted-foreground">
                  {note.lead}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
                  Read the note
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Curtain line — more notes to come, on the near-black ground      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-baseline justify-between gap-x-16 gap-y-6 border-t border-line-dark pt-8">
          <p className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.1]">
            More notes soon<span className="text-brand">.</span>
          </p>
          <p className="max-w-[420px] font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-soft">
            The column continues. New essays as the work asks for them.
          </p>
        </Reveal>
      </section>
    </>
  );
}
