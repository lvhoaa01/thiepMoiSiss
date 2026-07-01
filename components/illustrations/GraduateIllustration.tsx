interface GraduateIllustrationProps {
  className?: string;
}

/**
 * A refined flat illustration of a graduate (cap, gown, diploma) drawn with
 * SVG. Academic palette: charcoal gown, cream collar, champagne-gold tassel.
 */
export function GraduateIllustration({ className }: GraduateIllustrationProps) {
  return (
    <svg
      viewBox="0 0 260 300"
      className={className}
      role="img"
      aria-label="Minh hoạ tân cử nhân trong lễ phục tốt nghiệp"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gownGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A342E" />
          <stop offset="1" stopColor="#26211D" />
        </linearGradient>
        <linearGradient id="boardGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2B2722" />
          <stop offset="1" stopColor="#1B1815" />
        </linearGradient>
        <radialGradient id="glowGradient" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#D8B978" stopOpacity="0.4" />
          <stop offset="1" stopColor="#D8B978" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft backdrop glow */}
      <circle cx="130" cy="140" r="124" fill="url(#glowGradient)" />

      {/* hair */}
      <path
        d="M99 116 C94 90 110 74 130 74 C150 74 166 90 161 116 C170 156 165 196 154 210 C151 196 150 172 150 152 C140 160 120 160 110 152 C110 172 109 196 106 210 C95 196 90 156 99 116 Z"
        fill="#221E1A"
      />

      {/* gown */}
      <path
        d="M68 190 C68 164 96 152 130 152 C164 152 192 164 192 190 L208 290 Q208 296 202 296 L58 296 Q52 296 52 290 Z"
        fill="url(#gownGradient)"
      />

      {/* collar + stoles (gold) */}
      <path d="M110 152 L130 188 L150 152 Z" fill="#F7F0E4" />
      <path d="M119 154 L128 154 L126 256 L117 256 Z" fill="#B0894B" />
      <path d="M132 154 L141 154 L143 256 L134 256 Z" fill="#B0894B" />

      {/* diploma */}
      <rect x="90" y="214" width="80" height="20" rx="10" fill="#F7F0E4" />
      <ellipse cx="90" cy="224" rx="6" ry="10" fill="#E9DEC9" />
      <ellipse cx="170" cy="224" rx="6" ry="10" fill="#E9DEC9" />
      <rect x="124" y="210" width="12" height="28" rx="3" fill="#B0894B" />

      {/* neck + head */}
      <rect x="121" y="134" width="18" height="22" rx="8" fill="#EAB98F" />
      <circle cx="130" cy="113" r="30" fill="#F3CDA2" />

      {/* face */}
      <circle cx="121" cy="113" r="2.6" fill="#2B2722" />
      <circle cx="139" cy="113" r="2.6" fill="#2B2722" />
      <path
        d="M122 125 Q130 131 138 125"
        stroke="#2B2722"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* hair fringe */}
      <path d="M106 99 Q130 89 154 99 Q149 107 130 103 Q111 107 106 99 Z" fill="#221E1A" />

      {/* mortarboard */}
      <path d="M104 96 Q130 86 156 96 L156 101 Q130 92 104 101 Z" fill="url(#boardGradient)" />
      <path d="M130 54 L188 80 L130 106 L72 80 Z" fill="url(#boardGradient)" />
      <ellipse cx="130" cy="80" rx="6" ry="3.4" fill="#1B1815" />

      {/* tassel (gold) */}
      <circle cx="130" cy="76" r="4" fill="#B0894B" />
      <path
        d="M130 76 L181 84 L181 122"
        stroke="#B0894B"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M176 120 L186 120 L182 137 L180 137 Z" fill="#B0894B" />
      <circle cx="181" cy="120" r="3.2" fill="#D8B978" />
    </svg>
  );
}
