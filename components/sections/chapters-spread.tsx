import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { chapters } from "@/content/chapters";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
/** Numerals cycle through the warm accents, plum anchoring the middle. */
const NUM_COLOR = ["text-pink", "text-camel", "text-brand"];

/** Chapters as a quiet index — a sidebar intro, then a ruled list of moments. */
export function ChaptersSpread() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-[300px_1fr] md:gap-14">
          <Reveal>
            <div className="md:sticky md:top-24 md:self-start">
              <h2 className="font-serif text-[clamp(2.25rem,5vw,2.75rem)] leading-[1.05] tracking-tight text-foreground">
                Chapters<span className="text-brand">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The moments, organizations, and ideas that shaped how I think
                about creativity, leadership, and building things that matter.
              </p>
              <Link
                href="/about"
                className="link-underline mt-5 inline-block font-serif text-lg italic text-brand"
              >
                See the full story &rarr;
              </Link>
            </div>
          </Reveal>

          <div>
            {chapters.map((c, i) => (
              <Reveal key={c.num} delay={i * 0.04}>
                <div
                  className={cn(
                    "grid grid-cols-[40px_1fr] items-baseline gap-5 border-t border-border py-6 sm:grid-cols-[56px_1fr]",
                    i === chapters.length - 1 && "border-b",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-2xl italic sm:text-[26px]",
                      NUM_COLOR[i % NUM_COLOR.length],
                    )}
                  >
                    {ROMAN[i]}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground sm:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                      {c.blurb}
                      {c.label && (
                        <span className="ml-2 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground/70">
                          {c.label}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
