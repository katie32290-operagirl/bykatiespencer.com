import { ImageResponse } from "next/og";

export const alt = "Katie Spencer · Strategy, Storytelling & Creative Direction";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card, generated at build time. On-brand Gallery palette.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#EDE7E1",
          color: "#1f232b",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9d1b3d",
          }}
        >
          Creative Strategist · Storyteller
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Helping organizations tell their stories with clarity and purpose.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#56514a",
              marginTop: 28,
              maxWidth: 920,
            }}
          >
            Strategy, storytelling, fundraising, marketing, and creative
            direction for arts organizations & nonprofits.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#7a756c",
          }}
        >
          <span style={{ color: "#1f232b", fontWeight: 600 }}>
            Katie Spencer
          </span>
          <span>bykatiespencer.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
