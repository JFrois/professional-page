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
      id="projects"
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
        03 — PROJETOS
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
        <span className="g-amber f-serif" style={{ fontWeight: 400 }}>
          operam em produção
        </span>
      </h2>

      <p
        className="reveal"
        style={{
          fontSize: 15,
          color: 'var(--text-secondary)',
          maxWidth: 540,
          marginBottom: 48,
          transitionDelay: '140ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        Cada sistema nasceu de uma dor real — de um processo lento, de dados invisíveis,
        de horas de trabalho manual.
      </p>

      <div
        className="projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridAutoRows: 'auto',
          gap: 14,
        }}
      >
        {projectsData.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={idx * 90}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  )
}
