import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PenLine, Mic, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { BrushUnderline } from "@/components/brush-underline";
import { cn } from "@/lib/utils";

function Hex({ filled }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 text-[#F39ABF]"
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

type BuildItem = {
  name: string;
  icon: React.ReactNode;
  body: string;
  note: string | null;
  href?: string;
  external?: boolean;
};

const items: BuildItem[] = [
  {
    name: "GreenRoom",
    icon: <Hex filled />,
    href: "https://greenroomcrm.com",
    external: true,
    body: "Building better tools for arts organizations — bringing fundraising, marketing, ticketing, and operations into one platform.",
    note: "Launching 2026",
  },
  {
    name: "Writing",
    icon: <PenLine className="size-5 text-[#F39ABF]" strokeWidth={1.6} />,
    href: "/writing",
    body: "Essays on creativity, belief, leadership, faith, and becoming.",
    note: null,
  },
  {
    name: "Speaking",
    icon: <Mic className="size-5 text-[#F39ABF]" strokeWidth={1.6} />,
    body: "Keynotes and conversations that help audiences see familiar ideas differently.",
    note: "Available for 2026",
  },
  {
    name: "Stories in Development",
    icon: <Sparkles className="size-5 text-[#F39ABF]" strokeWidth={1.6} />,
    body: "New projects taking shape across podcasting, books, production, and live experiences.",
    note: null,
  },
];

export function CurrentlyBuilding() {
  return (
    <section className="relative overflow-hidden bg-olive text-[#FAF4EC]">
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
            <p className="text-eyebrow text-[#FAF4EC]/50">Across mediums</p>
            <BrushUnderline aria-hidden className="mt-3 h-2.5 w-16 text-[#F39ABF]/70" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display mt-7 font-medium leading-[0.95]">
              What I&rsquo;m building<span className="text-[#F39ABF]">.</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col">
            {items.map((it, i) => (
              <Reveal key={it.name} delay={0.08 + i * 0.05}>
                <div
                  className={cn(
                    "flex gap-5 py-7",
                    i > 0 && "border-t border-[#FAF4EC]/15",
                  )}
                >
                  <span className="mt-1 shrink-0">{it.icon}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium tracking-tight">
                      {it.href ? (
                        it.external ? (
                          <a
                            href={it.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#F39ABF]"
                          >
                            {it.name}
                            <ArrowUpRight className="size-4 opacity-70" />
                          </a>
                        ) : (
                          <Link
                            href={it.href}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#F39ABF]"
                          >
                            {it.name}
                            <ArrowRight className="size-4 opacity-70" />
                          </Link>
                        )
                      ) : (
                        it.name
                      )}
                    </h3>
                    <p className="mt-2 max-w-md leading-relaxed text-[#FAF4EC]/70">
                      {it.body}
                    </p>
                    {it.note && (
                      <p className="text-eyebrow mt-3 text-[#F39ABF]">{it.note}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.28}>
            <Link
              href="/contact"
              className="text-eyebrow group mt-12 inline-flex items-center gap-3 text-[#F39ABF] transition-colors hover:text-[#FAF4EC]"
            >
              Start a conversation
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
