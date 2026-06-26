import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Vertical rhythm wrapper. The generous spacing scale is what reads as
 * "premium" — whitespace doing the work.
 */
export function Section({
  children,
  className,
  id,
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: "default" | "lg" | "sm";
}) {
  return (
    <section
      id={id}
      className={cn(
        spacing === "default" && "py-24 md:py-32",
        spacing === "lg" && "py-28 md:py-40",
        spacing === "sm" && "py-16 md:py-20",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Consistent section header: eyebrow + serif heading + optional lead.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <span className="text-eyebrow">{eyebrow}</span>}
      <h2 className="text-display-sm font-medium">{title}</h2>
      {lead && (
        <p
          className={cn(
            "text-lg text-muted-foreground",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
