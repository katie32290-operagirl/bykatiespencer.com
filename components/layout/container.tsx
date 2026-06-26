import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Horizontal content frame. `size` controls max width; "prose" caps line length
 * for readable body text (~68ch).
 */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "prose";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        size === "prose" && "max-w-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
