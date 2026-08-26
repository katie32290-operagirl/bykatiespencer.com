import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { HeroPhoto } from "@/components/hero-photo";
import { WorkGrid } from "@/components/sections/work-grid";
import { clients } from "@/content/clients";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description:
    "From strategy to story to production: films, campaigns, experiences, and design that move people to believe, connect, and take action.",
  path: "/portfolio",
});

const trusted = clients.filter((c) => c !== "GreenRoom");

export default function WorkPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Title page — the program opens                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pt-24 pb-16 sm:px-14 md:pt-28">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-end gap-x-16 gap-y-12">
          <div className="max-w-[640px] flex-[1_1_460px]">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              Work
            </p>
            <h1 className="mt-5 font-serif text-[clamp(46px,7vw,92px)] leading-[1.0]">
              Work is where ideas become real<span className="text-brand">.</span>
            </h1>
            <p className="mt-7 max-w-[500px] font-serif text-[clamp(20px,2.4vw,28px)] italic leading-snug text-brand">
              Every project begins with the same question: &ldquo;Why should
              anyone care?&rdquo;
            </p>
            <p className="mt-6 max-w-[500px] text-lg leading-[1.7] text-muted-foreground">
              From strategy to story to production, I help organizations create
              work that moves people to believe, connect, and take action.
            </p>
          </div>

          <div className="flex-[1_1_340px]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] border border-border">
              <HeroPhoto src="/work/katie-hero.jpg" position="object-[45%_35%]" />
            </div>
            <p className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              On set, Knoxville
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The program — featured production + the full bill               */}
      {/* ---------------------------------------------------------------- */}
      <WorkGrid />

      {/* ---------------------------------------------------------------- */}
      {/*  Curtain line                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-20 sm:px-14 md:pb-24">
        <Reveal className="mx-auto max-w-[1180px] border-t-2 border-foreground pt-7">
          <p className="max-w-[560px] font-serif text-[clamp(23px,3vw,34px)] italic leading-[1.3] text-muted-foreground">
            Every project is a collaboration. Every result is shared.
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  In good company — near-black ground                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink px-6 py-20 text-on-black sm:px-14 md:py-24">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-x-[70px] gap-y-10">
          <div className="min-w-[220px] flex-[1_1_240px]">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              Trusted by
            </p>
            <p className="mt-4 max-w-xs font-sans text-sm leading-[1.6] text-on-black-soft">
              Organizations doing meaningful work in the world.
            </p>
          </div>
          <ul className="flex-[1_1_540px] font-accent text-[13px] uppercase tracking-[0.12em]">
            {trusted.map((name, i) => (
              <li
                key={name}
                className={`flex items-baseline gap-3 border-t border-line-dark py-[15px] ${
                  i === trusted.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-on-black-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-on-black transition-colors hover:text-brand">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
