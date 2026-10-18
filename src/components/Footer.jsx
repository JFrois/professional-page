import { Mail } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
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
      <span className="f-mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>
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
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          <LinkedinIcon size={11} />
          <span>LINKEDIN</span>
        </a>

        <a
          href={profileData.social.github}
          target="_blank"
          rel="noreferrer"
          className="f-mono footer-link"
          style={{
            fontSize: 10,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          <GithubIcon size={11} />
          <span>GITHUB</span>
        </a>

        <a
          href={`mailto:${profileData.email}`}
          className="f-mono footer-link"
          style={{
            fontSize: 10,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          <Mail size={11} stroke="currentColor" />
          <span>EMAIL</span>
        </a>
      </div>
    </footer>
  )
}
