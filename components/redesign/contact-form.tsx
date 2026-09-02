"use client";

import { useState } from "react";
import { toast } from "sonner";
import { C, SANS, SERIF } from "./tokens";

const OPTIONS = ["Narratives", "Advising", "Speaking", "Something else"];
const INBOX = "hello@bykatiespencer.com";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const label: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 11,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: C.ox,
  marginBottom: 6,
  display: "block",
};
const field: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: C.cream,
  border: `1.5px solid ${C.ox}`,
  padding: "12px 14px",
  fontFamily: SERIF,
  fontSize: 16,
  color: C.ox,
  outline: "none",
};

/** Connect form — warm redesign. Same web3forms submit as the site form, with a
 *  mailto fallback until the key is configured. */
export function ContactFormRedesign() {
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (o: string) =>
    setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const interested = selected.join(", ") || "—";

    if (!ACCESS_KEY) {
      const body = `Name: ${fd.name}\nEmail: ${fd.email}\nOrganization: ${fd.organization || "—"}\nInterested in: ${interested}\n\n${fd.message}`;
      window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(`New note from ${fd.name}`)}&body=${encodeURIComponent(body)}`;
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New note from ${fd.name} — bykatiespencer.com`,
          from_name: "bykatiespencer.com",
          replyto: fd.email,
          botcheck: fd.botcheck ?? "",
          Name: fd.name,
          Email: fd.email,
          Organization: fd.organization || "—",
          "Interested in": interested,
          Message: fd.message,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      toast.success("Thanks! Your note is on its way.", { description: "I'll get back to you within a couple of days." });
      form.reset();
      setSelected([]);
    } catch {
      toast.error("Something went wrong.", { description: `Please email ${INBOX} directly.` });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ background: C.peri, padding: "clamp(28px,4vw,48px)" }}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.ox }}>✦ Stage door · leave a note</div>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(30px,4vw,38px)", letterSpacing: "-.02em", color: C.ox, lineHeight: 1, marginTop: 14 }}>
        Tell me what you&rsquo;re working on.
      </div>

      <div className="mt-8 grid gap-[18px] sm:grid-cols-2">
        <div>
          <label htmlFor="name" style={label}>Name</label>
          <input id="name" name="name" required autoComplete="name" style={field} />
        </div>
        <div>
          <label htmlFor="email" style={label}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" style={field} />
        </div>
      </div>

      <div className="mt-[18px]">
        <label htmlFor="organization" style={label}>Organization</label>
        <input id="organization" name="organization" autoComplete="organization" style={field} />
      </div>

      <div className="mt-[18px]">
        <div style={label}>What brings you here?</div>
        <div className="flex flex-wrap gap-3" style={{ fontFamily: SANS, fontSize: 14 }}>
          {OPTIONS.map((o) => {
            const on = selected.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                aria-pressed={on}
                style={{
                  padding: "10px 22px",
                  borderRadius: 40,
                  border: `1.5px solid ${C.ox}`,
                  background: on ? C.ox : "transparent",
                  color: on ? C.cream : C.ox,
                }}
                className="transition-colors"
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[18px]">
        <label htmlFor="message" style={label}>What&rsquo;s on your mind?</label>
        <textarea id="message" name="message" required rows={5} style={{ ...field, resize: "vertical" }} />
      </div>

      <div className="mt-7 flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          style={{ fontFamily: SANS, fontSize: 15, color: C.cream, background: C.ox, padding: "14px 32px", borderRadius: 40 }}
          className="transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send it over"}
        </button>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox }}>Admit one</span>
      </div>
    </form>
  );
}
