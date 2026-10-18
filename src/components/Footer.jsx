import { Mail, Download } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '32px clamp(24px, 6vw, 80px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5,
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span
          className="f-mono"
          style={{
            fontSize: 10.5,
            color: 'var(--text-primary)',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          {profileData.name.toUpperCase()}
        </span>
        <span
          className="f-mono"
          style={{
            fontSize: 9.5,
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {profileData.headline.toUpperCase()}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <a
          href={profileData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="f-mono footer-link"
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <LinkedinIcon size={12} />
          <span>LINKEDIN</span>
        </a>

        <a
          href={profileData.social.github}
          target="_blank"
          rel="noreferrer"
          className="f-mono footer-link"
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <GithubIcon size={12} />
          <span>GITHUB</span>
        </a>

        <a
          href={`mailto:${profileData.email}`}
          className="f-mono footer-link"
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
          title={profileData.email}
        >
          <Mail size={12} stroke="currentColor" />
          <span>{profileData.email}</span>
        </a>

        <span
          style={{
            width: 1,
            height: 12,
            background: 'var(--border-subtle)',
            display: 'inline-block',
          }}
          aria-hidden="true"
        />

        <a
          href={profileData.links?.cvPt || '/curriculos/juan-frois-cv-pt.pdf'}
          download="juan-frois-cv-pt.pdf"
          className="f-mono footer-link"
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
          title="Baixar Currículo em PDF (Português)"
        >
          <Download size={11} stroke="currentColor" />
          <span>CV (PT)</span>
        </a>

        <a
          href={profileData.links?.cvEn || '/curriculos/juan-frois-resume-en.pdf'}
          download="juan-frois-resume-en.pdf"
          className="f-mono footer-link"
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
          title="Download Resume in PDF (English)"
        >
          <Download size={11} stroke="currentColor" />
          <span>CV (EN)</span>
        </a>
      </div>
    </footer>
  )
}
