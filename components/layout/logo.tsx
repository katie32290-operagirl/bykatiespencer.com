import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark — "Katie Spencer" set in Radley, the display serif. No decorative
 * mark; the name carries it. The recurring signature elsewhere is the ✳ beat.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Katie Spencer, home"
      className={cn(
        "inline-flex items-center font-serif text-2xl tracking-tight text-foreground transition-opacity hover:opacity-70",
        className,
      )}
    >
      Katie Spencer
    </Link>
  );
}
