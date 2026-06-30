interface BuntingProps {
  className?: string;
  /** Number of flags across the string. */
  count?: number;
}

const FLAG_COLORS = ["#1E3A8A", "#2563EB", "#38BDF8", "#F8FBFF"];

/**
 * Decorative triangular bunting on a gently sagging string.
 * The SVG keeps its aspect ratio (width: 100%), so flags scale uniformly and
 * never distort across breakpoints.
 *
 * String follows a quadratic curve P0(0,3) C(50,11) P2(100,3), which reduces to
 * y(t) = 3 + 16·t·(1 − t).
 */
export function Bunting({ className, count = 13 }: BuntingProps) {
  const stringY = (t: number) => 3 + 16 * t * (1 - t);
  const flagWidth = (100 / count) * 0.78;
  const flagHeight = 8;

  return (
    <svg
      viewBox="0 0 100 18"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 3 Q50 11 100 3"
        fill="none"
        stroke="#0C1B38"
        strokeWidth="0.6"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      {Array.from({ length: count }, (_, index) => {
        const t = (index + 0.5) / count;
        const x = t * 100;
        const y = stringY(t);
        const color = FLAG_COLORS[index % FLAG_COLORS.length];
        const isLight = color === "#F8FBFF";
        return (
          <path
            key={index}
            d={`M${x - flagWidth / 2} ${y} L${x + flagWidth / 2} ${y} L${x} ${y + flagHeight} Z`}
            fill={color}
            stroke={isLight ? "#BFD4F2" : "none"}
            strokeWidth={isLight ? 0.3 : 0}
          />
        );
      })}
    </svg>
  );
}
