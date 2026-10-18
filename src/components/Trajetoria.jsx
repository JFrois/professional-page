import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Sparkles, ArrowRightLeft } from 'lucide-react'
import experiencesData from '../data/experiences.json'

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
                <div
                  className={`tl-dot ${exp.current ? '' : 'steel-dot'}`}
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 12px ${exp.color}55`,
                  }}
                />
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
                  borderColor: isExpanded ? `${exp.color}55` : 'var(--border)',
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
                            background: 'var(--steel-dim)',
                            color: 'var(--steel)',
                            border: '1px solid var(--border-mid)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <ArrowRightLeft size={10} stroke="currentColor" />
                          <span>TRANSIÇÃO</span>
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
                        gap: 8,
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
                            lineHeight: 1.55,
                          }}
                        >
                          <ChevronRight
                            size={13}
                            stroke="currentColor"
                            style={{
                              color: exp.color,
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          />
                          <span>{bullet}</span>
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
    </section>
  )
}
