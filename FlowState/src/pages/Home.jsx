import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useWellness } from '../context/WellnessContext'
import { pct as calcPct, INDIA_LEGACY } from '../utils'
import StatCard from '../components/StatCard'
import QuoteBanner from '../components/QuoteBanner'
import PageLayout, { Container } from '../components/PageLayout'
import { useState, useEffect } from 'react'
import background from '../assets/backdrophome.png'
import MandalaQuoteCard from '../components/MandalaQuoteCard'
import chaiImage from '../assets/chai.jpg'
import sitarImage from '../assets/sitar.jpg'
import downloadImage from '../assets/download (1).jpg'
import jaipurImage from '../assets/jaipur1.jpg'
import jasmineImage from '../assets/Disney Princess Aesthetic _ Jasmine.jpg'

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

:root {
  --saffron:   #E87722;
  --gold:      #c9a84c;
  --gold-lt:   #e8c97a;
  --gold-dim:  #8b6914;
  --cream:     #FDF6E3;
  --cream2:    #F5EDD8;
  --bark:      #5C3D1E;
  --bark-lt:   #8B5E2F;
  --lotus:     #D4607A;
  --forest:    #1B4332;
  --forest-lt: #2D6A4F;
  --parchment: #EFD9A8;
}

@keyframes petalFall {
  0%   { transform: translateY(-60px) rotate(0deg) translateX(0); opacity:0; }
  10%  { opacity: 0.85; }
  80%  { opacity: 0.65; }
  100% { transform: translateY(110vh) rotate(660deg) translateX(50px); opacity:0; }
}
@keyframes slowSpin { to { transform: rotate(360deg); } }
@keyframes glowPulse {
  0%,100% { opacity: 0.5; }
  50%     { opacity: 1; }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.fs-petal {
  position: absolute;
  pointer-events: none;
  border-radius: 60% 40% 60% 40% / 60% 60% 40% 40%;
  animation: petalFall linear infinite;
}
.fs-mandala-spin { animation: slowSpin 70s linear infinite; }
.fs-glow { animation: glowPulse 2.8s ease-in-out infinite; }

.fs-ornate-divider {
  display: flex; align-items: center; gap: 14px;
  margin: 0 auto 2.2rem;
}
.fs-ornate-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}

.fs-dash-card {
  background: linear-gradient(135deg, rgba(253,246,227,0.97) 0%, rgba(239,217,168,0.94) 100%);
  border: 1px solid rgba(201,168,76,0.38);
  border-radius: 20px;
  padding: 1.3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 22px rgba(92,61,30,0.11), inset 0 1px 0 rgba(232,199,122,0.35);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
}
.fs-dash-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(92,61,30,0.17), inset 0 1px 0 rgba(232,199,122,0.45);
}
.fs-dash-card::before {
  content: '';
  position: absolute; top:0; left:0; right:0; height:3px;
  background: linear-gradient(90deg, var(--saffron), var(--gold), var(--saffron));
}

.fs-feature-card {
  background: linear-gradient(135deg, rgba(253,246,227,0.96) 0%, rgba(245,237,216,0.93) 100%);
  border: 1px solid rgba(201,168,76,0.28);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative; overflow: hidden;
  box-shadow: 0 2px 14px rgba(92,61,30,0.08);
  transition: all 0.25s ease;
  height: 100%;
}
.fs-feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 34px rgba(92,61,30,0.15);
  border-color: rgba(201,168,76,0.55);
}

.fs-legacy-card {
  background: linear-gradient(145deg, rgba(253,246,227,0.97) 0%, rgba(239,217,168,0.9) 100%);
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 18px;
  padding: 1.3rem;
  transition: all 0.2s;
  box-shadow: 0 2px 12px rgba(92,61,30,0.07);
}
.fs-legacy-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 26px rgba(92,61,30,0.14);
}

.fs-habit-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; border-radius: 14px;
  background: rgba(253,246,227,0.82);
  border: 1px solid rgba(201,168,76,0.18);
  transition: all 0.2s;
}
.fs-habit-row:hover {
  background: rgba(239,217,168,0.92);
  border-color: rgba(201,168,76,0.38);
}

.fs-slide-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,0.4);
  transition: all 0.3s; cursor: pointer; border: none;
}
.fs-slide-dot.active {
  background: white; width: 20px; border-radius: 3px;
}

.fs-sanskrit-banner {
  background: linear-gradient(135deg, #1B4332 0%, #0d3d26 50%, #1B4332 100%);
  border-top: 2px solid #8b6914;
  border-bottom: 2px solid #8b6914;
  padding: 1.2rem 2rem; text-align: center;
  position: relative; overflow: hidden;
}
.fs-sanskrit-banner::before {
  content: '';
  position: absolute; inset:0;
  background: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201,168,76,0.03) 20px, rgba(201,168,76,0.03) 21px);
}
`

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3) % 100}%`,
  size: 9 + (i % 5) * 2.5,
  dur: 8 + (i % 4) * 2.5,
  delay: (i * 1.3) % 10,
  color: i % 3 === 0 ? '#D4607A' : i % 3 === 1 ? '#E87722' : '#c9a84c',
  opacity: 0.45 + (i % 3) * 0.18,
}))

const WISDOM_SLIDES = [
  { tag:'🧘 Yoga & Meditation', title:'Still the mind,\nfree the soul', body:'20 minutes of yoga daily lowers cortisol by 33%, rewires the brain for calm, and sharpens focus. India gave this 5,000-year gift to the world.', stat:'5,000', statLabel:'years of Indian yoga wisdom', accent:'#D4607A', image: chaiImage },
  { tag:'💧 Water & Prana', title:'Water is life.\nPrana is water.', body:'Charaka Samhita called water the first medicine. Your brain is 75% water — 2% dehydration visibly shrinks focus, mood, and memory.', stat:'75%', statLabel:'of your brain is water', accent:'#2196F3', image: sitarImage },
  { tag:'🌙 Sleep & Ayurveda', title:"Sleep is\nBrahma's reset", body:'Ancient Ayurveda named sleep (Nidra) as one of the three pillars of health. 7–9 hours nightly repairs DNA and extends life by measurable years.', stat:'3×', statLabel:'more productive with quality sleep', accent:'#7B61FF', image: downloadImage },
  { tag:'🏃 Movement & Prana', title:'Body in motion,\nsoul in flow', body:'India invented Surya Namaskar — a complete mind-body workout woven into devotion. 30 minutes of daily movement cuts depression risk by 30%.', stat:'30 min', statLabel:'changes everything', accent:'#E87722', image: jaipurImage },
  { tag:'🕉️ Naam Jaap', title:'The vibration\nthat heals', body:'Repeating a sacred name — Ram, Om, Hare Krishna — activates the vagus nerve, lowers blood pressure, and synchronises brainwaves into meditative alpha.', stat:'108×', statLabel:'the sacred count of jaap', accent:'#c9a84c', image: jasmineImage },
]

const FEATURES = [
  { to:'/water',   emoji:'💧', title:'Water Tracker',  desc:'Log every sip. Watch your progress fill beautifully through the day.', accent:'#7EC8E3' },
  { to:'/habits',  emoji:'📅', title:'Habit Calendar', desc:'Build rituals that stick. Track streaks on a beautiful grid calendar.', accent:'#2D6A4F' },
  { to:'/journal', emoji:'📖', title:'Daily Journal',   desc:'Capture thoughts, gratitude, and intentions in your calm private space.', accent:'#E87722' },
  { to:'/quotes',  emoji:'🕉️', title:'Wisdom Quotes',  desc:'Fresh quotes from Chanakya, Vivekananda, Gita & Indian sages — daily.', accent:'#c9a84c' },
]

const sv = (d = 0) => ({
  hidden: { opacity:0, y:26 },
  show:   { opacity:1, y:0, transition:{ duration:0.7, delay:d, ease:[0.22,1,0.36,1] } },
})

/* ─────────────────────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────────────────────── */
const OrnateDivider = ({ symbol = '✦' }) => (
  <div style={{ display:'flex', alignItems:'center', gap:14, margin:'0 auto 2.2rem', maxWidth:560 }}>
    <div style={{ flex:1, height:1, background:'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}/>
    <span style={{ fontSize:'1.25rem', color:'#c9a84c', textShadow:'0 0 12px rgba(201,168,76,0.6)' }}>{symbol}</span>
    <div style={{ flex:1, height:1, background:'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}/>
  </div>
)

const SectionHeading = ({ eyebrow, title, accent, accentColor = 'var(--saffron)' }) => (
  <div style={{ textAlign:'center', marginBottom:'1rem' }}>
    <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.68rem', letterSpacing:'0.28em', color:'var(--bark-lt)', textTransform:'uppercase', marginBottom:6 }}>
      ✦ {eyebrow} ✦
    </p>
    <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.7rem,4vw,2.7rem)', fontWeight:500, color:'var(--bark)', lineHeight:1.25 }}>
      {title}{' '}
      {accent && <em style={{ color: accentColor, fontStyle:'italic' }}>{accent}</em>}
    </h2>
  </div>
)

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
export default function Home() {
  const { waterGoal, todayTotal, habits, todayHabitDone } = useWellness()
  const [slide, setSlide]   = useState(0)
  const [dir, setDir]       = useState(1)
  const [streak, setStreak] = useState(0)
  const activeSlide = WISDOM_SLIDES[slide]

  const waterPct  = calcPct(todayTotal, waterGoal)
  const doneCount = habits.filter(h => todayHabitDone[h.id]).length
  const habitPct  = habits.length ? calcPct(doneCount, habits.length) : 0

  useEffect(() => {
    import('../utils').then(({ Store }) => {
      let s = 0; const d = new Date()
      const log = Store.get('water_log') || {}
      const goal = Store.get('water_goal') || 2500
      for (let i = 0; i < 365; i++) {
        const iso = d.toISOString().slice(0, 10)
        const tot = (log[iso] || []).reduce((a, e) => a + e.ml, 0)
        if (tot >= goal) { s++; d.setDate(d.getDate() - 1) } else break
      }
      setStreak(s)
    })
  }, [todayTotal])

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setSlide(s => (s + 1) % WISDOM_SLIDES.length) }, 5500)
    return () => clearInterval(t)
  }, [])

  const now = new Date()

  return (
    <PageLayout>
      <style>{GLOBAL_CSS}</style>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'#160b04' }}>

        {/* Background photo */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${background})`, backgroundSize:'cover', backgroundPosition:'center top', filter:'brightness(0.8) saturate(1.2)' }}/>

        {/* Layered overlays */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(16,7,2,0.52) 0%, rgba(35,16,4,0.25) 35%, rgba(25,10,3,0.6) 75%, rgba(253,246,227,0) 100%)' }}/>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 8%, rgba(255,210,100,0.36) 0%, rgba(232,119,34,0.16) 28%, transparent 56%)' }}/>
        <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'30%', background:'linear-gradient(90deg, rgba(12,5,1,0.65) 0%, transparent 100%)' }}/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:140, background:'linear-gradient(to bottom, transparent, #FDF6E3)' }}/>

        {/* Floating petals */}
        {PETALS.map(p => (
          <div key={p.id} className="fs-petal" style={{
            left:p.left, top:'-40px', width:p.size, height:p.size * 0.65,
            background:p.color, opacity:p.opacity,
            animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s`,
            filter:'blur(0.4px)',
          }}/>
        ))}

        {/* Spinning mandala watermark */}
        <div className="fs-mandala-spin" style={{ position:'absolute', top:-80, right:-80, width:360, height:360, opacity:0.055, pointerEvents:'none' }}>
          <svg viewBox="0 0 360 360" fill="none">
            {[0,30,60,90,120,150].map(r => (
              <g key={r} transform={`rotate(${r} 180 180)`}>
                <ellipse cx="180" cy="90" rx="20" ry="90" stroke="#c9a84c" strokeWidth="1"/>
              </g>
            ))}
            <circle cx="180" cy="180" r="160" stroke="#c9a84c" strokeWidth="0.8"/>
            <circle cx="180" cy="180" r="110" stroke="#c9a84c" strokeWidth="0.5"/>
            <circle cx="180" cy="180" r="60"  stroke="#c9a84c" strokeWidth="0.8"/>
            <circle cx="180" cy="180" r="18"  fill="#c9a84c" opacity="0.3"/>
          </svg>
        </div>

        {/* Hero content */}
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:1180, margin:'0 auto', padding:'5rem 1.5rem 3.5rem' }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:'3rem' }}>

            {/* Left: text block */}
            <div style={{ flex:'1 1 320px', maxWidth:580, textAlign:'center' }}>
              <motion.div
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 18px', borderRadius:999, background:'rgba(253,246,227,0.13)', backdropFilter:'blur(10px)', border:'1px solid rgba(201,168,76,0.42)', marginBottom:'1.5rem' }}
              >
                <span style={{ color:'#e8c97a', fontSize:11 }}>✦</span>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'0.22em', color:'rgba(253,246,227,0.85)', textTransform:'uppercase' }}>जल ही जीवन है</span>
                <span style={{ color:'#e8c97a', fontSize:11 }}>✦</span>
              </motion.div>

              <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.08 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.8rem,7.5vw,5.2rem)', fontWeight:600, lineHeight:0.95, color:'#FDF6E3', textShadow:'0 4px 30px rgba(16,6,2,0.5)', letterSpacing:'-0.01em' }}>
                  Rooted in
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.8rem,7.5vw,5.2rem)', fontWeight:700, lineHeight:0.95, color:'var(--saffron)', textShadow:'0 0 40px rgba(232,119,34,0.55), 0 4px 24px rgba(16,6,2,0.4)', fontStyle:'italic', marginBottom:'0.25rem' }}>
                  Ritual.
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.8rem,7.5vw,5.2rem)', fontWeight:600, lineHeight:0.95, color:'#FDF6E3', textShadow:'0 4px 30px rgba(16,6,2,0.5)', marginBottom:'1.3rem' }}>
                  Living in Flow.
                </div>
              </motion.div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.28 }}
                style={{ fontFamily:"'Lora',serif", fontStyle:'italic', fontSize:'1.05rem', color:'rgba(253,246,227,0.7)', lineHeight:1.65, marginBottom:'2rem', maxWidth:460, margin:'0 auto 2rem' }}>
                Ancient wisdom. Modern rhythm.<br/>Daily practices to heal your mind, body &amp; soul.
              </motion.p>

              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
                style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginBottom:'1rem' }}>
                <Link to="/water" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 26px', borderRadius:999, fontFamily:"'Cinzel',serif", fontSize:'0.8rem', fontWeight:600, color:'white', letterSpacing:'0.08em', background:'linear-gradient(135deg, #E87722 0%, #c9600a 100%)', border:'1px solid rgba(232,119,34,0.55)', boxShadow:'0 4px 20px rgba(232,119,34,0.42), inset 0 1px 0 rgba(255,255,255,0.14)', textDecoration:'none' }}>
                  💧 Track Water
                </Link>
                <Link to="/quotes" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 26px', borderRadius:999, fontFamily:"'Cinzel',serif", fontSize:'0.8rem', fontWeight:500, color:'rgba(253,246,227,0.9)', letterSpacing:'0.08em', background:'rgba(253,246,227,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(201,168,76,0.48)', textDecoration:'none' }}>
                  🕉️ Daily Wisdom
                </Link>
              </motion.div>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                style={{ fontFamily:"'Lora',serif", fontStyle:'italic', fontSize:'0.78rem', color:'rgba(253,246,227,0.38)', letterSpacing:'0.1em', marginTop:'0.8rem' }}>
                ✦ Your morning sanctuary ✦
              </motion.p>
            </div>

            {/* Right: Mughal card */}
            <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.5 }}
              style={{ flex:'0 0 auto', display:'flex', justifyContent:'center', marginLeft:'4.6rem' }}>
              <MandalaQuoteCard />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT  (parchment page)
      ══════════════════════════════════════════════════════ */}
      <div style={{ background:'linear-gradient(180deg, #FDF6E3 0%, #F5EDD8 35%, #EFD9A8 100%)', paddingBottom:'5rem' }}>

        {/* Decorative top border band */}
        <div style={{ height:8, background:'linear-gradient(90deg, var(--saffron), var(--gold), var(--forest), var(--gold), var(--saffron))' }}/>
        <div style={{ textAlign:'center', padding:'5px 0', background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }}>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.6rem', letterSpacing:'0.4em', color:'#8b6914' }}>✦ ✦ ✦</span>
        </div>

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'3rem 1.2rem 0' }}>

          {/* ── Dashboard stats ── */}
          <motion.div variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <SectionHeading eyebrow="Today at a Glance" title="Your day," accent="beautifully tracked."/>
          </motion.div>
          <OrnateDivider/>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:'3.5rem' }}>
            <motion.div variants={sv(0.06)} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <StatCard type="water"  emoji="💧" value={todayTotal} unit="ml"   label="Water consumed"   sub={`Goal: ${waterGoal} ml · ${waterPct}%`} to="/water"  pct={waterPct}  delay={0.06}/>
            </motion.div>
            <motion.div variants={sv(0.10)} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <StatCard type="habits" emoji="✅" value={doneCount}  unit="done" label="Habits completed" sub={`of ${habits.length} today`}             to="/habits" pct={habitPct} delay={0.10}/>
            </motion.div>
            <motion.div variants={sv(0.14)} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <StatCard type="streak" emoji="🔥" value={streak}     unit="days" label="Hydration streak"  sub="Days you hit your goal"                                              delay={0.14}/>
            </motion.div>
            <motion.div variants={sv(0.18)} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <div className="fs-dash-card" style={{ minHeight:120 }}>
                <div style={{ fontSize:'2rem', marginBottom:6 }}>🪷</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:500, color:'var(--bark)', lineHeight:1 }}>
                  {now.toLocaleDateString('en-IN', { month:'short', day:'numeric' })}
                </div>
                <div style={{ fontFamily:"'Lora',serif", fontSize:'0.85rem', color:'var(--bark-lt)', marginTop:4 }}>
                  {now.toLocaleDateString('en-IN', { weekday:'long' })}
                </div>
                <div style={{ fontSize:'0.65rem', color:'var(--gold-dim)', marginTop:5, fontFamily:"'Cinzel',serif", letterSpacing:'0.1em' }}>Make today count ✦</div>
              </div>
            </motion.div>
          </div>

          {/* ── Today's Wisdom heading + QuoteBanner ── */}
          <motion.div variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <SectionHeading eyebrow="Today's Wisdom" title="Ancient wisdom," accent="modern life."/>
          </motion.div>

          <motion.div variants={sv(0.05)} initial="hidden" whileInView="show" viewport={{ once:true }} style={{ marginBottom:'1.5rem' }}>
            <QuoteBanner />
          </motion.div>

          {/* ── Wisdom Carousel ── */}
          <motion.div variants={sv(0.1)} initial="hidden" whileInView="show" viewport={{ once:true }}
            style={{ position:'relative', borderRadius:32, overflow:'hidden', marginBottom:'4rem', minHeight:420, border:'1px solid rgba(165,120,55,0.32)', boxShadow:'0 8px 48px rgba(92,61,30,0.16)' }}>
            
            {/* Slide image background */}
            <div style={{ position:'absolute', inset:0, backgroundImage:`url(${activeSlide?.image})`, backgroundSize:'cover', backgroundPosition:'center', filter:'saturate(1.08) brightness(0.82)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(140deg, rgba(22,11,4,0.38) 0%, rgba(27,67,50,0.24) 45%, rgba(92,61,30,0.44) 100%)' }}/>
            <div style={{ position:'absolute', inset:0, opacity:0.28, backgroundImage:'repeating-linear-gradient(to right, rgba(255,255,255,0.28) 0, rgba(255,255,255,0.28) 2px, transparent 2px, transparent 62px)' }}/>
            <div style={{ position:'absolute', inset:0, opacity:0.22, background:'radial-gradient(circle at 10% 10%, rgba(255,255,255,0.6), transparent 26%), radial-gradient(circle at 90% 8%, rgba(255,255,255,0.5), transparent 30%)' }}/>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top, rgba(55,85,115,0.5), transparent)' }}/>

            <div style={{ position:'relative', zIndex:10, minHeight:420, padding:'2rem 1rem 5rem', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity:0, rotateY: dir > 0 ? -20 : 20, x: dir > 0 ? 28 : -28 }}
                  animate={{ opacity:1, rotateY:0, x:0 }}
                  exit={{ opacity:0, rotateY: dir > 0 ? 14 : -14, x: dir > 0 ? -20 : 20 }}
                  transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
                  style={{
                    width:'100%', maxWidth:700, borderRadius:24,
                    background:'transparent',
                    border:'1px solid rgba(255,255,255,0.76)',
                    boxShadow:'0 8px 40px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.2)',
                    padding:'2rem 2.2rem', position:'relative', overflow:'hidden',
                  }}
                >
                  <div style={{ position:'absolute', inset:0, borderRadius:24, opacity:0.32, pointerEvents:'none', backgroundImage:'repeating-linear-gradient(0deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18) 1px, transparent 1px, transparent 26px)' }}/>
                  <span style={{ position:'absolute', top:10, right:18, fontSize:68, color:'rgba(255,255,255,0.16)', fontFamily:'serif', lineHeight:1, pointerEvents:'none' }}>ॐ</span>

                  <div style={{ position:'relative', zIndex:2 }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:999, background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,0.7)', fontSize:12, fontWeight:700, fontFamily:"'Cinzel',serif", letterSpacing:'0.05em', marginBottom:14, textShadow:'0 1px 8px rgba(0,0,0,0.45)' }}>
                      {activeSlide?.tag}
                    </span>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(27px,5vw,42px)', fontWeight:600, color:'#fff', lineHeight:1.15, whiteSpace:'pre-line', marginBottom:12, textShadow:'0 2px 14px rgba(0,0,0,0.5)' }}>
                      {activeSlide?.title}
                    </h3>
                    <p style={{ fontSize:15, lineHeight:1.72, color:'rgba(255,255,255,0.9)', fontFamily:"'Lora',serif", marginBottom:16, maxWidth:560, textShadow:'0 1px 10px rgba(0,0,0,0.5)' }}>
                      {activeSlide?.body}
                    </p>
                    <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
                      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:600, color:'#fff', textShadow:'0 2px 12px rgba(0,0,0,0.5)' }}>{activeSlide?.stat}</span>
                      <span style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.78)', fontFamily:"'Lora',serif", textShadow:'0 1px 8px rgba(0,0,0,0.5)' }}>{activeSlide?.statLabel}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel controls */}
            <div style={{ position:'absolute', bottom:14, left:0, right:0, zIndex:20, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
              <button onClick={() => { setDir(-1); setSlide(s => (s - 1 + WISDOM_SLIDES.length) % WISDOM_SLIDES.length) }}
                style={{ padding:'5px 15px', borderRadius:999, border:'1px solid rgba(255,255,255,0.52)', background:'rgba(255,255,255,0.26)', backdropFilter:'blur(8px)', color:'white', fontSize:12, fontWeight:600, fontFamily:"'Cinzel',serif", cursor:'pointer', letterSpacing:'0.04em' }}>
                ← Prev
              </button>
              <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                {WISDOM_SLIDES.map((_, i) => (
                  <button key={i} className={`fs-slide-dot${i === slide ? ' active' : ''}`} onClick={() => { setDir(i > slide ? 1 : -1); setSlide(i) }} aria-label={`Slide ${i+1}`}/>
                ))}
              </div>
              <button onClick={() => { setDir(1); setSlide(s => (s + 1) % WISDOM_SLIDES.length) }}
                style={{ padding:'5px 15px', borderRadius:999, border:'1px solid rgba(255,255,255,0.52)', background:'rgba(255,255,255,0.26)', backdropFilter:'blur(8px)', color:'white', fontSize:12, fontWeight:600, fontFamily:"'Cinzel',serif", cursor:'pointer', letterSpacing:'0.04em' }}>
                Next →
              </button>
            </div>
          </motion.div>

          {/* ── Habits preview ── */}
          {habits.length > 0 && (
            <motion.div variants={sv(0.1)} initial="hidden" whileInView="show" viewport={{ once:true }} style={{ marginBottom:'3.5rem' }}>
              <SectionHeading eyebrow="Habits &amp; Streaks" title="Today's" accent="practice." accentColor="var(--forest-lt)"/>
              <OrnateDivider symbol="🌸"/>
              <div style={{ background:'rgba(253,246,227,0.72)', borderRadius:20, border:'1px solid rgba(201,168,76,0.28)', padding:'1.5rem', boxShadow:'0 4px 20px rgba(92,61,30,0.09)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', color:'var(--bark)', fontWeight:600 }}>Today's Habits</h3>
                    <p style={{ fontSize:11, color:'var(--bark-lt)', fontFamily:"'Lora',serif" }}>{doneCount} of {habits.length} completed</p>
                  </div>
                  <Link to="/habits" style={{ fontFamily:"'Cinzel',serif", fontSize:10, color:'var(--bark-lt)', letterSpacing:'0.1em', textDecoration:'none', padding:'5px 12px', borderRadius:999, border:'1px solid rgba(201,168,76,0.38)', background:'rgba(201,168,76,0.09)' }}>
                    View All →
                  </Link>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {habits.slice(0, 5).map(h => {
                    const done = !!todayHabitDone[h.id]
                    return (
                      <div key={h.id} className="fs-habit-row">
                        <div style={{ width:22, height:22, borderRadius:6, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, background: done ? 'linear-gradient(135deg, #2D6A4F, #1B4332)' : 'transparent', border: done ? 'none' : '2px solid rgba(201,168,76,0.32)', color:'white', transition:'all 0.3s', transform: done ? 'scale(1.1)' : 'scale(1)' }}>{done && '✓'}</div>
                        <span style={{ flex:1, fontSize:14, fontFamily:"'Lora',serif", color: done ? 'rgba(92,61,30,0.38)' : 'var(--bark)', textDecoration: done ? 'line-through' : 'none' }}>{h.icon} {h.name}</span>
                        {done && <span style={{ fontSize:10, color:'var(--forest-lt)', fontWeight:700, fontFamily:"'Cinzel',serif", letterSpacing:'0.1em' }}>done ✦</span>}
                      </div>
                    )
                  })}
                  {habits.length > 5 && (
                    <Link to="/habits" style={{ textAlign:'center', fontSize:12, color:'var(--bark-lt)', fontFamily:"'Lora',serif", fontStyle:'italic', textDecoration:'none', padding:'6px' }}>
                      +{habits.length - 5} more — view all →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Feature cards ── */}
          <motion.div variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <SectionHeading eyebrow="Everything in FlowState" title="Your wellness," accent="whole."/>
          </motion.div>
          <OrnateDivider symbol="🕉️"/>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:'4rem' }}>
            {FEATURES.map(({ to, emoji, title, desc, accent }, i) => (
              <motion.div key={to} variants={sv(i * 0.08)} initial="hidden" whileInView="show" viewport={{ once:true }}>
                <Link to={to} style={{ textDecoration:'none', display:'block', height:'100%' }}>
                  <div className="fs-feature-card">
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${accent}, transparent)` }}/>
                    <div style={{ width:46, height:46, borderRadius:13, marginBottom:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, background:`${accent}1a`, border:`1px solid ${accent}38` }}>{emoji}</div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', fontWeight:600, color:'var(--bark)', marginBottom:6 }}>{title}</h3>
                    <p style={{ fontSize:12.5, color:'var(--bark-lt)', fontFamily:"'Lora',serif", lineHeight:1.62, marginBottom:10 }}>{desc}</p>
                    <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700, color:accent, fontFamily:"'Cinzel',serif", letterSpacing:'0.08em' }}>
                      Explore <ArrowRight size={10}/>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ── India Legacy ── */}
          <motion.div variants={sv(0)} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <SectionHeading eyebrow="भारत का गौरव" title="India's" accent="ancient greatness." accentColor="#d97706"/>
          </motion.div>
          <OrnateDivider symbol="🪔"/>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:'2.5rem' }}>
            {(INDIA_LEGACY || []).map((item, i) => (
              <motion.div key={item.title} variants={sv(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once:true }}>
                <div className="fs-legacy-card">
                  <div style={{ fontSize:'2rem', marginBottom:9 }}>{item.icon}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.12rem', fontWeight:600, color:'var(--bark)', marginBottom:3 }}>{item.title}</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.62rem', fontWeight:700, color:'#d97706', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:7 }}>{item.subtitle}</div>
                  <p style={{ fontSize:12.5, color:'var(--bark-lt)', lineHeight:1.65, fontFamily:"'Lora',serif" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sanskrit verse banner */}
        <div className="fs-sanskrit-banner" style={{ marginTop:'3.5rem' }}>
          <div style={{ position:'relative', zIndex:1 }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', color:'#e8c97a', fontStyle:'italic', letterSpacing:'0.05em' }}>
              स्वस्थस्य स्वास्थ्यं रक्षणं, आतुरस्य विकार प्रशमनम् ।
            </p>
            <p style={{ fontSize:11, color:'rgba(201,168,76,0.58)', marginTop:4, fontFamily:"'Lora',serif", fontStyle:'italic' }}>
              The wise protect their health; the sick seek to cure.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop:'3rem', padding:'3rem 1.5rem', borderTop:'1px solid rgba(201,168,76,0.22)', textAlign:'center', background:'linear-gradient(180deg, transparent, rgba(239,217,168,0.45))' }}>
          <div style={{ fontSize:'2.4rem', marginBottom:10 }}>🪔</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.55rem', fontWeight:500, color:'var(--bark)', marginBottom:5 }}>💧 FlowState</div>
          <p style={{ fontFamily:"'Lora',serif", fontStyle:'italic', fontSize:13, color:'var(--bark-lt)', marginBottom:4 }}>
            Flow with Ashiya — Transform ancient wisdom into modern consistency
          </p>
          <p style={{ fontSize:11, color:'rgba(92,61,30,0.38)', marginTop:12 }}>
            Made with <span style={{ color:'#D4607A', fontSize:13 }}>♥</span> by <strong style={{ color:'var(--bark)' }}>Ashiya</strong>
            {' '}·{' '}
            <span style={{ fontFamily:"'Lora',serif", fontStyle:'italic', fontWeight:500, color:'var(--gold-dim)' }}>सत्यमेव जयते</span>
          </p>
          <p style={{ fontSize:10, color:'rgba(92,61,30,0.28)', marginTop:5, fontFamily:"'Cinzel',serif", letterSpacing:'0.15em' }}>
            © {now.getFullYear()} FLOWSTATE · MADE IN INDIA
          </p>
        </footer>
      </div>
    </PageLayout>
  )
}
