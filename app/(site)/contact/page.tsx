import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Connect",
  description:
    "Tell me what you're working on. A note reaches Katie Spencer directly.",
  path: "/contact",
});

const DOTS = "....................";

const elsewhere = site.socials.filter((s) =>
  ["instagram", "linkedin"].includes(s.icon),
);

/** Dotted-leader row: label ···· value. Paper ground. */
function Leader({
  label,
  value,
  valueClass,
  className,
}: {
  label: string;
  value: string;
  valueClass?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-2.5", className)}>
      <span>{label}</span>
      <span
        aria-hidden
        className="flex-1 overflow-hidden whitespace-nowrap tracking-[3px] text-ink-faint"
      >
        {DOTS}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

export default function ConnectPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  The stage door — a deep-green marquee band, collaged            */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative overflow-hidden bg-green px-[clamp(20px,4.5vw,56px)] pb-[clamp(72px,10vw,130px)] pt-[clamp(64px,9vw,110px)] text-on-black"
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        {/* gold fluted arc rising from the lower-right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/on/rays-arc.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[6px] right-[-4%] z-0 hidden w-[clamp(280px,36vw,540px)] opacity-95 md:block"
        />

        {/* the collage — a boxholder at the opera */}
        <div className="pointer-events-none absolute right-[clamp(-10px,2vw,64px)] top-[clamp(48px,8vw,110px)] z-[1] hidden w-[clamp(280px,32vw,440px)] lg:block">
          {/* torn sheet music behind, upper-left */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/on/sheet-music-intermezzo.webp"
            alt=""
            aria-hidden
            className="absolute left-[-16%] top-[-8%] z-0 w-[52%] -rotate-[10deg] opacity-95"
            style={{
              clipPath:
                "polygon(6% 0%, 100% 4%, 96% 30%, 100% 54%, 94% 78%, 99% 98%, 72% 94%, 46% 100%, 20% 95%, 2% 99%, 6% 72%, 0% 48%, 4% 24%)",
              filter: "drop-shadow(0 3px 8px rgba(13,26,23,.4))",
            }}
          />
          {/* the opera-glasses collage, taped */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/on/opera-glasses.webp"
            alt=""
            aria-hidden
            className="relative z-[1] block w-full rotate-[2deg]"
            style={{ filter: "drop-shadow(0 14px 34px rgba(13,26,23,.5))" }}
          />
          <span className="ks-tape absolute left-[8%] top-[-14px] z-[2]" />
          {/* the Grand Theatre ticket, taped to the top corner */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/on/ticket-grand.webp"
            alt=""
            aria-hidden
            className="absolute right-[-8%] top-[6%] z-[2] w-[46%] rotate-[6deg]"
            style={{ filter: "drop-shadow(0 5px 12px rgba(13,26,23,.45))" }}
          />
        </div>

        <Reveal className="relative z-[2] mx-auto max-w-[1100px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.16em] text-gold-bright">
            Connect
          </p>
          <h1 className="mt-4 max-w-[13ch] font-serif text-[clamp(46px,7vw,96px)] font-normal leading-[0.98]">
            Let&rsquo;s start a conversation
            <span className="text-gold-bright">.</span>
          </h1>
          <span aria-hidden className="mt-8 block h-px w-[clamp(90px,10vw,150px)] bg-gold/55" />
          <p className="mt-7 max-w-[420px] text-[17px] leading-[1.7] text-on-black">
            Big ideas start with real conversations. I&rsquo;d love to hear what
            you&rsquo;re working on.
          </p>
        </Reveal>

        {/* scalloped deckle edge — the green tears away to the paper below */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] z-[3] h-[22px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18px 100%, var(--paper) 16.5px, transparent 17px), radial-gradient(circle at 18px 100%, var(--gold) 18px, transparent 18.5px)",
            backgroundSize: "36px 22px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The invitation + the RSVP card                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,110px)]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-start gap-x-[clamp(32px,5vw,72px)] gap-y-[clamp(48px,7vw,72px)]">
          {/* The invitation — a photo scrap + the particulars */}
          <Reveal className="flex-[1_1_320px] max-w-[460px]">
            {/* photo scrap on a blue torn mat, with a handwritten caption */}
            <div className="relative w-[clamp(200px,72%,280px)]">
              {/* blue torn paper behind */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/paper-blue.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute right-[-16%] top-[8%] z-0 w-[80%] -rotate-[6deg]"
              />
              <div
                className="relative z-[1] bg-[#F6EFE0] p-[9px] [transform:rotate(-2deg)] transition-transform duration-300 hover:-translate-y-1 hover:[transform:rotate(-1deg)]"
                style={{ boxShadow: "var(--shadow-paper)" }}
              >
                <span className="ks-tape absolute -top-3 left-[16%] z-[2]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/on/cafe-shoot.jpg"
                  alt="Katie Spencer on set in Knoxville"
                  className="block w-full"
                  style={{
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                    objectPosition: "50% 30%",
                  }}
                />
              </div>
              {/* handwritten "On set, Knoxville" */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/script-onset.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-14%] left-[-14%] z-[2] w-[52%] -rotate-[4deg]"
              />
            </div>

            <p className="mt-11 font-accent text-[13px] uppercase tracking-[0.12em] text-red">
              Prefer email?
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block font-serif text-[clamp(22px,2.4vw,30px)] leading-tight text-foreground decoration-dotted underline-offset-[6px] transition-colors hover:text-red-deep hover:underline"
            >
              hello@
              <wbr />
              bykatiespencer.com
            </a>

            <div className="mt-9 grid gap-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              <Leader
                label="Based in"
                value="Knoxville, TN"
                valueClass="text-foreground"
              />
              <Leader
                label="Reply within"
                value="A couple days"
                valueClass="text-foreground"
              />
            </div>
            <p className="mt-3 font-serif text-[17px] italic text-muted-foreground">
              Working with mission-driven teams everywhere.
            </p>

            <div className="mt-10">
              <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                Elsewhere
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-accent text-xs uppercase tracking-[0.12em]">
                <a
                  href="https://greenroomcrm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand transition-colors hover:text-red-deep"
                >
                  GreenRoom
                </a>
                {elsewhere.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand transition-colors hover:text-red-deep"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* The RSVP card — straight and legible on a tilted paper mat */}
          <Reveal className="relative flex-[1_1_520px] max-w-[560px]">
            {/* tilted paper mat behind the card */}
            <span
              aria-hidden
              className="absolute -inset-2.5 z-0 rounded-[2px] bg-paper-deep [transform:rotate(-1.4deg)]"
              style={{
                backgroundImage: "var(--paper-grain)",
                boxShadow: "var(--shadow-soft)",
              }}
            />
            {/* small ticket accent tucked behind the top edge */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/on/ticket-opening-night.webp"
              alt=""
              aria-hidden
              className="absolute z-0 hidden md:block"
              style={{
                right: "-26px",
                top: "-34px",
                width: "clamp(120px,13vw,168px)",
                transform: "rotate(7deg)",
                filter: "drop-shadow(0 4px 10px rgba(22,17,13,.32))",
              }}
            />
            <div className="relative z-[2]">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
