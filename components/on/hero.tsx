"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Opening Night hero — a hand-assembled playbill. Arches escape the left edge,
 * a gilt sunburst and torn sheet music sit top-right, the name lands centered
 * under a thin gold ring, and a tilted photo + oversized ticket lean into the
 * next act. Fan, photo and ticket drift with the pointer. Copy unchanged.
 */
export function HeroV4() {
  const fan = useRef<HTMLSpanElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const ticket = useRef<HTMLAnchorElement>(null);
  const hand = useRef<HTMLSpanElement>(null);
  const spin = useRef(0);

  const noMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // the wheel takes a full turn on each nudge
  const spinFan = () => {
    if (!fan.current || noMotion()) return;
    spin.current += 360;
    fan.current.style.transform = `rotate(${spin.current}deg)`;
  };
  // the usher's hand reaches in for the ticket, then withdraws
  const grabTicket = () => {
    if (!hand.current || noMotion()) return;
    hand.current.style.transform = "translateX(64%) rotate(-3deg)";
  };
  const releaseTicket = () => {
    if (!hand.current) return;
    hand.current.style.transform = "translateX(160%) rotate(6deg)";
  };

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
        if (fan.current) fan.current.style.translate = `${x * -8}px ${y * -5}px`;
        if (photo.current) photo.current.style.translate = `${x * 10}px ${y * 7}px`;
        if (ticket.current)
          ticket.current.style.translate = `${x * 16}px ${y * 10}px`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative z-[4] px-[clamp(20px,4.5vw,56px)]">
      <div className="relative pb-[clamp(300px,34vw,400px)] pt-[clamp(36px,5vw,72px)]">
        {/* sage concentric arch escaping the left edge */}
        <span
          aria-hidden
          className="absolute z-0"
          style={{
            left: "clamp(-70px,-4vw,-30px)",
            top: "5%",
            width: "clamp(180px,22vw,320px)",
            height: "clamp(320px,44vw,620px)",
            borderRadius: "999px 999px 0 0",
            backgroundColor: "var(--paper)",
            boxShadow:
              "inset 0 0 0 12px #9DB8A6, inset 0 0 0 24px var(--paper), inset 0 0 0 36px #9DB8A6, inset 0 0 0 48px var(--paper), inset 0 0 0 60px #9DB8A6",
          }}
        />
        {/* burgundy arch overlapping it */}
        <span
          aria-hidden
          className="absolute z-0"
          style={{
            left: "clamp(-40px,-2vw,-14px)",
            top: "36%",
            width: "clamp(150px,18vw,280px)",
            height: "clamp(260px,34vw,460px)",
            borderRadius: "999px 999px 0 0",
            backgroundColor: "var(--burgundy)",
            backgroundImage: "var(--paper-grain-light)",
            boxShadow: "0 2px 6px rgba(22,17,13,.22)",
          }}
        />
        {/* gold-striped circle inside the arch */}
        <span
          aria-hidden
          className="absolute z-0 aspect-square rounded-full"
          style={{
            left: "clamp(4px,3vw,64px)",
            top: "52%",
            width: "clamp(90px,11vw,160px)",
            background:
              "repeating-linear-gradient(90deg, var(--gold) 0 3px, var(--burgundy-deep) 3px 10px)",
          }}
        />
        {/* dotted grid */}
        <span
          aria-hidden
          className="absolute z-0"
          style={{
            left: "clamp(-8px,0vw,10px)",
            top: "66%",
            width: "clamp(50px,6vw,90px)",
            height: "clamp(90px,10vw,140px)",
            backgroundImage:
              "radial-gradient(circle 2.6px, var(--ink) 2.4px, transparent 2.7px)",
            backgroundSize: "14px 14px",
            opacity: 0.8,
          }}
        />
        {/* teal fan with gold rays, top right (parallax + open) */}
        <span
          ref={fan}
          data-anim="true"
          aria-hidden
          onMouseEnter={spinFan}
          onClick={spinFan}
          className="absolute z-0 aspect-square cursor-pointer rounded-full [animation:ks-fan-open_1.1s_cubic-bezier(0.2,0.7,0.2,1)_0.35s_backwards]"
          style={{
            right: "clamp(-70px,-4vw,-24px)",
            top: "clamp(10px,1.5vw,28px)",
            width: "clamp(220px,30vw,440px)",
            backgroundImage:
              "repeating-conic-gradient(transparent 0deg 21deg, var(--gold-bright) 21deg 22.2deg), repeating-conic-gradient(var(--green) 0deg 45deg, #1D5A50 45deg 90deg)",
            transformOrigin: "50% 50%",
            transition: "transform 2.6s cubic-bezier(0.55,0.08,0.35,0.95)",
            boxShadow: "0 2px 8px rgba(22,17,13,.22)",
          }}
        />
        {/* torn sheet music tucked under the fan */}
        <img
          src="/on/sheet-music-intermezzo.webp"
          alt=""
          aria-hidden
          className="absolute z-0"
          style={{
            right: "clamp(-16px,-1vw,0px)",
            top: "18%",
            width: "clamp(140px,17vw,260px)",
            height: "clamp(220px,30vw,420px)",
            objectFit: "cover",
            objectPosition: "50% 40%",
            clipPath:
              "polygon(14% 0%, 100% 0%, 100% 100%, 10% 98%, 2% 84%, 10% 66%, 0% 48%, 8% 30%, 2% 14%)",
            opacity: 0.96,
            boxShadow: "0 1px 4px rgba(22,17,13,.28)",
          }}
        />
        {/* thin gold circle + gold sun above the name */}
        <span
          aria-hidden
          className="absolute left-1/2 z-0 aspect-square -translate-x-1/2 rounded-full"
          style={{
            top: "-6%",
            width: "clamp(300px,40vw,560px)",
            border: "1.5px solid var(--gold)",
            opacity: 0.75,
          }}
        />
        <span
          aria-hidden
          className="absolute z-0 aspect-square rounded-full"
          style={{
            left: "31%",
            top: "5%",
            width: "clamp(64px,8vw,120px)",
            backgroundColor: "var(--gold-bright)",
            backgroundImage: "var(--paper-grain)",
            opacity: 0.95,
          }}
        />
        {/* compass stars */}
        <span
          data-anim="true"
          aria-hidden
          className="absolute z-[1] leading-none text-gold [animation:ks-star-twinkle_2.4s_ease_1.2s_1]"
          style={{ left: "20%", top: "-2%", fontSize: "clamp(38px,5vw,60px)" }}
        >
          &#10022;
        </span>
        <span
          aria-hidden
          className="absolute z-[1] text-base leading-none text-gold"
          style={{ left: "26%", top: "8%" }}
        >
          &#10022;
        </span>
        {/* pink torn paper */}
        <span
          aria-hidden
          className="absolute z-0"
          style={{
            right: "26%",
            top: "0%",
            width: "clamp(120px,16vw,240px)",
            height: "clamp(50px,6vw,90px)",
            backgroundColor: "var(--rose)",
            backgroundImage: "var(--paper-grain)",
            clipPath:
              "polygon(2% 22%, 18% 4%, 42% 12%, 66% 0%, 88% 10%, 100% 30%, 94% 62%, 98% 88%, 74% 100%, 48% 88%, 22% 98%, 0% 78%, 6% 48%)",
            opacity: 0.9,
            transform: "rotate(-3deg)",
          }}
        />

        {/* centered playbill column */}
        <div className="relative z-[2] mx-auto max-w-[760px] text-center">
          <h1 className="sr-only">Katie Spencer</h1>
          <div
            data-anim="true"
            aria-hidden
            className="font-accent text-[12px] uppercase tracking-[0.12em] text-red [animation:ks-type-in_0.6s_ease_0.5s_backwards]"
          >
            Now playing
          </div>
          <img
            data-anim="true"
            src="/on/wordmark-stacked.webp"
            alt="Katie Spencer"
            className="mx-auto block [animation:ks-type-in_0.8s_ease_0.5s_backwards]"
            style={{ width: "clamp(300px,44vw,620px)" }}
          />
          <p
            data-anim="true"
            className="mx-auto mb-7 mt-[-8px] max-w-[520px] font-serif text-[clamp(22px,2.8vw,34px)] font-medium italic leading-[1.22] [animation:ks-type-in_0.8s_ease_0.7s_backwards]"
          >
            A life in stories. On stage and off.
          </p>
          <div
            data-anim="true"
            className="flex flex-wrap items-baseline justify-center gap-x-[14px] gap-y-2 font-accent text-[13px] uppercase tracking-[0.12em] text-muted-foreground [animation:ks-type-in_0.8s_ease_0.85s_backwards]"
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
            className="mt-8 [animation:ks-type-in_0.8s_ease_1s_backwards]"
          >
            <Link
              href="#premise"
              className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand transition-colors hover:text-red-deep"
            >
              Enter the room &rarr;
            </Link>
          </div>
        </div>

        {/* deep green torn band along the bottom */}
        <span
          aria-hidden
          className="absolute z-[1]"
          style={{
            left: "16%",
            right: "-50px",
            bottom: "-24px",
            height: "clamp(120px,15vw,210px)",
            backgroundColor: "var(--green-deep)",
            backgroundImage: "var(--paper-grain-light)",
            clipPath:
              "polygon(0% 38%, 8% 22%, 20% 34%, 34% 14%, 48% 28%, 62% 8%, 76% 24%, 90% 6%, 100% 16%, 100% 100%, 0% 100%)",
            transform: "rotate(-1deg)",
          }}
        />
        {/* cut peony from the poster, crossing into the next act */}
        <span
          aria-hidden
          className="absolute z-[4] aspect-square"
          style={{
            left: "clamp(-30px,-1vw,12px)",
            bottom: "clamp(-56px,-4vw,-32px)",
            width: "clamp(170px,21vw,300px)",
            backgroundImage: "url('/on/deco-poster.webp')",
            backgroundSize: "330%",
            backgroundPosition: "13% 90%",
            clipPath:
              "polygon(30% 2%, 52% 8%, 72% 2%, 88% 14%, 98% 34%, 94% 56%, 100% 74%, 84% 90%, 62% 98%, 40% 92%, 20% 98%, 6% 82%, 0% 60%, 4% 38%, 12% 16%)",
            transform: "rotate(-5deg)",
            filter: "drop-shadow(2px 5px 8px rgba(13,26,23,.35))",
          }}
        />
        {/* Katie print on the shelf (parallax + settle) */}
        <div
          ref={photo}
          data-anim="true"
          className="absolute z-[3] transition-transform duration-300 [animation:ks-photo-settle_0.9s_cubic-bezier(0.25,0.7,0.25,1)_0.55s_backwards]"
          style={{
            right: "clamp(90px,14vw,240px)",
            bottom: "clamp(40px,5vw,80px)",
            width: "clamp(190px,21vw,300px)",
            backgroundColor: "#F8F1E2",
            padding: "8px 8px 12px",
            transform: "rotate(2deg)",
            boxShadow: "0 10px 28px rgba(22,17,13,.38)",
          }}
        >
          <img
            src="/on/portrait-olive.jpg"
            alt="Katie Spencer, mid-laugh, on set"
            className="block w-full"
            style={{
              aspectRatio: "4 / 5",
              objectFit: "cover",
              objectPosition: "62% 24%",
            }}
          />
        </div>
        {/* oversized ticket leaning like scenery (parallax + drift) */}
        <Link
          ref={ticket}
          data-anim="true"
          href="#premise"
          title="Admit one"
          onMouseEnter={grabTicket}
          onMouseLeave={releaseTicket}
          className="absolute z-[5] block transition-transform duration-300 [animation:ks-drift-in_0.9s_ease_0.9s_backwards]"
          style={{
            right: "clamp(-10px,2vw,60px)",
            bottom: "-36px",
            width: "clamp(210px,24vw,370px)",
            transform: "rotate(-7deg)",
          }}
        >
          <img
            src="/on/ticket-opening-night.webp"
            alt="Opening night ticket stub"
            className="block w-full"
            style={{
              clipPath: "polygon(5% 13%, 95% 9%, 97% 87%, 4% 91%)",
              filter: "drop-shadow(0 4px 10px rgba(22,17,13,.38))",
            }}
          />
        </Link>
        <span
          className="absolute z-[4] font-accent text-[11px] uppercase tracking-[0.1em] text-on-black-soft"
          style={{
            right: "clamp(100px,15vw,260px)",
            bottom: "clamp(10px,1.5vw,28px)",
            transform: "rotate(-1deg)",
          }}
        >
          between takes &middot; knoxville
        </span>
        {/* the usher's hand, waiting in the wings — reaches for the ticket on hover */}
        <span
          ref={hand}
          aria-hidden
          className="absolute z-[6] hidden md:block"
          style={{
            right: "clamp(-30px,-1vw,0px)",
            bottom: "60px",
            width: "clamp(220px,26vw,390px)",
            aspectRatio: "2 / 1",
            backgroundImage: "url('/on/usher-hand.webp')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            transform: "translateX(160%) rotate(6deg)",
            transition: "transform 1.1s cubic-bezier(0.4,0.08,0.25,1)",
            pointerEvents: "none",
            filter: "drop-shadow(-4px 5px 9px rgba(22,17,13,.35))",
          }}
        />
      </div>
    </section>
  );
}
