import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

/**
 * Work — everything below the marquee hero. Curated as bodies of work, not an
 * archive of artifacts: Knoxville Opera is the flagship case study with its
 * films, galas and print nested beneath as supporting evidence, then City Lyric
 * Opera, Narratives, GreenRoom and MyNanny stand as the other bodies of work.
 */

const MONO = "font-accent uppercase tracking-[0.12em]";
const PAD = "px-[clamp(20px,4.5vw,56px)]";

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const short = (id: string) => `https://www.youtube.com/shorts/${id}`;

/* A dotted-leader evidence row: title ···· kind. Reads like a program listing. */
function Evidence({
  href,
  label,
  kind,
  external = true,
}: {
  href: string;
  label: string;
  kind: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="font-serif text-[clamp(15.5px,1.7vw,18px)] leading-tight transition-colors group-hover:text-red">
        {label}
      </span>
      <span
        aria-hidden
        className="flex-1 translate-y-[-3px] border-b border-dotted border-ink-faint"
      />
      <span className={`${MONO} shrink-0 text-[9.5px] text-ink-faint`}>
        {kind} &rarr;
      </span>
    </>
  );
  const cls =
    "group flex items-baseline gap-3 py-[7px] text-ink no-underline";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* One body of work, set as a program entry: number, title, role, the case, a link. */
function Body({
  no,
  eyebrow,
  title,
  demonstrates,
  children,
  href,
  cta,
  external = true,
  tilt = "0deg",
}: {
  no: string;
  eyebrow: string;
  title: string;
  demonstrates: string;
  children: React.ReactNode;
  href?: string;
  cta?: string;
  external?: boolean;
  tilt?: string;
}) {
  const link =
    href && cta ? (
      external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${MONO} text-[11px] text-red transition-colors hover:text-red-deep`}
        >
          {cta} &rarr;
        </a>
      ) : (
        <Link
          href={href}
          className={`${MONO} text-[11px] text-red transition-colors hover:text-red-deep`}
        >
          {cta} &rarr;
        </Link>
      )
    ) : null;
  return (
    <div
      className="relative flex min-w-[300px] flex-1 flex-col border-t-2 border-ink pt-5"
      style={{ transform: `rotate(${tilt})` }}
    >
      <div className="mb-4 flex items-baseline gap-3">
        <span className={`${MONO} text-[13px] text-gold`}>{no}</span>
        <span className={`${MONO} text-[11px] text-ink-mid`}>{eyebrow}</span>
      </div>
      <h3 className="font-serif text-[clamp(28px,3.2vw,40px)] font-normal leading-[1.04]">
        {title}
      </h3>
      <p className="mt-2 font-serif text-[clamp(17px,1.9vw,21px)] italic text-ink-mid">
        {demonstrates}
      </p>
      <div className="mt-4 max-w-[440px] text-[15px] leading-[1.7] text-ink-mid">
        {children}
      </div>
      {link ? <div className="mt-5">{link}</div> : null}
    </div>
  );
}

export function WorkSections() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  The headliner — Knoxville Opera, the flagship body of work       */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`bg-green text-on-black ${PAD} py-[clamp(56px,8vw,100px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <Reveal className="mx-auto max-w-[1100px]">
          <p className={`mb-[34px] ${MONO} text-[12px] text-gold-bright`}>
            The headliner &middot; Brand &amp; audience strategy
          </p>
          <div className="flex flex-wrap items-center gap-[clamp(36px,5vw,72px)]">
            <div className="min-w-[320px] flex-[1.2]">
              <h2 className="mb-[18px] font-serif text-[clamp(36px,4.8vw,62px)] font-normal leading-[1.02]">
                Knoxville Opera
              </h2>
              <p className="mb-5 font-serif text-[clamp(19px,2.2vw,26px)] italic text-gold-pale">
                Reimagining a 47-year-old opera company for a new generation.
              </p>
              <p className="mb-[30px] max-w-[560px] text-[16px] leading-[1.7] text-on-black-soft">
                Four years leading brand, marketing and audience strategy for a
                beloved institution. A confident rebrand and sharper
                storytelling doubled first-time attendance and grew revenue per
                show 27%, and La Boh&egrave;me became the best-selling
                production in company history.
              </p>
              <Link
                href="/knoxville-opera"
                className="group inline-flex -rotate-[1.5deg] items-stretch no-underline transition-transform duration-300 hover:rotate-0 hover:-translate-y-1"
                style={{ boxShadow: "0 10px 26px rgba(0,0,0,.4)" }}
              >
                <span
                  className={`flex items-center border border-ink bg-paper-deep px-3 py-3.5 text-ink ${MONO} text-[11px]`}
                  style={{ borderRight: "1px dashed var(--ink)" }}
                >
                  Admit one
                </span>
                <span className="flex flex-col justify-center gap-[3px] border border-l-0 border-ink bg-paper-bright px-6 py-3 text-ink">
                  <span className={`${MONO} text-[10px] text-red`}>
                    The full production
                  </span>
                  <span className={`${MONO} text-[14px]`}>
                    See the case study &rarr;
                  </span>
                </span>
              </Link>
            </div>
            <div className="relative min-w-[300px] max-w-[580px] flex-[1.2]">
              <div
                className="border border-gold p-3 transition-transform duration-300 hover:rotate-0"
                style={{ transform: "rotate(var(--tilt-2))" }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/work/work-featured.jpg"
                    alt="Knoxville Opera on stage"
                    fill
                    sizes="(max-width: 768px) 90vw, 48vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                className="absolute bottom-[-26px] left-[-6%] bg-paper-bright px-5 py-3.5 text-ink"
                style={{ transform: "rotate(-3deg)", boxShadow: "0 6px 16px rgba(0,0,0,.4)" }}
              >
                <div className="font-serif text-[clamp(28px,3vw,38px)] leading-none text-red">
                  +101%
                </div>
                <div className={`mt-1.5 ${MONO} text-[10px] text-ink-mid`}>
                  first-time attendees / show
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Inside the Knoxville Opera work — the supporting evidence        */}
      {/* ---------------------------------------------------------------- */}
      <section className={`relative overflow-hidden ${PAD} py-[clamp(52px,7vw,90px)]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/peony-stem.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-50px] top-[-20px] w-[clamp(130px,15vw,220px)] rotate-[24deg]"
          style={{ filter: "drop-shadow(2px 4px 8px rgba(22,17,13,.25))" }}
        />
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <div className="mb-[clamp(28px,4vw,44px)] flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
              <h2 className="font-serif text-[clamp(28px,3.4vw,44px)] font-normal">
                Inside the work.
              </h2>
              <span className={`${MONO} text-[12px] text-ink-mid`}>
                Knoxville Opera &middot; selected pieces
              </span>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-x-[clamp(40px,6vw,80px)] gap-y-10">
              {/* Film & story — the full films lead */}
              <div className="min-w-[280px] flex-1">
                <p className={`mb-3 ${MONO} text-[11px] text-red`}>
                  Film &amp; story
                </p>
                <Evidence href={yt("LW18K-g2zmo")} label="Carmen, explained in 60 seconds" kind="film" />
                <Evidence href={yt("VZYnfdr1uJA")} label="Season year in review" kind="film" />
                <Evidence href={yt("sFTJvKsy97I")} label="Meeting the Moment" kind="film" />
                <Evidence href={yt("ZqJPkheBt-4")} label="Behind the Music" kind="film" />
                {/* reels read as a smaller, secondary collection */}
                <p className={`mb-1 mt-6 ${MONO} text-[10px] text-ink-faint`}>
                  Short-form
                </p>
                <Evidence href={short("Y4kyen1P47k")} label="Confessions: Simone" kind="reel" />
                <Evidence href={short("D5f847ntDYw")} label="Pirates: opening night" kind="reel" />
              </div>
              {/* On stage & in print */}
              <div className="min-w-[280px] flex-1">
                <p className={`mb-3 ${MONO} text-[11px] text-red`}>
                  On stage &amp; in print
                </p>
                <Evidence href={yt("kHryFCWRDAY")} label="Opera Ball, the signature gala" kind="event" />
                <Evidence href={yt("xsYWaTxkcW4")} label="Couture for a Cause" kind="event" />
                <Evidence href="/work/ko-program-book.pdf" label="Season program book" kind="print" />
                <Evidence href="/work/ko-annual-fund-appeal.pdf" label="Annual fund appeal" kind="print" />
                <Evidence href={yt("yHaSkgQCKOw")} label="Honoring George Bitzas" kind="tribute" />
                <p className="mt-5 font-serif text-[15px] italic text-ink-faint">
                  Films with Vessul Creative. Program design with Robin Easter
                  Design.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The rest of the repertoire — the other bodies of work            */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative border-t border-line bg-paper-deep ${PAD} py-[clamp(56px,8vw,100px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <p className={`mb-2.5 ${MONO} text-[12px] text-ink-mid`}>
              The rest of the repertoire
            </p>
            <h2 className="mb-[clamp(40px,6vw,64px)] max-w-[760px] font-serif text-[clamp(30px,3.8vw,50px)] font-normal leading-[1.06]">
              Organizations built, brands shaped, and products made for the
              field.
            </h2>
          </Reveal>

          {/* GreenRoom — the venture, set apart from the program tiles */}
          <Reveal>
            <div className="mb-[clamp(48px,6vw,72px)] border-t-2 border-ink pt-6">
              <div className="mb-4 flex items-baseline gap-3">
                <span className={`${MONO} text-[11px] text-gold`}>
                  The venture
                </span>
                <span className={`${MONO} text-[11px] text-ink-mid`}>
                  Founder &middot; Software
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-[clamp(36px,5vw,72px)] gap-y-4">
                <h3 className="font-serif text-[clamp(38px,4.6vw,58px)] font-normal leading-[1]">
                  GreenRoom
                </h3>
                <p className="font-serif text-[clamp(18px,2vw,23px)] italic text-ink-mid">
                  Software for performing arts organizations.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap items-end justify-between gap-x-[clamp(36px,5vw,64px)] gap-y-5">
                <p className="max-w-[560px] text-[15.5px] leading-[1.7] text-ink-mid">
                  Fundraising, marketing, ticketing and operations in one
                  platform, built by people who have actually run the box office.
                  Proof that the point of view scales past a single company.
                </p>
                <a
                  href="https://greenroomcrm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${MONO} shrink-0 text-[12px] text-red transition-colors hover:text-red-deep`}
                >
                  Visit GreenRoom &rarr;
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-x-[clamp(40px,6vw,80px)] gap-y-[clamp(44px,6vw,64px)]">
              <Body
                no="01"
                eyebrow="Founder &middot; Story strategy"
                title="Narratives"
                demonstrates="Turning a season into something audiences want to step inside."
                href="/narratives"
                cta="Explore Narratives"
                external={false}
                tilt="0.5deg"
              >
                The practice that grew out of the Knoxville work. Narratives
                finds the story underneath a season and shapes it into something
                an audience can understand, feel, and join.
              </Body>
              <Body
                no="02"
                eyebrow="Co-founder &middot; New York"
                title="City Lyric Opera"
                demonstrates="Building an organization from nothing."
                href={yt("J9rGZCJzTtY")}
                cta="Watch the trailer"
                tilt="-0.5deg"
              >
                Co-founded a company that makes opera feel current for a young
                New York audience. The proof it works: a full production, a real
                following, and a model other companies now study.
              </Body>
              <Body
                no="03"
                eyebrow="Brand &amp; systems"
                title="MyNanny"
                demonstrates="The same instinct, outside the arts."
                tilt="0.4deg"
              >
                Brand, voice and onboarding for a childcare company. One body of
                work in three guides that make a new family feel oriented and
                cared for, proof the method isn&rsquo;t really about opera.
                <span className="mt-4 flex flex-col gap-1.5">
                  <a
                    href="/work/mynanny-interview.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${MONO} text-[10.5px] text-red transition-colors hover:text-red-deep`}
                  >
                    The interview guide &rarr;
                  </a>
                  <a
                    href="/work/mynanny-onboarding.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${MONO} text-[10.5px] text-red transition-colors hover:text-red-deep`}
                  >
                    The onboarding &rarr;
                  </a>
                  <a
                    href="/work/mynanny-trial.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${MONO} text-[10.5px] text-red transition-colors hover:text-red-deep`}
                  >
                    The trial day &rarr;
                  </a>
                </span>
              </Body>
            </div>
          </Reveal>

          <p className="mt-[clamp(40px,5vw,60px)] text-center font-serif text-[17px] italic text-ink-mid">
            Every project is a collaboration. Every result is shared.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Trusted by — on handled paper                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`border-t border-ink bg-paper-bright ${PAD} py-[clamp(48px,7vw,80px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <Reveal className="mx-auto max-w-[720px]">
          <p className={`mb-[30px] text-center ${MONO} text-[12px]`}>
            Trusted by
          </p>
          <div className={`grid gap-3.5 ${MONO} text-[clamp(12px,1.5vw,15px)]`}>
            {[
              "Knoxville Opera",
              "City Lyric Opera",
              "Savannah VOICE Festival",
              "New York Opera Alliance",
              "Nonprofit New York",
              "MyNanny",
            ].map((name, i) => (
              <div key={name} className="flex items-baseline gap-3">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="flex-1 border-b-2 border-dotted border-ink-faint" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
