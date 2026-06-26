import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { clients } from "@/content/clients";

export function PastCompanies() {
  return (
    <Section spacing="lg" className="border-t border-border/60">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-eyebrow">Trusted by</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 font-serif text-2xl font-light leading-snug text-muted-foreground">
                A few of the organizations I&rsquo;ve had the privilege to work
                with.
              </p>
            </Reveal>
          </div>

          {/* Credits-style list */}
          <Stagger className="flex flex-col md:col-span-8">
            {clients.map((name) => (
              <StaggerItem key={name}>
                <p className="border-t border-border/60 py-5 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                  {name}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
