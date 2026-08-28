"use client";

import { useEffect, useState } from "react";

/**
 * Opening-night curtain. Two velvet panels slide open on first load, then the
 * overlay unmounts. Honors prefers-reduced-motion (never shows). Sessions after
 * the first skip it so navigation doesn't re-curtain every visit.
 */
export function Curtain() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("ks-curtain") === "1";
    } catch {
      /* private mode — just play it */
    }
    if (seen) return;
    setShow(true);
    try {
      sessionStorage.setItem("ks-curtain", "1");
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      data-curtain="true"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] flex"
    >
      <div
        data-anim="true"
        className="flex-1 [animation:ks-curtain-left_0.95s_cubic-bezier(0.7,0,0.3,1)_0.25s_forwards]"
        style={{
          background:
            "repeating-linear-gradient(90deg, #47161C 0px 22px, #5C1F26 22px 46px, #3A1015 46px 70px)",
          boxShadow: "inset -40px 0 70px rgba(0,0,0,.55)",
          borderRight: "6px solid var(--gold)",
        }}
      />
      <div
        data-anim="true"
        className="flex-1 [animation:ks-curtain-right_0.95s_cubic-bezier(0.7,0,0.3,1)_0.25s_forwards]"
        style={{
          background:
            "repeating-linear-gradient(90deg, #3A1015 0px 24px, #5C1F26 24px 48px, #47161C 48px 70px)",
          boxShadow: "inset 40px 0 70px rgba(0,0,0,.55)",
          borderLeft: "6px solid var(--gold)",
        }}
      />
    </div>
  );
}
