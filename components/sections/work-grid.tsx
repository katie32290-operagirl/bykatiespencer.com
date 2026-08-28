"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import {
  workCategories,
  workFeatured,
  workProjects,
  type WorkProject,
} from "@/content/work-projects";

/**
 * YouTube thumbnail with a maxres→sddefault fallback. Many videos have no
 * maxresdefault (YouTube serves a 120px gray placeholder or a 404), so we drop
 * to sddefault, which always exists. The mount-time ref check covers the case
 * where the placeholder finishes loading before React hydrates and onLoad never
 * fires.
 */
function YtThumb({ id, alt }: { id: string; alt: string }) {
  const [src, setSrc] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  );
  const ref = useRef<HTMLImageElement>(null);

  const toFallback = () =>
    setSrc((cur) =>
      cur.includes("maxres")
        ? `https://i.ytimg.com/vi/${id}/sddefault.jpg`
        : cur,
    );

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth <= 120) toFallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= 120) toFallback();
      }}
      onError={toFallback}
    />
  );
}

/** Hand-pinned tilts — kept under 2.5° so the desk reads assembled, not messy. */
const TILT = [
  "rotate-[-1.6deg]",
  "rotate-[1.1deg]",
  "rotate-[-0.7deg]",
  "rotate-[2.2deg]",
];
/** A gentle vertical scatter so rows never lock into a sterile grid. */
const DROP = ["", "sm:mt-10", "lg:mt-6"];

/**
 * A single work item, styled as a tilted print taped to the paper desk: a
 * cream photo frame with the real media inside, a mono caption underneath, and
 * the title / credit set below like a program listing.
 */
function WorkCard({ project, index }: { project: WorkProject; index: number }) {
  // Credit annotation — an explicit `credit` wins; otherwise fall back to the
  // video production team (Glitch for City Lyric Opera, Vessul for the rest).
  const videoCredit = project.youtube
    ? project.title === "City Lyric Opera"
      ? { prefix: "Video by", name: "Glitch", href: "https://glitchworks.org/" }
      : {
          prefix: "Video by",
          name: "Vessul Creative",
          href: "https://www.vessul.co/",
        }
    : null;
  const credit = project.credit ?? videoCredit;

  return (
    <article
      className={cn(
        "group relative text-foreground transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:rotate-0",
        TILT[index % TILT.length],
        DROP[index % DROP.length],
      )}
    >
      {/* every third print gets a strip of tape */}
      {index % 3 === 0 && (
        <span className="ks-tape absolute -top-3 left-[14%] z-[2]" aria-hidden />
      )}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          className="bg-[#F8F1E2] p-2.5"
          style={{ boxShadow: "var(--shadow-paper)" }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-ink">
            {project.dark ? (
              <div className="flex size-full items-center justify-center bg-ink">
                <svg
                  viewBox="0 0 24 24"
                  className="size-10 text-gold"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : project.youtube ? (
              <YtThumb id={project.youtube} alt={project.title} />
            ) : (
              <Image
                src={project.image!}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            )}
            {project.youtube && (
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-paper shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="size-5 translate-x-0.5 fill-current" />
              </span>
            )}
          </div>
          {/* mono caption, printed on the frame's lower margin */}
          <p className="pt-2.5 font-accent text-[10px] uppercase tracking-[0.12em] text-ink-faint">
            {project.label}
          </p>
        </div>
      </a>
      <h3 className="mt-3.5 font-serif text-[22px] font-medium leading-[1.15]">
        {project.title}
      </h3>
      <p className="mt-1 font-sans text-sm leading-[1.6] text-muted-foreground">
        {project.subtitle}
      </p>
      {credit && (
        <p className="mt-1.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          {credit.prefix}{" "}
          <a
            href={credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red underline decoration-dotted underline-offset-2 transition-colors hover:text-red-deep"
          >
            {credit.name}
          </a>
        </p>
      )}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cta mt-3 inline-flex items-center gap-1.5 font-accent text-[11px] uppercase tracking-[0.12em] text-red transition-colors hover:text-red-deep"
      >
        {project.cta}
        <ArrowRight className="size-3 transition-transform group-hover/cta:translate-x-1" />
      </a>
    </article>
  );
}

export function WorkGrid() {
  const [active, setActive] = useState<string>("All");

  const showFeatured = active === "All" || workFeatured.tags.includes(active);
  const cards =
    active === "All"
      ? workProjects
      : workProjects.filter((p) => p.tags.includes(active));

  return (
    <section
      className="relative overflow-hidden bg-paper px-[clamp(20px,4.5vw,56px)] pb-[clamp(56px,8vw,110px)]"
      style={{ backgroundImage: "var(--paper-grain)" }}
    >
      <Reveal className="relative mx-auto max-w-[1180px]">
        {/* Heading + filters — the bill opens on a printed rule */}
        <div className="border-t-2 border-ink pt-7">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="relative">
              <span
                data-anim="true"
                aria-hidden
                className="absolute -left-6 -top-5 text-lg text-gold [animation:ks-star-twinkle_2.4s_ease_1s_1] sm:-left-8"
              >
                &#10022;
              </span>
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-red">
                The program
              </p>
              <h2 className="mt-4 font-serif text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.06]">
                Stories I&rsquo;ve helped bring to life.
              </h2>
              <p className="mt-3 font-accent text-[12px] uppercase tracking-[0.16em] text-ink-faint">
                Strategy<span className="text-red">.</span> Story
                <span className="text-red">.</span> Production
                <span className="text-red">.</span> Impact
                <span className="text-red">.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {workCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={cn(
                    "rounded-[2px] border-b pb-1 font-accent text-[11px] uppercase tracking-[0.12em] transition-colors",
                    active === c
                      ? "border-red text-red"
                      : "border-transparent text-ink-faint hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured production — a big pinned playbill, into the case study */}
        {showFeatured && (
          <div className="mt-14 border-t border-line pt-12">
            <div className="grid items-start gap-x-12 gap-y-10 md:grid-cols-12">
              <Link
                href={workFeatured.href}
                className="group relative col-span-12 block transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:rotate-0 md:col-span-7 rotate-[-1.1deg]"
              >
                {/* cut sheet music tucked behind the print, top-left */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/on/sheet-music-intermezzo.webp"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -left-5 -top-6 z-0 hidden w-[120px] rotate-[6deg] opacity-90 sm:block"
                  style={{
                    clipPath:
                      "polygon(10% 0%, 100% 4%, 96% 92%, 6% 100%, 0% 48%)",
                    filter: "drop-shadow(0 1px 4px rgba(22,17,13,.28))",
                  }}
                />
                <span
                  className="ks-tape absolute -top-3 left-[10%] z-[2]"
                  aria-hidden
                />
                <div
                  className="relative bg-[#F8F1E2] p-3"
                  style={{ boxShadow: "var(--shadow-paper)" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                    <Image
                      src={workFeatured.image}
                      alt={workFeatured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    />
                    {/* ink wash on hover — invites the click into the case study */}
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-[2px] bg-paper/95 px-3 py-1.5 font-accent text-[10px] uppercase tracking-[0.12em] text-foreground opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      Case study
                      <ArrowUpRight className="size-3 text-red" />
                    </span>
                  </div>
                  <p className="pt-2.5 font-accent text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                    Featured production
                  </p>
                </div>
              </Link>
              <div className="col-span-12 md:col-span-5">
                <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-red">
                  {workFeatured.label}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.08]">
                  {workFeatured.title}
                </h3>
                <p className="mt-4 font-sans text-base leading-[1.6] text-muted-foreground">
                  {workFeatured.lede}
                </p>
                <p className="mt-5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  The story
                </p>
                <p className="mt-1.5 font-sans text-base leading-[1.6] text-muted-foreground">
                  {workFeatured.story}
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <p className="font-serif text-[clamp(44px,6vw,66px)] font-medium leading-none text-red">
                    {workFeatured.statValue}
                  </p>
                  <p className="max-w-[150px] font-accent text-[11px] uppercase leading-tight tracking-[0.12em] text-ink-faint">
                    {workFeatured.statLabel}
                  </p>
                </div>
                <Link
                  href={workFeatured.href}
                  className="group/cta mt-6 inline-flex items-center gap-1.5 font-accent text-[11px] uppercase tracking-[0.12em] text-red transition-colors hover:text-red-deep"
                >
                  {workFeatured.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* The full bill — prints scattered across the desk */}
        <div className="mt-16 flex items-baseline justify-between border-t border-line pt-5">
          <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            The full bill
          </p>
          <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            {String(cards.length).padStart(2, "0")} pieces
          </p>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((p, i) => (
            <Reveal key={p.title} y={22} delay={(i % 3) * 0.08}>
              <WorkCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
