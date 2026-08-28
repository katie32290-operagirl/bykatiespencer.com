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
    "Notes from the house: essays and observations by Katie Spencer on art, story, audience, and the work of building things.",
  path: "/writing",
});

const PAD = "px-[clamp(20px,4.5vw,56px)]";

const issueLabel = (n: number) =>
  n === 1 ? "One essay" : n === 2 ? "Two essays" : `${n} essays`;

const monthShort = (date: string) => date.replace(/\s+\d{4}$/, "");

export default function WritingIndex() {
  const [featured, ...rest] = notes;
  const cardTilts = ["1.1deg", "-0.7deg", "-1.6deg", "2.2deg"];

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Masthead — the front page, on velvet burgundy                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative overflow-hidden bg-burgundy text-on-black ${PAD} pb-[clamp(72px,10vw,130px)] pt-[clamp(40px,6vw,84px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        {/* gold sunburst, escaping the left edge */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/sunburst.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[clamp(-190px,-15vw,-96px)] top-[16%] z-0 hidden w-[clamp(250px,28vw,420px)] md:block"
          style={{ opacity: 0.92 }}
        />

        {/* "THE ARTS" on a teal scrap, pinned with a circled star */}
        <div className="pointer-events-none absolute right-[clamp(-30px,-1vw,24px)] top-[9%] z-0 hidden w-[clamp(300px,33vw,500px)] lg:block">
          <span
            aria-hidden
            className="absolute right-[-8%] top-[8%] z-0 h-[82%] w-[92%]"
            style={{
              backgroundColor: "#1C7568",
              backgroundImage: "var(--paper-grain-light)",
              clipPath:
                "polygon(4% 6%, 34% 0%, 66% 4%, 100% 0%, 96% 34%, 100% 66%, 95% 100%, 64% 96%, 32% 100%, 2% 96%, 0% 62%, 3% 30%)",
              transform: "rotate(3deg)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/on/newspaper-arts.webp"
            alt=""
            aria-hidden
            className="relative z-[1] block w-full -rotate-[2deg]"
            style={{ filter: "drop-shadow(0 12px 28px rgba(0,0,0,.5))" }}
          />
          {/* circled star, top-left of the page */}
          <span
            data-anim="true"
            className="absolute left-[1%] top-[8%] z-[2] text-[clamp(22px,2.6vw,36px)] leading-none text-gold-bright [animation:ks-star-twinkle_2.6s_ease_1s_1]"
          >
            &#10022;
          </span>
          <svg
            aria-hidden
            viewBox="0 0 110 80"
            className="absolute left-[-4%] top-[2%] z-[2] w-[clamp(60px,7vw,104px)]"
            fill="none"
            stroke="var(--red)"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M55 8C26 4 6 20 8 40c2 20 46 32 82 24 22-5 24-40-4-50-16-6-42-8-58-2" />
          </svg>
        </div>

        <Reveal className="relative z-[1] mx-auto max-w-[1180px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.16em] text-gold-bright">
            Notes from the house
          </p>
          <h1 className="mt-4 max-w-[900px] font-serif text-[clamp(48px,7vw,104px)] font-normal leading-[0.96]">
            Notes from <em className="italic">the house.</em>
          </h1>
          <p className="mt-6 max-w-[600px] font-serif text-[clamp(19px,2.2vw,25px)] italic leading-[1.4] text-gold-pale">
            Essays, observations and unfinished thoughts on art, story,
            audience, and the work of building things. A director&rsquo;s notes
            column, kept in public.
          </p>
          <span aria-hidden className="mt-8 block h-px w-[clamp(80px,10vw,140px)] bg-gold/50" />
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {[
              ["Filed by", "Katie Spencer"],
              ["In this issue", issueLabel(notes.length)],
              ["Updated", featured?.date ?? "2026"],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "font-accent text-[11px] uppercase tracking-[0.14em]",
                  i > 0 && "border-l border-on-black-mute pl-8",
                )}
              >
                <div className="text-on-black-mute">{label}</div>
                <div className="mt-1.5 text-on-black">{value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* scalloped deckle edge — burgundy tears away to the paper below */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] z-[2] h-[22px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18px 100%, var(--paper) 16.5px, transparent 17px), radial-gradient(circle at 18px 100%, #1C7568 18px, transparent 18.5px)",
            backgroundSize: "36px 22px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The bill — the newest note as a torn front-page clipping         */}
      {/* ---------------------------------------------------------------- */}
      <section className={`relative ${PAD} py-[clamp(48px,7vw,88px)]`}>
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(36px,5vw,56px)] flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
            <h2 className="font-serif text-[clamp(30px,3.6vw,46px)] font-medium">
              This issue<span className="text-red">.</span>
            </h2>
            <span className="font-accent text-xs uppercase tracking-[0.12em] text-muted-foreground">
              The bill &middot; in order of appearance
            </span>
          </div>

          {featured && (
            <div className="relative mx-auto w-full max-w-[600px]">
              {/* teal torn backing */}
              <span
                aria-hidden
                className="absolute -left-[7%] -top-[5%] z-0 hidden h-[64%] w-[62%] sm:block"
                style={{
                  backgroundColor: "#1C7568",
                  backgroundImage: "var(--paper-grain-light)",
                  clipPath:
                    "polygon(4% 8%, 34% 0%, 66% 6%, 100% 2%, 96% 40%, 100% 74%, 64% 96%, 32% 100%, 2% 94%, 0% 58%, 5% 30%)",
                  transform: "rotate(-4deg)",
                }}
              />
              {/* grand theatre ticket, tucked at the lower-left */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/ticket-grand.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-11%] left-[-16%] z-[2] hidden w-[clamp(96px,12vw,148px)] -rotate-[10deg] md:block"
                style={{ filter: "drop-shadow(0 5px 12px rgba(22,17,13,.35))" }}
              />
              <Link
                href={`/writing/${featured.slug}`}
                className="group relative z-[1] block w-full p-[clamp(24px,4vw,40px)] pb-[clamp(32px,4vw,48px)] text-[#2A241A] transition-transform duration-300 hover:-translate-y-1"
                style={{
                backgroundColor: "#E9E0C9",
                backgroundImage: "var(--paper-grain)",
                clipPath:
                  "polygon(0% 0%, 100% 0%, 98% 20%, 100% 40%, 97% 60%, 99% 80%, 96% 99%, 74% 95%, 50% 100%, 26% 96%, 2% 99%, 0% 76%, 2% 52%, 0% 28%)",
                transform: "rotate(-1.6deg)",
                boxShadow: "var(--shadow-paper)",
              }}
            >
              <div className="flex items-center justify-between border-b border-t-[3px] border-double border-[#2A241A] py-2 font-accent text-[10px] uppercase tracking-[0.16em]">
                <span>Latest &middot; {featured.category}</span>
                <span>{featured.date}</span>
              </div>
              <h3 className="mb-3 mt-5 font-serif text-[clamp(30px,4vw,44px)] font-bold leading-[1.06]">
                {featured.title}
              </h3>
              <p className="max-w-[440px] font-serif text-[clamp(17px,2vw,20px)] italic leading-[1.4] text-[#574C3B]">
                {featured.lead}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-red">
                Read the note
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              </Link>
            </div>
          )}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The rest of the column — tilted program clippings                */}
      {/* ---------------------------------------------------------------- */}
      {rest.length > 0 && (
        <section className={`relative ${PAD} pb-[clamp(48px,7vw,88px)]`}>
          <Reveal className="mx-auto max-w-[1180px]">
            <p className="mb-[clamp(28px,4vw,44px)] text-center font-accent text-xs uppercase tracking-[0.12em] text-muted-foreground">
              &#10022; Also in the file &#10022;
            </p>
            <div className="flex flex-wrap items-start justify-center gap-x-[clamp(16px,3vw,48px)] gap-y-12">
              {rest.map((note, i) => (
                <Link
                  key={note.slug}
                  href={`/writing/${note.slug}`}
                  className="group relative block w-[clamp(280px,32vw,420px)] border border-line bg-paper-bright p-7 pt-9 text-ink transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    transform: `rotate(${cardTilts[i % cardTilts.length]})`,
                    boxShadow: "var(--shadow-paper)",
                  }}
                >
                  <span className="ks-tape absolute -top-3 left-[12%]" />
                  <div className="mb-4 flex items-center justify-between border-b border-t border-ink py-1.5 font-accent text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-red">{note.category}</span>
                    <span className="text-ink-faint">{monthShort(note.date)}</span>
                  </div>
                  <h3 className="font-serif text-[clamp(26px,3vw,34px)] leading-[1.1]">
                    {note.title}
                    <span className="text-red">.</span>
                  </h3>
                  <p className="mt-3 font-serif text-[17px] italic leading-[1.45] text-muted-foreground">
                    {note.lead}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-red">
                    Read the note
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/*  Curtain line — more notes to come, on the near-black ground      */}
      {/* ---------------------------------------------------------------- */}
      <section className={`bg-ink text-on-black ${PAD} py-[clamp(56px,8vw,96px)]`}>
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-baseline justify-between gap-x-16 gap-y-6 border-t border-line-dark pt-8">
          <p className="font-serif text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.1]">
            More notes soon<span className="text-red">.</span>
          </p>
          <p className="max-w-[420px] font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-soft">
            The column continues. New essays as the work asks for them.
          </p>
        </Reveal>
      </section>
    </>
  );
}
