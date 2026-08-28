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
  { src: "/on/backstage.jpg", href: IG_URL },
  { src: "/on/couture-red.jpg", href: IG_URL },
  { src: "/on/rossini-festival.jpg", href: IG_URL },
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
      className={`group relative block overflow-hidden ${className}`}
    >
      {local ? (
        <Image
          src={post.src}
          alt="Katie Spencer — off stage"
          fill
          sizes={sizes}
          className={`${objectClass} transition-transform duration-500 group-hover:scale-[1.03]`}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.src}
          alt="Katie Spencer — off stage"
          loading="lazy"
          className={`size-full ${objectClass} transition-transform duration-500 group-hover:scale-[1.03]`}
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
    <section
      className="relative overflow-hidden border-t border-line bg-paper-bright px-[clamp(20px,4.5vw,56px)] py-[clamp(56px,8vw,100px)]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(248,240,221,.72), rgba(248,240,221,.66)), url('/on/desk-notes.webp')",
        backgroundSize: "auto, cover",
        backgroundPosition: "center, 50% 40%",
      }}
    >
      {/* the woman with opera glasses peeks in from the right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/on/opera-glasses.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[-50px] top-[8%] z-[4] hidden h-[clamp(210px,24vw,360px)] w-[clamp(150px,17vw,260px)] [transform:rotate(-4deg)] lg:block"
        style={{
          objectFit: "cover",
          objectPosition: "36% 30%",
          clipPath:
            "polygon(4% 6%, 26% 0%, 52% 5%, 78% 1%, 100% 6%, 100% 96%, 74% 100%, 48% 94%, 22% 99%, 2% 94%, 6% 68%, 0% 44%, 5% 22%)",
          boxShadow: "-4px 8px 20px rgba(22,17,13,.25)",
        }}
      />
      <Reveal className="relative z-[2] mx-auto max-w-[1180px]">
        <div className="mb-12 text-center">
          <p className="mb-3.5 font-accent text-xs uppercase tracking-[0.12em] text-rose">
            &#10022; Intermission &#10022;
          </p>
          <h2 className="mb-3 font-serif text-[clamp(34px,4vw,52px)] font-medium">
            Off stage
          </h2>
          <p className="font-serif text-xl italic text-muted-foreground">
            The work matters. So does everything that shapes it.
          </p>
        </div>
        {/* photos pinned to the board, live from Instagram */}
        <div className="flex flex-wrap items-start justify-center gap-x-0 gap-y-6">
          {/* 1 · torn print */}
          <Slot
            post={tiles[0]}
            className="mt-6 aspect-[4/5] w-[clamp(200px,24vw,300px)] [transform:rotate(-3deg)] [filter:drop-shadow(1px_3px_5px_rgba(22,17,13,.3))] transition-transform duration-300 hover:[transform:rotate(-2deg)]"
            sizes="(max-width: 768px) 60vw, 24vw"
          />
          {/* 2 · polaroid */}
          <div
            className="relative z-[3] mx-[-8px] w-[clamp(190px,22vw,270px)] bg-[#FBF6E9] p-2.5 pb-9 [transform:rotate(2.5deg)] transition-transform duration-300 hover:-translate-y-1"
            style={{ boxShadow: "0 5px 16px rgba(22,17,13,.24)" }}
          >
            <Slot
              post={tiles[1]}
              className="aspect-square w-full"
              sizes="(max-width: 768px) 60vw, 22vw"
            />
            <p className="pt-2.5 font-accent text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              a few moments that matter
            </p>
          </div>
          {/* 3 · cutout over gold paper */}
          <div className="relative mt-11 w-[clamp(200px,23vw,280px)] [transform:rotate(-1.5deg)] transition-transform duration-300 hover:[transform:rotate(-.5deg)]">
            <span
              aria-hidden
              className="absolute -inset-y-[6%] -left-[6%] -right-[8%] bg-gold opacity-55"
              style={{
                backgroundImage: "var(--paper-grain)",
                clipPath:
                  "polygon(3% 10%, 28% 0%, 58% 7%, 86% 2%, 100% 14%, 95% 44%, 99% 74%, 92% 97%, 62% 92%, 32% 99%, 4% 93%, 8% 58%, 0% 32%)",
                transform: "rotate(4deg)",
              }}
            />
            <Slot
              post={tiles[2]}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 768px) 60vw, 23vw"
            />
          </div>
        </div>
        <div className="mt-12 text-center">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-accent text-[13px] uppercase tracking-[0.12em] text-brand hover:text-red-deep"
          >
            The performance continues on Instagram &rarr;
          </a>
          <p className="mt-2 font-accent text-xs uppercase tracking-[0.12em] text-ink-faint">
            @bykatiespencer
          </p>
        </div>
      </Reveal>
    </section>
  );
}
