import Link from "next/link";
import { Nav, GiantTitle, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";

const STEPS: [string, string, string][] = [
  ["01", "Understand the season", "What you're producing, who you want to reach, what your audience already understands, and where the friction actually is."],
  ["02", "Find the story", "The Narratives framework locates the emotional entry point, the world, the audience bridge, the momentum, and the invitation."],
  ["03", "Build what the team needs", "The strategy becomes the plans, creative direction, messaging, and tools that will actually help you execute the season."],
];

const MOVES: [string, string, string][] = [
  ["01 · Spark", "Why should anyone care?", "The human truth at the center of the work, and the reason it matters to someone who has never heard of it."],
  ["02 · World", "What are we inviting people into?", "The atmosphere and cultural register of the production, treated as a world to inhabit rather than a program to attend."],
  ["03 · Bridge", "How do we make people feel included?", "The invisible thresholds come down. Language, ritual, expectation: the things that quietly keep newcomers at a distance."],
  ["04 · Arc", "How does momentum build?", "The months and the minutes before curtain, shaped so the audience feels carried rather than marketed to."],
  ["05 · Invitation", "Why does this matter right now?", "The reason this work exists in this season, in this city, in this cultural moment."],
];

const DELIVERABLES: [string, string, string][] = [
  ["01 · The diagnostic", "Audience & friction audit", "Where people are getting stuck, what barriers are shaping behavior, and where the clearest opportunities are."],
  ["02 · The emotional center", "Narrative strategy", "The emotional center of the season, and the story that connects the work to the audience."],
  ["03 · The atmosphere", "Visual world brief", "The atmosphere, aesthetic direction, tone, and creative world the campaign should live in."],
  ["04 · The rhythm", "Momentum map", "How the season builds over time, including campaign rhythm, audience onboarding, urgency, and return invitations."],
  ["05 · The fuel", "Budget strategy", "Where marketing resources should work hardest, and what deserves priority, amplification, or restraint."],
];

const ISNT: [string, string, string][] = [
  ["What it isn't · i", "Not dumbing anything down.", "It removes thresholds, not depth."],
  ["What it isn't · ii", "Not a content mill.", "Volume isn't the point. The right emotional entry point is."],
  ["What it isn't · iii", "Not apologizing for opera.", "Irreverent about the framing, never about the work."],
];

const WHOFOR: [string, string][] = [
  ["Marketing directors", "Carrying an entire season on a team of one or two. Not short on ideas. Short on hours, and on a system."],
  ["Executive directors", "Repositioning an organization for a new audience, a new civic relationship, or a new era."],
  ["Producers", "Connecting what happens on the stage to what happens in the room, and in the city."],
  ["Artistic leaders", "Shaping how the audience and the artist actually meet."],
];

const ENGAGEMENT: [string, string][] = [
  ["Built around your season", "Designed around the specific repertoire, audience, team, and challenges in front of you."],
  ["Core strategy, tailored output", "Every engagement uses the Narratives framework, but the final tools and scope are shaped around what your organization actually needs."],
  ["Collaborative, not meeting heavy", "You provide the season context, the goals, the audience information, and the constraints. I do the strategic build."],
  ["Timing", "Every engagement starts with a defined scope and delivery date, so both sides know what's due and when. The timeline scales with the size of the work."],
];

export function NarrativesRedesign() {
  return (
    <Shell ground="terra">
      <Nav ground="terra" active="Narratives" />
      <GiantTitle ground="terra" size="min(15vw,178px)">Narratives</GiantTitle>

      {/* hero — terracotta */}
      <div className={`${PAD} pb-[clamp(56px,9vw,90px)] pt-[clamp(48px,6vw,64px)] text-center`}>
        <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: C.cream }}>✦ A Narratives production</div>
        <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,6vw,60px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, maxWidth: 880, margin: "26px auto 0" }}>
          Story strategy for the performing arts.
        </h1>
        <div style={{ fontSize: 20, fontStyle: "italic", color: C.cream, marginTop: 22 }}>Turn a season into something audiences want to step inside.</div>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: C.ox, maxWidth: 600, margin: "18px auto 0" }}>
          Narratives gives small arts teams the story strategy and campaign plan they don&rsquo;t have the hours to build from scratch. One season, written for your organization.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-[18px] gap-y-3">
          <Link href="/contact" style={{ fontFamily: SANS, fontSize: 15, color: C.ox, background: C.peri, padding: "14px 30px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
            Build my season plan →
          </Link>
          <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.cream }}>A campaign method · Katie Spencer</span>
        </div>
      </div>

      {/* Act I — cream */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,64px)] md:grid-cols-[1fr_380px]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>Act I · Why Narratives exists</div>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,4.6vw,46px)", lineHeight: 1.02, letterSpacing: "-.02em", color: C.ox, marginTop: 16 }}>
              Most arts marketing markets information.
            </h2>
            <div className="mt-5 flex max-w-[560px] flex-col gap-4" style={{ fontSize: 17, lineHeight: 1.65, color: C.ox }}>
              <p>Dates, casts, ticket links, artistic bios, an evening of. It is marketing aimed at people who already know they want to come.</p>
              <p>Some people stay away not because they dislike the art, but because they aren&rsquo;t sure they&rsquo;d know how to belong there. Almost nobody in the field says that out loud, so we keep making prettier posters.</p>
            </div>
            <div className="mt-7 max-w-[560px]" style={{ background: C.ox, padding: 28 }}>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: C.peach }}>The belief</div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, lineHeight: 1.15, color: C.cream, marginTop: 10 }}>Lower the social friction without lowering the art.</div>
              <div style={{ fontSize: 16, lineHeight: 1.55, color: C.peachSoft, marginTop: 10 }}>People engage once they feel confident enough to. And nobody connects to information first. They connect to feeling.</div>
            </div>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/on/in-rehearsal.jpg" alt="Katie leading a rehearsal room" className="block w-full object-cover" style={{ height: "clamp(280px,38vw,320px)" }} />
            <div className="mt-[22px]" style={{ background: C.peri, padding: 28 }}>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: C.ox }}>What that hesitation actually sounds like</div>
              <div style={{ fontSize: 16, lineHeight: 1.9, color: C.ox, marginTop: 12 }}>
                Not understanding the work.<br />Not knowing the etiquette, or the context.<br />Feeling culturally out of place.<br />Worrying they won&rsquo;t get it.<br />Not knowing what to expect.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* stats band — oxblood */}
      <div className={`${PAD} py-[clamp(44px,6vw,56px)]`} style={{ background: C.ox }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.peri, lineHeight: 1.5 }}>✦ Already tested<br />Knoxville Opera</div>
          {[["+101%", "first-time attendance / show"], ["+27%", "revenue per show"], ["#1", "La Bohème, best-seller in company history"]].map(([v, l]) => (
            <div key={v} style={{ maxWidth: 220 }}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,5vw,56px)", letterSpacing: "-.03em", color: C.cream, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 15, color: C.peach, marginTop: 4 }}>{l}</div>
            </div>
          ))}
          <Link href="/knoxville-opera" style={{ fontStyle: "italic", fontSize: 16, color: C.peri }}>See the case study →</Link>
        </div>
      </div>

      {/* three steps — periwinkle */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.ox }}>Act II · How it works</div>
          <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,56px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95 }}>Three steps, one season.</div>
            <div style={{ fontStyle: "italic", fontSize: 17, color: C.ox }}>what the work looks like from your side</div>
          </div>
          <div className="mt-10 grid gap-[22px] md:grid-cols-3">
            {STEPS.map(([n, t, b]) => (
              <div key={n} style={{ background: C.cream, padding: 32 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 14, color: C.terra }}>{n}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.ox, marginTop: 10 }}>{t}</div>
                <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox, marginTop: 8 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* five movements — cream */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>✦ The method ✦</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,56px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95, marginTop: 14 }}>Five movements, one experience.</div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.ox, maxWidth: 620, marginTop: 16 }}>The three steps are the process. These five movements shape the thinking underneath it. Nothing gets written until every one is answered.</p>
          <div className="mt-10">
            {MOVES.map(([label, q, body], i, arr) => (
              <div key={label} className="grid grid-cols-1 items-baseline gap-x-6 gap-y-2 py-[22px] md:grid-cols-[150px_340px_1fr]" style={{ borderTop: `1.5px solid ${C.ox}`, borderBottom: i === arr.length - 1 ? `1.5px solid ${C.ox}` : undefined }}>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }}>{label}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.ox }}>{q}</div>
                <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* deliverables — terracotta */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.terra }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.cream }}>Act III · The core deliverables</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,56px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95, marginTop: 14 }}>A framework, not a formula.</div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.ox, maxWidth: 640, marginTop: 16 }}>Every Narratives engagement is built around a core set of strategic deliverables, then shaped to the needs of your season, team, and audience.</p>
          <div className="mt-10 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-5">
            {DELIVERABLES.map(([label, t, b]) => (
              <div key={label} style={{ background: C.cream, padding: 26 }}>
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }}>{label}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 19, lineHeight: 1.1, color: C.ox, marginTop: 10 }}>{t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: C.ox, marginTop: 8 }}>{b}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 16, fontStyle: "italic", lineHeight: 1.6, color: C.ox, maxWidth: 760, marginTop: 28 }}>Depending on the organization, the package may also include campaign messaging, production concepts, content direction, audience guides, or launch plans: whatever it takes to make the strategy usable.</p>
        </div>
      </div>

      {/* example — cream */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,64px)] md:grid-cols-[1fr_420px]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>An example · Knoxville Opera</div>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,4.6vw,46px)", lineHeight: 1.02, letterSpacing: "-.02em", color: C.ox, marginTop: 16 }}>One season strategy, start to finish.</h2>
            <div style={{ fontSize: 16, fontStyle: "italic", color: C.ox, marginTop: 14 }}>Not a preview of what yours will look like, but a sense of how far the thinking goes.</div>
            <div className="mt-5 flex max-w-[560px] flex-col gap-4" style={{ fontSize: 17, lineHeight: 1.65, color: C.ox }}>
              <p>Gianni Schicchi is a one-act comedy about a family scheming over a will. A hard sell to anyone who&rsquo;s never bought an opera ticket. So the campaign didn&rsquo;t sell the opera. The synopsis became a lunch between friends. The characters gave reality-TV confessionals, in costume. The people who made it sat down for a Behind the Music conversation, for anyone who wanted to go deeper.</p>
              <p>Underneath sat the whole package: the audit, the narrative strategy, the visual world, the momentum map, the budget, and copy written for the production itself. Then the unglamorous half that makes it real: the shot list, the cast and crew list, the hour-by-hour media day schedule, and a dated posting plan across social, email, and YouTube.</p>
              <p style={{ fontFamily: SANS, fontWeight: 700, color: C.terra }}>The strategy doesn&rsquo;t stop at language. It gets made.</p>
            </div>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/katie-onstage.jpg" alt="A season media day inside the Tennessee Theatre" className="block w-full object-cover" style={{ height: "clamp(320px,42vw,380px)" }} />
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 12 }}>Knoxville Opera · the campaign, in the house</div>
            <div className="mt-6" style={{ borderTop: `1.5px solid ${C.ox}` }}>
              {[["Girls Lunch", "reel, synopsis →", "0Ap9-34BuAI"], ["Confession: Simone", "character series →", "Y4kyen1P47k"], ["Behind the Music", "film →", "ZqJPkheBt-4"]].map(([t, k, id]) => (
                <a key={t} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between gap-3 py-3.5 transition-opacity hover:opacity-70" style={{ borderBottom: `1.5px solid ${C.ox}`, fontSize: 16, color: C.ox }}>
                  <span>{t}</span>
                  <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, whiteSpace: "nowrap" }}>{k}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* why me — oxblood */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.peach }}>Why me</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,4.6vw,46px)", lineHeight: 1.02, letterSpacing: "-.02em", color: C.cream, marginTop: 16, maxWidth: 900 }}>
            This isn&rsquo;t theory turned into a product. It&rsquo;s a working practice written down.
          </h2>
          <div className="mt-5 flex max-w-[680px] flex-col gap-4" style={{ fontSize: 17, lineHeight: 1.65, color: C.peachSoft }}>
            <p>Years inside performing arts administration: running the marketing, casting the shoots, arguing about the poster, and watching what actually moved first-time ticket buyers. The method came out of that work, not from outside the field looking in.</p>
            <p>Anyone can generate arts marketing copy now. Almost nobody selling into this field has sat inside the season and watched what makes a newcomer decide to come.</p>
          </div>
          <div className="mt-10 grid gap-[22px] md:grid-cols-3">
            {ISNT.map(([label, t, b]) => (
              <div key={label} style={{ border: `1.5px solid ${C.peach}`, padding: 26 }}>
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.peri }}>{label}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.cream, marginTop: 10 }}>{t}</div>
                <div style={{ fontSize: 15, color: C.peachSoft, marginTop: 6 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* who it's for — periwinkle */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.ox }}>Who it's for</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(36px,5vw,50px)", letterSpacing: "-.025em", color: C.ox, lineHeight: 1, marginTop: 14, maxWidth: 860 }}>
            The strategy layer between the art and the audience.
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.ox, maxWidth: 660, marginTop: 16 }}>Small and mid-size regional opera, symphony, ballet, theatre, and festival organizations. Real seasons, real repertoire, and not enough internal capacity to build the full story from scratch.</p>
          <div className="mt-10 grid gap-[22px] md:grid-cols-2">
            {WHOFOR.map(([t, b]) => (
              <div key={t} style={{ background: C.cream, padding: 28 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.ox }}>{t}</div>
                <div style={{ fontSize: 16, lineHeight: 1.5, color: C.ox, marginTop: 6 }}>{b}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 19, fontStyle: "italic", color: C.ox, marginTop: 32, textAlign: "center" }}>But the person it&rsquo;s really for is the one who has never been, and quietly assumes it isn&rsquo;t for them.</div>
        </div>
      </div>

      {/* engagement details — cream */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,4.4vw,44px)", letterSpacing: "-.025em", color: C.ox, lineHeight: 1 }}>Engagement details</div>
            <div style={{ fontStyle: "italic", fontSize: 17, color: C.ox }}>what working together looks like</div>
          </div>
          <div className="mt-8 grid gap-x-[56px] md:grid-cols-2">
            {ENGAGEMENT.map(([k, b]) => (
              <div key={k} className="py-[22px]" style={{ borderTop: `1.5px solid ${C.ox}` }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: C.ox }}>{k}</div>
                <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox, marginTop: 6 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
