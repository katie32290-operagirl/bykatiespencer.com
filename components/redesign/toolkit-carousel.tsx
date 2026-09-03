"use client";

import { useState } from "react";
import { C } from "./tokens";

type Slide = { src: string; alt: string };

/** A restrained product carousel: a gentle cross-fade between mockups, small
 *  arrows, and dot indicators. No autoplay, no slide bounce. */
export function ToolkitCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);

  const arrow: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: C.ox,
    color: C.cream,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    lineHeight: 1,
  };

  return (
    <div>
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        {slides.map((s, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            aria-hidden={idx !== i}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: idx === i ? 1 : 0 }}
          />
        ))}
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" style={{ ...arrow, left: 10 }} className="transition-opacity hover:opacity-85">
              &#8592;
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" style={{ ...arrow, right: 10 }} className="transition-opacity hover:opacity-85">
              &#8594;
            </button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2.5">
          {slides.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show image ${idx + 1}`}
              aria-current={idx === i}
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: idx === i ? C.ox : "transparent",
                border: `1.5px solid ${C.ox}`,
              }}
              className="transition-colors"
            />
          ))}
        </div>
      )}
    </div>
  );
}
