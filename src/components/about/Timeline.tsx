'use client'

import { motion } from 'framer-motion'
import { timelineReveal } from '@/lib/animations'
import type { TimelineEntry } from '@/data/timeline'

export function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <motion.div
          key={item.year + item.title}
          custom={i}
          variants={timelineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="timeline-item grid gap-x-6 pb-12"
          style={{ gridTemplateColumns: '80px 1px 1fr' }}
        >
          {/* Year */}
          <div className="text-sm font-semibold text-[var(--color-text-muted)] pt-1 text-right">
            {item.year}
          </div>

          {/* Line + dot */}
          <div className="relative bg-[var(--color-border)]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[var(--color-text-primary)]" />
          </div>

          {/* Content */}
          <div>
            <h3
              className="text-lg text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {item.title}
            </h3>
            <p className="text-sm text-[var(--color-accent-warm)] mt-0.5">{item.company}</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
