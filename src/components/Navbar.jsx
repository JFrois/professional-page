import { useState, useRef, useEffect } from 'react'
import { Sun, Moon, Download, ChevronDown, Check } from 'lucide-react'
import { LinkedinIcon } from './Icons.jsx'
import profileData from '../data/profile.json'

const NAV_ITEMS = [
  { id: 'projetos', label: 'PROJETOS' },
  { id: 'trajetoria', label: 'TRAJETÓRIA' },
  { id: 'skills', label: 'STACK' },
  { id: 'sobre', label: 'SOBRE' },
  { id: 'contato', label: 'CONTATO' },
]

const CV_OPTIONS = {
  pt: {
    key: 'pt',
    label: 'PT-BR',
    fullTitle: 'Português (Brasil)',
    url: '/curriculos/juan-frois-cv-pt.pdf',
    filename: 'juan-frois-cv-pt.pdf',
    flag: '🇧🇷',
  },
  en: {
    key: 'en',
    label: 'EN',
    fullTitle: 'English (US)',
    url: '/curriculos/juan-frois-resume-en.pdf',
    filename: 'juan-frois-resume-en.pdf',
    flag: '🇺🇸',
  },
}

export default function Navbar({
  active = 'hero',
  theme = 'dark',
  onThemeChange,
}) {
  const [selectedLang, setSelectedLang] = useState('pt')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const activeCv = CV_OPTIONS[selectedLang]

  const scrollTo = (id) => {
    const target =
      document.getElementById(id) ||
      (id === 'sobre' ? document.getElementById('about') : null) ||
      (id === 'projetos' ? document.getElementById('projects') : null) ||
      (id === 'contato' ? document.getElementById('contact') : null)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleToggleTheme = () => {
    if (!onThemeChange) return
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    onThemeChange(nextTheme)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '14px clamp(16px, 4vw, 48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Brand Monogram */}
      <button
        type="button"
        onClick={() => scrollTo('hero')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: 0,
        }}
        title="Voltar ao início"
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 35%, var(--accent-primary), var(--accent-impact))',
            boxShadow: '0 0 16px var(--accent-glow)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10.5,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.04em',
            }}
          >
            {profileData.initials}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '0.12em',
          }}
        >
          {profileData.shortName || profileData.name}
        </span>
      </button>

      {/* Navigation Links */}
      <div
        className="nav-links-container"
        style={{
          display: 'flex',
          gap: 'clamp(10px, 1.8vw, 22px)',
          alignItems: 'center',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            active === item.id ||
            (item.id === 'sobre' && active === 'about') ||
            (item.id === 'projetos' && active === 'projects') ||
            (item.id === 'contato' && active === 'contact')

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`nav-btn ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Right Actions: CV Download + Theme Switcher + LinkedIn */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {/* CV Download CTA with Language Picker */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'stretch',
              background: 'linear-gradient(135deg, var(--accent-primary), #1d4ed8)',
              borderRadius: 10,
              boxShadow: '0 2px 10px var(--accent-glow)',
              transition: 'all 0.2s ease',
              overflow: 'hidden',
            }}
          >
            {/* Direct Download Main CTA */}
            <a
              href={activeCv.url}
              download={activeCv.filename}
              className="cv-main-btn"
              title={`Baixar CV em PDF (${activeCv.fullTitle})`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 12px',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'background 0.2s ease',
              }}
            >
              <Download size={13} stroke="currentColor" />
              <span>Baixar CV (PDF)</span>
            </a>

            {/* Language Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-label="Selecionar idioma do currículo"
              aria-expanded={isDropdownOpen}
              style={{
                background: 'rgba(0, 0, 0, 0.18)',
                border: 'none',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '0 8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 11,
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                transition: 'background 0.2s ease',
              }}
              title="Alternar entre PT-BR e EN"
            >
              <span>{activeCv.label}</span>
              <ChevronDown
                size={11}
                stroke="currentColor"
                style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
          </div>

          {/* Floating Dropdown Menu */}
          {isDropdownOpen && (
            <div
              role="menu"
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                minWidth: 200,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-mid)',
                borderRadius: 10,
                padding: '6px',
                boxShadow: 'var(--card-shadow-hover)',
                zIndex: 110,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div
                style={{
                  padding: '4px 8px 6px',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: 10,
                  fontFamily: 'JetBrains Mono',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Versão do Currículo
              </div>

              {Object.values(CV_OPTIONS).map((opt) => {
                const isSelected = selectedLang === opt.key
                return (
                  <a
                    key={opt.key}
                    href={opt.url}
                    download={opt.filename}
                    onClick={() => {
                      setSelectedLang(opt.key)
                      setIsDropdownOpen(false)
                    }}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 6,
                      background: isSelected ? 'var(--bg-elevated)' : 'transparent',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: 12,
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: isSelected ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-elevated)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isSelected
                        ? 'var(--bg-elevated)'
                        : 'transparent'
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span>{opt.flag}</span>
                      <span>{opt.fullTitle}</span>
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 10.5,
                        fontFamily: 'JetBrains Mono',
                        color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {opt.label}
                      {isSelected && <Check size={12} stroke="currentColor" />}
                    </span>
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {/* Theme Toggle Button (☀️ / 🌙) */}
        {onThemeChange && (
          <button
            type="button"
            onClick={handleToggleTheme}
            title={
              theme === 'dark'
                ? 'Mudar para Modo Claro (☀️)'
                : 'Mudar para Modo Escuro (🌙)'
            }
            aria-label={
              theme === 'dark'
                ? 'Ativar modo claro'
                : 'Ativar modo escuro'
            }
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--card-shadow)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)'
              e.currentTarget.style.color = 'var(--accent-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            {theme === 'dark' ? (
              <Sun size={15} stroke="currentColor" style={{ color: '#fbbf24' }} />
            ) : (
              <Moon size={15} stroke="currentColor" style={{ color: '#0f62fe' }} />
            )}
          </button>
        )}

        {/* LinkedIn Quick Link */}
        <a
          href={profileData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
          style={{
            padding: '7px 12px',
            fontSize: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 9,
          }}
          title="Abrir perfil no LinkedIn"
        >
          <LinkedinIcon size={13} />
          <span className="hide-on-mobile">LinkedIn</span>
        </a>
      </div>
    </nav>
  )
}

