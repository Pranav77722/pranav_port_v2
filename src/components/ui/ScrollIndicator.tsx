'use client'
import { motion } from 'framer-motion'

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="flex flex-col items-center gap-3"
    >
      <span className="text-meta tracking-widest">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="w-px h-8 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent"
      />
    </motion.div>
  )
}
