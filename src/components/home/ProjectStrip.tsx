'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { ArrowRight, ArrowUpRight, Trophy, ExternalLink } from 'lucide-react'

// GitHub SVG icon (lucide-react doesn't export 'Github')
const GithubIcon = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

gsap.registerPlugin(ScrollTrigger)

// ── Status badge config ──
const statusConfig: Record<string, { label: string; color: string; glow: string }> = {
  live: { label: 'LIVE', color: 'text-emerald-400', glow: 'bg-emerald-400' },
  'case-study': { label: 'CASE STUDY', color: 'text-blue-400', glow: 'bg-blue-400' },
  'sih-finalist': { label: '🏆 SIH 2025 FINALIST', color: 'text-amber-400', glow: 'bg-amber-400' },
  'in-progress': { label: 'IN PROGRESS', color: 'text-purple-400', glow: 'bg-purple-400' },
}

// ── 3D Tilt Card ──
function useCardTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const [style, setStyle] = useState<React.CSSProperties>({})

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -10
    const rotateY = (x - 0.5) * 10
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    })
  }, [ref])

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, handleMouseMove, handleMouseLeave])

  return style
}

// ── Glow Follow ──
function useGlowFollow(ref: React.RefObject<HTMLDivElement | null>) {
  const [pos, setPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }

    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [ref])

  return pos
}

// ── Project Card ──
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const tiltStyle = useCardTilt(cardRef)
  const glowPos = useGlowFollow(cardRef)
  const isFeatured = project.featured
  const status = project.status ? statusConfig[project.status] : null

  return (
    <div
      className="project-card-item flex-shrink-0 snap-center mt-4 md:mt-8 w-[75vw] md:w-[45vw] lg:w-[35vw]"
    >
      <div className="group block">
        <div
          ref={cardRef}
          className="relative rounded-3xl border border-white/[0.06] bg-[#0a0a0f]"
          style={{
            ...tiltStyle,
            willChange: 'transform',
          }}
        >
          {/* ── Animated glow that follows cursor ── */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"
            style={{
              background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,255,179,0.07), transparent 40%)`,
            }}
          />

          {/* ── Animated border glow on hover ── */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"
            style={{
              background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,255,179,0.25), transparent 50%)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />

          {/* ── Card visual area (gradient only, no cover image) ── */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl" style={{ transform: 'translateZ(0)' }}>
            {/* Gradient Background only */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out scale-110 group-hover:scale-100"
              style={{ background: project.gradient }}
            />

            {/* Animated noise texture */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Subtle overall dark overlay */}
            <div className="absolute inset-0 bg-[#0a0a0f]/10 group-hover:bg-[#0a0a0f]/30 transition-colors duration-500" />

            {/* ── Top bar: number + status ── */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-[15]">
              <span
                className="text-[10px] font-bold tracking-[0.25em] text-white/25 group-hover:text-white/50 transition-colors duration-300"
                style={{ fontFamily: 'monospace' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* SIH badge */}
              {project.status === 'sih-finalist' && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 backdrop-blur-md">
                  <Trophy size={10} className="text-amber-400" />
                  <span className="text-[9px] font-bold tracking-[0.15em] text-amber-400" style={{ fontFamily: 'monospace' }}>
                    SIH 2025
                  </span>
                </div>
              )}

              {/* Status dot */}
              {status && project.status !== 'sih-finalist' && (
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${status.glow} animate-pulse`} />
                  <span className={`text-[9px] font-bold tracking-[0.15em] ${status.color}`} style={{ fontFamily: 'monospace' }}>
                    {status.label}
                  </span>
                </div>
              )}
            </div>

            {/* ── Centered project name on gradient ── */}
            <div className="absolute inset-0 flex items-center justify-center z-[10] pointer-events-none">
              <h3
                className={`${isFeatured ? 'text-2xl sm:text-3xl md:text-5xl' : 'text-xl sm:text-2xl md:text-4xl'} font-bold text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00ffb3] group-hover:to-[#00ccff] transition-all duration-500 leading-tight text-center drop-shadow-lg px-6`}
                style={{ fontFamily: 'var(--font-display, var(--font-playfair))' }}
              >
                {project.title}
              </h3>
            </div>

            {/* ── Main card link (covers gradient area) ── */}
            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-[12]" aria-label={`View ${project.title}`} />

            {/* ── View button — appears on hover ── */}
            <div className="absolute top-6 right-6 z-[15] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-[#00ffb3]/20 group-hover:border-[#00ffb3]/30 transition-all duration-300">
                <ArrowUpRight size={15} className="text-white group-hover:text-[#00ffb3] transition-colors" />
              </div>
            </div>
          </div>

          {/* ── Bottom content panel ── */}
          <div className="p-6 pb-5">
            {/* Category + Action Links row */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase bg-white/[0.06] border border-white/[0.08] text-white/50">
                {project.category}
              </span>
              {/* Action Links — always visible */}
              <div className="flex gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/[0.08] hover:border-white/25 text-white/40 hover:text-white transition-all duration-300">
                    <GithubIcon size={14} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffb3]/[0.08] hover:bg-[#00ffb3]/20 border border-[#00ffb3]/20 hover:border-[#00ffb3]/40 text-[#00ffb3]/60 hover:text-[#00ffb3] transition-all duration-300">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[13px] text-white/40 group-hover:text-white/60 leading-relaxed line-clamp-2 transition-colors duration-300">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[9px] font-semibold tracking-wider rounded-md bg-white/[0.04] border border-white/[0.06] text-white/30 group-hover:border-[#00ffb3]/15 group-hover:text-white/60 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Progress Bar ──
function ScrollProgress({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !barRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [sectionRef])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04] z-30">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #00ffb3, #00b377)',
          boxShadow: '0 0 12px rgba(0,255,179,0.4)',
        }}
      />
    </div>
  )
}

// ── Main Component ──
export function ProjectStrip() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !stripRef.current) return

    const ctx = gsap.context(() => {
      const strip = stripRef.current!
      const totalScroll = strip.scrollWidth - window.innerWidth

      // ── Heading animations ──
      gsap.fromTo('.ps-meta', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      })
      gsap.fromTo('.ps-heading', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      })
      gsap.fromTo('.ps-cta', { y: 15, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })

      // ── Animated counter ──
      if (counterRef.current) {
        gsap.fromTo(counterRef.current, { innerText: 0 }, {
          innerText: projects.length,
          duration: 1.5,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }

      // ── Stagger cards (Fade in only) ──
      gsap.fromTo('.project-card-item', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })

      // ── Horizontal Scroll (Desktop Only) ──
      const mm = gsap.matchMedia()
      mm.add("(min-width: 768px)", () => {
        const strip = stripRef.current
        if (strip) {
          gsap.to(strip, {
            x: () => {
              if (!strip.lastElementChild) return 0;
              const lastChild = strip.lastElementChild as HTMLElement;
              // Calculate exactly where the last child ends, plus 5vw for right padding buffer
              const totalWidth = lastChild.offsetLeft + lastChild.offsetWidth + (window.innerWidth * 0.05);
              return -(totalWidth - window.innerWidth);
            },
            ease: 'none',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top 15%',
              end: () => {
                if (!strip.lastElementChild) return "+=1000";
                const lastChild = strip.lastElementChild as HTMLElement;
                const totalWidth = lastChild.offsetLeft + lastChild.offsetWidth;
                return `+=${totalWidth}`; 
              },
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            }
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])
  return (
    <div ref={wrapperRef} className="mb-24 w-full max-w-[100vw] overflow-hidden flex flex-col items-start">
      {/* ── Section heading (scrolls normally, NOT pinned) ── */}
      <div className="relative w-full" id="projects">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#00ffb3]/[0.02] blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/[0.02] blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <div className="container-wide pt-20 pb-10 md:pb-16 relative z-10" style={{ paddingLeft: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <div className="flex items-end justify-between">
            <div>
              <div className="ps-meta flex items-center gap-3 mb-5">
                <span className="w-10 h-px bg-gradient-to-r from-[#00ffb3]/60 to-transparent" />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00ffb3]/60" style={{ fontFamily: 'monospace' }}>
                  Selected Work
                </p>
                <span className="text-[10px] text-white/15" style={{ fontFamily: 'monospace' }}>
                  — <span ref={counterRef}>0</span> projects
                </span>
              </div>
              <h2 className="ps-heading text-display-xl" style={{ lineHeight: 1.1 }}>
                Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="ps-cta hidden md:inline-flex items-center gap-3 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00ffb3] border border-[#00ffb3]/20 bg-[#00ffb3]/[0.03] rounded-full hover:border-[#00ffb3]/40 hover:bg-[#00ffb3]/[0.08] hover:shadow-[0_0_25px_rgba(0,255,179,0.12)] transition-all duration-400 group"
            >
              View all projects
              <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Horizontal strip (Native CSS Scroll) ── */}
      <section ref={sectionRef} className="relative w-full">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Scroll Container */}
        <div
          ref={stripRef}
          className="flex items-center gap-6 md:gap-8 pt-10 pb-10 md:pt-16 md:pb-16 w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none relative z-[1] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] will-change-transform"
          style={{
            marginTop: '3rem',
            paddingLeft: 'calc(max(0px, (100vw - 1400px) / 2) + clamp(1rem, 2vw, 1.5rem))',
            paddingRight: 'calc(max(0px, (100vw - 1400px) / 2) + clamp(1rem, 2vw, 1.5rem))',
          }}
        >
          {projects.map((p, index) => (
            <ProjectCard key={p.slug} project={p} index={index} />
          ))}
          
          {/* End of strip heading */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-[85vw] md:w-[40vw] lg:w-[35vw] snap-center px-8 relative">
            <h3 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium text-center" 
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              These are <br/><span className="text-[#00ffb3] italic">My projects</span>
            </h3>
            <div className="w-16 h-px bg-[#00ffb3]/20 mt-8 mb-8" />
            <Link 
              href="/projects" 
              className="group inline-flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white hover:text-[#00ffb3] transition-colors duration-300"
            >
              Explore all works
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

