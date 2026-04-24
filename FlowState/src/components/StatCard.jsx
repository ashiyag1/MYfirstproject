import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const accents = {
  water:  'from-ocean to-ocean-lt',
  habits: 'from-sage to-sage-lt',
  streak: 'from-gold to-gold-lt',
  mood:   'from-purple-400 to-pink-300',
}

export default function StatCard({ type = 'water', emoji, value, unit, label, sub, to, pct, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card-hover relative overflow-hidden p-6"
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accents[type] || accents.water}`} />

      {to && (
        <Link to={to} className="absolute top-4 right-4 text-[11px] font-bold text-ocean-lt/70 hover:text-ocean-lt transition-colors">
          View →
        </Link>
      )}

      <span className="text-3xl mb-3 block">{emoji}</span>

      <div className="font-display text-4xl font-medium text-ink dark:text-sand-lt leading-none">
        {value}
        <span className="text-base font-light text-mist-dark dark:text-ocean-lt ml-1">{unit}</span>
      </div>

      <div className="text-sm text-mist-dark dark:text-ocean-lt/80 mt-1 font-medium">{label}</div>
      {sub && <div className="text-[11px] text-mist-dark/70 dark:text-ocean-lt/50 mt-0.5">{sub}</div>}

      {pct !== undefined && (
        <div className="mt-3 h-1.5 rounded-full bg-ocean-pale dark:bg-ocean/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${accents[type] || accents.water}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
          />
        </div>
      )}
    </motion.div>
  )
}