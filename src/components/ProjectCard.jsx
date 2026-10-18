import { useState } from 'react'

const LAYOUT_STYLES = {
  featured: { gridColumn: 'span 2' },
  wide: { gridColumn: 'span 2' },
  tall: {},
  square: {},
}

export default function ProjectCard({ project, delay = 0, isVisible = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const layoutStyle = LAYOUT_STYLES[project.layout] || {}

  return (
    <div
      className="card reveal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...layoutStyle,
        padding: '28px',
        transitionDelay: `${delay}ms`,
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 18,
        }}
      >
        <span
          className="chip"
          style={{
            borderColor: `${project.accentColor}44`,
            color: project.accentColor,
            background: `${project.accentColor}11`,
            fontSize: 9.5,
          }}
        >
          {project.tag}
        </span>
        <span className="f-mono" style={{ fontSize: 9, color: 'var(--t3)' }}>
          {project.team}
        </span>
      </div>

      {project.layout === 'featured' && (
        <div style={{ marginBottom: 18 }}>
          <div
            className="stat-num"
            style={{
              background: `linear-gradient(135deg, #fff, ${project.accentColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {project.impact}
          </div>
          <p
            className="f-mono"
            style={{ fontSize: 10, color: 'var(--t2)', letterSpacing: '0.1em' }}
          >
            {project.impactLabel}
          </p>
        </div>
      )}

      <h3
        style={{
          fontFamily: 'Outfit',
          fontWeight: 700,
          fontSize: project.layout === 'featured' ? 24 : 18,
          color: 'var(--t1)',
          marginBottom: 6,
          letterSpacing: '-0.02em',
        }}
      >
        {project.name}
      </h3>

      <p
        className="f-mono"
        style={{
          fontSize: 10,
          color: project.accentColor,
          marginBottom: 14,
          opacity: 0.85,
        }}
      >
        {project.subtitle}
      </p>

      <p
        style={{
          fontSize: 13,
          lineHeight: 1.65,
          color: 'rgba(245,240,232,0.55)',
          flexGrow: 1,
          marginBottom: 18,
        }}
      >
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            className="chip"
            style={{
              borderColor: `${project.accentColor}35`,
              color: project.accentColor,
              background: `${project.accentColor}0d`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          borderRadius: '0 0 14px 14px',
        }}
      />
    </div>
  )
}
