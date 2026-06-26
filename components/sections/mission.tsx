import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function Mission() {
  return (
    <Section spacing="lg" className="border-y border-border/60 bg-card">
      <Container className="max-w-4xl">
        <Reveal>
          <p className="text-eyebrow mb-8">What I believe</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-display-sm font-serif font-light leading-[1.15] tracking-tight">
            Every organization has a{" "}
            <span className="text-brand">story worth telling.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex max-w-2xl flex-col gap-5 text-lg text-muted-foreground">
            <p>
              When people understand who they are, why they exist, and who
              they&rsquo;re inviting into the journey, fundraising becomes more
              meaningful, marketing becomes more authentic, and community grows
              naturally.
            </p>
            <p>
              My work sits at the intersection of strategy, creativity, and human
              connection.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
