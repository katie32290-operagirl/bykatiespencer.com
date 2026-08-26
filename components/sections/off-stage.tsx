"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const IG_URL = "https://www.instagram.com/bykatiespencer";

/** Live Instagram feed (Behold.so). Falls back to the curated shots below. */
const FEED_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL ||
  "https://feeds.behold.so/54hZaxIgodAAVQZQxiI9";

/** The three off-stage slots, in order — large, tall, portrait. */
const FALLBACK: Post[] = [
  { src: "/v3/cafe-shoot.jpg", href: IG_URL },
  { src: "/v3/couture-red.jpg", href: IG_URL },
  { src: "/v3/portrait-olive.jpg", href: IG_URL },
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
    p.sizes?.large?.mediaUrl ||
    p.sizes?.small?.mediaUrl ||
    p.thumbnailUrl ||
    p.mediaUrl ||
    p.media_url ||
    p.thumbnail_url ||
    (Array.isArray(p.images) && p.images[0]?.url) ||
    ""
  );
}

/** Media that swaps between a local asset (next/image) and a remote IG URL. */
function Slot({
  post,
  className,
  objectClass = "object-cover",
  sizes,
}: {
  post: Post;
  className: string;
  objectClass?: string;
  sizes: string;
}) {
  const local = post.src.startsWith("/");
  return (
    <a
      href={post.href}
      target={post.href === IG_URL || post.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-[6px] ${className}`}
    >
      {local ? (
        <Image
          src={post.src}
          alt="Katie Spencer — off stage"
          fill
          sizes={sizes}
          className={`${objectClass} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.src}
          alt="Katie Spencer — off stage"
          loading="lazy"
          className={`size-full ${objectClass} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
        />
      )}
    </a>
  );
}

export function OffStage() {
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
          .slice(0, 3);
        if (active && mapped.length === 3) setPosts(mapped);
      } catch {
        /* keep curated fallback */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const tiles = posts ?? FALLBACK;

  return (
    <section className="px-6 pb-20 sm:px-14 md:pb-24">
      <Reveal className="mx-auto max-w-[1180px]">
        <p className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand">
          Off stage
        </p>
        <div className="mt-7 flex flex-wrap items-start gap-6">
          <Slot
            post={tiles[0]}
            className="h-[400px] w-full flex-[3_1_420px]"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          <Slot
            post={tiles[1]}
            className="mt-12 h-[480px] w-full flex-[2_1_260px]"
            sizes="(max-width: 768px) 100vw, 35vw"
          />
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-14 gap-y-6">
          <Slot
            post={tiles[2]}
            className="h-[340px] max-w-[420px] flex-[1_1_300px]"
            objectClass="object-cover object-[50%_25%]"
            sizes="(max-width: 768px) 100vw, 35vw"
          />
          <div className="flex-[1_1_320px]">
            <p className="max-w-[420px] font-serif text-[clamp(26px,2.8vw,34px)] leading-[1.15]">
              The work matters. So does everything that shapes it.
            </p>
            <div className="mt-4">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand hover:text-red-deep"
              >
                The performance continues on Instagram &rarr;
              </a>
            </div>
            <p className="mt-2 font-accent text-xs uppercase tracking-[0.12em] text-ink-faint">
              @bykatiespencer
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
