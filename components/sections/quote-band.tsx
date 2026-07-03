import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/** The through-line, full-width in plum. */
export function QuoteBand() {
  return (
    <section className="bg-brand text-brand-foreground">
      <Container className="py-20 text-center md:py-28">
        <Reveal>
          <p className="mx-auto max-w-3xl font-serif text-[clamp(2rem,5vw,3rem)] leading-[1.18]">
            The medium changes.{" "}
            <span className="italic">The mission doesn&rsquo;t.</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
