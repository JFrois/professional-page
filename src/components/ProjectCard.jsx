import { useState } from 'react'
import {
  Lock,
  GitBranch,
  ExternalLink,
  ChevronDown,
  Building2,
  Cpu,
  ChevronRight,
  X,
} from 'lucide-react'
import { GithubIcon } from './Icons.jsx'
import { useLanguage } from '../hooks/useLanguage.js'

export default function ProjectCard({ project, delay = 0, isVisible = false }) {
  const { t, localize } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [isArchExpanded, setIsArchExpanded] = useState(false)

  const isFeatured = project.layout === 'featured' || project.layout === 'wide'
  const companyIsIBM = project.company === 'IBM'

  const projectName = localize(project.name)
  const projectSubtitle = localize(project.subtitle)
  const projectTag = localize(project.tag)
  const projectDesc = localize(project.description)
  const projectBadge = localize(project.impactBadge)
  const projectArchHls = localize(project.architectureHighlights) || []

  return (
    <div
      className={`card reveal ${isFeatured ? 'project-featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 'clamp(18px, 2.5vw, 26px)',
        transitionDelay: `${delay}ms`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        borderRadius: 14,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        boxShadow: isHovered ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        height: '100%',
        boxSizing: 'border-box',
        ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
      }}
    >
      <div>
        {/* ======================================================== */}
        {/* BLOCO 1: CABEÇALHO DO CARD                               */}
        {/* Badge da Empresa + Badge de Impacto                      */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {/* Badge da Empresa (IBM ou VOSS Automotive) + Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span
              className="chip"
              style={{
                borderColor: companyIsIBM
                  ? 'rgba(15, 98, 254, 0.45)'
                  : 'rgba(56, 189, 248, 0.45)',
                color: companyIsIBM ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                background: companyIsIBM
                  ? 'rgba(15, 98, 254, 0.1)'
                  : 'rgba(56, 189, 248, 0.1)',
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 9px',
                borderRadius: 6,
              }}
            >
              <Building2 size={11} stroke="currentColor" />
              <span>{project.company || project.team}</span>
            </span>

            <span
              className="chip"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                fontSize: 9.5,
                padding: '3px 8px',
              }}
            >
              {projectTag}
            </span>
          </div>

          {/* Badge de Impacto em Destaque */}
          {projectBadge && (
            <span
              className="f-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 10.5,
                fontWeight: 600,
                color: 'var(--accent-impact)',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                padding: '3px 9px',
                borderRadius: 6,
                letterSpacing: '0.01em',
                boxShadow: '0 1px 4px rgba(16, 185, 129, 0.12)',
              }}
            >
              <span>{projectBadge}</span>
            </span>
          )}
        </div>

        {/* ======================================================== */}
        {/* BLOCO 2: CORPO DO CARD                                   */}
        {/* Título, Subtítulo e Descrição focada no problema         */}
        {/* ======================================================== */}
        <div style={{ marginBottom: 14 }}>
          <h3
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              fontSize: isFeatured ? 'clamp(19px, 2vw, 23px)' : 'clamp(17px, 1.6vw, 19px)',
              color: 'var(--text-primary)',
              marginBottom: 4,
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}
          >
            {projectName}
          </h3>

          <p
            className="f-mono"
            style={{
              fontSize: 11,
              color: project.accentColor || 'var(--accent-primary)',
              marginBottom: 10,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            {projectSubtitle}
          </p>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              margin: 0,
            }}
          >
            {projectDesc}
          </p>
        </div>

        {/* Painel Expandido de Arquitetura & Engenharia com Scroll Seguro */}
        {isArchExpanded && projectArchHls.length > 0 && (
          <div
            id={`arch-details-${project.id}`}
            style={{
              marginBottom: 16,
              padding: '12px 14px',
              background: 'var(--bg-elevated)',
              borderLeft: `3px solid ${project.accentColor || 'var(--accent-primary)'}`,
              borderRadius: '0 8px 8px 0',
              animation: 'fadeIn 0.25s ease',
              maxHeight: 280,
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <p
                className="f-mono"
                style={{
                  fontSize: 9.5,
                  color: project.accentColor || 'var(--accent-primary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  margin: 0,
                }}
              >
                <Cpu size={12} stroke="currentColor" />
                <span>{t('projects.engHighlights')}</span>
              </p>

              <button
                type="button"
                onClick={() => setIsArchExpanded(false)}
                aria-label={t('projects.close')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 11,
                  fontFamily: 'JetBrains Mono',
                  padding: '2px 4px',
                }}
              >
                <X size={11} stroke="currentColor" />
                <span>{t('projects.close')}</span>
              </button>
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
              }}
            >
              {projectArchHls.map((hl, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 7,
                  }}
                >
                  <ChevronRight
                    size={12}
                    stroke="currentColor"
                    style={{
                      color: project.accentColor || 'var(--accent-primary)',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ======================================================== */}
        {/* BLOCO 3: STACK TÉCNICA (Chips)                           */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            marginBottom: 16,
          }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              className="chip"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
                background: 'var(--bg-elevated)',
                fontSize: 10.5,
                padding: '3px 8px',
                borderRadius: 5,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* BLOCO 4: AÇÕES NO RODAPÉ DO CARD                         */}
      {/* ======================================================== */}
      <div
        style={{
          paddingTop: 14,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {/* Caso A: Projeto Corporativo Interno */}
        {project.isPrivateEnterprise ? (
          <>
            <span
              className="chip"
              style={{
                borderColor: 'var(--border-mid)',
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                fontSize: 10,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 10px',
                borderRadius: 6,
                fontWeight: 500,
              }}
            >
              <Lock size={10.5} stroke="currentColor" />
              <span>{t('projects.internalEnterprise')}</span>
            </span>

            {projectArchHls.length > 0 && (
              <button
                type="button"
                onClick={() => setIsArchExpanded((prev) => !prev)}
                aria-expanded={isArchExpanded}
                aria-controls={`arch-details-${project.id}`}
                className="btn-ghost touch-target"
                style={{
                  padding: '6px 12px',
                  fontSize: 11.5,
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  cursor: 'pointer',
                  borderRadius: 7,
                  borderColor: isArchExpanded
                    ? 'var(--accent-primary)'
                    : 'var(--border-mid)',
                  color: isArchExpanded
                    ? 'var(--accent-primary)'
                    : 'var(--text-primary)',
                  background: isArchExpanded ? 'var(--bg-elevated)' : 'transparent',
                  transition: 'all 0.2s ease',
                  minHeight: 38,
                }}
              >
                <Cpu size={12} stroke="currentColor" />
                <span>
                  {isArchExpanded ? t('projects.hideDetails') : t('projects.viewArch')}
                </span>
                <ChevronDown
                  size={12}
                  stroke="currentColor"
                  style={{
                    transform: isArchExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
            )}
          </>
        ) : (
          /* Caso B: Projeto com Repositório no GitHub */
          <>
            <span
              className="chip"
              style={{
                borderColor: 'rgba(16, 185, 129, 0.3)',
                color: 'var(--accent-impact)',
                background: 'rgba(16, 185, 129, 0.08)',
                fontSize: 10,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 10px',
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              <GitBranch size={10.5} stroke="currentColor" />
              <span>{t('projects.openSource')}</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              {projectArchHls.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsArchExpanded((prev) => !prev)}
                  aria-expanded={isArchExpanded}
                  aria-controls={`arch-details-${project.id}`}
                  className="touch-target"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isArchExpanded
                      ? 'var(--accent-primary)'
                      : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: 11,
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '6px 8px',
                    transition: 'color 0.2s ease',
                    minHeight: 38,
                  }}
                >
                  <span>{isArchExpanded ? t('projects.hideDetails') : t('projects.viewArch')}</span>
                  <ChevronDown
                    size={11}
                    stroke="currentColor"
                    style={{
                      transform: isArchExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost touch-target"
                  style={{
                    padding: '6px 12px',
                    fontSize: 11.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    borderRadius: 7,
                    borderColor: 'var(--border-mid)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-elevated)',
                    transition: 'all 0.2s ease',
                    minHeight: 38,
                  }}
                >
                  <GithubIcon size={12} />
                  <span>{t('projects.viewGithub')}</span>
                  <ExternalLink size={10} stroke="currentColor" />
                </a>
              )}
            </div>
          </>
        )}
      </div>

      {/* Card Bottom Glow Accent on Hover */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${project.accentColor || 'var(--accent-primary)'}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          borderRadius: '0 0 14px 14px',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
