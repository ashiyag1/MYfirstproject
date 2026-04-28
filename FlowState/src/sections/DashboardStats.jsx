import { motion } from 'framer-motion'
import { useWellness } from '../context/WellnessContext'
import { pct as calcPct } from '../utils'
import StatCard from '../components/StatCard'
import SectionHeading from '../components/SectionHeading'
import OrnateDivider from '../components/OrnateDivider'
import { useHydrationStreak } from '../hooks/useHydrationStreak'

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANT
   Shared fade-up used by every card
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
   DATE CARD
   Standalone so it's easy to restyle independently
───────────────────────────────────────────────────────────── */
function DateCard() {
  const now = new Date()
  const date = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  const weekday = now.toLocaleDateString('en-IN', { weekday: 'long' })

  return (
    <div
      className="fs-dash-card"
      style={{ minHeight: 120 }}
    >
      <div style={{ fontSize: '2rem', marginBottom: 6 }}>🪷</div>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '2rem',
        fontWeight: 500,
        color: 'var(--bark)',
        lineHeight: 1,
      }}>
        {date}
      </div>

      <div style={{
        fontFamily: "'Lora', serif",
        fontSize: '0.85rem',
        color: 'var(--bark-lt)',
        marginTop: 4,
      }}>
        {weekday}
      </div>

      <div style={{
        fontSize: '0.65rem',
        color: 'var(--gold-dim)',
        marginTop: 5,
        fontFamily: "'Cinzel', serif",
        letterSpacing: '0.1em',
      }}>
        Make today count ✦
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   DASHBOARD STATS  (default export)

   Renders the "Today at a Glance" section:
     - Water consumed StatCard
     - Habits completed StatCard
     - Hydration streak StatCard
     - Date card

   Usage in Home.jsx:
     import DashboardStats from '../sections/DashboardStats'
     ...
     <DashboardStats />
───────────────────────────────────────────────────────────── */
export default function DashboardStats() {
  const { waterGoal, todayTotal, habits, todayHabitDone } = useWellness()
  const streak = useHydrationStreak(todayTotal)

  const waterPct = calcPct(todayTotal, waterGoal)
  const doneCount = habits.filter(h => todayHabitDone[h.id]).length
  const habitPct  = habits.length ? calcPct(doneCount, habits.length) : 0

  return (
    <section style={{ marginBottom: '3.5rem' }}>

      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <SectionHeading
          eyebrow="Today at a Glance"
          title="Your day,"
          accent="beautifully tracked."
        />
      </motion.div>

      <OrnateDivider />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>

        {/* Water */}
        <motion.div variants={fadeUp(0.06)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <StatCard
            type="water"
            emoji="💧"
            value={todayTotal}
            unit="ml"
            label="Water consumed"
            sub={`Goal: ${waterGoal} ml · ${waterPct}%`}
            to="/water"
            pct={waterPct}
            delay={0.06}
          />
        </motion.div>

        {/* Habits */}
        <motion.div variants={fadeUp(0.10)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <StatCard
            type="habits"
            emoji="✅"
            value={doneCount}
            unit="done"
            label="Habits completed"
            sub={`of ${habits.length} today`}
            to="/habits"
            pct={habitPct}
            delay={0.10}
          />
        </motion.div>

        {/* Streak */}
        <motion.div variants={fadeUp(0.14)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <StatCard
            type="streak"
            emoji="🔥"
            value={streak}
            unit="days"
            label="Hydration streak"
            sub="Days you hit your goal"
            delay={0.14}
          />
        </motion.div>

        {/* Date */}
        <motion.div variants={fadeUp(0.18)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <DateCard />
        </motion.div>

      </div>
    </section>
  )
}
