import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const ways = [
  {
    title: "Advising",
    body: "Helping organizations find the story inside the strategy.",
  },
  {
    title: "Conversations",
    body: "Keynotes, panels, workshops, and thoughtful rooms where ideas become clearer.",
  },
  {
    title: "Stories in Development",
    body: "New ideas taking shape behind the scenes, more to share when the time is right.",
    pink: true,
  },
];

/**
 * What I'm building — the two ventures side by side, then the quieter ways.
 *
 * GreenRoom and Narratives are deliberately different-looking cards: same
 * founder, same field, opposite ends of the problem, but two companies. They
 * should never read as one product suite.
 */
export function BuildingFeatured() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-brand">
            What I&rsquo;m building
          </p>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* GreenRoom — dark tile, links to the live product */}
          <Reveal>
            <a
              href="https://greenroomcrm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[320px] flex-col justify-between rounded-2xl bg-olive p-8 transition-transform duration-300 hover:scale-[1.01] md:min-h-[340px] md:p-12"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative size-9 shrink-0">
                    <Image
                      src="/greenroom-icon.png"
                      alt="GreenRoom logo"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-sans text-xs uppercase tracking-[0.16em] text-mist">
                    Now building
                  </span>
                </div>
                <ArrowUpRight className="size-5 text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>

              <div className="mt-10">
                <p className="font-serif text-5xl leading-none text-cream md:text-[56px]">
                  GreenRoom<span className="text-pink">.</span>
                </p>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/75">
                  Bringing fundraising, marketing, ticketing, and operations
                  into one platform for arts organizations.{" "}
                  <span className="italic text-pink">Launching 2026.</span>
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.16em] text-pink">
                  greenroomcrm.com
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Narratives — paper tile, typographic, links to the method page */}
          <Reveal delay={0.05}>
            <Link
              href="/narratives"
              className="group flex h-full min-h-[320px] flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-transform duration-300 hover:scale-[1.01] md:min-h-[340px] md:p-12"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Now building
                </span>
                <ArrowRight className="size-5 text-brand transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>

              <div className="mt-10">
                <p className="font-serif text-5xl leading-none text-foreground md:text-[56px]">
                  Narratives<span className="text-brand">.</span>
                </p>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                  Story strategy for the performing arts, so a season stops
                  reading like a schedule and starts feeling like an invitation.{" "}
                  <span className="italic text-brand">My own venture.</span>
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.16em] text-brand">
                  Read the method
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* The quieter ways in */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {ways.map((w, i) => (
            <Reveal key={w.title} delay={0.05 + i * 0.05}>
              <div
                className={
                  w.pink
                    ? "h-full rounded-2xl bg-pink p-7"
                    : "h-full rounded-2xl border border-border bg-card p-7"
                }
              >
                <h3
                  className={
                    w.pink
                      ? "font-serif text-2xl text-paper"
                      : "font-serif text-2xl text-foreground"
                  }
                >
                  {w.title}
                </h3>
                <p
                  className={
                    w.pink
                      ? "mt-1.5 text-[15px] leading-relaxed text-paper/85"
                      : "mt-1.5 text-[15px] leading-relaxed text-muted-foreground"
                  }
                >
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
