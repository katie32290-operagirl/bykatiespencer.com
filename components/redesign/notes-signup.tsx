"use client";

import { useState } from "react";
import { C, SANS, SERIF, PAD } from "./chrome";

/** "Standing room" — a quiet opt-in for the Notes column. Posts to a Zapier
 *  catch hook when one is configured; if it isn't, it degrades to opening the
 *  visitor's mail client so the button is never a dead end. Same text/plain
 *  approach as the survey opt-in (avoids the CORS preflight Zapier won't
 *  answer).
 *
 *  NEXT_PUBLIC_NOTES_ZAPIER_HOOK is inlined at BUILD time — after changing it
 *  in Vercel, redeploy WITHOUT the build cache or the new value won't ship. */
const HOOK = process.env.NEXT_PUBLIC_NOTES_ZAPIER_HOOK;
const NOTES_EMAIL = "hello@bykatiespencer.com";

export function NotesSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;

    // No list wired up yet: hand off to the mail client rather than pretend.
    if (!HOOK) {
      window.location.href = `mailto:${NOTES_EMAIL}?subject=${encodeURIComponent(
        "Add me to the Notes list",
      )}&body=${encodeURIComponent(`Please add ${value} to your Notes column.`)}`;
      setState("ok");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(HOOK, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          email: value,
          timestamp: new Date().toISOString(),
          source: "notes-standing-room",
        }),
      });
      if (!res.ok) throw new Error();
      setState("ok");
    } catch {
      setState("error");
    }
  }

  return (
    <div className={`${PAD}`} style={{ maxWidth: 1240, margin: "clamp(40px,6vw,72px) auto clamp(48px,7vw,88px)" }}>
      <div
        className="grid items-center gap-[26px]"
        style={{ background: C.peachSoft, padding: "clamp(28px,4vw,48px)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
      >
        <div>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: C.terra }}>Standing room</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3vw,36px)", lineHeight: 1.05, letterSpacing: "-.03em", color: C.ox, marginTop: 14 }}>
            A note in your inbox when there is one.
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: C.ox, marginTop: 12, maxWidth: 460 }}>
            No schedule, no newsletter voice. Two or three a season, the same as the column.
          </p>
        </div>
        {state === "ok" ? (
          <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, color: C.ox }}>
            {HOOK ? "You're on the list. Thank you." : "Thanks — finish sending the email that just opened and I'll add you myself."}
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-wrap gap-3">
            <label htmlFor="notes-optin" className="sr-only">Email address</label>
            <input
              id="notes-optin"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.org"
              autoComplete="email"
              style={{ flex: "1 1 220px", border: `1.5px solid ${C.ox}`, background: C.cream, color: C.ox, padding: "15px 18px", fontFamily: SERIF, fontSize: 16, borderRadius: 0 }}
            />
            <button
              type="submit"
              disabled={state === "sending"}
              style={{ background: C.ox, color: C.cream, borderRadius: 40, padding: "15px 28px", fontFamily: SANS, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", whiteSpace: "nowrap" }}
              className="transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Take a seat"}
            </button>
            {state === "error" && (
              <p role="alert" style={{ fontSize: 14, color: C.ox, width: "100%" }}>
                Something went wrong. Please email {NOTES_EMAIL} and I&rsquo;ll add you myself.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
