'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { SplitText } from '@/components/ui/SplitText'
import { Tag } from '@/components/ui/Tag'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'

export function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="pt-24">
      {/* Back link */}
      <div className="container-narrow pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>
      </div>

      {/* Header */}
      <section className="section-padding pb-0">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-2">
            <Tag>{project.category}</Tag>
          </div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-display, var(--font-playfair))' }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-body-lg text-[var(--color-text-body)] mt-6 max-w-2xl"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Tech Stack */}
            <div>
              <h3 className="text-meta mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            {/* Description & Links */}
            <div className="md:col-span-2">
              <h3 className="text-meta mb-4">Overview</h3>
              <p className="text-body text-[var(--color-text-body)] leading-relaxed whitespace-pre-line">
                {project.fullDescription || `${project.description} This project showcases a blend of technical expertise and design sensibility, delivering an experience that is both functional and visually compelling. Built with attention to performance, accessibility, and clean architecture.`}
              </p>
              
              {project.features && project.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-meta mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-body text-[var(--color-text-body)] leading-relaxed">
                        <span className="text-[#00ffb3] mt-1.5 opacity-70">▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00ffb3] rounded text-sm font-semibold text-[#00ffb3] bg-[#00ffb3]/5 hover:bg-[#00ffb3]/15 transition-all shadow-[0_0_15px_rgba(0,255,179,0.1)] hover:shadow-[0_0_25px_rgba(0,255,179,0.25)]"
                  >
                    View Live Site
                    <ArrowUpRight size={16} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] rounded text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-hover)] transition-all"
                  >
                    GitHub Repo
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.url && !project.liveUrl && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] rounded text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-hover)] transition-all"
                  >
                    Visit Project
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {(project.galleryImages?.length ?? 0) > 0 ? (
        <section className="section-padding pt-0">
          <div className="container-wide">
            <h3 className="text-meta mb-8">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {project.galleryImages!.map((imgSrc, i) => (
                <div key={i} className="group rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-lg hover:border-[#00ffb3]/20 hover:shadow-[0_0_30px_rgba(0,255,179,0.06)] transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay with index */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-start p-3">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-white/0 group-hover:text-white/50 transition-colors duration-300" style={{ fontFamily: 'monospace' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : project.images.length > 0 ? (
        <section className="pb-16">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((color, i) => (
                <div
                  key={i}
                  className="aspect-[16/10] rounded-lg border border-[var(--color-border)]"
                  style={{
                    background: `linear-gradient(135deg, ${color} 0%, ${project.images[(i + 1) % project.images.length]} 100%)`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
