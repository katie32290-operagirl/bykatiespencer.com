"use client";

import { Fragment, useMemo, useState, useEffect } from "react";
import { Nav, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import { parseText, parseIcs, guessKind, collapseConsecutive } from "@/lib/season-import";
import { ga, DoorLink } from "./toolkit-buttons";
import {
  buildCalendar,
  heavyWeeks,
  busiestStretch,
  fmtDate,
  fmtLong,
  fmtMonth,
  fmtWeek,
  monthKey,
  LANE_LABEL,
  type Lane,
  type Production,
  type FundEvent,
  type SeasonInput,
} from "./season-logic";
import { SeasonExport } from "./season-export";

/**
 * /season-planner — "Your Season, Built for You." The bundle tool.
 * The buyer enters real dates; the three kits' calendars merge into one
 * chronological operating calendar so they can see where the year collides
 * before it does. Progressive enhancement: the orientation copy renders always;
 * the calculator itself is gated behind `mounted` (it needs JavaScript).
 *
 * The planner is open to everyone. Taking the calendar away (the .ics / .csv /
 * print exports) is gated behind a Payhip unlock, mounted separately.
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

function LanePill({ lane, onClick }: { lane: Lane; onClick?: () => void }) {
  const c = LANE_COLOR[lane];
  const style: React.CSSProperties = { fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: c.fg, background: c.bg, padding: "3px 9px", borderRadius: 40, whiteSpace: "nowrap", border: "none", lineHeight: 1.6 };
  if (onClick) return <button type="button" onClick={onClick} aria-label={`Show only ${LANE_LABEL[lane]}`} style={{ ...style, cursor: "pointer" }} className="transition-opacity hover:opacity-75">{LANE_LABEL[lane]}</button>;
  return <span style={style}>{LANE_LABEL[lane]}</span>;
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

  // Import door state.
  type ReviewRow = { name: string; start: Date; end: Date | null; kind: "production" | "fundraiser" | "ignore" };
  const [importText, setImportText] = useState("");
  const [review, setReview] = useState<ReviewRow[] | null>(null);
  const [importNote, setImportNote] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => setMounted(true), []);

  const iso = (d: Date) => {
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  };
  const ingest = (items: { name: string; start: Date; end: Date | null }[]) => {
    const collapsed = collapseConsecutive(items);
    if (collapsed.length === 0) {
      setImportNote("I couldn't find any dated rows in that. Check the format, or just fill in the form below.");
      setReview(null);
      return;
    }
    setImportNote("");
    setReview(collapsed.map((it) => ({ ...it, kind: guessKind(it.name) })));
  };
  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const isIcs = /\.ics$/i.test(file.name) || /BEGIN:VCALENDAR/i.test(text);
      ingest(isIcs ? parseIcs(text) : parseText(text));
    };
    reader.readAsText(file);
  };
  const applyReview = () => {
    if (!review) return;
    const newProds: Production[] = review.filter((r) => r.kind === "production").map((r) => ({ name: r.name, opening: iso(r.start), closing: r.end ? iso(r.end) : "" }));
    const newEvents: FundEvent[] = review.filter((r) => r.kind === "fundraiser").map((r) => ({ name: r.name, date: iso(r.start) }));
    const keptProds = productions.filter((p) => p.name.trim() || p.opening || p.closing);
    const keptEvents = events.filter((e) => e.name.trim() || e.date);
    const mergedProds = [...keptProds, ...newProds];
    const mergedEvents = [...keptEvents, ...newEvents];
    setProductions(mergedProds.length ? mergedProds : [{ name: "", opening: "", closing: "" }]);
    setEvents(mergedEvents.length ? mergedEvents : [{ name: "", date: "" }]);
    setReview(null);
    setImportText("");
    setImportNote("");
  };
  const setReviewRow = (i: number, patch: Partial<ReviewRow>) =>
    setReview((rows) => (rows ? rows.map((r, j) => (j === i ? { ...r, ...patch } : r)) : rows));

  const seasonInput = useMemo<SeasonInput>(
    () => ({
      seasonStartMonth: seasonStartMonth === "" ? null : Number(seasonStartMonth),
      announcement,
      onSale,
      fiscalYearEndMonth: fiscalYearEndMonth === "" ? null : Number(fiscalYearEndMonth),
      productions,
      events,
    }),
    [seasonStartMonth, announcement, onSale, fiscalYearEndMonth, productions, events],
  );
  const calendar = useMemo(() => buildCalendar(seasonInput), [seasonInput]);
  const crunch = useMemo(() => heavyWeeks(calendar), [calendar]);
  const busiest = useMemo(() => busiestStretch(calendar), [calendar]);

  const visible = view === "workstream" ? calendar.filter((m) => lanesOn[m.lane]) : calendar;
  const counts = { development: 0, marketing: 0, events: 0 } as Record<Lane, number>;
  for (const m of calendar) counts[m.lane]++;
  const prodCount = productions.filter((p) => p.opening).length;
  const eventCount = events.filter((e) => e.date).length;

  const setProd = (i: number, key: keyof Production, v: string) =>
    setProductions((rows) => rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  const setEvt = (i: number, key: keyof FundEvent, v: string) =>
    setEvents((rows) => rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));

  const filterToLane = (lane: Lane) => {
    setView("workstream");
    setLanesOn({ development: lane === "development", marketing: lane === "marketing", events: lane === "events" });
  };

  // The timeline table (used by Everything + By workstream): month bands + sticky header.
  const timeline = () => {
    let last = "";
    return (
      <div style={{ maxHeight: "min(72vh, 760px)", overflow: "auto", border: `1.5px solid ${C.ox}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#FFFDF8" }}>
          <thead>
            <tr>
              {["Date", "What happens", "Kit", "Why"].map((h) => (
                <th key={h} style={{ position: "sticky", top: 0, zIndex: 2, textAlign: "left", fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "11px 16px", whiteSpace: "nowrap", background: C.ox, color: C.cream }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((m, i) => {
              const mk = monthKey(m.date);
              const band = mk !== last;
              last = mk;
              return (
                <Fragment key={i}>
                  {band && (
                    <tr>
                      <td colSpan={4} style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: ".16em", color: C.terra, background: C.peachSoft, padding: "8px 16px", position: "sticky", top: 38, zIndex: 1 }}>
                        {fmtMonth(m.date)}
                      </td>
                    </tr>
                  )}
                  <tr style={{ borderTop: `1px solid rgba(140,27,18,0.14)` }}>
                    <td style={{ fontFamily: SANS, fontSize: 13, color: C.terra, padding: "12px 16px", whiteSpace: "nowrap", verticalAlign: "top" }}>{fmtDate(m.date)}</td>
                    <td style={{ fontSize: 15, lineHeight: 1.45, color: C.ox, padding: "12px 16px", minWidth: 220, verticalAlign: "top" }}>
                      {m.what}
                      {m.warning && (
                        <span style={{ display: "block", fontFamily: SANS, fontSize: 12, lineHeight: 1.45, color: C.terra, marginTop: 5 }}>⚠ {m.warning}</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px", verticalAlign: "top" }}><LanePill lane={m.lane} onClick={() => filterToLane(m.lane)} /></td>
                    <td style={{ fontSize: 14, lineHeight: 1.45, color: C.ox, opacity: 0.8, padding: "12px 16px", minWidth: 180, verticalAlign: "top" }}>{m.why}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

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
            {/* import door: paste, drop a file, or enter by hand */}
            <div style={{ background: "#FFFDF8", border: `1.5px solid ${C.ox}`, padding: "clamp(18px,2.6vw,26px)", marginBottom: 28 }}>
              {review ? (
                <>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: C.ox }}>Here&rsquo;s what I found. Tag each one.</div>
                  <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.55, color: C.ox, opacity: 0.8, marginTop: 6 }}>
                    Consecutive days are grouped into one show. Fix the names and set the type, then add them to the form to fill in the rest. A wrong guess is one click.
                  </p>
                  <div className="mt-5 flex flex-col">
                    {review.map((r, i) => (
                      <div key={i} className="grid items-center gap-3 py-3 sm:grid-cols-[1fr_auto]" style={{ borderTop: i ? "1px solid rgba(140,27,18,0.14)" : undefined, opacity: r.kind === "ignore" ? 0.5 : 1 }}>
                        <div className="flex flex-col gap-1">
                          <input value={r.name} onChange={(e) => setReviewRow(i, { name: e.target.value })} style={{ ...inputStyle, padding: "8px 11px", fontSize: 15 }} />
                          <span style={{ fontFamily: SANS, fontSize: 12, color: C.terra }}>{fmtDate(r.start)}{r.end ? ` – ${fmtDate(r.end)}` : ""}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(["production", "fundraiser", "ignore"] as const).map((k) => (
                            <button key={k} type="button" onClick={() => setReviewRow(i, { kind: k })} style={{ fontFamily: SANS, fontSize: 12, padding: "7px 12px", borderRadius: 40, border: `1.5px solid ${C.ox}`, background: r.kind === k ? C.ox : "transparent", color: r.kind === k ? C.cream : C.ox, textTransform: "capitalize" }} className="transition-opacity hover:opacity-80">{k}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" onClick={applyReview} style={{ fontFamily: SANS, fontSize: 14, color: C.cream, background: C.ox, border: `1.5px solid ${C.ox}`, padding: "11px 22px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
                      Add {review.filter((r) => r.kind !== "ignore").length} to the form
                    </button>
                    <button type="button" onClick={() => { setReview(null); setImportNote(""); }} style={{ fontFamily: SANS, fontSize: 14, color: C.ox, background: "transparent", border: `1.5px solid ${C.ox}`, padding: "11px 22px", borderRadius: 40 }} className="transition-opacity hover:opacity-70">Start over</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: C.ox }}>Start from what you have.</div>
                  <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.55, color: C.ox, opacity: 0.8, marginTop: 6 }}>
                    Paste your season, drop a file, or just fill it in by hand below. It all runs in your browser, nothing is uploaded.
                  </p>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={4}
                    placeholder={"La Boheme, October 15-17 2027\nFall Gala, November 14 2027\n\n…or paste rows straight from a spreadsheet."}
                    style={{ ...inputStyle, marginTop: 14, fontFamily: SANS, fontSize: 14, lineHeight: 1.5, resize: "vertical" }}
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => ingest(parseText(importText))} disabled={!importText.trim()} style={{ fontFamily: SANS, fontSize: 14, color: C.cream, background: C.ox, border: `1.5px solid ${C.ox}`, padding: "10px 20px", borderRadius: 40, opacity: importText.trim() ? 1 : 0.45 }} className="transition-opacity hover:opacity-90">Read it</button>
                    <span style={{ fontFamily: SANS, fontSize: 12, color: C.ox, opacity: 0.6 }}>or</span>
                    <label
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) readFile(f); }}
                      style={{ fontFamily: SANS, fontSize: 13, color: C.ox, border: `1.5px dashed ${C.ox}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer", background: dragging ? C.peachSoft : "transparent" }}
                    >
                      Drop a .ics or .csv, or choose a file
                      <input type="file" accept=".ics,.csv,text/calendar,text/csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile(f); e.target.value = ""; }} style={{ display: "none" }} />
                    </label>
                  </div>
                  {importNote && <p role="alert" style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: C.terra, marginTop: 12 }}>{importNote}</p>}
                </>
              )}
            </div>

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
              {/* season summary */}
              <div style={{ border: `1.5px solid ${C.ox}`, background: "#FFFDF8", padding: "clamp(20px,3vw,30px)" }}>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: C.terra }}>Your season at a glance</div>
                <div className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
                  {[
                    [prodCount, prodCount === 1 ? "production" : "productions"],
                    [eventCount, eventCount === 1 ? "fundraising event" : "fundraising events"],
                    [calendar.length, "actions"],
                    [crunch.length, crunch.length === 1 ? "heavy week" : "heavy weeks"],
                  ].map(([n, label]) => (
                    <div key={label as string}>
                      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px,3.4vw,38px)", letterSpacing: "-.02em", color: C.ox, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", color: C.ox, opacity: 0.8, marginTop: 4 }}>{label}</div>
                    </div>
                  ))}
                </div>
                {busiest && (
                  <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.5, color: C.ox, marginTop: 20 }}>
                    Your busiest stretch is {fmtLong(busiest.start)} through {fmtLong(busiest.end)}.
                  </p>
                )}
              </div>

              {/* view toggle + count */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {([["everything", "Everything"], ["workstream", "By workstream"], ["crunch", "The crunch"]] as const).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setView(key)}
                      style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", padding: "9px 18px", borderRadius: 40, border: `1.5px solid ${C.ox}`, background: view === key ? C.ox : "transparent", color: view === key ? C.cream : C.ox }}
                      className="transition-opacity hover:opacity-80"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".04em", color: C.ox, opacity: 0.7 }}>
                  {calendar.length} actions across your season
                </div>
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.5, color: C.ox, opacity: 0.6, marginTop: 8 }}>
                A ⚠ marks a date that lands on a holiday that would hurt it — mail on a postal day, a donor ask over the winter break. US federal calendar only.
              </p>

              {/* by-workstream lane filter */}
              {view === "workstream" && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {(["development", "marketing", "events"] as Lane[]).map((lane) => {
                    const on = lanesOn[lane];
                    const c = LANE_COLOR[lane];
                    return (
                      <button
                        key={lane}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setLanesOn((s) => ({ ...s, [lane]: !s[lane] }))}
                        style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "7px 14px", borderRadius: 40, border: `1.5px solid ${c.bg}`, background: on ? c.bg : "transparent", color: on ? c.fg : c.bg, opacity: on ? 1 : 0.55 }}
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
                  <p style={{ ...P, marginBottom: 20, maxWidth: 700 }}>
                    Weeks where the load piles up across at least two kits, weighted so an opening night counts for more than a reminder. Each one comes with what to do about it.
                  </p>
                  {crunch.length === 0 ? (
                    <div style={{ border: `1.5px solid ${C.ox}`, padding: "clamp(20px,3vw,32px)", background: "#FFFDF8" }}>
                      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: C.ox }}>No pileups yet.</div>
                      <p style={{ ...P, marginTop: 8 }}>Nothing stacks up heavy enough across kits. Add the rest of your dates, or enjoy the room.</p>
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
                          <div style={{ borderTop: `1.5px solid ${C.ox}`, background: C.peachSoft, padding: "12px 18px", fontFamily: SERIF, fontStyle: "italic", fontSize: 16, lineHeight: 1.5, color: C.ox }}>
                            {w.advice}
                            {w.closure && (
                              <span style={{ display: "block", fontFamily: SANS, fontStyle: "normal", fontSize: 13, color: C.terra, marginTop: 6 }}>⚠ And it runs against {w.closure} — the genuinely bad case. Move what you can out of this week.</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6">{timeline()}</div>
              )}

              {/* gated exports — self-hides when the calendar is empty */}
              <SeasonExport input={seasonInput} count={calendar.length} />
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

      {/* GreenRoom — the one commercial moment on the page, at peak intent */}
      <div className={`${PAD} py-[clamp(56px,8vw,88px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[820px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.peri }}>Built by the same person</div>
          <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,3.6vw,38px)", letterSpacing: "-.02em", color: C.cream, lineHeight: 1.05, marginTop: 12 }}>
            The calendar is the easy half.
          </h2>
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.65, color: C.cream, marginTop: 18, maxWidth: 660 }}>
            You just watched a year land on one desk. This page can tell you when it hits. It cannot tell you who gave last year, who came to the gala and never came back, or who is owed a thank-you by Friday.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.65, color: C.cream, marginTop: 14, maxWidth: 660 }}>
            That is the forty-eight hour handoff above, and it is the part a spreadsheet quietly stops doing somewhere around the second event. GreenRoom is the CRM I built for it. It runs the same five stages the kit teaches, Identify through Steward, so the ladder you just learned is the one you work in.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.65, color: C.cream, marginTop: 14 }}>
            Free up to 500 active accounts.
          </p>
          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <a
              href="https://app.greenroomcrm.com/signup?utm_source=bykatiespencer&utm_medium=referral&utm_campaign=season-planner"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => ga("season_greenroom_start")}
              style={{ fontFamily: SANS, fontSize: 15, color: C.ox, background: C.cream, padding: "12px 26px", borderRadius: 40, textDecoration: "none", display: "inline-block" }}
              className="transition-opacity hover:opacity-90"
            >
              Start free
            </a>
            <DoorLink href="https://greenroomcrm.com?utm_source=bykatiespencer&utm_medium=referral&utm_campaign=season-planner" event="season_greenroom_learn" external tone="peri">
              See how it works →
            </DoorLink>
          </div>
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
