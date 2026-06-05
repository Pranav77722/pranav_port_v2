'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { LiveClock } from '@/components/ui/LiveClock'
import { ExternalLink, Mail, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ProfilePanel() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setOpen((v) => !v)
    window.addEventListener('toggle-profile', handler)
    return () => window.removeEventListener('toggle-profile', handler)
  }, [])

  useEffect(() => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay) return

    let ctx: gsap.Context
    let lenis: Lenis

    if (open) {
      document.body.style.overflow = 'hidden'
      
      // Premium Opening Animation
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.95, y: 40, rotationX: 15, transformPerspective: 1000 },
        { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'expo.out' }
      )
      
      gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      if (overlay) overlay.style.pointerEvents = 'auto'
      if (panel) panel.style.pointerEvents = 'auto'

      // Initialize Smooth Scroll for Panel
      lenis = new Lenis({
        wrapper: panel,
        content: panel.firstElementChild as HTMLElement,
        lerp: 0.1,
      })

      const raf = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(raf)

      // Apply scroll animations to internal elements
      ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.profile-scroll-item')
        
        items.forEach((item: any, i) => {
          gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              delay: 0.1 + (i * 0.05),
              scrollTrigger: {
                trigger: item,
                scroller: panel,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      }, panelRef)

    } else {
      document.body.style.overflow = ''
      
      // Premium Closing Animation
      gsap.to(panel, { opacity: 0, scale: 0.95, y: 30, duration: 0.4, ease: 'power3.in' })
      gsap.to(overlay, { opacity: 0, duration: 0.4 })
      if (overlay) overlay.style.pointerEvents = 'none'
      if (panel) panel.style.pointerEvents = 'none'
    }

    return () => {
      document.body.style.overflow = ''
      if (ctx) ctx.revert()
      if (lenis) {
        gsap.ticker.remove((time: number) => lenis.raf(time * 1000))
        lenis.destroy()
      }
    }
  }, [open])

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/60 opacity-0 pointer-events-none z-[140]"
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        data-lenis-prevent="true"
        style={{ opacity: 0, pointerEvents: 'none' }}
        className="fixed z-[150] right-4 sm:right-6 top-4 sm:top-6 bottom-4 sm:bottom-6 w-[calc(100vw-2rem)] sm:w-[420px] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_2px_rgba(255,255,255,0.1)] overflow-y-auto overscroll-contain origin-top-right"
      >
        <div className="flex flex-col gap-8 min-h-full" style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="self-end text-[var(--color-text-muted)] hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
          >
            <X size={20} />
          </button>

          {/* Avatar & Info */}
          <div className="profile-scroll-item flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-emerald-500/30 overflow-hidden shadow-[0_0_20px_rgba(52,211,153,0.15)] shrink-0 techy-avatar">
              <Image src="/profile.webp" alt="Pranav Khaire" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                Pranav Khaire
              </h2>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-emerald-400/80 font-semibold mt-1 block">
                Available for work
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="profile-scroll-item">
            <h3 className="text-lg sm:text-xl text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Let&apos;s build something extraordinary together.
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold tracking-wide uppercase text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:text-emerald-300 transition-all rounded shadow-[inset_0_0_20px_rgba(16,185,129,0.05),0_0_15px_rgba(16,185,129,0.1)]"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Bio */}
          <div className="profile-scroll-item space-y-4">
            <p className="text-sm text-[var(--color-text-body)] leading-relaxed">
              Electronics and Telecommunication Engineering student, developer, and content creator passionate about building innovative technology solutions.
            </p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              My strength lies in transforming ideas into real-world projects by combining software development, IoT, AI, and modern web technologies.
            </p>
          </div>

          {/* Email */}
          <a
            href="mailto:khairepranav246@gmail.com"
            className="profile-scroll-item flex items-center gap-2 text-sm font-medium text-emerald-400/90 hover:text-emerald-300 transition-colors w-fit break-all"
          >
            <Mail size={16} className="shrink-0" />
            khairepranav246@gmail.com
          </a>

          <div className="profile-scroll-item w-full h-px bg-white/10" />

          {/* Metadata */}
          <div className="profile-scroll-item flex flex-col gap-3">
            <div>
              <p className="text-meta mb-1">Version</p>
              <p className="text-sm text-white/80 font-medium">2026 © Edition</p>
            </div>
            <div>
              <p className="text-meta mb-1">Local Time</p>
              <LiveClock timezone="Asia/Kolkata" label="IST" />
            </div>
            <div>
              <p className="text-meta mb-1">Socials</p>
              <div className="flex flex-wrap gap-4 mt-1">
                {[
                  { href: 'https://twitter.com/PranavKhai16307', label: 'Twitter' },
                  { href: 'https://github.com/Pranav77722', label: 'Github' },
                  { href: 'https://www.linkedin.com/in/pranavkhaire/', label: 'LinkedIn' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <ExternalLink size={12} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer text */}
          <p className="profile-scroll-item text-meta">Built with Next.js, GSAP & ♥</p>
        </div>
      </aside>
    </>
  )
}
