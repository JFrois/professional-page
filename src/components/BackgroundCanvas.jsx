import { useEffect, useRef, useCallback } from 'react'
import profileData from '../data/profile.json'

export default function BackgroundCanvas({ scrollPct = 0 }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(0)
  const initializedRef = useRef(false)

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const w = canvas.width
    const h = canvas.height
    const particles = []

    profileData.codeSnippets.forEach((snippet, rowIdx) => {
      snippet.text.split('').forEach((char, colIdx) => {
        if (char !== ' ') {
          particles.push({
            x: Math.random() * w,
            y: -80 - Math.random() * h * 0.6,
            vy: 1.2 + Math.random() * 1.8,
            vx: (Math.random() - 0.5) * 0.3,
            char,
            color: snippet.color,
            alpha: 0.5 + Math.random() * 0.4,
            size: 10 + Math.random() * 2,
            targetX: w * 0.08 + colIdx * 8.5,
            targetY: h * 0.22 + rowIdx * 18,
          })
        }
      })
    })

    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (!initializedRef.current) {
        initParticles()
        initializedRef.current = true
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    const render = () => {
      ctx.clearRect(0, 0, w, h)

      if (scrollPct <= 0 || scrollPct >= 1) {
        cancelAnimationFrame(animFrameRef.current)
        return
      }

      const p1 = Math.max(0, Math.min((scrollPct - 0.3) / 0.3, 1))
      const p2 = Math.max(0, Math.min((scrollPct - 0.6) / 0.25, 1))
      const p3 = Math.max(0, Math.min((scrollPct - 0.85) / 0.15, 1))

      ctx.font = '500 11px "JetBrains Mono", monospace'

      particlesRef.current.forEach((p, idx) => {
        const delay = idx * 0.0015
        const progress = Math.max(0, Math.min((scrollPct - delay) / 0.35, 1))
        if (progress <= 0) return

        let curX = p.x + progress * (p.targetX - p.x)
        let curY = -80 + progress * (p.targetY + 80)
        let curAlpha = progress * p.alpha

        if (p1 > 0) {
          const centerX = w / 2
          const centerY = h * 0.5
          curX += p1 * (centerX - curX)
          curY += p1 * (centerY - curY)
          curAlpha *= 1 - p1 * 0.4
        }

        if (p2 > 0.2) {
          const spreadX = w * 0.08 + (idx / particlesRef.current.length) * w * 0.84
          const spreadY = h * 0.5
          curX += ((p2 - 0.2) / 0.8) * (spreadX - curX)
          curY += ((p2 - 0.2) / 0.8) * (spreadY - curY)
        }

        const finalAlpha = curAlpha * (1 - p3)
        if (finalAlpha <= 0) return

        ctx.globalAlpha = Math.max(0, Math.min(1, finalAlpha))

        if (p2 > 0.6) {
          const factor = (p2 - 0.6) / 0.4
          ctx.fillStyle = `hsl(${28 + factor * 12}, 85%, ${55 + factor * 15}%)`
          ctx.beginPath()
          ctx.arc(curX, curY, 1.5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = p.color
          ctx.fillText(p.char, curX, curY)
        }
      })

      if (p2 > 0.4) {
        const factor = ((p2 - 0.4) / 0.6) * (1 - p3)
        const lineY = h * 0.5
        const time = Date.now() * 0.0018

        for (let r = 3; r >= 0; r--) {
          const strokeAlpha = factor * (1 - r * 0.22)
          ctx.globalAlpha = Math.max(0, strokeAlpha)

          const grad = ctx.createLinearGradient(w * 0.06, 0, w * 0.94, 0)
          grad.addColorStop(0, 'transparent')
          grad.addColorStop(0.15, '#c9622f')
          grad.addColorStop(0.5, '#e8963c')
          grad.addColorStop(0.85, '#c9622f')
          grad.addColorStop(1, 'transparent')

          ctx.strokeStyle = grad
          ctx.lineWidth = r === 0 ? 1.5 : r * 2.5
          ctx.shadowBlur = r > 0 ? r * 6 : 0
          ctx.shadowColor = '#e8963c'

          ctx.beginPath()
          ctx.moveTo(w * 0.06, lineY)
          for (let x = w * 0.06; x <= w * 0.94; x += 2) {
            const y1 = Math.sin(x * 0.014 + time) * 7
            const y2 = Math.sin(x * 0.028 + time * 1.6) * 3.5
            const y3 = Math.cos(x * 0.007 + time * 0.5) * 11
            ctx.lineTo(x, lineY + y1 + y2 + y3)
          }
          ctx.stroke()
        }

        ctx.shadowBlur = 0

        for (let r = 0; r < 4; r++) {
          const tMod = (time * 0.25 + r * 0.25) % 1
          const sparkX = w * 0.06 + tMod * w * 0.88
          const sparkY =
            lineY +
            Math.sin(sparkX * 0.014 + time) * 7 +
            Math.sin(sparkX * 0.028 + time * 1.6) * 3.5

          ctx.globalAlpha = factor * 0.9
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(sparkX, sparkY, 2.5, 0, Math.PI * 2)
          ctx.fill()

          ctx.globalAlpha = factor * 0.35
          ctx.fillStyle = '#e8963c'
          ctx.beginPath()
          ctx.arc(sparkX, sparkY, 7, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      animFrameRef.current = requestAnimationFrame(render)
    }

    cancelAnimationFrame(animFrameRef.current)
    animFrameRef.current = requestAnimationFrame(render)

    return () => cancelAnimationFrame(animFrameRef.current)
  }, [scrollPct])

  return <canvas ref={canvasRef} id="film-canvas" aria-hidden="true" />
}
