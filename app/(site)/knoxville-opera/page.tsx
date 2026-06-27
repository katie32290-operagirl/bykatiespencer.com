import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { createMetadata } from "@/lib/seo";

/**
 * Unlisted Knoxville Opera impact case study.
 * Linked only from the Work page's featured card — kept out of search and the
 * sitemap via robots: noindex. Numbers are from Katie's FY26 impact one-pager.
 *
 * Palette note: this page is where the full six-color system earns its keep —
 * off-white canvas, espresso ink, cherry brand, plum + olive stat fields, and a
 * true-black pull-quote for maximum contrast.
 */
export const metadata: Metadata = {
  ...createMetadata({
    title: "Knoxville Opera — Impact",
    description:
      "How a bold rebrand and sharper storytelling doubled first-time attendance and made La Bohème the best-selling production in company history.",
    path: "/knoxville-opera",
  }),
  robots: { index: false, follow: false },
};

const heroStats = [
  {
    value: "+101%",
    label: "first-time attendees / show",
    detail: "≈473 vs. 235 before",
    bg: "bg-brand",
    fg: "text-brand-foreground",
  },
  {
    value: "+27%",
    label: "revenue per show",
    detail: "$107k vs. $85k",
    bg: "bg-plum",
    fg: "text-[#f0efed]",
  },
  {
    value: "+35%",
    label: "annual donations",
    detail: "+65% FY26 vs. FY23",
    bg: "bg-olive",
    fg: "text-[#f0efed]",
  },
  {
    value: "+178%",
    label: "Rossini Festival net",
    detail: "the city's free street festival",
    bg: "bg-foreground",
    fg: "text-background",
  },
];

const moves = [
  {
    n: "01",
    title: "A rebrand with a spine",
    body: "A confident new visual identity and voice — built so a 47-year-old institution could feel current without losing its gravity.",
  },
  {
    n: "02",
    title: "Storytelling, not announcements",
    body: "Every season, show, and campaign reframed around a single question: why should anyone care? Film, social, and print all answered it together.",
  },
  {
    n: "03",
    title: "Audiences first",
    body: "Marketing engineered to convert curiosity into first-time attendance — and first-timers into the people who come back.",
  },
];

const moreResults = [
  { value: "40%", label: "overall audience growth" },
  { value: "+65%", label: "giving, FY26 vs. FY23" },
  { value: "#1", label: "La Bohème — best-selling production in company history" },
];

export default function KnoxvilleOperaCaseStudy() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero — espresso/ink over the Carmen media-day photograph          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-ink text-[#f0efed]">
        <div className="absolute inset-0">
          <Image
            src="/work/work-featured.jpg"
            alt="Knoxville Opera — Carmen media day"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
        </div>

        <Container className="relative">
          <div className="max-w-3xl py-28 md:py-40">
            <Reveal>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-eyebrow text-[#f0efed]/60 transition-colors hover:text-[#cf8079]"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                Work
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-8 text-eyebrow text-[#cf8079]">
                Case study · Brand &amp; Campaign
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mt-5 font-medium">
                Knoxville{" "}
                <span className="font-serif italic text-[#cf8079]">Opera.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#f0efed]/80">
                Reimagining a 47-year-old opera company for a new generation —
                and proving that the right story moves real numbers.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Hero stat band — cherry / plum / olive / espresso                 */}
      {/* ---------------------------------------------------------------- */}
      <Stagger className="grid grid-cols-2 lg:grid-cols-4">
        {heroStats.map((s) => (
          <StaggerItem key={s.value}>
            <div className={`${s.bg} ${s.fg} flex h-full flex-col justify-between gap-8 p-8 md:p-10`}>
              <p className="font-script text-5xl leading-none md:text-6xl">
                {s.value}
              </p>
              <div>
                <p className="text-sm font-medium leading-snug">{s.label}</p>
                <p className="mt-1 text-xs opacity-70">{s.detail}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* ---------------------------------------------------------------- */}
      {/* The challenge                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-eyebrow text-brand">The challenge</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <p className="font-serif text-2xl leading-relaxed tracking-tight md:text-3xl">
                A beloved institution with deep roots — and an audience that
                wasn&rsquo;t growing. The work was excellent. The problem
                was that not enough new people knew{" "}
                <span className="italic text-brand">why it mattered.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Opera carries a reputation for being formal, expensive, and for
                someone else. To reach a new generation, Knoxville Opera needed
                more than better ads — it needed a brand and a story confident
                enough to make the art feel like an invitation.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The approach                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="default" className="bg-secondary/50">
        <Container>
          <Reveal>
            <p className="text-eyebrow text-brand">What we did</p>
            <h2 className="mt-4 max-w-2xl text-display-sm font-medium">
              Three moves that changed the trajectory.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {moves.map((m) => (
              <StaggerItem key={m.n}>
                <div className="group h-full bg-background p-8 transition-colors hover:bg-accent md:p-10">
                  <p className="font-script text-4xl text-brand">{m.n}</p>
                  <h3 className="mt-5 font-serif text-xl font-medium tracking-tight">
                    {m.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {m.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Pull quote — true black, maximum contrast                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink text-[#f0efed]">
        <Container className="py-24 md:py-36">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center font-serif text-3xl font-medium leading-[1.25] tracking-tight md:text-[2.75rem]">
              &ldquo;A bold rebrand and sharper storytelling doubled first-time
              attendance and grew revenue per show 27% — and{" "}
              <span className="italic text-[#cf8079]">La Bohème</span>{" "}
              became the best-selling production in company
              history.&rdquo;
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* More results                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg">
        <Container>
          <Reveal>
            <p className="text-eyebrow text-brand">By the numbers</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-10 sm:grid-cols-3">
            {moreResults.map((r) => (
              <StaggerItem key={r.label}>
                <div className="border-t-2 border-olive pt-5">
                  <p className="font-serif text-5xl font-medium tracking-tight text-brand md:text-6xl">
                    {r.value}
                  </p>
                  <p className="mt-3 leading-snug text-muted-foreground">
                    {r.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA — plum invitation                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-plum text-[#f0efed]">
        <Container className="py-20 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="text-eyebrow text-[#f0efed]/50">The takeaway</p>
              <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight">
                Great organizations are built on stories people believe in.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#f0efed] px-6 py-3 font-medium text-plum transition-transform hover:scale-[1.02]"
                >
                  Let&rsquo;s build yours
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-2 text-sm text-[#f0efed]/70 transition-colors hover:text-[#f0efed]"
                >
                  Back to all work
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
