import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { site } from "@/content/site";
import { Container } from "./container";

// lucide removed brand glyphs (trademark) — inline the two we need.
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.76-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
    </svg>
  );
}

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
  globe: ArrowUpRight,
};

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-border/60">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="text-eyebrow mb-4">Let&rsquo;s build the story</p>
            <Link
              href="/contact"
              className="font-serif text-3xl font-medium tracking-tight transition-colors hover:text-brand sm:text-4xl"
            >
              {site.email}
            </Link>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline w-fit text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-6 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.location}.
          </p>
          <div className="flex items-center gap-2">
            {site.socials.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-[1.1rem]" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
