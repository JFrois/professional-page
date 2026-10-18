import { useState, useEffect, useRef } from 'react'
import { useTheme } from './hooks/useTheme.js'
import Cursor from './components/Cursor.jsx'
import BackgroundCanvas from './components/BackgroundCanvas.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projetos from './components/Projetos.jsx'
import Trajetoria from './components/Trajetoria.jsx'
import Skills from './components/Skills.jsx'
import About from './components/About.jsx'
import Contato from './components/Contato.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { setThemeMode, resolvedTheme } = useTheme()
  const [scrollPct, setScrollPct] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight
      const currentScrollPct = window.scrollY / heroHeight
      setScrollPct(Math.min(1, Math.max(0, currentScrollPct)))

      const sections = [
        { id: 'hero', aliases: ['hero'] },
        { id: 'projetos', aliases: ['projetos', 'projects'] },
        { id: 'trajetoria', aliases: ['trajetoria'] },
        { id: 'skills', aliases: ['skills'] },
        { id: 'sobre', aliases: ['sobre', 'about'] },
        { id: 'contato', aliases: ['contato', 'contact'] },
      ]
      const offset = window.innerHeight * 0.35

      for (const section of [...sections].reverse()) {
        const el = section.aliases
          .map((alias) => document.getElementById(alias))
          .find(Boolean)

        if (el && window.scrollY + offset >= el.offsetTop) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="grain"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <Cursor theme={resolvedTheme} />
      <BackgroundCanvas scrollPct={scrollPct} theme={resolvedTheme} />
      <div className="vignette" aria-hidden="true" />

      <Navbar
        active={activeSection}
        theme={resolvedTheme}
        onThemeChange={setThemeMode}
      />

      <Hero ref={heroRef} scrollPct={scrollPct} />
      <Projetos />
      <Trajetoria />
      <Skills />
      <About />
      <Contato />
      <Footer />
    </div>
  )
}

