import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useWellness } from '../context/WellnessContext'
import QuoteBanner from '../components/QuoteBanner'
import PageLayout, { Container } from '../components/PageLayout'

const ICONS = ['🏃','🧘','💧','📖','🌿','🍎','🏋️','✍️','🎨','🎵','🌅','🚴','🧠','💊','🥗','🛌','🧹','🌸','☀️','🦋','🎯','🏊','🍵','🛁','🌙','💪','📝','🌱','🦷','🕉️','🙏','🪷','🔥','⭐','📚','🎧']
const HABIT_COLORS = ['#E8D5A8','#B8DFC0','#A8C8D0','#D4B8D8','#F0C8A0','#C8D4B0','#F0D0C0','#B0C8E0']

const sv = (d = 0) => ({
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: [0.22,1,0.36,1] } },
})

export default function Habits() {
  const { habits, addHabit, deleteHabit, habitDone, toggleHabit, getStreak } = useWellness()
  const [name,   setName]   = useState('')
  const [icon,   setIcon]   = useState(ICONS[0])
  const [calDate,setCalDate] = useState(new Date())
  const [filterH,setFilterH] = useState(null)
  const [showCreate, setShowCreate] = useState(false)

  const today = () => new Date().toISOString().slice(0, 10)
  const td    = today()
  const todayDone = habitDone[td] || {}
  const doneCount = habits.filter(h => todayDone[h.id]).length

  const handleAdd = () => {
    if (!name.trim()) return
    addHabit({ name: name.trim(), icon, color: HABIT_COLORS[habits.length % HABIT_COLORS.length] })
    setName(''); setShowCreate(false)
  }

  /* ── Calendar ─────────────────────────────── */
  const calYear  = calDate.getFullYear()
  const calMonth = calDate.getMonth()
  const daysInMonth  = new Date(calYear, calMonth + 1, 0).getDate()
  const todayStr = new Date().toISOString().slice(0, 10)

  // Build full month day columns for matrix calendar view
  const dayNums = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const isoForDay = (d) =>
    `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`

  const weekday = (d) => ['S','M','T','W','T','F','S'][new Date(isoForDay(d)).getDay()]

  // Goal = days since habit was created (capped to days in month)
  const habitGoal = (h) => {
    const created = new Date(h.createdAt || todayStr)
    const firstDay = new Date(calYear, calMonth, 1)
    const lastDay  = new Date(calYear, calMonth + 1, 0)
    const start = created > firstDay ? created : firstDay
    return Math.max(1, Math.round((lastDay - start) / 86400000) + 1)
  }

  const habitAchieved = (h) =>
    dayNums.filter(d => (habitDone[isoForDay(d)] || {})[h.id]).length

  return (
    <PageLayout>
      <Container className="pt-28 pb-20">

        {/* Header */}
        <motion.div variants={sv(0)} initial="hidden" animate="show" className="mb-8">
          <p className="eyebrow mb-2">Build consistency</p>
          <h1 className="mb-2 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond','Lora',serif", fontSize: 'clamp(36px,7vw,56px)', fontWeight: 300 }}>
            Habit <em style={{ fontStyle:'italic', color:'#E87722' }}>Tracker</em>
          </h1>
          <p className="text-sm text-mist-dark dark:text-ocean-lt/60 italic" style={{ fontFamily:"'Lora',serif" }}>
            "kal kare so aaj kar" — Kabir Das
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div variants={sv(0.05)} initial="hidden" animate="show" className="mb-8">
          <QuoteBanner />
        </motion.div>

        {/* Stats row */}
        <motion.div variants={sv(0.1)} initial="hidden" animate="show"
          className="grid grid-cols-3 gap-3 mb-8">
          {[
            { num: habits.length, label: 'Total habits', emoji: '📅' },
            { num: `${doneCount}/${habits.length}`, label: 'Done today', emoji: '✅' },
            { num: Math.max(0, ...habits.map(h => getStreak(h.id))) + '🔥', label: 'Best streak', emoji: '' },
          ].map((s, i) => (
            <div key={i} className="card p-4 text-center">
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="font-display text-2xl font-medium text-ocean dark:text-ocean-lt">{s.num}</div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-mist-dark/70 dark:text-ocean-lt/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── TODAY CHECK-IN ───────────────────── */}
        <motion.div variants={sv(0.15)} initial="hidden" animate="show" className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl text-ink dark:text-sand-lt">Today's Check-in</h2>
              <p className="text-xs text-mist-dark/60 dark:text-ocean-lt/40 mt-0.5">
                {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}
              </p>
            </div>
            <button onClick={() => setShowCreate(v => !v)}
              className="btn-primary text-sm flex items-center gap-1.5 !py-2 !px-4">
              <Plus size={15} /> New Habit
            </button>
          </div>

          {habits.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🌱</div>
              <p className="text-sm text-mist-dark/60 dark:text-ocean-lt/40">No habits yet. Create your first above!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {habits.map(h => {
                const done   = !!todayDone[h.id]
                const streak = getStreak(h.id)
                return (
                  <motion.button key={h.id} whileTap={{ scale: 0.99 }}
                    onClick={() => toggleHabit(h.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all duration-200"
                    style={{
                      background:   done ? `${h.color}28` : 'var(--bg-surface, #fff)',
                      borderColor:  done ? h.color : 'var(--border, #E0D8CC)',
                    }}>
                    <div className="w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 text-white text-sm font-bold"
                      style={{ background: done ? h.color : 'transparent', borderColor: done ? h.color : '#CBD5E0' }}>
                      {done && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>✓</motion.span>}
                    </div>
                    <span className="text-lg">{h.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-ink dark:text-sand-lt"
                        style={{ textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.55 : 1 }}>
                        {h.name}
                      </div>
                      {todayDone[h.id] && typeof todayDone[h.id] === 'string' && (
                        <div className="text-xs text-mist-dark/50 dark:text-ocean-lt/40">Done at {todayDone[h.id]}</div>
                      )}
                    </div>
                    {streak > 0 && (
                      <span className="text-sm font-bold" style={{ color: '#D4A84B' }}>🔥 {streak}d</span>
                    )}
                    <button onClick={e => { e.stopPropagation(); deleteHabit(h.id) }}
                      className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-1">
                      <Trash2 size={13} />
                    </button>
                  </motion.button>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Create habit panel */}
        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="card p-6 mb-6 overflow-hidden">
              <h2 className="font-display text-xl text-ink dark:text-sand-lt mb-4">✦ Create a habit</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-mist-dark/70 dark:text-ocean-lt/50 mb-2 block">Habit name</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-ocean-pale dark:border-ocean/30 bg-sand-lt dark:bg-ink text-ink dark:text-sand-lt font-semibold text-sm outline-none focus:ring-2 focus:ring-ocean/30 transition-all"
                    type="text" value={name} placeholder="e.g. Morning walk, Meditate, Read 20 pages…"
                    maxLength={50} onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-mist-dark/70 dark:text-ocean-lt/50 mb-2 block">Icon</label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-xl max-h-32 overflow-y-auto bg-sand-lt dark:bg-ink border border-ocean-pale dark:border-ocean/20">
                    {ICONS.map(ic => (
                      <button key={ic} type="button" onClick={() => setIcon(ic)}
                        className="w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: ic === icon ? '#E87722' + '22' : 'transparent', border: ic === icon ? '2px solid #E87722' : '2px solid transparent' }}>
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAdd}
                    className="flex-1 btn-primary flex items-center justify-center gap-2">
                    <Plus size={16} /> Add Habit
                  </button>
                  <button onClick={() => setShowCreate(false)}
                    className="px-4 py-2.5 rounded-full border border-ocean-pale dark:border-ocean/30 text-sm font-semibold text-mist-dark dark:text-ocean-lt/60 hover:bg-sand-lt dark:hover:bg-ink transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GRID CALENDAR — like image 2 ──────── */}
        {habits.length > 0 && (
          <motion.div variants={sv(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="card p-5 mb-8 overflow-x-auto">
            {/* Month header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl text-ink dark:text-sand-lt">
                {calDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-1">
                <button onClick={() => { setCalDate(d => { const n = new Date(d); n.setMonth(n.getMonth()-1); return n }) }}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-ocean-pale dark:border-ocean/30 hover:bg-sand-lt dark:hover:bg-ink text-mist-dark transition-all">
                  <ChevronLeft size={15} />
                </button>
                <button onClick={() => { setCalDate(d => { const n = new Date(d); n.setMonth(n.getMonth()+1); return n }) }}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-ocean-pale dark:border-ocean/30 hover:bg-sand-lt dark:hover:bg-ink text-mist-dark transition-all">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Grid table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs" style={{ minWidth: 980 }}>
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 font-bold text-ocean dark:text-ocean-lt w-40 text-xs">Habits</th>
                    {dayNums.map(d => {
                      const iso = isoForDay(d)
                      const isToday = iso === todayStr
                      return (
                        <th key={d} className="text-center px-1 py-2 font-bold" style={{ minWidth: 30, color: isToday ? '#E87722' : 'var(--muted,#6B6B70)' }}>
                          <div>{weekday(d)}</div>
                          <div className={`text-[11px] mt-0.5 ${isToday ? 'font-black' : 'font-medium'}`}>{d}</div>
                        </th>
                      )
                    })}
                    <th className="text-center px-2 py-2 font-bold text-ocean dark:text-ocean-lt text-[11px]">Goal</th>
                    <th className="text-center px-2 py-2 font-bold text-ocean dark:text-ocean-lt text-[11px]">Done</th>
                  </tr>
                </thead>
                <tbody>
                  {habits.map(h => {
                    const achieved = habitAchieved(h)
                    const goal     = habitGoal(h)
                    const pctDone  = Math.min(100, Math.round(achieved / goal * 100))
                    const isGreen  = pctDone >= 100
                    const isYellow = pctDone >= 60 && !isGreen

                    return (
                      <tr key={h.id} className="border-t border-ocean-pale dark:border-ocean/10 hover:bg-sand-lt/50 dark:hover:bg-ink/30 transition-colors">
                        <td className="px-3 py-2.5 font-semibold text-ink dark:text-sand-lt" style={{ maxWidth: 160 }}>
                          <div className="flex items-center gap-1.5 truncate">
                            <span>{h.icon}</span>
                            <span className="truncate text-[12px]">{h.name}</span>
                          </div>
                        </td>
                        {dayNums.map(d => {
                          const iso  = isoForDay(d)
                          const done = !!(habitDone[iso] || {})[h.id]
                          const isToday = iso === todayStr
                          return (
                            <td key={d} className="text-center px-0.5 py-1.5">
                              <button
                                onClick={() => {
                                  // Toggle for any day in current month
                                  if (iso <= todayStr) {
                                    import('../context/WellnessContext').then(() => {})
                                    toggleHabit(h.id, iso)
                                  }
                                }}
                                disabled={iso > todayStr}
                                className="w-6 h-6 mx-auto flex items-center justify-center rounded-md transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
                                style={{
                                  background: done ? h.color : isToday ? 'rgba(232,119,34,0.08)' : 'transparent',
                                  border: done ? 'none' : `1px solid ${isToday ? '#E87722' : '#D0D8E0'}`,
                                }}>
                                {done && <span className="text-[10px] font-black" style={{ color: '#fff' }}>✓</span>}
                              </button>
                            </td>
                          )
                        })}
                        {/* Goal */}
                        <td className="text-center px-2 py-2 text-xs font-semibold text-mist-dark dark:text-ocean-lt/60">{goal}</td>
                        {/* Achieved with color */}
                        <td className="text-center px-2 py-2">
                          <span className="inline-block px-2 py-0.5 rounded-md text-xs font-black"
                            style={{
                              background: isGreen ? '#3A8C4C' : isYellow ? '#E8B84B' : '#E8D5A8',
                              color: isGreen ? '#fff' : isYellow ? '#fff' : '#6B4C10',
                            }}>
                            {achieved}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ocean-pale dark:border-ocean/10 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-mist-dark/60 dark:text-ocean-lt/40">
                <div className="w-3 h-3 rounded-sm" style={{ background: '#3A8C4C' }} />
                Goal reached
              </div>
              <div className="flex items-center gap-1.5 text-xs text-mist-dark/60 dark:text-ocean-lt/40">
                <div className="w-3 h-3 rounded-sm" style={{ background: '#E8B84B' }} />
                60%+ done
              </div>
              <div className="flex items-center gap-1.5 text-xs text-mist-dark/60 dark:text-ocean-lt/40">
                <div className="w-3 h-3 rounded-sm" style={{ background: '#E8D5A8' }} />
                In progress
              </div>
            </div>
          </motion.div>
        )}

        {/* Mini dot calendar */}
        <motion.div variants={sv(0.25)} initial="hidden" whileInView="show" viewport={{ once: true }} className="card p-5">
          <h2 className="font-display text-lg text-ink dark:text-sand-lt mb-4">Monthly overview</h2>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['S','M','T','W','T','F','S'].map((d,i) => (
              <div key={i} className="text-center text-[10px] font-bold text-mist-dark/60 dark:text-ocean-lt/40 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: new Date(calYear, calMonth, 1).getDay() }, (_, i) => (
              <div key={'e'+i} />
            ))}
            {dayNums.map(d => {
              const iso      = isoForDay(d)
              const dayDone  = habitDone[iso] || {}
              const relevant = filterH ? habits.filter(h => h.id === filterH) : habits
              const doneH    = relevant.filter(h => dayDone[h.id])
              const isToday  = iso === todayStr
              const allDone  = relevant.length > 0 && doneH.length === relevant.length

              return (
                <div key={d}
                  className="aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all hover:scale-105 cursor-pointer"
                  style={{
                    background: allDone ? 'rgba(58,140,76,0.14)' : isToday ? 'rgba(232,119,34,0.10)' : 'var(--bg-surface, #f9f5ef)',
                    border: isToday ? '2px solid #E87722' : '1px solid #E5DDD0',
                  }}
                  onClick={() => setFilterH(null)}>
                  <span className="text-[11px] font-bold" style={{ color: isToday ? '#E87722' : undefined }}>{d}</span>
                  <div className="flex gap-0.5 flex-wrap justify-center mt-0.5 px-1">
                    {doneH.slice(0, 3).map(h => (
                      <div key={h.id} className="w-1.5 h-1.5 rounded-full" style={{ background: h.color }} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          {/* Habit filter chips */}
          {habits.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-ocean-pale dark:border-ocean/10">
              <button onClick={() => setFilterH(null)}
                className="px-3 py-1 rounded-full text-[11px] font-bold transition-all"
                style={{ background: !filterH ? '#0D1F2D' : '#F0EBE3', color: !filterH ? '#fff' : '#5A6A7A', border: '1px solid #E0D8CC' }}>
                All
              </button>
              {habits.map(h => (
                <button key={h.id} onClick={() => setFilterH(h.id === filterH ? null : h.id)}
                  className="px-3 py-1 rounded-full text-[11px] font-bold transition-all"
                  style={{
                    background: filterH === h.id ? h.color + '30' : '#F0EBE3',
                    color:      filterH === h.id ? h.color : '#5A6A7A',
                    border:     `1px solid ${filterH === h.id ? h.color : '#E0D8CC'}`,
                  }}>
                  {h.icon} {h.name}
                </button>
              ))}
            </div>
          )}
        </motion.div>

      </Container>
    </PageLayout>
  )
}