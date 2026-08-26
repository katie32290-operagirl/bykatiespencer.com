import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Connect",
  description:
    "Tell me what you're working on. A note reaches Katie Spencer directly.",
  path: "/contact",
});

const DOTS = "....................";

const elsewhere = site.socials.filter((s) =>
  ["instagram", "linkedin"].includes(s.icon),
);

/** Dotted-leader row: label ···· value. Paper ground. */
function Leader({
  label,
  value,
  valueClass,
  className,
}: {
  label: string;
  value: string;
  valueClass?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-2.5", className)}>
      <span>{label}</span>
      <span
        aria-hidden
        className="flex-1 overflow-hidden whitespace-nowrap tracking-[3px] text-ink-faint"
      >
        {DOTS}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

export default function ConnectPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  The stage door — title block on paper                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-8 pt-28 sm:px-14 md:pt-36">
        <Reveal className="mx-auto max-w-[1180px]">
          <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
            Connect
          </p>
          <h1 className="mt-4 font-serif text-[clamp(44px,6.6vw,84px)] leading-[1.02]">
            Let&rsquo;s start a conversation<span className="text-brand">.</span>
          </h1>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  The form + the particulars                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-24 sm:px-14 md:pb-28">
        <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-x-[70px] gap-y-14 border-t-2 border-foreground pt-10">
          {/* Form */}
          <div className="flex-[1_1_520px]">
            <ContactForm />
          </div>

          {/* Particulars */}
          <aside className="flex-[1_1_300px] md:border-l md:border-dashed md:border-ink-faint md:pl-12">
            <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
              Prefer email?
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block font-serif text-[clamp(22px,2.4vw,30px)] leading-tight text-foreground transition-opacity hover:opacity-70"
            >
              hello@
              <wbr />
              bykatiespencer.com
            </a>

            <div className="mt-9 grid gap-2.5 font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              <Leader
                label="Based in"
                value="Knoxville, TN"
                valueClass="text-foreground"
              />
              <Leader
                label="Reply within"
                value="A couple days"
                valueClass="text-foreground"
              />
            </div>
            <p className="mt-3 font-serif text-[17px] italic text-muted-foreground">
              Working with mission-driven teams everywhere.
            </p>

            <div className="mt-10">
              <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                Elsewhere
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-accent text-xs uppercase tracking-[0.12em]">
                <a
                  href="https://greenroomcrm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand transition-colors hover:text-red-deep"
                >
                  GreenRoom
                </a>
                {elsewhere.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand transition-colors hover:text-red-deep"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
