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
import { useLanguage } from '../hooks/useLanguage.js'

export default function About() {
  const { isPt, t, localize, activeCv } = useLanguage()
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

  const narrativePillars = t('about.pillars') || []

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="section-container"
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
          marginBottom: 16,
          transitionDelay: '0ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        {t('about.sectionLabel')}
      </p>

      {/* Two Column Layout: 1 col on Mobile/Tablet, 2 col on Desktop */}
      <div className="two-col">
        {/* Left Column: Escaneable Narrative */}
        <div>
          <h2
            className="f-display f-h2 reveal"
            style={{
              color: 'var(--text-primary)',
              marginBottom: 16,
              transitionDelay: '80ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {t('about.titleLine1')}
            <br />
            <span className="f-serif g-amber" style={{ fontWeight: 400 }}>
              {t('about.titleLine2')}
            </span>
          </h2>

          <p
            className="reveal"
            style={{
              fontSize: 'clamp(14px, 1.25vw, 15.5px)',
              lineHeight: 1.68,
              color: 'var(--text-secondary)',
              marginBottom: 24,
              transitionDelay: '120ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {t('about.narrativeIntro')}
          </p>

          {/* Scannable Narrative Cards */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 24,
              transitionDelay: '160ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {narrativePillars.map((pillar) => (
              <div
                key={pillar.step}
                className="card"
                style={{
                  padding: 'clamp(14px, 2vw, 18px)',
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
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      className="f-mono"
                      style={{
                        fontSize: 10.5,
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
                        margin: 0,
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
                    lineHeight: 1.55,
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
              padding: '16px 18px',
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border-mid)',
              marginBottom: 24,
              transitionDelay: '200ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              <strong style={{ color: 'var(--accent-primary)' }}>
                {t('about.hybridVisionLabel')}
              </strong>{' '}
              {t('about.hybridVisionText')}
            </p>
          </div>

          {/* Action Links */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              transitionDelay: '240ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-primary touch-target"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                flex: '1 1 auto',
                justifyContent: 'center',
                minHeight: 44,
              }}
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn ↗</span>
            </a>
            <a
              href={profileData.social.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost touch-target"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                flex: '1 1 auto',
                justifyContent: 'center',
                minHeight: 44,
              }}
            >
              <GithubIcon size={14} />
              <span>GitHub ↗</span>
            </a>
            {/* Dynamic Primary CV Download Button based on active language */}
            <a
              href={activeCv.url}
              download={activeCv.filename}
              className="btn-ghost touch-target"
              title={`${activeCv.label} (${activeCv.fullTitle})`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                flex: '1 1 auto',
                justifyContent: 'center',
                minHeight: 44,
              }}
            >
              <Download size={14} stroke="currentColor" />
              <span>{activeCv.label}</span>
            </a>
            {/* Secondary alternative CV button */}
            <a
              href={isPt ? '/curriculos/juan-frois-resume-en.pdf' : '/curriculos/juan-frois-cv-pt.pdf'}
              download={isPt ? 'juan-frois-resume-en.pdf' : 'juan-frois-cv-pt.pdf'}
              className="btn-ghost touch-target"
              title={isPt ? 'Download Resume in English (PDF)' : 'Baixar Currículo em Português (PDF)'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                flex: '1 1 auto',
                justifyContent: 'center',
                minHeight: 44,
              }}
            >
              <span>{isPt ? '🇺🇸' : '🇧🇷'}</span>
              <span>{isPt ? 'Resume (EN)' : 'Currículo (PT)'}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Profile, Stats, Education & Certifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Profile Header Card */}
          <div
            className="card reveal"
            style={{
              padding: '16px 20px',
              transitionDelay: '180ms',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <img
              src={profilePic}
              alt={profileData.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--border-mid)',
                boxShadow: '0 0 16px var(--accent-glow)',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                {profileData.name}
              </h3>
              <p
                style={{
                  fontSize: 11.5,
                  color: 'var(--accent-primary)',
                  fontFamily: 'JetBrains Mono',
                  marginTop: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {localize(profileData.headline)}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  marginTop: 4,
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
                <span>{localize(profileData.location)}</span>
              </p>
            </div>
          </div>

          {/* Key Metrics Stats: Responsive 3 column compact grid */}
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              transitionDelay: '220ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {profileData.stats.map((stat, sIdx) => {
              const StatIcon = sIdx === 0 ? TrendingUp : sIdx === 1 ? Zap : Clock
              const statNum = localize(stat.num)
              const statLabel = localize(stat.label)

              return (
                <div
                  key={sIdx}
                  className="card"
                  style={{
                    padding: '14px 8px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: `${stat.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                      color: stat.color,
                    }}
                  >
                    <StatIcon size={13} stroke="currentColor" />
                  </div>
                  <div
                    className="stat-num"
                    style={{
                      background: `linear-gradient(135deg, var(--text-primary), ${stat.color})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: 'clamp(15px, 2.2vw, 22px)',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {statNum}
                  </div>
                  <p
                    style={{
                      fontSize: 10,
                      color: 'var(--text-secondary)',
                      fontFamily: 'JetBrains Mono',
                      letterSpacing: '0.02em',
                      marginTop: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {statLabel}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Education & Languages */}
          <div
            className="card reveal"
            style={{
              padding: 'clamp(16px, 2.5vw, 22px)',
              transitionDelay: '280ms',
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
              <GraduationCap
                size={13}
                stroke="currentColor"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span>{t('about.academicBackground')}</span>
            </p>

            {profileData.education.map((edu) => (
              <div
                key={edu.institution}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  paddingBottom: 12,
                  marginBottom: 12,
                  borderBottom: '1px solid var(--border)',
                  flexWrap: 'wrap',
                  gap: 6,
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
                    {localize(edu.course)}
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
                marginBottom: 12,
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
              <span>{t('about.languages')}</span>
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {profileData.languages.map((item) => {
                const langName = localize(item.name)
                const langLevel = localize(item.level)
                return (
                  <span key={langName} className={`chip ${item.variant}`}>
                    {langName}: {langLevel}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Certifications with Issuer */}
          <div
            className="card reveal"
            style={{
              padding: 'clamp(16px, 2.5vw, 22px)',
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
              <span>{t('about.certificationsWithIssuer')}</span>
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {profileData.certifications.map((cert) => {
                const isObj = typeof cert === 'object' && cert !== null
                const certName = isObj ? localize(cert.name) : cert
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
                      padding: '9px 12px',
                      background: 'var(--bg-elevated)',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)',
                      gap: 8,
                      flexWrap: 'wrap',
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
                          fontSize: 12.5,
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
                          padding: '2px 7px',
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
