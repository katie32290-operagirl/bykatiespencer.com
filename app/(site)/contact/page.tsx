import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { BrushUnderline } from "@/components/brush-underline";
import { ContactForm } from "@/components/contact-form";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Connect",
  description:
    "Whether you're launching a season, reimagining your organization, or simply trying to tell a better story, I'd love to hear what you're building.",
  path: "/contact",
});

const ways = [
  {
    step: "01",
    title: "Projects",
    body: "For launches, campaigns, fundraising experiences, and creative direction.",
    bestWhen: "You know what needs to be built.",
  },
  {
    step: "02",
    title: "Advising",
    body: "A strategic thought partner for leadership conversations, positioning, messaging, and big decisions.",
    bestWhen: "You need clarity before execution.",
  },
  {
    step: "03",
    title: "Speaking",
    body: "Workshops, retreats, conference sessions, and keynote presentations on storytelling, creativity, fundraising, and leadership.",
    bestWhen: "You want to inspire or equip a team.",
  },
];

export default function ConnectPage() {
  return (
    <>
      {/* Hero: intro · portrait · form */}
      <Section spacing="sm" id="connect-form" className="pt-16 md:pt-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-eyebrow">Connect</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-display-sm mt-6 font-medium">
                  Let&rsquo;s build something people{" "}
                  <span className="font-serif italic text-brand">remember.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1} aria-hidden>
                <BrushUnderline className="mt-5 h-3 w-32 text-brand/70" />
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 text-lg text-muted-foreground">
                  Whether you&rsquo;re launching a season, reimagining your
                  organization, or simply trying to tell a better story, I&rsquo;d
                  love to hear what you&rsquo;re building.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/katie-brick.jpg"
                  alt="Katie Spencer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-[center_15%]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
                <ContactForm />
                <p className="mt-5 text-sm italic text-muted-foreground">
                  I usually reply within 1&ndash;2 business days.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Ways to connect */}
      <Section className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {ways.map((w) => (
              <Reveal key={w.step}>
                <div>
                  <span className="font-mono text-sm text-brand">{w.step}</span>
                  <BrushUnderline
                    aria-hidden
                    className="mt-3 h-2.5 w-12 text-brand/60"
                  />
                  <h2 className="mt-5 font-serif text-3xl font-medium tracking-tight">
                    {w.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground">{w.body}</p>
                  <div className="mt-8 border-t border-border/60 pt-5">
                    <p className="text-sm italic text-brand">Best when:</p>
                    <p className="mt-1 text-muted-foreground">{w.bestWhen}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing */}
      <Section spacing="lg">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-display-sm font-medium">
              The best work rarely starts with a proposal.{" "}
              <span className="font-serif italic text-brand">
                It starts with a conversation.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="#connect-form"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              Let&rsquo;s talk
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
