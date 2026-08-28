import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "I've performed on opera stages, co-founded a company, helped lead an institution, and now I'm building software. The medium keeps changing. The work doesn't. I build things people believe in.",
  path: "/about",
});

const PAD = "px-[clamp(20px,4.5vw,56px)]";

/* ------------------------------------------------------------------ */
/*  Dotted leader — label ···· value, drawn with a dotted rule        */
/* ------------------------------------------------------------------ */
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
      <span
        aria-hidden
        className={`flex-1 border-b-2 border-dotted ${ruleClass}`}
      />
      <span>{value}</span>
    </div>
  );
}

const MONO =
  "font-accent uppercase tracking-[0.12em]";

/* ------------------------------------------------------------------ */
/*  A tilted chapter photo in a cream frame, with a mono caption      */
/* ------------------------------------------------------------------ */
function FramedPhoto({
  src,
  alt,
  caption,
  tilt,
  captionAlign = "text-left",
}: {
  src: string;
  alt: string;
  caption: string;
  tilt: string;
  captionAlign?: string;
}) {
  return (
    <div
      className="group bg-[#F8F1E2] p-2 pb-3 transition-transform duration-300 hover:rotate-0"
      style={{ transform: `rotate(${tilt})`, boxShadow: "var(--shadow-paper)" }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 42vw"
          className="object-cover"
        />
      </div>
      <p className={`pt-2 ${MONO} text-[10px] text-ink-mid ${captionAlign}`}>
        {caption}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Hero — the playbill for a life, on velvet green                  */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative overflow-hidden bg-green text-on-black ${PAD} pb-[clamp(88px,11vw,150px)] pt-[clamp(28px,4vw,56px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        {/* teal concentric arch escaping the left edge */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/arch-teal.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-16%] left-[clamp(-150px,-7.5vw,-52px)] z-0 hidden h-[clamp(440px,60vw,940px)] w-auto max-w-none md:block"
        />

        <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
          <Reveal className="relative z-[2] min-w-[320px] flex-[1.15]">
            <p className={`mb-[22px] ${MONO} text-[12px] text-gold-bright`}>
              About &middot; off book
            </p>
            <h1 className="mb-[30px] font-serif text-[clamp(46px,7vw,96px)] font-normal leading-[0.98] [text-wrap:pretty]">
              Different rooms,{" "}
              <em className="italic">
                <span className="text-gold-bright">one</span> throughline
                <span className="text-gold-bright">.</span>
              </em>
            </h1>
            <div className="max-w-[480px] border-l-[3px] border-gold pl-6">
              <p className="text-[17px] leading-[1.75] text-on-black">
                I&rsquo;ve performed on opera stages, co-founded a company,
                helped lead an institution, and now I&rsquo;m building software.
                The work looks different every time. Underneath, I build things
                people believe in.
              </p>
            </div>
          </Reveal>

          {/* the collage cluster */}
          <Reveal className="relative z-[2] min-w-[300px] max-w-[500px] flex-1">
            {/* burgundy torn scrap behind the card */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/burgundy-scrap.webp"
              alt=""
              aria-hidden
              className="absolute right-[-16%] top-[-18%] z-0 hidden w-[clamp(210px,26vw,360px)] rotate-[6deg] sm:block"
              style={{ filter: "drop-shadow(0 3px 10px rgba(13,26,23,.4))" }}
            />
            {/* striped scrap, far right, bleeding off */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/stripe-scrap.webp"
              alt=""
              aria-hidden
              className="absolute right-[-24%] top-[18%] z-0 hidden w-[clamp(150px,18vw,240px)] rotate-[64deg] sm:block"
              style={{ filter: "drop-shadow(0 3px 8px rgba(13,26,23,.4))" }}
            />
            {/* blue-grey torn paper, lower right */}
            <span
              aria-hidden
              className="absolute bottom-[-14%] right-[-10%] z-0 hidden sm:block"
              style={{
                width: "clamp(150px,18vw,260px)",
                height: "clamp(120px,15vw,220px)",
                backgroundColor: "var(--blue)",
                backgroundImage: "var(--paper-grain)",
                clipPath:
                  "polygon(3% 12%, 28% 2%, 56% 8%, 84% 1%, 100% 16%, 96% 48%, 100% 82%, 72% 96%, 42% 90%, 14% 99%, 0% 70%, 5% 40%)",
                transform: "rotate(-5deg)",
                opacity: 0.9,
              }}
            />

            {/* THE PROGRAM card */}
            <div
              className="relative z-[2] border border-ink bg-paper-bright p-[clamp(22px,2.6vw,34px)] text-ink"
              style={{
                transform: "rotate(var(--tilt-2))",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <span className="ks-tape absolute left-[38%] top-[-11px]" />
              <p className={`mb-5 text-center ${MONO} text-[11px] text-ink`}>
                &#10022; The program &#10022;
              </p>
              <div className={`grid gap-[13px] ${MONO} text-[clamp(12px,1.3vw,14px)]`}>
                <Leader label="Act I" value="Opera" />
                <Leader label="Act II" value="City Lyric" />
                <Leader label="Act III" value="Knoxville Opera" />
                <Leader label="Act IV" value="GreenRoom" />
                <Leader label="Act V" value="What’s next" />
              </div>
            </div>

            {/* peony, tucked at the card's lower-left */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/peony-stem.webp"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-[-26%] left-[-13%] z-[3] w-[clamp(120px,14vw,190px)] -rotate-[8deg]"
              style={{ filter: "drop-shadow(2px 4px 8px rgba(13,26,23,.4))" }}
            />
            {/* the ticket, hanging off the card's lower edge */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/ticket-tennessee.webp"
              alt="Tennessee Theatre dress rehearsal ticket, orchestra, admit one"
              className="absolute bottom-[-34%] left-[30%] z-[4] w-[clamp(120px,15vw,185px)] -rotate-[8deg]"
              style={{ filter: "drop-shadow(0 5px 12px rgba(13,26,23,.45))" }}
            />
          </Reveal>
        </div>

        {/* scalloped deckle edge — the green tears away to paper below */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] z-[4] h-[22px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18px 100%, var(--paper) 16.5px, transparent 17px), radial-gradient(circle at 18px 100%, var(--gold) 18px, transparent 18.5px)",
            backgroundSize: "36px 22px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  My story — the manuscript column, on bright paper                */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative bg-paper-bright ${PAD} py-[clamp(64px,9vw,120px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        <Reveal className="mx-auto max-w-[1100px]">
          <p className={`mb-9 ${MONO} text-[12px] text-red`}>My story</p>
          <div className="flex flex-wrap gap-[clamp(36px,5vw,80px)]">
            <div className="min-w-[320px] flex-[1.1]">
              <h2 className="mb-7 font-serif text-[clamp(34px,4.4vw,56px)] font-normal leading-[1.06] [text-wrap:pretty]">
                From the stage. To strategy.{" "}
                <em className="italic text-red">
                  To building something of my own.
                </em>
              </h2>
              <div className="flex max-w-[560px] flex-col gap-4 text-[16px] leading-[1.7]">
                <p>
                  About a decade ago, I made a decision that changed the course
                  of my career.
                </p>
                <p>
                  I stepped away from pursuing opera full-time and co-founded
                  City Lyric Opera in New York City. It was my first experience
                  building something from the ground up, and it completely
                  changed how I thought about leadership, creativity, and the
                  arts.
                </p>
                <p>
                  I&rsquo;d spent years preparing for a career on stage, earning
                  my Master&rsquo;s in Vocal Performance from the Manhattan
                  School of Music. But co-founding City Lyric revealed something
                  I hadn&rsquo;t expected.
                </p>
                <p className="text-muted-foreground">
                  I was even more fulfilled bringing talented people together
                  around a shared vision than I was standing in the spotlight
                  myself. I loved building the team, shaping the experience, and
                  asking the bigger questions that determine whether an
                  organization truly connects. That curiosity never left me.
                </p>
              </div>
            </div>
            <div className="flex min-w-[300px] flex-1 flex-col justify-center gap-7">
              <div className="border-l-[3px] border-gold pl-6">
                <p className="font-serif text-[clamp(24px,2.6vw,32px)] italic leading-[1.3]">
                  The best organizations aren&rsquo;t defined by the size of
                  their budget. They&rsquo;re defined by clarity.
                </p>
              </div>
              <p className="text-[16px] leading-[1.7] text-muted-foreground">
                They know who they are, why they exist, and how to invite people
                into a mission worth joining. Over the past decade, that idea has
                carried me from the rehearsal hall to the boardroom, from
                marketing campaigns to fundraising strategy, from nonprofit
                leadership to entrepreneurship.
              </p>
              <p className="text-[16px] leading-[1.7]">
                It still sits at the center of everything I do.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The program — five chapters, over a faint harlequin band         */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative overflow-hidden ${PAD} py-[clamp(56px,8vw,110px)]`}
        style={{
          backgroundColor: "var(--paper)",
          backgroundImage:
            "linear-gradient(rgba(239,227,203,.88), rgba(239,227,203,.84)), var(--harlequin)",
          backgroundSize: "auto, clamp(150px,16vw,220px)",
          backgroundPosition: "center, 50% 0",
        }}
      >
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3.5">
              <h2 className="font-serif text-[clamp(32px,4vw,50px)] font-normal">
                The program
              </h2>
              <span className={`${MONO} text-[12px] text-ink-mid`}>
                Five chapters
              </span>
            </div>
            <p className="mb-[clamp(40px,6vw,64px)] font-serif text-[17px] italic text-ink-mid">
              the moments that shaped how I build
            </p>
          </Reveal>

          {/* Chapter I */}
          <Reveal className="mb-[clamp(56px,8vw,90px)] flex flex-wrap items-center gap-[clamp(28px,4vw,64px)]">
            <div className="min-w-[300px] flex-[1.1]">
              <p className={`mb-3 ${MONO} text-[11px] text-red`}>Chapter I</p>
              <h3 className="mb-3.5 font-serif text-[clamp(28px,3.2vw,40px)] font-normal">
                The stage.
              </h3>
              <Leader
                label="The setting"
                value="Opera & Performance"
                className={`mb-[18px] max-w-[380px] ${MONO} text-[12px] text-ink-mid`}
              />
              <p className="max-w-[520px] text-[15px] leading-[1.7]">
                Years performing opera taught me the lesson behind everything I
                build: a story doesn&rsquo;t just inform people, it moves them.
                Performance is where I first felt how a story takes hold, in a
                room, in a body, in a single held note.
              </p>
            </div>
            <div className="min-w-[280px] max-w-[440px] flex-1">
              <FramedPhoto
                src="/about-stage.jpg"
                alt="Opera and performance"
                caption="opera & performance"
                tilt="var(--tilt-1)"
              />
            </div>
          </Reveal>

          {/* Chapter II */}
          <Reveal className="mb-[clamp(56px,8vw,90px)] flex flex-wrap-reverse items-center gap-[clamp(28px,4vw,64px)]">
            <div className="relative min-w-[280px] max-w-[440px] flex-1">
              {/* rose torn scrap behind the print */}
              <span
                aria-hidden
                className="absolute inset-x-[-5%] bottom-[8%] top-[-5%] z-0"
                style={{
                  backgroundColor: "var(--rose)",
                  backgroundImage: "var(--paper-grain)",
                  clipPath:
                    "polygon(2% 8%, 24% 0%, 52% 6%, 78% 1%, 98% 7%, 100% 34%, 94% 62%, 99% 92%, 72% 98%, 44% 92%, 18% 99%, 0% 93%, 5% 60%, 0% 32%)",
                  transform: "rotate(-3deg)",
                }}
              />
              <div className="relative mx-auto w-[92%]">
                <Image
                  src="/about-leap.jpg"
                  alt="City Lyric Opera"
                  width={880}
                  height={660}
                  sizes="(max-width: 768px) 82vw, 40vw"
                  className="block h-auto w-full object-cover"
                  style={{
                    aspectRatio: "4 / 3",
                    clipPath:
                      "polygon(1% 3%, 14% 0%, 30% 3%, 47% 0%, 63% 3%, 79% 1%, 94% 3%, 100% 0%, 99% 20%, 100% 41%, 98% 61%, 100% 80%, 98% 100%, 83% 98%, 66% 100%, 49% 97%, 32% 100%, 16% 98%, 0% 100%, 1% 79%, 0% 58%, 2% 38%, 0% 19%)",
                    filter: "drop-shadow(1px 3px 5px rgba(22,17,13,.3))",
                  }}
                />
                <p
                  className={`relative pt-2.5 text-center ${MONO} text-[10px] text-ink-mid`}
                >
                  city lyric opera
                </p>
              </div>
            </div>
            <div className="min-w-[300px] flex-[1.1]">
              <p className={`mb-3 ${MONO} text-[11px] text-red`}>Chapter II</p>
              <h3 className="mb-3.5 font-serif text-[clamp(28px,3.2vw,40px)] font-normal">
                The leap.
              </h3>
              <Leader
                label="The setting"
                value="City Lyric Opera"
                className={`mb-[18px] max-w-[380px] ${MONO} text-[12px] text-ink-mid`}
              />
              <p className="max-w-[520px] text-[15px] leading-[1.7]">
                Co-founding a company from nothing taught me that belief is
                built, not waited for. I learned to gather people around an idea
                before it fully existed, and found I loved creating the vessel as
                much as performing inside it.
              </p>
            </div>
          </Reveal>

          {/* Chapter III */}
          <Reveal className="mb-[clamp(56px,8vw,90px)] flex flex-wrap items-center gap-[clamp(28px,4vw,64px)]">
            <div className="min-w-[300px] flex-[1.1]">
              <p className={`mb-3 ${MONO} text-[11px] text-red`}>Chapter III</p>
              <h3 className="mb-3.5 font-serif text-[clamp(28px,3.2vw,40px)] font-normal">
                Growing an institution.
              </h3>
              <Leader
                label="The setting"
                value="Knoxville Opera"
                className={`mb-[18px] max-w-[380px] ${MONO} text-[12px] text-ink-mid`}
              />
              <p className="max-w-[520px] text-[15px] leading-[1.7]">
                Leading fundraising and marketing taught me that strategy only
                works when a story carries it. People don&rsquo;t invest in
                budgets or buy tickets to logistics, they give themselves to a
                narrative they want to belong to.
              </p>
            </div>
            <div className="min-w-[280px] max-w-[440px] flex-1">
              <Image
                src="/about-institution.jpg"
                alt="Knoxville Opera"
                width={880}
                height={660}
                sizes="(max-width: 768px) 82vw, 40vw"
                className="block h-auto w-full object-cover"
                style={{
                  aspectRatio: "4 / 3",
                  clipPath:
                    "polygon(4% 3%, 34% 0%, 66% 4%, 97% 1%, 100% 28%, 95% 55%, 99% 82%, 94% 99%, 62% 95%, 30% 100%, 2% 96%, 6% 66%, 0% 36%)",
                  transform: "rotate(1.5deg)",
                  filter: "drop-shadow(1px 3px 5px rgba(22,17,13,.3))",
                }}
              />
              <p className={`pt-2.5 text-right ${MONO} text-[10px] text-ink-mid`}>
                knoxville opera
              </p>
            </div>
          </Reveal>

          {/* Chapter IV — now building, a gold-bordered green-deep placard */}
          <Reveal className="mb-[clamp(56px,8vw,90px)]">
            <div
              className="relative border-[3px] border-double border-gold bg-green-deep p-[clamp(28px,4vw,56px)] text-on-black"
              style={{
                backgroundImage: "var(--paper-grain-light)",
                transform: "rotate(-.5deg)",
              }}
            >
            <span
              data-anim="true"
              aria-hidden
              className="absolute right-[4%] top-[8%] text-[22px] text-gold-bright [animation:ks-star-twinkle_2.2s_ease_0.8s_1]"
            >
              &#10022;
            </span>
            <p className={`mb-3.5 ${MONO} text-[11px] text-gold-bright`}>
              Chapter IV &middot; Now building
            </p>
            <div className="flex flex-wrap gap-[clamp(28px,4vw,64px)]">
              <div className="min-w-[300px] flex-[1.2]">
                <h3 className="mb-4 font-serif text-[clamp(30px,3.6vw,46px)] font-normal">
                  Building the future.
                </h3>
                <p className="max-w-[560px] text-[15px] leading-[1.7] text-on-black-soft">
                  Building software taught me that belief has to scale.
                  GreenRoom turns hard-won lessons about arts organizations into
                  tools they use every day, the infrastructure a story needs to
                  keep being told. Alongside it I&rsquo;m building{" "}
                  <Link href="/narratives" className="text-gold-pale underline decoration-dotted underline-offset-2">
                    Narratives
                  </Link>
                  , which brings story strategy to the marketing teams inside
                  performing arts organizations. Two companies, one field,
                  opposite ends of the same problem.
                </p>
              </div>
              <div className="flex min-w-[260px] flex-1 flex-col justify-center gap-3">
                <Leader
                  label="The venture"
                  value="GreenRoom"
                  ruleClass="border-on-black-mute"
                  className={`${MONO} text-[12px] text-on-black-soft`}
                />
                <Leader
                  label="Status"
                  value="Launching 2026"
                  ruleClass="border-on-black-mute"
                  className={`${MONO} text-[12px] text-on-black-soft`}
                />
                <a
                  href="https://greenroomcrm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 self-start border-b border-dotted border-gold-pale pb-0.5 ${MONO} text-[12px] text-gold-pale`}
                >
                  greenroomcrm.com &rarr;
                </a>
              </div>
            </div>
            </div>
          </Reveal>

          {/* Chapter V */}
          <Reveal className="flex flex-wrap-reverse items-center gap-[clamp(28px,4vw,64px)]">
            <div className="relative min-w-[280px] max-w-[440px] flex-1">
              {/* desk-notes scrap, pasted top-right */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/desk-notes.webp"
                alt=""
                aria-hidden
                className="absolute right-[-8%] top-[-10%] z-[1] h-[48%] w-[44%] object-cover"
                style={{
                  objectPosition: "82% 6%",
                  clipPath:
                    "polygon(4% 8%, 30% 0%, 58% 6%, 88% 1%, 100% 12%, 96% 44%, 100% 78%, 92% 98%, 60% 92%, 30% 99%, 2% 93%, 8% 52%, 0% 26%)",
                  transform: "rotate(5deg)",
                  boxShadow: "0 1px 4px rgba(22,17,13,.3)",
                }}
              />
              <FramedPhoto
                src="/about-whatsnext.jpg"
                alt="Still being written"
                caption="still being written"
                tilt="var(--tilt-3)"
              />
            </div>
            <div className="min-w-[300px] flex-[1.1]">
              <p className={`mb-3 ${MONO} text-[11px] text-red`}>Chapter V</p>
              <h3 className="mb-3.5 font-serif text-[clamp(28px,3.2vw,40px)] font-normal">
                What&rsquo;s next.
              </h3>
              <Leader
                label="The setting"
                value="Still being written"
                className={`mb-[18px] max-w-[380px] ${MONO} text-[12px] text-ink-mid`}
              />
              <p className="max-w-[520px] text-[15px] leading-[1.7]">
                Now I&rsquo;m exploring how technology and story shape each
                other, across writing, speaking, and projects still taking form.
                Every chapter taught me the same thing: the medium keeps
                changing, but the work doesn&rsquo;t.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Intermission — the personal note, on bright paper                */}
      {/* ---------------------------------------------------------------- */}
      <section
        className={`relative overflow-hidden border-t border-line bg-paper-bright ${PAD} py-[clamp(56px,8vw,96px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/peony-stem.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-30px] right-[-40px] w-[clamp(140px,16vw,240px)] rotate-[18deg]"
          style={{ filter: "drop-shadow(2px 4px 8px rgba(22,17,13,.25))" }}
        />
        <Reveal className="relative mx-auto max-w-[760px] text-center">
          <p className={`mb-5 ${MONO} text-[12px] text-rose`}>
            &#10022; Intermission &#10022;
          </p>
          <p className="font-serif text-[clamp(20px,2.4vw,27px)] italic leading-[1.45]">
            Outside of my work, I&rsquo;m a wife, a mom of two daughters, a
            lifelong creative, and someone whose faith shapes both my life and my
            leadership. My career has worn many titles: performer, founder,
            nonprofit leader, entrepreneur. But they&rsquo;ve always been
            expressions of the same calling: storyteller.
          </p>
        </Reveal>
      </section>

    </>
  );
}
