/** A hand-drawn brush stroke, used to underline key phrases. */
export function BrushUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 12"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 7.5C52 3 104 9.5 150 6.2 196 2.9 250 8.8 298 4.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
