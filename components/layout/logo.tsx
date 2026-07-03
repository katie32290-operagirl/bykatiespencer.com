import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark — "Katie Spencer." set in Instrument Serif with the plum full stop,
 * the brand's primary signature. Themes with the palette (teal on cream,
 * cream on teal; the dot follows the accent).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Katie Spencer, home"
      className={cn(
        "inline-flex items-center font-serif text-2xl tracking-tight text-foreground transition-opacity hover:opacity-80",
        className,
      )}
    >
      Katie Spencer<span className="text-brand">.</span>
    </Link>
  );
}
