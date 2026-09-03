"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { C, SANS } from "./tokens";

/* Fire a GA4 event if gtag is present. */
function ga(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined") {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("event", event, params ?? {});
  }
}

/** Payhip overlay-checkout buy button. The Payhip script (loaded on the page)
 *  intercepts the click to open the overlay; the GA event still fires. */
export function BuyButton() {
  const ref = useRef<HTMLAnchorElement>(null);

  // Payhip's script restyles .payhip-buy-button (default green) after it loads;
  // re-assert the brand orange with !important, a few times to catch it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paint = () => {
      el.style.setProperty("background", C.terra, "important");
      el.style.setProperty("color", C.cream, "important");
    };
    paint();
    const timers = [150, 600, 1500, 3000].map((t) => window.setTimeout(paint, t));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <a
      ref={ref}
      href="https://payhip.com/b/ocvs9"
      className="payhip-buy-button transition-opacity hover:opacity-90"
      data-product="ocvs9"
      onClick={() => ga("toolkit_buy_click", { product: "development" })}
      style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, color: C.cream, background: C.terra, padding: "15px 34px", borderRadius: 40, display: "inline-block", textDecoration: "none" }}
    >
      Buy the toolkit
    </a>
  );
}

/** Secondary text link to the full Payhip listing. */
export function SeeInsideLink() {
  return (
    <a
      href="https://payhip.com/b/ocvs9"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => ga("toolkit_see_inside", { product: "development" })}
      style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: C.ox }}
      className="transition-opacity hover:opacity-60"
    >
      See everything inside →
    </a>
  );
}

/** A "door" link (Narratives / GreenRoom) with its own GA event. */
export function DoorLink({
  href,
  event,
  external = false,
  children,
}: {
  href: string;
  event: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = { fontFamily: SANS, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: C.terra };
  const onClick = () => ga(event);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} style={style} className="transition-opacity hover:opacity-60">
      {children}
    </a>
  ) : (
    <Link href={href} onClick={onClick} style={style} className="transition-opacity hover:opacity-60">
      {children}
    </Link>
  );
}
