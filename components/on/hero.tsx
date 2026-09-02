"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Opening Night hero — Katie on the gilt scalloped stage (a single composed
 * plate that already carries the alcove, the "Katie Spencer" wordmark, the
 * portrait and the harlequin floor). The rest of the billing wraps around the
 * baked-in wordmark: "Now playing" above, the tagline, credits and ticket
 * below. Sheet music, a peony and an "Intermezzo" scrap lean in from the wings.
 */

const MONO = "font-accent uppercase tracking-[0.14em]";

function NowPlaying({ center }: { center?: boolean }) {
  return (
    <div
      data-anim="true"
      className={`flex items-center gap-3 ${MONO} text-[clamp(10px,1vw,13px)] text-red [animation:ks-type-in_0.6s_ease_0.4s_backwards] ${
        center ? "justify-center" : "justify-start"
      }`}
    >
      {!center && <span aria-hidden className="h-px w-8 bg-red/50" />}
      Now playing
      <span aria-hidden className="text-gold">
        &#10022;
      </span>
    </div>
  );
}

function SubBilling({ center }: { center?: boolean }) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      <p
        data-anim="true"
        className={`max-w-[440px] font-serif text-[clamp(18px,2vw,27px)] font-medium italic leading-[1.2] [animation:ks-type-in_0.8s_ease_0.7s_backwards] ${
          center ? "mx-auto" : ""
        }`}
      >
        A life in stories. On stage and off.
      </p>
      <div
        data-anim="true"
        className={`mt-4 flex flex-wrap items-baseline gap-x-[13px] gap-y-2 ${MONO} text-[clamp(10px,1.05vw,13px)] text-muted-foreground [animation:ks-type-in_0.8s_ease_0.85s_backwards] ${
          center ? "justify-center" : "justify-start"
        }`}
      >
        <span>Artist</span>
        <span className="text-gold">&middot;</span>
        <span>Storyteller</span>
        <span className="text-gold">&middot;</span>
        <span>Strategist</span>
        <span className="text-gold">&middot;</span>
        <span>Founder</span>
      </div>
      <div
        data-anim="true"
        className="mt-7 [animation:ks-type-in_0.8s_ease_1s_backwards]"
      >
        <Link
          href="#premise"
          className={`group inline-flex items-center gap-3 border border-ink px-7 py-3.5 ${MONO} text-[clamp(11px,1.1vw,12px)] text-ink transition-colors hover:border-red hover:text-red`}
          style={{ boxShadow: "3px 3px 0 rgba(22,17,13,.12)" }}
        >
          Enter the room
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}

export function HeroV4() {
  const ticket = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (ticket.current)
          ticket.current.style.translate = `${x * 15}px ${y * 10}px`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative z-[4] overflow-hidden px-[clamp(20px,4.5vw,56px)]"
      style={{ backgroundImage: "var(--paper-grain)" }}
    >
      <h1 className="sr-only">Katie Spencer</h1>

      {/* MOBILE: eyebrow above the plate */}
      <div className="px-1 pb-4 pt-8 md:hidden">
        <NowPlaying center />
      </div>

      {/* the composed stage plate (wordmark + Katie + floor, one image) */}
      <div className="relative mx-auto max-w-[1200px]">
        <img
          src="/on/hero-stage.webp"
          alt="Katie Spencer on a gilt theatre stage"
          className="block w-full [animation:ks-photo-settle_0.9s_cubic-bezier(0.25,0.7,0.25,1)_0.35s_backwards]"
        />

        {/* DESKTOP: eyebrow above the baked wordmark */}
        <div className="absolute left-[15%] top-[13%] hidden md:block">
          <NowPlaying />
        </div>
        {/* DESKTOP: tagline, credits and ticket below the baked wordmark */}
        <div className="absolute left-[13%] top-[62%] hidden w-[44%] md:block">
          <SubBilling />
        </div>
      </div>

      {/* MOBILE: tagline, credits and ticket below the plate */}
      <div className="px-1 pb-8 pt-6 md:hidden">
        <SubBilling center />
      </div>

      {/* ---- the wings, layered over the plate ---- */}
      {/* left wing — sheet music, a cut peony and the season tab, one collage */}
      <div
        ref={ticket}
        data-anim="true"
        className="pointer-events-none absolute left-[clamp(-18px,-1vw,10px)] top-[clamp(96px,12vw,180px)] z-[4] hidden w-[clamp(120px,14vw,232px)] -rotate-[4deg] md:block [animation:ks-drift-in_0.9s_ease_0.9s_backwards]"
        style={{ filter: "drop-shadow(2px 6px 13px rgba(22,17,13,.34))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/on/hero-wing.webp" alt="" aria-hidden className="block w-full" />
      </div>
      {/* INTERMEZZO scrap, torn into the bottom-right */}
      <img
        src="/on/hero-intermezzo.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[clamp(-14px,-0.5vw,16px)] right-[clamp(-8px,1vw,40px)] z-[4] hidden w-[clamp(110px,13vw,190px)] rotate-[4deg] lg:block"
        style={{ filter: "drop-shadow(0 5px 12px rgba(22,17,13,.3))" }}
      />
    </section>
  );
}
