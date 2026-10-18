import profileData from '../data/profile.json'

const NAV_ITEMS = [
  { id: 'hero', label: 'INÍCIO' },
  { id: 'about', label: 'SOBRE' },
  { id: 'skills', label: 'STACK' },
  { id: 'projects', label: 'PROJETOS' },
  { id: 'contact', label: 'CONTATO' },
]

export default function Navbar({ active = 'hero' }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(10,9,8,0.95), transparent)',
      }}
    >
      <button
        type="button"
        onClick={() => scrollTo('hero')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #f0a857, #c9622f)',
            boxShadow: '0 0 16px rgba(232,140,74,0.45)',
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 12,
            fontWeight: 600,
            color: '#f5f0e8',
            letterSpacing: '0.12em',
          }}
        >
          {profileData.initials}
        </span>
      </button>

      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={`nav-btn ${active === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}

        <a
          href={profileData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
          style={{ padding: '7px 16px', fontSize: 12 }}
        >
          LinkedIn ↗
        </a>
      </div>
    </nav>
  )
}
