"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import qrcode from "qrcode-generator";
import { Nav, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";

/**
 * /survey — the Post-Show Survey generator. Progressive enhancement: the static
 * v1 content (questions, settings, build steps, sending) is always rendered, so
 * the page is readable and printable with JavaScript off. The generator adds
 * live inputs, calculated dates, a locally-generated QR code, and printables.
 *
 * Copy from the v1 "Post-Show Survey page" brief is reused verbatim; only the
 * generator affordances (labels, buttons, empty states) are new. No em dashes.
 */

const ART_FORMS = ["opera", "theatre", "dance", "orchestral music", "chamber music", "ballet", "musical theatre"];
const ZAPIER_HOOK = process.env.NEXT_PUBLIC_SURVEY_ZAPIER_HOOK;

/* ---- helpers ---------------------------------------------------------- */

/** Parse a yyyy-mm-dd value as a local date (no timezone shift). */
function parseLocal(v: string): Date | null {
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
/** First Monday strictly after the given date. */
function mondayAfter(d: Date): Date {
  let n = (1 - d.getDay() + 7) % 7; // days until next Monday
  if (n === 0) n = 7; // if d is a Monday, use the following Monday
  return addDays(d, n);
}
function fmt(d: Date): string {
  const wd = d.toLocaleDateString("en-US", { weekday: "long" });
  const mo = d.toLocaleDateString("en-US", { month: "long" });
  return `${wd} ${d.getDate()} ${mo} ${d.getFullYear()}`;
}
function computeDates(closing: Date) {
  const close = addDays(closing, 7);
  return { send: addDays(closing, 1), close, log: mondayAfter(close) };
}
/** "a" or "an" based on the first letter of the word (vowel-letter heuristic). */
function article(word: string): string {
  const m = word.match(/[A-Za-z]/);
  return m && "aeiou".includes(m[0].toLowerCase()) ? "an" : "a";
}
function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function qrSvg(url: string, cellSize: number, label?: string): string {
  const qr = qrcode(0, "M");
  qr.addData(url);
  qr.make();
  let svg = qr.createSvgTag({ cellSize, margin: 0, scalable: true });
  // Give the SVG itself an accessible name and a <title>, so it is not an
  // unlabelled graphic (the wrapper is left presentational).
  const name = escapeXml(label ?? `QR code linking to ${url}`);
  svg = svg.replace("<svg", `<svg role="img" aria-label="${name}"`);
  const gt = svg.indexOf(">");
  if (gt !== -1) svg = svg.slice(0, gt + 1) + `<title>${name}</title>` + svg.slice(gt + 1);
  return svg;
}

/**
 * Escape a value for injection into a single-quoted string literal in the
 * generated Apps Script. Company names carry apostrophes and the occasional
 * backslash; an unescaped one is a syntax error the visitor can't debug.
 * Backslashes first, then quotes and newlines, then strip other control chars.
 */
function escGs(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r\n?|\n/g, "\\n")
    .replace(/[\u0000-\u001F\u007F]/g, "");
}

/**
 * Build the Google Apps Script the visitor pastes into script.google.com. The
 * a/an question text is already computed on the page, so it is baked into the
 * strings here rather than recomputed in the script. Runs entirely in the
 * visitor's own account; nothing here touches our infrastructure.
 */
function buildAppsScript(o: { title: string; q1: string; q2: string; q4: string; sixth: boolean }): string {
  const sixthBlock = o.sixth
    ? `
  form.addTextItem()
    .setTitle('How did you hear about this production?')
    .setRequired(false);
`
    : "";
  return `/**
 * Creates your post-show audience survey in your own Google Drive.
 * From bykatiespencer.com/survey
 *
 * Click Run. Google will ask you to authorize this script the first time.
 * When it finishes, your form links are in the Execution log at the bottom.
 */
function createPostShowSurvey() {
  var TITLE = '${escGs(o.title)}';
  var INTRO = 'Thanks for joining us. Five questions, anonymous, no wrong answers.';

  var form = FormApp.create(TITLE);
  form.setDescription(INTRO);

  // Anonymity. These three are the whole point.
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setPublishingSummary(false);
  try { form.setRequireLogin(false); } catch (e) {} // Workspace accounts only

  form.addMultipleChoiceItem()
    .setTitle('${escGs(o.q1)}')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('${escGs(o.q2)}')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addScaleItem()
    .setTitle('How would you rate your overall experience?')
    .setBounds(1, 5)
    .setLabels('Not great', 'Wonderful')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('${escGs(o.q4)}')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Anything else you'd like to share with us?")
    .setRequired(false);
${sixthBlock}
  Logger.log('Your survey is ready.');
  Logger.log('Share this link with your audience: ' + form.getPublishedUrl());
  Logger.log('Edit it here: ' + form.getEditUrl());
}`;
}

/* ---- small UI pieces -------------------------------------------------- */

function CopyButton({ text, label = "Copy", filled = false }: { text: string; label?: string; filled?: boolean }) {
  const [done, setDone] = useState(false);
  const base: React.CSSProperties = filled
    ? { fontFamily: SANS, fontSize: 14, color: C.cream, background: C.terra, border: `1.5px solid ${C.terra}`, padding: "12px 24px", borderRadius: 40 }
    : { fontFamily: SANS, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: C.terra, background: "transparent", border: `1.5px solid ${C.terra}`, padding: "8px 16px", borderRadius: 40 };
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 2200);
        } catch {
          setDone(false);
        }
      }}
      style={base}
      className="transition-opacity hover:opacity-70"
    >
      {done ? "Copied" : label}
    </button>
  );
}

function OutputCard({ label, children, action }: { label: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ background: "#FFFDF8", border: `1.5px solid ${C.ox}`, padding: "clamp(20px,3vw,30px)" }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }}>{label}</div>
        {action}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
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
const labelStyle: React.CSSProperties = { fontFamily: SANS, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.ox, marginBottom: 6, display: "block" };

/* ---- the page --------------------------------------------------------- */

export function SurveyGenerator() {
  const [mounted, setMounted] = useState(false);
  const [company, setCompany] = useState("");
  const [artForm, setArtForm] = useState("");
  const [production, setProduction] = useState("");
  const [closing, setClosing] = useState("");
  const [sixth, setSixth] = useState(false);
  const [formUrl, setFormUrl] = useState("");

  // read shareable state from the query string, then enable enhancement
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const g = (k: string) => p.get(k) ?? "";
    if (g("company")) setCompany(g("company"));
    if (g("artForm")) setArtForm(g("artForm"));
    if (g("production")) setProduction(g("production"));
    if (g("closing")) setClosing(g("closing"));
    if (p.get("sixth") === "1") setSixth(true);
    setMounted(true);
  }, []);

  // keep the query string in sync (the form URL is theirs, never in the URL)
  useEffect(() => {
    if (!mounted) return;
    const p = new URLSearchParams();
    if (company) p.set("company", company);
    if (artForm) p.set("artForm", artForm);
    if (production) p.set("production", production);
    if (closing) p.set("closing", closing);
    if (sixth) p.set("sixth", "1");
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [mounted, company, artForm, production, closing, sixth]);

  const CO = company.trim() || "[COMPANY NAME]";
  const AF = artForm.trim() || "[ART FORM]";
  const PROD = production.trim();
  const title = PROD ? `${CO}, ${PROD} Audience Survey` : `${CO} Audience Survey`;
  const closingDate = useMemo(() => parseLocal(closing), [closing]);
  const dates = closingDate ? computeDates(closingDate) : null;

  const questions: { n: number; q: string; meta: string; required: boolean }[] = [
    { n: 1, q: `Have you ever attended ${article(AF)} ${AF} performance before?`, meta: "Yes / No · Multiple choice", required: true },
    { n: 2, q: `Have you ever been to ${article(CO)} ${CO} production before?`, meta: "Yes / No · Multiple choice", required: true },
    { n: 3, q: "How would you rate your overall experience?", meta: "1 to 5, Not great to Wonderful · Linear scale", required: true },
    { n: 4, q: `Would you come back to another ${CO} performance?`, meta: "Yes / No · Multiple choice", required: true },
    { n: 5, q: "Anything else you'd like to share with us?", meta: "Long answer · Paragraph", required: false },
  ];
  if (sixth) questions.push({ n: 6, q: "How did you hear about this production?", meta: "Short answer", required: false });

  const questionsPlain = questions.map((x) => `${x.n}. ${x.q} (${x.meta.replace(/ · /g, ", ")}, ${x.required ? "required" : "optional"})`).join("\n");

  const emailSubject = PROD ? `Thank you for coming to ${PROD}` : `Thank you for coming`;
  const emailBody = `Thank you for spending your evening with us${PROD ? ` at ${PROD}` : ""}. If you have one minute, we would love to hear how it went, anonymously: ${formUrl || "[YOUR FORM LINK]"}${dates ? `. The survey closes ${fmt(dates.close)}.` : "."}`;
  const emailPlain = `Subject: ${emailSubject}\n\n${emailBody}`;

  const qrLine = "How was tonight? Five questions, anonymous, one minute.";
  const shortUrl = formUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const qrMarkup = useMemo(
    () => (formUrl ? { __html: qrSvg(formUrl, 8, `QR code linking to ${shortUrl}`) } : null),
    [formUrl, shortUrl],
  );
  const countWord = questions.length === 6 ? "six" : "five";

  const q1 = questions[0].q;
  const q2 = questions[1].q;
  const q4 = questions[3].q;
  const script = useMemo(
    () => buildAppsScript({ title, q1, q2, q4, sixth }),
    [title, q1, q2, q4, sixth],
  );

  const printSign = (which: "exit" | "card") => {
    document.body.setAttribute("data-print", which);
    const clear = () => {
      document.body.removeAttribute("data-print");
      window.removeEventListener("afterprint", clear);
    };
    window.addEventListener("afterprint", clear);
    setTimeout(() => window.print(), 60);
  };

  const H2: React.CSSProperties = { fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,3.4vw,38px)", letterSpacing: "-.02em", color: C.ox, lineHeight: 1.05 };
  const P: React.CSSProperties = { fontSize: 17, lineHeight: 1.7, color: C.ox };

  return (
    <Shell ground="cream">
      <Nav ground="cream" active="" />

      {/* hero */}
      <div className={`${PAD} pb-[clamp(32px,5vw,56px)] pt-[clamp(24px,3vw,40px)]`}>
        <div className="mx-auto max-w-[760px]">
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.terra }}>From The Arts Marketing Kit</div>
          <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(38px,6vw,62px)", letterSpacing: "-.03em", color: C.ox, lineHeight: 1, marginTop: 14 }}>
            The Post-Show Survey<span style={{ color: C.terra }}>.</span>
          </h1>
          <p style={{ ...P, fontSize: 19, marginTop: 20 }}>
            Five questions, anonymous, sent after the show. This is the survey I ran at a regional opera company, and it is the fastest way to find out whether the experience kept the promise your marketing made.
          </p>
          <p style={{ ...P, marginTop: 14 }}>Everything you need to build it is on this page. It takes about six minutes.</p>
        </div>
      </div>

      {/* generator inputs (enhancement only) */}
      {mounted && (
        <div className={`${PAD} py-[clamp(28px,4vw,44px)]`} style={{ background: C.peri }}>
          <div className="mx-auto max-w-[760px]">
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(22px,3vw,28px)", letterSpacing: "-.02em", color: C.ox }}>Make it yours.</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: C.ox, marginTop: 6 }}>Type your details and everything below fills in. Nothing is sent or saved.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="s-company" style={labelStyle}>Company name</label>
                <input id="s-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Riverlight Theatre" autoComplete="organization" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="s-artform" style={labelStyle}>Art form</label>
                <input id="s-artform" value={artForm} onChange={(e) => setArtForm(e.target.value)} placeholder="opera" list="s-artforms" style={inputStyle} />
                <datalist id="s-artforms">{ART_FORMS.map((a) => <option key={a} value={a} />)}</datalist>
              </div>
              <div>
                <label htmlFor="s-prod" style={labelStyle}>Production title <span style={{ textTransform: "none", letterSpacing: 0, color: C.terra }}>optional</span></label>
                <input id="s-prod" value={production} onChange={(e) => setProduction(e.target.value)} placeholder="Sweeney Todd" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="s-closing" style={labelStyle}>Closing date <span style={{ textTransform: "none", letterSpacing: 0, color: C.terra }}>optional</span></label>
                <input id="s-closing" type="date" value={closing} onChange={(e) => setClosing(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <label className="mt-5 flex items-start gap-3" style={{ fontSize: 15, lineHeight: 1.5, color: C.ox }}>
              <input type="checkbox" checked={sixth} onChange={(e) => setSixth(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18, accentColor: C.ox }} />
              <span>Add the question about how they heard about us. Only worth it if your ticketing system does not already capture it. Every question after the fifth costs you a response from someone who was disappointed.</span>
            </label>
          </div>
        </div>
      )}

      {/* ---- the survey content (always rendered, works with JS off) ---- */}
      <div className={`${PAD} py-[clamp(48px,7vw,80px)]`} style={{ background: C.cream }}>
        <div className="mx-auto flex max-w-[760px] flex-col gap-[clamp(40px,6vw,64px)]">

          {/* Keep it anonymous */}
          <section>
            <h2 style={H2}>Keep it anonymous.</h2>
            <div className="mt-5 flex flex-col gap-4">
              <p style={P}>When it is anonymous, people tell you the truth. Our audience was unafraid to say a show was boring. That is a gift, and it is a gift you only get if they believe nobody is watching.</p>
              <p style={P}>Not &ldquo;we won&rsquo;t share your name.&rdquo; Anonymous. No email field, no name field, no &ldquo;may we contact you.&rdquo; The moment there is a name on it you get politeness, and politeness is not data.</p>
              <p style={P}>Short is the other rule. Five questions. If it takes more than a minute, the people you most need to hear from, the ones who were disappointed, are the ones who will not finish it.</p>
            </div>
          </section>

          {/* The five questions */}
          <section aria-live="polite">
            <h2 style={H2}>The {countWord} questions.</h2>
            <p style={{ ...P, marginTop: 14, marginBottom: 22 }}>
              {mounted ? "These are written out with your details filled in. Copy them straight into Google Forms." : "Copy these. Replace [ART FORM] with yours, opera, theatre, dance, music, and [COMPANY NAME] with yours."}
            </p>
            <OutputCard label="Your questions" action={mounted ? <CopyButton text={questionsPlain} label="Copy the questions" /> : undefined}>
              <ol className="flex flex-col gap-5">
                {questions.map((x) => (
                  <li key={x.n} className="flex gap-4">
                    <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: C.terra, lineHeight: 1.3 }}>{x.n}</span>
                    <span>
                      <span style={{ fontSize: 18, lineHeight: 1.4, color: C.ox }}>{x.q}</span>
                      <span style={{ display: "block", fontFamily: SANS, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: C.terra, marginTop: 4 }}>
                        {x.meta} · {x.required ? "Required" : "Optional"}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </OutputCard>
          </section>

          {/* Form title */}
          <section aria-live="polite">
            <h2 style={H2}>The form title.</h2>
            <div className="mt-5">
              <OutputCard label="Title" action={mounted ? <CopyButton text={title} /> : undefined}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.4vw,26px)", color: C.ox }}>{title}</div>
              </OutputCard>
            </div>
          </section>

          {/* The three settings (static) */}
          <section>
            <h2 style={H2}>The three settings that keep it anonymous.</h2>
            <p style={{ ...P, marginTop: 14 }}>In Google Forms, open Settings and under Responses:</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[["Collect email addresses", "Off"], ["Limit to 1 response", "Off. Turning it on forces people to sign in."], ["See summary charts and text responses", "Off"]].map(([k, v]) => (
                <li key={k} className="flex flex-wrap gap-x-2" style={P}>
                  <span style={{ fontWeight: 700, color: C.ox }}>{k}:</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <p style={{ ...P, marginTop: 16 }}>And in the form itself, no name field and no contact field. If any of these are wrong, you are not running an anonymous survey. You are running a survey people know is attached to them, and you will get politeness back.</p>
          </section>

          {/* The dates */}
          <section aria-live="polite">
            <h2 style={H2}>The dates.</h2>
            <p style={{ ...P, marginTop: 14, marginBottom: 22 }}>
              {dates ? "Calculated from your closing date." : "Add a closing date above and these fill in. The rule:"}
            </p>
            <OutputCard label="Timing">
              <div className="flex flex-col gap-5">
                {[
                  ["Send the survey", dates ? fmt(dates.send) : "The morning after closing.", "The morning after closing, while it is still fresh."],
                  ["Close the survey", dates ? fmt(dates.close) : "Seven days after closing.", "Keep it open for a week."],
                  ["Log the results", dates ? fmt(dates.log) : "The Monday after it closes.", "In the Survey Log tab of the planner."],
                ].map(([k, v, note]) => (
                  <div key={k}>
                    <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.terra }}>{k}</div>
                    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(20px,2.4vw,26px)", color: C.ox, marginTop: 2 }}>{v}</div>
                    <div style={{ fontSize: 15, color: C.ox, opacity: 0.8, marginTop: 2 }}>{note}</div>
                  </div>
                ))}
              </div>
            </OutputCard>
          </section>

          {/* The email */}
          <section aria-live="polite">
            <h2 style={H2}>The email.</h2>
            <p style={{ ...P, marginTop: 14, marginBottom: 22 }}>Schedule it for the next morning, to everyone who bought a ticket. Two sentences, the link, and the date.</p>
            <OutputCard label="Morning-after email" action={mounted ? <CopyButton text={emailPlain} label="Copy the email" /> : undefined}>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: C.terra }}>Subject</div>
              <div style={{ fontSize: 17, color: C.ox, marginTop: 2, marginBottom: 16 }}>{emailSubject}</div>
              <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: C.terra }}>Body</div>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: C.ox, marginTop: 2 }}>{emailBody}</p>
            </OutputCard>
          </section>

          {/* Step 2: generate the form (with a manual fallback that works JS-off) */}
          <section>
            <h2 style={H2}>Create your form.</h2>
            {mounted ? (
              <>
                <p style={{ ...P, marginTop: 14, marginBottom: 22 }}>
                  This writes the form for you. Copy the script, paste it into Google&rsquo;s script editor, and click Run. Your survey appears in your own Google Drive, with the anonymity settings already correct.
                </p>
                <div style={{ background: C.ox, padding: "clamp(16px,2.4vw,22px)" }}>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.peachSoft }}>Your script</div>
                    <CopyButton text={script} label="Copy the script" filled />
                  </div>
                  <pre style={{ margin: 0, overflow: "auto", maxHeight: 360, color: C.cream, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: 12.5, lineHeight: 1.6 }}>
                    <code>{script}</code>
                  </pre>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a href="https://script.google.com/home/projects/create" target="_blank" rel="noopener noreferrer" style={{ fontFamily: SANS, fontSize: 14, color: C.ox, background: "transparent", border: `1.5px solid ${C.ox}`, padding: "12px 24px", borderRadius: 40 }} className="transition-opacity hover:opacity-70">Open Apps Script</a>
                </div>
                <ol className="mt-6 flex flex-col gap-3">
                  {[
                    "Copy the script.",
                    "Open Apps Script, delete whatever is in the editor, and paste.",
                    "Click Run. Google will ask you to authorize your own script the first time. When it finishes, your form link is in the log at the bottom.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4" style={P}>
                      <span style={{ fontFamily: SANS, fontWeight: 700, color: C.terra }}>{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: C.ox, opacity: 0.85, marginTop: 16 }}>
                  The script runs in your Google account, not mine. I never see your form or your responses.
                </p>
              </>
            ) : (
              <p style={{ ...P, marginTop: 14 }}>With JavaScript on, this page writes the form-building script for you. Either way, here is how to build it by hand:</p>
            )}

            <details open={!mounted} style={{ marginTop: mounted ? 30 : 18, borderTop: `1.5px solid ${C.ox}`, paddingTop: 20 }}>
              <summary style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, color: C.terra, cursor: "pointer" }}>Prefer to build it yourself?</summary>
              <ol className="mt-5 flex flex-col gap-3">
                {[
                  "Go to forms.google.com and start a blank form.",
                  <>Title it &ldquo;{title}.&rdquo;</>,
                  "Add the five questions. Questions 1, 2 and 4 are Multiple choice. Question 3 is Linear scale, 1 to 5, labelled Not great and Wonderful. Question 5 is Paragraph.",
                  "Mark 1 through 4 Required. Leave 5 optional.",
                  "Open Settings and set the three items above.",
                  "Click Send, copy the link, and shorten it. Make a QR code from the same link for the program book and a sign at the exit.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4" style={P}>
                    <span style={{ fontFamily: SANS, fontWeight: 700, color: C.terra }}>{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </details>
          </section>

          {/* Step 3: QR + printables (enhancement only) */}
          {mounted && (
            <section aria-live="polite">
              <h2 style={H2}>The QR code and printables.</h2>
              <p style={{ ...P, marginTop: 14, marginBottom: 20 }}>
                Build your form first, then paste the link here. The QR code is generated on your device and never sent anywhere.
              </p>
              <div style={{ background: C.peri, padding: "clamp(20px,3vw,28px)" }}>
                <label htmlFor="s-formurl" style={labelStyle}>Paste your form link here</label>
                <input id="s-formurl" value={formUrl} onChange={(e) => setFormUrl(e.target.value)} placeholder="https://forms.gle/..." inputMode="url" style={inputStyle} />
              </div>

              {formUrl && qrMarkup && (
                <div className="mt-6 grid gap-6 sm:grid-cols-[200px_1fr] sm:items-center">
                  <div style={{ background: "#FFFFFF", border: `1.5px solid ${C.ox}`, padding: 16, width: 200, height: 200, boxSizing: "border-box" }}>
                    <div className="survey-qr" style={{ width: "100%", height: "100%" }} dangerouslySetInnerHTML={qrMarkup} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.terra, marginBottom: 4 }}>Links to</div>
                      <a href={formUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SANS, fontSize: 14, color: C.ox, wordBreak: "break-all" }} className="underline decoration-1 underline-offset-2 transition-opacity hover:opacity-70">{shortUrl}</a>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={() => printSign("exit")} style={{ fontFamily: SANS, fontSize: 14, color: C.cream, background: C.ox, padding: "12px 24px", borderRadius: 40 }} className="transition-opacity hover:opacity-90">Print the exit sign</button>
                      <button type="button" onClick={() => printSign("card")} style={{ fontFamily: SANS, fontSize: 14, color: C.ox, background: "transparent", border: `1.5px solid ${C.ox}`, padding: "12px 24px", borderRadius: 40 }} className="transition-opacity hover:opacity-70">Print the program cards</button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Sending it (static) */}
          <section>
            <h2 style={H2}>Sending it.</h2>
            <p style={{ ...P, marginTop: 14 }}>
              Schedule the email for the next morning, while it is still fresh, to everyone who bought a ticket, with the two-sentence thank-you from Part 4 of the Kit. Put the QR code in the program and on a sign at the exit for the people who bought at the door or came on someone else&rsquo;s ticket. Keep the form open for a week. Log the results in the Survey Log tab of the planner the following Monday.
            </p>
          </section>
        </div>
      </div>

      {/* GreenRoom opt-in */}
      <OptIn company={company} artForm={artForm} />

      {/* footer bio (v1) */}
      <div className={`${PAD} py-[clamp(40px,6vw,64px)]`} style={{ background: C.cream, borderTop: `1.5px solid ${C.ox}` }}>
        <div className="mx-auto max-w-[760px]">
          <p style={{ ...P }}>I&rsquo;m Katie Spencer. I ran development and marketing at a regional opera company, co-founded an opera company in New York, and now build GreenRoom.</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2" style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".06em" }}>
            <Link href="/toolkits" style={{ color: C.terra }}>The Arts Marketing Kit</Link>
            <span aria-hidden style={{ color: C.ox, opacity: 0.4 }}>·</span>
            <Link href="/toolkits" style={{ color: C.terra }}>The Small-Shop Development Toolkit</Link>
            <span aria-hidden style={{ color: C.ox, opacity: 0.4 }}>·</span>
            <Link href="/narratives" style={{ color: C.terra }}>Narratives</Link>
          </div>
        </div>
      </div>

      {/* print-only artefacts */}
      <div className="survey-print survey-print-exit" aria-hidden>
        <div className="survey-sign">
          {qrMarkup && <div className="survey-sign-qr" dangerouslySetInnerHTML={qrMarkup} />}
          <div className="survey-sign-co">{CO !== "[COMPANY NAME]" ? CO : ""}</div>
          <div className="survey-sign-line">{qrLine}</div>
          {shortUrl && <div className="survey-sign-url">{shortUrl}</div>}
        </div>
      </div>
      <div className="survey-print survey-print-card" aria-hidden>
        <div className="survey-cards">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="survey-card">
              {qrMarkup && <div className="survey-card-qr" dangerouslySetInnerHTML={qrMarkup} />}
              <div className="survey-card-text">
                <div className="survey-card-co">{CO !== "[COMPANY NAME]" ? CO : ""}</div>
                <div className="survey-card-line">{qrLine}</div>
                {shortUrl && <div className="survey-card-url">{shortUrl}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </Shell>
  );
}

/* ---- opt-in (env-var Zapier hook, graceful when unset) ---------------- */

function OptIn({ company, artForm }: { company: string; artForm: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("sending");
    if (!ZAPIER_HOOK) {
      // hook not configured yet; do not lose what they typed
      setState("error");
      return;
    }
    try {
      const res = await fetch(ZAPIER_HOOK, {
        method: "POST",
        // Keep this as text/plain. application/json triggers a CORS preflight
        // (OPTIONS), which Zapier catch hooks don't answer, so the browser
        // blocks the request before it leaves and fetch throws "Failed to
        // fetch". text/plain is a CORS-safelisted content type: no preflight,
        // and Zapier still parses the JSON body. Do NOT use mode: "no-cors" —
        // that makes the response opaque so we can't tell success from failure.
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          email: email.trim(),
          timestamp: new Date().toISOString(),
          source: "survey-generator",
          ...(company.trim() ? { company: company.trim() } : {}),
          ...(artForm.trim() ? { artForm: artForm.trim() } : {}),
        }),
      });
      if (!res.ok) throw new Error();
      setState("ok");
    } catch {
      setState("error");
    }
  }

  return (
    <div className={`${PAD} py-[clamp(48px,7vw,80px)]`} style={{ background: C.ox }}>
      <div className="mx-auto max-w-[760px]">
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3.2vw,34px)", letterSpacing: "-.02em", color: C.cream }}>Want this to run itself?</div>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: C.peachSoft, marginTop: 14, maxWidth: 600 }}>
          I am building this into GreenRoom, the CRM I make for performing arts organizations. The survey goes out on its own, the responses stay anonymous, and the numbers land in your audience development scorecard without you retyping anything.
        </p>
        {state === "ok" ? (
          <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: 17, color: C.cream, marginTop: 22 }}>Thank you. I&rsquo;ll be in touch when it&rsquo;s ready.</p>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-wrap items-start gap-3">
            <div>
              <label htmlFor="s-optin" className="sr-only">Email address</label>
              <input
                id="s-optin"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.org"
                autoComplete="email"
                style={{ ...inputStyle, width: 280, maxWidth: "100%", background: C.cream }}
              />
            </div>
            <button type="submit" disabled={state === "sending"} style={{ fontFamily: SANS, fontSize: 15, color: C.ox, background: C.peri, padding: "13px 28px", borderRadius: 40 }} className="transition-opacity hover:opacity-90 disabled:opacity-60">
              {state === "sending" ? "Sending…" : "Tell me when it's ready"}
            </button>
            {state === "error" && (
              <p role="alert" style={{ fontSize: 14, color: C.peachSoft, width: "100%", marginTop: 2 }}>
                Something went wrong and your email did not send. Please email hello@bykatiespencer.com and I&rsquo;ll add you myself.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
