import Link from "next/link";
import { C, SANS, SERIF, NAV } from "./tokens";

/**
 * Homepage — the warm redesign. Self-contained: it carries its own photo hero
 * with an overlaid nav and its own giant-name footer, so the global nav/footer
 * are suppressed on "/". Flat colour fields, restrained motion, Instrument Sans
 * headlines over a Newsreader reading voice.
 */

const PAD = "px-[clamp(20px,4.5vw,56px)]";

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
      {NAV.map((n) => (
        <Link key={n.href} href={n.href} style={{ color: C.ox }} className="transition-opacity hover:opacity-60">
          {n.label}
        </Link>
      ))}
    </div>
  );
}

export function HomeRedesign() {
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
          style={{ height: "clamp(440px,58vw,680px)", objectPosition: "center 42%" }}
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
            bottom: "clamp(-26px,-3.4vw,-52px)",
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: "min(13.2vw,169px)",
            lineHeight: 0.82,
            letterSpacing: "-.045em",
            color: C.terra,
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
          Storyteller <span style={{ color: C.cream }}>•</span> Builder <span style={{ color: C.cream }}>•</span> Founder
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
      {/*  Currently ticker                                               */}
      {/* -------------------------------------------------------------- */}
      <div
        className={`${PAD} flex flex-wrap items-center justify-center gap-x-[clamp(20px,3.4vw,34px)] gap-y-2 py-5`}
        style={{ background: C.ox, fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.peach }}
      >
        <span style={{ color: C.peri }}>Currently &mdash;</span>
        <span>Building GreenRoom <span style={{ color: C.peri }}>•</span> 2026</span>
        <span>Writing</span>
        <span>Speaking</span>
        <span>Collaborating</span>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  A little about me + portrait                                   */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto grid max-w-[1180px] items-center gap-[clamp(36px,5vw,64px)] md:grid-cols-[1fr_380px]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>
              A little about me
            </div>
            <h2
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "clamp(32px,4.6vw,46px)",
                lineHeight: 1.04,
                letterSpacing: "-.02em",
                color: C.ox,
                marginTop: 16,
              }}
            >
              The medium keeps changing. The work doesn&rsquo;t &mdash; building something people believe in.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: C.ox, marginTop: 20, maxWidth: 520 }}>
              I&rsquo;ve performed on opera stages, co-founded a company, led an institution, and now I&rsquo;m building software. Different rooms, one throughline: the story that makes people care.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/redesign/portrait-about.webp"
            alt="Katie Spencer"
            className="block w-full object-cover"
            style={{ height: "clamp(360px,44vw,440px)", objectPosition: "center 20%" }}
          />
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Chapters — periwinkle                                          */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(32px,5vw,56px)] md:grid-cols-[320px_1fr]">
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,7vw,60px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95 }}>
              Chapters.
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: C.ox, marginTop: 18 }}>
              The moments, organizations, and ideas that shaped how I think about creativity, leadership, and building things that matter.
            </p>
            <Link href="/about" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.ox, marginTop: 18, display: "inline-block" }}>
              See the full story &rarr;
            </Link>
          </div>
          <div>
            {[
              ["I", "The Stage", "Where I learned belief begins with a story well told.", "Opera"],
              ["II", "The Leap", "Co-founding a company from nothing.", "City Lyric Opera"],
              ["III", "Growing an Institution", "Strategy only works when a story carries it.", "Knoxville Opera"],
              ["IV", "Building the Future", "Belief has to scale.", "GreenRoom"],
              ["V", "What's Next", "How technology and story shape each other.", "Still being written"],
            ].map(([num, title, body, tag], i, arr) => (
              <div
                key={num}
                className="grid grid-cols-[44px_1fr] items-baseline gap-x-5 py-[22px]"
                style={{ borderTop: `1.5px solid ${C.ox}`, borderBottom: i === arr.length - 1 ? `1.5px solid ${C.ox}` : undefined }}
              >
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: C.ox }}>{num}</div>
                <div>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(22px,2.6vw,28px)", letterSpacing: "-.01em", color: C.ox }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 16, color: C.ox, marginTop: 4 }}>
                    {body}{" "}
                    <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: C.terra }}>
                      {tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  What I'm building                                              */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra, marginBottom: 28 }}>
            What I&rsquo;m building
          </div>
          <div className="grid gap-[22px] md:grid-cols-[1.3fr_1fr]">
            {/* GreenRoom — the big card */}
            <div className="flex flex-col justify-between" style={{ background: C.ox, padding: "clamp(32px,4vw,48px)", minHeight: 360 }}>
              <div className="flex items-center gap-3">
                <span style={{ width: 30, height: 30, background: C.peri }} />
                <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.peach }}>
                  Now building
                </span>
              </div>
              <div className="mt-10">
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,6vw,60px)", letterSpacing: "-.03em", color: C.cream, lineHeight: 0.95 }}>
                  GreenRoom<span style={{ color: C.terra }}>.</span>
                </div>
                <p style={{ fontSize: 18, lineHeight: 1.55, color: C.peachSoft, maxWidth: 420, marginTop: 16 }}>
                  Bringing fundraising, marketing, ticketing, and operations into one platform for arts organizations.{" "}
                  <span style={{ fontStyle: "italic", color: C.peri }}>Launching 2026.</span>
                </p>
              </div>
            </div>
            {/* the three smaller cards */}
            <div className="flex flex-col gap-[22px]">
              {[
                [C.terra, "Consulting", "Helping founders and organizations turn strategy into a story people believe in.", false],
                [C.peri, "Speaking", "Keynotes and conversations. Open to stages in 2026.", false],
                [C.cream, "Stories in Development", "Podcasting, books, production, and live experiences.", true],
              ].map(([bg, title, body, bordered]) => (
                <div
                  key={title as string}
                  className="flex-1"
                  style={{ background: bg as string, padding: 30, border: bordered ? `1.5px solid ${C.ox}` : undefined }}
                >
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.ox }}>{title}</div>
                  <div style={{ fontSize: 16, lineHeight: 1.5, color: C.ox, marginTop: 6 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  Quote — terracotta                                             */}
      {/* -------------------------------------------------------------- */}
      <div className={`${PAD} text-center`} style={{ background: C.terra, padding: "clamp(72px,11vw,100px) clamp(20px,4.5vw,56px)" }}>
        <div
          className="mx-auto"
          style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(36px,7vw,64px)", lineHeight: 1.02, letterSpacing: "-.03em", color: C.ox, maxWidth: 860 }}
        >
          The medium changes. <span style={{ color: C.cream }}>The mission doesn&rsquo;t.</span>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/*  CTA                                                            */}
      {/* -------------------------------------------------------------- */}
      <div
        className={`${PAD} grid items-center gap-[30px] py-[clamp(56px,8vw,80px)] md:grid-cols-[1fr_auto]`}
        style={{ background: C.cream }}
      >
        <div className="mx-auto w-full max-w-[1180px] md:mx-0">
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.025em", color: C.ox, lineHeight: 1 }}>
            Let&rsquo;s build something people believe in.
          </div>
          <div style={{ fontSize: 18, fontStyle: "italic", color: C.ox, marginTop: 14 }}>
            If you&rsquo;re building something people need to believe in, I&rsquo;d love to hear about it.
          </div>
        </div>
        <a
          href="mailto:hello@bykatiespencer.com"
          style={{ fontFamily: SANS, fontSize: 15, color: C.cream, background: C.ox, padding: "16px 32px", borderRadius: 40, whiteSpace: "nowrap" }}
          className="justify-self-start transition-opacity hover:opacity-90 md:justify-self-end"
        >
          hello@bykatiespencer.com
        </a>
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
