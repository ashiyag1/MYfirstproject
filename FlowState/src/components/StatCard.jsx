import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const palette = {
  water:  { bar: 'linear-gradient(90deg, var(--royal), var(--royal-lt))',  top: 'linear-gradient(90deg, var(--royal), var(--royal-lt))' },
  habits: { bar: 'linear-gradient(90deg, var(--emerald), var(--emerald-lt))', top: 'linear-gradient(90deg, var(--emerald), var(--emerald-lt))' },
  streak: { bar: 'linear-gradient(90deg, var(--saffron), var(--gold))',    top: 'linear-gradient(90deg, var(--saffron), var(--gold))' },
  mood:   { bar: 'linear-gradient(90deg, #B08BBF, #D4AADF)',               top: 'linear-gradient(90deg, #B08BBF, #D4AADF)' },
}

export default function StatCard({ type = 'water', emoji, value, unit, label, sub, to, pct, delay = 0 }) {
  const pal = palette[type] || palette.water
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card card-hover relative overflow-hidden p-6"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: pal.top }} />

      {to && (
        <Link to={to} style={{
          position: 'absolute', top: '14px', right: '16px',
          fontSize: '11px', fontWeight: 700,
          color: 'var(--saffron)', textDecoration: 'none',
          fontFamily: 'Lexend', opacity: 0.8,
        }}>
          View →
        </Link>
      )}

      <span style={{ fontSize: '28px', marginBottom: '10px', display: 'block' }}>{emoji}</span>

      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '40px',
        fontWeight: 400,
        lineHeight: 1,
        color: 'var(--ink)',
      }}>
        {value}
        <span style={{ fontSize: '14px', fontWeight: 300, color: 'var(--text-muted)', marginLeft: '4px', fontFamily: 'Lexend' }}>{unit}</span>
      </div>

      <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500, fontFamily: 'Lexend' }}>{label}</div>
      {sub && <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px', fontFamily: 'Lexend' }}>{sub}</div>}

      {pct !== undefined && (
        <div style={{ marginTop: '12px', height: '5px', borderRadius: '99px', background: 'var(--ivory-darker)', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', borderRadius: '99px', background: pal.bar }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, delay: delay + 0.2, ease: 'easeOut' }}
          />
        </div>
      )}
    </motion.div>
  )
}