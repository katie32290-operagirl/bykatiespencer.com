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
 * The milestone language is lifted from the "Your season year at a glance"
 * one-pager (a September-to-May season, three productions, two fundraisers).
 * It does one job: it tells you when everything is going to hit.
 */

export type Lane = "development" | "marketing" | "events";

export type Milestone = {
  date: Date;
  what: string;
  lane: Lane;
  why: string;
  /** Counts toward a "heavy week" in The Crunch. */
  major: boolean;
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
  const push = (date: Date | null, what: string, lane: Lane, why: string, major = false) => {
    if (date && !Number.isNaN(date.getTime())) out.push({ date, what, lane, why, major });
  };

  const productions = input.productions
    .map((p) => ({ name: p.name.trim(), opening: parseLocal(p.opening), closing: parseLocal(p.closing) }))
    .filter((p) => p.opening);
  const events = input.events
    .map((e) => ({ name: e.name.trim(), date: parseLocal(e.date) }))
    .filter((e) => e.date);
  const announcement = parseLocal(input.announcement);
  const onSale = parseLocal(input.onSale);

  // Earliest known activity fixes which calendar year the season lives in.
  const known = [announcement, onSale, ...productions.map((p) => p.opening), ...events.map((e) => e.date)].filter(
    (d): d is Date => !!d,
  );
  if (known.length === 0) return [];
  const earliest = known.reduce((a, b) => (a < b ? a : b));

  const startMonth = input.seasonStartMonth ?? earliest.getMonth();
  let seasonStart = new Date(earliest.getFullYear(), startMonth, 1);
  if (seasonStart > earliest) seasonStart = new Date(earliest.getFullYear() - 1, startMonth, 1);
  const seasonEnd = addMonths(seasonStart, 12);

  // The occurrence of a given month/day that falls inside the season window.
  const inSeason = (month: number, day: number): Date => {
    let d = new Date(seasonStart.getFullYear(), month, day);
    if (d < seasonStart) d = new Date(seasonStart.getFullYear() + 1, month, day);
    return d;
  };

  const nm = (name: string, fallback: string) => (name ? name : fallback);

  /* --- MARKETING: season-level + an 8-week ramp per production --------- */
  push(announcement, "Season announcement: reveal one show a day", "marketing", "The full-season invitation", true);
  push(onSale, "Single tickets on sale", "marketing", "Subscriber window first, then singles");

  productions.forEach((p, i) => {
    const label = nm(p.name, `Show ${i + 1}`);
    const O = p.opening!;
    push(addWeeks(O, -8), `Build the ${label} Show Story Worksheet`, "marketing", "The eight-week ramp begins");
    push(addWeeks(O, -6), `${label} email one`, "marketing", "Six weeks out, the story not the title");
    push(addWeeks(O, -4), `${label} insider email`, "marketing", "Four weeks out");
    push(addWeeks(O, -2), `${label} email three`, "marketing", "Two weeks out");
    push(addDays(O, -7), `${label} first-timer email`, "marketing", "Opening week", true);
    push(O, `${label} opens`, "marketing", "Opening night", true);
    if (p.closing) {
      push(addDays(p.closing, 1), `${label} morning-after survey`, "marketing", "The morning after closing");
      push(addDays(p.closing, 7), `${label} scorecard`, "marketing", "The week after closing");
    }
  });

  // Season scorecard once the last show has closed.
  const closings = productions.map((p) => p.closing).filter((d): d is Date => !!d);
  if (closings.length) {
    const lastClose = closings.reduce((a, b) => (a > b ? a : b));
    push(addWeeks(lastClose, 2), "Season scorecard: new against returning, source, retention show to show", "marketing", "Close the loop on the year");
  }

  /* --- EVENTS: a 16-week countdown per fundraiser --------------------- */
  events.forEach((e, i) => {
    const label = nm(e.name, `Event ${i + 1}`);
    const E = e.date!;
    push(addWeeks(E, -16), `${label} sponsorship selling opens`, "events", "Sixteen weeks out. Lock the date and venue.", true);
    push(addWeeks(E, -12), `${label} save the date and host email one`, "events", "Twelve weeks out");
    push(addWeeks(E, -11), `${label} sponsor deadline`, "events", "Eleven weeks out");
    push(addWeeks(E, -10), `${label} invitation to the printer`, "events", "Ten weeks out", true);
    push(addWeeks(E, -8), `${label} invitations mail; host email two`, "events", "Eight weeks out");
    push(addWeeks(E, -3), `${label} seating deadline; host email three`, "events", "Three weeks out");
    push(addWeeks(E, -2), `${label} scripts final, then to speakers`, "events", "Two weeks out");
    push(addWeeks(E, -1), `${label} AV walk-through and final headcount`, "events", "One week out");
    push(addDays(E, -1), `${label} Know Before You Go`, "events", "The day before");
    push(E, `${label}`, "events", "Event night", true);
    push(addDays(E, 2), `${label} 48-hour thank-yous, receipts, pipeline handoff`, "events", "Forty-eight hours after", true);
    push(addWeeks(E, 2), `${label} debrief`, "events", "Two weeks after");
    push(addWeeks(E, 4), `${label} sponsor stewardship: delivery report and renewal ask`, "events", "Stewardship, then the renewal");
  });

  /* --- DEVELOPMENT: the 12-month donor rhythm ------------------------- */
  const fiscalMonth = input.fiscalYearEndMonth ?? 5; // default June
  const fiscalEnd = inSeason(fiscalMonth, 28);

  push(addWeeks(seasonStart, -8), "Write next year's giving plans", "development", "The quiet month, before the season");
  push(addWeeks(seasonStart, -4), "Pre-season note to your top twenty; book fall coffees", "development", "Warm the list before opening", true);
  push(announcement ?? seasonStart, "Donor announcement: a personal note to the top twenty", "development", "A come-sit-with-me invitation", true);
  push(addMonths(seasonStart, 2), "Impact update one; the board “who do you know” session", "development", "First quarter");
  push(inSeason(10, 1), "Year-end appeal goes out; thank-you calls as gifts arrive", "development", "Year-end giving season", true);
  push(inSeason(11, 1), "Year-end appeal reminder; every gift thanked inside 48 hours", "development", "Holiday note to the top twenty, no ask");
  push(inSeason(0, 15), "Tax receipts; impact update two", "development", "The new-year reset");
  push(addMonths(fiscalEnd, -6), "Mid-year Board Report Card", "development", "Halfway through the fiscal year", true);
  push(addMonths(seasonStart, 7), "Spring appeal and ask meetings with your top donors", "development", "The spring ask", true);
  push(addMonths(seasonStart, 9), "Renewal window opens; renewal asks and thank-you calls", "development", "Season close", true);
  push(fiscalEnd, "Year-end Board Report Card to the chair", "development", "The fiscal year closes", true);
  push(addDays(seasonEnd, -21), "Summer note to the top twenty, no ask; next season teaser", "development", "Debrief and reset");

  // A donor note after each production closes.
  productions.forEach((p, i) => {
    if (p.closing) push(addDays(p.closing, 3), "Post-show donor note", "development", `After ${nm(p.name, `Show ${i + 1}`)}`);
  });

  out.sort((a, b) => a.date.getTime() - b.date.getTime());
  return out;
}

/* ---- The Crunch: weeks where three or more deadlines collide --------- */

export type HeavyWeek = { start: Date; items: Milestone[] };

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
    // Three or more milestones in one week, spread across at least two lanes.
    const lanes = new Set(items.map((m) => m.lane));
    if (items.length >= 3 && lanes.size >= 2) {
      weeks.push({ start: new Date(k), items: items.sort((a, b) => a.date.getTime() - b.date.getTime()) });
    }
  }
  weeks.sort((a, b) => a.start.getTime() - b.start.getTime());
  return weeks;
}
