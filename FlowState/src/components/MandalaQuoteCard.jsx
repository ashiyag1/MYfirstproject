import { useState, useEffect, useRef } from "react";

const quotes = [
  {
    sk: "YOGA SUTRAS · 1.1",
    mq: ["Discipline today,", "freedom tomorrow."],
    sq: ["Small steps. Daily actions.", "Big transformation."],
  },
  {
    sk: "BHAGAVAD GITA · 2.47",
    mq: ["Act without attachment", "to the fruit."],
    sq: ["Your duty is to act.", "Not to claim the reward."],
  },
  {
    sk: "UPANISHADS",
    mq: ["The soul is", "its own witness."],
    sq: ["Be your own judge.", "Act with pure intention."],
  },
  {
    sk: "RIG VEDA",
    mq: ["Water flows.", "Life grows."],
    sq: ["Nourish the body.", "Nourish the spirit."],
  },
];

const PETALS_16 = Array.from({ length: 16 }, (_, i) => i * 22.5);
const PETALS_8  = Array.from({ length: 8  }, (_, i) => i * 45);

// Mandala + diamond centre
const CX = 150, CY = 240;

export default function QuoteCard() {
  const [idx, setIdx]     = useState(0);
  const [visible, setVis] = useState(true);
  const [rot, setRot]     = useState(0);
  const rafRef  = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    const tick = (ts) => {
      if (lastRef.current === null) lastRef.current = ts;
      setRot((r) => r + (ts - lastRef.current) * 0.004);
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const cycle = () => {
    setVis(false);
    setTimeout(() => { setIdx((i) => (i + 1) % quotes.length); setVis(true); }, 400);
  };

  const q = quotes[idx];

  return (
    <div
      onClick={cycle}
      style={{
        position: "relative",
        width: 300,
        height: 480,
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* ── SVG Frame + Mandala ── */}
      <svg width="300" height="480" viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="qcBg" cx="50%" cy="50%" r="52%">
            <stop offset="0%"   stopColor="#201d52" />
            <stop offset="50%"  stopColor="#13113e" />
            <stop offset="100%" stopColor="#09081e" />
          </radialGradient>
          <radialGradient id="qcHalo" cx="50%" cy="50%" r="48%">
            <stop offset="0%"   stopColor="rgba(160,130,45,0.18)" />
            <stop offset="70%"  stopColor="rgba(120,90,20,0.06)"  />
            <stop offset="100%" stopColor="rgba(100,70,10,0)"      />
          </radialGradient>
          <radialGradient id="qcVeil" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(12,10,38,0.82)" />
            <stop offset="75%"  stopColor="rgba(12,10,38,0.45)" />
            <stop offset="100%" stopColor="rgba(12,10,38,0)"    />
          </radialGradient>
          <radialGradient id="qcBindu" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,235,120,0.98)" />
            <stop offset="100%" stopColor="rgba(195,138,18,0.75)"  />
          </radialGradient>
        </defs>

        {/* ── Diamond body — perfect vertical lozenge ──
            top 150,18 | bottom 150,462 | left 18,240 | right 282,240  */}
        <path
          d="M150,18 C195,75 282,155 282,240 C282,325 195,405 150,462 C105,405 18,325 18,240 C18,155 105,75 150,18 Z"
          fill="url(#qcBg)"
        />
        {/* Outer gold border */}
        <path
          d="M150,18 C195,75 282,155 282,240 C282,325 195,405 150,462 C105,405 18,325 18,240 C18,155 105,75 150,18 Z"
          fill="none" stroke="rgba(220,175,45,0.85)" strokeWidth="1.2"
        />
        {/* Inner border 1 */}
        <path
          d="M150,32 C192,86 268,163 268,240 C268,317 192,394 150,448 C108,394 32,317 32,240 C32,163 108,86 150,32 Z"
          fill="none" stroke="rgba(220,175,45,0.22)" strokeWidth="0.7"
        />
        {/* Inner border 2 */}
        <path
          d="M150,46 C188,97 254,170 254,240 C254,310 188,383 150,434 C112,383 46,310 46,240 C46,170 112,97 150,46 Z"
          fill="none" stroke="rgba(220,175,45,0.1)" strokeWidth="0.5"
        />

        {/* Global halo glow */}
        <ellipse cx={CX} cy={CY} rx="130" ry="120" fill="url(#qcHalo)" />

        {/* ── Apex jewels — TOP ── */}
        <circle cx={CX} cy="18" r="9"   fill="#09081e" stroke="rgba(220,175,45,0.92)" strokeWidth="1.1" />
        <circle cx={CX} cy="18" r="4.5" fill="#09081e" stroke="rgba(220,175,45,0.6)"  strokeWidth="0.7" />
        <circle cx={CX} cy="18" r="2"   fill="rgba(220,175,45,0.97)" />
        <ellipse cx={CX}   cy="7"  rx="2" ry="4.5" fill="rgba(220,175,45,0.3)"  stroke="rgba(220,175,45,0.5)"  strokeWidth="0.5" />
        <ellipse cx="159" cy="10" rx="2" ry="4.5" fill="rgba(220,175,45,0.25)" stroke="rgba(220,175,45,0.42)" strokeWidth="0.5" transform="rotate(55,159,10)"  />
        <ellipse cx="141" cy="10" rx="2" ry="4.5" fill="rgba(220,175,45,0.25)" stroke="rgba(220,175,45,0.42)" strokeWidth="0.5" transform="rotate(-55,141,10)" />

        {/* ── Apex jewels — BOTTOM (mirror) ── */}
        <circle cx={CX} cy="462" r="9"   fill="#09081e" stroke="rgba(220,175,45,0.92)" strokeWidth="1.1" />
        <circle cx={CX} cy="462" r="4.5" fill="#09081e" stroke="rgba(220,175,45,0.6)"  strokeWidth="0.7" />
        <circle cx={CX} cy="462" r="2"   fill="rgba(220,175,45,0.97)" />
        <ellipse cx={CX}   cy="473" rx="2" ry="4.5" fill="rgba(220,175,45,0.3)"  stroke="rgba(220,175,45,0.5)"  strokeWidth="0.5" />
        <ellipse cx="159" cy="470" rx="2" ry="4.5" fill="rgba(220,175,45,0.25)" stroke="rgba(220,175,45,0.42)" strokeWidth="0.5" transform="rotate(-55,159,470)" />
        <ellipse cx="141" cy="470" rx="2" ry="4.5" fill="rgba(220,175,45,0.25)" stroke="rgba(220,175,45,0.42)" strokeWidth="0.5" transform="rotate(55,141,470)"  />

        {/* ── Side jewels — LEFT & RIGHT ── */}
        {[18, 282].map((x) => (
          <g key={x}>
            <circle cx={x} cy={CY} r="9"   fill="#09081e" stroke="rgba(220,175,45,0.9)"  strokeWidth="1.1" />
            <circle cx={x} cy={CY} r="4.5" fill="#09081e" stroke="rgba(220,175,45,0.55)" strokeWidth="0.7" />
            <circle cx={x} cy={CY} r="2"   fill="rgba(220,175,45,0.92)" />
          </g>
        ))}

        {/* ── Quarter jewels ── */}
        {[{ x: 69, y: 128 }, { x: 231, y: 128 }, { x: 69, y: 352 }, { x: 231, y: 352 }].map(({ x, y }) => (
          <g key={`${x}${y}`}>
            <circle cx={x} cy={y} r="5"   fill="#09081e" stroke="rgba(220,175,45,0.52)" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="1.8" fill="rgba(220,175,45,0.62)" />
          </g>
        ))}

        {/* ── Filigree connectors ── */}
        {[
          [150,26,  71,123], [150,26,  229,123],
          [64,132,  23,235], [236,132, 277,235],
          [23,245,  64,347], [277,245, 236,347],
          [71,357,  150,454],[229,357, 150,454],
        ].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={`rgba(220,175,45,${i < 2 || i > 5 ? 0.18 : 0.14})`}
            strokeWidth="0.55" strokeDasharray="2 4" />
        ))}

        {/* ── Small top lotus trio ── */}
        <ellipse cx="136" cy="82" rx="4.5" ry="8" fill="rgba(220,175,45,0.09)" stroke="rgba(220,175,45,0.28)" strokeWidth="0.5" transform="rotate(-20,136,82)" />
        <ellipse cx="150" cy="76" rx="4.5" ry="9" fill="rgba(220,175,45,0.11)" stroke="rgba(220,175,45,0.32)" strokeWidth="0.5" />
        <ellipse cx="164" cy="82" rx="4.5" ry="8" fill="rgba(220,175,45,0.09)" stroke="rgba(220,175,45,0.28)" strokeWidth="0.5" transform="rotate(20,164,82)" />

        {/* ── Small bottom lotus trio ── */}
        <ellipse cx="136" cy="398" rx="4.5" ry="8" fill="rgba(220,175,45,0.09)" stroke="rgba(220,175,45,0.28)" strokeWidth="0.5" transform="rotate(20,136,398)"  />
        <ellipse cx="150" cy="404" rx="4.5" ry="9" fill="rgba(220,175,45,0.11)" stroke="rgba(220,175,45,0.32)" strokeWidth="0.5" />
        <ellipse cx="164" cy="398" rx="4.5" ry="8" fill="rgba(220,175,45,0.09)" stroke="rgba(220,175,45,0.28)" strokeWidth="0.5" transform="rotate(-20,164,398)" />

        {/* ══════════════════════════════
            MANDALA — centred at 150,240
            ══════════════════════════════ */}

        {/* Static outer orbit */}
        <circle cx={CX} cy={CY} r="108" fill="none" stroke="rgba(220,175,45,0.09)" strokeWidth="0.6" />

        {/* Animated rings */}
        <circle cx={CX} cy={CY} r="94"  fill="none" stroke="rgba(220,175,45,0.17)" strokeWidth="0.5" strokeDasharray="3 7"
          style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${rot}deg)` }} />
        <circle cx={CX} cy={CY} r="78"  fill="none" stroke="rgba(220,175,45,0.15)" strokeWidth="0.5" strokeDasharray="2 5"
          style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${-rot * 0.7}deg)` }} />
        <circle cx={CX} cy={CY} r="112" fill="none" stroke="rgba(220,175,45,0.08)" strokeWidth="0.5" strokeDasharray="1 5"
          style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${rot * 1.3}deg)` }} />

        {/* Static structural rings */}
        <circle cx={CX} cy={CY} r="62" fill="none" stroke="rgba(220,175,45,0.28)" strokeWidth="0.6" />
        <circle cx={CX} cy={CY} r="44" fill="none" stroke="rgba(220,175,45,0.22)" strokeWidth="0.5" />
        <circle cx={CX} cy={CY} r="26" fill="none" stroke="rgba(220,175,45,0.3)"  strokeWidth="0.5" />

        {/* 16-petal outer lotus */}
        {PETALS_16.map((deg) => (
          <ellipse key={deg} cx={CX} cy={CY - 44} rx="5" ry="18"
            fill="rgba(220,175,45,0.08)" stroke="rgba(220,175,45,0.22)" strokeWidth="0.5"
            transform={`rotate(${deg},${CX},${CY})`} />
        ))}

        {/* 8-petal inner lotus */}
        {PETALS_8.map((deg) => (
          <ellipse key={deg} cx={CX} cy={CY - 31} rx="4" ry="13"
            fill="rgba(220,175,45,0.11)" stroke="rgba(220,175,45,0.28)" strokeWidth="0.5"
            transform={`rotate(${deg},${CX},${CY})`} />
        ))}

        {/* 8-spoke lines */}
        {PETALS_8.map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={CX + 26 * Math.cos(r)} y1={CY + 26 * Math.sin(r)}
              x2={CX + 62 * Math.cos(r)} y2={CY + 62 * Math.sin(r)}
              stroke="rgba(220,175,45,0.14)" strokeWidth="0.5" />
          );
        })}

        {/* Sri Yantra triangles */}
        <polygon points={`${CX},${CY-42} ${CX+36},${CY+22} ${CX-36},${CY+22}`}
          fill="rgba(220,175,45,0.05)" stroke="rgba(220,175,45,0.3)" strokeWidth="0.65" />
        <polygon points={`${CX},${CY+42} ${CX+36},${CY-22} ${CX-36},${CY-22}`}
          fill="rgba(220,175,45,0.05)" stroke="rgba(220,175,45,0.3)" strokeWidth="0.65" />

        {/* Text readability veil */}
        <circle cx={CX} cy={CY} r="80" fill="url(#qcVeil)" />

        {/* Bindu */}
        <circle cx={CX} cy={CY} r="5.5" fill="url(#qcBindu)" />
        <circle cx={CX} cy={CY} r="2.2" fill="#fffce8" />

        {/* ── Top rule band ── */}
        <line x1="88" y1="172" x2="212" y2="172" stroke="rgba(220,175,45,0.25)" strokeWidth="0.5" />
        <polygon points="150,168 153.5,172 150,176 146.5,172" fill="rgba(220,175,45,0.55)" />
        <circle cx="88"  cy="172" r="2"   fill="rgba(220,175,45,0.38)" />
        <circle cx="212" cy="172" r="2"   fill="rgba(220,175,45,0.38)" />
        <circle cx="104" cy="172" r="1.3" fill="rgba(220,175,45,0.25)" />
        <circle cx="196" cy="172" r="1.3" fill="rgba(220,175,45,0.25)" />

        {/* ── Bottom rule band ── */}
        <line x1="88" y1="308" x2="212" y2="308" stroke="rgba(220,175,45,0.25)" strokeWidth="0.5" />
        <polygon points="150,304 153.5,308 150,312 146.5,308" fill="rgba(220,175,45,0.55)" />
        <circle cx="88"  cy="308" r="2"   fill="rgba(220,175,45,0.38)" />
        <circle cx="212" cy="308" r="2"   fill="rgba(220,175,45,0.38)" />
        <circle cx="104" cy="308" r="1.3" fill="rgba(220,175,45,0.25)" />
        <circle cx="196" cy="308" r="1.3" fill="rgba(220,175,45,0.25)" />
      </svg>

      {/* ── Text layer — absolutely centred over mandala ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${visible ? 0 : 7}px)`,
          width: 228,
          textAlign: "center",
          pointerEvents: "none",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Sanskrit label */}
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 9.2,
          letterSpacing: "0.22em",
          color: "rgba(255,205,80,0.5)",
          marginBottom: 16,
          textTransform: "uppercase",
        }}>
          {q.sk}
        </div>

        {/* Main quote */}
        <div style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#fef6e0",
          lineHeight: 1.34,
          marginBottom: 12,
          letterSpacing: "0.01em",
          textShadow: "0 0 18px rgba(15,12,50,0.95), 0 0 6px rgba(15,12,50,0.9)",
        }}>
          {q.mq.map((line, i) => (
            <span key={i}>{line}{i < q.mq.length - 1 && <br />}</span>
          ))}
        </div>

        {/* Decorative rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "0 auto 12px", width: 120 }}>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(220,175,45,0.35)" }} />
          <div style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: "rgba(220,175,45,0.65)", flexShrink: 0 }} />
          <div style={{ flex: 1, height: "0.5px", background: "rgba(220,175,45,0.35)" }} />
        </div>

        {/* Sub quote */}
        <div style={{
          fontSize: 13.2,
          fontStyle: "italic",
          color: "rgba(255,195,65,0.58)",
          lineHeight: 1.46,
          letterSpacing: "0.05em",
          textShadow: "0 0 12px rgba(10,9,32,0.95), 0 0 4px rgba(10,9,32,0.8)",
        }}>
          {q.sq.map((line, i) => (
            <span key={i}>{line}{i < q.sq.length - 1 && <br />}</span>
          ))}
        </div>

        {/* Pagination dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 18 }}>
          {quotes.map((_, i) => (
            <div key={i} style={{
              width: 4.5,
              height: 4.5,
              borderRadius: "50%",
              background: i === idx ? "rgba(220,175,45,0.85)" : "rgba(220,175,45,0.22)",
              transform: i === idx ? "scale(1.3)" : "scale(1)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
