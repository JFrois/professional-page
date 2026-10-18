import { useEffect, useRef, useState } from 'react'
import projectsData from '../data/projects.json'
import ProjectCard from './ProjectCard.jsx'

export default function Projetos() {
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
      id="projetos"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vh, 120px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        zIndex: 5,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Anchor for backward compatibility with #projects */}
      <span
        id="projects"
        style={{ position: 'absolute', top: -80, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      <p
        className="s-label reveal"
        style={{
          marginBottom: 20,
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        01 — PROJETOS EM PRODUÇÃO
      </p>

      <h2
        className="f-display reveal"
        style={{
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          color: 'var(--text-primary)',
          marginBottom: 12,
          transitionDelay: '80ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        Soluções que
        <br />
        <span
          className="f-serif"
          style={{
            fontWeight: 400,
            background:
              'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-impact) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          operam em produção
        </span>
      </h2>

      <p
        className="reveal"
        style={{
          fontSize: 15.5,
          color: 'var(--text-secondary)',
          maxWidth: 600,
          lineHeight: 1.65,
          marginBottom: 48,
          transitionDelay: '140ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        Cada sistema nasceu de uma dor real — de um processo lento, de dados
        invisíveis ou de horas de esforço manual. De servidores MCP corporativos para IA
        a esteiras transacionais de Data Quality e robôs RPA industriais.
      </p>

      <div
        className="projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridAutoRows: 'auto',
          gap: 16,
        }}
      >
        {projectsData.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={idx * 80}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  )
}

