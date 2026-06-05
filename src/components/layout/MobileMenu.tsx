'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: { href: string; label: string }[]
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 flex flex-col"
          style={{ zIndex: 'var(--z-modal)' } as React.CSSProperties}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] via-transparent to-transparent pointer-events-none" />

          {/* Close Button */}
          <motion.div
            className="relative flex justify-end px-6 py-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <button
              onClick={onClose}
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors duration-300 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span>Close</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>

          {/* Nav Links */}
          <nav className="relative flex-1 flex flex-col justify-center px-8 sm:px-12 gap-2">
            {links.map((link, i) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`group flex items-center gap-4 py-3 transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    {/* Active dot */}
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                        : 'bg-white/20 group-hover:bg-white/40'
                    }`} />

                    {/* Link text */}
                    <span
                      className={`text-3xl sm:text-4xl font-light tracking-tight transition-colors duration-300 ${
                        isActive
                          ? 'text-emerald-400'
                          : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {link.label}
                    </span>

                    {/* Arrow on hover */}
                    <motion.svg
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-emerald-500/40' : 'text-white/0 group-hover:text-white/30'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </motion.svg>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Bottom Info */}
          <motion.div
            className="relative px-8 sm:px-12 pb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-emerald-500/30 to-transparent mb-4" />
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/20"
               style={{ fontFamily: 'var(--font-body)' }}
            >
              © 2026 Pranav Khaire · Available for opportunities
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
