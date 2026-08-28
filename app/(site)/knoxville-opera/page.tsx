import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/seo";

/**
 * Unlisted Knoxville Opera impact case study, rebuilt in the "Opening Night"
 * collage system — a hand-assembled vintage-theatre playbill. Photography-led:
 * a dark proscenium masthead, ticket-stub stat callouts, program-page pull
 * quotes, tilted production photos taped to the page. Copy is unchanged.
 *
 * Linked only from the Work page's featured card — kept out of search and the
 * sitemap via robots: noindex. Numbers are from Katie's FY26 impact one-pager.
 */
export const metadata: Metadata = {
  ...createMetadata({
    title: "Knoxville Opera: Impact",
    description:
      "How a bold rebrand and sharper storytelling doubled first-time attendance and made La Bohème the best-selling production in company history.",
    path: "/knoxville-opera",
  }),
  robots: { index: false, follow: false },
};

const PAD = "px-[clamp(20px,4.5vw,56px)]";

const heroStats = [
  {
    value: "+101%",
    label: "first-time attendees / show",
    detail: "≈473 vs. 235 before",
    stub: "Act I",
    accent: "text-red-deep",
    tilt: "-1.6deg",
  },
  {
    value: "+27%",
    label: "revenue per show",
    detail: "$107k vs. $85k",
    stub: "Act II",
    accent: "text-green",
    tilt: "1.1deg",
  },
  {
    value: "+35%",
    label: "annual donations",
    detail: "+65% FY26 vs. FY23",
    stub: "Act III",
    accent: "text-gold",
    tilt: "-0.7deg",
  },
  {
    value: "+178%",
    label: "Rossini Festival net",
    detail: "the city's free street festival",
    stub: "Encore",
    accent: "text-burgundy",
    tilt: "2.2deg",
  },
];

const moves = [
  {
    n: "01",
    title: "A rebrand with a spine",
    body: "A confident new visual identity and voice, built so a 47-year-old institution could feel current without losing its gravity.",
    tilt: "-1.1deg",
    tape: "12%",
  },
  {
    n: "02",
    title: "Storytelling, not announcements",
    body: "Every season, show, and campaign reframed around a single question: why should anyone care? Film, social, and print all answered it together.",
    tilt: "1.1deg",
    tape: "62%",
  },
  {
    n: "03",
    title: "Audiences first",
    body: "Marketing engineered to convert curiosity into first-time attendance, and first-timers into the people who come back.",
    tilt: "-0.7deg",
    tape: "40%",
  },
];

const moreResults = [
  { value: "40%", label: "overall audience growth" },
  { value: "+65%", label: "giving, FY26 vs. FY23" },
  { value: "#1", label: "La Bohème, best-selling production in company history" },
];

export default function KnoxvilleOperaCaseStudy() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Masthead — dark proscenium over the Carmen media-day photograph  */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative z-[4] overflow-hidden bg-ink text-on-black ${PAD}`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        {/* scrim'd production still */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/work/work-featured.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 to-transparent" />
        </div>

        {/* thin gold ring, like a spotlight edge */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[6%] z-0 aspect-square -translate-x-1/2 rounded-full"
          style={{
            width: "clamp(320px,44vw,620px)",
            border: "1.5px solid var(--gold)",
            opacity: 0.6,
          }}
        />
        {/* gold star — the page's single twinkle */}
        <span
          data-anim="true"
          aria-hidden
          className="absolute z-[1] leading-none text-gold-bright [animation:ks-star-twinkle_2.4s_ease_1s_1]"
          style={{ left: "13%", top: "16%", fontSize: "clamp(30px,4vw,52px)" }}
        >
          &#10022;
        </span>

        <div className="relative mx-auto max-w-[1180px] pb-[clamp(64px,9vw,120px)] pt-[clamp(40px,6vw,80px)]">
          <Reveal>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.12em] text-on-black-mute transition-colors hover:text-gold-pale"
            >
              <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
              Work
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-9 font-accent text-xs uppercase tracking-[0.12em] text-gold-bright">
              Case study &middot; Brand &amp; Campaign
            </p>
          </Reveal>

          {/* marquee wordmark */}
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-[14ch] font-serif text-[clamp(52px,10vw,148px)] font-medium leading-[0.92]">
              Knoxville{" "}
              <span className="italic text-gold-pale">Opera.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[560px] text-[clamp(17px,1.6vw,20px)] leading-[1.65] text-on-black-soft">
              Reimagining a 47-year-old opera company for a new generation, and
              proving that the right story moves real numbers.
            </p>
          </Reveal>

          {/* tilted ticket leaning into the corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-[clamp(-14px,1vw,32px)] top-[clamp(20px,4vw,64px)] z-[2] hidden w-[clamp(150px,17vw,250px)] md:block"
            style={{ transform: "rotate(-7deg)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/ticket-opening-night.webp"
              alt=""
              className="block w-full"
              style={{
                clipPath: "polygon(5% 13%, 95% 9%, 97% 87%, 4% 91%)",
                filter: "drop-shadow(0 6px 16px rgba(0,0,0,.5))",
              }}
            />
          </span>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Stat band — ticket-stub callouts on warm paper                   */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative border-t-2 border-ink bg-paper ${PAD} py-[clamp(56px,8vw,96px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="mb-9 text-center font-accent text-xs uppercase tracking-[0.12em] text-red">
              The house count &middot; FY26
            </p>
          </Reveal>
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((s, i) => (
              <Reveal key={s.value} delay={i * 0.06}>
                <div
                  className="flex items-stretch"
                  style={{
                    transform: `rotate(${s.tilt})`,
                    boxShadow: "var(--shadow-paper)",
                  }}
                >
                  {/* perforated stub */}
                  <span
                    className="flex items-center border border-r-0 border-ink bg-paper-deep px-3 py-4 font-accent text-[10px] uppercase tracking-[0.14em] text-ink [border-right:1px_dashed_var(--ink)] [writing-mode:vertical-rl]"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    {s.stub}
                  </span>
                  {/* body */}
                  <div className="flex flex-1 flex-col justify-between gap-4 border border-l-0 border-ink bg-paper-bright p-5">
                    <p className={`font-serif text-[clamp(44px,5vw,58px)] font-medium leading-none ${s.accent}`}>
                      {s.value}
                    </p>
                    <div>
                      <p className="font-accent text-[11px] uppercase leading-snug tracking-[0.1em] text-ink">
                        {s.label}
                      </p>
                      <p className="mt-1.5 font-serif text-[15px] italic leading-tight text-muted-foreground">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The challenge — program page + a taped production still          */}
      {/* ---------------------------------------------------------------- */}
      <section className={`relative bg-paper-bright ${PAD} py-[clamp(64px,9vw,120px)]`}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-[clamp(36px,5vw,80px)]">
          <div className="min-w-[320px] flex-[1.25]">
            <Reveal>
              <p className="mb-8 font-accent text-xs uppercase tracking-[0.12em] text-red">
                Act I &middot; The challenge
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-[660px] font-serif text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.12]">
                A beloved institution with deep roots, and an audience that
                wasn&rsquo;t growing. The work was excellent. The problem was
                that not enough new people knew{" "}
                <span className="italic text-red">why it mattered.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[560px] text-[17px] leading-[1.7] text-muted-foreground">
                Opera carries a reputation for being formal, expensive, and for
                someone else. To reach a new generation, Knoxville Opera needed
                more than better ads. It needed a brand and a story confident
                enough to make the art feel like an invitation.
              </p>
            </Reveal>
          </div>

          {/* tilted photo scrap */}
          <Reveal delay={0.08} className="relative mx-auto min-w-[260px] max-w-[380px] flex-1">
            <div
              className="bg-[#F8F1E2] p-2.5 transition-transform duration-300 hover:-translate-y-1 hover:[transform:rotate(0deg)]"
              style={{ transform: "rotate(1.8deg)", boxShadow: "var(--shadow-paper)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/build-knoxville.jpg"
                alt="A Knoxville Opera production on stage"
                className="block w-full"
                style={{ aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "42% 42%" }}
              />
              <p className="pt-3 font-accent text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                on stage &middot; the work was never the problem
              </p>
            </div>
            <span className="ks-tape absolute -top-3 left-[14%] z-[2]" />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  What we did — deep theatre green, three taped program cards      */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative overflow-hidden bg-green text-on-black ${PAD} py-[clamp(64px,9vw,120px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className="mb-4 font-accent text-xs uppercase tracking-[0.12em] text-gold-bright">
              Act II &middot; What we did
            </p>
            <h2 className="max-w-[16ch] font-serif text-[clamp(34px,5vw,64px)] font-medium leading-[1.04]">
              Three moves that changed the{" "}
              <em className="italic text-gold-pale">trajectory.</em>
            </h2>
          </Reveal>

          <div className="mt-[clamp(44px,6vw,72px)] grid gap-x-7 gap-y-11 md:grid-cols-3">
            {moves.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.08}>
                <div
                  className="group relative h-full border border-ink bg-paper-bright p-7 pt-8 text-ink transition-transform duration-300 hover:-translate-y-1 hover:[transform:rotate(0deg)]"
                  style={{
                    transform: `rotate(${m.tilt})`,
                    boxShadow: "var(--shadow-paper)",
                  }}
                >
                  <span className="ks-tape absolute -top-3" style={{ left: m.tape }} />
                  <p className="font-serif text-[clamp(40px,4vw,52px)] font-medium italic leading-none text-red">
                    {m.n}
                  </p>
                  <h3 className="mt-5 font-serif text-[clamp(21px,2.2vw,27px)] font-medium leading-[1.12]">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                    {m.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Pull quote — velvet burgundy, program-note italic               */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative overflow-hidden border-t-4 border-gold bg-burgundy text-on-black ${PAD} py-[clamp(72px,10vw,140px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-[clamp(36px,5vw,72px)]">
          <Reveal className="min-w-[320px] flex-[1.4]">
            <p className="mb-7 font-accent text-xs uppercase tracking-[0.12em] text-gold-bright">
              &#10022; From the review
            </p>
            <p className="max-w-[720px] font-serif text-[clamp(28px,3.6vw,50px)] font-medium leading-[1.16]">
              &ldquo;A bold rebrand and sharper storytelling doubled first-time
              attendance and grew revenue per show 27%, and{" "}
              <span className="italic text-gold-pale">La Bohème</span> became the
              best-selling production in company history.&rdquo;
            </p>
          </Reveal>

          {/* tilted photo scrap on the velvet */}
          <Reveal delay={0.08} className="relative mx-auto min-w-[220px] max-w-[300px] flex-1 [transform:rotate(-2deg)]">
            <div
              className="bg-[#F8F1E2] p-2.5"
              style={{ boxShadow: "0 10px 28px rgba(0,0,0,.42)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/couture-red.jpg"
                alt="Knoxville Opera campaign portrait"
                className="block w-full"
                style={{ aspectRatio: "3 / 4", objectFit: "cover" }}
              />
              <p className="pt-3 font-accent text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                the invitation, dressed for the occasion
              </p>
            </div>
            <span className="ks-tape absolute -top-3 right-[16%] z-[2]" />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  By the numbers — marquee callouts with dotted leaders            */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative bg-paper ${PAD} py-[clamp(64px,9vw,110px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
              <h2 className="font-serif text-[clamp(30px,4vw,50px)] font-medium">
                By the numbers
              </h2>
              <span className="font-accent text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Encore &middot; the ledger
              </span>
            </div>
          </Reveal>

          <div className="mt-[clamp(36px,5vw,56px)] grid gap-x-9 gap-y-12 sm:grid-cols-3">
            {moreResults.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.08}>
                <div className="border-t-2 border-ink pt-5">
                  <p className="font-serif text-[clamp(52px,6vw,80px)] font-medium leading-none text-red">
                    {r.value}
                  </p>
                  <p className="mt-4 font-accent text-[11px] uppercase leading-[1.6] tracking-[0.1em] text-ink">
                    {r.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The takeaway — near-black, the curtain call                      */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative overflow-hidden bg-ink text-on-black ${PAD} py-[clamp(64px,9vw,120px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <div className="mx-auto flex max-w-[1180px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-[620px]">
            <p className="mb-5 font-accent text-xs uppercase tracking-[0.12em] text-on-black-mute">
              The takeaway
            </p>
            <h2 className="font-serif text-[clamp(32px,4.4vw,58px)] font-medium leading-[1.04]">
              Great organizations are built on{" "}
              <em className="italic text-gold-pale">stories people believe in.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-5">
              {/* ticket-stub CTA */}
              <Link
                href="/contact"
                className="inline-flex items-stretch [transform:rotate(-1.5deg)] transition-transform duration-300 hover:translate-y-[-4px] hover:[transform:rotate(0deg)]"
                style={{ boxShadow: "0 10px 26px rgba(0,0,0,.4)" }}
              >
                <span className="flex items-center border border-ink border-r-0 bg-paper-deep px-3 py-3.5 font-accent text-[11px] uppercase tracking-[0.13em] text-ink [border-right:1px_dashed_var(--ink)]">
                  Admit one
                </span>
                <span className="flex flex-col justify-center gap-[3px] border border-l-0 border-ink bg-paper-bright px-6 py-3 text-ink">
                  <span className="font-accent text-[10px] uppercase tracking-[0.13em] text-red">
                    Your organization
                  </span>
                  <span className="font-accent text-sm uppercase tracking-[0.1em]">
                    Let&rsquo;s build yours &rarr;
                  </span>
                </span>
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.12em] text-on-black-soft transition-colors hover:text-on-black"
              >
                Back to all work
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
