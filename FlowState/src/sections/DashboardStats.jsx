import { motion } from 'framer-motion'
import { useWellness } from '../context/WellnessContext'
import { pct as calcPct } from '../utils'

import StatCard        from '../components/StatCard'
import LotusRow        from '../components/LotusRow'
import FlameRow        from '../components/FlameRow'
import SectionHeading  from '../components/SectionHeading'
import OrnateDivider   from '../components/OrnateDivider'

import copperVesselImg from '../assets/dashboard/copper-vessel.png'
import realLotusImg    from '../assets/dashboard/real-lotus.png'
import realDiyaImg     from '../assets/dashboard/real-diya.png'
import realCalendarImg from '../assets/dashboard/real-calendar.png'

import { useHydrationStreak } from '../hooks/useHydrationStreak'

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANT  (same as before)
─────────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
})

/* ─────────────────────────────────────────────────────────────
   DATE CARD  (unchanged logic, updated icon slot)
─────────────────────────────────────────────────────────────── */
function DateCard() {
  const now     = new Date()
  const day     = now.toLocaleDateString('en-IN', { day: 'numeric' })
  const month   = now.toLocaleDateString('en-IN', { month: 'short' })
  const weekday = now.toLocaleDateString('en-IN', { weekday: 'long' })

  return (
    <div className="fs-dash-card fs-date-card">
      <a
        href="#"
        style={{
          position: 'absolute',
          top: 16,
          right: 18,
          fontFamily: "'Lora', serif",
          fontSize: '0.78rem',
          color: '#7b5ea7',
          textDecoration: 'none',
        }}
      >
        View &rarr;
      </a>
      {/* Calendar icon circle – matches the purple style in the screenshot */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 36% 28%, #f8bfd0 0%, #d06b91 58%, #a95182 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
          flexShrink: 0,
        }}
        className="fs-date-icon"
      >
        <img src={realCalendarImg} alt="Calendar" className="fs-date-icon-img" />
      </div>

      {/* Date */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.35rem',
          fontWeight: 600,
          color: 'var(--bark)',
          lineHeight: 1,
        }}
      >
        {day}{' '}
        <span style={{ fontFamily: "'Lora', serif", fontSize: '1.05rem', fontWeight: 400, color: 'var(--bark-lt)' }}>
          {month}
        </span>
      </div>

      <div style={{ fontFamily: "'Lora', serif", fontSize: '0.86rem', color: 'var(--bark-lt)', marginTop: 4 }}>
        {weekday}
      </div>

      {/* Sankalp */}
      <div style={{ marginTop: 'auto', paddingTop: 14 }}>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.68rem',
            letterSpacing: '0.06em',
            color: '#9b7ebd',
          }}
        >
          Today's Sankalp
        </div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: '0.74rem', color: 'var(--bark-lt)', marginTop: 3 }}>
          Choose peace, choose progress.
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   DASHBOARD STATS  (default export)

   Drop-in replacement for the original DashboardStats.jsx.
   Only the icon slots and bottomSlot props have changed;
   all context, hooks, and animation logic are identical.
─────────────────────────────────────────────────────────────── */
export default function DashboardStats() {
  const { waterGoal, todayTotal, habits, todayHabitDone } = useWellness()
  const streak = useHydrationStreak(todayTotal)

  const waterPct  = calcPct(todayTotal, waterGoal)
  const doneCount = habits.filter(h => todayHabitDone[h.id]).length

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

      <div className="fs-dashboard-stats-grid">

        {/* ── Water ── */}
        <motion.div variants={fadeUp(0.06)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <StatCard
            type="water"
            icon={
              <span className="fs-real-icon fs-real-icon--water">
                <img src={copperVesselImg} alt="Copper water vessel" />
              </span>
            }
            value={todayTotal}
            unit="ml"
            label="Water consumed"
            sub={`Goal: ${waterGoal} ml`}
            to="/water"
            pct={waterPct}
          />
        </motion.div>

        {/* ── Habits ── */}
        <motion.div variants={fadeUp(0.10)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <StatCard
            type="habits"
            icon={
              <span className="fs-real-icon fs-real-icon--lotus">
                <img src={realLotusImg} alt="Pink lotus flower" />
              </span>
            }
            value={doneCount}
            unit={`/ ${habits.length}`}
            label="Habits completed"
            sub="Keep going, you're doing great!"
            to="/habits"
            bottomSlot={<LotusRow done={doneCount} total={habits.length} />}
          />
        </motion.div>

        {/* ── Streak ── */}
        <motion.div variants={fadeUp(0.14)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <StatCard
            type="streak"
            icon={
              <span className="fs-real-icon fs-real-icon--diya">
                <img src={realDiyaImg} alt="Diya oil lamp" />
              </span>
            }
            value={streak}
            unit="days"
            label="Hydration streak"
            sub="Days you hit your goal"
            bottomSlot={<FlameRow count={streak} />}
          />
        </motion.div>

        {/* ── Date ── */}
        <motion.div variants={fadeUp(0.18)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <DateCard />
        </motion.div>

      </div>
    </section>
  )
}
