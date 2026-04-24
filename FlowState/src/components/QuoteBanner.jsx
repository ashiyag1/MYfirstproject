import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { fetchAIQuote, Store, today } from '../utils'
import { motion, AnimatePresence } from 'framer-motion'

const categoryColors = {
  health: 'text-sage',
  habits: 'text-gold-lt',
  mindfulness: 'text-ocean-lt',
  motivation: 'text-pink-300',
}

export default function QuoteBanner({ showRefresh = true }) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [spinning, setSpinning] = useState(false)

  const load = async (force = false) => {
    setLoading(true)
    const q = await fetchAIQuote(force)
    setQuote(q)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleRefresh = async () => {
    setSpinning(true)
    Store.del('quote_' + today())
    await load(true)
    setSpinning(false)
  }

  return (
    <div className="relative rounded-3xl overflow-hidden p-8 md:p-10"
      style={{ background: 'linear-gradient(135deg, #0D1F2D 0%, #1E3A4F 55%, #0e3d55 100%)' }}>

      {/* Decorative big quote mark */}
      <span className="absolute top-0 left-4 font-display text-[140px] leading-none text-white/[0.04] pointer-events-none select-none">
        "
      </span>
      {/* Glow orb */}
      <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-ocean/15 blur-2xl pointer-events-none" />

      {showRefresh && (
        <button
          onClick={handleRefresh}
          disabled={spinning}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-200 border border-white/10"
          aria-label="New quote"
        >
          <RefreshCw size={14} className={spinning ? 'animate-spin' : ''} />
        </button>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="font-display text-xl text-white/30 italic">
            Finding today's wisdom…
          </motion.div>
        ) : quote ? (
          <motion.div key={quote.text} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <p className="font-display text-xl md:text-2xl lg:text-3xl font-light italic text-white/90 leading-relaxed mb-4 relative z-10">
              {quote.text}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-ocean-lt relative z-10">
              — {quote.author}
            </p>
            {quote.category && (
              <span className={`inline-block mt-3 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/8 border border-white/10 ${categoryColors[quote.category] || 'text-white/50'} relative z-10`}>
                ✦ {quote.category}
              </span>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}