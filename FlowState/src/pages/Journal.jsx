import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenLine, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Store, today, fmtDate, uid } from '../utils'
import { useToast } from '../context/ToastContext'
import PageLayout, { Container, PageHeader } from '../components/PageLayout'

const MOODS = [
  { label: 'Grateful',  emoji: '🙏', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200' },
  { label: 'Calm',      emoji: '🌊', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200' },
  { label: 'Energized', emoji: '⚡', color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' },
  { label: 'Reflective',emoji: '🌙', color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200' },
  { label: 'Happy',     emoji: '✨', color: 'bg-green-50 dark:bg-green-900/20 border-green-200' },
  { label: 'Tired',     emoji: '😴', color: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200' },
]

const PROMPTS = [
  "What are three things you're grateful for today?",
  "What intention do you want to carry into tomorrow?",
  "What's one small win you want to acknowledge?",
  "How did your body feel today?",
  "What would make today even better?",
  "What are you learning about yourself lately?",
]

export default function Journal() {
  const toast = useToast()
  const td = today()

  const [entries, setEntries] = useState(() => Store.get('journal_entries') || [])
  const [text, setText] = useState('')
  const [mood, setMood] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [prompt] = useState(PROMPTS[Math.floor(Date.now() / 86400000) % PROMPTS.length])

  const save = (e) => { setEntries(e); Store.set('journal_entries', e) }

  const addEntry = () => {
    if (!text.trim()) return
    const entry = {
      id: uid(),
      date: td,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      text: text.trim(),
      mood,
    }
    save([entry, ...entries])
    setText(''); setMood('')
    toast('Entry saved ✦', 'success')
  }

  const deleteEntry = (id) => { save(entries.filter(e => e.id !== id)); toast('Entry removed', 'default') }

  // Group by date
  const grouped = entries.reduce((acc, e) => {
    const k = e.date || td
    if (!acc[k]) acc[k] = []
    acc[k].push(e)
    return acc
  }, {})

  return (
    <PageLayout>
      <Container>
        <PageHeader
          eyebrow="Inner Space"
          title="Daily"
          titleEm="Journal"
          sub="A quiet moment to reflect, express, and grow."
        />

        {/* Write */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <PenLine size={16} className="text-ocean dark:text-ocean-lt" />
            <h2 className="font-display text-xl text-ink dark:text-sand-lt">New Entry</h2>
          </div>

          {/* Prompt */}
          <div className="mb-3 px-4 py-3 rounded-2xl bg-ocean/5 dark:bg-ocean/10 border border-ocean-pale dark:border-ocean/20">
            <p className="text-xs font-semibold text-ocean dark:text-ocean-lt mb-0.5">✦ Today's Prompt</p>
            <p className="text-sm text-ink dark:text-sand-lt italic font-light">{prompt}</p>
          </div>

          {/* Mood */}
          <div className="label mb-2">How are you feeling?</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {MOODS.map(m => (
              <button
                key={m.label}
                onClick={() => setMood(mood === m.label ? '' : m.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 ${
                  mood === m.label
                    ? 'border-ocean bg-ocean/10 dark:bg-ocean/20 text-ocean dark:text-ocean-lt shadow-sm scale-105'
                    : 'border-ocean-pale dark:border-ocean/20 text-mist-dark hover:border-ocean-lt'
                }`}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write freely… this is your space."
            rows={5}
            className="input resize-none mb-4"
          />

          <div className="flex justify-end">
            <button onClick={addEntry} disabled={!text.trim()} className="btn-primary">
              Save Entry ✦
            </button>
          </div>
        </motion.div>

        {/* Past entries */}
        {Object.keys(grouped).length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-mist-dark dark:text-ocean-lt/50">
            <div className="text-4xl mb-3">📖</div>
            <p className="text-sm">No journal entries yet. Write your first one above.</p>
          </motion.div>
        ) : (
          Object.entries(grouped).map(([date, dayEntries]) => (
            <motion.div key={date} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <div className="eyebrow mb-3">{date === td ? 'Today' : fmtDate(date)}</div>
              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {dayEntries.map(e => {
                    const moodObj = MOODS.find(m => m.label === e.mood)
                    const isExpanded = expanded === e.id
                    const preview = e.text.length > 120 ? e.text.slice(0, 120) + '…' : e.text

                    return (
                      <motion.div
                        key={e.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        className={`card p-5 border ${moodObj?.color || ''}`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {moodObj && <span className="text-lg">{moodObj.emoji}</span>}
                            <span className="text-xs font-semibold text-mist-dark">{e.time || ''}</span>
                            {e.mood && <span className="badge-ocean text-[10px]">{e.mood}</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setExpanded(isExpanded ? null : e.id)} className="text-mist-dark/50 hover:text-ocean transition-colors p-1">
                              {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            </button>
                            <button onClick={() => deleteEntry(e.id)} className="text-mist-dark/30 hover:text-red-400 transition-colors p-1">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-ink dark:text-sand-lt font-light leading-relaxed whitespace-pre-wrap">
                          {isExpanded ? e.text : preview}
                        </p>
                        {e.text.length > 120 && (
                          <button onClick={() => setExpanded(isExpanded ? null : e.id)} className="text-xs text-ocean dark:text-ocean-lt mt-1 hover:underline">
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          ))
        )}
      </Container>
    </PageLayout>
  )
}