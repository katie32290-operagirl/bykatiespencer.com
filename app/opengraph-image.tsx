import { ImageResponse } from "next/og";

export const alt =
  "Katie Spencer. Stories build what strategy alone can't.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Load the brand display serif for the card. Falls back to the default face
 *  if the font can't be fetched, so the build never fails on it. */
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

// Branded social-share card — an "Opening Night" playbill on velvet green.
export default async function OpengraphImage() {
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
          backgroundColor: "#143F38",
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
            border: "2px solid #AE8434",
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
              color: "#C9A24B",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                background: "#C9A24B",
                transform: "rotate(45deg)",
                marginRight: 22,
              }}
            />
            Storyteller · Builder · Founder
          </div>

          {/* the line */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: display,
                fontSize: 88,
                lineHeight: 1.04,
                color: "#EFE3CB",
                maxWidth: 1010,
              }}
            >
              Stories build what strategy alone can&rsquo;t
              <span style={{ color: "#C9A24B" }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 29,
                lineHeight: 1.4,
                color: "#DCC08A",
                marginTop: 28,
                maxWidth: 900,
              }}
            >
              An opera singer turned founder, building stories and tools for the
              performing arts.
            </div>
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 28,
              color: "#DCC08A",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", color: "#EFE3CB" }}>
              Katie Spencer
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: "#C9A24B",
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
      ...size,
      fonts: serif
        ? [{ name: "DM Serif Display", data: serif, weight: 400, style: "normal" }]
        : undefined,
    },
  );
}
