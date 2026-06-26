import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function EnergyBand() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7 md:order-2">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/katie-energy.jpg"
                  alt="Katie Spencer in a downtown alley, caught mid-laugh"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover object-[center_30%]"
                />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:order-1">
            <Reveal>
              <p className="text-display-sm font-serif font-light leading-[1.12] tracking-tight">
                Polished — with{" "}
                <span className="text-brand">room to play.</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                I take the work seriously; I just don&rsquo;t take myself too
                seriously. The most memorable ideas tend to show up when
                there&rsquo;s a little room to be bold.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
