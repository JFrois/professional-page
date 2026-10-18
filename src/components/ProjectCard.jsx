import { useState } from 'react'
import {
  Lock,
  GitBranch,
  ExternalLink,
  ChevronDown,
  Building2,
  Cpu,
  ChevronRight,
} from 'lucide-react'
import { GithubIcon } from './Icons.jsx'

const LAYOUT_STYLES = {
  featured: { gridColumn: 'span 2' },
  wide: { gridColumn: 'span 2' },
  tall: {},
  square: {},
}

export default function ProjectCard({ project, delay = 0, isVisible = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isArchExpanded, setIsArchExpanded] = useState(false)

  const layoutStyle = LAYOUT_STYLES[project.layout] || {}
  const isFeatured = project.layout === 'featured' || project.layout === 'wide'

  const companyIsIBM = project.company === 'IBM'

  return (
    <div
      className="card reveal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...layoutStyle,
        padding: 'clamp(20px, 3vw, 28px)',
        transitionDelay: `${delay}ms`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 14,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        boxShadow: isHovered ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
      }}
    >
      {/* ======================================================== */}
      {/* BLOCO 1: CABEÇALHO DO CARD                               */}
      {/* Badge da Empresa + Badge de Impacto em Destaque          */}
      {/* ======================================================== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {/* Badge da Empresa (IBM ou VOSS Automotive) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
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
            {project.tag}
          </span>
        </div>

        {/* Badge de Impacto em Destaque (cor --accent-impact) */}
        {project.impactBadge && (
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
              padding: '4px 10px',
              borderRadius: 6,
              letterSpacing: '0.01em',
              boxShadow: '0 1px 4px rgba(16, 185, 129, 0.12)',
            }}
          >
            <span>{project.impactBadge}</span>
          </span>
        )}
      </div>

      {/* ======================================================== */}
      {/* BLOCO 2: CORPO DO CARD                                   */}
      {/* Título, Subtítulo e Descrição focada no problema resolvido*/}
      {/* ======================================================== */}
      <div style={{ marginBottom: 14 }}>
        <h3
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: isFeatured ? 'clamp(20px, 2.2vw, 24px)' : 18,
            color: 'var(--text-primary)',
            marginBottom: 4,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}
        >
          {project.name}
        </h3>

        <p
          className="f-mono"
          style={{
            fontSize: 11,
            color: project.accentColor || 'var(--accent-primary)',
            marginBottom: 12,
            fontWeight: 500,
            letterSpacing: '0.01em',
          }}
        >
          {project.subtitle}
        </p>

        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.68,
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Accordion Expandido de Arquitetura & Engenharia */}
      {isArchExpanded &&
        project.architectureHighlights &&
        project.architectureHighlights.length > 0 && (
          <div
            id={`arch-details-${project.id}`}
            style={{
              marginBottom: 18,
              padding: '14px 16px',
              background: 'var(--bg-elevated)',
              borderLeft: `3px solid ${project.accentColor || 'var(--accent-primary)'}`,
              borderRadius: '0 8px 8px 0',
              animation: 'fadeIn 0.25s ease',
            }}
          >
            <p
              className="f-mono"
              style={{
                fontSize: 9.5,
                color: project.accentColor || 'var(--accent-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Cpu size={12} stroke="currentColor" />
              <span>Destaques de Arquitetura & Engenharia</span>
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {project.architectureHighlights.map((hl, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                  }}
                >
                  <ChevronRight
                    size={13}
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
      {/* BLOCO 3: STACK TÉCNICA                                   */}
      {/* Chips com as tecnologias do projeto                      */}
      {/* ======================================================== */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 18,
          marginTop: 'auto',
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

      {/* ======================================================== */}
      {/* BLOCO 4: AÇÕES NO RODAPÉ DO CARD                         */}
      {/* GitHub Repo Button OU Projeto Corporativo + Arquitetura  */}
      {/* ======================================================== */}
      <div
        style={{
          paddingTop: 14,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
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
                padding: '4px 10px',
                borderRadius: 6,
                fontWeight: 500,
              }}
              title="Projeto corporativo interno com código proprietário protegido"
            >
              <Lock size={10.5} stroke="currentColor" />
              <span>🔒 Projeto Corporativo Interno</span>
            </span>

            {project.architectureHighlights &&
              project.architectureHighlights.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsArchExpanded((prev) => !prev)}
                  aria-expanded={isArchExpanded}
                  aria-controls={`arch-details-${project.id}`}
                  className="btn-ghost"
                  style={{
                    padding: '6px 12px',
                    fontSize: 11.5,
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
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
                  }}
                  title="Ver detalhes de implementação técnica e arquitetura"
                >
                  <Cpu size={12} stroke="currentColor" />
                  <span>
                    {isArchExpanded ? 'Ocultar Arquitetura' : 'Ver Arquitetura & Engenharia'}
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
                padding: '4px 10px',
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              <GitBranch size={10.5} stroke="currentColor" />
              <span>Código Aberto</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {project.architectureHighlights && (
                <button
                  type="button"
                  onClick={() => setIsArchExpanded((prev) => !prev)}
                  aria-expanded={isArchExpanded}
                  aria-controls={`arch-details-${project.id}`}
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
                  }}
                  title="Ver detalhes da arquitetura"
                >
                  <span>{isArchExpanded ? 'Fechar' : 'Arquitetura'}</span>
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
                  className="btn-ghost"
                  style={{
                    padding: '6px 14px',
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
                  }}
                  title="Abrir repositório público no GitHub"
                >
                  <GithubIcon size={12} />
                  <span>Ver Repositório no GitHub</span>
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

