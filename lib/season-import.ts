/**
 * Client-side parsing for the /season-planner import door.
 *
 * A small arts org already has its season written down somewhere — a planning
 * sheet, the announcement email, a shared calendar. This reads the three shapes
 * that costs nothing to support: rows copied from a spreadsheet (tab/comma), a
 * line per show ("La Boheme, October 15-17 2027"), and an exported .ics. Nothing
 * is uploaded; every function here runs in the browser and returns plain data
 * for the review step to confirm. No dependencies, no guessing at loose prose.
 */

export type ParsedItem = { name: string; start: Date; end: Date | null };

const MONTHS: Record<string, number> = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
  may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7, sep: 8, sept: 8,
  september: 8, oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
};

function mkDate(y: number, m: number, d: number): Date | null {
  const dt = new Date(y, m, d);
  if (Number.isNaN(dt.getTime()) || dt.getMonth() !== m || dt.getDate() !== d) return null;
  return dt;
}

/** When a written date carries no year, assume the next time it comes around. */
function inferYear(month: number, day: number): number {
  const now = new Date();
  const thisYear = now.getFullYear();
  const candidate = new Date(thisYear, month, day);
  return candidate < new Date(now.getFullYear(), now.getMonth(), now.getDate()) ? thisYear + 1 : thisYear;
}

type Found = { start: Date; end: Date | null; spans: [number, number][] };

/**
 * Pull the date(s) out of one line and report which character spans they used,
 * so the caller can strip them and keep the name.
 */
export function extractDates(line: string): Found | null {
  const dates: { date: Date; span: [number, number] }[] = [];
  let rangeEnd: Date | null = null;
  const spans: [number, number][] = [];

  // ISO yyyy-mm-dd
  for (const m of line.matchAll(/\b(\d{4})-(\d{2})-(\d{2})\b/g)) {
    const d = mkDate(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (d) { dates.push({ date: d, span: [m.index!, m.index! + m[0].length] }); }
  }
  // US m/d/yyyy or m/d/yy
  if (dates.length === 0) {
    for (const m of line.matchAll(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g)) {
      let y = Number(m[3]);
      if (y < 100) y += 2000;
      const d = mkDate(y, Number(m[1]) - 1, Number(m[2]));
      if (d) dates.push({ date: d, span: [m.index!, m.index! + m[0].length] });
    }
  }
  // Month name, a day or day-range, an optional year: "October 15-17, 2027"
  if (dates.length === 0) {
    const re = /\b([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:\s*[-–—]\s*(\d{1,2}))?(?:,?\s*(\d{4}))?\b/g;
    for (const m of line.matchAll(re)) {
      const month = MONTHS[m[1].toLowerCase()];
      if (month === undefined) continue;
      const day1 = Number(m[2]);
      const year = m[4] ? Number(m[4]) : inferYear(month, day1);
      const start = mkDate(year, month, day1);
      if (!start) continue;
      spans.push([m.index!, m.index! + m[0].length]);
      dates.push({ date: start, span: [m.index!, m.index! + m[0].length] });
      if (m[3]) {
        const end = mkDate(year, month, Number(m[3]));
        if (end && end >= start) rangeEnd = end;
      }
    }
  }

  if (dates.length === 0) return null;
  dates.sort((a, b) => a.date.getTime() - b.date.getTime());
  const start = dates[0].date;
  const end = rangeEnd ?? (dates.length > 1 ? dates[dates.length - 1].date : null);
  const allSpans = spans.length ? spans : dates.map((d) => d.span);
  return { start, end: end && end > start ? end : null, spans: allSpans };
}

/** Strip the matched date spans and surrounding punctuation to leave the name. */
function nameFrom(line: string, spans: [number, number][]): string {
  let out = "";
  let cursor = 0;
  for (const [a, b] of [...spans].sort((x, y) => x[0] - y[0])) {
    out += line.slice(cursor, a);
    cursor = b;
  }
  out += line.slice(cursor);
  return out.replace(/[\t,;|–—-]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

/** Parse pasted text: spreadsheet rows, or a line per item. */
export function parseText(input: string): ParsedItem[] {
  const items: ParsedItem[] = [];
  for (const raw of input.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const found = extractDates(line);
    if (!found) continue; // a header row or a line with no date is skipped
    const name = nameFrom(line, found.spans) || "Untitled";
    items.push({ name, start: found.start, end: found.end });
  }
  return items;
}

/* ---- .ics ------------------------------------------------------------- */

function icsDateToLocal(v: string): Date | null {
  // All-day: 20271015. Datetime: 20271015T190000Z or ...T190000. Take the date.
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(v);
  if (!m) return null;
  return mkDate(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** Parse VEVENT blocks. Handles line folding and both DATE and datetime forms. */
export function parseIcs(input: string): ParsedItem[] {
  // Unfold: a line beginning with space or tab continues the previous one.
  const unfolded = input.replace(/\r?\n[ \t]/g, "");
  const lines = unfolded.split(/\r?\n/);
  const items: ParsedItem[] = [];
  let inEvent = false;
  let summary = "";
  let start: Date | null = null;
  let end: Date | null = null;
  let allDay = false;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") { inEvent = true; summary = ""; start = end = null; allDay = false; continue; }
    if (line === "END:VEVENT") {
      if (start) {
        // All-day DTEND is exclusive (the morning after); pull it back a day.
        let close = end;
        if (close && allDay) close = new Date(close.getTime() - 86400000);
        items.push({ name: summary || "Untitled", start, end: close && close > start ? close : null });
      }
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const key = line.slice(0, colon);
    const val = line.slice(colon + 1).trim();
    const name = key.split(";")[0].toUpperCase();
    if (name === "SUMMARY") summary = val.replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\n/gi, " ").replace(/\\\\/g, "\\").trim();
    else if (name === "DTSTART") { start = icsDateToLocal(val); if (/VALUE=DATE(?!-TIME)/i.test(key)) allDay = true; }
    else if (name === "DTEND") end = icsDateToLocal(val);
  }
  return items;
}

/* ---- shaping ---------------------------------------------------------- */

// A fundraiser is the big one: sponsors, an auction, a paddle raise.
const FUNDRAISER_WORDS = /\b(gala|benefit|auction|fundrais|paddle|sponsor|ball)\b/i;
// A plain event is lighter: a donor dinner, a reception, a community night.
const EVENT_WORDS = /\b(dinner|brunch|luncheon|reception|party|community|open house|mixer|salon|member|volunteer|kick[- ]?off|preview)\b/i;

/** Keyword lean for the review step. The user always confirms, and can also
 *  send an item to "Other" to leave it out. */
export function guessKind(name: string): "production" | "fundraiser" | "event" {
  if (FUNDRAISER_WORDS.test(name)) return "fundraiser";
  if (EVENT_WORDS.test(name)) return "event";
  return "production";
}

const DAY = 86400000;

/**
 * Collapse consecutive same-name days into one run: a three-performance weekend
 * of "La Boheme" on the 15th, 16th and 17th becomes one show, Oct 15 to Oct 17.
 */
export function collapseConsecutive(items: ParsedItem[]): ParsedItem[] {
  const sorted = [...items].sort((a, b) => a.start.getTime() - b.start.getTime() || a.name.localeCompare(b.name));
  const out: ParsedItem[] = [];
  for (const it of sorted) {
    const prev = out[out.length - 1];
    const prevEnd = prev ? (prev.end ?? prev.start) : null;
    if (prev && prev.name.toLowerCase() === it.name.toLowerCase() && prevEnd && it.start.getTime() - prevEnd.getTime() <= DAY) {
      const newEnd = it.end ?? it.start;
      if (newEnd > (prev.end ?? prev.start)) prev.end = newEnd;
    } else {
      out.push({ ...it });
    }
  }
  return out;
}
