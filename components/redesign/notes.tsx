import Link from "next/link";
import { Nav, GiantTitle, Cta, Footer, Shell, PAD, C, SANS } from "./chrome";
import { NotesSignup } from "./notes-signup";
import { notes } from "@/content/writing";

const countWord = (n: number) =>
  n === 1 ? "One essay" : n === 2 ? "Two essays" : `${n} essays`;

/** Rough reading time from the essay body, ~200 words a minute. */
const readMins = (body: string) => Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

/** The month, without the year — for the "in order of appearance" kickers. */
const monthOnly = (date: string) => date.replace(/\s+\d{4}$/, "");

/** What's coming — teasers for the column, not yet published. */
const WINGS: [string, string, string][] = [
  ["III", "The Wrong Kind of Founder", "Being non-technical wasn’t the obstacle. It was the qualification. I built the CRM because I was living the problem, by hand, for years."],
  ["IV", "How Do You Balance the Budget?", "Earned against contributed. Safe programming against brave. And the myth that a bigger budget means a healthier organization."],
];

export function NotesRedesign() {
  const [featured, second] = notes;

  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Notes" />
      <GiantTitle ground="cream" size="min(23vw,275px)">Notes.</GiantTitle>

      {/* hero */}
      <div className={`${PAD} pb-[clamp(40px,6vw,72px)] pt-[clamp(32px,4vw,48px)] text-center`}>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: C.terra }}>Notes from the house</div>
        <p style={{ fontSize: "clamp(18px,2vw,23px)", lineHeight: 1.5, color: C.ox, maxWidth: 660, margin: "26px auto 0", textWrap: "pretty" }}>
          Essays, observations and unfinished thoughts on art, story, audience, and the work of building things. A director&rsquo;s notes column, kept in public.
        </p>
        {/* dot rule */}
        <div className="mx-auto mt-10 flex items-center gap-[14px]" style={{ maxWidth: 620 }}>
          <span style={{ height: 1.5, background: C.ox, flex: 1 }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.terra, flex: "none" }} />
          <span style={{ height: 1.5, background: C.ox, flex: 1 }} />
        </div>
        {/* meta row */}
        <div className="mt-[22px] flex flex-wrap justify-center gap-x-[clamp(16px,3vw,40px)] gap-y-2" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.ox }}>
          <span>Issue no. 02</span>
          <span style={{ color: C.terra }}>&bull;</span>
          <span>{countWord(notes.length)}</span>
          <span style={{ color: C.terra }}>&bull;</span>
          <span>{featured?.date ?? "2026"}</span>
        </div>
      </div>

      {/* latest — oxblood feature */}
      {featured && (
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" }}>
          <div
            className="grid items-end gap-[clamp(28px,4vw,56px)]"
            style={{ background: C.ox, color: C.cream, padding: "clamp(32px,5vw,64px)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
          >
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.peach }}>
                Latest &middot; {featured.category} &middot; {featured.date}
              </div>
              <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5.4vw,62px)", lineHeight: 1, letterSpacing: "-.04em", margin: "22px 0 0", color: C.cream, textWrap: "pretty" }}>
                {featured.title}
              </h2>
            </div>
            <div>
              <p style={{ fontSize: "clamp(17px,1.7vw,20px)", lineHeight: 1.65, margin: 0, color: C.peachSoft }}>{featured.lead}</p>
              <div className="mt-[26px] flex flex-wrap items-center gap-[18px]">
                <Link href={`/writing/${featured.slug}`} style={{ fontFamily: SANS, fontWeight: 700, fontSize: 19, letterSpacing: "-.02em", color: C.cream, borderBottom: `2px solid ${C.terra}`, paddingBottom: 3 }} className="transition-opacity hover:opacity-80">
                  Read the note &rarr;
                </Link>
                <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.peach }}>{readMins(featured.body)} min</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* the bill */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px) 0" }}>
        <div className="mb-[26px] flex flex-wrap items-baseline gap-[16px]">
          <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-.03em", color: C.ox }}>The bill</span>
          <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.terra }}>In order of appearance</span>
          <span style={{ height: 1.5, background: C.ox, flex: 1, minWidth: 60 }} />
        </div>
        <div className="grid gap-[20px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          {/* second essay */}
          {second && (
            <div className="flex flex-col" style={{ border: `1.5px solid ${C.ox}`, padding: "clamp(26px,3vw,38px)" }}>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.terra }}>
                Also in the file &middot; {second.category} &middot; {monthOnly(second.date)}
              </div>
              <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,2.8vw,34px)", lineHeight: 1.05, letterSpacing: "-.03em", margin: "18px 0 0", color: C.ox, textWrap: "pretty" }}>
                {second.title}
              </h3>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: C.ox, margin: "16px 0 0" }}>{second.lead}</p>
              <div style={{ flex: 1, minHeight: 20 }} />
              <div className="mt-[22px] flex flex-wrap items-center gap-[18px]">
                <Link href={`/writing/${second.slug}`} style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, letterSpacing: "-.02em", color: C.terra }} className="transition-opacity hover:opacity-70">
                  Read the note &rarr;
                </Link>
                <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.ox }}>{readMins(second.body)} min</span>
              </div>
            </div>
          )}
          {/* in the wings */}
          <div className="flex flex-col" style={{ background: C.peri, padding: "clamp(26px,3vw,38px)" }}>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.ox }}>In the wings</div>
            <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,2.8vw,34px)", lineHeight: 1.05, letterSpacing: "-.03em", margin: "18px 0 0", color: C.ox }}>
              What I&rsquo;m thinking through next.
            </h3>
            <div className="mt-5 grid gap-[14px]">
              {WINGS.map(([num, title, text]) => (
                <div key={num} className="grid gap-x-[12px] gap-y-1" style={{ gridTemplateColumns: "26px minmax(0, 1fr)", borderTop: `1.5px solid ${C.ox}`, paddingTop: 14 }}>
                  <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 15, letterSpacing: ".06em", color: C.ox }}>{num}</span>
                  <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, letterSpacing: "-.01em", color: C.ox }}>{title}</span>
                  <span style={{ gridColumn: 2, fontSize: 16, lineHeight: 1.45, color: C.ox }}>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minHeight: 20 }} />
            <p style={{ fontSize: 15, lineHeight: 1.5, margin: "22px 0 0", fontStyle: "italic", color: C.ox }}>
              The column continues. New essays when the work asks for them.
            </p>
          </div>
        </div>
      </div>

      <NotesSignup />

      <Cta />
      <Footer />
    </Shell>
  );
}
