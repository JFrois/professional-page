import { useEffect, useRef, useState } from 'react'

export default function Cursor({ theme = 'dark' }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: coarse)').matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(pointer: coarse)')
    const handleChange = (e) => {
      setIsTouchDevice(e.matches)
    }

    if (mq.addEventListener) {
      mq.addEventListener('change', handleChange)
    } else {
      mq.addListener(handleChange)
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handleChange)
      } else {
        mq.removeListener(handleChange)
      }
    }
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    let rx = -100
    let ry = -100
    let mx = -100
    let my = -100
    let rafId = null

    const handleMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14

      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top = `${my}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top = `${ry}px`
      }
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`cur-dot ${theme}`}
        data-theme={theme}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cur-ring ${theme}`}
        data-theme={theme}
        aria-hidden="true"
      />
    </>
  )
}
