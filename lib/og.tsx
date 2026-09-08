import { ImageResponse } from "next/og";

/** Shared social-share card in the warm "Curtain Call" brand. Used by the
 *  per-route opengraph-image files so About, Work, etc. each share as their
 *  own card rather than one generic image. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Fetch a static TTF for a Google font at a given weight. Uses an old
 *  User-Agent so the CSS API serves TrueType (which satori can parse) rather
 *  than woff2. Returns null on any failure so the build never breaks on it. */
async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
        },
      },
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export async function renderOgCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  const [bold, regular] = await Promise.all([
    loadGoogleFont("Instrument Sans", 700),
    loadGoogleFont("Instrument Sans", 500),
  ]);
  const family = bold || regular ? "Instrument Sans" : "sans-serif";
  const fonts = [
    bold && { name: "Instrument Sans", data: bold, weight: 700 as const, style: "normal" as const },
    regular && { name: "Instrument Sans", data: regular, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 700 | 500; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: 34,
          backgroundColor: "#8C1B12",
          fontFamily: family,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            padding: "54px 66px",
            border: "2px solid #D65A2E",
          }}
        >
          {/* eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 25,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "#E8B7A4",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                background: "#D65A2E",
                transform: "rotate(45deg)",
                marginRight: 22,
              }}
            />
            {eyebrow}
          </div>

          {/* the line */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, color: "#F0EFEC", maxWidth: 1050 }}>
              {title}
            </div>
            <div style={{ display: "flex", fontSize: 29, lineHeight: 1.4, color: "#F0DCD2", marginTop: 28, maxWidth: 920 }}>
              {subtitle}
            </div>
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 28,
              color: "#E8B7A4",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", color: "#F0EFEC" }}>
              Katie Spencer
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: "#D65A2E",
                  transform: "rotate(45deg)",
                  marginLeft: 16,
                }}
              />
            </span>
            <span style={{ display: "flex" }}>bykatiespencer.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
