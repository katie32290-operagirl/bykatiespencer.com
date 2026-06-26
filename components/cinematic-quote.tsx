"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrushUnderline } from "@/components/brush-underline";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * A pull quote that enters cinematically: the quotation mark first, then each
 * line, then the highlighted word — with deliberate pauses that pace the read.
 */
export function CinematicQuote() {
  const reduce = useReducedMotion();

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <motion.figure
      className="flex h-full flex-col justify-center rounded-2xl bg-secondary p-8 sm:p-10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.5, delayChildren: 0.1 } },
      }}
    >
      <motion.span
        variants={item}
        aria-hidden
        className="font-serif text-6xl leading-none text-brand"
      >
        &ldquo;
      </motion.span>
      <blockquote className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
        <motion.span variants={item} className="block">
          Stories aren&rsquo;t decoration.
        </motion.span>
        <motion.span variants={item} className="block">
          They&rsquo;re <span className="italic text-brand">infrastructure.</span>
        </motion.span>
      </blockquote>
      <motion.div variants={item}>
        <BrushUnderline className="mt-4 h-3 w-40 text-brand/70" />
      </motion.div>
    </motion.figure>
  );
}
