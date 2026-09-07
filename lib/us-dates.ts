/**
 * US holidays and closures for /season-planner, computed not fetched.
 *
 * Every US federal holiday is a fixed date or an nth-weekday rule, and Easter is
 * the standard Computus. No dependency, no API, works for any year. The point is
 * not a pretty calendar: it is to stop the engine telling someone to mail their
 * invitations on Thanksgiving or book donor calls between Christmas and New Year.
 *
 * US only. If you ever want major Jewish holidays (they matter for board and
 * donor scheduling in a lot of cities), note the Hebrew calendar is not a simple
 * rule and needs a lookup table or a library — a separate decision, not a quick
 * add here.
 */

export type ClosureTier = "closed" | "long" | "postal" | "sector";

export type Closure = { date: Date; name: string; tier: ClosureTier };

/* ---- date helpers ----------------------------------------------------- */

function d(y: number, m: number, day: number): Date {
  return new Date(y, m, day);
}
function addDays(x: Date, n: number): Date {
  const c = new Date(x);
  c.setDate(c.getDate() + n);
  return c;
}
/** The nth given weekday of a month. weekday: 0=Sun … 6=Sat. */
function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const first = d(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return d(year, month, 1 + offset + (n - 1) * 7);
}
/** The last given weekday of a month. */
function lastWeekday(year: number, month: number, weekday: number): Date {
  const last = d(year, month + 1, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return d(year, month, last.getDate() - offset);
}
/** Federal observed rule: Saturday → the Friday before, Sunday → the Monday after. */
export function observed(x: Date): Date {
  const wd = x.getDay();
  if (wd === 6) return addDays(x, -1);
  if (wd === 0) return addDays(x, 1);
  return x;
}

/* ---- the moveable feasts ---------------------------------------------- */

/** Easter Sunday (Gregorian Computus). */
export function easter(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const dd = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - dd - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const mm = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * mm + 114) / 31);
  const day = ((h + l - 7 * mm + 114) % 31) + 1;
  return d(year, month - 1, day);
}
export function thanksgiving(year: number): Date {
  return nthWeekday(year, 10, 4, 4); // 4th Thursday of November
}
/** The Tuesday after Thanksgiving. */
export function givingTuesday(year: number): Date {
  return addDays(thanksgiving(year), 5);
}

/* ---- the closure list ------------------------------------------------- */

const iso = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;

/**
 * Every closure whose date lands in `year`. Blocks (Thanksgiving Thursday
 * through Sunday, Dec 24 through Dec 31, the long weekends) are emitted one day
 * at a time so a collision check is a plain date lookup. The Dec 24 – Jan 1
 * block is completed by New Year's Day appearing in the next year's list.
 */
export function closuresFor(year: number): Closure[] {
  const out: Closure[] = [];
  const seen = new Set<string>();
  const add = (date: Date, name: string, tier: ClosureTier) => {
    const key = iso(date);
    if (seen.has(key)) return; // first, most-specific name wins
    seen.add(key);
    out.push({ date, name, tier });
  };
  const block = (from: Date, to: Date, name: string, tier: ClosureTier) => {
    for (let x = new Date(from); x <= to; x = addDays(x, 1)) add(new Date(x), name, tier);
  };
  const long = (mon: Date, name: string) => block(addDays(mon, -2), mon, name, "long");

  // Closed blocks — nothing lands, nobody reads email.
  const thx = thanksgiving(year);
  block(thx, addDays(thx, 3), "Thanksgiving weekend", "closed");
  block(d(year, 11, 24), d(year, 11, 31), "the winter holidays", "closed");
  add(observed(d(year, 0, 1)), "New Year's Day", "closed");

  // Sector days — not closures, opportunities or programming notes.
  add(givingTuesday(year), "Giving Tuesday", "sector");
  add(easter(year), "Easter Sunday", "sector");
  add(addDays(easter(year), -2), "Good Friday", "sector");

  // Long weekends — bad for mail and meetings, fine for some events.
  long(lastWeekday(year, 4, 1), "Memorial Day weekend"); // last Monday of May
  long(nthWeekday(year, 8, 1, 1), "Labor Day weekend"); // 1st Monday of September
  // Independence Day is a fixed date: flag its observed day and its weekend.
  const jul4 = d(year, 6, 4);
  add(observed(jul4), "Independence Day", "long");
  add(jul4, "Independence Day", "long");
  const jul4Sat = addDays(jul4, -((jul4.getDay() + 1) % 7)); // Saturday of that week
  add(jul4Sat, "Fourth of July weekend", "long");
  add(addDays(jul4Sat, 1), "Fourth of July weekend", "long");

  // Postal holidays — USPS does not deliver, business otherwise as usual.
  add(nthWeekday(year, 0, 1, 3), "Martin Luther King Jr. Day", "postal"); // 3rd Mon Jan
  add(nthWeekday(year, 1, 1, 3), "Presidents' Day", "postal"); // 3rd Mon Feb
  add(observed(d(year, 5, 19)), "Juneteenth", "postal");
  add(nthWeekday(year, 9, 1, 2), "Indigenous Peoples' Day", "postal"); // 2nd Mon Oct
  add(observed(d(year, 10, 11)), "Veterans Day", "postal");

  out.sort((a, b) => a.date.getTime() - b.date.getTime());
  return out;
}

/** A date → closure lookup across every year a calendar might span. */
export function closureIndex(years: number[]): Map<string, Closure> {
  const map = new Map<string, Closure>();
  for (const y of years) for (const c of closuresFor(y)) map.set(iso(c.date), c);
  return map;
}

export function closureOn(index: Map<string, Closure>, date: Date): Closure | undefined {
  return index.get(iso(date));
}
