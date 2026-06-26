import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { BrushUnderline } from "@/components/brush-underline";
import { cn } from "@/lib/utils";

function Hex({ filled }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 text-brand"
      fill={filled ? "currentColor" : "none"}
      aria-hidden
    >
      <path
        d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const items = [
  {
    name: "GreenRoom",
    icon: <Hex filled />,
    body: "A CRM built specifically for performing arts organizations that brings fundraising, marketing, ticketing, and operations together in one platform.",
    note: "Launching 2026",
  },
  {
    name: "Narratives",
    icon: <Hex />,
    body: "An AI storytelling platform helping mission-driven organizations communicate with greater clarity, consistency, and impact.",
    note: null,
  },
  {
    name: "Speaking",
    icon: <ArrowUpRight className="size-5 text-brand" strokeWidth={1.6} />,
    body: "Workshops, keynotes, and leadership conversations focused on creativity, nonprofit strategy, fundraising, and building organizations people believe in.",
    note: "Available for 2026",
  },
];

export function CurrentlyBuilding() {
  return (
    <section className="relative overflow-hidden border-t border-border/60">
      {/* Desktop: full-bleed portrait on the right */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] md:block">
        <Image
          src="/build-currently.jpg"
          alt="Katie Spencer"
          fill
          sizes="42vw"
          className="object-cover object-[center_20%]"
        />
      </div>

      <Container className="relative">
        <div className="py-20 md:max-w-[52%] md:py-28 lg:py-32">
          <Reveal>
            <p className="text-eyebrow">Currently building</p>
            <BrushUnderline aria-hidden className="mt-3 h-2.5 w-16 text-brand/60" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display mt-7 font-medium leading-[0.95]">
              What I&rsquo;m building next<span className="text-brand">.</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col">
            {items.map((it, i) => (
              <Reveal key={it.name} delay={0.08 + i * 0.05}>
                <div
                  className={cn(
                    "flex gap-5 py-7",
                    i > 0 && "border-t border-border/60",
                  )}
                >
                  <span className="mt-1 shrink-0">{it.icon}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium tracking-tight">
                      {it.name}
                    </h3>
                    <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                      {it.body}
                    </p>
                    {it.note && (
                      <p className="text-eyebrow mt-3 text-brand">{it.note}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.28}>
            <Link
              href="/contact"
              className="text-eyebrow group mt-12 inline-flex items-center gap-3 text-brand"
            >
              Let&rsquo;s build something meaningful
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </Container>

      {/* Mobile: portrait below the text */}
      <div className="relative aspect-[4/5] w-full md:hidden">
        <Image
          src="/build-currently.jpg"
          alt="Katie Spencer"
          fill
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
      </div>
    </section>
  );
}
