import Link from "next/link";
import { Nav, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";

const MOVES: [string, string, string][] = [
  ["01", "A rebrand with a spine", "A confident new visual identity and voice, built so a 47-year-old institution could feel current without losing its gravity."],
  ["02", "Storytelling, not announcements", "Every season, show, and campaign reframed around a single question: why should anyone care? Film, social, and print all answered it together."],
  ["03", "Audiences first", "Marketing engineered to convert curiosity into first-time attendance, and first-timers into the people who come back."],
];

const STATS: [string, string, string][] = [
  ["+101%", "First-time paid attendance", "≈473 vs. 235 before"],
  ["+27%", "Revenue per show", "$107k vs. $85k"],
  ["+35%", "Avg. annual giving", "+65% giving, FY26 year-to-date vs. FY23"],
  ["+178%", "Rossini Festival net", "the city's free street festival"],
];

/** Deeper record, all traceable to the impact one-pager. Excludes Gianni
 *  Schicchi (May 2026), still in its sales window when the data was pulled. */
const FACTS: [string, string][] = [
  ["9 productions · 18,374 seats", "$967,211 in ticket revenue and 4,256 first-time paid attendees across the four seasons. Excludes Gianni Schicchi (May 2026), still in its sales window."],
  ["5 of the all-time top 15", "Five of Knoxville Opera's all-time top-15 productions by tickets, and five by revenue, came from these four seasons, including #1 La Bohème, #2 The Barber of Seville, and #3 Carmen by all-time revenue."],
  ["584 → 1,191 donor records", "Donor records grew from 584 in FY23 to 1,191 in FY26 (year-to-date), up 104%."],
  ["23.4% Rossini net margin", "Against 8.6% before this tenure. FY25 net of $48,310 was the best in the 11-year audited window (FY15–FY25)."],
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
                Reimagining a 47-year-old opera company for a new generation, and proof that the right story, and the right team, moves real numbers.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.ox, marginTop: 16, maxWidth: 560, opacity: 0.85 }}>
                These results belong to a team I was lucky to work with. I led brand, marketing, and, from FY24, development, but the growth also happened because the artistic team put on great shows, alongside Knoxville Opera&rsquo;s staff, board, Rossini Festival volunteers, and the audiences who showed up.
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
              Together with the KO team, a bold rebrand and sharper storytelling doubled first-time attendance and grew revenue per show 27%, and <span style={{ fontStyle: "italic", color: C.peri }}>La Bohème</span> became the best-selling production in company history.
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
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox }}>Knoxville Opera · four seasons, FY23–FY26</div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: C.ox, marginTop: 12, maxWidth: 640, opacity: 0.85 }}>
            Tenure-wide results across four seasons, achieved with the Knoxville Opera team. Not the work of any single production.
          </p>
          <div className="mt-9 grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(([v, l, d]) => (
              <div key={l} style={{ borderTop: `2px solid ${C.ox}`, paddingTop: 18 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,5.4vw,64px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox, marginTop: 14 }}>{l}</div>
                <div style={{ fontStyle: "italic", fontSize: 15, color: C.ox, opacity: 0.8, marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-x-9 gap-y-8 sm:grid-cols-2">
            {FACTS.map(([t, b]) => (
              <div key={t} style={{ borderTop: `1.5px solid ${C.ox}`, paddingTop: 16 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: "-.02em", color: C.ox }}>{t}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: C.ox, marginTop: 6 }}>{b}</div>
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

      {/* sources — small print */}
      <div className={`${PAD} pb-[clamp(36px,6vw,64px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <p style={{ fontFamily: SANS, fontSize: 11, lineHeight: 1.65, letterSpacing: ".02em", color: C.ox, opacity: 0.6, maxWidth: 860 }}>
            Sources: Knoxville Opera Salesforce donations report; KO ticket reports; KO audited financial statements FY15&ndash;FY25. Pre-tenure Rossini average excludes FY20&ndash;FY21 (festival cancelled, COVID). Figures as of May 2026.
          </p>
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
