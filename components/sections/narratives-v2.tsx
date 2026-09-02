import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

/**
 * Narratives — the story-strategy practice, set as an Opening Night program.
 * The product language is the structure: why Narratives exists → proof →
 * three steps → five movements → deliverables → an example → why me →
 * who it's for → engagement details. Global Navbar/Footer wrap the page.
 */

const MONO = "font-accent uppercase tracking-[0.12em]";
const PAD = "px-[clamp(20px,4.5vw,56px)]";

/* Two-part ticket stub CTA */
function TicketStub({
  top,
  main,
  href,
}: {
  top: string;
  main: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex -rotate-[1.5deg] items-stretch no-underline transition-transform duration-300 hover:rotate-0 hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-paper)" }}
    >
      <span
        className={`flex items-center border border-ink bg-paper-deep px-3 py-3.5 text-ink ${MONO} text-[11px]`}
        style={{ borderRight: "1px dashed var(--ink)" }}
      >
        Admit one
      </span>
      <span className="flex flex-col justify-center gap-[3px] border border-l-0 border-ink bg-paper-bright px-6 py-3 text-ink">
        <span className={`${MONO} text-[10px] text-red`}>{top}</span>
        <span className={`${MONO} text-[14px]`}>{main}</span>
      </span>
    </Link>
  );
}

/* Dotted leader — label ···· value */
function Leader({
  label,
  value,
  className = "",
  ruleClass = "border-ink-faint",
}: {
  label: string;
  value: string;
  className?: string;
  ruleClass?: string;
}) {
  return (
    <div className={`flex items-baseline gap-2.5 ${className}`}>
      <span>{label}</span>
      <span aria-hidden className={`flex-1 border-b-2 border-dotted ${ruleClass}`} />
      <span>{value}</span>
    </div>
  );
}

/* Act header — title + rule + mono kicker + italic subline */
function ActHeader({
  title,
  kicker,
  sub,
}: {
  title: string;
  kicker: string;
  sub?: string;
}) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
        <h2 className="font-serif text-[clamp(32px,4vw,50px)] font-normal">
          {title}
        </h2>
        <span className={`${MONO} text-[12px] text-ink-mid`}>{kicker}</span>
      </div>
      {sub && (
        <p className="mt-3 font-serif text-[17px] italic text-ink-mid">{sub}</p>
      )}
    </>
  );
}

/* One movement badge (torn mono chip) */
function MoveChip({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span
      className={`mb-2.5 inline-block ${MONO} text-[10px]`}
      style={{
        color: text,
        backgroundColor: bg,
        padding: "5px 12px",
        clipPath:
          "polygon(2% 18%, 20% 0%, 55% 8%, 84% 0%, 100% 24%, 96% 70%, 100% 92%, 62% 100%, 26% 90%, 0% 98%, 4% 55%)",
        transform: "rotate(-1.5deg)",
      }}
    >
      {label}
    </span>
  );
}

export function NarrativesV2() {
  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/*  Hero — the playbill, on marigold gold                        */}
      {/* ------------------------------------------------------------ */}
      <section
        className={`relative overflow-hidden text-ink ${PAD} pb-[clamp(80px,11vw,140px)] pt-[clamp(28px,4vw,56px)]`}
        style={{ backgroundColor: "#E3A81C", backgroundImage: "var(--paper-grain)" }}
      >
        {/* oversized burgundy proscenium arch, entering from offstage lower-left */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/arch-burgundy.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-16%] left-[clamp(-150px,-7.5vw,-52px)] z-0 hidden h-[clamp(440px,60vw,940px)] w-auto max-w-none md:block"
        />
        <span
          data-anim="true"
          aria-hidden
          className="absolute right-[3%] top-[16%] z-[1] text-[clamp(26px,3vw,40px)] leading-none text-ink [animation:ks-star-twinkle_2.4s_ease_1s_1]"
        >
          &#10022;
        </span>

        <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center gap-[clamp(32px,5vw,64px)]">
          <Reveal className="relative z-[2] min-w-[320px] flex-[1.15]">
            <p className={`mb-[22px] ${MONO} text-[12px] text-red`}>
              &#10022; A Narratives production
            </p>
            <h1 className="mb-6 font-serif text-[clamp(44px,6.4vw,86px)] font-normal leading-[0.98] [text-wrap:pretty]">
              Story strategy for{" "}
              <em className="italic text-paper-bright">the performing arts.</em>
            </h1>
            <span aria-hidden className="mb-6 block h-[3px] w-[68px] bg-paper-bright/75" />
            <p className="mb-6 max-w-[520px] font-serif text-[clamp(20px,2.4vw,28px)] italic leading-[1.3] text-paper-bright">
              Turn a season into something audiences want to step inside.
            </p>
            <p className="mb-8 max-w-[520px] text-[16px] leading-[1.7] text-paper-bright">
              Narratives gives small arts teams the story strategy and campaign
              plan they don&rsquo;t have the hours to build from scratch. One
              season, written for your organization.
            </p>
            <TicketStub
              top="One season, written for you"
              main="Build my season plan →"
              href="/contact"
            />
            <Leader
              label="A campaign method"
              value="Katie Spencer"
              className={`mt-[30px] max-w-[420px] ${MONO} text-[12px] text-paper-bright/90`}
              ruleClass="border-paper-bright/45"
            />
          </Reveal>

          {/* the collage cluster */}
          <Reveal className="relative z-[2] min-w-[300px] max-w-[520px] flex-1">
            {/* teal torn paper behind the photo, draping down to back the script */}
            <span
              aria-hidden
              className="absolute right-[-16%] top-[4%] z-0 hidden sm:block"
              style={{
                width: "clamp(170px,23vw,350px)",
                height: "clamp(320px,42vw,600px)",
                backgroundColor: "#1C7568",
                backgroundImage: "var(--paper-grain-light)",
                clipPath:
                  "polygon(4% 4%, 34% 0%, 66% 4%, 100% 0%, 97% 24%, 100% 48%, 96% 72%, 100% 90%, 70% 98%, 40% 93%, 14% 100%, 0% 82%, 3% 56%, 0% 30%)",
                transform: "rotate(4deg)",
              }}
            />
            {/* pink torn paper */}
            <span
              aria-hidden
              className="absolute right-[-16%] top-[2%] z-0 hidden sm:block"
              style={{
                width: "clamp(90px,11vw,150px)",
                height: "clamp(120px,15vw,220px)",
                backgroundColor: "var(--rose-pale)",
                backgroundImage: "var(--paper-grain)",
                clipPath:
                  "polygon(6% 8%, 44% 0%, 92% 6%, 100% 40%, 96% 74%, 100% 98%, 60% 92%, 16% 99%, 0% 64%, 4% 32%)",
                transform: "rotate(-6deg)",
                opacity: 0.92,
              }}
            />
            {/* striped scrap, far right edge */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/stripe-scrap.webp"
              alt=""
              aria-hidden
              className="absolute right-[-22%] top-[26%] z-[1] hidden w-[clamp(120px,15vw,210px)] rotate-[72deg] sm:block"
              style={{ filter: "drop-shadow(0 3px 8px rgba(22,17,13,.35))" }}
            />

            {/* the production still */}
            <div
              className="relative z-[2] bg-[#F8F1E2] p-2 pb-3 transition-transform duration-300 hover:rotate-0"
              style={{
                transform: "rotate(var(--tilt-2))",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <span className="ks-tape absolute left-[36%] top-[-11px]" />
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/on/on-stage.jpg"
                  alt="A season being filmed on stage at the Tennessee Theatre"
                  fill
                  sizes="(max-width: 768px) 90vw, 44vw"
                  className="object-cover"
                />
              </div>
              <p className={`pt-2 ${MONO} text-[10px] text-ink-mid`}>
                the tennessee theatre &middot; a season in the making
              </p>
            </div>

            {/* the ticket, hanging off the lower-left of the still */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/ticket-tennessee.webp"
              alt="Tennessee Theatre dress rehearsal ticket, orchestra, admit one"
              className="absolute bottom-[-16%] left-[-10%] z-[4] w-[clamp(110px,14vw,175px)] -rotate-[9deg]"
              style={{ filter: "drop-shadow(0 5px 12px rgba(22,17,13,.4))" }}
            />
            {/* red doodle under the ticket */}
            <svg
              aria-hidden
              viewBox="0 0 120 44"
              className="absolute bottom-[-22%] left-[8%] z-[3] hidden w-[clamp(90px,11vw,150px)] sm:block"
              fill="none"
              stroke="var(--red)"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <path d="M60 6C24 4 4 14 6 24c2 10 40 16 74 12 26-3 38-12 30-18-7-5-30-6-52-4" />
            </svg>
            {/* the gold script flourish */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/script-stories.webp"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-[-20%] right-[-10%] z-[3] hidden w-[clamp(112px,13vw,168px)] rotate-[3deg] lg:block"
            />
          </Reveal>
        </div>

        {/* scalloped deckle edge — gold tears away to the green act below */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] z-[5] h-[22px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18px 100%, var(--green) 16.5px, transparent 17px), radial-gradient(circle at 18px 100%, var(--gold) 18px, transparent 18.5px)",
            backgroundSize: "36px 22px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Why Narratives exists — theatre green                        */}
      {/* ------------------------------------------------------------ */}
      <section
        className={`bg-green text-on-black ${PAD} py-[clamp(64px,9vw,120px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <Reveal className="mx-auto max-w-[1100px]">
          <p className={`mb-9 ${MONO} text-[12px] text-gold-bright`}>
            Why Narratives exists
          </p>
          <div className="flex flex-wrap gap-[clamp(36px,5vw,80px)]">
            <div className="min-w-[320px] flex-[1.2]">
              <h2 className="mb-6 font-serif text-[clamp(32px,4.2vw,54px)] font-normal leading-[1.06] [text-wrap:pretty]">
                Most arts marketing{" "}
                <em className="italic text-gold-pale">markets information.</em>
              </h2>
              <p className="mb-4 max-w-[560px] text-[16px] leading-[1.7]">
                Dates, casts, ticket links, artistic bios, an evening of. It is
                marketing aimed at people who already know they want to come.
              </p>
              <p className="mb-10 max-w-[560px] text-[16px] leading-[1.7] text-on-black-soft">
                Some people stay away not because they dislike the art, but
                because they aren&rsquo;t sure they&rsquo;d know how to belong
                there. Almost nobody in the field says that out loud, so we keep
                making prettier posters.
              </p>
              <div className="max-w-[520px] border-l-[3px] border-gold pl-6">
                <p className="mb-3 font-serif text-[clamp(22px,2.5vw,30px)] italic leading-[1.28]">
                  Lower the social friction without lowering the art.
                </p>
                <p className="text-[15px] leading-[1.7] text-on-black-soft">
                  People engage once they feel confident enough to. And nobody
                  connects to information first. They connect to feeling.
                </p>
              </div>
            </div>
            <div className="flex min-w-[300px] max-w-[460px] flex-1 flex-col gap-[30px]">
              {/* what hesitation sounds like — a typed note */}
              <div
                className="relative text-ink"
                style={{
                  backgroundColor: "#F4EAD3",
                  backgroundImage: "var(--paper-grain)",
                  padding: "26px 24px 30px",
                  transform: "rotate(var(--tilt-2))",
                  boxShadow: "0 6px 16px rgba(0,0,0,.35)",
                }}
              >
                <span className="ks-tape absolute right-[16%] top-[-11px]" />
                <p className={`mb-3.5 ${MONO} text-[11px] text-red`}>
                  What that hesitation actually sounds like
                </p>
                <div className="font-accent text-[13px] leading-[2]">
                  Not understanding the work.
                  <br />
                  Not knowing the etiquette, or the context.
                  <br />
                  Feeling culturally out of place.
                  <br />
                  Worrying they won&rsquo;t{" "}
                  <span className="relative inline-block">
                    get it
                    <span
                      aria-hidden
                      className="absolute bottom-0.5 left-[-3px] right-[-5px] border-b-[3px] border-red opacity-80"
                      style={{ transform: "rotate(-1.2deg)" }}
                    />
                  </span>
                  .
                  <br />
                  Not knowing what to expect.
                </div>
              </div>
              <div
                className="bg-[#F8F1E2] p-2 pb-3"
                style={{
                  transform: "rotate(var(--tilt-3))",
                  boxShadow: "0 10px 26px rgba(0,0,0,.4)",
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/on/in-rehearsal.jpg"
                    alt="Katie leading a rehearsal room"
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Proof strip — Knoxville Opera outcomes, encountered early    */}
      {/* ------------------------------------------------------------ */}
      <section
        className={`border-b border-ink bg-paper-bright ${PAD} py-[clamp(30px,4.5vw,50px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <Reveal className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-x-[clamp(28px,4vw,56px)] gap-y-6">
          <p className={`max-w-[210px] ${MONO} text-[11px] text-red`}>
            Already tested &middot; Knoxville Opera
          </p>
          <div className="flex flex-wrap gap-x-[clamp(26px,4vw,52px)] gap-y-5">
            {[
              ["+101%", "first-time attendance / show"],
              ["+27%", "revenue per show"],
              ["#1", "La Bohème, best-seller in company history"],
            ].map(([stat, label]) => (
              <div key={stat} className="max-w-[180px]">
                <div className="font-serif text-[clamp(28px,3.2vw,40px)] leading-none text-red">
                  {stat}
                </div>
                <div className={`mt-1.5 ${MONO} text-[10px] text-ink-mid`}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/knoxville-opera"
            className={`border-b border-dotted border-red pb-0.5 ${MONO} text-[11px] text-red transition-colors hover:text-red-deep`}
          >
            See the case study &rarr;
          </Link>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  How it works — three steps                                   */}
      {/* ------------------------------------------------------------ */}
      <section className={`${PAD} py-[clamp(56px,8vw,110px)]`}>
        <Reveal className="mx-auto max-w-[1100px]">
          <ActHeader
            title="Three steps, one season."
            kicker="How it works"
            sub="what the work looks like from your side"
          />
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[clamp(20px,3vw,36px)]">
            {[
              {
                n: "01",
                c: "text-rose",
                t: "Understand the season",
                b: "What you're producing, who you want to reach, what your audience already understands, and where the friction actually is.",
                tilt: "rotate-[-0.8deg]",
                mt: "",
              },
              {
                n: "02",
                c: "text-gold",
                t: "Find the story",
                b: "The Narratives framework locates the emotional entry point, the world, the audience bridge, the momentum, and the invitation.",
                tilt: "rotate-[0.6deg]",
                mt: "sm:mt-[18px]",
              },
              {
                n: "03",
                c: "text-green",
                t: "Build what the team needs",
                b: "The strategy becomes the plans, creative direction, messaging, and tools that will actually help you execute the season.",
                tilt: "rotate-[-0.5deg]",
                mt: "",
              },
            ].map((s) => (
              <div
                key={s.n}
                className={`border border-line bg-paper-bright px-[26px] pb-8 pt-7 ${s.tilt} ${s.mt}`}
              >
                <div className={`font-serif text-[40px] leading-none ${s.c}`}>
                  {s.n}
                </div>
                <div className="my-3 font-serif text-[24px]">{s.t}</div>
                <p className="text-[14px] leading-[1.65] text-ink-mid">{s.b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  The method — five movements                                  */}
      {/* ------------------------------------------------------------ */}
      <section
        className={`relative border-t-2 border-ink ${PAD} py-[clamp(56px,8vw,100px)]`}
        style={{
          backgroundColor: "var(--paper-deep)",
          backgroundImage: "var(--paper-grain)",
        }}
      >
        {/* ticket perforation along the top edge */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[22px]"
          style={{
            background:
              "radial-gradient(circle 11px at 11px 0px, var(--burgundy) 10px, transparent 11px)",
            backgroundSize: "22px 22px",
            backgroundRepeat: "repeat-x",
          }}
        />
        <Reveal className="mx-auto max-w-[940px]">
          <div className="mb-11 text-center">
            <p className={`mb-3.5 ${MONO} text-[12px] text-red`}>
              &#10022; The method
            </p>
            <h2 className="mb-3 font-serif text-[clamp(30px,3.8vw,48px)] font-normal">
              Five movements, one experience.
            </h2>
            <p className="inline-block max-w-[560px] font-serif text-[17px] italic text-ink-mid">
              The three steps are the process. These five movements shape the
              thinking underneath it. Nothing gets written until every one is
              answered.
            </p>
          </div>

          <div className="relative">
            {/* a scrap of the score, pinned behind the path */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/sheet-music-intermezzo.webp"
              alt=""
              aria-hidden
              className="absolute right-[clamp(-16px,-1vw,0px)] top-[-14px] z-0 hidden w-[clamp(90px,9vw,132px)] opacity-70 lg:block"
              style={{
                height: "clamp(64px,7vw,100px)",
                objectFit: "cover",
                objectPosition: "50% 42%",
                clipPath:
                  "polygon(2% 6%, 20% 0%, 44% 5%, 68% 1%, 92% 6%, 100% 2%, 97% 34%, 100% 66%, 94% 96%, 68% 92%, 42% 99%, 16% 93%, 0% 98%, 4% 64%, 0% 32%)",
                transform: "rotate(6deg)",
                boxShadow: "0 1px 4px rgba(22,17,13,.25)",
              }}
            />

            {/* 01 · Spark */}
            <div
              className="relative flex max-w-[min(560px,86%)] items-start gap-5"
              style={{ transform: "rotate(-.8deg)" }}
            >
              <span
                aria-hidden
                className="flex size-[62px] shrink-0 items-center justify-center rounded-full"
                style={{
                  background:
                    "repeating-conic-gradient(var(--gold) 0deg 9deg, transparent 9deg 26deg)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <span className="text-[16px] text-ink">&#10022;</span>
              </span>
              <div>
                <MoveChip label="01 · Spark" bg="var(--burgundy)" text="var(--on-black)" />
                <div className="font-serif text-[clamp(22px,2.5vw,30px)] italic leading-[1.15]">
                  Why should anyone{" "}
                  <span className="relative inline-block">
                    care?
                    <span
                      aria-hidden
                      className="absolute border-2 border-red opacity-70"
                      style={{
                        inset: "-5px -9px -7px -7px",
                        borderRadius: "55% 45% 50% 50% / 65% 55% 60% 45%",
                        transform: "rotate(-3deg)",
                      }}
                    />
                  </span>
                </div>
                <p className="mt-2.5 max-w-[440px] text-[14px] leading-[1.65] text-ink-mid">
                  The human truth at the center of the work, and the reason it
                  matters to someone who has never heard of it.
                </p>
              </div>
            </div>
            <span
              aria-hidden
              className="block border-t-2 border-dashed border-ink-faint"
              style={{
                width: "clamp(100px,18vw,240px)",
                transform: "rotate(18deg)",
                margin: "26px 0 22px clamp(120px,26vw,380px)",
              }}
            />

            {/* 02 · World */}
            <div
              className="relative ml-auto flex max-w-[min(560px,86%)] flex-row-reverse items-start gap-5 text-right"
              style={{ transform: "rotate(.7deg)" }}
            >
              <span
                aria-hidden
                className="shrink-0"
                style={{
                  width: "54px",
                  height: "66px",
                  borderRadius: "999px 999px 0 0",
                  backgroundColor: "var(--burgundy)",
                  boxShadow:
                    "inset 0 0 0 4px var(--burgundy), inset 0 0 0 5px var(--gold-pale), var(--shadow-soft)",
                }}
              />
              <div>
                <MoveChip label="02 · World" bg="var(--green)" text="var(--on-black)" />
                <div className="font-serif text-[clamp(22px,2.5vw,30px)] italic leading-[1.15]">
                  What are we inviting people into?
                </div>
                <p className="ml-auto mt-2.5 max-w-[440px] text-[14px] leading-[1.65] text-ink-mid">
                  The atmosphere and cultural register of the production, treated
                  as a world to inhabit rather than a program to attend.
                </p>
              </div>
            </div>
            <span
              aria-hidden
              className="block border-t-2 border-dashed border-ink-faint"
              style={{
                width: "clamp(100px,18vw,240px)",
                transform: "rotate(-18deg)",
                margin: "26px clamp(120px,26vw,380px) 22px auto",
              }}
            />

            {/* 03 · Bridge */}
            <div
              className="relative flex max-w-[min(560px,86%)] items-start gap-5"
              style={{ transform: "rotate(-.5deg)", marginLeft: "clamp(20px,6vw,110px)" }}
            >
              <span
                aria-hidden
                className="flex h-[46px] w-[74px] shrink-0 justify-center border border-ink bg-paper-bright"
                style={{ boxShadow: "var(--shadow-soft)", transform: "rotate(-3deg)" }}
              >
                <span className="h-full border-l-2 border-dashed border-ink" />
              </span>
              <div>
                <MoveChip label="03 · Bridge" bg="var(--rose)" text="var(--ink)" />
                <div className="inline-block border-b-2 border-dashed border-ink-faint pb-1.5 font-serif text-[clamp(22px,2.5vw,30px)] italic leading-[1.15]">
                  How do we make people feel included?
                </div>
                <p className="mt-2.5 max-w-[440px] text-[14px] leading-[1.65] text-ink-mid">
                  The invisible thresholds come down. Language, ritual,
                  expectation: the things that quietly keep newcomers at a
                  distance.
                </p>
              </div>
            </div>
            <span
              aria-hidden
              className="block border-t-2 border-dashed border-ink-faint"
              style={{
                width: "clamp(100px,18vw,240px)",
                transform: "rotate(16deg)",
                margin: "26px 0 22px clamp(160px,32vw,460px)",
              }}
            />

            {/* 04 · Arc */}
            <div
              className="relative ml-auto flex max-w-[min(560px,86%)] flex-row-reverse items-start gap-5 text-right"
              style={{ transform: "rotate(.6deg)" }}
            >
              <span
                aria-hidden
                className="relative mt-3 shrink-0"
                style={{
                  width: "74px",
                  height: "40px",
                  borderTop: "3px solid var(--green)",
                  borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                }}
              >
                <span className="absolute right-[-8px] top-[-14px] text-[15px] text-green">
                  &#9834;
                </span>
              </span>
              <div>
                <MoveChip label="04 · Arc" bg="var(--gold-pale)" text="var(--ink)" />
                <div className="font-serif text-[clamp(22px,2.5vw,30px)] italic leading-[1.15]">
                  How does momentum build?
                </div>
                <p className="ml-auto mt-2.5 max-w-[440px] text-[14px] leading-[1.65] text-ink-mid">
                  The months and the minutes before curtain, shaped so the
                  audience feels carried rather than marketed to.
                </p>
              </div>
            </div>
            <span
              aria-hidden
              className="block border-t-2 border-dashed border-ink-faint"
              style={{
                width: "clamp(100px,18vw,240px)",
                transform: "rotate(-16deg)",
                margin: "30px clamp(140px,30vw,420px) 22px auto",
              }}
            />

            {/* 05 · Invitation */}
            <div
              className="relative flex max-w-[min(600px,90%)] items-start gap-5"
              style={{ transform: "rotate(-.6deg)" }}
            >
              <span
                aria-hidden
                className="relative shrink-0 bg-ink"
                style={{ width: "46px", height: "66px", boxShadow: "var(--shadow-soft)" }}
              >
                <span className="absolute bottom-0 left-[54%] top-[10%] w-2 bg-gold-bright" />
              </span>
              <div>
                <MoveChip label="05 · Invitation" bg="var(--ink)" text="var(--paper)" />
                <div className="font-serif text-[clamp(22px,2.5vw,30px)] italic leading-[1.15]">
                  Why does this matter{" "}
                  <span className="relative inline-block">
                    right now?
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[-4px] right-[-6px] border-b-[3px] border-red opacity-80"
                      style={{ transform: "rotate(-1.2deg)" }}
                    />
                  </span>
                </div>
                <p className="mt-2.5 max-w-[460px] text-[14px] leading-[1.65] text-ink-mid">
                  The reason this work exists in this season, in this city, in
                  this cultural moment.
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/usher-hand.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-18px] right-[clamp(-60px,-4vw,-20px)] w-[clamp(110px,13vw,170px)] -rotate-[6deg]"
                style={{ filter: "drop-shadow(-2px 3px 6px rgba(22,17,13,.3))" }}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Deliverables                                                 */}
      {/* ------------------------------------------------------------ */}
      <section className={`${PAD} py-[clamp(56px,8vw,110px)]`}>
        <Reveal className="mx-auto max-w-[1100px]">
          <ActHeader
            title="A framework, not a formula."
            kicker="The core deliverables"
          />
          <p className="mb-[clamp(36px,5vw,56px)] mt-3 max-w-[640px] font-serif text-[17px] italic text-ink-mid">
            Every Narratives engagement is built around a core set of strategic
            deliverables, then shaped to the needs of your season, team, and
            audience.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] items-start gap-[clamp(18px,2.5vw,30px)]">
            {[
              {
                n: "01 · The diagnostic",
                t: "Audience & friction audit",
                b: "Where people are getting stuck, what barriers are shaping behavior, and where the clearest opportunities are.",
                bt: "border-t-burgundy",
                tilt: "rotate-[-0.7deg]",
                mt: "",
              },
              {
                n: "02 · The emotional center",
                t: "Narrative strategy",
                b: "The emotional center of the season, and the story that connects the work to the audience.",
                bt: "border-t-red",
                tilt: "rotate-[0.5deg]",
                mt: "sm:mt-[14px]",
              },
              {
                n: "03 · The atmosphere",
                t: "Visual world brief",
                b: "The atmosphere, aesthetic direction, tone, and creative world the campaign should live in.",
                bt: "border-t-rose",
                tilt: "rotate-[-0.4deg]",
                mt: "",
              },
              {
                n: "04 · The rhythm",
                t: "Momentum map",
                b: "How the season builds over time, including campaign rhythm, audience onboarding, urgency, and return invitations.",
                bt: "border-t-gold",
                tilt: "rotate-[0.7deg]",
                mt: "sm:mt-[20px]",
              },
              {
                n: "05 · The fuel",
                t: "Budget strategy",
                b: "Where marketing resources should work hardest, and what deserves priority, amplification, or restraint.",
                bt: "border-t-green",
                tilt: "rotate-[-0.6deg]",
                mt: "sm:mt-[8px]",
              },
            ].map((d) => (
              <div
                key={d.n}
                className={`border-t-[3px] ${d.bt} bg-paper-bright px-5 pb-[26px] pt-[22px] ${d.tilt} ${d.mt}`}
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className={`mb-2.5 ${MONO} text-[10px] text-ink-faint`}>
                  {d.n}
                </div>
                <div className="mb-2.5 font-serif text-[21px] leading-[1.15]">
                  {d.t}
                </div>
                <p className="text-[13px] leading-[1.6] text-ink-mid">{d.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[680px] text-[14px] leading-[1.7] text-ink-mid">
            Depending on the organization, the package may also include campaign
            messaging, production concepts, content direction, audience guides,
            or launch plans: whatever it takes to make the strategy usable.
          </p>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  An example · Knoxville Opera — velvet burgundy               */}
      {/* ------------------------------------------------------------ */}
      <section
        className={`border-t-4 border-gold bg-burgundy text-on-black ${PAD} py-[clamp(56px,8vw,110px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <Reveal className="mx-auto max-w-[1100px]">
          <p className={`mb-[30px] ${MONO} text-[12px] text-gold-bright`}>
            An example &middot; Knoxville Opera
          </p>
          <div className="mb-[clamp(40px,6vw,64px)] flex flex-wrap items-center gap-[clamp(36px,5vw,72px)]">
            <div className="min-w-[320px] flex-[1.2]">
              <h2 className="mb-[22px] font-serif text-[clamp(34px,4.4vw,58px)] font-normal leading-[1.04]">
                One season strategy,{" "}
                <em className="italic text-rose-pale">start to finish.</em>
              </h2>
              <p className="mb-4 max-w-[560px] text-[16px] leading-[1.7] text-on-black-soft">
                Not a preview of what yours will look like, but a sense of how
                far the thinking goes.
              </p>
              <p className="mb-4 max-w-[560px] text-[16px] leading-[1.7]">
                Gianni Schicchi is a one-act comedy about a family scheming over
                a will. A hard sell to anyone who&rsquo;s never bought an opera
                ticket. So the campaign didn&rsquo;t sell the opera. The synopsis
                became a lunch between friends. The characters gave reality-TV
                confessionals, in costume. The people who made it sat down for a
                Behind the Music conversation, for anyone who wanted to go
                deeper.
              </p>
              <p className="max-w-[560px] text-[16px] leading-[1.7] text-on-black-soft">
                Underneath sat the whole package: the audit, the narrative
                strategy, the visual world, the momentum map, the budget, and
                copy written for the production itself. Then the unglamorous half
                that makes it real: the shot list, the cast and crew list, the
                hour-by-hour media day schedule, and a dated posting plan across
                social, email, and YouTube.
              </p>
              <p className="mt-[26px] font-serif text-[clamp(20px,2.3vw,26px)] italic text-gold-pale">
                The strategy doesn&rsquo;t stop at language. It gets made.
              </p>
            </div>
            <div className="min-w-[300px] max-w-[480px] flex-1">
              <div
                className="border border-gold p-3 transition-transform duration-300 hover:rotate-0"
                style={{ transform: "rotate(var(--tilt-2))" }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/work/katie-onstage.jpg"
                    alt="A season media day inside the Tennessee Theatre"
                    fill
                    sizes="(max-width: 768px) 90vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className={`pt-3.5 text-right ${MONO} text-[11px] text-on-black-soft`}>
                knoxville opera &middot; the campaign, in the house
              </p>
            </div>
          </div>
          <div className="border-t border-gold pt-[22px]">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2.5">
              <span className={`${MONO} text-[12px] text-gold-bright`}>
                See it in practice &middot; the campaign, as it actually ran
              </span>
              <a
                href="/portfolio"
                className={`border-b border-dotted border-gold-pale pb-0.5 ${MONO} text-[12px] text-gold-pale`}
              >
                See all the work &rarr;
              </a>
            </div>
            <div className="flex flex-wrap gap-x-[34px] gap-y-3.5">
              {[
                { u: "0Ap9-34BuAI", t: "Girls Lunch · reel, synopsis" },
                { u: "Y4kyen1P47k", t: "Confession: Simone · character series" },
                { u: "ZqJPkheBt-4", t: "Behind the Music · film" },
              ].map((v) => (
                <a
                  key={v.u}
                  href={`https://www.youtube.com/watch?v=${v.u}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border-b border-dotted border-on-black-mute pb-[3px] text-on-black transition-colors hover:text-gold-pale ${MONO} text-[12px]`}
                >
                  {v.t}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Why me + What it isn't                                       */}
      {/* ------------------------------------------------------------ */}
      <section className={`${PAD} py-[clamp(56px,8vw,110px)]`}>
        <Reveal className="mx-auto max-w-[1100px]">
          <div className="mb-[clamp(48px,7vw,80px)] flex flex-wrap items-center gap-[clamp(36px,5vw,72px)]">
            <div className="min-w-[280px] max-w-[440px] flex-1">
              <div
                className="relative bg-[#F8F1E2] p-2 pb-3"
                style={{
                  transform: "rotate(var(--tilt-1))",
                  boxShadow: "var(--shadow-paper)",
                }}
              >
                <span className="ks-tape absolute left-[40%] top-[-11px]" />
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/work/katie-directing.jpg"
                    alt="Katie Spencer on set with a script during a media day shoot"
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <p className={`pt-2 ${MONO} text-[10px] text-ink-mid`}>
                  on set, media day
                </p>
              </div>
            </div>
            <div className="min-w-[320px] flex-[1.2]">
              <p className={`mb-[18px] ${MONO} text-[12px] text-red`}>Why me</p>
              <h2 className="mb-5 font-serif text-[clamp(28px,3.6vw,44px)] font-normal leading-[1.1] [text-wrap:pretty]">
                This isn&rsquo;t theory turned into a product.{" "}
                <em className="italic">It&rsquo;s a working practice written down.</em>
              </h2>
              <p className="mb-4 max-w-[560px] text-[16px] leading-[1.7]">
                Years inside performing arts administration: running the
                marketing, casting the shoots, arguing about the poster, and
                watching what actually moved first-time ticket buyers. The method
                came out of that work, not from outside the field looking in.
              </p>
              <p className="max-w-[560px] text-[16px] leading-[1.7] text-ink-mid">
                Anyone can generate arts marketing copy now. Almost nobody
                selling into this field has sat inside the season and watched
                what makes a newcomer decide to come.
              </p>
            </div>
          </div>
          <div
            className="px-[clamp(24px,4vw,44px)] pb-[clamp(28px,4vw,40px)] pt-[clamp(24px,3.5vw,36px)] text-ink"
            style={{
              backgroundColor: "#F4EAD3",
              backgroundImage: "var(--paper-grain)",
              boxShadow: "0 2px 8px rgba(22,17,13,.2)",
            }}
          >
            <div className={`mb-6 ${MONO} text-[11px] text-red`}>What it isn&rsquo;t</div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-x-[clamp(28px,4vw,52px)] gap-y-7">
              {[
                {
                  t: "Not dumbing anything down.",
                  b: "It removes thresholds, not depth.",
                },
                {
                  t: "Not a content mill.",
                  b: "Volume isn't the point. The right emotional entry point is.",
                },
                {
                  t: "Not apologizing for opera.",
                  b: "Irreverent about the framing, never about the work.",
                },
              ].map((w) => (
                <div key={w.t}>
                  <div className="mb-2 font-serif text-[20px] leading-[1.15]">{w.t}</div>
                  <p className="text-[13px] leading-[1.6] text-ink-mid">{w.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Who it's for + Engagement                                    */}
      {/* ------------------------------------------------------------ */}
      <section
        className={`border-t border-line bg-paper-bright ${PAD} py-[clamp(56px,8vw,100px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <Reveal className="mx-auto max-w-[1100px]">
          <ActHeader
            title="The strategy layer between the art and the audience."
            kicker="Who it's for"
          />
          <p className="mb-[clamp(32px,4vw,48px)] mt-4 max-w-[680px] text-[15px] leading-[1.7] text-ink-mid">
            Small and mid-size regional opera, symphony, ballet, theatre, and
            festival organizations. Real seasons, real repertoire, and not enough
            internal capacity to build the full story from scratch.
          </p>
          <div className="mb-[30px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-[34px] gap-y-5">
            {[
              {
                t: "Marketing directors",
                b: "Carrying an entire season on a team of one or two. Not short on ideas. Short on hours, and on a system.",
              },
              {
                t: "Executive directors",
                b: "Repositioning an organization for a new audience, a new civic relationship, or a new era.",
              },
              {
                t: "Producers",
                b: "Connecting what happens on the stage to what happens in the room, and in the city.",
              },
              {
                t: "Artistic leaders",
                b: "Shaping how the audience and the artist actually meet.",
              },
            ].map((r) => (
              <div key={r.t} className="border-t border-ink pt-3.5">
                <div className="mb-2 font-serif text-[20px]">{r.t}</div>
                <p className="text-[13.5px] leading-[1.6] text-ink-mid">{r.b}</p>
              </div>
            ))}
          </div>
          <p className="mb-[clamp(48px,7vw,72px)] font-serif text-[clamp(18px,2vw,23px)] italic text-ink">
            But the person it&rsquo;s really for is the one who has never been,
            and quietly assumes it isn&rsquo;t for them.
          </p>
          <div className="border-t-2 border-ink pt-5">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2.5">
              <span className={`${MONO} text-[12px]`}>Engagement details</span>
              <span className="font-serif text-[16px] italic text-ink-mid">
                what working together looks like
              </span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-[34px] gap-y-5">
              {[
                {
                  k: "Built around your season",
                  b: "Designed around the specific repertoire, audience, team, and challenges in front of you.",
                },
                {
                  k: "Core strategy, tailored output",
                  b: "Every engagement uses the Narratives framework, but the final tools and scope are shaped around what your organization actually needs.",
                },
                {
                  k: "Collaborative, not meeting heavy",
                  b: "You provide the season context, the goals, the audience information, and the constraints. I do the strategic build.",
                },
                {
                  k: "Timing",
                  b: "Every engagement starts with a defined scope and delivery date, so both sides know what's due and when. The timeline scales with the size of the work.",
                },
              ].map((e) => (
                <div key={e.k}>
                  <div className={`mb-2 ${MONO} text-[11px] text-red`}>{e.k}</div>
                  <p className="text-[13.5px] leading-[1.6] text-ink-mid">{e.b}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

    </>
  );
}
