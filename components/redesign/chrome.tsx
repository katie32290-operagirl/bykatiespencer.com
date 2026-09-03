import Link from "next/link";
import { C, SANS, SERIF, NAV } from "./tokens";

/**
 * Shared chrome for the redesigned interior pages — the nav, the giant page
 * title, the oxblood ticker band, the "after the show" CTA, and the footer.
 * The nav and title adapt to each page's top ground (cream or terracotta).
 */

export const PAD = "px-[clamp(20px,4.5vw,56px)]";

type Ground = "cream" | "terra";
const lead = (g: Ground) => (g === "cream" ? C.terra : C.cream);

export function Nav({ ground, active }: { ground: Ground; active: string }) {
  const accent = lead(ground);
  return (
    <div className={`flex flex-wrap items-center justify-between gap-y-3 py-[clamp(18px,2.6vw,28px)] ${PAD}`}>
      <Link href="/" style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", color: accent }}>
        Katie Spencer<span style={{ color: C.ox }}>.</span>
      </Link>
      <div
        className="flex flex-wrap items-center gap-x-[clamp(14px,2.4vw,28px)] gap-y-1"
        style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".06em" }}
      >
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            style={{ color: n.label === active ? accent : C.ox }}
            className="transition-opacity hover:opacity-60"
          >
            {n.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function GiantTitle({
  children,
  ground,
  size,
}: {
  children: React.ReactNode;
  ground: Ground;
  size: string;
}) {
  return (
    <div
      className="pt-9 text-center"
      style={{
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.82,
        letterSpacing: "-.045em",
        color: ground === "cream" ? C.terra : C.ox,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

/** Oxblood metadata band with centred, wrapping items. */
export function TickerBand({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${PAD} flex flex-wrap items-center justify-center gap-x-[clamp(20px,3.4vw,34px)] gap-y-2 py-5`}
      style={{ background: C.ox, fontFamily: SANS, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.peach }}
    >
      {children}
    </div>
  );
}

/** The recurring close — "Come find me after the show." on terracotta. */
export function Cta() {
  return (
    <div
      className={`${PAD} grid items-center gap-[30px] py-[clamp(56px,8vw,80px)] md:grid-cols-[1fr_auto]`}
      style={{ background: C.terra }}
    >
      <div className="mx-auto w-full max-w-[1180px] md:mx-0">
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.025em", color: C.ox, lineHeight: 1 }}>
          Come find me after the show.
        </div>
        <div style={{ fontSize: 18, fontStyle: "italic", color: C.ox, marginTop: 14 }}>
          Have a story worth telling, a room worth gathering, or something interesting you&rsquo;re building?
        </div>
      </div>
      <a
        href="mailto:hello@bykatiespencer.com"
        style={{ fontFamily: SANS, fontSize: 15, color: C.cream, background: C.ox, padding: "16px 32px", borderRadius: 40, whiteSpace: "nowrap" }}
        className="justify-self-start transition-opacity hover:opacity-90 md:justify-self-end"
      >
        hello@bykatiespencer.com
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <div
      className={`grid items-center gap-y-4 py-9 ${PAD} md:grid-cols-[1fr_auto_1fr]`}
      style={{ background: C.cream, fontFamily: SANS, fontSize: 12, letterSpacing: ".06em", color: C.ox }}
    >
      <div className="text-center md:text-left">© 2026 Katie Spencer · Art · Real life · Meaningful work</div>
      <div className="text-center" style={{ fontWeight: 700, fontSize: 16 }}>
        Katie Spencer<span style={{ color: C.terra }}>.</span>
      </div>
      <div className="flex flex-wrap justify-center gap-[22px] md:justify-end">
        <a href="https://www.instagram.com/bykatiespencer" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/in/katie-spencer-83565066/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://greenroomcrm.com" target="_blank" rel="noopener noreferrer">GreenRoom</a>
      </div>
    </div>
  );
}

/** Page shell: sets the reading font + colour and the top-ground background. */
export function Shell({ ground, children }: { ground: Ground; children: React.ReactNode }) {
  return (
    <div style={{ background: ground === "cream" ? C.cream : C.terra, color: C.ox, fontFamily: SERIF, overflow: "hidden" }}>
      {children}
    </div>
  );
}

export { C, SANS, SERIF, NAV };
