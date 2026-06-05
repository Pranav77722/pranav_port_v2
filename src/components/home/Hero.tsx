'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import Script from 'next/script'
import { LiveClock } from '@/components/ui/LiveClock'

const techTags = [
  'SIH 2025 Finalist',
  'MERN Stack Developer',
  'AI Agents',
  'AI & Tech Enthusiast',
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const fullText = 'Building AI, IoT & Modern Web Experiences'
  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from('.hero-terminal-line', {
        width: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
      .from('.hero-name-first', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.3')
      .from('.hero-name-last', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.7')
      .from('.hero-tagline-wrap', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .fromTo('.tech-tag', 
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
      .from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2')
      .from('.hero-stats .stat-item', {
        y: 15,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')
      .from('.hero-scroll-wrap', {
        opacity: 0,
        duration: 0.5,
      }, '-=0.2')

      // Smoothly fade in the 3D Spline model so it doesn't block initial text load
      gsap.from('.spline-container', {
        opacity: 0,
        duration: 2,
        ease: 'power2.inOut',
        delay: 0.5,
      })

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -8,
        duration: 2.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      })

      // Scan line animation
      gsap.to('.scan-line', {
        top: '100%',
        duration: 4,
        ease: 'none',
        repeat: -1,
        delay: 0.5,
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-start justify-center overflow-hidden">
      {/* Spline Web Component Script */}
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.51/build/spline-viewer.js" strategy="afterInteractive" />

      {/* 3D Spline Background (Web Component via innerHTML to bypass TS types) */}
      <div className="spline-container absolute inset-0 z-0 overflow-hidden bg-black"
        dangerouslySetInnerHTML={{
          __html: '<spline-viewer url="https://prod.spline.design/JJc1s5JPTH7KkKXf/scene.splinecode"></spline-viewer>'
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 45%, transparent 20%, rgba(5,5,5,0.6) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 55%, rgba(5,5,5,0.9) 90%, rgba(5,5,5,1) 100%),
            linear-gradient(to right, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.3) 40%, transparent 60%)
          `
        }}
      />

      {/* Animated scan line */}
      <div className="scan-line absolute left-0 w-full h-px z-10 pointer-events-none"
        style={{ top: '-5%', background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.15), transparent)' }}
      />

      {/* Tech grid overlay — subtle */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Left-aligned content with proper container constraint */}
      <div className="relative z-20 w-full container-wide flex flex-col items-start text-left pointer-events-none mt-16 md:mt-0">

        {/* Terminal-style status line */}
        <div className="hero-terminal-line flex items-center gap-3 mb-12 overflow-hidden">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-400/90 whitespace-nowrap"
              style={{ fontFamily: 'monospace' }}>
              Available for work
            </span>
          </span>
          <span className="hidden md:inline text-[10px] tracking-wider text-[var(--color-text-subtle)] whitespace-nowrap"
            style={{ fontFamily: 'monospace' }}>
            // portfolio v2.0
          </span>
          <span className="hidden md:flex items-center gap-2 text-[10px] tracking-wider text-[var(--color-text-subtle)] whitespace-nowrap"
            style={{ fontFamily: 'monospace' }}>
            <span>•</span>
            <LiveClock timezone="Asia/Kolkata" label="IST" className="text-[var(--color-text-subtle)] m-0 leading-none" />
          </span>
        </div>

        {/* Name */}
        <h1 aria-label="Pranav Khaire" style={{ filter: 'drop-shadow(0 0 20px rgba(52, 211, 153, 0.2))' }}>
          <span className="hero-name-first block uppercase tech-text-gradient"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}>
            Pranav
          </span>
          <span className="hero-name-last block uppercase flex items-baseline gap-5 tech-text-gradient"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}>
            Khaire
            <span className="hidden md:inline-block w-12 lg:w-24 h-1 bg-gradient-to-r from-[var(--color-accent-warm)] to-transparent float-element rounded-full" />
          </span>
        </h1>

        {/* Tagline */}
        <div className="hero-tagline-wrap mt-8 flex items-center gap-3 max-w-2xl">
          <span className="text-emerald-400/70 text-sm md:text-base mt-1" style={{ fontFamily: 'monospace' }}>&gt;</span>
          <p className="text-base md:text-xl text-[var(--color-text-body)] leading-relaxed md:leading-loose"
            style={{ fontFamily: 'var(--font-body)' }}>
            {fullText}
            <span className="inline-block w-0.5 h-5 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta-group mt-14 flex flex-wrap items-center gap-6 pointer-events-auto">
          <a
            href="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-400 text-black text-xs font-bold tracking-[0.15em] uppercase rounded-full hover:bg-emerald-300 transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:-translate-y-1 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
            <span className="relative z-10 w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="relative z-10">View Work</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-emerald-500/30 bg-emerald-500/5 text-xs text-emerald-400/90 tracking-[0.15em] uppercase rounded-full hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_20px_rgba(16,185,129,0.15),0_0_15px_rgba(16,185,129,0.2)]"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Stats bar */}
        <div className="hero-stats mt-20 flex items-center gap-10 md:gap-16">
          {[
            { value: '5+', label: 'Projects' },
            { value: 'Fresher', label: 'Experience' },
            { value: '∞', label: 'Curiosity' },
          ].map((stat) => (
            <div key={stat.label} className="stat-item flex flex-col">
              <span className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-subtle)] mt-2"
                style={{ fontFamily: 'monospace' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right-aligned Tech Tags (Hidden on smaller screens to prevent congestion) */}
      <div className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end gap-6 pointer-events-none">
        {techTags.map((tag) => (
          <div key={tag} className="tech-tag pointer-events-auto group">
            <span className="block px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md text-sm tracking-[0.15em] text-white/50 cursor-default transition-all duration-500 ease-out hover:-translate-x-4 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3),inset_0_0_10px_rgba(16,185,129,0.1)] relative overflow-hidden"
              style={{ fontFamily: 'monospace' }}>
              <span className="relative z-10">{tag}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            </span>
          </div>
        ))}
      </div>

      {/* Decorative corner brackets */}
      <div className="absolute top-20 left-8 md:left-16 lg:left-24 z-20 pointer-events-none opacity-20 float-element">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400">
          <path d="M8 2H2v6M2 2l6 6" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-8 md:right-16 lg:right-24 z-20 pointer-events-none opacity-20 float-element">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400">
          <path d="M16 22h6v-6M22 22l-6-6" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-wrap absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-60">
        <ScrollIndicator />
      </div>
    </section>
  )
}
