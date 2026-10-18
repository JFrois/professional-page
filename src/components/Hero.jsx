import { useState, useRef, useEffect, forwardRef } from 'react'
import {
  Download,
  ArrowDown,
  Terminal,
  Cpu,
  Database,
  ChevronDown,
  Sparkles,
  Zap,
  TrendingDown,
  Building2,
  Check,
} from 'lucide-react'
import profileData from '../data/profile.json'
import profilePic from '../assets/perfillinkedin.jpeg'
import { useLanguage } from '../hooks/useLanguage.js'

const Hero = forwardRef(function Hero(_props, ref) {
  const { setLang, isPt, t, localize, activeCv } = useLanguage()
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const cvFiles = [
    {
      key: 'pt-BR',
      url: '/curriculos/juan-frois-cv-pt.pdf',
      name: 'juan-frois-cv-pt.pdf',
      label: 'PT-BR',
      title: isPt ? 'Currículo em Português' : 'Resume in Portuguese',
      flag: '🇧🇷',
    },
    {
      key: 'en-US',
      url: '/curriculos/juan-frois-resume-en.pdf',
      name: 'juan-frois-resume-en.pdf',
      label: 'EN',
      title: isPt ? 'Resume em Inglês' : 'Resume in English',
      flag: '🇺🇸',
    },
  ]

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsCvMenuOpen(false)
      }
    }
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsCvMenuOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const scrollToProjects = () => {
    const target =
      document.getElementById('projetos') || document.getElementById('projects')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Main Section: 2 Columns on Desktop, Stacked on Mobile/Tablet */}
      <div className="hero-grid">
        {/* Profile Photo Column (Order 1 on Mobile/Tablet < 1024px, Order 2 on Desktop) */}
        <div className="hero-photo-col">
          {/* Ambient Glow Backdrop */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: 300,
              height: '100%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
              filter: 'blur(30px)',
              opacity: 0.8,
              pointerEvents: 'none',
            }}
          />

          {/* High-Contrast Frame Container */}
          <div
            className="hero-photo-frame"
            style={{
              position: 'relative',
              width: 'clamp(130px, 34vw, 280px)',
              aspectRatio: '1 / 1',
              borderRadius: 'clamp(20px, 3.5vw, 36px)',
              padding: 4,
              background:
                'linear-gradient(135deg, var(--accent-primary) 0%, rgba(255,255,255,0.1) 40%, var(--accent-impact) 100%)',
              boxShadow:
                '0 20px 48px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--border-mid)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Inner Recessed Frame */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 'clamp(18px, 3.2vw, 32px)',
                overflow: 'hidden',
                background: 'var(--bg-surface)',
                position: 'relative',
              }}
            >
              <img
                src={profilePic}
                alt={profileData.name}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.05) brightness(1.02)',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
                  borderRadius: 'clamp(18px, 3.2vw, 32px)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Floating Top Badge */}
            <div
              style={{
                position: 'absolute',
                top: -8,
                right: -6,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-mid)',
                borderRadius: 20,
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                boxShadow: 'var(--card-shadow)',
                fontSize: 10,
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                color: 'var(--accent-impact)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Zap size={11} stroke="currentColor" />
              <span>{t('hero.inProduction')}</span>
            </div>

            {/* Floating Bottom Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: -8,
                left: -6,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-mid)',
                borderRadius: 20,
                padding: '5px 11px',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                boxShadow: 'var(--card-shadow)',
                fontSize: 10,
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                color: 'var(--text-primary)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  boxShadow: '0 0 8px var(--accent-primary)',
                }}
              />
              <span>{t('hero.fullLifecycle')}</span>
            </div>
          </div>
        </div>

        {/* Content Column: Headline, Value Proposition & CTAs */}
        <div className="hero-content-col" style={{ textAlign: 'left' }}>
          {/* Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 20,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-mid)',
              marginBottom: 16,
              boxShadow: 'var(--card-shadow)',
              maxWidth: '100%',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent-impact)',
                boxShadow: '0 0 10px var(--accent-impact)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {profileData.shortName || profileData.name} · {localize(profileData.locationShort)}
            </span>
          </div>

          {/* Main Title with Fluid clamp() */}
          <h1
            className="f-display f-h1"
            style={{
              color: 'var(--text-primary)',
              marginBottom: 14,
              fontWeight: 800,
            }}
          >
            {isPt ? (
              <>
                Desenvolvedor de{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-impact) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  Soluções
                </span>
              </>
            ) : (
              <>
                Solutions{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-impact) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  Developer
                </span>
              </>
            )}
          </h1>

          {/* Positioning Pill / Subtitle */}
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(16px, 2vw, 22px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 14,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
            }}
          >
            {isPt
              ? 'Automação (RPA) • Engenharia de Dados • IA'
              : 'Automation (RPA) • Data Engineering • AI'}
          </p>

          {/* Impact Value Proposition */}
          <p
            style={{
              fontSize: 'clamp(14px, 1.25vw, 16px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.68,
              maxWidth: 620,
              marginBottom: 24,
            }}
          >
            {isPt ? (
              <>
                Transformo gargalos operacionais em{' '}
                <strong style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                  ferramentas escaláveis em Python
                </strong>
                . Da observação prática da dor de negócio à engenharia: arquiteturas
                assíncronas, servidores MCP com agentes autônomos e esteiras automatizadas
                que poupam centenas de horas e eliminam erros manuais.
              </>
            ) : (
              <>
                I turn operational bottlenecks into{' '}
                <strong style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                  scalable Python tools
                </strong>
                . From direct observation of business friction to engineering: asynchronous
                architectures, MCP servers with autonomous agents, and automated pipelines saving
                hundreds of hours and eliminating manual errors.
              </>
            )}
          </p>

          {/* Stack Chips */}
          <div
            className="chip-row"
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 28,
            }}
          >
            <span
              className="chip"
              style={{
                borderColor: 'rgba(59, 130, 246, 0.35)',
                color: 'var(--accent-primary)',
                background: 'rgba(59, 130, 246, 0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
              }}
            >
              <Terminal size={12} stroke="currentColor" />
              <span>Python 3.13</span>
            </span>

            <span
              className="chip"
              style={{
                borderColor: 'rgba(16, 185, 129, 0.35)',
                color: 'var(--accent-impact)',
                background: 'rgba(16, 185, 129, 0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
              }}
            >
              <Sparkles size={12} stroke="currentColor" />
              <span>{t('hero.chipMcp')}</span>
            </span>

            <span
              className="chip"
              style={{
                borderColor: 'rgba(56, 189, 248, 0.35)',
                color: 'var(--accent-secondary)',
                background: 'rgba(56, 189, 248, 0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
              }}
            >
              <Database size={12} stroke="currentColor" />
              <span>PostgreSQL & SQL</span>
            </span>

            <span
              className="chip"
              style={{
                borderColor: 'var(--border-mid)',
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
              }}
            >
              <Cpu size={12} stroke="currentColor" />
              <span>RPA & Selenium</span>
            </span>
          </div>

          {/* Action CTAs: Responsive Stack on Mobile < 640px, Row on Tablet/Desktop */}
          <div className="hero-ctas-container">
            {/* Primary CTA (Solid highlight): Ver Projetos em Produção */}
            <button
              type="button"
              onClick={scrollToProjects}
              className="btn-primary touch-target"
              style={{
                padding: '12px 24px',
                fontSize: 14,
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
                borderRadius: 11,
                minHeight: 46,
              }}
            >
              <span>{t('hero.viewProjects')}</span>
              <ArrowDown size={15} stroke="currentColor" />
            </button>

            {/* Secondary CTA: Baixar Currículo (PDF) with Dropdown */}
            <div ref={menuRef} className="hero-cv-wrapper" style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'stretch',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-mid)',
                  borderRadius: 11,
                  boxShadow: 'var(--card-shadow)',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                <a
                  href={activeCv.url}
                  download={activeCv.filename}
                  className="btn-ghost-hero touch-target"
                  title={`${activeCv.heroLabel} (${activeCv.fullTitle})`}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '11px 18px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: 46,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                >
                  <Download size={15} stroke="currentColor" />
                  <span>{activeCv.heroLabel}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsCvMenuOpen((prev) => !prev)}
                  aria-label={t('hero.cvMenuTitle')}
                  aria-expanded={isCvMenuOpen}
                  style={{
                    background: 'var(--bg-elevated)',
                    border: 'none',
                    borderLeft: '1px solid var(--border-mid)',
                    color: 'var(--text-secondary)',
                    padding: '0 12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    fontSize: 11.5,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    transition: 'background 0.2s ease',
                    minHeight: 46,
                  }}
                  title={isPt ? 'Alternar entre PT-BR e EN' : 'Switch between PT-BR and EN'}
                >
                  <span>{activeCv.shortLabel}</span>
                  <ChevronDown
                    size={12}
                    stroke="currentColor"
                    style={{
                      transform: isCvMenuOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
              </div>

              {/* Floating Menu for CV version */}
              {isCvMenuOpen && (
                <div
                  role="menu"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    minWidth: 220,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-mid)',
                    borderRadius: 10,
                    padding: '6px',
                    boxShadow: 'var(--card-shadow-hover)',
                    zIndex: 50,
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
                    {t('hero.cvMenuTitle')}
                  </div>

                  {cvFiles.map((item) => {
                    const isSelected = (isPt && item.key === 'pt-BR') || (!isPt && item.key === 'en-US')
                    return (
                      <a
                        key={item.key}
                        href={item.url}
                        download={item.name}
                        onClick={() => {
                          setLang(item.key)
                          setIsCvMenuOpen(false)
                        }}
                        role="menuitem"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: 6,
                          background: isSelected ? 'var(--bg-elevated)' : 'transparent',
                          color: isSelected
                            ? 'var(--accent-primary)'
                            : 'var(--text-primary)',
                          textDecoration: 'none',
                          fontSize: 13,
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: isSelected ? 600 : 500,
                          cursor: 'pointer',
                          minHeight: 44,
                        }}
                      >
                        <span
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                        >
                          <span>{item.flag}</span>
                          <span>{item.title}</span>
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11,
                            fontFamily: 'JetBrains Mono',
                            color: isSelected
                              ? 'var(--accent-primary)'
                              : 'var(--text-muted)',
                          }}
                        >
                          {item.label}
                          {isSelected && <Check size={12} stroke="currentColor" />}
                        </span>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: 3 Big Numbers (KPIs) of Impact */}
      <div className="kpi-banner-grid">
        {/* KPI 1 */}
        <div
          className="card"
          style={{
            padding: '18px 20px',
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            position: 'relative',
            overflow: 'hidden',
            borderLeft: '3px solid var(--accent-impact)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-impact)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <TrendingDown size={12} stroke="currentColor" />
              <span>{t('hero.operationalEfficiency')}</span>
            </span>
          </div>

          <div
            className="stat-num"
            style={{
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, var(--text-primary), var(--accent-impact))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            +90%
          </div>

          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              marginTop: 2,
            }}
          >
            {t('hero.kpi1Title')}
          </p>

          <p
            style={{
              fontSize: 11.5,
              color: 'var(--text-muted)',
              lineHeight: 1.45,
            }}
          >
            {localize(profileData.heroMetrics[0].label)}
          </p>
        </div>

        {/* KPI 2 */}
        <div
          className="card"
          style={{
            padding: '18px 20px',
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            position: 'relative',
            overflow: 'hidden',
            borderLeft: '3px solid var(--accent-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Sparkles size={12} stroke="currentColor" />
              <span>{t('hero.dataAiArch')}</span>
            </span>
          </div>

          <div
            className="stat-num"
            style={{
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, var(--text-primary), var(--accent-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {localize(profileData.heroMetrics[1].metric)}
          </div>

          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              marginTop: 2,
            }}
          >
            {t('hero.kpi2Title')}
          </p>

          <p
            style={{
              fontSize: 11.5,
              color: 'var(--text-muted)',
              lineHeight: 1.45,
            }}
          >
            {localize(profileData.heroMetrics[1].label)}
          </p>
        </div>

        {/* KPI 3 */}
        <div
          className="card"
          style={{
            padding: '18px 20px',
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            position: 'relative',
            overflow: 'hidden',
            borderLeft: '3px solid var(--accent-secondary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-secondary)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Building2 size={12} stroke="currentColor" />
              <span>{t('hero.companiesWorkedWith')}</span>
            </span>
          </div>

          <div
            className="stat-num"
            style={{
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, var(--text-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {localize(profileData.heroMetrics[2].metric)}
          </div>

          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              marginTop: 2,
            }}
          >
            {t('hero.kpi3Title')}
          </p>

          <p
            style={{
              fontSize: 11.5,
              color: 'var(--text-muted)',
              lineHeight: 1.45,
            }}
          >
            {localize(profileData.heroMetrics[2].label)}
          </p>
        </div>
      </div>
    </section>
  )
})

export default Hero
