import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "I've performed on opera stages, co-founded a company, helped lead an institution, and now I'm building software. The medium keeps changing. The work doesn't. I build things people believe in.",
  path: "/about",
});

const DOTS = "....................";

function MonoLeader({
  label,
  value,
  valueClass,
  dotClass = "text-on-black-mute",
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

type Chapter = {
  num: string;
  title: React.ReactNode;
  label: string;
  body: string;
  image: string;
  pos?: string;
  reverse?: boolean;
};

const chapters: Chapter[] = [
  {
    num: "Chapter I",
    title: (
      <>
        The stage<span className="text-brand">.</span>
      </>
    ),
    label: "Opera & Performance",
    image: "/about-stage.jpg",
    pos: "object-[center_15%]",
    body: "Years performing opera taught me the lesson behind everything I build: a story doesn't just inform people, it moves them. Performance is where I first felt how belief takes hold, in a room, in a body, in a single held note.",
    reverse: false,
  },
  {
    num: "Chapter II",
    title: (
      <>
        The leap<span className="text-brand">.</span>
      </>
    ),
    label: "City Lyric Opera",
    image: "/about-leap.jpg",
    pos: "object-[center_25%]",
    body: "Co-founding a company from nothing taught me that belief is built, not waited for. I learned to gather people around an idea before it fully existed, and found I loved creating the vessel as much as performing inside it.",
    reverse: true,
  },
  {
    num: "Chapter III",
    title: "Growing an institution",
    label: "Knoxville Opera",
    image: "/about-institution.jpg",
    body: "Leading fundraising and marketing taught me that strategy only works when a story carries it. People don't invest in budgets or buy tickets to logistics, they give themselves to a narrative they want to belong to.",
    reverse: false,
  },
];

function ChapterRow({ c }: { c: Chapter }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-[70px] gap-y-9 border-t border-border pt-10 md:pt-12",
        c.reverse && "md:flex-row-reverse",
      )}
    >
      <div className="flex-[1_1_420px]">
        <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
          {c.num}
        </p>
        <h3 className="mt-3 font-serif text-[clamp(30px,3.4vw,46px)] leading-[1.08]">
          {c.title}
        </h3>
        <div className="mt-3.5 flex items-baseline gap-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          <span>The setting</span>
          <span
            aria-hidden
            className="flex-1 overflow-hidden whitespace-nowrap tracking-[3px]"
          >
            {DOTS}
          </span>
          <span>{c.label}</span>
        </div>
        <p className="mt-5 max-w-[540px] text-lg leading-[1.7] text-muted-foreground">
          {c.body}
        </p>
      </div>
      <div className="group flex-[1_1_360px]">
        <div className="relative h-[380px] w-full overflow-hidden rounded-[6px] md:h-[440px]">
          <Image
            src={c.image}
            alt={c.label}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]",
              c.pos,
            )}
          />
        </div>
        <p className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          {c.label}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Title page — full-bleed theatre, the premise over the house      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-ink">
        <Image
          src="/about-alley.jpg"
          alt="Katie Spencer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a07]/88 via-[#0d0a07]/40 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-[1180px] flex-wrap items-end justify-between gap-10 px-6 pb-14 pt-32 text-on-black sm:px-14">
          <div className="max-w-[760px]">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-gold-pale">
              About
            </p>
            <h1 className="mt-4 font-serif text-[clamp(44px,7vw,88px)] leading-[1.02]">
              Different rooms, one throughline<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-[1.7] text-on-black-soft">
              I&rsquo;ve performed on opera stages, co-founded a company, helped
              lead an institution, and now I&rsquo;m building software. The
              medium keeps changing. The work doesn&rsquo;t. I build things
              people believe in.
            </p>
          </div>

          <div className="grid min-w-[240px] gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-soft">
            <MonoLeader label="Act I" value="Opera" />
            <MonoLeader label="Act II" value="City Lyric" />
            <MonoLeader label="Act III" value="Knoxville Opera" />
            <MonoLeader label="Act IV" value="GreenRoom" />
            <MonoLeader label="Act V" value="What's next" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  My story                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-x-16 gap-y-10 border-t-2 border-foreground pt-7">
          <div className="flex-[1_1_380px]">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              My story
            </p>
            <h2 className="mt-5 font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.06]">
              From the stage. To strategy. To building something of my own
              <span className="text-brand">.</span>
            </h2>
          </div>

          <div className="flex max-w-[600px] flex-[1_1_460px] flex-col gap-6 text-lg leading-[1.7] text-muted-foreground">
            <p>
              About a decade ago, I made a decision that changed the course of my
              career.
            </p>
            <p>
              I stepped away from pursuing opera full-time and co-founded City
              Lyric Opera in New York City. It was my first experience building
              something from the ground up, and it completely changed how
              I thought about leadership, creativity, and the arts.
            </p>
            <p>
              I&rsquo;d spent years preparing for a career on stage, earning my
              Master&rsquo;s in Vocal Performance from the Manhattan School of
              Music. But co-founding City Lyric revealed something I hadn&rsquo;t
              expected.
            </p>
            <p>
              I was even more fulfilled bringing talented people together around
              a shared vision than I was standing in the spotlight myself. I
              loved building the team, shaping the experience, and asking the
              bigger questions that determine whether an organization truly
              connects.
            </p>
            <p className="font-serif text-2xl italic leading-[1.35] text-brand">
              That curiosity never left me.
            </p>
            <p>
              The best organizations aren&rsquo;t defined by the size of their
              budget. They&rsquo;re defined by{" "}
              <span className="italic text-foreground">clarity</span>.
            </p>
            <p>
              They know who they are, why they exist, and how to invite people
              into a mission worth believing in. Over the past decade, that
              conviction has carried me from the rehearsal hall to the boardroom, from marketing campaigns to fundraising strategy, from
              nonprofit leadership to entrepreneurship.
            </p>
            <p className="text-foreground">
              Today, that belief is at the center of everything I do.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The program — the chapters as a timeline                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-20 sm:px-14 md:pb-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-5 border-t-2 border-foreground pt-7">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              The program
            </p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              The moments that shaped how I build.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-12 md:gap-16">
            <ChapterRow c={chapters[0]} />
            <ChapterRow c={chapters[1]} />
            <ChapterRow c={chapters[2]} />
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Chapter IV — now building, near-black                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex items-start gap-5">
            <div className="relative size-12 shrink-0 md:size-14">
              <Image
                src="/greenroom-icon.png"
                alt="GreenRoom"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
                Chapter IV &middot; Now building
              </p>
              <h2 className="mt-2 font-serif text-[clamp(44px,6vw,72px)] leading-none">
                Building the future<span className="text-brand">.</span>
              </h2>
            </div>
          </div>

          <p className="mt-8 max-w-[680px] text-lg leading-[1.7] text-on-black-soft">
            Building software taught me that belief has to scale. GreenRoom turns
            hard-won lessons about arts organizations into tools they use every
            day, the infrastructure a story needs to keep being told.
            Alongside it I&rsquo;m building{" "}
            <Link href="/narratives" className="link-underline text-gold-pale">
              Narratives
            </Link>
            , which brings story strategy to the marketing teams inside
            performing arts organizations.{" "}
            <span className="italic text-gold-pale">
              Two companies, one field, opposite ends of the same problem.
            </span>
          </p>

          <div className="mt-9 max-w-[440px] font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
            <MonoLeader label="The venture" value="GreenRoom" />
            <MonoLeader
              label="Status"
              value="Launching 2026"
              valueClass="text-gold-pale"
              className="mt-2"
            />
          </div>

          <a
            href="https://greenroomcrm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block font-accent text-xs uppercase tracking-[0.12em] text-gold-pale transition-colors hover:text-on-black"
          >
            greenroomcrm.com &rarr;
          </a>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Chapter V — what's next                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <ChapterRow
            c={{
              num: "Chapter V",
              title: (
                <>
                  What&rsquo;s next<span className="text-brand">.</span>
                </>
              ),
              label: "Still being written",
              image: "/about-whatsnext.jpg",
              pos: "object-[center_25%]",
              body: "Now I'm exploring how technology and story shape each other, across writing, speaking, and projects still taking form. Every chapter taught me the same thing: the medium keeps changing, but the work stays building something people believe in.",
              reverse: true,
            }}
          />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Intermission — the personal note, near-black                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-28">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-gold-pale">
            Intermission
          </p>
          <p className="mt-8 font-serif text-[clamp(1.6rem,3.2vw,2.3rem)] italic leading-[1.4] text-on-black">
            Outside of my work, I&rsquo;m a wife, a mom of two daughters, a
            lifelong creative, and someone whose faith shapes both my life and my
            leadership. My career has worn many titles: performer, founder,
            nonprofit leader, entrepreneur. But they&rsquo;ve always been
            expressions of the same calling:{" "}
            <span className="text-brand">storyteller.</span>
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Curtain                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-baseline gap-x-[70px] gap-y-6 border-t-2 border-foreground pt-7">
          <p className="min-w-[180px] font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            Curtain
          </p>
          <div className="max-w-[640px] flex-[1_1_420px]">
            <h2 className="font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.06]">
              Every chapter led here<span className="text-brand">.</span>
            </h2>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block rounded-[2px] bg-ink px-8 py-4 font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-paper transition-opacity hover:opacity-90"
              >
                Start a conversation &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
