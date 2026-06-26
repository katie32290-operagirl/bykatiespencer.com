"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { BrushUnderline } from "@/components/brush-underline";
import { MonogramSeal } from "@/components/monogram-seal";
import { HeroPhoto } from "@/components/hero-photo";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed photograph (desktop) */}
      <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
        <HeroPhoto src="/katie-energy.jpg" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent" />
        <MonogramSeal className="pointer-events-none absolute bottom-10 right-10 size-24 text-brand" />
      </div>

      <Container className="relative">
        <div className="py-16 md:max-w-[58%] md:py-28 lg:py-32">
          <motion.h1 {...rise(0)} className="text-display font-medium">
            Great organizations are built on{" "}
            <span className="font-serif italic text-brand">
              stories people believe in.
            </span>
          </motion.h1>

          <motion.div {...rise(0.1)} aria-hidden>
            <BrushUnderline className="mt-6 h-3 w-44 text-brand/70" />
          </motion.div>

          <motion.p
            {...rise(0.18)}
            className="text-eyebrow mt-9"
          >
            <span className="text-brand">Founder.</span> Creative strategist.
            Speaker. Entrepreneur.
          </motion.p>

          <motion.p
            {...rise(0.24)}
            className="mt-5 max-w-md text-lg text-muted-foreground"
          >
            I build organizations, ventures, and experiences that help people
            connect through story.
          </motion.p>

          <motion.div
            {...rise(0.32)}
            className="mt-14 flex items-center gap-3 text-muted-foreground"
          >
            <ArrowDown className="size-5 animate-bounce text-brand" />
            <span className="font-script text-2xl">Scroll to explore</span>
          </motion.div>
        </div>
      </Container>

      {/* Photograph (mobile) */}
      <div className="relative aspect-[4/3] w-full md:hidden">
        <HeroPhoto src="/katie-energy.jpg" />
      </div>
    </section>
  );
}
