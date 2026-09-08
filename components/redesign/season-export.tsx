"use client";

import { useCallback, useEffect, useState } from "react";
import { C, SANS, SERIF } from "./tokens";
import type { SeasonInput } from "./season-logic";

/**
 * The gated export panel under the season calendar.
 *
 * The planner is open to everyone. This is the part you buy: the calendar in a
 * form you can take away. A buyer pastes their Payhip license key once, the
 * server checks it and sets a cookie, and the field never comes back on that
 * device.
 */

type Format = "ics" | "csv" | "print";
type Gate = "checking" | "locked" | "unlocked";

const PANEL: React.CSSProperties = {
  border: `1.5px solid ${C.ox}`,
  background: "#FFFDF8",
  padding: "clamp(22px,3.4vw,34px)",
};
const H: React.CSSProperties = {
  fontFamily: SANS,
  fontWeight: 700,
  fontSize: "clamp(19px,2.4vw,25px)",
  letterSpacing: "-.01em",
  color: C.ox,
  lineHeight: 1.15,
};
const BODY: React.CSSProperties = { fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: C.ox };
const NOTE: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 12.5,
  lineHeight: 1.6,
  color: C.ox,
  opacity: 0.75,
};

const DOWNLOADS: { format: Format; label: string; hint: string }[] = [
  { format: "ics", label: "Add to your calendar", hint: "One .ics file. Import it into Google Calendar or Outlook and every date lands as an all-day reminder." },
  { format: "csv", label: "Open as a spreadsheet", hint: "A .csv for Google Sheets or Excel, with a column for the day of the week." },
  { format: "print", label: "Print or save as PDF", hint: "A month-by-month sheet, laid out for paper." },
];

function button(primary: boolean, busy: boolean): React.CSSProperties {
  return {
    fontFamily: SANS,
    fontSize: 14,
    letterSpacing: ".02em",
    padding: "12px 22px",
    borderRadius: 40,
    border: `1.5px solid ${C.ox}`,
    background: primary ? C.ox : "transparent",
    color: primary ? C.cream : C.ox,
    cursor: busy ? "wait" : "pointer",
    opacity: busy ? 0.6 : 1,
    whiteSpace: "nowrap",
  };
}

export function SeasonExport({ input, count }: { input: SeasonInput; count: number }) {
  const [gate, setGate] = useState<Gate>("checking");
  const [licenseKey, setLicenseKey] = useState("");
  const [busy, setBusy] = useState<null | "unlock" | Format>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    fetch("/api/season/unlock")
      .then((r) => r.json())
      .then((d: { unlocked?: boolean }) => {
        if (live) setGate(d.unlocked ? "unlocked" : "locked");
      })
      .catch(() => live && setGate("locked"));
    return () => {
      live = false;
    };
  }, []);

  const unlock = useCallback(async () => {
    if (!licenseKey.trim()) return;
    setBusy("unlock");
    setError("");
    try {
      const res = await fetch("/api/season/unlock", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (res.ok && data.ok) {
        setGate("unlocked");
        setLicenseKey("");
      } else {
        setError(data.message ?? "That did not work. Try again.");
      }
    } catch {
      setError("We could not reach the server. Try again in a moment.");
    } finally {
      setBusy(null);
    }
  }, [licenseKey]);

  const download = useCallback(
    async (format: Format) => {
      setBusy(format);
      setError("");
      try {
        const res = await fetch("/api/season/export", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ format, input }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as { message?: string } | null;
          if (res.status === 401) setGate("locked");
          setError(data?.message ?? "That download failed. Try again.");
          return;
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (format === "print") {
          window.open(url, "_blank", "noopener");
        } else {
          const a = document.createElement("a");
          a.href = url;
          a.download = res.headers.get("content-disposition")?.match(/filename="([^"]+)"/)?.[1] ?? `season-calendar.${format}`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch {
        setError("That download failed. Try again in a moment.");
      } finally {
        setBusy(null);
      }
    },
    [input],
  );

  const forget = useCallback(async () => {
    await fetch("/api/season/unlock", { method: "DELETE" }).catch(() => {});
    setGate("locked");
  }, []);

  if (gate === "checking" || count === 0) return null;

  return (
    <div className="mt-8" style={PANEL}>
      {gate === "unlocked" ? (
        <>
          <div style={H}>Take your year with you.</div>
          <p style={{ ...BODY, marginTop: 10, maxWidth: 640 }}>
            All {count} dates, in whichever form you actually work in.
          </p>
          <div className="mt-6 flex flex-col gap-5">
            {DOWNLOADS.map((d, i) => (
              <div key={d.format} className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <button
                  type="button"
                  onClick={() => download(d.format)}
                  disabled={busy !== null}
                  style={{ ...button(i === 0, busy === d.format), minWidth: 210 }}
                  className="transition-opacity hover:opacity-80"
                >
                  {busy === d.format ? "Building…" : d.label}
                </button>
                <span style={{ ...NOTE, flex: "1 1 320px" }}>{d.hint}</span>
              </div>
            ))}
          </div>
          {error && (
            <p style={{ ...NOTE, color: C.terra, opacity: 1, marginTop: 16 }}>{error}</p>
          )}
          <p style={{ ...NOTE, marginTop: 22 }}>
            In Google Calendar, make a new calendar first, then Settings, then Import, so you can hide
            the whole year in one click. In Outlook it is File, then Open &amp; Export, then Import.{" "}
            <button
              type="button"
              onClick={forget}
              style={{ fontFamily: SANS, fontSize: 12.5, color: C.ox, background: "transparent", border: "none", padding: 0, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}
            >
              Use a different key
            </button>
          </p>
        </>
      ) : (
        <>
          <div style={H}>Take your year with you.</div>
          <p style={{ ...BODY, marginTop: 10, maxWidth: 640 }}>
            The planner is free to use, and it stays that way. Downloading your {count} dates, as a
            calendar you can import, a spreadsheet, or a printed sheet, comes with{" "}
            <a href={"https://payhip.com/order?link[]=6FiAt&parent_url=https%3A%2F%2Fwww.bykatiespencer.com%2Ftoolkits&type=fallback_direct"} target="_blank" rel="noopener noreferrer" style={{ color: C.terra, textDecoration: "underline", textUnderlineOffset: 2 }} className="transition-opacity hover:opacity-70">The Small Arts Org Operating Kit</a>.
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <div style={{ flex: "1 1 300px" }}>
              <label htmlFor="sp-license" style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox, marginBottom: 5, display: "block" }}>
                Already bought it? Paste your license key
              </label>
              <input
                id="sp-license"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && unlock()}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                autoComplete="off"
                spellCheck={false}
                style={{ width: "100%", boxSizing: "border-box", background: C.cream, border: `1.5px solid ${C.ox}`, padding: "11px 13px", fontFamily: SERIF, fontSize: 16, color: C.ox, outline: "none" }}
              />
            </div>
            <button
              type="button"
              onClick={unlock}
              disabled={busy !== null || !licenseKey.trim()}
              style={{ ...button(true, busy === "unlock"), height: 46, opacity: licenseKey.trim() ? (busy ? 0.6 : 1) : 0.45 }}
              className="transition-opacity hover:opacity-80"
            >
              {busy === "unlock" ? "Checking…" : "Unlock downloads"}
            </button>
          </div>
          {error && <p style={{ ...NOTE, color: C.terra, opacity: 1, marginTop: 14 }}>{error}</p>}
          <p style={{ ...NOTE, marginTop: 16 }}>
            Your key is in the email that came with your files. You only paste it once.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ borderTop: `1px solid rgba(140,27,18,.18)`, paddingTop: 20 }}>
            <a href="/toolkits" style={{ ...button(false, false), textDecoration: "none", display: "inline-block" }} className="transition-opacity hover:opacity-70">
              See the kit
            </a>
            <span style={{ ...NOTE, flex: "1 1 300px" }}>
              Three kits, plus this planner and the one-page year at a glance that only exists in the bundle.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
