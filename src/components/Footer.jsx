import profileData from '../data/profile.json'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '28px clamp(24px, 6vw, 80px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5,
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <span className="f-mono" style={{ fontSize: 10, color: 'var(--t3)' }}>
        {profileData.name.toUpperCase()} — {profileData.headline.toUpperCase()}
      </span>

      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <a
          href={profileData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="f-mono footer-link"
          style={{
            fontSize: 10,
            color: 'var(--t3)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--amber)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--t3)'
          }}
        >
          LINKEDIN
        </a>

        <a
          href={profileData.social.github}
          target="_blank"
          rel="noreferrer"
          className="f-mono footer-link"
          style={{
            fontSize: 10,
            color: 'var(--t3)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--amber)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--t3)'
          }}
        >
          GITHUB
        </a>

        <a
          href={`mailto:${profileData.email}`}
          className="f-mono footer-link"
          style={{
            fontSize: 10,
            color: 'var(--t3)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--amber)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--t3)'
          }}
        >
          EMAIL
        </a>
      </div>
    </footer>
  )
}
