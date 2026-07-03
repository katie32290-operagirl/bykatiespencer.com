import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Collaborate",
  description:
    "Whether you need a partner for a single project or ongoing strategic support, I'll meet you where you are and help you move your mission forward.",
  path: "/work-with-me",
});

const process = [
  {
    n: "01",
    title: "Listen",
    body: "We start by getting to know your mission, goals, audience, and what success looks like.",
    accent: "text-brand",
  },
  {
    n: "02",
    title: "Uncover",
    body: "We identify the story at the core and the opportunities that will make the biggest impact.",
    accent: "text-camel",
  },
  {
    n: "03",
    title: "Shape",
    body: "We create the strategy, messaging, and creative direction, then build the right assets to bring it to life.",
    accent: "text-brand",
  },
  {
    n: "04",
    title: "Bring it forward",
    body: "We launch with intention, refine based on what we learn, and build momentum that lasts.",
    accent: "text-camel",
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
      {/* ───────────── Hero ───────────── */}
      <section className="pt-16 pb-10 text-center md:pt-24 md:pb-14">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand">
              Collaborate
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.04] tracking-tight text-foreground">
              Great work happens together<span className="text-brand">.</span>
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
              Whether you need a partner for a single project or ongoing
              strategic support, I&rsquo;ll meet you where you are and help you
              move your mission forward.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-xl italic text-foreground">
              Thoughtful process. Trusted partners. Meaningful results.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ───────────── Feature image ───────────── */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <figure>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/9] md:aspect-[2/1]">
                <Image
                  src="/collaborate-hero.jpg"
                  alt="Katie Spencer directing a film shoot with her team on location"
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover object-[center_45%]"
                />
              </div>
              <figcaption className="mt-3 text-center font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
                Carmen Media Day &middot; Photo by Eli Johnson
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* ───────────── Process ───────────── */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] tracking-tight text-foreground">
                How we work together
              </h2>
              <p className="text-eyebrow mt-3 text-muted-foreground">
                Strategic at the core. Creative in execution.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <div className="border-t border-border pt-5">
                  <p className={cn("font-serif text-3xl italic", step.accent)}>
                    {step.n}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────── Ways to collaborate ───────────── */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] tracking-tight text-foreground">
                Ways to collaborate
              </h2>
              <p className="text-eyebrow mt-3 text-muted-foreground">
                Different needs. Different formats.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ways.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
                  <h3 className="font-serif text-2xl tracking-tight text-foreground">
                    {w.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {w.body}
                  </p>
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="text-eyebrow text-brand">Best when</p>
                    <p className="mt-1.5 leading-relaxed text-foreground">
                      {w.when}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────── Closing band ───────────── */}
      <section className="bg-olive text-cream">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-mist">
              At the heart of every collaboration
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(2rem,5vw,3.25rem)] italic leading-[1.14]">
              I believe partnership is a creative act.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-xl leading-relaxed text-cream/75">
              I bring the strategy, creative leadership, and experience. You
              bring the mission, the knowledge, and the heart. Together we build
              something that lasts.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-cream px-8 py-3.5 font-sans text-sm text-teal transition-transform hover:scale-[1.03]"
            >
              Start a conversation
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
