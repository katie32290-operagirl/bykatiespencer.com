"use client";

import { useEffect, useState } from "react";
import { C, SANS, SERIF, PAD } from "./chrome";

/**
 * "Life outside the build" — the integrated Instagram feed, ported into the
 * warm redesign. Set NEXT_PUBLIC_INSTAGRAM_FEED_URL to a public JSON feed
 * (a Behold.so feed URL, or an Instagram Graph endpoint) and the grid fills
 * with the six most recent posts. Until then it shows the curated images.
 */
const IG_URL = "https://www.instagram.com/bykatiespencer";
const FEED_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL ||
  "https://feeds.behold.so/54hZaxIgodAAVQZQxiI9";

const CURATED = [
  "/work/drive-coffee.jpg",
  "/work/katie-collab.jpg",
  "/work/drive-choir.jpg",
  "/work/katie-team.jpg",
  "/work/drive-community.jpg",
  "/work/mediaday-chair.jpg",
];

type FeedItem = {
  permalink?: string;
  link?: string;
  mediaUrl?: string;
  media_url?: string;
  thumbnailUrl?: string;
  thumbnail_url?: string;
  sizes?: {
    small?: { mediaUrl?: string };
    medium?: { mediaUrl?: string };
    large?: { mediaUrl?: string };
  };
  images?: { url?: string }[];
};

type Post = { src: string; href: string };

function pickUrl(p: FeedItem): string {
  return (
    p.sizes?.medium?.mediaUrl ||
    p.sizes?.small?.mediaUrl ||
    p.sizes?.large?.mediaUrl ||
    p.thumbnailUrl ||
    p.mediaUrl ||
    p.media_url ||
    p.thumbnail_url ||
    (Array.isArray(p.images) && p.images[0]?.url) ||
    ""
  );
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!FEED_URL) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch(FEED_URL);
        const data: unknown = await res.json();
        const container = data as { posts?: unknown; data?: unknown; media?: unknown };
        const arr = Array.isArray(data) ? data : container.posts ?? container.data ?? container.media ?? [];
        const raw = (Array.isArray(arr) ? arr : []) as FeedItem[];
        const mapped = raw
          .map((p) => ({ src: pickUrl(p), href: p.permalink || p.link || IG_URL }))
          .filter((p) => p.src)
          .slice(0, 6);
        if (active && mapped.length) setPosts(mapped);
      } catch {
        /* keep the curated fallback */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const tiles: Post[] = posts ?? CURATED.map((src) => ({ src, href: IG_URL }));

  return (
    <div className={`${PAD} py-[clamp(56px,8vw,90px)]`} style={{ background: C.ox }}>
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: C.peach }}>Life outside the build</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(34px,5vw,52px)", letterSpacing: "-.03em", color: C.cream, lineHeight: 0.95, marginTop: 12 }}>
              A few moments that matter.
            </div>
          </div>
          <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: C.peachSoft, maxWidth: 280 }} className="md:text-right">
            The work matters. So does everything that shapes it.
          </p>
        </div>

        <div className="mt-[clamp(28px,4vw,44px)] grid grid-cols-2 gap-[clamp(10px,1.4vw,18px)] sm:grid-cols-3">
          {tiles.map((t, i) => (
            <a
              key={t.src + i}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden"
              style={{ position: "relative", aspectRatio: "1 / 1", background: C.terra }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src}
                alt="Katie Spencer — a moment from life outside the work"
                loading="lazy"
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </a>
          ))}
        </div>

        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: SANS, fontSize: 13, letterSpacing: ".06em", color: C.peach, marginTop: "clamp(24px,3vw,36px)", display: "inline-block" }}
          className="transition-opacity hover:opacity-70"
        >
          Follow on Instagram &rarr;
        </a>
      </div>
    </div>
  );
}
