import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/** A little about me — text leads, the portrait supports. */
export function AboutIntro() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1fr_360px] md:gap-16">
          <Reveal>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-brand">
                A little about me
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.5rem)] leading-[1.18] tracking-tight text-foreground">
                The medium keeps changing.{" "}
                <span className="italic">The work doesn&rsquo;t</span> &mdash;
                building something people believe in.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                I&rsquo;ve performed on opera stages, co-founded a company, led
                an institution, and now I&rsquo;m building software. Different
                rooms, one throughline: the story that makes people care.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border md:aspect-auto md:h-[420px]">
              <Image
                src="/home-portrait.jpg"
                alt="Katie Spencer"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-[center_20%]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
