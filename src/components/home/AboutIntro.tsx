'use client'

import { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Particle System ──
interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  life: number
  maxLife: number
}

function createParticle(canvasW: number, canvasH: number): Particle {
  const x = Math.random() * canvasW
  const y = Math.random() * canvasH
  const colors = [
    'rgba(52,211,153,', // emerald-400
    'rgba(110,231,183,', // emerald-300
    'rgba(16,185,129,', // emerald-500
    'rgba(232,224,213,', // warm accent
    'rgba(167,139,250,', // purple accent
  ]
  return {
    x,
    y,
    baseX: x,
    baseY: y,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2.5 + 0.5,
    alpha: Math.random() * 0.6 + 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 0,
    maxLife: Math.random() * 300 + 200,
  }
}

export function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)

  // ── GSAP text animations ──
  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      // Heading — slide up
      gsap.fromTo(
        '.intro-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Body text — fade up with delay
      gsap.fromTo(
        '.intro-body',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // About me button — slide up last
      gsap.fromTo(
        '.intro-cta',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  // ── Particle canvas ──
  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 3000), 120)
    particlesRef.current = Array.from({ length: count }, () => createParticle(w, h))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initParticles(rect.width, rect.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio
      ctx.clearRect(0, 0, w, h)

      const { x: mx, y: my } = mouseRef.current
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction — attract particles toward cursor
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 150

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.08
          p.vx += dx * force * 0.02
          p.vy += dy * force * 0.02
          // Boost alpha near cursor
          p.alpha = Math.min(p.alpha + 0.02, 0.9)
        } else {
          // Drift back toward base position
          p.vx += (p.baseX - p.x) * 0.001
          p.vy += (p.baseY - p.y) * 0.001
          p.alpha = Math.max(p.alpha - 0.005, 0.08)
        }

        // Apply velocity with damping
        p.vx *= 0.97
        p.vy *= 0.97
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Life cycle
        p.life++
        if (p.life > p.maxLife) {
          Object.assign(p, createParticle(w, h))
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.alpha})`
        ctx.fill()

        // Draw connections near cursor
        if (dist < maxDist) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
            if (d < 80) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(52,211,153,${0.15 * (1 - d / 80)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      // Draw a subtle glow at cursor position
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 120)
        gradient.addColorStop(0, 'rgba(52,211,153,0.06)')
        gradient.addColorStop(1, 'rgba(52,211,153,0)')
        ctx.beginPath()
        ctx.arc(mx, my, 120, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [initParticles])


  return (
    <section ref={ref} className="section-padding relative overflow-hidden" id="about">
      <div className="container-wide" style={{ paddingLeft: 'clamp(1rem, 2vw, 1.5rem)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content ── */}
          <div className="max-w-xl">
            {/* Section heading */}
            <h2 className="intro-heading text-display-lg leading-tight opacity-0">
              Building the future through AI, software engineering, and innovative digital solutions.
            </h2>

            {/* Body text + CTA */}
            <div className="intro-body mt-10 opacity-0">
              <p className="text-body-lg text-[var(--color-text-body)] max-w-lg">
                Passionate about software engineering, artificial intelligence, and emerging technologies.
                I develop modern applications and intelligent systems that solve real-world problems
                and deliver meaningful impact.
              </p>
            </div>
            <Link
              href="/about"
              className="intro-cta group inline-flex items-center gap-3 mt-8 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400 border border-emerald-500/25 bg-emerald-500/5 rounded-full hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(52,211,153,0.15)] opacity-0"
            >
              About me
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* ── Right: Interactive Particle Canvas ── */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            {/* Subtle grid background */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Particle canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair"
            />

            {/* Corner label */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span
                className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30"
                style={{ fontFamily: 'monospace' }}
              >
                Interactive · Move your cursor
              </span>
            </div>

            {/* Decorative corner brackets */}
            <svg className="absolute top-3 right-3 w-4 h-4 text-white/10 pointer-events-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M11 1h4v4M1 11v4h4" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}

