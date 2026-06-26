"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Lightweight YouTube/Vimeo facade: shows a poster thumbnail (YouTube) or a
 * branded panel (Vimeo) and only loads the heavy iframe once the user clicks
 * play. Keeps Lighthouse/LCP clean. Supports vertical (IG/Reels) orientation.
 *
 * Thumbnail is state-driven so the fallback survives re-renders (some videos
 * have no maxresdefault.jpg — fall back to sddefault, which always exists).
 */
export function VideoEmbed({
  youtube,
  vimeo,
  title,
  portrait = false,
}: {
  youtube?: string;
  vimeo?: string;
  title: string;
  portrait?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    youtube ? `https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg` : "",
  );

  const src = youtube
    ? `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${vimeo}?autoplay=1`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card",
        portrait ? "aspect-[9/16]" : "aspect-video",
      )}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {thumb ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb}
                alt=""
                className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                loading="lazy"
                onLoad={(e) => {
                  // YouTube serves a 120x90 placeholder when maxresdefault
                  // doesn't exist (200, not 404) — detect and fall back.
                  if (
                    youtube &&
                    thumb.includes("maxresdefault") &&
                    e.currentTarget.naturalWidth <= 120
                  ) {
                    setThumb(`https://i.ytimg.com/vi/${youtube}/sddefault.jpg`);
                  }
                }}
                onError={() => {
                  if (youtube && thumb.includes("maxresdefault")) {
                    setThumb(
                      `https://i.ytimg.com/vi/${youtube}/sddefault.jpg`,
                    );
                  }
                }}
              />
              <span className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" />
            </>
          ) : (
            <span className="absolute inset-0 flex items-end bg-secondary p-6 text-left">
              <span className="font-serif text-lg text-foreground">{title}</span>
            </span>
          )}
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
