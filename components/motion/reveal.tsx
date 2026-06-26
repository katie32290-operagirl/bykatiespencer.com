"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** seconds to delay the reveal — used for manual staggering */
  delay?: number;
  /** pixels to travel up while fading in */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/**
 * The signature reveal: 16px up + fade, on scroll, once.
 * Uses the editorial out-expo easing. Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
