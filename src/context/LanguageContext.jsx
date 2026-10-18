import { useState, useEffect, useCallback, useMemo } from 'react'
import { LanguageContext } from './LanguageContextCore.js'
import { translations } from '../data/translations.js'

const STORAGE_KEY = 'preferred-lang'

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt-BR' || saved === 'en-US') {
      return saved
    }
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US'
    }
  } catch {
    // ignore localStorage or navigator read error
  }
  return 'pt-BR'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage)

  const setLang = useCallback((newLang) => {
    const target = newLang === 'en-US' || newLang === 'en' ? 'en-US' : 'pt-BR'
    setLangState(target)
    try {
      localStorage.setItem(STORAGE_KEY, target)
    } catch {
      // ignore storage error
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'pt-BR' ? 'en-US' : 'pt-BR')
  }, [lang, setLang])

  // Synchronize <html> lang attribute and document.title
  useEffect(() => {
    const htmlLang = lang === 'pt-BR' ? 'pt-BR' : 'en'
    document.documentElement.setAttribute('lang', htmlLang)

    document.title =
      lang === 'pt-BR'
        ? 'Juan Frois — Desenvolvedor de Soluções | Automação (RPA) | Dados'
        : 'Juan Frois — Solutions Developer | Automation (RPA) | Data'
  }, [lang])

  const isPt = lang === 'pt-BR'

  // Translation helper: t('nav.projects') or t('hero.viewProjects')
  const t = useCallback(
    (keyPath) => {
      const keys = keyPath.split('.')
      let current = translations[lang]
      for (const k of keys) {
        if (!current || current[k] === undefined) {
          // fallback to pt-BR if missing in en-US
          let fallback = translations['pt-BR']
          for (const fbKey of keys) {
            if (!fallback || fallback[fbKey] === undefined) return keyPath
            fallback = fallback[fbKey]
          }
          return fallback
        }
        current = current[k]
      }
      return current
    },
    [lang]
  )

  // Localize data helper: handles { pt: '...', en: '...' } or { 'pt-BR': '...', 'en-US': '...' } or strings
  const localize = useCallback(
    (value) => {
      if (value === null || value === undefined) return ''
      if (typeof value !== 'object') return value
      if (Array.isArray(value)) return value

      // Check full key ('pt-BR' or 'en-US')
      if (value[lang] !== undefined) return value[lang]

      // Check short key ('pt' or 'en')
      const shortKey = lang.startsWith('pt') ? 'pt' : 'en'
      if (value[shortKey] !== undefined) return value[shortKey]

      // Fallback priority: pt-BR -> pt -> en-US -> en -> first value
      return (
        value['pt-BR'] ??
        value['pt'] ??
        value['en-US'] ??
        value['en'] ??
        Object.values(value)[0] ??
        ''
      )
    },
    [lang]
  )

  // Active CV information according to language
  const activeCv = useMemo(() => {
    return isPt
      ? {
          key: 'pt',
          langCode: 'pt-BR',
          url: '/curriculos/juan-frois-cv-pt.pdf',
          filename: 'juan-frois-cv-pt.pdf',
          label: 'Baixar CV (PDF)',
          heroLabel: 'Baixar Currículo (PDF)',
          shortLabel: 'PT-BR',
          fullTitle: 'Português (Brasil)',
          flag: '🇧🇷',
        }
      : {
          key: 'en',
          langCode: 'en-US',
          url: '/curriculos/juan-frois-resume-en.pdf',
          filename: 'juan-frois-resume-en.pdf',
          label: 'Download Resume (PDF)',
          heroLabel: 'Download Resume (PDF)',
          shortLabel: 'EN',
          fullTitle: 'English (US)',
          flag: '🇺🇸',
        }
  }, [isPt])

  const contextValue = useMemo(
    () => ({
      lang,
      isPt,
      setLang,
      toggleLang,
      t,
      localize,
      activeCv,
    }),
    [lang, isPt, setLang, toggleLang, t, localize, activeCv]
  )

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
