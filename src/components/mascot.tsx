"use client";

type Props = { className?: string };

export function Mascot({ className = "" }: Props) {
  return (
    <div
      className={`relative pointer-events-none ${className}`}
      aria-hidden
      style={{ perspective: "500px" }}
    >
      {/* Spinning pizza above the raised hand */}
      <div
        className="absolute"
        style={{
          top: "-6%",
          left: "58%",
          width: "50%",
        }}
      >
        <div className="pizza-toss w-full">
          <svg viewBox="0 0 120 60" className="w-full h-auto">
            {/* Outer dough ellipse */}
            <ellipse cx="60" cy="30" rx="55" ry="16" fill="var(--ink)" />
            {/* Inner curve to give the "tossed" look */}
            <path
              d="M 8 30 Q 60 8 112 30"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Bottom lip */}
            <path
              d="M 12 33 Q 60 46 108 33"
              fill="none"
              stroke="var(--paper)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Character body */}
      <svg
        viewBox="0 0 220 340"
        className="w-full h-auto text-ink"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Sparkles around the character (static, hand-drawn feel) */}
          <g fill="currentColor" stroke="none">
            <path
              d="M22 88 L24 96 L32 98 L24 100 L22 108 L20 100 L12 98 L20 96 Z"
              opacity="0.7"
            />
            <path
              d="M198 130 L200 138 L208 140 L200 142 L198 150 L196 142 L188 140 L196 138 Z"
              opacity="0.7"
            />
            <path
              d="M40 30 L41.5 36 L47.5 37 L41.5 38 L40 44 L38.5 38 L32.5 37 L38.5 36 Z"
              opacity="0.6"
            />
            <path
              d="M180 45 L181.5 51 L187.5 52 L181.5 53 L180 59 L178.5 53 L172.5 52 L178.5 51 Z"
              opacity="0.6"
            />
          </g>

          {/* Head (bald) */}
          <circle cx="110" cy="105" r="34" />

          {/* Eyes */}
          <circle cx="98" cy="102" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="122" cy="102" r="2.5" fill="currentColor" stroke="none" />

          {/* Small smile */}
          <path d="M 102 120 Q 110 126 118 120" />

          {/* Beard (filled) */}
          <path
            d="M 76 118
               Q 78 152 110 160
               Q 142 152 144 118
               Q 132 138 110 138
               Q 88 138 76 118 Z"
            fill="currentColor"
          />

          {/* Neck lines */}
          <path d="M 100 140 L 100 156 M 120 140 L 120 156" />

          {/* T-shirt body */}
          <path
            d="M 68 178
               Q 62 172 55 194
               L 46 335
               L 174 335
               L 165 194
               Q 158 172 152 178
               Q 132 158 110 158
               Q 88 158 68 178 Z"
          />

          {/* T-shirt neckline detail */}
          <path d="M 92 160 Q 110 172 128 160" opacity="0.5" />

          {/* Left arm (down at side, slight bend) */}
          <path d="M 60 195 Q 40 230 46 275" />
          {/* Left hand fingers */}
          <path d="M 44 275 L 41 285" />
          <path d="M 48 275 L 48 286" />

          {/* Right arm (raised up high, holding pizza) */}
          <path d="M 160 178 Q 178 130 172 60 Q 168 35 162 20" />

          {/* Right hand — three fingers reaching up */}
          <path d="M 156 20 L 152 4" />
          <path d="M 162 20 L 162 1" />
          <path d="M 168 22 L 172 4" />
          {/* Palm dot */}
          <circle cx="162" cy="22" r="2" fill="currentColor" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
