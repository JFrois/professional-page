import { useEffect, useRef, useState } from 'react'
import projectsData from '../data/projects.json'
import ProjectCard from './ProjectCard.jsx'
import { useLanguage } from '../hooks/useLanguage.js'

export default function Projetos() {
  const { t } = useLanguage()
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
      className="section-container"
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
          marginBottom: 16,
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        {t('projects.sectionLabel')}
      </p>

      <h2
        className="f-display f-h2 reveal"
        style={{
          color: 'var(--text-primary)',
          marginBottom: 12,
          transitionDelay: '80ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        {t('projects.titleLine1')}
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
          {t('projects.titleLine2')}
        </span>
      </h2>

      <p
        className="reveal"
        style={{
          fontSize: 'clamp(14px, 1.25vw, 15.5px)',
          color: 'var(--text-secondary)',
          maxWidth: 620,
          lineHeight: 1.68,
          marginBottom: 'clamp(28px, 5vh, 48px)',
          transitionDelay: '140ms',
          ...(isVisible ? { opacity: 1, transform: 'none' } : {}),
        }}
      >
        {t('projects.description')}
      </p>

      <div className="projects-grid">
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
