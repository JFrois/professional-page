import { Mail, Download } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from './Icons.jsx'
import profileData from '../data/profile.json'
import { useLanguage } from '../hooks/useLanguage.js'

export default function Footer() {
  const { isPt, t, localize } = useLanguage()
  const headline = localize(profileData.headline)

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
          {headline.toUpperCase()}
        </span>
        <span
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            marginTop: 4,
          }}
        >
          © {new Date().getFullYear()} {profileData.name}. {t('footer.allRightsReserved')}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'clamp(10px, 2vw, 18px)',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: 16,
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
          href="/curriculos/juan-frois-cv-pt.pdf"
          download="juan-frois-cv-pt.pdf"
          className="f-mono footer-link touch-target"
          style={{
            fontSize: 11,
            color: isPt ? 'var(--accent-primary)' : 'var(--text-muted)',
            fontWeight: isPt ? 700 : 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 8px',
            minHeight: 44,
          }}
          title={isPt ? 'Baixar Currículo em PDF (Português)' : 'Download Resume in PDF (Portuguese)'}
        >
          <Download size={12} stroke="currentColor" />
          <span>{t('footer.cvPt')}</span>
        </a>

        <a
          href="/curriculos/juan-frois-resume-en.pdf"
          download="juan-frois-resume-en.pdf"
          className="f-mono footer-link touch-target"
          style={{
            fontSize: 11,
            color: !isPt ? 'var(--accent-primary)' : 'var(--text-muted)',
            fontWeight: !isPt ? 700 : 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 8px',
            minHeight: 44,
          }}
          title={isPt ? 'Baixar Resume em PDF (Inglês)' : 'Download Resume in PDF (English)'}
        >
          <Download size={12} stroke="currentColor" />
          <span>{t('footer.cvEn')}</span>
        </a>
      </div>
    </footer>
  )
}
