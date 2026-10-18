import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Sparkles, GraduationCap, ArrowRightLeft } from 'lucide-react'
import experiencesData from '../data/experiences.json'
import profileData from '../data/profile.json'

function HighlightedBullet({ text, color }) {
  // Regex to match specific impact metrics and numbers
  const metricRegex =
    /(2h–4h(?: de fila)? para geração instantânea|2h–4h para instantâneo|1h\/arquivo(?: manual)?|SQL root cause|diagnóstico de causa raiz em SQL|18h[–-]36h poupadas|18h a 36h|3h para 10[–-]20min|~3 horas para 10 a 20 minutos|-93% tempo|-93%|\+?90%|automação via API|-50% tempo|-50%|\+25% precisão|\+25%|5 min para 20s|7 workflows|10% em eficiência)/gi

  const parts = text.split(metricRegex)

  return (
    <span>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.match(metricRegex)) {
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                padding: '1px 6px',
                margin: '0 2px',
                borderRadius: '4px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.92em',
                fontWeight: 600,
                color: color || 'var(--accent-primary)',
                background: `${color || 'var(--accent-primary)'}18`,
                border: `1px solid ${color || 'var(--accent-primary)'}35`,
                letterSpacing: '-0.01em',
              }}
            >
              {part}
            </span>
          )
        }
        return part
      })}
    </span>
  )
}

export default function Trajetoria() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCompany, setActiveCompany] = useState('IBM')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleCompany = (company) => {
    setActiveCompany((prev) => (prev === company ? null : company))
  }

  return (
    <section
      id="trajetoria"
      ref={sectionRef}
      className="section-container"
    >
      <p
        className="s-label reveal"
        style={{
          marginBottom: 16,
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        02 — TRAJETÓRIA PROFISSIONAL
      </p>

      <h2
        className="f-display f-h2 reveal"
        style={{
          color: 'var(--text-primary)',
          marginBottom: 'clamp(28px, 5vh, 48px)',
          transitionDelay: '80ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        5 anos construindo
        <br />
        <span className="g-amber">soluções reais</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {experiencesData.map((exp, idx) => {
          const isExpanded = activeCompany === exp.company

          return (
            <div
              key={exp.company}
              className="reveal timeline-row"
              style={{
                transitionDelay: `${idx * 80}ms`,
                ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
                display: 'flex',
                gap: 'clamp(10px, 2.5vw, 18px)',
              }}
            >
              {/* Left Lateral Timeline Line */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                {exp.isTransition ? (
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'var(--bg-elevated)',
                      border: `2px solid ${exp.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: exp.color,
                      boxShadow: `0 0 12px ${exp.color}44`,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <GraduationCap size={12} stroke="currentColor" />
                  </div>
                ) : (
                  <div
                    className={`tl-dot ${exp.current ? '' : 'steel-dot'}`}
                    style={{
                      background: exp.color,
                      boxShadow: `0 0 12px ${exp.color}55`,
                    }}
                  />
                )}
                {idx < experiencesData.length - 1 && (
                  <div className="tl-line" style={{ flex: 1, margin: '6px 0' }} />
                )}
              </div>

              {/* Experience Card taking 100% of usable width */}
              <div
                className="card"
                onClick={() => toggleCompany(exp.company)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleCompany(exp.company)
                  }
                }}
                role="button"
                tabIndex={0}
                style={{
                  flex: 1,
                  marginBottom: 12,
                  padding: 'clamp(14px, 2.2vw, 22px)',
                  cursor: 'pointer',
                  borderColor: isExpanded
                    ? `${exp.color}55`
                    : exp.isTransition
                      ? 'var(--border-mid)'
                      : 'var(--border)',
                  borderStyle: exp.isTransition ? 'dashed' : 'solid',
                  background: exp.isTransition
                    ? 'linear-gradient(180deg, var(--bg-surface), var(--bg-elevated))'
                    : undefined,
                  minWidth: 0,
                }}
              >
                <div className="tl-inner">
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 4,
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span
                          className="badge present"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <Sparkles size={10} stroke="currentColor" />
                          <span>ATUAL</span>
                        </span>
                      )}
                      {exp.isTransition && (
                        <span
                          className="badge"
                          style={{
                            background: `${exp.color}18`,
                            color: exp.color,
                            border: `1px solid ${exp.color}40`,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <ArrowRightLeft size={10} stroke="currentColor" />
                          <span>TRANSIÇÃO DE CARREIRA</span>
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {exp.role}
                    </p>
                  </div>

                  <span
                    className="f-mono tl-period"
                    style={{
                      fontSize: 10.5,
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    <ul
                      style={{
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 9,
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {exp.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          style={{
                            display: 'flex',
                            gap: 8,
                            fontSize: 13,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.55,
                          }}
                        >
                          <ChevronRight
                            size={13}
                            stroke="currentColor"
                            style={{
                              color: exp.color,
                              flexShrink: 0,
                              marginTop: 3,
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <HighlightedBullet text={bullet} color={exp.color} />
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 6,
                        marginTop: 14,
                      }}
                    >
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="chip"
                          style={{
                            borderColor: `${exp.color}44`,
                            color: exp.color,
                            background: `${exp.color}11`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Subseção de Formação Acadêmica */}
      <div
        className="reveal"
        style={{
          marginTop: 'clamp(36px, 6vh, 56px)',
          paddingTop: 28,
          borderTop: '1px solid var(--border-subtle)',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
          }}
        >
          <GraduationCap
            size={16}
            stroke="currentColor"
            style={{ color: 'var(--accent-primary)' }}
          />
          <h3
            className="f-mono"
            style={{
              fontSize: 11.5,
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              fontWeight: 600,
            }}
          >
            FORMAÇÃO ACADÊMICA
          </h3>
        </div>

        {/* Responsive Education Grid: 1 col on Mobile, 2 col on Tablet/Desktop */}
        <div className="education-grid">
          {profileData.education.map((edu) => (
            <div
              key={edu.institution}
              className="card"
              style={{
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: edu.current
                  ? '3px solid var(--accent-primary)'
                  : '1px solid var(--border)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 6,
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {edu.institution}
                  </span>
                  <span
                    className={`badge ${edu.current ? 'present' : 'past'}`}
                    style={{ fontSize: 9.5 }}
                  >
                    {edu.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}
                >
                  {edu.course}
                </p>
              </div>

              <div
                style={{
                  marginTop: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  className="chip"
                  style={{
                    fontSize: 9.5,
                    fontFamily: 'JetBrains Mono',
                    borderColor: edu.current
                      ? 'var(--accent-primary)'
                      : 'var(--border-subtle)',
                    color: edu.current
                      ? 'var(--accent-primary)'
                      : 'var(--text-muted)',
                    background: edu.current ? 'var(--amber-glow)' : 'transparent',
                  }}
                >
                  {edu.status}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                  }}
                >
                  {edu.degree}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
