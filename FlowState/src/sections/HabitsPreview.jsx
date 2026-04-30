import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWellness } from '../context/WellnessContext'
import SectionHeading from '../components/SectionHeading'
import OrnateDivider from '../components/OrnateDivider'

/* ─────────────────────────────────────────────────────────────
   HABIT ROW
   Single habit item — extracted as its own component so it
   can be reused on the /habits page too if needed.
───────────────────────────────────────────────────────────── */
function HabitRow({ habit, done }) {
  return (
    <div className="fs-habit-row">

      {/* Checkbox */}
      <div style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        background: done
          ? 'linear-gradient(135deg, #2D6A4F, #1B4332)'
          : 'transparent',
        border: done
          ? 'none'
          : '2px solid rgba(201,168,76,0.32)',
        color: 'white',
        transition: 'all 0.3s',
        transform: done ? 'scale(1.1)' : 'scale(1)',
      }}>
        {done && '✓'}
      </div>

      {/* Habit name */}
      <span style={{
        flex: 1,
        fontSize: 14,
        fontFamily: "'Lora', serif",
        color: done ? 'rgba(92,61,30,0.38)' : 'var(--bark)',
        textDecoration: done ? 'line-through' : 'none',
      }}>
        {habit.icon} {habit.name}
      </span>

      {/* Done badge */}
      {done && (
        <span style={{
          fontSize: 10,
          color: 'var(--forest-lt)',
          fontWeight: 700,
          fontFamily: "'Cinzel', serif",
          letterSpacing: '0.1em',
        }}>
          done ✦
        </span>
      )}

    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HABITS PREVIEW  (default export)

   Shows the first 5 habits for today with completion state.
   Only renders if the user has at least one habit set up.

   Usage in Home.jsx:
     import HabitsPreview from '../sections/HabitsPreview'
     ...
     <HabitsPreview />
───────────────────────────────────────────────────────────── */
export default function HabitsPreview() {
  const { habits, todayHabitDone } = useWellness()

  // Nothing to show if the user hasn't created habits yet
  if (!habits.length) return null

  const doneCount   = habits.filter(h => todayHabitDone[h.id]).length
  const visibleList = habits.slice(0, 5)
  const remaining   = habits.length - 5

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      style={{ marginBottom: '3.5rem' }}
    >

      <SectionHeading
        eyebrow="Habits & Streaks"
        title="Today's"
        accent="practice."
        accentColor="var(--forest-lt)"
      />
      <OrnateDivider symbol="🌸" />

      {/* Card */}
      <div style={{
        background: 'rgba(253,246,227,0.72)',
        borderRadius: 20,
        border: '1px solid rgba(201,168,76,0.28)',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(92,61,30,0.09)',
      }}>

        {/* Card header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.3rem',
              color: 'var(--bark)',
              fontWeight: 600,
              margin: 0,
            }}>
              Today's Habits
            </h3>
            <p style={{
              fontSize: 11,
              color: 'var(--bark-lt)',
              fontFamily: "'Lora', serif",
              margin: '2px 0 0',
            }}>
              {doneCount} of {habits.length} completed
            </p>
          </div>

          <Link
            to="/habits"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 10,
              color: 'var(--bark-lt)',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              padding: '5px 12px',
              borderRadius: 999,
              border: '1px solid rgba(201,168,76,0.38)',
              background: 'rgba(201,168,76,0.09)',
            }}
          >
            View All →
          </Link>
        </div>

        {/* Habit list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visibleList.map(habit => (
            <HabitRow
              key={habit.id}
              habit={habit}
              done={!!todayHabitDone[habit.id]}
            />
          ))}

          {/* "X more" overflow link */}
          {remaining > 0 && (
            <Link
              to="/habits"
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: 'var(--bark-lt)',
                fontFamily: "'Lora', serif",
                fontStyle: 'italic',
                textDecoration: 'none',
                padding: '6px',
              }}
            >
              +{remaining} more — view all →
            </Link>
          )}
        </div>

      </div>
    </motion.section>
  )
}
