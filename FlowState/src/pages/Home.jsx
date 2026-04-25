import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useWellness } from '../context/WellnessContext'
import { pct as calcPct, INDIA_LEGACY } from '../utils'
import StatCard from '../components/StatCard'
import QuoteBanner from '../components/QuoteBanner'
import PageLayout, { Container } from '../components/PageLayout'
import { useState, useEffect } from 'react'
import peacock from '../assets/peacock.jpg'
import sitar from '../assets/sitar.jpg'
import chai from '../assets/chai.jpg'
import jaipur from '../assets/jaipur1.jpg'

/* ── Banaras / Temple hero images ────────────────────────────── */
const HERO_IMAGES = [
  chai,
  sitar,
  jaipur,
  peacock,
  
  'https://images.unsplash.com/photo-1677478828548-5ad1496a6f14?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

/* ── Wisdom image slides ──────────────────────────────────────── */
const WISDOM_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    tag: '🧘 Yoga & Meditation',
    title: 'Still the mind,\nfree the soul',
    body: '20 minutes of yoga daily lowers cortisol by 33%, rewires the brain for calm, and sharpens focus. India gave this 5,000-year gift to the world.',
    stat: '5,000', statLabel: 'years of Indian yoga wisdom',
  },
  {
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80',
    tag: '💧 Water & Prana',
    title: 'Water is life.\nPrana is water.',
    body: 'Charaka Samhita called water the first medicine. Your brain is 75% water — 2% dehydration visibly shrinks focus, mood, and memory. Drink before you think.',
    stat: '75%', statLabel: 'of your brain is water',
  },
  {
    img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&q=80',
    tag: '🌙 Sleep & Ayurveda',
    title: "Sleep is\nBrahma's reset",
    body: 'Ancient Ayurveda named sleep (Nidra) as one of the three pillars of health. 7–9 hours nightly repairs DNA, consolidates memory, and extends life by measurable years.',
    stat: '3×', statLabel: 'more productive with quality sleep',
  },
  {
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
    tag: '🏃 Movement & Prana',
    title: 'Body in motion,\nsoul in flow',
    body: 'India invented Surya Namaskar — a complete mind-body workout woven into devotion. 30 minutes of daily movement cuts depression risk by 30%.',
    stat: '30 min', statLabel: 'changes everything',
  },
  {
    img: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=900&q=80',
    tag: '🕉️ Naam Jaap',
    title: 'The vibration\nthat heals',
    body: 'Repeating a sacred name — Ram, Om, Hare Krishna — activates the vagus nerve, lowers blood pressure, and synchronises brainwaves into meditative alpha state.',
    stat: '108×', statLabel: 'the sacred count of jaap',
  },
  {
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=80',
    tag: '💤 Rest & Recovery',
    title: 'Stillness is\nnot laziness',
    body: "Ayurveda's concept of Dinacharya — daily rhythm — teaches that scheduled rest is as sacred as action. The body heals in stillness; the mind clears in silence.",
    stat: '8 hrs', statLabel: 'of rest = 10 hrs of peak output',
  },
]

const FEATURES = [
  { to: '/water',   emoji: '💧', title: 'Water Tracker',  desc: 'Log every sip. Watch your progress fill beautifully through the day.',       col: 'from-sky-400/20 to-cyan-300/10',    ring: 'ring-sky-200/50 dark:ring-sky-800/30'   },
  { to: '/habits',  emoji: '📅', title: 'Habit Calendar', desc: 'Build rituals that stick. Track streaks on a beautiful grid calendar.',        col: 'from-emerald-400/20 to-teal-300/10', ring: 'ring-emerald-200/50 dark:ring-emerald-800/30' },
  { to: '/journal', emoji: '📖', title: 'Daily Journal',   desc: 'Capture thoughts, gratitude, and intentions in your calm private space.',      col: 'from-amber-400/20 to-yellow-300/10', ring: 'ring-amber-200/50 dark:ring-amber-800/30' },
  { to: '/quotes',  emoji: '🕉️', title: 'Wisdom Quotes',  desc: 'Fresh quotes from Chanakya, Vivekananda, Gita & Indian sages — daily.',       col: 'from-purple-400/20 to-violet-300/10', ring: 'ring-purple-200/50 dark:ring-purple-800/30' },
]

const sv = (d = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

export default function Home() {
  const { waterGoal, todayTotal, habits, todayHabitDone, getStreak } = useWellness()
  const [heroIdx, setHeroIdx] = useState(0)
  const [slide, setSlide]     = useState(0)
  const [pageDir, setPageDir] = useState(1)
  const [streak, setStreak]   = useState(0)
  const activeWisdom = WISDOM_SLIDES[slide] || WISDOM_SLIDES[0]

  const waterPct  = calcPct(todayTotal, waterGoal)
  const doneCount = habits.filter(h => todayHabitDone[h.id]).length
  const habitPct  = habits.length ? calcPct(doneCount, habits.length) : 0

  useEffect(() => {
    import('../utils').then(({ Store }) => {
      let s = 0
      const d    = new Date()
      const log  = Store.get('water_log')  || {}
      const goal = Store.get('water_goal') || 2500
      for (let i = 0; i < 365; i++) {
        const iso = d.toISOString().slice(0, 10)
        const tot = (log[iso] || []).reduce((a, e) => a + e.ml, 0)
        if (tot >= goal) { s++; d.setDate(d.getDate() - 1) }
        else break
      }
      setStreak(s)
    })
  }, [todayTotal])

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 6000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!WISDOM_SLIDES.length) return undefined
    const t = setInterval(() => setSlide(s => (s + 1) % WISDOM_SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const now = new Date()

  return (
    <PageLayout>

      {/* ══ HERO — Banaras Sunrise ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${src})` }}
            animate={{ opacity: i === heroIdx ? 1 : 0, scale: i === heroIdx ? 1 : 1.035 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-[#1d130c]/60 via-[#2f1b0c]/28 to-[#281507]/68" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,216,140,0.36),transparent_52%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-ivory dark:to-[#120b04]" />

        <div className="relative z-10 max-w-3xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/45
                       bg-[#fbf2e2]/80 dark:bg-[#24170f]/80 px-4 py-1.5 shadow-soft backdrop-blur-md"
          >
            <span className="text-gold text-sm">✦</span>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-ink/80 dark:text-ivory/80">
              INNER PEACE • DAILY PRACTICE
            </p>
            <span className="text-gold text-sm">✦</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mb-4 font-display text-5xl sm:text-6xl md:text-7xl text-ivory leading-[0.92] tracking-[-0.02em] drop-shadow-[0_8px_28px_rgba(30,15,5,0.35)]"
          >
            Flow<span className="text-gold">State</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl mb-3 text-ivory/88 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Flow with Ashiya
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mx-auto max-w-lg text-sm sm:text-base mb-10 text-ivory/68 leading-relaxed"
          >
            A calm dawn for your day - where ancient Indian wellness becomes modern consistency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link
              to="/water"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white
                         bg-gradient-to-r from-saffron to-gold border border-gold/50 shadow-glow-gold
                         hover:-translate-y-0.5 hover:brightness-105 transition-all duration-200"
            >
              💧 Track Water
            </Link>
            <Link
              to="/quotes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold
                         text-ivory border border-ivory/45 bg-white/10 backdrop-blur-sm
                         hover:bg-white/20 hover:border-ivory/70 transition-all duration-200"
            >
              🕉️ Daily Wisdom
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
          className="absolute bottom-7 text-ivory/38 text-[10px] tracking-[0.24em] uppercase z-10"
        >
          your morning sanctuary
        </motion.div>

        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: i === heroIdx ? 26 : 8, background: i === heroIdx ? '#C9933A' : 'rgba(255,248,239,0.45)' }}
            />
          ))}
        </div>
      </section>

      {/* ══ DASHBOARD ══ */}
      <Container className="py-14">

        {/* Stats */}
        <motion.p variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="eyebrow mb-4">
          Today at a glance
        </motion.p>
        <div className="grid grid-cols-2 gap-3 mb-12">
          <StatCard type="water"  emoji="💧" value={todayTotal} unit="ml"   label="Water consumed"   sub={`Goal: ${waterGoal} ml · ${waterPct}%`} to="/water"  pct={waterPct}  delay={0.06} />
          <StatCard type="habits" emoji="✅" value={doneCount}  unit="done" label="Habits completed" sub={`of ${habits.length} today`}             to="/habits" pct={habitPct} delay={0.10} />
          <StatCard type="streak" emoji="🔥" value={streak}     unit="days" label="Hydration streak"  sub="Days you hit your goal"                                              delay={0.14} />
          <motion.div variants={sv(0.18)} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="card-hover p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-orange-300" />
            <span className="text-3xl mb-2 block">🪷</span>
            <div className="font-display text-3xl font-medium text-ink dark:text-sand-lt leading-none">
              {now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-sm text-mist-dark dark:text-ocean-lt/70 mt-1 font-medium">
              {now.toLocaleDateString('en-IN', { weekday: 'long' })}
            </div>
            <div className="text-[11px] text-mist-dark/60 dark:text-ocean-lt/40 mt-0.5">Make today count ✦</div>
          </motion.div>
        </div>

        {/* ── TODAY'S WISDOM section ── */}
        <motion.div variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-3">
          <p className="eyebrow mb-1">✦ Today's Wisdom</p>
          <h2 className="mb-6 font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Lora', serif", fontSize: 'clamp(28px, 5vw, 42px)', color: 'var(--tw-prose-headings, #1C1C1E)' }}>
            Ancient wisdom,{' '}
            <em style={{ color: '#E87722', fontStyle: 'italic' }}>modern life.</em>
          </h2>
        </motion.div>

        {/* Quote banner */}
        <motion.div variants={sv(0.05)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-6">
          <QuoteBanner />
        </motion.div>

        {/* Wisdom image carousel */}
        <motion.div
          variants={sv(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative rounded-[2rem] overflow-hidden mb-16 select-none border border-[#99b9de]/40"
          style={{ minHeight: 430 }}
        >
          {/* Library-style backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#99c6ea] via-[#7caed8] to-[#5e8fbc]" />
          <div
            className="absolute inset-0 opacity-35"
            style={{
              background:
                'repeating-linear-gradient(to right, rgba(255,255,255,0.24) 0, rgba(255,255,255,0.24) 2px, transparent 2px, transparent 64px)',
            }}
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                'radial-gradient(circle at 15% 15%, rgba(255,255,255,0.55), transparent 30%), radial-gradient(circle at 85% 12%, rgba(255,255,255,0.46), transparent 34%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#406487]/55 to-transparent" />

          {/* Page turn card */}
          <div className="relative z-10 min-h-[430px] p-5 sm:p-8 flex items-center justify-center" style={{ perspective: 1400 }}>
            <AnimatePresence mode="wait">
              <motion.article
                key={slide}
                initial={{ opacity: 0, rotateY: pageDir > 0 ? -22 : 22, x: pageDir > 0 ? 30 : -30 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: pageDir > 0 ? 16 : -16, x: pageDir > 0 ? -24 : 24 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-3xl rounded-[1.6rem] border border-[#d4b07b]/65 p-6 sm:p-8 shadow-xl"
                style={{
                  transformStyle: 'preserve-3d',
                  background:
                    'radial-gradient(circle at 15% 12%, rgba(255,247,228,0.9), rgba(243,223,186,0.96) 55%, rgba(231,205,161,0.95) 100%)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-[1.6rem] opacity-40 pointer-events-none"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, rgba(129,84,34,0.08), rgba(129,84,34,0.08) 1px, transparent 1px, transparent 27px)',
                  }}
                />
                <span className="absolute top-4 right-6 text-6xl text-[#8a5a2b]/10 pointer-events-none">ॐ</span>

                <div className="relative z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4"
                    style={{ background: 'rgba(138,90,43,0.12)', color: '#6e4420', border: '1px solid rgba(138,90,43,0.28)' }}
                  >
                    {activeWisdom?.tag || 'Wisdom'}
                  </span>
                  <h3
                    className="mb-3 leading-tight whitespace-pre-line text-[#41270f]"
                    style={{ fontFamily: "'Cormorant Garamond', 'Lora', serif", fontSize: 'clamp(29px, 5vw, 44px)' }}
                  >
                    {activeWisdom?.title || 'Ancient wisdom for modern life'}
                  </h3>
                  <p className="text-[15px] leading-relaxed max-w-2xl mb-5 text-[#53361a]/90">
                    {activeWisdom?.body || 'Wellness facts will appear here.'}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 35, fontWeight: 500, color: '#8a5a2b' }}>
                      {activeWisdom?.stat || '--'}
                    </span>
                    <span className="text-sm font-semibold text-[#6a4a2b]/75">{activeWisdom?.statLabel || 'insight'}</span>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setPageDir(-1)
                setSlide(s => (s - 1 + WISDOM_SLIDES.length) % WISDOM_SLIDES.length)
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/60 bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 transition-all"
            >
              Previous page
            </button>
            <button
              onClick={() => {
                setPageDir(1)
                setSlide(s => (s + 1) % WISDOM_SLIDES.length)
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/60 bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 transition-all"
            >
              Turn page
            </button>
          </div>
        </motion.div>

        {/* Habits preview */}
        {habits.length > 0 && (
          <motion.div variants={sv(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="card p-6 mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl text-ink dark:text-sand-lt">Today's Habits</h2>
                <p className="text-xs text-mist-dark dark:text-ocean-lt/50 mt-0.5">{doneCount} of {habits.length} completed</p>
              </div>
              <Link to="/habits" className="btn-ghost text-xs">Manage →</Link>
            </div>
            <div className="flex flex-col gap-2">
              {habits.slice(0, 5).map(h => {
                const done = !!todayHabitDone[h.id]
                return (
                  <div key={h.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-sand-lt dark:bg-ink border border-ocean-pale dark:border-ocean/10 transition-all">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] flex-shrink-0 transition-all duration-300 ${done ? 'bg-sage text-white scale-110' : 'border-2 border-ocean-pale dark:border-ocean/20'}`}>
                      {done && '✓'}
                    </div>
                    <span className={`text-sm font-medium flex-1 ${done ? 'line-through text-mist-dark dark:text-ocean-lt/40' : 'text-ink dark:text-sand-lt'}`}>
                      {h.icon} {h.name}
                    </span>
                    {done && <span className="text-[11px] text-sage font-bold">done ✦</span>}
                  </div>
                )
              })}
              {habits.length > 5 && (
                <Link to="/habits" className="text-center text-xs text-ocean dark:text-ocean-lt py-1 hover:underline">
                  +{habits.length - 5} more — view all →
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* Feature cards */}
        <motion.div variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="eyebrow mb-2 mt-4">Everything in FlowState</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink dark:text-sand-lt mb-6 font-light">
            Your wellness, <em className="not-italic text-ocean dark:text-ocean-lt">whole.</em>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {FEATURES.map(({ to, emoji, title, desc, col, ring }, i) => (
            <motion.div key={to} variants={sv(i * 0.09)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Link to={to} className={`group block card-hover p-6 relative overflow-hidden ring-1 ${ring} hover:ring-2 transition-all duration-300`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${col} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${col} flex items-center justify-center text-2xl mb-4 ring-1 ${ring}`}>{emoji}</div>
                  <h3 className="font-display text-xl text-ink dark:text-sand-lt mb-1.5">{title}</h3>
                  <p className="text-sm text-mist-dark dark:text-ocean-lt/60 font-light leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-ocean dark:text-ocean-lt group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* India Legacy */}
        <motion.div variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="eyebrow mb-2">भारत का गौरव</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink dark:text-sand-lt mb-6 font-light">
            India's <em className="not-italic text-amber-600 dark:text-amber-400">ancient greatness.</em>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDIA_LEGACY.map((item, i) => (
            <motion.div key={item.title} variants={sv(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="card p-5 hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-display text-lg text-ink dark:text-sand-lt mb-0.5">{item.title}</div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">{item.subtitle}</div>
              <p className="text-sm text-mist-dark dark:text-ocean-lt/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </Container>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-ocean-pale dark:border-ocean/20 mt-16 py-12 text-center px-4">
        <div className="text-4xl mb-3">🪔</div>
        <div className="mb-1" style={{ fontFamily: "'Cormorant Garamond', 'Lora', serif", fontSize: 24, fontWeight: 400, color: 'var(--color-ink)' }}>
          💧 FlowState
        </div>
        <p className="text-sm text-mist-dark dark:text-ocean-lt/60 mb-2"
          style={{ fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
          Flow with Ashiya — Transform ancient wisdom into modern consistency
        </p>
        <p className="text-xs text-mist-dark/55 dark:text-ocean-lt/35 mt-4">
          Made with <span className="text-red-400 text-sm">♥</span> by{' '}
          <span className="font-bold text-ink dark:text-sand-lt">Ashiya</span>
          &nbsp;·&nbsp;
          <span className="font-semibold" style={{ fontFamily: "'Lora', serif" }}>सत्यमेव जयते</span>
        </p>
      </footer>

    </PageLayout>
  )
}