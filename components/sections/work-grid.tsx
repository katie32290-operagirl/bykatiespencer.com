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
      className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= 120) toFallback();
      }}
      onError={toFallback}
    />
  );
}

function WorkCard({ project }: { project: WorkProject }) {
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
    <article>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] border border-border">
          {project.dark ? (
            <div className="flex size-full items-center justify-center bg-ink">
              <svg
                viewBox="0 0 24 24"
                className="size-10 text-brand"
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
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          )}
          {project.youtube && (
            <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="size-5 translate-x-0.5 fill-current" />
            </span>
          )}
        </div>
      </a>
      <p className="mt-4 font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
        {project.label}
      </p>
      <h3 className="mt-1.5 font-serif text-[22px] leading-[1.15]">
        {project.title}
      </h3>
      <p className="mt-1 text-sm leading-[1.6] text-muted-foreground">
        {project.subtitle}
      </p>
      {credit && (
        <p className="mt-1.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          {credit.prefix}{" "}
          <a
            href={credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline decoration-dotted underline-offset-2 transition-colors hover:text-red-deep"
          >
            {credit.name}
          </a>
        </p>
      )}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cta mt-3 inline-flex items-center gap-1.5 font-accent text-[11px] uppercase tracking-[0.12em] text-brand transition-colors hover:text-red-deep"
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
    <section className="px-6 pb-20 sm:px-14 md:pb-24">
      <Reveal className="mx-auto max-w-[1180px]">
        {/* Heading + filters — the bill opens on a printed rule */}
        <div className="border-t-2 border-foreground pt-7">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
                The program
              </p>
              <h2 className="mt-4 font-serif text-[clamp(32px,4.2vw,52px)] leading-[1.06]">
                Stories I&rsquo;ve helped bring to life.
              </h2>
              <p className="mt-3 font-accent text-[12px] uppercase tracking-[0.16em] text-ink-faint">
                Strategy<span className="text-brand">.</span> Story
                <span className="text-brand">.</span> Production
                <span className="text-brand">.</span> Impact
                <span className="text-brand">.</span>
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
                      ? "border-brand text-brand"
                      : "border-transparent text-ink-faint hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured production — links to the internal case study page */}
        {showFeatured && (
          <div className="mt-14 border-t border-border pt-10">
            <div className="grid items-start gap-x-12 gap-y-8 md:grid-cols-12">
              <Link
                href={workFeatured.href}
                className="group relative col-span-12 block overflow-hidden rounded-[6px] border border-border md:col-span-7"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
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
                    <ArrowUpRight className="size-3 text-brand" />
                  </span>
                </div>
              </Link>
              <div className="col-span-12 md:col-span-5">
                <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-brand">
                  {workFeatured.label}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.08]">
                  {workFeatured.title}
                </h3>
                <p className="mt-4 text-base leading-[1.6] text-muted-foreground">
                  {workFeatured.lede}
                </p>
                <p className="mt-5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  The story
                </p>
                <p className="mt-1.5 text-base leading-[1.6] text-muted-foreground">
                  {workFeatured.story}
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <p className="font-serif text-[clamp(44px,6vw,66px)] leading-none text-brand">
                    {workFeatured.statValue}
                  </p>
                  <p className="max-w-[150px] font-accent text-[11px] uppercase leading-tight tracking-[0.12em] text-ink-faint">
                    {workFeatured.statLabel}
                  </p>
                </div>
                <Link
                  href={workFeatured.href}
                  className="group/cta mt-6 inline-flex items-center gap-1.5 font-accent text-[11px] uppercase tracking-[0.12em] text-brand transition-colors hover:text-red-deep"
                >
                  {workFeatured.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* The full bill */}
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((p) => (
            <WorkCard key={p.title} project={p} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
