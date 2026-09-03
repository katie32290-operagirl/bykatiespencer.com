import Script from "next/script";
import { Nav, GiantTitle, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import { BuyButton, SeeInsideLink, DoorLink } from "./toolkit-buttons";

const INSIDE: [string, string][] = [
  ["The Guide.", "Fifteen pages on how small-shop fundraising actually works: why your top twenty donors matter more than your mailing list, the five-stage pipeline in plain language, the weekly floor, and the Giving Risk Checklist."],
  ["The Donor Pipeline Workbook.", "A Google Sheets workbook you copy and keep. One row per donor, a Dashboard that runs itself, a giving plan, a 12-month communications calendar, a Board Report Card, and the “who do you know” worksheet."],
  ["The Scripts.", "Handwritten notecards for five situations: lapsed-donor outreach, setting the meeting, the ask in five beats, the thank-you call, and what to say after a “no.”"],
  ["Two printables.", "A Board Report Card to share at mid-year and year-end, and the prospect worksheet to hand out at a board meeting."],
];

const SERIES: [string, string, string, string][] = [
  ["Toolkit 02", "The Season Invitation Kit", "Announce and sell a season as an invitation, not a listing. The Narratives thesis, in a planner, a set of copy frameworks, and the post-show survey I ran at Knoxville Opera.", "Fall 2026"],
  ["Toolkit 03", "The Fundraising Event Toolkit", "Plan a fundraising event that nets money, not just goodwill, with a two-person team. The honest math on galas, a sponsorship deck, the paddle-raise script, and the follow-up that moves guests into your donor pipeline.", "Fall 2026"],
];

const QUESTIONS: [string, string][] = [
  ["How is it delivered?", "Instantly, after checkout. The Guide, the Scripts, and the two printables come as PDFs; the workbook comes as a link that makes your own copy in Google Sheets. Updates go out to every past buyer for free."],
  ["Do I need anything?", "A free Google account for the workbook. The Dashboard formulas only work in Google Sheets, so open it there, not in Excel."],
  ["What if it isn’t for me?", "Email within 14 days and I’ll refund it."],
];

export function ToolkitsRedesign() {
  return (
    <Shell ground="terra">
      <Script src="https://payhip.com/payhip.js" strategy="afterInteractive" />
      <Nav ground="terra" active="Toolkits" />

      {/* 1 · hero — burnt orange */}
      <div className={`${PAD} pb-[clamp(48px,8vw,80px)] pt-[clamp(16px,2vw,28px)] text-center`}>
        <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: C.cream }}>By Katie Spencer</div>
        <GiantTitle ground="terra" size="min(22vw,260px)">
          Toolkits<span style={{ color: C.cream }}>.</span>
        </GiantTitle>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(19px,2.4vw,26px)", lineHeight: 1.4, color: C.cream, maxWidth: 640, margin: "24px auto 0" }}>
          The systems I used, packaged for the person doing the job without the department.
        </p>
      </div>

      {/* 2 · the premise — paper */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto flex max-w-[680px] flex-col gap-5" style={{ fontSize: 18, lineHeight: 1.7, color: C.ox }}>
          <p>I have run development, marketing, and the gala seating chart from the same desk at the same time. I know what it looks like when the show is the thing you actually know how to do and the donor list is the thing that keeps you up at night.</p>
          <p>These toolkits are the systems I built for myself in those years, cleaned up and written down. Each one is a short guide in plain language, the working files I actually used, and the word-for-word scripts for the conversations that matter. Nothing in them is theory. They are what I did, what worked, and where I got it wrong.</p>
          <p>They&rsquo;re for a one- to three-person staff at a regional opera company, symphony, choir, dance company, or theater. If your donor program lives in your head and a spreadsheet you don&rsquo;t trust, start here.</p>
        </div>
      </div>

      {/* 3 · the Development Toolkit — paper, cover at left */}
      <div className={`${PAD} py-[clamp(56px,8vw,88px)]`} style={{ background: C.cream, borderTop: `1.5px solid ${C.ox}` }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,64px)] md:grid-cols-[360px_1fr]">
          {/* guide cover — placeholder until the Payhip mockup is dropped in */}
          <div
            className="mx-auto w-full max-w-[360px]"
            style={{ background: C.ox, color: C.cream, aspectRatio: "3 / 4", padding: "clamp(24px,3vw,34px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: C.peach }}>Toolkit 01</div>
            <div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px,3.4vw,38px)", lineHeight: 1.0, letterSpacing: "-.02em" }}>
                The Small-Shop Development Toolkit<span style={{ color: C.terra }}>.</span>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.peach, marginTop: 18 }}>By Katie Spencer</div>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: C.terra }}>Toolkit 01 · Available now</div>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.4vw,46px)", lineHeight: 1.02, letterSpacing: "-.02em", color: C.ox, marginTop: 14 }}>
              The Small-Shop Development Toolkit
            </h2>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(19px,2.2vw,24px)", color: C.terra, marginTop: 12 }}>Run a real donor program without a development director.</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 40, letterSpacing: "-.02em", color: C.ox }}>$59</span>
              <BuyButton />
              <SeeInsideLink />
            </div>

            <div className="mt-9 flex flex-col gap-5" style={{ borderTop: `1.5px solid ${C.ox}`, paddingTop: 24 }}>
              {INSIDE.map(([t, b]) => (
                <div key={t}>
                  <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, color: C.ox }}>{t}</span>{" "}
                  <span style={{ fontSize: 16, lineHeight: 1.6, color: C.ox }}>{b}</span>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, lineHeight: 1.55, color: C.ox, marginTop: 24, maxWidth: 620 }}>
              If you are choosing between spending Thursday afternoon redesigning the donation page or having coffee with someone who gave you $500 last year, have the coffee.
            </p>
          </div>
        </div>
      </div>

      {/* 4 · coming this fall — periwinkle */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.ox }}>The series</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-.02em", color: C.ox, lineHeight: 1.05, marginTop: 12, maxWidth: 820 }}>
            Three toolkits, one buyer, one season. The other two arrive this fall, with a bundle for all three.
          </div>
          <div className="mt-10 grid gap-[22px] md:grid-cols-2">
            {SERIES.map(([kicker, name, body, when]) => (
              <div key={name} className="flex flex-col justify-between gap-6" style={{ background: C.cream, padding: 32, minHeight: 240 }}>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }}>{kicker}</div>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.ox, marginTop: 8 }}>{name}</div>
                  <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox, marginTop: 10 }}>{body}</div>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox }}>{when}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 16, fontStyle: "italic", color: C.ox, marginTop: 24 }}>Buy the Development Toolkit now and you&rsquo;ll hear first when the others land.</p>
        </div>
      </div>

      {/* 5 · two doors — paper */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(28px,4vw,56px)] md:grid-cols-2">
          <div style={{ borderTop: `1.5px solid ${C.ox}`, paddingTop: 24 }}>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3vw,30px)", color: C.ox }}>Want it done with you?</div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: C.ox, marginTop: 10, maxWidth: 460 }}>
              The toolkits are the do-it-yourself version of the work I do with organizations through Narratives: story strategy for a season, built together.
            </p>
            <div className="mt-5">
              <DoorLink href="/narratives" event="toolkit_door_narratives">Narratives →</DoorLink>
            </div>
          </div>
          <div style={{ borderTop: `1.5px solid ${C.ox}`, paddingTop: 24 }}>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3vw,30px)", color: C.ox }}>Outgrown the spreadsheet?</div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: C.ox, marginTop: 10, maxWidth: 460 }}>
              The workbook is the manual version of what GreenRoom does. When you have more than one person touching donors and the board wants a renewal rate, that&rsquo;s the point I built it for.
            </p>
            <div className="mt-5">
              <DoorLink href="https://greenroomcrm.com" event="toolkit_door_greenroom" external>greenroomcrm.com →</DoorLink>
            </div>
          </div>
        </div>
      </div>

      {/* 6 · three questions — paper, compact */}
      <div className={`${PAD} py-[clamp(56px,8vw,80px)]`} style={{ background: C.cream, borderTop: `1.5px solid ${C.ox}` }}>
        <div className="mx-auto grid max-w-[1180px] gap-x-[clamp(28px,4vw,56px)] gap-y-8 md:grid-cols-3">
          {QUESTIONS.map(([q, a]) => (
            <div key={q}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: C.ox }}>{q}</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.ox, marginTop: 8 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7 · closing beat — dark red */}
      <div className={`${PAD} py-[clamp(72px,11vw,110px)] text-center`} style={{ background: C.ox }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,60px)", letterSpacing: "-.025em", color: C.cream, lineHeight: 1 }}>
          Go have the coffee<span style={{ color: C.terra }}>.</span>
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: C.peach, marginTop: 22 }}>
          Katie Spencer<span style={{ color: C.terra }}>.</span>
        </div>
      </div>

      <Footer />
    </Shell>
  );
}
