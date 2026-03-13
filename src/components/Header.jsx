import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ currentLang, setCurrentLang }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
  }

  const toggleLang = () => {
    setCurrentLang(currentLang === 'ko' ? 'en' : 'ko')
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-text">무화잠</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/menu" className="nav-link">Menu</Link></li>
            <li><a href="#giftset" className="nav-link">{currentLang === 'ko' ? '선물 세트' : 'Gift Set'}</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/reservation" className="btn-order">
            {currentLang === 'ko' ? '예약하기' : 'Reservation'}
          </Link>
          <button
            className={`lang-toggle ${currentLang === 'en' ? 'en-active' : ''}`}
            onClick={toggleLang}
          >
            <span className={`lang-ko ${currentLang === 'ko' ? 'active' : ''}`}>KO</span>
            <span className="lang-divider">/</span>
            <span className={`lang-en ${currentLang === 'en' ? 'active' : ''}`}>EN</span>
          </button>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
