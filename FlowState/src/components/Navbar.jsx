import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, LogIn } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Nav items: English label (big) + Sanskrit sub (small) ── */
const NAV = [
  { to: '/',        label: 'Home',    sub: 'Sanctuary' },
  { to: '/water',   label: 'Water',   sub: 'Amrit'     },
  { to: '/habits',  label: 'Habits',  sub: 'Sadhana'   },
  { to: '/journal', label: 'Journal', sub: 'Chintan'   },
  { to: '/quotes',  label: 'Wisdom',  sub: 'Gyan'      },
]

/* ── Unchanged FlowSymbol ── */
function FlowSymbol({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 1 L31 16 L16 31 L1 16 Z" stroke="url(#sg)" strokeWidth="0.9" fill="none"/>
      <path d="M16 4.5 L27.5 16 L16 27.5 L4.5 16 Z" stroke="url(#sg)" strokeWidth="0.55" fill="none" opacity="0.45"/>
      {[0,45,90,135,180,225,270,315].map(d => (
        <ellipse key={d} cx="16" cy="9.5" rx="1.6" ry="5.2"
          fill="url(#sg)" opacity="0.55" transform={`rotate(${d} 16 16)`}/>
      ))}
      <circle cx="16" cy="16" r="5.5" stroke="url(#sg)" strokeWidth="0.55" fill="none" opacity="0.5"/>
      <circle cx="16" cy="16" r="2.2" fill="url(#sg)" opacity="0.95"/>
      <circle cx="16" cy="16" r="0.9" fill="white" opacity="0.9"/>
      {[['16','1'],['31','16'],['16','31'],['1','16']].map(([cx,cy]) => (
        <circle key={cx+cy} cx={cx} cy={cy} r="0.9" fill="url(#sg)" opacity="0.7"/>
      ))}
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#e8c46a"/>
          <stop offset="50%" stopColor="#d4a82a"/>
          <stop offset="100%" stopColor="#c8921a"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Single nav link ── */
function NavItem({ to, label, sub }) {
  return (
    <NavLink to={to} end={to === '/'} style={{ textDecoration: 'none' }}
      className={({ isActive }) =>
        `relative flex flex-col items-center px-3.5 py-1.5 rounded-full transition-all duration-200 select-none
         ${isActive ? 'text-[#3d2208] dark:text-[#f5e6c8]' : 'text-[#6b4c12]/65 dark:text-[#d9b96a]/50 hover:text-[#3d2208] dark:hover:text-[#f5e6c8]'}`
      }>
      {({ isActive }) => (<>
        {isActive && (
          <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg,rgba(212,168,42,0.26),rgba(196,145,30,0.14))',
              border: '1px solid rgba(212,168,42,0.4)',
              boxShadow: '0 2px 10px rgba(180,120,20,0.15),inset 0 1px 0 rgba(232,199,122,0.18)',
            }}
            transition={{ type:'spring', stiffness:400, damping:36 }}/>
        )}
        {/* Main English label */}
        <span className="relative z-10 text-[0.78rem] font-semibold leading-tight"
          style={{ fontFamily:"'Cinzel',serif", letterSpacing:'0.07em' }}>
          {label}
        </span>
        {/* Sanskrit sub-label */}
        <span className="relative z-10 text-[0.58rem] leading-none opacity-50 mt-0.5"
          style={{ fontFamily:"'Lora',serif", fontStyle:'italic' }}>
          {sub}
        </span>
      </>)}
    </NavLink>
  )
}

/* ── Gold dot divider ── */
const Dot = () => (
  <span style={{ width:3, height:3, borderRadius:'50%', background:'rgba(201,168,76,0.45)', flexShrink:0 }}/>
)

const wordmarkStyle = {
  fontFamily:"'Samarkan','Yatra One','Tiro Devanagari Hindi','Cormorant Garamond',serif",
  fontSize:'1.58rem',
  fontWeight:400,
  color:'#c4911e',
  lineHeight:1,
  letterSpacing:'0.04em',
  textShadow:'0 1px 0 rgba(255,240,190,0.35)',
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [visible,  setVisible]  = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y > lastY.current + 8) setVisible(false)
      if (y < lastY.current - 8 || y < 80) setVisible(true)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const barBg = dark
    ? 'linear-gradient(180deg,rgba(22,14,5,0.97),rgba(30,18,7,0.97))'
    : 'linear-gradient(180deg,rgba(253,246,234,0.97),rgba(245,228,200,0.97))'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Lora:ital@1&family=Tiro+Devanagari+Hindi&display=swap');
        @import url('https://fonts.cdnfonts.com/css/samarkan');

        @keyframes shimmer {
          from { background-position: -500px 0; }
          to   { background-position:  500px 0; }
        }
        .nb-shimmer {
          background: linear-gradient(90deg,transparent 0%,rgba(232,199,122,0.65) 50%,transparent 100%);
          background-size: 500px 1px;
          animation: shimmer 4s linear infinite;
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-3px); }
        }
        .nb-float { animation: floatY 3.5s ease-in-out infinite; }
      `}</style>

      <motion.header
        animate={{ y: visible ? 0 : -90, opacity: visible ? 1 : 0 }}
        transition={{ duration:0.28, ease:[0.4,0,0.2,1] }}
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, height:'4.75rem' }}
      >
        {/* ── Bar ── */}
        <div style={{
          height:'100%', display:'flex', alignItems:'center',
          background: barBg,
          backdropFilter:'blur(24px)',
          borderBottom:'1px solid rgba(212,168,42,0.22)',
          boxShadow: scrolled
            ? '0 4px 36px rgba(160,100,10,0.2)'
            : '0 2px 18px rgba(160,100,10,0.08)',
          transition:'box-shadow 0.3s',
          position:'relative',
        }}>

          {/* Top shimmer */}
          <span className="nb-shimmer" style={{ position:'absolute', inset:'0 0 auto', height:1, pointerEvents:'none' }}/>
          {/* Bottom rule */}
          <span style={{ position:'absolute', inset:'auto 0 0', height:1, pointerEvents:'none',
            background:'linear-gradient(90deg,transparent,rgba(212,168,42,0.4),transparent)' }}/>

          {/* Central hanging arch */}
          <span style={{
            position:'absolute', left:'50%', transform:'translateX(-50%)', top:-1,
            width:196, height:34, pointerEvents:'none',
            borderRadius:'0 0 100px 100px',
            borderBottom:'1px solid rgba(212,168,42,0.28)',
            borderLeft:'1px solid rgba(212,168,42,0.18)',
            borderRight:'1px solid rgba(212,168,42,0.18)',
            background:'linear-gradient(180deg,rgba(212,168,42,0.07),transparent)',
          }}/>

          {/* ── 3-column grid ── */}
          <div className="hidden md:grid" style={{
            gridTemplateColumns:'1fr auto 1fr',
            alignItems:'center', width:'100%', padding:'0 1.5rem', gap:'1rem',
          }}>

            {/* LEFT — all nav links in one pill */}
            <div style={{ display:'flex', alignItems:'center' }}>
              <div style={{
                display:'flex', alignItems:'center', gap:2,
                padding:'5px 8px', borderRadius:999,
                border:'1px solid rgba(212,168,42,0.2)',
                background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.42)',
                boxShadow:'inset 0 1px 0 rgba(232,199,122,0.1)',
                position:'relative',
              }}>
                {/* Pill inner shimmer */}
                <span style={{
                  position:'absolute', inset:'0 0 auto', height:1, pointerEvents:'none',
                  background:'linear-gradient(90deg,transparent,rgba(212,168,42,0.28),transparent)',
                }}/>
                {NAV.map((item, i) => (
                  <div key={item.to} style={{ display:'flex', alignItems:'center' }}>
                    <NavItem {...item}/>
                    {i < NAV.length - 1 && <Dot/>}
                  </div>
                ))}
              </div>
            </div>

            {/* CENTRE — brand */}
            <NavLink to="/" style={{ textDecoration:'none', display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div className="nb-float" style={{ position:'relative', marginBottom:2 }}>
                <span style={{
                  position:'absolute', inset:0, borderRadius:'50%',
                  background:'radial-gradient(circle,rgba(212,168,42,0.45) 0%,transparent 70%)',
                  filter:'blur(10px)', transform:'scale(1.2)', opacity:0.5,
                  pointerEvents:'none',
                }}/>
                <FlowSymbol size={34}/>
              </div>
              <div style={{ lineHeight:1, display:'flex', alignItems:'baseline' }}>
                <span style={{
                  ...wordmarkStyle,
                  color: dark ? '#e8c46a' : '#8a5a12',
                }}>FlowState</span>
              </div>
              {/* Double underline */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, marginTop:3 }}>
                <span style={{ width:60, height:1, background:'linear-gradient(90deg,transparent,rgba(196,145,30,0.65),transparent)' }}/>
                <span style={{ width:38, height:1, background:'linear-gradient(90deg,transparent,rgba(196,145,30,0.3),transparent)' }}/>
              </div>
            </NavLink>

            {/* RIGHT — dark toggle + sign in */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:10 }}>

              {/* Dark mode button */}
              <motion.button type="button" whileTap={{ scale:0.88 }} onClick={toggle}
                style={{
                  width:36, height:36, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:'1px solid rgba(212,168,42,0.36)',
                  background: dark
                    ? 'linear-gradient(135deg,rgba(212,168,42,0.14),rgba(196,145,30,0.07))'
                    : 'linear-gradient(135deg,rgba(255,255,255,0.7),rgba(245,228,200,0.5))',
                  boxShadow:'0 2px 10px rgba(160,100,10,0.14),inset 0 1px 0 rgba(232,199,122,0.18)',
                  color: dark ? '#d9b96a' : '#6b4c12',
                  cursor:'pointer', position:'relative',
                }} aria-label="Toggle theme">
                <span style={{
                  position:'absolute', inset:-2, borderRadius:'50%',
                  border:'1px solid rgba(212,168,42,0.14)', pointerEvents:'none',
                }}/>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={dark?'sun':'moon'}
                    initial={{ rotate:-90, opacity:0, scale:0.6 }}
                    animate={{ rotate:0,   opacity:1, scale:1   }}
                    exit={{    rotate:90,  opacity:0, scale:0.6 }}
                    transition={{ duration:0.18 }}>
                    {dark ? <Sun size={15}/> : <Moon size={15}/>}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Divider dot */}
              <Dot/>

              {/* Sign In */}
              <NavLink to="/login" style={{ textDecoration:'none' }}>
                <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:7,
                    padding:'8px 18px', borderRadius:999,
                    fontFamily:"'Cinzel',serif", fontSize:'0.74rem',
                    fontWeight:600, letterSpacing:'0.1em',
                    color:'white', textTransform:'uppercase',
                    background:'linear-gradient(135deg,#b8732a 0%,#ca8c38 50%,#d9a24a 100%)',
                    border:'1px solid rgba(232,180,80,0.48)',
                    boxShadow:'0 2px 14px rgba(180,100,20,0.36),inset 0 1px 0 rgba(255,220,120,0.22)',
                    cursor:'pointer', position:'relative', overflow:'hidden',
                  }}>
                  {/* Sheen */}
                  <span style={{
                    position:'absolute', top:0, left:'-55%', width:'35%', height:'100%',
                    background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)',
                    transform:'skewX(-20deg)', pointerEvents:'none',
                  }}/>
                  <LogIn size={12}/>
                  <span>Sign In</span>
                </motion.div>
              </NavLink>
            </div>
          </div>

          {/* ── MOBILE header (md and below) ── */}
          <div className="flex md:hidden" style={{
            width:'100%', alignItems:'center',
            justifyContent:'space-between', padding:'0 1rem',
          }}>
            <NavLink to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
              <FlowSymbol size={26}/>
              <span style={{
                ...wordmarkStyle,
                fontSize:'1.34rem',
                color: dark ? '#e8c46a' : '#8a5a12',
              }}>FlowState</span>
            </NavLink>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <motion.button type="button" whileTap={{ scale:0.88 }} onClick={toggle}
                style={{
                  width:32, height:32, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:'1px solid rgba(212,168,42,0.34)',
                  background: dark ? 'rgba(212,168,42,0.12)' : 'rgba(255,255,255,0.6)',
                  color: dark ? '#d9b96a' : '#6b4c12', cursor:'pointer',
                }} aria-label="Toggle theme">
                {dark ? <Sun size={13}/> : <Moon size={13}/>}
              </motion.button>
              <NavLink to="/login" style={{ textDecoration:'none' }}>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:5,
                  padding:'6px 13px', borderRadius:999,
                  fontFamily:"'Cinzel',serif", fontSize:'0.68rem',
                  fontWeight:600, letterSpacing:'0.08em',
                  color:'white', textTransform:'uppercase',
                  background:'linear-gradient(135deg,#b8732a,#d9a24a)',
                  border:'1px solid rgba(232,180,80,0.4)',
                }}>
                  <LogIn size={10}/> Sign In
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  )
}
