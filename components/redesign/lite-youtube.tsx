"use client";

import { useState } from "react";
import { C, SANS } from "./tokens";

/** A lightweight YouTube embed: shows the poster thumbnail with a play button
 *  and only loads the (privacy-friendly, no-cookie) iframe once pressed, so the
 *  page stays fast on phones and loads no YouTube tracking until someone plays. */
export function LiteYouTube({ id, name, vertical = false }: { id: string; name: string; vertical?: boolean }) {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: "relative", aspectRatio: vertical ? "9 / 16" : "16 / 9", overflow: "hidden", background: C.ox, border: `1.5px solid ${C.ox}` }}>
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`${name}, a student of Katie Spencer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            aria-label={`Play ${name}'s performance`}
            className="group"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: "none", background: "transparent", cursor: "pointer", display: "block" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt={`${name}, a student of Katie Spencer`} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <span aria-hidden style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 62, height: 62, borderRadius: "50%", background: C.terra, display: "flex", alignItems: "center", justifyContent: "center" }} className="transition-transform group-hover:scale-110">
              <span style={{ width: 0, height: 0, borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: `18px solid ${C.cream}`, marginLeft: 4 }} />
            </span>
          </button>
        )}
      </div>
      <figcaption style={{ fontFamily: SANS, fontWeight: 700, fontSize: 16, letterSpacing: "-.01em", color: C.ox, marginTop: 12 }}>{name}</figcaption>
    </figure>
  );
}
