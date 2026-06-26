import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function CTA({
  title = "Let's tell a story people want to be part of.",
  lead = "Whether you're refreshing your brand, launching a season, or creating a fundraising experience that inspires generosity, let's build a narrative that connects people to your mission.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <h2 className="text-display-sm font-medium">{title}</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            {lead}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/portfolio">See the work</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
