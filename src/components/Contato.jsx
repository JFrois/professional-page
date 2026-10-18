import { useEffect, useRef, useState } from 'react'
import { Mail, MapPin, Download, ExternalLink, Check, Copy, FileText } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'
import { useLanguage } from '../hooks/useLanguage.js'

export default function Contato() {
  const { isPt, t, localize } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

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

  const copyEmail = () => {
    navigator.clipboard?.writeText(profileData.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="section-container"
    >
      {/* Anchor for backward compatibility with #contact */}
      <span
        id="contact"
        style={{ position: 'absolute', top: -80, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      <div className="energy-line" style={{ maxWidth: 200, marginBottom: 'clamp(32px, 5vh, 48px)' }} />

      {/* Two Column Layout: 1 col on Mobile/Tablet, 2 col on Desktop */}
      <div className="two-col">
        {/* Left Column: Heading, Context & Direct Buttons */}
        <div>
          <p
            className="s-label reveal"
            style={{
              marginBottom: 16,
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {t('contact.sectionLabel')}
          </p>

          <h2
            className="f-display f-h2 reveal"
            style={{
              color: 'var(--text-primary)',
              marginBottom: 16,
              transitionDelay: '80ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {t('contact.titleLine1')}
            <br />
            <span className="g-amber f-serif" style={{ fontWeight: 400 }}>
              {t('contact.titleLine2')}
            </span>
          </h2>

          <p
            className="reveal"
            style={{
              fontSize: 'clamp(14px, 1.25vw, 15.5px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: 480,
              marginBottom: 24,
              transitionDelay: '140ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {t('contact.description')}
          </p>

          <div
            className="reveal"
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              transitionDelay: '200ms',
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
                gap: 8,
                flex: '1 1 auto',
                justifyContent: 'center',
                minHeight: 44,
              }}
            >
              <LinkedinIcon size={14} />
              <span>{t('contact.connectLinkedin')}</span>
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="btn-ghost touch-target"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                flex: '1 1 auto',
                justifyContent: 'center',
                minHeight: 44,
              }}
            >
              <Mail size={14} stroke="currentColor" />
              <span>{t('contact.sendEmail')}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Direct Conversion Cards */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            transitionDelay: '180ms',
            ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
          }}
        >
          {/* Card: E-mail */}
          <div className="card contact-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, width: '100%' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(15, 98, 254, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  flexShrink: 0,
                }}
              >
                <Mail size={16} stroke="currentColor" />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <span
                  className="f-mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {t('contact.directEmail')}
                </span>
                <p className="email-address-text">
                  {profileData.email}
                </p>
              </div>
            </div>

            <div className="contact-card-actions">
              <button
                type="button"
                onClick={copyEmail}
                className="chip touch-target"
                title={t('contact.copy')}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 12,
                  background: copiedEmail ? 'var(--ember-glow)' : 'var(--bg-surface)',
                  color: copiedEmail ? 'var(--accent-impact)' : 'var(--text-secondary)',
                  borderColor: copiedEmail ? 'var(--accent-impact)' : 'var(--border)',
                }}
              >
                {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedEmail ? t('contact.copied') : t('contact.copy')}</span>
              </button>

              <a
                href={`mailto:${profileData.email}`}
                className="btn-ghost touch-target"
                style={{
                  padding: '8px 14px',
                  fontSize: 12.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <span>{t('contact.write')}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Card: LinkedIn */}
          <div className="card contact-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, width: '100%' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(2, 132, 199, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-secondary)',
                  flexShrink: 0,
                }}
              >
                <LinkedinIcon size={16} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <span
                  className="f-mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  LINKEDIN
                </span>
                <p
                  style={{
                    fontSize: 'clamp(13px, 1.4vw, 14px)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {profileData.social?.linkedinLabel || 'linkedin.com/in/jfrois'}
                </p>
              </div>
            </div>

            <div className="contact-card-actions">
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost touch-target"
                style={{
                  padding: '8px 16px',
                  fontSize: 12.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <span>{t('contact.viewProfile')}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Card: GitHub */}
          <div className="card contact-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, width: '100%' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(232, 150, 60, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e8963c',
                  flexShrink: 0,
                }}
              >
                <GithubIcon size={16} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <span
                  className="f-mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  GITHUB
                </span>
                <p
                  style={{
                    fontSize: 'clamp(13px, 1.4vw, 14px)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {profileData.social?.githubLabel || 'github.com/JFrois'}
                </p>
              </div>
            </div>

            <div className="contact-card-actions">
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost touch-target"
                style={{
                  padding: '8px 16px',
                  fontSize: 12.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <span>{t('contact.viewRepos')}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Card: Download Direto de Currículo em PDF (PT-BR e EN) */}
          <div
            className="card"
            style={{
              padding: 'clamp(16px, 2.5vw, 20px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              border: '1px solid var(--border-mid)',
              background: 'var(--bg-elevated)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileText
                size={16}
                stroke="currentColor"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span
                className="f-mono"
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.08em',
                }}
              >
                {t('contact.directDownload')}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href="/curriculos/juan-frois-cv-pt.pdf"
                download="juan-frois-cv-pt.pdf"
                className={`touch-target ${isPt ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  flex: '1 1 140px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  fontSize: 12.5,
                  padding: '10px 16px',
                  minHeight: 44,
                  textDecoration: 'none',
                }}
              >
                <span>🇧🇷</span>
                <Download size={13} stroke="currentColor" />
                <span>{isPt ? 'Baixar CV (PT-BR)' : 'CV (PT-BR)'}</span>
              </a>

              <a
                href="/curriculos/juan-frois-resume-en.pdf"
                download="juan-frois-resume-en.pdf"
                className={`touch-target ${!isPt ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  flex: '1 1 140px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  fontSize: 12.5,
                  padding: '10px 16px',
                  minHeight: 44,
                  textDecoration: 'none',
                }}
              >
                <span>🇺🇸</span>
                <Download size={13} stroke="currentColor" />
                <span>{!isPt ? 'Download Resume (EN)' : 'Resume (EN)'}</span>
              </a>
            </div>
          </div>

          {/* Card: Localização */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              color: 'var(--text-muted)',
              fontSize: 12,
            }}
          >
            <MapPin
              size={13}
              stroke="currentColor"
              style={{ color: 'var(--accent-primary)', flexShrink: 0 }}
            />
            <span>{localize(profileData.location)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
