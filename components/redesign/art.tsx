"use client";

import { useCallback, useEffect, useState } from "react";
import { Nav, Cta, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import {
  galleryArtworks,
  standaloneArtworks,
  fragmentsArtworks,
  type Artwork,
} from "@/content/artworks";

/** A gallery label: "NN · Title, Year · Medium", dropping whatever is missing.
 * Series pieces lead with their plate number and drop the (uniform) medium. */
function caption(a: Artwork): string {
  const parts: string[] = [];
  if (a.seq) parts.push(a.seq);
  const titleYear = [a.title, a.year].filter(Boolean).join(", ");
  if (titleYear) parts.push(titleYear);
  if (a.collection !== "Fragments" && a.medium) parts.push(a.medium);
  return parts.join(" · ");
}

export function ArtRedesign() {
  const [open, setOpen] = useState<number | null>(null);
  const items = galleryArtworks;
  const openById = (id: string) =>
    setOpen(items.findIndex((x) => x.id === id));

  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Art" />

      {/* ---- introduction ---- */}
      <div
        className={`${PAD} pt-[clamp(28px,4vw,52px)] pb-[clamp(28px,4vw,48px)]`}
      >
        <div className="mx-auto max-w-[1180px]">
          <div
            style={{
              fontFamily: SANS,
              fontSize: 12,
              letterSpacing: ".26em",
              textTransform: "uppercase",
              color: C.terra,
            }}
          >
            From the studio
          </div>
          <h1
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(44px,8.5vw,104px)",
              lineHeight: 0.92,
              letterSpacing: "-.045em",
              color: C.ox,
              margin: "18px 0 0",
              textWrap: "balance",
            }}
          >
            Things I&rsquo;ve Made.
          </h1>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(17px,1.8vw,21px)",
              lineHeight: 1.55,
              color: C.ox,
              maxWidth: 560,
              margin: "22px 0 0",
              textWrap: "pretty",
            }}
          >
            A collection of things I&rsquo;ve made along the way.
          </p>
          <DotRule />
        </div>
      </div>

      {/* ---- standalone works ---- */}
      <div className={`${PAD} pb-[clamp(24px,4vw,48px)]`}>
        <GalleryGrid pieces={standaloneArtworks} onOpen={openById} />
      </div>

      {/* ---- the Fragments series, as its own section ---- */}
      <section
        className={`${PAD} pt-[clamp(40px,6vw,88px)] pb-[clamp(56px,8vw,104px)]`}
      >
        <div className="mx-auto mb-[clamp(28px,4vw,52px)] max-w-[1180px]">
          <DotRule />
          <div
            style={{
              fontFamily: SANS,
              fontSize: 12,
              letterSpacing: ".26em",
              textTransform: "uppercase",
              color: C.terra,
              marginTop: "clamp(28px,4vw,44px)",
            }}
          >
            A series in charcoal
          </div>
          <h2
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(40px,7vw,88px)",
              lineHeight: 0.92,
              letterSpacing: "-.045em",
              color: C.ox,
              margin: "16px 0 0",
            }}
          >
            Fragments
          </h2>
        </div>
        <GalleryGrid pieces={fragmentsArtworks} onOpen={openById} />
      </section>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}

      <Cta />
      <Footer />
    </Shell>
  );
}

/** Oxblood line + terracotta dot. */
function DotRule() {
  return (
    <div className="mt-10 flex items-center gap-[14px]" style={{ maxWidth: 240 }}>
      <span style={{ height: 1.5, background: C.ox, flex: 1 }} />
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: C.terra,
          flex: "none",
        }}
      />
    </div>
  );
}

/** One larger opening piece, then an asymmetric masonry of the rest. */
function GalleryGrid({
  pieces,
  onOpen,
}: {
  pieces: Artwork[];
  onOpen: (id: string) => void;
}) {
  const [lead, ...rest] = pieces;
  return (
    <div className="mx-auto" style={{ maxWidth: 1240 }}>
      {lead && (
        <div className="mb-[clamp(32px,5vw,64px)] flex justify-center">
          <GalleryPiece
            art={lead}
            onOpen={() => onOpen(lead.id)}
            style={{ width: "min(720px, 100%)" }}
          />
        </div>
      )}
      <div
        style={{
          columnWidth: "clamp(250px, 29vw, 360px)",
          columnGap: "clamp(20px,2.8vw,42px)",
        }}
      >
        {rest.map((art) => (
          <div
            key={art.id}
            style={{
              breakInside: "avoid",
              marginBottom: "clamp(28px,3.4vw,52px)",
            }}
          >
            <GalleryPiece art={art} onOpen={() => onOpen(art.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** One tappable artwork: image at its true ratio, understated label beneath. */
function GalleryPiece({
  art,
  onOpen,
  style,
}: {
  art: Artwork;
  onOpen: () => void;
  style?: React.CSSProperties;
}) {
  const label = caption(art);
  return (
    <figure style={{ margin: 0, ...style }}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${art.title ?? "untitled piece"}${art.year ? `, ${art.year}` : ""} larger`}
        className="ks-art-tile group block w-full cursor-zoom-in overflow-hidden p-0"
        style={{ border: "none", background: "transparent", lineHeight: 0 }}
      >
        <img
          src={art.image}
          alt={art.alt}
          width={art.width}
          height={art.height}
          loading="lazy"
          decoding="async"
          className="ks-art-img block h-auto w-full"
          style={{ aspectRatio: `${art.width} / ${art.height}` }}
        />
      </button>
      {label && (
        <figcaption
          style={{
            fontFamily: SANS,
            fontSize: 11.5,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: C.ox,
            marginTop: 12,
            lineHeight: 1.5,
          }}
        >
          {label}
        </figcaption>
      )}
    </figure>
  );
}

/** Immersive single-piece view with next/previous and keyboard control. */
function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Artwork[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const art = items[index];
  const [shot, setShot] = useState(0); // which image (primary + extras)
  const gallery = [art.image, ...(art.images ?? [])];

  const go = useCallback(
    (dir: number) => {
      const n = (index + dir + items.length) % items.length;
      onIndex(n);
      setShot(0);
    },
    [index, items.length, onIndex],
  );

  // reset the active detail image whenever the piece changes
  useEffect(() => {
    setShot(0);
  }, [index]);

  // keyboard + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  const metaLine = [art.year, art.medium, art.dimensions]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={art.title ? `${art.title}, enlarged` : "Artwork, enlarged"}
      onClick={onClose}
      className="ks-lb fixed inset-0 z-[100] flex flex-col"
      style={{ background: "#17110E", fontFamily: SANS }}
    >
      {/* top bar */}
      <div
        className="flex items-center justify-between px-[clamp(16px,3vw,32px)] py-[clamp(12px,2vw,20px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            color: C.peach,
            fontSize: 12,
            letterSpacing: ".18em",
            textTransform: "uppercase",
          }}
        >
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="transition-opacity hover:opacity-70"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: C.cream,
            fontSize: 13,
            letterSpacing: ".1em",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
          <span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1 }}>
            &times;
          </span>
        </button>
      </div>

      {/* stage */}
      <div
        className="flex min-h-0 flex-1 flex-col items-center gap-[clamp(18px,3vw,30px)] px-[clamp(16px,4vw,48px)] pb-[clamp(20px,3vw,36px)] md:flex-row md:items-center md:justify-center md:gap-[clamp(28px,4vw,56px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* prev */}
        <LbArrow dir="prev" onClick={() => go(-1)} />

        {/* image + optional detail thumbs */}
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
          <img
            src={gallery[shot] ?? art.image}
            alt={art.alt}
            className="block"
            style={{
              maxHeight: "72vh",
              maxWidth: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* caption rail */}
        <div
          className="w-full shrink-0 md:w-[clamp(240px,24vw,320px)]"
          style={{ color: C.cream }}
        >
          {art.seq && (
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".26em",
                color: C.peach,
                marginBottom: 10,
              }}
            >
              {art.seq}
            </div>
          )}
          {art.title ? (
            <h2
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "clamp(24px,2.6vw,34px)",
                letterSpacing: "-.03em",
                lineHeight: 1.05,
                margin: 0,
                color: C.cream,
              }}
            >
              {art.title}
            </h2>
          ) : (
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(20px,2.2vw,28px)",
                letterSpacing: "-.01em",
                margin: 0,
                color: C.peachSoft,
                fontStyle: "italic",
              }}
            >
              Untitled
            </h2>
          )}
          {metaLine && (
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: C.peach,
                marginTop: 12,
              }}
            >
              {metaLine}
            </div>
          )}
          {art.note && (
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 16,
                lineHeight: 1.65,
                color: C.peachSoft,
                marginTop: 16,
                maxWidth: 420,
              }}
            >
              {art.note}
            </p>
          )}
          {art.availability && (
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: C.peach,
                marginTop: 18,
                paddingTop: 14,
                borderTop: `1px solid rgba(240,239,236,.22)`,
              }}
            >
              {art.availability}
            </div>
          )}
          {gallery.length > 1 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {gallery.map((src, s) => (
                <button
                  key={src + s}
                  type="button"
                  onClick={() => setShot(s)}
                  aria-label={`View image ${s + 1}`}
                  className="overflow-hidden transition-opacity hover:opacity-100"
                  style={{
                    width: 54,
                    height: 54,
                    padding: 0,
                    border:
                      s === shot
                        ? `2px solid ${C.terra}`
                        : `1px solid rgba(240,239,236,.3)`,
                    opacity: s === shot ? 1 : 0.65,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* next */}
        <LbArrow dir="next" onClick={() => go(1)} />
      </div>

      {/* mobile prev / next — the side arrows are desktop-only */}
      <div
        className="flex items-center gap-3 px-[clamp(16px,4vw,48px)] pb-[clamp(20px,5vw,32px)] md:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <MobileNavBtn label="Previous" onClick={() => go(-1)}>
          {"←"} Prev
        </MobileNavBtn>
        <MobileNavBtn label="Next" onClick={() => go(1)}>
          Next {"→"}
        </MobileNavBtn>
      </div>
    </div>
  );
}

function LbArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const prev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={prev ? "Previous artwork" : "Next artwork"}
      className="hidden shrink-0 items-center justify-center transition-opacity hover:opacity-100 md:inline-flex"
      style={{
        width: 52,
        height: 52,
        borderRadius: 999,
        border: `1px solid rgba(240,239,236,.4)`,
        background: "transparent",
        color: C.cream,
        opacity: 0.72,
        cursor: "pointer",
        fontSize: 22,
        lineHeight: 1,
      }}
    >
      <span aria-hidden="true">{prev ? "←" : "→"}</span>
    </button>
  );
}

function MobileNavBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        flex: 1,
        height: 48,
        borderRadius: 999,
        border: `1px solid rgba(240,239,236,.4)`,
        background: "transparent",
        color: C.cream,
        fontFamily: SANS,
        fontSize: 13,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
