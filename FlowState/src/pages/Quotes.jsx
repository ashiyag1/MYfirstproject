import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Heart, Sparkles } from 'lucide-react'
import { fetchAIQuote, Store, today, QUOTES_BANK } from '../utils'
import { useToast } from '../context/ToastContext'
import PageLayout, { Container, PageHeader } from '../components/PageLayout'

const categoryColors = {
  health:      { bg: 'from-ocean/20 to-ocean-lt/10',  badge: 'badge-ocean',  label: '🌿 Health' },
  habits:      { bg: 'from-sage/20 to-sage-lt/10',    badge: 'badge-sage',   label: '📅 Habits' },
  mindfulness: { bg: 'from-purple-100/40 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10', badge: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300', label: '🧘 Mindfulness' },
  motivation:  { bg: 'from-gold/15 to-gold-lt/10',    badge: 'badge-gold',   label: '⚡ Motivation' },
}

export default function Quotes() {
  const toast = useToast()
  const [featured, setFeatured] = useState(null)
  const [loading, setLoading] = useState(true)
  const [spinning, setSpinning] = useState(false)
  const [saved, setSaved] = useState(() => Store.get('saved_quotes') || [])
  const [filter, setFilter] = useState('all')

  const load = async (force = false) => {
    setLoading(true)
    if (force) Store.del('quote_' + today())
    const q = await fetchAIQuote(force)
    setFeatured(q)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const refresh = async () => {
    setSpinning(true)
    await load(true)
    setSpinning(false)
  }

  const saveQuote = (q) => {
    const already = saved.find(s => s.text === q.text)
    if (already) {
      const updated = saved.filter(s => s.text !== q.text)
      setSaved(updated); Store.set('saved_quotes', updated)
      toast('Removed from saved', 'default')
    } else {
      const updated = [q, ...saved]
      setSaved(updated); Store.set('saved_quotes', updated)
      toast('Quote saved ♥', 'success')
    }
  }

  const isSaved = (q) => q && saved.some(s => s.text === q.text)

  const allQuotes = [...QUOTES_BANK]
  const filtered = filter === 'all' ? allQuotes : allQuotes.filter(q => q.category === filter)

  return (
    <PageLayout>
      <Container>
        <PageHeader
          eyebrow="Daily Wisdom"
          title="Wisdom"
          titleEm="Quotes"
          sub="Words that move you forward. One insight at a time."
        />

        {/* Featured AI quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-10 mb-8"
          style={{ background: 'linear-gradient(135deg, #0D1F2D 0%, #1E3A4F 55%, #0e3d55 100%)' }}
        >
          <span className="absolute top-0 left-4 font-display text-[140px] leading-none text-white/[0.04] pointer-events-none select-none">"</span>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-ocean/15 blur-2xl" />

          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {featured && (
              <button
                onClick={() => saveQuote(featured)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${isSaved(featured) ? 'bg-red-400/20 border-red-400/40 text-red-300' : 'bg-white/10 border-white/10 text-white/50 hover:text-white hover:bg-white/20'}`}
              >
                <Heart size={14} fill={isSaved(featured) ? 'currentColor' : 'none'} />
              </button>
            )}
            <button
              onClick={refresh}
              disabled={spinning}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all border border-white/10"
            >
              <RefreshCw size={14} className={spinning ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4 relative z-10">
            <Sparkles size={14} className="text-ocean-lt" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-ocean-lt">AI-Powered Daily Quote</span>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.p key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-display text-xl text-white/30 italic">
                Finding today's wisdom…
              </motion.p>
            ) : featured ? (
              <motion.div key={featured.text} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="relative z-10">
                <p className="font-display text-xl md:text-3xl font-light italic text-white/90 leading-relaxed mb-4">{featured.text}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-ocean-lt">— {featured.author}</p>
                {featured.category && (
                  <span className="inline-block mt-3 text-[11px] font-semibold px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/50">
                    ✦ {featured.category}
                  </span>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {/* Saved quotes */}
        {saved.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="eyebrow mb-3">♥ Saved Quotes</div>
            <div className="grid gap-3">
              {saved.map((q, i) => {
                const cat = categoryColors[q.category]
                return (
                  <div key={i} className={`card p-5 bg-gradient-to-r ${cat?.bg || 'from-sand to-sand-lt'}`}>
                    <p className="font-display text-lg font-light italic text-ink dark:text-sand-lt leading-relaxed mb-2">"{q.text}"</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-mist-dark">— {q.author}</p>
                      <button onClick={() => saveQuote(q)} className="text-red-400 hover:text-red-500 transition-colors">
                        <Heart size={13} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Browse quotes */}
        <div className="eyebrow mb-4">Browse by Category</div>
        <div className="flex gap-2 flex-wrap mb-5">
          {['all', 'health', 'habits', 'mindfulness', 'motivation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all duration-200 ${filter === cat ? 'bg-ocean text-white shadow-glow-ocean' : 'btn-ghost'}`}
            >
              {cat === 'all' ? '✦ All' : categoryColors[cat]?.label || cat}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <AnimatePresence>
            {filtered.map((q, i) => {
              const cat = categoryColors[q.category]
              const savedQ = isSaved(q)
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  className={`card p-5 hover:shadow-card transition-all bg-gradient-to-r ${cat?.bg || ''}`}
                >
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="font-display text-lg font-light italic text-ink dark:text-sand-lt leading-relaxed mb-2">"{q.text}"</p>
                      <div className="flex items-center gap-3">
                        <p className="text-xs font-bold text-mist-dark">— {q.author}</p>
                        {q.category && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat?.badge || 'badge-ocean'}`}>
                            {cat?.label || q.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => saveQuote(q)} className={`flex-shrink-0 mt-1 transition-colors ${savedQ ? 'text-red-400' : 'text-mist-dark/30 hover:text-red-300'}`}>
                      <Heart size={15} fill={savedQ ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </Container>
    </PageLayout>
  )
}