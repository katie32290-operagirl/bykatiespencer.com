import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Connect",
  description:
    "If you're building something people need to believe in, I'd love to hear about it.",
  path: "/contact",
});

const elsewhere = site.socials.filter((s) =>
  ["instagram", "linkedin"].includes(s.icon),
);

export default function ConnectPage() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="pt-16 pb-12 text-center md:pt-24">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand">
              Connect
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-serif text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.04] tracking-tight text-foreground">
              Let&rsquo;s start a conversation<span className="text-brand">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              If you&rsquo;re building something people need to believe in,
              I&rsquo;d love to hear about it.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ───────────── Form + info card ───────────── */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Form */}
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
                <ContactForm />
              </div>
            </Reveal>

            {/* Info card */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl bg-olive p-8 text-cream md:p-12">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-mist">
                    Prefer email?
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-4 block font-serif text-3xl leading-tight text-cream transition-opacity hover:opacity-80"
                  >
                    hello@
                    <wbr />
                    bykatiespencer.com
                  </a>
                  <div className="mt-6 flex items-center gap-3" aria-hidden>
                    <span className="h-px w-14 bg-cream/40" />
                    <span className="size-1.5 rounded-full bg-pink" />
                  </div>
                </div>

                <div className="mt-10">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-mist">
                    Based in
                  </p>
                  <p className="mt-4 font-serif text-2xl text-cream">
                    Knoxville, Tennessee
                  </p>
                  <p className="mt-1 font-serif italic text-cream/75">
                    Working with mission-driven teams everywhere.
                  </p>
                </div>

                <div className="mt-auto pt-14">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-mist">
                    Elsewhere
                  </p>
                  <div className="mt-3 flex gap-6 font-sans text-sm text-cream">
                    {elsewhere.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-70"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
