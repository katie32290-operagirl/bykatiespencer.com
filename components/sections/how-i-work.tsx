import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const bring = [
  "Narrative strategy",
  "Brand positioning",
  "Fundraising experiences",
  "Creative direction",
  "Cross-functional leadership",
];

const specialists = [
  "Brand & graphic design",
  "Photography",
  "Film & video",
  "Web design & development",
  "Event production",
];

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <p className="text-eyebrow mb-5">{heading}</p>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="border-t border-border/60 py-3 text-[15px] text-foreground/90"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HowIWork() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <Reveal>
              <p className="text-eyebrow">How I work</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-display-sm mt-7 font-medium">
                I see the whole story&mdash;then build everything around it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-5 text-lg text-muted-foreground">
                <p>
                  Organizations don&rsquo;t need more disconnected marketing.
                  They need a clear narrative that guides every decision.
                </p>
                <p>
                  I help uncover what makes your organization worth believing in,
                  then shape that into a cohesive story across your brand,
                  campaigns, fundraising, events, and audience experience. When
                  specialists are needed, I assemble the right team and provide
                  the creative direction that keeps every piece working toward
                  the same purpose.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <div className="md:col-span-6 md:pl-8">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/work/katie-team.jpg"
                  alt="Katie Spencer reviewing creative with a collaborator"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Capability lists */}
        <Reveal>
          <div className="mt-16 grid gap-10 border-t border-border/60 pt-12 sm:grid-cols-2 md:mt-20">
            <List heading="What I bring" items={bring} />
            <List heading="Specialists I lead" items={specialists} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
