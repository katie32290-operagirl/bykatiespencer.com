import { ImageResponse } from "next/og";

export const alt =
  "Katie Spencer — Stories build what strategy alone can't.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card, generated at build time. Cream / teal / plum.
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
          backgroundColor: "#FAF4EC",
          color: "#0E4E68",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C23A78",
          }}
        >
          Storyteller · Builder · Founder
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Stories build what strategy alone can&rsquo;t
            <span style={{ color: "#C23A78" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#5F7A86",
              marginTop: 28,
              maxWidth: 940,
            }}
          >
            Founder, builder, speaker, and writer helping ideas become things
            people believe in.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#5F7A86",
          }}
        >
          <span style={{ color: "#0E4E68", fontWeight: 600 }}>
            Katie Spencer
            <span style={{ color: "#C23A78" }}>.</span>
          </span>
          <span>bykatiespencer.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
