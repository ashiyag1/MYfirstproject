import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useWellness } from '../context/WellnessContext'
import { INDIA_LEGACY } from '../utils'
import PageLayout from '../components/PageLayout'
import SectionHeading from '../components/SectionHeading'
import OrnateDivider from '../components/OrnateDivider'
import HeroSection from '../sections/HeroSection'
import DashboardStats from '../sections/DashboardStats'
import WisdomCarousel from '../sections/WisdomCarousel'

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
   HOME PAGE
───────────────────────────────────────────────────────────── */
export default function Home() {
  const { habits, todayHabitDone } = useWellness()

  const doneCount = habits.filter(h => todayHabitDone[h.id]).length

  const now = new Date()

  return (
    <PageLayout>
      <style>{GLOBAL_CSS}</style>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <HeroSection />

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

          <DashboardStats />

          <WisdomCarousel />

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
