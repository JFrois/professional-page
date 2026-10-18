import { useState, useEffect, useRef } from 'react'
import Cursor from './components/Cursor.jsx'
import BackgroundCanvas from './components/BackgroundCanvas.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Trajetoria from './components/Trajetoria.jsx'
import Skills from './components/Skills.jsx'
import Projetos from './components/Projetos.jsx'
import Contato from './components/Contato.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [scrollPct, setScrollPct] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const heroContainerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroContainerRef.current?.offsetHeight || window.innerHeight
      const currentScrollPct = window.scrollY / heroHeight
      setScrollPct(Math.min(1, Math.max(0, currentScrollPct)))

      const sections = ['hero', 'about', 'trajetoria', 'skills', 'projects', 'contact']
      const offset = window.innerHeight * 0.4

      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId)
        if (el && window.scrollY + offset >= el.offsetTop) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="grain" style={{ background: 'var(--void)', minHeight: '100vh' }}>
      <Cursor />
      <BackgroundCanvas scrollPct={scrollPct} />
      <div className="vignette" aria-hidden="true" />

      <Navbar active={activeSection} />

      {/* 400vh scroll container for the hero animation progression */}
      <div ref={heroContainerRef} style={{ height: '400vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
          <Hero scrollPct={scrollPct} />
        </div>
      </div>

      <About />
      <Trajetoria />
      <Skills />
      <Projetos />
      <Contato />
      <Footer />
    </div>
  )
}
