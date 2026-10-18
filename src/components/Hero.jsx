import { Terminal, Cpu, Database, Briefcase, ChevronDown } from 'lucide-react'
import profileData from '../data/profile.json'

export default function Hero({ scrollPct = 0 }) {
  const opacity = scrollPct < 0.08 ? 1 : Math.max(0, 1 - (scrollPct - 0.08) / 0.18)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        zIndex: 5,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}
    >
      <div style={{ opacity, transition: 'opacity 0.4s ease' }}>
        <p className="s-label" style={{ marginBottom: 28, letterSpacing: '0.3em' }}>
          {profileData.name.toUpperCase()}
        </p>

        <h1
          className="f-display"
          style={{
            fontSize: 'clamp(48px, 8vw, 100px)',
            color: 'var(--text-primary)',
            marginBottom: 16,
          }}
        >
          Desenvolvedor de
          <br />
          <span className="g-amber">Soluções</span>
        </h1>

        <p
          className="f-serif"
          style={{
            fontSize: 'clamp(17px, 2vw, 22px)',
            color: 'rgba(245,240,232,0.5)',
            maxWidth: 540,
            margin: '0 auto 36px',
            lineHeight: 1.55,
          }}
        >
          Do operacional à engenharia.
          <br />
          Automação, dados e arquitetura que geram resultado.
        </p>

        <div
          className="chip-row"
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span
            className="chip amber"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Terminal size={12} stroke="currentColor" />
            <span>Python</span>
          </span>
          <span
            className="chip amber"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Cpu size={12} stroke="currentColor" />
            <span>RPA · Automação</span>
          </span>
          <span
            className="chip steel"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Database size={12} stroke="currentColor" />
            <span>SQL · BI</span>
          </span>
          <span
            className="chip ember"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Briefcase size={12} stroke="currentColor" />
            <span>IBM · 99 · VOSS · Loft</span>
          </span>
        </div>
      </div>

      <div
        className="scroll-arrow"
        style={{
          position: 'absolute',
          bottom: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity,
        }}
      >
        <span
          className="f-mono"
          style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em' }}
        >
          SCROLL
        </span>
        <ChevronDown size={14} stroke="currentColor" style={{ color: 'var(--accent-primary)' }} />
      </div>

      {scrollPct > 0.62 && (
        <div
          style={{
            position: 'absolute',
            bottom: '28%',
            opacity: Math.min((scrollPct - 0.62) / 0.15, 1),
            transition: 'opacity 0.5s ease',
          }}
        >
          <p
            className="f-mono"
            style={{
              fontSize: 10,
              color: 'var(--amber)',
              letterSpacing: '0.2em',
              opacity: 0.7,
            }}
          >
            ↑ ARQUITETURA DE DADOS & IA — AGENTES AUTÔNOMOS (MCP) & ETL
          </p>
        </div>
      )}
    </section>
  )
}
