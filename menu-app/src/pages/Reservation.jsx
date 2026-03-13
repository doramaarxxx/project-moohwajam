import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Reservation.css'

function Reservation() {
  const [language, setLanguage] = useState('ko')

  return (
    <div className="reservation-page">
      {/* Header */}
      <header className="reservation-header">
        <Link to="/" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </Link>
        <Link to="/" className="reservation-logo">무화잠</Link>
        <button
          className={`lang-toggle ${language === 'en' ? 'en-active' : ''}`}
          onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
        >
          <span className={`lang-ko ${language === 'ko' ? 'active' : ''}`}>KO</span>
          <span className={`lang-en ${language === 'en' ? 'active' : ''}`}>EN</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="reservation-main">
        <div className="reservation-cards">
          {/* International Guests */}
          <div className="reservation-card">
            <h2 className="reservation-card-title">International Guests</h2>
            <p className="reservation-card-desc">
              Make a reservation in English through our international booking system.
            </p>
            <a
              href="https://www.catchtable.net/shop/moohwajam"
              target="_blank"
              rel="noopener noreferrer"
              className="reservation-card-btn"
            >
              <span>Reserve in English</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Korean Guests */}
          <div className="reservation-card">
            <h2 className="reservation-card-title">Korean Guests</h2>
            <p className="reservation-card-desc">
              Make a reservation in Korean through our local booking system.
            </p>
            <a
              href="https://app.catchtable.co.kr/ct/shop/moohwajam"
              target="_blank"
              rel="noopener noreferrer"
              className="reservation-card-btn"
            >
              <span>한국어로 예약하기</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Reservation
