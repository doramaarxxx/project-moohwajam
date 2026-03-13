import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

// Letter Fade-in Animation Component
const LetterFadeIn = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '-30% 0px -30% 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

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
            transitionDelay: isVisible ? `${delay + i * 40}ms` : '0ms',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

// Menu Data
const menuData = {
  vipCourse: {
    id: 'vip-course',
    title: 'VIP Course',
    description: '귀한 분을 모시는 마음을 담아 품격까지 높여드리는 무화잠의 특별 추천 메뉴입니다.',
    items: [
      { name: 'VIP A 코스', nameEn: 'VIP Course A', price: '₩155,000', unit: '1인분', desc: '죽 + 계절샐러드 + 특사시미 + 게다리사시미 + 해산물모듬 + 대게찜 + 낙지초무침 + 겨자냉채 + 들깨탕 + 게다리스테이크 + 꽃게매운탕&게정밥 + 후식차' },
      { name: 'VIP B 코스', nameEn: 'VIP Course B', price: '₩185,000', unit: '1인분', desc: '죽 + 계절샐러드 + 특사시미 + 게다리사시미 + 랍스타사시미 + 해산물모듬 + 대게찜 + 낙지초무침 + 겨자냉채 + 들깨탕 + 게다리스테이크 + 랍스타구이 + 꽃게매운탕&게정밥 + 후식차' },
      { name: 'VIP C 코스', nameEn: 'VIP Course C', price: '₩220,000', unit: '1인분', desc: '죽 + 계절샐러드 + 특사시미 + 게다리사시미 + 랍스타사시미 + 해산물모듬 + 킹크랩찜 + 낙지초무침 + 겨자냉채 + 들깨탕 + 게다리스테이크 + 랍스타구이 + 꽃게매운탕&게정밥 + 후식차' },
    ]
  },
  crabLobster: {
    id: 'crab-lobster',
    title: '대게 · 킹크랩 · 랍스타',
    description: '신선한 해산물의 진수를 느낄 수 있는 프리미엄 코스 요리입니다.',
    items: [
      { name: '대게 코스', nameEn: 'Snow Crab Course', price: '₩120,000', unit: '1인분', desc: '죽 + 계절샐러드 + 사시미 + 대게찜 + 게다리버터구이 + 겨자냉채 + 꽃게매운탕&게정밥 + 후식차' },
      { name: '킹크랩 코스', nameEn: 'King Crab Course', price: '₩180,000', unit: '1인분', desc: '죽 + 계절샐러드 + 사시미 + 킹크랩찜 + 킹크랩버터구이 + 겨자냉채 + 들깨탕 + 꽃게매운탕&게정밥 + 후식차' },
      { name: '랍스타 코스', nameEn: 'Lobster Course', price: '₩150,000', unit: '1인분', desc: '죽 + 계절샐러드 + 랍스타사시미 + 해산물모듬 + 랍스타찜 + 랍스타버터구이 + 겨자냉채 + 꽃게매운탕&게정밥 + 후식차' },
    ]
  },
  aLaCarte: {
    id: 'a-la-carte',
    title: '일품요리',
    description: '정성껏 준비한 단품 요리로 특별한 맛을 경험하세요.',
    items: [
      { name: '생게장', price: '시가', desc: '신선한 게를 특제 간장에 담가 숙성시킨 무화잠의 시그니처' },
      { name: '양념게장', price: '시가', desc: '매콤달콤한 양념에 버무린 밥도둑' },
      { name: '낙지볶음', price: '₩45,000', desc: '쫄깃한 낙지를 매콤하게 볶아낸 요리' },
      { name: '해물파전', price: '₩35,000', desc: '바삭하게 부친 해물파전' },
      { name: '전복버터구이', price: '₩50,000', desc: '신선한 전복을 버터에 구워낸 고소한 맛' },
      { name: '모듬회', price: '시가', desc: '신선한 제철 회를 모둠으로 즐기세요' },
    ]
  },
  lunch: {
    id: 'lunch',
    title: '점심특선',
    description: '평일 런치 타임에만 즐길 수 있는 특별 메뉴 (11:30 AM — 2:30 PM)',
    items: [
      { name: '점심 게정식 A', price: '₩55,000', desc: '게장 + 계절반찬 + 된장찌개 + 공기밥' },
      { name: '점심 게정식 B', price: '₩75,000', desc: '게장 + 구이 + 계절반찬 + 된장찌개 + 공기밥' },
      { name: '게살비빔밥', price: '₩38,000', desc: '신선한 게살을 듬뿍 올린 비빔밥' },
      { name: '해물순두부', price: '₩28,000', desc: '해산물이 듬뿍 들어간 순두부찌개' },
    ]
  },
  drinks: {
    id: 'drinks',
    title: '주류 & 음료',
    description: '요리와 완벽한 페어링을 위한 음료 리스트',
    items: [
      { name: '소주', price: '₩8,000', desc: '참이슬, 처음처럼' },
      { name: '맥주', price: '₩10,000', desc: '카스, 테라, 아사히' },
      { name: '전통주', price: '₩15,000~', desc: '막걸리, 청주, 과일주' },
      { name: '와인', price: '₩80,000~', desc: '레드, 화이트, 스파클링' },
      { name: '음료', price: '₩5,000', desc: '콜라, 사이다, 주스' },
      { name: '전통차', price: '₩8,000', desc: '매실차, 유자차, 대추차' },
    ]
  }
}

// Menu Section Component
const MenuSection = ({ id, title, description, items, isCourse = false }) => {
  return (
    <section id={id} className="menu-section">
      {/* Left: Sticky Headline */}
      <div className="menu-headline">
        <div className="headline-sticky">
          <h2 className="headline-title">
            <LetterFadeIn>{title}</LetterFadeIn>
          </h2>
          <p className="headline-desc">{description}</p>
        </div>
      </div>

      {/* Right: Menu Items Grid */}
      <div className="menu-items">
        <div className={isCourse ? "items-list" : "items-grid"}>
          {items.map((item, index) => (
            <div key={index} className={isCourse ? "course-item" : "menu-item"}>
              <div className="item-header">
                <div className="item-name-wrap">
                  <span className="item-name">{item.name}</span>
                  {item.nameEn && <span className="item-name-en">{item.nameEn}</span>}
                </div>
                <div className="item-price-wrap">
                  <span className="item-price">{item.price}</span>
                  {item.unit && <span className="item-unit">{item.unit}</span>}
                </div>
              </div>
              <p className="item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Fixed Bottom Navigation
const FixedNavigation = ({ activeSection, visible }) => {
  const categories = [
    { id: 'vip-course', label: 'VIP' },
    { id: 'crab-lobster', label: '대게·킹크랩' },
    { id: 'a-la-carte', label: '일품요리' },
    { id: 'lunch', label: '점심특선' },
    { id: 'drinks', label: '주류' },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed-nav ${visible ? 'visible' : ''}`}>
      <div className="nav-inner">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollTo(cat.id)}
            className={`nav-btn ${activeSection === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

function Menu() {
  const [activeSection, setActiveSection] = useState('vip-course')
  const [language, setLanguage] = useState('ko')
  const [showNav, setShowNav] = useState(false)
  const hasSnapped = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight

      // Snap to VIP course when scrolling starts from hero
      if (!hasSnapped.current && window.scrollY > 50 && window.scrollY < heroHeight * 0.5) {
        hasSnapped.current = true
        document.getElementById('vip-course')?.scrollIntoView({ behavior: 'smooth' })
      }

      // Reset snap when back at top
      if (window.scrollY < 10) {
        hasSnapped.current = false
      }

      // Show nav after scrolling 100px
      if (window.scrollY > 100) {
        setShowNav(true)
      } else {
        setShowNav(false)
      }

      const sections = ['vip-course', 'crab-lobster', 'a-la-carte', 'lunch', 'drinks']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="menu-page">
      {/* Header */}
      <header className="menu-header">
        <Link to="/" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </Link>
        <div className="header-right">
          <Link to="/reservation" className="reserve-btn">예약하기</Link>
          <button
            className={`lang-toggle ${language === 'en' ? 'en-active' : ''}`}
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
          >
            <span className={`lang-ko ${language === 'ko' ? 'active' : ''}`}>KO</span>
            <span className={`lang-en ${language === 'en' ? 'active' : ''}`}>EN</span>
          </button>
        </div>
      </header>

      {/* Hero with ShaderGradient */}
      <section className="hero-section">
        <h1 className="hero-page-title">메뉴</h1>
        <ShaderGradientCanvas
          className="gradient-bg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <ShaderGradient
            animate="on"
            brightness={1.1}
            cAzimuthAngle={0}
            cDistance={7.1}
            cPolarAngle={140}
            cameraZoom={17.3}
            color1="#ffffff"
            color2="#ffbb00"
            color3="#0700ff"
            envPreset="city"
            grain="off"
            lightType="3d"
            positionX={0}
            positionY={0}
            positionZ={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={0}
            type="sphere"
            uAmplitude={1.4}
            uDensity={1.1}
            uFrequency={5.5}
            uSpeed={0.1}
            uStrength={1}
          />
        </ShaderGradientCanvas>

        <div className="hero-content">
          <p className="hero-description">
            무화잠에서는 한 접시 한 접시에 신선한 재료와 깊은 정성,<br />
            그리고 품격을 담아냅니다.<br /><br />
            바다의 풍미가 살아있는 게 요리로,<br />
            잊지 못할 미식의 순간을 선사합니다.
          </p>
        </div>
      </section>

      {/* Menu Sections */}
      <main className="menu-content">
        <MenuSection {...menuData.vipCourse} isCourse={true} />
        <MenuSection {...menuData.crabLobster} isCourse={true} />
        <MenuSection {...menuData.aLaCarte} />
        <MenuSection {...menuData.lunch} />
        <MenuSection {...menuData.drinks} />
      </main>

      {/* Fixed Bottom Navigation */}
      <FixedNavigation activeSection={activeSection} visible={showNav} />
    </div>
  )
}

export default Menu
