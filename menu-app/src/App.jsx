import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservation from './pages/Reservation'
import './App.css'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Layout wrapper for pages that use Header/Footer
function MainLayout({ children, currentLang, setCurrentLang }) {
  return (
    <>
      <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />
      {children}
      <Footer />
    </>
  )
}

function App() {
  const [currentLang, setCurrentLang] = useState('ko')

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout currentLang={currentLang} setCurrentLang={setCurrentLang}>
              <Home currentLang={currentLang} />
            </MainLayout>
          }
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </Router>
  )
}

export default App
