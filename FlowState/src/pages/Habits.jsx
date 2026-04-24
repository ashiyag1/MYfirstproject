import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Store, today, fmtDate, uid, getLast7Days } from '../utils'
import { useToast } from '../context/ToastContext'
import PageLayout, { Container, PageHeader } from '../components/PageLayout'

const ICONS = ['🧘', '🏃', '📚', '💊', '🥗', '😴', '✍️', '🎯', '🚶', '💪', '🫧', '🌿', '🎨', '🎵', '🙏', '🌅']

export default function Habits() {
  const toast = useToast()
  const td = today()

  const [habits, setHabits] = useState(() => Store.get('habits_list') || [])
  const [doneToday, setDoneToday] = useState(() => Store.get('habits_done_' + td) || {})
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newIcon, setNewIcon] = useState('🧘')
  const [viewDate, setViewDate] = useState(td)

  const viewDone = viewDate === td ? doneToday : (Store.get('habits_done_' + viewDate) || {})
  const weekDays = getLast7Days()

  const saveHabits = (h) => { setHabits(h); Store.set('habits_list', h) }
  const saveDone = (d) => { setDoneToday(d); Store.set('habits_done_' + td, d) }

  const addHabit = () => {
    if (!newName.trim()) return
    const h = { id: uid(), name: newName.trim(), icon: newIcon, createdAt: td }
    saveHabits([...habits, h])
    setNewName(''); setShowAdd(false)
    toast('Habit created ✦', 'success')
  }

  const toggleDone = (id) => {
    if (viewDate !== td) return
    const updated = { ...doneToday, [id]: !doneToday[id] }
    if (!updated[id]) delete updated[id]
    saveDone(updated)
    toast(doneToday[id] ? 'Unmarked' : 'Habit done! ✅', doneToday[id] ? 'default' : 'success')
  }

  const deleteHabit = (id) => {
    saveHabits(habits.filter(h => h.id !== id))
    toast('Habit removed', 'default')
  }

  const doneCount = habits.filter(h => viewDone[h.id]).length

  // Streak calculator
  const getStreak = (habitId) => {
    let s = 0
    const d = new Date()
    for (let i = 0; i < 90; i++) {
      const iso = d.toISOString().slice(0, 10)
      const done = Store.get('habits_done_' + iso) || {}
      if (done[habitId]) { s++; d.setDate(d.getDate() - 1) }
      else break
    }
    return s
  }

  // Navigate day
  const prevDay = () => {
    const d = new Date(viewDate + 'T00:00:00')
    d.setDate(d.getDate() - 1)
    setViewDate(d.toISOString().slice(0, 10))
  }
  const nextDay = () => {
    if (viewDate >= td) return
    const d = new Date(viewDate + 'T00:00:00')
    d.setDate(d.getDate() + 1)
    setViewDate(d.toISOString().slice(0, 10))
  }

  return (
    <PageLayout>
      <Container>
        <PageHeader
          eyebrow="Daily Practice"
          title="Habit"
          titleEm="Tracker"
          sub="Small consistent actions compound into remarkable results."
        />

        {/* Week strip */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-4 mb-6">
          <div className="flex gap-1.5 justify-between">
            {weekDays.map(iso => {
              const doneCt = habits.filter(h => (Store.get('habits_done_' + iso) || {})[h.id]).length
              const isToday = iso === td
              const isSelected = iso === viewDate
              const dayLabel = new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short' })
              const dayNum = new Date(iso + 'T00:00:00').getDate()
              const complete = habits.length > 0 && doneCt === habits.length

              return (
                <button
                  key={iso}
                  onClick={() => setViewDate(iso)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-2 rounded-2xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-ocean text-white shadow-glow-ocean'
                      : isToday
                      ? 'bg-ocean/10 dark:bg-ocean/20 text-ocean dark:text-ocean-lt'
                      : 'hover:bg-sand dark:hover:bg-ink'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">{dayLabel}</span>
                  <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-ink dark:text-sand-lt'}`}>{dayNum}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${complete ? 'bg-sage' : doneCt > 0 ? 'bg-gold' : 'bg-transparent'}`} />
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Day nav */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={prevDay} className="btn-ghost !p-2"><ChevronLeft size={14} /></button>
            <span className="text-sm font-semibold text-ink dark:text-sand-lt">
              {viewDate === td ? 'Today' : fmtDate(viewDate)}
            </span>
            <button onClick={nextDay} disabled={viewDate >= td} className="btn-ghost !p-2 disabled:opacity-30"><ChevronRight size={14} /></button>
          </div>
          <div className="text-sm text-mist-dark dark:text-ocean-lt/70">
            {doneCount} / {habits.length} done
            {habits.length > 0 && <span className="ml-2 text-sage">{'▓'.repeat(doneCount)}{'░'.repeat(habits.length - doneCount)}</span>}
          </div>
        </div>

        {/* Habits list */}
        <div className="flex flex-col gap-2.5 mb-6">
          <AnimatePresence>
            {habits.map((h, i) => {
              const done = !!viewDone[h.id]
              const streak = getStreak(h.id)
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ delay: i * 0.04 }}
                  className={`card p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 ${done ? 'bg-sage/5 dark:bg-sage/10 border-sage/30' : ''}`}
                  onClick={() => toggleDone(h.id)}
                >
                  {/* Checkbox */}
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${done ? 'bg-sage text-white shadow-glow-sage' : 'border-2 border-ocean-pale dark:border-ocean/20'}`}>
                    {done && <span className="text-xs font-bold">✓</span>}
                  </div>

                  {/* Icon + Name */}
                  <span className="text-2xl">{h.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${done ? 'line-through text-mist-dark dark:text-ocean-lt/40' : 'text-ink dark:text-sand-lt'}`}>
                      {h.name}
                    </p>
                    {streak > 0 && (
                      <p className="text-[11px] text-gold mt-0.5">🔥 {streak} day streak</p>
                    )}
                  </div>

                  {done && <span className="text-xs font-semibold text-sage">✦ done</span>}

                  <button
                    onClick={e => { e.stopPropagation(); deleteHabit(h.id) }}
                    className="text-mist-dark/30 hover:text-red-400 transition-colors p-1 ml-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {habits.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-mist-dark dark:text-ocean-lt/50">
              <div className="text-4xl mb-3">🌱</div>
              <p className="text-sm">No habits yet. Create your first one!</p>
            </motion.div>
          )}
        </div>

        {/* Add habit */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-ink dark:text-sand-lt">Add Habit</h2>
            <button onClick={() => setShowAdd(s => !s)} className="btn-primary !py-2 !px-4 text-xs">
              <Plus size={14} /> {showAdd ? 'Cancel' : 'New Habit'}
            </button>
          </div>

          <AnimatePresence>
            {showAdd && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="mb-3">
                  <div className="label">Choose Icon</div>
                  <div className="flex flex-wrap gap-2">
                    {ICONS.map(ic => (
                      <button
                        key={ic}
                        onClick={() => setNewIcon(ic)}
                        className={`w-9 h-9 rounded-xl text-lg transition-all duration-150 ${newIcon === ic ? 'bg-ocean/15 dark:bg-ocean/25 ring-2 ring-ocean scale-110' : 'hover:bg-sand dark:hover:bg-ink'}`}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="label">Habit Name</div>
                <div className="flex gap-2">
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addHabit()}
                    className="input flex-1"
                    placeholder={`e.g. Morning meditation…`}
                  />
                  <button onClick={addHabit} className="btn-primary" disabled={!newName.trim()}>
                    Add
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </PageLayout>
  )
}