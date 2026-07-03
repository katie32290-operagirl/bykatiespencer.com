import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";

/** Closing invitation — warm, direct, one email. */
export function HomeConnect() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <Reveal>
            <div>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-tight text-foreground">
                Let&rsquo;s build something people believe in
                <span className="text-brand">.</span>
              </h2>
              <p className="mt-3 max-w-xl text-lg italic text-muted-foreground">
                If you&rsquo;re building something people need to believe in,
                I&rsquo;d love to hear about it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex whitespace-nowrap rounded-full bg-foreground px-8 py-4 font-sans text-sm text-background transition-transform hover:scale-[1.03]"
            >
              {site.email}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
