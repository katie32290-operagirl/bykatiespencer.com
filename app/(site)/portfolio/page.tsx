import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { BrushUnderline } from "@/components/brush-underline";
import { HeroPhoto } from "@/components/hero-photo";
import { WorkGrid } from "@/components/sections/work-grid";
import { clients } from "@/content/clients";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description:
    "From strategy to story to production — films, campaigns, experiences, and design that move people to believe, connect, and take action.",
  path: "/portfolio",
});

const trusted = clients.filter((c) => c !== "GreenRoom");

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
          <HeroPhoto src="/work/katie-hero.jpg" position="object-[40%_38%]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent" />
        </div>

        <Container className="relative">
          <div className="py-16 md:max-w-[48%] md:py-28 lg:py-32">
            <Reveal>
              <p className="text-eyebrow">Work</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-display mt-6 font-medium">
                Work is where ideas become{" "}
                <span className="font-serif italic text-brand">real.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-script mt-6 max-w-md text-2xl leading-snug text-muted-foreground">
                Every project begins with the same question: &ldquo;Why should
                anyone care?&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.12} aria-hidden>
              <BrushUnderline className="mt-3 h-3 w-44 text-brand/70" />
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-md text-lg text-muted-foreground">
                From strategy to story to production, I help organizations create
                work that moves people to believe, connect, and take action.
              </p>
            </Reveal>
          </div>
        </Container>

        {/* Mobile photo */}
        <div className="relative aspect-[4/3] w-full md:hidden">
          <HeroPhoto src="/work/katie-hero.jpg" position="object-[40%_38%]" />
        </div>
      </section>

      <WorkGrid />

      {/* Closing line */}
      <Container>
        <Reveal>
          <p className="font-script pb-8 text-center text-2xl text-brand">
            Every project is a collaboration. Every result is shared.
          </p>
        </Reveal>
      </Container>

      {/* Trusted by */}
      <Section spacing="sm" className="border-t border-border/60">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-3">
              <p className="text-eyebrow">Trusted by</p>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Organizations doing meaningful work in the world.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-10 gap-y-5 md:col-span-9">
              {trusted.map((name) => (
                <li
                  key={name}
                  className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
