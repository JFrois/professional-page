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
            color: '#f5f0e8',
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
          <span className="chip amber">Python</span>
          <span className="chip amber">RPA · Automação</span>
          <span className="chip steel">SQL · BI</span>
          <span className="chip ember">IBM · 99 · VOSS · Loft</span>
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
          gap: 8,
          opacity,
        }}
      >
        <span
          className="f-mono"
          style={{ fontSize: 9, color: 'var(--t3)', letterSpacing: '0.2em' }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: 'linear-gradient(to bottom, var(--amber), transparent)',
          }}
        />
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
            ↑ ENERGIA PREVISTA — AURORA PRIME · SOL 01→56
          </p>
        </div>
      )}
    </section>
  )
}
