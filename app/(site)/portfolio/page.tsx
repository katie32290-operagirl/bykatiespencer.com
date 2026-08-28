import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { WorkSections } from "@/components/sections/work-sections";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description:
    "From strategy to story to production: films, campaigns, experiences, and design that move people to believe, connect, and take action.",
  path: "/portfolio",
});

export default function WorkPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Title page — the house-dark marquee                             */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative overflow-hidden bg-ink px-[clamp(20px,4.5vw,56px)] pb-[clamp(72px,10vw,130px)] pt-[clamp(16px,2.5vw,40px)] text-on-black"
        style={{ backgroundImage: "var(--paper-grain-light)" }}
      >
        <div className="relative z-[2] mx-auto grid max-w-[1180px] items-center gap-x-[clamp(28px,4vw,64px)] gap-y-14 md:grid-cols-12">
          {/* headline column */}
          <div className="md:col-span-6">
            <h1
              data-anim="true"
              className="font-serif text-[clamp(84px,13vw,196px)] font-normal leading-[0.86] [animation:ks-type-in_0.8s_ease_0.1s_backwards]"
            >
              Work
            </h1>
            <p
              data-anim="true"
              className="mt-2 font-serif text-[clamp(30px,4.4vw,56px)] italic leading-[1.05] text-gold-pale [animation:ks-type-in_0.8s_ease_0.24s_backwards]"
            >
              is where ideas become{" "}
              <span className="text-gold-bright">real.</span>
            </p>
            <p
              data-anim="true"
              className="mt-9 max-w-[480px] font-serif text-[clamp(19px,2.2vw,26px)] italic leading-[1.35] text-gold-pale [animation:ks-type-in_0.8s_ease_0.38s_backwards]"
            >
              Every project begins with the same question: &ldquo;Why should
              anyone{" "}
              <span className="relative inline-block">
                care?&rdquo;
                <span
                  aria-hidden
                  className="absolute -inset-x-2 -inset-y-1 rounded-[50%] border-[1.5px] border-red"
                  style={{ transform: "rotate(-4deg)" }}
                />
              </span>
            </p>
            <p
              data-anim="true"
              className="mt-7 max-w-[440px] text-[16px] leading-[1.7] text-on-black-mute [animation:ks-type-in_0.8s_ease_0.52s_backwards]"
            >
              From strategy to story to production, I help organizations create
              work that moves people to believe, connect, and take action.
            </p>
          </div>

          {/* the collage */}
          <Reveal className="relative md:col-span-6">
            <div className="relative mx-auto max-w-[460px]">
              {/* green proscenium arch behind the photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/arch-green.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute -top-[10%] left-[8%] z-0 hidden w-[86%] sm:block"
                style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,.45))" }}
              />
              {/* blue torn paper, peeking left */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/paper-blue.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute top-[14%] left-[-16%] z-0 hidden w-[44%] -rotate-[6deg] sm:block"
              />

              {/* the production still, in a white frame */}
              <div
                className="relative z-[2] bg-[#F8F1E2] p-2.5 pb-9"
                style={{
                  transform: "rotate(1.6deg)",
                  boxShadow: "0 24px 50px rgba(0,0,0,.5)",
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                  <Image
                    src="/work/katie-hero.jpg"
                    alt="Katie Spencer on set, Knoxville"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 48vw"
                    className="object-cover object-[50%_38%]"
                  />
                </div>
                <p className="absolute bottom-3 left-3 font-accent text-[10px] uppercase tracking-[0.16em] text-ink-mid">
                  on set, knoxville
                </p>
              </div>

              {/* kraft tape, top-left of the frame */}
              <span className="ks-tape absolute left-[10%] top-[-12px] z-[3]" />
              {/* bunting, top-right of the frame */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/bunting.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute right-[10%] top-[-16px] z-[3] w-[clamp(120px,15vw,190px)] rotate-[2deg]"
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,.4))" }}
              />
              {/* grand theatre ticket, hanging off the lower-left */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/on/ticket-grand.webp"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-9%] left-[-6%] z-[4] w-[clamp(120px,15vw,185px)] -rotate-[8deg]"
                style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,.5))" }}
              />
            </div>
          </Reveal>
        </div>

        {/* scalloped deckle edge — the house-dark tears away to the green below */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] z-[3] h-[22px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18px 100%, var(--green) 16.5px, transparent 17px), radial-gradient(circle at 18px 100%, var(--gold) 18px, transparent 18.5px)",
            backgroundSize: "36px 22px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Headliner + the program + trusted by                            */}
      {/* ---------------------------------------------------------------- */}
      <WorkSections />
    </>
  );
}
