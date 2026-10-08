"use client";

import { useEffect, useState } from "react";
import { C, SANS } from "./chrome";

/** The GreenRoom product in a browser-window frame. The thumbnail scrolls;
 *  clicking it opens a larger, scrollable lightbox (Esc or click-outside to
 *  close). Kept separate from the row's site link so the two don't fight. */

function Dots() {
  return (
    <>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#D65A2E" }} />
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8B7A4" }} />
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#A9C3E9" }} />
    </>
  );
}

function ExpandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GreenRoomFrame({ src, className }: { src: string; className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={className}>
      <div style={{ border: `1.5px solid ${C.ox}`, borderRadius: 10, overflow: "hidden", background: C.cream, boxShadow: "0 18px 40px -24px rgba(110,20,13,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 14px", background: "#E4E2DC", borderBottom: "1px solid rgba(140,27,18,0.15)" }}>
          <Dots />
          <span style={{ marginLeft: 10, fontFamily: SANS, fontSize: 11, letterSpacing: ".04em", color: "#9a8f86" }}>greenroomcrm.com</span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontFamily: SANS, fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: C.terra }}>
            <ExpandIcon /> Expand
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Expand the GreenRoom product view"
          style={{ display: "block", width: "100%", aspectRatio: "4 / 3", overflowY: "auto", background: C.cream, border: "none", padding: 0, cursor: "zoom-in" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="GreenRoom — a donor account overview" style={{ display: "block", width: "100%", height: "auto" }} />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="GreenRoom product view"
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(46,8,5,0.86)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,48px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "min(940px, 96vw)", maxHeight: "92vh", display: "flex", flexDirection: "column", border: `1.5px solid ${C.ox}`, borderRadius: 12, overflow: "hidden", background: C.cream, boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 16px", background: "#E4E2DC", borderBottom: "1px solid rgba(140,27,18,0.15)", flex: "0 0 auto" }}>
              <Dots />
              <span style={{ marginLeft: 10, fontFamily: SANS, fontSize: 12, letterSpacing: ".04em", color: "#9a8f86" }}>greenroomcrm.com</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{ marginLeft: "auto", width: 28, height: 28, borderRadius: "50%", border: "none", background: "transparent", color: C.ox, fontSize: 20, lineHeight: 1, cursor: "pointer" }}
                className="transition-opacity hover:opacity-60"
              >
                &times;
              </button>
            </div>
            <div style={{ overflowY: "auto", background: C.cream }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="GreenRoom — a donor account overview, expanded" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
