import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { CinematicQuote } from "@/components/cinematic-quote";
import { Stamp } from "@/components/stamp";
import { ideas } from "@/content/ideas";

export function IdeasExploring() {
  return (
    <Section className="border-t border-border/60">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Titles */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="text-display-sm font-medium">
                Ideas I&rsquo;m exploring.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-script mt-1 text-2xl text-brand">
                Read my thoughts
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-col">
                {ideas.map((idea) => (
                  <li
                    key={idea}
                    className="flex items-start justify-between gap-4 border-t border-border/60 py-5"
                  >
                    <span className="font-serif text-lg leading-snug">
                      {idea}
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <Stamp className="mt-8 -rotate-2">
                Curiosity is a leadership skill
              </Stamp>
            </Reveal>
          </div>

          {/* Pull quote */}
          <div className="lg:col-span-4">
            <CinematicQuote />
          </div>

          {/* Photograph */}
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border lg:h-full">
                <Image
                  src="/katie-editorial.jpg"
                  alt="Katie Spencer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
