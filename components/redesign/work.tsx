import Link from "next/link";
import { Nav, GiantTitle, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";

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
  ["03 · Co-founder · New York", "City Lyric Opera", "Building an organization from nothing.", "Co-founded a company that makes opera feel current for a young New York audience. The proof it works: a full production, a real following, and a model other companies now study.", "Watch the trailer →", yt("J9rGZCJzTtY")],
  ["04 · Brand & systems", "MyNanny", "The same instinct, outside the arts.", "Brand, voice and onboarding for a childcare company: the interview guide, the welcome, the trial day. Range that shows the method isn't about opera. It's about making people feel oriented and cared for.", "View the guides →", "/work/mynanny-interview.pdf"],
];

function Rows({ title, rows }: { title: string; rows: [string, string, string][] }) {
  return (
    <div>
      <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra, paddingBottom: 12 }}>
        ✦ {title}
      </div>
      {rows.map(([label, kind, href], i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-baseline justify-between gap-4 py-3.5 transition-opacity hover:opacity-70"
          style={{ borderTop: `1.5px solid ${C.ox}`, borderBottom: i === rows.length - 1 ? `1.5px solid ${C.ox}` : undefined, fontSize: 17, color: C.ox }}
        >
          <span>{label}</span>
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, whiteSpace: "nowrap" }}>{kind} →</span>
        </a>
      ))}
    </div>
  );
}

export function WorkRedesign() {
  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Work" />
      <GiantTitle ground="cream" size="min(24vw,285px)">Work</GiantTitle>

      {/* hero */}
      <div className={`${PAD} grid items-center gap-[clamp(36px,5vw,64px)] py-[clamp(48px,8vw,90px)] md:grid-cols-[1fr_420px]`}>
        <div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,5vw,52px)", lineHeight: 1, letterSpacing: "-.025em", color: C.ox }}>
            is where ideas become real.
          </div>
          <div style={{ fontSize: 19, fontStyle: "italic", color: C.terra, marginTop: 20 }}>
            Every project begins with the same question: &ldquo;Why should anyone care?&rdquo;
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: C.ox, marginTop: 16, maxWidth: 520 }}>
            From strategy to story to production, I help organizations make work that gets people to care, show up, and come back.
          </p>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/katie-hero.jpg" alt="Katie Spencer on set, Knoxville" className="block w-full object-cover" style={{ height: "clamp(320px,42vw,380px)" }} />
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 12 }}>on set, knoxville</div>
        </div>
      </div>

      {/* headliner — terracotta */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.terra }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,64px)] md:grid-cols-[1fr_420px]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.cream }}>The headliner · Brand & audience strategy</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,6vw,64px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95, marginTop: 16 }}>Knoxville Opera</div>
            <div style={{ fontSize: 20, fontStyle: "italic", color: C.cream, marginTop: 16 }}>Reimagining a 47-year-old opera company for a new generation.</div>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: C.ox, marginTop: 16, maxWidth: 560 }}>
              Four years leading brand, marketing and audience strategy for a beloved institution. A confident rebrand and sharper storytelling doubled first-time attendance and grew revenue per show 27%, and La Bohème became the best-selling production in company history.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-[18px] gap-y-3">
              <Link href="/knoxville-opera" style={{ fontFamily: SANS, fontSize: 15, color: C.cream, background: C.ox, padding: "14px 30px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
                See the case study →
              </Link>
              <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.cream }}>Admit one · The full production</span>
            </div>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/work-featured.jpg" alt="Knoxville Opera on stage" className="block w-full object-cover" style={{ height: "clamp(300px,40vw,340px)" }} />
            <div className="mt-[22px] flex items-baseline gap-4" style={{ background: C.ox, padding: "24px 28px" }}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(36px,5vw,44px)", letterSpacing: "-.03em", color: C.cream }}>+101%</div>
              <div style={{ fontSize: 15, color: C.peach }}>first-time attendees / show</div>
            </div>
          </div>
        </div>
      </div>

      {/* inside the work — cream */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,56px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95 }}>Inside the work.</div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }}>Knoxville Opera · selected pieces</div>
          </div>
          <div className="mt-10 grid gap-x-[56px] gap-y-12 md:grid-cols-2">
            <Rows title="Film & story" rows={FILM} />
            <div>
              <Rows title="On stage & in print" rows={STAGE} />
              <div style={{ fontSize: 14, fontStyle: "italic", color: C.ox, marginTop: 16 }}>Films with Vessul Creative. Program design with Robin Easter Design.</div>
            </div>
          </div>
        </div>
      </div>

      {/* rest of the repertoire — periwinkle */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.ox }}>✦ The rest of the repertoire</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,50px)", letterSpacing: "-.025em", color: C.ox, lineHeight: 1, marginTop: 14, maxWidth: 900 }}>
            Organizations built, brands shaped, and products made for the field.
          </div>
          <div className="mt-10 grid gap-[22px] md:grid-cols-2">
            {REP.map(([label, title, italic, body, cta, href]) => (
              <div key={title} style={{ background: C.cream, padding: 32 }}>
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }}>{label}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.ox, marginTop: 10 }}>{title}</div>
                <div style={{ fontSize: 16, fontStyle: "italic", color: C.terra, marginTop: 4 }}>{italic}</div>
                <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox, marginTop: 8 }}>{body}</div>
                {href.startsWith("/") && !href.endsWith(".pdf") ? (
                  <Link href={href} style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 14, display: "inline-block" }}>{cta}</Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 14, display: "inline-block" }}>{cta}</a>
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 16, fontStyle: "italic", color: C.ox, marginTop: 28, textAlign: "center" }}>Every project is a collaboration. Every result is shared.</div>
        </div>
      </div>

      {/* trusted by — oxblood */}
      <div className={`${PAD} py-[clamp(48px,7vw,56px)] text-center`} style={{ background: C.ox }}>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.peri }}>✦ Trusted by ✦</div>
        <div style={{ fontSize: 17, fontStyle: "italic", color: C.peach, marginTop: 10 }}>Organizations doing meaningful work in the world.</div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-[clamp(18px,3vw,34px)] gap-y-2" style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: C.cream }}>
          {["Knoxville Opera", "City Lyric Opera", "Savannah VOICE Festival", "New York Opera Alliance", "Nonprofit New York", "MyNanny"].map((n, i) => (
            <span key={n} className="flex items-center gap-x-[clamp(18px,3vw,34px)]">
              {i > 0 && <span aria-hidden style={{ color: C.peri }}>•</span>}
              {n}
            </span>
          ))}
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
