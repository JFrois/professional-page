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
      style={{
        padding: 'clamp(80px, 10vh, 120px) clamp(24px, 6vw, 80px)',
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
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        02 — TRAJETÓRIA PROFISSIONAL
      </p>

      <h2
        className="f-display reveal"
        style={{
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          color: 'var(--text-primary)',
          marginBottom: 48,
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
              className="reveal"
              style={{
                transitionDelay: `${idx * 80}ms`,
                ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
                display: 'flex',
                gap: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
                  padding: '20px 24px',
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
                }}
              >
                <div
                  className="tl-inner"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
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
                      fontSize: 10,
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      paddingLeft: 16,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    <ul
                      style={{
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      {exp.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          style={{
                            display: 'flex',
                            gap: 10,
                            fontSize: 13,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
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
                          <div>
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
                        marginTop: 16,
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
          marginTop: 56,
          paddingTop: 36,
          borderTop: '1px solid var(--border-subtle)',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 14,
          }}
        >
          {profileData.education.map((edu) => (
            <div
              key={edu.institution}
              className="card"
              style={{
                padding: '20px 24px',
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
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
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
