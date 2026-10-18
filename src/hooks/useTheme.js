import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'theme-preference'

export function useTheme() {
  // Mode can be: 'system' | 'light' | 'dark'
  const [themeMode, setThemeModeState] = useState(() => {
    if (typeof window === 'undefined') return 'system'
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved
      }
    } catch {
      // Fallback if localStorage is inaccessible
    }
    return 'system'
  })

  // Detect real-time OS preference
  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Listen to OS prefers-color-scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      setSystemIsDark(e.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  // Listen to cross-tab storage changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        const val = e.newValue
        if (val === 'light' || val === 'dark' || val === 'system') {
          setThemeModeState(val)
        } else {
          setThemeModeState('system')
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // Calculate resolved theme: 'dark' | 'light'
  const resolvedTheme =
    themeMode === 'system' ? (systemIsDark ? 'dark' : 'light') : themeMode

  // Synchronize document.documentElement attributes
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement

    if (themeMode === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', themeMode)
    }

    root.style.colorScheme = resolvedTheme

    // Update meta theme-color if present
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#090d16' : '#f8fafc'
      )
    }
  }, [themeMode, resolvedTheme])

  const setThemeMode = useCallback((mode) => {
    setThemeModeState(mode)
    try {
      if (mode === 'system') {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, mode)
      }
    } catch {
      // Storage failure safety
    }
  }, [])

  const toggleTheme = useCallback(() => {
    if (themeMode === 'system') {
      setThemeMode('light')
    } else if (themeMode === 'light') {
      setThemeMode('dark')
    } else {
      setThemeMode('system')
    }
  }, [themeMode, setThemeMode])

  return {
    themeMode,
    setThemeMode,
    resolvedTheme,
    toggleTheme,
  }
}
