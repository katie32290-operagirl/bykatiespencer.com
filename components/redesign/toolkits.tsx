import Script from "next/script";
import Link from "next/link";
import { Nav, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import { BuyButton, SeeInsideLink, DoorLink } from "./toolkit-buttons";
import { ToolkitCarousel } from "./toolkit-carousel";

/** A deeper oxblood used only for the bold labels on the orange section. */
const OXDEEP = "#6E140D";

type Slide = { src: string; alt: string };
type InsideRow = [string, React.ReactNode];

const INSIDE: InsideRow[] = [
  ["The Guide.", "Fifteen pages on how small-shop fundraising actually works: why your top twenty donors matter more than your mailing list, the five-stage pipeline in plain language, the weekly floor, and the Giving Risk Checklist."],
  ["The Donor Pipeline Workbook.", "A Google Sheets workbook you copy and keep. One row per donor, a Dashboard that runs itself, a giving plan, a 12-month communications calendar, a Board Report Card, and the “who do you know” worksheet."],
  ["The Scripts.", "Handwritten notecards for five situations: lapsed-donor outreach, setting the meeting, the ask in five beats, the thank-you call, and what to say after a “no.”"],
  ["Two printables.", "A Board Report Card to share at mid-year and year-end, and the prospect worksheet to hand out at a board meeting."],
];

const KIT_INSIDE: InsideRow[] = [
  ["The Guide.", "Twenty-eight pages on why most season marketing lists what is happening instead of inviting anyone: the two questions every company should ask, three real stories from a real season, and the one-pager nobody wants to write when a production doesn’t land."],
  ["The Season Marketing Planner.", "A Google Sheets workbook you copy and keep. A season timeline that builds itself from eight anchor dates, an eight-week show sequence to duplicate per production, a channel calendar that shows you the gaps, an Audience Development Scorecard, and a survey log."],
  ["The Copy Templates and the Show Story Worksheet.", "Every framework blank and then filled with real examples, plus the twenty-minute exercise that makes the rest of them easier."],
  [
    "The Post-Show Survey.",
    <>
      Five questions, anonymous, sent the morning after.{" "}
      <Link href="/survey" style={{ color: OXDEEP, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-70">
        The generator on this site
      </Link>{" "}
      writes the form for you.
    </>,
  ],
];

const EVENT_INSIDE: InsideRow[] = [
  ["The Guide.", "Why not every event is a fundraiser, and the four jobs an event can actually do. Name the job first, then judge it against the metrics that belong to it, so a cultivation night stops getting graded like a gala."],
  ["The Templates and Scripts.", "Twenty-five letters, emails, and scripts, blank and then filled: the sponsorship ask in five beats, the follow-up, and every send the plan asks for, written to be copied and made your own."],
  ["The Event Night Playbook.", "A minute-by-minute run of show that builds the whole night toward the ask, with the one rule that protects it: nothing goes between the story and the paddle raise."],
  ["The Event Decision Matrix.", "A one-page worksheet that scores an event on eight factors and the two numbers that matter, cost to raise a dollar and net per staff hour, so you can protect it, rework it, or cut it on purpose."],
];

/** The three products that make up the bundle (the fourth cell is the planner). */
const BUNDLE_CELLS: [string, string][] = [
  ["The Small-Shop Development Toolkit", "Run a real donor program without a development team."],
  ["The Arts Marketing Kit", "Announce and sell a season as an invitation, not a listing."],
  ["The Fundraising Event Toolkit", "Plan an event that nets money, not just goodwill."],
];

const QUESTIONS: [string, string, string][] = [
  ["Delivery", "How is it delivered?", "Instantly, after checkout. The written pieces come as PDFs; the workbooks come as links that make your own copy in Google Sheets. Updates are free for life."],
  ["Requirements", "Do I need anything?", "A free Google account for the workbooks. They only work in Google Sheets, so open them there, not in Excel."],
];

const GRID_2 = "repeat(auto-fit, minmax(min(100%, 330px), 1fr))";

/** One product block: the cover carousel and the write-up, image side and the
 *  section colour vary between the three. On the orange middle section the
 *  eyebrow flips to oxblood and the labels deepen a shade. */
function ToolkitRow({
  n,
  price,
  title,
  tagline,
  productId,
  productName,
  slides,
  inside,
  pull,
  imagesLeft,
  variant,
}: {
  n: string;
  price: string;
  title: string;
  tagline: string;
  productId: string;
  productName: string;
  slides: Slide[];
  inside: InsideRow[];
  pull: string;
  imagesLeft: boolean;
  variant: "paper" | "orange";
}) {
  const orange = variant === "orange";
  const eyebrow = orange ? C.ox : C.terra;
  const labelInk = orange ? OXDEEP : C.ox;

  const images = <ToolkitCarousel slides={slides} />;
  const body = (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: eyebrow }}>
          Toolkit {n} · Available now
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(48px,7vw,80px)", lineHeight: 0.8, letterSpacing: "-.045em", color: C.ox }}>{price}</div>
      </div>
      <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.2vw,50px)", lineHeight: 1.02, letterSpacing: "-.02em", color: C.ox, margin: "16px 0 0" }}>
        {title}
      </h2>
      <p style={{ fontFamily: SERIF, fontSize: "clamp(18px,2.1vw,20px)", lineHeight: 1.45, color: C.ox, margin: "12px 0 0", maxWidth: 520 }}>{tagline}</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        <BuyButton productId={productId} productName={productName} />
        <SeeInsideLink productId={productId} productName={productName} />
      </div>

      <div className="mt-8 flex flex-col gap-[14px]" style={{ maxWidth: 560 }}>
        {inside.map(([t, b], idx) => (
          <p key={idx} style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: C.ox }}>
            <span style={{ fontFamily: SANS, fontWeight: 700, letterSpacing: "-.01em", color: labelInk }}>{t}</span>{" "}
            <span style={{ fontFamily: SERIF }}>{b}</span>
          </p>
        ))}
      </div>

      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, lineHeight: 1.45, color: C.ox, marginTop: 28, paddingTop: 22, borderTop: `1.5px solid ${C.ox}`, maxWidth: 520 }}>
        {pull}
      </p>
    </div>
  );

  return (
    <div
      className={`${PAD} py-[clamp(44px,6vw,80px)]`}
      style={{ background: orange ? C.terra : C.cream, borderTop: orange ? undefined : `1.5px solid ${C.ox}` }}
    >
      <div className="mx-auto grid max-w-[1240px] items-start gap-[clamp(32px,4vw,60px)]" style={{ gridTemplateColumns: GRID_2 }}>
        {imagesLeft ? (
          <>
            {images}
            {body}
          </>
        ) : (
          <>
            {body}
            {images}
          </>
        )}
      </div>
    </div>
  );
}

export function ToolkitsRedesign() {
  return (
    <Shell ground="cream">
      <Script src="https://payhip.com/payhip.js" strategy="afterInteractive" />
      <Nav ground="oxblood" active="Toolkits" />

      {/* 1 · hero — oxblood, the premise moved up into the header */}
      <div className={`${PAD} pt-[clamp(48px,7vw,96px)] pb-[clamp(48px,7vw,84px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", color: C.peach, marginBottom: 18 }}>By Katie Spencer</div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(64px,13.2vw,169px)", lineHeight: 0.82, letterSpacing: "-.045em", margin: 0, color: C.cream }}>
            Toolkits<span style={{ color: C.terra }}>.</span>
          </h1>
          <div className="mt-[clamp(36px,5vw,60px)] grid items-start gap-[clamp(28px,5vw,72px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
            <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,2.6vw,34px)", lineHeight: 1.16, letterSpacing: "-.03em", margin: 0, maxWidth: 460, color: C.cream }}>
              The systems I used, packaged for the person doing the job without the department.
            </p>
            <div className="flex flex-col gap-[18px]" style={{ maxWidth: 640, fontSize: 17, lineHeight: 1.62 }}>
              <p style={{ margin: 0, fontFamily: SERIF, color: C.peachSoft }}>I have run development, marketing, and the gala seating chart from the same desk at the same time. I know what it looks like when the show is the thing you actually know how to do and the donor list is the thing that keeps you up at night.</p>
              <p style={{ margin: 0, fontFamily: SERIF, color: C.peachSoft }}>These toolkits are the systems I built for myself in those years, cleaned up and written down. Each one is a short guide in plain language, the working files I actually used, and the word-for-word scripts for the conversations that matter. Nothing in them is theory. They are what I did, what worked, and where I got it wrong.</p>
              <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", color: C.peach }}>They&rsquo;re for a one- to three-person staff at a regional opera company, symphony, choir, dance company, or theater. If your donor program lives in your head and a spreadsheet you don&rsquo;t trust, start here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2 · Development Toolkit — paper, cover at left */}
      <ToolkitRow
        n="01"
        price="$59"
        title="The Small-Shop Development Toolkit"
        tagline="Run a real donor program without a development team."
        productId="ocvs9"
        productName="development"
        imagesLeft
        variant="paper"
        slides={[
          { src: "/redesign/toolkit-1.webp", alt: "The Small-Shop Development Toolkit field guide and the five-stage pipeline" },
          { src: "/redesign/toolkit-2.webp", alt: "The Scripts: handwritten notecard formulas" },
          { src: "/redesign/toolkit-3.webp", alt: "The printables: Board Report Card and the Who do you know worksheet" },
          { src: "/redesign/toolkit-4.webp", alt: "The Giving Risk Checklist" },
        ]}
        inside={INSIDE}
        pull="If you are choosing between spending Thursday afternoon redesigning the donation page or having coffee with someone who gave you $500 last year, have the coffee."
      />

      {/* 3 · Arts Marketing Kit — orange, cover at right */}
      <ToolkitRow
        n="02"
        price="$49"
        title="The Arts Marketing Kit"
        tagline="Announce and sell a season as an invitation, not a listing."
        productId="YuMdI"
        productName="arts_marketing"
        imagesLeft={false}
        variant="orange"
        slides={[
          { src: "/redesign/kit-1.webp", alt: "The Arts Marketing Kit field guide and what's inside" },
          { src: "/redesign/kit-2.webp", alt: "The Copy Templates: the first-timer email framework" },
          { src: "/redesign/kit-3.webp", alt: "The Show Story Worksheet and the Survey Log" },
          { src: "/redesign/kit-4.webp", alt: "The Post-Show Survey: five questions and what each one tells you" },
        ]}
        inside={KIT_INSIDE}
        pull="If the season announcement goes out Friday and nobody has written the one sentence that says why anyone should come, start here."
      />

      {/* 4 · Fundraising Event Toolkit — paper, cover at left */}
      <ToolkitRow
        n="03"
        price="$39"
        title="The Fundraising Event Toolkit"
        tagline="Plan a fundraising event that nets money, not just goodwill, with a two-person team."
        productId="IYarA"
        productName="fundraising_event"
        imagesLeft
        variant="paper"
        slides={[
          { src: "/redesign/event-1.webp", alt: "The Fundraising Event Toolkit field guide: not every event is a fundraiser" },
          { src: "/redesign/event-2.webp", alt: "The Templates and Scripts: the sponsorship ask in five beats" },
          { src: "/redesign/event-3.webp", alt: "The Event Night Playbook: the sample run of show" },
          { src: "/redesign/event-4.webp", alt: "The Event Decision Matrix worksheet" },
        ]}
        inside={EVENT_INSIDE}
        pull="If the board wants a bigger gala and nobody has asked what the gala is actually for, start here."
      />

      {/* 5 · the bundle — oxblood */}
      <div className={`${PAD} py-[clamp(48px,7vw,96px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[26px] flex items-center gap-[14px]" style={{ color: C.peach }}>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" }}>The bundle · Best value</div>
            <div style={{ flex: 1, height: 1.5, background: C.peach }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.terra }} />
          </div>

          <div className="grid items-end gap-[clamp(32px,4vw,64px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
            <div>
              <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,82px)", lineHeight: 0.94, letterSpacing: "-.045em", margin: 0, color: C.cream }}>
                The Small Arts Org Operating Kit
              </h2>
              <p style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.45, maxWidth: 480, margin: "22px 0 0", color: C.peachSoft }}>
                Three jobs, one person, one system. All three toolkits, plus the part that only exists here.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-[18px]">
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(72px,11vw,148px)", lineHeight: 0.78, letterSpacing: "-.045em", color: C.terra }}>$99</div>
                <div style={{ fontFamily: SERIF, fontSize: 22, textDecoration: "line-through", color: C.peach }}>$147</div>
              </div>
              <div className="mt-[26px]">
                <BuyButton productId="6FiAt" productName="operating_kit_bundle" label="Buy the bundle, save $48" />
              </div>
            </div>
          </div>

          <div className="mt-[clamp(36px,5vw,60px)] grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 1.5, background: C.peach }}>
            {BUNDLE_CELLS.map(([t, b]) => (
              <div key={t} style={{ background: C.ox, color: C.cream, padding: "26px 24px" }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: "-.02em", marginBottom: 8 }}>{t}</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>{b}</p>
              </div>
            ))}
            <div style={{ background: C.cream, color: C.ox, padding: "26px 24px" }}>
              <div style={{ width: 30, height: 30, background: C.peri, marginBottom: 14 }} />
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: "-.02em", marginBottom: 8 }}>Season Year at a Glance</div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: C.ox }}>All three calendars on one page, with the weeks they collide. Only in the bundle.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 · the planner + the two doors — periwinkle */}
      <div className={`${PAD} py-[clamp(44px,6vw,76px)]`} style={{ background: C.peri, color: C.ox }}>
        <div className="mx-auto grid max-w-[1240px] items-start gap-[clamp(28px,4vw,64px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", marginBottom: 14 }}>The page that only exists in the bundle</div>
            <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.02, letterSpacing: "-.03em", margin: "0 0 16px" }}>
              Season Year at a Glance
            </h3>
            <p style={{ margin: "0 0 24px", fontFamily: SERIF, fontSize: 17, lineHeight: 1.6, maxWidth: 520 }}>
              Put in your season and the planner merges the donor rhythm, the marketing timeline, and the event countdowns into one calendar, then shows you the weeks they collide. Free to try; the download comes with the bundle.
            </p>
            <Link
              href="/season-planner"
              style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, color: C.cream, background: C.ox, padding: "18px 40px", borderRadius: 40, display: "inline-block" }}
              className="transition-opacity hover:opacity-90"
            >
              Try the planner
            </Link>
          </div>

          <div className="grid gap-[22px]">
            <div style={{ background: C.cream, border: `1.5px solid ${C.ox}`, padding: 24 }}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", marginBottom: 8 }}>Want it done with you?</div>
              <p style={{ margin: "0 0 14px", fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: C.ox }}>
                The toolkits are the do-it-yourself version of the work I do with organizations through Narratives: story strategy for a season, built together.
              </p>
              <DoorLink href="/narratives" event="toolkit_door_narratives" variant="italic">Narratives &rarr;</DoorLink>
            </div>
            <div style={{ background: C.cream, border: `1.5px solid ${C.ox}`, padding: 24 }}>
              <div className="mb-[14px] flex items-center gap-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/redesign/greenroom-icon.webp" alt="GreenRoom" width={26} height={26} style={{ display: "block" }} />
                <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" }}>GreenRoom</span>
              </div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", marginBottom: 8 }}>Outgrown the spreadsheet?</div>
              <p style={{ margin: "0 0 14px", fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: C.ox }}>
                The workbook is the manual version of what GreenRoom does. When you have more than one person touching donors and the board wants a renewal rate, that&rsquo;s the point I built it for.
              </p>
              <DoorLink href="https://greenroomcrm.com" event="toolkit_door_greenroom" external variant="italic">greenroomcrm.com &rarr;</DoorLink>
            </div>
          </div>
        </div>
      </div>

      {/* 7 · the questions — paper, two bordered cells */}
      <div className={`${PAD} py-[clamp(44px,6vw,76px)]`} style={{ background: C.cream }}>
        <div className="mx-auto grid max-w-[1240px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 1.5, background: C.ox, border: `1.5px solid ${C.ox}` }}>
          {QUESTIONS.map(([eyebrow, q, a]) => (
            <div key={q} style={{ background: C.cream, padding: "30px 26px" }}>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra, marginBottom: 12 }}>{eyebrow}</div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", color: C.ox, marginBottom: 10 }}>{q}</div>
              <p style={{ margin: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.6, color: C.ox }}>{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8 · closing beat — orange */}
      <div className={`${PAD} py-[clamp(60px,9vw,130px)]`} style={{ background: C.terra }}>
        <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(56px,11.5vw,152px)", lineHeight: 0.84, letterSpacing: "-.045em", margin: 0, maxWidth: "15ch", color: C.ox }}>
          Go have the coffee<span style={{ color: C.cream }}>.</span>
        </h2>
      </div>

      <Footer />
    </Shell>
  );
}
