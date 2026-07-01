interface FlourishProps {
  className?: string;
}

/** Delicate line-art divider with a small center diamond (uses currentColor). */
export function Flourish({ className }: FlourishProps) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={className}
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12 C 56 12, 82 4, 106 12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M232 12 C 184 12, 158 4, 134 12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M106 12 L120 5 L134 12 L120 19 Z" fill="currentColor" />
    </svg>
  );
}
