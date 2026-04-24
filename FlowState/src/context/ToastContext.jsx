import { createContext, useContext, useState, useCallback } from 'react'
import { uid } from '../utils'

const ToastCtx = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((msg, type = 'default', duration = 3000) => {
    const id = uid()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration + 300)
  }, [])

  const icons = { success: '✓', error: '✕', default: '💧', info: '✦' }
  const styles = {
    success: 'from-sage to-emerald-600',
    error: 'from-red-600 to-red-700',
    default: 'from-ink to-ink-soft',
    info: 'from-ocean to-ocean-mid',
  }

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="fixed bottom-6 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`toast-enter flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-xl-soft bg-gradient-to-r ${styles[t.type] || styles.default}`}
          >
            <span>{icons[t.type] || '·'}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)