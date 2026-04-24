// ── STORAGE ──────────────────────────────────
export const Store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem('fs_' + key)
      return v ? JSON.parse(v) : fallback
    } catch { return fallback }
  },
  set(key, val) {
    try { localStorage.setItem('fs_' + key, JSON.stringify(val)); return true }
    catch { return false }
  },
  del(key) { localStorage.removeItem('fs_' + key) },
}

// ── DATES ─────────────────────────────────────
export const today = () => new Date().toISOString().slice(0, 10)

export const fmtDate = (iso) => {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
}

export const fmtTime = () => {
  const d = new Date()
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
}

export const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
}

// ── QUOTES BANK ───────────────────────────────
export const QUOTES_BANK = [
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma", category: "habits" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.", author: "Aristotle", category: "habits" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn", category: "health" },
  { text: "The first wealth is health.", author: "Ralph Waldo Emerson", category: "health" },
  { text: "Water is the driving force of all nature.", author: "Leonardo da Vinci", category: "health" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery", category: "motivation" },
  { text: "Progress, not perfection.", author: "Unknown", category: "motivation" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", category: "mindfulness" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun", category: "habits" },
  { text: "Every morning is a new beginning. Take a deep breath and start again.", author: "Unknown", category: "mindfulness" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "motivation" },
  { text: "Your health is an investment, not an expense.", author: "Unknown", category: "health" },
  { text: "Thousands have lived without love, not one without water.", author: "W.H. Auden", category: "health" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu", category: "motivation" },
  { text: "Self-care is not selfish. You cannot pour from an empty cup.", author: "Unknown", category: "mindfulness" },
  { text: "Be patient with yourself. Self-growth is tender; it's holy ground.", author: "Stephen Covey", category: "mindfulness" },
  { text: "The body achieves what the mind believes.", author: "Unknown", category: "motivation" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "motivation" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock", category: "habits" },
  { text: "A year from now you will wish you had started today.", author: "Karen Lamb", category: "motivation" },
]

export const getDailyQuote = () => {
  const day = Math.floor(Date.now() / 86400000)
  return QUOTES_BANK[day % QUOTES_BANK.length]
}

export const fetchAIQuote = async (forceRefresh = false) => {
  const cacheKey = 'quote_' + today()
  if (!forceRefresh) {
    const cached = Store.get(cacheKey)
    if (cached) return cached
  }
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `Give me one inspiring quote about health, wellness, water, habits, mindfulness, or personal growth from a real famous person. Return ONLY a JSON object: {"text":"quote here","author":"Full Name","category":"health|habits|mindfulness|motivation"}. Do NOT repeat: ${JSON.stringify(Store.get('recent_quotes') || []).slice(0, 200)}`
        }]
      })
    })
    if (resp.ok) {
      const data = await resp.json()
      const raw = data.content.map(b => b.text || '').join('')
      const clean = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      if (parsed.text && parsed.author) {
        Store.set(cacheKey, parsed)
        const recent = Store.get('recent_quotes') || []
        recent.unshift(parsed.text.slice(0, 50))
        Store.set('recent_quotes', recent.slice(0, 30))
        return parsed
      }
    }
  } catch { /* fallback */ }
  const fallback = getDailyQuote()
  Store.set(cacheKey, fallback)
  return fallback
}

// ── MISC ──────────────────────────────────────
export const clamp = (val, min, max) => Math.min(max, Math.max(min, val))
export const pct = (val, max) => Math.round(clamp(val / max * 100, 0, 100))
export const uid = () => Math.random().toString(36).slice(2, 9)