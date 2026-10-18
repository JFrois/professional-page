import { useState, useRef, useEffect } from 'react'
import {
  Sun,
  Moon,
  Download,
  ChevronDown,
  Check,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'
import { useLanguage } from '../hooks/useLanguage.js'

export default function Navbar({
  active = 'hero',
  theme = 'dark',
  onThemeChange,
}) {
  const { setLang, isPt, t, activeCv } = useLanguage()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const navItems = [
    { id: 'projetos', label: t('nav.projects') },
    { id: 'trajetoria', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'sobre', label: t('nav.about') },
    { id: 'contato', label: t('nav.contact') },
  ]

  const cvOptions = [
    {
      key: 'pt-BR',
      label: 'PT-BR',
      fullTitle: isPt ? 'Português (Brasil)' : 'Portuguese (Brazil)',
      url: '/curriculos/juan-frois-cv-pt.pdf',
      filename: 'juan-frois-cv-pt.pdf',
      flag: '🇧🇷',
    },
    {
      key: 'en-US',
      label: 'EN',
      fullTitle: isPt ? 'Inglês (EUA)' : 'English (US)',
      url: '/curriculos/juan-frois-resume-en.pdf',
      filename: 'juan-frois-resume-en.pdf',
      flag: '🇺🇸',
    },
  ]

  const scrollTo = (id) => {
    const target =
      document.getElementById(id) ||
      (id === 'sobre' ? document.getElementById('about') : null) ||
      (id === 'projetos' ? document.getElementById('projects') : null) ||
      (id === 'contato' ? document.getElementById('contact') : null)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  // Close dropdown on click outside or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on resize to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggleTheme = () => {
    if (!onThemeChange) return
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    onThemeChange(nextTheme)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '10px clamp(16px, 4vw, 40px)',
          minHeight: 60,
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
            padding: '6px 4px',
            minHeight: 44,
          }}
          title={t('nav.backToTop')}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 35% 35%, var(--accent-primary), var(--accent-impact))',
              boxShadow: '0 0 16px var(--accent-glow)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 11,
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
              fontSize: 12.5,
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.12em',
            }}
          >
            {profileData.shortName || profileData.name}
          </span>
        </button>

        {/* Desktop Navigation Links (>= 1024px) */}
        <div className="nav-desktop-links">
          {navItems.map((item) => {
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
                style={{
                  minHeight: 40,
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontSize: 12.5,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Right Actions Container */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* Language Selector Toggle (PT | EN) — ALWAYS VISIBLE on Desktop and Mobile */}
          <div
            className="lang-toggle-group"
            role="group"
            aria-label={t('nav.langAriaLabel')}
          >
            <button
              type="button"
              onClick={() => setLang('pt-BR')}
              aria-pressed={isPt}
              className={`lang-toggle-btn ${isPt ? 'active' : ''}`}
              title="Mudar idioma para Português (Brasil)"
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLang('en-US')}
              aria-pressed={!isPt}
              className={`lang-toggle-btn ${!isPt ? 'active' : ''}`}
              title="Switch language to English (US)"
            >
              EN
            </button>
          </div>

          {/* Desktop CV Download CTA with Language Picker (>= 1024px) */}
          <div ref={dropdownRef} className="nav-desktop-cv" style={{ position: 'relative' }}>
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
                title={`${activeCv.label} (${activeCv.fullTitle})`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  transition: 'background 0.2s ease',
                }}
              >
                <Download size={14} stroke="currentColor" />
                <span>{activeCv.label}</span>
              </a>

              {/* Language Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-label={t('nav.cvVersion')}
                aria-expanded={isDropdownOpen}
                style={{
                  background: 'rgba(0, 0, 0, 0.18)',
                  border: 'none',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '0 10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 11,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  transition: 'background 0.2s ease',
                }}
                title={isPt ? 'Alternar entre PT-BR e EN' : 'Switch between PT-BR and EN'}
              >
                <span>{activeCv.shortLabel}</span>
                <ChevronDown
                  size={12}
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
                  minWidth: 210,
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
                  {t('nav.cvVersion')}
                </div>

                {cvOptions.map((opt) => {
                  const isSelected = (isPt && opt.key === 'pt-BR') || (!isPt && opt.key === 'en-US')
                  return (
                    <a
                      key={opt.key}
                      href={opt.url}
                      download={opt.filename}
                      onClick={() => {
                        setLang(opt.key)
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

          {/* Theme Toggle Button (☀️ / 🌙) - ALWAYS VISIBLE on all viewports */}
          {onThemeChange && (
            <button
              type="button"
              onClick={handleToggleTheme}
              className="theme-toggle-btn touch-target"
              title={theme === 'dark' ? t('nav.toggleThemeLight') : t('nav.toggleThemeDark')}
              aria-label={theme === 'dark' ? t('nav.toggleThemeLight') : t('nav.toggleThemeDark')}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--card-shadow)',
                padding: 0,
              }}
            >
              {theme === 'dark' ? (
                <Sun size={17} stroke="currentColor" style={{ color: '#fbbf24' }} />
              ) : (
                <Moon size={17} stroke="currentColor" style={{ color: '#0f62fe' }} />
              )}
            </button>
          )}

          {/* Desktop LinkedIn Quick Link (>= 1024px) */}
          <a
            href={profileData.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost hide-on-mobile touch-target"
            style={{
              padding: '8px 14px',
              fontSize: 12.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 9,
            }}
            title={t('nav.openLinkedIn')}
          >
            <LinkedinIcon size={14} />
            <span>LinkedIn</span>
          </a>

          {/* Accessible Hamburger Menu Button (< 1024px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="hamburger-btn touch-target"
            aria-label={isMobileMenuOpen ? t('nav.closeNavMenu') : t('nav.openNavMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              background: isMobileMenuOpen ? 'var(--accent-glow)' : 'var(--bg-elevated)',
              border: isMobileMenuOpen
                ? '1px solid var(--accent-primary)'
                : '1px solid var(--border-subtle)',
              color: isMobileMenuOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
          >
            {isMobileMenuOpen ? (
              <X size={20} stroke="currentColor" />
            ) : (
              <Menu size={20} stroke="currentColor" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay (< 1024px) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.sections')}
          style={{
            position: 'fixed',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 20px 32px',
            overflowY: 'auto',
            animation: 'slideDownDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {/* Navigation Links List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                padding: '0 4px',
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {t('nav.sections')}
              </span>

              {/* Mobile Drawer Language Switcher */}
              <div
                className="lang-toggle-group"
                role="group"
                aria-label={t('nav.langAriaLabel')}
                style={{ height: 38 }}
              >
                <button
                  type="button"
                  onClick={() => setLang('pt-BR')}
                  aria-pressed={isPt}
                  className={`lang-toggle-btn ${isPt ? 'active' : ''}`}
                  style={{ height: 30, padding: '4px 8px' }}
                >
                  PT
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en-US')}
                  aria-pressed={!isPt}
                  className={`lang-toggle-btn ${!isPt ? 'active' : ''}`}
                  style={{ height: 30, padding: '4px 8px' }}
                >
                  EN
                </button>
              </div>
            </div>

            {navItems.map((item) => {
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 10,
                    minHeight: 48,
                    background: isActive ? 'var(--bg-elevated)' : 'transparent',
                    border: isActive
                      ? '1px solid var(--border-mid)'
                      : '1px solid transparent',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--accent-primary)',
                        boxShadow: '0 0 8px var(--accent-primary)',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Bottom Drawer Actions: CV Download + Social */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 10,
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                paddingLeft: 4,
              }}
            >
              {t('nav.cvDownload')}
            </span>

            {/* Direct CV Download Buttons inside Drawer */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a
                href={cvOptions[0].url}
                download={cvOptions[0].filename}
                onClick={() => setIsMobileMenuOpen(false)}
                className={isPt ? 'btn-primary' : 'btn-ghost'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '12px 14px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  minHeight: 46,
                  textAlign: 'center',
                }}
              >
                <span>🇧🇷</span>
                <span>CV (PT-BR)</span>
                <Download size={13} stroke="currentColor" />
              </a>

              <a
                href={cvOptions[1].url}
                download={cvOptions[1].filename}
                onClick={() => setIsMobileMenuOpen(false)}
                className={!isPt ? 'btn-primary' : 'btn-ghost'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '12px 14px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  minHeight: 46,
                  textAlign: 'center',
                }}
              >
                <span>🇺🇸</span>
                <span>Resume (EN)</span>
                <Download size={13} stroke="currentColor" />
              </a>
            </div>

            {/* Quick Links */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginTop: 4,
              }}
            >
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  padding: '10px 14px',
                  fontSize: 12.5,
                  minHeight: 44,
                }}
                title={t('nav.openLinkedIn')}
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
                <ExternalLink size={11} stroke="currentColor" />
              </a>

              <a
                href={profileData.social.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  padding: '10px 14px',
                  fontSize: 12.5,
                  minHeight: 44,
                }}
                title={t('nav.openGitHub')}
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
                <ExternalLink size={11} stroke="currentColor" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
