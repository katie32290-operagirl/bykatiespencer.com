"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
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

function WorkCard({ project }: { project: WorkProject }) {
  return (
    <article>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
          {project.dark ? (
            <div className="flex size-full items-center justify-center bg-foreground">
              <svg viewBox="0 0 24 24" className="size-10 text-brand" fill="none" aria-hidden>
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
            <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="size-5 translate-x-0.5 fill-current" />
            </span>
          )}
        </div>
      </a>
      <p className="text-eyebrow mt-4 text-brand">{project.label}</p>
      <h3 className="mt-1.5 font-serif text-xl font-medium tracking-tight">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
      >
        {project.cta}
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
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
    <Section spacing="sm" className="pb-24">
      <Container>
        {/* Heading + filters */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-display-sm font-medium">
              Stories I&rsquo;ve helped bring to life.
            </h2>
            <p className="font-script mt-1 text-2xl text-brand">
              Strategy. Story. Production. Impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-1 gap-y-2">
            {workCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  active === c
                    ? "border border-brand text-brand"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured case study — links to the internal impact page */}
        {showFeatured && (
          <div className="mt-12 grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <Link
              href={workFeatured.href}
              className="group relative col-span-12 block overflow-hidden rounded-2xl border border-border md:col-span-6"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={workFeatured.image}
                  alt={workFeatured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                {/* plum wash on hover — invites the click into the case study */}
                <div className="absolute inset-0 bg-plum/0 transition-colors duration-500 group-hover:bg-plum/20" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Case study
                  <ArrowUpRight className="size-3.5 text-brand" />
                </span>
              </div>
            </Link>
            <div className="col-span-12 md:col-span-4">
              <p className="text-eyebrow text-brand">{workFeatured.label}</p>
              <h3 className="mt-3 font-serif text-3xl font-medium tracking-tight">
                {workFeatured.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{workFeatured.lede}</p>
              <p className="mt-5 text-sm font-medium">The story:</p>
              <p className="mt-1 text-muted-foreground">{workFeatured.story}</p>
              <Link
                href={workFeatured.href}
                className="link-underline group mt-6 inline-flex items-center gap-1.5 font-medium text-brand"
              >
                {workFeatured.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="col-span-12 md:col-span-2">
              <p className="font-script text-6xl leading-none text-brand">
                {workFeatured.statValue}
              </p>
              <p className="font-script mt-1 text-2xl text-muted-foreground">
                {workFeatured.statLabel}
              </p>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((p) => (
            <WorkCard key={p.title} project={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
