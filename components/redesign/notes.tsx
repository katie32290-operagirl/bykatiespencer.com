import Link from "next/link";
import { Nav, GiantTitle, TickerBand, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";
import { notes } from "@/content/writing";

const countWord = (n: number) =>
  n === 1 ? "One essay" : n === 2 ? "Two essays" : `${n} essays`;

export function NotesRedesign() {
  const [featured, second] = notes;

  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Notes" />
      <GiantTitle ground="cream" size="min(23vw,275px)">Notes</GiantTitle>

      {/* hero */}
      <div className={`${PAD} pb-[clamp(48px,7vw,70px)] pt-[clamp(48px,6vw,64px)] text-center`}>
        <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: C.terra }}>Notes from the house</div>
        <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(36px,5.6vw,56px)", lineHeight: 1, letterSpacing: "-.03em", color: C.ox, maxWidth: 760, margin: "26px auto 0" }}>
          Notes from the house.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: C.ox, maxWidth: 620, margin: "24px auto 0" }}>
          Essays, observations and unfinished thoughts on art, story, audience, and the work of building things. A director&rsquo;s notes column, kept in public.
        </p>
      </div>

      <TickerBand>
        <span>Filed by <span style={{ color: C.cream }}>Katie Spencer</span></span>
        <span aria-hidden style={{ color: C.peri }}>•</span>
        <span>In this issue <span style={{ color: C.cream }}>{countWord(notes.length)}</span></span>
        <span aria-hidden style={{ color: C.peri }}>•</span>
        <span>Updated <span style={{ color: C.cream }}>{featured?.date ?? "2026"}</span></span>
      </TickerBand>

      {/* this issue */}
      <div className={`${PAD} py-[clamp(64px,9vw,90px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(40px,6vw,56px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 0.95 }}>This issue.</div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.terra }}>The bill · in order of appearance</div>
          </div>
          <div className="mt-10 grid gap-[22px] md:grid-cols-[1.3fr_1fr]">
            {/* featured — terracotta */}
            {featured && (
              <Link href={`/writing/${featured.slug}`} className="flex flex-col justify-between transition-opacity hover:opacity-95" style={{ background: C.terra, padding: "clamp(32px,4vw,48px)", minHeight: 360 }}>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.cream }}>
                  Latest · {featured.category} · {featured.date}
                </div>
                <div className="mt-10">
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,4.4vw,44px)", lineHeight: 0.98, letterSpacing: "-.025em", color: C.ox }}>{featured.title}</div>
                  <div style={{ fontSize: 17, lineHeight: 1.55, color: C.ox, marginTop: 14, maxWidth: 460 }}>{featured.lead}</div>
                  <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.cream, marginTop: 20 }}>Read the note →</div>
                </div>
              </Link>
            )}
            {/* column: second essay + more soon */}
            <div className="flex flex-col gap-[22px]">
              {second && (
                <Link href={`/writing/${second.slug}`} className="flex-1 transition-opacity hover:opacity-90" style={{ background: C.peri, padding: 32 }}>
                  <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox }}>✦ Also in the file · {second.category} · {second.date.replace(/\s+\d{4}$/, "")}</div>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, lineHeight: 1.05, color: C.ox, marginTop: 12 }}>{second.title}.</div>
                  <div style={{ fontSize: 16, lineHeight: 1.55, color: C.ox, marginTop: 10 }}>{second.lead}</div>
                  <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox, marginTop: 16 }}>Read the note →</div>
                </Link>
              )}
              <div style={{ background: C.cream, border: `1.5px solid ${C.ox}`, padding: 32 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: C.ox }}>More notes soon.</div>
                <div style={{ fontSize: 16, fontStyle: "italic", lineHeight: 1.5, color: C.ox, marginTop: 6 }}>The column continues. New essays as the work asks for them.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cta />
      <Footer />
    </Shell>
  );
}
