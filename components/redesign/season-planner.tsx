"use client";

import { useMemo, useState, useEffect } from "react";
import { Nav, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import {
  buildCalendar,
  heavyWeeks,
  fmtDate,
  fmtWeek,
  LANE_LABEL,
  type Lane,
  type Production,
  type FundEvent,
} from "./season-logic";

/**
 * /season-planner — "Your Season, Built for You." The bundle-exclusive tool.
 * The buyer enters their real dates; the three kits' calendars merge into one
 * chronological operating calendar so they can see where the year collides
 * before it does. Progressive enhancement: the orientation copy renders always;
 * the calculator itself is gated behind `mounted` (it needs JavaScript).
 */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const LANE_COLOR: Record<Lane, { bg: string; fg: string }> = {
  development: { bg: C.ox, fg: C.cream },
  marketing: { bg: C.terra, fg: C.cream },
  events: { bg: C.peri, fg: C.ox },
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: C.cream,
  border: `1.5px solid ${C.ox}`,
  padding: "11px 13px",
  fontFamily: SERIF,
  fontSize: 16,
  color: C.ox,
  outline: "none",
};
const labelStyle: React.CSSProperties = { fontFamily: SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox, marginBottom: 5, display: "block" };
const H2: React.CSSProperties = { fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3.2vw,34px)", letterSpacing: "-.02em", color: C.ox, lineHeight: 1.05 };
const P: React.CSSProperties = { fontSize: 17, lineHeight: 1.7, color: C.ox };

function LanePill({ lane }: { lane: Lane }) {
  const c = LANE_COLOR[lane];
  return (
    <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: c.fg, background: c.bg, padding: "3px 9px", borderRadius: 40, whiteSpace: "nowrap" }}>
      {LANE_LABEL[lane]}
    </span>
  );
}

export function SeasonPlanner() {
  const [mounted, setMounted] = useState(false);
  const [seasonStartMonth, setSeasonStartMonth] = useState<string>("");
  const [announcement, setAnnouncement] = useState("");
  const [onSale, setOnSale] = useState("");
  const [fiscalYearEndMonth, setFiscalYearEndMonth] = useState<string>("");
  const [productions, setProductions] = useState<Production[]>([{ name: "", opening: "", closing: "" }]);
  const [events, setEvents] = useState<FundEvent[]>([{ name: "", date: "" }]);
  const [view, setView] = useState<"everything" | "workstream" | "crunch">("everything");
  const [lanesOn, setLanesOn] = useState<Record<Lane, boolean>>({ development: true, marketing: true, events: true });

  useEffect(() => setMounted(true), []);

  const calendar = useMemo(
    () =>
      buildCalendar({
        seasonStartMonth: seasonStartMonth === "" ? null : Number(seasonStartMonth),
        announcement,
        onSale,
        fiscalYearEndMonth: fiscalYearEndMonth === "" ? null : Number(fiscalYearEndMonth),
        productions,
        events,
      }),
    [seasonStartMonth, announcement, onSale, fiscalYearEndMonth, productions, events],
  );
  const crunch = useMemo(() => heavyWeeks(calendar), [calendar]);

  const visible = view === "workstream" ? calendar.filter((m) => lanesOn[m.lane]) : calendar;
  const counts = { development: 0, marketing: 0, events: 0 } as Record<Lane, number>;
  for (const m of calendar) counts[m.lane]++;

  const setProd = (i: number, key: keyof Production, v: string) =>
    setProductions((rows) => rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  const setEvt = (i: number, key: keyof FundEvent, v: string) =>
    setEvents((rows) => rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));

  return (
    <Shell ground="cream">
      <Nav ground="cream" active="" />

      {/* hero */}
      <div className={`${PAD} pb-[clamp(28px,4vw,48px)] pt-[clamp(24px,3vw,40px)]`}>
        <div className="mx-auto max-w-[820px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>The Small Arts Org Operating Kit · Only in the bundle</div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,6vw,64px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1, marginTop: 14 }}>
            Your season, built for you<span style={{ color: C.terra }}>.</span>
          </h1>
          <p style={{ ...P, fontSize: 19, marginTop: 18 }}>
            Put in your dates. Get your whole year back. This puts the donor rhythm, the season marketing timeline, and the event countdowns on one calendar, so you can see where the year collides before it does.
          </p>
          <p style={{ ...P, marginTop: 12 }}>
            You give it a handful of real dates. Katie&rsquo;s system supplies the rest: every workbook in the three kits recalculates from those anchors, and it all sorts itself by date.
          </p>
        </div>
      </div>

      {/* inputs (enhancement only) */}
      {mounted && (
        <div className={`${PAD} py-[clamp(28px,4vw,44px)]`} style={{ background: C.peri }}>
          <div className="mx-auto max-w-[900px]">
            {/* your season */}
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.ox }}>Your season</div>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="sp-start" style={labelStyle}>Season start month</label>
                <select id="sp-start" value={seasonStartMonth} onChange={(e) => setSeasonStartMonth(e.target.value)} style={inputStyle}>
                  <option value="">Choose a month</option>
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="sp-ann" style={labelStyle}>Season announcement</label>
                <input id="sp-ann" type="date" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="sp-onsale" style={labelStyle}>Single tickets on sale</label>
                <input id="sp-onsale" type="date" value={onSale} onChange={(e) => setOnSale(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="sp-fiscal" style={labelStyle}>Fiscal year ends <span style={{ textTransform: "none", letterSpacing: 0, color: C.ox, opacity: 0.7 }}>optional</span></label>
                <select id="sp-fiscal" value={fiscalYearEndMonth} onChange={(e) => setFiscalYearEndMonth(e.target.value)} style={inputStyle}>
                  <option value="">June (default)</option>
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* your productions */}
            <div className="mt-9" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.ox }}>Your productions</div>
            <div className="mt-4 flex flex-col gap-4">
              {productions.map((p, i) => (
                <div key={i} className="grid items-end gap-3 sm:grid-cols-[1fr_170px_170px_auto]">
                  <div>
                    <label style={labelStyle}>Show name</label>
                    <input value={p.name} onChange={(e) => setProd(i, "name", e.target.value)} placeholder={`Show ${i + 1}`} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Opening</label>
                    <input type="date" value={p.opening} onChange={(e) => setProd(i, "opening", e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Closing</label>
                    <input type="date" value={p.closing} onChange={(e) => setProd(i, "closing", e.target.value)} style={inputStyle} />
                  </div>
                  {productions.length > 1 ? (
                    <button type="button" onClick={() => setProductions((r) => r.filter((_, j) => j !== i))} aria-label={`Remove production ${i + 1}`} style={{ fontFamily: SANS, fontSize: 13, color: C.ox, background: "transparent", border: `1.5px solid ${C.ox}`, borderRadius: 40, padding: "10px 14px", height: 44 }} className="transition-opacity hover:opacity-60">Remove</button>
                  ) : <span className="hidden sm:block" />}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setProductions((r) => [...r, { name: "", opening: "", closing: "" }])} style={{ marginTop: 12, fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", color: C.ox, background: "transparent", border: "none", padding: 0, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-60">
              + Add another production
            </button>

            {/* your events */}
            <div className="mt-9" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.ox }}>Your fundraising events</div>
            <div className="mt-4 flex flex-col gap-4">
              {events.map((ev, i) => (
                <div key={i} className="grid items-end gap-3 sm:grid-cols-[1fr_170px_auto]">
                  <div>
                    <label style={labelStyle}>Event name</label>
                    <input value={ev.name} onChange={(e) => setEvt(i, "name", e.target.value)} placeholder={`Event ${i + 1}`} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Event date</label>
                    <input type="date" value={ev.date} onChange={(e) => setEvt(i, "date", e.target.value)} style={inputStyle} />
                  </div>
                  {events.length > 1 ? (
                    <button type="button" onClick={() => setEvents((r) => r.filter((_, j) => j !== i))} aria-label={`Remove event ${i + 1}`} style={{ fontFamily: SANS, fontSize: 13, color: C.ox, background: "transparent", border: `1.5px solid ${C.ox}`, borderRadius: 40, padding: "10px 14px", height: 44 }} className="transition-opacity hover:opacity-60">Remove</button>
                  ) : <span className="hidden sm:block" />}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setEvents((r) => [...r, { name: "", date: "" }])} style={{ marginTop: 12, fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", color: C.ox, background: "transparent", border: "none", padding: 0, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-60">
              + Add another event
            </button>

            <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: C.ox, opacity: 0.85, marginTop: 24 }}>
              Nothing is sent or saved. It all runs in your browser.
            </p>
          </div>
        </div>
      )}

      {/* output */}
      <div className={`${PAD} py-[clamp(40px,6vw,72px)]`} style={{ background: C.cream }}>
        <div className="mx-auto max-w-[1080px]">
          {!mounted ? (
            <p style={{ ...P, maxWidth: 680 }}>
              Turn on JavaScript and this builds your season calendar from your dates. The three workbooks are still where you manage the work; this one tells you when everything is going to hit.
            </p>
          ) : calendar.length === 0 ? (
            <div style={{ border: `1.5px solid ${C.ox}`, padding: "clamp(24px,4vw,40px)", background: "#FFFDF8" }}>
              <div style={{ ...H2, fontSize: "clamp(20px,2.6vw,28px)" }}>Add your dates above.</div>
              <p style={{ ...P, marginTop: 10, maxWidth: 620 }}>Give it a season start month and at least one production or one fundraiser, and your whole year fills in here, sorted by date.</p>
            </div>
          ) : (
            <>
              {/* view toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {([["everything", "Everything"], ["workstream", "By workstream"], ["crunch", "The crunch"]] as const).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setView(key)}
                      style={{
                        fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", padding: "9px 18px", borderRadius: 40,
                        border: `1.5px solid ${C.ox}`,
                        background: view === key ? C.ox : "transparent",
                        color: view === key ? C.cream : C.ox,
                      }}
                      className="transition-opacity hover:opacity-80"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".04em", color: C.ox, opacity: 0.7 }}>
                  {calendar.length} dates across your year
                </div>
              </div>

              {/* by-workstream lane filter */}
              {view === "workstream" && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {(["development", "marketing", "events"] as Lane[]).map((lane) => {
                    const on = lanesOn[lane];
                    const c = LANE_COLOR[lane];
                    return (
                      <button
                        key={lane}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setLanesOn((s) => ({ ...s, [lane]: !s[lane] }))}
                        style={{
                          fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase",
                          padding: "7px 14px", borderRadius: 40, border: `1.5px solid ${c.bg}`,
                          background: on ? c.bg : "transparent", color: on ? c.fg : c.bg, opacity: on ? 1 : 0.55,
                        }}
                        className="transition-opacity"
                      >
                        {LANE_LABEL[lane]} · {counts[lane]}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* the crunch */}
              {view === "crunch" ? (
                <div className="mt-7">
                  <p style={{ ...P, marginBottom: 20, maxWidth: 680 }}>
                    Weeks where three or more deadlines land across at least two kits. Decide now what can move, what can be drafted early, and what needs another owner.
                  </p>
                  {crunch.length === 0 ? (
                    <div style={{ border: `1.5px solid ${C.ox}`, padding: "clamp(20px,3vw,32px)", background: "#FFFDF8" }}>
                      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: C.ox }}>No pileups yet.</div>
                      <p style={{ ...P, marginTop: 8 }}>Nothing stacks three-deep across kits. Add the rest of your dates, or enjoy the room.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {crunch.map((w) => (
                        <div key={w.start.getTime()} style={{ border: `1.5px solid ${C.ox}`, background: "#FFFDF8" }}>
                          <div style={{ background: C.ox, color: C.cream, fontFamily: SANS, fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", padding: "10px 18px" }}>
                            Heavy week · {fmtWeek(w.start)}
                          </div>
                          <ul className="flex flex-col gap-3" style={{ padding: "18px" }}>
                            {w.items.map((m, k) => (
                              <li key={k} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".04em", color: C.terra, minWidth: 92 }}>{fmtDate(m.date)}</span>
                                <LanePill lane={m.lane} />
                                <span style={{ fontSize: 16, lineHeight: 1.5, color: C.ox }}>{m.what}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* everything / by-workstream table */
                <div className="mt-6 overflow-x-auto" style={{ border: `1.5px solid ${C.ox}` }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", background: "#FFFDF8" }}>
                    <thead>
                      <tr style={{ background: C.ox, color: C.cream }}>
                        {["Date", "What happens", "Kit", "Why"].map((h) => (
                          <th key={h} style={{ textAlign: "left", fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "11px 16px", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((m, i) => (
                        <tr key={i} style={{ borderTop: `1px solid rgba(140,27,18,0.16)` }}>
                          <td style={{ fontFamily: SANS, fontSize: 13, color: C.terra, padding: "12px 16px", whiteSpace: "nowrap", verticalAlign: "top" }}>{fmtDate(m.date)}</td>
                          <td style={{ fontSize: 15, lineHeight: 1.45, color: C.ox, padding: "12px 16px", minWidth: 220, verticalAlign: "top" }}>{m.what}</td>
                          <td style={{ padding: "12px 16px", verticalAlign: "top" }}><LanePill lane={m.lane} /></td>
                          <td style={{ fontSize: 14, lineHeight: 1.45, color: C.ox, opacity: 0.8, padding: "12px 16px", minWidth: 180, verticalAlign: "top" }}>{m.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* the three insights (always) */}
      <div className={`${PAD} py-[clamp(48px,7vw,80px)]`} style={{ background: C.peri }}>
        <div className="mx-auto grid max-w-[1080px] gap-x-[clamp(28px,4vw,56px)] gap-y-8 md:grid-cols-3">
          {[
            ["Where the collisions are", "Your year-end appeal lands in the same weeks as the fall fundraiser follow-up, and your spring ask meetings land inside the gala countdown. Neither is wrong. Both need to be on one page before September."],
            ["How to move it", "Anchor each event to its real date and let the sixteen-week countdown slide with it. Anchor each production to its opening and let the eight-week ramp slide with it. Every workbook in the three kits recalculates from those anchors."],
            ["The one number", "Every attendee, every ticket buyer, every sponsor guest goes into the donor pipeline within forty-eight hours, with a stage, an owner, and a next touch. That is the seam where the three kits become one system."],
          ].map(([h, b]) => (
            <div key={h}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: C.ox }}>{h}</div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: C.ox, marginTop: 8 }}>{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* closing note */}
      <div className={`${PAD} py-[clamp(40px,6vw,64px)]`} style={{ background: C.cream, borderTop: `1.5px solid ${C.ox}` }}>
        <div className="mx-auto max-w-[820px]">
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(19px,2.2vw,24px)", lineHeight: 1.5, color: C.ox }}>
            This is the bird&rsquo;s-eye view. The three workbooks are where you manage the work. This one does a single thing: it tells you when everything is going to hit.
          </p>
        </div>
      </div>

      <Footer />
    </Shell>
  );
}
