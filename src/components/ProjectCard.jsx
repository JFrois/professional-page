import { useState } from 'react'
import { Lock, GitBranch, ExternalLink, Zap, ChevronRight } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'

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
        position: 'relative',
        ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
      }}
    >
      {/* Header Metadata */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
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

          {project.isPrivateEnterprise ? (
            <span
              className="chip"
              style={{
                borderColor: 'rgba(255,255,255,0.12)',
                color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.04)',
                fontSize: 9,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
              title="Projeto corporativo interno com código proprietário"
            >
              <Lock size={10} stroke="currentColor" />
              <span>Corporativo</span>
            </span>
          ) : (
            <span
              className="chip"
              style={{
                borderColor: 'rgba(110,158,207,0.3)',
                color: 'var(--accent-secondary)',
                background: 'rgba(110,158,207,0.08)',
                fontSize: 9,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <GitBranch size={10} stroke="currentColor" />
              <span>Código Aberto</span>
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="f-mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>
            {project.company || project.team}
          </span>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{
                padding: '4px 10px',
                fontSize: 10,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
              title="Acessar repositório no GitHub"
            >
              <GithubIcon size={11} />
              <span>GitHub</span>
              <ExternalLink size={9} stroke="currentColor" />
            </a>
          )}
        </div>
      </div>

      {/* Featured Big Metric Banner */}
      {project.layout === 'featured' && (
        <div
          style={{
            marginBottom: 16,
            padding: '12px 18px',
            borderRadius: 8,
            background: `linear-gradient(135deg, ${project.accentColor}14, transparent)`,
            border: `1px solid ${project.accentColor}25`,
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
          }}
        >
          <div
            className="stat-num"
            style={{
              background: `linear-gradient(135deg, #fff, ${project.accentColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 'clamp(24px, 2.5vw, 32px)',
              lineHeight: 1,
            }}
          >
            {project.impact}
          </div>
          <p
            className="f-mono"
            style={{ fontSize: 11, color: 'var(--t2)', letterSpacing: '0.04em' }}
          >
            {project.impactBadge || project.impactLabel}
          </p>
        </div>
      )}

      {/* Impact Badge Pill for non-featured cards */}
      {project.layout !== 'featured' && project.impactBadge && (
        <div style={{ marginBottom: 12 }}>
          <span
            className="f-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 10,
              fontWeight: 600,
              color: project.accentColor,
              background: `${project.accentColor}14`,
              border: `1px solid ${project.accentColor}33`,
              padding: '3px 8px',
              borderRadius: 4,
              letterSpacing: '0.02em',
            }}
          >
            <Zap size={11} stroke="currentColor" />
            <span>{project.impactBadge}</span>
          </span>
        </div>
      )}

      {/* Title & Subtitle */}
      <h3
        style={{
          fontFamily: 'Outfit',
          fontWeight: 700,
          fontSize: project.layout === 'featured' ? 24 : 18,
          color: 'var(--text-primary)',
          marginBottom: 4,
          letterSpacing: '-0.02em',
        }}
      >
        {project.name}
      </h3>

      <p
        className="f-mono"
        style={{
          fontSize: 10.5,
          color: project.accentColor,
          marginBottom: 14,
          opacity: 0.9,
        }}
      >
        {project.subtitle}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.65,
          color: 'rgba(245,240,232,0.65)',
          marginBottom: 16,
        }}
      >
        {project.description}
      </p>

      {/* Architecture Highlights */}
      {project.architectureHighlights && project.architectureHighlights.length > 0 && (
        <div
          style={{
            marginTop: 'auto',
            marginBottom: 18,
            padding: '12px 14px',
            background: 'rgba(255,255,255,0.02)',
            borderLeft: `2px solid ${project.accentColor}66`,
            borderRadius: '0 6px 6px 0',
          }}
        >
          <p
            className="f-mono"
            style={{
              fontSize: 9,
              color: project.accentColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Destaques de Arquitetura & Engenharia
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {project.architectureHighlights.map((hl, i) => (
              <li
                key={i}
                style={{
                  fontSize: 11.5,
                  color: 'rgba(245,240,232,0.65)',
                  lineHeight: 1.5,
                  display: 'flex',
                  gap: 8,
                }}
              >
                <ChevronRight
                  size={12}
                  stroke="currentColor"
                  style={{ color: project.accentColor, flexShrink: 0, marginTop: 2 }}
                />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: project.architectureHighlights ? 0 : 'auto' }}>
        {project.tech.map((t) => (
          <span
            key={t}
            className="chip"
            style={{
              borderColor: `${project.accentColor}30`,
              color: project.accentColor,
              background: `${project.accentColor}0a`,
              fontSize: 10,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Card Glow Border Hover Effect */}
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
