import { useEffect, useRef, useState } from 'react'
import {
  Download,
  MapPin,
  GraduationCap,
  Languages as LanguagesIcon,
  Award,
  Zap,
  Clock,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'
import profilePic from '../assets/perfillinkedin.jpeg'

export default function About() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const narrativePillars = [
    {
      step: '01',
      title: 'Origem Operacional & Negócio',
      company: 'Loft',
      color: '#7a7060',
      description:
        'Vivência direta em operações jurídicas e contratos imobiliários. Identificação na prática de ineficiências manuais e o aprendizado de Python para automatizar fluxos com -50% no tempo de processamento.',
    },
    {
      step: '02',
      title: 'Automação em Escala & RPA',
      company: 'QuintoAndar & VOSS Automotive',
      color: '#c9622f',
      description:
        'Transição definitiva para tecnologia: desenvolvimento de automações via API e robôs RPA que reduziram rotinas em até 93% e pouparam centenas de horas de trabalho repetitivo.',
    },
    {
      step: '03',
      title: 'Engenharia de Dados & Servidores de IA',
      company: '99 (DiDi) & IBM',
      color: '#e8963c',
      description:
        'Diagnóstico de causa raiz em SQL na operação crítica da 99Food e desenvolvimento de servidores MCP (FastMCP) para inteligência artificial e pipelines de dados com PostgreSQL e BI na IBM.',
    },
  ]

  return (
    <section
      id="sobre"
      ref={sectionRef}
      style={{
        padding: 'clamp(100px, 12vh, 160px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        zIndex: 5,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Anchor for backward compatibility with #about */}
      <span
        id="about"
        style={{ position: 'absolute', top: -80, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      <p
        className="s-label reveal"
        style={{
          marginBottom: 20,
          transitionDelay: '0ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        04 — SOBRE MIM
      </p>

      <div
        className="two-col"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Escaneable Narrative */}
        <div>
          <h2
            className="f-display reveal"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--text-primary)',
              marginBottom: 20,
              transitionDelay: '80ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            Do operacional
            <br />
            <span className="f-serif g-amber" style={{ fontWeight: 400 }}>
              à engenharia.
            </span>
          </h2>

          <p
            className="reveal"
            style={{
              fontSize: 15.5,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: 28,
              transitionDelay: '120ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            Minha trajetória une o olhar analítico de quem viveu a dor operacional à
            capacidade técnica de construir arquiteturas robustas em automação, dados e
            inteligência artificial.
          </p>

          {/* Scannable Narrative Cards */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 28,
              transitionDelay: '160ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {narrativePillars.map((pillar) => (
              <div
                key={pillar.step}
                className="card"
                style={{
                  padding: '16px 20px',
                  borderLeft: `3px solid ${pillar.color}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      className="f-mono"
                      style={{
                        fontSize: 10,
                        color: pillar.color,
                        fontWeight: 700,
                      }}
                    >
                      {pillar.step}
                    </span>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {pillar.title}
                    </h3>
                  </div>
                  <span
                    className="chip"
                    style={{
                      fontSize: 9.5,
                      fontFamily: 'JetBrains Mono',
                      borderColor: `${pillar.color}44`,
                      color: pillar.color,
                      background: `${pillar.color}11`,
                      padding: '2px 8px',
                    }}
                  >
                    {pillar.company}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Synthesis quote box */}
          <div
            className="card reveal"
            style={{
              padding: '16px 20px',
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border-mid)',
              marginBottom: 32,
              transitionDelay: '200ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.65,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              <strong style={{ color: 'var(--accent-primary)' }}>Visão híbrida:</strong>{' '}
              entendimento profundo da regra de negócio somado ao rigor de engenharia de
              software para transformar gargalos em soluções automatizadas de alto impacto.
            </p>
          </div>

          {/* Action Links */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              transitionDelay: '240ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn ↗</span>
            </a>
            <a
              href={profileData.social.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
            >
              <GithubIcon size={14} />
              <span>GitHub ↗</span>
            </a>
            <a
              href={profileData.links?.cvPt || '/curriculos/juan-frois-cv-pt.pdf'}
              download="juan-frois-cv-pt.pdf"
              className="btn-ghost"
              title="Baixar Currículo em PDF (Português)"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
            >
              <Download size={14} stroke="currentColor" />
              <span>Currículo (PT)</span>
            </a>
            <a
              href={profileData.links?.cvEn || '/curriculos/juan-frois-resume-en.pdf'}
              download="juan-frois-resume-en.pdf"
              className="btn-ghost"
              title="Download Resume in PDF (English)"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
            >
              <Download size={14} stroke="currentColor" />
              <span>Resume (EN)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Profile, Stats, Education & Certifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Profile Header Card */}
          <div
            className="card reveal"
            style={{
              padding: '20px 24px',
              transitionDelay: '180ms',
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <img
              src={profilePic}
              alt={profileData.name}
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--border-mid)',
                boxShadow: '0 0 20px var(--accent-glow)',
              }}
            />
            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                {profileData.name}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--accent-primary)',
                  fontFamily: 'JetBrains Mono',
                  marginTop: 2,
                }}
              >
                {profileData.headline}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  marginTop: 5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <MapPin
                  size={12}
                  stroke="currentColor"
                  style={{ color: 'var(--accent-primary)', flexShrink: 0 }}
                />
                <span>{profileData.location}</span>
              </p>
            </div>
          </div>

          {/* Key Metrics Stats */}
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              transitionDelay: '220ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {profileData.stats.map((stat, sIdx) => {
              const StatIcon = sIdx === 0 ? TrendingUp : sIdx === 1 ? Zap : Clock

              return (
                <div
                  key={stat.label}
                  className="card"
                  style={{
                    padding: '20px 16px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: `${stat.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                      color: stat.color,
                    }}
                  >
                    <StatIcon size={14} stroke="currentColor" />
                  </div>
                  <div
                    className="stat-num"
                    style={{
                      background: `linear-gradient(135deg, var(--text-primary), ${stat.color})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize:
                        stat.num.length > 7
                          ? 'clamp(18px, 2.2vw, 24px)'
                          : undefined,
                      whiteSpace: stat.num.length > 7 ? 'normal' : 'nowrap',
                      lineHeight: stat.num.length > 7 ? 1.2 : undefined,
                      marginBottom: stat.num.length > 7 ? 6 : undefined,
                    }}
                  >
                    {stat.num}
                  </div>
                  <p
                    style={{
                      fontSize: 11,
                      color: 'var(--text-secondary)',
                      fontFamily: 'JetBrains Mono',
                      letterSpacing: '0.04em',
                      marginTop: 4,
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Education & Languages */}
          <div
            className="card reveal"
            style={{
              padding: '24px',
              transitionDelay: '280ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <p
              className="s-label"
              style={{
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <GraduationCap
                size={13}
                stroke="currentColor"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span>FORMAÇÃO ACADÊMICA</span>
            </p>

            {profileData.education.map((edu) => (
              <div
                key={edu.institution}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  paddingBottom: 14,
                  marginBottom: 14,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: 'var(--text-secondary)',
                      marginTop: 2,
                    }}
                  >
                    {edu.course}
                  </p>
                </div>
                <span
                  className={`badge ${edu.current ? 'present' : 'past'}`}
                  style={{ marginTop: 2 }}
                >
                  {edu.period}
                </span>
              </div>
            ))}

            <p
              className="s-label"
              style={{
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <LanguagesIcon
                size={13}
                stroke="currentColor"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span>IDIOMAS</span>
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {profileData.languages.map((lang) => (
                <span key={lang.name} className={`chip ${lang.variant}`}>
                  {lang.name} — {lang.level}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications with Issuer */}
          <div
            className="card reveal"
            style={{
              padding: '24px',
              transitionDelay: '340ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <p
              className="s-label"
              style={{
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Award
                size={13}
                stroke="currentColor"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span>CERTIFICAÇÕES COM EMISSOR</span>
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {profileData.certifications.map((cert) => {
                const isObj = typeof cert === 'object' && cert !== null
                const certName = isObj ? cert.name : cert
                const certIssuer = isObj ? cert.issuer : null

                const getIssuerStyle = (issuer) => {
                  if (issuer?.includes('IBM')) {
                    return {
                      color: '#0f62fe',
                      bg: 'rgba(15, 98, 254, 0.1)',
                      border: 'rgba(15, 98, 254, 0.3)',
                    }
                  }
                  if (issuer?.includes('FIAP')) {
                    return {
                      color: '#ed145b',
                      bg: 'rgba(237, 20, 91, 0.1)',
                      border: 'rgba(237, 20, 91, 0.3)',
                    }
                  }
                  return {
                    color: '#0284c7',
                    bg: 'rgba(2, 132, 199, 0.1)',
                    border: 'rgba(2, 132, 199, 0.3)',
                  }
                }

                const style = getIssuerStyle(certIssuer)

                return (
                  <div
                    key={certName}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      background: 'var(--bg-elevated)',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        minWidth: 0,
                      }}
                    >
                      <CheckCircle2
                        size={13}
                        stroke="currentColor"
                        style={{
                          color: 'var(--accent-primary)',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          lineHeight: 1.3,
                        }}
                      >
                        {certName}
                      </span>
                    </div>

                    {certIssuer && (
                      <span
                        className="f-mono"
                        style={{
                          fontSize: 9.5,
                          fontWeight: 600,
                          color: style.color,
                          background: style.bg,
                          border: `1px solid ${style.border}`,
                          padding: '3px 8px',
                          borderRadius: 4,
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {certIssuer}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
