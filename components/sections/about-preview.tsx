import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutPreview() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
              <Image
                src="/katie-about.jpg"
                alt="Katie Spencer"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[center_30%]"
              />
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <p className="text-eyebrow">Hi, I&rsquo;m Katie</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 font-serif text-2xl font-light leading-snug tracking-tight sm:text-3xl">
                I&rsquo;ve spent my career at the intersection of creativity and
                strategy, and I&rsquo;ve learned the organizations that thrive
                are the ones with the clearest sense of{" "}
                <span className="text-brand">who they are.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                That&rsquo;s the work I love most: helping people say what they
                mean, and create something others want to belong to.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/about"
                className="link-underline group mt-8 inline-flex items-center gap-2 font-medium text-foreground"
              >
                More about me
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
