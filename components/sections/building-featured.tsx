import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/** What I'm building — GreenRoom featured, the rest as a quiet stack. */
export function BuildingFeatured() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-brand">
            What I&rsquo;m building
          </p>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr]">
          {/* Featured — GreenRoom */}
          <Reveal>
            <div className="flex h-full min-h-[320px] flex-col justify-between rounded-2xl bg-olive p-8 md:min-h-[340px] md:p-12">
              <div className="flex items-center gap-3">
                <span className="size-7 rounded-lg bg-pink" />
                <span className="font-sans text-xs uppercase tracking-[0.16em] text-mist">
                  Now building
                </span>
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
              </div>
            </div>
          </Reveal>

          {/* Stack */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-serif text-2xl text-foreground">
                  Consulting
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  Helping founders and organizations turn strategy into a story
                  people believe in.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-serif text-2xl text-foreground">Speaking</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  Keynotes and conversations.{" "}
                  <span className="italic text-brand">
                    Open to stages in 2026.
                  </span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl bg-pink p-7">
                <h3 className="font-serif text-2xl text-teal">
                  Stories in Development
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#7a3358]">
                  Podcasting, books, production, and live experiences.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
