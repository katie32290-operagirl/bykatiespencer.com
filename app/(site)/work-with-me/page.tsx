import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import {
  MessageCircle,
  Search,
  PenLine,
  Star,
  Target,
  Mic,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { BrushUnderline } from "@/components/brush-underline";
import { process, formats } from "@/content/collaborate";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Collaborate",
  description:
    "Whether you need a partner for a single project or ongoing strategic support, I'll meet you where you are and help you move your mission forward.",
  path: "/work-with-me",
});

const stepIcons: Record<string, LucideIcon> = {
  message: MessageCircle,
  search: Search,
  pen: PenLine,
  star: Star,
};
const formatIcons: Record<string, LucideIcon> = {
  target: Target,
  message: MessageCircle,
  mic: Mic,
};

export default function CollaboratePage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="sm" className="pt-16 md:pt-24">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Reveal>
                <p className="text-eyebrow">Collaborate</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-display mt-6 font-medium">
                  Great work happens{" "}
                  <span className="font-serif italic text-brand">together.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-md text-lg text-muted-foreground">
                  Whether you need a partner for a single project or ongoing
                  strategic support, I&rsquo;ll meet you where you are and help
                  you move your mission forward.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-script mt-8 text-2xl text-brand">
                  Thoughtful process. Trusted partners. Meaningful results.
                </p>
                <BrushUnderline
                  aria-hidden
                  className="mt-2 h-3 w-52 text-brand/70"
                />
              </Reveal>
            </div>
            <Reveal delay={0.1} className="md:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/work/katie-collab.jpg"
                  alt="Katie Spencer reviewing a script with her team on location"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-[58%_center]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* How we work together */}
      <Section className="border-t border-border/60">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we work together"
              title="Strategic at the core. Creative in execution."
              lead="A collaborative approach that blends insight, experience, and smart tools to create work that connects and performs."
              align="center"
              className="mx-auto mb-16"
            />
          </Reveal>

          <Stagger className="flex flex-col gap-10 md:flex-row md:items-start md:gap-4">
            {process.map((s, i) => {
              const Icon = stepIcons[s.icon] ?? MessageCircle;
              return (
                <Fragment key={s.step}>
                  <StaggerItem className="md:flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-brand">
                        {s.step}
                      </span>
                      <Icon className="size-6 text-brand" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-medium tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">{s.body}</p>
                  </StaggerItem>
                  {i < process.length - 1 && (
                    <ArrowRight
                      aria-hidden
                      className="hidden size-5 shrink-0 text-border md:mt-1.5 md:block"
                    />
                  )}
                </Fragment>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Ways to collaborate */}
      <Section className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="text-eyebrow">Ways to collaborate</p>
                <h2 className="text-display-sm mt-4 font-medium">
                  Different needs. Different formats.
                </h2>
              </Reveal>
              <Stagger className="mt-10 flex flex-col gap-4">
                {formats.map((f) => {
                  const Icon = formatIcons[f.icon] ?? Target;
                  return (
                    <StaggerItem key={f.title}>
                      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                          <Icon className="size-5" strokeWidth={1.6} />
                        </span>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-medium tracking-tight">
                            {f.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {f.body}
                          </p>
                          <p className="mt-2 text-sm">
                            <span className="italic text-brand">
                              Best when:{" "}
                            </span>
                            <span className="text-muted-foreground">
                              {f.bestWhen}
                            </span>
                          </p>
                        </div>
                        <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>

            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border lg:h-full">
                <Image
                  src="/work/collab-script.jpg"
                  alt="Katie reviewing a script with a collaborator on a media-day shoot"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Closing band */}
      <Section spacing="sm" className="pb-24">
        <Container>
          <Reveal>
            <div className="grid gap-8 rounded-2xl bg-olive p-8 text-[#f0efed] md:grid-cols-12 md:items-center md:gap-10 md:p-12">
              <div className="md:col-span-5">
                <p className="font-script text-2xl text-[#cf8079]">
                  At the heart of every collaboration
                </p>
                <p className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                  I believe partnership is a creative act.
                </p>
              </div>
              <p className="text-lg leading-relaxed text-[#f0efed]/75 md:col-span-7">
                I bring the strategy, creative leadership, and experience. You
                bring the mission, the knowledge, and the heart. Together we
                build something that lasts.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
