import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Calendar, BookOpen, Sparkles, ArrowRight, Flame } from 'lucide-react'
import { Store, today, pct as calcPct } from '../utils'
import StatCard from '../components/StatCard'
import QuoteBanner from '../components/QuoteBanner'
import PageLayout, { Container } from '../components/PageLayout'

const features = [
  { to: '/water',   icon: Droplets,  color: 'from-ocean/20 to-ocean-lt/10', iconColor: 'text-ocean', title: 'Water Tracker',    desc: 'Log every sip. Watch your beautiful drop fill up through the day.' },
  { to: '/habits',  icon: Calendar,  color: 'from-sage/20 to-sage-lt/10',   iconColor: 'text-sage',  title: 'Habit Calendar',   desc: 'Build rituals that stick. Track streaks on a beautiful calendar.' },
  { to: '/journal', icon: BookOpen,  color: 'from-gold/20 to-gold-lt/10',   iconColor: 'text-amber-600', title: 'Daily Journal', desc: 'Capture thoughts, intentions & gratitude in a calm space.' },
  { to: '/quotes',  icon: Sparkles,  color: 'from-purple-200/30 to-pink-100/20', iconColor: 'text-purple-500', title: 'Wisdom Quotes', desc: 'AI-curated quotes from great minds — fresh every day.' },
]

export default function Home() {
  const td = today()
  const waterData = Store.get('water_' + td) || { entries: [], goal: 2500 }
  const totalMl = waterData.entries.reduce((s, e) => s + e.ml, 0)
  const goal = waterData.goal || 2500
  const waterPct = calcPct(totalMl, goal)

  const habits = Store.get('habits_list') || []
  const doneToday = Store.get('habits_done_' + td) || {}
  const doneCount = habits.filter(h => doneToday[h.id]).length
  const habitPct = habits.length ? calcPct(doneCount, habits.length) : 0

  // Hydration streak
  let streak = 0
  const d = new Date()
  for (let i = 0; i < 365; i++) {
    const iso = d.toISOString().slice(0, 10)
    const wd = Store.get('water_' + iso) || {}
    const tot = (wd.entries || []).reduce((s, e) => s + e.ml, 0)
    if (tot >= (wd.goal || 2500)) { streak++; d.setDate(d.getDate() - 1) }
    else break
  }

  const now = new Date()

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0D1F2D 0%, #163d56 45%, #0d5442 100%)' }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-sand-lt dark:to-ink pointer-events-none" />

        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-6 block relative z-10"
          style={{ filter: 'drop-shadow(0 16px 40px rgba(87,184,214,0.5))' }}
        >
          🌊
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl md:text-8xl font-light text-white tracking-[-3px] leading-none mb-4 relative z-10"
        >
          Flow<em className="not-italic" style={{ color: '#9FE1CB' }}>State</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/60 text-lg font-light max-w-sm leading-relaxed mb-8 relative z-10"
        >
          Your calm corner for hydration, habits, and living with quiet intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-3 justify-center relative z-10"
        >
          <Link to="/water"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-ink font-bold rounded-full text-sm shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200">
            💧 Track Water
          </Link>
          <Link to="/habits"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-full text-sm hover:bg-white/10 hover:border-white/60 transition-all duration-200">
            📅 Log Habits
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-white/30 text-[11px] tracking-widest uppercase animate-bounce z-10"
        >
          ↓ your dashboard awaits
        </motion.div>
      </section>

      {/* Dashboard */}
      <Container className="py-12">
        {/* Quote */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <QuoteBanner />
        </motion.div>

        {/* Stats */}
        <div className="eyebrow mb-4">Today at a glance</div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard type="water"  emoji="💧" value={totalMl} unit="ml"   label="Water consumed"   sub={`Goal: ${goal} ml · ${waterPct}%`} to="/water"  pct={waterPct}  delay={0.1} />
          <StatCard type="habits" emoji="✅" value={doneCount} unit="done" label="Habits completed" sub={`of ${habits.length} total`}        to="/habits" pct={habitPct} delay={0.15} />
          <StatCard type="streak" emoji="🔥" value={streak}   unit="days" label="Hydration streak"  sub="Days you hit your goal"                                            delay={0.2} />
          <div className="card-hover p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-400 to-pink-300" />
            <span className="text-3xl mb-3 block">🌤️</span>
            <div className="font-display text-3xl font-medium text-ink dark:text-sand-lt leading-none">
              {now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-sm text-mist-dark dark:text-ocean-lt/80 mt-1 font-medium">
              {now.toLocaleDateString('en-IN', { weekday: 'long' })}
            </div>
            <div className="text-[11px] text-mist-dark/70 mt-0.5">Make today count ✦</div>
          </div>
        </div>

        {/* Today's habits preview */}
        {habits.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl text-ink dark:text-sand-lt">Today's Habits</h2>
                <p className="text-xs text-mist-dark dark:text-ocean-lt/60 mt-0.5">Quick check-in</p>
              </div>
              <Link to="/habits" className="btn-ghost text-xs">Manage →</Link>
            </div>
            <div className="flex flex-col gap-2">
              {habits.slice(0, 5).map(h => {
                const done = !!doneToday[h.id]
                return (
                  <div key={h.id} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-sand-lt dark:bg-ink border border-ocean-pale dark:border-ocean/10">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] flex-shrink-0 ${done ? 'bg-sage text-white' : 'border-2 border-ocean-pale dark:border-ocean/20'}`}>
                      {done ? '✓' : ''}
                    </div>
                    <span className={`text-sm font-medium ${done ? 'line-through text-mist-dark dark:text-ocean-lt/40' : 'text-ink dark:text-sand-lt'}`}>
                      {h.icon} {h.name}
                    </span>
                    {done && <span className="ml-auto text-[11px] text-sage font-semibold">done ✦</span>}
                  </div>
                )
              })}
              {habits.length > 5 && (
                <Link to="/habits" className="text-center text-xs text-ocean dark:text-ocean-lt py-1 hover:underline">
                  +{habits.length - 5} more — view all →
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* Feature cards */}
        <div className="eyebrow mb-4 mt-8">Everything in FlowState</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ to, icon: Icon, color, iconColor, title, desc }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              <Link to={to} className="group block card-hover p-6 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  <h3 className="font-display text-xl text-ink dark:text-sand-lt mb-1.5">{title}</h3>
                  <p className="text-sm text-mist-dark dark:text-ocean-lt/70 font-light leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-ocean dark:text-ocean-lt">
                    Open <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Footer */}
      <footer className="border-t border-ocean-pale dark:border-ocean/20 mt-12 py-8 text-center">
        <div className="font-display text-xl text-ink dark:text-sand-lt mb-1">💧 FlowState</div>
        <p className="text-xs text-mist-dark dark:text-ocean-lt/50">Built for calm minds and consistent habits.</p>
      </footer>
    </PageLayout>
  )
}