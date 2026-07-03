import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
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
      {/* Hero — text left, rounded photo right */}
      <section className="py-10 md:py-16">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Reveal>
                <p className="text-eyebrow">Work</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 font-serif text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.02] tracking-tight text-foreground">
                  Work is where ideas become{" "}
                  <span className="italic text-brand">real.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-serif italic mt-7 max-w-md text-2xl leading-snug text-brand">
                  Every project begins with the same question: &ldquo;Why should
                  anyone care?&rdquo;
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-6 flex items-center gap-3" aria-hidden>
                  <span className="h-px w-16 bg-foreground/50" />
                  <span className="size-2 rounded-full bg-brand" />
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                  From strategy to story to production, I help organizations
                  create work that moves people to believe, connect, and take
                  action.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <HeroPhoto src="/work/katie-hero.jpg" position="object-[45%_35%]" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <WorkGrid />

      {/* Closing line */}
      <Container>
        <Reveal>
          <p className="font-serif italic pb-8 text-center text-2xl text-brand">
            Every project is a collaboration. Every result is shared.
          </p>
        </Reveal>
      </Container>

      {/* Trusted by — grounded olive band */}
      <Section spacing="sm" className="bg-olive text-[#FAF4EC]">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-3">
              <p className="text-eyebrow text-[#FAF4EC]/50">Trusted by</p>
              <p className="mt-3 max-w-xs text-sm text-[#FAF4EC]/70">
                Organizations doing meaningful work in the world.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-10 gap-y-5 md:col-span-9">
              {trusted.map((name) => (
                <li
                  key={name}
                  className="text-sm font-medium uppercase tracking-[0.14em] text-[#FAF4EC]/85 transition-colors hover:text-[#F39ABF]"
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
