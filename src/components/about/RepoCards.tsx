'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { Star, GitFork } from 'lucide-react'
import type { Repo } from '@/data/repos'

export function RepoCards({ repos }: { repos: Repo[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {repos.map((repo) => (
        <motion.a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={staggerItem}
          className="group block p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-warm)] transition-colors">
                {repo.name}
              </span>
              {repo.featured && (
                <span className="px-2 py-0.5 text-[10px] rounded bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-2 line-clamp-2 leading-relaxed">
            {repo.description}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: repo.languageColor }} />
              <span className="text-xs text-[var(--color-text-muted)]">{repo.language}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <Star size={12} />
              {repo.stars}
            </div>
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <GitFork size={12} />
              {repo.forks}
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  )
}
