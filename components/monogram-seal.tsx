/** Circular "KS" monogram seal with orbiting wordmark — a small editorial stamp. */
export function MonogramSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <defs>
        <path
          id="seal-arc"
          d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="58"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <text
        fill="currentColor"
        style={{ fontSize: "8.5px", letterSpacing: "2.6px" }}
        opacity="0.7"
      >
        <textPath href="#seal-arc" startOffset="0">
          KATIE SPENCER · CREATIVE STRATEGIST · STORYTELLER ·
        </textPath>
      </text>
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: "32px",
          fontStyle: "italic",
        }}
      >
        KS
      </text>
    </svg>
  );
}
