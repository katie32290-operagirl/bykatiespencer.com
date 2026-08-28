import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

/**
 * Work — everything below the marquee hero, faithful to the Opening Night
 * template: the green Knoxville headliner, the paper "program" of categorized
 * cards (film, reels, experiences, print, ventures), and the trusted-by roll.
 */

const MONO = "font-accent uppercase tracking-[0.12em]";
const PAD = "px-[clamp(20px,4.5vw,56px)]";

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const short = (id: string) => `https://www.youtube.com/shorts/${id}`;

const PERF = {
  backgroundImage:
    "radial-gradient(circle 2.5px at 8px 5px, var(--paper) 2.4px, transparent 2.6px)",
  backgroundSize: "16px 10px",
};

function Cat({ label }: { label: string }) {
  return (
    <p className={`mb-[18px] ${MONO} text-[11px] text-red`}>
      &#10022; {label}
    </p>
  );
}

/* A dark film-strip card */
function FilmCard({
  href,
  title,
  desc,
  credit,
  cta,
  tilt,
  mt = "",
  w = "clamp(220px,23vw,290px)",
}: {
  href: string;
  title: string;
  desc: string;
  credit: string;
  cta: string;
  tilt: string;
  mt?: string;
  w?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-[#201913] px-[18px] pb-5 pt-3 text-on-black no-underline transition-transform duration-300 hover:translate-y-[-4px] hover:rotate-0 ${mt}`}
      style={{ width: w, transform: `rotate(${tilt})`, boxShadow: "var(--shadow-paper)" }}
    >
      <div aria-hidden className="mb-3 h-2.5" style={PERF} />
      <div className="mb-2 font-serif text-[21px] leading-[1.15]">{title}</div>
      <p className="mb-2.5 text-[12.5px] leading-[1.55] text-on-black-soft">{desc}</p>
      <p className={`mb-2.5 ${MONO} text-[9px] text-on-black-mute`}>{credit}</p>
      <p className={`${MONO} text-[10px] text-gold-pale`}>{cta} &rarr;</p>
    </a>
  );
}

/* A reel — a colored program slip */
function ReelCard({
  href,
  label,
  bg,
  onDark,
  credit,
  tilt,
  mt = "",
  tape = false,
}: {
  href: string;
  label: string;
  bg: string;
  onDark?: boolean;
  credit: string;
  tilt: string;
  mt?: string;
  tape?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block w-[clamp(190px,19vw,240px)] bg-[#FBF6E9] p-2.5 pb-3.5 text-ink no-underline transition-transform duration-300 hover:translate-y-[-4px] ${mt}`}
      style={{ transform: `rotate(${tilt})`, boxShadow: "var(--shadow-paper)" }}
    >
      {tape && <span className="ks-tape absolute left-[34%] top-[-10px]" />}
      <div
        className={`flex aspect-[4/5] items-center justify-center px-3.5 text-center font-serif text-[19px] italic ${onDark ? "text-on-black" : "text-ink"}`}
        style={{ backgroundColor: bg, backgroundImage: onDark ? "var(--paper-grain-light)" : "var(--paper-grain)" }}
      >
        {label}
      </div>
      <p className={`pt-2 ${MONO} text-[10px] text-ink-mid`}>{credit} &rarr;</p>
    </a>
  );
}

/* A gala card — double-gold border on a dark ground */
function EventCard({
  href,
  title,
  desc,
  credit,
  bg,
  tilt,
  mt = "",
}: {
  href: string;
  title: string;
  desc: string;
  credit: string;
  bg: string;
  tilt: string;
  mt?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-[clamp(210px,22vw,260px)] border-[3px] border-double border-gold px-5 py-6 text-center text-on-black no-underline transition-transform duration-300 hover:translate-y-[-4px] ${mt}`}
      style={{ backgroundColor: bg, backgroundImage: "var(--paper-grain-light)", transform: `rotate(${tilt})`, boxShadow: "var(--shadow-paper)" }}
    >
      <div className="mb-2.5 text-[13px] text-gold-bright">&#10022;</div>
      <div className="mb-2 font-serif text-[23px] leading-[1.12]">{title}</div>
      <p className="mb-3 text-[12.5px] leading-[1.5] text-on-black-soft">{desc}</p>
      <p className={`mb-2.5 ${MONO} text-[9px] text-on-black-mute`}>{credit}</p>
      <p className={`${MONO} text-[10px] text-gold-pale`}>Watch the recap &rarr;</p>
    </a>
  );
}

export function WorkSections() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  The headliner — Knoxville Opera, on velvet green                 */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`bg-green text-on-black ${PAD} py-[clamp(56px,8vw,100px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <Reveal className="mx-auto max-w-[1100px]">
          <p className={`mb-[34px] ${MONO} text-[12px] text-gold-bright`}>
            The headliner &middot; Brand &amp; campaign
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
                A bold rebrand and sharper storytelling doubled first-time
                attendance and grew revenue per show 27%, and La Boh&egrave;me
                became the best-selling production in company history.
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
      {/*  The program — all work, on paper                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className={`relative overflow-hidden ${PAD} py-[clamp(56px,8vw,100px)]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/peony-stem.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-50px] top-[-20px] w-[clamp(130px,15vw,220px)] rotate-[24deg]"
          style={{ filter: "drop-shadow(2px 4px 8px rgba(22,17,13,.25))" }}
        />
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
              <h2 className="font-serif text-[clamp(32px,4vw,50px)] font-normal">
                Stories I&rsquo;ve helped bring to life.
              </h2>
              <span className={`${MONO} text-[12px] text-ink-mid`}>The program</span>
            </div>
            <p className="mb-[clamp(36px,5vw,56px)] font-serif text-[17px] italic text-ink-mid">
              strategy &middot; story &middot; production &middot; impact
            </p>
          </Reveal>

          {/* Film & video */}
          <Reveal>
            <Cat label="Film & video" />
            <div className="mb-[clamp(44px,6vw,64px)] flex flex-wrap items-start gap-x-[26px] gap-y-[22px]">
              <FilmCard href={yt("LW18K-g2zmo")} title="Carmen, explained in 60 seconds" desc="Making opera approachable for everyone." credit="video · Vessul Creative" cta="Watch the film" tilt="-1.2deg" w="clamp(230px,25vw,300px)" />
              <FilmCard href={yt("J9rGZCJzTtY")} title="City Lyric Opera" desc="A production trailer from the company I co-founded in New York." credit="video · Glitch" cta="Watch the trailer" tilt="1deg" mt="mt-4" />
              <FilmCard href={yt("VZYnfdr1uJA")} title="Knoxville Opera: Year in Review" desc="A season of impact, told in one cinematic recap." credit="video · Vessul Creative" cta="Watch the recap" tilt="-0.8deg" />
              <FilmCard href={yt("sFTJvKsy97I")} title="Meeting the Moment" desc="A film about why live performance still matters." credit="video · Vessul Creative" cta="Watch the film" tilt="1.2deg" mt="mt-5" w="clamp(210px,22vw,270px)" />
              <FilmCard href={yt("ZqJPkheBt-4")} title="Behind the Music" desc="Stories that deepen connection between artists and audiences." credit="video · Vessul Creative" cta="Watch the film" tilt="-1deg" w="clamp(210px,22vw,270px)" />
              <FilmCard href={yt("yHaSkgQCKOw")} title="Honoring George Bitzas" desc="A tribute film for the Opera Ball honoree." credit="video · Vessul Creative" cta="Watch the tribute" tilt="0.8deg" mt="mt-3.5" w="clamp(210px,22vw,270px)" />
            </div>
          </Reveal>

          {/* Reels */}
          <Reveal>
            <Cat label="Reels & social storytelling" />
            <div className="mb-[clamp(44px,6vw,64px)] flex flex-wrap items-start gap-x-[26px] gap-y-[22px]">
              <ReelCard href={short("0Ap9-34BuAI")} label="Social storytelling" bg="var(--rose)" credit="vessul creative · watch a reel" tilt="-2deg" tape />
              <ReelCard href={short("Y4kyen1P47k")} label="Confessions: Simone" bg="var(--burgundy)" onDark credit="vessul creative · watch" tilt="1.6deg" mt="mt-4" />
              <ReelCard href={short("3sJYs3yAwVE")} label="Confessions: La Ciesca" bg="var(--green)" onDark credit="vessul creative · watch" tilt="-1deg" />
              <ReelCard href={short("D5f847ntDYw")} label="Pirates: opening night" bg="var(--gold-pale)" credit="vessul creative · watch" tilt="2deg" mt="mt-2.5" />
            </div>
          </Reveal>

          {/* Experiences + Print */}
          <Reveal>
            <div className="mb-[clamp(44px,6vw,64px)] flex flex-wrap gap-[clamp(32px,5vw,64px)]">
              <div className="min-w-[300px] flex-1">
                <Cat label="Experiences & events" />
                <div className="flex flex-wrap gap-[22px]">
                  <EventCard href={yt("xsYWaTxkcW4")} title="Couture for a Cause" desc="A fundraising gala that feels like an experience, not an ask." credit="video · Vessul Creative" bg="var(--burgundy)" tilt="-1.4deg" />
                  <EventCard href={yt("kHryFCWRDAY")} title="Opera Ball" desc="The signature gala. An evening designed to move people." credit="video · Vessul Creative" bg="var(--green-deep)" tilt="1.2deg" mt="mt-4" />
                </div>
              </div>
              <div className="min-w-[300px] flex-1">
                <Cat label="Print & design" />
                <div className="flex flex-wrap gap-[22px]">
                  <a
                    href="/work/ko-program-book.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-[clamp(210px,22vw,260px)] border border-line bg-paper-bright px-[22px] py-[26px] text-center text-ink no-underline transition-transform duration-300 hover:translate-y-[-4px] hover:rotate-0"
                    style={{ transform: "rotate(1deg)", boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className={`mb-3.5 border-y border-ink py-1 ${MONO} text-[9px]`}>
                      Season 2025&ndash;26
                    </div>
                    <div className="mb-2 font-serif text-[22px] leading-[1.12]">
                      Season program book
                    </div>
                    <p className="mb-3 text-[12.5px] leading-[1.5] text-ink-mid">
                      A season of stories, beautifully told.
                    </p>
                    <p className={`mb-2.5 ${MONO} text-[9px] text-ink-faint`}>
                      design · Robin Easter Design
                    </p>
                    <p className={`${MONO} text-[10px] text-red`}>View the book &rarr;</p>
                  </a>
                  <a
                    href="/work/ko-annual-fund-appeal.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-[18px] block w-[clamp(210px,22vw,260px)] border-l-2 border-red px-[22px] py-[26px] text-ink no-underline transition-transform duration-300 hover:translate-y-[-4px] hover:rotate-0"
                    style={{
                      background:
                        "repeating-linear-gradient(180deg, var(--paper-bright) 0px 25px, #D8C9A8 25px 26px)",
                      transform: "rotate(-1.2deg)",
                      boxShadow: "var(--shadow-soft)",
                    }}
                  >
                    <span className="ks-tape absolute right-[20%] top-[-10px]" />
                    <div className="mb-2 font-serif text-[22px] leading-[1.12]">
                      Annual fund appeal
                    </div>
                    <p className="mb-3 text-[12.5px] leading-[1.5] text-ink-mid">
                      A year-end mailer that makes the case for giving.
                    </p>
                    <p className={`${MONO} text-[10px] text-red`}>View the mailer &rarr;</p>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Brand, systems & ventures */}
          <Reveal>
            <Cat label="Brand, systems & ventures" />
            <div className="flex flex-wrap items-start gap-x-[26px] gap-y-[22px]">
              {[
                { t: "The Interview", d: "A guide that helps families and nannies meet well.", href: "/work/mynanny-interview.pdf", tilt: "-1deg", mt: "" },
                { t: "Onboarding", d: "A warm, clear welcome into the MyNanny family.", href: "/work/mynanny-onboarding.pdf", tilt: "0.9deg", mt: "mt-4" },
                { t: "Trial Day", d: "Setting families and nannies up for a great first day.", href: "/work/mynanny-trial.pdf", tilt: "-0.7deg", mt: "" },
              ].map((c) => (
                <a
                  key={c.t}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-[clamp(200px,21vw,250px)] px-5 pb-6 pt-[22px] text-ink no-underline transition-transform duration-300 hover:translate-y-[-4px] hover:rotate-0 ${c.mt}`}
                  style={{
                    backgroundColor: "#F7F0DE",
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(20,63,56,.12) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(20,63,56,.12) 0 1px, transparent 1px 16px)",
                    transform: `rotate(${c.tilt})`,
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div className={`mb-2 ${MONO} text-[10px] text-green`}>
                    MyNanny · brand &amp; systems
                  </div>
                  <div className="mb-2 font-serif text-[20px] leading-[1.15]">{c.t}</div>
                  <p className="mb-2.5 text-[12.5px] leading-[1.5] text-ink-mid">{c.d}</p>
                  <p className={`${MONO} text-[10px] text-red`}>View the guide &rarr;</p>
                </a>
              ))}
              <a
                href="https://greenroomcrm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-[clamp(210px,22vw,260px)] bg-green px-5 py-6 text-on-black no-underline transition-transform duration-300 hover:translate-y-[-4px] hover:rotate-0"
                style={{ backgroundImage: "var(--paper-grain-light)", transform: "rotate(1.4deg)", boxShadow: "var(--shadow-paper)" }}
              >
                <div className={`mb-2 ${MONO} text-[10px] text-gold-pale`}>Ventures</div>
                <div className="mb-2 font-serif text-[22px] leading-[1.12]">GreenRoom</div>
                <p className="mb-2.5 text-[12.5px] leading-[1.5] text-on-black-soft">
                  A CRM built for the performing arts, by people who get it.
                </p>
                <p className={`${MONO} text-[10px] text-gold-pale`}>Visit GreenRoom &rarr;</p>
              </a>
            </div>
          </Reveal>

          <p className="mt-[clamp(36px,5vw,52px)] text-center font-serif text-[17px] italic text-ink-mid">
            Every project is a collaboration. Every result is shared.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Trusted by — on handled paper                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`border-t border-ink bg-paper-deep ${PAD} py-[clamp(48px,7vw,80px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <Reveal className="mx-auto max-w-[720px]">
          <p className={`mb-2.5 text-center ${MONO} text-[12px]`}>
            &#10022; Trusted by &#10022;
          </p>
          <p className="mb-[30px] text-center font-serif text-[17px] italic text-ink-mid">
            Organizations doing meaningful work in the world.
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
