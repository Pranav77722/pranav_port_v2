"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import type { Project } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const elems = ref.current.querySelectorAll('.project-card')
    gsap.fromTo(
      elems,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <article key={p.slug} className="project-card rounded-lg overflow-hidden border border-muted/20 bg-card opacity-0">
          <div
            className="h-40 bg-cover bg-center"
            style={{ background: p.gradient }}
            aria-hidden
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-muted mt-2">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.slice(0, 4).map((t) => (
                <span key={t} className="text-xs px-2 py-1 bg-muted/10 rounded">{t}</span>
              ))}
            </div>
            <div className="mt-4">
              <Link href={`/projects/${p.slug}`} className="text-sm underline">View project</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
