import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let rx = 0
    let ry = 0
    let mx = 0
    let my = 0
    let rafId = null

    const handleMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

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
  }, [])

  return (
    <>
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  )
}
