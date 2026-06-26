"use client";

import { useEffect, useRef, useState } from "react";

/**
 * YouTube thumbnail with a maxres→sddefault fallback (many videos lack a
 * maxresdefault and YouTube serves a 120px gray placeholder / 404). The
 * mount-time ref check covers the case where that placeholder loads before
 * React hydrates and onLoad never fires.
 */
export function YtThumb({
  id,
  alt = "",
  className,
}: {
  id: string;
  alt?: string;
  className?: string;
}) {
  const [src, setSrc] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  );
  const ref = useRef<HTMLImageElement>(null);

  const toFallback = () =>
    setSrc((cur) =>
      cur.includes("maxres")
        ? `https://i.ytimg.com/vi/${id}/sddefault.jpg`
        : cur,
    );

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth <= 120) toFallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= 120) toFallback();
      }}
      onError={toFallback}
    />
  );
}
