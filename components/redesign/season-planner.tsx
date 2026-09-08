"use client";

import { Fragment, useMemo, useState, useEffect } from "react";
import { Nav, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import { parseText, parseIcs, guessKind, collapseConsecutive } from "@/lib/season-import";
import { ga, DoorLink } from "./toolkit-buttons";
import {
  buildCalendar,
  heavyWeeks,
  parseLocal,
  fmtDate,
  fmtMonth,
  fmtWeek,
  monthKey,
  LANE_LABEL,
  type Lane,
  type Milestone,
  type Production,
  type FundEvent,
  type SeasonInput,
} from "./season-logic";
import { SeasonExport } from "./season-export";

/**
 * /season-planner — "Your season, built for you." The bundle tool.
 * Give it whatever dates you have (paste, a file, or by hand); it merges the
 * three kits' calendars into one operating calendar and shows where the year
 * collides. Progressive enhancement: the orientation copy renders always; the
 * calculator is gated behind `mounted`. Exports are gated behind a Payhip unlock.
 */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Muted terracotta for secondary copy on cream/periwinkle (design-system slate). */
const SLATE = "#A4574a";

const LANE_COLOR: Record<Lane, { bg: string; fg: string }> = {
  development: { bg: C.ox, fg: C.cream },
  marketing: { bg: C.terra, fg: C.cream },
  events: { bg: C.peri, fg: C.ox },
};

const labelStyle: React.CSSProperties = { fontFamily: SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox, marginBottom: 5, display: "block" };
const H2: React.CSSProperties = { fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3.2vw,34px)", letterSpacing: "-.02em", color: C.ox, lineHeight: 1.05 };
const P: React.CSSProperties = { fontSize: 17, lineHeight: 1.7, color: C.ox };

/** A worked season — loaded on first visit and by "Load a worked season",
 *  so the page arrives alive rather than blank. */
const EXAMPLE = {
  importText: "La Boheme, October 15 2027\nThe Magic Flute, February 11 2028\nFall Gala, November 14 2027\nSpring Benefit, April 22 2028",
  seasonStartMonth: "6", // July
  fiscalYearEndMonth: "5", // June
  announcement: "2027-07-12",
  onSale: "2027-08-16",
  productions: [
    { name: "La Boheme", opening: "2027-10-15", closing: "2027-10-17" },
    { name: "The Magic Flute", opening: "2028-02-11", closing: "2028-02-13" },
  ] as Production[],
  events: [
    { name: "Fall Gala", date: "2027-11-14" },
    { name: "Spring Benefit", date: "2028-04-22" },
  ] as FundEvent[],
};

function addMonths(d: Date, n: number): Date {
  const c = new Date(d);
  c.setMonth(c.getMonth() + n);
  return c;
}
function isoDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** A numbered section header: hierarchy, not navigation. */
function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3.5">
      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, letterSpacing: ".02em", color: C.terra }}>{n}</span>
      <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: C.ox }}>{title}</span>
    </div>
  );
}

function LanePill({ lane, onClick }: { lane: Lane; onClick?: () => void }) {
  const c = LANE_COLOR[lane];
  const style: React.CSSProperties = { fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: c.fg, background: c.bg, padding: "3px 9px", borderRadius: 40, whiteSpace: "nowrap", border: "none", lineHeight: 1.6 };
  if (onClick) return <button type="button" onClick={onClick} aria-label={`Show only ${LANE_LABEL[lane]}`} style={{ ...style, cursor: "pointer" }} className="transition-opacity hover:opacity-75">{LANE_LABEL[lane]}</button>;
  return <span style={style}>{LANE_LABEL[lane]}</span>;
}

/* ---- the live "Your year" glance ------------------------------------ */

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Each kit lane, as it reads at a glance: colour + marker + plain-language name. */
const GLANCE: Record<Lane, { color: string; dot: boolean; label: string }> = {
  marketing: { color: C.terra, dot: false, label: "Production" },
  events: { color: C.peri, dot: false, label: "Event" },
  development: { color: C.ox, dot: true, label: "Donor rhythm" },
};
const GLANCE_ORDER: Lane[] = ["marketing", "events", "development"];

/**
 * The computed calendar, grouped into the twelve months of the season and
 * flagged where kits collide. This is the whole point of the tool made visible:
 * every ramp, countdown, and handoff the engine derives, sorted onto one year.
 */
function YearGlance({ calendar, productions, events, startMonth }: { calendar: Milestone[]; productions: Production[]; events: FundEvent[]; startMonth: number | null }) {
  const hasData = calendar.length > 0;
  // Anchor the window to the earliest real production/event, not the earliest
  // milestone — pre-season ramps can precede the season-start month.
  const anchorDates = [
    ...productions.map((p) => parseLocal(p.opening)),
    ...events.map((e) => parseLocal(e.date)),
  ].filter((d): d is Date => !!d);
  const anchor = anchorDates.length ? anchorDates.reduce((x, y) => (x < y ? x : y)) : hasData ? calendar[0].date : new Date();
  const sm = startMonth ?? anchor.getMonth();
  let seasonStart = new Date(anchor.getFullYear(), sm, 1);
  if (seasonStart > anchor) seasonStart = new Date(anchor.getFullYear() - 1, sm, 1);
  const months = Array.from({ length: 12 }, (_, k) => addMonths(seasonStart, k));
  const inWindow = (d: Date) => months.some((mo) => mo.getFullYear() === d.getFullYear() && mo.getMonth() === d.getMonth());
  const outside = hasData ? calendar.filter((m) => !inWindow(m.date)).length : 0;

  const marker = (l: Lane) => (
    <span style={{ width: 9, height: 9, flex: "0 0 auto", background: GLANCE[l].color, borderRadius: GLANCE[l].dot ? "50%" : 0 }} />
  );

  return (
    <div style={{ background: C.peri, padding: "clamp(14px,2vw,22px)" }}>
      <div style={{ background: "#FFFDF8" }}>
        <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ padding: "clamp(14px,2vw,20px) clamp(14px,2vw,20px) 0", fontFamily: SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox }}>
          {GLANCE_ORDER.map((l) => (
            <span key={l} className="flex items-center gap-2">{marker(l)}{GLANCE[l].label}</span>
          ))}
        </div>
        <div style={{ maxHeight: "min(74vh, 860px)", overflow: "auto", padding: "clamp(14px,2vw,20px)" }}>
          {!hasData && (
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, lineHeight: 1.5, color: SLATE, margin: 0 }}>
              Start with a few dates and your year will take shape here. It grows as you fill it in.
            </p>
          )}
          {hasData && months.map((mo, k) => {
            const its = calendar.filter((m) => m.date.getFullYear() === mo.getFullYear() && m.date.getMonth() === mo.getMonth());
            let collision = false;
            for (let a = 0; a < its.length && !collision; a++) {
              for (let b = a + 1; b < its.length; b++) {
                const gap = Math.abs(its[b].date.getTime() - its[a].date.getTime()) / 86400000;
                if (gap <= 10 && its[a].lane !== its[b].lane) { collision = true; break; }
              }
            }
            return (
              <div key={k} style={{ borderTop: k ? "1.5px solid #d9cfc9" : undefined, padding: "14px 0 4px" }}>
                <div className="mb-2.5 flex items-baseline gap-3">
                  <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox, minWidth: 62 }}>{SHORT[mo.getMonth()]} {String(mo.getFullYear()).slice(2)}</span>
                  {collision && <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.terra }}>Collision</span>}
                </div>
                {its.map((m, j) => (
                  <div key={j} className="flex items-baseline gap-3" style={{ padding: "5px 0 5px 62px" }}>
                    <span style={{ fontFamily: SANS, fontSize: 13, color: SLATE, minWidth: 48, flex: "0 0 auto" }}>{MONTH_ABBR[m.date.getMonth()]} {m.date.getDate()}</span>
                    <span style={{ marginTop: 6 }}>{marker(m.lane)}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: C.ox }}>{m.what}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {outside > 0 && (
        <p style={{ margin: "12px 0 0", fontFamily: SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox }}>
          {outside} dated {outside === 1 ? "move" : "moves"} fall outside this 12-month window
        </p>
      )}
    </div>
  );
}

/* ---- the page ------------------------------------------------------- */

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
  const [importStatus, setImportStatus] = useState("");
  const [dragging, setDragging] = useState(false);

  const loadExample = () => {
    setImportText(EXAMPLE.importText);
    setReview(null);
    setImportNote("");
    setImportStatus("");
    setSeasonStartMonth(EXAMPLE.seasonStartMonth);
    setFiscalYearEndMonth(EXAMPLE.fiscalYearEndMonth);
    setAnnouncement(EXAMPLE.announcement);
    setOnSale(EXAMPLE.onSale);
    setProductions(EXAMPLE.productions.map((p) => ({ ...p })));
    setEvents(EXAMPLE.events.map((e) => ({ ...e })));
  };

  useEffect(() => {
    setMounted(true);
    loadExample();
  }, []);

  const ingest = (items: { name: string; start: Date; end: Date | null }[]) => {
    setImportStatus("");
    const collapsed = collapseConsecutive(items);
    if (collapsed.length === 0) {
      setImportNote("I couldn't read any dated rows there. Check the format, or fill it in by hand below.");
      setReview(null);
      return;
    }
    setImportNote("");
    setReview(collapsed.map((it) => ({ ...it, kind: guessKind(it.name) })));
  };
  const readFile = (file: File) => {
    setImportStatus("Reading your dates…");
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const isIcs = /\.ics$/i.test(file.name) || /BEGIN:VCALENDAR/i.test(text);
      ingest(isIcs ? parseIcs(text) : parseText(text));
    };
    reader.onerror = () => { setImportStatus(""); setImportNote("That file couldn't be read. Try another, or fill it in by hand below."); };
    reader.readAsText(file);
  };
  const applyReview = () => {
    if (!review) return;
    const newProds: Production[] = review.filter((r) => r.kind === "production").map((r) => ({ name: r.name, opening: isoDay(r.start), closing: r.end ? isoDay(r.end) : "" }));
    const newEvents: FundEvent[] = review.filter((r) => r.kind === "fundraiser").map((r) => ({ name: r.name, date: isoDay(r.start) }));
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

  const visible = view === "workstream" ? calendar.filter((m) => lanesOn[m.lane]) : calendar;
  const counts = { development: 0, marketing: 0, events: 0 } as Record<Lane, number>;
  for (const m of calendar) counts[m.lane]++;
  const prodCount = productions.filter((p) => p.opening).length;
  const eventCount = events.filter((e) => e.date).length;
  const hasAny = prodCount > 0 || eventCount > 0;
  const badCloses = productions.map((p) => {
    const o = parseLocal(p.opening);
    const c = parseLocal(p.closing);
    return !!(o && c && c < o);
  });
  const needsMonth = hasAny && seasonStartMonth === "";

  const setProd = (i: number, key: keyof Production, v: string) =>
    setProductions((rows) => rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  const setEvt = (i: number, key: keyof FundEvent, v: string) =>
    setEvents((rows) => rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));

  const filterToLane = (lane: Lane) => {
    setView("workstream");
    setLanesOn({ development: lane === "development", marketing: lane === "marketing", events: lane === "events" });
  };

  // The full plan table (Everything + By workstream): month bands + sticky header.
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
      <div className={`${PAD} pb-[clamp(28px,4vw,52px)] pt-[clamp(40px,6vw,84px)]`}>
        <div className="mx-auto max-w-[1000px]">
          <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra, marginBottom: "clamp(20px,3vw,32px)" }}>The Small Arts Org Operating Kit · Only in the bundle</div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(44px,8vw,104px)", letterSpacing: "-.045em", color: C.ox, lineHeight: 0.9, margin: 0, textWrap: "balance" }}>
            Your season, built for you<span style={{ color: C.terra }}>.</span>
          </h1>
          <div className="mt-[clamp(28px,4vw,48px)] grid items-start gap-x-[clamp(24px,4vw,56px)] gap-y-4 md:grid-cols-2">
            <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.7, color: C.ox, margin: 0, maxWidth: "44ch" }}>
              Give it whatever dates you already have, and it puts the donor rhythm, the season marketing timeline, and the event countdowns on one calendar, so you can see where the year collides before it does.
            </p>
            <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.7, color: SLATE, margin: 0, maxWidth: "44ch" }}>
              You give it a handful of real dates. The system supplies the rest: every workbook in the three kits recalculates from those anchors, and it all sorts itself by date.
            </p>
          </div>
          <div className="mt-[clamp(32px,5vw,56px)] flex items-center gap-3">
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.terra, flex: "0 0 auto" }} />
            <span style={{ height: 1.5, background: C.ox, flex: 1 }} />
          </div>
        </div>
      </div>

      {!mounted ? (
        <div className={`${PAD} pb-[clamp(40px,6vw,72px)]`}>
          <p style={{ ...P, maxWidth: 680 }} className="mx-auto md:mx-0">
            Turn on JavaScript and this builds your season calendar from your dates. The three workbooks are still where you manage the work; this one tells you when everything is going to hit.
          </p>
        </div>
      ) : (
        <>
          {/* the tool — inputs left, live preview right on desktop; stacked on mobile */}
          <div className={`${PAD} py-[clamp(28px,4vw,44px)]`} style={{ background: C.cream }}>
            <div className="mx-auto max-w-[1180px] lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-[clamp(32px,4vw,56px)] lg:items-start">
              {/* LEFT: the inputs */}
              <div>
                {/* 01 — import */}
                <SectionHead n="01" title="Start with what you have" />
                <div className="mt-3" style={{ background: "#FFFDF8", border: `1.5px solid ${C.ox}`, padding: "clamp(16px,2.4vw,24px)" }}>
                  {review ? (
                    <>
                      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, color: C.ox }}>Here&rsquo;s what I found: {review.length} {review.length === 1 ? "item" : "items"}.</div>
                      <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.55, color: C.ox, opacity: 0.8, marginTop: 6 }}>
                        Consecutive days are grouped into one show. Fix the names, set the type, then add them. A wrong guess is one click.
                      </p>
                      <div className="mt-4 flex flex-col">
                        {review.map((r, i) => (
                          <div key={i} className="flex flex-col gap-2 py-3" style={{ borderTop: i ? "1px solid rgba(140,27,18,0.12)" : undefined, opacity: r.kind === "ignore" ? 0.5 : 1 }}>
                            <input aria-label={`Item ${i + 1} name`} className="sp-field" value={r.name} onChange={(e) => setReviewRow(i, { name: e.target.value })} style={{ padding: "8px 11px", fontSize: 15 }} />
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                              <span style={{ fontFamily: SANS, fontSize: 12, color: C.terra, minWidth: 90 }}>{fmtDate(r.start)}{r.end ? ` – ${fmtDate(r.end)}` : ""}</span>
                              <div className="flex flex-wrap gap-1.5">
                                {(["production", "fundraiser", "ignore"] as const).map((k) => (
                                  <button key={k} type="button" aria-pressed={r.kind === k} onClick={() => setReviewRow(i, { kind: k })} style={{ fontFamily: SANS, fontSize: 12, padding: "6px 12px", borderRadius: 40, border: `1.5px solid ${C.ox}`, background: r.kind === k ? C.ox : "transparent", color: r.kind === k ? C.cream : C.ox, textTransform: "capitalize" }} className="transition-opacity hover:opacity-80">{k}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button type="button" onClick={applyReview} style={{ fontFamily: SANS, fontSize: 14, color: C.cream, background: C.terra, border: `1.5px solid ${C.terra}`, padding: "11px 22px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">
                          Add {review.filter((r) => r.kind !== "ignore").length} to the form
                        </button>
                        <button type="button" onClick={() => { setReview(null); setImportNote(""); }} style={{ fontFamily: SANS, fontSize: 14, color: C.ox, background: "transparent", border: `1.5px solid ${C.ox}`, padding: "11px 22px", borderRadius: 40 }} className="transition-opacity hover:opacity-70">Start over</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, color: C.ox }}>Start from what you have.</div>
                      <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.55, color: C.ox, opacity: 0.8, marginTop: 6 }}>
                        Paste your season, or a spreadsheet range. Or fill it in by hand below.
                      </p>
                      <textarea
                        aria-label="Paste your season dates"
                        className="sp-field"
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        rows={4}
                        placeholder={"La Boheme, October 15-17 2027\nFall Gala, November 14 2027"}
                        style={{ marginTop: 14, fontFamily: SANS, fontSize: 14, lineHeight: 1.5, resize: "vertical" }}
                      />
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button type="button" onClick={() => ingest(parseText(importText))} disabled={!importText.trim()} style={{ fontFamily: SANS, fontSize: 14, color: C.ox, background: C.peri, border: `1.5px solid ${C.ox}`, padding: "11px 24px", borderRadius: 40, opacity: importText.trim() ? 1 : 0.4, cursor: importText.trim() ? "pointer" : "not-allowed" }} className="transition-opacity hover:opacity-90">Use these dates</button>
                        <button type="button" onClick={loadExample} style={{ fontFamily: SANS, fontSize: 14, color: C.ox, background: "transparent", border: `1.5px solid ${C.ox}`, padding: "11px 24px", borderRadius: 40 }} className="transition-opacity hover:opacity-70">Load a worked season</button>
                      </div>
                      <label
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) readFile(f); }}
                        style={{ display: "inline-block", marginTop: 14, fontFamily: SANS, fontSize: 13, color: dragging ? C.terra : C.ox, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}
                        className="transition-colors hover:opacity-70"
                      >
                        or upload a .ics or .csv file
                        <input type="file" accept=".ics,.csv,text/calendar,text/csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile(f); e.target.value = ""; }} style={{ display: "none" }} />
                      </label>
                      {importStatus && <p aria-live="polite" style={{ fontFamily: SANS, fontSize: 13, color: C.ox, opacity: 0.7, marginTop: 10 }}>{importStatus}</p>}
                      {importNote && <p role="alert" style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: C.terra, marginTop: 10 }}>{importNote}</p>}
                      <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.5, color: C.ox, opacity: 0.6, marginTop: 12 }}>Nothing is sent or saved. It all runs in your browser.</p>
                    </>
                  )}
                </div>

                {/* 02 — anchors */}
                <div className="mt-9"><SectionHead n="02" title="Check the anchors" /></div>
                <div className="mt-4 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px),1fr))" }}>
                  <div>
                    <label htmlFor="sp-start" style={labelStyle}>Season start month</label>
                    <select id="sp-start" className="sp-field" aria-invalid={needsMonth} value={seasonStartMonth} onChange={(e) => setSeasonStartMonth(e.target.value)}>
                      <option value="">Choose a month</option>
                      {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                    </select>
                    {needsMonth && <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.terra, marginTop: 6 }}>Choose a season start month to build the full year.</p>}
                  </div>
                  <div>
                    <label htmlFor="sp-fiscal" style={labelStyle}>Fiscal year ends</label>
                    <select id="sp-fiscal" className="sp-field" value={fiscalYearEndMonth} onChange={(e) => setFiscalYearEndMonth(e.target.value)}>
                      <option value="">June (default)</option>
                      {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sp-ann" style={labelStyle}>Season announcement</label>
                    <input id="sp-ann" className="sp-field" type="date" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="sp-onsale" style={labelStyle}>Single tickets on sale</label>
                    <input id="sp-onsale" className="sp-field" type="date" value={onSale} onChange={(e) => setOnSale(e.target.value)} />
                  </div>
                </div>

                {/* 03 — fill any gaps */}
                <div className="mt-9"><SectionHead n="03" title="Fill any gaps" /></div>
                <div className="mt-5" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: SLATE }}>Your productions</div>
                <div className="mt-3 flex flex-col gap-6">
                  {productions.map((p, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span aria-hidden="true" style={{ width: 14, height: 14, background: C.terra, flex: "0 0 auto", marginTop: 30 }} />
                      <div className="flex-1">
                        <div className="grid gap-3.5 sm:grid-cols-[1fr_150px_150px]">
                          <div>
                            <label style={labelStyle}>Show name</label>
                            <input className="sp-field" value={p.name} onChange={(e) => setProd(i, "name", e.target.value)} placeholder={`Show ${i + 1}`} />
                          </div>
                          <div>
                            <label style={labelStyle}>Opening</label>
                            <input className="sp-field" type="date" value={p.opening} onChange={(e) => setProd(i, "opening", e.target.value)} />
                          </div>
                          <div>
                            <label style={labelStyle}>Closing</label>
                            <input className="sp-field" type="date" aria-invalid={badCloses[i]} value={p.closing} onChange={(e) => setProd(i, "closing", e.target.value)} />
                          </div>
                        </div>
                        {badCloses[i] && <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.terra, marginTop: 6 }}>Closing date must be after opening date.</p>}
                        {productions.length > 1 && (
                          <button type="button" onClick={() => setProductions((r) => r.filter((_, j) => j !== i))} aria-label={`Remove production ${i + 1}`} style={{ marginTop: 10, fontFamily: SANS, fontSize: 12, letterSpacing: ".04em", color: SLATE, background: "transparent", border: "none", padding: 0, textDecoration: "underline", textUnderlineOffset: 2 }} className="transition-opacity hover:opacity-60">Remove</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setProductions((r) => [...r, { name: "", opening: "", closing: "" }])} style={{ marginTop: 14, fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", color: C.ox, background: "transparent", border: "none", padding: 0, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-60">
                  + Add another production
                </button>

                <div className="mt-8" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: SLATE }}>Your fundraising events</div>
                <div className="mt-3 flex flex-col gap-6">
                  {events.map((ev, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span aria-hidden="true" style={{ width: 14, height: 14, background: C.peri, flex: "0 0 auto", marginTop: 30 }} />
                      <div className="flex-1">
                        <div className="grid gap-3.5 sm:grid-cols-[1fr_150px]">
                          <div>
                            <label style={labelStyle}>Event name</label>
                            <input className="sp-field" value={ev.name} onChange={(e) => setEvt(i, "name", e.target.value)} placeholder={`Event ${i + 1}`} />
                          </div>
                          <div>
                            <label style={labelStyle}>Event date</label>
                            <input className="sp-field" type="date" value={ev.date} onChange={(e) => setEvt(i, "date", e.target.value)} />
                          </div>
                        </div>
                        {events.length > 1 && (
                          <button type="button" onClick={() => setEvents((r) => r.filter((_, j) => j !== i))} aria-label={`Remove event ${i + 1}`} style={{ marginTop: 10, fontFamily: SANS, fontSize: 12, letterSpacing: ".04em", color: SLATE, background: "transparent", border: "none", padding: 0, textDecoration: "underline", textUnderlineOffset: 2 }} className="transition-opacity hover:opacity-60">Remove</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setEvents((r) => [...r, { name: "", date: "" }])} style={{ marginTop: 14, fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", color: C.ox, background: "transparent", border: "none", padding: 0, textDecoration: "underline", textUnderlineOffset: 3 }} className="transition-opacity hover:opacity-60">
                  + Add another event
                </button>
              </div>

              {/* RIGHT: the live "Your year" glance (sticky on desktop) */}
              <div className="mt-10 lg:mt-0 lg:sticky lg:top-6">
                <div className="flex items-baseline justify-between gap-4">
                  <SectionHead n="04" title="Your year" />
                  <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: SLATE }}>{calendar.length ? `${calendar.length} dated moves` : "Nothing yet"}</span>
                </div>
                <div className="mt-3">
                  <YearGlance calendar={calendar} productions={productions} events={events} startMonth={seasonStartMonth === "" ? null : Number(seasonStartMonth)} />
                </div>
                <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: SLATE, marginTop: 14, maxWidth: "52ch" }}>
                  Every dated line here is calculated from an anchor above. Move the anchor and the whole ramp moves with it.
                </p>
              </div>
            </div>
          </div>

          {/* the full plan — appears once there is a calendar to show */}
          {calendar.length > 0 && (
            <div className={`${PAD} py-[clamp(40px,6vw,72px)]`} style={{ background: C.cream }}>
              <div className="mx-auto max-w-[1080px]">
                <SectionHead n="05" title="Your year, sorted by date" />

                <div className="mt-5" style={{ border: `1.5px solid ${C.ox}`, background: "#FFFDF8", padding: "clamp(20px,3vw,30px)" }}>
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
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {([["everything", "Everything"], ["workstream", "By workstream"], ["crunch", "The crunch"]] as const).map(([key, label]) => (
                      <button key={key} type="button" onClick={() => setView(key)} style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".04em", padding: "9px 18px", borderRadius: 40, border: `1.5px solid ${C.ox}`, background: view === key ? C.ox : "transparent", color: view === key ? C.cream : C.ox }} className="transition-opacity hover:opacity-80">
                        {label}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".04em", color: C.ox, opacity: 0.7 }}>{calendar.length} actions across your season</div>
                </div>
                <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.5, color: C.ox, opacity: 0.6, marginTop: 8 }}>
                  A ⚠ marks a date that lands on a holiday that would hurt it — mail on a postal day, a donor ask over the winter break. US federal calendar only.
                </p>

                {view === "workstream" && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(["development", "marketing", "events"] as Lane[]).map((lane) => {
                      const on = lanesOn[lane];
                      const c = LANE_COLOR[lane];
                      return (
                        <button key={lane} type="button" aria-pressed={on} onClick={() => setLanesOn((s) => ({ ...s, [lane]: !s[lane] }))} style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "7px 14px", borderRadius: 40, border: `1.5px solid ${c.bg}`, background: on ? c.bg : "transparent", color: on ? c.fg : c.bg, opacity: on ? 1 : 0.55 }} className="transition-opacity">
                          {LANE_LABEL[lane]} · {counts[lane]}
                        </button>
                      );
                    })}
                  </div>
                )}

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

                {/* gated exports */}
                <SeasonExport input={seasonInput} count={calendar.length} />
              </div>
            </div>
          )}
        </>
      )}

      {/* interpretation — after the year */}
      <div className={`${PAD} py-[clamp(56px,7vw,90px)]`} style={{ background: C.peri }}>
        <div className="mx-auto grid max-w-[1240px] gap-x-[clamp(32px,4vw,60px)] gap-y-10 md:grid-cols-3">
          {[
            ["Where the collisions are", "Your year-end appeal lands in the same weeks as the fall fundraiser follow-up, and your spring ask meetings land inside the gala countdown. Neither is wrong. Both need to be on one page before September."],
            ["How to move it", "Anchor each event to its real date and let the sixteen-week countdown slide with it. Anchor each production to its opening and let the eight-week ramp slide with it. Every workbook in the three kits recalculates from those anchors."],
            ["The one number", "Every attendee, every ticket buyer, every sponsor guest goes into the donor pipeline within forty-eight hours, with a stage, an owner, and a next touch. That is the seam where the three kits become one system."],
          ].map(([h, b]) => (
            <div key={h}>
              <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(22px,2.5vw,28px)", letterSpacing: "-.02em", color: C.ox, lineHeight: 1.1, margin: 0 }}>{h}</h3>
              <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.7, color: C.ox, marginTop: 12, maxWidth: "40ch" }}>{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GreenRoom — the one commercial moment on the page, at peak intent */}
      <div className={`${PAD} py-[clamp(56px,8vw,96px)]`} style={{ background: C.ox }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[clamp(30px,4vw,48px)] flex items-center gap-3">
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: C.cream, flex: "0 0 auto" }} />
            <span style={{ height: 1.5, background: C.peach, opacity: 0.6, flex: 1 }} />
          </div>
          <div className="grid items-start gap-[clamp(32px,5vw,72px)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
            {/* the pitch */}
            <div>
              <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", color: C.peri, marginBottom: 20 }}>Built by the same person</div>
              <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,4.6vw,60px)", letterSpacing: "-.02em", color: C.cream, lineHeight: 1.02, margin: "0 0 24px", textWrap: "balance" }}>
                The calendar is the easy half<span style={{ color: C.terra }}>.</span>
              </h2>
              <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.65, color: C.peachSoft, margin: "0 0 18px", maxWidth: "46ch" }}>
                You just watched a year land on one desk. This page can tell you when it hits. It cannot tell you who gave last year, who came to the gala and never came back, or who is owed a thank-you by Friday.
              </p>
              <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.65, color: C.peachSoft, margin: "0 0 30px", maxWidth: "46ch" }}>
                That is the forty-eight hour handoff above, and it is the part a spreadsheet quietly stops doing somewhere around the second event.
              </p>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
                <a
                  href="https://app.greenroomcrm.com/signup?utm_source=bykatiespencer&utm_medium=referral&utm_campaign=season-planner"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => ga("season_greenroom_start")}
                  style={{ fontFamily: SANS, fontSize: 15, color: C.ox, background: C.peri, padding: "13px 28px", borderRadius: 40, textDecoration: "none", display: "inline-block" }}
                  className="transition-opacity hover:opacity-90"
                >
                  Start free
                </a>
                <DoorLink href="https://greenroomcrm.com?utm_source=bykatiespencer&utm_medium=referral&utm_campaign=season-planner" event="season_greenroom_learn" external tone="peri">
                  See how it works →
                </DoorLink>
              </div>
            </div>
            {/* the product card */}
            <div style={{ background: C.cream, color: C.ox, padding: "clamp(24px,3vw,36px)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/redesign/greenroom-logo.svg" alt="GreenRoom" style={{ display: "block", width: "100%", maxWidth: 232, height: "auto", marginBottom: 26 }} />
              <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.65, color: C.ox, margin: "0 0 22px" }}>
                The CRM I built for it. It runs the same five stages the kit teaches, Identify through Steward, so the ladder you just learned is the one you work in.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: SLATE, paddingTop: 20, borderTop: `1.5px solid ${C.ox}` }}>
                <span>Identify</span><span aria-hidden="true">·</span><span>Qualify</span><span aria-hidden="true">·</span><span>Cultivate</span><span aria-hidden="true">·</span><span>Solicit</span><span aria-hidden="true">·</span><span>Steward</span>
              </div>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: SLATE, margin: "22px 0 0" }}>Free up to 500 active accounts.</p>
            </div>
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
