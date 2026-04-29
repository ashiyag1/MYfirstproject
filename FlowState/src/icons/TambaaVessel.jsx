/* ─────────────────────────────────────────────────────────────
   TambaaVessel.jsx
   Hand-crafted SVG of a copper (tambaa) lota / vessel.
   Props:
     size  – number, renders as (size × 52/62) wide, size tall
             default 62
─────────────────────────────────────────────────────────────── */
export default function TambaaVessel({ size = 62 }) {
  const w = Math.round((size * 52) / 62)
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 52 62"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Copper water vessel"
    >
      <defs>
        <radialGradient id="tv-body" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#f0a84a" />
          <stop offset="30%"  stopColor="#d4782a" />
          <stop offset="65%"  stopColor="#a04e18" />
          <stop offset="100%" stopColor="#7a3810" />
        </radialGradient>
        <radialGradient id="tv-shine" cx="30%" cy="20%" r="50%">
          <stop offset="0%"   stopColor="#ffe0a0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffe0a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tv-neck" cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#e08030" />
          <stop offset="100%" stopColor="#8c3e10" />
        </radialGradient>
        <radialGradient id="tv-water" cx="50%" cy="60%" r="55%">
          <stop offset="0%"   stopColor="#90c8f0" />
          <stop offset="100%" stopColor="#4488cc" />
        </radialGradient>
        <clipPath id="tv-clip">
          <path d="M10 23 Q8 38 10 46 Q14 56 26 57 Q38 56 42 46 Q44 38 42 23 Q36 18 26 18 Q16 18 10 23Z" />
        </clipPath>
      </defs>

      {/* water ripple below */}
      <ellipse cx="26" cy="58" rx="18" ry="3"   fill="#c0dcf5" opacity="0.45" />
      <ellipse cx="26" cy="59.5" rx="12" ry="1.8" fill="#a8ccee" opacity="0.30" />

      {/* body */}
      <path
        d="M10 23 Q8 38 10 46 Q14 56 26 57 Q38 56 42 46 Q44 38 42 23 Q36 18 26 18 Q16 18 10 23Z"
        fill="url(#tv-body)"
      />

      {/* water fill (bottom ~40%) */}
      <rect
        x="8" y="38" width="36" height="20"
        fill="url(#tv-water)"
        opacity="0.55"
        clipPath="url(#tv-clip)"
      />

      {/* shine overlay */}
      <path
        d="M10 23 Q8 38 10 46 Q14 56 26 57 Q38 56 42 46 Q44 38 42 23 Q36 18 26 18 Q16 18 10 23Z"
        fill="url(#tv-shine)"
      />

      {/* shoulder bands */}
      <path d="M11 26 Q26 22 41 26" stroke="#e8a050" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M11 29 Q26 25 41 29" stroke="#c07030" strokeWidth="0.7"  fill="none" opacity="0.5" />

      {/* mid engraving */}
      <path d="M10 40 Q26 37 42 40" stroke="#8a3c12" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M10 43 Q26 40 42 43" stroke="#f0a050" strokeWidth="0.6" fill="none" opacity="0.3" />

      {/* neck */}
      <path
        d="M18 12 Q16 18 16 20 Q26 17 36 20 Q36 18 34 12 Q30 10 22 10 Q19 10 18 12Z"
        fill="url(#tv-neck)"
      />
      <ellipse cx="26" cy="20" rx="10" ry="2.2" fill="#b86828" />
      <ellipse cx="26" cy="20" rx="10" ry="2.2" fill="#f0a050" opacity="0.3" />

      {/* spout */}
      <ellipse cx="26" cy="10.5" rx="8" ry="2.5" fill="#c07030" />
      <ellipse cx="26" cy="10.5" rx="8" ry="2.5" fill="#ffe090" opacity="0.25" />
      <ellipse cx="26" cy="9"    rx="6.5" ry="1.8" fill="#d08040" />

      {/* handle */}
      <path d="M10 28 Q4 32 6 38 Q8 42 10 40" stroke="#a04818" strokeWidth="2"   fill="none" strokeLinecap="round" />
      <path d="M10 28 Q4 32 6 38 Q8 42 10 40" stroke="#e09050" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* specular highlight */}
      <ellipse cx="17" cy="25" rx="3.5" ry="5" fill="#ffe8b0" opacity="0.4" transform="rotate(-20,17,25)" />
    </svg>
  )
}
