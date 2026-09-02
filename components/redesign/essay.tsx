import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Nav, Cta, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import type { Note } from "@/content/writing";

/** Parse `*italic*` spans (used alone and nested inside bold). */
function renderItalic(text: string, kp: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((p, j) =>
    p.length > 2 && p.startsWith("*") && p.endsWith("*") ? (
      <em key={`${kp}i${j}`}>{p.slice(1, -1)}</em>
    ) : (
      <Fragment key={`${kp}t${j}`}>{p}</Fragment>
    ),
  );
}

/** Inline `[text](url)` links, `**bold**` and `*italic*`; straight apostrophes curl. */
function renderInline(text: string): ReactNode {
  const curled = text.replace(/'/g, "’");
  return curled.split(/(\[[^\]]+\]\([^)]+\)|\*\*.+?\*\*)/g).map((seg, i) => {
    const link = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={`l${i}`} href={link[2]} target="_blank" rel="noopener noreferrer" style={{ color: C.terra, textDecoration: "underline", textUnderlineOffset: 3 }}>
          {link[1]}
        </a>
      );
    }
    if (seg.length > 4 && seg.startsWith("**") && seg.endsWith("**")) {
      return (
        <strong key={`b${i}`} style={{ fontWeight: 700, color: C.ox }}>
          {renderItalic(seg.slice(2, -2), `b${i}`)}
        </strong>
      );
    }
    return <Fragment key={`s${i}`}>{renderItalic(seg, `s${i}`)}</Fragment>;
  });
}

function Divider() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-2.5 py-8">
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.terra }} />
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.peri }} />
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.terra }} />
    </div>
  );
}

export function EssayRedesign({ note, next }: { note: Note; next?: Note }) {
  const blocks = note.body.trim().split(/\n{2,}/);

  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Notes" />

      <article className={`${PAD} py-[clamp(32px,5vw,56px)]`}>
        <div className="mx-auto max-w-[680px]">
          <Link href="/writing" style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra }} className="transition-opacity hover:opacity-60">
            ← All notes
          </Link>

          <div className="mt-8" style={{ borderTop: `1.5px solid ${C.ox}`, paddingTop: 24 }}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2" style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" }}>
              <span style={{ color: C.terra }}>{note.category} · {note.date}</span>
              <span style={{ color: C.ox, opacity: 0.6 }}>Words · Katie Spencer</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra, marginTop: 30 }}>{note.eyebrow}</div>
            <h1 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,52px)", lineHeight: 1.03, letterSpacing: "-.025em", color: C.ox, marginTop: 14 }}>
              {note.title}.
            </h1>
            {note.subtitle ? (
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.4vw,26px)", lineHeight: 1.35, color: C.terra, marginTop: 18 }}>{renderInline(note.subtitle)}</p>
            ) : (
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, lineHeight: 1.5, color: C.ox, opacity: 0.85, marginTop: 18 }}>{renderInline(note.lead)}</p>
            )}
          </div>

          <div className="mt-[clamp(32px,5vw,48px)] flex flex-col gap-6" style={{ fontSize: 18, lineHeight: 1.75, color: C.ox }}>
            {blocks.map((block, i) => (block === "---" ? <Divider key={i} /> : <p key={i}>{renderInline(block)}</p>))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-3">
            <span aria-hidden style={{ width: 64, height: 1.5, background: C.ox, opacity: 0.4 }} />
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.ox, opacity: 0.7 }}>Katie Spencer</p>
          </div>

          {/* about the writer */}
          <div className="mt-[clamp(40px,6vw,64px)] flex flex-wrap items-start gap-6" style={{ background: C.peri, padding: "clamp(20px,3vw,32px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/katie-portrait.jpg" alt="Katie Spencer" className="shrink-0 object-cover" style={{ width: 80, height: 100, objectPosition: "50% 18%" }} />
            <div className="min-w-[220px] flex-1">
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.ox }}>About the writer</div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: C.ox, marginTop: 10 }}>
                Katie Spencer is an opera singer turned founder in Knoxville, Tennessee. Through{" "}
                <Link href="/narratives" style={{ color: C.ox, textDecoration: "underline", fontWeight: 600 }}>Narratives</Link>, she helps performing arts organizations find the story inside a season and turn it into a reason audiences want to show up.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* keep reading — oxblood */}
      {next && (
        <div className={`${PAD} py-[clamp(40px,6vw,60px)]`} style={{ background: C.ox }}>
          <div className="mx-auto max-w-[1180px]">
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.peach }}>Keep reading</div>
            <Link href={`/writing/${next.slug}`} className="mt-3 flex flex-wrap items-end justify-between gap-x-10 gap-y-2 transition-opacity hover:opacity-80">
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.12, letterSpacing: "-.02em", color: C.cream, maxWidth: 760 }}>{next.title}.</span>
              <span style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.peri, whiteSpace: "nowrap" }}>Read →</span>
            </Link>
          </div>
        </div>
      )}

      <Cta />
      <Footer />
    </Shell>
  );
}
