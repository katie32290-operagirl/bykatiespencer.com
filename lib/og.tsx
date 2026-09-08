import { ImageResponse } from "next/og";

/** Shared social-share card in the warm "Curtain Call" brand. Used by the
 *  per-route opengraph-image files so About, Work, etc. each share as their
 *  own card rather than one generic image. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** The brand display serif for the card. Falls back to the default face if the
 *  font can't be fetched, so the build never fails on it. */
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf",
    );
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
  const serif = await loadSerif();
  const display = serif ? "DM Serif Display" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: 34,
          backgroundColor: "#8C1B12",
          fontFamily: display,
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
            <div style={{ display: "flex", fontSize: 88, lineHeight: 1.04, color: "#F0EFEC", maxWidth: 1010 }}>
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
      fonts: serif ? [{ name: "DM Serif Display", data: serif, weight: 400, style: "normal" as const }] : undefined,
    },
  );
}
