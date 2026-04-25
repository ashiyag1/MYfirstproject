import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Droplets } from 'lucide-react'
import { useWellness } from '../context/WellnessContext'
import { pct as calcPct } from '../utils'
import QuoteBanner from '../components/QuoteBanner'
import PageLayout, { Container } from '../components/PageLayout'

/* ── Bottle presets ───────────────────────────────────────── */
const BOTTLES = [
  { label: 'Sip',     ml: 100,  emoji: '🥛' },
  { label: 'Glass',   ml: 200,  emoji: '🥃' },
  { label: 'Small',   ml: 330,  emoji: '🧋' },
  { label: 'Medium',  ml: 500,  emoji: '🍶' },
  { label: 'Sport',   ml: 600,  emoji: '🏃' },
  { label: 'Large',   ml: 750,  emoji: '💪' },
  { label: '1 Litre', ml: 1000, emoji: '🌊' },
  { label: '2 Litre', ml: 2000, emoji: '🌅' },
]

/* ── Animated drop component ──────────────────────────────── */
function WaterDrop({ style }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      initial={{ y: '110vh', opacity: 0, scale: 0.6 }}
      animate={{
        y: '-10vh',
        opacity: [0, 0.45, 0.45, 0],
        scale:   [0.6, 1, 1, 0.8],
        rotate:  [0, 15, -10, 0],
      }}
      transition={{
        duration: style.duration,
        delay:    style.delay,
        repeat:   Infinity,
        ease:     'easeInOut',
      }}
    >
      <svg width={style.size} height={style.size * 1.3} viewBox="0 0 40 52" fill="none">
        <path d="M20 2 C20 2 4 22 4 34 C4 43.9 11.2 50 20 50 C28.8 50 36 43.9 36 34 C36 22 20 2 20 2Z"
          fill={style.color} opacity="0.7" />
        <path d="M14 32 C12 28 14 22 18 20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

/* ── Generate drop config ─────────────────────────────────── */
const DROPS = Array.from({ length: 18 }, (_, i) => ({
  left:     `${Math.random() * 100}%`,
  size:     16 + Math.random() * 20,
  duration: 8 + Math.random() * 12,
  delay:    Math.random() * 14,
  color:    ['#57B8D6', '#2E86AB', '#9FE1CB', '#378ADD', '#B5D4F4'][Math.floor(Math.random() * 5)],
}))

const sv = (d = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

export default function Water() {
  const { waterGoal, setWaterGoal, todayEntries, todayTotal, addWater, removeWater, clearWaterToday, waterLog } = useWellness()
  const [custom, setCustom] = useState('')
  const [goalInput, setGoalInput] = useState(waterGoal)

  const total   = todayTotal
  const waterPct = calcPct(total, waterGoal)
  const rem     = Math.max(0, waterGoal - total)

  const handleGoalChange = (v) => {
    const n = parseInt(v)
    setGoalInput(n)
    if (n >= 500 && n <= 6000) setWaterGoal(n)
  }

  const handleCustomAdd = () => {
    const n = parseInt(custom)
    if (n >= 10 && n <= 3000) { addWater(n, 'Custom'); setCustom('') }
  }

  // Build 7-day history
  const history = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (i + 1))
    const iso = d.toISOString().slice(0, 10)
    const entries = waterLog[iso] || []
    const t = entries.reduce((s, e) => s + e.ml, 0)
    return {
      iso, total: t, pct: calcPct(t, waterGoal),
      label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    }
  })

  return (
    <PageLayout>
      <div className="relative min-h-screen overflow-hidden">

        {/* ── ANIMATED WATER DROPS BACKGROUND ── */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Deep ocean gradient base */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #EBF8FF 0%, #DBEEFF 40%, #EBF8FF 100%)' }}
            />
          <div className="dark:block hidden absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d2440 40%, #0a1628 100%)' }} />
          {/* Floating drops */}
          {DROPS.map((d, i) => <WaterDrop key={i} style={d} />)}
          {/* Ripple circles at bottom */}
          {[1,2,3].map(n => (
            <motion.div key={n}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-ocean/20 dark:border-ocean-lt/15"
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: n * 260, height: n * 130, opacity: 0 }}
              transition={{ duration: 4, delay: n * 1.2, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
        </div>

        <Container className="pt-28 pb-20">

          {/* Header */}
          <motion.div variants={sv(0)} initial="hidden" animate="show" className="mb-8">
            <p className="eyebrow mb-2" style={{ color: '#2E86AB' }}>Daily hydration</p>
            <h1 className="mb-2 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Lora', serif", fontSize: 'clamp(36px, 7vw, 56px)', fontWeight: 300, color: '#0D1F2D' }}>
              Water <em style={{ fontStyle: 'italic', color: '#2E86AB' }}>Dashboard</em>
            </h1>
            <p className="text-sm text-mist-dark dark:text-ocean-lt/60 max-w-sm">
              <em style={{ fontFamily: "'Lora', serif" }}>"जलमेव जीवनम्"</em> — Charaka said: water is the first medicine.
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div variants={sv(0.05)} initial="hidden" animate="show" className="mb-8">
            <QuoteBanner />
          </motion.div>

          {/* Goal */}
          <motion.div variants={sv(0.1)} initial="hidden" animate="show"
            className="card p-4 mb-6 flex flex-wrap items-center gap-4">
            <label className="text-sm font-bold text-ocean dark:text-ocean-lt">🎯 Daily Goal</label>
            <input type="number" value={goalInput} min={500} max={6000} step={50}
              onChange={e => handleGoalChange(e.target.value)}
              className="w-28 px-3 py-2 rounded-xl border border-ocean-pale dark:border-ocean/30 bg-sand-lt dark:bg-ink text-ink dark:text-sand-lt font-bold text-center text-sm outline-none focus:ring-2 focus:ring-ocean/30 transition-all" />
            <span className="text-sm text-mist-dark dark:text-ocean-lt/60 font-medium">ml / day</span>
            <span className="text-xs text-mist-dark/60 dark:text-ocean-lt/40 italic">Recommended: 2000–3000 ml</span>
          </motion.div>

          {/* Progress hero */}
          <motion.div variants={sv(0.15)} initial="hidden" animate="show"
            className="relative rounded-3xl overflow-hidden mb-6 p-7 sm:p-10"
            style={{ background: 'linear-gradient(160deg, #0C447C 0%, #1AA3E8 55%, #3A8C4C 100%)' }}>
            <div className="absolute top-4 right-6 font-display text-6xl font-light text-white/12"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>{waterPct}%</div>

            {/* Wave animation at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden opacity-20">
              <motion.div animate={{ x: [0, -40, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="flex" style={{ width: '200%' }}>
                <svg viewBox="0 0 200 20" className="w-1/2" preserveAspectRatio="none">
                  <path d="M0,10 C30,0 70,20 100,10 C130,0 170,20 200,10 L200,20 L0,20Z" fill="white"/>
                </svg>
                <svg viewBox="0 0 200 20" className="w-1/2" preserveAspectRatio="none">
                  <path d="M0,10 C30,0 70,20 100,10 C130,0 170,20 200,10 L200,20 L0,20Z" fill="white"/>
                </svg>
              </motion.div>
            </div>

            <div className="relative z-10">
              <p className="text-white/55 text-sm font-semibold mb-1">consumed today</p>
              <div className="font-light leading-none mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 10vw, 88px)', color: '#fff' }}>
                {total}<span className="text-2xl font-light opacity-65 ml-2">ml</span>
              </div>
              <p className="text-white/60 text-sm mb-6">
                {rem > 0 ? `${rem} ml remaining — you're doing great!` : '🎉 Goal crushed! Amazing work today.'}
              </p>
              <div className="h-3.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <motion.div className="h-full rounded-full relative overflow-hidden"
                  initial={{ width: 0 }} animate={{ width: waterPct + '%' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.65), #fff)' }}>
                  <motion.div className="absolute inset-0"
                    animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
                </motion.div>
              </div>
              <div className="flex justify-between text-white/38 text-xs font-semibold mt-1.5">
                <span>0 ml</span><span>{waterGoal} ml</span>
              </div>
            </div>

            {waterPct >= 100 && (
              <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
                className="absolute top-5 left-6 text-4xl">🎊</motion.div>
            )}
          </motion.div>

          {/* Bottle grid */}
          <motion.div variants={sv(0.2)} initial="hidden" animate="show" className="mb-6">
            <p className="eyebrow mb-4">⚡ Quick add — tap a bottle</p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {BOTTLES.map(b => (
                <motion.button key={b.ml}
                  whileTap={{ scale: 0.88 }} whileHover={{ y: -4, scale: 1.04 }}
                  onClick={() => addWater(b.ml, b.label)}
                  className="card p-3 flex flex-col items-center gap-1.5 cursor-pointer
                             border-2 border-transparent hover:border-ocean/30 dark:hover:border-ocean-lt/20
                             transition-all duration-200 hover:shadow-md">
                  <span className="text-2xl">{b.emoji}</span>
                  <span className="text-[10px] font-bold text-center leading-tight text-mist-dark dark:text-ocean-lt/60">{b.label}</span>
                  <span className="text-[10px] font-bold text-ocean dark:text-ocean-lt">{b.ml}ml</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Custom add */}
          <motion.div variants={sv(0.25)} initial="hidden" animate="show" className="card p-5 mb-6">
            <p className="eyebrow mb-4">✏️ Custom amount</p>
            <div className="flex gap-3">
              <input type="number" value={custom} placeholder="Enter ml (e.g. 450)"
                onChange={e => setCustom(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCustomAdd()}
                className="flex-1 px-4 py-3 rounded-xl border border-ocean-pale dark:border-ocean/30 bg-sand-lt dark:bg-ink text-ink dark:text-sand-lt font-semibold text-sm outline-none focus:ring-2 focus:ring-ocean/30 transition-all"
                min={10} max={3000} />
              <motion.button whileTap={{ scale: 0.96 }} onClick={handleCustomAdd}
                className="btn-primary flex items-center gap-2 px-6">
                <Plus size={16} /> Add
              </motion.button>
            </div>
          </motion.div>

          {/* Today's log */}
          <motion.div variants={sv(0.3)} initial="hidden" animate="show" className="card p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl text-ink dark:text-sand-lt">Today's log</h2>
                <p className="text-xs text-mist-dark dark:text-ocean-lt/50 mt-0.5">
                  {todayEntries.length} entries · {total} ml total
                </p>
              </div>
              {todayEntries.length > 0 && (
                <button onClick={clearWaterToday}
                  className="text-xs font-bold px-3 py-1.5 rounded-full bg-sand-lt dark:bg-ink border border-ocean-pale dark:border-ocean/20 text-mist-dark dark:text-ocean-lt/60 hover:border-red-300 hover:text-red-500 transition-all">
                  Clear all
                </button>
              )}
            </div>
            {todayEntries.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">💧</div>
                <p className="text-sm text-mist-dark dark:text-ocean-lt/50">No entries yet — tap a bottle above!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                <AnimatePresence>
                  {[...todayEntries].reverse().map((e) => (
                    <motion.div key={e.id}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sand-lt dark:bg-ink border border-ocean-pale dark:border-ocean/15">
                      <div className="w-2 h-2 rounded-full bg-ocean flex-shrink-0" />
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold"
                        style={{ background: 'rgba(46,134,171,0.12)', color: '#0C6BA3' }}>
                        +{e.ml} ml
                      </span>
                      <span className="text-sm font-medium flex-1 text-mist-dark dark:text-ocean-lt/70">{e.label}</span>
                      <span className="text-xs text-mist-dark/60 dark:text-ocean-lt/40">{e.time}</span>
                      <button onClick={() => removeWater(e.id)}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* 7-day history */}
          <motion.div variants={sv(0.35)} initial="hidden" animate="show">
            <p className="eyebrow mb-4">📊 Last 7 days</p>
            <div className="space-y-3">
              {history.map((d, i) => (
                <motion.div key={d.iso} variants={sv(i * 0.04)} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-ink dark:text-sand-lt">{d.label}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg text-ocean dark:text-ocean-lt font-medium">{d.total} ml</span>
                      {d.pct >= 100 && <span>✅</span>}
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-ocean-pale dark:bg-ocean/15">
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }} whileInView={{ width: d.pct + '%' }}
                      viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 }}
                      style={{ background: 'linear-gradient(90deg, #1AA3E8, #57B8D6)' }} />
                  </div>
                  <div className="text-xs mt-1 font-semibold text-mist-dark/60 dark:text-ocean-lt/40">{d.pct}% of goal</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </Container>
      </div>
    </PageLayout>
  )
}