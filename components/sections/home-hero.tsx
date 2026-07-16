import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/** Centered hero — the name, the promise, room to breathe. */
export function HomeHero() {
  return (
    <section className="pt-20 pb-20 text-center md:pt-28 md:pb-28">
      <Container className="max-w-4xl">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.26em] text-brand sm:text-[13px]">
            Storyteller <span className="text-foreground/60">&bull;</span> Builder{" "}
            <span className="text-foreground/60">&bull;</span> Founder
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-8 max-w-4xl font-serif text-[clamp(2.75rem,8vw,5.75rem)] leading-[1.04] tracking-tight text-foreground">
            Stories build what strategy alone can&rsquo;t
            <span className="text-brand">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="my-9 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-14 bg-foreground/60 sm:w-16" />
            <span className="size-2.5 rounded-full bg-brand" />
            <span className="h-px w-14 bg-foreground/60 sm:w-16" />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Whether through companies, conversations, stages, or words, I&rsquo;m
            drawn to the moment an idea becomes something people can see, feel,
            and join.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-foreground px-8 py-3.5 font-sans text-sm text-background transition-transform hover:scale-[1.03]"
            >
              Start a conversation
            </Link>
            <Link
              href="/portfolio"
              className="link-underline font-serif text-lg italic text-foreground"
            >
              explore the work &rarr;
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
