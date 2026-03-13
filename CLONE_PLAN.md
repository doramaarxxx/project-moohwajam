# Amrit Palace Landing Page Clone Plan

## Overview
Clone the Amrit Palace restaurant website landing page - a modern, elegant single-page design featuring smooth scroll animations, sophisticated typography, and a premium dining experience aesthetic.

---

## 1. Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14+ (App Router) or Vanilla HTML/CSS/JS |
| Styling | Tailwind CSS + Custom CSS |
| Animations | GSAP (GreenSock) + Lenis (Smooth Scroll) |
| Carousel | Splide.js |
| Fonts | Bad Script (Google Fonts) |
| Image Format | AVIF/WebP with PNG fallback |

---

## 2. Color Palette

```css
:root {
  --primary-gold: #d49653;      /* Main accent color */
  --text-dark: #2c2c2c;         /* Primary text */
  --background-light: #f5f5f5;  /* Light sections */
  --background-dark: #1a1a1a;   /* Dark sections */
  --white: #ffffff;
  --overlay: rgba(0, 0, 0, 0.5);
}
```

---

## 3. Typography

```css
/* Primary Font */
font-family: 'Bad Script', cursive;

/* Font Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-bold: 700;

/* Font Sizes (Desktop) */
--hero-title: 72px - 96px;
--section-title: 48px - 64px;
--subtitle: 24px - 32px;
--body: 16px - 18px;
--small: 14px;
```

---

## 4. Page Sections Structure

### 4.1 Header / Navigation
- **Type**: Sticky header with scroll-based style changes
- **Elements**:
  - Logo (left)
  - Nav links: Home, Catering, Gift Cards, About, Contact
  - CTA buttons: Reservations, Menu
  - Hamburger menu (mobile)
- **Behavior**:
  - Transparent on hero → Solid background on scroll
  - Class toggles: `is-colored`, `is-colored-diff` based on section
  - Smooth transition: 0.3s ease

### 4.2 Hero Section
- **Layout**: Full viewport height (100vh)
- **Background**: High-quality restaurant interior image (AVIF)
- **Content**:
  - Layered typography effect
  - Main headline: Large, elegant text
  - Subtext: "Established 1996" / "28 Years of Excellence"
  - Google rating badge (4.7/5 stars, review count)
  - CTA buttons
- **Animation**:
  - Text reveal on load (staggered word animation)
  - Subtle parallax on background image
  - Fade-in for rating badge

### 4.3 Signature Plates / Menu Section
- **Layout**: Grid/Carousel of featured dishes
- **Elements**:
  - Section title with decorative accent
  - Dish cards with: Image, Name, Price, Description
  - Navigation arrows for carousel
- **Animation**:
  - Splide carousel (800ms transition)
  - Cards fade-in on scroll
  - Hover: subtle scale (1.02) + shadow

### 4.4 About / Brand Spirit Section
- **Layout**: Two-column (Image + Text) or Full-width text
- **Content**:
  - Brand philosophy narrative
  - Emphasis on tradition + modern dining
  - CTA: "Learn More" / "Our Story"
- **Animation**:
  - Text split into words → staggered reveal
  - Image parallax or reveal mask

### 4.5 Catering Section
- **Layout**: Image background with overlay + centered content
- **Content**:
  - Service description
  - Buffet offerings
  - Professional team highlight
  - CTA button
- **Animation**:
  - Fade-in on scroll
  - Background subtle zoom effect

### 4.6 Drinks / Cocktails Section
- **Layout**: Grid or horizontal scroll
- **Content**:
  - Signature cocktail images
  - Drink names and descriptions
- **Animation**:
  - Staggered card reveal
  - Hover effects on cards

### 4.7 Gift Cards Section
- **Layout**: Full-width promotional banner
- **Content**:
  - Promotional headline
  - Gift card image/mockup
  - Purchase CTA
- **Animation**:
  - Slide-in from side
  - Pulse animation on CTA button

### 4.8 Heritage / History Section
- **Layout**: Timeline or narrative block
- **Content**:
  - "Rooted in Experience" headline
  - 1996 founding story
  - Key milestones
- **Animation**:
  - Scroll-triggered text reveal
  - Counter animation for years (optional)

### 4.9 Testimonials / Reviews Section
- **Layout**: Marquee/Carousel
- **Content**:
  - Customer review cards
  - Star ratings
  - Customer names
- **Animation**:
  - Continuous horizontal marquee (27s loop)
  - Pause on hover
  - Infinite scroll effect

### 4.10 Locations / Contact Section
- **Layout**: Two columns (one per location)
- **Content**:
  - Location names (Ocala, Gainesville)
  - Addresses
  - Operating hours
  - Phone numbers
  - Map integration (optional)
- **Animation**:
  - Fade-in on scroll

### 4.11 Footer
- **Layout**: Multi-column grid
- **Content**:
  - Logo + brand tagline
  - Navigation links
  - Legal links (Privacy, Terms, Cookies)
  - Social media icons (Instagram, Facebook)
  - Newsletter signup
  - Copyright notice
- **Animation**:
  - Subtle fade-in

---

## 5. Animations & Motion Specification

### 5.1 Smooth Scroll (Lenis)
```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
});
```

### 5.2 Text Split Animation (GSAP)
```javascript
// Split text into words
gsap.from('.split-text .word', {
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: 0.05,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
  }
});
```

### 5.3 Scroll-Triggered Fade In
```javascript
gsap.from('.fade-in', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.fade-in',
    start: 'top 85%',
  }
});
```

### 5.4 Header Scroll Behavior
```javascript
// Intersection Observer for header style changes
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Toggle header classes based on section
      header.classList.toggle('is-colored', entry.target.dataset.dark);
    }
  });
}, { threshold: 0.5 });
```

### 5.5 Marquee Animation (CSS)
```css
.marquee-track {
  display: flex;
  animation: marquee 27s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-track:hover {
  animation-play-state: paused;
}
```

### 5.6 Pulse Animation
```css
.pulse {
  animation: pulse 0.6s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
```

### 5.7 Carousel (Splide)
```javascript
new Splide('.menu-carousel', {
  type: 'loop',
  perPage: 3,
  gap: '2rem',
  speed: 800,
  breakpoints: {
    1024: { perPage: 2 },
    640: { perPage: 1 },
  }
}).mount();
```

---

## 6. Responsive Breakpoints

```css
/* Mobile First Approach */
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
/* Large Desktop: > 1440px */

@media (max-width: 640px) {
  /* Stack all columns */
  /* Reduce font sizes */
  /* Full-width sections */
  /* Hamburger menu active */
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* 2-column layouts */
  /* Adjusted spacing */
}

@media (min-width: 1025px) {
  /* Full desktop layout */
  /* All animations active */
}
```

---

## 7. Interactive Elements

| Element | Interaction | Animation |
|---------|-------------|-----------|
| Nav Links | Hover | Underline slide / Color change |
| CTA Buttons | Hover | Background color shift + slight scale |
| Menu Cards | Hover | Scale 1.02 + box-shadow increase |
| Images | Hover | Subtle zoom (scale 1.05) |
| Social Icons | Hover | Color transition to gold |
| Hamburger | Click | Transform to X |

---

## 8. Third-Party Integrations

- **OpenTable**: Reservation widget
- **Toast Tab**: Online ordering
- **Google Reviews**: Rating badge/widget
- **Social Media**: Instagram, Facebook links

---

## 9. Performance Optimization

- [ ] Use AVIF/WebP images with fallbacks
- [ ] Lazy load images below fold
- [ ] Preload critical fonts
- [ ] Minimize JavaScript bundle
- [ ] Use CSS containment for animated sections
- [ ] Implement will-change for animated elements
- [ ] Defer non-critical scripts

---

## 10. File Structure

```
/project-root
├── /public
│   ├── /images
│   │   ├── hero-bg.avif
│   │   ├── dishes/
│   │   ├── drinks/
│   │   └── logo.png
│   └── /fonts
├── /src
│   ├── /components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── MenuCarousel.jsx
│   │   ├── AboutSection.jsx
│   │   ├── CateringSection.jsx
│   │   ├── DrinksSection.jsx
│   │   ├── GiftCards.jsx
│   │   ├── Heritage.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Locations.jsx
│   │   └── Footer.jsx
│   ├── /styles
│   │   ├── globals.css
│   │   ├── animations.css
│   │   └── variables.css
│   ├── /hooks
│   │   ├── useLenis.js
│   │   └── useScrollAnimation.js
│   └── /lib
│       └── animations.js
├── package.json
└── README.md
```

---

## 11. Development Phases

### Phase 1: Foundation
- [ ] Project setup (Next.js/Vite)
- [ ] Install dependencies (GSAP, Lenis, Splide, Tailwind)
- [ ] Configure fonts and color variables
- [ ] Create base layout components

### Phase 2: Static Structure
- [ ] Build all section components (no animation)
- [ ] Implement responsive layouts
- [ ] Add placeholder images
- [ ] Style header and footer

### Phase 3: Animation Layer
- [ ] Integrate Lenis smooth scroll
- [ ] Add GSAP ScrollTrigger animations
- [ ] Implement text split animations
- [ ] Create marquee testimonials
- [ ] Add hover interactions

### Phase 4: Carousel & Interactions
- [ ] Build Splide carousels
- [ ] Header scroll behavior
- [ ] Mobile hamburger menu
- [ ] Button interactions

### Phase 5: Polish & Optimization
- [ ] Replace placeholder images
- [ ] Fine-tune animation timing
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile testing

---

## 12. Key Animation Timing Reference

| Animation | Duration | Easing | Delay |
|-----------|----------|--------|-------|
| Hero text reveal | 0.8s | power3.out | stagger 0.05s |
| Section fade-in | 1s | power2.out | - |
| Carousel slide | 800ms | ease | - |
| Marquee loop | 27s | linear | infinite |
| Hover transitions | 0.3s | ease | - |
| Header bg change | 0.3s | ease | - |
| Pulse animation | 0.6s | ease-in-out | alternate |

---

## Notes

- Focus on smooth, elegant animations that don't distract from content
- Maintain premium restaurant aesthetic throughout
- Ensure all animations are performant on mobile
- Test scroll behavior on various devices
- Consider reduced motion preferences for accessibility
