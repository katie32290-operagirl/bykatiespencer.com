import Link from "next/link";
import { Nav, Footer, Shell, PAD, C, SANS, SERIF, BOOK_URL } from "./chrome";
import { MailLink } from "./mail-link";

/** A deeper oxblood for the image gradient; slate + stone for quiet labels. */
const OXDEEP = "#6E140D";
const SLATE = "#A4574a";
const STONE = "#b98a7c";

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const FILM: [string, string, string][] = [
  ["Carmen, explained in 60 seconds", "film", yt("LW18K-g2zmo")],
  ["Season year in review", "film", yt("VZYnfdr1uJA")],
  ["Meeting the Moment", "film", yt("sFTJvKsy97I")],
  ["Behind the Music", "film", yt("ZqJPkheBt-4")],
  ["Confessions: Simone", "reel", "https://www.youtube.com/shorts/Y4kyen1P47k"],
  ["Pirates: opening night", "reel", "https://www.youtube.com/shorts/D5f847ntDYw"],
];
const STAGE: [string, string, string][] = [
  ["Opera Ball, the signature gala", "event", yt("kHryFCWRDAY")],
  ["Couture for a Cause", "event", yt("xsYWaTxkcW4")],
  ["Season program book", "print", "/work/ko-program-book.pdf"],
  ["Annual fund appeal", "print", "/work/ko-annual-fund-appeal.pdf"],
  ["Honoring George Bitzas", "tribute", yt("yHaSkgQCKOw")],
];

const REP: [string, string, string, string, string, string][] = [
  ["01 · Founder · Software", "GreenRoom", "Software for performing arts organizations.", "Fundraising, marketing, ticketing and operations in one platform, built by people who have actually run the box office. Proof that the point of view scales past a single company.", "Visit GreenRoom →", "https://greenroomcrm.com"],
  ["02 · Founder · Story strategy", "Narratives", "Turning a season into something audiences want to step inside.", "The practice that grew out of the Knoxville work. Narratives finds the story underneath a season and shapes it into something an audience can understand, feel, and join.", "Explore Narratives →", "/narratives"],
  ["03 · Co-founder · New York", "City Lyric Opera", "Building an organization from nothing.", "Built from the ground up, before I ever joined the board. The company earned a real public standing in New York as a place that gives young and up-and-coming artists the opportunity to try new roles and create in a safe space, and a model other companies now study.", "Watch the trailer →", yt("J9rGZCJzTtY")],
  ["04 · Brand & systems", "MyNanny", "The same instinct, outside the arts.", "An entire brand system for a childcare company: visual identity, the client-relations scripts and onboarding, and nanny interview training. The point was a pleasant, quality experience for families and nannies through the whole hiring process, with communication that stayed clear, respectful, friendly, and positive.", "View the guides →", "/work/mynanny-interview.pdf"],
];

const TRUSTED = ["Knoxville Opera", "City Lyric Opera", "Savannah VOICE Festival", "New York Opera Alliance", "Nonprofit New York", "MyNanny"];

/** A stacked list of linked pieces under a quiet section label. */
function Rows({ title, rows }: { title: string; rows: [string, string, string][] }) {
  return (
    <div>
      <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: SLATE, paddingBottom: 14 }}>{title}</div>
      {rows.map(([label, kind, href], i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-[18px] transition-opacity hover:opacity-70"
          style={{ borderTop: `1.5px solid ${C.ox}`, borderBottom: i === rows.length - 1 ? `1.5px solid ${C.ox}` : undefined }}
        >
          <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(19px,2.2vw,28px)", letterSpacing: "-.02em", color: C.ox }}>{label}</span>
          <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra, whiteSpace: "nowrap" }}>{kind} →</span>
        </a>
      ))}
    </div>
  );
}

export function WorkRedesign() {
  return (
    <Shell ground="cream">
      <Nav ground="oxblood" active="Work" />

      {/* header — oxblood */}
      <header className={`${PAD} pb-[clamp(44px,6vw,76px)] pt-[clamp(40px,6vw,80px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", color: C.peach, marginBottom: 20 }}>The Program</div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(52px,10.5vw,142px)", lineHeight: 0.86, letterSpacing: "-.045em", margin: 0, color: C.cream, maxWidth: "20ch" }}>
            Work is where ideas become real<span style={{ color: C.terra }}>.</span>
          </h1>
          <div className="mt-[clamp(34px,5vw,58px)] grid items-start gap-[clamp(28px,5vw,72px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(22px,2.6vw,34px)", lineHeight: 1.24, margin: 0, color: C.cream, maxWidth: 460 }}>Every project begins with the same question: &ldquo;Why should anyone care?&rdquo;</p>
            <p style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.6, margin: 0, color: C.peachSoft, maxWidth: 600 }}>From strategy to story to production, I help organizations make work that gets people to care, show up, and come back.</p>
          </div>
        </div>
      </header>

      {/* full-bleed — on set */}
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/onset-knoxville.webp" alt="Katie Spencer on set, Knoxville" style={{ width: "100%", height: "clamp(300px,48vw,660px)", objectFit: "cover", objectPosition: "center 42%", display: "block" }} />
        <div className={`absolute bottom-5 left-[clamp(20px,4vw,56px)]`} style={{ background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", padding: "9px 16px" }}>On set, Knoxville</div>
      </div>

      {/* headliner — cream */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra, marginBottom: 20 }}>The headliner · Brand &amp; audience strategy</div>
          <div className="grid items-start gap-[clamp(28px,4vw,64px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
            <div>
              <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,5.6vw,76px)", lineHeight: 0.96, letterSpacing: "-.03em", margin: "0 0 16px", color: C.ox }}>Knoxville Opera</h2>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.2vw,28px)", lineHeight: 1.3, margin: 0, color: C.ox, maxWidth: 460 }}>Reimagining a 47-year-old opera company for a new generation.</p>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.62, margin: "0 0 26px", color: C.ox, maxWidth: 620 }}>
                Four years leading brand, marketing and audience strategy for a beloved institution. Together with the KO team, a confident rebrand and sharper storytelling doubled first-time attendance and grew revenue per show 27%, and <em>La Bohème</em> became the best-selling production in company history.
              </p>
              <Link href="/knoxville-opera" style={{ display: "inline-block", background: C.peri, color: C.ox, fontFamily: SANS, fontSize: 17, lineHeight: 1, padding: "18px 40px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
                See the case study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* full-bleed — what it moved, stats over the media-day image */}
      <div className="flex flex-col justify-end" style={{ position: "relative", minHeight: "clamp(420px,56vw,720px)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/stuck-elevator-mediaday.webp" alt="A media day gathering outside the Old City Performing Arts Center" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${OXDEEP} 0%, rgba(110,20,13,.88) 34%, rgba(110,20,13,.34) 62%, rgba(110,20,13,0) 88%)`, pointerEvents: "none" }} />
        <div className={`${PAD} py-[clamp(36px,5vw,72px)]`} style={{ position: "relative" }}>
          <div className="mx-auto max-w-[1240px]">
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.peach }}>Admit one · What it moved</div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.cream, opacity: 0.85, marginTop: 8, marginBottom: "clamp(24px,3.5vw,42px)" }}>Knoxville Opera · four seasons, FY23–FY26</div>
            <div className="grid gap-[clamp(24px,4vw,48px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
              {([
                ["+101%", C.cream, "First-time paid attendees per show.", null],
                ["+27%", C.cream, "Revenue per show.", null],
                ["#1", C.terra, "the best-selling production in company history.", "La Bohème, "],
              ] as [string, string, string, string | null][]).map(([n, color, label, lead]) => (
                <div key={n}>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(56px,8.5vw,124px)", lineHeight: 0.8, letterSpacing: "-.045em", color }}>{n}</div>
                  <div style={{ marginTop: 14, fontFamily: SERIF, fontSize: 17, lineHeight: 1.5, color: C.cream, maxWidth: 260 }}>
                    {lead && <em>{lead}</em>}{label}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "clamp(28px,4vw,40px)", fontFamily: SERIF, fontSize: 16, lineHeight: 1.5, color: C.cream, opacity: 0.9, maxWidth: 620 }}>
              Achieved with the Knoxville Opera team, across four seasons. Not the work of any single production.
            </p>
          </div>
        </div>
      </div>

      {/* inside the work — cream */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[clamp(34px,4vw,52px)] grid items-baseline gap-[clamp(24px,4vw,60px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,4.6vw,60px)", lineHeight: 1, letterSpacing: "-.03em", margin: 0, color: C.ox }}>Inside the work.</h2>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }}>Knoxville Opera · Selected pieces</div>
          </div>
          {/* two embedded pieces, in place */}
          <div className="mb-[clamp(44px,6vw,72px)] grid items-start gap-[clamp(28px,4vw,52px)] md:grid-cols-2">
            <div>
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: C.ox }}>
                <iframe
                  src="https://www.youtube.com/embed/xsYWaTxkcW4"
                  title="Couture for a Cause"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                />
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 14 }}>Couture for a Cause · Event film</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: C.ox, marginTop: 8, maxWidth: 520 }}>
                The brief: make a fundraising gala feel like a night worth showing up for. Opera meets the runway, cut to carry the energy of the room to everyone who wasn&rsquo;t in it.
              </p>
            </div>
            <div className="md:justify-self-start">
              <div style={{ position: "relative", width: "100%", maxWidth: 300, aspectRatio: "9 / 16", background: C.ox }}>
                <iframe
                  src="https://www.youtube.com/embed/0Ap9-34BuAI"
                  title="Gianni Schicchi: the synopsis, reimagined"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                />
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 14 }}>Gianni Schicchi · The synopsis, reimagined</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: C.ox, marginTop: 8, maxWidth: 420 }}>
                The brief: sell a one-act comedy about a family scheming over a will to people who have never bought an opera ticket. So the synopsis became a lunch between friends, not a plot summary.
              </p>
            </div>
          </div>

          <Rows title="Film & story" rows={FILM} />
          <div className="pt-[38px]">
            <Rows title="On stage & in print" rows={STAGE} />
          </div>
          <div style={{ marginTop: 22, fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: STONE }}>
            Films with{" "}
            <a href="https://www.vessul.co/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-70">Vessul Creative</a>
            {" · "}Program design with{" "}
            <a href="https://www.robineaster.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-70">Robin Easter Design</a>
          </div>
        </div>
      </section>

      {/* rest of the repertoire — periwinkle */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.peri, color: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", marginBottom: 18 }}>The rest of the repertoire</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.02, letterSpacing: "-.03em", margin: "0 0 clamp(34px,4vw,54px)", maxWidth: 780 }}>
            Organizations built, brands shaped, and products made for the field.
          </h2>
          <div className="grid gap-[clamp(22px,3vw,32px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
            {REP.map(([label, title, italic, body, cta, href]) => (
              <div key={title} className="flex flex-col" style={{ background: C.cream, border: `1.5px solid ${C.ox}`, padding: 24, gap: 10 }}>
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }}>{label}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, letterSpacing: "-.02em", color: C.ox }}>{title}</div>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, lineHeight: 1.3, color: C.ox }}>{italic}</div>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: C.ox }}>{body}</p>
                {href.startsWith("/") && !href.endsWith(".pdf") ? (
                  <Link href={href} style={{ marginTop: "auto", paddingTop: 14, fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }} className="transition-opacity hover:opacity-70">{cta}</Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ marginTop: "auto", paddingTop: 14, fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }} className="transition-opacity hover:opacity-70">{cta}</a>
                )}
              </div>
            ))}
          </div>
          <p style={{ margin: "clamp(30px,4vw,46px) 0 0", paddingTop: 24, borderTop: `1.5px solid ${C.ox}`, fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.3vw,30px)", lineHeight: 1.3, maxWidth: 720 }}>
            Every project is a collaboration. Every result is shared.
          </p>
        </div>
      </section>

      {/* trusted by — oxblood */}
      <section className={`${PAD} py-[clamp(44px,6vw,80px)]`} style={{ background: C.ox, color: C.peachSoft }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", color: C.peach, marginBottom: 16 }}>Trusted by</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,3.2vw,42px)", lineHeight: 1.06, letterSpacing: "-.03em", margin: "0 0 clamp(30px,4vw,46px)", color: C.cream, maxWidth: 700 }}>
            Organizations doing meaningful work in the world.
          </h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", borderTop: `1.5px solid ${C.peach}`, borderBottom: `1.5px solid ${C.peach}` }}>
            {TRUSTED.map((n, i) => (
              <div key={n} style={{ padding: i === 0 ? "22px 20px 22px 0" : "22px 20px", borderLeft: i === 0 ? undefined : `1.5px solid ${C.peach}`, fontFamily: SANS, fontWeight: 700, fontSize: 19, letterSpacing: "-.02em", color: C.cream }}>{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* closing — orange */}
      <section className={`${PAD} py-[clamp(56px,9vw,120px)]`} style={{ background: C.terra, color: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(50px,10.5vw,140px)", lineHeight: 0.86, letterSpacing: "-.045em", margin: 0, maxWidth: "16ch" }}>
            Come find me after the show<span style={{ color: C.cream }}>.</span>
          </h2>
          <p style={{ margin: "clamp(28px,4vw,44px) 0 12px", fontFamily: SERIF, fontSize: "clamp(20px,2.2vw,28px)", lineHeight: 1.35, maxWidth: 640 }}>
            Have a story worth telling, a room worth gathering, or something interesting you&rsquo;re building?
          </p>
          <p style={{ margin: "0 0 28px", fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: C.ox, maxWidth: 600 }}>
            Twenty minutes, on a call: a season, a story, or whatever you&rsquo;re making. Not a sales pitch, and not for everyone, but if that sounds like you, let&rsquo;s talk.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 19, lineHeight: 1, padding: "20px 44px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
              Book 20 minutes &rarr;
            </a>
            <span style={{ fontSize: 16, color: C.ox }}>or write first, <MailLink style={{ color: C.ox, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-70" /></span>
          </div>
        </div>
      </section>

      <Footer />
    </Shell>
  );
}
