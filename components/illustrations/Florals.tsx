type BlossomTone = "sky" | "blue" | "white";

const TONE: Record<BlossomTone, { petal: string; center: string }> = {
  sky: { petal: "#7DD3FC", center: "#38BDF8" },
  blue: { petal: "#93C5FD", center: "#2563EB" },
  white: { petal: "#F8FBFF", center: "#BFDBFE" },
};

const PETAL_ANGLES = [0, 72, 144, 216, 288];

interface BlossomProps {
  className?: string;
  tone?: BlossomTone;
}

/** A single five-petal blossom — used for floating flowers and clusters. */
export function Blossom({ className, tone = "sky" }: BlossomProps) {
  const colors = TONE[tone];
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {PETAL_ANGLES.map((angle) => (
        <ellipse
          key={angle}
          cx="20"
          cy="9.5"
          rx="5.4"
          ry="9"
          fill={colors.petal}
          opacity="0.92"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4.8" fill={colors.center} />
    </svg>
  );
}

interface FloralClusterProps {
  className?: string;
  /** Mirror horizontally (for the opposite corner). */
  flip?: boolean;
}

/** A soft corner cluster of leaves and blossoms for the hero card. */
export function FloralCluster({ className, flip }: FloralClusterProps) {
  return (
    <svg
      viewBox="0 0 130 130"
      className={className}
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* stems + leaves */}
      <path
        d="M14 116 C40 96 58 70 70 38"
        stroke="#7DD3FC"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M34 92 C24 84 20 72 26 60 C40 66 44 80 34 92 Z" fill="#BAE6FD" opacity="0.85" />
      <path d="M52 70 C46 58 48 44 58 36 C68 48 64 64 52 70 Z" fill="#93C5FD" opacity="0.7" />
      <path d="M22 108 C16 100 16 88 24 80 C34 90 32 102 22 108 Z" fill="#BAE6FD" opacity="0.7" />

      {/* blossoms */}
      <g transform="translate(58 20) scale(0.9)">
        {PETAL_ANGLES.map((angle) => (
          <ellipse
            key={angle}
            cx="20"
            cy="9.5"
            rx="5.4"
            ry="9"
            fill="#7DD3FC"
            opacity="0.95"
            transform={`rotate(${angle} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="4.8" fill="#38BDF8" />
      </g>
      <g transform="translate(20 52) scale(0.7)">
        {PETAL_ANGLES.map((angle) => (
          <ellipse
            key={angle}
            cx="20"
            cy="9.5"
            rx="5.4"
            ry="9"
            fill="#F8FBFF"
            opacity="0.95"
            transform={`rotate(${angle} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="4.8" fill="#BFDBFE" />
      </g>
    </svg>
  );
}
