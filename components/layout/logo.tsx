import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark with a small hexagon mark — a quiet nod to the "mirror / hexagon"
 * motif in Katie's own bio and the GreenRoom mark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Katie Spencer, home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-serif text-lg font-medium tracking-tight",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[18px] text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        Katie&nbsp;Spencer
      </span>
    </Link>
  );
}
