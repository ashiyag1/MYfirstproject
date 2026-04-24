import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Settings2 } from 'lucide-react'
import { Store, today, fmtTime, pct as calcPct, uid, getLast7Days } from '../utils'
import { useToast } from '../context/ToastContext'
import WaterProgress from '../components/Waterprogress'
import PageLayout, { Container, PageHeader } from '../components/PageLayout'

const PRESETS = [
  { label: 'Sip',     ml: 100,  emoji: '🫧' },
  { label: 'Glass',   ml: 250,  emoji: '🥛' },
  { label: 'Bottle',  ml: 500,  emoji: '💧' },
  { label: 'Large',   ml: 750,  emoji: '🫙' },
  { label: '1 Litre', ml: 1000, emoji: '🍶' },
]

export default function Water() {
  const toast = useToast()
  const td = today()

  const load = () => Store.get('water_' + td) || { entries: [], goal: 2500 }

  const [data, setData] = useState(load)
  const [customMl, setCustomMl] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [goalInput, setGoalInput] = useState(String(load().goal || 2500))

  const save = (d) => { Store.set('water_' + td, d); setData({ ...d }) }

  const totalMl = data.entries.reduce((s, e) => s + e.ml, 0)
  const goal = data.goal || 2500
  const waterPct = calcPct(totalMl, goal)

  const addWater = (ml) => {
    const newEntries = [...data.entries, { id: uid(), ml, time: fmtTime() }]
    save({ ...data, entries: newEntries })
    toast(`+${ml} ml added! 💧`, 'info')
  }

  const removeEntry = (id) => {
    save({ ...data, entries: data.entries.filter(e => e.id !== id) })
  }

  const updateGoal = () => {
    const g = parseInt(goalInput)
    if (g > 0) { save({ ...data, goal: g }); setShowSettings(false); toast('Goal updated ✦', 'success') }
  }

  // Weekly chart data
  const weekDays = getLast7Days()
  const weekData = weekDays.map(iso => {
    const wd = Store.get('water_' + iso) || { entries: [], goal: 2500 }
    const ml = wd.entries.reduce((s, e) => s + e.ml, 0)
    const g = wd.goal || 2500
    return { iso, ml, goal: g, hit: ml >= g, pct: calcPct(ml, g) }
  })

  return (
    <PageLayout>
      <Container>
        <PageHeader
          eyebrow="Hydration"
          title="Water"
          titleEm="Tracker"
          sub="Every drop counts. Stay consistent and hit your daily goal."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Progress drop */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 flex flex-col items-center justify-center gap-6">
            <WaterProgress pct={waterPct} ml={totalMl} goal={goal} />
            <button
              onClick={() => setShowSettings(s => !s)}
              className="btn-ghost text-xs"
            >
              <Settings2 size={12} /> Adjust Goal
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="w-full overflow-hidden">
                  <div className="flex gap-2 mt-2">
                    <input type="number" value={goalInput} onChange={e => setGoalInput(e.target.value)}
                      className="input flex-1" placeholder="Daily goal (ml)" />
                    <button onClick={updateGoal} className="btn-primary">Save</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Add water */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card p-6">
            <h2 className="font-display text-xl text-ink dark:text-sand-lt mb-4">Add Water</h2>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PRESETS.map(p => (
                <button
                  key={p.ml}
                  onClick={() => addWater(p.ml)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-ocean-pale dark:border-ocean/20 hover:bg-ocean/5 hover:border-ocean-lt transition-all duration-200 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{p.emoji}</span>
                  <span className="text-[10px] font-bold text-ocean dark:text-ocean-lt">{p.ml} ml</span>
                  <span className="text-[9px] text-mist-dark">{p.label}</span>
                </button>
              ))}
            </div>

            {/* Custom */}
            <div className="label">Custom amount</div>
            <div className="flex gap-2">
              <input
                type="number"
                value={customMl}
                onChange={e => setCustomMl(e.target.value)}
                className="input"
                placeholder="Enter ml…"
              />
              <button
                onClick={() => { const v = parseInt(customMl); if (v > 0) { addWater(v); setCustomMl('') } }}
                className="btn-primary"
                disabled={!customMl || parseInt(customMl) <= 0}
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </motion.div>
        </div>

        {/* Weekly chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 mb-6">
          <h2 className="font-display text-xl text-ink dark:text-sand-lt mb-4">This Week</h2>
          <div className="flex items-end justify-between gap-2 h-24">
            {weekData.map(({ iso, ml, goal: g, hit, pct: p }) => {
              const isToday = iso === td
              const dayLabel = new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short' })
              return (
                <div key={iso} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full relative" style={{ height: '72px' }}>
                    <div className="absolute bottom-0 left-0 right-0 rounded-xl overflow-hidden" style={{ height: '72px', background: 'rgba(214,232,238,0.4)' }}>
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 rounded-xl ${hit ? 'bg-gradient-to-t from-ocean to-ocean-lt' : 'bg-gradient-to-t from-mist-dark/50 to-ocean-pale'}`}
                        initial={{ height: 0 }}
                        animate={{ height: `${p}%` }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      />
                    </div>
                    {hit && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px]">✦</div>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold ${isToday ? 'text-ocean dark:text-ocean-lt' : 'text-mist-dark'}`}>
                    {dayLabel}
                  </span>
                  <span className="text-[9px] text-mist-dark/70">{Math.round(ml / 100) / 10}L</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Log */}
        {data.entries.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-6">
            <h2 className="font-display text-xl text-ink dark:text-sand-lt mb-4">Today's Log</h2>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {[...data.entries].reverse().map(e => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-sand-lt dark:bg-ink border border-ocean-pale dark:border-ocean/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-ocean dark:text-ocean-lt font-bold text-sm">+{e.ml} ml</span>
                      <span className="text-xs text-mist-dark">{e.time}</span>
                    </div>
                    <button onClick={() => removeEntry(e.id)} className="text-mist-dark/40 hover:text-red-400 transition-colors p-1">
                      <Trash2 size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </Container>
    </PageLayout>
  )
}