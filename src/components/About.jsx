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
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
      >
        <div>
          <h2
            className="f-display reveal"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 58px)',
              color: 'var(--text-primary)',
              marginBottom: 28,
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

          <div
            className="reveal"
            style={{
              transitionDelay: '160ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: 18,
              }}
            >
              Comecei na área jurídica e operacional — Loft, contratos imobiliários,
              dashboards manuais. Enxerguei os gargalos antes de saber que podia
              automatizá-los. Aprendi Python por necessidade. Depois, por obsessão.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: 18,
              }}
            >
              Hoje atuo na interseção entre{' '}
              <strong style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                Engenharia de Software
              </strong>{' '}
              e{' '}
              <strong style={{ color: 'var(--steel)', fontWeight: 600 }}>
                Inteligência de Dados
              </strong>
              . Construo ferramentas que resolvem dores reais — não apenas código
              elegante, mas soluções que geram eficiência operacional e valor estratégico.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}
            >
              Minha visão é híbrida: entendo o negócio, identifico o gargalo, e entrego a
              automação. Passei pela IBM, 99 (DiDi), VOSS Automotive e QuintoAndar —
              sempre com o mesmo método: observar, estruturar, construir.
            </p>

            <div
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
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
        </div>

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
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
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
                        stat.num.length > 7 ? 'clamp(18px, 2.2vw, 24px)' : undefined,
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
              <span>FORMAÇÃO</span>
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
                    style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}
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

          {/* Certifications */}
          <div
            className="card reveal"
            style={{
              padding: '20px 24px',
              transitionDelay: '340ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <p
              className="s-label"
              style={{
                marginBottom: 14,
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
              <span>CERTIFICAÇÕES</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {profileData.certifications.map((cert, idx) => {
                const isObj = typeof cert === 'object' && cert !== null
                const certName = isObj ? cert.name : cert
                const certIssuer = isObj ? cert.issuer : null
                return (
                  <span
                    key={isObj ? cert.name : idx}
                    className="chip"
                    title={certIssuer ? `Emissor: ${certIssuer}` : undefined}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>{certName}</span>
                    {certIssuer && (
                      <span
                        style={{
                          fontSize: 9.5,
                          opacity: 0.6,
                          fontFamily: 'JetBrains Mono',
                        }}
                      >
                        · {certIssuer}
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
