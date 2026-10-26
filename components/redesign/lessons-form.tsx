"use client";

import { useState } from "react";
import { toast } from "sonner";
import { C, SANS, SERIF } from "./tokens";

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

/** Lessons interest form. Same web3forms submit the rest of the site uses, with
 *  a mailto fallback until the key is set. Emails Katie at the studio inbox. */
export function LessonsForm() {
  const [submitting, setSubmitting] = useState(false);
  const [instruments, setInstruments] = useState<string[]>([]);
  const toggle = (o: string) =>
    setInstruments((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (instruments.length === 0) {
      toast.error("Pick an instrument.", { description: "Let me know if it's piano, voice, or both." });
      return;
    }
    const age = Number(fd.age);
    if (instruments.includes("Voice") && age && age < 10) {
      toast.error("Voice lessons start at age 10.", { description: "Piano is open to ages 5 and up, so that could be a great fit." });
      return;
    }

    setSubmitting(true);
    const student = `${fd.student_first ?? ""} ${fd.student_last ?? ""}`.trim();
    const fields = {
      Student: student,
      "Parent/guardian": fd.parent_name || "—",
      Email: fd.email,
      Phone: fd.phone,
      "Interested in": instruments.join(" & "),
      "Student age": fd.age,
      "Lesson length": fd.length || "No preference",
      "Preferred days/times": fd.days_times || "—",
      "Anything else": fd.notes || "—",
    };

    if (!ACCESS_KEY) {
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(`Lesson inquiry from ${student}`)}&body=${encodeURIComponent(body)}`;
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New lesson inquiry from ${student} — bykatiespencer.com`,
          from_name: "bykatiespencer.com lessons",
          replyto: fd.email,
          botcheck: fd.botcheck ?? "",
          ...fields,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      toast.success("Thank you! Your note is on its way.", { description: "I'll be in touch soon about openings." });
      form.reset();
      setInstruments([]);
    } catch {
      toast.error("Something went wrong.", { description: `Please email ${INBOX} directly.` });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ background: C.peri, padding: "clamp(24px,4vw,44px)" }}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="grid gap-[16px] sm:grid-cols-2">
        <div>
          <label htmlFor="student_first" style={label}>Student first name</label>
          <input id="student_first" name="student_first" required style={field} />
        </div>
        <div>
          <label htmlFor="student_last" style={label}>Student last name</label>
          <input id="student_last" name="student_last" required style={field} />
        </div>
      </div>

      <div className="mt-[16px]">
        <label htmlFor="parent_name" style={label}>Parent / guardian name <span style={{ textTransform: "none", letterSpacing: 0, color: C.terra }}>(if applicable)</span></label>
        <input id="parent_name" name="parent_name" style={field} />
      </div>

      <div className="mt-[16px] grid gap-[16px] sm:grid-cols-2">
        <div>
          <label htmlFor="email" style={label}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" style={field} />
        </div>
        <div>
          <label htmlFor="phone" style={label}>Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" style={field} />
        </div>
      </div>

      <div className="mt-[16px]">
        <div style={label}>Interested in</div>
        <div className="flex flex-wrap gap-3" style={{ fontFamily: SANS, fontSize: 14 }}>
          {["Piano", "Voice"].map((o) => {
            const on = instruments.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                aria-pressed={on}
                style={{ padding: "10px 26px", borderRadius: 40, border: `1.5px solid ${C.ox}`, background: on ? C.ox : "transparent", color: on ? C.cream : C.ox }}
                className="transition-colors"
              >
                {o}
              </button>
            );
          })}
          <span style={{ alignSelf: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: C.ox }}>Pick one or both.</span>
        </div>
      </div>

      <div className="mt-[16px] grid gap-[16px] sm:grid-cols-2">
        <div>
          <label htmlFor="age" style={label}>Student age</label>
          <input id="age" name="age" type="number" min={1} max={120} required style={field} />
          <p style={{ fontFamily: SERIF, fontSize: 13, color: C.ox, marginTop: 6 }}>Voice is for ages 10 and up. Piano, ages 5 and up.</p>
        </div>
        <div>
          <label htmlFor="length" style={label}>Lesson length</label>
          <select id="length" name="length" style={{ ...field, appearance: "none", WebkitAppearance: "none" }}>
            <option value="">No preference yet</option>
            <option value="30 minutes">30 minutes (piano)</option>
            <option value="45 minutes">45 minutes (voice)</option>
            <option value="60 minutes">60 minutes</option>
          </select>
        </div>
      </div>

      <div className="mt-[16px]">
        <label htmlFor="days_times" style={label}>Preferred days and times</label>
        <input id="days_times" name="days_times" placeholder="e.g. weekday afternoons, Saturday mornings" style={field} />
      </div>

      <div className="mt-[16px]">
        <label htmlFor="notes" style={label}>Anything else I should know? <span style={{ textTransform: "none", letterSpacing: 0, color: C.terra }}>(optional)</span></label>
        <textarea id="notes" name="notes" rows={4} style={{ ...field, resize: "vertical" }} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{ fontFamily: SANS, fontSize: 15, color: C.cream, background: C.ox, padding: "14px 34px", borderRadius: 40, marginTop: 24 }}
        className="transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send my interest"}
      </button>
    </form>
  );
}
