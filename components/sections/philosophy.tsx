import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function Philosophy() {
  return (
    <Section spacing="lg">
      <Container className="max-w-4xl">
        <Reveal>
          <p className="text-eyebrow mb-8">A small philosophy</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-display-sm font-serif font-light leading-[1.15] tracking-tight">
            I don&rsquo;t believe creativity is decoration.{" "}
            <span className="text-brand">I believe it&rsquo;s strategy.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex max-w-2xl flex-col gap-5 text-lg text-muted-foreground">
            <p>
              The way we welcome people, tell stories, design experiences, and
              invite generosity shapes how people remember us long after the
              event ends.
            </p>
            <p>
              When creativity is rooted in purpose, it becomes one of the most
              powerful tools an organization has.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
