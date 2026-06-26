import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { chapters, type Chapter } from "@/content/chapters";

function Rule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-px w-7 bg-brand/70", className)} />;
}

function Title({ text, className }: { text: string; className?: string }) {
  return (
    <h3 className={cn("font-serif font-medium tracking-tight", className)}>
      {text}
      <span className="text-brand">.</span>
    </h3>
  );
}

/** Chapter 01 — photo-led "cover": number + title set on the image. */
function CoverCard({ c }: { c: Chapter }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-card">
      <div className="relative aspect-[3/4]">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <span className="absolute left-5 top-4 font-mono text-xs tracking-[0.3em] text-white/80">
          {c.num}
        </span>
        <Title text={c.title} className="absolute inset-x-0 bottom-0 p-5 text-3xl text-white" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {c.subtitle && (
          <p className="font-serif text-lg italic leading-snug text-foreground">
            {c.subtitle}
          </p>
        )}
        <Rule className="my-5" />
        <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
      </div>
    </article>
  );
}

/** Chapters 02–05 — type-led: number, title, label, then a photo band + body. */
function StandardCard({ c }: { c: Chapter }) {
  const inner = (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card">
      <div className="px-5 pt-6">
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
          {c.num}
        </span>
        <Rule className="mt-3" />
        <Title text={c.title} className="mt-5 text-2xl leading-[1.1]" />
        {c.label && (
          <p className="text-eyebrow mt-2 text-muted-foreground">{c.label}</p>
        )}
      </div>
      <div className="relative mt-6 aspect-[4/5] overflow-hidden">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
      </div>
    </article>
  );

  return c.href ? (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

export function Chapters() {
  return (
    <section className="border-t border-border/60">
      <Container size="wide" className="py-20 md:py-28">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-eyebrow text-brand">Chapters</p>
            <Rule className="mt-3 w-10" />
            <h2 className="mt-6 max-w-3xl font-serif text-[clamp(1.9rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-tight">
              The moments, organizations, and ideas that shaped how I think
              about creativity, leadership, and building things that matter.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/about"
              className="text-eyebrow group inline-flex items-center gap-2 text-brand"
            >
              See the full story
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        {/* Chapter cards — one row, gently staggered */}
        <div className="mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {chapters.map((c, i) => (
            <Reveal
              key={c.num}
              delay={i * 0.06}
              className={cn(i % 2 === 1 && "lg:mt-12")}
            >
              {c.num === "01" ? <CoverCard c={c} /> : <StandardCard c={c} />}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/about"
            className="text-eyebrow group mt-14 inline-flex items-center gap-2 text-brand"
          >
            Every chapter led here
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
