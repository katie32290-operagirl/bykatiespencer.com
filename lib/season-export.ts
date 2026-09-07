/**
 * Serializers for the /season-planner exports: a calendar file, a spreadsheet,
 * and a print sheet.
 *
 * These take a deliberately minimal row shape rather than the Milestone type
 * from season-logic, so the calendar engine can keep changing shape without
 * dragging the exports along with it.
 */

export type ExportRow = { date: Date; what: string; lane: string; why: string };

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const compact = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const dayName = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long" });

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

/** Stable per-row id, so re-importing updates events instead of duplicating them. */
function rowId(r: ExportRow): string {
  let h = 5381;
  const s = `${ymd(r.date)}|${r.what}`;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

/* ---- spreadsheet ------------------------------------------------------ */

/**
 * CSV for Google Sheets and Excel. Leads with a BOM so Excel reads it as UTF-8,
 * and uses CRLF, which is what both expect.
 */
export function toCsv(rows: ExportRow[]): string {
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [["Date", "Day", "What happens", "Kit", "Why"].map(esc).join(",")];
  for (const r of rows) {
    lines.push([ymd(r.date), dayName(r.date), r.what, r.lane, r.why].map(esc).join(","));
  }
  return `﻿${lines.join("\r\n")}\r\n`;
}

/* ---- calendar --------------------------------------------------------- */

function icsEscape(s: string): string {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 wants content lines under 75 octets, continued with a leading space. */
function fold(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;
  const out: string[] = [];
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const n = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // continuations carry a leading space
    if (bytes + n > limit) {
      out.push(cur);
      cur = "";
      bytes = 0;
    }
    cur += ch;
    bytes += n;
  }
  out.push(cur);
  return out.join("\r\n ");
}

/**
 * An .ics both Google Calendar and Outlook will import.
 *
 * Every entry is an all-day event marked TRANSP:TRANSPARENT, because these are
 * deadlines rather than meetings and should not blank out the day as busy.
 */
export function toIcs(rows: ExportRow[], calendarName: string): string {
  const stamp = `${compact(new Date())}T000000Z`;
  const out: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Katie Spencer//Season Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsEscape(calendarName)}`,
    "X-WR-CALDESC:Development, marketing, and event deadlines on one calendar.",
  ];
  for (const r of rows) {
    out.push(
      "BEGIN:VEVENT",
      `UID:${rowId(r)}@bykatiespencer.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(r.date)}`,
      `DTEND;VALUE=DATE:${compact(addDays(r.date, 1))}`,
      fold(`SUMMARY:${icsEscape(r.what)}`),
      fold(`DESCRIPTION:${icsEscape(`${r.why}\n\n${r.lane} · Your season year at a glance`)}`),
      fold(`CATEGORIES:${icsEscape(r.lane)}`),
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  }
  out.push("END:VCALENDAR");
  return `${out.join("\r\n")}\r\n`;
}

/* ---- print sheet ------------------------------------------------------ */

const LANE_INK: Record<string, string> = {
  Development: "#8C1B12",
  Marketing: "#D65A2E",
  Events: "#A9C3E9",
};

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * A print sheet, grouped by month, that the browser turns into a PDF.
 *
 * This is served as HTML rather than a generated PDF binary on purpose: it
 * keeps the brand type and colour, paginates properly at any length, and costs
 * no dependency. The page asks to print itself as soon as it opens.
 */
export function toPrintHtml(rows: ExportRow[], heading: string): string {
  const months = new Map<string, ExportRow[]>();
  for (const r of rows) {
    const k = `${r.date.getFullYear()}-${pad(r.date.getMonth() + 1)}`;
    const arr = months.get(k);
    if (arr) arr.push(r);
    else months.set(k, [r]);
  }

  const body = [...months.entries()]
    .map(([, items]) => {
      const label = items[0].date
        .toLocaleDateString("en-US", { month: "long", year: "numeric" })
        .toUpperCase();
      const trs = items
        .map(
          (r) => `<tr>
      <td class="d">${esc(r.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }))}</td>
      <td class="w">${esc(r.what)}</td>
      <td class="k"><span class="pill" style="background:${LANE_INK[r.lane] ?? "#8C1B12"};color:${r.lane === "Events" ? "#8C1B12" : "#F0EFEC"}">${esc(r.lane)}</span></td>
      <td class="y">${esc(r.why)}</td>
    </tr>`,
        )
        .join("\n");
      return `<section><h2>${esc(label)}</h2><table>${trs}</table></section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(heading)}</title>
<style>
  @page { size: letter portrait; margin: 0.5in; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #fff; color: #2B2320;
         font-family: Newsreader, Georgia, "Times New Roman", serif; font-size: 9.5pt; }
  header { border-bottom: 2px solid #8C1B12; padding-bottom: 10px; margin-bottom: 16px; }
  .eyebrow { font-family: "Instrument Sans", system-ui, sans-serif; font-size: 7.5pt;
             letter-spacing: .22em; text-transform: uppercase; color: #D65A2E; }
  h1 { font-family: "Instrument Sans", system-ui, sans-serif; font-size: 21pt; font-weight: 700;
       letter-spacing: -.02em; color: #8C1B12; margin: 6px 0 0; }
  .sub { margin: 6px 0 0; color: #2B2320; font-size: 9pt; }
  section { break-inside: auto; margin-bottom: 14px; }
  h2 { font-family: "Instrument Sans", system-ui, sans-serif; font-size: 8pt; font-weight: 700;
       letter-spacing: .16em; color: #8C1B12; margin: 0 0 5px;
       border-bottom: 1px solid rgba(140,27,18,.28); padding-bottom: 3px;
       break-after: avoid; }
  table { width: 100%; border-collapse: collapse; }
  tr { break-inside: avoid; }
  td { padding: 4px 8px 4px 0; vertical-align: top; border-bottom: 1px solid rgba(140,27,18,.12); }
  td.d { font-family: "Instrument Sans", system-ui, sans-serif; font-size: 8pt; color: #D65A2E;
         white-space: nowrap; width: 1.15in; }
  td.w { width: 3.1in; }
  td.k { width: 0.95in; }
  td.y { color: #5a4a44; font-size: 8.5pt; }
  .pill { font-family: "Instrument Sans", system-ui, sans-serif; font-size: 6.5pt; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; padding: 2px 7px; border-radius: 20px;
          white-space: nowrap; }
  footer { margin-top: 18px; border-top: 1px solid #8C1B12; padding-top: 7px;
           font-family: "Instrument Sans", system-ui, sans-serif; font-size: 7pt;
           letter-spacing: .1em; text-transform: uppercase; color: #8C1B12;
           display: flex; justify-content: space-between; }
  @media screen { body { max-width: 8in; margin: 28px auto; padding: 0 20px; } }
</style></head>
<body>
<header>
  <div class="eyebrow">The Small Arts Org Operating Kit &middot; Only in the bundle</div>
  <h1>${esc(heading)}</h1>
  <p class="sub">${rows.length} dates across your year. Development, marketing, and events on one calendar, in the order they will actually hit you.</p>
</header>
${body}
<footer><span>Your season year at a glance</span><span>byKatieSpencer.com</span></footer>
<script>window.addEventListener("load", function () { window.print(); });</script>
</body></html>`;
}
