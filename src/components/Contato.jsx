import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'

export default function Contato() {
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

  const contactDetails = [
    {
      label: 'Email',
      icon: Mail,
      value: profileData.email,
      href: `mailto:${profileData.email}`,
    },
    ...(profileData.phone
      ? [
          {
            label: 'Telefone',
            icon: Phone,
            value: profileData.phone,
            href: `tel:${profileData.phone.replace(/[^0-9+]/g, '')}`,
          },
        ]
      : []),
    {
      label: 'Localização',
      icon: MapPin,
      value: profileData.location,
      href: undefined,
    },
    {
      label: 'LinkedIn',
      icon: LinkedinIcon,
      value: profileData.social?.linkedinLabel || 'linkedin.com/in/jfrois',
      href: profileData.social?.linkedin,
    },
    {
      label: 'GitHub',
      icon: GithubIcon,
      value: profileData.social?.githubLabel || 'github.com/JFrois',
      href: profileData.social?.github,
    },
  ]

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
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        <div>
          <p
            className="s-label reveal"
            style={{
              marginBottom: 20,
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            05 — CONTATO
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
            Entre em
            <br />
            <span className="g-amber f-serif" style={{ fontWeight: 400 }}>
              contato
            </span>
          </h2>

          <p
            className="reveal"
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              maxWidth: 420,
              marginBottom: 32,
              transitionDelay: '140ms',
              ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            Conecte-se comigo pelo LinkedIn — é o canal principal onde mantenho minha rede
            profissional e acompanho oportunidades.
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
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
            >
              <LinkedinIcon size={14} />
              <span>Ver perfil no LinkedIn ↗</span>
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
          </div>
        </div>

        <div
          className="card reveal"
          style={{
            padding: '32px',
            transitionDelay: '160ms',
            ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
          }}
        >
          <p className="s-label" style={{ marginBottom: 24 }}>
            INFORMAÇÕES
          </p>

          {contactDetails.map((item, idx) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: idx < contactDetails.length - 1 ? 16 : 0,
                marginBottom: idx < contactDetails.length - 1 ? 16 : 0,
                borderBottom:
                  idx < contactDetails.length - 1
                    ? '1px solid var(--border-subtle)'
                    : 'none',
              }}
            >
              <span
                className="f-mono"
                style={{
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {item.icon && (
                  <item.icon
                    size={13}
                    stroke="currentColor"
                    style={{ color: 'var(--accent-primary)', flexShrink: 0 }}
                  />
                )}
                <span>{item.label.toUpperCase()}</span>
              </span>

              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  style={{
                    fontSize: 13,
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  {item.value}
                </a>
              ) : (
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
