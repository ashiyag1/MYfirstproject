import { motion, AnimatePresence } from 'framer-motion'
import { useWisdomCarousel } from '../hooks/useWisdomCarousel'
import SectionHeading from '../components/SectionHeading'
import QuoteBanner from '../components/QuoteBanner'
import chaiImage from '../assets/chai.jpg'
import sitarImage from '../assets/sitar.jpg'
import downloadImage from '../assets/download (1).jpg'
import jaipurImage from '../assets/jaipur1.jpg'
import jasmineImage from '../assets/Disney Princess Aesthetic _ Jasmine.jpg'

/* ─────────────────────────────────────────────────────────────
   SLIDES DATA
   Moved out of Home.jsx — only this component uses it.
   To add a new slide: push a new object into this array.
───────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    tag: '🧘 Yoga & Meditation',
    title: 'Still the mind,\nfree the soul',
    body: '20 minutes of yoga daily lowers cortisol by 33%, rewires the brain for calm, and sharpens focus. India gave this 5,000-year gift to the world.',
    stat: '5,000',
    statLabel: 'years of Indian yoga wisdom',
    image: chaiImage,
  },
  {
    tag: '💧 Water & Prana',
    title: 'Water is life.\nPrana is water.',
    body: 'Charaka Samhita called water the first medicine. Your brain is 75% water — 2% dehydration visibly shrinks focus, mood, and memory.',
    stat: '75%',
    statLabel: 'of your brain is water',
    image: sitarImage,
  },
  {
    tag: '🌙 Sleep & Ayurveda',
    title: "Sleep is\nBrahma's reset",
    body: 'Ancient Ayurveda named sleep (Nidra) as one of the three pillars of health. 7–9 hours nightly repairs DNA and extends life by measurable years.',
    stat: '3×',
    statLabel: 'more productive with quality sleep',
    image: downloadImage,
  },
  {
    tag: '🏃 Movement & Prana',
    title: 'Body in motion,\nsoul in flow',
    body: 'India invented Surya Namaskar — a complete mind-body workout woven into devotion. 30 minutes of daily movement cuts depression risk by 30%.',
    stat: '30 min',
    statLabel: 'changes everything',
    image: jaipurImage,
  },
  {
    tag: '🕉️ Naam Jaap',
    title: 'The vibration\nthat heals',
    body: 'Repeating a sacred name — Ram, Om, Hare Krishna — activates the vagus nerve, lowers blood pressure, and synchronises brainwaves into meditative alpha.',
    stat: '108×',
    statLabel: 'the sacred count of jaap',
    image: jasmineImage,
  },
]

/* ─────────────────────────────────────────────────────────────
   SLIDE CARD
   The frosted glass card rendered on top of each image
───────────────────────────────────────────────────────────── */
function SlideCard({ slide }) {
  return (
    <motion.div
      key={slide.tag}
      initial={{ opacity: 0, rotateY: -20, x: 28 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      exit={{ opacity: 0, rotateY: 14, x: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '100%',
        maxWidth: 700,
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.76)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.2)',
        padding: '2rem 2.2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle horizontal line texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 24,
        opacity: 0.32,
        pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18) 1px, transparent 1px, transparent 26px)',
      }} />

      {/* Faint ॐ watermark */}
      <span style={{
        position: 'absolute',
        top: 10,
        right: 18,
        fontSize: 68,
        color: 'rgba(255,255,255,0.16)',
        fontFamily: 'serif',
        lineHeight: 1,
        pointerEvents: 'none',
      }}>
        ॐ
      </span>

      {/* Card content */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Tag pill */}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 14px',
          borderRadius: 999,
          background: 'transparent',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.7)',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "'Cinzel', serif",
          letterSpacing: '0.05em',
          marginBottom: 14,
          textShadow: '0 1px 8px rgba(0,0,0,0.45)',
        }}>
          {slide.tag}
        </span>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(27px, 5vw, 42px)',
          fontWeight: 600,
          color: '#fff',
          lineHeight: 1.15,
          whiteSpace: 'pre-line',
          marginBottom: 12,
          textShadow: '0 2px 14px rgba(0,0,0,0.5)',
        }}>
          {slide.title}
        </h3>

        {/* Body */}
        <p style={{
          fontSize: 15,
          lineHeight: 1.72,
          color: 'rgba(255,255,255,0.9)',
          fontFamily: "'Lora', serif",
          marginBottom: 16,
          maxWidth: 560,
          textShadow: '0 1px 10px rgba(0,0,0,0.5)',
        }}>
          {slide.body}
        </p>

        {/* Stat */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 36,
            fontWeight: 600,
            color: '#fff',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}>
            {slide.stat}
          </span>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.78)',
            fontFamily: "'Lora', serif",
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}>
            {slide.statLabel}
          </span>
        </div>

      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CAROUSEL CONTROLS
   Prev / dot indicators / Next
───────────────────────────────────────────────────────────── */
function CarouselControls({ total, current, onPrev, onNext, onDot }) {
  const btnStyle = {
    padding: '5px 15px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.52)',
    background: 'rgba(255,255,255,0.26)',
    backdropFilter: 'blur(8px)',
    color: 'white',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'Cinzel', serif",
    cursor: 'pointer',
    letterSpacing: '0.04em',
  }

  return (
    <div style={{
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    }}>
      <button onClick={onPrev} style={btnStyle}>← Prev</button>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            aria-label={`Slide ${i + 1}`}
            className={`fs-slide-dot${i === current ? ' active' : ''}`}
          />
        ))}
      </div>

      <button onClick={onNext} style={btnStyle}>Next →</button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   WISDOM CAROUSEL  (default export)

   Renders:
     1. "Ancient wisdom, modern life." section heading
     2. QuoteBanner (today's rotating quote)
     3. Auto-advancing image carousel with frosted slide cards

   Usage in Home.jsx:
     import WisdomCarousel from '../sections/WisdomCarousel'
     ...
     <WisdomCarousel />
───────────────────────────────────────────────────────────── */
export default function WisdomCarousel() {
  const { slide, goNext, goPrev, goTo } = useWisdomCarousel(SLIDES.length)
  const activeSlide = SLIDES[slide]

  return (
    <section style={{ marginBottom: '4rem' }}>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <SectionHeading
          eyebrow="Today's Wisdom"
          title="Ancient wisdom,"
          accent="modern life."
        />
      </motion.div>

      {/* Daily quote banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        style={{ marginBottom: '1.5rem' }}
      >
        <QuoteBanner />
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          position: 'relative',
          borderRadius: 32,
          overflow: 'hidden',
          minHeight: 420,
          border: '1px solid rgba(165,120,55,0.32)',
          boxShadow: '0 8px 48px rgba(92,61,30,0.16)',
        }}
      >
        {/* Background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${activeSlide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(1.08) brightness(0.82)',
          transition: 'background-image 0.4s ease',
        }} />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(140deg, rgba(22,11,4,0.38) 0%, rgba(27,67,50,0.24) 45%, rgba(92,61,30,0.44) 100%)',
        }} />

        {/* Vertical line texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.28,
          backgroundImage: 'repeating-linear-gradient(to right, rgba(255,255,255,0.28) 0, rgba(255,255,255,0.28) 2px, transparent 2px, transparent 62px)',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(to top, rgba(55,85,115,0.5), transparent)',
        }} />

        {/* Slide card */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: 420,
          padding: '2rem 1rem 5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AnimatePresence mode="wait">
            <SlideCard key={slide} slide={activeSlide} />
          </AnimatePresence>
        </div>

        {/* Controls */}
        <CarouselControls
          total={SLIDES.length}
          current={slide}
          onPrev={goPrev}
          onNext={goNext}
          onDot={goTo}
        />

      </motion.div>
    </section>
  )
}
