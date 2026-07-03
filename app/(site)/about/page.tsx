import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "I've performed on opera stages, co-founded a company, led an institution, and now I'm building software. The medium keeps changing. The mission doesn't — building something people believe in.",
  path: "/about",
});

type Chapter = {
  num: string;
  title: string;
  label: string;
  body: string;
  image: string;
  accent: string;
  flip: boolean;
  pos?: string;
};

const chapters: Chapter[] = [
  {
    num: "Chapter I",
    title: "The Stage",
    label: "Opera & Performance",
    image: "/about-stage.jpg",
    pos: "object-[center_15%]",
    body: "Years performing opera taught me the lesson behind everything I build: a story doesn't just inform people, it moves them. Performance is where I first felt how belief takes hold — in a room, in a body, in a single held note.",
    accent: "text-brand",
    flip: true,
  },
  {
    num: "Chapter II",
    title: "The Leap",
    label: "City Lyric Opera",
    image: "/about-leap.jpg",
    pos: "object-[center_25%]",
    body: "Co-founding a company from nothing taught me that belief is built, not waited for. I learned to gather people around an idea before it fully existed — and found I loved creating the vessel as much as performing inside it.",
    accent: "text-camel",
    flip: false,
  },
  {
    num: "Chapter III",
    title: "Growing an Institution",
    label: "Knoxville Opera",
    image: "/about-institution.jpg",
    body: "Leading fundraising and marketing taught me that strategy only works when a story carries it. People don't invest in budgets or buy tickets to logistics — they give themselves to a narrative they want to belong to.",
    accent: "text-brand",
    flip: true,
  },
];

function ChapterRow({ c }: { c: Chapter }) {
  return (
    <div className="grid items-center gap-8 border-t border-border py-12 md:grid-cols-12 md:gap-16 md:py-16">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-7",
          c.flip && "md:order-2",
        )}
      >
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className={cn("object-cover", c.pos)}
        />
      </div>
      <div className={cn("md:col-span-5", c.flip && "md:order-1")}>
        <p className={cn("font-serif text-xl italic", c.accent)}>{c.num}</p>
        <h3 className="mt-2 font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] leading-[1.05] tracking-tight text-foreground">
          {c.title}
        </h3>
        <p className="text-eyebrow mt-2 text-muted-foreground">{c.label}</p>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
          {c.body}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ───────────── Hero — centered ───────────── */}
      <section className="pt-16 pb-10 text-center md:pt-24 md:pb-14">
        <Container className="max-w-4xl">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand">
              About
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.04] tracking-tight text-foreground">
              Different rooms, one throughline<span className="text-brand">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="my-8 flex items-center justify-center gap-3" aria-hidden>
              <span className="h-px w-14 bg-foreground/60" />
              <span className="size-2 rounded-full bg-brand" />
              <span className="h-px w-14 bg-foreground/60" />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
              I&rsquo;ve performed on opera stages, co-founded a company, led an
              institution, and now I&rsquo;m building software. The medium keeps
              changing. The mission doesn&rsquo;t — building something people
              believe in.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ───────────── Feature image ───────────── */}
      <section className="pb-8 md:pb-16">
        <Container>
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[3/2] md:aspect-[16/9]">
              <Image
                src="/about-alley.jpg"
                alt="Katie Spencer"
                fill
                sizes="100vw"
                priority
                className="object-cover object-[center_20%]"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────────── My story ───────────── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-brand">
              My story
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.12] tracking-tight text-foreground">
              From the stage. To strategy. To building something of my own
              <span className="text-brand">.</span>
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-6 text-left text-lg leading-relaxed text-muted-foreground">
            <Reveal delay={0.02}>
              <p>
                About a decade ago, I made a decision that changed the course of
                my career.
              </p>
            </Reveal>
            <Reveal delay={0.03}>
              <p>
                I stepped away from pursuing opera full-time and co-founded City
                Lyric Opera in New York City. It was my first experience building
                something from the ground up — and it completely changed how I
                thought about leadership, creativity, and the arts.
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <p>
                I&rsquo;d spent years preparing for a career on stage, earning my
                Master&rsquo;s in Vocal Performance from the Manhattan School of
                Music. But co-founding City Lyric revealed something I
                hadn&rsquo;t expected.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                I was even more fulfilled bringing talented people together
                around a shared vision than I was standing in the spotlight
                myself. I loved building the team, shaping the experience, and
                asking the bigger questions that determine whether an
                organization truly connects.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-serif text-2xl italic text-brand">
                That curiosity never left me.
              </p>
            </Reveal>
            <Reveal delay={0.07}>
              <p>
                The best organizations aren&rsquo;t defined by the size of their
                budget. They&rsquo;re defined by{" "}
                <span className="italic text-foreground">clarity</span>.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                They know who they are, why they exist, and how to invite people
                into a mission worth believing in. Over the past decade, that
                conviction has carried me from the rehearsal hall to the
                boardroom — from marketing campaigns to fundraising strategy,
                from nonprofit leadership to entrepreneurship.
              </p>
            </Reveal>
            <Reveal delay={0.09}>
              <p className="text-foreground">
                Today, that belief is at the center of everything I do.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────── Chapters ───────────── */}
      <section className="pb-8 md:pb-12">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-[clamp(2.25rem,5vw,3rem)] leading-[1.05] tracking-tight text-foreground">
                Chapters<span className="text-brand">.</span>
              </h2>
              <p className="text-eyebrow mt-3 text-muted-foreground">
                The moments that shaped how I build
              </p>
            </div>
          </Reveal>

          <div className="mt-10 md:mt-14">
            <ChapterRow c={chapters[0]} />
            <ChapterRow c={chapters[1]} />
            <ChapterRow c={chapters[2]} />

            {/* Chapter IV — now building, featured teal band */}
            <div className="border-t border-border py-12 md:py-16">
              <div className="overflow-hidden rounded-2xl bg-olive p-8 text-cream md:p-14">
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
                    <p className="font-serif text-xl italic text-pink">
                      Chapter IV — now building
                    </p>
                    <h3 className="mt-1 font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-none text-cream">
                      GreenRoom<span className="text-pink">.</span>
                    </h3>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/75">
                      Building software taught me that belief has to scale.
                      GreenRoom turns hard-won lessons about arts organizations
                      into tools they use every day — the infrastructure a story
                      needs to keep being told. Alongside it, I&rsquo;m building
                      Narratives — an AI platform helping mission-driven
                      organizations communicate with clarity.{" "}
                      <span className="italic text-pink">Launching 2026.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter V */}
            <ChapterRow
              c={{
                num: "Chapter V",
                title: "What's Next",
                label: "Still being written",
                image: "/about-whatsnext.jpg",
                pos: "object-[center_25%]",
                body: "Now I'm exploring how technology and story shape each other — across writing, speaking, and projects still taking form. Every chapter taught me the same thing: the medium keeps changing, but the work stays building something people believe in.",
                accent: "text-camel",
                flip: false,
              }}
            />
          </div>
        </Container>
      </section>

      {/* ───────────── Personal ───────────── */}
      <section className="border-t border-border py-20 md:py-28">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="font-serif text-[clamp(1.5rem,3.2vw,2.15rem)] italic leading-[1.4] text-foreground/85">
              Outside of my work, I&rsquo;m a wife, a mom of two daughters, a
              lifelong creative, and someone whose faith shapes both my life and
              my leadership. My career has worn many titles — performer, founder,
              nonprofit leader, entrepreneur — but they&rsquo;ve always been
              expressions of the same calling:{" "}
              <span className="text-brand">storyteller.</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ───────────── CTA band ───────────── */}
      <section className="bg-brand text-brand-foreground">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.05] tracking-tight">
              Every chapter led here<span className="text-brand-foreground/60">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-brand-foreground px-8 py-3.5 font-sans text-sm text-brand transition-transform hover:scale-[1.03]"
            >
              Start a conversation
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
