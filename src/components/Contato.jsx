import { useEffect, useRef, useState } from 'react'
import { Mail, MapPin, Download, ExternalLink, Check, Copy, FileText } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'

export default function Contato() {
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
      style={{
        padding: 'clamp(80px, 10vh, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        zIndex: 5,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Anchor for backward compatibility with #contact */}
      <span
        id="contact"
        style={{ position: 'absolute', top: -80, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      <div className="energy-line" style={{ maxWidth: 200, marginBottom: 64 }} />

      <div
        className="two-col"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Heading, Context & Direct Buttons */}
        <div>
          <p
            className="s-label reveal"
            style={{
              marginBottom: 20,
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            05 — CONTATO & CONEXÃO
          </p>

          <h2
            className="f-display reveal"
            style={{
              fontSize: 'clamp(30px, 4vw, 56px)',
              color: 'var(--text-primary)',
              marginBottom: 20,
              transitionDelay: '80ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            Vamos conversar e
            <br />
            <span className="g-amber f-serif" style={{ fontWeight: 400 }}>
              construir soluções
            </span>
          </h2>

          <p
            className="reveal"
            style={{
              fontSize: 15.5,
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              maxWidth: 480,
              marginBottom: 32,
              transitionDelay: '140ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            Aberto a oportunidades profissionais, trocas técnicas e novos projetos em
            Engenharia de Software, Engenharia de Dados, Automação (RPA) e Inteligência
            Artificial.
          </p>

          <div
            className="reveal"
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              transitionDelay: '200ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <LinkedinIcon size={14} />
              <span>Conectar no LinkedIn ↗</span>
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Mail size={14} stroke="currentColor" />
              <span>Enviar E-mail</span>
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
          <div
            className="card"
            style={{
              padding: '18px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
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
              <div style={{ minWidth: 0 }}>
                <span
                  className="f-mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  E-MAIL DIRETO
                </span>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: 2,
                    wordBreak: 'break-all',
                  }}
                >
                  {profileData.email}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <button
                type="button"
                onClick={copyEmail}
                className="chip"
                title="Copiar endereço de e-mail"
                style={{
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 11,
                  background: copiedEmail ? 'var(--ember-glow)' : 'var(--bg-surface)',
                  color: copiedEmail ? 'var(--accent-impact)' : 'var(--text-secondary)',
                  borderColor: copiedEmail ? 'var(--accent-impact)' : 'var(--border)',
                }}
              >
                {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedEmail ? 'Copiado!' : 'Copiar'}</span>
              </button>

              <a
                href={`mailto:${profileData.email}`}
                className="btn-ghost"
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>Escrever</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Card: LinkedIn */}
          <div
            className="card"
            style={{
              padding: '18px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
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
              <div style={{ minWidth: 0 }}>
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
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: 2,
                  }}
                >
                  {profileData.social?.linkedinLabel || 'linkedin.com/in/jfrois'}
                </p>
              </div>
            </div>

            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{
                padding: '6px 12px',
                fontSize: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                flexShrink: 0,
              }}
            >
              <span>Acessar</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Card: GitHub */}
          <div
            className="card"
            style={{
              padding: '18px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
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
              <div style={{ minWidth: 0 }}>
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
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: 2,
                  }}
                >
                  {profileData.social?.githubLabel || 'github.com/JFrois'}
                </p>
              </div>
            </div>

            <a
              href={profileData.social.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{
                padding: '6px 12px',
                fontSize: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                flexShrink: 0,
              }}
            >
              <span>Ver código</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Card: Download Direto de Currículo em PDF (PT-BR e EN) */}
          <div
            className="card"
            style={{
              padding: '20px 22px',
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
                DOWNLOAD DIRETO DO CURRÍCULO (PDF)
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={profileData.links?.cvPt || '/curriculos/juan-frois-cv-pt.pdf'}
                download="juan-frois-cv-pt.pdf"
                className="btn-primary"
                style={{
                  flex: '1 1 180px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  fontSize: 12.5,
                  padding: '9px 16px',
                }}
              >
                <Download size={13} stroke="currentColor" />
                <span>Currículo em Português</span>
              </a>

              <a
                href={profileData.links?.cvEn || '/curriculos/juan-frois-resume-en.pdf'}
                download="juan-frois-resume-en.pdf"
                className="btn-ghost"
                style={{
                  flex: '1 1 180px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  fontSize: 12.5,
                  padding: '9px 16px',
                }}
              >
                <Download size={13} stroke="currentColor" />
                <span>Resume in English</span>
              </a>
            </div>
          </div>

          {/* Card: Localização */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              color: 'var(--text-muted)',
              fontSize: 12,
            }}
          >
            <MapPin
              size={13}
              stroke="currentColor"
              style={{ color: 'var(--accent-primary)', flexShrink: 0 }}
            />
            <span>{profileData.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
