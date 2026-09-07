/**
 * POST /api/season/export — the gated download.
 *
 * The calendar is rebuilt here from the buyer's raw dates rather than trusting
 * whatever the browser computed. That is what makes the gate real: the file is
 * assembled on the server, behind the cookie check, and never simply released
 * from something the page had lying around.
 */

import { cookies } from "next/headers";
import { buildCalendar, LANE_LABEL, type Lane, type SeasonInput } from "@/components/redesign/season-logic";
import { toCsv, toIcs, toPrintHtml, type ExportRow } from "@/lib/season-export";
import { UNLOCK_COOKIE, readUnlockToken } from "@/lib/season-gate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Format = "ics" | "csv" | "print";
const FORMATS: Format[] = ["ics", "csv", "print"];

const CALENDAR_NAME = "Your season year at a glance";
const LANES: Lane[] = ["development", "marketing", "events"];

/** An optional workstream filter, so a buyer can take just the events calendar. */
function cleanLanes(raw: unknown): Lane[] | null {
  if (!Array.isArray(raw)) return null;
  const picked = LANES.filter((l) => raw.includes(l));
  return picked.length > 0 && picked.length < LANES.length ? picked : null;
}

/** Trust nothing off the wire: rebuild the input from scratch, field by field. */
function cleanInput(raw: unknown): SeasonInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const month = (v: unknown) =>
    typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 11 ? v : null;
  const date = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");
  const name = (v: unknown) => (typeof v === "string" ? v.slice(0, 120) : "");
  const list = <T,>(v: unknown, map: (x: Record<string, unknown>) => T): T[] =>
    Array.isArray(v) ? v.slice(0, 40).filter((x) => x && typeof x === "object").map((x) => map(x as Record<string, unknown>)) : [];

  return {
    seasonStartMonth: month(r.seasonStartMonth),
    announcement: date(r.announcement),
    onSale: date(r.onSale),
    fiscalYearEndMonth: month(r.fiscalYearEndMonth),
    productions: list(r.productions, (p) => ({
      name: name(p.name),
      opening: date(p.opening),
      closing: date(p.closing),
    })),
    events: list(r.events, (e) => ({ name: name(e.name), date: date(e.date) })),
  };
}

function filename(format: Format, lanes: Lane[] | null): string {
  const stamp = new Date().toISOString().slice(0, 10);
  const scope = lanes ? `-${lanes.join("-")}` : "";
  return `season-calendar${scope}-${stamp}.${format === "print" ? "html" : format}`;
}

export async function POST(request: Request) {
  const jar = await cookies();
  const unlocked = await readUnlockToken(jar.get(UNLOCK_COOKIE)?.value).catch(() => null);
  if (!unlocked) {
    return Response.json(
      { ok: false, message: "Add your license key to download your calendar." },
      { status: 401 },
    );
  }

  let body: { format?: unknown; input?: unknown; lanes?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const format = FORMATS.includes(body.format as Format) ? (body.format as Format) : null;
  const input = cleanInput(body.input);
  if (!format || !input) {
    return Response.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const lanes = cleanLanes(body.lanes);
  const calendar = buildCalendar(input).filter((m) => !lanes || lanes.includes(m.lane));
  if (calendar.length === 0) {
    return Response.json(
      { ok: false, message: "Add a season start month and at least one production or fundraiser first." },
      { status: 422 },
    );
  }

  const rows: ExportRow[] = calendar.map((m) => ({
    date: m.date,
    what: m.what,
    lane: LANE_LABEL[m.lane],
    why: m.why,
    note: m.warning,
  }));

  const title = lanes
    ? `${CALENDAR_NAME} · ${lanes.map((l) => LANE_LABEL[l]).join(", ")}`
    : CALENDAR_NAME;

  const [payload, type] =
    format === "ics"
      ? [toIcs(rows, title), "text/calendar; charset=utf-8"]
      : format === "csv"
        ? [toCsv(rows), "text/csv; charset=utf-8"]
        : [toPrintHtml(rows, title), "text/html; charset=utf-8"];

  return new Response(payload, {
    headers: {
      "content-type": type,
      // The print sheet opens in a tab and prints itself; the other two save.
      "content-disposition":
        format === "print" ? "inline" : `attachment; filename="${filename(format, lanes)}"`,
      "cache-control": "no-store",
    },
  });
}
