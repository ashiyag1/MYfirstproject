import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useToast } from '../context/ToastContext'
import PageLayout from '../components/PageLayout'

export default function Login() {
  const toast = useToast()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    toast(mode === 'login' ? 'Welcome back! 💧' : 'Account created ✦', 'success')
  }

  return (
    <PageLayout>
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-5xl mb-4 block">💧</motion.div>
            <h1 className="font-display text-4xl font-light text-ink dark:text-sand-lt tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Join FlowState'}
            </h1>
            <p className="text-sm text-mist-dark dark:text-ocean-lt/70 mt-2 font-light">
              {mode === 'login' ? 'Sign in to your wellness journey' : 'Begin your calm, intentional practice'}
            </p>
          </div>

          {/* Card */}
          <div className="card p-7">
            <form onSubmit={submit} className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {mode === 'signup' && (
                  <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="label">Your Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist-dark" />
                      <input type="text" value={form.name} onChange={set('name')} className="input !pl-10" placeholder="Ashiya…" required />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist-dark" />
                  <input type="email" value={form.email} onChange={set('email')} className="input !pl-10" placeholder="you@example.com" required />
                </div>
              </div>

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist-dark" />
                  <input
                    type={show ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    className="input !pl-10 !pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mist-dark hover:text-ocean transition-colors">
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {mode === 'login' && (
                <div className="text-right -mt-2">
                  <button type="button" className="text-xs text-ocean dark:text-ocean-lt hover:underline">Forgot password?</button>
                </div>
              )}

              <button type="submit" className="btn-primary w-full justify-center mt-1">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={15} />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ocean-pale dark:border-ocean/20" /></div>
              <div className="relative text-center text-xs text-mist-dark bg-white dark:bg-ink-soft px-3 w-fit mx-auto">or continue with</div>
            </div>

            {/* Social (placeholder) */}
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary justify-center text-xs !py-2.5">
                <span className="text-base">G</span> Google
              </button>
              <button className="btn-secondary justify-center text-xs !py-2.5">
                <span className="text-base">🍎</span> Apple
              </button>
            </div>
          </div>

          {/* Toggle mode */}
          <p className="text-center text-sm text-mist-dark dark:text-ocean-lt/60 mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')} className="text-ocean dark:text-ocean-lt font-semibold hover:underline">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <p className="text-center text-[11px] text-mist-dark/50 mt-4">
            🔒 Your data stays private. No backend yet.
          </p>
        </motion.div>
      </div>
    </PageLayout>
  )
}