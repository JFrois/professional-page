import { useEffect, useRef, useState } from 'react'
import { Code2, Database, Cpu, Workflow } from 'lucide-react'
import skillsData from '../data/skills.json'
import { useLanguage } from '../hooks/useLanguage.js'

const ICON_MAP = {
  code: Code2,
  database: Database,
  cpu: Cpu,
  workflow: Workflow,
}

export default function Skills() {
  const { t, localize } = useLanguage()
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
      className="section-container"
    >
      <p
        className="s-label reveal"
        style={{
          marginBottom: 16,
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        {t('skills.sectionLabel')}
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
        {t('skills.toolsInProduction')}
        <br />
        <span className="g-amber f-serif" style={{ fontWeight: 400 }}>
          {t('skills.operamEmProducao')}
        </span>
      </h2>

      {/* Responsive Skills Grid: 1 col on Mobile, 2 col on Tablet, 2x2 on Desktop */}
      <div className="skills-grid">
        {skillsData.map((category, idx) => {
          const CategoryIcon = ICON_MAP[category.icon] || Code2
          const categoryName = localize(category.name)

          return (
            <div
              key={category.id || idx}
              className="card reveal"
              style={{
                padding: 'clamp(18px, 2.5vw, 24px)',
                transitionDelay: `${idx * 60}ms`,
                boxSizing: 'border-box',
                ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: `${category.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color,
                    flexShrink: 0,
                  }}
                >
                  <CategoryIcon size={14} stroke="currentColor" />
                </div>
                <span
                  className="f-mono"
                  style={{
                    fontSize: 11,
                    color: category.color,
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}
                >
                  {categoryName.toUpperCase()}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {category.items.map((item, itemIdx) => {
                  const isObj = typeof item === 'object' && item !== null
                  const skillName = isObj ? item.name : item
                  const skillContext = isObj && item.context ? localize(item.context) : null

                  return (
                    <span
                      key={isObj ? item.name : itemIdx}
                      className="chip"
                      title={
                        skillContext
                          ? `${skillName} • ${skillContext}`
                          : skillName
                      }
                      style={{
                        borderColor: `${category.color}35`,
                        color: 'var(--text-primary)',
                        background: 'var(--bg-elevated)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '6px 10px',
                        fontSize: 12,
                        maxWidth: '100%',
                      }}
                    >
                      <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{skillName}</span>
                      {skillContext && (
                        <span
                          style={{
                            fontSize: 10,
                            fontFamily: 'JetBrains Mono',
                            color: category.color,
                            opacity: 0.9,
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          • {skillContext}
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
