import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { YtThumb } from "@/components/yt-thumb";
import { narratives as n } from "@/content/narratives";
import { createMetadata, jsonLdScript } from "@/lib/seo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Narratives — Katie's second venture, and the only page on the site that
 * sells an engagement rather than telling her story.
 *
 * Order is the argument: why this exists, how the work runs, the framework,
 * and only then the named deliverables. Leading with the list made the
 * engagement read as a fixed package of files, which it isn't.
 *
 * Deliberately typographic. No brand tile (the only Narratives lockup on file
 * still reads "by GreenRoom"), no icon grids, and no previews of the
 * deliverables themselves. Images appear only where showing beats describing:
 * the published campaign work, and Katie on set.
 *
 * All copy lives in content/narratives.ts.
 */
export const metadata: Metadata = createMetadata({
  title: "Narratives — Story strategy for the performing arts",
  description:
    "Narratives takes your season, finds the story audiences can enter through, and hands your team five custom working documents they can execute.",
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

/**
 * Eyebrow label, written out rather than using the site's `.text-eyebrow`
 * utility. That utility hard-sets `text-muted-foreground`, which silently
 * beats any color override on it, since Tailwind resolves competing utilities
 * by stylesheet order rather than class order.
 */
function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-xs font-medium uppercase tracking-[0.18em]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export default function NarrativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd())}
      />

      {/* ================================================================ */}
      {/* 1 · Hero — type only, one clear action                           */}
      {/* ================================================================ */}
      <section className="py-16 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow className="tracking-[0.32em] text-brand">
              {n.eyebrow}
            </Eyebrow>
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
              <Reveal delay={0.16}>
                <Link
                  href={n.primaryCta.href}
                  className="group mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-brand-foreground transition-transform hover:scale-[1.02]"
                >
                  {n.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
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
                <Eyebrow className="mt-8 text-muted-foreground">
                  {n.byline}
                </Eyebrow>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* 2 · Why Narratives exists                                        */}
      {/* ================================================================ */}
      <Section spacing="lg" className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow className="text-brand">{n.problem.eyebrow}</Eyebrow>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <Reveal delay={0.05}>
                <h2 className="font-serif text-2xl font-medium leading-[1.35] tracking-tight md:text-[2rem]">
                  {n.problem.statement.lead}{" "}
                  <span className="italic text-brand">
                    {n.problem.statement.accent}
                  </span>
                </h2>
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

              <Reveal delay={0.14}>
                <Eyebrow className="mt-10 text-muted-foreground">
                  {n.problem.fearsLead}
                </Eyebrow>
              </Reveal>

              {/* Typographic rows, deliberately unadorned */}
              <Stagger className="mt-4 max-w-2xl">
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

      {/* The belief the whole method follows from */}
      <section className="bg-ink text-[#FAF4EC]">
        <Container className="py-24 md:py-32">
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

      {/* ================================================================ */}
      {/* 3 · How it works — the client-facing sequence                    */}
      {/* ================================================================ */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Reveal>
                <Eyebrow className="text-brand">{n.process.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display-sm mt-6 font-medium">
                  {n.process.title}
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:self-end">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {n.process.lead}
                </p>
              </Reveal>
            </div>
          </div>

          <Stagger className="mt-14 grid gap-x-8 gap-y-10 md:mt-16 md:grid-cols-3">
            {n.process.steps.map((s) => (
              <StaggerItem key={s.index}>
                <div className="border-t-2 border-brand pt-6">
                  <span className="font-mono text-sm text-brand">
                    {s.index}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 4 · The method — how the thinking works                          */}
      {/* ================================================================ */}
      <Section spacing="lg" className="bg-secondary/50">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow className="text-brand">{n.method.eyebrow}</Eyebrow>
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

          {/* Tightened to one row per movement: name, question, answer.
              Alternation was too heavy directly after the three steps. */}
          <Stagger className="mt-12 md:mt-16">
            {n.movements.map((m) => (
              <StaggerItem key={m.index}>
                <article className="grid items-baseline gap-x-8 gap-y-2 border-t border-foreground/15 py-7 md:grid-cols-12 md:py-9">
                  <span className="font-mono text-sm text-brand md:col-span-1">
                    {m.index}
                  </span>
                  <h3 className="font-serif text-3xl font-medium leading-none tracking-tight md:col-span-3 md:text-4xl">
                    {m.name}
                  </h3>
                  <p className="font-serif text-lg italic leading-snug text-brand md:col-span-4">
                    {m.question}
                  </p>
                  <p className="leading-relaxed text-muted-foreground md:col-span-4">
                    {m.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 5 · The core deliverables — named, then explicitly not a package */}
      {/* ================================================================ */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Reveal>
                <Eyebrow className="text-brand">
                  {n.deliverable.eyebrow}
                </Eyebrow>
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

          <Stagger className="mt-14 md:mt-16">
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

          {/* The engagement is not a fixed set of files. Say so plainly,
              directly under the list that could imply otherwise. */}
          <Reveal>
            <p className="mt-12 max-w-3xl border-t border-border/60 pt-8 text-lg leading-relaxed text-muted-foreground">
              {n.deliverable.flexibility}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 6 · Proof — the transformation, then the detail                  */}
      {/* ================================================================ */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow className="text-brand">{n.proof.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display-sm mt-6 font-medium">
                  {n.proof.title}
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:self-end">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {n.proof.lead}
                </p>
              </Reveal>
            </div>
          </div>

          {/* The transformation at a glance */}
          <Stagger className="mt-14 grid gap-x-5 gap-y-6 sm:grid-cols-2 md:mt-16 md:grid-cols-5">
            {n.proof.chain.map((link, i) => (
              <StaggerItem key={link}>
                <div className="flex h-full flex-col gap-3 border-t border-border/60 pt-5">
                  <span
                    className="flex items-center gap-2 text-brand"
                    aria-hidden
                  >
                    <span className="size-1.5 rounded-full bg-brand" />
                    {i < n.proof.chain.length - 1 && (
                      <span className="h-px flex-1 bg-border" />
                    )}
                  </span>
                  <p className="font-serif text-lg leading-snug tracking-tight text-foreground">
                    {link}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Reveal>
                <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
                  {n.proof.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:self-center">
              <Reveal delay={0.08}>
                <p className="font-serif text-2xl italic leading-snug text-brand">
                  {n.proof.quote}
                </p>
              </Reveal>
            </div>
          </div>

          {/* The pieces themselves */}
          <Reveal>
            <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-10 sm:flex-row sm:items-end sm:justify-between md:mt-20">
              <div>
                <Eyebrow className="text-brand">{n.samples.eyebrow}</Eyebrow>
                <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight md:text-3xl">
                  {n.samples.title}
                </h3>
              </div>
              <Link
                href={n.samples.more.href}
                className="link-underline group inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {n.samples.more.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {n.samples.items.map((s) => (
              <StaggerItem key={s.youtube}>
                <a
                  href={`https://www.youtube.com/watch?v=${s.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                    <YtThumb
                      id={s.youtube}
                      alt={s.title}
                      className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-5 translate-x-0.5 fill-current" />
                    </span>
                  </div>
                  <Eyebrow className="mt-4 text-brand">{s.label}</Eyebrow>
                  <h4 className="mt-1.5 font-serif text-xl font-medium leading-snug tracking-tight">
                    {s.title}
                  </h4>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 7 · Why Katie                                                    */}
      {/* ================================================================ */}
      <Section spacing="lg" className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Reveal>
                <Eyebrow className="text-brand">{n.whyKatie.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-display-sm mt-6 font-medium">
                  {n.whyKatie.title.lead}{" "}
                  <span className="italic text-brand">
                    {n.whyKatie.title.accent}
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  {n.whyKatie.body}
                </p>
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
            </div>
          </div>

          <Reveal>
            <p className="mt-14 max-w-4xl font-serif text-2xl leading-[1.35] tracking-tight md:mt-16 md:text-[2rem]">
              {n.whyKatie.quote}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 8 · What it isn't                                                */}
      {/* ================================================================ */}
      <Section spacing="default" className="bg-secondary/50">
        <Container>
          {/* Heading carries the section semantically but stays a label
              visually, so this reads as an aside rather than a pitch. */}
          <Reveal>
            <h2 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-brand">
              {n.isNot.eyebrow}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {n.isNot.items.map((item) => (
              <Reveal key={item.title}>
                <h3 className="font-serif text-xl font-medium leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 9 · Who it's for                                                 */}
      {/* ================================================================ */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow className="text-brand">{n.audience.eyebrow}</Eyebrow>
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
            <p className="mx-auto mt-20 max-w-3xl text-center font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic leading-[1.25] text-brand md:mt-24">
              {n.audience.beneficiary}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 10 · Engagement details                                          */}
      {/* ================================================================ */}
      <Section spacing="default" className="border-t border-border/60">
        <Container>
          <Reveal>
            <Eyebrow className="text-brand">{n.engagement.eyebrow}</Eyebrow>
            <h2 className="text-display-sm mt-6 max-w-2xl font-medium">
              {n.engagement.title}
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 md:grid-cols-4">
            {n.engagement.items.map((d) => (
              <StaggerItem key={d.title}>
                <div className="border-t border-border/60 pt-5">
                  <h3 className="font-serif text-xl font-medium leading-snug tracking-tight">
                    {d.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* 11 · Close — brand/brand-foreground so the pairing survives dark */}
      {/* ================================================================ */}
      <section className="bg-brand text-brand-foreground">
        <Container className="py-20 md:py-28">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow className="text-brand-foreground">
                {n.cta.eyebrow}
              </Eyebrow>
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
