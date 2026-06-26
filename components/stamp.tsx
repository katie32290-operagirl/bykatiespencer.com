import { cn } from "@/lib/utils";

/**
 * A small editorial "rubber stamp" — a rotated, outlined phrase placed by hand,
 * as if annotated by an art director.
 */
export function Stamp({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block rounded-full border border-brand/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
