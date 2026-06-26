import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Portrait frame. Drops in a real image when `src` is provided; otherwise
 * renders an intentional, on-brand placeholder (not a broken image) so the
 * layout reads as finished until Katie's photos are added to /public.
 */
export function Portrait({
  src,
  alt = "Katie Spencer",
  className,
  priority = false,
  position = "object-center",
}: {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  /** Tailwind object-position utility, e.g. "object-top" */
  position?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-secondary",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 40vw"
          className={`object-cover ${position}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-secondary via-background to-brand-muted/30">
          <span className="font-serif text-7xl font-light text-foreground/30">
            KS
          </span>
          <span className="text-eyebrow text-muted-foreground/70">
            Portrait
          </span>
        </div>
      )}
    </div>
  );
}
