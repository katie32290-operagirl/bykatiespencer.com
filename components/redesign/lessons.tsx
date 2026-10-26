import Link from "next/link";
import { Footer, PAD, C, SANS, SERIF } from "./chrome";
import { LessonsForm } from "./lessons-form";
import { LiteYouTube } from "./lite-youtube";

/** /lessons — Katie's private piano & voice studio. A warm, family-facing
 *  landing page, self-contained (its own wordmark header, no site nav), for a
 *  different visitor than the rest of the site: parents and adult students. */

const RATES: { title: string; age: string; blurb: string; rows: [string, string][] }[] = [
  {
    title: "Piano Lessons",
    age: "Ages 5+",
    blurb: "Individual instruction in piano fundamentals, technique, music reading, and musicianship.",
    rows: [["30 minutes", "$40"], ["60 minutes", "$70"]],
  },
  {
    title: "Voice Lessons",
    age: "Ages 10+",
    blurb: "Individual instruction in vocal technique, breath coordination, musical interpretation, and repertoire development.",
    rows: [["45 minutes", "$65"], ["60 minutes", "$90"]],
  },
];

export function LessonsRedesign() {
  return (
    <div style={{ background: C.cream, color: C.ox, fontFamily: SERIF }}>
      {/* header — wordmark only, no site nav */}
      <div className={`${PAD} flex flex-wrap items-center justify-between gap-y-2 py-[clamp(18px,2.6vw,26px)]`}>
        <Link href="/" style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", color: C.terra }}>
          Katie Spencer<span style={{ color: C.ox }}>.</span>
        </Link>
        <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.ox }}>Piano &amp; Voice Studio</span>
      </div>

      {/* hero — burnt orange */}
      <header className={`${PAD} py-[clamp(56px,10vw,120px)]`} style={{ background: C.terra }}>
        <div className="mx-auto max-w-[1080px]">
          <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", color: C.ox }}>
            Piano &amp; voice lessons · Knoxville, TN
          </div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,9vw,96px)", lineHeight: 0.95, letterSpacing: "-.04em", color: C.ox, margin: "20px 0 0", maxWidth: "15ch" }}>
            Let&rsquo;s make music together.
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.5, color: C.cream, margin: "24px 0 0", maxWidth: 560 }}>
            Private piano and voice lessons for kids and adults, in whatever style you love: classical, musical theater, worship, or pop.
          </p>
          <a href="#interest" style={{ display: "inline-block", background: C.peri, color: C.ox, fontFamily: SANS, fontSize: 16, lineHeight: 1, padding: "17px 40px", borderRadius: 40, marginTop: 34 }} className="transition-opacity hover:opacity-90">
            Start lessons &rarr;
          </a>
        </div>
      </header>

      {/* about — cream */}
      <section className={`${PAD} py-[clamp(56px,9vw,96px)]`}>
        <div className="mx-auto grid max-w-[1080px] items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-[1fr_360px]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.terra }}>Your teacher</div>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, margin: "14px 0 0" }}>
              Hi, I&rsquo;m Katie.
            </h2>
            <div className="mt-6 flex flex-col gap-4" style={{ fontSize: 18, lineHeight: 1.65, color: C.ox, maxWidth: 560 }}>
              <p>I&rsquo;m a singer and pianist with a Master&rsquo;s in vocal performance, and I&rsquo;ve been teaching students of all ages for over a decade.</p>
              <p>Along the way I co-founded and ran a small opera company in New York, and worked with a major concert hall, a regional opera company, and a summer festival. I&rsquo;ve taught privately in New York City and in Bluffton, South Carolina, and now I&rsquo;m opening my studio to a few students here in Knoxville.</p>
              <p>I teach classical, musical theater, worship, and pop, so you get to learn the music you actually care about.</p>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/redesign/portrait-about.webp" alt="Katie Spencer" className="block w-full object-cover" style={{ height: "clamp(340px,52vw,440px)", objectPosition: "center 20%" }} />
        </div>
      </section>

      {/* rates — periwinkle */}
      <section className={`${PAD} py-[clamp(56px,9vw,96px)]`} style={{ background: C.peri }}>
        <div className="mx-auto max-w-[1080px]">
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1 }}>Lessons &amp; rates.</h2>
          <div className="mt-[clamp(28px,4vw,44px)] grid gap-[clamp(18px,2.5vw,28px)] sm:grid-cols-2">
            {RATES.map((r) => (
              <div key={r.title} style={{ background: C.cream, border: `1.5px solid ${C.ox}`, padding: "clamp(26px,3.5vw,40px)" }}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,3vw,34px)", letterSpacing: "-.02em", color: C.ox }}>{r.title}</h3>
                  <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }}>{r.age}</span>
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: C.ox, margin: "14px 0 0" }}>{r.blurb}</p>
                <div className="mt-6">
                  {r.rows.map(([len, price], i) => (
                    <div key={len} className="flex items-baseline justify-between py-[14px]" style={{ borderTop: `1.5px solid ${C.ox}`, borderBottom: i === r.rows.length - 1 ? `1.5px solid ${C.ox}` : undefined }}>
                      <span style={{ fontFamily: SERIF, fontSize: 18, color: C.ox }}>{len}</span>
                      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(22px,2.6vw,28px)", letterSpacing: "-.02em", color: C.ox }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* students — cream */}
      <section className={`${PAD} py-[clamp(56px,9vw,96px)]`}>
        <div className="mx-auto max-w-[1080px]">
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1 }}>Meet a few of my students.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: C.ox, margin: "16px 0 0", maxWidth: 560 }}>A little of what we get up to together. Press play.</p>
          {/* featured Instagram reel */}
          <div className="mx-auto mt-[clamp(28px,4vw,44px)]" style={{ maxWidth: 460 }}>
            <iframe
              src="https://www.instagram.com/reel/DZ3UUU1v01e/embed"
              title="A performance from Katie Spencer on Instagram"
              loading="lazy"
              scrolling="no"
              allow="encrypted-media; picture-in-picture; web-share; clipboard-write"
              style={{ width: "100%", height: 600, border: `1.5px solid ${C.ox}`, background: C.cream, display: "block" }}
            />
          </div>
          <div className="mt-[clamp(28px,4vw,44px)] grid items-start gap-[clamp(18px,2.5vw,28px)] lg:grid-cols-[250px_1fr]">
            <LiteYouTube id="DK9cU4nb2Aw" name="Nora" vertical />
            <div className="grid gap-[clamp(18px,2.5vw,28px)] sm:grid-cols-2">
              <LiteYouTube id="hwIHdC1mH_s" name="Stella" />
              <LiteYouTube id="bLMZ5Kttzyc" name="AC" />
              <LiteYouTube id="4fABX4Hc0K4" name="Ava" />
            </div>
          </div>
        </div>
      </section>

      {/* where & how — dark red */}
      <section className={`${PAD} py-[clamp(48px,7vw,80px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[1080px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.peach }}>Where &amp; how</div>
          <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3.4vw,38px)", lineHeight: 1.15, letterSpacing: "-.02em", color: C.cream, margin: "16px 0 0", maxWidth: 720 }}>
            Lessons happen in my home studio here in Knoxville, TN. Send a note below and I&rsquo;ll share the details and current openings.
          </p>
        </div>
      </section>

      {/* interest form — cream */}
      <section id="interest" className={`${PAD} py-[clamp(56px,9vw,96px)]`} style={{ scrollMarginTop: 24 }}>
        <div className="mx-auto max-w-[760px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.terra }}>Start lessons</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1, margin: "12px 0 0" }}>Let&rsquo;s find a time.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: C.ox, margin: "16px 0 22px", maxWidth: 560 }}>
            Tell me a little about the student and what you&rsquo;re hoping for. This just starts the conversation, nothing is booked yet.
          </p>
          <LessonsForm />
        </div>
      </section>

      {/* closing — burnt orange */}
      <section className={`${PAD} py-[clamp(56px,8vw,90px)] text-center`} style={{ background: C.terra }}>
        <div className="mx-auto max-w-[760px]">
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px,4.4vw,48px)", lineHeight: 1.05, letterSpacing: "-.03em", color: C.ox }}>
            Whether it&rsquo;s your kid&rsquo;s first lesson or you&rsquo;re finally taking your own, I&rsquo;d love to hear from you.
          </div>
          <a href="#interest" style={{ display: "inline-block", background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 16, lineHeight: 1, padding: "17px 40px", borderRadius: 40, marginTop: 28 }} className="transition-opacity hover:opacity-90">
            Start lessons &rarr;
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
