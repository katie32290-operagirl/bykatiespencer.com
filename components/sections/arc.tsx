import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The career-arc motif, taken verbatim from Katie's own bio:
 * opera singer → arts admin → mother → tech founder.
 * Reused on Home and About — her life as a narrative arc.
 */
export function Arc({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:text-sm",
        className,
      )}
    >
      {site.arc.map((stage, i) => (
        <li key={stage} className="flex items-center gap-3">
          <span className={i === site.arc.length - 1 ? "text-brand" : undefined}>
            {stage}
          </span>
          {i < site.arc.length - 1 && (
            <ArrowRight className="size-3.5 text-border" aria-hidden />
          )}
        </li>
      ))}
    </ul>
  );
}
