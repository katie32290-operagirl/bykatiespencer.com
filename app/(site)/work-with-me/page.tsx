import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Collaborate",
  description:
    "Whether you need a partner for a single project or ongoing strategic support, I'll meet you where you are and help you move your mission forward.",
  path: "/work-with-me",
});

const process = [
  {
    n: "Act I",
    title: "Listen",
    body: "We start by getting to know your mission, goals, audience, and what success looks like.",
  },
  {
    n: "Act II",
    title: "Uncover",
    body: "We identify the story at the core and the opportunities that will make the biggest impact.",
  },
  {
    n: "Act III",
    title: "Shape",
    body: "We create the strategy, messaging, and creative direction, then build the right assets to bring it to life.",
  },
  {
    n: "Act IV",
    title: "Bring it forward",
    body: "We launch with intention, refine based on what we learn, and build momentum that lasts.",
  },
];

const ways = [
  {
    ticket: "No. 01",
    title: "Projects",
    body: "For launches, campaigns, fundraising experiences, and creative direction.",
    when: "You know what needs to be built.",
    tilt: "-1.6deg",
  },
  {
    ticket: "No. 02",
    title: "Advising",
    body: "A strategic thought partner for leadership conversations, positioning, messaging, and big decisions.",
    when: "You need clarity before execution.",
    tilt: "1.1deg",
  },
  {
    ticket: "No. 03",
    title: "Conversations",
    body: "For organizations, teams, and communities who want to think differently about storytelling, creativity, leadership, and the work that matters.",
    when: "You're looking for ideas worth carrying forward.",
    tilt: "-0.7deg",
  },
];

const PAD = "px-[clamp(20px,4.5vw,56px)]";
const PROCESS_TILTS = ["-1.6deg", "1.1deg", "-0.7deg", "2.2deg"];

export default function CollaboratePage() {
  return (
    <>
      {/* ───────────── Hero — warm paper playbill ───────────── */}
      <section
        className={`relative overflow-hidden bg-paper-bright ${PAD} py-[clamp(56px,8vw,110px)]`}
        style={{ backgroundImage: "var(--paper-grain)" }}
      >
        {/* gold star, twinkle — once on the page */}
        <span
          data-anim="true"
          aria-hidden
          className="absolute left-[1.5%] top-[34%] z-[1] text-[clamp(26px,3.4vw,42px)] leading-none text-gold [animation:ks-star-twinkle_2.4s_ease_1s_1] [transform:rotate(-8deg)]"
        >
          &#10022;
        </span>
        {/* torn rose scrap, top-right */}
        <span
          aria-hidden
          className="absolute right-[8%] top-[6%] z-0 hidden sm:block"
          style={{
            width: "clamp(120px,15vw,220px)",
            height: "clamp(44px,6vw,82px)",
            background: "var(--rose)",
            backgroundImage: "var(--paper-grain)",
            clipPath:
              "polygon(2% 22%, 18% 4%, 42% 12%, 66% 0%, 88% 10%, 100% 30%, 94% 62%, 98% 88%, 74% 100%, 48% 88%, 22% 98%, 0% 78%, 6% 48%)",
            opacity: 0.85,
            transform: "rotate(-3deg)",
          }}
        />

        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end gap-[clamp(36px,5vw,72px)]">
            <Reveal className="relative z-[2] min-w-[320px] flex-[1.15]">
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-red">
                Collaborate
              </p>
              <h1 className="mt-5 max-w-[720px] font-serif text-[clamp(48px,6.5vw,84px)] font-medium leading-[1] tracking-tight">
                Great work happens together
                <span className="text-red">.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.7] text-muted-foreground">
                Whether you need a partner for a single project or ongoing
                strategic support, I&rsquo;ll meet you where you are and help you
                move your mission forward.
              </p>
              <p className="mt-7 max-w-[560px] font-serif text-[clamp(22px,2.4vw,30px)] italic leading-[1.25] text-foreground">
                Thoughtful process. Trusted partners. Meaningful results.
              </p>
            </Reveal>

            {/* opera glasses, taped scrap */}
            <Reveal
              className="relative z-[2] hidden w-[clamp(120px,14vw,190px)] shrink-0 self-start pt-[clamp(8px,2vw,28px)] md:block"
              delay={0.1}
            >
              <div
                className="relative bg-[#F8F1E2] p-2.5"
                style={{
                  boxShadow: "var(--shadow-paper)",
                  transform: "rotate(2.2deg)",
                }}
              >
                <span className="ks-tape absolute -top-3 left-[24%] z-[2]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/on/opera-glasses.webp"
                  alt="Opera glasses"
                  className="block w-full"
                  style={{ aspectRatio: "1 / 1", objectFit: "contain" }}
                />
              </div>
              <p className="pt-2.5 text-center font-accent text-[10px] uppercase tracking-[0.1em] text-ink-faint [transform:rotate(-1.4deg)]">
                a closer look
              </p>
            </Reveal>
          </div>

          {/* the feature photo, in a tilted paper frame */}
          <Reveal className="mt-[clamp(40px,6vw,72px)]" delay={0.05}>
            <figure
              className="relative mx-auto max-w-[1000px] bg-[#F8F1E2] p-2.5 transition-transform duration-300 hover:-translate-y-1"
              style={{
                boxShadow: "var(--shadow-paper)",
                transform: "rotate(-1.1deg)",
              }}
            >
              <span className="ks-tape absolute -top-3 left-[8%] z-[2]" />
              <span className="ks-tape absolute -top-3 right-[10%] z-[2] [transform:rotate(2deg)]" />
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px] md:aspect-[2/1]">
                <Image
                  src="/collaborate-hero.jpg"
                  alt="Katie Spencer directing a film shoot with her team on location"
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover object-[center_45%]"
                />
              </div>
              <figcaption className="mt-3 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                Carmen Media Day &middot; Photo by Eli Johnson
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ───────────── The program — deep theatre green ───────────── */}
      <section
        className={`relative overflow-hidden border-t-2 border-ink bg-green text-on-black ${PAD} py-[clamp(64px,9vw,120px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        {/* torn sheet-music scrap, corner artifact */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/sheet-music-intermezzo.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-2%] top-[6%] z-0 hidden opacity-[0.16] lg:block"
          style={{
            width: "clamp(160px,18vw,280px)",
            height: "clamp(240px,28vw,400px)",
            objectFit: "cover",
            clipPath:
              "polygon(14% 0%, 100% 0%, 100% 100%, 10% 98%, 2% 84%, 10% 66%, 0% 48%, 8% 30%, 2% 14%)",
            transform: "rotate(4deg)",
          }}
        />

        <div className="relative z-[2] mx-auto max-w-[1180px]">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-line-dark pb-4">
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-gold-bright">
                How we work together
              </p>
              <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
                Strategic at the core. Creative in execution.
              </p>
            </div>
          </Reveal>

          <div className="mt-[clamp(36px,5vw,56px)] grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <div
                  className="group relative h-full border border-ink bg-paper-bright p-7 pt-8 text-ink transition-transform duration-300 hover:-translate-y-1 hover:[transform:rotate(0deg)]"
                  style={{
                    boxShadow: "var(--shadow-paper)",
                    transform: `rotate(${PROCESS_TILTS[i % PROCESS_TILTS.length]})`,
                  }}
                >
                  <span className="ks-tape absolute -top-3 left-[9%]" />
                  <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-red">
                    {step.n}
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(28px,3vw,38px)] font-medium leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[440px] leading-[1.6] text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Ways to collaborate — velvet burgundy ───────────── */}
      <section
        className={`relative overflow-hidden border-t-4 border-gold bg-burgundy text-on-black ${PAD} py-[clamp(64px,9vw,120px)]`}
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        {/* bouquet scrap, single artifact */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/bouquet.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-4%] left-[-2%] z-0 hidden opacity-[0.22] lg:block"
          style={{
            width: "clamp(160px,18vw,260px)",
            transform: "rotate(-6deg)",
            filter: "drop-shadow(2px 5px 8px rgba(13,10,10,.4))",
          }}
        />

        <div className="relative z-[2] mx-auto max-w-[1180px]">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-line-dark pb-4">
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-gold-bright">
                Ways to collaborate
              </p>
              <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
                Different needs. Different formats.
              </p>
            </div>
          </Reveal>

          <div className="mt-[clamp(40px,6vw,64px)] grid items-start gap-x-8 gap-y-12 md:grid-cols-3">
            {ways.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div
                  className="group relative flex h-full flex-col border border-ink bg-paper-bright p-7 pt-8 text-ink transition-transform duration-300 hover:-translate-y-1 hover:[transform:rotate(0deg)]"
                  style={{
                    boxShadow: "var(--shadow-paper)",
                    transform: `rotate(${w.tilt})`,
                  }}
                >
                  {/* ticket perforation stub number */}
                  <div className="mb-4 flex items-center justify-between border-b border-dashed border-ink-faint pb-3">
                    <span className="font-accent text-[11px] uppercase tracking-[0.14em] text-red">
                      Admit one
                    </span>
                    <span className="font-accent text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                      {w.ticket}
                    </span>
                  </div>
                  <h3 className="font-serif text-[clamp(26px,2.6vw,32px)] font-medium leading-tight">
                    {w.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-[1.6] text-muted-foreground">
                    {w.body}
                  </p>
                  <div className="mt-6 flex items-baseline gap-2.5 font-accent text-[11px] uppercase tracking-[0.12em]">
                    <span className="text-red">Best when</span>
                    <span
                      aria-hidden
                      className="flex-1 self-center overflow-hidden whitespace-nowrap tracking-[3px] text-ink-faint"
                    >
                      ....................
                    </span>
                  </div>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-foreground">
                    {w.when}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Closing — near-black, scrim'd proscenium ───────────── */}
      <section
        className={`relative overflow-hidden border-t-2 border-gold bg-ink text-on-black ${PAD} py-[clamp(72px,10vw,130px)]`}
      >
        {/* illustrated proscenium, dark-scrimmed backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/stage-proscenium.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.14]"
          style={{ objectPosition: "50% 20%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(22,17,13,.55) 0%, rgba(22,17,13,.82) 100%)",
          }}
        />

        <Reveal className="relative z-[2] mx-auto max-w-[1180px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-gold-bright">
            At the heart of every collaboration
          </p>
          <p className="mt-6 max-w-[900px] font-serif text-[clamp(2rem,5vw,3.5rem)] font-medium italic leading-[1.14]">
            I believe partnership is a{" "}
            <em className="not-italic text-gold-pale">creative act.</em>
          </p>
          <p className="mt-8 max-w-[560px] text-[17px] leading-[1.7] text-on-black-soft">
            I bring the strategy, creative leadership, and experience. You bring
            the mission, the knowledge, and the heart. Together we build
            something that lasts.
          </p>

          {/* ticket-stub CTA */}
          <Link
            href="/contact"
            className="mt-11 inline-flex items-stretch [transform:rotate(-1.5deg)] transition-transform duration-300 hover:translate-y-[-4px] hover:[transform:rotate(0deg)]"
            style={{ boxShadow: "0 10px 26px rgba(0,0,0,.4)" }}
          >
            <span className="flex items-center border border-r-0 border-ink bg-paper-deep px-3 py-3.5 font-accent text-[11px] uppercase tracking-[0.13em] text-ink [border-right:1px_dashed_var(--ink)]">
              Admit one
            </span>
            <span className="flex flex-col justify-center gap-[3px] border border-l-0 border-ink bg-paper-bright px-6 py-3 text-ink">
              <span className="font-accent text-[10px] uppercase tracking-[0.13em] text-red">
                The next step
              </span>
              <span className="font-accent text-sm uppercase tracking-[0.1em]">
                Start a conversation &rarr;
              </span>
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
