import { useEffect, useRef, useState } from 'react'
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
      id="about"
      ref={sectionRef}
      style={{
        padding: 'clamp(100px, 12vh, 160px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        zIndex: 5,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <p
        className="s-label reveal"
        style={{
          marginBottom: 20,
          transitionDelay: '0ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        01 — SOBRE MIM
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
              color: '#f5f0e8',
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
                color: 'rgba(245,240,232,0.65)',
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
                color: 'rgba(245,240,232,0.65)',
                marginBottom: 18,
              }}
            >
              Hoje atuo na interseção entre{' '}
              <strong style={{ color: 'var(--amber)', fontWeight: 600 }}>
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
                color: 'rgba(245,240,232,0.65)',
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
              >
                LinkedIn ↗
              </a>
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                GitHub ↗
              </a>
              <a
                href="/curriculos/Juan%20Frois%20%E2%80%94%20Curr%C3%ADculo%20(PT-BR).pdf"
                download
                className="btn-ghost"
                title="Baixar Currículo em PDF"
              >
                Currículo PDF ↓
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
                boxShadow: '0 0 20px rgba(232, 140, 74, 0.25)',
              }}
            />
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--t1)' }}>
                {profileData.name}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--amber)',
                  fontFamily: 'JetBrains Mono',
                  marginTop: 2,
                }}
              >
                {profileData.headline}
              </p>
              <p style={{ fontSize: 11, color: 'var(--t2)', marginTop: 4 }}>
                📍 {profileData.location}
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
            {profileData.stats.map((stat) => (
              <div
                key={stat.label}
                className="card"
                style={{ padding: '20px 16px', textAlign: 'center' }}
              >
                <div
                  className="stat-num"
                  style={{
                    background: `linear-gradient(135deg, #fff, ${stat.color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.num}
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: 'var(--t2)',
                    fontFamily: 'JetBrains Mono',
                    letterSpacing: '0.06em',
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
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
            <p className="s-label" style={{ marginBottom: 16 }}>
              FORMAÇÃO
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
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--t2)', marginTop: 2 }}>
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

            <p className="s-label" style={{ marginBottom: 14 }}>
              IDIOMAS
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
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
            <p className="s-label" style={{ marginBottom: 14 }}>
              CERTIFICAÇÕES
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {profileData.certifications.map((cert) => (
                <span key={cert} className="chip">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
