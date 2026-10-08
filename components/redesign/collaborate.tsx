import Link from "next/link";
import { Nav, GiantTitle, Cta, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";

/** Collaborate — the front door to the two ways of working together. It does
 *  not sell either one in full; it frames the choice and sends people to the
 *  right page: Narratives (done with you) or Toolkits (do it yourself). The
 *  deep pages keep their own URLs and their own full arguments. */

const NARRATIVES_INCLUDES = [
  "Audience & friction audit",
  "Narrative strategy",
  "Visual world brief",
  "Momentum map",
  "Budget strategy",
];

const TOOLKITS_INCLUDES = [
  "The Small-Shop Development Toolkit",
  "The Arts Marketing Kit",
  "The Fundraising Event Toolkit",
];

/** A quiet row of items separated by thin rules — editorial, not a card grid. */
function Includes({ items, color, rule }: { items: string[]; color: string; rule: string }) {
  return (
    <div className="mt-7">
      {items.map((it, i) => (
        <div key={it} style={{ fontFamily: SANS, fontSize: 15, letterSpacing: ".01em", color, padding: "11px 0", borderTop: `1px solid ${rule}` }}>
          {it}
        </div>
      ))}
    </div>
  );
}

export function CollaborateRedesign() {
  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Collaborate" />
      <GiantTitle ground="cream" size="min(20vw,240px)">Collaborate.</GiantTitle>

      {/* hero — the bridge */}
      <div className={`${PAD} pb-[clamp(44px,7vw,80px)] pt-[clamp(32px,4vw,48px)]`}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: C.terra }}>Work with me</div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6.5vw,76px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, maxWidth: 900, marginTop: 18 }}>
            Good stories need good strategy.
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(18px,2vw,22px)", lineHeight: 1.6, color: C.ox, maxWidth: 620, marginTop: 24 }}>
            Two ways to build the story your season needs: together, or on your own. Both come from the same years running development, fundraising, and marketing from one desk inside a performing arts organization.
          </p>
        </div>
      </div>

      {/* Done with you — Narratives (terracotta, previewing its page) */}
      <section className={`${PAD} py-[clamp(48px,7vw,84px)]`} style={{ background: C.terra }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(28px,5vw,72px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.cream }}>Done with you · The practice</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,7vw,84px)", lineHeight: 0.9, letterSpacing: "-.04em", color: C.ox, marginTop: 16 }}>
              Narratives<span style={{ color: C.cream }}>.</span>
            </div>
            <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(20px,2.4vw,28px)", lineHeight: 1.15, letterSpacing: "-.02em", color: C.ox, marginTop: 20, maxWidth: 420 }}>
              Story strategy for the performing arts.
            </p>
          </div>
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.6, color: C.cream, margin: 0 }}>
              Turn a season into something audiences want to step inside. I take your repertoire, find the story audiences can enter through, and build the campaign plan your small team can actually execute. One season, written for your organization.
            </p>
            <Includes items={NARRATIVES_INCLUDES} color={C.cream} rule="rgba(240,239,236,0.35)" />
            <Link href="/narratives" style={{ display: "inline-block", background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 16, lineHeight: 1, padding: "16px 34px", borderRadius: 40, marginTop: 28 }} className="transition-opacity hover:opacity-90">
              Explore Narratives &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Do it yourself — Toolkits (oxblood, previewing its page) */}
      <section className={`${PAD} py-[clamp(48px,7vw,84px)]`} style={{ background: C.ox }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(28px,5vw,72px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.peach }}>Do it yourself · The systems</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,7vw,84px)", lineHeight: 0.9, letterSpacing: "-.04em", color: C.cream, marginTop: 16 }}>
              Toolkits<span style={{ color: C.terra }}>.</span>
            </div>
            <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(20px,2.4vw,28px)", lineHeight: 1.15, letterSpacing: "-.02em", color: C.cream, marginTop: 20, maxWidth: 420 }}>
              The systems I used, packaged.
            </p>
          </div>
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.6, color: C.peachSoft, margin: 0 }}>
              For the person doing the job without the department. Each toolkit is a short plain-language guide, the working files I actually used, and the word-for-word scripts for the conversations that matter. Nothing theoretical: what I did, what worked, and where I got it wrong.
            </p>
            <Includes items={TOOLKITS_INCLUDES} color={C.peachSoft} rule="rgba(240,220,210,0.25)" />
            <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", color: C.peach, marginTop: 22 }}>From $39, or all three in the bundle.</div>
            <Link href="/toolkits" style={{ display: "inline-block", background: C.peri, color: C.ox, fontFamily: SANS, fontSize: 16, lineHeight: 1, padding: "16px 34px", borderRadius: 40, marginTop: 16 }} className="transition-opacity hover:opacity-90">
              Browse the Toolkits &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* which one — a quiet steer */}
      <div className={`${PAD} py-[clamp(48px,7vw,80px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[760px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.terra }}>Not sure which?</div>
          <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.18, letterSpacing: "-.02em", color: C.ox, marginTop: 16 }}>
            If you want it built with you, around your season, start with Narratives. If you&rsquo;d rather start tonight with a proven system, start with the Toolkits.
          </p>
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
