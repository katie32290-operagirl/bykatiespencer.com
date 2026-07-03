import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./container";

const elsewhere = site.socials.filter((s) =>
  ["instagram", "linkedin"].includes(s.icon),
);

export function Footer() {
  return (
    <footer className="mt-auto bg-olive text-cream">
      <Container className="grid grid-cols-1 items-center gap-6 py-9 text-center sm:grid-cols-3 sm:text-left">
        <p className="font-sans text-xs text-cream/60">
          &copy; 2026 {site.name}
        </p>

        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-cream transition-opacity hover:opacity-80 sm:text-center"
        >
          {site.name}
          <span className="text-pink">.</span>
        </Link>

        <nav
          aria-label="Footer"
          className="flex justify-center gap-6 font-sans text-xs text-cream/60 sm:justify-end"
        >
          {elsewhere.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
