import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, Droplets, Home, Calendar, BookOpen, Sparkles, LogIn } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/',        label: 'Home',    icon: Home,     emoji: '🏠' },
  { to: '/water',   label: 'Water',   icon: Droplets, emoji: '💧' },
  { to: '/habits',  label: 'Habits',  icon: Calendar, emoji: '📅' },
  { to: '/journal', label: 'Journal', icon: BookOpen, emoji: '📖' },
  { to: '/quotes',  label: 'Wisdom',  icon: Sparkles, emoji: '🕉️' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [visible,  setVisible]  = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y > lastY.current + 8)  setVisible(false)  // scrolling down
      if (y < lastY.current - 8)  setVisible(true)   // scrolling up
      if (y < 80)                 setVisible(true)   // near top always show
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-20 px-3 pt-2 md:px-4"
      >
        <div
          className={`relative h-full overflow-hidden rounded-b-[2.8rem] border border-gold/25
            bg-gradient-to-r from-[#fff8ef]/95 via-[#fbf1df]/95 to-[#f8ebd4]/95
            dark:from-[#20160d]/95 dark:via-[#251a10]/95 dark:to-[#2a1d12]/95
            backdrop-blur-xl flex items-center px-4 md:px-8 gap-2 transition-all duration-300
            ${scrolled ? 'shadow-xl-soft' : 'shadow-soft'}`}
        >
          {/* Arch-inspired decorative layers */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <span className="pointer-events-none absolute -top-10 left-1/2 h-20 w-64 -translate-x-1/2 rounded-b-full border-b border-gold/25" />
          <span className="pointer-events-none absolute -top-8 left-[18%] h-16 w-36 rounded-b-full border-b border-gold/20 hidden md:block" />
          <span className="pointer-events-none absolute -top-8 right-[18%] h-16 w-36 rounded-b-full border-b border-gold/20 hidden md:block" />

          {/* Brand */}
          <NavLink
            to="/"
            className="relative z-10 flex items-center gap-2.5 mr-auto font-display text-[1.55rem] md:text-2xl
                       font-medium tracking-tight text-ink dark:text-ivory hover:opacity-85 transition-all duration-300"
          >
            <span className="absolute -inset-x-2 -inset-y-1 rounded-full bg-gradient-to-r from-gold/12 to-saffron/10 blur-md -z-10" />
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-base md:text-lg"
            >
              ॐ
            </motion.span>
            <span>
              Flow<span className="text-gold">State</span>
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-gold/25 bg-white/45 dark:bg-white/[0.04] px-2 py-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium
                   transition-all duration-200 ${
                    isActive
                    ? 'text-ink dark:text-ivory font-semibold'
                    : 'text-ink/75 dark:text-ivory/70 hover:text-ink dark:hover:text-ivory'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-gold/35
                                   bg-gradient-to-r from-gold/25 via-gold/15 to-saffron/15"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <Icon size={15} className="relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="relative z-10 flex items-center gap-1.5 ml-2">
            {/* Theme toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={toggle}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-gold/30
                         text-ink/90 dark:text-ivory/80 bg-white/60 dark:bg-white/[0.04]
                         hover:bg-gold/10 dark:hover:bg-gold/15 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={dark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1 }}
                  exit={{   rotate:  90,  opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Sign in */}
            <NavLink
              to="/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                         bg-gradient-to-r from-[#b8822f] via-[#c9933a] to-[#d8a450] text-white
                         border border-gold/40 shadow-glow-gold hover:brightness-105
                         transition-all duration-200"
            >
              <LogIn size={13} />
              Sign In
            </NavLink>
          </div>
        </div>
      </motion.header>

      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50
                      rounded-[1.75rem] border border-gold/30
                      bg-gradient-to-r from-[#fff8ef]/95 via-[#fbf1df]/95 to-[#f8ebd4]/95
                      dark:from-[#20160d]/95 dark:via-[#251a10]/95 dark:to-[#2a1d12]/95
                      backdrop-blur-xl flex justify-around items-center h-[4.35rem] px-1.5
                      shadow-xl-soft safe-area-inset-bottom">
        <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        {links.map(({ to, label, icon: Icon, emoji }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl min-w-[3.7rem]
               text-[10px] font-bold transition-all duration-200 ${
                isActive
                  ? 'text-ink dark:text-ivory'
                  : 'text-ink/65 dark:text-ivory/55'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="mobile-pill"
                    className="absolute inset-0 rounded-2xl border border-gold/35
                               bg-gradient-to-b from-gold/30 to-saffron/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative z-10 text-base leading-none">{emoji}</span>
                <span className="relative z-10 text-[10px] tracking-wide">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  )
}