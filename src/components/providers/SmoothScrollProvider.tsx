'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  // ── Initialize Lenis + GSAP ticker (once) ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    // Store reference so cleanup actually works
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
      lenisRef.current = null
    }
  }, [])

  // ── On route change: scroll to top + refresh ScrollTrigger ──
  useEffect(() => {
    // Scroll to top
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)

    // Give the new page DOM time to render, then refresh all ScrollTriggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return <>{children}</>
}
