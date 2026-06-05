'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { SplitText } from '@/components/ui/SplitText'
import { ArrowUpRight, Trophy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const GithubIcon = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

gsap.registerPlugin(ScrollTrigger)

const statusConfig: Record<string, { label: string; color: string; glow: string }> = {
  live: { label: 'LIVE', color: 'text-emerald-400', glow: 'bg-emerald-400' },
  'case-study': { label: 'CASE STUDY', color: 'text-blue-400', glow: 'bg-blue-400' },
  'sih-finalist': { label: '🏆 SIH 2025 FINALIST', color: 'text-amber-400', glow: 'bg-amber-400' },
  'in-progress': { label: 'IN PROGRESS', color: 'text-purple-400', glow: 'bg-purple-400' },
}

// ── Glow follow hook ──
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

// ── Card with tilt + glow ──
function ProjectPageCard({ project, index }: {
  project: typeof projects[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowPos = useGlowFollow(cardRef)
  const status = project.status ? statusConfig[project.status] : null

  return (
    <Link href={`/projects/${project.slug}`} className="block w-full outline-none">
      <div
        ref={cardRef}
        className="w-full rounded-3xl overflow-hidden border border-white/[0.06] bg-[#0a0a0f] transition-all duration-500 group/card hover:border-[#00ffb3]/30 hover:shadow-[0_0_40px_rgba(0,255,179,0.08)] cursor-pointer"
      >
        {/* Glow follow */}
        <div
          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl z-[5]"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,255,179,0.06), transparent 40%)`,
          }}
        />

        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Gradient */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover/card:scale-105"
            style={{ background: project.gradient }}
          />

          {/* Noise */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-70 group-hover/card:opacity-50 transition-opacity duration-500" />

          {/* Number + Status */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <span className="text-[12px] font-bold tracking-[0.25em] text-white/40 group-hover/card:text-white/80 transition-colors" style={{ fontFamily: 'monospace' }}>
              {String(index + 1).padStart(2, '0')}
            </span>

            {status && (
              <div className="flex items-center gap-1.5">
                {project.status === 'sih-finalist' && <Trophy size={12} className="text-amber-400" />}
                <span className={`w-1.5 h-1.5 rounded-full ${status.glow} animate-pulse`} />
                <span className={`text-[10px] font-bold tracking-[0.15em] ${status.color}`} style={{ fontFamily: 'monospace' }}>
                  {status.label}
                </span>
              </div>
            )}
          </div>

          {/* Bottom View Button - appears on hover */}
          <div className="absolute top-6 right-6 z-[15] opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-2 group-hover/card:translate-y-0">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover/card:bg-[#00ffb3]/20 group-hover/card:border-[#00ffb3]/30 transition-all duration-300">
              <ArrowUpRight size={15} className="text-white group-hover/card:text-[#00ffb3] transition-colors" />
            </div>
          </div>

          {/* Title Area */}
          <div className="absolute bottom-6 left-6 right-6 z-10 transform transition-transform duration-500 group-hover/card:-translate-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase bg-black/20 backdrop-blur-md border border-white/10 text-white/60 mb-3">
              {project.category}
            </span>
            <h3 className="text-3xl font-bold text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-[#00ffb3] transition-colors duration-300" style={{ fontFamily: 'var(--font-display)' }}>
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

const particleData = [
  { top: '10%', left: '20%', size: 2, delay: 0, duration: 4 },
  { top: '30%', left: '80%', size: 3, delay: 1, duration: 5 },
  { top: '50%', left: '40%', size: 1, delay: 2, duration: 3 },
  { top: '70%', left: '90%', size: 2, delay: 0.5, duration: 6 },
  { top: '80%', left: '15%', size: 3, delay: 1.5, duration: 4 },
  { top: '20%', left: '60%', size: 1, delay: 2.5, duration: 5 },
  { top: '90%', left: '50%', size: 2, delay: 0.2, duration: 4.5 },
  { top: '40%', left: '10%', size: 3, delay: 1.2, duration: 5.5 },
  { top: '60%', left: '75%', size: 1, delay: 2.1, duration: 3.5 },
  { top: '15%', left: '95%', size: 2, delay: 0.8, duration: 4.2 },
  { top: '85%', left: '85%', size: 3, delay: 1.8, duration: 5.2 },
  { top: '45%', left: '25%', size: 1, delay: 2.8, duration: 3.8 },
]

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 mix-blend-screen" style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }}>
      {particleData.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#00ffb3] animate-pulse"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: '0 0 15px 2px rgba(0, 255, 179, 0.6)'
          }}
        />
      ))}
    </div>
  )
}

export function ProjectsPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll animations for each project
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const projectRows = gsap.utils.toArray('.project-row')
      
      projectRows.forEach((row: any, i) => {
        const isFirst = i === 0;
        
        // Animate the card
        gsap.fromTo(row.querySelector('.project-card-col'), 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              toggleActions: 'play none none reverse',
            }
          }
        )

        // Stagger animate the info text
        gsap.fromTo(row.querySelectorAll('.info-item'), 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-24 pb-24 relative" ref={containerRef}>
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[30%] -left-[15%] w-[50%] h-[50%] rounded-full bg-[#00ffb3]/[0.015] blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-[20%] -right-[15%] w-[40%] h-[40%] rounded-full bg-purple-500/[0.015] blur-[150px] animate-pulse" style={{ animationDuration: '14s' }} />
      </div>

      {/* ── Heading ── */}
      <section className="section-padding pb-10">
        <div className="container-wide" style={{ paddingLeft: 'max(var(--page-padding), calc((100vw - 1200px) / 2 + var(--page-padding)))', paddingRight: 'var(--page-padding)' }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gradient-to-r from-[#00ffb3]/60 to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00ffb3]/60" style={{ fontFamily: 'monospace' }}>
              Portfolio
            </span>
          </div>
          <SplitText
            text="Selected Works"
            tag="h1"
            className="text-display-xl text-white font-bold tracking-tight"
            trigger="load"
            delay={0.2}
          />
          <p className="text-lg text-white/30 mt-5 max-w-lg leading-relaxed">
            A curated selection of projects spanning AI, web apps, blockchain, and design tools.
          </p>
        </div>
      </section>

      {/* ── Vertical One-by-One Project List ── */}
      <div className="flex flex-col">
        {projects.map((project, i) => {
          const status = project.status ? statusConfig[project.status] : null
          const isEven = i % 2 === 0
          
          return (
            <section 
              key={project.slug} 
              className="project-row relative py-20 lg:py-32 border-t border-white/[0.04] overflow-hidden"
            >
              <div 
                className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
                style={{ paddingLeft: 'max(var(--page-padding), calc((100vw - 1200px) / 2 + var(--page-padding)))', paddingRight: 'var(--page-padding)' }}
              >
                {/* ── Project Card Column ── */}
                <div className={`project-card-col lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'}`}>
                  <ProjectPageCard project={project} index={i} />
                </div>

                {/* ── Project Info Column ── */}
                <div className={`lg:col-span-5 flex flex-col justify-center relative ${isEven ? 'lg:order-2 lg:col-start-8' : 'lg:order-1 lg:col-start-1'}`}>
                  
                  {/* Particle Background */}
                  <Particles />
                  
                  {/* Title & Status */}
                  <div className="info-item flex flex-col items-start gap-4 mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {project.title}
                    </h2>
                    {status && (
                      <div className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-bold tracking-[0.15em]',
                        project.status === 'sih-finalist'
                          ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                          : project.status === 'live'
                          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                          : 'bg-blue-500/10 border-blue-500/25 text-blue-400'
                      )} style={{ fontFamily: 'monospace' }}>
                        {project.status === 'sih-finalist' && <Trophy size={10} />}
                        {status.label}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="info-item text-lg text-white/50 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="info-item grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-white/[0.06]">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'monospace' }}>{m.value}</p>
                          <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="info-item flex flex-wrap gap-2 mb-10">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[10px] font-semibold tracking-wider rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="info-item flex flex-wrap items-center gap-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#00ffb3] border border-[#00ffb3]/25 bg-[#00ffb3]/[0.04] rounded-full hover:border-[#00ffb3]/50 hover:bg-[#00ffb3]/[0.1] hover:shadow-[0_0_25px_rgba(0,255,179,0.15)] transition-all duration-400"
                    >
                      View Case Study
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </Link>
                    
                    <div className="flex gap-2">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center hover:border-white/20 hover:bg-white/[0.05] hover:text-white transition-all duration-300 text-white/40">
                          <GithubIcon size={16} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center hover:border-[#00ffb3]/40 hover:bg-[#00ffb3]/10 hover:text-[#00ffb3] transition-all duration-300 text-white/40">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

