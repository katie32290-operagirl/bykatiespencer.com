import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { approach, approachStatement } from "@/content/approach";

export function Approach() {
  return (
    <Section spacing="lg">
      <Container>
        {/* Philosophy statement + photograph */}
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-eyebrow">{approachStatement.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-display-sm mt-8 font-serif font-light leading-[1.1] tracking-tight">
                I don&rsquo;t think in tactics. I think in{" "}
                <span className="text-brand">narratives.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground">
                {approachStatement.support}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/katie-coat.jpg"
                  alt="Katie Spencer"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Themes — alternating, type-led, no cards */}
        <div className="mt-20 md:mt-28">
          {approach.map((t, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={t.index}>
                <article className="grid items-baseline gap-x-8 gap-y-5 border-t border-border/60 py-12 md:grid-cols-12 md:py-20">
                  <div
                    className={cn(
                      "md:col-span-7",
                      flip && "md:order-2 md:col-start-6 md:text-right",
                    )}
                  >
                    <span className="font-mono text-sm text-brand">
                      {t.index}
                    </span>
                    <h3 className="mt-4 font-serif text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                      {t.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "text-lg leading-relaxed text-muted-foreground md:col-span-4 md:self-end",
                      flip ? "md:order-1 md:col-start-1" : "md:col-start-9",
                    )}
                  >
                    {t.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
