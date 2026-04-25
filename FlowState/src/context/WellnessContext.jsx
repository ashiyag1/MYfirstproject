import { createContext, useContext, useState, useCallback } from 'react'
import { Store, today as getToday, uid } from '../utils'

const WellnessContext = createContext(null)

function useLocalState(key, initial) {
  const [state, setRaw] = useState(() => Store.get(key, initial))
  const setState = useCallback((val) => {
    setRaw(prev => {
      const next = typeof val === 'function' ? val(prev) : val
      Store.set(key, next)
      return next
    })
  }, [key])
  return [state, setState]
}

export function WellnessProvider({ children }) {
  const td = getToday()

  // ── WATER ──────────────────────────────────────
  const [waterGoal, setWaterGoal] = useLocalState('water_goal', 2500)
  const [waterLog,  setWaterLog]  = useLocalState('water_log',  {})

  const addWater = useCallback((ml, label = 'Custom') => {
    const now = new Date()
    const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0')
    const entry = { id: uid(), ml, label, time }
    setWaterLog(prev => ({ ...prev, [getToday()]: [...(prev[getToday()] || []), entry] }))
  }, [setWaterLog])

  const removeWater = useCallback((id) => {
    setWaterLog(prev => {
      const day = (prev[getToday()] || []).filter(e => e.id !== id)
      return { ...prev, [getToday()]: day }
    })
  }, [setWaterLog])

  const clearWaterToday = useCallback(() => {
    setWaterLog(prev => ({ ...prev, [getToday()]: [] }))
  }, [setWaterLog])

  const todayEntries = waterLog[td] || []
  const todayTotal   = todayEntries.reduce((s, e) => s + e.ml, 0)

  // ── HABITS ─────────────────────────────────────
  const [habits,    setHabits]    = useLocalState('habits_list', [])
  const [habitDone, setHabitDone] = useLocalState('habit_done',  {})

  const addHabit = useCallback((habit) => {
    setHabits(prev => [...prev, { ...habit, id: uid(), createdAt: new Date().toISOString() }])
  }, [setHabits])

  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }, [setHabits])

  const toggleHabit = useCallback((id, dateKey = getToday()) => {
    const now = new Date()
    const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0')
    setHabitDone(prev => {
      const day = { ...(prev[dateKey] || {}) }
      if (day[id]) delete day[id]
      else day[id] = time
      return { ...prev, [dateKey]: day }
    })
  }, [setHabitDone])

  const getStreak = useCallback((habitId) => {
    let streak = 0
    const d = new Date()
    for (let i = 0; i < 365; i++) {
      const iso = d.toISOString().slice(0,10)
      const day = habitDone[iso] || {}
      if (day[habitId]) { streak++; d.setDate(d.getDate() - 1) }
      else { if (i === 0) { d.setDate(d.getDate() - 1); continue } break }
    }
    return streak
  }, [habitDone])

  const todayHabitDone = habitDone[td] || {}

  // ── JOURNAL ────────────────────────────────────
  const [journal, setJournal] = useLocalState('journal_entries', [])

  const addEntry = useCallback((entry) => {
    setJournal(prev => [{ ...entry, id: uid(), createdAt: new Date().toISOString() }, ...prev])
  }, [setJournal])

  const deleteEntry = useCallback((id) => {
    setJournal(prev => prev.filter(e => e.id !== id))
  }, [setJournal])

  return (
    <WellnessContext.Provider value={{
      // water
      waterGoal, setWaterGoal,
      waterLog, todayEntries, todayTotal,
      addWater, removeWater, clearWaterToday,
      // habits
      habits, addHabit, deleteHabit,
      habitDone, todayHabitDone, toggleHabit, getStreak,
      // journal
      journal, addEntry, deleteEntry,
    }}>
      {children}
    </WellnessContext.Provider>
  )
}

export const useWellness = () => {
  const ctx = useContext(WellnessContext)
  if (!ctx) throw new Error('useWellness must be inside WellnessProvider')
  return ctx
}