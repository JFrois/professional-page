import { useEffect, useRef, useState } from 'react'
import skillsData from '../data/skills.json'

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
          color: '#f5f0e8',
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
        {skillsData.map((category, idx) => (
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
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: category.color,
                  boxShadow: `0 0 8px ${category.color}88`,
                }}
              />
              <span
                className="f-mono"
                style={{
                  fontSize: 10,
                  color: category.color,
                  letterSpacing: '0.12em',
                }}
              >
                {category.name.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {category.items.map((item) => (
                <span
                  key={item}
                  className="chip"
                  style={{
                    borderColor: `${category.color}30`,
                    color: category.color,
                    background: `${category.color}0e`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
