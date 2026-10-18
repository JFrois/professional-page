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

const Hero = forwardRef(function Hero(_props, ref) {
  const [cvLang, setCvLang] = useState('pt')
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const cvFiles = {
    pt: {
      url: '/curriculos/juan-frois-cv-pt.pdf',
      name: 'juan-frois-cv-pt.pdf',
      label: 'PT-BR',
      title: 'Currículo em Português',
      flag: '🇧🇷',
    },
    en: {
      url: '/curriculos/juan-frois-resume-en.pdf',
      name: 'juan-frois-resume-en.pdf',
      label: 'EN',
      title: 'Resume in English',
      flag: '🇺🇸',
    },
  }

  const activeCv = cvFiles[cvLang]

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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(96px, 11vh, 128px) clamp(20px, 5vw, 64px) clamp(40px, 6vh, 60px)',
        maxWidth: 1240,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Main Section: 2 Columns (Content & Profile Photo) */}
      <div
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          marginBottom: 'clamp(36px, 6vh, 64px)',
        }}
      >
        {/* Left Column: Headline, Value Proposition & CTAs */}
        <div style={{ textAlign: 'left' }}>
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
              marginBottom: 20,
              boxShadow: 'var(--card-shadow)',
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
              }}
            >
              {profileData.shortName || profileData.name} · São Paulo, BR
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="f-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.08,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: 16,
              fontWeight: 800,
            }}
          >
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
          </h1>

          {/* Positioning Pill / Subtitle */}
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(17px, 2.1vw, 22px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 16,
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
            }}
          >
            Automação (RPA) &bull; Engenharia de Dados &bull; IA
          </p>

          {/* Impact Value Proposition */}
          <p
            style={{
              fontSize: 'clamp(14.5px, 1.3vw, 16.5px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 620,
              marginBottom: 28,
            }}
          >
            Transformo gargalos operacionais em{' '}
            <strong style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
              ferramentas escaláveis em Python
            </strong>
            . Da observação prática da dor de negócio à engenharia: arquiteturas
            assíncronas, servidores MCP com agentes autônomos e esteiras automatizadas
            que poupam centenas de horas e eliminam erros manuais.
          </p>

          {/* Stack Chips */}
          <div
            className="chip-row"
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 32,
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
              <span>Servidores MCP & IA</span>
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

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {/* Primary CTA (Solid highlight): Ver Projetos em Produção */}
            <button
              type="button"
              onClick={scrollToProjects}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: 14,
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                borderRadius: 11,
              }}
            >
              <span>Ver Projetos em Produção</span>
              <ArrowDown size={15} stroke="currentColor" />
            </button>

            {/* Secondary CTA (Outline/surface with download icon): Baixar Currículo (PDF) */}
            <div ref={menuRef} style={{ position: 'relative' }}>
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
                }}
              >
                <a
                  href={activeCv.url}
                  download={activeCv.name}
                  className="btn-ghost-hero"
                  title={`Baixar Currículo (${activeCv.title})`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
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
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                >
                  <Download size={15} stroke="currentColor" />
                  <span>Baixar Currículo (PDF)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsCvMenuOpen((prev) => !prev)}
                  aria-label="Selecionar versão do currículo"
                  aria-expanded={isCvMenuOpen}
                  style={{
                    background: 'var(--bg-elevated)',
                    border: 'none',
                    borderLeft: '1px solid var(--border-mid)',
                    color: 'var(--text-secondary)',
                    padding: '0 10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11.5,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    transition: 'background 0.2s ease',
                  }}
                  title="Alternar entre PT-BR e EN"
                >
                  <span>{activeCv.label}</span>
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
                    Idioma do Currículo
                  </div>

                  {Object.values(cvFiles).map((item) => {
                    const isSelected = cvLang === item.label.toLowerCase().slice(0, 2)
                    return (
                      <a
                        key={item.label}
                        href={item.url}
                        download={item.name}
                        onClick={() => {
                          setCvLang(item.label.toLowerCase().slice(0, 2))
                          setIsCvMenuOpen(false)
                        }}
                        role="menuitem"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: 6,
                          background: isSelected ? 'var(--bg-elevated)' : 'transparent',
                          color: isSelected
                            ? 'var(--accent-primary)'
                            : 'var(--text-primary)',
                          textDecoration: 'none',
                          fontSize: 12.5,
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: isSelected ? 600 : 500,
                          cursor: 'pointer',
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

        {/* Right Column: Profile Photo with Professional High-Contrast Frame */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Ambient Glow Backdrop */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: 320,
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
            style={{
              position: 'relative',
              width: 'clamp(200px, 24vw, 300px)',
              aspectRatio: '1 / 1',
              borderRadius: 'clamp(24px, 3.5vw, 36px)',
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
                borderRadius: 'clamp(20px, 3.2vw, 32px)',
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
                  borderRadius: 'clamp(20px, 3.2vw, 32px)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Floating Top Badge */}
            <div
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-mid)',
                borderRadius: 20,
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: 'var(--card-shadow)',
                fontSize: 11,
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                color: 'var(--accent-impact)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Zap size={11} stroke="currentColor" />
              <span>Em Produção</span>
            </div>

            {/* Floating Bottom Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: -12,
                left: -10,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-mid)',
                borderRadius: 20,
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: 'var(--card-shadow)',
                fontSize: 11,
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
              <span>Full Lifecycle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: 3 Big Numbers (KPIs) of Impact */}
      <div
        className="kpi-banner-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%',
        }}
      >
        {/* KPI 1 */}
        <div
          className="card"
          style={{
            padding: '20px 22px',
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
              marginBottom: 4,
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
              <span>Eficiência Operacional</span>
            </span>
          </div>

          <div
            className="stat-num"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              lineHeight: 1,
              letterSpacing: '-0.03em',
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
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            +90% de redução em tempo de rotinas manuais
          </p>

          <p
            style={{
              fontSize: 11.5,
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            Rotinas de horas substituídas por robôs e pipelines estruturados em Python.
          </p>
        </div>

        {/* KPI 2 */}
        <div
          className="card"
          style={{
            padding: '20px 22px',
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
              marginBottom: 4,
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
              <span>Arquitetura de Dados & IA</span>
            </span>
          </div>

          <div
            className="stat-num"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, var(--text-primary), var(--accent-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            2h–4h → Seg
          </div>

          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            De 2h–4h para segundos no acesso a métricas com IA (MCP) e SQL
          </p>

          <p
            style={{
              fontSize: 11.5,
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            Servidor corporativo MCP conectando Watsonx Orchestrate a bancos analíticos.
          </p>
        </div>

        {/* KPI 3 */}
        <div
          className="card"
          style={{
            padding: '20px 22px',
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
              marginBottom: 4,
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
              <span>Vivência Corporativa</span>
            </span>
          </div>

          <div
            className="stat-num"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, var(--text-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            5+ Marcas
          </div>

          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            Passagens por IBM, 99 (DiDi), VOSS Automotive, QuintoAndar e Loft
          </p>

          <p
            style={{
              fontSize: 11.5,
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            Trajetória híbrida conectando dores de operações críticas à engenharia robusta.
          </p>
        </div>
      </div>
    </section>
  )
})

export default Hero

