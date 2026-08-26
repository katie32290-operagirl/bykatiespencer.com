import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { OffStage } from "@/components/sections/off-stage";
import { cn } from "@/lib/utils";

const DOTS = "....................";

function MonoLeader({
  label,
  value,
  valueClass,
  dotClass = "text-on-black-mute",
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
 * Homepage — Design System v2, template "Homepage v3".
 * A life in stories, on stage and off. Two grounds alternating; the printed
 * program as structure. Connect lives in the global footer.
 */
export function HomeV3() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Hero — full-bleed theatre, the name over the house              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-ink">
        <Image
          src="/v3/theatre-dome.jpg"
          alt="A film shoot beneath the dome of the Tennessee Theatre"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_48%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a07]/85 via-[#0d0a07]/35 to-transparent" />
        <Container
          size="wide"
          className="relative flex max-w-[1180px] flex-wrap items-end justify-between gap-10 px-6 pb-14 pt-32 text-on-black sm:px-14"
        >
          <div className="max-w-[780px]">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-gold-pale">
              A life in stories. On stage and off.
            </p>
            <h1 className="mt-4 font-serif text-[clamp(64px,9vw,128px)] leading-[0.98]">
              Katie Spencer<span className="text-brand">.</span>
            </h1>
            <p className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.24em]">
              Artist<span className="text-brand">.</span> Storyteller
              <span className="text-brand">.</span> Strategist
              <span className="text-brand">.</span> Founder
              <span className="text-brand">.</span>
            </p>
            <div className="mt-8">
              <Link
                href="#premise"
                className="inline-block rounded-[2px] bg-paper px-8 py-4 font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-ink transition-opacity hover:opacity-90"
              >
                Enter the room &rarr;
              </Link>
            </div>
          </div>

          <div className="grid min-w-[240px] gap-2 font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-soft">
            <MonoLeader label="Singer" value="Artist" />
            <MonoLeader label="Writer" value="Storyteller" />
            <MonoLeader label="Producer" value="Strategist" />
            <MonoLeader label="Builder" value="Founder" />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The premise                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section id="premise" className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-x-16 gap-y-10">
          <div className="max-w-[640px] flex-[1_1_460px]">
            <p className="font-accent text-xs uppercase tracking-[0.12em] text-brand">
              The premise
            </p>
            <h2 className="mt-5 font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.06]">
              The art doesn&rsquo;t need to change. The way we invite people into
              it does.
            </h2>
            <p className="mt-6 max-w-[540px] text-lg leading-[1.7] text-muted-foreground">
              My work lives where art, story, audience and building things meet.
              I&rsquo;m an artist who has spent her career inside performing arts
              organizations, on stage and in the office. Now I build companies,
              stories and tools for the people making the work.
            </p>
          </div>
          <div className="mt-14 flex-[1_1_340px]">
            <div className="relative h-[460px] w-full overflow-hidden rounded-[6px]">
              <Image
                src="/v3/in-rehearsal.jpg"
                alt="Katie leading a rehearsal room"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <p className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Rehearsal, Knoxville
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  In rehearsal — near-black                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-x-[70px] gap-y-12">
          <div className="flex-[1_1_480px]">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              In rehearsal
            </p>
            <h2 className="mt-4 font-serif text-[clamp(32px,3.6vw,46px)] leading-[1.08]">
              What&rsquo;s on the table right now.
            </h2>
            <div className="mt-8 font-accent tracking-[0.12em]">
              <RehearsalRow
                name="GreenRoom"
                body="Software for performing arts organizations. Launching 2026."
              />
              <RehearsalRow
                name="Narratives"
                body="Helping performing arts organizations find the story underneath the season."
              />
              <RehearsalRow
                name="Writing"
                body="Essays, observations and unfinished thoughts."
              />
              <RehearsalRow
                name="Making"
                body="Music, drawing and whatever else is currently on the table."
                last
              />
            </div>
            <p className="mt-6 origin-left -rotate-1 font-accent text-[13px] tracking-[0.12em] text-brand">
              Remember: it&rsquo;s a story. Not a sales pitch.
            </p>
          </div>
          <div className="relative mt-5 max-w-[460px] flex-[1_1_320px]">
            <div className="rotate-[1.4deg] bg-ink-soft p-3 pb-4 shadow-[0_10px_30px_rgba(23,18,13,.4)]">
              <div className="relative h-[340px] w-full overflow-hidden">
                <Image
                  src="/v3/backstage.jpg"
                  alt="Katie watching a take beside the camera"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -top-2.5 left-[42%] h-[26px] w-[92px] -rotate-3 bg-gold-pale/80"
            />
            <p className="mt-4 font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
              Backstage access, not a portfolio.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Narratives — a production                                        */}
      {/* ---------------------------------------------------------------- */}
      <section id="narratives" className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-stretch">
          <div className="flex-[1_1_480px] py-5 pr-0 md:pr-14">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              A Narratives production
            </p>
            <h2 className="mt-5 font-serif text-[clamp(48px,6vw,84px)] leading-none">
              Give them a reason to care<span className="text-brand">.</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-lg leading-[1.7] text-muted-foreground">
              Narratives finds the story inside your season and turns it into a
              narrative audiences can understand, feel, and step into.
            </p>
            <div className="mt-8">
              <Link
                href="/narratives"
                className="inline-block rounded-[2px] bg-ink px-8 py-4 font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.14em] text-paper transition-opacity hover:opacity-90"
              >
                Explore Narratives &rarr;
              </Link>
            </div>
            <div className="mt-9 max-w-[420px] font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              <MonoLeader
                label="Story direction"
                value="Katie Spencer"
                dotClass="text-ink-faint"
              />
              <MonoLeader
                label="Now booking"
                value="Season 26–27"
                valueClass="text-brand"
                dotClass="text-ink-faint"
                className="mt-2"
              />
            </div>
          </div>
          <div className="flex flex-[1_1_340px] border-l border-dashed border-ink-faint pl-10">
            <div className="relative min-h-[480px] w-full overflow-hidden rounded-[6px]">
              <Image
                src="/v3/on-stage.jpg"
                alt="Katie Spencer on stage, mid-conversation, in a historic theatre"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[60%_center]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  GreenRoom — the band                                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="greenroom" className="px-6 sm:px-14">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-baseline gap-x-[70px] gap-y-6 border-y border-border py-10">
          <div className="min-w-[220px]">
            <p className="font-accent text-xs uppercase tracking-[0.12em] text-ink-faint">
              Also building
            </p>
            <p className="mt-2 font-serif text-4xl">
              GreenRoom<span className="text-brand">.</span>
            </p>
          </div>
          <div className="max-w-[560px] flex-[1_1_380px]">
            <p className="font-serif text-xl italic leading-[1.4]">
              Behind-the-scenes complexity, beautifully simplified.
            </p>
            <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
              Fundraising, marketing, ticketing and operations in one platform
              for arts organizations.
            </p>
          </div>
          <a
            href="https://greenroomcrm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-accent text-xs uppercase tracking-[0.12em] text-brand hover:text-red-deep"
          >
            greenroomcrm.com &rarr;
          </a>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Notes from the house                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="notes" className="px-6 py-20 sm:px-14 md:py-24">
        <Reveal className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-5">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              Notes from the house
            </p>
            <Link
              href="/writing"
              className="font-accent text-xs uppercase tracking-[0.12em] text-brand hover:text-red-deep"
            >
              All notes &rarr;
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-14">
            <Link
              href="/writing/what-opera-taught-me-about-building"
              className="group flex-[1_1_520px] text-foreground"
            >
              <div className="relative h-[420px] w-full overflow-hidden rounded-[6px]">
                <Image
                  src="/v3/on-set.jpg"
                  alt="Katie directing on set at a sidewalk cafe, reviewing the script"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover object-[55%_35%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-4 font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
                On craft &middot; July 2026
              </p>
              <h3 className="mt-2.5 font-serif text-[clamp(30px,3.2vw,40px)] leading-[1.12]">
                What Opera Taught Me About Building
              </h3>
              <p className="mt-2.5 max-w-[560px] text-base leading-[1.6] text-muted-foreground">
                I spent fifteen years preparing to walk onto stages I
                couldn&rsquo;t fully see until the lights came up.
              </p>
            </Link>
            <div className="flex max-w-[460px] flex-[1_1_320px] flex-col">
              <NoteLink
                href="/writing/sometimes-the-show-is-the-problem"
                meta="Audiences · August 2026"
                title="Sometimes the show is the problem."
                body="Marketing makes the promise. Eventually the experience has to keep it. Sometimes people don’t come back because the show was a dud."
              />
              <div className="border-t border-foreground" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Off stage — synced to the live Instagram feed                    */}
      {/* ---------------------------------------------------------------- */}
      <OffStage />

      {/* ---------------------------------------------------------------- */}
      {/*  The company                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-20 sm:px-14 md:pb-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-baseline gap-x-[70px] gap-y-6 border-t-2 border-foreground pt-7">
          <p className="min-w-[180px] font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            The company
          </p>
          <div className="max-w-[640px] flex-[1_1_420px]">
            <p className="text-lg leading-[1.7] text-foreground">
              Katie Spencer is an opera singer turned founder in Knoxville,
              Tennessee. She has performed the repertoire, co-founded a company,
              led an institution, and is now building software and stories for
              the field she loves.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-block font-accent text-xs uppercase tracking-[0.12em] text-brand hover:text-red-deep"
            >
              The full story, off book &rarr;
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function RehearsalRow({
  name,
  body,
  last,
}: {
  name: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-6 gap-y-1.5 border-t border-line-dark py-[18px]",
        last && "border-b",
      )}
    >
      <span className="min-w-[150px] text-[13px] uppercase">{name}</span>
      <span className="flex-[1_1_260px] font-sans text-sm tracking-normal text-on-black-soft">
        {body}
      </span>
    </div>
  );
}

function NoteLink({
  meta,
  title,
  body,
  href = "/writing",
}: {
  meta: string;
  title: string;
  body: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="block border-t border-foreground py-6 pb-6 text-foreground"
    >
      <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
        {meta}
      </p>
      <h3 className="mt-2 font-serif text-[26px] leading-[1.2]">{title}</h3>
      <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">{body}</p>
    </Link>
  );
}
