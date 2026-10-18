import { Sun, Moon, Monitor } from 'lucide-react'
import { LinkedinIcon } from './Icons.jsx'
import profileData from '../data/profile.json'

const NAV_ITEMS = [
  { id: 'hero', label: 'INÍCIO' },
  { id: 'about', label: 'SOBRE' },
  { id: 'skills', label: 'STACK' },
  { id: 'projects', label: 'PROJETOS' },
  { id: 'contact', label: 'CONTATO' },
]

export default function Navbar({
  active = 'hero',
  theme = 'dark',
  themeMode = 'system',
  onThemeChange,
}) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px clamp(20px, 4vw, 48px)',
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
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 35%, var(--accent-primary), var(--accent-impact))',
            boxShadow: '0 0 16px var(--accent-glow)',
            transition: 'all 0.3s ease',
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '0.12em',
          }}
        >
          {profileData.initials}
        </span>
      </button>

      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={`nav-btn ${active === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}

        {/* Theme Switcher Segmented Control */}
        {onThemeChange && (
          <div
            className="theme-switcher"
            role="group"
            aria-label="Alternar tema"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 20,
              padding: 2,
              gap: 2,
            }}
          >
            <button
              type="button"
              onClick={() => onThemeChange('light')}
              title="Modo Claro"
              aria-label="Modo Claro"
              style={{
                background: themeMode === 'light' ? 'var(--bg-surface)' : 'transparent',
                color:
                  themeMode === 'light' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 16,
                padding: '5px 8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: themeMode === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Sun size={13} stroke="currentColor" />
            </button>

            <button
              type="button"
              onClick={() => onThemeChange('dark')}
              title="Modo Escuro"
              aria-label="Modo Escuro"
              style={{
                background: themeMode === 'dark' ? 'var(--bg-surface)' : 'transparent',
                color:
                  themeMode === 'dark' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 16,
                padding: '5px 8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: themeMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Moon size={13} stroke="currentColor" />
            </button>

            <button
              type="button"
              onClick={() => onThemeChange('system')}
              title={`Automático / Sistema (ativo: ${
                theme === 'dark' ? 'escuro' : 'claro'
              })`}
              aria-label="Modo Automático do Sistema"
              style={{
                background: themeMode === 'system' ? 'var(--bg-surface)' : 'transparent',
                color:
                  themeMode === 'system' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 16,
                padding: '5px 8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: themeMode === 'system' ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Monitor size={13} stroke="currentColor" />
            </button>
          </div>
        )}

        <a
          href={profileData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
          style={{
            padding: '7px 16px',
            fontSize: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <LinkedinIcon size={13} />
          <span>LinkedIn</span>
        </a>
      </div>
    </nav>
  )
}
