import Link from "next/link";
import { Nav, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";

const MOVES: [string, string, string][] = [
  ["01", "A rebrand with a spine", "A confident new visual identity and voice, built so a 47-year-old institution could feel current without losing its gravity."],
  ["02", "Storytelling, not announcements", "Every season, show, and campaign reframed around a single question: why should anyone care? Film, social, and print all answered it together."],
  ["03", "Audiences first", "Marketing engineered to convert curiosity into first-time attendance, and first-timers into the people who come back."],
];

const STATS: [string, string, string][] = [
  ["+101%", "First-time attendance", "≈473 vs. 235 before"],
  ["+27%", "Revenue per show", "$107k vs. $85k"],
  ["+35%", "Annual giving", "+65% FY26 vs. FY23"],
  ["+178%", "Rossini Festival", "the city's free street festival"],
];

export function KnoxvilleOperaRedesign() {
  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Work" />

      {/* masthead — cream */}
      <div className={`${PAD} pb-[clamp(48px,7vw,80px)] pt-[clamp(24px,3vw,40px)]`}>
        <div className="mx-auto max-w-[1180px]">
          <Link href="/portfolio" style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }} className="transition-opacity hover:opacity-60">
            ← Work
          </Link>
          <div className="mt-8 grid items-center gap-[clamp(36px,5vw,64px)] md:grid-cols-[1fr_420px]">
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>Case study · Brand & Campaign</div>
              <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.92, letterSpacing: "-.035em", color: C.ox, marginTop: 16 }}>
                Knoxville Opera<span style={{ color: C.terra }}>.</span>
              </h1>
              <p style={{ fontSize: "clamp(17px,2vw,20px)", lineHeight: 1.65, color: C.ox, marginTop: 20, maxWidth: 540 }}>
                Reimagining a 47-year-old opera company for a new generation, and proving that the right story moves real numbers.
              </p>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/work/work-featured.jpg" alt="Knoxville Opera on stage" className="block w-full object-cover" style={{ height: "clamp(300px,42vw,400px)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Act I · the challenge — terracotta */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.terra }}>
        <div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(36px,5vw,72px)] md:grid-cols-[1.25fr_1fr]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.cream }}>Act I · The challenge</div>
            <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(30px,4vw,44px)", lineHeight: 1.1, letterSpacing: "-.02em", color: C.ox, marginTop: 16, maxWidth: 660 }}>
              A beloved institution with deep roots, and an audience that wasn&rsquo;t growing. The work was excellent. The problem was that not enough new people knew why it mattered.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: C.ox, marginTop: 20, maxWidth: 560 }}>
              Opera carries a reputation for being formal, expensive, and for someone else. To reach a new generation, Knoxville Opera needed more than better ads. It needed a brand and a story confident enough to make the art feel like an invitation.
            </p>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/build-knoxville.jpg" alt="A Knoxville Opera production on stage" className="block w-full object-cover" style={{ height: "clamp(300px,40vw,420px)", objectPosition: "42% 42%" }} />
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.cream, marginTop: 12 }}>on stage · the work was never the problem</div>
          </div>
        </div>
      </div>

      {/* Act II · what we did — cream, periwinkle cards */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>Act II · What we did</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,56px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.98, marginTop: 14, maxWidth: 720 }}>
            Three moves that changed the trajectory.
          </div>
          <div className="mt-10 grid gap-[22px] md:grid-cols-3">
            {MOVES.map(([n, t, b]) => (
              <div key={n} style={{ background: C.peri, padding: 32 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(36px,4vw,44px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.ox, marginTop: 14 }}>{t}</div>
                <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox, marginTop: 8 }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Act III · the impact — oxblood */}
      <div className={`${PAD} py-[clamp(64px,10vw,110px)]`} style={{ background: C.ox }}>
        <div className="mx-auto grid max-w-[1180px] items-center gap-[clamp(36px,5vw,72px)] md:grid-cols-[1.4fr_1fr]">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.peach }}>Act III · The impact</div>
            <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,3.4vw,42px)", lineHeight: 1.16, letterSpacing: "-.02em", color: C.cream, marginTop: 18, maxWidth: 720 }}>
              A bold rebrand and sharper storytelling doubled first-time attendance and grew revenue per show 27%, and <span style={{ fontStyle: "italic", color: C.peri }}>La Bohème</span> became the best-selling production in company history.
            </p>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/on/on-stage.jpg" alt="A Knoxville Opera season being filmed on the Tennessee Theatre stage" className="block w-full object-cover" style={{ height: "clamp(240px,32vw,300px)" }} />
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.peach, marginTop: 12 }}>media day · on the Tennessee Theatre stage</div>
          </div>
        </div>
      </div>

      {/* by the numbers — periwinkle */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,50px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95 }}>By the numbers</div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox }}>FY26 vs. FY23</div>
          </div>
          <div className="mt-10 grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(([v, l, d]) => (
              <div key={l} style={{ borderTop: `2px solid ${C.ox}`, paddingTop: 18 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,5.4vw,64px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox, marginTop: 14 }}>{l}</div>
                <div style={{ fontStyle: "italic", fontSize: 15, color: C.ox, opacity: 0.8, marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* takeaway — cream */}
      <div className={`${PAD} py-[clamp(72px,11vw,110px)] text-center`} style={{ background: C.cream }}>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: C.terra }}>The takeaway</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(30px,4.4vw,52px)", lineHeight: 1.06, letterSpacing: "-.025em", color: C.ox, maxWidth: 820, margin: "20px auto 0" }}>
          Great organizations are built on <span style={{ color: C.terra }}>stories people believe in.</span>
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
