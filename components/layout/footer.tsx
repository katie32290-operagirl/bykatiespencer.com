import { site } from "@/content/site";
import { Container } from "./container";

/** Connect — the close, doubling as the footer. Near-black ground. */
export function Footer() {
  return (
    <footer
      id="connect"
      className="mt-auto bg-ink text-on-black"
    >
      <Container size="wide" className="max-w-[1180px] px-6 pb-12 pt-20 sm:px-14 md:pt-28">
        <h2 className="max-w-[800px] font-serif text-[clamp(44px,6vw,80px)] leading-[1.02]">
          Come find me after the show<span className="text-brand">.</span>
        </h2>
        <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-on-black-soft">
          Have a story worth telling, a room worth gathering, or something
          interesting you&rsquo;re building? I&rsquo;d like to hear about it.
        </p>

        <div className="mt-11 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-t-2 border-dashed border-line-dark pt-7">
          <a
            href={`mailto:${site.email}`}
            className="font-serif text-[clamp(22px,2.6vw,32px)] text-on-black transition-opacity hover:opacity-80"
          >
            {site.email}
          </a>
          <div className="flex flex-wrap gap-8 font-accent text-xs uppercase tracking-[0.12em]">
            <a
              href="https://greenroomcrm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-black-soft transition-colors hover:text-on-black"
            >
              GreenRoom
            </a>
            <a
              href="https://www.instagram.com/bykatiespencer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-black-soft transition-colors hover:text-on-black"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/katie-spencer-83565066/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-black-soft transition-colors hover:text-on-black"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 font-accent text-[11px] uppercase tracking-[0.12em] text-on-black-mute">
          <span className="font-serif text-[17px] normal-case tracking-normal text-on-black">
            Katie Spencer<span className="text-brand">.</span>
          </span>
          <span>&copy; 2026 Katie Spencer</span>
          <span>A life in stories. On stage and off.</span>
        </div>
      </Container>
    </footer>
  );
}
