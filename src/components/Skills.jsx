import { useEffect, useRef, useState } from 'react'
import { Code2, Database, Cpu, Workflow } from 'lucide-react'
import skillsData from '../data/skills.json'

const CATEGORY_ICONS = {
  'Linguagens & Core': Code2,
  'Engenharia de Dados & BI': Database,
  'IA, Backend & DevOps': Cpu,
  'Automação, RPA & Plataformas': Workflow,
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section
      id="skills"
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
        02 — STACK TÉCNICO
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
        Ferramentas que
        <br />
        <span className="g-amber f-serif" style={{ fontWeight: 400 }}>
          operam em produção
        </span>
      </h2>

      <div
        className="skills-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
        }}
      >
        {skillsData.map((category, idx) => {
          const CategoryIcon = CATEGORY_ICONS[category.name] || Code2

          return (
            <div
              key={category.name}
              className="card reveal"
              style={{
                padding: '22px 24px',
                transitionDelay: `${idx * 60}ms`,
                ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: `${category.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color,
                  }}
                >
                  <CategoryIcon size={14} stroke="currentColor" />
                </div>
                <span
                  className="f-mono"
                  style={{
                    fontSize: 10.5,
                    color: category.color,
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  {category.name.toUpperCase()}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {category.items.map((item, itemIdx) => {
                  const isObj = typeof item === 'object' && item !== null
                  const skillName = isObj ? item.name : item
                  const skillContext = isObj ? item.context : null

                  return (
                    <span
                      key={isObj ? item.name : itemIdx}
                      className="chip"
                      title={skillContext ? `Aplicado em: ${skillContext}` : undefined}
                      style={{
                        borderColor: `${category.color}35`,
                        color: category.color,
                        background: `${category.color}0e`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{skillName}</span>
                      {skillContext && (
                        <span
                          style={{
                            fontSize: 9,
                            fontFamily: 'JetBrains Mono',
                            opacity: 0.85,
                            background: `${category.color}18`,
                            border: `1px solid ${category.color}30`,
                            padding: '1px 5px',
                            borderRadius: 3,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {skillContext}
                        </span>
                      )}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
