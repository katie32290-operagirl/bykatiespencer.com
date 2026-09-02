import Link from "next/link";
import { Nav, GiantTitle, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";

const CHAPTERS: [string, string, string, React.ReactNode, string | null][] = [
  ["Chapter I", "Opera & Performance", "The stage.", "Years performing opera taught me the lesson behind everything I build: a story doesn't just inform people, it moves them. Performance is where I first felt how a story takes hold, in a room, in a body, in a single held note.", null],
  ["Chapter II", "City Lyric Opera", "The leap.", "Co-founding a company from nothing taught me you build the thing before anyone is sure of it. I learned to gather people around an idea before it fully existed, and found I loved creating the vessel as much as performing inside it.", null],
  ["Chapter III", "Knoxville Opera", "Growing an institution.", "Leading fundraising and marketing taught me that strategy only works when a story carries it. People don't invest in budgets or buy tickets to logistics, they give themselves to a narrative they want to belong to.", null],
  [
    "Chapter IV",
    "Now building",
    "Building the future.",
    <>
      Building software taught me the work has to scale. GreenRoom turns hard-won lessons about arts organizations into tools they use every day, the infrastructure a story needs to keep being told. Alongside it I&rsquo;m building{" "}
      <Link href="/narratives" style={{ fontStyle: "italic", color: C.ox, textDecoration: "underline" }}>Narratives</Link>, which brings story strategy to the marketing teams inside performing arts organizations. Two companies, one field, opposite ends of the same problem.
    </>,
    "The venture · GreenRoom  •  Status · Launching 2026  •  greenroomcrm.com →",
  ],
  ["Chapter V", "Still being written", "What's next.", "Now I'm exploring how technology and story shape each other, across writing, speaking, and projects still taking form. Every chapter taught me the same thing: the medium keeps changing, but the work doesn't.", null],
];

export function AboutRedesign() {
  return (
    <Shell ground="cream">
      <Nav ground="cream" active="About" />
      <GiantTitle ground="cream" size="min(21vw,250px)">About</GiantTitle>

      {/* hero */}
      <div className={`${PAD} pb-[clamp(56px,9vw,90px)] pt-[clamp(48px,6vw,64px)] text-center`}>
        <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: C.terra }}>
          About · off book
        </div>
        <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,6vw,64px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, maxWidth: 820, margin: "26px auto 0" }}>
          Different rooms, one throughline.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: C.ox, maxWidth: 620, margin: "28px auto 0" }}>
          I&rsquo;ve performed on opera stages, co-founded a company, helped lead an institution, and now I&rsquo;m building software. The work looks different every time. The instinct underneath it doesn&rsquo;t.
        </p>
      </div>

      {/* my story — terracotta */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.terra }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,64px)] md:grid-cols-[1fr_380px]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.cream }}>My story</div>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,4.6vw,46px)", lineHeight: 1.02, letterSpacing: "-.02em", color: C.ox, marginTop: 16 }}>
              From the stage. To strategy. To building something of my own.
            </h2>
            <div className="mt-6 flex max-w-[560px] flex-col gap-4" style={{ fontSize: 17, lineHeight: 1.65, color: C.ox }}>
              <p>About a decade ago, I made a decision that changed the course of my career.</p>
              <p>I stepped away from pursuing opera full-time and co-founded City Lyric Opera in New York City. It was my first experience building something from the ground up, and it completely changed how I thought about leadership, creativity, and the arts.</p>
              <p>I&rsquo;d spent years preparing for a career on stage, earning my Master&rsquo;s in Vocal Performance from the Manhattan School of Music. But co-founding City Lyric revealed something I hadn&rsquo;t expected.</p>
              <p>I was even more fulfilled bringing talented people together around a shared vision than I was standing in the spotlight myself. I loved building the team, shaping the experience, and asking the bigger questions that determine whether an organization truly connects. That curiosity never left me.</p>
            </div>
          </div>
          <div className="flex flex-col gap-[22px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-leap.jpg" alt="City Lyric Opera" className="block w-full object-cover" style={{ height: "clamp(300px,40vw,340px)" }} />
            <div style={{ background: C.cream, padding: 28 }}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, lineHeight: 1.15, color: C.ox }}>
                The best organizations aren&rsquo;t defined by the size of their budget. They&rsquo;re defined by clarity.
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: C.ox, marginTop: 12 }}>
                They know who they are, why they exist, and how to invite people into a mission worth joining. Over the past decade, that idea has carried me from the rehearsal hall to the boardroom, from marketing campaigns to fundraising strategy, from nonprofit leadership to entrepreneurship.
              </div>
              <div style={{ fontStyle: "italic", fontSize: 15, color: C.terra, marginTop: 12 }}>It still sits at the center of everything I do.</div>
            </div>
          </div>
        </div>
      </div>

      {/* five chapters — periwinkle */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto grid max-w-[1180px] gap-[clamp(28px,4vw,56px)] md:grid-cols-[320px_1fr]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.ox }}>Five chapters</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,60px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95, marginTop: 14 }}>
              The moments that shaped how I build.
            </div>
          </div>
          <div>
            {CHAPTERS.map(([label, sub, title, body, meta], i, arr) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-x-5 gap-y-3 py-6 md:grid-cols-[120px_1fr]"
                style={{ borderTop: `1.5px solid ${C.ox}`, borderBottom: i === arr.length - 1 ? `1.5px solid ${C.ox}` : undefined }}
              >
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox, lineHeight: 1.5 }}>
                  {label}<br />{sub}
                </div>
                <div>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.ox }}>{title}</div>
                  <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox, marginTop: 6 }}>{body}</div>
                  {meta && (
                    <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 10 }}>{meta}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* intermission — cream */}
      <div className={`${PAD} py-[clamp(72px,11vw,100px)] text-center`} style={{ background: C.cream }}>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: C.terra }}>✦ Intermission ✦</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px,4vw,38px)", lineHeight: 1.15, letterSpacing: "-.02em", color: C.ox, maxWidth: 860, margin: "24px auto 0" }}>
          Outside of my work, I&rsquo;m a wife, a mom of two daughters, a lifelong creative, and someone whose faith shapes both my life and my leadership.
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.6, fontStyle: "italic", color: C.ox, maxWidth: 640, margin: "20px auto 0" }}>
          My career has worn many titles: performer, founder, nonprofit leader, entrepreneur. But they&rsquo;ve always been expressions of the same calling: storyteller.
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
