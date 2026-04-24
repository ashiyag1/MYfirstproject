import { NavLink } from 'react-router-dom'
import { Sun, Moon, Droplets, Home, Calendar, BookOpen, Sparkles, LogIn } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'

const links = [
  { to: '/',        label: 'Home',    icon: Home },
  { to: '/water',   label: 'Water',   icon: Droplets },
  { to: '/habits',  label: 'Habits',  icon: Calendar },
  { to: '/journal', label: 'Journal', icon: BookOpen },
  { to: '/quotes',  label: 'Wisdom',  icon: Sparkles },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="glass border-b border-white/30 dark:border-white/10 h-full flex items-center px-4 md:px-6 gap-2">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 mr-auto font-display text-xl font-medium text-ink dark:text-sand-lt tracking-tight hover:opacity-80 transition-opacity">
          <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="text-xl">
            💧
          </motion.span>
          FlowState
        </NavLink>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-ocean/10 dark:bg-ocean/20 text-ocean dark:text-ocean-lt font-semibold'
                    : 'text-mist-dark dark:text-ocean-lt/70 hover:text-ocean dark:hover:text-ocean-lt hover:bg-ocean/5'
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center text-mist-dark dark:text-ocean-lt hover:bg-ocean/10 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <NavLink
            to="/login"
            className="btn-primary !py-2 !px-4 text-xs hidden sm:inline-flex"
          >
            <LogIn size={14} />
            Sign In
          </NavLink>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/30 dark:border-white/10 flex justify-around items-center h-16 px-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-[10px] font-semibold transition-all duration-200 ${
                isActive
                  ? 'text-ocean dark:text-ocean-lt bg-ocean/10 dark:bg-ocean/20'
                  : 'text-mist-dark dark:text-ocean-lt/60'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}