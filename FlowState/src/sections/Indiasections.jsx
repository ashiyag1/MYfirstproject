import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { INDIA_LEGACY } from '../utils'
import SectionHeading from '../components/SectionHeading'
import OrnateDivider from '../components/OrnateDivider'

/* ─────────────────────────────────────────────────────────────
   FEATURES DATA
   Moved out of Home.jsx — only this component reads it.
   To add a new feature page: push a new object here.
───────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    to: '/water',
    emoji: '💧',
    title: 'Water Tracker',
    desc: 'Log every sip. Watch your progress fill beautifully through the day.',
    accent: '#7EC8E3',
  },
  {
    to: '/habits',
    emoji: '📅',
    title: 'Habit Calendar',
    desc: 'Build rituals that stick. Track streaks on a beautiful grid calendar.',
    accent: '#2D6A4F',
  },
  {
    to: '/journal',
    emoji: '📖',
    title: 'Daily Journal',
    desc: 'Capture thoughts, gratitude, and intentions in your calm private space.',
    accent: '#E87722',
  },
  {
    to: '/quotes',
    emoji: '🕉️',
    title: 'Wisdom Quotes',
    desc: 'Fresh quotes from Chanakya, Vivekananda, Gita & Indian sages — daily.',
    accent: '#c9a84c',
  },
]

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANT
───────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
})

/* ─────────────────────────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────────────────────────── */
function FeatureCard({ to, emoji, title, desc, accent }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div className="fs-feature-card">
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }} />
        <div style={{
          width: 46, height: 46, borderRadius: 13, marginBottom: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
          background: `${accent}1a`,
          border: `1px solid ${accent}38`,
        }}>
          {emoji}
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.2rem', fontWeight: 600,
          color: 'var(--bark)', marginBottom: 6,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 12.5, color: 'var(--bark-lt)',
          fontFamily: "'Lora', serif", lineHeight: 1.62, marginBottom: 10,
        }}>
          {desc}
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 10, fontWeight: 700, color: accent,
          fontFamily: "'Cinzel', serif", letterSpacing: '0.08em',
        }}>
          Explore <ArrowRight size={10} />
        </div>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────
   LEGACY CARD
───────────────────────────────────────────────────────────── */
function LegacyCard({ item }) {
  return (
    <div className="fs-legacy-card">
      <div style={{ fontSize: '2rem', marginBottom: 9 }}>{item.icon}</div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.12rem', fontWeight: 600,
        color: 'var(--bark)', marginBottom: 3,
      }}>
        {item.title}
      </div>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '0.62rem', fontWeight: 700,
        color: '#d97706', textTransform: 'uppercase',
        letterSpacing: '0.12em', marginBottom: 7,
      }}>
        {item.subtitle}
      </div>
      <p style={{
        fontSize: 12.5, color: 'var(--bark-lt)',
        lineHeight: 1.65, fontFamily: "'Lora', serif",
      }}>
        {item.desc}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SANSKRIT BANNER
───────────────────────────────────────────────────────────── */
function SanskritBanner() {
  return (
    <div className="fs-sanskrit-banner" style={{ marginTop: '3.5rem' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem', color: '#e8c97a',
          fontStyle: 'italic', letterSpacing: '0.05em',
        }}>
          स्वस्थस्य स्वास्थ्यं रक्षणं, आतुरस्य विकार प्रशमनम् ।
        </p>
        <p style={{
          fontSize: 11, color: 'rgba(201,168,76,0.58)',
          marginTop: 4, fontFamily: "'Lora', serif", fontStyle: 'italic',
        }}>
          The wise protect their health; the sick seek to cure.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      marginTop: '3rem', padding: '3rem 1.5rem',
      borderTop: '1px solid rgba(201,168,76,0.22)',
      textAlign: 'center',
      background: 'linear-gradient(180deg, transparent, rgba(239,217,168,0.45))',
    }}>
      <div style={{ fontSize: '2.4rem', marginBottom: 10 }}>🪔</div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.55rem', fontWeight: 500,
        color: 'var(--bark)', marginBottom: 5,
      }}>
        💧 FlowState
      </div>
      <p style={{
        fontFamily: "'Lora', serif", fontStyle: 'italic',
        fontSize: 13, color: 'var(--bark-lt)', marginBottom: 4,
      }}>
        Flow with Ashiya — Transform ancient wisdom into modern consistency
      </p>
      <p style={{ fontSize: 11, color: 'rgba(92,61,30,0.38)', marginTop: 12 }}>
        Made with{' '}
        <span style={{ color: '#D4607A', fontSize: 13 }}>♥</span>
        {' '}by{' '}
        <strong style={{ color: 'var(--bark)' }}>Ashiya</strong>
        {' · '}
        <span style={{
          fontFamily: "'Lora', serif", fontStyle: 'italic',
          fontWeight: 500, color: 'var(--gold-dim)',
        }}>
          सत्यमेव जयते
        </span>
      </p>
      <p style={{
        fontSize: 10, color: 'rgba(92,61,30,0.28)', marginTop: 5,
        fontFamily: "'Cinzel', serif", letterSpacing: '0.15em',
      }}>
        © {year} FLOWSTATE · MADE IN INDIA
      </p>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────
   INDIA SECTIONS  (default export)

   Renders three sub-sections at the bottom of the home page:
     1. "Your wellness, whole."     — feature cards grid
     2. "India's ancient greatness." — legacy knowledge cards
     3. Sanskrit banner + footer

   Usage in Home.jsx:
     import IndiaSections from '../sections/IndiaSections'
     ...
     <IndiaSections />
───────────────────────────────────────────────────────────── */
export default function IndiaSections() {
  return (
    <>
      {/* ── Feature cards ── */}
      <section style={{ marginBottom: '4rem' }}>
        <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading eyebrow="Everything in FlowState" title="Your wellness," accent="whole." />
        </motion.div>
        <OrnateDivider symbol="🕉️" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {FEATURES.map((feature, i) => (
            <motion.div key={feature.to} variants={fadeUp(i * 0.08)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── India legacy ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading eyebrow="भारत का गौरव" title="India's" accent="ancient greatness." accentColor="#d97706" />
        </motion.div>
        <OrnateDivider symbol="🪔" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {(INDIA_LEGACY || []).map((item, i) => (
            <motion.div key={item.title} variants={fadeUp(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <LegacyCard item={item} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Sanskrit banner + footer ── */}
      <SanskritBanner />
      <Footer />
    </>
  )
}