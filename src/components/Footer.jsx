import { Mail, Download } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(24px, 4vh, 36px) clamp(16px, 4vw, 40px)',
        position: 'relative',
        zIndex: 5,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span
          className="f-mono"
          style={{
            fontSize: 11,
            color: 'var(--text-primary)',
            fontWeight: 700,
            letterSpacing: '0.06em',
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
          gap: 'clamp(10px, 2vw, 18px)',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <a
          href={profileData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="f-mono footer-link touch-target"
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 8px',
            minHeight: 44,
          }}
          title="LinkedIn de Juan Frois"
        >
          <LinkedinIcon size={13} />
          <span>LINKEDIN</span>
        </a>

        <a
          href={profileData.social.github}
          target="_blank"
          rel="noreferrer"
          className="f-mono footer-link touch-target"
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 8px',
            minHeight: 44,
          }}
          title="GitHub de Juan Frois"
        >
          <GithubIcon size={13} />
          <span>GITHUB</span>
        </a>

        <a
          href={`mailto:${profileData.email}`}
          className="f-mono footer-link touch-target"
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 8px',
            minHeight: 44,
            overflowWrap: 'anywhere',
          }}
          title={profileData.email}
        >
          <Mail size={13} stroke="currentColor" />
          <span>{profileData.email}</span>
        </a>

        <span
          className="hide-on-mobile"
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
          className="f-mono footer-link touch-target"
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 8px',
            minHeight: 44,
          }}
          title="Baixar Currículo em PDF (Português)"
        >
          <Download size={12} stroke="currentColor" />
          <span>CV (PT)</span>
        </a>

        <a
          href={profileData.links?.cvEn || '/curriculos/juan-frois-resume-en.pdf'}
          download="juan-frois-resume-en.pdf"
          className="f-mono footer-link touch-target"
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 8px',
            minHeight: 44,
          }}
          title="Download Resume in PDF (English)"
        >
          <Download size={12} stroke="currentColor" />
          <span>CV (EN)</span>
        </a>
      </div>
    </footer>
  )
}
