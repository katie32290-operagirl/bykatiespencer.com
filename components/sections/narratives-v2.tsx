import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { YtThumb } from "@/components/yt-thumb";
import { narratives as n } from "@/content/narratives";
import { cn } from "@/lib/utils";

const DOTS = "....................";

/** Dotted leader row: label ···· value, in the typewriter register. */
function MonoLeader({
  label,
  value,
  valueClass,
  dotClass = "text-ink-faint",
  className,
}: {
  label: string;
  value: string;
  valueClass?: string;
  dotClass?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-2.5", className)}>
      <span>{label}</span>
      <span
        aria-hidden
        className={cn(
          "flex-1 overflow-hidden whitespace-nowrap tracking-[3px]",
          dotClass,
        )}
      >
        {DOTS}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

/**
 * Narratives — Design System v2, "House Lights".
 *
 * The engagement page, re-set as a printed program. Order is still the
 * argument: why this exists, the belief, how it runs, the method, the named
 * deliverables, the proof, and only then who it's for and how to begin.
 *
 * Grounds alternate paper / near-black; the program is the structure. All copy
 * is preserved from content/narratives.ts.
 */
export function NarrativesV2() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  1 · Title page — the program cover                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-20 pt-28 sm:px-14 md:pb-24 md:pt-36">
        <Reveal className="mx-auto max-w-[1180px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            {n.eyebrow}
          </p>
          <h1 className="mt-5 max-w-[900px] font-serif text-[clamp(46px,7vw,104px)] leading-[0.98]">
            {n.headline.lead}{" "}
            <span className="text-brand">{n.headline.accent}</span>
          </h1>

          <div className="mt-12 flex flex-wrap items-start gap-x-16 gap-y-10">
            <div className="flex-[1_1_460px]">
              <p className="max-w-[520px] font-serif text-[clamp(22px,2.6vw,34px)] italic leading-[1.2] text-brand">
                {n.promise}
              </p>
              <div className="mt-9">
                <Link
                  href={n.primaryCta.href}
                  className="inline-block rounded-[2px] bg-ink px-8 py-4 font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-paper transition-opacity hover:opacity-90"
                >
                  {n.primaryCta.label} &rarr;
                </Link>
              </div>
            </div>
            <div className="flex-[1_1_360px]">
              <div
                aria-hidden
                className="mb-6 flex items-center gap-3 text-ink-faint"
              >
                <span className="h-px w-16 bg-border" />
                <span className="size-1.5 rounded-full bg-brand" />
              </div>
              <p className="max-w-[500px] text-lg leading-[1.7] text-muted-foreground">
                {n.intro}
              </p>
              <div className="mt-8 max-w-[360px] font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                <MonoLeader label="A campaign method" value="Katie Spencer" />
              </div>
            </div>
          </div>

          <figure className="mt-14">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[6px] sm:aspect-[21/9]">
              <Image
                src="/v3/on-stage.jpg"
                alt="A season being filmed on stage at the Tennessee Theatre"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[60%_38%]"
              />
            </div>
            <figcaption className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              The Tennessee Theatre &middot; a season in the making
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  2 · Why Narratives exists                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-20 sm:px-14 md:pb-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground pt-7">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              {n.problem.eyebrow}
            </p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Act I
            </p>
          </div>

          <h2 className="mt-6 max-w-[840px] font-serif text-[clamp(30px,4vw,52px)] leading-[1.08]">
            {n.problem.statement.lead}{" "}
            <span className="italic text-brand">
              {n.problem.statement.accent}
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap gap-x-16 gap-y-8">
            <div className="max-w-[560px] flex-[1_1_460px]">
              <p className="text-lg leading-[1.7] text-muted-foreground">
                {n.problem.body}
              </p>
              <p className="mt-7 text-lg leading-[1.7] text-foreground">
                {n.problem.turn}
              </p>
              <p className="mt-8 text-lg leading-[1.7] text-muted-foreground">
                {n.problem.close}
              </p>
            </div>

            <div className="flex-[1_1_360px]">
              <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                {n.problem.fearsLead}
              </p>
              <div className="mt-3">
                {n.problem.fears.map((fear) => (
                  <p
                    key={fear}
                    className="border-t border-border py-4 font-serif text-xl leading-snug last:border-b"
                  >
                    {fear}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  3 · The belief — near-black                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-ink px-6 py-28 text-on-black sm:px-14 md:py-36">
        <Image
          src="/v3/in-rehearsal.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_28%] opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />
        <Reveal className="relative mx-auto max-w-[1180px] text-center">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            The belief
          </p>
          <p className="mx-auto mt-8 max-w-[900px] font-serif text-[clamp(30px,4.6vw,56px)] leading-[1.12]">
            {n.belief.quote}
          </p>
          <p className="mx-auto mt-9 max-w-[560px] text-lg leading-[1.7] text-on-black-soft">
            {n.belief.support}
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  4 · How it works — three steps, one season                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground pt-7">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              {n.process.eyebrow}
            </p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Act II
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
            <h2 className="font-serif text-[clamp(32px,4.4vw,60px)] leading-[1.03]">
              {n.process.title}
            </h2>
            <p className="max-w-[440px] text-lg leading-[1.7] text-muted-foreground">
              {n.process.lead}
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {n.process.steps.map((s) => (
              <div key={s.index} className="border-t-2 border-foreground pt-6">
                <span className="font-accent text-[13px] tracking-[0.12em] text-brand">
                  {s.index}
                </span>
                <h3 className="mt-3 font-serif text-[26px] leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 leading-[1.6] text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  5 · The method — five movements, near-black                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
            <div>
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
                {n.method.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-[clamp(32px,4.4vw,60px)] leading-[1.03]">
                {n.method.title}
              </h2>
            </div>
            <p className="max-w-[460px] text-lg leading-[1.7] text-on-black-soft">
              {n.method.lead}
            </p>
          </div>

          <div className="mt-12">
            {n.movements.map((m) => (
              <article
                key={m.index}
                className="grid items-baseline gap-x-8 gap-y-2 border-t border-line-dark py-7 md:grid-cols-12 md:py-9"
              >
                <span className="font-accent text-[13px] tracking-[0.12em] text-brand md:col-span-1">
                  {m.index}
                </span>
                <h3 className="font-serif text-[clamp(28px,3.2vw,40px)] leading-none md:col-span-3">
                  {m.name}
                </h3>
                <p className="font-serif text-lg italic leading-snug text-gold-pale md:col-span-4">
                  {m.question}
                </p>
                <p className="leading-[1.6] text-on-black-soft md:col-span-4">
                  {m.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  6 · The core deliverables                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground pt-7">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              {n.deliverable.eyebrow}
            </p>
            <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Act III
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
            <h2 className="font-serif text-[clamp(32px,4.4vw,60px)] leading-[1.03]">
              {n.deliverable.title}
            </h2>
            <p className="max-w-[440px] text-lg leading-[1.7] text-muted-foreground">
              {n.deliverable.lead}
            </p>
          </div>

          <div className="mt-12">
            {n.documents.map((d) => (
              <article
                key={d.index}
                className="grid gap-x-8 gap-y-3 border-t border-border py-8 last:border-b md:grid-cols-12 md:py-9"
              >
                <span className="font-accent text-[13px] tracking-[0.12em] text-brand md:col-span-1 md:pt-2">
                  {d.index}
                </span>
                <div className="md:col-span-5">
                  <h3 className="font-serif text-[26px] leading-tight">
                    {d.title}
                  </h3>
                  <p className="mt-1 font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
                    {d.subtitle}
                  </p>
                </div>
                <p className="leading-[1.6] text-muted-foreground md:col-span-6 md:self-center">
                  {d.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-[720px] text-lg leading-[1.7] text-muted-foreground">
            {n.deliverable.flexibility}
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  7 · Proof — Knoxville Opera, near-black screening room          */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
            <div>
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
                {n.proof.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-[clamp(36px,5vw,72px)] leading-none">
                {n.proof.title}
              </h2>
            </div>
            <p className="max-w-[460px] text-lg leading-[1.7] text-on-black-soft">
              {n.proof.lead}
            </p>
          </div>

          <figure className="mt-12">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[6px] border border-line-dark">
              <Image
                src="/work/work-featured.jpg"
                alt="Knoxville Opera — the season on stage"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
              Knoxville Opera &middot; the campaign, in the house
            </figcaption>
          </figure>

          {/* The transformation at a glance */}
          <div className="mt-14 grid gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-5">
            {n.proof.chain.map((link, i) => (
              <div
                key={link}
                className="flex h-full flex-col gap-3 border-t border-line-dark pt-5"
              >
                <span
                  aria-hidden
                  className="flex items-center gap-2 text-brand"
                >
                  <span className="size-1.5 rounded-full bg-brand" />
                  {i < n.proof.chain.length - 1 && (
                    <span className="h-px flex-1 bg-line-dark" />
                  )}
                </span>
                <p className="font-serif text-lg leading-snug text-on-black">
                  {link}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-x-16 gap-y-8">
            <div className="max-w-[620px] flex-[1_1_460px] space-y-5 text-lg leading-[1.7] text-on-black-soft">
              {n.proof.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="flex-[1_1_320px] md:self-center">
              <p className="font-serif text-2xl italic leading-snug text-gold-pale">
                {n.proof.quote}
              </p>
            </div>
          </div>

          {/* The campaign, as it actually ran */}
          <div className="mt-16 flex flex-col gap-4 border-t border-line-dark pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
                {n.samples.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-[clamp(24px,3vw,34px)] leading-tight">
                {n.samples.title}
              </h3>
            </div>
            <Link
              href={n.samples.more.href}
              className="font-accent text-[11px] uppercase tracking-[0.12em] text-brand hover:text-red-deep"
            >
              {n.samples.more.label} &rarr;
            </Link>
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {n.samples.items.map((s) => (
              <a
                key={s.youtube}
                href={`https://www.youtube.com/watch?v=${s.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-[6px] border border-line-dark">
                  <YtThumb
                    id={s.youtube}
                    alt={s.title}
                    className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:scale-110"
                  >
                    <span className="ml-0.5 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
                  </span>
                </div>
                <p className="mt-4 font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
                  {s.label}
                </p>
                <h4 className="mt-1.5 font-serif text-xl leading-snug">
                  {s.title}
                </h4>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  8 · Why me — the working practice, with the set photo           */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-stretch gap-x-[70px] gap-y-12">
          <div className="flex-[1_1_480px]">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              {n.whyKatie.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[600px] font-serif text-[clamp(30px,3.8vw,50px)] leading-[1.06]">
              {n.whyKatie.title.lead}{" "}
              <span className="italic text-brand">
                {n.whyKatie.title.accent}
              </span>
            </h2>
            <p className="mt-7 max-w-[540px] text-lg leading-[1.7] text-muted-foreground">
              {n.whyKatie.body}
            </p>
            <p className="mt-8 max-w-[600px] font-serif text-[clamp(20px,2.2vw,28px)] leading-[1.3]">
              {n.whyKatie.quote}
            </p>
          </div>
          <div className="flex flex-[1_1_340px] border-l border-dashed border-ink-faint pl-10">
            <div>
              <div className="relative min-h-[420px] w-full overflow-hidden rounded-[6px]">
                <Image
                  src="/work/katie-directing.jpg"
                  alt="Katie Spencer on set with a script during a media day shoot"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[60%_center]"
                />
              </div>
              <p className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                On set, media day
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  9 · What it isn't                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-20 sm:px-14 md:pb-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground pt-7">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            {n.isNot.eyebrow}
          </p>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {n.isNot.items.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl leading-snug">{item.title}</h3>
                <p className="mt-3 leading-[1.6] text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  10 · Who it's for — near-black                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-start gap-x-16 gap-y-10">
            <div className="flex-[1_1_420px]">
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
                {n.audience.eyebrow}
              </p>
              <h2 className="mt-4 max-w-[440px] font-serif text-[clamp(30px,3.8vw,50px)] leading-[1.06]">
                {n.audience.title}
              </h2>
              <p className="mt-7 max-w-[420px] text-lg leading-[1.7] text-on-black-soft">
                {n.audience.lead}
              </p>
            </div>

            <div className="flex-[1_1_460px]">
              {n.audience.roles.map((r) => (
                <div
                  key={r.role}
                  className="border-t border-line-dark py-6 last:border-b"
                >
                  <h3 className="font-serif text-2xl leading-tight">{r.role}</h3>
                  <p className="mt-2 leading-[1.6] text-on-black-soft">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-16 max-w-[760px] text-center font-serif text-[clamp(22px,3vw,38px)] italic leading-[1.25] text-gold-pale">
            {n.audience.beneficiary}
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  11 · Engagement details — the fine print                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground pt-7">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-4">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              {n.engagement.eyebrow}
            </p>
            <h2 className="max-w-[560px] font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.05]">
              {n.engagement.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
            {n.engagement.items.map((d) => (
              <div key={d.title} className="border-t border-border pt-5">
                <h3 className="font-serif text-xl leading-snug">{d.title}</h3>
                <p className="mt-3 leading-[1.6] text-muted-foreground">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  12 · Curtain — the close                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-28">
        <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              {n.cta.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[640px] font-serif text-[clamp(34px,5vw,68px)] leading-[1.02]">
              {n.cta.title}
            </h2>
            <p className="mt-6 max-w-[520px] text-lg leading-[1.7] text-on-black-soft">
              {n.cta.body}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link
              href={n.cta.primary.href}
              className="inline-block rounded-[2px] bg-paper px-8 py-4 font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-ink transition-opacity hover:opacity-90"
            >
              {n.cta.primary.label} &rarr;
            </Link>
            <Link
              href={n.cta.secondary.href}
              className="font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-soft hover:text-on-black"
            >
              {n.cta.secondary.label} &rarr;
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
