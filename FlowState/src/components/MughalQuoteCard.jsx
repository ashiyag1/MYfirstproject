import { useState, useEffect } from 'react'

/*
  Shape reference (from the uploaded image):
  ┌──────────────────────────┐
  │   pointed ogee arch top  │  ← comes to a soft point at center-top
  │                          │
  │   straight vertical      │  ← flat left & right walls
  │   rectangle body         │
  │                          │
  │   scalloped / cusped     │  ← 3 small inward scallops at bottom
  └──────────────────────────┘
*/

const MughalQuoteCard = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  const W   = 320   // viewBox width
  const VH  = 540   // viewBox height
  const L   = 18    // left wall x
  const R   = W - L // right wall x  (302)
  const B   = VH - 10  // bottom baseline y  (530)

  // ── Ogee pointed arch top ──────────────────────────────────
  // The arch comes to a point at (W/2, 12).
  // Each side has an S-curve (two quadratic beziers) giving the ogee silhouette.
  // ARCH_FOOT_Y = y where the arch meets the straight walls
  const ARCH_FOOT = 165  // arch joins vertical walls here

  // ── Scalloped bottom (3 bumps going inward / upward) ──────
  // Scallop centres divide the bottom into 4 equal segments
  const SC_Y   = B - 28   // how high the scallop dips up from baseline
  const SC1_X  = L + (R - L) * 0.25   // 25% across  ≈  98
  const SC2_X  = W / 2                 // 50% across  = 160
  const SC3_X  = L + (R - L) * 0.75   // 75% across  ≈  242

  /*
    Full outline path (clockwise from bottom-left):
    1. Bottom-left corner
    2. Scallop 1 (left bump)
    3. Scallop 2 (centre bump)
    4. Scallop 3 (right bump)
    5. Bottom-right corner
    6. Right wall up to arch foot
    7. Ogee right half (S-curve up to apex)
    8. Ogee left half (S-curve down from apex)
    9. Left wall down to arch foot
    Z
  */
  const shape = `
    M ${L} ${B}
    Q ${SC1_X} ${SC_Y} ${(L + SC1_X + (SC2_X - SC1_X) / 2) / 1} ${B}
    Q ${SC1_X} ${SC_Y} ${SC1_X + (SC2_X - SC1_X) / 2} ${B}
    Q ${SC2_X} ${SC_Y} ${SC2_X + (SC3_X - SC2_X) / 2} ${B}
    Q ${SC3_X} ${SC_Y} ${R} ${B}
    L ${R} ${ARCH_FOOT}
    Q ${R} ${ARCH_FOOT - 80} ${W / 2 + 40} ${ARCH_FOOT - 120}
    Q ${W / 2} ${12} ${W / 2 - 40} ${ARCH_FOOT - 120}
    Q ${L} ${ARCH_FOOT - 80} ${L} ${ARCH_FOOT}
    Z
  `

  // Cleaner scallop path built segment by segment
  const bottomScallop = `
    M ${L} ${B}
    Q ${SC1_X} ${SC_Y} ${(SC1_X + SC2_X) / 2} ${B}
    Q ${SC2_X} ${SC_Y} ${(SC2_X + SC3_X) / 2} ${B}
    Q ${SC3_X} ${SC_Y} ${R} ${B}
  `

  // Proper shape using arc-based scallop
  const SHAPE = `
    M ${L} ${B}
    Q ${SC1_X} ${SC_Y + 6} ${(SC1_X + SC2_X)/2} ${B}
    Q ${SC2_X} ${SC_Y}     ${(SC2_X + SC3_X)/2} ${B}
    Q ${SC3_X} ${SC_Y + 6} ${R} ${B}
    L ${R} ${ARCH_FOOT}
    Q ${R}         ${ARCH_FOOT - 72}  ${W/2 + 48} ${ARCH_FOOT - 118}
    Q ${W/2 + 10}  ${14}              ${W/2}       ${12}
    Q ${W/2 - 10}  ${14}              ${W/2 - 48}  ${ARCH_FOOT - 118}
    Q ${L}         ${ARCH_FOOT - 72}  ${L}         ${ARCH_FOOT}
    Z
  `

  // Inner border — inset 13px, same shape
  const I = 13
  const INNER = `
    M ${L+I} ${B - 8}
    Q ${SC1_X} ${SC_Y + 20}          ${(SC1_X+SC2_X)/2} ${B - 8}
    Q ${SC2_X} ${SC_Y + 14}          ${(SC2_X+SC3_X)/2} ${B - 8}
    Q ${SC3_X} ${SC_Y + 20}          ${R-I} ${B - 8}
    L ${R-I} ${ARCH_FOOT + 6}
    Q ${R-I}        ${ARCH_FOOT - 62} ${W/2 + 38} ${ARCH_FOOT - 104}
    Q ${W/2 + 8}    ${28}             ${W/2}       ${26}
    Q ${W/2 - 8}    ${28}             ${W/2 - 38}  ${ARCH_FOOT - 104}
    Q ${L+I}        ${ARCH_FOOT - 62} ${L+I}       ${ARCH_FOOT + 6}
    Z
  `

  return (
    <div style={{
      position: 'relative',
      width: W,
      maxWidth: '100%',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(20px)',
      transition: 'opacity 1.2s ease, transform 1.2s ease',
    }}>

      {/* ── Layer 0 : green fill ── */}
      <svg viewBox={`0 0 ${W} ${VH}`}
        style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', zIndex:0, display:'block' }}>
        <defs>
          <linearGradient id="cg-g" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#175c43"/>
            <stop offset="50%"  stopColor="#0d3b2e"/>
            <stop offset="100%" stopColor="#0a2a1f"/>
          </linearGradient>
          <pattern id="cg-t" patternUnits="userSpaceOnUse" width="19" height="19" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="19" stroke="rgba(201,168,76,0.03)" strokeWidth="1"/>
          </pattern>
          <radialGradient id="cg-r1" cx="25%" cy="10%" r="55%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.18)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <radialGradient id="cg-r2" cx="75%" cy="92%" r="50%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.13)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
        </defs>
        <path d={SHAPE} fill="url(#cg-g)"/>
        <path d={SHAPE} fill="url(#cg-t)"/>
        <path d={SHAPE} fill="url(#cg-r1)"/>
        <path d={SHAPE} fill="url(#cg-r2)"/>
      </svg>

      {/* ── Layer 1 : gold borders & ornaments ── */}
      <svg viewBox={`0 0 ${W} ${VH}`}
        style={{
          position:'absolute', top:0, left:0, width:'100%', height:'100%',
          zIndex:10, pointerEvents:'none',
          filter:'drop-shadow(0 0 10px rgba(201,168,76,0.5))',
        }}>
        <defs>
          <linearGradient id="cg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#e8c97a"/>
            <stop offset="40%"  stopColor="#c9a84c"/>
            <stop offset="100%" stopColor="#8b6914"/>
          </linearGradient>
          <filter id="cg-glow">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feComposite in="SourceGraphic" in2="b" operator="over"/>
          </filter>
        </defs>

        {/* Outer border */}
        <path d={SHAPE} fill="none" stroke="url(#cg-gold)" strokeWidth="2.5" filter="url(#cg-glow)"/>
        {/* Inner border */}
        <path d={INNER} fill="none" stroke="url(#cg-gold)" strokeWidth="1" opacity="0.45"/>

        {/* Keystone gem at arch apex */}
        <circle cx={W/2} cy={12} r="8"  fill="none" stroke="url(#cg-gold)" strokeWidth="1.5"/>
        <circle cx={W/2} cy={12} r="3.5" fill="#c9a84c"/>

        {/* Mini chattri arches where arch meets walls */}
        {[L + 32, R - 32].map((x, i) => (
          <g key={i}>
            <path d={`M ${x-14} ${ARCH_FOOT} Q ${x} ${ARCH_FOOT-26} ${x+14} ${ARCH_FOOT}`}
              fill="none" stroke="url(#cg-gold)" strokeWidth="1.4"/>
            <circle cx={x} cy={ARCH_FOOT-26} r="3" fill="#c9a84c" opacity="0.7"/>
          </g>
        ))}

        {/* Horizontal band just below arch foot */}
        <line x1={L} y1={ARCH_FOOT+22} x2={R} y2={ARCH_FOOT+22}
          stroke="url(#cg-gold)" strokeWidth="0.8" opacity="0.3"/>
        {[55,90,124,W/2,W-124,W-90,W-55].map((x, i) =>
          <circle key={i} cx={x} cy={ARCH_FOOT+22} r="1.4" fill="#c9a84c" opacity="0.3"/>
        )}

        {/* Scallop valley dots (decorative gems at each scallop peak) */}
        {[SC1_X, SC2_X, SC3_X].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={SC_Y + (i===1 ? 0 : 6)} r="4" fill="#c9a84c" opacity="0.55" filter="url(#cg-glow)"/>
          </g>
        ))}

        {/* Side wall mid dots */}
        <circle cx={L-1} cy={(ARCH_FOOT + B)/2} r="4.5" fill="#c9a84c" opacity="0.5" filter="url(#cg-glow)"/>
        <circle cx={R+1} cy={(ARCH_FOOT + B)/2} r="4.5" fill="#c9a84c" opacity="0.5" filter="url(#cg-glow)"/>

        {/* Corner brackets (arch foot) */}
        {[
          `M ${L} ${ARCH_FOOT+48} L ${L} ${ARCH_FOOT+18} L ${L+28} ${ARCH_FOOT+18}`,
          `M ${R} ${ARCH_FOOT+48} L ${R} ${ARCH_FOOT+18} L ${R-28} ${ARCH_FOOT+18}`,
        ].map((d, i) => <path key={i} d={d} fill="none" stroke="url(#cg-gold)" strokeWidth="1.8"/>)}

        {/* Corner brackets (bottom) */}
        {[
          `M ${L} ${B-48} L ${L} ${B-18} L ${L+28} ${B-18}`,
          `M ${R} ${B-48} L ${R} ${B-18} L ${R-28} ${B-18}`,
        ].map((d, i) => <path key={i} d={d} fill="none" stroke="url(#cg-gold)" strokeWidth="1.8"/>)}
      </svg>

      {/* ── Layer 2 : content ── */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        paddingTop: `${(VH / W) * 100}%`,   /* aspect ratio spacer */
      }}>
        <div style={{
          position: 'absolute',
          top:    `${(ARCH_FOOT / VH) * 100 + 3}%`,
          bottom: `${((VH - B) / VH) * 100 + 8}%`,
          left:   '10%',
          right:  '10%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {/* Inner gold border */}
          <div style={{
            position: 'relative',
            border: '1px solid rgba(201,168,76,0.38)',
            borderRadius: 5,
            padding: '1.3rem 1.1rem 1.2rem',
          }}>
            <div style={{ position:'absolute', inset:5, border:'1px solid rgba(201,168,76,0.14)', borderRadius:3, pointerEvents:'none' }}/>

            {/* Corner ornaments */}
            {[
              { top:5, left:5 },
              { top:5, right:5,   transform:'scaleX(-1)' },
              { bottom:5, left:5,  transform:'scaleY(-1)' },
              { bottom:5, right:5, transform:'scale(-1,-1)' },
            ].map((pos, i) => (
              <svg key={i} width="15" height="15" viewBox="0 0 15 15" fill="none"
                style={{ position:'absolute', zIndex:3, ...pos }}>
                <path d="M2 13 L2 3 Q2 2 3 2 L13 2" stroke="#c9a84c" strokeWidth="1.5" opacity="0.65"/>
                <circle cx="2" cy="2" r="1.4" fill="#c9a84c" opacity="0.5"/>
              </svg>
            ))}

            {/* Side dots */}
            {[{ top:'50%', left:-4, transform:'translateY(-50%)' }, { top:'50%', right:-4, transform:'translateY(-50%)' }].map((pos,i) => (
              <div key={i} style={{ position:'absolute', width:7, height:7, borderRadius:'50%', background:'#c9a84c', boxShadow:'0 0 6px rgba(201,168,76,0.7)', zIndex:4, ...pos }}/>
            ))}

            {/* Quote mark */}
            <div style={{
              fontFamily:"'Cinzel',serif", color:'#c9a84c', fontSize:'2rem',
              lineHeight:1, textAlign:'center', marginBottom:'0.2rem',
              textShadow:'0 0 20px rgba(201,168,76,0.7)',
              opacity: visible ? 1 : 0, transition:'opacity 1s ease 0.7s',
            }}>❝</div>

            {/* Quote text */}
            <p style={{
              fontFamily:"'Cormorant Garamond',serif", fontSize:'1.42rem', fontWeight:600,
              color:'#F5EDD8', textAlign:'center', lineHeight:1.42,
              margin:'0.25rem 0 0.65rem', textShadow:'0 2px 14px rgba(0,0,0,0.45)',
            }}>
              Discipline today,<br/>freedom tomorrow.
            </p>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:8, margin:'0.45rem 0 0.7rem' }}>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg, transparent, #8b6914, transparent)' }}/>
              <div style={{ width:6, height:6, background:'#c9a84c', transform:'rotate(45deg)', boxShadow:'0 0 6px #c9a84c' }}/>
              <div style={{ flex:1, height:1, background:'linear-gradient(90deg, transparent, #8b6914, transparent)' }}/>
            </div>

            {/* Sub lines */}
            <div style={{ textAlign:'center' }}>
              {['Small steps.', 'Daily actions.', 'Big transformation.'].map((line, i) => (
                <p key={i} style={{
                  fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', fontWeight:400,
                  color:'#d4c4a0', lineHeight:1.9, letterSpacing:'0.04em',
                  textShadow:'0 1px 8px rgba(0,0,0,0.3)',
                }}>{line}</p>
              ))}
            </div>

            {/* Lotus */}
            <div style={{ display:'flex', justifyContent:'center', marginTop:'0.85rem', filter:'drop-shadow(0 0 8px rgba(201,168,76,0.55))' }}>
              <svg width="46" height="32" viewBox="0 0 52 36" fill="none">
                <defs>
                  <linearGradient id="cg-lot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#e8c97a"/>
                    <stop offset="100%" stopColor="#8b6914"/>
                  </linearGradient>
                </defs>
                <path d="M26 34 Q26 17 26 5 Q26 17 26 34Z"    stroke="url(#cg-lot)" strokeWidth="1.2" fill="none"/>
                <path d="M26 34 Q19 19 23 5 Q25 19 26 34Z"    stroke="url(#cg-lot)" strokeWidth="1"   fill="none" opacity="0.8"/>
                <path d="M26 34 Q33 19 29 5 Q27 19 26 34Z"    stroke="url(#cg-lot)" strokeWidth="1"   fill="none" opacity="0.8"/>
                <path d="M26 30 Q15 23 7 17 Q17 25 26 30Z"    stroke="url(#cg-lot)" strokeWidth="1"   fill="none" opacity="0.7"/>
                <path d="M26 30 Q37 23 45 17 Q35 25 26 30Z"   stroke="url(#cg-lot)" strokeWidth="1"   fill="none" opacity="0.7"/>
                <path d="M26 30 Q9 27 1 25 Q13 29 26 30Z"     stroke="url(#cg-lot)" strokeWidth="1"   fill="none" opacity="0.5"/>
                <path d="M26 30 Q43 27 51 25 Q39 29 26 30Z"   stroke="url(#cg-lot)" strokeWidth="1"   fill="none" opacity="0.5"/>
                <path d="M1 33 Q13.5 30 26 33 Q38.5 30 51 33" stroke="url(#cg-lot)" strokeWidth="1"   fill="none" opacity="0.55"/>
                <circle cx="26" cy="32" r="2" fill="url(#cg-lot)" opacity="0.9"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MughalQuoteCard