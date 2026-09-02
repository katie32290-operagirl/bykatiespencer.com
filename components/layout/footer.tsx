"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const socials = site.socials.filter((s) =>
  ["instagram", "linkedin"].includes(s.icon),
);

/** The exit — a dark, proscenium-lit close. Copy unchanged. */
export function Footer() {
  // the redesigned homepage carries its own footer
  if (usePathname() === "/") return null;
  return (
    <footer
      id="connect"
      className="relative mt-auto overflow-hidden bg-ink px-[clamp(20px,4.5vw,56px)] pb-14 pt-[clamp(64px,9vw,120px)] text-on-black"
      style={{
        backgroundImage:
          "linear-gradient(rgba(16,12,9,.84), rgba(16,12,9,.8)), url('/on/stage-proscenium.webp')",
        backgroundSize: "auto, cover",
        backgroundPosition: "center, 50% 20%",
      }}
    >
      {/* remnants: a discarded ticket */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/on/ticket-opening-night.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[4%] bottom-6 w-[clamp(120px,13vw,190px)] opacity-90"
        style={{
          clipPath: "polygon(5% 13%, 95% 9%, 97% 87%, 4% 91%)",
          transform: "rotate(-14deg)",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,.5))",
        }}
      />

      <div className="relative mx-auto max-w-[900px] text-center">
        <div
          data-anim="true"
          className="mb-5 text-gold-bright [animation:ks-star-twinkle_2s_ease_1s_1]"
          aria-hidden
        >
          &#10022;
        </div>
        <h2 className="mb-5 font-serif text-[clamp(40px,6vw,72px)] font-medium italic leading-[1.05]">
          Come find me after the show
          <span className="text-brand">.</span>
        </h2>
        <p className="mx-auto mb-9 max-w-[520px] text-base leading-[1.7] text-on-black-soft">
          Have a story worth telling, a room worth gathering, or something
          interesting you&rsquo;re building?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-gold-pale transition-colors hover:text-gold-bright"
          >
            {site.email}
          </a>
        </p>

        <nav
          aria-label="Footer"
          className="mb-16 flex flex-wrap justify-center gap-x-[30px] gap-y-3.5 font-accent text-xs uppercase tracking-[0.12em]"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-dotted border-on-black-mute pb-[3px] text-on-black transition-colors hover:text-gold-pale"
            >
              {s.label}
            </a>
          ))}
          <a
            href="https://greenroomcrm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-dotted border-on-black-mute pb-[3px] text-on-black transition-colors hover:text-gold-pale"
          >
            GreenRoom
          </a>
          <Link
            href="/writing"
            className="border-b border-dotted border-on-black-mute pb-[3px] text-on-black transition-colors hover:text-gold-pale"
          >
            Notes
          </Link>
          <Link
            href="/about"
            className="border-b border-dotted border-on-black-mute pb-[3px] text-on-black transition-colors hover:text-gold-pale"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center justify-center gap-[18px] text-on-black-mute">
          <span className="max-w-[160px] flex-1 border-b border-line-dark" />
          <span className="font-accent text-[10px] uppercase tracking-[0.2em]">
            End of program &#10033;
          </span>
          <span className="max-w-[160px] flex-1 border-b border-line-dark" />
        </div>
        <p className="mt-6 font-accent text-[10px] uppercase tracking-[0.14em] text-on-black-mute">
          &copy; 2026 {site.name} &middot; High art &middot; Real life &middot;
          Meaningful work
        </p>
      </div>
    </footer>
  );
}
