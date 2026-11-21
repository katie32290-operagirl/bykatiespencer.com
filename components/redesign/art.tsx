"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Nav, Cta, Footer, Shell, PAD, C, SANS, SERIF } from "./chrome";
import {
  galleryArtworks,
  galleryCategories,
  type Artwork,
} from "@/content/artworks";

/** Full label for the lightbox: "NN · Title, Year · Medium". */
function caption(a: Artwork): string {
  const parts: string[] = [];
  if (a.seq) parts.push(a.seq);
  const titleYear = [a.title, a.year].filter(Boolean).join(", ");
  if (titleYear) parts.push(titleYear);
  if (a.medium) parts.push(a.medium);
  return parts.join(" · ");
}

/** Short label for the hover overlay: "NN · Title". */
function tileLabel(a: Artwork): string {
  const t = a.title ?? "Untitled";
  return a.seq ? `${a.seq} · ${t}` : t;
}

export function ArtRedesign() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () =>
      cat === "All"
        ? galleryArtworks
        : galleryArtworks.filter((a) => a.category === cat),
    [cat],
  );

  const pick = (c: string) => {
    setCat(c);
    setOpen(null);
  };
  const openById = (id: string) =>
    setOpen(items.findIndex((x) => x.id === id));

  return (
    <Shell ground="cream">
      <Nav ground="cream" active="Art" />

      {/* ---- introduction ---- */}
      <div
        className={`${PAD} pt-[clamp(28px,4vw,52px)] pb-[clamp(20px,3vw,36px)]`}
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
        </div>
      </div>

      {/* ---- category filter ---- */}
      <div className={`${PAD} pb-[clamp(18px,2.6vw,30px)]`}>
        <div
          className="mx-auto flex flex-wrap items-center gap-x-[clamp(18px,2.6vw,34px)] gap-y-3"
          style={{
            maxWidth: 1240,
            borderBottom: `1px solid ${C.ox}22`,
            paddingBottom: 14,
          }}
        >
          {galleryCategories.map((c) => {
            const on = c === cat;
            return (
              <button
                key={c}
                type="button"
                onClick={() => pick(c)}
                style={{
                  fontFamily: SANS,
                  fontSize: 13,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: on ? C.terra : `${C.ox}99`,
                  background: "transparent",
                  border: "none",
                  padding: "0 0 4px",
                  cursor: "pointer",
                  borderBottom: on
                    ? `1.5px solid ${C.terra}`
                    : "1.5px solid transparent",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- mosaic ---- */}
      <div className={`${PAD} pb-[clamp(56px,8vw,104px)]`}>
        <MosaicGrid items={items} onOpen={openById} />
      </div>

      {open !== null && items[open] && (
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

/** Row-major grid: items read left-to-right, top-to-bottom in source order, so
 * the numbered series stays in sequence. Each tile keeps its true aspect ratio;
 * rows align to the top so uniform series (like Fragments) sit in even rows. */
function MosaicGrid({
  items,
  onOpen,
}: {
  items: Artwork[];
  onOpen: (id: string) => void;
}) {
  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: 1240,
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(clamp(150px, 22vw, 240px), 1fr))",
        gap: "clamp(12px,1.4vw,18px)",
        alignItems: "start",
      }}
    >
      {items.map((art) => (
        <Tile key={art.id} art={art} onOpen={() => onOpen(art.id)} />
      ))}
    </div>
  );
}

/** A mosaic tile: image at its true ratio, title revealed on hover. */
function Tile({ art, onOpen }: { art: Artwork; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${art.title ?? "untitled piece"} larger`}
      className="ks-tile group relative block w-full cursor-zoom-in overflow-hidden p-0"
      style={{ border: "none", background: C.peachSoft, lineHeight: 0 }}
    >
      <img
        src={art.image}
        alt={art.alt}
        width={art.width}
        height={art.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        style={{ aspectRatio: `${art.width} / ${art.height}` }}
      />
      <span
        className="pointer-events-none absolute inset-0 flex items-end opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(140,27,18,.82), rgba(140,27,18,0) 58%)",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontSize: 12,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: C.cream,
            padding: "0 14px 14px",
            lineHeight: 1.4,
            textAlign: "left",
          }}
        >
          {tileLabel(art)}
        </span>
      </span>
    </button>
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

  useEffect(() => {
    setShot(0);
  }, [index]);

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

      <div
        className="flex min-h-0 flex-1 flex-col items-center gap-[clamp(18px,3vw,30px)] px-[clamp(16px,4vw,48px)] pb-[clamp(20px,3vw,36px)] md:flex-row md:items-center md:justify-center md:gap-[clamp(28px,4vw,56px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <LbArrow dir="prev" onClick={() => go(-1)} />

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

        <LbArrow dir="next" onClick={() => go(1)} />
      </div>

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
