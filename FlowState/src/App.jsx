import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Home    from './pages/Home'
import Water   from './pages/Water'
import Habits  from './pages/Habits'
import Journal from './pages/Journal'
import Quotes  from './pages/Quotes'
import Login   from './pages/Login'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
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
      </ToastProvider>
    </ThemeProvider>
  )
}