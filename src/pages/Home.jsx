import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

// Letter Fade-in Animation Component
const LetterFadeIn = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  const text = typeof children === 'string' ? children : ''
  const chars = text.split('')

  return (
    <span ref={ref} className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="letter-char"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: isVisible ? `${i * 80}ms` : '0ms',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

function Home({ currentLang }) {
  const heroRef = useRef(null)
  const spiritRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  // Check if modal should be shown
  useEffect(() => {
    const hideUntil = localStorage.getItem('modalHideUntil')
    if (!hideUntil || Date.now() > parseInt(hideUntil)) {
      setShowModal(true)
    }
  }, [])

  const closeModal = () => {
    if (dontShowAgain) {
      const hideUntil = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      localStorage.setItem('modalHideUntil', hideUntil.toString())
    }
    setIsClosing(true)
    setTimeout(() => {
      setShowModal(false)
      setIsClosing(false)
    }, 500)
  }

  useEffect(() => {
    // Hero bottom animation
    gsap.fromTo('.hero-bottom',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: 'power2.out' }
    )

    // Spirit section
    gsap.from('.spirit-title span', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.spirit',
        start: 'top 70%'
      }
    })

    gsap.from('.spirit-desc, .spirit .btn-dark', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.spirit',
        start: 'top 60%'
      }
    })

    // Menu section
    gsap.from('.menu-title', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.menu-section',
        start: 'top 70%'
      }
    })

    gsap.from('.menu-item', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.menu-list',
        start: 'top 80%'
      }
    })

    // Heritage section parallax
    gsap.to('.heritage-bg img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.heritage',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    gsap.from('.heritage-title span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.heritage',
        start: 'top 60%'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="home-page">
      {/* Popup Modal */}
      {showModal && (
        <div className="popup-overlay" onClick={closeModal}>
          <div className={`popup-modal ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3 className="popup-title">무화잠 배달 주문</h3>
              <button className="popup-close-x" onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="popup-body">
              <p className="popup-text">
                가정에서 게요리 뿐만 아니라<br />
                도시락 정식류, 일품 요리를 만나 보세요.
              </p>
              <div className="popup-links">
                <a
                  href="https://s.baemin.com/ub000gRA3mFl7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="popup-link-wrap"
                >
                  <img src="/images/logo-1.png" alt="배달의민족" className="popup-link-icon baemin" />
                  <span className="popup-link-btn">
                    배달의민족
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </span>
                </a>
                <a
                  href="https://web.coupangeats.com/share?storeId=198136&dishId&key=14218574-c866-4ab2-949d-157b66299ea2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="popup-link-wrap"
                >
                  <img src="/images/logo-0.png" alt="쿠팡이츠" className="popup-link-icon coupang" />
                  <span className="popup-link-btn">
                    쿠팡이츠
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="popup-footer">
              <button className="popup-btn-secondary" onClick={() => { setDontShowAgain(true); closeModal(); }}>
                24시간 동안 보지 않기
              </button>
              <button className="popup-btn-primary" onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-bg">
          <img src="/images/hero-crab.jpg" alt="Crab dishes" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">
              <LetterFadeIn delay={300}>잊지 못할 미식의 순간,</LetterFadeIn>
            </span>
            <span className="title-line">
              <LetterFadeIn delay={1200}>무화잠</LetterFadeIn>
            </span>
          </h1>
        </div>

        <div className="hero-bottom">
          <p className="hero-desc">
            무화잠에서 모든 요리는 전통에 대한 헌사이자,<br />
            오늘을 위해 만들어진 순간입니다.
          </p>
        </div>

        <div className="scroll-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* Video Spirit Section */}
      <section className="section video-spirit" id="about" ref={spiritRef}>
        <div className="video-spirit-bg">
          <video autoPlay muted loop playsInline>
            <source src="/videos/spirit-video.mp4" type="video/mp4" />
          </video>
          <div className="video-spirit-overlay"></div>
        </div>
        <div className="video-spirit-content">
          <h2 className="video-spirit-title">
            <span>THE SPIRIT OF</span>
            <span>KOREAN DINING</span>
          </h2>
          <p className="video-spirit-desc">
            따뜻한 환대에서 깊은 풍미까지, 모든 디테일이 이야기를 전합니다.
          </p>
          <a href="#about" className="btn-about">About Us</a>
        </div>
      </section>

      {/* Spirit Section */}
      <section className="section spirit" style={{ display: 'none' }}>
        <div className="spirit-content">
          <div className="spirit-text">
            <h2 className="spirit-title">
              <span>THE SPIRIT OF</span>
              <span>KOREAN DINING</span>
            </h2>
            <p className="spirit-desc">
              따뜻한 환대에서 깊은 풍미까지,<br />
              모든 디테일이 이야기를 전합니다.
            </p>
            <a href="#about" className="btn-dark">About Us</a>
          </div>
          <div className="spirit-image">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800" alt="Signature dish" />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section menu-section" id="menu">
        <div className="menu-grid">
          <div className="menu-left">
            <h2 className="menu-title">SIGNATURE<br />PLATES</h2>
          </div>
          <div className="menu-right">
            <div className="menu-intro">
              <h3 className="menu-subtitle">SIGNATURE DISHES.<br />CLASSIC ROOTS.</h3>
              <p className="menu-desc">
                Our signature plates are crafted to honor heritage while welcoming every kind of guest —
                whether it's your first taste or a family favorite.
              </p>
              <Link to="/reservation" className="btn-dark">{currentLang === 'ko' ? '예약하기' : 'Reserve a Table'}</Link>
            </div>

            <div className="menu-list">
              <div className="menu-item">
                <div className="menu-item-header">
                  <h4 className="menu-item-name">VIP 코스</h4>
                  <span className="menu-item-price">₩155,000~</span>
                </div>
                <p className="menu-item-desc">귀한 분을 모시는 마음을 담은 특별 추천 코스</p>
              </div>
              <div className="menu-item">
                <div className="menu-item-header">
                  <h4 className="menu-item-name">대게 코스</h4>
                  <span className="menu-item-price">₩120,000</span>
                </div>
                <p className="menu-item-desc">신선한 대게의 진수를 느낄 수 있는 프리미엄 코스</p>
              </div>
              <div className="menu-item">
                <div className="menu-item-header">
                  <h4 className="menu-item-name">킹크랩 코스</h4>
                  <span className="menu-item-price">₩180,000</span>
                </div>
                <p className="menu-item-desc">킹크랩찜과 버터구이를 즐기는 풀코스</p>
              </div>
            </div>

            <Link to="/menu" className="btn-full">View Full Menu</Link>
          </div>
        </div>

        <div className="menu-image-side">
          <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800" alt="Menu dish" />
        </div>
      </section>

      {/* Gift Set Section */}
      <section className="section catering" id="giftset">
        <div className="container">
          <div className="catering-header">
            <span className="catering-label-left">PREMIUM GIFT</span>
            <h2 className="catering-title">
              <span className="catering-title-sub">GIFT SET</span>
              <span className="catering-title-main">{currentLang === 'ko' ? '무화잠 갈비 선물 세트' : 'MOOHWAJAM GALBI'}</span>
            </h2>
            <span className="catering-label-right">FOR YOU</span>
          </div>
          <p className="catering-desc">
            {currentLang === 'ko'
              ? '소중한 분께 특별한 마음을 전하세요. 무화잠의 프리미엄 갈비 선물 세트로 감사와 사랑의 마음을 담아 드립니다.'
              : 'Share a special moment with your loved ones. Our premium Galbi gift set delivers the heart of Moohwajam to your table.'}
          </p>
          <div className="catering-images">
            <div className="catering-img">
              <img src="/images/catering-curry.png" alt="Galbi gift set" />
            </div>
            <div className="catering-img">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" alt="Premium meat" />
            </div>
            <div className="catering-img">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600" alt="Gift packaging" />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="section heritage">
        <div className="heritage-bg">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920" alt="Restaurant interior" />
        </div>
        <div className="heritage-content">
          <h2 className="heritage-title">
            <span>ROOTED IN</span>
            <span>EXPERIENCE</span>
          </h2>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">
              <span>WHAT OUR</span>
              <span>GUESTS SAY</span>
            </h2>
          </div>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {[1, 2].map((_, groupIndex) => (
              <div key={groupIndex} style={{ display: 'flex', gap: '24px' }}>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <span className="testimonial-stars">★★★★★</span>
                    <span className="testimonial-source">Naver</span>
                  </div>
                  <p className="testimonial-text">분위기와 음식 모두 완벽했습니다. 특별한 날 다시 방문하고 싶어요. 서비스도 정말 친절했습니다.</p>
                  <div className="testimonial-author">
                    <span className="author-label">Author</span>
                    <span className="author-name">김민수</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <span className="testimonial-stars">★★★★★</span>
                    <span className="testimonial-source">Google</span>
                  </div>
                  <p className="testimonial-text">강남에서 이런 수준의 다이닝을 경험할 수 있다니 놀랍습니다. 코스 요리 하나하나가 예술 작품 같았어요.</p>
                  <div className="testimonial-author">
                    <span className="author-label">Author</span>
                    <span className="author-name">이지영</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <span className="testimonial-stars">★★★★★</span>
                    <span className="testimonial-source">Kakao</span>
                  </div>
                  <p className="testimonial-text">프로포즈 장소로 선택했는데 완벽한 분위기를 만들어주셨어요. 평생 잊지 못할 저녁이었습니다.</p>
                  <div className="testimonial-author">
                    <span className="author-label">Author</span>
                    <span className="author-name">박준호</span>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <span className="testimonial-stars">★★★★★</span>
                    <span className="testimonial-source">Instagram</span>
                  </div>
                  <p className="testimonial-text">시그니처 코스가 정말 인상적이었어요. 매 코스마다 설명해주시는 것도 좋았고, 맛도 훌륭했습니다.</p>
                  <div className="testimonial-author">
                    <span className="author-label">Author</span>
                    <span className="author-name">최수진</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section location" id="contact">
        <div className="location-boxes">
          <div className="location-box">
            <h3 className="location-box-title">LOCATIONS</h3>
            <div className="location-box-content">
              <p>서울특별시 강남구 강남대로 292<br />뱅뱅건물 B1 무화잠</p>
            </div>
          </div>
          <div className="location-box">
            <h3 className="location-box-title">HOURS</h3>
            <div className="location-box-content">
              <p>Tue-Fri 11 AM — 10 PM</p>
              <p>Sat-Sun 12 PM — 10 PM</p>
              <p>Mon (Closed)</p>
            </div>
          </div>
          <div className="location-box">
            <h3 className="location-box-title">CONTACTS</h3>
            <div className="location-box-content">
              <p className="info-contact"><a href="tel:02-563-7878">02-563-7878</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
