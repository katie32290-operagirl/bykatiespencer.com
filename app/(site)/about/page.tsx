import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { HeroPhoto } from "@/components/hero-photo";
import { BrushUnderline } from "@/components/brush-underline";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Hi, I'm Katie. Founder of GreenRoom and Narratives, co-founder of City Lyric Opera, and a storyteller helping mission-driven organizations build something worth believing in.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* ───────────── Hero — portrait left, oversized type right ───────────── */}
      <section className="pt-20 md:pt-32">
        <Container>
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
                <HeroPhoto src="/about-hero.jpg" position="object-[center_18%]" />
              </div>
            </Reveal>

            <div className="md:col-span-7 md:pb-4">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground">
                  About &mdash; Katie Spencer
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 font-serif text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.92] tracking-tight">
                  Hi, I&rsquo;m
                  <br />
                  Katie.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-eyebrow">
                  <span>Opera Singer</span>
                  <span className="text-brand">&rarr;</span>
                  <span>Arts Leader</span>
                  <span className="text-brand">&rarr;</span>
                  <span>Mother</span>
                  <span className="text-brand">&rarr;</span>
                  <span className="text-brand">Founder</span>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                  I help mission-driven organizations find the story only they
                  can tell &mdash; then build the people, experiences, and tools
                  that bring it to life.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="font-script mt-8 text-2xl text-brand">
                  Always building what&rsquo;s next.
                </p>
                <BrushUnderline aria-hidden className="mt-2 h-3 w-52 text-brand/70" />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── Philosophy — olive band, centered pull-quote ───────────── */}
      <section className="my-16 bg-olive py-28 text-[#f0efed] md:my-24 md:py-44">
        <Container>
          <Reveal>
            <p className="text-eyebrow text-center text-[#f0efed]/50">
              A small philosophy
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-10 max-w-5xl text-center font-serif text-[clamp(2rem,6vw,5rem)] font-medium leading-[1.04] tracking-tight">
              I don&rsquo;t believe creativity is decoration.{" "}
              <span className="italic text-[#cf8079]">I believe it&rsquo;s strategy.</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ───────────── Full-bleed image ───────────── */}
      <Reveal>
        <section className="relative aspect-[4/3] w-full md:aspect-[2/1]">
          <HeroPhoto src="/about-bts.jpg" position="object-[center_30%]" />
        </section>
      </Reveal>

      {/* ───────────── The story — huge heading, text beside a tall portrait ── */}
      <section className="py-24 md:py-40">
        <Container>
          <Reveal>
            <p className="text-eyebrow text-muted-foreground">My story</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
              From the stage. To strategy. To building something{" "}
              <span className="italic text-brand">of my own.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground md:col-span-7 md:pr-8">
              <Reveal>
                <p className="text-2xl leading-snug text-foreground">
                  About a decade ago, I made a decision that changed the course
                  of my career.
                </p>
              </Reveal>
              <Reveal delay={0.04}>
                <p>
                  I stepped away from pursuing opera full-time and co-founded
                  City Lyric Opera in New York City. It was my first experience
                  building something from the ground up &mdash; and it completely
                  changed how I thought about leadership, creativity, and the
                  arts.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  I&rsquo;d spent years preparing for a career on stage, earning
                  my Master&rsquo;s in Vocal Performance from the Manhattan
                  School of Music. But co-founding City Lyric revealed something
                  I hadn&rsquo;t expected.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  I was even more fulfilled bringing talented people together
                  around a shared vision than I was standing in the spotlight
                  myself. I loved building the team, shaping the experience, and
                  asking the bigger questions that determine whether an
                  organization truly connects.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="font-script text-2xl text-brand">
                  That curiosity never left me.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="md:col-span-5">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border md:mt-12">
                <Image
                  src="/about-alley.jpg"
                  alt="Katie Spencer laughing in a downtown alley"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────── Clarity — B&W image + pull-quote, asymmetric ───────────── */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/about-bw.jpg"
                  alt="Black-and-white portrait of Katie Spencer"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
            <div className="md:col-span-7">
              <Reveal>
                <p className="font-serif text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-tight">
                  The best organizations aren&rsquo;t defined by the size of
                  their budget.{" "}
                  <span className="text-brand">They&rsquo;re defined by clarity.</span>
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                  They know who they are, why they exist, and how to invite
                  people into a mission worth believing in. Over the past decade,
                  that conviction has carried me from the rehearsal hall to the
                  boardroom &mdash; from marketing campaigns to fundraising
                  strategy, from nonprofit leadership to entrepreneurship.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                  Today, that belief is at the center of everything I do.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── GreenRoom — dark full-bleed feature (the climax) ──────── */}
      <section className="my-16 bg-[#3c0227] text-[#f0efed] md:my-24">
        <Container>
          <div className="grid items-center gap-12 py-20 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-6">
              <Reveal>
                <p className="text-eyebrow text-[#f0efed]/50">
                  What I&rsquo;m building now
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 font-serif text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.95] tracking-tight">
                  GreenRoom
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-xl text-[#f0efed]/80">
                  A CRM built specifically for performing arts organizations
                  &mdash; by someone who has lived the realities of nonprofit
                  arts administration.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-md leading-relaxed text-[#f0efed]/60">
                  Alongside it, I&rsquo;m building Narratives, an AI platform that
                  helps mission-driven organizations communicate with clarity,
                  creativity, and confidence. The best technology doesn&rsquo;t
                  replace relationships.{" "}
                  <span className="text-[#f0efed]">
                    It creates more space for them.
                  </span>
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <a
                  href="https://greenroomcrm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-300 hover:scale-[1.02]"
                >
                  greenroomcrm.com
                  <ArrowUpRight className="size-4" />
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="md:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/work/work-greenroom-app.jpg"
                  alt="The GreenRoom CRM — a donor profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────── Personal — text with a small B&W accent ───────────── */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal delay={0.05} className="md:col-span-4">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border md:mt-2">
                <Image
                  src="/about-lowangle.jpg"
                  alt="Low-angle editorial portrait of Katie Spencer"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground md:col-span-8 md:pl-8">
              <Reveal>
                <p>
                  Outside of my work, I&rsquo;m a wife, a mom of two daughters, a
                  lifelong creative, and someone whose faith continues to shape
                  both my life and my leadership.
                </p>
              </Reveal>
              <Reveal delay={0.04}>
                <p>
                  Some of my most meaningful lessons haven&rsquo;t come from
                  stages or boardrooms. They&rsquo;ve come through seasons of
                  rebuilding &mdash; learning to embrace uncertainty, and
                  discovering that growth rarely follows the path we expect.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  My career has worn many titles: performer, founder, nonprofit
                  leader, entrepreneur.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-serif text-3xl font-medium leading-snug tracking-tight text-foreground">
                  To me, they&rsquo;ve always been expressions of the same
                  calling: <span className="italic text-brand">storyteller.</span>
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p>
                  I love helping discover the story only organizations with heart
                  can tell &mdash; then building the people, experiences, and
                  tools that bring it to life.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── Closing statement ───────────── */}
      <section className="pb-24 md:pb-36">
        <Container>
          <Reveal>
            <p className="max-w-5xl font-serif text-[clamp(2.25rem,6.5vw,5.5rem)] font-medium leading-[1.02] tracking-tight">
              Because when people believe in a story, they don&rsquo;t just
              support it.{" "}
              <span className="text-brand">They become part of it.</span>
            </p>
          </Reveal>
        </Container>
      </section>

      <CTA />
    </>
  );
}
