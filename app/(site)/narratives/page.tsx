import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { narratives as n } from "@/content/narratives";
import { createMetadata, jsonLdScript } from "@/lib/seo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Narratives — Katie's second venture, and the only page on the site that
 * sells a product rather than tells her story.
 *
 * Deliberately typographic: no brand tile, no icon grid, no feature cards. The
 * old "Narratives by GreenRoom" lockup is retired (Narratives is no longer a
 * GreenRoom product), so the page carries the name in type instead of art.
 *
 * All copy lives in content/narratives.ts so this can move to its own domain
 * later without rewriting the page.
 */
export const metadata: Metadata = createMetadata({
  title: "Narratives — Story strategy for the performing arts",
  description:
    "Narratives turns a performing arts season into something audiences want to step inside, giving small marketing teams the story strategy, content, and campaign architecture they don't have time to build.",
  path: "/narratives",
});

function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Narratives",
    serviceType: "Story strategy for the performing arts",
    url: `${site.url}/narratives`,
    description: n.intro,
    provider: { "@type": "Person", name: site.name, url: site.url },
    areaServed: "United States",
    audience: {
      "@type": "Audience",
      audienceType:
        "Regional opera, symphony, ballet, theatre, and festival organizations",
    },
  };
}

export default function NarrativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd())}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Masthead — type only, no photograph                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 md:py-28">
        <Container>
          <Reveal>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.32em] text-brand">
              {n.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-8 max-w-4xl font-medium">
              {n.headline.lead}{" "}
              <span className="italic text-brand">{n.headline.accent}</span>
            </h1>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Reveal delay={0.1}>
                <p className="font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] italic leading-[1.2] text-brand">
                  {n.promise}
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <Reveal delay={0.14}>
                <div className="mb-6 flex items-center gap-3" aria-hidden>
                  <span className="h-px w-16 bg-foreground/40" />
                  <span className="size-2 rounded-full bg-brand" />
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {n.intro}
                </p>
                <p className="text-eyebrow mt-8">{n.byline}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Why it exists — the fear nobody names                             */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg" className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-eyebrow text-brand">{n.problem.eyebrow}</p>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <Reveal delay={0.05}>
                <p className="font-serif text-2xl leading-[1.35] tracking-tight md:text-[2rem]">
                  {n.problem.statement.lead}{" "}
                  <span className="italic text-brand">
                    {n.problem.statement.accent}
                  </span>
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {n.problem.body}
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground">
                  {n.problem.turn}
                </p>
              </Reveal>

              {/* The fears — typographic rows, deliberately unadorned */}
              <Stagger className="mt-8 max-w-2xl">
                {n.problem.fears.map((fear) => (
                  <StaggerItem key={fear}>
                    <p className="border-t border-border/60 py-4 font-serif text-xl leading-snug tracking-tight md:text-2xl">
                      {fear}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {n.problem.close}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The belief — deep teal band, the one line everything follows from */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink text-[#FAF4EC]">
        <Container className="py-24 md:py-36">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center font-serif text-3xl font-medium leading-[1.2] tracking-tight md:text-[3rem]">
              {n.belief.quote}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-10 max-w-xl text-center text-lg leading-relaxed text-[#FAF4EC]/70">
              {n.belief.support}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The Method — five movements, alternating and type-led             */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <p className="text-eyebrow text-brand">{n.method.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display-sm mt-6 font-medium">
                  {n.method.title}
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:self-end">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {n.method.lead}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            {n.movements.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={m.index}>
                  <article className="grid items-baseline gap-x-8 gap-y-5 border-t border-border/60 py-12 md:grid-cols-12 md:py-20">
                    <div
                      className={cn(
                        "md:col-span-7",
                        flip && "md:order-2 md:col-start-6 md:text-right",
                      )}
                    >
                      <span className="font-mono text-sm text-brand">
                        {m.index}
                      </span>
                      <h3 className="mt-4 font-serif text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                        {m.name}
                      </h3>
                      <p className="mt-4 font-serif text-xl italic leading-snug text-brand md:text-2xl">
                        {m.question}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "text-lg leading-relaxed text-muted-foreground md:col-span-4 md:self-end",
                        flip ? "md:order-1 md:col-start-1" : "md:col-start-9",
                      )}
                    >
                      {m.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What it is — three parts, label column + type                     */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg" className="bg-secondary/50">
        <Container>
          <Reveal>
            <p className="text-eyebrow text-brand">{n.pillars.eyebrow}</p>
            <h2 className="text-display-sm mt-6 max-w-2xl font-medium">
              {n.pillars.title}
            </h2>
          </Reveal>

          <Stagger className="mt-14 md:mt-20">
            {n.parts.map((p) => (
              <StaggerItem key={p.label}>
                <article className="grid gap-x-8 gap-y-4 border-t border-foreground/15 py-10 md:grid-cols-12 md:py-14">
                  <p className="text-eyebrow md:col-span-3 md:pt-2">
                    {p.label}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          {/* What it isn't — the honest counterpoint */}
          <Reveal>
            <div className="mt-16 border-t border-foreground/15 pt-12 md:mt-20">
              <p className="text-eyebrow text-brand">{n.isNot.eyebrow}</p>
              <div className="mt-8 grid gap-10 sm:grid-cols-3">
                {n.isNot.items.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-serif text-xl font-medium leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The deliverable — the five branded templates                      */}
      {/* Numbered editorial rows, not a five-up icon grid.                 */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <p className="text-eyebrow text-brand">
                  {n.deliverable.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display-sm mt-6 font-medium">
                  {n.deliverable.title}
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:self-end">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {n.deliverable.lead}
                </p>
              </Reveal>
            </div>
          </div>

          <Stagger className="mt-14 md:mt-20">
            {n.documents.map((d) => (
              <StaggerItem key={d.index}>
                <article className="grid gap-x-8 gap-y-3 border-t border-border/60 py-8 md:grid-cols-12 md:py-10">
                  <span className="font-mono text-sm text-brand md:col-span-1 md:pt-2">
                    {d.index}
                  </span>
                  <div className="md:col-span-5">
                    <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight md:text-[1.75rem]">
                      {d.title}
                    </h3>
                    <p className="mt-1 font-serif text-lg italic text-brand">
                      {d.subtitle}
                    </p>
                  </div>
                  <p className="leading-relaxed text-muted-foreground md:col-span-6 md:self-center">
                    {d.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <p className="mt-12 max-w-xl border-t border-border/60 pt-8 text-lg leading-relaxed text-foreground">
              {n.deliverable.close}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why it works — the practice, written down                         */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Reveal>
                <p className="text-eyebrow text-brand">{n.proof.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display-sm mt-6 font-medium">
                  {n.proof.statement.lead}{" "}
                  <span className="italic text-brand">
                    {n.proof.statement.accent}
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
                  {n.proof.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.14}>
                <a
                  href={n.proof.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  {n.proof.link.label}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:pl-8">
              <Reveal delay={0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                  <Image
                    src="/work/katie-directing.jpg"
                    alt="Katie Spencer on set with a script during a media day shoot"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-[60%_center]"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 font-serif text-2xl italic leading-snug text-brand">
                  {n.proof.quote}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {n.proof.close}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Who it's for                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg" className="border-t border-border/60">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <p className="text-eyebrow text-brand">{n.audience.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display-sm mt-6 font-medium">
                  {n.audience.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
                  {n.audience.lead}
                </p>
              </Reveal>
            </div>

            <Stagger className="md:col-span-6 md:col-start-7">
              {n.audience.roles.map((r) => (
                <StaggerItem key={r.role}>
                  <div className="border-t border-border/60 py-6">
                    <h3 className="font-serif text-2xl font-medium tracking-tight">
                      {r.role}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal>
            <p className="mx-auto mt-20 max-w-3xl text-center font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic leading-[1.25] text-brand md:mt-28">
              {n.audience.beneficiary}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Close — the brand-accent invitation band                          */}
      {/* Uses brand/brand-foreground (not raw plum) so the pairing stays    */}
      {/* legible when the palette flips in dark mode.                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-brand text-brand-foreground">
        <Container className="py-20 md:py-28">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="text-eyebrow text-brand-foreground">
                {n.cta.eyebrow}
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight">
                {n.cta.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-foreground">
                {n.cta.body}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                <Link
                  href={n.cta.primary.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-foreground px-6 py-3 font-medium text-brand transition-transform hover:scale-[1.02]"
                >
                  {n.cta.primary.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={n.cta.secondary.href}
                  className="link-underline group inline-flex items-center gap-2 text-sm font-medium text-brand-foreground"
                >
                  {n.cta.secondary.label}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
