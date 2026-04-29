import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────
   StatCard.jsx
   A single dashboard stat tile.

   Props
   ─────
   icon      ReactNode   Custom SVG icon to render at the top
                         (replaces the old emoji prop for water /
                          streak / habits cards). Falls back to
                          the `emoji` prop if provided.
   emoji     string      Fallback plain emoji (kept for compat)
   type      string      'water' | 'habits' | 'streak' | other
   value     number
   unit      string
   label     string
   sub       string      small subtitle line
   to        string      react-router path → renders "View →" link
   pct       number      0-100, renders progress bar when provided
   bottomSlot ReactNode  anything to render pinned at the bottom
                         (e.g. lotus row, flame row)
   delay     number      framer-motion stagger delay (unused here,
                         parent handles motion wrapper)
─────────────────────────────────────────────────────────────── */
export default function StatCard({
  icon,
  emoji,
  type,
  value,
  unit,
  label,
  sub,
  to,
  pct,
  bottomSlot,
}) {
  return (
    <div className="fs-dash-card" style={{ display: 'flex', flexDirection: 'column' }}>

      {/* "View →" link – top-right */}
      {to && (
        <Link
          to={to}
          style={{
            position: 'absolute',
            top: 16,
            right: 18,
            fontFamily: "'Lora', serif",
            fontSize: '0.78rem',
            color: type === 'streak' ? 'var(--gold)' : 'var(--sage)',
            textDecoration: 'none',
          }}
        >
          View →
        </Link>
      )}

      {/* Icon area */}
      <div style={{ marginBottom: 4, flexShrink: 0 }}>
        {icon ?? (emoji && <span style={{ fontSize: '2rem' }}>{emoji}</span>)}
      </div>

      {/* Primary value */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.15rem',
          fontWeight: 600,
          color: 'var(--bark)',
          lineHeight: 1,
        }}
      >
        {value}{' '}
        <span
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '1rem',
            fontWeight: 400,
            color: 'var(--bark-lt)',
          }}
        >
          {unit}
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.9rem',
          color: 'var(--bark-lt)',
          marginTop: 3,
        }}
      >
        {label}
      </div>

      {/* Sub text */}
      {sub && (
        <div
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '0.76rem',
            color: 'var(--bark-xlt)',
            marginTop: 5,
          }}
        >
          {sub}
        </div>
      )}

      {/* Progress bar (water card) */}
      {pct !== undefined && (
        <div style={{ marginTop: 'auto', paddingTop: 12 }}>
          <div
            style={{
              height: 6,
              background: 'var(--cream-dark, #e8dcc8)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                background: '#5b9bd5',
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              fontSize: '0.6rem',
              color: '#5b9bd5',
              textAlign: 'right',
              marginTop: 2,
              fontFamily: "'Lora', serif",
            }}
          >
            {pct}%
          </div>
        </div>
      )}

      {/* Bottom slot – lotus row, flame row, etc. */}
      {bottomSlot && (
        <div style={{ marginTop: pct !== undefined ? 6 : 'auto', paddingTop: 8 }}>
          {bottomSlot}
        </div>
      )}
    </div>
  )
}
