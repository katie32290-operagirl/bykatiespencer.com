import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { YtThumb } from "@/components/yt-thumb";
import { cn } from "@/lib/utils";
import { builds, type Build } from "@/content/builds";

function BuildCard({ build }: { build: Build }) {
  const inner = (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border">
      {build.dark ? (
        <div className="flex size-full flex-col justify-between bg-foreground p-5 text-background">
          {/* Five rules — the five movements of the Narrative Method. (Was a
              hexagon, which read as the GreenRoom mark.) */}
          <svg viewBox="0 0 24 12" className="w-14 text-brand" fill="none" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={1 + i * 5.5}
                y1={11}
                x2={1 + i * 5.5}
                y2={11 - (i + 1) * 2}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div>
            <h3 className="font-serif text-xl font-medium">{build.title}</h3>
            <p className="mt-1 text-sm text-background/70">{build.subtitle}</p>
          </div>
        </div>
      ) : (
        <>
          {build.image ? (
            <Image
              src={build.image}
              alt={build.title}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          ) : build.youtube ? (
            <YtThumb
              id={build.youtube}
              alt={build.title}
              className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          ) : null}
          {!build.brand && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-serif text-xl font-medium">{build.title}</h3>
                {build.subtitle && (
                  <p className="mt-1 text-sm text-white/80">{build.subtitle}</p>
                )}
              </div>
            </>
          )}
        </>
      )}
      {build.youtube ? (
        <span className="absolute left-1/2 top-[38%] flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="size-5 translate-x-0.5 fill-current" />
        </span>
      ) : (
        build.href && (
          <span className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full bg-background/20 text-background backdrop-blur transition-colors group-hover:bg-brand">
            <ArrowUpRight className="size-4" />
          </span>
        )
      )}
    </div>
  );

  if (!build.href) return inner;

  // Internal routes get client-side navigation; outbound links open in a tab.
  if (build.href.startsWith("/")) {
    return <Link href={build.href}>{inner}</Link>;
  }
  return (
    <a href={build.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}

export function ThingsIBuild() {
  return (
    <Section className="border-t border-border/60">
      <Container size="wide">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-display-sm font-medium">Chapters</h2>
              <p className="mt-3 max-w-md text-lg text-muted-foreground">
                The organizations, ideas, and ventures that have shaped my work.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="link-underline group inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              See all work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {builds.map((build, i) => (
            <StaggerItem
              key={build.title}
              className={cn(i % 2 === 1 && "md:mt-12")}
            >
              <BuildCard build={build} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
