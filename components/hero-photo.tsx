"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The living hero photograph.
 *  - reveals from a soft mask on load (clip + scale + fade)
 *  - breathes with a slow continuous float (CSS)
 *  - drifts a few pixels with the cursor (parallax)
 *  - a faint highlight follows the cursor, like light catching glass
 * All cursor/float motion is disabled under prefers-reduced-motion.
 */
export function HeroPhoto({
  src,
  position = "object-[center_25%]",
}: {
  src: string;
  position?: string;
}) {
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.6 });

  const tx = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const ty = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const lx = useTransform(sx, [-0.5, 0.5], [38, 62]);
  const ly = useTransform(sy, [-0.5, 0.5], [38, 62]);
  const light = useTransform(
    [lx, ly],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12), rgba(255,255,255,0) 55%)`,
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
    >
      <motion.div
        className="absolute inset-0"
        initial={
          reduce
            ? false
            : { clipPath: "inset(0 0 16% 0)", opacity: 0, scale: 1.12 }
        }
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease, delay: 0.25 }}
      >
        <motion.div className="absolute inset-0" style={reduce ? undefined : { x: tx, y: ty }}>
          <div className="hero-float absolute inset-0">
            <Image
              src={src}
              alt="Katie Spencer"
              fill
              priority
              sizes="50vw"
              className={`scale-[1.06] object-cover ${position}`}
            />
          </div>
        </motion.div>
      </motion.div>

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ background: light }}
        />
      )}
    </div>
  );
}
