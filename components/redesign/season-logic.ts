/**
 * Season Year at a Glance — the engine behind /season-planner.
 *
 * The three toolkits each carry their own calendar. This merges them into one
 * chronological operating calendar anchored to the buyer's real dates:
 *   - every fundraising event anchors to its date; the 16-week countdown slides with it
 *   - every production anchors to its opening; the 8-week ramp slides with it
 *   - the development rhythm anchors to the season, the calendar year-end, and the
 *     fiscal year, plus a post-show note after each production closes
 *
 * Every action carries an invisible weight (how big a rock it is) and a
 * movability (fixed, draft early, or nudgeable). The Crunch uses the weight to
 * find genuinely heavy weeks, and the movability to say what to do about them.
 *
 * The milestone language is lifted from the "Your season year at a glance"
 * one-pager. It does one job: it tells you when everything is going to hit.
 */

export type Lane = "development" | "marketing" | "events";
/** fixed = timed to a hard date; draft = can be done early; move3/move7 = nudgeable. */
export type Move = "fixed" | "draft" | "move3" | "move7";

export type Milestone = {
  date: Date;
  what: string;
  lane: Lane;
  why: string;
  weight: 1 | 2 | 3; // light / medium / major
  move: Move;
};

export type Production = { name: string; opening: string; closing: string };
export type FundEvent = { name: string; date: string };

export type SeasonInput = {
  seasonStartMonth: number | null; // 0-11
  announcement: string;
  onSale: string;
  fiscalYearEndMonth: number | null; // 0-11
  productions: Production[];
  events: FundEvent[];
};

/* ---- date helpers ----------------------------------------------------- */

/** Parse a yyyy-mm-dd value as a local date (no timezone shift). */
export function parseLocal(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}
function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
function addWeeks(d: Date, n: number): Date {
  return addDays(d, n * 7);
}
function addMonths(d: Date, n: number): Date {
  const c = new Date(d);
  c.setMonth(c.getMonth() + n);
  return c;
}

/** Short, unambiguous date for the table: "Aug 3, 2026". */
export function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
/** "September 13" — for prose like the busiest-stretch line. */
export function fmtLong(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}
/** "JULY 2026" — the month-band label. */
export function fmtMonth(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
}
export function monthKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}`;
}
/** Monday of the week containing d. */
export function weekStart(d: Date): Date {
  const c = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return addDays(c, -((c.getDay() + 6) % 7));
}
/** "Oct 12–18" (or spanning months, "Sep 28 – Oct 4"). */
export function fmtWeek(start: Date): string {
  const end = addDays(start, 6);
  const mo = (x: Date) => x.toLocaleDateString("en-US", { month: "short" });
  if (start.getMonth() === end.getMonth()) return `${mo(start)} ${start.getDate()}–${end.getDate()}`;
  return `${mo(start)} ${start.getDate()} – ${mo(end)} ${end.getDate()}`;
}

export const LANE_LABEL: Record<Lane, string> = {
  development: "Development",
  marketing: "Marketing",
  events: "Events",
};

/* ---- the calendar ----------------------------------------------------- */

export function buildCalendar(input: SeasonInput): Milestone[] {
  const out: Milestone[] = [];
  const push = (date: Date | null, what: string, lane: Lane, why: string, weight: 1 | 2 | 3, move: Move) => {
    if (date && !Number.isNaN(date.getTime())) out.push({ date, what, lane, why, weight, move });
  };

  const productions = input.productions
    .map((p) => ({ name: p.name.trim(), opening: parseLocal(p.opening), closing: parseLocal(p.closing) }))
    .filter((p) => p.opening);
  const events = input.events
    .map((e) => ({ name: e.name.trim(), date: parseLocal(e.date) }))
    .filter((e) => e.date);
  const announcement = parseLocal(input.announcement);
  const onSale = parseLocal(input.onSale);

  // Anchor the twelve-month season to the earliest thing that actually happens
  // IN it: a production opening or an event. The announcement and on-sale dates
  // are for selling the season and often belong to the season BEFORE it (you
  // announce next year in February), so they generate their own milestones but
  // must never choose the year. Fall back to announcement, then on-sale, only
  // when there is nothing else to anchor to.
  const anchors = [...productions.map((p) => p.opening), ...events.map((e) => e.date)].filter(
    (d): d is Date => !!d,
  );
  const earliest =
    anchors.length > 0 ? anchors.reduce((a, b) => (a < b ? a : b)) : (announcement ?? onSale);
  if (!earliest) return [];

  const startMonth = input.seasonStartMonth ?? earliest.getMonth();
  let seasonStart = new Date(earliest.getFullYear(), startMonth, 1);
  if (seasonStart > earliest) seasonStart = new Date(earliest.getFullYear() - 1, startMonth, 1);
  const seasonEnd = addMonths(seasonStart, 12);

  const inSeason = (month: number, day: number): Date => {
    let d = new Date(seasonStart.getFullYear(), month, day);
    if (d < seasonStart) d = new Date(seasonStart.getFullYear() + 1, month, day);
    return d;
  };
  const nm = (name: string, fallback: string) => (name ? name : fallback);

  /* --- MARKETING: season-level + an 8-week ramp per production --------- */
  push(announcement, "Season announcement: reveal one show a day", "marketing", "The full-season invitation", 3, "fixed");
  push(onSale, "Single tickets on sale", "marketing", "Subscriber window first, then singles", 2, "fixed");

  productions.forEach((p, i) => {
    const label = nm(p.name, `Show ${i + 1}`);
    const O = p.opening!;
    push(addWeeks(O, -8), `Build the ${label} Show Story Worksheet`, "marketing", "The eight-week ramp begins", 2, "draft");
    push(addWeeks(O, -6), `${label} email one`, "marketing", "Six weeks out, the story not the title", 1, "move3");
    push(addWeeks(O, -4), `${label} insider email`, "marketing", "Four weeks out", 1, "move3");
    push(addWeeks(O, -2), `${label} email three`, "marketing", "Two weeks out", 1, "move3");
    push(addDays(O, -7), `${label} first-timer email`, "marketing", "Opening week", 1, "move3");
    push(O, `${label} opens`, "marketing", "Opening night", 3, "fixed");
    if (p.closing) {
      push(addDays(p.closing, 1), `${label} morning-after survey`, "marketing", "The morning after closing", 1, "move3");
      push(addDays(p.closing, 7), `${label} scorecard`, "marketing", "The week after closing", 1, "move7");
    }
  });

  const closings = productions.map((p) => p.closing).filter((d): d is Date => !!d);
  if (closings.length) {
    const lastClose = closings.reduce((a, b) => (a > b ? a : b));
    push(addWeeks(lastClose, 2), "Season scorecard: new against returning, source, retention", "marketing", "Close the loop on the year", 1, "move7");
  }

  /* --- EVENTS: a 16-week countdown per fundraiser --------------------- */
  events.forEach((e, i) => {
    const label = nm(e.name, `Event ${i + 1}`);
    const E = e.date!;
    push(addWeeks(E, -16), `${label} sponsorship selling opens`, "events", "Sixteen weeks out. Lock the date and venue.", 2, "move7");
    push(addWeeks(E, -12), `${label} save the date and host email one`, "events", "Twelve weeks out", 1, "move3");
    // 10 weeks: sponsor recognition deadline and the invitation to the printer are the same beat.
    push(addWeeks(E, -10), `${label} sponsor recognition deadline; invitation to the printer`, "events", "Ten weeks out, the print deadline", 3, "fixed");
    push(addWeeks(E, -8), `${label} invitations mail; host email two`, "events", "Eight weeks out", 2, "move3");
    push(addWeeks(E, -3), `${label} seating deadline; host email three`, "events", "Three weeks out", 2, "move3");
    push(addWeeks(E, -2), `${label} scripts final, then to speakers`, "events", "Two weeks out", 2, "draft");
    push(addWeeks(E, -1), `${label} AV walk-through and final headcount`, "events", "One week out", 1, "fixed");
    push(addDays(E, -1), `${label} Know Before You Go`, "events", "The day before", 1, "fixed");
    push(E, `${label}`, "events", "Event night", 3, "fixed");
    push(addDays(E, 2), `${label} 48-hour thank-yous, receipts, pipeline handoff`, "events", "Forty-eight hours after", 2, "fixed");
    push(addWeeks(E, 2), `${label} debrief`, "events", "Two weeks after", 1, "move7");
    push(addWeeks(E, 4), `${label} sponsor stewardship: delivery report and renewal ask`, "events", "Stewardship, then the renewal", 2, "move7");
  });

  /* --- DEVELOPMENT: the 12-month donor rhythm ------------------------- */
  const fiscalMonth = input.fiscalYearEndMonth ?? 5; // default June
  const fiscalEnd = inSeason(fiscalMonth, 28);

  push(addWeeks(seasonStart, -8), "Write next year's giving plans", "development", "The quiet month, before the season", 1, "draft");
  push(addWeeks(seasonStart, -4), "Pre-season note to your top twenty; book fall coffees", "development", "Warm the list before opening", 2, "move7");
  push(announcement ?? seasonStart, "Donor announcement: a personal note to the top twenty", "development", "A come-sit-with-me invitation", 2, "move3");
  push(addMonths(seasonStart, 2), "Impact update one; the board “who do you know” session", "development", "First quarter", 2, "move7");
  push(inSeason(10, 1), "Year-end appeal goes out; thank-you calls as gifts arrive", "development", "Year-end giving season", 3, "fixed");
  push(inSeason(11, 1), "Year-end appeal reminder; every gift thanked inside 48 hours", "development", "Holiday note to the top twenty, no ask", 1, "move3");
  push(inSeason(0, 15), "Tax receipts; impact update two", "development", "The new-year reset", 1, "move7");
  push(addMonths(fiscalEnd, -6), "Mid-year Board Report Card", "development", "Halfway through the fiscal year", 2, "draft");
  push(addMonths(seasonStart, 7), "Spring appeal and ask meetings with your top donors", "development", "The spring ask", 3, "move7");
  push(addMonths(seasonStart, 9), "Renewal window opens; renewal asks and thank-you calls", "development", "Season close", 2, "move7");
  push(fiscalEnd, "Year-end Board Report Card to the chair", "development", "The fiscal year closes", 2, "draft");
  push(addDays(seasonEnd, -21), "Summer note to the top twenty, no ask; next season teaser", "development", "Debrief and reset", 1, "move7");

  productions.forEach((p, i) => {
    if (p.closing) push(addDays(p.closing, 3), "Post-show donor note", "development", `After ${nm(p.name, `Show ${i + 1}`)}`, 2, "draft");
  });

  out.sort((a, b) => a.date.getTime() - b.date.getTime());
  return out;
}

/* ---- The Crunch: weeks where the load piles up ---------------------- */

export type HeavyWeek = { start: Date; items: Milestone[]; load: number; advice: string };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
function listWords(xs: string[]): string {
  if (xs.length <= 1) return xs[0] ?? "";
  if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
  return `${xs.slice(0, -1).join(", ")}, and ${xs[xs.length - 1]}`;
}

/** Deterministic "what to do" from the week's movability mix. */
function advise(items: Milestone[]): string {
  const short = (m: Milestone) => m.what.replace(/[.;].*$/, "").trim();
  const draft = items.filter((m) => m.move === "draft");
  const anchors = items.filter((m) => m.move === "fixed" && m.weight >= 3);
  const movable = items.filter((m) => m.move === "move3" || m.move === "move7");

  if (draft.length) {
    return `Draft ahead: get ${listWords(draft.slice(0, 2).map(short))} done before this week hits.`;
  }
  if (anchors.length && movable.length) {
    const mv = movable[0];
    const when = mv.move === "move7" ? "to the following week" : "a few days either side";
    return `Protect the fixed dates. ${cap(short(mv))} can move ${when}.`;
  }
  if (anchors.length >= 2) {
    return "Two immovable dates land together. Block the week and clear your meetings.";
  }
  if (movable.length >= 2) {
    return `Busy but flexible. Nudge ${short(movable[0]).toLowerCase()} off the pile to spread the load.`;
  }
  return "A full week. Decide now what gets drafted early.";
}

export function heavyWeeks(cal: Milestone[]): HeavyWeek[] {
  const byWeek = new Map<number, Milestone[]>();
  for (const m of cal) {
    const k = weekStart(m.date).getTime();
    const arr = byWeek.get(k);
    if (arr) arr.push(m);
    else byWeek.set(k, [m]);
  }
  const weeks: HeavyWeek[] = [];
  for (const [k, items] of byWeek) {
    const load = items.reduce((s, m) => s + m.weight, 0);
    // A genuinely heavy week: enough weight to hurt, across at least two lanes.
    const lanes = new Set(items.map((m) => m.lane));
    if (load >= 6 && lanes.size >= 2) {
      const sorted = items.sort((a, b) => a.date.getTime() - b.date.getTime());
      weeks.push({ start: new Date(k), items: sorted, load, advice: advise(sorted) });
    }
  }
  weeks.sort((a, b) => a.start.getTime() - b.start.getTime());
  return weeks;
}

/** The highest-load ~9-week window, for the "your busiest stretch is…" line. */
export function busiestStretch(cal: Milestone[]): { start: Date; end: Date } | null {
  if (cal.length < 4) return null;
  const WINDOW = 63 * 86400000;
  let best = { load: -1, start: cal[0].date, end: cal[0].date };
  for (let i = 0; i < cal.length; i++) {
    let load = 0;
    let j = i;
    while (j < cal.length && cal[j].date.getTime() - cal[i].date.getTime() <= WINDOW) {
      load += cal[j].weight;
      j++;
    }
    if (load > best.load) best = { load, start: cal[i].date, end: cal[j - 1].date };
  }
  return { start: best.start, end: best.end };
}

// Export serialization (.ics/.csv/print) lives in lib/season-export.ts, gated
// behind the Payhip unlock. The engine here stays export-agnostic on purpose.
