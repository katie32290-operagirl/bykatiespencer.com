import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Curtain } from "@/components/on/curtain";
import { HeroV4 } from "@/components/on/hero";
import { OffStage } from "@/components/sections/off-stage";
import { jsonLdScript, personJsonLd } from "@/lib/seo";

const CREDITS: [string, string][] = [
  ["Singer", "Artist"],
  ["Writer", "Storyteller"],
  ["Producer", "Strategist"],
  ["Builder", "Founder"],
];

const MONO = "font-accent uppercase tracking-[0.12em]";

const SELECTED = [
  {
    label: "Brand & campaign",
    title: "Knoxville Opera",
    image: "/work/work-featured.jpg",
    href: "/knoxville-opera",
    tilt: "-1.6deg",
  },
  {
    label: "Film",
    title: "Carmen, explained",
    image: "/work/build-knoxville-carmen.jpg",
    href: "/portfolio",
    tilt: "1.1deg",
  },
  {
    label: "Print",
    title: "Season program book",
    image: "/work/ko-program-book.jpg",
    href: "/portfolio",
    tilt: "-0.7deg",
  },
];

const PAD = "px-[clamp(20px,4.5vw,56px)]";

export function HomeV4() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
      />
      <Curtain />
      <HeroV4 />

      {/* ---------------------------------------------------------------- */}
      {/*  The cast — the credits, as a program listing                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative z-[3] border-t-2 border-ink bg-paper-deep ${PAD} py-[clamp(52px,7vw,84px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <Reveal className="relative mx-auto max-w-[720px]">
          <p className="mb-8 text-center font-accent text-xs uppercase tracking-[0.12em]">
            &#10022; The cast &#10022;
          </p>
          <div className="grid gap-4 font-accent text-[clamp(13px,1.6vw,16px)] uppercase tracking-[0.12em]">
            {CREDITS.map(([role, title]) => (
              <div key={title} className="flex items-baseline gap-3">
                <span>{role}</span>
                <span className="flex-1 border-b-2 border-dotted border-ink-faint" />
                <span>{title}</span>
              </div>
            ))}
          </div>
          <p className="mt-3.5 text-right font-serif text-[15px] italic text-muted-foreground [transform:rotate(-1deg)]">
            (in order of appearance)
          </p>
        </Reveal>
        {/* a cut peony crossing into the green act below */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/peony-stem.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[6%] bottom-[-74px] z-[5] w-[clamp(150px,17vw,250px)] [transform:rotate(12deg)]"
          style={{ filter: "drop-shadow(2px 5px 8px rgba(13,26,23,.45))" }}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Act I · The premise — deep theatre green                        */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative bg-green text-on-black ${PAD} py-[clamp(64px,9vw,120px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-10 font-accent text-xs uppercase tracking-[0.12em] text-gold-bright">
            Act I &middot; The premise
          </p>
          <div className="flex flex-wrap items-center gap-[clamp(36px,5vw,80px)]">
            <Reveal className="relative min-w-[320px] flex-[1.1]">
              {/* torn gold scrap tucked behind the headline */}
              <span
                aria-hidden
                className="absolute left-[-34px] top-[-26px] z-0 h-[82px] w-[120px] [transform:rotate(-5deg)]"
                style={{
                  backgroundColor: "var(--gold)",
                  backgroundImage: "var(--paper-grain)",
                  opacity: 0.28,
                  clipPath:
                    "polygon(6% 10%, 34% 0%, 68% 8%, 96% 2%, 100% 40%, 92% 70%, 97% 98%, 62% 92%, 30% 100%, 2% 94%, 8% 56%, 0% 28%)",
                }}
              />
              <h2 className="relative mb-7 font-serif text-[clamp(38px,5vw,64px)] font-medium leading-[1.05]">
                The art doesn&rsquo;t need to change.{" "}
                <em className="italic text-gold-pale">
                  The way we invite people into it does.
                </em>
              </h2>
              <p className="max-w-[560px] text-[17px] leading-[1.7]">
                My work lives where art, story, audience and building things
                meet. I&rsquo;m an artist who has spent her career inside
                performing arts organizations, on stage and in the office. Now I
                build companies, stories and tools for the people making the
                work.
              </p>
            </Reveal>
            <Reveal className="relative min-w-[300px] max-w-[540px] flex-1">
              {/* archival fragment tucked behind */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/desk-notes.webp"
                alt=""
                aria-hidden
                className="absolute right-[-26px] top-[-34px] z-0 h-1/2 w-[46%] opacity-95"
                style={{
                  objectFit: "cover",
                  objectPosition: "82% 6%",
                  clipPath:
                    "polygon(4% 8%, 30% 0%, 58% 6%, 88% 1%, 100% 12%, 96% 44%, 100% 78%, 92% 98%, 60% 92%, 30% 99%, 2% 93%, 8% 52%, 0% 26%)",
                  transform: "rotate(5deg)",
                  boxShadow: "0 1px 4px rgba(0,0,0,.35)",
                }}
              />
              <div
                className="relative bg-[#F6EFE0] p-[9px] [transform:rotate(-1.5deg)]"
                style={{ boxShadow: "var(--shadow-paper)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/work/katie-onset.jpg"
                  alt="Katie Spencer on a media-day set"
                  className="block w-full"
                  style={{ aspectRatio: "4 / 3", objectFit: "cover", objectPosition: "50% 22%" }}
                />
              </div>
              <span className="ks-tape absolute -top-3 left-[14%] z-[2]" />
              <p className="pt-3.5 font-accent text-[11px] uppercase tracking-[0.1em] text-on-black-soft [transform:rotate(-1deg)]">
                media day, knoxville
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Act II · What's on the table — the working desk                 */}
      {/* ---------------------------------------------------------------- */}
      <section className={`relative overflow-hidden ${PAD} py-[clamp(56px,8vw,110px)]`}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
            <h2 className="font-serif text-[clamp(34px,4vw,52px)] font-normal">
              What&rsquo;s on the table right now.
            </h2>
            <span className={`${MONO} text-[12px] text-ink-mid`}>
              Act II &middot; In rehearsal
            </span>
          </div>
          <p className="mb-[clamp(28px,4vw,48px)] font-serif text-[17px] italic text-ink-mid">
            remember: it&rsquo;s a story, not a sales pitch
          </p>

          {/* the desk */}
          <div className="relative">
            <span
              aria-hidden
              className="absolute left-[36%] top-[30px] z-[1] size-3 rotate-45 border-[1.5px] border-gold"
            />
            <span
              aria-hidden
              className="absolute left-[41%] top-[120px] z-[1] text-[20px] text-gold"
            >
              &#10022;
            </span>
            <div className="flex flex-wrap items-start justify-center">
              {/* NARRATIVES — the poster, largest on the desk */}
              <div className="relative z-[3] mr-[clamp(-36px,-2vw,-16px)] w-[clamp(260px,30vw,420px)] [transform:rotate(-2.5deg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/on/sheet-music-intermezzo.webp"
                  alt=""
                  aria-hidden
                  className="absolute bottom-[-6%] left-[-13%] z-[-1] h-[32%] w-[58%] -rotate-[7deg] object-cover"
                  style={{
                    objectPosition: "50% 42%",
                    clipPath:
                      "polygon(2% 6%, 20% 0%, 44% 5%, 68% 1%, 92% 6%, 100% 2%, 97% 34%, 100% 66%, 94% 96%, 68% 92%, 42% 99%, 16% 93%, 0% 98%, 4% 64%, 0% 32%)",
                    boxShadow: "0 1px 4px rgba(22,17,13,.3)",
                  }}
                />
                <Link
                  href="#narratives"
                  className="block border-[3px] border-double border-gold bg-green-deep p-[14px] pb-[22px] text-on-black no-underline transition-transform duration-300 hover:-translate-y-1 hover:rotate-[1deg]"
                  style={{ backgroundImage: "var(--paper-grain-light)", boxShadow: "0 6px 18px rgba(22,17,13,.3)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/on/stage-proscenium.webp"
                    alt="Illustrated theatre stage"
                    className="block w-full object-cover"
                    style={{ aspectRatio: "5 / 4", objectPosition: "50% 26%" }}
                  />
                  <div className={`my-4 text-center ${MONO} text-[10px] tracking-[0.2em] text-gold-pale`}>
                    A Narratives production
                  </div>
                  <div className="text-center font-serif text-[clamp(24px,2.4vw,32px)] italic leading-[1.15]">
                    A season isn&rsquo;t a story.
                  </div>
                  <p className="mt-2 text-center text-[13px] leading-[1.5] text-on-black-soft">
                    Story strategy for the performing arts
                  </p>
                </Link>
              </div>

              {/* GREENROOM — marked-up build notes on graph paper */}
              <div className="relative z-[2] ml-[clamp(12px,3vw,40px)] mt-[clamp(28px,4vw,52px)] w-[clamp(250px,29vw,400px)] [transform:rotate(1.5deg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/on/desk-notes.webp"
                  alt=""
                  aria-hidden
                  className="absolute right-[-10%] top-[-9%] z-[-1] h-[58%] w-[46%] rotate-[8deg] object-cover"
                  style={{
                    objectPosition: "66% 52%",
                    clipPath:
                      "polygon(8% 4%, 40% 0%, 72% 6%, 96% 2%, 100% 30%, 94% 58%, 99% 86%, 90% 99%, 58% 94%, 26% 100%, 2% 92%, 6% 60%, 0% 30%)",
                    boxShadow: "0 1px 4px rgba(22,17,13,.3)",
                  }}
                />
                <a
                  href="https://greenroomcrm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-[26px] pb-8 pt-7 text-ink no-underline transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1deg]"
                  style={{
                    backgroundColor: "#F7F0DE",
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(20,63,56,.13) 0 1px, transparent 1px 18px), repeating-linear-gradient(90deg, rgba(20,63,56,.13) 0 1px, transparent 1px 18px)",
                    clipPath:
                      "polygon(1% 3%, 14% 0%, 32% 4%, 52% 1%, 70% 4%, 88% 0%, 99% 3%, 100% 30%, 97% 55%, 100% 78%, 97% 98%, 78% 95%, 56% 100%, 34% 96%, 14% 100%, 0% 95%, 3% 68%, 0% 40%, 2% 18%)",
                    filter: "drop-shadow(0 3px 6px rgba(22,17,13,.25))",
                  }}
                >
                  <div className={`mb-2 ${MONO} text-[11px] text-green`}>
                    GreenRoom &middot; build notes
                  </div>
                  <div className="mb-4 font-serif text-[clamp(21px,1.8vw,25px)] leading-[1.12]">
                    Software for performing arts organizations.
                  </div>
                  {/* sketched show-page mockup */}
                  <div
                    aria-hidden
                    className="mb-1.5 rotate-[-0.6deg] border-[1.5px] border-ink p-2.5"
                    style={{ borderRadius: "4px 7px 5px 6px" }}
                  >
                    <div className="mb-2 flex items-center gap-1.5 border-b-[1.5px] border-dashed border-ink pb-1.5">
                      <span className="size-1.5 rounded-full border border-ink" />
                      <span className="size-1.5 rounded-full border border-ink" />
                      <span className="flex-1" />
                      <span className={`${MONO} text-[9px]`}>The show page</span>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className="h-11 w-[34%] rotate-[0.8deg] border-[1.5px] border-ink"
                        style={{ borderRadius: "6px 4px 7px 5px" }}
                      />
                      <span className="grid flex-1 content-center gap-1.5">
                        <span className="h-[5px] w-[90%] bg-ink opacity-75" />
                        <span className="h-[5px] w-[70%] bg-ink opacity-45" />
                        <span className="h-[5px] w-[40%] bg-red opacity-80" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 rotate-[-1deg] font-serif text-[14px] italic text-ink-mid">
                    the show page, third try &#10035;
                  </div>
                  <div className={`${MONO} text-[12px] normal-case tracking-normal text-ink`}>
                    fundraising &middot; marketing &middot; ticketing &middot;
                    launching{" "}
                    <span className="relative inline-block">
                      2026
                      <span
                        aria-hidden
                        className="absolute -inset-x-2 -inset-y-1 border-2 border-red opacity-75"
                        style={{
                          borderRadius: "55% 45% 50% 50% / 65% 55% 60% 45%",
                          transform: "rotate(-4deg)",
                        }}
                      />
                    </span>
                  </div>
                </a>
              </div>

              <span aria-hidden className="basis-full" />

              {/* NOTES — an index card left on the desk */}
              <div className="relative z-[5] ml-[clamp(120px,16vw,240px)] mr-[clamp(-30px,-2vw,-12px)] mt-[clamp(-24px,-1.5vw,-10px)] w-[clamp(210px,24vw,330px)] [transform:rotate(-1.5deg)]">
                <span
                  aria-hidden
                  className="absolute left-[-8%] top-[-10%] z-[-1] h-[56%] w-[68%] rotate-[5deg]"
                  style={{
                    backgroundColor: "var(--rose)",
                    backgroundImage: "var(--paper-grain)",
                    clipPath:
                      "polygon(3% 10%, 24% 0%, 52% 8%, 78% 1%, 98% 9%, 100% 38%, 94% 68%, 99% 94%, 72% 100%, 44% 92%, 18% 99%, 0% 90%, 5% 56%, 0% 28%)",
                    boxShadow: "0 1px 3px rgba(22,17,13,.22)",
                  }}
                />
                <Link
                  href="/writing"
                  className="relative block border-l-2 border-red px-[22px] pb-7 pt-[22px] text-ink no-underline transition-transform duration-300 hover:-translate-y-1 hover:rotate-[1deg]"
                  style={{
                    background:
                      "repeating-linear-gradient(180deg, var(--paper-bright) 0px 25px, #D8C9A8 25px 26px)",
                    boxShadow: "0 4px 12px rgba(22,17,13,.24)",
                  }}
                >
                  <span className="ks-tape absolute left-[32%] top-[-11px]" />
                  <span
                    aria-hidden
                    className="absolute right-2.5 top-2 rotate-[14deg] text-[18px] text-red"
                  >
                    &#10033;
                  </span>
                  <div className={`mb-2.5 ${MONO} text-[11px] text-red`}>
                    Writing &middot; from the desk
                  </div>
                  <div className="font-serif text-[clamp(20px,1.9vw,26px)] italic leading-[1.2]">
                    Essays, observations and unfinished thoughts.
                  </div>
                  <div className={`mt-3 ${MONO} text-[12px] text-ink-mid`}>
                    read the notes &rarr;
                  </div>
                </Link>
              </div>

              {/* MAKING — the photo pulled up into the pile */}
              <div className="relative z-[4] ml-[clamp(28px,6vw,90px)] mt-[clamp(-40px,-2vw,8px)] w-[clamp(200px,23vw,320px)] [transform:rotate(2.5deg)]">
                <span
                  aria-hidden
                  className="absolute right-[-9%] top-[4%] z-[-1] h-[104%] w-[92%] rotate-[4deg]"
                  style={{
                    backgroundColor: "var(--burgundy)",
                    backgroundImage: "var(--paper-grain-light)",
                    clipPath:
                      "polygon(4% 8%, 28% 0%, 58% 6%, 86% 1%, 100% 10%, 96% 40%, 100% 72%, 93% 98%, 62% 92%, 32% 100%, 4% 93%, 8% 52%, 0% 26%)",
                  }}
                />
                <a
                  href="https://www.instagram.com/bykatiespencer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block text-ink no-underline transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1deg]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/on/ticket-opening-night.webp"
                    alt=""
                    aria-hidden
                    className="absolute bottom-[18%] left-[-12%] z-[-1] w-[46%] -rotate-[12deg]"
                    style={{
                      clipPath: "polygon(5% 13%, 95% 9%, 97% 87%, 4% 91%)",
                      filter: "drop-shadow(0 1px 3px rgba(22,17,13,.3))",
                    }}
                  />
                  <span
                    className="block bg-[#F8F1E2] p-[7px]"
                    style={{
                      clipPath:
                        "polygon(1% 2%, 16% 0%, 34% 3%, 52% 0%, 70% 3%, 86% 0%, 99% 2%, 100% 22%, 98% 44%, 100% 66%, 97% 86%, 99% 99%, 82% 97%, 62% 100%, 42% 96%, 22% 100%, 4% 97%, 0% 76%, 2% 52%, 0% 26%)",
                      boxShadow: "0 6px 16px rgba(22,17,13,.3)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/on/cafe-shoot.jpg"
                      alt="Katie working at a cafe"
                      className="block w-full object-cover"
                      style={{ aspectRatio: "4 / 5" }}
                    />
                  </span>
                  <span
                    className={`float-right mt-2.5 inline-block bg-paper-bright px-2.5 py-1.5 [transform:rotate(-1deg)] ${MONO} text-[11px] text-ink`}
                    style={{ boxShadow: "0 1px 3px rgba(22,17,13,.25)" }}
                  >
                    making &middot; music, drawing and whatever else is currently
                    on the table
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Act III · Narratives — velvet burgundy                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="narratives"
        className={`relative overflow-hidden border-t-4 border-gold bg-burgundy text-on-black ${PAD} py-[clamp(56px,8vw,110px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <span
          data-anim="true"
          aria-hidden
          className="absolute left-[4%] bottom-[10%] text-xl text-gold-bright [transform:rotate(-10deg)] [animation:ks-star-twinkle_2.4s_ease_1s_1]"
        >
          &#10022;
        </span>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-[clamp(36px,5vw,72px)]">
          <Reveal className="min-w-[320px] flex-[1.2]">
            <p className="mb-6 font-accent text-xs uppercase tracking-[0.12em] text-gold-bright">
              &#10022; A Narratives production
            </p>
            <h2 className="mb-6 font-serif text-[clamp(44px,6vw,80px)] font-medium leading-none">
              Give them a reason to{" "}
              <em className="italic text-rose-pale">care.</em>
            </h2>
            <p className="mb-9 max-w-[560px] text-[17px] leading-[1.7]">
              Narratives finds the story inside your season and turns it into a
              narrative audiences can understand, feel, and step into.
            </p>
            {/* ticket-stub button */}
            <Link
              href="/narratives"
              className="inline-flex items-stretch [transform:rotate(-1.5deg)] transition-transform duration-300 hover:translate-y-[-4px] hover:[transform:rotate(0deg)]"
              style={{ boxShadow: "0 10px 26px rgba(0,0,0,.4)" }}
            >
              <span className="flex items-center border border-ink border-r-0 bg-paper-deep px-3 py-3.5 font-accent text-[11px] uppercase tracking-[0.13em] text-ink [border-right:1px_dashed_var(--ink)]">
                Admit one
              </span>
              <span className="flex flex-col justify-center gap-[3px] border border-l-0 border-ink bg-paper-bright px-6 py-3 text-ink">
                <span className="font-accent text-[10px] uppercase tracking-[0.13em] text-red">
                  For arts organizations
                </span>
                <span className="font-accent text-sm uppercase tracking-[0.1em]">
                  Explore Narratives &rarr;
                </span>
              </span>
            </Link>
            <div className="mt-9 max-w-[420px] font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
              <div className="flex items-baseline gap-2.5">
                <span>Story direction</span>
                <span aria-hidden className="flex-1 overflow-hidden whitespace-nowrap tracking-[3px]">....................</span>
                <span>Katie Spencer</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2.5">
                <span>Now booking</span>
                <span aria-hidden className="flex-1 overflow-hidden whitespace-nowrap tracking-[3px]">....................</span>
                <span className="text-gold-pale">Season 26&ndash;27</span>
              </div>
            </div>
          </Reveal>
          {/* photo pasted inside the illustrated stage */}
          <Reveal className="relative min-w-[300px] max-w-[480px] flex-1 [transform:rotate(1deg)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/stage-proscenium.webp"
              alt="Illustrated proscenium with velvet curtains"
              className="block w-full"
              style={{
                aspectRatio: "3 / 4",
                objectFit: "cover",
                objectPosition: "50% 18%",
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,.45))",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/theatre-dome.jpg"
              alt="The Tennessee Theatre dome, pasted onto the illustrated stage"
              className="absolute"
              style={{
                left: "24%",
                top: "33%",
                width: "52%",
                height: "34%",
                objectFit: "cover",
                borderRadius: "46% 46% 3% 3% / 30% 30% 2% 2%",
                boxShadow: "inset 0 0 18px rgba(0,0,0,.55), 0 2px 6px rgba(0,0,0,.4)",
                transform: "rotate(-.5deg)",
              }}
            />
            <p className="absolute right-[4%] -bottom-3.5 font-accent text-[11px] uppercase tracking-[0.1em] text-on-black-soft [transform:rotate(-1deg)]">
              the house, pasted where it belongs
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Also building · The company · Selected work                     */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="work"
        className={`relative border-t border-line bg-paper-bright ${PAD} py-[clamp(56px,8vw,100px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <div className="mx-auto max-w-[1180px]">
          {/* the two ventures, side by side */}
          <div className="flex flex-wrap gap-[clamp(36px,5vw,80px)]">
            <Reveal className="min-w-[300px] flex-[1.1]">
              <p className="mb-[18px] font-accent text-xs uppercase tracking-[0.12em] text-green">
                Also building
              </p>
              <h3 className="mb-3.5 font-serif text-[clamp(30px,3.4vw,44px)] font-normal leading-[1.08]">
                GreenRoom.{" "}
                <em className="font-serif italic text-muted-foreground">
                  Behind-the-scenes complexity, beautifully simplified.
                </em>
              </h3>
              <p className="mb-[18px] max-w-[520px] text-[16px] leading-[1.7] text-muted-foreground">
                Fundraising, marketing, ticketing and operations in one platform
                for arts organizations.
              </p>
              <a
                href="https://greenroomcrm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-dotted border-red pb-0.5 font-accent text-[13px] uppercase tracking-[0.1em] text-red transition-colors hover:text-red-deep"
              >
                greenroomcrm.com &rarr;
              </a>
            </Reveal>
            <Reveal className="min-w-[280px] flex-1">
              <p className="mb-[18px] font-accent text-xs uppercase tracking-[0.12em] text-ink-faint">
                The company
              </p>
              <p className="mb-4 max-w-[480px] text-[16px] leading-[1.7]">
                Katie Spencer is an opera singer turned founder in Knoxville,
                Tennessee. She has performed the repertoire, co-founded a
                company, helped lead an institution, and is now building software
                and stories for the field she loves.
              </p>
              <Link
                href="/about"
                className="border-b border-dotted border-red pb-px font-serif text-[17px] italic text-red transition-colors hover:text-red-deep"
              >
                The full story, off book &rarr;
              </Link>
            </Reveal>
          </div>

          {/* selected work — the pinned prints */}
          <div className="mt-[clamp(44px,6vw,72px)] border-t-2 border-ink pt-4">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2.5">
              <span className="font-accent text-xs uppercase tracking-[0.12em]">
                Selected work
              </span>
              <span className="font-serif text-[16px] italic text-muted-foreground">
                A decade of seasons, campaigns, and films behind the method.
              </span>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-3">
              {SELECTED.map((w) => (
                <Link
                  key={w.title}
                  href={w.href}
                  className="group block text-foreground transition-transform duration-300 hover:-translate-y-1"
                  style={{ transform: `rotate(${w.tilt})` }}
                >
                  <div
                    className="bg-[#F8F1E2] p-2.5"
                    style={{ boxShadow: "var(--shadow-paper)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.image}
                      alt={w.title}
                      className="block w-full"
                      style={{ aspectRatio: "4 / 5", objectFit: "cover" }}
                    />
                  </div>
                  <p className="mt-4 font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
                    {w.label}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl leading-snug">
                    {w.title}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="mt-9 text-right">
              <Link
                href="/portfolio"
                className="font-accent text-xs uppercase tracking-[0.12em] text-brand hover:text-red-deep"
              >
                All work &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Act IV · Notes from the house — torn clippings                  */}
      {/* ---------------------------------------------------------------- */}
      <section id="notes" className={`relative z-[4] ${PAD} py-[clamp(56px,8vw,110px)]`}>
        {/* the arts review, left on top of the pile, crossing into intermission */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/newspaper-arts.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[clamp(-60px,-3vw,-20px)] bottom-[clamp(-90px,-6vw,-50px)] z-[6] w-[clamp(220px,24vw,360px)] [transform:rotate(-5deg)]"
          style={{ filter: "drop-shadow(0 4px 10px rgba(22,17,13,.3))" }}
        />
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(40px,6vw,64px)] flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
            <h2 className="font-serif text-[clamp(34px,4vw,52px)] font-medium">
              Notes from the house
            </h2>
            <span className="font-accent text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Act IV &middot; Director&rsquo;s notes
            </span>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-0">
            {/* torn newspaper clipping — newest essay */}
            <Link
              href="/writing/sometimes-the-show-is-the-problem"
              className="group z-[2] mb-7 block w-[clamp(250px,27vw,340px)] p-6 pb-10 text-[#2A241A] transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#E9E0C9",
                backgroundImage: "var(--paper-grain)",
                clipPath:
                  "polygon(0% 0%, 100% 0%, 98% 24%, 100% 46%, 96% 68%, 99% 88%, 95% 99%, 72% 94%, 46% 100%, 22% 95%, 0% 99%, 3% 72%, 0% 48%, 2% 24%)",
                transform: "rotate(-2deg)",
                filter: "drop-shadow(0 1px 3px rgba(22,17,13,.28))",
              }}
            >
              <div className="flex justify-between border-b border-t-[3px] border-double border-[#2A241A] py-1.5 font-accent text-[10px] uppercase tracking-[0.16em]">
                <span>Audiences</span>
                <span>08/2026</span>
              </div>
              <div className="mb-2.5 mt-3.5 font-serif text-[27px] font-normal leading-[1.08] [text-wrap:pretty]">
                Sometimes the show is the problem.
              </div>
              <div className="columns-2 gap-3.5 text-justify text-[13px] leading-[1.55] text-[#574C3B]">
                Nobody says this out loud at opera conferences: sometimes people
                don&rsquo;t come back because the show was a dud.
              </div>
            </Link>
            {/* program page — the older essay */}
            <Link
              href="/writing/what-opera-taught-me-about-building"
              className="group z-[3] mx-[-6px] mb-7 mt-[34px] block w-[clamp(230px,24vw,300px)] border border-line bg-paper-bright p-8 text-center text-ink transition-transform duration-300 hover:-translate-y-1"
              style={{ transform: "rotate(1deg)", boxShadow: "0 4px 14px rgba(22,17,13,.18)" }}
            >
              <div className="mb-2.5 text-sm text-gold">&#10022;</div>
              <div className="mb-4 border-b border-t border-ink py-1.5 font-accent text-[10px] uppercase tracking-[0.18em]">
                On craft &middot; 07/2026
              </div>
              <div className="mb-3 font-serif text-[26px] italic leading-[1.15]">
                What opera taught me about building.
              </div>
              <div className="text-[13px] leading-[1.6] text-muted-foreground">
                I spent fifteen years preparing to walk onto stages I
                couldn&rsquo;t fully see until the lights came up.
              </div>
              <div className="mt-4 font-accent text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                &mdash; page 07 &mdash;
              </div>
            </Link>
            {/* typed note with pencil marking */}
            <Link
              href="/writing"
              className="group relative z-[1] mb-7 mt-2.5 block w-[clamp(240px,25vw,310px)] p-8 pb-9 text-ink transition-transform duration-300 hover:-translate-y-1 hover:[transform:rotate(0deg)]"
              style={{
                backgroundColor: "#F4EAD3",
                backgroundImage: "var(--paper-grain)",
                transform: "rotate(-1deg)",
                boxShadow: "0 2px 8px rgba(22,17,13,.2)",
              }}
            >
              <span className="ks-tape absolute -top-3 right-[18%]" />
              <div className="font-accent text-xs leading-[1.75] tracking-[0.04em]">
                FROM THE DESK OF K. SPENCER
                <br />
                <br />
                Essays, observations and{" "}
                <span className="relative inline-block">
                  unfinished
                  <span
                    aria-hidden
                    className="absolute inset-x-[-4px] bottom-px border-b-[3px] border-red opacity-80 [transform:rotate(-1.4deg)]"
                  />
                </span>{" "}
                thoughts. The rest are in the notebook.
              </div>
              <div className="mt-4 font-serif text-[15px] italic text-muted-foreground [transform:rotate(-2deg)]">
                all notes &rarr;
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Intermission · Off stage — the live Instagram feed              */}
      {/* ---------------------------------------------------------------- */}
      <OffStage />
    </>
  );
}
