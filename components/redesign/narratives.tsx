import Link from "next/link";
import { Nav, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";

/** Muted terracotta for secondary copy (design-system slate). */
const SLATE = "#A4574a";

const STEPS: [string, string, string][] = [
  ["01", "Understand the season", "What you're producing, who you want to reach, what your audience already understands, and where the friction actually is."],
  ["02", "Find the story", "The Narratives framework locates the emotional entry point, the world, the audience bridge, the momentum, and the invitation."],
  ["03", "Build what the team needs", "The strategy becomes the plans, creative direction, messaging, and tools that will actually help you execute the season."],
];

const MOVES: [string, string, string][] = [
  ["Spark", "Why should anyone care?", "The human truth at the center of the work, and the reason it matters to someone who has never heard of it."],
  ["World", "What are we inviting people into?", "The atmosphere and cultural register of the production, treated as a world to inhabit rather than a program to attend."],
  ["Bridge", "How do we make people feel included?", "The invisible thresholds come down. Language, ritual, expectation: the things that quietly keep newcomers at a distance."],
  ["Arc", "How does momentum build?", "The months and the minutes before curtain, shaped so the audience feels carried rather than marketed to."],
  ["Invitation", "Why does this matter right now?", "The reason this work exists in this season, in this city, in this cultural moment."],
];

const DELIVERABLES: [string, string, string][] = [
  ["01 · The diagnostic", "Audience & friction audit", "Where people are getting stuck, what barriers are shaping behavior, and where the clearest opportunities are."],
  ["02 · The emotional center", "Narrative strategy", "The emotional center of the season, and the story that connects the work to the audience."],
  ["03 · The atmosphere", "Visual world brief", "The atmosphere, aesthetic direction, tone, and creative world the campaign should live in."],
  ["04 · The rhythm", "Momentum map", "How the season builds over time, including campaign rhythm, audience onboarding, urgency, and return invitations."],
  ["05 · The fuel", "Budget strategy", "Where marketing resources should work hardest, and what deserves priority, amplification, or restraint."],
];

const HESITATION = [
  "Not understanding the work.",
  "Not knowing the etiquette, or the context.",
  "Feeling culturally out of place.",
  "Worrying they won't get it.",
  "Not knowing what to expect.",
];

const REELS: [string, string, string][] = [
  ["Girls Lunch", "Reel, the synopsis →", "0Ap9-34BuAI"],
  ["Confession: Simone", "Character series →", "Y4kyen1P47k"],
  ["Behind the Music", "Film →", "ZqJPkheBt-4"],
];

const ISNT: [string, string][] = [
  ["Not dumbing anything down.", "It removes thresholds, not depth."],
  ["Not a content mill.", "Volume isn't the point. The right emotional entry point is."],
  ["Not apologizing for opera.", "Irreverent about the framing, never about the work."],
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

const eyebrow = (color: string, wide = false): React.CSSProperties => ({
  fontFamily: SANS,
  fontSize: wide ? 13 : 12,
  letterSpacing: wide ? ".26em" : ".16em",
  textTransform: "uppercase",
  color,
});
const cellPad = (i: number) => ({ padding: i === 0 ? "26px 24px 26px 0" : "26px 24px", borderLeft: i === 0 ? undefined : `1.5px solid ${C.ox}` });
const GRID = (min: number) => ({ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))` });

export function NarrativesRedesign() {
  return (
    <Shell ground="terra">
      <Nav ground="terra" active="Narratives" />

      {/* header — orange, seamless with the nav */}
      <header className={`${PAD} pb-[clamp(44px,6vw,72px)] pt-[clamp(24px,3vw,40px)]`} style={{ background: C.terra }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.cream, true), marginBottom: 22 }}>A Narratives production</div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(62px,13.2vw,169px)", lineHeight: 0.82, letterSpacing: "-.045em", margin: 0, color: C.ox }}>
            Narratives<span style={{ color: C.cream }}>.</span>
          </h1>
          <div className="mt-[clamp(32px,4vw,54px)] grid items-start gap-[clamp(28px,5vw,72px)]" style={GRID(300)}>
            <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,2.8vw,36px)", lineHeight: 1.14, letterSpacing: "-.03em", margin: 0, color: C.ox, maxWidth: 480 }}>
              Story strategy for the performing arts. Turn a season into something audiences want to step inside.
            </p>
            <div style={{ maxWidth: 620 }}>
              <p style={{ margin: "0 0 26px", fontFamily: SERIF, fontSize: 20, lineHeight: 1.6, color: C.cream }}>
                Narratives gives small arts teams the story strategy and campaign plan they don&rsquo;t have the hours to build from scratch. One season, written for your organization.
              </p>
              <Link href="/contact" style={{ display: "inline-block", background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 17, lineHeight: 1, padding: "18px 40px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
                Build my season plan →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* full-bleed — backstage before curtain */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/work/editorial-backstage.jpg" alt="Backstage before curtain" style={{ width: "100%", height: "clamp(280px,46vw,620px)", objectFit: "cover", display: "block" }} />

      {/* Act I — cream */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.terra), marginBottom: 20 }}>Act I · Why Narratives exists</div>
          <div className="grid items-start gap-[clamp(30px,5vw,70px)]" style={GRID(320)}>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-.03em", margin: 0, color: C.ox, maxWidth: 520 }}>
              Most arts marketing markets information.
            </h2>
            <div className="flex flex-col gap-[18px]" style={{ maxWidth: 640, fontFamily: SERIF, fontSize: 17, lineHeight: 1.62, color: C.ox }}>
              <p style={{ margin: 0 }}>Dates, casts, ticket links, artistic bios, an evening of. It is marketing aimed at people who already know they want to come.</p>
              <p style={{ margin: 0 }}>Some people stay away not because they dislike the art, but because they aren&rsquo;t sure they&rsquo;d know how to belong there. Almost nobody in the field says that out loud, so we keep making prettier posters.</p>
            </div>
          </div>
          <div className="mt-[clamp(36px,5vw,60px)] grid gap-[clamp(24px,4vw,60px)]" style={{ ...GRID(260), borderTop: `1.5px solid ${C.ox}`, paddingTop: 26 }}>
            <div style={eyebrow(C.terra)}>The belief</div>
            <div className="min-w-0 md:col-span-2">
              <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,3.2vw,42px)", lineHeight: 1.08, letterSpacing: "-.03em", margin: "0 0 16px", color: C.ox, maxWidth: 700 }}>
                Lower the social friction without lowering the art.
              </p>
              <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: 17, lineHeight: 1.62, color: SLATE, maxWidth: 560 }}>
                People engage once they feel confident enough to. And nobody connects to information first. They connect to feeling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* what that hesitation sounds like — oxblood */}
      <section className={`${PAD} py-[clamp(52px,8vw,110px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.peach, true), marginBottom: 34 }}>What that hesitation actually sounds like</div>
          <div className="flex flex-col gap-[clamp(14px,2vw,22px)]" style={{ maxWidth: 900 }}>
            {HESITATION.map((line) => (
              <p key={line} style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(24px,3.4vw,44px)", lineHeight: 1.14, color: C.cream }}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* stats — orange */}
      <section className={`${PAD} py-[clamp(48px,7vw,96px)]`} style={{ background: C.terra, color: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[clamp(30px,4vw,52px)] flex items-center gap-3.5">
            <span style={eyebrow(C.ox)}>Already tested · Knoxville Opera, four seasons (FY23&ndash;FY26)</span>
            <span style={{ flex: 1, height: 1.5, background: C.ox }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.cream }} />
          </div>
          <div className="grid gap-[clamp(28px,4vw,48px)]" style={GRID(240)}>
            {([
              ["+101%", "First-time attendance per show.", null],
              ["+27%", "Revenue per show.", null],
              ["#1", "the best-seller in company history.", "La Bohème, "],
            ] as [string, string, string | null][]).map(([n, label, lead]) => (
              <div key={n}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(64px,10vw,138px)", lineHeight: 0.8, letterSpacing: "-.045em" }}>{n}</div>
                <div style={{ marginTop: 14, fontFamily: SERIF, fontSize: 17, lineHeight: 1.5, maxWidth: 260 }}>{lead && <em>{lead}</em>}{label}</div>
              </div>
            ))}
          </div>
          <p style={{ margin: "clamp(22px,3vw,30px) 0 0", fontFamily: SERIF, fontSize: 16, lineHeight: 1.5, maxWidth: 640 }}>
            Achieved with a small in-house team, which is exactly the situation this service is built for.
          </p>
          <div className="mt-[clamp(30px,4vw,44px)]">
            <Link href="/knoxville-opera" style={{ display: "inline-block", background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 17, lineHeight: 1, padding: "18px 40px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
              See the case study →
            </Link>
          </div>
        </div>
      </section>

      {/* 2-up image band */}
      <div className="grid" style={GRID(320)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/mediaday-chair.jpg" alt="Katie watching a shot come together on a season media day" style={{ width: "100%", height: "clamp(240px,32vw,440px)", objectFit: "cover", objectPosition: "62% center", display: "block" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/on/in-rehearsal.jpg" alt="Katie leading a rehearsal room" style={{ width: "100%", height: "clamp(240px,32vw,440px)", objectFit: "cover", display: "block" }} />
      </div>

      {/* Act II — how it works, cream */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.terra), marginBottom: 18 }}>Act II · How it works</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-.03em", margin: "0 0 10px", color: C.ox }}>Three steps, one season.</h2>
          <p style={{ margin: "0 0 clamp(32px,4vw,52px)", fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: SLATE }}>What the work looks like from your side.</p>
          <div className="grid" style={{ ...GRID(260), borderTop: `1.5px solid ${C.ox}` }}>
            {STEPS.map(([n, t, b], i) => (
              <div key={n} style={{ padding: i === 0 ? "30px 26px 30px 0" : "30px 26px", borderLeft: i === 0 ? undefined : `1.5px solid ${C.ox}` }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing: "-.045em", color: C.terra, marginBottom: 14 }}>{n}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", color: C.ox, marginBottom: 10 }}>{t}</div>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.6, color: C.ox }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the method — periwinkle */}
      <section className={`${PAD} py-[clamp(48px,7vw,96px)]`} style={{ background: C.peri, color: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.ox, true), marginBottom: 18 }}>The method</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-.03em", margin: "0 0 14px" }}>Five movements, one experience.</h2>
          <p style={{ margin: "0 0 clamp(34px,4vw,56px)", fontFamily: SERIF, fontSize: 17, lineHeight: 1.6, maxWidth: 620 }}>The three steps are the process. These five movements shape the thinking underneath it. Nothing gets written until every one is answered.</p>
          <div className="flex flex-col">
            {MOVES.map(([name, q, body], i) => (
              <div key={name} className="grid items-baseline gap-x-[clamp(14px,3vw,40px)] gap-y-2 py-[26px]" style={{ ...GRID(260), borderTop: `1.5px solid ${C.ox}`, borderBottom: i === MOVES.length - 1 ? `1.5px solid ${C.ox}` : undefined }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1, letterSpacing: "-.03em" }}>{name}</div>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.25 }}>{q}</div>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 15, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act III — deliverables, cream */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.terra), marginBottom: 18 }}>Act III · The core deliverables</div>
          <div className="mb-[clamp(32px,4vw,50px)] grid items-start gap-[clamp(28px,4vw,64px)]" style={GRID(320)}>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-.03em", margin: 0, color: C.ox }}>A framework, not a formula.</h2>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.62, color: C.ox, maxWidth: 560 }}>Every Narratives engagement is built around a core set of strategic deliverables, then shaped to the needs of your season, team, and audience.</p>
          </div>
          <div className="grid" style={{ ...GRID(250), borderTop: `1.5px solid ${C.ox}` }}>
            {DELIVERABLES.map(([label, t, b], i) => (
              <div key={label} style={cellPad(i)}>
                <div style={{ ...eyebrow(C.terra), fontSize: 11, marginBottom: 12 }}>{label}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", color: C.ox, marginBottom: 8 }}>{t}</div>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: C.ox }}>{b}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: "26px 0 0", paddingTop: 22, borderTop: `1.5px solid ${C.ox}`, fontFamily: SERIF, fontStyle: "italic", fontSize: 17, lineHeight: 1.6, maxWidth: 760, color: SLATE }}>
            Depending on the organization, the package may also include campaign messaging, production concepts, content direction, audience guides, or launch plans: whatever it takes to make the strategy usable.
          </p>
        </div>
      </section>

      {/* an example — oxblood */}
      <section className={`${PAD} pb-[clamp(48px,6vw,80px)] pt-[clamp(48px,7vw,96px)]`} style={{ background: C.ox, color: C.peachSoft }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.peach), marginBottom: 18 }}>An example · Knoxville Opera</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,68px)", lineHeight: 1, letterSpacing: "-.03em", margin: "0 0 clamp(28px,4vw,44px)", color: C.cream, maxWidth: 900 }}>
            One season strategy, start to finish.
          </h2>
          <div className="grid items-start gap-[clamp(28px,4vw,64px)]" style={GRID(320)}>
            <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.2vw,28px)", lineHeight: 1.35, color: C.cream, maxWidth: 460 }}>
              Not a preview of what yours will look like, but a sense of how far the thinking goes.
            </p>
            <div className="flex flex-col gap-[18px]" style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.62, maxWidth: 620 }}>
              <p style={{ margin: 0, color: C.cream }}>Schicchi was the last campaign of my tenure, so it&rsquo;s the clearest look at the full method. The results above come from the four seasons before it.</p>
              <p style={{ margin: 0 }}><em>Gianni Schicchi</em> is a one-act comedy about a family scheming over a will. A hard sell to anyone who&rsquo;s never bought an opera ticket. So the campaign didn&rsquo;t sell the opera. The synopsis became a lunch between friends. The characters gave reality-TV confessionals, in costume. The people who made it sat down for a Behind the Music conversation, for anyone who wanted to go deeper.</p>
              <p style={{ margin: 0 }}>Underneath sat the whole package: the audit, the narrative strategy, the visual world, the momentum map, the budget, and copy written for the production itself. Then the unglamorous half that makes it real: the shot list, the cast and crew list, the hour-by-hour media day schedule, and a dated posting plan across social, email, and YouTube.</p>
              <p style={{ margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: 26, lineHeight: 1.15, letterSpacing: "-.02em", color: C.cream }}>The strategy doesn&rsquo;t stop at language. It gets made.</p>
            </div>
          </div>
          <div className="mt-[clamp(36px,5vw,60px)]">
            <div style={{ ...eyebrow(C.peach), fontSize: 11, paddingBottom: 16 }}>The campaign, in the house</div>
            {REELS.map(([t, k, id], i) => (
              <a key={t} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-5 transition-opacity hover:opacity-70" style={{ borderTop: `1.5px solid ${C.peach}`, borderBottom: i === REELS.length - 1 ? `1.5px solid ${C.peach}` : undefined, color: C.cream }}>
                <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: "-.02em" }}>{t}</span>
                <span style={{ ...eyebrow(C.peach), whiteSpace: "nowrap" }}>{k}</span>
              </a>
            ))}
          </div>
          <div className="mt-[clamp(36px,5vw,56px)]">
            <Link href="/contact" style={{ display: "inline-block", background: C.peri, color: C.ox, fontFamily: SANS, fontSize: 19, lineHeight: 1, padding: "20px 44px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
              Build my season plan →
            </Link>
          </div>
        </div>
      </section>

      {/* full-bleed — media day inside the Tennessee Theatre */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/work/katie-onstage.jpg" alt="A season media day inside the Tennessee Theatre" style={{ width: "100%", height: "clamp(260px,42vw,560px)", objectFit: "cover", display: "block" }} />

      {/* why me — cream */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.terra), marginBottom: 18 }}>Why me</div>
          <div className="grid items-start gap-[clamp(28px,4vw,56px)]" style={GRID(300)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/boheme-bts.jpg" alt="Behind the scenes on the La Bohème promo shoot" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", objectPosition: "60% center", display: "block" }} />
            <div className="flex min-w-0 flex-col gap-[22px]">
              <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(30px,3.8vw,50px)", lineHeight: 1.04, letterSpacing: "-.03em", margin: 0, color: C.ox, maxWidth: 600 }}>
                This isn&rsquo;t theory turned into a product. It&rsquo;s a working practice written down.
              </h2>
              <p style={{ margin: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.62, color: C.ox, maxWidth: 620 }}>Years inside performing arts administration: running the marketing, casting the shoots, arguing about the poster, and watching what actually moved first-time ticket buyers. The method came out of that work, not from outside the field looking in.</p>
              <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: 17, lineHeight: 1.62, color: SLATE, maxWidth: 620 }}>Anyone can generate arts marketing copy now. Almost nobody selling into this field has sat inside the season and watched what makes a newcomer decide to come.</p>
            </div>
          </div>
          <div className="mt-[clamp(36px,5vw,58px)]">
            <div style={{ ...eyebrow(C.terra), fontSize: 11, paddingBottom: 16 }}>What it isn&rsquo;t</div>
            {ISNT.map(([t, b], i) => (
              <div key={t} className="grid items-baseline gap-[clamp(16px,3vw,40px)] py-[22px]" style={{ ...GRID(260), borderTop: `1.5px solid ${C.ox}`, borderBottom: i === ISNT.length - 1 ? `1.5px solid ${C.ox}` : undefined }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(22px,2.4vw,30px)", letterSpacing: "-.02em", color: C.ox }}>{t}</div>
                <p style={{ margin: 0, minWidth: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.6, color: C.ox }} className="md:col-span-2">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* who it's for — periwinkle */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.peri, color: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.ox, true), marginBottom: 18 }}>Who it&rsquo;s for</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.02, letterSpacing: "-.03em", margin: "0 0 16px", maxWidth: 760 }}>
            The strategy layer between the art and the audience.
          </h2>
          <p style={{ margin: "0 0 clamp(32px,4vw,52px)", fontFamily: SERIF, fontSize: 17, lineHeight: 1.62, maxWidth: 640 }}>Small and mid-size regional opera, symphony, ballet, theatre, and festival organizations. Real seasons, real repertoire, and not enough internal capacity to build the full story from scratch.</p>
          <div className="grid" style={{ ...GRID(210), borderTop: `1.5px solid ${C.ox}` }}>
            {WHOFOR.map(([t, b], i) => (
              <div key={t} style={cellPad(i)}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: "-.02em", marginBottom: 8 }}>{t}</div>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 15, lineHeight: 1.6 }}>{b}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: "30px 0 0", paddingTop: 24, borderTop: `1.5px solid ${C.ox}`, fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.3vw,30px)", lineHeight: 1.3, maxWidth: 720 }}>
            But the person it&rsquo;s really for is the one who has never been, and quietly assumes it isn&rsquo;t for them.
          </p>
        </div>
      </section>

      {/* engagement details — cream */}
      <section className={`${PAD} py-[clamp(48px,7vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1240px]">
          <div style={{ ...eyebrow(C.terra), marginBottom: 8 }}>Engagement details</div>
          <p style={{ margin: "0 0 clamp(30px,4vw,48px)", fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: SLATE }}>What working together looks like.</p>
          <div className="grid" style={{ ...GRID(190), borderTop: `1.5px solid ${C.ox}`, borderBottom: `1.5px solid ${C.ox}` }}>
            {ENGAGEMENT.map(([t, b], i) => (
              <div key={t} style={{ padding: i === 0 ? "28px 26px 28px 0" : "28px 26px", borderLeft: i === 0 ? undefined : `1.5px solid ${C.ox}` }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", color: C.ox, marginBottom: 8 }}>{t}</div>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.6, color: C.ox }}>{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-[26px] flex flex-wrap items-baseline gap-x-2.5 gap-y-1" style={{ fontFamily: SERIF, fontSize: 18 }}>
            <span style={{ fontStyle: "italic", color: SLATE }}>Want to do it yourself?</span>
            <Link href="/toolkits" style={{ fontStyle: "italic", color: C.terra }} className="transition-opacity hover:opacity-70">Start with the toolkits →</Link>
          </div>
        </div>
      </section>

      {/* closing — orange */}
      <section className={`${PAD} py-[clamp(56px,9vw,120px)]`} style={{ background: C.terra, color: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(50px,10.5vw,140px)", lineHeight: 0.86, letterSpacing: "-.045em", margin: 0, maxWidth: "16ch" }}>
            Come find me after the show<span style={{ color: C.cream }}>.</span>
          </h2>
          <p style={{ margin: "clamp(28px,4vw,44px) 0 30px", fontFamily: SERIF, fontSize: "clamp(20px,2.2vw,28px)", lineHeight: 1.35, maxWidth: 640 }}>
            Have a story worth telling, a room worth gathering, or something interesting you&rsquo;re building?
          </p>
          <a href="mailto:hello@bykatiespencer.com" style={{ display: "inline-block", background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 19, lineHeight: 1, padding: "20px 44px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
            hello@bykatiespencer.com
          </a>
        </div>
      </section>

      <Footer />
    </Shell>
  );
}
