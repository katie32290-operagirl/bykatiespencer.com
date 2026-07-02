import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export function ConnectBand() {
  return (
    <section className="bg-brand text-brand-foreground">
      <Container className="py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
            <p className="font-script text-4xl leading-[1.05] sm:text-5xl md:col-span-4">
              Let&rsquo;s build something meaningful.
            </p>
            <p className="text-lg leading-relaxed text-brand-foreground/85 md:col-span-5">
              If you&rsquo;re building something people need to believe in, I&rsquo;d
              love to hear about it.
            </p>
            <div className="md:col-span-3 md:justify-self-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/40 px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] transition-colors hover:bg-brand-foreground hover:text-brand"
              >
                Start a conversation
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
