import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider }   from './context/ThemeContext'
import { ToastProvider }   from './context/ToastContext'
import { WellnessProvider } from './context/WellnessContext'
import Navbar  from './components/Navbar'
import Home    from './pages/Home'
import Water   from './pages/Water'
import Habits  from './pages/Habits'
import Journal from './pages/Journal'
import Quotes  from './pages/Quotes'
import Login   from './pages/Login'


function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WellnessProvider>
          <BrowserRouter>
            <ScrollReset />
            <Navbar />
            <Routes>
              <Route path="/"        element={<Home />} />
              <Route path="/water"   element={<Water />} />
              <Route path="/habits"  element={<Habits />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/quotes"  element={<Quotes />} />
              <Route path="/login"   element={<Login />} />
              <Route path="*"        element={<Home />} />
            </Routes>
          </BrowserRouter>
        </WellnessProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}