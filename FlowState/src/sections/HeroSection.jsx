import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import background from '../assets/backdrophome.png'
import MandalaQuoteCard from '../components/MandalaQuoteCard'

/* ─────────────────────────────────────────────────────────────
   PETAL CONFIG
   Moved here from Home.jsx — only the hero uses petals
───────────────────────────────────────────────────────────── */
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3) % 100}%`,
  size: 9 + (i % 5) * 2.5,
  dur: 8 + (i % 4) * 2.5,
  delay: (i * 1.3) % 10,
  color: i % 3 === 0 ? '#D4607A' : i % 3 === 1 ? '#E87722' : '#c9a84c',
  opacity: 0.45 + (i % 3) * 0.18,
}))

/* ─────────────────────────────────────────────────────────────
   MANDALA SVG — inline so it doesn't need a separate asset
───────────────────────────────────────────────────────────── */
function MandalaSVG() {
  return (
    <svg viewBox="0 0 360 360" fill="none" style={{ width: '100%', height: '100%' }}>
      {[0, 30, 60, 90, 120, 150].map(r => (
        <g key={r} transform={`rotate(${r} 180 180)`}>
          <ellipse cx="180" cy="90" rx="20" ry="90" stroke="#c9a84c" strokeWidth="1" />
        </g>
      ))}
      <circle cx="180" cy="180" r="160" stroke="#c9a84c" strokeWidth="0.8" />
      <circle cx="180" cy="180" r="110" stroke="#c9a84c" strokeWidth="0.5" />
      <circle cx="180" cy="180" r="60"  stroke="#c9a84c" strokeWidth="0.8" />
      <circle cx="180" cy="180" r="18"  fill="#c9a84c" opacity="0.3" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   FLOATING PETALS
───────────────────────────────────────────────────────────── */
function FloatingPetals() {
  return (
    <>
      {PETALS.map(p => (
        <div
          key={p.id}
          className="fs-petal"
          style={{
            left: p.left,
            top: '-40px',
            width: p.size,
            height: p.size * 0.65,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            filter: 'blur(0.4px)',
          }}
        />
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO TEXT BLOCK
───────────────────────────────────────────────────────────── */
function HeroText() {
  const headingStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2.8rem, 7.5vw, 5.2rem)',
    fontWeight: 600,
    lineHeight: 0.95,
    color: '#FDF6E3',
    textShadow: '0 4px 30px rgba(16,6,2,0.5)',
    letterSpacing: '-0.01em',
  }

  return (
    <div style={{ flex: '1 1 320px', maxWidth: 580, textAlign: 'center' }}>

      {/* Hindi pill badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 18px',
          borderRadius: 999,
          background: 'rgba(253,246,227,0.13)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201,168,76,0.42)',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ color: '#e8c97a', fontSize: 11 }}>✦</span>
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 10,
          letterSpacing: '0.22em',
          color: 'rgba(253,246,227,0.85)',
          textTransform: 'uppercase',
        }}>
          जल ही जीवन है
        </span>
        <span style={{ color: '#e8c97a', fontSize: 11 }}>✦</span>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.08 }}
      >
        <div style={headingStyle}>Rooted in</div>
        <div style={{
          ...headingStyle,
          fontWeight: 700,
          color: '#E87722',
          textShadow: '0 0 40px rgba(232,119,34,0.55), 0 4px 24px rgba(16,6,2,0.4)',
          fontStyle: 'italic',
          marginBottom: '0.25rem',
        }}>
          Ritual.
        </div>
        <div style={{ ...headingStyle, marginBottom: '1.3rem' }}>Living in Flow.</div>
      </motion.div>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28 }}
        style={{
          fontFamily: "'Lora', serif",
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: 'rgba(253,246,227,0.7)',
          lineHeight: 1.65,
          maxWidth: 460,
          margin: '0 auto 2rem',
        }}
      >
        Ancient wisdom. Modern rhythm.<br />
        Daily practices to heal your mind, body &amp; soul.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}
      >
        <Link
          to="/water"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 26px',
            borderRadius: 999,
            fontFamily: "'Cinzel', serif",
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'white',
            letterSpacing: '0.08em',
            background: 'linear-gradient(135deg, #E87722 0%, #c9600a 100%)',
            border: '1px solid rgba(232,119,34,0.55)',
            boxShadow: '0 4px 20px rgba(232,119,34,0.42), inset 0 1px 0 rgba(255,255,255,0.14)',
            textDecoration: 'none',
          }}
        >
          💧 Track Water
        </Link>

        <Link
          to="/quotes"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 26px',
            borderRadius: 999,
            fontFamily: "'Cinzel', serif",
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'rgba(253,246,227,0.9)',
            letterSpacing: '0.08em',
            background: 'rgba(253,246,227,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,168,76,0.48)',
            textDecoration: 'none',
          }}
        >
          🕉️ Daily Wisdom
        </Link>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          fontFamily: "'Lora', serif",
          fontStyle: 'italic',
          fontSize: '0.78rem',
          color: 'rgba(253,246,227,0.38)',
          letterSpacing: '0.1em',
          marginTop: '0.8rem',
        }}
      >
        ✦ Your morning sanctuary ✦
      </motion.p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION  (default export)
   
   Usage in Home.jsx:
     import HeroSection from '../sections/HeroSection'
     ...
     <HeroSection />
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#160b04',
    }}>

      {/* Background photo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        filter: 'brightness(0.8) saturate(1.2)',
      }} />

      {/* Layered overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(16,7,2,0.52) 0%, rgba(35,16,4,0.25) 35%, rgba(25,10,3,0.6) 75%, rgba(253,246,227,0) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 8%, rgba(255,210,100,0.36) 0%, rgba(232,119,34,0.16) 28%, transparent 56%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '30%', background: 'linear-gradient(90deg, rgba(12,5,1,0.65) 0%, transparent 100%)' }} />
      {/* Fade into parchment below */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, transparent, #FDF6E3)' }} />

      {/* Floating petals */}
      <FloatingPetals />

      {/* Spinning mandala watermark */}
      <div
        className="fs-mandala-spin"
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 360,
          height: 360,
          opacity: 0.055,
          pointerEvents: 'none',
        }}
      >
        <MandalaSVG />
      </div>

      {/* Hero content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: 1180,
        margin: '0 auto',
        padding: '5rem 1.5rem 3.5rem',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
        }}>
          <HeroText />

          {/* Mandala quote card — right side */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', marginLeft: '4.6rem' }}
          >
            <MandalaQuoteCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
