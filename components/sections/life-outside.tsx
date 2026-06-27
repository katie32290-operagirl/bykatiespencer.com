"use client";

import { useEffect, useState, type SVGProps } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const IG_URL = "https://www.instagram.com/bykatiespencer";

/**
 * Live Instagram feed.
 * Set NEXT_PUBLIC_INSTAGRAM_FEED_URL to a public JSON feed (e.g. a Behold.so
 * feed URL, or an Instagram Graph API endpoint) and the grid fills with the six
 * most recent posts automatically. Until then it shows the curated images below.
 */
const FEED_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL ||
  "https://feeds.behold.so/54hZaxIgodAAVQZQxiI9";

const CURATED = [
  "/work/drive-coffee.jpg",
  "/katie-energy.jpg",
  "/work/drive-choir.jpg",
  "/about-4.jpg",
  "/katie-portrait.jpg",
  "/katie-editorial.jpg",
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

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function LifeOutside() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!FEED_URL) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch(FEED_URL);
        const data: unknown = await res.json();
        const container = data as {
          posts?: unknown;
          data?: unknown;
          media?: unknown;
        };
        const arr = Array.isArray(data)
          ? data
          : container.posts ?? container.data ?? container.media ?? [];
        const raw = (Array.isArray(arr) ? arr : []) as FeedItem[];
        const mapped = raw
          .map((p) => ({ src: pickUrl(p), href: p.permalink || p.link || IG_URL }))
          .filter((p) => p.src)
          .slice(0, 6);
        if (active && mapped.length) setPosts(mapped);
      } catch {
        /* keep curated fallback */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const tiles: Post[] = posts ?? CURATED.map((src) => ({ src, href: IG_URL }));

  return (
    <section className="bg-[#3c0227] text-[#f0efed]">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-eyebrow text-[#f0efed]/50">
              Life outside the build
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.0] tracking-tight">
              A few moments
              <br />
              that matter.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs leading-relaxed text-[#f0efed]/70 md:text-right">
              The work matters.
              <br />
              So does everything that shapes it.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {tiles.map((t, i) => (
            <StaggerItem key={t.src + i}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-md"
              >
                {t.src.startsWith("/") ? (
                  <Image
                    src={t.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.src}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                )}
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-eyebrow group mt-12 inline-flex items-center gap-3 text-[#f0efed] transition-colors hover:text-brand"
          >
            <InstagramIcon className="size-5" />
            Follow on Instagram
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
