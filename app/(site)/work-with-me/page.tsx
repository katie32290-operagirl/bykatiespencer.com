import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Collaborate",
  description:
    "Whether you need a partner for a single project or ongoing strategic support, I'll meet you where you are and help you move your mission forward.",
  path: "/work-with-me",
});

const process = [
  {
    n: "Act I",
    title: "Listen",
    body: "We start by getting to know your mission, goals, audience, and what success looks like.",
  },
  {
    n: "Act II",
    title: "Uncover",
    body: "We identify the story at the core and the opportunities that will make the biggest impact.",
  },
  {
    n: "Act III",
    title: "Shape",
    body: "We create the strategy, messaging, and creative direction, then build the right assets to bring it to life.",
  },
  {
    n: "Act IV",
    title: "Bring it forward",
    body: "We launch with intention, refine based on what we learn, and build momentum that lasts.",
  },
];

const ways = [
  {
    title: "Projects",
    body: "For launches, campaigns, fundraising experiences, and creative direction.",
    when: "You know what needs to be built.",
  },
  {
    title: "Advising",
    body: "A strategic thought partner for leadership conversations, positioning, messaging, and big decisions.",
    when: "You need clarity before execution.",
  },
  {
    title: "Conversations",
    body: "For organizations, teams, and communities who want to think differently about storytelling, creativity, leadership, and the work that matters.",
    when: "You're looking for ideas worth carrying forward.",
  },
];

export default function CollaboratePage() {
  return (
    <>
      {/* ───────────── Hero + feature ───────────── */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            Collaborate
          </p>
          <h1 className="mt-5 max-w-[900px] font-serif text-[clamp(48px,6.5vw,84px)] leading-[1] tracking-tight">
            Great work happens together<span className="text-brand">.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-[1.7] text-muted-foreground">
            Whether you need a partner for a single project or ongoing strategic
            support, I&rsquo;ll meet you where you are and help you move your
            mission forward.
          </p>
          <p className="mt-6 font-serif text-xl italic text-foreground">
            Thoughtful process. Trusted partners. Meaningful results.
          </p>

          <figure className="mt-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[6px] md:aspect-[2/1]">
              <Image
                src="/collaborate-hero.jpg"
                alt="Katie Spencer directing a film shoot with her team on location"
                fill
                sizes="100vw"
                priority
                className="object-cover object-[center_45%]"
              />
            </div>
            <figcaption className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Carmen Media Day &middot; Photo by Eli Johnson
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ───────────── Process — the program ───────────── */}
      <section className="px-6 pb-20 sm:px-14 md:pb-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground pt-7">
          <div className="flex flex-wrap items-baseline justify-between gap-5">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              How we work together
            </p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Strategic at the core. Creative in execution.
            </p>
          </div>
          <div className="mt-8 grid gap-x-20 gap-y-0 sm:grid-cols-2">
            {process.map((step) => (
              <div
                key={step.n}
                className="border-t border-foreground py-6 pb-8"
              >
                <p className="font-accent text-xs uppercase tracking-[0.12em] text-brand">
                  {step.n}
                </p>
                <h3 className="mt-1.5 font-serif text-[clamp(28px,3vw,38px)] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[440px] leading-[1.6] text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ───────────── Ways to collaborate — near-black ───────────── */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-5">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              Ways to collaborate
            </p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
              Different needs. Different formats.
            </p>
          </div>
          <div className="mt-8">
            {ways.map((w, i) => (
              <div
                key={w.title}
                className={`grid gap-x-10 gap-y-3 border-t border-line-dark py-8 md:grid-cols-[220px_1fr] ${
                  i === ways.length - 1 ? "border-b" : ""
                }`}
              >
                <h3 className="font-serif text-[26px] leading-tight">
                  {w.title}
                </h3>
                <div className="max-w-[620px]">
                  <p className="leading-[1.6] text-on-black-soft">{w.body}</p>
                  <div className="mt-4 flex items-baseline gap-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
                    <span className="text-brand">Best when</span>
                    <span
                      aria-hidden
                      className="flex-1 overflow-hidden whitespace-nowrap tracking-[3px] text-line-dark"
                    >
                      ....................
                    </span>
                    <span className="normal-case tracking-normal text-on-black">
                      {w.when}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ───────────── Closing ───────────── */}
      <section className="px-6 py-20 sm:px-14 md:py-28">
        <Reveal className="mx-auto max-w-[1180px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            At the heart of every collaboration
          </p>
          <p className="mt-6 max-w-[900px] font-serif text-[clamp(2rem,5vw,3.5rem)] italic leading-[1.14]">
            I believe partnership is a creative act.
          </p>
          <p className="mt-8 max-w-[560px] text-lg leading-[1.7] text-muted-foreground">
            I bring the strategy, creative leadership, and experience. You bring
            the mission, the knowledge, and the heart. Together we build
            something that lasts.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-[2px] bg-ink px-8 py-4 font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-paper transition-opacity hover:opacity-90"
          >
            Start a conversation &rarr;
          </Link>
        </Reveal>
      </section>
    </>
  );
}
