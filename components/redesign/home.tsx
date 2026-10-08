import Link from "next/link";
import { C, SANS, SERIF, NAV } from "./tokens";
import { BOOK_URL } from "./chrome";
import { MailLink } from "./mail-link";
import { InstagramFeed } from "./instagram";
import { GreenRoomFrame } from "./greenroom-frame";
import { notes } from "@/content/writing";

/**
 * Homepage — the warm redesign. Self-contained: it carries its own photo hero
 * with an overlaid nav and its own giant-name footer, so the global nav/footer
 * are suppressed on "/". Flat colour fields, restrained motion, Instrument Sans
 * headlines over a Newsreader reading voice.
 *
 * Shape: hero → statement → Selected Work → Currently → Notes → Collaborate
 * invitation → proof → CTA. Discovery before biography; the fuller story lives
 * on /about.
 */

const PAD = "px-[clamp(20px,4.5vw,56px)]";

/** Selected work — editorial feature rows, not a card grid: a large image
 *  and the real outcome, alternating down the page. Images are atmosphere and
 *  the person-in-the-work, not design samples.
 *  [image, kicker, title, outcome, link label, href, external]. */
const WORK: [string, string, string, string, string, string, boolean][] = [
  ["/work/build-knoxville-carmen.jpg", "Brand & audience strategy", "Knoxville Opera", "Four years leading brand, marketing, and audience strategy. First-time attendance doubled across four seasons, and revenue per show grew.", "The case study", "/knoxville-opera", false],
  ["/work/greenroom-product.webp", "Founder · Software", "GreenRoom", "The CRM I wish I'd had, built for how arts organizations actually work.", "Visit the site", "https://greenroomcrm.com", true],
  ["/work/build-citylyric-poster.jpg", "Co-founder · New York", "City Lyric Opera", "Built a company from nothing, before I ever joined a board, and a model other companies now study.", "Inside the work", "/portfolio", false],
  ["/work/schicchi-film-cover.webp", "Director & producer", "Films & campaigns", "Opera reimagined as a night people actually want to show up for.", "Watch & read", "/portfolio", false],
  ["/work/katie-team.jpg", "The practice", "Narratives", "Story strategy for the performing arts, turning a season into something audiences want to step inside.", "How it works", "/collaborate", false],
];

function DotRule({ dot = C.cream, rule = C.ox }: { dot?: string; rule?: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span style={{ width: 64, height: 1.5, background: rule }} />
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: dot }} />
      <span style={{ width: 64, height: 1.5, background: rule }} />
    </div>
  );
}

function Wordmark({ color = C.terra }: { color?: string }) {
  return (
    <Link
      href="/"
      style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", color }}
    >
      Katie Spencer<span style={{ color: C.ox }}>.</span>
    </Link>
  );
}

function NavLinks() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-[clamp(14px,2.4vw,28px)] gap-y-1"
      style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".06em" }}
    >
      {NAV.map((n) =>
        n.external ? (
          <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" style={{ color: C.ox }} className="transition-opacity hover:opacity-60">
            {n.label}
          </a>
        ) : (
          <Link key={n.href} href={n.href} style={{ color: C.ox }} className="transition-opacity hover:opacity-60">
            {n.label}
          </Link>
        ),
      )}
    </div>
  );
}

export function HomeRedesign() {
  const latest = notes.slice(0, 2);

  return (
    <div style={{ background: C.cream, color: C.ox, fontFamily: SERIF, overflow: "hidden" }}>
      {/* -------------------------------------------------------------- */}
      {/*  Hero — portrait, overlaid nav, giant name straddling the edge  */}
      {/* -------------------------------------------------------------- */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/redesign/portrait-hero.webp"
          alt="Katie Spencer"
          className="block w-full object-cover"
          style={{ height: "clamp(440px,58vw,680px)", objectPosition: "center 44%" }}
        />
        <div
          className={`absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-y-3 py-[clamp(18px,2.6vw,28px)] ${PAD}`}
        >
          <Wordmark />
          <NavLinks />
        </div>
        {/* giant name straddling the photo's lower edge */}
        <div
          className="pointer-events-none absolute inset-x-0 text-center"
          style={{
            // offset scales with the name so the straddle ratio holds on mobile
            bottom: "clamp(-32px,-2.5vw,-8px)",
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: "min(13.2vw,169px)",
            lineHeight: 0.82,
            letterSpacing: "-.045em",
            color: C.terra,
            WebkitTextStrokeWidth: "clamp(2px,0.4vw,5px)",
            WebkitTextStrokeColor: C.terra,
            whiteSpace: "nowrap",
          }}
        >
          Katie Spencer
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Terracotta statement block                                     */}
      {/* -------------------------------------------------------------- */}
      <div
        className={`${PAD} text-center`}
        style={{ background: C.terra, padding: "clamp(96px,13vw,150px) clamp(20px,4.5vw,56px) clamp(76px,10vw,110px)" }}
      >
        <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: C.ox }}>
          Artist <span style={{ color: C.cream }}>•</span> Storyteller <span style={{ color: C.cream }}>•</span> Founder
        </div>
        <h1
          className="mx-auto"
          style={{
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: "clamp(40px,7vw,76px)",
            lineHeight: 1,
            letterSpacing: "-.03em",
            color: C.ox,
            maxWidth: 900,
            margin: "30px auto 0",
          }}
        >
          Stories build what strategy alone can&rsquo;t.
        </h1>
        <div style={{ margin: "36px 0" }}>
          <DotRule />
        </div>
        <p style={{ fontSize: "clamp(18px,2.2vw,20px)", lineHeight: 1.6, color: C.ox, maxWidth: 540, margin: "0 auto" }}>
          Whether through companies, conversations, stages, or words, I&rsquo;m drawn to the moment an idea becomes something people can see, feel, and join.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-[18px] gap-y-3">
          <Link
            href="/contact"
            style={{ fontFamily: SANS, fontSize: 15, color: C.ox, background: C.peri, padding: "14px 30px", borderRadius: 40 }}
            className="transition-opacity hover:opacity-90"
          >
            Start a conversation
          </Link>
          <Link href="/portfolio" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.cream }}>
            explore the work &rarr;
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Selected Work — curated, image-led, visually varied            */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(56px,8vw,96px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,60px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95 }}>
              Selected work.
            </div>
            <Link href="/portfolio" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.terra }} className="transition-opacity hover:opacity-70">
              See all work &rarr;
            </Link>
          </div>
          <div className="mt-[clamp(32px,5vw,60px)] flex flex-col gap-[clamp(48px,7vw,96px)]">
            {WORK.map(([img, kicker, title, outcome, label, href, ext], i) => {
              const flip = i % 2 === 1;
              const textCol = (
                <>
                  <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.terra }}>{kicker}</div>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.4vw,56px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.98, marginTop: 12 }}>{title}</div>
                  <p style={{ fontFamily: SERIF, fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.55, color: C.ox, margin: "18px 0 0", maxWidth: 460 }}>{outcome}</p>
                  <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 15, letterSpacing: ".02em", color: C.terra, display: "inline-block", marginTop: 20, borderBottom: `2px solid ${C.terra}`, paddingBottom: 2 }}>{label} &rarr;</span>
                </>
              );

              // GreenRoom: the frame opens a lightbox (not the site); the text links out.
              if (title === "GreenRoom") {
                return (
                  <div key={title} className="grid items-center gap-[clamp(24px,4vw,64px)] md:grid-cols-2">
                    <GreenRoomFrame src={img} className={flip ? "md:order-2" : ""} />
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`block transition-opacity hover:opacity-70 ${flip ? "md:order-1" : ""}`}>
                      {textCol}
                    </a>
                  </div>
                );
              }

              const inner = (
                <div className="group grid items-center gap-[clamp(24px,4vw,64px)] md:grid-cols-2">
                  <div className={flip ? "md:order-2" : ""} style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden", background: C.peri }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={title} className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className={flip ? "md:order-1" : ""}>{textCol}</div>
                </div>
              );
              return ext ? (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-95">{inner}</a>
              ) : (
                <Link key={title} href={href} className="block transition-opacity hover:opacity-95">{inner}</Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Currently — the small in-progress module                       */}
      {/* -------------------------------------------------------------- */}
      <div
        className={`${PAD} flex flex-wrap items-center justify-center gap-x-[clamp(20px,3.4vw,34px)] gap-y-2 py-5`}
        style={{ background: C.ox, fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.peach }}
      >
        <span style={{ color: C.peri }}>Currently &mdash;</span>
        <span>Running GreenRoom</span>
        <span>Writing</span>
        <span>Speaking</span>
        <span>Collaborating</span>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  From the Notes — the editorial preview                         */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(56px,8vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>Notes from the house</div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,52px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95, marginTop: 10 }}>
                From the Notes.
              </div>
            </div>
            <Link href="/writing" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.terra }} className="transition-opacity hover:opacity-70">
              All notes &rarr;
            </Link>
          </div>
          <div className="mt-[clamp(28px,4vw,44px)] grid gap-[clamp(24px,4vw,56px)] md:grid-cols-2">
            {latest.map((note) => (
              <Link key={note.slug} href={`/writing/${note.slug}`} className="block transition-opacity hover:opacity-70" style={{ borderTop: `1.5px solid ${C.ox}`, paddingTop: 20 }}>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }}>{note.category} &middot; {note.date}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,2.8vw,32px)", lineHeight: 1.05, letterSpacing: "-.02em", color: C.ox, marginTop: 14 }}>{note.title}</div>
                <p style={{ fontSize: 17, lineHeight: 1.6, color: C.ox, marginTop: 12, maxWidth: 480 }}>{note.lead}</p>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 15, color: C.terra, marginTop: 16 }}>Read the note &rarr;</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Collaborate — the consulting invitation (one clear path)       */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(64px,9vw,100px)]`} style={{ background: C.terra }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.ox }}>Work together</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(36px,6vw,68px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, marginTop: 16, maxWidth: 820 }}>
            Good stories need good strategy.
          </h2>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(18px,2.2vw,22px)", lineHeight: 1.6, color: C.cream, marginTop: 20, maxWidth: 600 }}>
            Story strategy built with your team, or the systems to run it yourself. Two ways in, for performing arts and creative organizations.
          </p>
          <Link href="/collaborate" style={{ display: "inline-block", background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 16, lineHeight: 1, padding: "17px 38px", borderRadius: 40, marginTop: 30 }} className="transition-opacity hover:opacity-90">
            Explore how we can work together &rarr;
          </Link>
          <div className="mt-[clamp(28px,4vw,40px)] flex flex-wrap items-center gap-x-4 gap-y-2">
            <span style={{ flex: 1, minWidth: 40, height: 1.5, background: C.ox, opacity: 0.4 }} />
            <span style={{ fontFamily: SERIF, fontSize: "clamp(16px,2vw,19px)", color: C.ox }}>
              Also keynotes and conversations.{" "}
              <Link href="/contact" style={{ color: C.cream, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-80">Speaking &rarr;</Link>
            </span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Proof — the numbers, each linked to the case study             */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(56px,8vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }}>
            The proof · Knoxville Opera, four seasons (FY23&ndash;FY26)
          </div>
          <div className="mt-6 grid gap-x-9 gap-y-8 sm:grid-cols-3">
            {([
              ["+101%", "First-time paid attendance, per show"],
              ["+27%", "Revenue per show"],
              ["#1", "La Bohème, the best-selling production in company history"],
            ] as [string, string][]).map(([n, l]) => (
              <Link key={n} href="/knoxville-opera" className="block transition-opacity hover:opacity-70" style={{ borderTop: `2px solid ${C.ox}`, paddingTop: 16 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,5vw,60px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 15, lineHeight: 1.4, color: C.ox, marginTop: 10, maxWidth: 240 }}>{l}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Life outside the build — integrated Instagram feed             */}
      {/* -------------------------------------------------------------- */}
      <InstagramFeed />

      {/* -------------------------------------------------------------- */}
      {/*  CTA                                                            */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(56px,8vw,80px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.025em", color: C.ox, lineHeight: 1 }}>
            Let&rsquo;s build something people believe in.
          </div>
          <div style={{ fontSize: 18, fontStyle: "italic", color: C.ox, marginTop: 14, maxWidth: 660 }}>
            If you&rsquo;re building something people need to believe in, I&rsquo;d love to hear about it.
          </div>
          <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: C.ox, marginTop: 12, maxWidth: 620 }}>
            Twenty minutes, on a call: a season, a story, or whatever you&rsquo;re making. Not a sales pitch, and not for everyone, but if that sounds like you, let&rsquo;s talk.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SANS, fontSize: 16, color: C.cream, background: C.ox, padding: "16px 34px", borderRadius: 40, whiteSpace: "nowrap" }} className="transition-opacity hover:opacity-90">
              Book 20 minutes &rarr;
            </a>
            <span style={{ fontSize: 15, color: C.ox }}>or write first, <MailLink style={{ color: C.ox, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-70" /></span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Footer — compact closing credits                               */}
      {/* -------------------------------------------------------------- */}
      <div
        className={`grid items-center gap-y-3 py-8 ${PAD} md:grid-cols-[1fr_auto_1fr]`}
        style={{ background: C.cream, borderTop: `1.5px solid ${C.ox}`, fontFamily: SANS, fontSize: 12, letterSpacing: ".06em", color: C.ox }}
      >
        <div className="text-center md:text-left">© 2026 Katie Spencer</div>
        <div className="text-center" style={{ fontWeight: 700, fontSize: 16 }}>
          Katie Spencer<span style={{ color: C.terra }}>.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-1 md:justify-end">
          <span>
            Founder,{" "}
            <a href="https://greenroomcrm.com" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">GreenRoom</a>
          </span>
          <a href="https://www.instagram.com/bykatiespencer" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">Instagram</a>
          <a href="https://www.linkedin.com/in/katie-spencer-83565066/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
